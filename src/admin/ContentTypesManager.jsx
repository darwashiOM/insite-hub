import { useEffect, useState, useCallback } from 'react';
import {
  adminListContentTypes, adminDeleteContentType,
  adminListEntries, adminDeleteEntry,
} from '../lib/adminBlog';
import ContentTypeEditor from './ContentTypeEditor';
import ContentEntryEditor from './ContentEntryEditor';

export default function ContentTypesManager({ onDirtyChange }) {
  const [types, setTypes] = useState(null);
  const [typeEdit, setTypeEdit] = useState(null); // 'new' | typeObj | null
  const [active, setActive] = useState(null);      // type whose entries we manage
  const [entries, setEntries] = useState(null);
  const [entryEdit, setEntryEdit] = useState(null); // 'new' | entryObj | null

  // Re-sync `active` too, so the entries view (and its editor) never keeps a stale schema
  // after the type was edited.
  const loadTypes = useCallback(() => adminListContentTypes().then((t) => {
    setTypes(t);
    setActive((a) => (a ? t.find((x) => x.key === a.key) || null : a));
  }).catch(() => setTypes([])), []);
  useEffect(() => { let a = true; adminListContentTypes().then((t) => { if (a) setTypes(t); }).catch(() => { if (a) setTypes([]); }); return () => { a = false; }; }, []);
  const loadEntries = (typeKey) => adminListEntries(typeKey).then(setEntries).catch(() => setEntries([]));
  const openEntries = (t) => { setActive(t); setEntries(null); loadEntries(t.key); };

  const badge = (d) => {
    if (d.published) return <span className="cms-badge cms-badge-pub">Published</span>;
    if (d.status === 'review') return <span className="cms-badge cms-badge-review">In review</span>;
    return <span className="cms-badge cms-badge-draft">Draft</span>;
  };

  if (typeEdit) return <ContentTypeEditor type={typeEdit === 'new' ? null : typeEdit} onDirty={onDirtyChange} onDone={() => { setTypeEdit(null); loadTypes(); }} onCancel={() => { setTypeEdit(null); loadTypes(); }} />;
  if (active && entryEdit) return <ContentEntryEditor type={active} entry={entryEdit === 'new' ? null : entryEdit} onDirty={onDirtyChange} onDone={() => { setEntryEdit(null); loadEntries(active.key); }} onCancel={() => { setEntryEdit(null); loadEntries(active.key); }} />;

  // Entries of the active type
  if (active) {
    const removeEntry = async (e) => { if (window.confirm(`Delete "${e.title}"? This cannot be undone.`)) { await adminDeleteEntry(e.id); loadEntries(active.key); } };
    return (
      <div>
        <div className="cms-pages-head">
          <div>
            <button className="cms-btn cms-btn-sm" onClick={() => { setActive(null); setEntries(null); }}>← All content types</button>
            <h2 style={{ margin: '10px 0 0', fontSize: 18 }}>{active.label}</h2>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="cms-btn cms-btn-sm" onClick={() => setTypeEdit(active)}>Edit type</button>
            <button className="cms-btn cms-btn-primary" onClick={() => setEntryEdit('new')}>+ New {(active.singular || 'entry').toLowerCase()}</button>
          </div>
        </div>
        {entries === null ? <p style={{ color: '#5c6370' }}>Loading…</p>
          : entries.length === 0 ? <p style={{ color: '#5c6370' }}>Nothing yet. Click “New” to add one.</p>
            : (
              <div className="cms-list">
                {entries.map((e) => (
                  <div className="cms-card" key={e.id}>
                    <div className="cms-card-main">
                      <p className="cms-card-title">{e.title || '(untitled)'}</p>
                      <p className="cms-card-meta">/{active.key}/{e.slug} · {e.published ? <a href={`/${active.key}/${e.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a> : <span>not published</span>}</p>
                    </div>
                    {badge(e)}
                    <button className="cms-btn cms-btn-sm" onClick={() => setEntryEdit(e)}>Edit</button>
                    <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => removeEntry(e)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
      </div>
    );
  }

  // Content types list
  const removeType = async (t) => { if (window.confirm(`Delete the "${t.label}" content type? Its entries stay in the database but won't render. This cannot be undone.`)) { await adminDeleteContentType(t.key); loadTypes(); } };
  return (
    <div>
      <div className="cms-pages-head">
        <p className="cms-intro" style={{ margin: 0, maxWidth: 620 }}>Define your own content types (like Webinars, Press, Events) — each with the fields you want. They get their own public pages automatically at <em>/your-type</em>.</p>
        <button className="cms-btn cms-btn-primary" onClick={() => setTypeEdit('new')}>+ New content type</button>
      </div>
      {types === null ? <p style={{ color: '#5c6370' }}>Loading…</p>
        : types.length === 0 ? <p style={{ color: '#5c6370' }}>No custom content types yet. Click “New content type” to create one.</p>
          : (
            <div className="cms-list">
              {types.map((t) => (
                <div className="cms-card" key={t.id}>
                  <div className="cms-card-main">
                    <p className="cms-card-title">{t.label}</p>
                    <p className="cms-card-meta">/{t.key} · {(t.fields || []).length} field{(t.fields || []).length === 1 ? '' : 's'}</p>
                  </div>
                  <button className="cms-btn cms-btn-sm cms-btn-primary" onClick={() => openEntries(t)}>Manage entries</button>
                  <button className="cms-btn cms-btn-sm" onClick={() => setTypeEdit(t)}>Edit type</button>
                  <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => removeType(t)}>Delete</button>
                </div>
              ))}
            </div>
          )}
    </div>
  );
}
