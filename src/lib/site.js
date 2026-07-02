// Shared site constants. Production origin is proxalabs.com (override with
// VITE_SITE_URL). OG_IMAGE defaults to the branded 1200x630 card in
// public/og-default.png (regenerate with scripts/make-og-image.mjs).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.proxalabs.com').replace(/\/+$/, '');
export const OG_IMAGE = import.meta.env.VITE_OG_IMAGE || `${SITE_URL}/og-default.png`;
export const SITE_NAME = 'Proxa Labs';
