import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

// A custom content-type definition (schema) by key.
export function useContentType(key) {
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    getDoc(doc(db, 'contentTypes', key))
      .then((s) => { if (alive) { setType(s.exists() ? { id: s.id, ...s.data() } : null); setLoading(false); } })
      .catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [key]);
  return { type, loading };
}

// Published entries of a type (client-sorted by order then title).
export function usePublishedEntries(typeKey) {
  const [entries, setEntries] = useState(null);
  useEffect(() => {
    let alive = true;
    getDocs(query(collection(db, 'content'), where('typeKey', '==', typeKey), where('published', '==', true)))
      .then((snap) => {
        if (!alive) return;
        setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order || 0) - (b.order || 0) || (a.title || '').localeCompare(b.title || '')));
      })
      .catch(() => { if (alive) setEntries([]); });
    return () => { alive = false; };
  }, [typeKey]);
  return entries;
}

// One published entry by type + slug.
export function useEntry(typeKey, slug) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    getDoc(doc(db, 'content', `${typeKey}__${slug}`))
      .then((s) => { if (alive) { setEntry(s.exists() && s.data().published ? { id: s.id, ...s.data() } : null); setLoading(false); } })
      // A missing/draft entry reads back as permission-denied — treat as not-found.
      .catch((e) => { if (alive) { if (e && e.code === 'permission-denied') setEntry(null); else setError(true); setLoading(false); } });
    return () => { alive = false; };
  }, [typeKey, slug]);
  return { entry, loading, error };
}
