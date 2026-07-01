import { useState, useEffect } from 'react';
import { adminUploadImage, adminListPageDestinations, adminListPublishedForms } from '../lib/adminBlog';
import { NAV_DESTINATIONS } from '../content/navConfig';
import RichText from './RichText';

// Built-in destinations + published landing pages, loaded once and cached across
// every button-picker on the page.
let destCache = null;
function usePageDestinations() {
  const [dests, setDests] = useState(destCache || NAV_DESTINATIONS);
  useEffect(() => {
    if (destCache) return;
    adminListPageDestinations()
      .then((built) => { destCache = [...NAV_DESTINATIONS, ...built]; setDests(destCache); })
      .catch(() => {});
  }, []);
  return dests;
}

// Published forms for the "form" section picker, loaded once and cached.
let formCache = null;
function usePublishedForms() {
  const [forms, setForms] = useState(formCache || []);
  useEffect(() => {
    if (formCache) return;
    adminListPublishedForms()
      .then((list) => { formCache = list; setForms(list); })
      .catch(() => {});
  }, []);
  return forms;
}

// Renders the right input for one section field, by type. `value`/`onChange`
// own the field's stored value.
export default function SectionFieldEditor({ field, value, onChange }) {
  const [busy, setBusy] = useState(false);
  const destinations = usePageDestinations();
  const forms = usePublishedForms();
  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    try { onChange(await adminUploadImage(file)); }
    catch (e) { window.alert('Upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  if (field.type === 'textarea') {
    return (
      <div className="cms-field"><label>{field.label}</label>
        <textarea className="cms-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} /></div>
    );
  }
  if (field.type === 'boolean') {
    return (
      <div className="cms-field"><label className="cms-check">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> {field.label}
      </label></div>
    );
  }
  if (field.type === 'page') {
    return (
      <div className="cms-field"><label>{field.label}</label>
        <select className="cms-select" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">— choose a page —</option>
          {destinations.map((d) => <option key={d.page} value={d.page}>{d.label}</option>)}
        </select></div>
    );
  }
  if (field.type === 'image') {
    return (
      <div className="cms-field"><label>{field.label}</label>
        <input className="cms-input" placeholder="Image URL" value={value || ''} onChange={(e) => onChange(e.target.value)} />
        <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => upload(e.target.files[0])} />
        {busy && <span className="cms-hint">Uploading…</span>}
        {value && <img className="cms-thumb-prev" src={value} alt="" />}</div>
    );
  }
  if (field.type === 'statlist') {
    const items = Array.isArray(value) ? value : [];
    const setItem = (i, patch) => onChange(items.map((s, j) => (j === i ? { ...s, ...patch } : s)));
    return (
      <div className="cms-field"><label>{field.label}</label>
        {items.map((s, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-row">
              <div className="cms-field"><label>Number</label><input className="cms-input" placeholder="e.g. 40%" value={s.value || ''} onChange={(e) => setItem(i, { value: e.target.value })} /></div>
              <div className="cms-field"><label>Label</label><input className="cms-input" value={s.label || ''} onChange={(e) => setItem(i, { label: e.target.value })} /></div>
            </div>
            <div className="cms-field"><label>Source (optional)</label><input className="cms-input" value={s.source || ''} onChange={(e) => setItem(i, { source: e.target.value })} /></div>
            <div className="cms-block-head"><div className="cms-block-spacer" /><button className="cms-iconbtn" title="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button></div>
          </div>
        ))}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={() => onChange([...items, { value: '', label: '', source: '' }])}>+ Add stat</button></div>
      </div>
    );
  }
  if (field.type === 'cardlist') {
    const items = Array.isArray(value) ? value : [];
    const setItem = (i, patch) => onChange(items.map((c, j) => (j === i ? { ...c, ...patch } : c)));
    return (
      <div className="cms-field"><label>{field.label}</label>
        {items.map((c, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-field"><label>Title</label><input className="cms-input" value={c.title || ''} onChange={(e) => setItem(i, { title: e.target.value })} /></div>
            <div className="cms-field"><label>Body</label><textarea className="cms-textarea" value={c.body || ''} onChange={(e) => setItem(i, { body: e.target.value })} /></div>
            <div className="cms-block-head"><div className="cms-block-spacer" /><button className="cms-iconbtn" title="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button></div>
          </div>
        ))}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={() => onChange([...items, { title: '', body: '' }])}>+ Add card</button></div>
      </div>
    );
  }
  if (field.type === 'faqlist') {
    const items = Array.isArray(value) ? value : [];
    const setItem = (i, patch) => onChange(items.map((c, j) => (j === i ? { ...c, ...patch } : c)));
    return (
      <div className="cms-field"><label>{field.label}</label>
        {items.map((c, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-field"><label>Question</label><input className="cms-input" value={c.question || ''} onChange={(e) => setItem(i, { question: e.target.value })} /></div>
            <div className="cms-field"><label>Answer</label><textarea className="cms-textarea" value={c.answer || ''} onChange={(e) => setItem(i, { answer: e.target.value })} /></div>
            <div className="cms-block-head"><div className="cms-block-spacer" /><button className="cms-iconbtn" title="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button></div>
          </div>
        ))}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={() => onChange([...items, { question: '', answer: '' }])}>+ Add question</button></div>
      </div>
    );
  }
  if (field.type === 'richtext') {
    return (
      <div className="cms-field"><label>{field.label}</label>
        <RichText value={value || ''} onChange={onChange} placeholder="Type here — select text to format" />
      </div>
    );
  }
  if (field.type === 'formpicker') {
    return (
      <div className="cms-field"><label>{field.label}</label>
        <select className="cms-select" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">— choose a form —</option>
          {forms.map((f) => <option key={f.slug} value={f.slug}>{f.name}</option>)}
        </select>
        {!forms.length && <p className="cms-hint">No published forms yet — create one in the Forms tab first.</p>}
      </div>
    );
  }
  if (field.type === 'logolist') {
    const items = Array.isArray(value) ? value : [];
    const setItem = (i, patch) => onChange(items.map((c, j) => (j === i ? { ...c, ...patch } : c)));
    const uploadLogo = async (i, file) => {
      if (!file) return;
      setBusy(true);
      try { setItem(i, { image: await adminUploadImage(file) }); }
      catch (e) { window.alert('Upload failed: ' + (e.message || e)); }
      finally { setBusy(false); }
    };
    return (
      <div className="cms-field"><label>{field.label}</label>
        {items.map((c, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-field"><label>Logo image</label>
              <input className="cms-input" placeholder="Image URL" value={c.image || ''} onChange={(e) => setItem(i, { image: e.target.value })} />
              <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => uploadLogo(i, e.target.files[0])} />
              {c.image && <img className="cms-thumb-prev" src={c.image} alt="" />}
            </div>
            <div className="cms-field"><label>Name (for alt text)</label><input className="cms-input" value={c.name || ''} onChange={(e) => setItem(i, { name: e.target.value })} /></div>
            <div className="cms-block-head"><div className="cms-block-spacer" /><button className="cms-iconbtn" title="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button></div>
          </div>
        ))}
        {busy && <span className="cms-hint">Uploading…</span>}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={() => onChange([...items, { image: '', name: '' }])}>+ Add logo</button></div>
      </div>
    );
  }
  // text (default)
  return (
    <div className="cms-field"><label>{field.label}</label>
      <input className="cms-input" value={value || ''} onChange={(e) => onChange(e.target.value)} /></div>
  );
}
