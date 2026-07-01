import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Load published content across collections into one flat, searchable list.
// Client-side search is fine at this content scale; swap in an index later if needed.
export function useSearchIndex() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let alive = true;
    const load = async (col, map) => {
      try {
        const snap = await getDocs(query(collection(db, col), where('published', '==', true)));
        return snap.docs.map((d) => map({ id: d.id, ...d.data() }));
      } catch { return []; }
    };
    Promise.all([
      load('articles', (d) => ({ type: 'Article', title: d.title, text: `${d.summary || ''} ${d.topic || ''} ${(d.tags || []).join(' ')}`, url: `/blog/${d.slug}` })),
      load('caseStudies', (d) => ({ type: 'Case study', title: d.title, text: `${d.summary || ''} ${d.client || ''} ${d.industry || ''}`, url: `/case-studies/${d.slug}` })),
      load('videos', (d) => ({ type: 'Video', title: d.title, text: `${d.description || ''} ${d.topic || ''} ${d.transcript || ''}`, url: '/videos' })),
      load('pages', (d) => ({ type: 'Page', title: d.title, text: `${d.description || ''}`, url: `/${d.slug}` })),
    ]).then(([a, c, v, p]) => { if (alive) setItems([...a, ...c, ...v, ...p]); });
    return () => { alive = false; };
  }, []);
  return items;
}
