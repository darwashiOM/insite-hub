import { db } from './firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

/*
 * Public blog data layer (read-only). Articles live in Firestore `articles/{slug}`.
 * Public rules only permit reading documents where published == true.
 */

// Parse a human display date ("June 22, 2026") to a timestamp for chronological
// sorting; unparseable/empty dates sort last.
export function dateTs(d) {
  const n = Date.parse(d || '');
  return Number.isNaN(n) ? 0 : n;
}

// All published articles, ordered for the index (sorted client-side to avoid a
// composite index): by `order` ascending, then date descending.
export async function getPublishedArticles() {
  const q = query(collection(db, 'articles'), where('published', '==', true));
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  items.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || dateTs(b.date) - dateTs(a.date));
  return items;
}

// A single published article by slug (the slug is the Firestore document id).
// Returns null if it doesn't exist, isn't published, or read is denied.
export async function getArticleBySlug(slug) {
  try {
    const snap = await getDoc(doc(db, 'articles', slug));
    if (!snap.exists()) return null;
    const data = snap.data();
    if (!data.published) return null;
    return { id: snap.id, ...data };
  } catch {
    // permission-denied (e.g. unpublished) reads land here for the public.
    return null;
  }
}
