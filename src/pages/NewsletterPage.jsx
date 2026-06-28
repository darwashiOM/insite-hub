import { useState } from 'react';
import EditorialHero from '../components/sections/EditorialHero';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

const ROLES = ["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"];
const INTERESTS = ["AI Platform Updates","Advisory Insights","The Lab Research","AI Literacy Program","Announcements & Partnerships","New Frameworks & Guides"];

// Plain-text defaults for the two rich (italic) headings — when an editor
// overrides them we render a plain string; otherwise the JSX default is kept.
const NEWSLETTER_HERO_HEADING_DEFAULT = "Stay ahead of AI in biopharma commercial learning.";
const NEWSLETTER_CTA_HEADING_DEFAULT = "One newsletter. Worth your time.";

export default function NewsletterPage({ setPage }) {
  const c = usePageContent('newsletter');
  const [form, setForm] = useState({ email: "", name: "", role: "", interests: [] });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const toggle = (i) => setForm(f => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i] }));

  const submit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_NEWSLETTER_FUNCTION_URL || '/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setDone(true);
      else setError(data.error || 'Something went wrong. Try again.');
    } catch (e) {
      setError('Something went wrong. Try again.');
    } finally {
      setSending(false);
    }
  };

  const RECEIVE_CARDS = [
    { icon: <Icon name="research" size={22} />,     title: c('cards.0.title'), body: c('cards.0.body') },
    { icon: <Icon name="partnership" size={22} />,  title: c('cards.1.title'), body: c('cards.1.body') },
    { icon: <Icon name="framework" size={22} />,    title: c('cards.2.title'), body: c('cards.2.body') },
    { icon: <Icon name="field-notes" size={22} />,  title: c('cards.3.title'), body: c('cards.3.body') },
  ];

  const heroHeadingRaw = c('hero.heading');
  const heroHeading = heroHeadingRaw === NEWSLETTER_HERO_HEADING_DEFAULT
    ? <>Stay ahead of AI in <em>biopharma commercial learning.</em></>
    : <>{heroHeadingRaw}</>;

  const ctaHeadingRaw = c('cta.heading');
  const ctaHeading = ctaHeadingRaw === NEWSLETTER_CTA_HEADING_DEFAULT
    ? <>One newsletter. <em>Worth your time.</em></>
    : <>{ctaHeadingRaw}</>;

  const FormBlock = (
    <div className="newsletter-form-card">
      {done ? (
        <div className="newsletter-success">
          <div className="newsletter-success-check">✓</div>
          <div className="newsletter-success-title">{c('success.title')}</div>
          <div className="newsletter-success-body">{c('success.body')}</div>
          <button className="bp" onClick={() => setPage("resources")}>{c('success.ctaLabel')}</button>
        </div>
      ) : (
        <>
          <label className="fl">First Name *</label>
          <input className="fi" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <label className="fl">Work Email *</label>
          <input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <label className="fl">Your Role</label>
          <select className="fi" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} style={{ appearance: "none" }}>
            <option value="">Select your role…</option>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <label className="fl" style={{ marginBottom: 12 }}>What are you most interested in?</label>
          <div className="newsletter-interests-grid">
            {INTERESTS.map(i => {
              const on = form.interests.includes(i);
              return (
                <div key={i} onClick={() => toggle(i)} className={"newsletter-interest-chip" + (on ? " on" : "")}>
                  {on ? "✓ " : ""}{i}
                </div>
              );
            })}
          </div>
          {error && <div className="newsletter-error">{error}</div>}
          <button className="fsub" onClick={submit} disabled={sending} style={{ opacity: sending ? .6 : 1 }}>{sending ? c('form.submittingLabel') : c('form.submitLabel')}</button>
          <div className="newsletter-disclaimer">{c('form.disclaimer')}</div>
        </>
      )}
    </div>
  );

  const ReceiveBlock = (
    <div>
      <div className="t-eyebrow" style={{ marginBottom: 12 }}>{c('receive.eyebrow')}</div>
      <h3 className="newsletter-receive-title">{c('receive.heading')}</h3>
      <div className="newsletter-receive-list">
        {RECEIVE_CARDS.map(card => (
          <div key={card.title} className="newsletter-receive-item">
            <div className="newsletter-receive-icon">{card.icon}</div>
            <div>
              <div className="newsletter-receive-item-title">{card.title}</div>
              <div className="newsletter-receive-item-body">{card.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeading}
        subhead={c('hero.subhead')}
      />

      <section className="section section-light">
        <div className="newsletter-grid">
          {FormBlock}
          {ReceiveBlock}
        </div>
      </section>

      <CTABand
        heading={ctaHeading}
        body={c('cta.body')}
        primaryCta={{ label: c('cta.ctaLabel'), onClick: () => setPage("resources") }}
      />
    </>
  );
}
