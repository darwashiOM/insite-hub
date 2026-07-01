import { useEffect, useState } from 'react';
import { db, USING_EMULATOR } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Production hits the Hosting rewrite; local dev (DEV-guarded) hits the emulator.
export const SUBMIT_FORM_URL = import.meta.env.VITE_SUBMIT_FORM_URL
  || (USING_EMULATOR ? 'http://127.0.0.1:5001/insite-hub-web/us-central1/submitForm' : '/api/submit-form');

// Read a published form definition by slug (public). Reads the formsPublic mirror,
// which excludes server-only fields (notifyEmail, gatedFileUrl) — the gated file
// URL is only handed back by submitForm after a valid submission.
export function useForm(slug) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    getDoc(doc(db, 'formsPublic', slug))
      .then((s) => { if (alive) { setForm(s.exists() && s.data().published ? { id: s.id, ...s.data() } : null); setLoading(false); } })
      .catch(() => { if (alive) { setError(true); setLoading(false); } });
    return () => { alive = false; };
  }, [slug]);
  return { form, loading, error };
}

// UTM / campaign params from the current URL, for lead attribution.
export function readUtm() {
  const out = {};
  try {
    const p = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach((k) => {
      const v = p.get(k);
      if (v) out[k] = v.slice(0, 200);
    });
  } catch { /* ignore */ }
  return out;
}

export async function submitForm(payload) {
  const res = await fetch(SUBMIT_FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(out.error || 'Submission failed. Please try again.');
  return out;
}
