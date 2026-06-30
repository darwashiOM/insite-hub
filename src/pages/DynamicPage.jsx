import { useEffect } from 'react';
import { usePage } from '../lib/pages';
import SectionRenderer from '../components/SectionRenderer';

function slugFromPath() {
  return window.location.pathname.replace(/^\/+|\/+$/g, '');
}

// A marketer-built page: renders its ordered list of sections from the kit.
export default function DynamicPage({ setPage }) {
  const slug = slugFromPath();
  const { page, loading, error } = usePage(slug);

  useEffect(() => {
    if (!page) return;
    document.title = `${page.metaTitle || page.title || 'Proxa Labs'} · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && page.description) meta.content = page.description;
    let robots = document.head.querySelector('meta[name="robots"]');
    if (page.noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex, nofollow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }
  }, [page]);

  if (loading) return <div style={{ minHeight: '60vh' }} />;

  if (error) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Couldn’t load this page</h1>
          <p className="blog-sub">Please check your connection and try again.</p>
        </section>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Page not found</h1>
          <p className="blog-sub">The page you’re looking for doesn’t exist or has moved.</p>
          <button onClick={() => setPage('home')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--coral-deep, #e06a3f)', fontWeight: 600 }}>
            ← Back home
          </button>
        </section>
      </div>
    );
  }

  return (
    <>
      {(page.sections || []).map((s, i) => <SectionRenderer key={i} section={s} go={setPage} />)}
    </>
  );
}
