import { useEffect, useRef, useState } from 'react';
import EditorialHero from '../components/sections/EditorialHero';
import Icon from '../components/Icon';

const TRACK_OPTIONS = [
  {
    id: "talk",
    icon: <Icon name="chat" size={22} />,
    t: "Ready to talk",
    d: "Let's have a real conversation about your situation.",
    interest: "General inquiry",
    expectationTitle: "Discovery Call",
    expectationBody: "Your environment, what you've tried, and where you're stuck. No sales pitch. No deck. Just whether InsiteHub is the right fit for where you are.",
  },
  {
    id: "learn",
    icon: <Icon name="framework" size={22} />,
    t: "Want to learn first",
    d: "Send me frameworks I can use before committing to anything.",
    interest: "AI Readiness Framework",
    expectationTitle: "Frameworks First",
    expectationBody: "We'll send practical frameworks you can use before committing to a conversation, then follow up if there is a useful next step.",
  },
  {
    id: "demo",
    icon: <Icon name="platform" size={22} />,
    t: "Ready for a demo",
    d: "Show me Forge, Atlas, and Echo in the context of my organization.",
    interest: "AI Platform demo",
    expectationTitle: "Platform Demo",
    expectationBody: "Forge, Atlas, and Echo in the context of your commercial organization. We tailor the demo to your launch, therapeutic area, and governance environment.",
  },
];

export default function ContactPage() {
  const initialTrack = () => {
    const hashTrack = window.location.hash.replace("#", "");
    return TRACK_OPTIONS.some(opt => opt.id === hashTrack) ? hashTrack : "";
  };
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "", interest: "", message: "" });
  const [sentTracks, setSentTracks] = useState([]);
  const [track, setTrack] = useState(initialTrack);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const u = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const selectedTrack = TRACK_OPTIONS.find(opt => opt.id === track);
  const activeTrackId = track || "general";
  const justSent = sentTracks.length > 0 && sentTracks[sentTracks.length - 1] === activeTrackId;
  const alreadySent = sentTracks.includes(activeTrackId);
  const previousTrack = sentTracks.length > 0 ? sentTracks[sentTracks.length - 1] : null;
  const isConversationTrack = track !== "learn";

  const selectTrack = (id, shouldScroll = true) => {
    const option = TRACK_OPTIONS.find(opt => opt.id === id);
    if (!option) return;
    setTrack(id);
    setForm(f => ({ ...f, interest: option.interest }));
    if (shouldScroll) {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  useEffect(() => {
    const syncTrackFromHash = () => {
      const hashTrack = window.location.hash.replace("#", "");
      if (TRACK_OPTIONS.some(opt => opt.id === hashTrack)) selectTrack(hashTrack, false);
    };
    syncTrackFromHash();
    window.addEventListener("hashchange", syncTrackFromHash);
    return () => window.removeEventListener("hashchange", syncTrackFromHash);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true); setError('');
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_FUNCTION_URL || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, track: activeTrackId }),
      });
      const data = await res.json();
      if (data.success) setSentTracks(prev => [...prev, activeTrackId]);
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const FormBlock = (
    <div style={{ background: "#fff", border: "1.5px solid #E3E5EA", borderRadius: 16, padding: 32 }}>
      {selectedTrack && (
        <div className="contact-form-heading">
          <div className="contact-step-label">Step 2 — Tell Us About You</div>
          <h3>You picked: {selectedTrack.t}</h3>
          <p>We've pre-filled your track below. Fill out the rest and we'll be in touch within one business day.</p>
        </div>
      )}
      {justSent && (
        <div style={{ background: "rgba(5,150,105,.07)", border: "1px solid rgba(5,150,105,.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon name="compliance" size={20} color="#059669" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#12141A", fontFamily: "Manrope,sans-serif" }}>
              {isConversationTrack ? "Message received." : "Frameworks on the way."}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>
            {isConversationTrack ? "We'll be in touch within one business day." : "Check your inbox within 24 hours."}
          </div>
          <div style={{ fontSize: 13, color: "#5C6370", marginTop: 10 }}>Changed your mind? Pick a different option above and send again.</div>
        </div>
      )}
      {!justSent && previousTrack && !alreadySent && (
        <div style={{ background: "rgba(244,128,31,.06)", border: "1px solid rgba(244,128,31,.18)", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#F4801F", marginBottom: 4 }}>
            {track === "demo" ? "Great — we'll route this as a demo request." : track === "talk" ? "Great — we're glad you're ready to talk." : track === "learn" ? "No rush. We'll send you frameworks first." : "Great — we'll route this to the right person."}
          </div>
          <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.5 }}>We already have your info from before. Just hit send and we'll adjust.</div>
        </div>
      )}
      {!justSent && alreadySent && (
        <div style={{ background: "rgba(5,150,105,.05)", border: "1px solid rgba(5,150,105,.15)", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#059669" }}>You've already submitted this one. Pick a different option above, or we'll be in touch soon.</div>
        </div>
      )}
      {!justSent && (
        <>
          <label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={u("name")} />
          <label className="fl">Work Email *</label><input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={u("email")} />
          <label className="fl">Company</label><input className="fi" placeholder="Your organization" value={form.company} onChange={u("company")} />
          <label className="fl">Your Role</label>
          <select className="fi" value={form.role} onChange={u("role")} style={{ appearance: "none" }}>
            <option value="">Select your role…</option>
            {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r => <option key={r}>{r}</option>)}
          </select>
          <label className="fl">I'm interested in… {selectedTrack && <span className="contact-prefill-note">Pre-filled from your track selection</span>}</label>
          <select className="fi" value={form.interest} onChange={u("interest")} style={{ appearance: "none" }}>
            <option value="">Select…</option>
            {["AI Platform demo","InsiteX LMS demo","Advisory consult","Content Development consult","Proxa Labs consult","AI Literacy consult","AI Readiness Framework","General inquiry"].map(i => <option key={i}>{i}</option>)}
          </select>
          <label className="fl">Tell us about your situation</label>
          <textarea className="fi" rows={4} placeholder="What are you trying to solve? Where have you been stuck?" value={form.message} onChange={u("message")} style={{ resize: "vertical" }} />
          {error && (
            <div style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#DC2626" }}>
              {error}
            </div>
          )}
          {!alreadySent && (
            <button className="fsub" onClick={handleSubmit} disabled={sending} style={{ opacity: sending ? .6 : 1 }}>
              {sending ? "Sending…" : track === "learn" ? "Send Me the Frameworks →" : "Send Message →"}
            </button>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <EditorialHero
        eyebrow="Start a Conversation"
        headline={<>Tell us where you are. <em>We'll meet you there.</em></>}
        subhead="Whether you want a demo, a diagnostic conversation, or just the frameworks — pick your track and we'll route you to the right starting point. Hear back within one business day."
      />

      <section className="section section-light contact-track-section">
        <div className="mw">
          <div className="contact-section-header">
            <div className="t-eyebrow">Step 1 — Pick Your Track</div>
            <h2 className="t-h2">What's the right starting point for you?</h2>
            <p className="t-lead">Pick the option that fits your situation. The form below will pre-fill based on your selection.</p>
          </div>
          <div className="contact-track-grid">
            {TRACK_OPTIONS.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`contact-track-card ${track === opt.id ? "contact-track-card-active" : ""}`}
                onClick={() => selectTrack(opt.id)}
              >
                <span className="contact-track-card-icon">{opt.icon}</span>
                <span className="contact-track-card-title">{opt.t}</span>
                <span className="contact-track-card-body">{opt.d}</span>
                {track === opt.id && <span className="contact-track-selected">Selected ↓</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id={track || undefined} ref={formRef} className="section section-tinted contact-form-section">
        <div className="contact-form-layout">
          {FormBlock}
          <aside className="contact-expect-panel">
            <div className="t-eyebrow">What to Expect</div>
            <h3>We respond within one business day.</h3>
            {selectedTrack ? (
              <div className="contact-expect-card">
                <div className="contact-expect-icon">{selectedTrack.icon}</div>
                <h4>{selectedTrack.expectationTitle}</h4>
                <p>{selectedTrack.expectationBody}</p>
              </div>
            ) : (
              <div className="contact-expect-card contact-expect-card-muted">
                <h4>Pick a track above</h4>
                <p>Select the starting point that fits your situation and this panel will show what happens next.</p>
              </div>
            )}
            <div className="contact-diagnostic-note">
              <strong>The first conversation is always diagnostic.</strong>
              <p>Your environment, your constraints, what you've already tried. No sales pitch. No deck. Just whether InsiteHub is the right fit for where you are.</p>
            </div>
          </aside>
        </div>
      </section>

    </>
  );
}
