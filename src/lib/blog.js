import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/*
 * Public blog data layer (read-only). Articles live in Firestore `articles/{slug}`;
 * rules only expose published docs. To keep it fast, the published set is cached in
 * localStorage and served instantly (stale-while-revalidate): repeat/return visits
 * and index→article navigation render with no spinner, while a fresh copy loads in
 * the background.
 */
const LS_KEY = 'proxa.articles.v1';
let mem = null;

const readLS = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; } catch { return null; } };
const writeLS = (list) => { try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch { /* ignore */ } };

// Parse a human display date ("June 22, 2026") to a timestamp for sorting.
export function dateTs(d) {
  const n = Date.parse(d || '');
  return Number.isNaN(n) ? 0 : n;
}
const sortArticles = (list) =>
  [...list].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999) || dateTs(b.date) - dateTs(a.date));

async function fetchPublished() {
  const snap = await getDocs(query(collection(db, 'articles'), where('published', '==', true)));
  const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  mem = list; writeLS(list);
  return list;
}

// SWR hook: all published articles, sorted. Cached value shows instantly; a
// `fetched` flag marks when at least one network fetch has settled, and `error`
// is set if the fetch failed with no cache to fall back on.
export function usePublishedArticles() {
  const [list, setList] = useState(() => mem || readLS());
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    fetchPublished()
      .then((l) => { if (alive) { setList(l); setFetched(true); } })
      .catch(() => { if (alive) { setFetched(true); setError(true); } });
    return () => { alive = false; };
  }, []);
  return {
    articles: list ? sortArticles(list) : [],
    loading: list === null && !fetched,
    error: error && list === null,
    fetched,
  };
}

// A single article by slug, derived from the same cached published set. "Not found"
// is only meaningful once a fetch has settled — otherwise a returning visitor with
// a stale cache could flash "not found" for a brand-new post.
export function useArticle(slug) {
  const { articles, fetched, error } = usePublishedArticles();
  const article = articles.find((a) => a.slug === slug) || null;
  return { article, loading: !article && !fetched, error: error && !article };
}
