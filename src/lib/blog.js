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

// SWR hook: all published articles, sorted. Cached value shows instantly.
export function usePublishedArticles() {
  const [list, setList] = useState(() => mem || readLS());
  useEffect(() => {
    let alive = true;
    fetchPublished().then((l) => { if (alive) setList(l); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return { articles: list ? sortArticles(list) : [], loading: list === null };
}

// A single article by slug, derived from the same cached published set.
export function useArticle(slug) {
  const { articles, loading } = usePublishedArticles();
  const article = articles.find((a) => a.slug === slug) || null;
  return { article, loading: loading && !article };
}
