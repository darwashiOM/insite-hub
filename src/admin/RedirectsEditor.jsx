import { useEffect, useState } from 'react';
import {
  adminGetPageContent, adminSavePageContent,
  adminListPageVersions, adminRestorePageVersion,
} from '../lib/adminBlog';
import VersionHistory from './VersionHistory';

// Marketer-managed redirects, stored at siteContent/redirects and delivered to
// the live site via getContent (App.jsx applies them on load).
export default function RedirectsEditor({ onDirtyChange }) {
  const [rules, setRules] = useState(null);
  const [saved, setSaved] = useState('[]');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const loadInto = (data) => {
    const r = (data && Array.isArray(data.rules)) ? data.rules : [];
    const clone = r.map((x) => ({ from: x.from || '', to: x.to || '' }));
    setRules(clone);
    setSaved(JSON.stringify(clone));
  };

  useEffect(() => {
    let alive = true;
    adminGetPageContent('redirects')
      .then((d) => { if (alive) loadInto(d); })
      .catch(() => { if (alive) loadInto({}); });
    return () => { alive = false; };
  }, []);

  const dirty = !!rules && JSON.stringify(rules) !== saved;
  useEffect(() => { onDirtyChange?.(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const set = (i, patch) => setRules((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () => setRules((rs) => [...rs, { from: '', to: '' }]);
  const remove = (i) => setRules((rs) => rs.filter((_, j) => j !== i));

  const save = async () => {
    setBusy(true); setStatus('');
    try {
      // normalize + guard against the classic redirect mistakes
      const norm = (p) => (/^https?:\/\//.test(p) ? p : '/' + p.replace(/^\/+/, ''));
      const clean = rules.filter((r) => r.from.trim() && r.to.trim())
        .map((r) => ({ from: norm(r.from.trim()), to: norm(r.to.trim()) }));
      const loops = clean.filter((r) => r.from === r.to);
      if (loops.length) { setStatus(`“${loops[0].from}” redirects to itself — fix that rule first.`); setBusy(false); return; }
      const seen = new Set();
      for (const r of clean) {
        if (seen.has(r.from)) { setStatus(`Two rules start from “${r.from}” — remove one of them.`); setBusy(false); return; }
        seen.add(r.from);
      }
      const chain = clean.find((r) => clean.some((o) => o.from === r.to));
      if (chain) { setStatus(`“${chain.from} → ${chain.to}” points at another redirect — point it straight at the final page instead.`); setBusy(false); return; }
      await adminSavePageContent('redirects', { rules: clean });
      loadInto({ rules: clean });
      setStatus('saved');
    } catch (e) {
      setStatus(/permission/i.test(e.message || '') ? 'timeout' : 'Save failed: ' + (e.message || e));
    } finally {
      setBusy(false);
    }
  };

  if (rules === null) return <p style={{ color: '#5c6370' }}>Loading…</p>;

  return (
    <div>
      <p className="cms-intro">
        When a page’s address changes, add a redirect so the old link forwards to the new one — so you don’t lose search rankings or break links.
        <em> From</em> is a path on this site (e.g. /old-page); <em>To</em> is a path (/new-page) or a full URL.
      </p>

      <VersionHistory label="the redirects" load={() => adminListPageVersions('redirects')}
        onRestore={async (vid) => { const snap = await adminRestorePageVersion('redirects', vid); loadInto(snap); setStatus('saved'); }} />

      {rules.length === 0 && <p className="cms-hint">No redirects yet.</p>}
      {rules.map((r, i) => (
        <div className="cms-row" key={i} style={{ alignItems: 'flex-end' }}>
          <div className="cms-field"><label>From (old path)</label><input className="cms-input" placeholder="/old-page" value={r.from} onChange={(e) => set(i, { from: e.target.value })} /></div>
          <div className="cms-field"><label>To (new path or URL)</label><input className="cms-input" placeholder="/new-page" value={r.to} onChange={(e) => set(i, { to: e.target.value })} /></div>
          <button className="cms-iconbtn" title="Remove" onClick={() => remove(i)} style={{ marginBottom: 18 }}>✕</button>
        </div>
      ))}
      <div className="cms-addrow"><button className="cms-btn cms-btn-sm" onClick={add}>+ Add a redirect</button></div>

      <div className="cms-toolbar">
        <div className="cms-savemsg">
          {status === 'saved' && <span className="cms-ok">✓ Saved. Applies on the live site within about a minute.</span>}
          {status === 'timeout' && <span className="cms-err-inline">Your session timed out — log in again, then Save.</span>}
          {status && status !== 'saved' && status !== 'timeout' && <span className="cms-err-inline">{status}</span>}
        </div>
        <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy || !dirty}>{busy ? 'Saving…' : 'Save redirects'}</button>
      </div>
    </div>
  );
}
