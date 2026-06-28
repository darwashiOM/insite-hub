import { useEffect, useState, useCallback } from 'react';
import { adminListArticles, adminDeleteArticle } from '../lib/adminBlog';
import ArticleEditor from './ArticleEditor';

// List view + create/edit/delete dispatch. `view` is 'list' | 'new' | a slug.
export default function AdminDashboard({ onLogout }) {
  const [articles, setArticles] = useState(null);
  const [view, setView] = useState('list');

  const refresh = useCallback(async () => {
    setArticles(await adminListArticles().catch(() => []));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const remove = async (a) => {
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    await adminDeleteArticle(a.slug);
    refresh();
  };

  if (view !== 'list') {
    const editing = view === 'new' ? null : articles?.find((a) => a.slug === view) || null;
    return (
      <ArticleEditor
        article={editing}
        onDone={() => { setView('list'); refresh(); }}
        onCancel={() => setView('list')}
      />
    );
  }

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>Proxa Labs CMS — Blog</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn cms-btn-primary" onClick={() => setView('new')}>+ New article</button>
          <button className="cms-btn" onClick={onLogout}>Log out</button>
        </div>
      </div>

      <div className="cms-wrap">
        {articles === null ? (
          <p style={{ color: '#5c6370' }}>Loading…</p>
        ) : articles.length === 0 ? (
          <p style={{ color: '#5c6370' }}>No articles yet. Click “New article” to write the first one.</p>
        ) : (
          <div className="cms-list">
            {articles.map((a) => (
              <div className="cms-card" key={a.id}>
                <div className="cms-card-main">
                  <p className="cms-card-title">{a.title || '(untitled)'}</p>
                  <p className="cms-card-meta">
                    {a.pillar ? `${a.pillar} · ` : ''}{a.date || 'no date'} · /blog/{a.slug}
                  </p>
                </div>
                <span className={'cms-badge ' + (a.published ? 'cms-badge-pub' : 'cms-badge-draft')}>
                  {a.published ? 'Published' : 'Draft'}
                </span>
                <button className="cms-btn cms-btn-sm" onClick={() => setView(a.slug)}>Edit</button>
                <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => remove(a)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
