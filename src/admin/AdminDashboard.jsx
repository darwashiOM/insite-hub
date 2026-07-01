import { useEffect, useState, useCallback } from 'react';
import {
  adminListArticles, adminDeleteArticle,
  adminListAuthors, adminDeleteAuthor,
  adminListCaseStudies, adminDeleteCaseStudy,
  adminListVideos, adminDeleteVideo,
  adminListForms, adminDeleteForm,
  adminListPages, adminDeletePage,
  adminDuplicatePage, adminDuplicateArticle, adminDuplicateCaseStudy, adminDuplicateVideo,
  adminTrashArticle, adminTrashCaseStudy, adminTrashVideo, adminTrashForm, adminTrashPage,
  adminRestoreArticle, adminRestoreCaseStudy, adminRestoreVideo, adminRestoreForm, adminRestorePage,
} from '../lib/adminBlog';
import ArticleEditor from './ArticleEditor';
import AuthorEditor from './AuthorEditor';
import CaseStudyEditor from './CaseStudyEditor';
import VideoEditor from './VideoEditor';
import FormBuilder from './FormBuilder';
import SubmissionsView from './SubmissionsView';
import PageBuilder from './PageBuilder';
import MediaLibrary from './MediaLibrary';
import AdminPagesEditor from './AdminPagesEditor';
import NavEditor from './NavEditor';
import RedirectsEditor from './RedirectsEditor';
import ActivityView from './ActivityView';
import ContentTypesManager from './ContentTypesManager';
import StartHere from './StartHere';

// One-line orientation shown at the top of each list tab (Start here + the
// full-screen editor tabs bring their own copy).
const TAB_INTRO = {
  blog: 'Write and publish articles. Use “+ New article” to start one, or Edit any post below.',
  cs: 'Customer stories and results. Use “+ New case study” to add one.',
  videos: 'Your video library — add YouTube or hosted videos, with a transcript so search and AI tools can read them.',
  forms: 'Build contact forms and gated downloads, and read who submitted them (Submissions).',
  landing: 'Build a brand-new page from ready-made blocks — hero, features, CTA and more. (To edit an existing page like the Homepage, use “Main pages”.)',
  authors: 'The people whose names appear on blog posts and case studies.',
  media: 'Upload images and files once, then reuse them anywhere on the site.',
  activity: 'A history of what changed, and when.',
};

const itemStatus = (x) => (x.deletedAt ? 'trash' : x.published ? 'published' : x.status === 'review' ? 'review' : 'draft');

// Search box + status filter chips shown above each content list.
function ListToolbar({ items, q, setQ, statusFilter, setStatusFilter, kind }) {
  const counts = { all: 0, published: 0, draft: 0, review: 0, trash: 0 };
  (items || []).forEach((x) => { const st = itemStatus(x); counts[st]++; if (st !== 'trash') counts.all++; });
  const chips = [['all', 'All'], ['published', 'Published'], ['draft', 'Drafts'], ['review', 'In review'], ['trash', 'Trash']];
  return (
    <div className="cms-list-toolbar">
      <input className="cms-input cms-list-search" placeholder={`Search ${kind}…`} aria-label={`Search ${kind}`}
        value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="cms-chiprow">
        {chips.map(([k, label]) => (
          ((k === 'review' || k === 'trash') && !counts[k]) ? null : (
            <button key={k} className={'cms-chip' + (statusFilter === k ? ' on' : '')} onClick={() => setStatusFilter(k)}>
              {label} ({counts[k]})
            </button>
          )
        ))}
      </div>
    </div>
  );
}

// Admin shell: Blog | Case studies | Videos | Forms | Authors | Site pages | Navigation.
export default function AdminDashboard({ role, onLogout }) {
  const isAdmin = role !== 'editor'; // editors manage content but not design/settings
  const [tab, setTab] = useState('start');
  const [articles, setArticles] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [caseStudies, setCaseStudies] = useState(null);
  const [videos, setVideos] = useState(null);
  const [forms, setForms] = useState(null);
  const [pages, setPages] = useState(null);
  const [view, setView] = useState('list');
  const [pageView, setPageView] = useState('list');
  const [authorView, setAuthorView] = useState('list');
  const [csView, setCsView] = useState('list');
  const [vidView, setVidView] = useState('list');
  const [formView, setFormView] = useState('list');
  const [formsSub, setFormsSub] = useState('forms'); // 'forms' | 'submissions'
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagesDirty, setPagesDirty] = useState(false);
  const [navDirty, setNavDirty] = useState(false);
  const [redirectsDirty, setRedirectsDirty] = useState(false);
  const [typesDirty, setTypesDirty] = useState(false);

  const load = useCallback(() => Promise.all([
    adminListArticles().catch(() => []),
    adminListAuthors().catch(() => []),
    adminListCaseStudies().catch(() => []),
    adminListVideos().catch(() => []),
    adminListForms().catch(() => []),
    adminListPages().catch(() => []),
  ]), []);
  const refresh = useCallback(async () => {
    const [arts, auths, cs, vids, fms, pgs] = await load();
    setArticles(arts); setAuthors(auths); setCaseStudies(cs); setVideos(vids); setForms(fms); setPages(pgs);
  }, [load]);
  useEffect(() => {
    let alive = true;
    load().then(([arts, auths, cs, vids, fms, pgs]) => { if (alive) { setArticles(arts); setAuthors(auths); setCaseStudies(cs); setVideos(vids); setForms(fms); setPages(pgs); } });
    return () => { alive = false; };
  }, [load]);

  const switchTab = (t) => {
    if (t === tab) return;
    if (tab === 'pages' && pagesDirty && !window.confirm('You have unsaved changes on this page. Discard them?')) return;
    if (tab === 'nav' && navDirty && !window.confirm('You have unsaved navigation changes. Discard them?')) return;
    if (tab === 'redirects' && redirectsDirty && !window.confirm('You have unsaved redirect changes. Discard them?')) return;
    if (tab === 'types' && typesDirty && !window.confirm('You have unsaved changes in the content-type editor. Discard them?')) return;
    if (tab === 'forms' && t !== 'forms') setFormsSub('forms'); // always re-enter Forms on the forms list
    setQ(''); setStatusFilter('all');
    setTab(t);
  };

  // Search + status filter applied to a content list. "All" hides trashed items;
  // the Trash chip shows only them.
  const filterList = (items) => (items || []).filter((x) => {
    const st = itemStatus(x);
    if (statusFilter === 'all' ? st === 'trash' : st !== statusFilter) return false;
    const needle = q.trim().toLowerCase();
    return !needle || (x.title || x.name || '').toLowerCase().includes(needle);
  });
  const noMatches = <p style={{ color: '#5c6370' }}>Nothing matches — clear the search or pick another filter.</p>;

  const trashItem = (fn) => async (item) => { await fn(item.slug); refresh(); };
  const restoreItem = (fn) => async (item) => { await fn(item.slug); refresh(); };
  const trashArticle = trashItem(adminTrashArticle);
  const trashCaseStudy = trashItem(adminTrashCaseStudy);
  const trashVideo = trashItem(adminTrashVideo);
  const trashForm = trashItem(adminTrashForm);
  const trashPage = trashItem(adminTrashPage);
  const restoreArticle = restoreItem(adminRestoreArticle);
  const restoreCaseStudy = restoreItem(adminRestoreCaseStudy);
  const restoreVideo = restoreItem(adminRestoreVideo);
  const restoreForm = restoreItem(adminRestoreForm);
  const restorePage = restoreItem(adminRestorePage);

  const logout = () => {
    if ((pagesDirty || navDirty || redirectsDirty || typesDirty)
      && !window.confirm('You have unsaved changes that will be lost. Log out anyway?')) return;
    onLogout();
  };

  // Permanent deletes — only reachable from the Trash view (authors have no trash).
  const removeArticle = async (a) => { if (window.confirm(`Permanently delete "${a.title}"? This cannot be undone.`)) { await adminDeleteArticle(a.slug); refresh(); } };
  const removeAuthor = async (a) => { if (window.confirm(`Delete author "${a.name}"? This cannot be undone.`)) { await adminDeleteAuthor(a.id); refresh(); } };
  const removeCaseStudy = async (c) => { if (window.confirm(`Permanently delete "${c.title}"? This cannot be undone.`)) { await adminDeleteCaseStudy(c.slug); refresh(); } };
  const removeVideo = async (v) => { if (window.confirm(`Permanently delete "${v.title}"? This cannot be undone.`)) { await adminDeleteVideo(v.slug); refresh(); } };
  const removeForm = async (f) => { if (window.confirm(`Permanently delete "${f.name}"? This cannot be undone.`)) { await adminDeleteForm(f.slug); refresh(); } };
  const removePage = async (p) => { if (window.confirm(`Permanently delete "${p.title}"? This cannot be undone.`)) { await adminDeletePage(p.slug); refresh(); } };

  // Card action buttons: normal items get Edit/Duplicate/Trash; trashed ones get Restore/Delete forever.
  const cardActions = (item, { onEdit, onDuplicate, onTrash, onRestore, onDeleteForever }) => (
    item.deletedAt ? (
      <>
        <button className="cms-btn cms-btn-sm" onClick={onRestore}>Restore</button>
        <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={onDeleteForever}>Delete forever</button>
      </>
    ) : (
      <>
        <button className="cms-btn cms-btn-sm" onClick={onEdit}>Edit</button>
        {onDuplicate && <button className="cms-btn cms-btn-sm" onClick={onDuplicate}>Duplicate</button>}
        <button className="cms-btn cms-btn-sm cms-btn-danger" title="Moves to Trash — you can restore it" onClick={onTrash}>Trash</button>
      </>
    )
  );
  const dupe = (fn) => async (item) => { try { await fn(item.slug); await refresh(); } catch (e) { window.alert('Duplicate failed: ' + (e.message || e)); } };
  const duplicateArticle = dupe(adminDuplicateArticle);
  const duplicateCaseStudy = dupe(adminDuplicateCaseStudy);
  const duplicateVideo = dupe(adminDuplicateVideo);
  const duplicatePage = dupe(adminDuplicatePage);

  const knownTopics = [...new Set((articles || []).map((a) => a.topic).filter(Boolean))].sort();

  // Full-screen editors take over.
  if (tab === 'blog' && view !== 'list') {
    const editing = view === 'new' ? null : articles?.find((a) => a.slug === view) || null;
    return <ArticleEditor article={editing} authors={authors || []} knownTopics={knownTopics} onCancel={() => { setView('list'); refresh(); }} />;
  }
  if (tab === 'authors' && authorView !== 'list') {
    const editing = authorView === 'new' ? null : authors?.find((a) => a.id === authorView) || null;
    return <AuthorEditor author={editing} onDone={() => { setAuthorView('list'); refresh(); }} onCancel={() => { setAuthorView('list'); refresh(); }} />;
  }
  if (tab === 'cs' && csView !== 'list') {
    const editing = csView === 'new' ? null : caseStudies?.find((c) => c.slug === csView) || null;
    return <CaseStudyEditor caseStudy={editing} onCancel={() => { setCsView('list'); refresh(); }} />;
  }
  if (tab === 'videos' && vidView !== 'list') {
    const editing = vidView === 'new' ? null : videos?.find((v) => v.slug === vidView) || null;
    return <VideoEditor video={editing} onCancel={() => { setVidView('list'); refresh(); }} />;
  }
  if (tab === 'forms' && formView !== 'list') {
    const editing = formView === 'new' ? null : forms?.find((f) => f.slug === formView) || null;
    return <FormBuilder form={editing} onDone={() => { setFormView('list'); refresh(); }} onCancel={() => { setFormView('list'); refresh(); }} />;
  }
  if (tab === 'landing' && pageView !== 'list') {
    const editing = pageView === 'new' ? null : pages?.find((p) => p.slug === pageView) || null;
    return <PageBuilder page={editing} isAdmin={isAdmin} onDone={() => { setPageView('list'); refresh(); }} onCancel={() => { setPageView('list'); refresh(); }} />;
  }

  const Loading = <p style={{ color: '#5c6370' }}>Loading…</p>;
  const badge = (d) => {
    const pub = d === true || (d && d.published);
    if (d && d.deletedAt) return <span className="cms-badge cms-badge-draft">In trash</span>;
    if (pub) return <span className="cms-badge cms-badge-pub">Published</span>;
    if (d && d.publishAt) return <span className="cms-badge cms-badge-draft">Scheduled</span>;
    if (d && d.status === 'review') return <span className="cms-badge cms-badge-review">In review</span>;
    return <span className="cms-badge cms-badge-draft">Draft</span>;
  };

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>Proxa Labs Website Editor</h1>
        <div className="cms-tabs">
          <button className={'cms-tab cms-tab-home' + (tab === 'start' ? ' on' : '')} onClick={() => switchTab('start')}>★ Start here</button>
          <button className={'cms-tab' + (tab === 'blog' ? ' on' : '')} onClick={() => switchTab('blog')}>Blog</button>
          <button className={'cms-tab' + (tab === 'cs' ? ' on' : '')} onClick={() => switchTab('cs')}>Case studies</button>
          <button className={'cms-tab' + (tab === 'videos' ? ' on' : '')} onClick={() => switchTab('videos')}>Videos</button>
          <button className={'cms-tab' + (tab === 'forms' ? ' on' : '')} onClick={() => switchTab('forms')}>Forms</button>
          <button className={'cms-tab' + (tab === 'landing' ? ' on' : '')} onClick={() => switchTab('landing')}>Landing pages</button>
          <button className={'cms-tab' + (tab === 'authors' ? ' on' : '')} onClick={() => switchTab('authors')}>Authors</button>
          <button className={'cms-tab' + (tab === 'media' ? ' on' : '')} onClick={() => switchTab('media')}>Media</button>
          {isAdmin && <>
            <button className={'cms-tab' + (tab === 'types' ? ' on' : '')} onClick={() => switchTab('types')}>Content types</button>
            <button className={'cms-tab' + (tab === 'pages' ? ' on' : '')} onClick={() => switchTab('pages')}>Main pages</button>
            <button className={'cms-tab' + (tab === 'nav' ? ' on' : '')} onClick={() => switchTab('nav')}>Navigation</button>
            <button className={'cms-tab' + (tab === 'redirects' ? ' on' : '')} onClick={() => switchTab('redirects')}>Redirects</button>
            <button className={'cms-tab' + (tab === 'activity' ? ' on' : '')} onClick={() => switchTab('activity')}>Activity</button>
          </>}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {tab === 'blog' && <button className="cms-btn cms-btn-primary" onClick={() => setView('new')}>+ New article</button>}
          {tab === 'cs' && <button className="cms-btn cms-btn-primary" onClick={() => setCsView('new')}>+ New case study</button>}
          {tab === 'videos' && <button className="cms-btn cms-btn-primary" onClick={() => setVidView('new')}>+ New video</button>}
          {tab === 'landing' && <button className="cms-btn cms-btn-primary" onClick={() => setPageView('new')}>+ New page</button>}
          {tab === 'authors' && <button className="cms-btn cms-btn-primary" onClick={() => setAuthorView('new')}>+ New author</button>}
          {tab === 'forms' && formsSub === 'forms' && (
            <>
              <button className="cms-btn" onClick={() => setFormsSub('submissions')}>Submissions</button>
              <button className="cms-btn cms-btn-primary" onClick={() => setFormView('new')}>+ New form</button>
            </>
          )}
          <button className="cms-btn" onClick={logout}>Log out</button>
        </div>
      </div>

      <div className="cms-wrap">
        {tab === 'start' ? (
          <StartHere go={switchTab} isAdmin={isAdmin} stats={{
            blog: articles, cs: caseStudies, videos, forms, landing: pages,
          }} />
        ) : (
        <>
        {TAB_INTRO[tab] && <p className="cms-tab-intro">{TAB_INTRO[tab]}</p>}
        {tab === 'activity' ? (
          <ActivityView />
        ) : tab === 'types' ? (
          <ContentTypesManager onDirtyChange={setTypesDirty} />
        ) : tab === 'nav' ? (
          <NavEditor onDirtyChange={setNavDirty} />
        ) : tab === 'redirects' ? (
          <RedirectsEditor onDirtyChange={setRedirectsDirty} />
        ) : tab === 'media' ? (
          <MediaLibrary />
        ) : tab === 'pages' ? (
          <AdminPagesEditor onDirtyChange={setPagesDirty} />
        ) : tab === 'forms' ? (
          formsSub === 'submissions' ? (
            <SubmissionsView onBack={() => setFormsSub('forms')} />
          ) : forms === null ? Loading
          : forms.length === 0 ? <p style={{ color: '#5c6370' }}>No forms yet. Click “New form” to build one.</p>
          : (
            <>
            <ListToolbar items={forms} q={q} setQ={setQ} statusFilter={statusFilter} setStatusFilter={setStatusFilter} kind="forms" />
            {filterList(forms).length === 0 ? noMatches : (
            <div className="cms-list">
              {filterList(forms).map((f) => (
                <div className="cms-card" key={f.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{f.name || '(untitled)'}</p>
                    <p className="cms-card-meta">
                      {(f.fields || []).length} field{(f.fields || []).length === 1 ? '' : 's'}{f.gated ? ' · gated' : ''} ·{' '}
                      {f.published
                        ? <a href={`/forms/${f.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a>
                        : <span>not published yet</span>}
                    </p>
                  </div>
                  {badge(f)}
                  {cardActions(f, { onEdit: () => setFormView(f.slug), onTrash: () => trashForm(f), onRestore: () => restoreForm(f), onDeleteForever: () => removeForm(f) })}
                </div>
              ))}
            </div>)}
            </>
          )
        ) : tab === 'landing' ? (
          pages === null ? Loading
          : pages.length === 0 ? <p style={{ color: '#5c6370' }}>No pages yet. Click “New page” to build one from sections.</p>
          : (
            <>
            <ListToolbar items={pages} q={q} setQ={setQ} statusFilter={statusFilter} setStatusFilter={setStatusFilter} kind="pages" />
            {filterList(pages).length === 0 ? noMatches : (
            <div className="cms-list">
              {filterList(pages).map((p) => (
                <div className="cms-card" key={p.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{p.title || '(untitled)'}</p>
                    <p className="cms-card-meta">
                      /{p.slug} · {(p.sections || []).length} section{(p.sections || []).length === 1 ? '' : 's'} ·{' '}
                      {p.published ? <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a> : <span>not published yet</span>}
                    </p>
                  </div>
                  {badge(p)}
                  {cardActions(p, { onEdit: () => setPageView(p.slug), onDuplicate: () => duplicatePage(p), onTrash: () => trashPage(p), onRestore: () => restorePage(p), onDeleteForever: () => removePage(p) })}
                </div>
              ))}
            </div>)}
            </>
          )
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
            <>
            <ListToolbar items={caseStudies} q={q} setQ={setQ} statusFilter={statusFilter} setStatusFilter={setStatusFilter} kind="case studies" />
            {filterList(caseStudies).length === 0 ? noMatches : (
            <div className="cms-list">
              {filterList(caseStudies).map((c) => (
                <div className="cms-card" key={c.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{c.title || '(untitled)'}</p>
                    <p className="cms-card-meta">
                      {c.client ? `${c.client} · ` : ''}{c.industry || 'No industry'} ·{' '}
                      {c.published ? <a href={`/case-studies/${c.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a> : <span>not published yet</span>}
                    </p>
                  </div>
                  {badge(c)}
                  {cardActions(c, { onEdit: () => setCsView(c.slug), onDuplicate: () => duplicateCaseStudy(c), onTrash: () => trashCaseStudy(c), onRestore: () => restoreCaseStudy(c), onDeleteForever: () => removeCaseStudy(c) })}
                </div>
              ))}
            </div>)}
            </>
          )
        ) : tab === 'videos' ? (
          videos === null ? Loading
          : videos.length === 0 ? <p style={{ color: '#5c6370' }}>No videos yet. Click “New video” to add one.</p>
          : (
            <>
            <ListToolbar items={videos} q={q} setQ={setQ} statusFilter={statusFilter} setStatusFilter={setStatusFilter} kind="videos" />
            {filterList(videos).length === 0 ? noMatches : (
            <div className="cms-list">
              {filterList(videos).map((v) => (
                <div className="cms-card" key={v.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{v.title || '(untitled)'}</p>
                    <p className="cms-card-meta">
                      {v.topic ? `${v.topic} · ` : ''}{v.length || 'no length'} ·{' '}
                      {v.published ? <a href="/videos" target="_blank" rel="noopener noreferrer">View gallery ↗</a> : <span>not published yet</span>}
                    </p>
                  </div>
                  {badge(v)}
                  {cardActions(v, { onEdit: () => setVidView(v.slug), onDuplicate: () => duplicateVideo(v), onTrash: () => trashVideo(v), onRestore: () => restoreVideo(v), onDeleteForever: () => removeVideo(v) })}
                </div>
              ))}
            </div>)}
            </>
          )
        ) : articles === null ? Loading
        : articles.length === 0 ? <p style={{ color: '#5c6370' }}>No articles yet. Click “New article” to write the first one.</p>
        : (
          <>
          <ListToolbar items={articles} q={q} setQ={setQ} statusFilter={statusFilter} setStatusFilter={setStatusFilter} kind="posts" />
          {filterList(articles).length === 0 ? noMatches : (
          <div className="cms-list">
            {filterList(articles).map((a) => (
              <div className="cms-card" key={a.id}>
                <div className="cms-card-main">
                  <p className="cms-card-title">{a.title || '(untitled)'}</p>
                  <p className="cms-card-meta">
                    {a.pillar ? `${a.pillar} · ` : ''}{a.date || 'no date'} ·{' '}
                    {a.published ? <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a>
                      : a.publishAt ? <span>scheduled for {new Date(a.publishAt).toLocaleString()}</span>
                      : <span>not published yet</span>}
                  </p>
                </div>
                {badge(a)}
                {cardActions(a, { onEdit: () => setView(a.slug), onDuplicate: () => duplicateArticle(a), onTrash: () => trashArticle(a), onRestore: () => restoreArticle(a), onDeleteForever: () => removeArticle(a) })}
              </div>
            ))}
          </div>)}
          </>
        )}
        </>
        )}
      </div>
    </div>
  );
}
