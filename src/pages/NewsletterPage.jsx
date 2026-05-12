import { useState } from 'react';
import EditorialHero from '../components/sections/EditorialHero';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const ROLES = ["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"];
const INTERESTS = ["AI Platform Updates","Advisory Insights","Proxa Labs Research","AI Literacy Program","Announcements & Partnerships","New Frameworks & Guides"];

const RECEIVE_CARDS = [
  { icon: <Icon name="research" size={22} />,     title: "Proxa Labs Research Updates",         body: "Early findings, new frameworks, and research milestones from InsiteHub's AI experimentation lab — before they become full publications." },
  { icon: <Icon name="partnership" size={22} />,  title: "Partnership & Product Announcements", body: "New partnerships (like UMU.com), platform updates, and program launches — directly from the team building them." },
  { icon: <Icon name="framework" size={22} />,    title: "New Frameworks & Guides",             body: "Every new resource InsiteHub publishes — AI readiness tools, business case templates, vendor evaluation scorecards — sent to subscribers first." },
  { icon: <Icon name="field-notes" size={22} />,  title: "Field Notes from Advisory Engagements", body: "Anonymized patterns and insights from InsiteHub's advisory work — what's working, what's failing, and what questions organizations are actually asking right now." },
];

export default function NewsletterPage({ setPage }) {
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

  const FormBlock = (
    <div className="newsletter-form-card">
      {done ? (
        <div className="newsletter-success">
          <div className="newsletter-success-check">✓</div>
          <div className="newsletter-success-title">You're subscribed.</div>
          <div className="newsletter-success-body">First issue lands when we have something genuinely worth your time. Browse the resources page in the meantime.</div>
          <button className="bp" onClick={() => setPage("resources")}>Browse Frameworks & Guides</button>
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
          <button className="fsub" onClick={submit} disabled={sending} style={{ opacity: sending ? .6 : 1 }}>{sending ? "Subscribing…" : "Subscribe →"}</button>
          <div className="newsletter-disclaimer">No spam. Unsubscribe anytime. We send when there's something worth sending.</div>
        </>
      )}
    </div>
  );

  const ReceiveBlock = (
    <div>
      <div className="t-eyebrow" style={{ marginBottom: 12 }}>What You'll Receive</div>
      <h3 className="newsletter-receive-title">Useful thinking. When there's something to say.</h3>
      <div className="newsletter-receive-list">
        {RECEIVE_CARDS.map(c => (
          <div key={c.title} className="newsletter-receive-item">
            <div className="newsletter-receive-icon">{c.icon}</div>
            <div>
              <div className="newsletter-receive-item-title">{c.title}</div>
              <div className="newsletter-receive-item-body">{c.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <EditorialHero
        eyebrow="Newsletter"
        headline={<>Stay ahead of AI in <em>biopharma commercial learning.</em></>}
        subhead="Frameworks, research, field notes, and announcements from InsiteHub's practitioners. Sent when there's something worth saying. No vendor noise, no weekly cadence for its own sake."
      />

      <section className="section section-light">
        <div className="newsletter-grid">
          {FormBlock}
          {ReceiveBlock}
        </div>
      </section>

      <CTABand
        heading={<>One newsletter. <em>Worth your time.</em></>}
        body="If we ever send something you'd skip — unsubscribe in one click. We promise we'll understand."
        primaryCta={{ label: "Browse the Resources Page", onClick: () => setPage("resources") }}
      />
    </>
  );
}
