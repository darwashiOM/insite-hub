import { useState, useEffect, useRef } from 'react';
import { adminSavePage, slugify, adminListPageDocVersions, adminRestorePageDocVersion } from '../lib/adminBlog';
import { SECTION_KIT, SECTION_TYPES } from '../lib/pageSections';
import SectionFieldEditor from './SectionFieldEditor';
import SectionRenderer from '../components/SectionRenderer';
import VersionHistory from './VersionHistory';
import SeoPreview, { CharCount } from './SeoPreview';
import SeoChecklist from './SeoChecklist';
import { pageChecks } from './seoChecks';
import StatusSelect from './StatusSelect';
import { statusOf } from './status';

const BLANK = { slug: '', title: '', description: '', metaTitle: '', ogImage: '', canonical: '', structuredType: '', customCode: '', noindex: false, sections: [], published: false };

// Plain-language blurbs for the "add a section" cards.
const SECTION_DESCS = {
  hero: 'Big opening banner — headline, subtext and buttons',
  split: 'Text on one side, an image on the other',
  richText: 'Free-form formatted text',
  cards: 'A grid of small cards — features, benefits, steps',
  stats: 'A row of big numbers (“40% faster …”)',
  quote: 'A standout customer quote',
  cta: 'A colored call-to-action band with a button',
  faq: 'Questions & answers (also feeds Google’s FAQ results)',
  logoStrip: 'A row of client or partner logos',
  form: 'Drop in one of your forms to capture leads',
};

// First bit of text in a section, for the collapsed header.
const sectionSnippet = (s) => {
  const v = Object.values(s.data || {}).find((x) => typeof x === 'string' && x.trim());
  return v ? v.replace(/<[^>]+>/g, '').trim().slice(0, 64) : '';
};

const stripUi = (f) => JSON.stringify({ ...f, sections: f.sections.map((s) => ({ type: s.type, data: s.data })) });

const fromPage = (p) => {
  const sections = ((p && p.sections) || []).map((s) => ({ type: s.type, data: { ...(s.data || {}) } }));
  // small pages open expanded; long pages start collapsed so the structure reads at a glance
  sections.forEach((s) => { s._open = sections.length <= 2; });
  return { ...BLANK, ...(p || {}), sections, status: statusOf(p) };
};

export default function PageBuilder({ page, isAdmin = true, onDone, onCancel }) {
  const isNew = !page;
  const [form, setForm] = useState(() => fromPage(page));
  const [savedJson, setSavedJson] = useState(() => stripUi(fromPage(page)));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [slugDirty, setSlugDirty] = useState(!isNew);
  const [previewOpen, setPreviewOpen] = useState(false);
  const titleRef = useRef(null);

  const dirty = stripUi(form) !== savedJson;
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const addSection = (type) => setForm((f) => ({ ...f, sections: [...f.sections, { type, data: {}, _open: true }] }));
  const toggleSection = (i) => setForm((f) => ({
    ...f, sections: f.sections.map((s, j) => (j === i ? { ...s, _open: !s._open } : s)),
  }));
  const duplicateSection = (i) => setForm((f) => {
    const s = f.sections[i];
    const copy = { type: s.type, data: JSON.parse(JSON.stringify(s.data || {})), _open: false };
    const arr = f.sections.slice(); arr.splice(i + 1, 0, copy);
    return { ...f, sections: arr };
  });
  const removeSection = (i) => {
    const s = form.sections[i];
    const hasContent = s && Object.values(s.data || {}).some((v) => (Array.isArray(v) ? v.length : String(v || '').trim()));
    if (hasContent && !window.confirm('Delete this section? Its content will be lost.')) return;
    setForm((f) => ({ ...f, sections: f.sections.filter((_, j) => j !== i) }));
  };
  const moveSection = (i, dir) => setForm((f) => {
    const j = i + dir;
    if (j < 0 || j >= f.sections.length) return f;
    const s = f.sections.slice(); [s[i], s[j]] = [s[j], s[i]];
    return { ...f, sections: s };
  });
  const setSectionField = (i, key, val) => setForm((f) => ({
    ...f, sections: f.sections.map((s, j) => (j === i ? { ...s, data: { ...s.data, [key]: val } } : s)),
  }));

  const save = async () => {
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Please add a page title.'); titleRef.current?.focus(); return; }
    const slug = form.slug.trim() || slugify(title);
    if (!slug) { setError('Please add a web address.'); return; }
    setBusy(true);
    try {
      await adminSavePage({
        slug, title, description: form.description.trim(), metaTitle: form.metaTitle.trim(),
        ogImage: form.ogImage.trim(), canonical: form.canonical.trim(),
        structuredType: form.structuredType, customCode: form.customCode,
        noindex: !!form.noindex, sections: form.sections.map((s) => ({ type: s.type, data: s.data })), published: form.status === 'published', status: form.status,
      }, isNew);
      setSavedJson(stripUi(form));
      setOkMsg(form.status === 'published' ? `Saved ✓ — live at /${slug}` : form.status === 'review' ? 'Saved — ready for review ✓' : 'Saved as draft ✓');
      setBusy(false);
      setTimeout(() => onDone(), 900);
    } catch (e) {
      setBusy(false);
      setError(/permission/i.test(e.message || '')
        ? 'Your session timed out — log out and back in, then Save again.'
        : 'Save failed: ' + (e.message || e));
    }
  };

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>{isNew ? 'New page' : 'Edit page'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={() => setPreviewOpen(true)} disabled={busy || !form.sections.length}>Preview</button>
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}

        {!isNew && (
          <VersionHistory label="this page" load={() => adminListPageDocVersions(page.slug)}
            onRestore={async (vid) => { const snap = await adminRestorePageDocVersion(page.slug, vid); const f = fromPage(snap); setForm(f); setSavedJson(stripUi(f)); setOkMsg('Restored ✓'); }} />
        )}

        <div className="cms-row">
          <div className="cms-field">
            <label>Page title</label>
            <input ref={titleRef} className="cms-input" value={form.title}
              onChange={(e) => { const v = e.target.value; set('title', v); if (isNew && !slugDirty) set('slug', slugify(v)); }} />
          </div>
          <div className="cms-field">
            <label>Web address</label>
            <input className="cms-input" value={form.slug} disabled={!isNew}
              onChange={(e) => { set('slug', slugify(e.target.value)); setSlugDirty(true); }} />
            <p className="cms-hint">/{form.slug || '…'}{!isNew && ' · fixed after creation'}</p>
          </div>
        </div>

        <div className="cms-section-h">Sections</div>
        {form.sections.length === 0 && <p className="cms-hint">No sections yet — add one below to start building.</p>}
        {form.sections.map((s, i) => {
          const def = SECTION_KIT[s.type];
          const snip = sectionSnippet(s);
          return (
            <div className="cms-block" key={i}>
              <div className="cms-block-head">
                <button className="cms-iconbtn" title={s._open ? 'Collapse' : 'Expand'} onClick={() => toggleSection(i)}>{s._open ? '▾' : '▸'}</button>
                <strong style={{ fontSize: 13, cursor: 'pointer' }} onClick={() => toggleSection(i)}>{def ? def.label : s.type}</strong>
                {!s._open && snip && <span className="cms-block-snippet">{snip}…</span>}
                <div className="cms-block-spacer" />
                <button className="cms-iconbtn" title="Duplicate this section" onClick={() => duplicateSection(i)}>⧉</button>
                <button className="cms-iconbtn" title="Move up" onClick={() => moveSection(i, -1)} disabled={i === 0}>↑</button>
                <button className="cms-iconbtn" title="Move down" onClick={() => moveSection(i, 1)} disabled={i === form.sections.length - 1}>↓</button>
                <button className="cms-iconbtn" title="Remove" onClick={() => removeSection(i)}>✕</button>
              </div>
              {s._open && def && def.fields.map((f) => (
                <SectionFieldEditor key={f.key} field={f} value={s.data[f.key]} onChange={(v) => setSectionField(i, f.key, v)} />
              ))}
            </div>
          );
        })}
        <p className="cms-hint" style={{ margin: '18px 0 8px' }}>Add a section:</p>
        <div className="cms-addgrid">
          {SECTION_TYPES.map((t) => (
            <button key={t} className="cms-addcard" onClick={() => addSection(t)}>
              <span className="cms-addcard-title">+ {SECTION_KIT[t].label}</span>
              <span className="cms-addcard-desc">{SECTION_DESCS[t] || ''}</span>
            </button>
          ))}
        </div>

        <div className="cms-section-h">Search &amp; sharing (optional)</div>
        <div className="cms-field">
          <label>Search description</label>
          <textarea className="cms-textarea" style={{ minHeight: 56 }} value={form.description} onChange={(e) => set('description', e.target.value)} />
          <CharCount value={form.description} max={160} />
          <p className="cms-hint">Shown in Google results and link previews.</p>
        </div>
        <div className="cms-row">
          <div className="cms-field">
            <label>Browser / search title (optional)</label>
            <input className="cms-input" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)}
              placeholder={form.title ? `${form.title} · Proxa Labs` : 'Uses the page title'} />
            <CharCount value={form.metaTitle} max={60} />
          </div>
          <div className="cms-field">
            <label className="cms-check" style={{ marginTop: 28 }}>
              <input type="checkbox" checked={form.noindex} onChange={(e) => set('noindex', e.target.checked)} /> Hide from search engines
            </label>
            {form.noindex && <p className="cms-noindex-warn">⚠ Google will drop this page. Leave off unless you’re sure.</p>}
          </div>
        </div>
        <SeoPreview title={form.metaTitle || (form.title ? `${form.title} · Proxa Labs` : '')}
          description={form.description} path={`/${form.slug || '…'}`} />
        <SeoChecklist checks={pageChecks(form)} />
        <div className="cms-row">
          <div className="cms-field">
            <label>Social share image (optional)</label>
            <input className="cms-input" placeholder="Image URL" value={form.ogImage} onChange={(e) => set('ogImage', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Canonical URL (optional)</label>
            <input className="cms-input" placeholder="Only if this duplicates another page" value={form.canonical} onChange={(e) => set('canonical', e.target.value)} />
          </div>
        </div>
        <div className="cms-field">
          <label>Structured-data type (helps AI/search label the page)</label>
          <select className="cms-select" style={{ maxWidth: 260 }} value={form.structuredType} onChange={(e) => set('structuredType', e.target.value)}>
            <option value="">Auto (WebPage + any FAQ)</option>
            <option value="Article">Article</option>
            <option value="AboutPage">About page</option>
            <option value="ContactPage">Contact page</option>
            <option value="CollectionPage">Collection / listing page</option>
          </select>
        </div>
        {isAdmin && (
          <div className="cms-field">
            <label>Custom code (advanced, optional)</label>
            <textarea className="cms-textarea" style={{ minHeight: 60, fontFamily: 'monospace', fontSize: 13 }} value={form.customCode} onChange={(e) => set('customCode', e.target.value)} placeholder="e.g. a tracking pixel or a schema snippet" />
            <p className="cms-hint">Added to this page only, and runs as code. Admins only.</p>
          </div>
        )}

        <div className="cms-toolbar">
          <StatusSelect value={form.status} onChange={(v) => set('status', v)} />
          <div className="cms-toolbar-spacer" />
          {okMsg && <span className="cms-ok" style={{ marginRight: 12 }}>{okMsg}</span>}
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>

      {previewOpen && (
        <div className="cms-preview-overlay">
          <div className="cms-preview-bar">
            <span>Preview — how this page will look. Nothing is saved.</span>
            <button className="cms-btn cms-btn-sm" onClick={() => setPreviewOpen(false)}>Close preview</button>
          </div>
          <div className="cms-preview-body">
            {form.sections.map((s, i) => <SectionRenderer key={i} section={s} go={() => {}} />)}
          </div>
        </div>
      )}
    </div>
  );
}
