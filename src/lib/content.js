import { useJson, prefetch } from './fetchCache';
import { defaultsFor } from '../content/manifest';

// Marketing pages read content overrides from a tiny JSON endpoint (a Cloud
// Function, CDN-cached) — no Firebase SDK in the public bundle. With SWR caching,
// repeat visits apply overrides on first paint (no flash); first visit shows the
// in-code defaults instantly and swaps in overrides when they arrive.
const CONTENT_URL = import.meta.env.VITE_CONTENT_URL || '/api/content';
export const CONTENT_CACHE_KEY = 'proxa.content.v1';

// Warm the cache at app start so overrides are usually ready before navigation.
export function prefetchContent() { prefetch(CONTENT_URL, CONTENT_CACHE_KEY); }

// Returns a getter c(key) -> override (if non-empty) else the in-code default.
export function usePageContent(pageId) {
  const defaults = defaultsFor(pageId);
  // The admin's "View this page" link adds ?cmsbust=<ts> to bypass all caches.
  const bust = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('cmsbust') : null;
  const url = bust ? `${CONTENT_URL}?v=${encodeURIComponent(bust)}` : CONTENT_URL;
  const data = useJson(url, bust ? null : CONTENT_CACHE_KEY);
  const overrides = (data && data[pageId]) || {};
  return (key) => {
    const ov = overrides[key];
    return ov != null && String(ov).trim() !== '' ? ov : defaults[key];
  };
}
