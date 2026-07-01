import { useState, useEffect, useRef } from 'react';
import {
  adminSaveCaseStudy, adminUploadImage, slugify,
  adminListCaseStudyVersions, adminRestoreCaseStudyVersion,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';
import CaseStudyLayout from '../components/CaseStudyLayout';

const BLANK = {
  slug: '', title: '', client: '', industry: '', summary: '',
  challenge: '', solution: '', results: '',
  stats: [], heroImage: '', published: false, order: 0,
  metaTitle: '', canonical: '', ogImage: '', noindex: false, publishAt: '',
};

function toLocalDatetime(ms) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const withStats = (cs) => ({
  ...BLANK, ...(cs || {}),
  stats: ((cs && cs.stats) || []).map((s) => ({ ...s })),
  publishAt: (cs && cs.publishAt) ? toLocalDatetime(cs.publishAt) : '',
});

export default function CaseStudyEditor({ caseStudy, onDone, onCancel }) {
  const isNew = !caseStudy;
  const initial = useRef(null);
  const [form, setForm] = useState(() => { const f = withStats(caseStudy); initial.current = JSON.stringify(f); return f; });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [okMsg, setOkMsg] = useState('');
  const [slugDirty, setSlugDirty] = useState(!isNew);
  const [previewOpen, setPreviewOpen] = useState(false);
  const titleRef = useRef(null);

  const dirty = JSON.stringify(form) !== initial.current;
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  const cancel = () => { if (dirty && !window.confirm('Discard your unsaved changes?')) return; onCancel(); };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setStat = (i, patch) => setForm((f) => ({ ...f, stats: f.stats.map((s, j) => (j === i ? { ...s, ...patch } : s)) }));
  const addStat = () => setForm((f) => ({ ...f, stats: [...f.stats, { value: '', label: '' }] }));
  const removeStat = (i) => {
    const s = form.stats[i];
    const filled = s && (String(s.value || '').trim() || String(s.label || '').trim());
    if (filled && !window.confirm('Remove this stat?')) return;
    setForm((f) => ({ ...f, stats: f.stats.filter((_, j) => j !== i) }));
  };

  const upload = async (file) => {
    if (!file) return;
    setBusy(true); setError('');
    try { set('heroImage', await adminUploadImage(file)); }
    catch (e) { setError('Image upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    setError(''); setOkMsg('');
    const title = form.title.trim();
    if (!title) { setError('Please add a title.'); titleRef.current?.focus(); return; }
    const slug = form.slug.trim() || slugify(title);
    if (!slug) { setError('Please add a web address.'); return; }
    const scheduledMs = (!form.published && form.publishAt) ? Date.parse(form.publishAt) : NaN;
    const isScheduled = !Number.isNaN(scheduledMs);
    setBusy(true);
    try {
      await adminSaveCaseStudy({
        slug, title, client: form.client.trim(), industry: form.industry.trim(), summary: form.summary.trim(),
        challenge: form.challenge.trim(), solution: form.solution.trim(), results: form.results.trim(),
        stats: form.stats.map((s) => ({ value: (s.value || '').trim(), label: (s.label || '').trim() })).filter((s) => s.value || s.label),
        heroImage: form.heroImage.trim(), published: !!form.published, order: Number(form.order) || 0,
        metaTitle: form.metaTitle.trim(), canonical: form.canonical.trim(), ogImage: form.ogImage.trim(), noindex: !!form.noindex,
        ...(isScheduled ? { publishAt: scheduledMs } : {}),
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
        <h1>{isNew ? 'New case study' : 'Edit case study'}</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cms-btn" onClick={() => setPreviewOpen(true)} disabled={busy || !form.title.trim()}>Preview</button>
          <button className="cms-btn" onClick={cancel} disabled={busy}>Cancel</button>
          <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
      <div className="cms-wrap">
        {error && <p className="cms-err">{error}</p>}
        {okMsg && <p className="cms-ok-banner">{okMsg}</p>}

        {!isNew && (
          <VersionHistory
            label="this case study"
            load={() => adminListCaseStudyVersions(caseStudy.slug)}
            onRestore={async (vid) => {
              const snap = await adminRestoreCaseStudyVersion(caseStudy.slug, vid);
              const f = withStats(snap);
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
            <p className="cms-hint">/case-studies/{form.slug || '…'}{!isNew && ' · fixed after creation'}</p>
          </div>
          <div className="cms-field">
            <label>Sort order (lower shows first)</label>
            <input className="cms-input" type="number" style={{ maxWidth: 160 }} value={form.order} onChange={(e) => set('order', e.target.value)} />
          </div>
        </div>

        <div className="cms-row">
          <div className="cms-field">
            <label>Client / account</label>
            <input className="cms-input" value={form.client} onChange={(e) => set('client', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Industry</label>
            <input className="cms-input" value={form.industry} onChange={(e) => set('industry', e.target.value)} />
          </div>
        </div>

        <div className="cms-field">
          <label>Summary</label>
          <textarea className="cms-textarea" style={{ minHeight: 64 }} value={form.summary} onChange={(e) => set('summary', e.target.value)} />
          <p className="cms-hint">A 1–2 sentence overview, shown on the index and at the top of the page.</p>
        </div>

        <div className="cms-field">
          <label>Hero image</label>
          <input className="cms-input" placeholder="Image URL" value={form.heroImage} onChange={(e) => set('heroImage', e.target.value)} />
          <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => upload(e.target.files[0])} />
          {form.heroImage && <img className="cms-thumb-prev" src={form.heroImage} alt="" />}
        </div>

        <div className="cms-section-h">Key stats</div>
        {form.stats.map((s, i) => (
          <div className="cms-block" key={i}>
            <div className="cms-row">
              <div className="cms-field">
                <label>Number</label>
                <input className="cms-input" placeholder="e.g. 40%" value={s.value || ''} onChange={(e) => setStat(i, { value: e.target.value })} />
              </div>
              <div className="cms-field">
                <label>What it measures</label>
                <input className="cms-input" placeholder="e.g. faster rep ramp" value={s.label || ''} onChange={(e) => setStat(i, { label: e.target.value })} />
              </div>
            </div>
            <div className="cms-block-head" style={{ marginTop: 6 }}>
              <div className="cms-block-spacer" />
              <button className="cms-iconbtn" title="Remove" onClick={() => removeStat(i)}>✕</button>
            </div>
          </div>
        ))}
        <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={addStat}>+ Add a stat</button></div>

        <div className="cms-section-h">Story</div>
        <div className="cms-field">
          <label>The challenge</label>
          <textarea className="cms-textarea" value={form.challenge} onChange={(e) => set('challenge', e.target.value)} />
        </div>
        <div className="cms-field">
          <label>What we did</label>
          <textarea className="cms-textarea" value={form.solution} onChange={(e) => set('solution', e.target.value)} />
        </div>
        <div className="cms-field">
          <label>The results</label>
          <textarea className="cms-textarea" value={form.results} onChange={(e) => set('results', e.target.value)} />
        </div>

        <div className="cms-section-h">Search &amp; sharing (optional)</div>
        <div className="cms-field">
          <label>Browser / search title</label>
          <input className="cms-input" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
          <p className="cms-hint">Shown in the browser tab and Google. Defaults to the title.</p>
        </div>
        <div className="cms-row">
          <div className="cms-field">
            <label>Canonical URL</label>
            <input className="cms-input" placeholder="Leave blank unless this duplicates another page" value={form.canonical} onChange={(e) => set('canonical', e.target.value)} />
          </div>
          <div className="cms-field">
            <label>Social share image</label>
            <input className="cms-input" placeholder="Image URL (defaults to the hero image)" value={form.ogImage} onChange={(e) => set('ogImage', e.target.value)} />
          </div>
        </div>
        <label className="cms-check"><input type="checkbox" checked={form.noindex} onChange={(e) => set('noindex', e.target.checked)} /> Hide from search engines</label>

        <div className="cms-section-h">Publishing</div>
        <div className="cms-field">
          <label>Schedule publish for later (optional)</label>
          <input className="cms-input" type="datetime-local" style={{ maxWidth: 260 }} value={form.publishAt} disabled={form.published} onChange={(e) => set('publishAt', e.target.value)} />
          <p className="cms-hint">{form.published ? 'Already published.' : 'Leave “Published” off and set a time — it goes live automatically.'}</p>
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

      {previewOpen && (
        <div className="cms-preview-overlay">
          <div className="cms-preview-bar">
            <span>Preview — how this case study will look. Nothing is saved.</span>
            <button className="cms-btn cms-btn-sm" onClick={() => setPreviewOpen(false)}>Close preview</button>
          </div>
          <div className="cms-preview-body">
            <CaseStudyLayout cs={form} setPage={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
}
