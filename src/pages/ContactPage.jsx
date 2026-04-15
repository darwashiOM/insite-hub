import { useState } from 'react';
import EditorialHero from '../components/sections/EditorialHero';
import CardGrid from '../components/sections/CardGrid';
import CTABand from '../components/sections/CTABand';
import Icon from '../components/Icon';

const TRACK_OPTIONS = [
  { id: "talk",    icon: <Icon name="chat" size={22} />,     t: "Ready to talk",        d: "Let's have a real conversation about your situation." },
  { id: "learn",   icon: <Icon name="framework" size={22} />, t: "Want to learn first",  d: "Send me frameworks I can use before committing to anything." },
  { id: "explore", icon: <Icon name="research" size={22} />,  t: "Just exploring",       d: "I'm early stage — send me what would be most useful." },
];

const EXPECTATION_CARDS = [
  { icon: <Icon name="research" size={20} />,    track: "talk",  t: "Discovery Call (30 min)",      d: "Your environment. What you've tried. What's blocking you. We tell you what we'd look at first." },
  { icon: <Icon name="platform" size={20} />,    track: "talk",  t: "Platform Demo",                 d: "Forge, Atlas, or Echo — in the context of your commercial organization." },
  { icon: <Icon name="framework" size={20} />,   track: "learn", t: "AI Readiness Framework",        d: "A self-assessment and pilot failure taxonomy you can use before committing to any conversation." },
  { icon: <Icon name="strategy" size={20} />,    track: "talk",  t: "Advisory Assessment",           d: "A defined, time-bounded diagnostic that produces a deliverable you can act on." },
];

const RESOURCE_TEASERS = [
  { icon: <Icon name="checklist" size={22} />, title: "AI Readiness Self-Assessment", body: "15-question framework for evaluating your organization's readiness to deploy AI." },
  { icon: <Icon name="gap" size={22} />,        title: "AI Pilot Failure Taxonomy",     body: "The four failure patterns behind 80–95% of pharma AI pilot failures." },
  { icon: <Icon name="template" size={22} />,   title: "Business Case Template",        body: "The ROI model structure for framing pilot results in leadership language." },
  { icon: <Icon name="compliance" size={22} />, title: "Vendor Evaluation Scorecard",   body: "24-point matrix for assessing AI platform vendors in biopharma." },
];

export default function ContactPage({ setPage }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "", interest: "", message: "" });
  const [sentTracks, setSentTracks] = useState([]);
  const [track, setTrack] = useState("talk");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const u = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const justSent = sentTracks.length > 0 && sentTracks[sentTracks.length - 1] === track;
  const alreadySent = sentTracks.includes(track);
  const previousTrack = sentTracks.length > 0 ? sentTracks[sentTracks.length - 1] : null;

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true); setError('');
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_FUNCTION_URL || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, track }),
      });
      const data = await res.json();
      if (data.success) setSentTracks(prev => [...prev, track]);
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const TrackSelector = (
    <div style={{ background: "#fff", border: "1.5px solid #E3E5EA", borderRadius: 16, padding: 24 }}>
      <div className="t-eyebrow" style={{ marginBottom: 16 }}>Pick Your Track</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TRACK_OPTIONS.map(opt => (
          <div key={opt.id} onClick={() => setTrack(opt.id)} style={{ padding: 18, borderRadius: 12, border: "1.5px solid " + (track === opt.id ? "#F4801F" : "#E3E5EA"), background: track === opt.id ? "rgba(244,128,31,.06)" : "#fff", cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ color: track === opt.id ? "#F4801F" : "#5C6370", flexShrink: 0 }}>{opt.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontFamily: "Manrope,sans-serif", fontWeight: 700, color: track === opt.id ? "#F4801F" : "#12141A", marginBottom: 4 }}>{opt.t}</div>
              <div style={{ fontSize: 12, color: "#5C6370", lineHeight: 1.5 }}>{opt.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FormBlock = (
    <div style={{ background: "#fff", border: "1.5px solid #E3E5EA", borderRadius: 16, padding: 32 }}>
      {justSent && (
        <div style={{ background: "rgba(5,150,105,.07)", border: "1px solid rgba(5,150,105,.2)", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>✅</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#12141A", fontFamily: "Manrope,sans-serif" }}>
              {track === "talk" ? "Message received." : track === "learn" ? "Frameworks on the way." : "We'll send you something useful."}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>
            {track === "talk" ? "We'll be in touch within one business day." : "Check your inbox within 24 hours."}
          </div>
          <div style={{ fontSize: 13, color: "#5C6370", marginTop: 10 }}>Changed your mind? Pick a different option above and send again.</div>
        </div>
      )}
      {!justSent && previousTrack && !alreadySent && (
        <div style={{ background: "rgba(244,128,31,.06)", border: "1px solid rgba(244,128,31,.18)", borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#F4801F", marginBottom: 4 }}>
            {track === "talk" ? "Great — we're glad you're ready to talk." : track === "learn" ? "No rush. We'll send you frameworks first." : "Got it — we'll send you something to start with."}
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
          {track === "learn" && !alreadySent && (
            <div style={{ background: "rgba(244,128,31,.09)", border: "1px solid rgba(244,128,31,.18)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#F4801F", marginBottom: 4 }}>You'll receive:</div>
              <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>AI Readiness Self-Assessment · AI Pilot Failure Taxonomy · Business Case Template — three frameworks you can use immediately.</div>
            </div>
          )}
          {track === "explore" && !alreadySent && (
            <div style={{ background: "rgba(0,122,255,.09)", border: "1px solid rgba(0,122,255,.2)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#007AFF", marginBottom: 4 }}>We'll send you:</div>
              <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.6 }}>A short overview of how InsiteHub works and what kind of organizations get the most value — no pitch, no follow-up pressure.</div>
            </div>
          )}
          <label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={u("name")} />
          <label className="fl">Work Email *</label><input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={u("email")} />
          {track === "talk" && (
            <>
              <label className="fl">Company</label><input className="fi" placeholder="Your organization" value={form.company} onChange={u("company")} />
              <label className="fl">Your Role</label>
              <select className="fi" value={form.role} onChange={u("role")} style={{ appearance: "none" }}>
                <option value="">Select your role…</option>
                {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r => <option key={r}>{r}</option>)}
              </select>
              <label className="fl">I'm interested in…</label>
              <select className="fi" value={form.interest} onChange={u("interest")} style={{ appearance: "none" }}>
                <option value="">Select…</option>
                {["AI Platform (Forge, Atlas, Echo)","InsiteX LMS","Advisory Services","Content Development","Proxa Labs Experimentation","General inquiry"].map(i => <option key={i}>{i}</option>)}
              </select>
              <label className="fl">Tell us about your situation</label>
              <textarea className="fi" rows={4} placeholder="What are you trying to solve? Where have you been stuck?" value={form.message} onChange={u("message")} style={{ resize: "vertical" }} />
            </>
          )}
          {error && (
            <div style={{ background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#DC2626" }}>
              {error}
            </div>
          )}
          {!alreadySent && (
            <button className="fsub" onClick={handleSubmit} disabled={sending} style={{ opacity: sending ? .6 : 1 }}>
              {sending ? "Sending…" : track === "talk" ? "Send Message →" : track === "learn" ? "Send Me the Frameworks →" : "Send Me the Overview →"}
            </button>
          )}
        </>
      )}
    </div>
  );

  const SidebarBlock = (
    <div>
      <div className="t-eyebrow" style={{ marginBottom: 12 }}>What to Expect</div>
      <h3 className="t-h3" style={{ marginBottom: 14, fontFamily: "Manrope,sans-serif", color: "#12141A", letterSpacing: "-.03em" }}>We respond within one business day.</h3>
      <p style={{ fontSize: 14, color: "#5C6370", lineHeight: 1.7, marginBottom: 24 }}>The first conversation is always diagnostic — your environment, your constraints, what you've already tried. No sales pitch. No deck. Just whether InsiteHub is the right fit for where you are.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 22 }}>
        {EXPECTATION_CARDS.map(c => (
          <div key={c.t} onClick={() => setTrack(c.track)} style={{ display: "flex", gap: 14, padding: 16, background: track === c.track ? "rgba(244,128,31,.09)" : "#F5F6F8", borderRadius: 13, border: "1.5px solid " + (track === c.track ? "rgba(244,128,31,.18)" : "#E3E5EA"), cursor: "pointer" }}>
            <div style={{ color: track === c.track ? "#F4801F" : "#5C6370", flexShrink: 0 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: track === c.track ? "#F4801F" : "#12141A", marginBottom: 3, fontFamily: "Manrope,sans-serif" }}>{c.t}</div>
              <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.5 }}>{c.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 20, background: "rgba(244,128,31,.09)", borderRadius: 13, border: "1px solid rgba(244,128,31,.18)" }}>
        <div style={{ fontSize: 13, color: "#F4801F", fontWeight: 700, marginBottom: 4 }}>Newark, Delaware</div>
        <div style={{ fontSize: 13, color: "#5C6370" }}>InsiteHub, Inc. · 591 Collaboration Way, Suite 613</div>
        <div style={{ fontSize: 13, color: "#5C6370", marginTop: 3 }}>insitehub.com · proxalabs.com</div>
      </div>
    </div>
  );

  return (
    <>
      <EditorialHero
        eyebrow="Contact · Diagnostic First"
        headline={<>Where are you in <em>the journey?</em></>}
        subhead="We'll route you to the right starting point — whether you're ready for a real conversation or just beginning to explore. Pick a track, send a note, hear back within one business day."
        visual={TrackSelector}
      />

      <section className="section section-light">
        <div className="split-feature" style={{ gridTemplateColumns: "3fr 2fr", maxWidth: 1100, margin: "0 auto" }}>
          <div>{FormBlock}</div>
          <div>{SidebarBlock}</div>
        </div>
      </section>

      <CardGrid
        eyebrow="Want to Explore First?"
        heading="Free frameworks you can use today."
        columns={4}
        cards={RESOURCE_TEASERS.map(r => ({ ...r, onClick: () => setPage("resources") }))}
        cardStyle="compact"
        background="tinted"
        centerHeader
      />

      <CTABand
        heading={<>Or just <em>start the conversation.</em></>}
        body="Sometimes the right next step is a 30-minute call. We're happy to start there."
        secondaryLink={{ label: "Browse Resources Instead", onClick: () => setPage("resources") }}
      />
    </>
  );
}
