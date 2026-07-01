import { useEffect, useState } from 'react';
import { adminSaveContentType, slugify, adminListContentTypeVersions, adminRestoreContentTypeVersion } from '../lib/adminBlog';
import VersionHistory from './VersionHistory';

const FIELD_TYPES = [
  { v: 'text', l: 'Short text' }, { v: 'textarea', l: 'Long text' }, { v: 'richtext', l: 'Formatted text' },
  { v: 'image', l: 'Image' }, { v: 'boolean', l: 'Yes / no' }, { v: 'date', l: 'Date' },
  { v: 'number', l: 'Number' }, { v: 'url', l: 'Link (URL)' }, { v: 'dropdown', l: 'Dropdown' },
];
const BLANK = { key: '', label: '', singular: '', listTitle: '', intro: '', fields: [] };
const from = (t) => ({ ...BLANK, ...(t || {}), fields: ((t && t.fields) || []).map((f) => ({ options: '', ...f })) });

export default function ContentTypeEditor({ type, onDone, onCancel, onDirty }) {
  const isNew = !type;
  const [form, setForm] = useState(() => from(type));
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(from(type)));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const dirty = JSON.stringify(form) !== savedJson;
  useEffect(() => { onDirty?.(dirty); return () => onDirty?.(false); }, [dirty, onDirty]);
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setField = (i, patch) => setForm((f) => ({ ...f, fields: f.fields.map((x, j) => (j === i ? { ...x, ...patch } : x)) }));
  const addField = () => setForm((f) => ({ ...f, fields: [...f.fields, { key: '', label: '', type: 'text', options: '' }] }));
  const removeField = (i) => {
    const fl = form.fields[i];
    if ((fl.label || fl.key) && !window.confirm('Remove this field?')) return;
    setForm((f) => ({ ...f, fields: f.fields.filter((_, j) => j !== i) }));
  };
  const moveField = (i, dir) => setForm((f) => {
    const j = i + dir; if (j < 0 || j >= f.fields.length) return f;
    const a = f.fields.slice(); [a[i], a[j]] = [a[j], a[i]]; return { ...f, fields: a };
  });

  const save = async () => {
    setError(''); setOkMsg('');
    const label = form.label.trim();
    if (!label) { setError('Give this content type a name.'); return; }
    const key = form.key.trim() || slugify(label);
    if (!key) { setError('Give it a key (used in the web address).'); return; }
    const fields = form.fields
      .map((fl) => ({ key: (fl.key.trim() || slugify(fl.label)), label: fl.label.trim(), type: fl.type, ...(fl.type === 'dropdown' ? { options: fl.options } : {}) }))
      .filter((fl) => fl.key && fl.label);
    setBusy(true);
    try {
      await adminSaveContentType({ key, label, singular: form.singular.trim(), listTitle: form.listTitle.trim(), intro: form.intro.trim(), fields }, isNew);
      setSavedJson(JSON.stringify(form)); setOkMsg('Saved ✓'); setBusy(false); setTimeout(onDone, 700);
    } catch (e) { setBusy(false); setError(/permission/i.test(e.message || '') ? 'Session timed out — log in again, then Save.' : 'Save failed: ' + (e.message || e)); }
  };

  return (
    <div>
      <div className="cms-subbar">
        <h2>{isNew ? 'New content type' : `Edit type: ${form.label}`}</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={cancel} disabled={busy}>{dirty ? 'Cancel' : 'Back'}</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
      <div>
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}
        {!isNew && (
          <VersionHistory label="this content type" load={() => adminListContentTypeVersions(type.key)}
            onRestore={async (vid) => { const snap = await adminRestoreContentTypeVersion(type.key, vid); const f = from(snap); setForm(f); setSavedJson(JSON.stringify(f)); setOkMsg('Restored ✓'); }} />
        )}
        <div className="cms-row">
          <div className="cms-field"><label>Name (plural, e.g. “Webinars”)</label>
            <input className="cms-input" value={form.label} onChange={(e) => set('label', e.target.value)} /></div>
          <div className="cms-field"><label>Key / web address</label>
            <input className="cms-input" value={form.key} disabled={!isNew} onChange={(e) => set('key', slugify(e.target.value))} />
            <p className="cms-hint">/{form.key || '…'}{!isNew && ' · fixed after creation'}</p></div>
        </div>
        <div className="cms-row">
          <div className="cms-field"><label>One item is called (singular, e.g. “Webinar”)</label>
            <input className="cms-input" value={form.singular} onChange={(e) => set('singular', e.target.value)} /></div>
          <div className="cms-field"><label>List page heading (optional)</label>
            <input className="cms-input" placeholder="Defaults to the name" value={form.listTitle} onChange={(e) => set('listTitle', e.target.value)} /></div>
        </div>
        <div className="cms-field"><label>List page intro (optional)</label>
          <textarea className="cms-textarea" style={{ minHeight: 52 }} value={form.intro} onChange={(e) => set('intro', e.target.value)} /></div>

        <div className="cms-section-h">Fields</div>
        <p className="cms-hint">Every item of this type will have a title + summary automatically. Add the extra fields you want below.</p>
        {!isNew && <p className="cms-hint" style={{ color: '#b54708' }}>Heads-up: entries that already exist keep their old values — removing or renaming a field hides that content on them (it isn’t deleted, but it stops showing).</p>}
        {form.fields.map((fl, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-row">
              <div className="cms-field"><label>Field label</label><input className="cms-input" value={fl.label} onChange={(e) => setField(i, { label: e.target.value })} /></div>
              <div className="cms-field"><label>Type</label>
                <select className="cms-select" value={fl.type} onChange={(e) => setField(i, { type: e.target.value })}>
                  {FIELD_TYPES.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}
                </select></div>
            </div>
            {fl.type === 'dropdown' && (
              <div className="cms-field"><label>Options (comma-separated)</label>
                <input className="cms-input" placeholder="Red, Green, Blue" value={fl.options || ''} onChange={(e) => setField(i, { options: e.target.value })} /></div>
            )}
            <div className="cms-block-head"><div className="cms-block-spacer" />
              <button className="cms-iconbtn" title="Move up" onClick={() => moveField(i, -1)} disabled={i === 0}>↑</button>
              <button className="cms-iconbtn" title="Move down" onClick={() => moveField(i, 1)} disabled={i === form.fields.length - 1}>↓</button>
              <button className="cms-iconbtn" title="Remove" onClick={() => removeField(i)}>✕</button>
            </div>
          </div>
        ))}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={addField}>+ Add field</button></div>

        <div className="cms-toolbar">
          <div className="cms-toolbar-spacer" />
          {okMsg && <span className="cms-ok" style={{ marginRight: 12 }}>{okMsg}</span>}
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
