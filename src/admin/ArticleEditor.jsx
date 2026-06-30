import { useState, useEffect, useRef } from 'react';
import {
  adminSaveArticle, adminUploadImage, slugify,
  adminListArticleVersions, adminRestoreArticleVersion,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';

const BLANK = {
  slug: '', pillar: 'Methodology', topic: '', tags: '', featured: false, title: '', description: '',
  authorId: '', author: { name: '', role: '', bio: '', headshot: '' },
  date: '', readTime: '', summary: '',
  body: [], related: [], thumb: '', published: false, order: 0,
};

// ~200 wpm estimate from the body text, used when the read-time field is blank.
function estimateReadTime(body) {
  const text = body.map((b) => b.html || b.text || '').join(' ').replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : '';
}

// Build the initial form from an existing article, restoring per-heading nav
// labels from its toc so they survive editing.
function fromArticle(a) {
  if (!a) return JSON.parse(JSON.stringify(BLANK));
  const tocMap = Object.fromEntries((a.toc || []).map((t) => [t.id, t.label]));
  return {
    ...JSON.parse(JSON.stringify(BLANK)),
    ...a,
    author: { ...BLANK.author, ...(a.author || {}) },
    tags: Array.isArray(a.tags) ? a.tags.join(', ') : (a.tags || ''),
    body: (a.body || []).map((b) =>
      b.type === 'h2' ? { ...b, navLabel: tocMap[b.id] && tocMap[b.id] !== b.text ? tocMap[b.id] : '' } : { ...b }
    ),
  };
}

function newBlock(type) {
  if (type === 'h2') return { type: 'h2', text: '', id: '', navLabel: '' };
  if (type === 'quote') return { type: 'quote', text: '' };
  return { type: 'p', html: '' };
}

export default function ArticleEditor({ article, authors = [], knownTopics = [], onDone, onCancel }) {
  const isNew = !article;
  const initial = useRef(null);
  const [form, setForm] = useState(() => { const f = fromArticle(article); initial.current = JSON.stringify(f); return f; });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  // Once the slug is hand-edited, stop auto-deriving it from the title.
  const [slugDirty, setSlugDirty] = useState(!isNew);
  const titleRef = useRef(null);

  const dirty = JSON.stringify(form) !== initial.current;
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setAuthor = (k, v) => setForm((f) => ({ ...f, author: { ...f.author, [k]: v } }));

  // --- body blocks ---
  const setBlock = (i, patch) => setForm((f) => {
    const body = f.body.slice();
    body[i] = { ...body[i], ...patch };
    return { ...f, body };
  });
  const addBlock = (type) => setForm((f) => ({ ...f, body: [...f.body, newBlock(type)] }));
  const removeBlock = (i) => {
    const b = form.body[i];
    if ((b.html || b.text || '').trim() && !window.confirm('Delete this block? Its text will be lost.')) return;
    setForm((f) => ({ ...f, body: f.body.filter((_, j) => j !== i) }));
  };
  const moveBlock = (i, dir) => setForm((f) => {
    const j = i + dir;
    if (j < 0 || j >= f.body.length) return f;
    const body = f.body.slice();
    [body[i], body[j]] = [body[j], body[i]];
    return { ...f, body };
  });
  const changeType = (i, type) => setBlock(i, { ...newBlock(type) });

  const upload = async (file, apply) => {
    if (!file) return;
    setBusy(true); setError('');
    try { apply(await adminUploadImage(file)); }
    catch (e) { setError('Image upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Please add a title.'); titleRef.current?.focus(); return; }
    const slug = (form.slug.trim() || slugify(title));
    if (!slug) { setError('Please add a web address.'); return; }

    // Normalize body + derive TOC from headings. Anchor ids are made unique
    // (so duplicate headings don't collide); empty-text headings are kept in the
    // body but excluded from the TOC.
    const usedIds = new Set();
    const uniqueId = (raw) => {
      const base = (raw || '').trim() || 'section';
      let id = base, n = 2;
      while (usedIds.has(id)) id = `${base}-${n++}`;
      usedIds.add(id);
      return id;
    };
    const headings = [];
    const body = form.body.map((b) => {
      if (b.type === 'h2') {
        const text = (b.text || '').trim();
        const id = uniqueId((b.id || '').trim() || slugify(text));
        headings.push({ id, text, navLabel: (b.navLabel || '').trim() });
        return { type: 'h2', id, text };
      }
      if (b.type === 'quote') return { type: 'quote', text: (b.text || '').trim() };
      return { type: 'p', html: (b.html || '').trim() };
    });
    const toc = headings.filter((h) => h.text).map((h) => ({ id: h.id, label: h.navLabel || h.text }));

    const hasBody = body.some((b) => (b.type === 'p' && b.html) || (b.type === 'h2' && b.text) || (b.type === 'quote' && b.text));
    if (form.published && !hasBody && !window.confirm('This post has no body text yet. Publish it live anyway?')) return;

    const tags = String(form.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
    const article = {
      slug, pillar: form.pillar.trim(), topic: form.topic.trim(), tags, featured: !!form.featured,
      title, description: form.description.trim(),
      authorId: form.authorId || '',
      author: {
        name: form.author.name.trim(), role: form.author.role.trim(),
        bio: form.author.bio.trim(), headshot: form.author.headshot.trim(),
      },
      date: form.date.trim(), readTime: form.readTime.trim() || estimateReadTime(body),
      summary: form.summary.trim(), body, toc,
      related: form.related || [], thumb: form.thumb.trim(),
      published: !!form.published, order: Number(form.order) || 0,
    };

    setBusy(true);
    try {
      await adminSaveArticle(article, isNew);
      initial.current = JSON.stringify(form);
      setOkMsg(article.published ? 'Saved ✓ — it’s live now.' : 'Saved as draft ✓');
      setBusy(false);
      setTimeout(() => onDone(), 900);
    } catch (e) {
      setBusy(false);
      setError(/permission/i.test(e.message || '')
        ? 'Your session timed out — your text is safe. Log out and back in, then Save again.'
        : 'Save failed: ' + (e.message || e));
    }
  };

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>{isNew ? 'New article' : 'Edit article'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}

        {!isNew && (
          <VersionHistory
            label="this article"
            load={() => adminListArticleVersions(article.slug)}
            onRestore={async (vid) => {
              const snap = await adminRestoreArticleVersion(article.slug, vid);
              const f = fromArticle({ ...snap, slug: article.slug });
              initial.current = JSON.stringify(f);
              setForm(f);
              setOkMsg('Restored ✓ — the saved version now matches this.');
            }}
          />
        )}

        <div className="cms-field">
          <label>Title</label>
          <input ref={titleRef} className="cms-input" value={form.title}
            onChange={(e) => { const v = e.target.value; set('title', v); if (isNew && !slugDirty) set('slug', slugify(v)); }} />
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Web address</label>
            <input className="cms-input" value={form.slug} disabled={!isNew}
              onChange={(e) => { set('slug', slugify(e.target.value)); setSlugDirty(true); }} />
            <p className="cms-hint">/blog/{form.slug || '…'}{!isNew && ' · fixed after the post is created'}</p>
          </div>
          <div className="cms-field">
            <label>Category</label>
            <input className="cms-input" value={form.pillar} onChange={(e) => set('pillar', e.target.value)} />
          </div>
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Topic</label>
            <input className="cms-input" list="cms-known-topics" value={form.topic} onChange={(e) => set('topic', e.target.value)} />
            <datalist id="cms-known-topics">{knownTopics.map((t) => <option key={t} value={t} />)}</datalist>
            <p className="cms-hint">Pick an existing topic or type a new one — visitors can filter the blog by it.</p>
          </div>
          <div className="cms-field">
            <label>Tags</label>
            <input className="cms-input" value={form.tags} onChange={(e) => set('tags', e.target.value)} />
            <p className="cms-hint">Comma-separated, e.g. readiness, evidence.</p>
          </div>
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Date (e.g. June 22, 2026)</label>
            <input className="cms-input" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Read time (e.g. 7 min read)</label>
            <input className="cms-input" value={form.readTime} onChange={(e) => set('readTime', e.target.value)} />
            <p className="cms-hint">Leave blank to auto-calculate from the body.</p>
          </div>
        </div>

        <div className="cms-field">
          <label>Sort order (lower shows first on the blog; ties break by date)</label>
          <input className="cms-input" type="number" style={{ maxWidth: 160 }} value={form.order}
            onChange={(e) => set('order', e.target.value)} />
        </div>

        <div className="cms-field">
          <label>Search &amp; share preview text</label>
          <textarea className="cms-textarea" style={{ minHeight: 64 }} value={form.description}
            onChange={(e) => set('description', e.target.value)} />
          <p className="cms-hint">Shown in Google results and link previews. ~1–2 sentences.</p>
        </div>

        <div className="cms-field">
          <label>Summary (the highlighted intro box)</label>
          <textarea className="cms-textarea" value={form.summary} onChange={(e) => set('summary', e.target.value)} />
        </div>

        <div className="cms-field">
          <label>Hero / card thumbnail</label>
          <input className="cms-input" placeholder="Image URL" value={form.thumb} onChange={(e) => set('thumb', e.target.value)} />
          <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }}
            onChange={(e) => upload(e.target.files[0], (url) => set('thumb', url))} />
          {form.thumb && <img className="cms-thumb-prev" src={form.thumb} alt="" />}
        </div>

        {/* Body */}
        <div className="cms-section-h">
          Body
          <label className="cms-adv-toggle">
            <input type="checkbox" checked={showAdvanced} onChange={(e) => setShowAdvanced(e.target.checked)} /> Advanced
          </label>
        </div>
        {form.body.map((b, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-block-head">
              <select className="cms-select" value={b.type} onChange={(e) => changeType(i, e.target.value)}>
                <option value="p">Paragraph</option>
                <option value="h2">Heading</option>
                <option value="quote">Quote</option>
              </select>
              <div className="cms-block-spacer" />
              <button className="cms-iconbtn" title="Move up" onClick={() => moveBlock(i, -1)} disabled={i === 0}>↑</button>
              <button className="cms-iconbtn" title="Move down" onClick={() => moveBlock(i, 1)} disabled={i === form.body.length - 1}>↓</button>
              <button className="cms-iconbtn" title="Delete" onClick={() => removeBlock(i)}>✕</button>
            </div>
            {b.type === 'h2' ? (
              <>
                <input className="cms-input" placeholder="Heading text" value={b.text || ''}
                  onChange={(e) => setBlock(i, { text: e.target.value })} />
                {showAdvanced && (
                  <div className="cms-row" style={{ marginTop: 10 }}>
                    <input className="cms-input" placeholder="Link anchor (auto from text if blank)" value={b.id || ''}
                      onChange={(e) => setBlock(i, { id: slugify(e.target.value) })} />
                    <input className="cms-input" placeholder="Short label for contents list (optional)" value={b.navLabel || ''}
                      onChange={(e) => setBlock(i, { navLabel: e.target.value })} />
                  </div>
                )}
              </>
            ) : (
              <textarea className="cms-textarea" placeholder={b.type === 'quote' ? 'Quote text' : 'Paragraph text'}
                value={b.type === 'quote' ? (b.text || '') : (b.html || '')}
                onChange={(e) => setBlock(i, b.type === 'quote' ? { text: e.target.value } : { html: e.target.value })} />
            )}
          </div>
        ))}
        <div className="cms-addrow">
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('p')}>+ Paragraph</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('h2')}>+ Heading</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('quote')}>+ Pull quote</button>
        </div>

        {/* Author */}
        <div className="cms-section-h">Author</div>
        {authors.length > 0 && (
          <div className="cms-field">
            <label>Use a saved author</label>
            <select className="cms-select" value={form.authorId || ''} onChange={(e) => {
              const a = authors.find((x) => x.id === e.target.value);
              if (a) setForm((f) => ({ ...f, authorId: a.id, author: { name: a.name || '', role: a.title || '', bio: a.bio || '', headshot: a.headshot || '' } }));
              else setForm((f) => ({ ...f, authorId: '' }));
            }}>
              <option value="">— manual entry —</option>
              {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <p className="cms-hint">Pick a saved author to fill the fields below, or leave on “manual entry”.</p>
          </div>
        )}
        <div className="cms-row">
          <div className="cms-field">
            <label>Name</label>
            <input className="cms-input" value={form.author.name} onChange={(e) => setAuthor('name', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Role</label>
            <input className="cms-input" value={form.author.role} onChange={(e) => setAuthor('role', e.target.value)} />
          </div>
        </div>
        <div className="cms-field">
          <label>Bio</label>
          <textarea className="cms-textarea" style={{ minHeight: 64 }} value={form.author.bio} onChange={(e) => setAuthor('bio', e.target.value)} />
        </div>
        <div className="cms-field">
          <label>Headshot</label>
          <input className="cms-input" placeholder="Image URL" value={form.author.headshot} onChange={(e) => setAuthor('headshot', e.target.value)} />
          <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }}
            onChange={(e) => upload(e.target.files[0], (url) => setAuthor('headshot', url))} />
        </div>

        {/* Publish */}
        <div className="cms-toolbar">
          <label className="cms-check">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
            Featured
          </label>
          <label className="cms-check">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
            Published (visible on the public site)
          </label>
          <div className="cms-toolbar-spacer" />
          {okMsg && <span className="cms-ok" style={{ marginRight: 12 }}>{okMsg}</span>}
          {error && <span className="cms-err-inline" style={{ marginRight: 12 }}>{error}</span>}
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
