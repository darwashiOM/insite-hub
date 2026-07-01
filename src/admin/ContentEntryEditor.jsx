import { useEffect, useState } from 'react';
import { adminSaveEntry, slugify, adminUploadImage, adminListEntryVersions, adminRestoreEntryVersion } from '../lib/adminBlog';
import { statusOf } from './status';
import StatusSelect from './StatusSelect';
import RichText from './RichText';
import VersionHistory from './VersionHistory';
import EntryLayout from '../components/EntryLayout';

const from = (type, entry) => ({
  typeKey: type.key, slug: '', title: '', summary: '',
  metaTitle: '', description: '', ogImage: '', noindex: false, order: 0, published: false,
  ...(entry || {}),
  values: { ...((entry && entry.values) || {}) },
  status: statusOf(entry),
});

function EntryField({ field, value, onChange, onUpload }) {
  switch (field.type) {
    case 'textarea': return <textarea className="cms-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />;
    case 'richtext': return <RichText value={value || ''} onChange={onChange} placeholder={field.label} />;
    case 'boolean': return <label className="cms-check"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> {field.label}</label>;
    case 'date': return <input className="cms-input" type="date" value={value || ''} onChange={(e) => onChange(e.target.value)} />;
    case 'number': return <input className="cms-input" type="number" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
    case 'url': return <input className="cms-input" type="url" placeholder="https://…" value={value || ''} onChange={(e) => onChange(e.target.value)} />;
    case 'dropdown': return (
      <select className="cms-select" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">— choose —</option>
        {String(field.options || '').split(',').map((s) => s.trim()).filter(Boolean).map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
    case 'image': return (
      <>
        <input className="cms-input" placeholder="Image URL" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => onUpload(e.target.files[0], onChange)} />
        {value && <img className="cms-thumb-prev" src={value} alt="" />}
      </>
    );
    default: return <input className="cms-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />;
  }
}

export default function ContentEntryEditor({ type, entry, onDone, onCancel, onDirty }) {
  const isNew = !entry;
  const [form, setForm] = useState(() => from(type, entry));
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(from(type, entry)));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [slugDirty, setSlugDirty] = useState(!isNew);
  const [previewOpen, setPreviewOpen] = useState(false);

  const dirty = JSON.stringify(form) !== savedJson;
  useEffect(() => { onDirty?.(dirty); return () => onDirty?.(false); }, [dirty, onDirty]);
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setValue = (key, v) => setForm((f) => ({ ...f, values: { ...f.values, [key]: v } }));
  const upload = async (file, then) => { if (!file) return; setBusy(true); setError(''); try { then(await adminUploadImage(file)); } catch (e) { setError('Upload failed: ' + (e.message || e)); } finally { setBusy(false); } };

  const save = async () => {
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Add a title.'); return; }
    const slug = form.slug.trim() || slugify(title);
    if (!slug) { setError('Add a web address.'); return; }
    const published = form.status === 'published';
    setBusy(true);
    try {
      await adminSaveEntry({
        typeKey: type.key, slug, title, summary: form.summary.trim(), values: form.values,
        metaTitle: form.metaTitle.trim(), description: form.description.trim(), ogImage: form.ogImage.trim(), noindex: !!form.noindex,
        order: Number(form.order) || 0, published, status: form.status,
      }, isNew);
      setSavedJson(JSON.stringify(form));
      setOkMsg(published ? `Saved ✓ — live at /${type.key}/${slug}` : form.status === 'review' ? 'Saved — ready for review ✓' : 'Saved as draft ✓');
      setBusy(false); setTimeout(onDone, 800);
    } catch (e) { setBusy(false); setError(/permission/i.test(e.message || '') ? 'Session timed out — log in again, then Save.' : 'Save failed: ' + (e.message || e)); }
  };

  const singular = type.singular || type.label || 'entry';
  return (
    <div>
      <div className="cms-subbar">
        <h2>{isNew ? `New ${singular.toLowerCase()}` : `Edit ${singular.toLowerCase()}`}</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={() => setPreviewOpen(true)} disabled={busy || !form.title.trim()}>Preview</button>
          <button className="cms-btn" onClick={cancel} disabled={busy}>{dirty ? 'Cancel' : 'Back'}</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
      <div>
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}
        {!isNew && (
          <VersionHistory label={`this ${singular.toLowerCase()}`} load={() => adminListEntryVersions(entry.id)}
            onRestore={async (vid) => { const snap = await adminRestoreEntryVersion(entry.id, vid); const f = from(type, snap); setForm(f); setSavedJson(JSON.stringify(f)); setOkMsg('Restored ✓'); }} />
        )}

        <div className="cms-field"><label>Title</label>
          <input className="cms-input" value={form.title} onChange={(e) => { const v = e.target.value; set('title', v); if (isNew && !slugDirty) set('slug', slugify(v)); }} /></div>
        <div className="cms-row">
          <div className="cms-field"><label>Web address</label>
            <input className="cms-input" value={form.slug} disabled={!isNew} onChange={(e) => { set('slug', slugify(e.target.value)); setSlugDirty(true); }} />
            <p className="cms-hint">/{type.key}/{form.slug || '…'}{!isNew && ' · fixed after creation'}</p></div>
          <div className="cms-field"><label>Sort order (lower shows first)</label>
            <input className="cms-input" type="number" style={{ maxWidth: 140 }} value={form.order} onChange={(e) => set('order', e.target.value)} /></div>
        </div>
        <div className="cms-field"><label>Summary</label>
          <textarea className="cms-textarea" style={{ minHeight: 56 }} value={form.summary} onChange={(e) => set('summary', e.target.value)} />
          <p className="cms-hint">Shown on the list page and at the top of the entry.</p></div>

        {(type.fields || []).length > 0 && <div className="cms-section-h">{type.label} details</div>}
        {(type.fields || []).map((f) => (
          <div className="cms-field" key={f.key}>
            {f.type !== 'boolean' && <label>{f.label}</label>}
            <EntryField field={f} value={form.values[f.key]} onChange={(v) => setValue(f.key, v)} onUpload={upload} />
          </div>
        ))}

        <div className="cms-section-h">Search &amp; sharing (optional)</div>
        <div className="cms-field"><label>Browser / search title</label>
          <input className="cms-input" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} /></div>
        <div className="cms-row">
          <div className="cms-field"><label>Search description</label>
            <input className="cms-input" value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
          <div className="cms-field"><label>Social share image</label>
            <input className="cms-input" placeholder="Image URL" value={form.ogImage} onChange={(e) => set('ogImage', e.target.value)} /></div>
        </div>
        <label className="cms-check"><input type="checkbox" checked={form.noindex} onChange={(e) => set('noindex', e.target.checked)} /> Hide from search engines</label>

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
            <span>Preview — how this will look. Nothing is saved.</span>
            <button className="cms-btn cms-btn-sm" onClick={() => setPreviewOpen(false)}>Close preview</button>
          </div>
          <div className="cms-preview-body"><EntryLayout type={type} entry={form} setPage={() => {}} /></div>
        </div>
      )}
    </div>
  );
}
