import { useState, useEffect, useRef } from 'react';
import {
  adminSaveVideo, adminUploadImage, slugify,
  adminListVideoVersions, adminRestoreVideoVersion,
} from '../lib/adminBlog';
import { parseYouTubeId } from '../lib/videos';
import VersionHistory from './VersionHistory';
import { useDraftBackup, useSaveShortcut, useFadingMessage } from './useEditorSafety';
import RestoreBanner from './RestoreBanner';
import PublishSummary from './PublishSummary';
import StatusSelect from './StatusSelect';
import { statusOf } from './status';

const BLANK = {
  slug: '', title: '', description: '', videoUrl: '', thumbnail: '',
  length: '', topic: '', date: '', captions: '', transcript: '', published: false, order: 0, publishAt: '',
};

function toLocalDatetime(ms) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function VideoEditor({ video, onCancel }) {
  const isNew = !video;
  const initial = useRef(null);
  const [form, setForm] = useState(() => {
    const f = { ...BLANK, ...(video || {}), publishAt: (video && video.publishAt) ? toLocalDatetime(video.publishAt) : '', status: statusOf(video) };
    initial.current = JSON.stringify(f); return f;
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [slugDirty, setSlugDirty] = useState(!isNew);
  const [savedOnce, setSavedOnce] = useState(false);
  const [savedSlug, setSavedSlug] = useState(null);
  const createMode = isNew && !savedOnce;
  const titleRef = useRef(null);

  const dirty = JSON.stringify(form) !== initial.current;
  const { backup, clear: clearBackup } = useDraftBackup(`video:${video?.slug || savedSlug || 'new'}`, form, dirty, initial.current);
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
  const ytId = parseYouTubeId(form.videoUrl);

  const upload = async (file) => {
    if (!file) return;
    setBusy(true); setError('');
    try { set('thumbnail', await adminUploadImage(file)); }
    catch (e) { setError('Image upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    if (busy) return; // Cmd+S must respect an in-flight save/upload like the button does
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Please add a title.'); titleRef.current?.focus(); return; }
    const slug = form.slug.trim() || slugify(title);
    if (!slug) { setError('Please add a web address.'); return; }
    const published = form.status === 'published';
    const scheduledMs = (!published && form.publishAt) ? Date.parse(form.publishAt) : NaN;
    const isScheduled = !Number.isNaN(scheduledMs);
    setBusy(true);
    try {
      await adminSaveVideo({
        slug, title, description: form.description.trim(), videoUrl: form.videoUrl.trim(),
        thumbnail: form.thumbnail.trim(), length: form.length.trim(), topic: form.topic.trim(),
        date: form.date.trim(), captions: form.captions.trim(), transcript: form.transcript.trim(),
        published, status: form.status, order: Number(form.order) || 0,
        ...(isScheduled ? { publishAt: scheduledMs } : {}),
      }, createMode);
      clearBackup();
      // keep later saves pointed at THIS doc — never re-derive the slug from the title
      const savedForm = { ...form, slug };
      initial.current = JSON.stringify(savedForm);
      setForm(savedForm);
      setSavedOnce(true);
      setSavedSlug(slug);
      setOkMsg(published ? 'Saved ✓ — it’s live now.' : form.status === 'review' ? 'Saved — ready for review ✓' : 'Saved as draft ✓');
      setBusy(false);
    } catch (e) {
      setBusy(false);
      setError(/permission/i.test(e.message || '')
        ? 'Your session timed out — log out and back in, then Save again.'
        : 'Save failed: ' + (e.message || e));
    }
  };

  useSaveShortcut(save);

  return (
    <div className="cms-admin">
      <div className="cms-bar">
        <h1>{createMode ? 'New video' : 'Edit video'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={cancel} disabled={busy}>{dirty ? 'Cancel' : 'Back'}</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
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
            label="this video"
            load={() => adminListVideoVersions(video.slug)}
            onRestore={async (vid) => {
              const snap = await adminRestoreVideoVersion(video.slug, vid);
              const f = { ...BLANK, ...snap, publishAt: snap.publishAt ? toLocalDatetime(snap.publishAt) : '', status: statusOf(snap) };
              initial.current = JSON.stringify(f);
              setForm(f);
              setOkMsg('Restored ✓');
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
            <p className="cms-hint">Used internally{!createMode && ' · fixed after creation'}.</p>
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
          <label>Captions file (.vtt URL, optional)</label>
          <input className="cms-input" placeholder="https://…/captions.vtt" value={form.captions} onChange={(e) => set('captions', e.target.value)} />
          <p className="cms-hint">For directly-hosted videos — shows on-screen captions. (YouTube captions come from YouTube.)</p>
        </div>

        <div className="cms-field">
          <label>Transcript</label>
          <textarea className="cms-textarea" value={form.transcript} onChange={(e) => set('transcript', e.target.value)} />
          <p className="cms-hint">Shown under the video — helps search and AI tools find and quote it.</p>
        </div>

        <div className="cms-field">
          <label>Schedule publish for later (optional)</label>
          <input className="cms-input" type="datetime-local" style={{ maxWidth: 260 }} value={form.publishAt} disabled={form.status === 'published'} onChange={(e) => set('publishAt', e.target.value)} />
          <p className="cms-hint">{form.status === 'published' ? 'Already published.' : 'Keep the status below on Draft/Review and set a time — it goes live automatically.'}</p>
        </div>

        <PublishSummary status={form.status} publishAt={form.publishAt} />
        <div className="cms-toolbar">
          <StatusSelect value={form.status} onChange={(v) => set('status', v)} />
          <div className="cms-toolbar-spacer" />
          {okMsg && <span className="cms-ok" style={{ marginRight: 12 }}>{okMsg}</span>}
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}
