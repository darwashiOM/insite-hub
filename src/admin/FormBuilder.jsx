import { useState, useEffect, useRef } from 'react';
import {
  adminSaveForm, slugify, adminUploadFile,
  adminListFormVersions, adminRestoreFormVersion,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';

const FIELD_TYPES = [
  { v: 'text', l: 'Short text' },
  { v: 'email', l: 'Email' },
  { v: 'tel', l: 'Phone' },
  { v: 'textarea', l: 'Long text' },
  { v: 'select', l: 'Dropdown' },
  { v: 'checkbox', l: 'Checkbox' },
];

const BLANK = {
  slug: '', name: '', title: '', intro: '', submitText: 'Submit',
  successMessage: 'Thanks — we’ve got your details.',
  notifyEmail: '', consentText: '', fields: [],
  gated: false, gatedFileUrl: '', gatedFileLabel: '', published: false,
};

// Editor fields keep options as a newline string; saved as an array.
const fromForm = (f) => ({
  ...BLANK, ...(f || {}),
  fields: ((f && f.fields) || []).map((x) => ({
    label: x.label || '', type: x.type || 'text', required: !!x.required,
    options: Array.isArray(x.options) ? x.options.join('\n') : (x.options || ''),
  })),
});

export default function FormBuilder({ form, onDone, onCancel }) {
  const isNew = !form;
  const initial = useRef(null);
  const [data, setData] = useState(() => { const d = fromForm(form); initial.current = JSON.stringify(d); return d; });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [slugDirty, setSlugDirty] = useState(!isNew);
  const nameRef = useRef(null);

  const dirty = JSON.stringify(data) !== initial.current;
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const setField = (i, patch) => setData((d) => ({ ...d, fields: d.fields.map((f, j) => (j === i ? { ...f, ...patch } : f)) }));
  const addField = () => setData((d) => ({ ...d, fields: [...d.fields, { label: 'New field', type: 'text', required: false, options: '' }] }));
  const removeField = (i) => {
    const f = data.fields[i];
    const named = f && String(f.label || '').trim() && f.label !== 'New field';
    if (named && !window.confirm(`Remove the "${f.label}" field?`)) return;
    setData((d) => ({ ...d, fields: d.fields.filter((_, j) => j !== i) }));
  };
  const moveField = (i, dir) => setData((d) => {
    const j = i + dir;
    if (j < 0 || j >= d.fields.length) return d;
    const f = d.fields.slice(); [f[i], f[j]] = [f[j], f[i]];
    return { ...d, fields: f };
  });

  const uploadGated = async (file) => {
    if (!file) return;
    setBusy(true); setError('');
    try { set('gatedFileUrl', await adminUploadFile(file)); }
    catch (e) { setError('Upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    setError(''); setOkMsg('');
    const name = data.name.trim();
    if (!name) { setError('Please add a form name.'); nameRef.current?.focus(); return; }
    const slug = data.slug.trim() || slugify(name);
    if (!slug) { setError('Please add a web address.'); return; }
    if (data.gated && !data.gatedFileUrl.trim()) { setError('Add a file URL for the gated download, or turn gating off.'); return; }

    // Build fields with unique, url-safe keys derived from labels.
    const used = new Set();
    const fields = data.fields.filter((f) => f.label.trim()).map((f) => {
      let key = slugify(f.label) || 'field'; const base = key; let n = 2;
      while (used.has(key)) key = `${base}-${n++}`;
      used.add(key);
      const out = { key, label: f.label.trim(), type: f.type, required: !!f.required };
      if (f.type === 'select') out.options = String(f.options || '').split(/\n|,/).map((o) => o.trim()).filter(Boolean);
      return out;
    });

    setBusy(true);
    try {
      await adminSaveForm({
        slug, name, title: data.title.trim(), intro: data.intro.trim(),
        submitText: data.submitText.trim() || 'Submit',
        successMessage: data.successMessage.trim() || 'Thanks — we’ve got your details.',
        notifyEmail: data.notifyEmail.trim(), consentText: data.consentText.trim(),
        fields, gated: !!data.gated, gatedFileUrl: data.gatedFileUrl.trim(), gatedFileLabel: data.gatedFileLabel.trim(),
        published: !!data.published,
      }, isNew);
      initial.current = JSON.stringify(data);
      setOkMsg(data.published ? 'Saved ✓ — live at /forms/' + slug : 'Saved as draft ✓');
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
        <h1>{isNew ? 'New form' : 'Edit form'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}

        {!isNew && (
          <VersionHistory label="this form" load={() => adminListFormVersions(form.slug)}
            onRestore={async (vid) => {
              const snap = await adminRestoreFormVersion(form.slug, vid);
              const d = fromForm(snap); initial.current = JSON.stringify(d); setData(d); setOkMsg('Restored ✓');
            }} />
        )}

        <div className="cms-row">
          <div className="cms-field">
            <label>Form name (internal)</label>
            <input ref={nameRef} className="cms-input" value={data.name}
              onChange={(e) => { const v = e.target.value; set('name', v); if (isNew && !slugDirty) set('slug', slugify(v)); }} />
          </div>
          <div className="cms-field">
            <label>Web address</label>
            <input className="cms-input" value={data.slug} disabled={!isNew}
              onChange={(e) => { set('slug', slugify(e.target.value)); setSlugDirty(true); }} />
            <p className="cms-hint">/forms/{data.slug || '…'}{!isNew && ' · fixed after creation'}</p>
          </div>
        </div>

        <div className="cms-field">
          <label>Heading (shown above the form)</label>
          <input className="cms-input" value={data.title} onChange={(e) => set('title', e.target.value)} />
        </div>
        <div className="cms-field">
          <label>Intro text</label>
          <textarea className="cms-textarea" style={{ minHeight: 56 }} value={data.intro} onChange={(e) => set('intro', e.target.value)} />
        </div>

        <div className="cms-section-h">Fields</div>
        {data.fields.map((f, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-row">
              <div className="cms-field">
                <label>Label</label>
                <input className="cms-input" value={f.label} onChange={(e) => setField(i, { label: e.target.value })} />
              </div>
              <div className="cms-field">
                <label>Type</label>
                <select className="cms-select" value={f.type} onChange={(e) => setField(i, { type: e.target.value })}>
                  {FIELD_TYPES.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}
                </select>
              </div>
            </div>
            {f.type === 'select' && (
              <div className="cms-field">
                <label>Dropdown options (one per line)</label>
                <textarea className="cms-textarea" style={{ minHeight: 56 }} value={f.options} onChange={(e) => setField(i, { options: e.target.value })} />
              </div>
            )}
            <div className="cms-block-head" style={{ marginTop: 4 }}>
              <label className="cms-check" style={{ fontSize: 13 }}>
                <input type="checkbox" checked={f.required} onChange={(e) => setField(i, { required: e.target.checked })} /> Required
              </label>
              <div className="cms-block-spacer" />
              <button className="cms-iconbtn" title="Move up" onClick={() => moveField(i, -1)} disabled={i === 0}>↑</button>
              <button className="cms-iconbtn" title="Move down" onClick={() => moveField(i, 1)} disabled={i === data.fields.length - 1}>↓</button>
              <button className="cms-iconbtn" title="Remove" onClick={() => removeField(i)}>✕</button>
            </div>
          </div>
        ))}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={addField}>+ Add a field</button></div>

        <div className="cms-section-h">Gated download (optional)</div>
        <label className="cms-check">
          <input type="checkbox" checked={data.gated} onChange={(e) => set('gated', e.target.checked)} />
          Unlock a file after the form is submitted
        </label>
        {data.gated && (
          <div style={{ marginTop: 12 }}>
            <div className="cms-field">
              <label>File URL</label>
              <input className="cms-input" placeholder="Link to the file" value={data.gatedFileUrl} onChange={(e) => set('gatedFileUrl', e.target.value)} />
              <input type="file" style={{ marginTop: 8 }} onChange={(e) => uploadGated(e.target.files[0])} />
            </div>
            <div className="cms-field">
              <label>Download button text</label>
              <input className="cms-input" value={data.gatedFileLabel} onChange={(e) => set('gatedFileLabel', e.target.value)} />
            </div>
          </div>
        )}

        <div className="cms-section-h">Messages &amp; notifications</div>
        <div className="cms-row">
          <div className="cms-field">
            <label>Submit button text</label>
            <input className="cms-input" value={data.submitText} onChange={(e) => set('submitText', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Notify email(s) (comma-separated)</label>
            <input className="cms-input" value={data.notifyEmail} onChange={(e) => set('notifyEmail', e.target.value)} />
            <p className="cms-hint">Where submissions are emailed. Defaults to the site’s address if blank.</p>
          </div>
        </div>
        <div className="cms-field">
          <label>Success message</label>
          <input className="cms-input" value={data.successMessage} onChange={(e) => set('successMessage', e.target.value)} />
        </div>
        <div className="cms-field">
          <label>Consent text (optional — adds a required checkbox)</label>
          <input className="cms-input" value={data.consentText} onChange={(e) => set('consentText', e.target.value)} />
        </div>

        <div className="cms-toolbar">
          <label className="cms-check">
            <input type="checkbox" checked={data.published} onChange={(e) => set('published', e.target.checked)} />
            Published (live on the public site)
          </label>
          <div className="cms-toolbar-spacer" />
          {okMsg && <span className="cms-ok" style={{ marginRight: 12 }}>{okMsg}</span>}
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
