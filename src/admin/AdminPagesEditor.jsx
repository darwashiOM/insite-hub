import { useEffect, useState } from 'react';
import { MANIFEST } from '../content/manifest';
import { adminGetPageContent, adminSavePageContent, adminUploadImage } from '../lib/adminBlog';

const PAGE_IDS = Object.keys(MANIFEST);

// Edit per-page content overrides. Empty field = use the in-code default (shown as
// placeholder). Saving writes only the non-empty overrides to siteContent/{page}.
export default function AdminPagesEditor() {
  const [pageId, setPageId] = useState(PAGE_IDS[0]);
  const [values, setValues] = useState(null); // { key: overrideValue }
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let alive = true;
    setValues(null); setStatus('');
    adminGetPageContent(pageId)
      .then((data) => { if (alive) setValues(data || {}); })
      .catch(() => { if (alive) setValues({}); });
    return () => { alive = false; };
  }, [pageId]);

  const fields = MANIFEST[pageId]?.fields || [];
  const setField = (key, v) => setValues((m) => ({ ...m, [key]: v }));

  const upload = async (file, key) => {
    if (!file) return;
    setBusy(true); setStatus('');
    try { setField(key, await adminUploadImage(file)); }
    catch (e) { setStatus('Image upload failed: ' + (e.message || e)); }
    finally { setBusy(false); }
  };

  const save = async () => {
    setBusy(true); setStatus('');
    // Persist only non-empty overrides; empty means "use the default".
    const data = {};
    fields.forEach((f) => {
      const v = (values?.[f.key] ?? '').toString().trim();
      if (v) data[f.key] = v;
    });
    try {
      await adminSavePageContent(pageId, data);
      setStatus('Saved — live within ~1 minute.');
    } catch (e) {
      setStatus('Save failed: ' + (e.message || e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {PAGE_IDS.length > 1 && (
        <div className="cms-field" style={{ maxWidth: 260 }}>
          <label>Page</label>
          <select className="cms-select" value={pageId} onChange={(e) => setPageId(e.target.value)}>
            {PAGE_IDS.map((id) => <option key={id} value={id}>{MANIFEST[id].label}</option>)}
          </select>
        </div>
      )}

      {values === null ? (
        <p style={{ color: '#5c6370' }}>Loading…</p>
      ) : (
        <>
          {status && <p className="cms-hint" style={{ marginBottom: 14 }}>{status}</p>}
          {fields.map((f) => {
            const val = values[f.key] ?? '';
            return (
              <div className="cms-field" key={f.key}>
                <label>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea className="cms-textarea" value={val} placeholder={f.default}
                    onChange={(e) => setField(f.key, e.target.value)} />
                ) : f.type === 'image' ? (
                  <>
                    <input className="cms-input" value={val} placeholder="Image URL"
                      onChange={(e) => setField(f.key, e.target.value)} />
                    <input type="file" accept="image/*" style={{ marginTop: 8 }}
                      onChange={(e) => upload(e.target.files[0], f.key)} />
                    {val && <img className="cms-thumb-prev" src={val} alt="" />}
                  </>
                ) : (
                  <input className="cms-input" value={val} placeholder={f.default}
                    onChange={(e) => setField(f.key, e.target.value)} />
                )}
                <p className="cms-hint">
                  Default: {String(f.default).slice(0, 90)}{String(f.default).length > 90 ? '…' : ''}
                  {val ? <> · <button type="button" className="cms-linkbtn" onClick={() => setField(f.key, '')}>reset to default</button></> : null}
                </p>
              </div>
            );
          })}

          <div className="cms-toolbar">
            <div className="cms-toolbar-spacer" />
            <button className="cms-btn cms-btn-primary" onClick={save} disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
