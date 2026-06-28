import { useState } from 'react';
import { usePageContent } from '../lib/content';

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

// Plain-text version of the rich (italic) hero heading. When the override equals
// this, render the JSX default; otherwise render the plain override string.
const HERO_HEADING_DEFAULT = 'Future-proof your organization';

export default function FutureProofPage() {
  const c = usePageContent('futureproof');
  const hh = c('hero.heading');
  const heroHeading = hh === HERO_HEADING_DEFAULT
    ? <><em>Future-proof</em><br />your organization</>
    : hh;
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
    const firstBad = er.firstName ? 'fp-fn' : er.lastName ? 'fp-ln' : er.email ? 'fp-em' : null;
    if (firstBad) document.getElementById(firstBad)?.focus();
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
        <h1 className="fp-h1">{heroHeading}</h1>
        <p className="fp-standfirst">{c('hero.standfirst')}</p>
        <p className="fp-body">{c('hero.body')}</p>
        <ul className="fp-points">
          {[c('points.0'), c('points.1'), c('points.2'), c('points.3')].map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div className="fp-right">
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
          <button type="button" className="fp-gbtn" onClick={() => deliver('html')}>{c('cta.htmlLabel')}</button>
          <button type="button" className="fp-gbtn alt" onClick={() => deliver('pdf')}>{c('cta.pdfLabel')}</button>
        </div>
      </div>
        <p className="fp-disclaimer">{c('form.disclaimer')}</p>
      </div>
    </section>
  );
}
