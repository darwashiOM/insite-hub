import { useEffect, useState, useCallback } from 'react';
import {
  adminListArticles, adminDeleteArticle,
  adminListAuthors, adminDeleteAuthor,
} from '../lib/adminBlog';
import ArticleEditor from './ArticleEditor';
import AuthorEditor from './AuthorEditor';
import AdminPagesEditor from './AdminPagesEditor';
import NavEditor from './NavEditor';

// Admin shell with Blog | Authors | Site pages tabs.
export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('blog');
  const [articles, setArticles] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [view, setView] = useState('list');             // blog: 'list' | 'new' | <slug>
  const [authorView, setAuthorView] = useState('list');  // authors: 'list' | 'new' | <id>
  const [pagesDirty, setPagesDirty] = useState(false);
  const [navDirty, setNavDirty] = useState(false);

  const load = useCallback(() => Promise.all([
    adminListArticles().catch(() => []),
    adminListAuthors().catch(() => []),
  ]), []);
  const refresh = useCallback(async () => {
    const [arts, auths] = await load();
    setArticles(arts); setAuthors(auths);
  }, [load]);
  useEffect(() => {
    let alive = true;
    load().then(([arts, auths]) => { if (alive) { setArticles(arts); setAuthors(auths); } });
    return () => { alive = false; };
  }, [load]);

  const switchTab = (t) => {
    if (t === tab) return;
    if (tab === 'pages' && pagesDirty && !window.confirm('You have unsaved changes on this page. Discard them?')) return;
    if (tab === 'nav' && navDirty && !window.confirm('You have unsaved navigation changes. Discard them?')) return;
    setTab(t);
  };

  const removeArticle = async (a) => {
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    await adminDeleteArticle(a.slug); refresh();
  };
  const removeAuthor = async (a) => {
    if (!window.confirm(`Delete author "${a.name}"? This cannot be undone.`)) return;
    await adminDeleteAuthor(a.id); refresh();
  };

  // Suggestions for the article editor's topic picker + author dropdown.
  const knownTopics = [...new Set((articles || []).map((a) => a.topic).filter(Boolean))].sort();

  // Full-screen editors take over.
  if (tab === 'blog' && view !== 'list') {
    const editing = view === 'new' ? null : articles?.find((a) => a.slug === view) || null;
    return (
      <ArticleEditor
        article={editing}
        authors={authors || []}
        knownTopics={knownTopics}
        onDone={() => { setView('list'); refresh(); }}
        onCancel={() => setView('list')}
      />
    );
  }
  if (tab === 'authors' && authorView !== 'list') {
    const editing = authorView === 'new' ? null : authors?.find((a) => a.id === authorView) || null;
    return (
      <AuthorEditor
        author={editing}
        onDone={() => { setAuthorView('list'); refresh(); }}
        onCancel={() => setAuthorView('list')}
      />
    );
  }

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>Proxa Labs Website Editor</h1>
        <div className="cms-tabs">
          <button className={'cms-tab' + (tab === 'blog' ? ' on' : '')} onClick={() => switchTab('blog')}>Blog</button>
          <button className={'cms-tab' + (tab === 'authors' ? ' on' : '')} onClick={() => switchTab('authors')}>Authors</button>
          <button className={'cms-tab' + (tab === 'pages' ? ' on' : '')} onClick={() => switchTab('pages')}>Site pages</button>
          <button className={'cms-tab' + (tab === 'nav' ? ' on' : '')} onClick={() => switchTab('nav')}>Navigation</button>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {tab === 'blog' && <button className="cms-btn cms-btn-primary" onClick={() => setView('new')}>+ New article</button>}
          {tab === 'authors' && <button className="cms-btn cms-btn-primary" onClick={() => setAuthorView('new')}>+ New author</button>}
          <button className="cms-btn" onClick={onLogout}>Log out</button>
        </div>
      </div>

      <div className="cms-wrap">
        {tab === 'nav' ? (
          <NavEditor onDirtyChange={setNavDirty} />
        ) : tab === 'pages' ? (
          <AdminPagesEditor onDirtyChange={setPagesDirty} />
        ) : tab === 'authors' ? (
          authors === null ? (
            <p style={{ color: '#5c6370' }}>Loading…</p>
          ) : authors.length === 0 ? (
            <p style={{ color: '#5c6370' }}>No authors yet. Click “New author” to add one.</p>
          ) : (
            <div className="cms-list">
              {authors.map((a) => (
                <div className="cms-card" key={a.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{a.name || '(unnamed)'}</p>
                    <p className="cms-card-meta">{a.title || 'No title'}</p>
                  </div>
                  <button className="cms-btn cms-btn-sm" onClick={() => setAuthorView(a.id)}>Edit</button>
                  <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => removeAuthor(a)}>Delete</button>
                </div>
              ))}
            </div>
          )
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
                <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => removeArticle(a)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
