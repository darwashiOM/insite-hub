import { useEffect, useRef, useState } from 'react';

// Crash-safe local backup. While the form has unsaved changes we keep a copy in
// localStorage; if the editor reopens and finds one (browser crash, dead laptop,
// expired session), the editor can offer to restore it. Best-effort — storage
// errors are swallowed so it can never break the editor itself.
// `initialJson` is what the editor loaded: a stored backup identical to it is a
// no-op and gets dropped instead of nagging.
export function useDraftBackup(key, form, dirty, initialJson) {
  const storageKey = `cms-backup:${key}`;
  const [backup, setBackup] = useState(() => {
    try {
      const b = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (!b || !b.form) return null;
      if (initialJson && JSON.stringify(b.form) === initialJson) { localStorage.removeItem(storageKey); return null; }
      return b;
    } catch { return null; }
  });

  useEffect(() => {
    // Never overwrite an unresolved crash backup — while the restore offer is
    // pending, new keystrokes must not destroy the very draft being offered.
    if (!dirty || backup) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(storageKey, JSON.stringify({ form, at: Date.now() })); } catch { /* best effort */ }
    }, 600);
    return () => clearTimeout(t);
  }, [form, dirty, storageKey, backup]);

  const clear = () => { try { localStorage.removeItem(storageKey); } catch { /* best effort */ } setBackup(null); };
  return { backup, clear };
}

// Cmd/Ctrl+S saves instead of opening the browser's save dialog.
export function useSaveShortcut(save) {
  const ref = useRef(save);
  useEffect(() => { ref.current = save; });
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        ref.current();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
}

// Auto-fade a saved-✓ message after a few seconds (editors now stay open after save).
export function useFadingMessage(msg, setMsg, ms = 4000) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(''), ms);
    return () => clearTimeout(t);
  }, [msg, setMsg, ms]);
}
