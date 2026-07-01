import { db } from './firebase';
import { dateTs } from './blog';
import { auth, storage } from './firebaseAuth';
import { signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection, getDocs, getDocsFromServer, doc, getDoc, setDoc, serverTimestamp,
  writeBatch, runTransaction, query, orderBy, limit,
  addDoc, updateDoc, deleteDoc,
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
  const url = await getDownloadURL(r);
  // Record it in the media library so it can be browsed + reused. Best-effort:
  // the upload itself already succeeded, so don't fail on a recording error.
  try {
    await addDoc(collection(db, 'media'), {
      url, filename: file.name || safe, contentType: file.type, size: file.size, alt: '',
      createdAt: serverTimestamp(),
    });
  } catch { /* ignore */ }
  return url;
}

const MAX_FILE_BYTES = 26 * 1024 * 1024;

// Upload a downloadable/gated document (PDF, doc, etc.) to the non-public files/
// path. Returns the tokened download URL (the gate secret). Not an image, so no
// media-library record.
export async function adminUploadFile(file) {
  if (file.size >= MAX_FILE_BYTES) {
    throw new Error('That file is too large — please use one under 25 MB.');
  }
  const safe = (file.name || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
  const r = storageRef(storage, `files/${Date.now()}-${safe}`);
  await uploadBytes(r, file, { contentType: file.type || 'application/octet-stream' });
  return getDownloadURL(r);
}

// --- Media library ----------------------------------------------------------

export async function adminListMedia() {
  const snap = await getDocs(query(collection(db, 'media'), orderBy('createdAt', 'desc'), limit(1000)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function adminUpdateMediaAlt(id, alt) {
  await updateDoc(doc(db, 'media', id), { alt: String(alt || '').slice(0, 300) });
}

// Removes the library record only; the stored file (and any URLs already used in
// content) keep working, so deleting a record never breaks a published page.
export async function adminDeleteMedia(id) {
  await deleteDoc(doc(db, 'media', id));
}

// --- Case studies -----------------------------------------------------------

export async function adminListCaseStudies() {
  const snap = await getDocs(collection(db, 'caseStudies'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export async function adminGetCaseStudy(slug) {
  const s = await getDoc(doc(db, 'caseStudies', slug));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}

export async function adminSaveCaseStudy(cs, isNew = false) {
  const { id: _id, ...data } = cs; // drop any stale id; slug is the doc id
  const slug = data.slug;
  if (!slug) throw new Error('A web address is required.');
  const ref = doc(db, 'caseStudies', slug);
  if (isNew) {
    const existing = await getDoc(ref);
    if (existing.exists()) throw new Error(`A case study already exists at /case-studies/${slug}. Pick a different title or web address.`);
  }
  await saveWithHistory(ref, data);
  return slug;
}

export async function adminDeleteCaseStudy(slug) {
  const ref = doc(db, 'caseStudies', slug);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
}

export const adminListCaseStudyVersions = (slug) => listVersions(doc(db, 'caseStudies', slug));
export const adminRestoreCaseStudyVersion = (slug, vid) => restoreVersion(doc(db, 'caseStudies', slug), vid);

// --- CMS-built pages (kit-of-sections landing pages) ------------------------

export async function adminListPages() {
  const snap = await getDocs(collection(db, 'pages'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

export async function adminGetPage(slug) {
  const s = await getDoc(doc(db, 'pages', slug));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}

export async function adminSavePage(page, isNew = false) {
  const { id: _id, ...data } = page;
  const slug = data.slug;
  if (!slug) throw new Error('A web address is required.');
  const ref = doc(db, 'pages', slug);
  if (isNew) {
    const existing = await getDoc(ref);
    if (existing.exists()) throw new Error(`A page already exists at /${slug}. Pick a different title or web address.`);
  }
  await saveWithHistory(ref, data);
  return slug;
}

export async function adminDeletePage(slug) {
  const ref = doc(db, 'pages', slug);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
}

export const adminListPageDocVersions = (slug) => listVersions(doc(db, 'pages', slug));
export const adminRestorePageDocVersion = (slug, vid) => restoreVersion(doc(db, 'pages', slug), vid);

// --- Videos -----------------------------------------------------------------

export async function adminListVideos() {
  const snap = await getDocs(collection(db, 'videos'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export async function adminGetVideo(slug) {
  const s = await getDoc(doc(db, 'videos', slug));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}

export async function adminSaveVideo(v, isNew = false) {
  const { id: _id, ...data } = v;
  const slug = data.slug;
  if (!slug) throw new Error('A web address is required.');
  const ref = doc(db, 'videos', slug);
  if (isNew) {
    const existing = await getDoc(ref);
    if (existing.exists()) throw new Error('A video already exists at that web address. Pick a different title or address.');
  }
  await saveWithHistory(ref, data);
  return slug;
}

export async function adminDeleteVideo(slug) {
  const ref = doc(db, 'videos', slug);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
}

export const adminListVideoVersions = (slug) => listVersions(doc(db, 'videos', slug));
export const adminRestoreVideoVersion = (slug, vid) => restoreVersion(doc(db, 'videos', slug), vid);

// --- Forms + submissions ----------------------------------------------------

export async function adminListForms() {
  const snap = await getDocs(collection(db, 'forms'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function adminGetForm(slug) {
  const s = await getDoc(doc(db, 'forms', slug));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}

export async function adminSaveForm(form, isNew = false) {
  const { id: _id, ...data } = form;
  const slug = data.slug;
  if (!slug) throw new Error('A web address is required.');
  const ref = doc(db, 'forms', slug);
  if (isNew) {
    const existing = await getDoc(ref);
    if (existing.exists()) throw new Error('A form already exists at that web address. Pick a different name or address.');
  }
  await saveWithHistory(ref, data);
  // Public render mirror WITHOUT server-only fields (notifyEmail, gatedFileUrl) so
  // an anonymous reader can't scrape the notify address or grab the gated file URL
  // without submitting. The public form page reads formsPublic; submitForm (admin
  // SDK) reads the full forms doc for the notify address + gated URL.
  const { notifyEmail: _n, gatedFileUrl: _g, ...publicData } = data;
  await setDoc(doc(db, 'formsPublic', slug), publicData);
  return slug;
}

export async function adminDeleteForm(slug) {
  const ref = doc(db, 'forms', slug);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  batch.delete(doc(db, 'formsPublic', slug));
  await batch.commit();
}

export const adminListFormVersions = (slug) => listVersions(doc(db, 'forms', slug));
export const adminRestoreFormVersion = (slug, vid) => restoreVersion(doc(db, 'forms', slug), vid);

// Submissions (admin read only; written by the submitForm function). Newest
// first; filter by form client-side to avoid a composite index.
export async function adminListSubmissions() {
  const snap = await getDocs(query(collection(db, 'formSubmissions'), orderBy('createdAt', 'desc'), limit(500)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// --- Authors (reusable records that posts link to) --------------------------

export async function adminListAuthors() {
  const snap = await getDocs(collection(db, 'authors'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

export async function adminGetAuthor(id) {
  const s = await getDoc(doc(db, 'authors', id));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}

export async function adminSaveAuthor(author) {
  const id = author.id || doc(collection(db, 'authors')).id; // stable auto-id on create
  const { id: _id, ...data } = author;
  await saveWithHistory(doc(db, 'authors', id), data);
  return id;
}

export async function adminDeleteAuthor(id) {
  const ref = doc(db, 'authors', id);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
}

export const adminListAuthorVersions = (id) => listVersions(doc(db, 'authors', id));
export const adminRestoreAuthorVersion = (id, vid) => restoreVersion(doc(db, 'authors', id), vid);

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
