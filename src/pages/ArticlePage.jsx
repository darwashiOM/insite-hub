import { useEffect, useState } from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { getArticleBySlug } from '../lib/blog';

function slugFromPath() {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1] || '';
}

// Renders a published blog article resolved from the /blog/<slug> URL.
export default function ArticlePage({ setPage }) {
  const [state, setState] = useState({ loading: true, article: null });

  useEffect(() => {
    let alive = true;
    setState({ loading: true, article: null });
    getArticleBySlug(slugFromPath()).then((article) => {
      if (!alive) return;
      setState({ loading: false, article });
      if (article) {
        document.title = `${article.title} · Proxa Labs`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta && article.description) meta.content = article.description;
      }
    });
    return () => { alive = false; };
  }, []);

  if (state.loading) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index"><p className="blog-sub">Loading…</p></section>
      </div>
    );
  }

  if (!state.article) {
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

  return <ArticleLayout article={state.article} />;
}
