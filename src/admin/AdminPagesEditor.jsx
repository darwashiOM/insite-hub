import { useEffect, useState } from 'react';
import { MANIFEST } from '../content/manifest';
import {
  adminGetPageContent, adminSavePageContent, adminUploadImage,
  adminListPageVersions, adminRestorePageVersion,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';

const PAGE_IDS = Object.keys(MANIFEST);

// Public path per page, for the "View this page" link.
const PAGE_PATHS = {
  home: '/', platform: '/platform', advisory: '/advisory', literacy: '/ai-literacy',
  insitex: '/insitex-lms', content: '/content-development', proxalab: '/the-lab',
  about: '/about', news: '/announcements', resources: '/resources',
  newsletter: '/newsletter', contact: '/contact', futureproof: '/future-proof-your-organization',
};

const sectionTitle = (key) => {
  const p = key.split('.')[0];
  return p.charAt(0).toUpperCase() + p.slice(1).replace(/([A-Z])/g, ' $1');
};

// Edit a page's text. Each box shows the current website text; editing it overrides
// the default. Only changed fields are saved (so "matches default" stays the default).
export default function AdminPagesEditor({ onDirtyChange }) {
  const [pageId, setPageId] = useState(PAGE_IDS[0]);
  const [values, setValues] = useState(null);   // editable current text per field
  const [saved, setSaved] = useState({});        // last-saved overrides (to detect changes)
  const [busy, setBusy] = useState(false);
  const [uploadingKey, setUploadingKey] = useState('');
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState('');
  const [onlyCustom, setOnlyCustom] = useState(false);
  const [seo, setSeo] = useState({ seoTitle: '', seoDescription: '', seoImage: '', seoNoindex: false });

  const fields = MANIFEST[pageId]?.fields || [];

  useEffect(() => {
    let alive = true;
    setValues(null); setStatus(''); setFilter(''); setOnlyCustom(false);
    adminGetPageContent(pageId).then((data) => {
      if (!alive) return;
      const ov = data || {};
      setSaved(ov);
      setSeo({ seoTitle: ov.seoTitle || '', seoDescription: ov.seoDescription || '', seoImage: ov.seoImage || '', seoNoindex: !!ov.seoNoindex });
      setValues(Object.fromEntries(fields.map((f) =>
        [f.key, ov[f.key] != null && ov[f.key] !== '' ? ov[f.key] : f.default])));
    }).catch(() => {
      if (!alive) return;
      setSaved({});
      setValues(Object.fromEntries(fields.map((f) => [f.key, f.default])));
    });
    return () => { alive = false; };
  }, [pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  const savedEff = (f) => (saved[f.key] != null && saved[f.key] !== '' ? saved[f.key] : f.default);
  const savedSeo = { seoTitle: saved.seoTitle || '', seoDescription: saved.seoDescription || '', seoImage: saved.seoImage || '', seoNoindex: !!saved.seoNoindex };
  const dirty = !!values && (fields.some((f) => String(values[f.key] ?? '') !== String(savedEff(f))) || JSON.stringify(seo) !== JSON.stringify(savedSeo));
  const setSeoField = (k, v) => setSeo((s) => ({ ...s, [k]: v }));

  useEffect(() => { onDirtyChange?.(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const setField = (k, v) => setValues((m) => ({ ...m, [k]: v }));

  const switchPage = (id) => {
    if (dirty && !window.confirm('You have unsaved changes. Discard them?')) return;
    setPageId(id);
  };

  const upload = async (file, key) => {
    if (!file) return;
    setUploadingKey(key); setStatus('');
    try { setField(key, await adminUploadImage(file)); }
    catch (e) { setStatus('Image upload failed: ' + (e.message || e)); }
    finally { setUploadingKey(''); }
  };

  const save = async () => {
    setBusy(true); setStatus('');
    const data = {};
    fields.forEach((f) => {
      const v = (values[f.key] ?? '').toString();
      if (v.trim() && v !== f.default) data[f.key] = v; // store only real changes
    });
    if (seo.seoTitle.trim()) data.seoTitle = seo.seoTitle.trim();
    if (seo.seoDescription.trim()) data.seoDescription = seo.seoDescription.trim();
    if (seo.seoImage.trim()) data.seoImage = seo.seoImage.trim();
    if (seo.seoNoindex) data.seoNoindex = true;
    try {
      await adminSavePageContent(pageId, data);
      setSaved(data);
      setSeo({ seoTitle: data.seoTitle || '', seoDescription: data.seoDescription || '', seoImage: data.seoImage || '', seoNoindex: !!data.seoNoindex });
      // Re-sync the fields to exactly what was saved so "• changed" badges clear
      // and any box cleared-to-empty (which can't be saved) reverts to its default.
      setValues(Object.fromEntries(fields.map((f) =>
        [f.key, data[f.key] != null && data[f.key] !== '' ? data[f.key] : f.default])));
      setStatus('saved');
    } catch (e) {
      setStatus(/permission/i.test(e.message || '')
        ? 'timeout'
        : 'Save failed: ' + (e.message || e));
    } finally {
      setBusy(false);
    }
  };

  const restorePageVersion = async (vid) => {
    const id = pageId;
    const ov = (await adminRestorePageVersion(id, vid)) || {};
    if (id !== pageId) return; // switched pages mid-restore; the [pageId] effect owns state now
    setSaved(ov);
    setSeo({ seoTitle: ov.seoTitle || '', seoDescription: ov.seoDescription || '', seoImage: ov.seoImage || '', seoNoindex: !!ov.seoNoindex });
    setValues(Object.fromEntries(fields.map((f) =>
      [f.key, ov[f.key] != null && ov[f.key] !== '' ? ov[f.key] : f.default])));
    setStatus('saved');
  };

  // visible fields after filter / only-customized, grouped by section
  const visible = (values ? fields : []).filter((f) => {
    if (onlyCustom && String(values[f.key] ?? '') === String(f.default)) return false;
    if (filter) {
      const q = filter.toLowerCase();
      return f.label.toLowerCase().includes(q) || String(f.default).toLowerCase().includes(q);
    }
    return true;
  });
  const groups = [];
  visible.forEach((f) => {
    const s = sectionTitle(f.key);
    let g = groups[groups.length - 1];
    if (!g || g.section !== s) { g = { section: s, items: [] }; groups.push(g); }
    g.items.push(f);
  });

  const viewHref = (PAGE_PATHS[pageId] || '/') + '?cmsbust=' + Date.now();

  return (
    <div>
      <div className="cms-pages-head">
        <div className="cms-field" style={{ maxWidth: 280, marginBottom: 0 }}>
          <label>Which page</label>
          <select className="cms-select" value={pageId} onChange={(e) => switchPage(e.target.value)}>
            {PAGE_IDS.map((id) => <option key={id} value={id}>{MANIFEST[id].label}</option>)}
          </select>
        </div>
        <a className="cms-btn cms-btn-sm" href={viewHref} target="_blank" rel="noopener noreferrer">View this page ↗</a>
      </div>

      <p className="cms-intro">
        Each box shows the text that’s on the website now — just edit it. Leave a box as-is to keep it.
        Use <em>Restore original</em> to undo a change. Saving updates the live site within about a minute.
      </p>

      <VersionHistory
        key={pageId}
        label="this page"
        load={() => adminListPageVersions(pageId)}
        onRestore={restorePageVersion}
      />

      {values === null ? (
        <p style={{ color: '#5c6370' }}>Loading…</p>
      ) : (
        <>
          <div className="cms-filters">
            <input className="cms-input" style={{ maxWidth: 280 }} placeholder="Filter fields…"
              value={filter} onChange={(e) => setFilter(e.target.value)} />
            <label className="cms-check" style={{ fontSize: 13 }}>
              <input type="checkbox" checked={onlyCustom} onChange={(e) => setOnlyCustom(e.target.checked)} />
              Show only my changes
            </label>
          </div>

          {groups.length === 0 && <p style={{ color: '#5c6370' }}>No fields match.</p>}

          {groups.map((g) => (
            <div key={g.section}>
              <div className="cms-section-h">{g.section}</div>
              {g.items.map((f) => {
                const val = values[f.key] ?? '';
                const changed = String(val) !== String(f.default);
                return (
                  <div className="cms-field" key={f.key}>
                    <label>
                      {f.label}{changed && <span className="cms-changed">• changed</span>}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea className="cms-textarea" value={val} onChange={(e) => setField(f.key, e.target.value)} />
                    ) : f.type === 'image' ? (
                      <>
                        <input className="cms-input" value={val} placeholder="Image URL" onChange={(e) => setField(f.key, e.target.value)} />
                        <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" style={{ marginTop: 8 }} onChange={(e) => upload(e.target.files[0], f.key)} />
                        {uploadingKey === f.key && <span className="cms-hint">Uploading…</span>}
                        {val && <img className="cms-thumb-prev" src={val} alt="" />}
                      </>
                    ) : (
                      <input className="cms-input" value={val} onChange={(e) => setField(f.key, e.target.value)} />
                    )}
                    {changed && (
                      <p className="cms-hint">
                        <button type="button" className="cms-linkbtn" onClick={() => setField(f.key, f.default)}>Restore original</button>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {!filter && !onlyCustom && (
            <>
              <div className="cms-section-h">Search &amp; sharing (SEO)</div>
              <div className="cms-field">
                <label>Search title (browser tab + Google)</label>
                <input className="cms-input" placeholder="Defaults to the built-in page title" value={seo.seoTitle} onChange={(e) => setSeoField('seoTitle', e.target.value)} />
              </div>
              <div className="cms-field">
                <label>Search description</label>
                <textarea className="cms-textarea" style={{ minHeight: 56 }} placeholder="The summary shown in Google + link previews" value={seo.seoDescription} onChange={(e) => setSeoField('seoDescription', e.target.value)} />
              </div>
              <div className="cms-field">
                <label>Social share image</label>
                <input className="cms-input" placeholder="Image URL (defaults to the site image)" value={seo.seoImage} onChange={(e) => setSeoField('seoImage', e.target.value)} />
              </div>
              <label className="cms-check"><input type="checkbox" checked={seo.seoNoindex} onChange={(e) => setSeoField('seoNoindex', e.target.checked)} /> Hide this page from search engines</label>
            </>
          )}

          <div className="cms-toolbar">
            <div className="cms-savemsg">
              {status === 'saved' && <span className="cms-ok">✓ Saved. Refresh the page in about a minute to see it live.</span>}
              {status === 'timeout' && <span className="cms-err-inline">Your session timed out — your text is safe. Log in again, then Save.</span>}
              {status && status !== 'saved' && status !== 'timeout' && <span className="cms-err-inline">{status}</span>}
            </div>
            <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy || !dirty}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
