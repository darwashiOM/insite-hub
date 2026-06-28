import { useEffect, useState } from 'react';
import { defaultsFor } from '../content/manifest';

// Marketing pages read content overrides from a tiny JSON endpoint (a Cloud
// Function, CDN-cached) — no Firebase SDK in the public bundle. Fetched once per
// session and shared across pages.
const CONTENT_URL = import.meta.env.VITE_CONTENT_URL || '/api/content';
let _cache;
function fetchAllContent() {
  // When the admin opens a page with ?cmsbust=<ts>, fetch fresh (skip the module
  // cache and the CDN cache) so a just-saved edit is visible immediately.
  const bust = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('cmsbust')
    : null;
  if (bust) {
    return fetch(`${CONTENT_URL}?v=${encodeURIComponent(bust)}`)
      .then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  }
  if (!_cache) {
    _cache = fetch(CONTENT_URL).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  }
  return _cache;
}

// Returns a getter c(key) -> override (if non-empty) else the in-code default.
// Renders defaults immediately; swaps in overrides once the fetch resolves.
export function usePageContent(pageId) {
  const defaults = defaultsFor(pageId);
  const [overrides, setOverrides] = useState(null);
  useEffect(() => {
    let alive = true;
    fetchAllContent().then((all) => { if (alive) setOverrides((all && all[pageId]) || {}); });
    return () => { alive = false; };
  }, [pageId]);
  return (key) => {
    const ov = overrides && overrides[key];
    return ov != null && String(ov).trim() !== '' ? ov : defaults[key];
  };
}
