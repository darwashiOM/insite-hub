import { useEffect, useState } from 'react';

/*
 * Tiny stale-while-revalidate cache for JSON endpoints.
 * - Returns a cached value instantly (memory, then localStorage) so the UI never
 *   waits on the network for data we've seen before.
 * - Revalidates in the background and updates memory + localStorage.
 * - prefetch() warms the cache early (call at app start) so the data is usually
 *   ready before the user navigates to it.
 */
const mem = new Map();
const readLS = (k) => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : undefined; } catch { return undefined; } };
const writeLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* quota / private mode */ } };

export function peekJson(url, cacheKey) {
  if (mem.has(url)) return mem.get(url);
  if (cacheKey) { const v = readLS(cacheKey); if (v !== undefined) { mem.set(url, v); return v; } }
  return undefined;
}

export function fetchJson(url, cacheKey) {
  return fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { if (d != null) { mem.set(url, d); if (cacheKey) writeLS(cacheKey, d); } return d; })
    .catch(() => null);
}

export function prefetch(url, cacheKey) { fetchJson(url, cacheKey); }

// Returns the best value available now (cached instantly if present), then the
// fresh value once revalidation completes. `undefined` only on a true cold load.
export function useJson(url, cacheKey) {
  const [data, setData] = useState(() => peekJson(url, cacheKey));
  useEffect(() => {
    let alive = true;
    setData((d) => (d === undefined ? peekJson(url, cacheKey) : d));
    fetchJson(url, cacheKey).then((fresh) => { if (alive && fresh != null) setData(fresh); });
    return () => { alive = false; };
  }, [url, cacheKey]);
  return data;
}
