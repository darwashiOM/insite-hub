import { useState } from 'react';
import EditorialHero from '../components/sections/EditorialHero';
import CTABand from '../components/sections/CTABand';
import SocialIcon from '../components/SocialIcon';
import Icon from '../components/Icon';

const ROLES = ["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"];
const INTERESTS = ["AI Platform Updates","Advisory Insights","Proxa Labs Research","AI Literacy Program","Announcements & Partnerships","New Frameworks & Guides"];

const RECEIVE_CARDS = [
  { icon: <Icon name="research" size={22} />,     title: "Proxa Labs Research Updates",         body: "Early findings, new frameworks, and research milestones from InsiteHub's AI experimentation lab — before they become full publications." },
  { icon: <Icon name="partnership" size={22} />, title: "Partnership & Product Announcements", body: "New partnerships (like UMU.com), platform updates, and program launches — directly from the team building them." },
  { icon: <Icon name="framework" size={22} />,    title: "New Frameworks & Guides",             body: "Every new resource InsiteHub publishes — AI readiness tools, business case templates, vendor evaluation scorecards — sent to subscribers first." },
  { icon: <Icon name="field-notes" size={22} />,  title: "Field Notes from Advisory Engagements", body: "Anonymized patterns and insights from InsiteHub's advisory work — what's working, what's failing, and what questions organizations are actually asking right now." },
];

const SOCIAL = [
  { type: "linkedin", href: "https://linkedin.com/company/insitehub", label: "LinkedIn" },
  { type: "facebook", href: "https://facebook.com/insitehub",          label: "Facebook" },
  { type: "x",        href: "https://x.com/insitehub",                  label: "X" },
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
    <div style={{ background: "#fff", border: "1.5px solid #E3E5EA", borderRadius: 16, padding: 32 }}>
      {done ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 40, color: "#059669", marginBottom: 12 }}>✓</div>
          <div style={{ fontSize: 22, fontFamily: "Manrope,sans-serif", fontWeight: 800, color: "#12141A", marginBottom: 8 }}>You're subscribed.</div>
          <div style={{ fontSize: 14, color: "#5C6370", lineHeight: 1.6, marginBottom: 20 }}>First issue lands when we have something genuinely worth your time. Browse the resources page in the meantime.</div>
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
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {INTERESTS.map(i => (
              <div key={i} onClick={() => toggle(i)} style={{ padding: "10px 14px", borderRadius: 9, border: "1.5px solid " + (form.interests.includes(i) ? "#F4801F" : "#E3E5EA"), background: form.interests.includes(i) ? "rgba(244,128,31,.09)" : "#fff", cursor: "pointer", fontSize: 13, color: form.interests.includes(i) ? "#F4801F" : "#5C6370", fontWeight: form.interests.includes(i) ? 600 : 400, lineHeight: 1.4 }}>
                {form.interests.includes(i) ? "✓ " : ""}{i}
              </div>
            ))}
          </div>
          {error && <div style={{ padding: 12, background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, fontSize: 13, color: "#DC2626", marginBottom: 14 }}>{error}</div>}
          <button className="fsub" onClick={submit} disabled={sending} style={{ opacity: sending ? .6 : 1 }}>{sending ? "Subscribing…" : "Subscribe →"}</button>
          <div style={{ fontSize: 12, color: "#8B919A", marginTop: 12 }}>No spam. Unsubscribe anytime. We send when there's something worth sending.</div>
        </>
      )}
    </div>
  );

  const ReceiveBlock = (
    <div>
      <div className="t-eyebrow" style={{ marginBottom: 12 }}>What You'll Receive</div>
      <h3 className="t-h3" style={{ marginBottom: 24, fontFamily: "Manrope,sans-serif", letterSpacing: "-.03em", color: "#12141A" }}>Useful thinking. When there's something to say.</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        {RECEIVE_CARDS.map(c => (
          <div key={c.title} style={{ display: "flex", gap: 14, padding: 16, background: "#F5F6F8", borderRadius: 12, border: "1.5px solid #E3E5EA" }}>
            <div style={{ color: "#F4801F", flexShrink: 0 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontFamily: "Manrope,sans-serif", fontWeight: 700, color: "#12141A", marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.55 }}>{c.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "14px 18px", background: "rgba(244,128,31,.09)", borderRadius: 12, border: "1px solid rgba(244,128,31,.18)" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#F4801F", marginBottom: 4 }}>Follow us on social</div>
        <div style={{ fontSize: 13, color: "#5C6370", marginBottom: 12 }}>Real-time updates between newsletters.</div>
        <div style={{ display: "flex", gap: 10 }}>
          {SOCIAL.map(s => (
            <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid #E3E5EA", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#5C6370", textDecoration: "none" }}>
              <SocialIcon type={s.type} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <EditorialHero
        eyebrow="Newsletter · Field Notes"
        headline={<>Stay ahead of AI in <em>biopharma commercial learning.</em></>}
        subhead="Frameworks, research, field notes, and announcements from InsiteHub's practitioners. Sent when there's something worth saying. No vendor noise, no weekly cadence for its own sake."
      />

      <section className="section section-light">
        <div className="split-feature" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>{FormBlock}</div>
          <div>{ReceiveBlock}</div>
        </div>
      </section>

      <CTABand
        heading={<>One newsletter. <em>Worth your time.</em></>}
        body="If we ever send something you'd skip — unsubscribe in one click. We promise we'll understand."
        secondaryLink={{ label: "Browse the Resources Page", onClick: () => setPage("resources") }}
      />
    </>
  );
}
