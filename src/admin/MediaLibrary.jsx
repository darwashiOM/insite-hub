import { useEffect, useState, useCallback, useRef } from 'react';
import { adminListMedia, adminUploadImage, adminUploadMediaFile, adminUpdateMediaAlt, adminDeleteMedia } from '../lib/adminBlog';

const isImage = (m) => !m.isFile && (m.contentType || '').startsWith('image/');

// Central image library: upload, browse, search, give alt text, and copy a link to reuse.
export default function MediaLibrary() {
  const [media, setMedia] = useState(null);
  const [filter, setFilter] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const fileRef = useRef(null);
  const docRef = useRef(null);

  const refresh = useCallback(async () => { setMedia(await adminListMedia().catch(() => [])); }, []);
  useEffect(() => {
    let alive = true;
    adminListMedia().then((m) => { if (alive) setMedia(m); }).catch(() => { if (alive) setMedia([]); });
    return () => { alive = false; };
  }, []);

  const upload = useCallback(async (files) => {
    if (!files || !files.length) return;
    setBusy(true); setStatus('');
    try {
      for (const f of files) await adminUploadImage(f);
      await refresh();
      setStatus(`Uploaded ${files.length} file${files.length === 1 ? '' : 's'} ✓`);
    } catch (e) {
      setStatus('Upload failed: ' + (e.message || e));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }, [refresh]);

  // Paste an image anywhere on the Media tab to upload it (screenshots!).
  useEffect(() => {
    const h = (e) => {
      const files = [...(e.clipboardData?.files || [])].filter((f) => f.type.startsWith('image/'));
      if (files.length) { e.preventDefault(); upload(files); }
    };
    window.addEventListener('paste', h);
    return () => window.removeEventListener('paste', h);
  }, [upload]);

  const [dragOver, setDragOver] = useState(false);
  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const files = [...e.dataTransfer.files];
    const imgs = files.filter((f) => f.type.startsWith('image/'));
    const docs = files.filter((f) => !f.type.startsWith('image/'));
    if (imgs.length) upload(imgs);
    if (docs.length) uploadDocs(docs);
  };

  const uploadDocs = async (files) => {
    if (!files || !files.length) return;
    setBusy(true); setStatus('');
    try {
      for (const f of files) await adminUploadMediaFile(f);
      await refresh();
      setStatus(`Uploaded ${files.length} file${files.length === 1 ? '' : 's'} ✓`);
    } catch (e) {
      setStatus('Upload failed: ' + errMsg(e));
    } finally {
      setBusy(false);
      if (docRef.current) docRef.current.value = '';
    }
  };

  const setAlt = (id, alt) => setMedia((m) => m.map((x) => (x.id === id ? { ...x, alt } : x)));
  const errMsg = (e) => (/permission/i.test(e?.message || '') ? 'Your session timed out — log out and back in, then try again.' : (e?.message || String(e)));
  const saveAlt = async (id, alt) => {
    try { await adminUpdateMediaAlt(id, alt); }
    catch (e) { setStatus('Alt text didn’t save: ' + errMsg(e)); }
  };
  const remove = async (m) => {
    if (!window.confirm('Remove this image from the library? It stays available wherever it’s already used.')) return;
    setStatus('');
    try { await adminDeleteMedia(m.id); await refresh(); }
    catch (e) { setStatus('Remove failed: ' + errMsg(e)); }
  };
  const copyUrl = (m) => { if (navigator.clipboard) navigator.clipboard.writeText(m.url); setCopiedId(m.id); setTimeout(() => setCopiedId(''), 1500); };

  const shown = (media || []).filter((m) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return (m.filename || '').toLowerCase().includes(q) || (m.alt || '').toLowerCase().includes(q);
  });

  return (
    <div className={'cms-dropzone' + (dragOver ? ' on' : '')}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}>
      <div className="cms-pages-head">
        <div className="cms-field" style={{ maxWidth: 280, marginBottom: 0 }}>
          <label>Search</label>
          <input className="cms-input" placeholder="Filename or alt text…" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {status && <span className="cms-hint">{status}</span>}
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp" multiple style={{ display: 'none' }} onChange={(e) => upload([...e.target.files])} />
          <input ref={docRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.zip" multiple style={{ display: 'none' }} onChange={(e) => uploadDocs([...e.target.files])} />
          <button className="cms-btn" onClick={() => docRef.current?.click()} disabled={busy}>+ Upload files</button>
          <button className="cms-btn cms-btn-primary" onClick={() => fileRef.current?.click()} disabled={busy}>{busy ? 'Uploading…' : '+ Upload images'}</button>
        </div>
      </div>

      <p className="cms-intro">
        Upload once, reuse anywhere. Give each image <em>alt text</em> — a short description that helps accessibility and search.
        Use <em>Copy link</em> to paste an image into a post or page. Tip: you can also <em>drag &amp; drop</em> files anywhere
        on this tab, or <em>paste</em> a screenshot straight in.
      </p>

      {media === null ? (
        <p style={{ color: '#5c6370' }}>Loading…</p>
      ) : shown.length === 0 ? (
        <p style={{ color: '#5c6370' }}>{media.length === 0 ? 'No images yet. Click “Upload images”.' : 'No images match your search.'}</p>
      ) : (
        <div className="cms-media-grid">
          {shown.map((m) => (
            <div className="cms-media-item" key={m.id}>
              {isImage(m) ? (
                <>
                  <div className="cms-media-thumb" style={{ backgroundImage: `url(${m.url})` }} />
                  <input className="cms-input cms-media-alt" placeholder="Alt text (describe the image)" value={m.alt || ''}
                    onChange={(e) => setAlt(m.id, e.target.value)} onBlur={(e) => saveAlt(m.id, e.target.value)} />
                  {!m.alt && <p className="cms-media-warn">⚠ Add alt text</p>}
                </>
              ) : (
                <>
                  <div className="cms-media-thumb cms-media-file"><span aria-hidden="true">📄</span></div>
                  <p className="cms-media-filename" title={m.filename}>{m.filename || 'File'}</p>
                </>
              )}
              <div className="cms-media-actions">
                <button className="cms-btn cms-btn-sm" onClick={() => copyUrl(m)}>{copiedId === m.id ? 'Copied ✓' : 'Copy link'}</button>
                <button className="cms-btn cms-btn-sm cms-btn-danger" onClick={() => remove(m)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
