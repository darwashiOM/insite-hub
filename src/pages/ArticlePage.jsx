import { useEffect } from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { useArticle } from '../lib/blog';
import { SITE_URL } from '../lib/site';
import { setJsonLd, buildArticleLd, buildBreadcrumbLd } from '../lib/jsonLd';

function slugFromPath() {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1] || '';
}

// Renders a published blog article resolved from the /blog/<slug> URL. The article
// comes from the cached published set, so navigating from the index is instant.
export default function ArticlePage({ setPage }) {
  const { article, loading, error } = useArticle(slugFromPath());

  useEffect(() => {
    if (!article) return;
    const setMeta = (attr, key, val) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    const setLink = (rel, href) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
    };

    // Per-post SEO overrides (these run after the generic per-route meta because
    // the article loads async, so they win).
    const url = (article.canonical && article.canonical.trim()) || `${SITE_URL}/blog/${article.slug}`;
    document.title = (article.metaTitle && article.metaTitle.trim()) || `${article.title} · Proxa Labs`;
    if (article.description) setMeta('name', 'description', article.description);
    setLink('canonical', url);
    setMeta('property', 'og:url', url);
    const ogImg = (article.ogImage && article.ogImage.trim()) || (article.thumb && article.thumb.trim());
    if (ogImg) { setMeta('property', 'og:image', ogImg); setMeta('name', 'twitter:image', ogImg); }
    setMeta('name', 'robots', article.noindex ? 'noindex, nofollow' : 'index, follow');

    // Article + breadcrumb structured data (AEO). Removed on unmount so it
    // doesn't linger on the next page.
    setJsonLd('ld-article', buildArticleLd(article, url));
    setJsonLd('ld-breadcrumb', buildBreadcrumbLd([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: article.title, url },
    ]));

    // Deep-link: scroll to a #section once the body has rendered.
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }), 60);

    return () => { setJsonLd('ld-article', null); setJsonLd('ld-breadcrumb', null); };
  }, [article]);

  if (loading) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index"><p className="blog-sub">Loading…</p></section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Couldn’t load this article</h1>
          <p className="blog-sub">Please check your connection and try again.</p>
          <button onClick={() => window.location.reload()}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--coral-deep)', fontWeight: 600 }}>
            Reload
          </button>
        </section>
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
