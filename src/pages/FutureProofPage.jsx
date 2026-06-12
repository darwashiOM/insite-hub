import { useState } from 'react';

/*
 * Gated lead-gen landing page — /future-proof-your-organization
 * Fill First/Last name + business email (all required), then either
 * view the HTML article or download the PDF. Each submission captures the
 * lead (name + email + which asset) via the contact Cloud Function for tracking.
 * Asset URLs (static files in /public): the HTML article + the draft PDF.
 */
const ARTICLE_URL = '/future-proofing.html';
const PDF_URL = '/future-proofing-your-organization.pdf';
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const POINTS = [
  'Why literacy, governance, and compliance are just the starting line',
  'The four shifts that redefine the work: content, process, personalization, and self-serve creation',
  'Why pilots die, and the single change that makes AI stick',
  'A practical order of operations to put your function in front of the brand team and its agency',
];

export default function FutureProofPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [errors, setErrors] = useState({});

  const u = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  const validate = () => {
    const er = {
      firstName: !form.firstName.trim(),
      lastName: !form.lastName.trim(),
      email: !emailRe.test(form.email.trim()),
    };
    setErrors(er);
    return !er.firstName && !er.lastName && !er.email;
  };

  // Capture the lead for tracking. Fire-and-forget so asset delivery is never blocked.
  const captureLead = (asset) => {
    const url = import.meta.env.VITE_CONTACT_FUNCTION_URL || '/api/contact';
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          source: 'future-proof-landing',
          asset, // 'html' | 'pdf'
        }),
      }).catch(() => {});
    } catch {
      /* never block asset delivery on capture */
    }
  };

  const deliver = (asset) => {
    if (!validate()) return;
    captureLead(asset);
    if (asset === 'html') {
      window.open(ARTICLE_URL, '_blank', 'noopener');
    } else {
      const a = document.createElement('a');
      a.href = PDF_URL;
      a.setAttribute('download', '');
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <section className="fp-hero">
      <div className="fp-copy">
        <h1 className="fp-h1"><em>Future-proof</em><br />your organization</h1>
        <p className="fp-standfirst">An in-depth perspective on AI readiness, and what you really should be getting ready for.</p>
        <p className="fp-body">Most biopharma commercial learning teams are getting ready for the wrong thing. This perspective lays out what you're actually getting ready for, why most AI pilots die, and the order of operations for leading the shift instead of being assigned to it.</p>
        <ul className="fp-points">
          {POINTS.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>

      <div className="fp-card">
        <div className={'fp-field' + (errors.firstName ? ' err' : '')}>
          <label htmlFor="fp-fn">First Name*</label>
          <input id="fp-fn" type="text" autoComplete="given-name" placeholder="Jordan" value={form.firstName} onChange={u('firstName')} />
          <div className="fp-errmsg">Enter your first name.</div>
        </div>
        <div className={'fp-field' + (errors.lastName ? ' err' : '')}>
          <label htmlFor="fp-ln">Last Name*</label>
          <input id="fp-ln" type="text" autoComplete="family-name" placeholder="Reyes" value={form.lastName} onChange={u('lastName')} />
          <div className="fp-errmsg">Enter your last name.</div>
        </div>
        <div className={'fp-field' + (errors.email ? ' err' : '')}>
          <label htmlFor="fp-em">Business Email Address*</label>
          <input id="fp-em" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={u('email')} />
          <div className="fp-errmsg">Enter a valid business email.</div>
        </div>
        <div className="fp-btns">
          <button type="button" className="fp-gbtn" onClick={() => deliver('html')}>View as HTML Page</button>
          <button type="button" className="fp-gbtn alt" onClick={() => deliver('pdf')}>Download PDF</button>
        </div>
        <p className="fp-privacy">We'll only use your details to send the perspective and the occasional one worth your time. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
