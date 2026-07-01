import { useState, useMemo } from 'react';
import { useSearchIndex } from '../lib/search';
import '../components/ArticleLayout.css';
import './SearchPage.css';

const initialQuery = () => new URLSearchParams(window.location.search).get('q') || '';

const goInternal = (url) => (e) => {
  e.preventDefault();
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export default function SearchPage() {
  const items = useSearchIndex();
  const [q, setQ] = useState(initialQuery);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term || !items) return [];
    return items
      .filter((it) => (it.title || '').toLowerCase().includes(term) || (it.text || '').toLowerCase().includes(term))
      .slice(0, 50);
  }, [q, items]);

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <h1 className="blog-title">Search</h1>
        <input className="search-input" autoFocus placeholder="Search articles, case studies, videos, pages…"
          value={q} onChange={(e) => setQ(e.target.value)} />
        {items === null ? <p className="blog-sub">Loading…</p>
          : !q.trim() ? <p className="blog-sub">Type above to search the site.</p>
            : results.length === 0 ? <p className="blog-sub">No results for “{q}”.</p>
              : (
                <ul className="search-results">
                  {results.map((r, i) => (
                    <li key={i}>
                      <a href={r.url} onClick={goInternal(r.url)}>
                        <span className="search-type">{r.type}</span>
                        <span className="search-title">{r.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
      </section>
    </div>
  );
}
