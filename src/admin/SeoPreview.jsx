import { SITE_URL } from '../lib/site';

const host = SITE_URL.replace(/^https?:\/\//, '');

// Plain-language length feedback for a search title / description field.
export function CharCount({ value, max }) {
  const len = (value || '').trim().length;
  if (!len) return null;
  const cls = len > max ? 'cms-count-over' : len > max * 0.9 ? 'cms-count-warn' : '';
  return (
    <p className={`cms-hint ${cls}`}>
      {len} / {max}{len > max ? ' — Google will likely cut this off' : len > max * 0.9 ? ' — getting long' : ''}
    </p>
  );
}

// Yoast-style "how this can look on Google" preview. Uses the same fallback
// chain the live pages use, and truncates the way Google does, so what you see
// is honest.
export default function SeoPreview({ title, description, path }) {
  const t = (title || '').trim() || 'The page title shows here';
  const d = (description || '').trim() || 'The search description shows here. Leave it blank and Google picks its own text from the page.';
  const crumbs = (path || '/').split('/').filter(Boolean);
  return (
    <div className="cms-seo-prev">
      <p className="cms-seo-prev-h">How this can look on Google</p>
      <div className="cms-seo-prev-card">
        <span className="cms-seo-prev-url">{host}{crumbs.map((c) => ` › ${c}`).join('')}</span>
        <span className="cms-seo-prev-title">{t.length > 60 ? t.slice(0, 60).trimEnd() + ' …' : t}</span>
        <span className="cms-seo-prev-desc">{d.length > 160 ? d.slice(0, 160).trimEnd() + ' …' : d}</span>
      </div>
    </div>
  );
}
