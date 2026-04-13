import { HexMarkLarge } from '../components/HexMark';

const AboutPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:780}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🏢 About InsiteHub</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>We've been solving problems<br/>biopharma didn't have<br/><span style={{color:"var(--o)"}}>solutions for yet.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>The best solutions in commercial learning come from practitioners who've worked inside the environment — not vendors adapting generic products for pharma.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      <div style={{maxWidth:720,marginBottom:64}}>
        <div className="ey">Our Story</div>
        <h2 className="h2">Innovation that comes from the inside.</h2>
        <p style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:18}}>InsiteHub was founded on a track record of building things that didn't exist yet — because existing approaches were failing commercial organizations. Content missing launch windows. Training producing completion metrics instead of behavior change. Certification giving false confidence about field readiness.</p>
        <p style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:18}}>Along the way we won the Vanguard Award for the world's best corporate learning program — building an immersive virtual world for a drug launch when competitors quoted $5M platforms. We secured an NIH grant and launched one of only two biomedical accelerators outside a university in the US.</p>
        <p style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:28}}>The result is an organization that leads with diagnosis, experiments before it commits, and measures success against field performance — not engagement metrics.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button>
          <button className="bs" onClick={()=>setPage("services")}>Explore Our Services</button>
        </div>
      </div>

      {/* Innovation proof points */}
      <div className="grid-4" style={{gap:16,marginBottom:64}}>
        {[
          {icon:"🌐",num:"1st",label:"Virtual world for a drug launch",sub:"Won the world's top corporate learning award.",c:"#F4801F"},
          {icon:"🎮",num:"100%",label:"Gamified training participation",sub:"600 sales managers. The first program with universal adoption.",c:"#7C3AED"},
          {icon:"🏛️",num:"2nd",label:"NIH biomedical accelerator outside a university",sub:"One of only two in the US.",c:"#007AFF"},
          {icon:"🔄",num:"Only",label:"Closed-loop AI platform in commercial L&D",sub:"Automatically connects content creation to behavioral certification.",c:"#059669"},
        ].map(s=>(
          <div key={s.label} style={{textAlign:"center",padding:"24px 16px",background:"var(--lt)",borderRadius:16,border:"1px solid var(--br)"}}>
            <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
            <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:6}}>{s.num}</div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--dk)",marginBottom:6,lineHeight:1.3}}>{s.label}</div>
            <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Timeline — shortened */}
      <div className="ey">Our History</div>
      <h2 className="h2" style={{marginBottom:44}}>Built from the inside of biopharma.</h2>
      <div className="tl">
        {[
          {date:"2010",t:"InsiteHub Founded",d:"Incorporated through the University of Delaware Spin-In Program to serve life sciences commercial organizations."},
          {date:"2010s",t:"Expanded Across Life Sciences",d:"Grew to 30+ organizations including AbbVie, Pfizer, Novartis, Biogen, Sanofi, and major academic medical centers."},
          {date:"2014–2018",t:"NIH Grant & InsiteXcelerator",d:"Awarded NIH grant. Became the 2nd NIH-partnered biomedical accelerator outside a university in the US."},
          {date:"2018–2022",t:"Enterprise LMS Platform",d:"Developed and launched InsiteX — enterprise learning management built for biopharma compliance and credentialing."},
          {date:"2023–Present",t:"AI-First Transformation",d:"Launched Forge, Atlas, Echo, and Certify — the only closed-loop AI platform in commercial L&D."},
        ].map(t=>(
          <div key={t.date} className="tl-i"><div className="tl-d"/><div className="tl-ey">{t.date}</div><div className="tl-t">{t.t}</div><div className="tl-p">{t.d}</div></div>
        ))}
      </div>
    </div></section>

    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Ready to work with a team<br/><em>that's been in your seat?</em></h2>
      <p className="cf-p">Start with a conversation. No demo. No pitch deck. Just your environment and what you're trying to solve.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button><button className="bt-wt" onClick={()=>setPage("services")}>Explore Services →</button></div>
    </div></section>
  </>
);

export default AboutPage;
