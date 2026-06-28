import { useEffect, useState, useCallback } from 'react';
import { adminListArticles, adminDeleteArticle } from '../lib/adminBlog';
import ArticleEditor from './ArticleEditor';
import AdminPagesEditor from './AdminPagesEditor';

// Admin shell with Blog | Site pages tabs.
export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('blog');
  const [articles, setArticles] = useState(null);
  const [view, setView] = useState('list'); // 'list' | 'new' | <slug>
  const [pagesDirty, setPagesDirty] = useState(false);

  const refresh = useCallback(async () => {
    setArticles(await adminListArticles().catch(() => []));
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const switchTab = (t) => {
    if (t === tab) return;
    if (tab === 'pages' && pagesDirty && !window.confirm('You have unsaved changes on this page. Discard them?')) return;
    setTab(t);
  };

  const remove = async (a) => {
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    await adminDeleteArticle(a.slug);
    refresh();
  };

  // The article editor takes over the full screen (with its own bar).
  if (tab === 'blog' && view !== 'list') {
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
        <h1>Proxa Labs Website Editor</h1>
        <div className="cms-tabs">
          <button className={'cms-tab' + (tab === 'blog' ? ' on' : '')} onClick={() => switchTab('blog')}>Blog</button>
          <button className={'cms-tab' + (tab === 'pages' ? ' on' : '')} onClick={() => switchTab('pages')}>Site pages</button>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {tab === 'blog' && <button className="cms-btn cms-btn-primary" onClick={() => setView('new')}>+ New article</button>}
          <button className="cms-btn" onClick={onLogout}>Log out</button>
        </div>
      </div>

      <div className="cms-wrap">
        {tab === 'pages' ? (
          <AdminPagesEditor onDirtyChange={setPagesDirty} />
        ) : articles === null ? (
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
                    {a.pillar ? `${a.pillar} · ` : ''}{a.date || 'no date'} ·{' '}
                    {a.published
                      ? <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a>
                      : <span>not published yet</span>}
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
