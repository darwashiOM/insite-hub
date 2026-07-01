import { useEffect } from 'react';
import { useContentType, usePublishedEntries } from '../lib/customContent';
import './ArticleLayout.css';
import './EntryLayout.css';

const goEntry = (typeKey, slug) => {
  window.history.pushState({}, '', `/${typeKey}/${slug}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// Rendered by DynamicPage when a single-segment slug isn't a built page: if it's a
// custom content type, show its published entries; otherwise a not-found.
export default function ContentTypeList({ slug, setPage }) {
  const { type, loading } = useContentType(slug);
  const entries = usePublishedEntries(slug);

  useEffect(() => { if (type) document.title = `${type.listTitle || type.label} · Proxa Labs`; }, [type]);

  if (loading || entries === null) return <div style={{ minHeight: '50vh' }} />;

  if (!type) {
    return (
      <div className="proxa-article"><section className="shell blog-index">
        <h1 className="blog-title">Page not found</h1>
        <p className="blog-sub">The page you’re looking for doesn’t exist or has moved.</p>
        <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: '#e06a3f', fontWeight: 600 }}>← Back home</button>
      </section></div>
    );
  }

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow">{type.label}</p>
        <h1 className="blog-title">{type.listTitle || type.label}</h1>
        {type.intro && <p className="blog-sub">{type.intro}</p>}
        {entries.length === 0 ? <p className="blog-sub">Nothing here yet.</p> : (
          <div className="entry-list">
            {entries.map((e) => (
              <button className="entry-card" key={e.id} onClick={() => goEntry(slug, e.slug)}>
                <span className="entry-card-title">{e.title}</span>
                {e.summary && <span className="entry-card-sub">{e.summary}</span>}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
