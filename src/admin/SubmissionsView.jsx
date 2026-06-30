import { useEffect, useState } from 'react';
import { adminListSubmissions } from '../lib/adminBlog';

const fmtDate = (ts) => { try { return ts?.toDate ? ts.toDate().toLocaleString() : ''; } catch { return ''; } };

function toCsv(rows) {
  const esc = (v) => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const dataKeys = [...new Set(rows.flatMap((r) => Object.keys(r.data || {})))];
  const utmKeys = [...new Set(rows.flatMap((r) => Object.keys(r.utm || {})))];
  const header = ['Submitted', 'Form', ...dataKeys, ...utmKeys.map((k) => `utm:${k}`), 'consent'];
  const lines = [header.map(esc).join(',')];
  rows.forEach((r) => {
    lines.push([
      fmtDate(r.createdAt), r.formName || r.formSlug,
      ...dataKeys.map((k) => (r.data || {})[k] || ''),
      ...utmKeys.map((k) => (r.utm || {})[k] || ''),
      r.consent ? 'yes' : '',
    ].map(esc).join(','));
  });
  return lines.join('\n');
}

export default function SubmissionsView({ onBack }) {
  const [subs, setSubs] = useState(null);
  const [formFilter, setFormFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    adminListSubmissions()
      .then((s) => { if (alive) setSubs(s); })
      .catch(() => { if (alive) { setSubs([]); setError('Could not load submissions.'); } });
    return () => { alive = false; };
  }, []);

  const forms = subs ? [...new Set(subs.map((s) => s.formName || s.formSlug).filter(Boolean))].sort() : [];
  const shown = (subs || []).filter((s) => !formFilter || (s.formName || s.formSlug) === formFilter);

  const exportCsv = () => {
    const blob = new Blob([toCsv(shown)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `submissions-${formFilter || 'all'}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="cms-pages-head">
        <button className="cms-btn cms-btn-sm" onClick={onBack}>← Back to forms</button>
        <div className="cms-block-spacer" />
        {forms.length > 1 && (
          <select className="cms-select" style={{ maxWidth: 240 }} value={formFilter} onChange={(e) => setFormFilter(e.target.value)}>
            <option value="">All forms</option>
            {forms.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        )}
        <button className="cms-btn cms-btn-sm" onClick={exportCsv} disabled={!shown.length}>Export CSV</button>
      </div>

      {error && <p className="cms-err">{error}</p>}
      {subs === null ? <p style={{ color: '#5c6370' }}>Loading…</p>
        : shown.length === 0 ? <p style={{ color: '#5c6370' }}>No submissions yet.</p>
        : (
          <div className="cms-list">
            {shown.map((s) => (
              <div className="cms-card" key={s.id} style={{ alignItems: 'flex-start' }}>
                <div className="cms-card-main">
                  <p className="cms-card-title">{s.formName || s.formSlug}</p>
                  <p className="cms-card-meta">{fmtDate(s.createdAt)}</p>
                  <div className="cms-sub-data">
                    {Object.entries(s.data || {}).map(([k, v]) => <div key={k}><strong>{k}:</strong> {String(v)}</div>)}
                    {Object.entries(s.utm || {}).filter(([, v]) => v).map(([k, v]) => <div key={k} className="cms-sub-utm"><strong>{k}:</strong> {String(v)}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
