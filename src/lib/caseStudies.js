import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Public case-study data layer (read-only). Mirrors the blog: published docs in
// `caseStudies/{slug}`, cached in localStorage (stale-while-revalidate).
const LS_KEY = 'proxa.caseStudies.v1';
let mem = null;

const readLS = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; } catch { return null; } };
const writeLS = (l) => { try { localStorage.setItem(LS_KEY, JSON.stringify(l)); } catch { /* ignore */ } };

const sortCs = (l) => [...l].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

async function fetchPublished() {
  const snap = await getDocs(query(collection(db, 'caseStudies'), where('published', '==', true)));
  const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  mem = list; writeLS(list);
  return list;
}

export function usePublishedCaseStudies() {
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
    caseStudies: list ? sortCs(list) : [],
    loading: list === null && !fetched,
    error: error && list === null,
    fetched,
  };
}

export function useCaseStudy(slug) {
  const { caseStudies, fetched, error } = usePublishedCaseStudies();
  const caseStudy = caseStudies.find((c) => c.slug === slug) || null;
  return { caseStudy, loading: !caseStudy && !fetched, error: error && !caseStudy };
}
