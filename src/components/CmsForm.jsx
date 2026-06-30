import { useState } from 'react';
import { submitForm, readUtm } from '../lib/forms';
import { trackLead, trackDownload } from '../analytics';
import './CmsForm.css';

// Renders a CMS-defined form and submits it to the submitForm Cloud Function.
export default function CmsForm({ form }) {
  const [values, setValues] = useState({});
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);

  const fields = form.fields || [];
  const set = (k, v) => setValues((m) => ({ ...m, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    for (const f of fields) {
      if (f.required && !String(values[f.key] ?? '').trim()) { setError(`Please fill in "${f.label || f.key}".`); return; }
    }
    if (form.consentText && !consent) { setError('Please accept to continue.'); return; }
    setBusy(true);
    try {
      const out = await submitForm({ formSlug: form.slug, data: values, utm: readUtm(), consent, _hp: hp });
      if (out && out.success) { trackLead(form.slug, { form_name: form.name }); setDone(out); }
      else { setError('Submission failed. Please try again.'); setBusy(false); }
    } catch (err) {
      setError(err.message || 'Submission failed.');
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="cmsform-done">
        <p className="cmsform-success">{form.successMessage || 'Thanks — we’ve got your details.'}</p>
        {done.download && (
          <a className="cmsform-download" href={done.download} target="_blank" rel="noopener noreferrer"
            onClick={() => trackDownload(form.gatedFileLabel || form.slug, { form_id: form.slug })}>
            {form.gatedFileLabel || 'Download your file'} ↓
          </a>
        )}
      </div>
    );
  }

  return (
    <form className="cmsform" onSubmit={submit} noValidate>
      {error && <p className="cmsform-err" role="alert">{error}</p>}
      {fields.map((f) => (
        <div className={'cmsform-field' + (f.type === 'checkbox' ? ' cmsform-field-check' : '')} key={f.key}>
          {f.type === 'checkbox' ? (
            <label className="cmsform-inline">
              <input id={`f-${f.key}`} type="checkbox" checked={!!values[f.key]}
                onChange={(e) => set(f.key, e.target.checked ? 'Yes' : '')} />
              <span>{f.label}{f.required && <span aria-hidden="true"> *</span>}</span>
            </label>
          ) : (
            <>
              <label htmlFor={`f-${f.key}`}>{f.label}{f.required && <span aria-hidden="true"> *</span>}</label>
              {f.type === 'textarea' ? (
                <textarea id={`f-${f.key}`} value={values[f.key] || ''} required={f.required}
                  onChange={(e) => set(f.key, e.target.value)} />
              ) : f.type === 'select' ? (
                <select id={`f-${f.key}`} value={values[f.key] || ''} required={f.required}
                  onChange={(e) => set(f.key, e.target.value)}>
                  <option value="">Choose…</option>
                  {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input id={`f-${f.key}`} value={values[f.key] || ''} required={f.required}
                  type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text'}
                  onChange={(e) => set(f.key, e.target.value)} />
              )}
            </>
          )}
        </div>
      ))}

      {form.consentText && (
        <label className="cmsform-consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>{form.consentText}</span>
        </label>
      )}

      {/* Honeypot — offscreen; real users never fill it, bots do. */}
      <input className="cmsform-hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={hp} onChange={(e) => setHp(e.target.value)} />

      <button className="cmsform-submit" type="submit" disabled={busy}>{busy ? 'Sending…' : (form.submitText || 'Submit')}</button>
    </form>
  );
}
