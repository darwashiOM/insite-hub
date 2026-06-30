import { useId, useState } from 'react';

// Firestore Timestamp -> friendly local string.
function fmt(ts) {
  try { return ts?.toDate ? ts.toDate().toLocaleString() : 'just now'; }
  catch { return '—'; }
}

// Collapsible past-versions list with a Restore button per version.
// `load` returns [{ id, archivedAt }], `onRestore(id)` applies a version.
export default function VersionHistory({ load, onRestore, label = 'this content' }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const toggle = async () => {
    if (open) { setOpen(false); return; }
    setOpen(true); setErr('');
    if (versions === null) {
      setBusy(true);
      try { setVersions(await load()); }
      catch (e) { setErr('Could not load history: ' + (e.message || e)); }
      finally { setBusy(false); }
    }
  };

  const restore = async (v) => {
    if (!window.confirm(`Restore ${label} to the version from ${fmt(v.archivedAt)}? Your current version is saved to history first, so you can undo this.`)) return;
    setBusy(true); setErr('');
    try {
      await onRestore(v.id);
      setVersions(null); setOpen(false);   // refresh on next open
    } catch (e) {
      setErr('Restore failed: ' + (e.message || e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cms-history">
      <button type="button" className="cms-btn cms-btn-sm" onClick={toggle} disabled={busy}
        aria-expanded={open} aria-controls={panelId}>
        {open ? 'Hide version history' : 'Version history'}
      </button>
      {open && (
        <div className="cms-history-panel" id={panelId}>
          {busy && <p className="cms-hint" role="status">Working…</p>}
          {err && <p className="cms-err-inline" role="alert">{err}</p>}
          {versions && versions.length === 0 && (
            <p className="cms-hint">No earlier versions yet — history starts from your next save.</p>
          )}
          {versions && versions.length > 0 && (
            <ul className="cms-history-list">
              {versions.map((v) => (
                <li key={v.id}>
                  <span>{fmt(v.archivedAt)}</span>
                  <button type="button" className="cms-btn cms-btn-sm" onClick={() => restore(v)} disabled={busy}
                    aria-label={`Restore version from ${fmt(v.archivedAt)}`}>Restore</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
