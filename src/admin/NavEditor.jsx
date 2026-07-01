import { useEffect, useState } from 'react';
import {
  adminGetPageContent, adminSavePageContent,
  adminListPageVersions, adminRestorePageVersion,
} from '../lib/adminBlog';
import { DEFAULT_MENUS, MENU_LABELS, NAV_DESTINATIONS, mergeMenus } from '../content/navConfig';
import VersionHistory from './VersionHistory';

const MENU_KEYS = Object.keys(DEFAULT_MENUS);

// Edit the header dropdown menus (Platform / Solutions / Resources). Stored as a
// content override at siteContent/nav and delivered to the live site like other
// page content.
export default function NavEditor({ onDirtyChange }) {
  const [menus, setMenus] = useState(null);
  const [saved, setSaved] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const loadInto = (data) => {
    const clone = JSON.parse(JSON.stringify(mergeMenus(data || {})));
    setMenus(clone);
    setSaved(JSON.stringify(clone));
  };

  useEffect(() => {
    let alive = true;
    adminGetPageContent('nav')
      .then((data) => { if (alive) loadInto(data); })
      .catch(() => { if (alive) loadInto({}); });
    return () => { alive = false; };
  }, []);

  const dirty = !!menus && JSON.stringify(menus) !== saved;
  useEffect(() => { onDirtyChange?.(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => {
    const h = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const update = (key, fn) => setMenus((m) => ({ ...m, [key]: fn(m[key]) }));
  const setItem = (key, i, patch) => update(key, (list) => list.map((it, j) => (j === i ? { ...it, ...patch } : it)));
  const addItem = (key) => update(key, (list) => [...list, { label: 'New item', page: NAV_DESTINATIONS[0].page }]);
  const removeItem = (key, i) => {
    const it = menus[key]?.[i];
    const named = it && String(it.label || '').trim() && it.label !== 'New item';
    if (named && !window.confirm(`Remove the "${it.label}" menu item?`)) return;
    update(key, (list) => list.filter((_, j) => j !== i));
  };
  const moveItem = (key, i, dir) => update(key, (list) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return list;
    const next = list.slice();
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  });

  const save = async () => {
    setBusy(true); setStatus('');
    try {
      const clean = {};
      for (const key of MENU_KEYS) {
        clean[key] = (menus[key] || [])
          .filter((it) => (it.label || '').trim())
          .map((it) => ({ label: it.label.trim(), page: it.page }));
      }
      await adminSavePageContent('nav', { menus: clean });
      loadInto({ menus: clean });
      setStatus('saved');
    } catch (e) {
      setStatus(/permission/i.test(e.message || '') ? 'timeout' : 'Save failed: ' + (e.message || e));
    } finally {
      setBusy(false);
    }
  };

  const resetAll = () => { if (window.confirm('Reset all three menus to the original defaults?')) loadInto({}); };

  if (menus === null) return <p style={{ color: '#5c6370' }}>Loading…</p>;

  return (
    <div>
      <p className="cms-intro">
        Edit the <em>Platform</em>, <em>Solutions</em>, and <em>Resources</em> dropdown menus. Add an item,
        pick where it links, and reorder with the arrows. Saving updates the live site within about a minute.
      </p>

      <VersionHistory
        label="the navigation"
        load={() => adminListPageVersions('nav')}
        onRestore={async (vid) => { const snap = await adminRestorePageVersion('nav', vid); loadInto(snap); setStatus('saved'); }}
      />

      {MENU_KEYS.map((key) => (
        <div key={key}>
          <div className="cms-section-h">{MENU_LABELS[key]} menu</div>
          {menus[key].map((it, i) => (
            <div className="cms-block" key={i}>
              <div className="cms-row">
                <div className="cms-field">
                  <label>Label</label>
                  <input className="cms-input" value={it.label} onChange={(e) => setItem(key, i, { label: e.target.value })} />
                </div>
                <div className="cms-field">
                  <label>Links to</label>
                  <select className="cms-select" value={it.page} onChange={(e) => setItem(key, i, { page: e.target.value })}>
                    {NAV_DESTINATIONS.map((d) => <option key={d.page} value={d.page}>{d.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="cms-block-head" style={{ marginTop: 6 }}>
                <div className="cms-block-spacer" />
                <button className="cms-iconbtn" title="Move up" onClick={() => moveItem(key, i, -1)} disabled={i === 0}>↑</button>
                <button className="cms-iconbtn" title="Move down" onClick={() => moveItem(key, i, 1)} disabled={i === menus[key].length - 1}>↓</button>
                <button className="cms-iconbtn" title="Remove" onClick={() => removeItem(key, i)}>✕</button>
              </div>
            </div>
          ))}
          <div className="cms-addrow">
            <button className="cms-btn cms-btn-sm" onClick={() => addItem(key)}>+ Add item to {MENU_LABELS[key]}</button>
          </div>
        </div>
      ))}

      <div className="cms-toolbar">
        <div className="cms-savemsg">
          {status === 'saved' && <span className="cms-ok">✓ Saved. Refresh the site in about a minute to see it.</span>}
          {status === 'timeout' && <span className="cms-err-inline">Your session timed out — log in again, then Save.</span>}
          {status && status !== 'saved' && status !== 'timeout' && <span className="cms-err-inline">{status}</span>}
        </div>
        <button className="cms-btn" onClick={resetAll} disabled={busy}>Reset to defaults</button>
        <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy || !dirty}>{busy ? 'Saving…' : 'Save changes'}</button>
      </div>
    </div>
  );
}
