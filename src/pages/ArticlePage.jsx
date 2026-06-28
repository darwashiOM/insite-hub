import { useEffect } from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { useArticle } from '../lib/blog';

function slugFromPath() {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1] || '';
}

// Renders a published blog article resolved from the /blog/<slug> URL. The article
// comes from the cached published set, so navigating from the index is instant.
export default function ArticlePage({ setPage }) {
  const { article, loading } = useArticle(slugFromPath());

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && article.description) meta.content = article.description;
    // Deep-link: scroll to a #section once the body has rendered.
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }), 60);
  }, [article]);

  if (loading) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index"><p className="blog-sub">Loading…</p></section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Article not found</h1>
          <p className="blog-sub">This article may have moved or been unpublished.</p>
          <button
            onClick={() => setPage('blog')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--coral-deep)', fontWeight: 600 }}
          >
            ← Back to the blog
          </button>
        </section>
      </div>
    );
  }

  return <ArticleLayout article={article} />;
}
