import { useMemo } from 'react';
import { usePublishedArticles, dateTs, isNewsCategory } from '../lib/blog';
import '../components/ArticleLayout.css';

const SYMBOL = '/assets/blog/proxa-symbol.png';

/*
 * News hub — every published post in the News category, newest first. Posts land
 * here automatically the moment they're published (they also stay on /blog).
 * Same card styling as the blog index.
 */
export default function NewsIndexPage({ setPage }) {
  const { articles, loading, error } = usePublishedArticles();
  const news = useMemo(
    () => articles.filter((a) => isNewsCategory(a.pillar)).sort((x, y) => dateTs(y.date) - dateTs(x.date)),
    [articles]
  );

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow"><img src={SYMBOL} alt="Proxa Labs" />News</p>
        <h1 className="blog-title">The latest from Proxa Labs</h1>
        <p className="blog-sub">
          Product releases, company announcements, and research milestones from Proxa Labs and The Lab.
        </p>

        {loading ? (
          <p className="blog-sub">Loading…</p>
        ) : error ? (
          <p className="blog-sub">
            Couldn’t load the news.{' '}
            <button type="button" onClick={() => window.location.reload()}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--coral-deep)', fontWeight: 600, textDecoration: 'underline' }}>
              Reload
            </button>
          </p>
        ) : news.length === 0 ? (
          <p className="blog-sub">No news yet — check back soon.</p>
        ) : (
          <div className="blog-grid">
            {news.map((a) => (
              <button key={a.id} className="blog-card" onClick={() => setPage('article', { slug: a.slug })}>
                <div className="blog-card-img" style={a.thumb ? { backgroundImage: `url(${a.thumb})` } : undefined} />
                <p className="card-pillar">{a.pillar}</p>
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
