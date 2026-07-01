import { useEffect } from 'react';
import { useContentType, useEntry } from '../lib/customContent';
import { SITE_URL } from '../lib/site';
import { setJsonLd, buildBreadcrumbLd, buildArticleLd, setSocialCards } from '../lib/jsonLd';
import EntryLayout from '../components/EntryLayout';

function pathParts() {
  return window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
}

// Detail page for a custom content-type entry, at /<typeKey>/<slug>.
export default function GenericDetailPage({ setPage }) {
  const [typeKey, slug] = pathParts();
  const { type } = useContentType(typeKey);
  const { entry, loading, error } = useEntry(typeKey, slug);

  useEffect(() => {
    if (!entry) return;
    const url = `${SITE_URL}/${typeKey}/${slug}`;
    document.title = `${entry.metaTitle || entry.title || 'Proxa Labs'} · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && (entry.description || entry.summary)) meta.content = entry.description || entry.summary;
    let robots = document.head.querySelector('meta[name="robots"]');
    if (entry.noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex, nofollow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }
    setSocialCards({ title: entry.title, description: entry.description || entry.summary, image: entry.ogImage, url });
    setJsonLd('ld-entry', buildArticleLd({ title: entry.title, summary: entry.summary, thumb: entry.ogImage, date: entry.date }, url));
    setJsonLd('ld-breadcrumb', buildBreadcrumbLd([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: (type && type.label) || 'Content', url: `${SITE_URL}/${typeKey}` },
      { name: entry.title, url },
    ]));
    return () => { setJsonLd('ld-entry', null); setJsonLd('ld-breadcrumb', null); };
  }, [entry, type, typeKey, slug]);

  if (loading) return <div style={{ minHeight: '60vh' }} />;
  if (error) return <div className="proxa-article"><section className="shell blog-index"><h1 className="blog-title">Couldn’t load this</h1><p className="blog-sub">Please check your connection and try again.</p></section></div>;
  if (!entry || !type) {
    return (
      <div className="proxa-article"><section className="shell blog-index">
        <h1 className="blog-title">Not found</h1>
        <p className="blog-sub">This page doesn’t exist or has moved.</p>
        <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: '#e06a3f', fontWeight: 600 }}>← Back home</button>
      </section></div>
    );
  }
  return <EntryLayout type={type} entry={entry} setPage={setPage} />;
}
