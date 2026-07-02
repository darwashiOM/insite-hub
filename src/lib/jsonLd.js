import { SITE_URL, OG_IMAGE, SITE_NAME } from './site';

// Upsert (or remove, when obj is null) a JSON-LD <script> in the head, keyed by
// id. Set here at runtime so the prerender snapshot bakes it into the HTML.
export function setJsonLd(id, obj) {
  let el = document.getElementById(id);
  if (!obj) { if (el) el.remove(); return; }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  // escape < so content containing </script> can never break out of the tag
  // (matters most for prerendered HTML, where this is serialized verbatim)
  el.textContent = JSON.stringify(obj).replace(/</g, '\\u003c');
}

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

// og:image and schema.org image require absolute URLs — prefix SITE_URL for a
// relative path so social scrapers and rich-results can resolve it.
export function absUrl(u) {
  if (!u) return u;
  return /^https?:\/\//.test(u) ? u : SITE_URL + (u.startsWith('/') ? '' : '/') + u;
}

// Per-item social cards (og/twitter) + canonical. App.jsx sets generic ones on
// page change; content pages call this with their specifics so shared links and
// search show the right title/description/image/url. The prerender bakes the
// final values into the static HTML.
export function setSocialCards({ title, description, image, url }) {
  if (title) { upsertMeta('property', 'og:title', title); upsertMeta('name', 'twitter:title', title); }
  if (description) { upsertMeta('property', 'og:description', description); upsertMeta('name', 'twitter:description', description); }
  if (image) { const i = absUrl(image); upsertMeta('property', 'og:image', i); upsertMeta('name', 'twitter:image', i); }
  if (url) {
    upsertMeta('property', 'og:url', url);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', url);
  }
}

// "June 22, 2026" -> "2026-06-22" (schema.org wants ISO). Null if unparseable.
export function toIsoDate(d) {
  const n = Date.parse(d || '');
  return Number.isNaN(n) ? null : new Date(n).toISOString().slice(0, 10);
}

// Site-wide Organization + WebSite graph (set once, persists across navigation).
export function buildOrgLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: SITE_NAME, url: `${SITE_URL}/`, logo: OG_IMAGE },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, publisher: { '@id': `${SITE_URL}/#org` } },
    ],
  };
}

export function buildArticleLd(article, url) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || article.summary || undefined,
    url,
    mainEntityOfPage: url,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
  };
  if (article.thumb) ld.image = absUrl(article.thumb);
  if (article.author?.name) ld.author = { '@type': 'Person', name: article.author.name };
  const date = toIsoDate(article.date);
  if (date) ld.datePublished = date;
  return ld;
}

export function buildBreadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

// FAQPage markup from an array of { q, a } — used by articles with FAQ blocks
// (and mirrors what the page-builder FAQ section emits).
export function buildFaqLd(items) {
  const list = (items || []).filter((f) => f.q && f.a);
  if (!list.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
