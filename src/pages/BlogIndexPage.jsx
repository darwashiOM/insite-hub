import { blogArticles } from '../data/articles';
import '../components/ArticleLayout.css';

const SYMBOL = '/assets/blog/proxa-symbol.png';

/*
 * Blog index — lists every published article (see blogArticles in
 * src/data/articles.js). Cards link to the article pages via setPage.
 * Shares the .proxa-article design scope (tokens + card type styles).
 */
export default function BlogIndexPage({ setPage }) {
  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow"><img src={SYMBOL} alt="Proxa Labs" />Blog</p>
        <h1 className="blog-title">Perspectives on commercial readiness</h1>
        <p className="blog-sub">
          Field notes and frameworks from inside biopharma commercial learning, on closing the gap between AI ambition and a field that is demonstrably ready.
        </p>

        <div className="blog-grid">
          {blogArticles.map((a) => (
            <button key={a.page} className="blog-card" onClick={() => setPage(a.page)}>
              <div className="blog-card-img" style={{ backgroundImage: `url(${a.thumb})` }} />
              <p className="card-pillar">{a.pillar}</p>
              <p className="card-title">{a.title}</p>
              <p className="card-meta">{a.date} &bull; {a.readTime}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
