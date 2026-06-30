// Shared site constants. Production origin is still insitehub.com until the
// domain flips — override with VITE_SITE_URL. OG_IMAGE is a placeholder until a
// proper ~1200x630 share image is added (VITE_OG_IMAGE).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.insitehub.com').replace(/\/+$/, '');
export const OG_IMAGE = import.meta.env.VITE_OG_IMAGE || `${SITE_URL}/apple-touch-icon.png`;
export const SITE_NAME = 'Proxa Labs';
