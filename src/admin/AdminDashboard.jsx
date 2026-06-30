import { useEffect, useState, useCallback } from 'react';
import {
  adminListArticles, adminDeleteArticle,
  adminListAuthors, adminDeleteAuthor,
  adminListCaseStudies, adminDeleteCaseStudy,
  adminListVideos, adminDeleteVideo,
} from '../lib/adminBlog';
import ArticleEditor from './ArticleEditor';
import AuthorEditor from './AuthorEditor';
import CaseStudyEditor from './CaseStudyEditor';
import VideoEditor from './VideoEditor';
import AdminPagesEditor from './AdminPagesEditor';
import NavEditor from './NavEditor';

// Admin shell: Blog | Case studies | Videos | Authors | Site pages | Navigation.
export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('blog');
  const [articles, setArticles] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [caseStudies, setCaseStudies] = useState(null);
  const [videos, setVideos] = useState(null);
  const [view, setView] = useState('list');
  const [authorView, setAuthorView] = useState('list');
  const [csView, setCsView] = useState('list');
  const [vidView, setVidView] = useState('list');
  const [pagesDirty, setPagesDirty] = useState(false);
  const [navDirty, setNavDirty] = useState(false);

  const load = useCallback(() => Promise.all([
    adminListArticles().catch(() => []),
    adminListAuthors().catch(() => []),
    adminListCaseStudies().catch(() => []),
    adminListVideos().catch(() => []),
  ]), []);
  const refresh = useCallback(async () => {
    const [arts, auths, cs, vids] = await load();
    setArticles(arts); setAuthors(auths); setCaseStudies(cs); setVideos(vids);
  }, [load]);
  useEffect(() => {
    let alive = true;
    load().then(([arts, auths, cs, vids]) => { if (alive) { setArticles(arts); setAuthors(auths); setCaseStudies(cs); setVideos(vids); } });
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
  const removeCaseStudy = async (c) => {
    if (!window.confirm(`Delete "${c.title}"? This cannot be undone.`)) return;
    await adminDeleteCaseStudy(c.slug); refresh();
  };
  const removeVideo = async (v) => {
    if (!window.confirm(`Delete "${v.title}"? This cannot be undone.`)) return;
    await adminDeleteVideo(v.slug); refresh();
  };

  const knownTopics = [...new Set((articles || []).map((a) => a.topic).filter(Boolean))].sort();

  // Full-screen editors take over.
  if (tab === 'blog' && view !== 'list') {
    const editing = view === 'new' ? null : articles?.find((a) => a.slug === view) || null;
    return (
      <ArticleEditor article={editing} authors={authors || []} knownTopics={knownTopics}
        onDone={() => { setView('list'); refresh(); }} onCancel={() => setView('list')} />
    );
  }
  if (tab === 'authors' && authorView !== 'list') {
    const editing = authorView === 'new' ? null : authors?.find((a) => a.id === authorView) || null;
    return <AuthorEditor author={editing} onDone={() => { setAuthorView('list'); refresh(); }} onCancel={() => setAuthorView('list')} />;
  }
  if (tab === 'cs' && csView !== 'list') {
    const editing = csView === 'new' ? null : caseStudies?.find((c) => c.slug === csView) || null;
    return <CaseStudyEditor caseStudy={editing} onDone={() => { setCsView('list'); refresh(); }} onCancel={() => setCsView('list')} />;
  }
  if (tab === 'videos' && vidView !== 'list') {
    const editing = vidView === 'new' ? null : videos?.find((v) => v.slug === vidView) || null;
    return <VideoEditor video={editing} onDone={() => { setVidView('list'); refresh(); }} onCancel={() => setVidView('list')} />;
  }

  const Loading = <p style={{ color: '#5c6370' }}>Loading…</p>;

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>Proxa Labs Website Editor</h1>
        <div className="cms-tabs">
          <button className={'cms-tab' + (tab === 'blog' ? ' on' : '')} onClick={() => switchTab('blog')}>Blog</button>
          <button className={'cms-tab' + (tab === 'cs' ? ' on' : '')} onClick={() => switchTab('cs')}>Case studies</button>
          <button className={'cms-tab' + (tab === 'videos' ? ' on' : '')} onClick={() => switchTab('videos')}>Videos</button>
          <button className={'cms-tab' + (tab === 'authors' ? ' on' : '')} onClick={() => switchTab('authors')}>Authors</button>
          <button className={'cms-tab' + (tab === 'pages' ? ' on' : '')} onClick={() => switchTab('pages')}>Site pages</button>
          <button className={'cms-tab' + (tab === 'nav' ? ' on' : '')} onClick={() => switchTab('nav')}>Navigation</button>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {tab === 'blog' && <button className="cms-btn cms-btn-primary" onClick={() => setView('new')}>+ New article</button>}
          {tab === 'cs' && <button className="cms-btn cms-btn-primary" onClick={() => setCsView('new')}>+ New case study</button>}
          {tab === 'videos' && <button className="cms-btn cms-btn-primary" onClick={() => setVidView('new')}>+ New video</button>}
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
          authors === null ? Loading
          : authors.length === 0 ? <p style={{ color: '#5c6370' }}>No authors yet. Click “New author” to add one.</p>
          : (
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
        ) : tab === 'cs' ? (
          caseStudies === null ? Loading
          : caseStudies.length === 0 ? <p style={{ color: '#5c6370' }}>No case studies yet. Click “New case study” to add one.</p>
          : (
            <div className="cms-list">
              {caseStudies.map((c) => (
                <div className="cms-card" key={c.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{c.title || '(untitled)'}</p>
                    <p className="cms-card-meta">
                      {c.client ? `${c.client} · ` : ''}{c.industry || 'No industry'} ·{' '}
                      {c.published
                        ? <a href={`/case-studies/${c.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a>
                        : <span>not published yet</span>}
                    </p>
                  </div>
                  <span className={'cms-badge ' + (c.published ? 'cms-badge-pub' : 'cms-badge-draft')}>{c.published ? 'Published' : 'Draft'}</span>
                  <button className="cms-btn cms-btn-sm" onClick={() => setCsView(c.slug)}>Edit</button>
                  <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => removeCaseStudy(c)}>Delete</button>
                </div>
              ))}
            </div>
          )
        ) : tab === 'videos' ? (
          videos === null ? Loading
          : videos.length === 0 ? <p style={{ color: '#5c6370' }}>No videos yet. Click “New video” to add one.</p>
          : (
            <div className="cms-list">
              {videos.map((v) => (
                <div className="cms-card" key={v.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{v.title || '(untitled)'}</p>
                    <p className="cms-card-meta">
                      {v.topic ? `${v.topic} · ` : ''}{v.length || 'no length'} ·{' '}
                      {v.published
                        ? <a href="/videos" target="_blank" rel="noopener noreferrer">View gallery ↗</a>
                        : <span>not published yet</span>}
                    </p>
                  </div>
                  <span className={'cms-badge ' + (v.published ? 'cms-badge-pub' : 'cms-badge-draft')}>{v.published ? 'Published' : 'Draft'}</span>
                  <button className="cms-btn cms-btn-sm" onClick={() => setVidView(v.slug)}>Edit</button>
                  <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => removeVideo(v)}>Delete</button>
                </div>
              ))}
            </div>
          )
        ) : articles === null ? Loading
        : articles.length === 0 ? <p style={{ color: '#5c6370' }}>No articles yet. Click “New article” to write the first one.</p>
        : (
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
                <span className={'cms-badge ' + (a.published ? 'cms-badge-pub' : 'cms-badge-draft')}>{a.published ? 'Published' : 'Draft'}</span>
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
