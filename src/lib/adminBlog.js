import { db } from './firebase';
import { dateTs } from './blog';
import { auth, storage } from './firebaseAuth';
import { signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection, getDocs, getDocsFromServer, doc, getDoc, setDoc, serverTimestamp,
  writeBatch, runTransaction, query, where, orderBy, limit,
  addDoc, updateDoc, deleteDoc, deleteField,
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

// Calls cb({ loggedIn, role }) on auth changes; returns the unsubscribe fn.
// role is 'admin' (full control) or 'editor' (content only).
let currentRole = null;
export function onAdminAuth(cb) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user || (user.uid !== 'site-admin' && user.uid !== 'site-editor')) {
      currentRole = null; cb({ loggedIn: false, role: null }); return;
    }
    let role = user.uid === 'site-admin' ? 'admin' : 'editor';
    try { const t = await user.getIdTokenResult(); if (t.claims.role) role = t.claims.role; } catch { /* fall back to uid */ }
    currentRole = role;
    cb({ loggedIn: true, role });
  });
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
  logActivity('edit', ref.parent.id, ref.id);
}

// --- Activity log (who changed what, when) ----------------------------------
async function logActivity(action, collectionName, docId) {
  try {
    await addDoc(collection(db, 'auditLog'), {
      action, collection: collectionName, docId: docId || '',
      actor: currentRole || 'admin', at: serverTimestamp(),
    });
  } catch { /* non-critical — never fail the underlying action */ }
}
export async function adminListActivity() {
  const snap = await getDocs(query(collection(db, 'auditLog'), orderBy('at', 'desc'), limit(200)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// --- Custom content types (schema-driven) + their entries -------------------
export async function adminListContentTypes() {
  const snap = await getDocs(collection(db, 'contentTypes'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (a.label || '').localeCompare(b.label || ''));
}
export async function adminGetContentType(key) {
  const s = await getDoc(doc(db, 'contentTypes', key));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}
export async function adminSaveContentType(type, isNew = false) {
  const { id: _id, ...data } = type;
  if (!data.key) throw new Error('A type key is required.');
  // a type's key is its public list address (/<key>) — same collision rules as pages
  if (RESERVED_SLUGS.has(data.key)) throw new Error(`“/${data.key}” is a reserved site address — pick a different key.`);
  const ref = doc(db, 'contentTypes', data.key);
  if (isNew) { const ex = await getDoc(ref); if (ex.exists()) throw new Error(`A content type "${data.key}" already exists.`); }
  await saveWithHistory(ref, data);
  return data.key;
}
export async function adminDeleteContentType(key) {
  await deleteDoc(doc(db, 'contentTypes', key));
  logActivity('delete', 'contentTypes', key);
}
export const adminListContentTypeVersions = (key) => listVersions(doc(db, 'contentTypes', key));
export const adminRestoreContentTypeVersion = (key, vid) => restoreVersion(doc(db, 'contentTypes', key), vid);

const entryDocId = (typeKey, slug) => `${typeKey}__${slug}`;
export async function adminListEntries(typeKey) {
  const snap = await getDocs(query(collection(db, 'content'), where('typeKey', '==', typeKey)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order || 0) - (b.order || 0) || (a.title || '').localeCompare(b.title || ''));
}
export async function adminSaveEntry(entry, isNew = false) {
  const { id: _id, ...data } = entry;
  if (!data.typeKey || !data.slug) throw new Error('A type and web address are required.');
  const ref = doc(db, 'content', entryDocId(data.typeKey, data.slug));
  if (isNew) { const ex = await getDoc(ref); if (ex.exists()) throw new Error('An entry already exists at that address.'); }
  await saveWithHistory(ref, data);
  return ref.id;
}
export async function adminDeleteEntry(id) {
  const ref = doc(db, 'content', id);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
  logActivity('delete', 'content', id);
}
export const adminListEntryVersions = (id) => listVersions(doc(db, 'content', id));
export const adminRestoreEntryVersion = (id, vid) => restoreVersion(doc(db, 'content', id), vid);

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
  // Restore the CONTENT, but keep the doc's current publish state — bringing back
  // an old version must not (un)publish it, resurrect a trashed doc, or re-arm a
  // stale schedule (a past publishAt would auto-publish within minutes).
  const cur = (await getDoc(ref)).data() || {};
  const snapshot = { ...v.data().snapshot };
  delete snapshot.publishAt;
  delete snapshot.deletedAt;
  snapshot.published = cur.published === true;
  if (cur.status) snapshot.status = cur.status; else delete snapshot.status;
  if (cur.publishAt) snapshot.publishAt = cur.publishAt;
  if (cur.deletedAt) snapshot.deletedAt = cur.deletedAt;
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
  logActivity('delete', 'articles', slug);
}

// Upload an image to Storage under blog/ and return its public download URL.
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_DIM = 2000;

// Downscale + recompress large photos in the browser before upload so pages stay
// fast (§6 auto-optimize). Leaves GIFs (animation), small files and already-small
// dimensions untouched; falls back to the original on any error or if no gain.
async function downscaleImage(file) {
  if (!/image\/(jpeg|png|webp)/.test(file.type) || file.size < 400 * 1024) return file;
  try {
    // from-image bakes in the EXIF orientation so phone photos aren't rotated
    // sideways once we re-encode (which drops the EXIF tag).
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const big = bitmap.width > MAX_IMAGE_DIM || bitmap.height > MAX_IMAGE_DIM;
    if (!big && file.size < 1.5 * 1024 * 1024) { bitmap.close?.(); return file; }
    const scale = Math.min(1, MAX_IMAGE_DIM / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale), h = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await new Promise((res) => canvas.toBlob(res, type, 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], (file.name || 'image').replace(/\.\w+$/, type === 'image/png' ? '.png' : '.jpg'), { type });
  } catch { return file; }
}

export async function adminUploadImage(file) {
  // Validate up front with a plain-English message (the Storage rules enforce the
  // same limits, but their rejection surfaces as a cryptic "permission" error).
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Please use a PNG, JPG, GIF, or WebP image. (iPhone photos are often HEIC — export or save as JPG first.)');
  }
  if (file.size >= MAX_IMAGE_BYTES) {
    throw new Error('That image is too large — please use one under 10 MB.');
  }
  const upload = await downscaleImage(file);
  const safe = (upload.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
  const r = storageRef(storage, `blog/${Date.now()}-${safe}`);
  await uploadBytes(r, upload, { contentType: upload.type });
  const url = await getDownloadURL(r);
  // Record it in the media library so it can be browsed + reused. Best-effort:
  // the upload itself already succeeded, so don't fail on a recording error.
  try {
    await addDoc(collection(db, 'media'), {
      url, filename: file.name || safe, contentType: upload.type, size: upload.size, alt: '',
      createdAt: serverTimestamp(),
    });
  } catch { /* ignore */ }
  return url;
}

// Upload a document (PDF etc.) to the media library so it can be browsed + reused
// (e.g. a "download our brochure" link). Records a media doc marked isFile.
export async function adminUploadMediaFile(file) {
  const url = await adminUploadFile(file);
  try {
    await addDoc(collection(db, 'media'), {
      url, filename: file.name || 'file', contentType: file.type || 'application/octet-stream',
      size: file.size, alt: '', isFile: true, createdAt: serverTimestamp(),
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
  logActivity('delete', 'caseStudies', slug);
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

// Slugs that would collide with a hardcoded site route (so /slug resolves to the
// built-in page on reload instead of the built page).
const RESERVED_SLUGS = new Set([
  'platform', 'advisory', 'ai-literacy', 'insitex-lms', 'content-development', 'the-lab',
  'about', 'announcements', 'resources', 'newsletter', 'contact', 'future-proof-your-organization',
  'innovation-collective',
  'search', 'blog', 'news', 'case-studies', 'videos', 'noonewillfindthis', 'admin', 'api', 'assets',
]);

export async function adminSavePage(page, isNew = false) {
  const { id: _id, ...data } = page;
  const slug = data.slug;
  if (!slug) throw new Error('A web address is required.');
  if (RESERVED_SLUGS.has(slug)) throw new Error(`“/${slug}” is a reserved site address — pick a different one.`);
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
  logActivity('delete', 'pages', slug);
}

export const adminListPageDocVersions = (slug) => listVersions(doc(db, 'pages', slug));
export const adminRestorePageDocVersion = (slug, vid) => restoreVersion(doc(db, 'pages', slug), vid);

// Published built pages as nav/CTA destinations: [{ page: slug, label: title }].
// Lets the nav editor + section button-pickers link to marketer-built pages.
export async function adminListPageDestinations() {
  const pages = await adminListPages();
  return pages.filter((p) => p.published).map((p) => ({ page: p.slug, label: p.title || p.slug }));
}

// Duplicate a content doc as a fresh unpublished draft (new free slug, "(copy)"
// title, schedule dropped). `save` is the collection's adminSaveX(obj, isNew).
async function duplicateDoc(col, slug, save) {
  const s = await getDoc(doc(db, col, slug));
  if (!s.exists()) throw new Error('That item no longer exists.');
  // Drop fields a copy must not inherit: the schedule, the canonical (which would
  // point the copy back at the original), and any custom code/scripts.
  const { publishAt: _pa, canonical: _c, customCode: _cc, ...data } = s.data();
  let newSlug = `${slug}-copy`, n = 2;
  while ((await getDoc(doc(db, col, newSlug))).exists()) newSlug = `${slug}-copy-${n++}`;
  await save({ ...data, slug: newSlug, title: `${data.title || 'Untitled'} (copy)`, published: false, status: 'draft' }, true);
  return newSlug;
}
export const adminDuplicatePage = (slug) => duplicateDoc('pages', slug, adminSavePage);
export const adminDuplicateArticle = (slug) => duplicateDoc('articles', slug, adminSaveArticle);
export const adminDuplicateCaseStudy = (slug) => duplicateDoc('caseStudies', slug, adminSaveCaseStudy);
export const adminDuplicateVideo = (slug) => duplicateDoc('videos', slug, adminSaveVideo);

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
  logActivity('delete', 'videos', slug);
}

export const adminListVideoVersions = (slug) => listVersions(doc(db, 'videos', slug));
export const adminRestoreVideoVersion = (slug, vid) => restoreVersion(doc(db, 'videos', slug), vid);

// --- Forms + submissions ----------------------------------------------------

export async function adminListForms() {
  const snap = await getDocs(collection(db, 'forms'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

// Published forms as picker options for the "form" page section: [{ slug, name }].
export async function adminListPublishedForms() {
  const forms = await adminListForms();
  return forms.filter((f) => f.published).map((f) => ({ slug: f.slug, name: f.name || f.slug }));
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

// --- Trash (soft delete) --------------------------------------------------
// Trashing unpublishes the item and stamps deletedAt; it disappears from the
// public site and the normal admin lists but is one click from restored. Only
// "Delete forever" (the existing adminDelete*) actually destroys data.
async function trashDoc(colName, id) {
  await updateDoc(doc(db, colName, id), {
    deletedAt: Date.now(), published: false, status: 'draft', publishAt: deleteField(),
    updatedAt: serverTimestamp(),
  });
  logActivity('trash', colName, id);
}
async function restoreDoc(colName, id) {
  await updateDoc(doc(db, colName, id), { deletedAt: deleteField(), updatedAt: serverTimestamp() });
  logActivity('restore', colName, id);
}
export const adminTrashArticle = (slug) => trashDoc('articles', slug);
export const adminTrashCaseStudy = (slug) => trashDoc('caseStudies', slug);
export const adminTrashVideo = (slug) => trashDoc('videos', slug);
export const adminTrashPage = (slug) => trashDoc('pages', slug);
export async function adminTrashForm(slug) {
  // forms mirror a stripped copy to formsPublic — remove it so the form stops working live
  await trashDoc('forms', slug);
  await deleteDoc(doc(db, 'formsPublic', slug)).catch(() => {});
}
export const adminRestoreArticle = (slug) => restoreDoc('articles', slug);
export const adminRestoreCaseStudy = (slug) => restoreDoc('caseStudies', slug);
export const adminRestoreVideo = (slug) => restoreDoc('videos', slug);
export const adminRestorePage = (slug) => restoreDoc('pages', slug);
export const adminRestoreForm = (slug) => restoreDoc('forms', slug); // restored as a draft — republish to re-mirror

export async function adminDeleteForm(slug) {
  const ref = doc(db, 'forms', slug);
  const versions = await getDocs(collection(ref, 'versions'));
  const batch = writeBatch(db);
  versions.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  batch.delete(doc(db, 'formsPublic', slug));
  await batch.commit();
  logActivity('delete', 'forms', slug);
}

export const adminListFormVersions = (slug) => listVersions(doc(db, 'forms', slug));
export async function adminRestoreFormVersion(slug, vid) {
  const snap = await restoreVersion(doc(db, 'forms', slug), vid);
  // forms mirror a stripped copy to formsPublic — a restore must re-sync it or the
  // live form keeps rendering the old fields
  if (!snap.deletedAt) {
    const { notifyEmail: _n, gatedFileUrl: _g, ...publicData } = snap;
    await setDoc(doc(db, 'formsPublic', slug), publicData);
  }
  return snap;
}

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
  logActivity('delete', 'authors', id);
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
