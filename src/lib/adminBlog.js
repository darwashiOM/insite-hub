import { db } from './firebase';
import { auth, storage } from './firebaseAuth';
import { signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection, getDocs, doc, getDoc, setDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const LOGIN_URL = import.meta.env.VITE_ADMIN_LOGIN_URL || '/api/admin-login';

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

// --- Articles (admin: full read/write) --------------------------------------

export async function adminListArticles() {
  const snap = await getDocs(collection(db, 'articles'));
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  items.sort(
    (a, b) =>
      (a.order ?? 9999) - (b.order ?? 9999) ||
      String(b.date || '').localeCompare(String(a.date || ''))
  );
  return items;
}

export async function adminGetArticle(slug) {
  const snap = await getDoc(doc(db, 'articles', slug));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Save (create or overwrite) an article. The slug is the document id.
export async function adminSaveArticle(article) {
  const { id, ...data } = article;
  const slug = data.slug;
  if (!slug) throw new Error('A slug is required.');
  await setDoc(doc(db, 'articles', slug), { ...data, updatedAt: serverTimestamp() }, { merge: false });
  return slug;
}

export async function adminDeleteArticle(slug) {
  await deleteDoc(doc(db, 'articles', slug));
}

// Upload an image to Storage under blog/ and return its public download URL.
export async function adminUploadImage(file) {
  const safe = (file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `blog/${Date.now()}-${safe}`;
  const r = storageRef(storage, path);
  await uploadBytes(r, file, { contentType: file.type });
  return getDownloadURL(r);
}

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
