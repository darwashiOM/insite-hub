// Editable header dropdown menus. Defaults live here; the CMS can override them
// (stored at siteContent/nav, delivered via getContent like other page content).
// Each item is { label, page } where page is a destination key below.
export const DEFAULT_MENUS = {
  platform: [
    { label: 'AI Platform', page: 'platform' },
    { label: 'InsiteX LMS', page: 'insitex' },
  ],
  solutions: [
    { label: 'AI Literacy', page: 'literacy' },
    { label: 'Advisory', page: 'advisory' },
    { label: 'Content', page: 'content' },
  ],
  resources: [
    { label: 'Resources', page: 'resources' },
    { label: 'Blog', page: 'blog' },
  ],
};

export const MENU_LABELS = { platform: 'Platform', solutions: 'Solutions', resources: 'Resources' };

// Pages a nav item can point to (page key -> friendly label shown in the editor).
export const NAV_DESTINATIONS = [
  { page: 'home', label: 'Home' },
  { page: 'platform', label: 'AI Platform' },
  { page: 'insitex', label: 'InsiteX LMS' },
  { page: 'literacy', label: 'AI Literacy' },
  { page: 'advisory', label: 'Advisory' },
  { page: 'content', label: 'Content Development' },
  { page: 'proxalab', label: 'The Lab' },
  { page: 'resources', label: 'Resources' },
  { page: 'blog', label: 'Blog / Articles' },
  { page: 'news', label: 'Announcements' },
  { page: 'newsletter', label: 'Newsletter' },
  { page: 'about', label: 'About' },
  { page: 'contact', label: 'Contact' },
];

const VALID_PAGES = new Set(NAV_DESTINATIONS.map((d) => d.page));

// Merge a saved override (may be partial / missing / malformed) onto the defaults.
// Items are validated (real label + known destination) so a hand-edited or stale
// override can't render a blank or dead nav link; an emptied menu falls back to
// the in-code default rather than rendering an empty dropdown.
export function mergeMenus(override) {
  const ov = (override && override.menus) || {};
  const out = {};
  for (const key of Object.keys(DEFAULT_MENUS)) {
    const items = Array.isArray(ov[key])
      ? ov[key]
          .filter((it) => it && typeof it.label === 'string' && it.label.trim() && VALID_PAGES.has(it.page))
          .map((it) => ({ label: it.label.trim(), page: it.page }))
      : [];
    out[key] = items.length ? items : DEFAULT_MENUS[key];
  }
  return out;
}
