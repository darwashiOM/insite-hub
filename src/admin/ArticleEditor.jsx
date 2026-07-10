import { useState, useEffect, useRef } from 'react';
import {
  adminSaveArticle, adminUploadImage, slugify,
  adminListArticleVersions, adminRestoreArticleVersion, adminGetPageContent,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';
import { useDraftBackup, useSaveShortcut, useFadingMessage } from './useEditorSafety';
import RestoreBanner from './RestoreBanner';
import PublishSummary from './PublishSummary';
import SeoPreview, { CharCount } from './SeoPreview';
import SeoChecklist from './SeoChecklist';
import { articleChecks, bodyWords } from './seoChecks';
import { DEFAULT_CATEGORIES } from './categories';
import StatusSelect from './StatusSelect';
import { statusOf } from './status';
import RichText from './RichText';
import ArticleLayout from '../components/ArticleLayout';

const BLANK = {
  slug: '', pillar: 'News', topic: '', tags: '', featured: false, title: '', description: '',
  metaTitle: '', canonical: '', ogImage: '', noindex: false,
  authorId: '', author: { name: '', role: '', bio: '', headshot: '' },
  date: '', readTime: '', summary: '',
  body: [], related: [], thumb: '', published: false, publishAt: '', order: 0,
  showHero: true, hideSummary: false, hideAuthor: false,
};

// ~200 wpm estimate from the body text (all block types), used when the
// read-time field is blank.
function estimateReadTime(body) {
  const words = bodyWords(body);
  return words ? `${Math.max(1, Math.round(words / 200))} min read` : '';
}

// millis -> "YYYY-MM-DDTHH:mm" (local) for a datetime-local input, and back.
function toLocalDatetime(ms) {
  const d = new Date(ms); const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Build the initial form from an existing article, restoring per-heading nav
// labels from its toc so they survive editing.
function fromArticle(a) {
  if (!a) return { ...JSON.parse(JSON.stringify(BLANK)), status: statusOf(null) };
  const tocMap = Object.fromEntries((a.toc || []).map((t) => [t.id, t.label]));
  return {
    ...JSON.parse(JSON.stringify(BLANK)),
    ...a,
    showHero: a.showHero === true, // existing posts don't suddenly grow a hero image
    hideSummary: a.hideSummary === true,
    hideAuthor: a.hideAuthor === true,
    author: { ...BLANK.author, ...(a.author || {}) },
    tags: Array.isArray(a.tags) ? a.tags.join(', ') : (a.tags || ''),
    publishAt: a.publishAt ? toLocalDatetime(a.publishAt) : '',
    status: statusOf(a),
    body: (a.body || []).map((b) =>
      b.type === 'h2' ? { _k: nextKey(), ...b, navLabel: tocMap[b.id] && tocMap[b.id] !== b.text ? tocMap[b.id] : '' } : { _k: nextKey(), ...b }
    ),
  };
}

let blockKeySeq = 0;
const nextKey = () => (blockKeySeq += 1);

function newBlock(type) {
  const _k = nextKey();
  if (type === 'h2') return { _k, type: 'h2', level: 2, text: '', id: '', navLabel: '' };
  if (type === 'quote') return { _k, type: 'quote', text: '' };
  if (type === 'image') return { _k, type: 'image', src: '', alt: '', caption: '' };
  if (type === 'takeaways') return { _k, type: 'takeaways', items: [''] };
  if (type === 'faq') return { _k, type: 'faq', items: [{ q: '', a: '' }] };
  return { _k, type: 'p', html: '' };
}

export default function ArticleEditor({ article, authors = [], knownTopics = [], onCancel }) {
  const isNew = !article;
  const initial = useRef(null);
  const [form, setForm] = useState(() => { const f = fromArticle(article); initial.current = JSON.stringify(f); return f; });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  useEffect(() => {
    let alive = true;
    adminGetPageContent('blogSettings')
      .then((d) => { if (alive && Array.isArray(d.categories) && d.categories.length) setCategories(d.categories); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  const [previewOpen, setPreviewOpen] = useState(false);
  // Once the slug is hand-edited, stop auto-deriving it from the title.
  const [slugDirty, setSlugDirty] = useState(!isNew);
  // After the first successful save of a new post, further saves update it in place.
  const [savedOnce, setSavedOnce] = useState(false);
  // The slug the doc was actually created under — keeps the crash-backup key on
  // the real document once a "new" item exists.
  const [savedSlug, setSavedSlug] = useState(null);
  const createMode = isNew && !savedOnce;
  const titleRef = useRef(null);

  const dirty = JSON.stringify(form) !== initial.current;
  const { backup, clear: clearBackup } = useDraftBackup(`article:${article?.slug || savedSlug || 'new'}`, form, dirty, initial.current);
  useFadingMessage(okMsg, setOkMsg);
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => {
    if (dirty) {
      if (!window.confirm('Discard your unsaved changes?')) return;
      clearBackup();
    }
    onCancel();
  };

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
    if (((b.html || b.text || b.src || '').trim() || (b.items || []).length) && !window.confirm('Delete this block? Its content will be lost.')) return;
    setForm((f) => ({ ...f, body: f.body.filter((_, j) => j !== i) }));
  };
  const moveBlock = (i, dir) => setForm((f) => {
    const j = i + dir;
    if (j < 0 || j >= f.body.length) return f;
    const body = f.body.slice();
    [body[i], body[j]] = [body[j], body[i]];
    return { ...f, body };
  });
  // Pasting several paragraphs into a paragraph block splits them into separate
  // blocks (replacing the block if it was empty, inserting after it otherwise).
  const splitParagraphPaste = (i, parts) => setForm((f) => {
    const body = f.body.slice();
    const blocks = parts.map((html) => ({ _k: nextKey(), type: 'p', html }));
    const empty = !(body[i].html || '').replace(/<[^>]*>/g, '').trim();
    body.splice(empty ? i : i + 1, empty ? 1 : 0, ...blocks);
    return { ...f, body };
  });

  const changeType = (i, type) => {
    const b = form.body[i];
    if (b.type === type) return;
    const hasContent = ((b.html || b.text || b.src || '').trim() || (b.items || []).length);
    if (hasContent && !window.confirm('Changing the type clears this block’s content. Continue?')) return;
    setForm((f) => { const body = f.body.slice(); body[i] = newBlock(type); return { ...f, body }; });
  };

  const upload = async (file, apply) => {
    if (!file) return;
    setBusy(true); setError(''); setUploading(true); setUploadError('');
    try { apply(await adminUploadImage(file)); }
    catch (e) { setUploadError('Upload failed: ' + (e.message || e)); }
    finally { setBusy(false); setUploading(false); }
  };

  // Build the saved-shape article from the current form (body normalized + TOC
  // derived). Anchor ids are made unique so duplicate headings don't collide.
  // Shared by Save and the live Preview.
  const buildArticle = () => {
    const title = form.title.trim();
    const slug = (form.slug.trim() || slugify(title));
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
        const level = b.level === 3 ? 3 : b.level === 4 ? 4 : 2;
        if (level === 2) headings.push({ id, text, navLabel: (b.navLabel || '').trim() });
        return { type: 'h2', level, id, text };
      }
      if (b.type === 'quote') return { type: 'quote', text: (b.text || '').trim() };
      if (b.type === 'image') return { type: 'image', src: (b.src || '').trim(), alt: (b.alt || '').trim(), caption: (b.caption || '').trim() };
      if (b.type === 'takeaways') return { type: 'takeaways', items: (b.items || []).map((t) => String(t).trim()).filter(Boolean) };
      if (b.type === 'faq') return { type: 'faq', items: (b.items || []).map((f) => ({ q: (f.q || '').trim(), a: (f.a || '').trim() })).filter((f) => f.q && f.a) };
      return { type: 'p', html: (b.html || '').trim() };
    });
    const toc = headings.filter((h) => h.text).map((h) => ({ id: h.id, label: h.navLabel || h.text }));
    const tags = String(form.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
    // A publish time only applies while unpublished; publishing now clears it. Keep
    // it even if the time has already passed (e.g. an incidental re-save after the
    // scheduled moment) — the scheduler publishes a past-due time on its next run,
    // so we don't silently drop the schedule and turn the post into a plain draft.
    const published = form.status === 'published';
    const scheduledMs = (!published && form.publishAt) ? Date.parse(form.publishAt) : NaN;
    const isScheduled = !Number.isNaN(scheduledMs);
    return {
      slug, pillar: form.pillar.trim(), topic: form.topic.trim(), tags, featured: !!form.featured,
      title, description: form.description.trim(),
      metaTitle: form.metaTitle.trim(), canonical: form.canonical.trim(), ogImage: form.ogImage.trim(), noindex: !!form.noindex,
      authorId: form.authorId || '',
      author: {
        name: form.author.name.trim(), role: form.author.role.trim(),
        bio: form.author.bio.trim(), headshot: form.author.headshot.trim(),
      },
      date: form.date.trim(), readTime: form.readTime.trim() || estimateReadTime(body),
      showHero: !!form.showHero, hideSummary: !!form.hideSummary, hideAuthor: !!form.hideAuthor,
      summary: form.summary.trim(), body, toc,
      related: form.related || [], thumb: form.thumb.trim(),
      published, status: form.status, order: Number(form.order) || 0,
      ...(isScheduled ? { publishAt: scheduledMs } : {}),
    };
  };

  const save = async () => {
    if (busy) return; // Cmd+S must respect an in-flight save/upload like the button does
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Please add a title.'); titleRef.current?.focus(); return; }
    if (!(form.slug.trim() || slugify(title))) { setError('Please add a web address.'); return; }
    const article = buildArticle();
    const hasBody = article.body.some((b) => (b.type === 'p' && b.html) || (b.type === 'h2' && b.text) || (b.type === 'quote' && b.text) || (b.type === 'image' && b.src) || ((b.type === 'takeaways' || b.type === 'faq') && (b.items || []).length));
    if (article.published && !hasBody && !window.confirm('This post has no body text yet. Publish it live anyway?')) return;
    const halfFaq = form.body.some((b) => b.type === 'faq' && (b.items || []).some((f) => !!(f.q || '').trim() !== !!(f.a || '').trim()));
    if (halfFaq && !window.confirm('Some FAQ items are missing a question or an answer — those won’t be shown on the site. Save anyway?')) return;

    setBusy(true);
    try {
      await adminSaveArticle(article, createMode);
      clearBackup(); // clears under the pre-save key before it switches to the real slug
      // Write the actual slug back into the form: later saves must keep updating
      // THIS document, never derive a new slug from an edited title.
      const savedForm = { ...form, slug: article.slug };
      initial.current = JSON.stringify(savedForm);
      setForm(savedForm);
      setSavedOnce(true);
      setSavedSlug(article.slug);
      setOkMsg(article.published ? 'Saved ✓ — it’s live now. Keep writing, or hit Back when you’re done.'
        : article.publishAt ? `Saved ✓ — scheduled for ${new Date(article.publishAt).toLocaleString()}`
        : form.status === 'review' ? 'Saved — ready for review ✓'
        : 'Saved as draft ✓');
      setBusy(false);
    } catch (e) {
      setBusy(false);
      setError(/permission/i.test(e.message || '')
        ? 'Your session timed out — your text is safe. Log out and back in, then Save again.'
        : 'Save failed: ' + (e.message || e));
    }
  };

  useSaveShortcut(save);

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>{createMode ? 'New article' : 'Edit article'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={() => setPreviewOpen(true)} disabled={busy}>Preview</button>
          <button className="cms-btn" onClick={cancel} disabled={busy}>{dirty ? 'Cancel' : 'Back'}</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}
        <RestoreBanner backup={backup} initialJson={initial.current}
          onRestore={() => { setForm(backup.form); setSlugDirty(true); clearBackup(); setOkMsg('Restored your unsaved edits ✓ — hit Save to keep them.'); }}
          onDiscard={clearBackup} />

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
            onChange={(e) => { const v = e.target.value; set('title', v); if (createMode && !slugDirty) set('slug', slugify(v)); }} />
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Web address</label>
            <input className="cms-input" value={form.slug} disabled={!createMode}
              onChange={(e) => { set('slug', slugify(e.target.value)); setSlugDirty(true); }} />
            <p className="cms-hint">/blog/{form.slug || '…'}{!createMode && ' · fixed after the post is created'}</p>
          </div>
          <div className="cms-field">
            <label>Category</label>
            <select className="cms-select" value={form.pillar} onChange={(e) => set('pillar', e.target.value)}>
              {[...new Set([...categories, form.pillar].filter(Boolean))].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <p className="cms-hint">Edit the list of categories from the Blog tab (“Edit categories”).</p>
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
          <CharCount value={form.description} max={160} />
          <p className="cms-hint">Shown in Google results and link previews. ~1–2 sentences.</p>
        </div>

        <div className="cms-section-h">Search &amp; sharing (optional)</div>
        <div className="cms-field">
          <label>Browser / search title</label>
          <input className="cms-input" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)}
            placeholder={form.title ? `${form.title} · Proxa Labs` : 'Uses the title'} />
          <CharCount value={form.metaTitle} max={60} />
          <p className="cms-hint">Overrides the title in the browser tab and Google. Leave blank to use the headline.</p>
        </div>
        <SeoPreview title={form.metaTitle || (form.title ? `${form.title} · Proxa Labs` : '')}
          description={form.description} path={`/blog/${form.slug || '…'}`} />
        <SeoChecklist checks={articleChecks(form)} />
        <div className="cms-row">
          <div className="cms-field">
            <label>Canonical URL</label>
            <input className="cms-input" value={form.canonical} onChange={(e) => set('canonical', e.target.value)} />
            {form.canonical.trim() && !/^https?:\/\//.test(form.canonical.trim())
              ? <p className="cms-hint cms-count-over">Must be a full address starting with https://</p>
              : <p className="cms-hint">Only if this post duplicates another page. Leave blank otherwise.</p>}
          </div>
          <div className="cms-field">
            <label>Social share image</label>
            <input className="cms-input" placeholder={form.thumb ? 'Uses the thumbnail image' : 'Image URL'} value={form.ogImage} onChange={(e) => set('ogImage', e.target.value)} />
            <p className="cms-hint">For link previews. Falls back to the hero image.</p>
          </div>
        </div>
        <div className="cms-field">
          <label className="cms-check">
            <input type="checkbox" checked={form.noindex} onChange={(e) => set('noindex', e.target.checked)} />
            Hide this post from search engines (no-index)
          </label>
          {form.noindex && <p className="cms-noindex-warn">⚠ Google and other search engines will drop this post. Leave off unless you’re sure.</p>}
        </div>

        <div className="cms-field">
          <label>Summary (the highlighted intro box)</label>
          <textarea className="cms-textarea" value={form.summary} onChange={(e) => set('summary', e.target.value)} />
          <label className="cms-check" style={{ marginTop: 8 }}>
            <input type="checkbox" checked={form.hideSummary} onChange={(e) => set('hideSummary', e.target.checked)} />
            Don’t show the summary box on the post (it’s still used for search results and blog cards)
          </label>
        </div>

        <div className="cms-field">
          <label>Hero / card thumbnail</label>
          <input className="cms-input" placeholder="Image URL" value={form.thumb} onChange={(e) => set('thumb', e.target.value)} />
          <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }}
            onChange={(e) => upload(e.target.files[0], (url) => set('thumb', url))} />
          {uploading && <p className="cms-hint">Uploading…</p>}
          {uploadError && <p className="cms-hint cms-count-over">{uploadError}</p>}
          {form.thumb && <img className="cms-thumb-prev" src={form.thumb} alt="" />}
          <label className="cms-check" style={{ marginTop: 8 }}>
            <input type="checkbox" checked={form.showHero} onChange={(e) => set('showHero', e.target.checked)} />
            Show this image at the top of the post (it’s always the blog-card image)
          </label>
        </div>

        {/* Body */}
        <div className="cms-section-h">
          Body
          {(() => {
            const words = bodyWords(form.body);
            return words > 0 && <span className="cms-wordcount">{words.toLocaleString()} words · ~{Math.max(1, Math.round(words / 200))} min read</span>;
          })()}
          <label className="cms-adv-toggle">
            <input type="checkbox" checked={showAdvanced} onChange={(e) => setShowAdvanced(e.target.checked)} /> Advanced
          </label>
        </div>
        {form.body.map((b, i) => (
          <div className="cms-block" key={b._k ?? i}>
            <div className="cms-block-head">
              <select className="cms-select" value={b.type} onChange={(e) => changeType(i, e.target.value)}>
                <option value="p">Paragraph</option>
                <option value="h2">Heading</option>
                <option value="quote">Quote</option>
                <option value="image">Image</option>
                <option value="takeaways">Key takeaways</option>
                <option value="faq">FAQ (Q&amp;A)</option>
              </select>
              <div className="cms-block-spacer" />
              <button className="cms-iconbtn" title="Move up" onClick={() => moveBlock(i, -1)} disabled={i === 0}>↑</button>
              <button className="cms-iconbtn" title="Move down" onClick={() => moveBlock(i, 1)} disabled={i === form.body.length - 1}>↓</button>
              <button className="cms-iconbtn" title="Delete" onClick={() => removeBlock(i)}>✕</button>
            </div>
            {b.type === 'h2' ? (
              <>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select className="cms-select" style={{ maxWidth: 130 }} value={b.level || 2}
                    onChange={(e) => setBlock(i, { level: Number(e.target.value) })}>
                    <option value={2}>Heading</option>
                    <option value={3}>Subheading</option>
                    <option value={4}>Small heading</option>
                  </select>
                  <input className="cms-input" placeholder="Heading text" value={b.text || ''}
                    onChange={(e) => setBlock(i, { text: e.target.value })} />
                </div>
                {showAdvanced && (
                  <div className="cms-row" style={{ marginTop: 10 }}>
                    <input className="cms-input" placeholder="Link anchor (auto from text if blank)" value={b.id || ''}
                      onChange={(e) => setBlock(i, { id: slugify(e.target.value) })} />
                    <input className="cms-input" placeholder="Short label for contents list (optional)" value={b.navLabel || ''}
                      onChange={(e) => setBlock(i, { navLabel: e.target.value })} />
                  </div>
                )}
              </>
            ) : b.type === 'quote' ? (
              <textarea className="cms-textarea" placeholder="Quote text"
                value={b.text || ''} onChange={(e) => setBlock(i, { text: e.target.value })} />
            ) : b.type === 'image' ? (
              <>
                <input className="cms-input" placeholder="Image URL (or upload below)" value={b.src || ''}
                  onChange={(e) => setBlock(i, { src: e.target.value })} />
                <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }}
                  onChange={(e) => upload(e.target.files[0], (url) => setBlock(i, { src: url }))} />
                {b.src && <img className="cms-thumb-prev" src={b.src} alt="" />}
                <div className="cms-row" style={{ marginTop: 10 }}>
                  <input className="cms-input" placeholder="Describe the image (alt text — helps accessibility & SEO)" value={b.alt || ''}
                    onChange={(e) => setBlock(i, { alt: e.target.value })} />
                  <input className="cms-input" placeholder="Caption (optional, shows under the image)" value={b.caption || ''}
                    onChange={(e) => setBlock(i, { caption: e.target.value })} />
                </div>
              </>
            ) : b.type === 'takeaways' ? (
              <>
                <p className="cms-hint" style={{ marginBottom: 8 }}>A short bulleted summary — great for readers in a hurry, Google snippets and AI answers.</p>
                {(b.items || []).map((t, j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input className="cms-input" placeholder={`Takeaway ${j + 1}`} value={t}
                      onChange={(e) => setBlock(i, { items: b.items.map((x, k) => (k === j ? e.target.value : x)) })} />
                    <button className="cms-iconbtn" title="Remove" onClick={() => setBlock(i, { items: b.items.filter((_, k) => k !== j) })}>✕</button>
                  </div>
                ))}
                <button className="cms-btn cms-btn-sm" onClick={() => setBlock(i, { items: [...(b.items || []), ''] })}>+ Add takeaway</button>
              </>
            ) : b.type === 'faq' ? (
              <>
                <p className="cms-hint" style={{ marginBottom: 8 }}>Questions &amp; answers — shown on the post and marked up so Google and AI tools can quote them directly.</p>
                {(b.items || []).map((f, j) => (
                  <div key={j} style={{ border: '1px solid var(--br, #e3e5ea)', borderRadius: 9, padding: 10, marginBottom: 10 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input className="cms-input" placeholder="Question" value={f.q}
                        onChange={(e) => setBlock(i, { items: b.items.map((x, k) => (k === j ? { ...x, q: e.target.value } : x)) })} />
                      <button className="cms-iconbtn" title="Remove" onClick={() => setBlock(i, { items: b.items.filter((_, k) => k !== j) })}>✕</button>
                    </div>
                    <textarea className="cms-textarea" style={{ minHeight: 56, marginTop: 8 }} placeholder="Answer — a couple of clear sentences that stand on their own"
                      value={f.a} onChange={(e) => setBlock(i, { items: b.items.map((x, k) => (k === j ? { ...x, a: e.target.value } : x)) })} />
                  </div>
                ))}
                <button className="cms-btn cms-btn-sm" onClick={() => setBlock(i, { items: [...(b.items || []), { q: '', a: '' }] })}>+ Add question</button>
              </>
            ) : (
              <RichText value={b.html || ''} placeholder="Paragraph text — paste a whole document and it splits into paragraphs"
                onChange={(v) => setBlock(i, { html: v })} onSplitPaste={(parts) => splitParagraphPaste(i, parts)} />
            )}
          </div>
        ))}
        <div className="cms-addrow">
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('p')}>+ Paragraph</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('h2')}>+ Heading</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('quote')}>+ Pull quote</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('image')}>+ Image</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('takeaways')}>+ Key takeaways</button>
          <button className="cms-btn cms-btn-sm" onClick={() => addBlock('faq')}>+ FAQ</button>
        </div>

        {/* Author */}
        <div className="cms-section-h">Author</div>
        <label className="cms-check" style={{ marginBottom: 14 }}>
          <input type="checkbox" checked={form.hideAuthor} onChange={(e) => set('hideAuthor', e.target.checked)} />
          Hide the author on this post (no byline or author box)
        </label>
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

        {form.status !== 'published' && (
          <div className="cms-field">
            <label>Schedule publish for later (optional)</label>
            <input className="cms-input" type="datetime-local" style={{ maxWidth: 260 }} value={form.publishAt} onChange={(e) => set('publishAt', e.target.value)} />
            <p className="cms-hint">Leave blank to keep it a draft. Set a future time and it goes live automatically then.</p>
          </div>
        )}

        {/* Publish */}
        <PublishSummary status={form.status} publishAt={form.publishAt} />
        <div className="cms-toolbar">
          <label className="cms-check">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
            Featured
          </label>
          <StatusSelect value={form.status} onChange={(v) => set('status', v)} />
          <div className="cms-toolbar-spacer" />
          {okMsg && <span className="cms-ok" style={{ marginRight: 12 }}>{okMsg}</span>}
          {error && <span className="cms-err-inline" style={{ marginRight: 12 }}>{error}</span>}
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      {previewOpen && (
        <div className="cms-preview-overlay">
          <div className="cms-preview-bar">
            <span>Preview — how this article will look. Nothing is saved.</span>
            <button className="cms-btn cms-btn-sm" onClick={() => setPreviewOpen(false)}>Close preview</button>
          </div>
          <div className="cms-preview-body">
            <ArticleLayout article={buildArticle()} />
          </div>
        </div>
      )}
    </div>
  );
}
