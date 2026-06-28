import { usePublishedArticles } from '../lib/blog';
import '../components/ArticleLayout.css';

const SYMBOL = '/assets/blog/proxa-symbol.png';

/*
 * Blog index — lists every published article. Cached (stale-while-revalidate) so
 * repeat visits render instantly. Cards link to the article pages via setPage.
 */
export default function BlogIndexPage({ setPage }) {
  const { articles, loading } = usePublishedArticles();

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow"><img src={SYMBOL} alt="Proxa Labs" />Blog</p>
        <h1 className="blog-title">Perspectives on commercial readiness</h1>
        <p className="blog-sub">
          Field notes and frameworks from inside biopharma commercial learning, on closing the gap between AI ambition and a field that is demonstrably ready.
        </p>

        {loading ? (
          <p className="blog-sub">Loading…</p>
        ) : articles.length === 0 ? (
          <p className="blog-sub">No articles published yet — check back soon.</p>
        ) : (
          <div className="blog-grid">
            {articles.map((a) => (
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
