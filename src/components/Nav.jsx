import React, { useState } from 'react';
import { HexMark } from './HexMark';

const Nav = ({ page, setPage, scrolled }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const dropItems = [
    {icon:"🧭",title:"I need an AI strategy",desc:"Assess your readiness and build a roadmap before any technology decision.",tag:"Advisory",p:"advisory"},
    {icon:"🔬",title:"I want to run an AI pilot",desc:"Structure the experiment, define success criteria, build the business case.",tag:"Proxa Labs",p:"proxalab"},
    {icon:"🎓",title:"I need AI literacy training",desc:"Build AI fluency across your commercial organization before deploying tools.",tag:"AI Literacy",p:"literacy"},
    {icon:"🚀",title:"I'm ready for a platform",desc:"See Forge, Atlas, Echo, and Certify — the only closed-loop AI platform.",tag:"AI Platform",p:"platform"},
    {icon:"📚",title:"I need content for a launch",desc:"AI-generated or human-led, MLR-compliant content on your timeline.",tag:"Content",p:"content"},
    {icon:"🖥️",title:"I need an LMS first",desc:"Enterprise learning infrastructure built for biopharma compliance.",tag:"InsiteX LMS",p:"insitex"},
    {icon:"💬",title:"I'm not sure yet",desc:"30 minutes. No pitch. Tell us where you're stuck.",tag:"Book a Call",p:"contact"},
  ];
  return (
    <nav className={"nav"+(scrolled?" up":"")}>
      <div className="nav-logo" onClick={()=>{ setDropOpen(false); setPage("home"); }}>
        <HexMark size={38} color="#F4801F" strokeWidth={1.7}/>
        <span className="nav-wm">Insite<b>HUB</b></span>
      </div>
      <div className="nav-links">
        {/* WHERE TO START dropdown — React state controlled */}
        <div style={{position:"relative"}}>
          <button
            className="nl nl-drop"
            onClick={()=>setDropOpen(o=>!o)}
            style={{color:dropOpen?"var(--o)":"var(--bd)"}}
          >
            Where to Start
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{transform:dropOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}>
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {dropOpen && (
            <div style={{
              position:"absolute",top:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",
              background:"var(--wh)",border:"1px solid var(--br)",borderRadius:16,
              boxShadow:"0 20px 60px rgba(0,0,0,.14),0 4px 16px rgba(0,0,0,.06)",
              padding:8,width:600,zIndex:400,
              display:"grid",gridTemplateColumns:"1fr 1fr",gap:4
            }}>
              {dropItems.map(d=>(
                <div
                  key={d.p}
                  onClick={()=>{ setDropOpen(false); setPage(d.p); }}
                  style={{padding:"14px 16px",borderRadius:10,cursor:"pointer",transition:"background .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--lt)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
                  <div style={{fontSize:18,marginBottom:5}}>{d.icon}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--dk)",marginBottom:3,fontFamily:"Manrope,sans-serif"}}>{d.title}</div>
                  <div style={{fontSize:11.5,color:"var(--bd)",lineHeight:1.45,marginBottom:6}}>{d.desc}</div>
                  <span style={{fontSize:10,fontWeight:700,color:"var(--o)",background:"var(--o10)",borderRadius:20,padding:"2px 8px",display:"inline-block",letterSpacing:".04em"}}>{d.tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {[["AI Platform","platform"],["AI Literacy","literacy"],["InsiteX LMS","insitex"],["Advisory","advisory"],["Content","content"],["Proxa Labs","proxalab"],["About","about"]].map(([l,p])=>(
          <button key={p} className={"nl"+(page===p?" on":"")} onClick={()=>{ setDropOpen(false); setPage(p); }}>{l}</button>
        ))}
      </div>
      <div className="nav-right">
        <button className="ng" onClick={()=>{ setDropOpen(false); setPage("contact"); }}>Contact</button>
        <button className="no" onClick={()=>{ setDropOpen(false); setPage("contact"); }}>Book a Demo</button>
      </div>
    </nav>
  );
};

export default Nav;
