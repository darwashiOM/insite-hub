import { useState } from 'react';
import { adminSaveArticle, adminUploadImage, slugify } from '../lib/adminBlog';

const BLANK = {
  slug: '', pillar: 'Methodology', title: '', description: '',
  author: { name: '', role: '', bio: '', headshot: '' },
  date: '', readTime: '', summary: '',
  body: [], related: [], thumb: '', published: false, order: 0,
};

// Build the initial form from an existing article, restoring per-heading nav
// labels from its toc so they survive editing.
function fromArticle(a) {
  if (!a) return JSON.parse(JSON.stringify(BLANK));
  const tocMap = Object.fromEntries((a.toc || []).map((t) => [t.id, t.label]));
  return {
    ...JSON.parse(JSON.stringify(BLANK)),
    ...a,
    author: { ...BLANK.author, ...(a.author || {}) },
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

export default function ArticleEditor({ article, onDone, onCancel }) {
  const isNew = !article;
  const [form, setForm] = useState(() => fromArticle(article));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setAuthor = (k, v) => setForm((f) => ({ ...f, author: { ...f.author, [k]: v } }));

  // --- body blocks ---
  const setBlock = (i, patch) => setForm((f) => {
    const body = f.body.slice();
    body[i] = { ...body[i], ...patch };
    return { ...f, body };
  });
  const addBlock = (type) => setForm((f) => ({ ...f, body: [...f.body, newBlock(type)] }));
  const removeBlock = (i) => setForm((f) => ({ ...f, body: f.body.filter((_, j) => j !== i) }));
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
    setError('');
    const title = form.title.trim();
    if (!title) { setError('Title is required.'); return; }
    const slug = (form.slug.trim() || slugify(title));
    if (!slug) { setError('A valid slug is required.'); return; }

    // Normalize body + derive TOC from headings.
    const body = form.body.map((b) => {
      if (b.type === 'h2') {
        const id = (b.id || '').trim() || slugify(b.text || '');
        return { type: 'h2', id, text: (b.text || '').trim() };
      }
      if (b.type === 'quote') return { type: 'quote', text: (b.text || '').trim() };
      return { type: 'p', html: (b.html || '').trim() };
    });
    const toc = form.body
      .filter((b) => b.type === 'h2')
      .map((b) => {
        const id = (b.id || '').trim() || slugify(b.text || '');
        return { id, label: (b.navLabel || '').trim() || (b.text || '').trim() };
      });

    const article = {
      slug, pillar: form.pillar.trim(), title, description: form.description.trim(),
      author: {
        name: form.author.name.trim(), role: form.author.role.trim(),
        bio: form.author.bio.trim(), headshot: form.author.headshot.trim(),
      },
      date: form.date.trim(), readTime: form.readTime.trim(),
      summary: form.summary.trim(), body, toc,
      related: form.related || [], thumb: form.thumb.trim(),
      published: !!form.published, order: Number(form.order) || 0,
    };

    setBusy(true);
    try {
      await adminSaveArticle(article);
      onDone();
    } catch (e) {
      setError('Save failed: ' + (e.message || e));
      setBusy(false);
    }
  };

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>{isNew ? 'New article' : 'Edit article'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}

        <div className="cms-field">
          <label>Title</label>
          <input className="cms-input" value={form.title}
            onChange={(e) => { const v = e.target.value; set('title', v); if (isNew) set('slug', slugify(v)); }} />
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Slug (URL)</label>
            <input className="cms-input" value={form.slug} disabled={!isNew}
              onChange={(e) => set('slug', slugify(e.target.value))} />
            <p className="cms-hint">/blog/{form.slug || '…'}{!isNew && ' · fixed after creation'}</p>
          </div>
          <div className="cms-field">
            <label>Pillar / eyebrow</label>
            <input className="cms-input" value={form.pillar} onChange={(e) => set('pillar', e.target.value)} />
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
          </div>
        </div>

        <div className="cms-field">
          <label>SEO description</label>
          <textarea className="cms-textarea" style={{ minHeight: 64 }} value={form.description}
            onChange={(e) => set('description', e.target.value)} />
        </div>

        <div className="cms-field">
          <label>Summary box (HTML allowed, e.g. &lt;strong&gt;)</label>
          <textarea className="cms-textarea" value={form.summary} onChange={(e) => set('summary', e.target.value)} />
        </div>

        <div className="cms-field">
          <label>Hero / card thumbnail</label>
          <input className="cms-input" placeholder="Image URL" value={form.thumb} onChange={(e) => set('thumb', e.target.value)} />
          <input type="file" accept="image/*" style={{ marginTop: 8 }}
            onChange={(e) => upload(e.target.files[0], (url) => set('thumb', url))} />
          {form.thumb && <img className="cms-thumb-prev" src={form.thumb} alt="" />}
        </div>

        {/* Body */}
        <div className="cms-section-h">Body</div>
        {form.body.map((b, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-block-head">
              <select className="cms-select" value={b.type} onChange={(e) => changeType(i, e.target.value)}>
                <option value="p">Paragraph</option>
                <option value="h2">Heading</option>
                <option value="quote">Pull quote</option>
              </select>
              <div className="cms-block-spacer" />
              <button className="cms-iconbtn" title="Move up" onClick={() => moveBlock(i, -1)}>↑</button>
              <button className="cms-iconbtn" title="Move down" onClick={() => moveBlock(i, 1)}>↓</button>
              <button className="cms-iconbtn" title="Delete" onClick={() => removeBlock(i)}>✕</button>
            </div>
            {b.type === 'h2' ? (
              <>
                <input className="cms-input" placeholder="Heading text" value={b.text || ''}
                  onChange={(e) => setBlock(i, { text: e.target.value })} />
                <div className="cms-row" style={{ marginTop: 10 }}>
                  <input className="cms-input" placeholder="Anchor id (auto from text if blank)" value={b.id || ''}
                    onChange={(e) => setBlock(i, { id: slugify(e.target.value) })} />
                  <input className="cms-input" placeholder="Short nav label (optional)" value={b.navLabel || ''}
                    onChange={(e) => setBlock(i, { navLabel: e.target.value })} />
                </div>
              </>
            ) : (
              <textarea className="cms-textarea" placeholder={b.type === 'quote' ? 'Quote text' : 'Paragraph (HTML allowed)'}
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
          <input type="file" accept="image/*" style={{ marginTop: 8 }}
            onChange={(e) => upload(e.target.files[0], (url) => setAuthor('headshot', url))} />
        </div>

        {/* Publish */}
        <div className="cms-toolbar">
          <label className="cms-check">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
            Published (visible on the public site)
          </label>
          <div className="cms-toolbar-spacer" />
          <button className="cms-btn" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
