import { useState, useRef, useEffect } from 'react';
import {
  adminSaveAuthor, adminUploadImage,
  adminListAuthorVersions, adminRestoreAuthorVersion,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';

const BLANK = { name: '', title: '', bio: '', headshot: '', linkedin: '', website: '' };

export default function AuthorEditor({ author, onDone, onCancel }) {
  const isNew = !author;
  const initial = useRef(null);
  const [form, setForm] = useState(() => { const f = { ...BLANK, ...(author || {}) }; initial.current = JSON.stringify(f); return f; });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const dirty = JSON.stringify(form) !== initial.current;
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const upload = async (file) => {
    if (!file) return;
    setBusy(true); setError('');
    try { set('headshot', await adminUploadImage(file)); }
    catch (e) { setError('Image upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    setError(''); setOkMsg('');
    if (!form.name.trim()) { setError('Please add a name.'); return; }
    setBusy(true);
    try {
      await adminSaveAuthor({
        ...(author?.id ? { id: author.id } : {}),
        name: form.name.trim(), title: form.title.trim(), bio: form.bio.trim(),
        headshot: form.headshot.trim(), linkedin: form.linkedin.trim(), website: form.website.trim(),
      });
      initial.current = JSON.stringify(form);
      setOkMsg('Saved ✓');
      setBusy(false);
      setTimeout(() => onDone(), 700);
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
        <h1>{isNew ? 'New author' : 'Edit author'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}

        {!isNew && (
          <VersionHistory
            label="this author"
            load={() => adminListAuthorVersions(author.id)}
            onRestore={async (vid) => {
              const snap = await adminRestoreAuthorVersion(author.id, vid);
              const f = { ...BLANK, ...snap };
              initial.current = JSON.stringify(f);
              setForm(f);
              setOkMsg('Restored ✓');
            }}
          />
        )}

        <div className="cms-row">
          <div className="cms-field">
            <label>Name</label>
            <input className="cms-input" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Title / role</label>
            <input className="cms-input" value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
        </div>

        <div className="cms-field">
          <label>Bio</label>
          <textarea className="cms-textarea" value={form.bio} onChange={(e) => set('bio', e.target.value)} />
        </div>

        <div className="cms-field">
          <label>Headshot</label>
          <input className="cms-input" placeholder="Image URL" value={form.headshot} onChange={(e) => set('headshot', e.target.value)} />
          <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => upload(e.target.files[0])} />
          {form.headshot && <img className="cms-thumb-prev" src={form.headshot} alt="" />}
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>LinkedIn URL</label>
            <input className="cms-input" value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Website URL</label>
            <input className="cms-input" value={form.website} onChange={(e) => set('website', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
