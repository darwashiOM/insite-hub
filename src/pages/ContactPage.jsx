import { useState } from 'react';
import EditorialHero from '../components/sections/EditorialHero';
import Icon from '../components/Icon';
import { usePageContent } from '../lib/content';

// Plain-text version of the hero headline so the page can render its rich
// (orange) default but a plain string when overridden in the CMS.
const CONTACT_HERO_HEADLINE_DEFAULT = 'Speak to a Proxa Labs Expert';

export default function ContactPage() {
  const c = usePageContent('contact');
  const hd = c('hero.headline');
  const heroHeadline = hd === CONTACT_HERO_HEADLINE_DEFAULT
    ? <>Speak to a <em>Proxa Labs Expert</em></>
    : <>{hd}</>;
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const u = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true); setError('');
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_FUNCTION_URL || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const FormBlock = (
    <div style={{ background: "#fff", border: "1.5px solid #E3E5EA", borderRadius: 16, padding: 32 }}>
      {sent ? (
        <div style={{ background: "rgba(156,169,121,.07)", border: "1px solid rgba(156,169,121,.2)", borderRadius: 14, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon name="compliance" size={20} color="#9ca979" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#12141A", fontFamily: "Manrope,sans-serif" }}>Message received.</span>
          </div>
          <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>We'll be in touch within one business day.</div>
        </div>
      ) : (
        <>
          <label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={u("name")} />
          <label className="fl">Work Email *</label><input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={u("email")} />
          <label className="fl">Company</label><input className="fi" placeholder="Your organization" value={form.company} onChange={u("company")} />
          <label className="fl">Your Role</label>
          <select className="fi" aria-label="Your role" value={form.role} onChange={u("role")} style={{ appearance: "none" }}>
            <option value="">Select your role…</option>
            {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r => <option key={r}>{r}</option>)}
          </select>
          <label className="fl">I'm interested in…</label>
          <select className="fi" aria-label="I'm interested in" value={form.interest} onChange={u("interest")} style={{ appearance: "none" }}>
            <option value="">Select…</option>
            {["AI Platform demo","InsiteX LMS demo","Advisory consult","Content Development consult","Lab consult","AI Literacy consult","AI Readiness Framework","General inquiry"].map(i => <option key={i}>{i}</option>)}
          </select>
          <label className="fl">Tell us about your situation</label>
          <textarea className="fi" rows={4} placeholder="What are you trying to solve? Where have you been stuck?" value={form.message} onChange={u("message")} style={{ resize: "vertical" }} />
          {error && (
            <div style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#DC2626" }}>
              {error}
            </div>
          )}
          <button className="fsub" onClick={handleSubmit} disabled={sending} style={{ opacity: sending ? .6 : 1 }}>
            {sending ? "Sending…" : "Send Message →"}
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <EditorialHero
        eyebrow={c('hero.eyebrow')}
        headline={heroHeadline}
        subhead={c('hero.subhead')}
      />

      <section className="section section-tinted contact-form-section">
        <div className="contact-form-layout">
          {FormBlock}
          <aside className="contact-expect-panel">
            <div className="t-eyebrow">{c('expect.eyebrow')}</div>
            <h3>{c('diagnostic.title')}</h3>
            <div className="contact-diagnostic-note">
              <p>{c('diagnostic.body')}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
