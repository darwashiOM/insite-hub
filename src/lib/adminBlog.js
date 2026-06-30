import { db } from './firebase';
import { dateTs } from './blog';
import { auth, storage } from './firebaseAuth';
import { signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection, getDocs, getDocsFromServer, doc, getDoc, serverTimestamp,
  writeBatch, runTransaction, query, orderBy, limit,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Production hits the Hosting rewrite; local dev (DEV-guarded so it can never
// reach a production build) hits the functions emulator.
const LOGIN_URL = import.meta.env.VITE_ADMIN_LOGIN_URL
  || (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATOR === '1'
    ? 'http://127.0.0.1:5001/insite-hub-web/us-central1/adminLogin'
    : '/api/admin-login');

// --- Auth -------------------------------------------------------------------

// Verify the password server-side, then sign in with the returned custom token.
// Throws an Error with a user-facing message on failure.
export async function adminLogin(password) {
  let res;
  try {
    res = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
  } catch {
    throw new Error('Network error — please try again.');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Login failed.');
  }
  const { token } = await res.json();
  await signInWithCustomToken(auth, token);
}

export function adminLogout() {
  return signOut(auth);
}

// Calls cb(true|false) on auth changes; returns the unsubscribe fn.
export function onAdminAuth(cb) {
  return onAuthStateChanged(auth, (user) => cb(!!user && user.uid === 'site-admin'));
}

// --- Versioned saves --------------------------------------------------------
// Before overwriting a doc, snapshot its current state into a `versions`
// subcollection, so every save is undoable. Runs in a transaction so the
// read-archive-then-write is atomic even if two saves overlap. Replaces the old
// destructive setDoc(merge:false) and works for any content doc.

const KEEP_VERSIONS = 30; // cap retained snapshots per doc

async function saveWithHistory(ref, data) {
  await runTransaction(db, async (tx) => {
    const current = await tx.get(ref);
    if (current.exists()) {
      tx.set(doc(collection(ref, 'versions')), {
        snapshot: current.data(),
        archivedAt: serverTimestamp(),
      });
    }
    // updatedAt is re-stamped last, so a restored snapshot's stale updatedAt
    // (carried inside `data`) becomes the restore time, not the original.
    tx.set(ref, { ...data, updatedAt: serverTimestamp() });
  });
  // Trim old snapshots best-effort; a prune failure must never fail the save.
  pruneVersions(ref).catch(() => {});
}

async function pruneVersions(ref, keep = KEEP_VERSIONS) {
  const snap = await getDocs(query(collection(ref, 'versions'), orderBy('archivedAt', 'desc')));
  if (snap.size <= keep) return;
  const batch = writeBatch(db);
  snap.docs.slice(keep).forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

// Lightweight list for the history UI — ids + timestamps only, newest first.
// Server read so a just-archived version (pending serverTimestamp) shows up.
async function listVersions(ref, max = 50) {
  const snap = await getDocsFromServer(query(collection(ref, 'versions'), orderBy('archivedAt', 'desc'), limit(max)));
  return snap.docs.map((d) => ({ id: d.id, archivedAt: d.data().archivedAt }));
}

// Restore archives the current state first (via saveWithHistory), so a restore
// is itself undoable. Returns the restored snapshot so callers can refresh their
// view without a second fetch (which could spuriously report failure).
async function restoreVersion(ref, versionId) {
  const v = await getDoc(doc(ref, 'versions', versionId));
  if (!v.exists()) throw new Error('That version no longer exists.');
  const snapshot = v.data().snapshot;
  await saveWithHistory(ref, snapshot);
  return snapshot;
}

// --- Articles (admin: full read/write) --------------------------------------

export async function adminListArticles() {
  const snap = await getDocs(collection(db, 'articles'));
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  items.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || dateTs(b.date) - dateTs(a.date));
  return items;
}

export async function adminGetArticle(slug) {
  const snap = await getDoc(doc(db, 'articles', slug));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Save an article. The slug is the document id. On create (isNew), refuse to
// overwrite an existing article at the same slug (prevents silent data loss).
export async function adminSaveArticle(article, isNew = false) {
  const { id: _id, ...data } = article; // drop any stale id field; slug is the doc id
  const slug = data.slug;
  if (!slug) throw new Error('A slug is required.');
  const ref = doc(db, 'articles', slug);
  if (isNew) {
    const existing = await getDoc(ref);
    if (existing.exists()) {
      throw new Error(`An article already exists at /blog/${slug}. Pick a different title or slug.`);
    }
  }
  await saveWithHistory(ref, data);
  return slug;
}

export const adminListArticleVersions = (slug) => listVersions(doc(db, 'articles', slug));
export const adminRestoreArticleVersion = (slug, versionId) => restoreVersion(doc(db, 'articles', slug), versionId);

export async function adminDeleteArticle(slug) {
  const ref = doc(db, 'articles', slug);
  // Delete the version snapshots too, or a future article reusing this slug
  // would inherit stale history. KEEP_VERSIONS keeps this under the 500-op limit.
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
}

// Upload an image to Storage under blog/ and return its public download URL.
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export async function adminUploadImage(file) {
  // Validate up front with a plain-English message (the Storage rules enforce the
  // same limits, but their rejection surfaces as a cryptic "permission" error).
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Please use a PNG, JPG, GIF, or WebP image. (iPhone photos are often HEIC — export or save as JPG first.)');
  }
  if (file.size >= MAX_IMAGE_BYTES) {
    throw new Error('That image is too large — please use one under 10 MB.');
  }
  const safe = (file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `blog/${Date.now()}-${safe}`;
  const r = storageRef(storage, path);
  await uploadBytes(r, file, { contentType: file.type });
  return getDownloadURL(r);
}

// --- Page content overrides (Phase 2) -------------------------------------

export async function adminGetPageContent(pageId) {
  const snap = await getDoc(doc(db, 'siteContent', pageId));
  return snap.exists() ? snap.data() : {};
}

export async function adminSavePageContent(pageId, data) {
  await saveWithHistory(doc(db, 'siteContent', pageId), data);
}

export const adminListPageVersions = (pageId) => listVersions(doc(db, 'siteContent', pageId));
export const adminRestorePageVersion = (pageId, versionId) => restoreVersion(doc(db, 'siteContent', pageId), versionId);

// Helper: turn a title into a url-safe slug.
export function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
