import { useState, useMemo } from 'react';
import { usePublishedArticles, dateTs } from '../lib/blog';
import '../components/ArticleLayout.css';

const SYMBOL = '/assets/blog/proxa-symbol.png';

/*
 * Blog index — lists published articles with live filter + sort. Cached
 * (stale-while-revalidate) so repeat visits render instantly. Filter options are
 * derived from the loaded set, so they appear only when there's something to pick.
 */
export default function BlogIndexPage({ setPage }) {
  const { articles, loading, error } = usePublishedArticles();
  const [topic, setTopic] = useState('');
  const [author, setAuthor] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sort, setSort] = useState('default'); // default | newest | oldest

  const topics = useMemo(() => [...new Set(articles.map((a) => a.topic).filter(Boolean))].sort(), [articles]);
  const authors = useMemo(() => [...new Set(articles.map((a) => a.author?.name).filter(Boolean))].sort(), [articles]);
  const anyFeatured = useMemo(() => articles.some((a) => a.featured), [articles]);

  const shown = useMemo(() => {
    let list = articles.filter((a) =>
      (!topic || a.topic === topic) &&
      (!author || a.author?.name === author) &&
      (!featuredOnly || a.featured));
    if (sort === 'newest') list = [...list].sort((x, y) => dateTs(y.date) - dateTs(x.date));
    else if (sort === 'oldest') list = [...list].sort((x, y) => dateTs(x.date) - dateTs(y.date));
    return list;
  }, [articles, topic, author, featuredOnly, sort]);

  const filtersActive = topic || author || featuredOnly || sort !== 'default';
  const clearFilters = () => { setTopic(''); setAuthor(''); setFeaturedOnly(false); setSort('default'); };
  const showFilterBar = !loading && !error && articles.length > 0 && (topics.length > 1 || authors.length > 1 || anyFeatured);

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow"><img src={SYMBOL} alt="Proxa Labs" />Blog</p>
        <h1 className="blog-title">Perspectives on commercial readiness</h1>
        <p className="blog-sub">
          Field notes and frameworks from inside biopharma commercial learning, on closing the gap between AI ambition and a field that is demonstrably ready.
        </p>

        {showFilterBar && (
          <div className="blog-filters">
            {topics.length > 1 && (
              <label className="blog-filter">
                <span>Topic</span>
                <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <option value="">All topics</option>
                  {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
            )}
            {authors.length > 1 && (
              <label className="blog-filter">
                <span>Author</span>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                  <option value="">All authors</option>
                  {authors.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
            )}
            <label className="blog-filter">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Featured first</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </label>
            {anyFeatured && (
              <label className="blog-filter blog-filter-check">
                <input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} />
                <span>Featured only</span>
              </label>
            )}
            {filtersActive && (
              <button type="button" className="blog-filter-clear" onClick={clearFilters}>Clear</button>
            )}
          </div>
        )}

        {loading ? (
          <p className="blog-sub">Loading…</p>
        ) : error ? (
          <p className="blog-sub">
            Couldn’t load articles.{' '}
            <button type="button" onClick={() => window.location.reload()}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--coral-deep)', fontWeight: 600, textDecoration: 'underline' }}>
              Reload
            </button>
          </p>
        ) : articles.length === 0 ? (
          <p className="blog-sub">No articles published yet — check back soon.</p>
        ) : shown.length === 0 ? (
          <p className="blog-sub">No articles match these filters. <button type="button" className="blog-filter-clear" onClick={clearFilters}>Clear filters</button></p>
        ) : (
          <div className="blog-grid">
            {shown.map((a) => (
              <button key={a.id} className="blog-card" onClick={() => setPage('article', { slug: a.slug })}>
                <div className="blog-card-img" style={a.thumb ? { backgroundImage: `url(${a.thumb})` } : undefined} />
                <p className="card-pillar">{a.pillar}{a.featured ? ' · Featured' : ''}</p>
                <p className="card-title">{a.title}</p>
                <p className="card-meta">{a.date}{a.readTime ? ` • ${a.readTime}` : ''}</p>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
