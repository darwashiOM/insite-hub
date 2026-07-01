import { useEffect, useState } from 'react';
import { adminListActivity } from '../lib/adminBlog';

const when = (ts) => { try { return ts && ts.toDate ? ts.toDate().toLocaleString() : ''; } catch { return ''; } };

// Admin-only activity log: who changed what, when.
export default function ActivityView() {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    let alive = true;
    adminListActivity().then((r) => { if (alive) setRows(r); }).catch(() => { if (alive) setRows([]); });
    return () => { alive = false; };
  }, []);

  if (rows === null) return <p style={{ color: '#5c6370' }}>Loading…</p>;
  if (!rows.length) return <p style={{ color: '#5c6370' }}>No activity recorded yet.</p>;
  return (
    <div>
      <p className="cms-intro">A record of every content change — the role that made it, what changed, and when.</p>
      <div className="cms-list">
        {rows.map((r) => (
          <div className="cms-card" key={r.id}>
            <div className="cms-card-main">
              <p className="cms-card-title">{r.action} · {r.collection}{r.docId ? ` / ${r.docId}` : ''}</p>
              <p className="cms-card-meta">{r.actor || 'admin'} · {when(r.at)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
