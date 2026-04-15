import { useState } from 'react';
import { HexMarkLarge } from '../components/HexMark';

const ContactPage = ({ setPage }) => {
  const [form,setForm]=useState({name:"",company:"",email:"",role:"",interest:"",message:""});
  const [sentTracks,setSentTracks]=useState([]); // tracks already submitted
  const [track,setTrack]=useState("talk");
  const u=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const [sending,setSending]=useState(false);
  const [error,setError]=useState('');
  const justSent = sentTracks.length > 0 && sentTracks[sentTracks.length-1] === track;
  const alreadySent = sentTracks.includes(track);
  const previousTrack = sentTracks.length > 0 ? sentTracks[sentTracks.length-1] : null;

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_FUNCTION_URL || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, track }),
      });
      const data = await res.json();
      if (data.success) {
        setSentTracks(prev => [...prev, track]);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };
  return(
    <>
      <div className="ph"><div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={400} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:680}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📬 Contact</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Where are you<br/>in the <span style={{color:"var(--o)"}}>journey?</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>We'll route you to the right starting point — whether you're ready for a real conversation or just beginning to explore.</p>
          {/* Entry point selector */}
          <div className="grid-3" style={{gap:10}}>
            {[
              {id:"talk",icon:"🗣️",t:"Ready to talk",d:"Let's have a real conversation about your situation."},
              {id:"learn",icon:"📚",t:"Want to learn first",d:"Send me frameworks I can use before committing to anything."},
              {id:"explore",icon:"🔍",t:"Just exploring",d:"I'm early stage — send me what would be most useful."},
            ].map(opt=>(
              <div key={opt.id} onClick={()=>setTrack(opt.id)} style={{padding:18,borderRadius:14,border:("2px solid "+(track===opt.id?"var(--o)":"var(--br)")),background:track===opt.id?"var(--o10)":"var(--wh)",cursor:"pointer",transition:"all .2s"}}>
                <div style={{fontSize:22,marginBottom:8}}>{opt.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:track===opt.id?"var(--o)":"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:4}}>{opt.t}</div>
                <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{opt.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div></div>
      <section className="sec sw"><div className="mw">
        <div className="cg">
          <div>
            {/* Success banner — shows after any submission, stays visible */}
            {justSent && (
              <div style={{background:"rgba(5,150,105,.07)",border:"1px solid rgba(5,150,105,.2)",borderRadius:14,padding:"20px 24px",marginBottom:24}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{fontSize:20}}>✅</span>
                  <span style={{fontSize:16,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif"}}>
                    {track==="talk" ? "Message received." : track==="learn" ? "Frameworks on the way." : "We'll send you something useful."}
                  </span>
                </div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>
                  {track==="talk" ? "We'll be in touch within one business day." : "Check your inbox within 24 hours."}
                </div>
                <div style={{fontSize:13,color:"var(--bd)",marginTop:10}}>Changed your mind? Pick a different option above and send again.</div>
              </div>
            )}
            {/* If they switched to a new track after already submitting */}
            {!justSent && previousTrack && !alreadySent && (
              <div style={{background:"rgba(244,128,31,.06)",border:"1px solid var(--o20)",borderRadius:14,padding:"16px 20px",marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:600,color:"var(--o)",marginBottom:4}}>
                  {track==="talk" ? "Great — we're glad you're ready to talk." : track==="learn" ? "No rush. We'll send you frameworks first." : "Got it — we'll send you something to start with."}
                </div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>
                  We already have your info from before. Just hit send and we'll adjust.
                </div>
              </div>
            )}
            {/* Already sent this exact track */}
            {!justSent && alreadySent && (
              <div style={{background:"rgba(5,150,105,.05)",border:"1px solid rgba(5,150,105,.15)",borderRadius:14,padding:"16px 20px",marginBottom:20}}>
                <div style={{fontSize:13,fontWeight:600,color:"#059669"}}>You've already submitted this one. Pick a different option above, or we'll be in touch soon.</div>
              </div>
            )}
            {/* Form — always visible unless they just sent this track */}
            {!justSent && (
              <>
                {track==="learn" && !alreadySent && (
                  <div style={{background:"var(--o10)",border:"1px solid var(--o20)",borderRadius:12,padding:16,marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:600,color:"var(--o)",marginBottom:4}}>You'll receive:</div>
                    <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>AI Readiness Self-Assessment · AI Pilot Failure Taxonomy · Business Case Template — three frameworks you can use immediately.</div>
                  </div>
                )}
                {track==="explore" && !alreadySent && (
                  <div style={{background:"var(--bl10)",border:"1px solid rgba(0,122,255,.2)",borderRadius:12,padding:16,marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:600,color:"var(--bl)",marginBottom:4}}>We'll send you:</div>
                    <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>A short overview of how InsiteHub works and what kind of organizations get the most value — no pitch, no follow-up pressure.</div>
                  </div>
                )}
                <label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={u("name")}/>
                <label className="fl">Work Email *</label><input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={u("email")}/>
                {track==="talk" && <>
                  <label className="fl">Company</label><input className="fi" placeholder="Your organization" value={form.company} onChange={u("company")}/>
                  <label className="fl">Your Role</label>
                  <select className="fi" value={form.role} onChange={u("role")} style={{appearance:"none"}}>
                    <option value="">Select your role...</option>
                    {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r=><option key={r}>{r}</option>)}
                  </select>
                  <label className="fl">I'm interested in...</label>
                  <select className="fi" value={form.interest} onChange={u("interest")} style={{appearance:"none"}}>
                    <option value="">Select...</option>
                    {["AI Platform (Forge, Atlas, Echo)","InsiteX LMS","Advisory Services","Content Development","Proxa Labs Experimentation","General inquiry"].map(i=><option key={i}>{i}</option>)}
                  </select>
                  <label className="fl">Tell us about your situation</label>
                  <textarea className="fi" rows={4} placeholder="What are you trying to solve? Where have you been stuck?" value={form.message} onChange={u("message")} style={{resize:"vertical"}}/>
                </>}
                {error && (
                  <div style={{background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.2)",borderRadius:10,padding:"12px 16px",marginBottom:16,fontSize:13,color:"#DC2626"}}>
                    {error}
                  </div>
                )}
                {!alreadySent && (
                  <button className="fsub" onClick={handleSubmit} disabled={sending} style={{opacity:sending?.6:1}}>
                    {sending ? "Sending..." : track==="talk" ? "Send Message →" : track==="learn" ? "Send Me the Frameworks →" : "Send Me the Overview →"}
                  </button>
                )}
              </>
            )}
          </div>
          <div>
            <div style={{marginBottom:28}}>
              <div className="ey">What to expect</div>
              <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"var(--dk)",marginBottom:12,letterSpacing:"-.03em"}}>We respond within one business day.</h3>
              <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7}}>The first conversation is always diagnostic — your environment, your constraints, what you've already tried. No sales pitch. No deck. Just whether InsiteHub is the right fit for where you are.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              {[
                {icon:"🔍",t:"Discovery Call (30 min)",d:"Your environment. What you've tried. What's blocking you. We tell you what we'd look at first.",track:"talk"},
                {icon:"📋",t:"Platform Demo",d:"Forge, Atlas, or Echo — in the context of your commercial organization.",track:"talk"},
                {icon:"📚",t:"AI Readiness Framework",d:"A self-assessment and pilot failure taxonomy you can use before committing to any conversation.",track:"learn"},
                {icon:"🗺️",t:"Advisory Assessment",d:"A defined, time-bounded diagnostic that produces a deliverable you can act on.",track:"talk"},
              ].map(c=>(
                <div key={c.t} onClick={()=>setTrack(c.track)} style={{display:"flex",gap:14,padding:16,background:track===c.track?"var(--o10)":"var(--lt)",borderRadius:13,border:("1.5px solid "+(track===c.track?"var(--o20)":"var(--br)")),cursor:"pointer",transition:"all .2s"}}>
                  <div style={{fontSize:18,flexShrink:0}}>{c.icon}</div>
                  <div><div style={{fontSize:14,fontWeight:700,color:track===c.track?"var(--o)":"var(--dk)",marginBottom:3}}>{c.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{c.d}</div></div>
                </div>
              ))}
            </div>
            <div style={{marginTop:22,padding:20,background:"var(--o10)",borderRadius:13,border:"1px solid var(--o20)"}}>
              <div style={{fontSize:13,color:"var(--o)",fontWeight:700,marginBottom:4}}>Newark, Delaware</div>
              <div style={{fontSize:13,color:"var(--bd)"}}>InsiteHub, Inc. · 591 Collaboration Way, Suite 613</div>
              <div style={{fontSize:13,color:"var(--bd)",marginTop:3}}>insitehub.com · proxalabs.com</div>
            </div>
          </div>
        </div>
      </div></section>

    {/* RESOURCES */}
    <section className="sec sl">
      <div className="mw" style={{textAlign:"center"}}>
        <div className="ey" style={{textAlign:"center"}}>Want to explore on your own first?</div>
        <h2 className="h2" style={{textAlign:"center",maxWidth:500,margin:"0 auto 32px"}}>Free frameworks you can use today.</h2>
        <div className="grid-4" style={{gap:14}}>
          {[
            {icon:"📋",c:"#F4801F",t:"AI Readiness Self-Assessment",d:"15-question framework for evaluating your organization's readiness to deploy AI."},
            {icon:"🗺️",c:"#7C3AED",t:"AI Pilot Failure Taxonomy",d:"The four failure patterns behind 80-95% of pharma AI pilot failures."},
            {icon:"📊",c:"#007AFF",t:"Business Case Template",d:"The ROI model structure for framing pilot results in leadership language."},
            {icon:"⚖️",c:"#D97706",t:"Vendor Evaluation Scorecard",d:"24-point matrix for assessing AI platform vendors in biopharma."},
          ].map(r=>(
            <div key={r.t} onClick={()=>setPage("resources")} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:24,textAlign:"left",transition:"all .2s",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{width:40,height:40,borderRadius:11,background:(r.c+"12"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:12}}>{r.icon}</div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6,lineHeight:1.3}}>{r.t}</div>
              <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactPage;
