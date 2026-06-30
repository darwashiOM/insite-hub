import { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Read a published CMS-built page by slug (public).
export function usePage(slug) {
  const [page, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    getDoc(doc(db, 'pages', slug))
      .then((s) => { if (alive) { setPageData(s.exists() && s.data().published ? { id: s.id, ...s.data() } : null); setLoading(false); } })
      .catch(() => { if (alive) { setError(true); setLoading(false); } });
    return () => { alive = false; };
  }, [slug]);
  return { page, loading, error };
}
