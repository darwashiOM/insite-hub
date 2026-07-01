// Small banner shown when a crash backup exists for this document
// (see useDraftBackup in useEditorSafety.js).
export default function RestoreBanner({ backup, initialJson, onRestore, onDiscard }) {
  if (!backup || JSON.stringify(backup.form) === initialJson) return null;
  const when = new Date(backup.at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  return (
    <div className="cms-restore-banner">
      <span>You have edits from <strong>{when}</strong> that were never saved (the editor closed unexpectedly).</span>
      <span style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button className="cms-btn cms-btn-sm cms-btn-primary" onClick={onRestore}>Restore them</button>
        <button className="cms-btn cms-btn-sm" onClick={onDiscard}>Discard</button>
      </span>
    </div>
  );
}
