import { useState, useEffect, useRef } from 'react';
import {
  adminSaveVideo, adminUploadImage, slugify,
  adminListVideoVersions, adminRestoreVideoVersion,
} from '../lib/adminBlog';
import { parseYouTubeId } from '../lib/videos';
import VersionHistory from './VersionHistory';

const BLANK = {
  slug: '', title: '', description: '', videoUrl: '', thumbnail: '',
  length: '', topic: '', date: '', transcript: '', published: false, order: 0,
};

export default function VideoEditor({ video, onDone, onCancel }) {
  const isNew = !video;
  const initial = useRef(null);
  const [form, setForm] = useState(() => { const f = { ...BLANK, ...(video || {}) }; initial.current = JSON.stringify(f); return f; });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
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
  const ytId = parseYouTubeId(form.videoUrl);

  const upload = async (file) => {
    if (!file) return;
    setBusy(true); setError('');
    try { set('thumbnail', await adminUploadImage(file)); }
    catch (e) { setError('Image upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Please add a title.'); titleRef.current?.focus(); return; }
    const slug = form.slug.trim() || slugify(title);
    if (!slug) { setError('Please add a web address.'); return; }
    setBusy(true);
    try {
      await adminSaveVideo({
        slug, title, description: form.description.trim(), videoUrl: form.videoUrl.trim(),
        thumbnail: form.thumbnail.trim(), length: form.length.trim(), topic: form.topic.trim(),
        date: form.date.trim(), transcript: form.transcript.trim(), published: !!form.published, order: Number(form.order) || 0,
      }, isNew);
      initial.current = JSON.stringify(form);
      setOkMsg(form.published ? 'Saved ✓ — it’s live now.' : 'Saved as draft ✓');
      setBusy(false);
      setTimeout(() => onDone(), 800);
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
        <h1>{isNew ? 'New video' : 'Edit video'}</h1>
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
            label="this video"
            load={() => adminListVideoVersions(video.slug)}
            onRestore={async (vid) => {
              const snap = await adminRestoreVideoVersion(video.slug, vid);
              const f = { ...BLANK, ...snap };
              initial.current = JSON.stringify(f);
              setForm(f);
              setOkMsg('Restored ✓');
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
            <p className="cms-hint">Used internally{!isNew && ' · fixed after creation'}.</p>
          </div>
          <div className="cms-field">
            <label>Sort order (lower shows first)</label>
            <input className="cms-input" type="number" style={{ maxWidth: 160 }} value={form.order} onChange={(e) => set('order', e.target.value)} />
          </div>
        </div>

        <div className="cms-field">
          <label>Video link (YouTube or direct video URL)</label>
          <input className="cms-input" value={form.videoUrl} onChange={(e) => set('videoUrl', e.target.value)} />
          <p className="cms-hint">{ytId ? `YouTube video detected (${ytId}).` : form.videoUrl.trim() ? 'Will play as a hosted video.' : 'Paste a YouTube URL or a direct .mp4 link.'}</p>
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Length (e.g. 4:32)</label>
            <input className="cms-input" value={form.length} onChange={(e) => set('length', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Topic (for filtering)</label>
            <input className="cms-input" value={form.topic} onChange={(e) => set('topic', e.target.value)} />
          </div>
        </div>

        <div className="cms-field">
          <label>Publish date</label>
          <input className="cms-input" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          <p className="cms-hint">Used for video structured data (helps it appear in search/AI results).</p>
        </div>

        <div className="cms-field">
          <label>Thumbnail (optional — YouTube provides one automatically)</label>
          <input className="cms-input" placeholder="Image URL" value={form.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} />
          <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => upload(e.target.files[0])} />
          {form.thumbnail && <img className="cms-thumb-prev" src={form.thumbnail} alt="" />}
        </div>

        <div className="cms-field">
          <label>Description</label>
          <textarea className="cms-textarea" style={{ minHeight: 64 }} value={form.description} onChange={(e) => set('description', e.target.value)} />
        </div>

        <div className="cms-field">
          <label>Transcript</label>
          <textarea className="cms-textarea" value={form.transcript} onChange={(e) => set('transcript', e.target.value)} />
          <p className="cms-hint">Shown under the video — helps search and AI tools find and quote it.</p>
        </div>

        <div className="cms-toolbar">
          <label className="cms-check">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
            Published (visible on the public site)
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
