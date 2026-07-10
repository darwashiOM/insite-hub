import { useEffect, useState } from 'react';
import { adminGetPageContent, adminSavePageContent } from '../lib/adminBlog';
import { DEFAULT_CATEGORIES } from './categories';

// Compact panel on the Blog tab for editing the preset category list
// (stored in siteContent/blogSettings, read by the article editor's dropdown).
export default function CategoriesEditor({ onClose }) {
  const [cats, setCats] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let alive = true;
    adminGetPageContent('blogSettings')
      .then((d) => { if (alive) setCats(Array.isArray(d.categories) && d.categories.length ? d.categories : DEFAULT_CATEGORIES); })
      .catch(() => { if (alive) setCats(DEFAULT_CATEGORIES); });
    return () => { alive = false; };
  }, []);

  const save = async () => {
    const clean = [...new Set(cats.map((c) => c.trim()).filter(Boolean))];
    if (!clean.length) { setStatus('Keep at least one category.'); return; }
    setBusy(true); setStatus('');
    try {
      await adminSavePageContent('blogSettings', { categories: clean });
      setCats(clean);
      setStatus('Saved ✓');
    } catch (e) {
      setStatus(/permission/i.test(e.message || '') ? 'Your session timed out — log in again, then Save.' : 'Save failed: ' + (e.message || e));
    } finally { setBusy(false); }
  };

  if (cats === null) return <p style={{ color: '#5c6370' }}>Loading categories…</p>;

  return (
    <div className="cms-history-panel" style={{ marginBottom: 18 }}>
      <p className="cms-hint" style={{ marginTop: 0 }}>These are the choices in the post editor’s Category dropdown. Posts already using a removed category keep it.</p>
      {cats.map((c, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input className="cms-input" value={c} onChange={(e) => setCats(cats.map((x, j) => (j === i ? e.target.value : x)))} />
          <button className="cms-iconbtn" title="Remove" onClick={() => setCats(cats.filter((_, j) => j !== i))}>✕</button>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className="cms-btn cms-btn-sm" onClick={() => setCats([...cats, ''])}>+ Add category</button>
        <div style={{ flex: 1 }} />
        {status && <span className="cms-hint" style={{ margin: 0 }}>{status}</span>}
        <button className="cms-btn cms-btn-sm" onClick={onClose}>Close</button>
        <button className="cms-btn cms-btn-sm cms-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save categories'}</button>
      </div>
    </div>
  );
}
