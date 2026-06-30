import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Extract an 11-char YouTube id from a watch/share/embed URL (null if not YouTube).
export function parseYouTubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// Public video-library data layer (read-only). Mirrors the blog: published docs
// in `videos/{slug}`, cached in localStorage (stale-while-revalidate).
const LS_KEY = 'proxa.videos.v1';
let mem = null;

const readLS = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; } catch { return null; } };
const writeLS = (l) => { try { localStorage.setItem(LS_KEY, JSON.stringify(l)); } catch { /* ignore */ } };

const sortVids = (l) => [...l].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

async function fetchPublished() {
  const snap = await getDocs(query(collection(db, 'videos'), where('published', '==', true)));
  const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  mem = list; writeLS(list);
  return list;
}

export function usePublishedVideos() {
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
    videos: list ? sortVids(list) : [],
    loading: list === null && !fetched,
    error: error && list === null,
    fetched,
  };
}
