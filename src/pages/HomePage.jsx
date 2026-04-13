import useReveal from '../hooks/useReveal';
import LoopVisual from '../components/LoopVisual';

const HomePage = ({ setPage }) => {
  useReveal();
  return (
  <>
    {/* HERO */}
    <section className="hero">
      <div className="hero-inner">
        <div style={{position:"relative",zIndex:1}}>
          <div className="hero-pill"><div className="hpd"/>AI-First · Purpose-Built for Biopharma</div>
          <h1 className="hero-h1">
            The <em>strategy, literacy,<br/>and platform</em> to turn<br/>your AI mandate into results.
          </h1>
          <p className="hero-p">The only closed-loop AI platform built for biopharma commercial learning — backed by advisory methodology and a 25-year track record.</p>
          <div className="hero-actions">
            <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
            <button className="bs" onClick={()=>setPage("platform")}>See the Platform</button>
          </div>
        </div>
        <div style={{position:"relative"}}><LoopVisual/></div>
      </div>
    </section>

    {/* CLIENT LOGOS */}
    <div className="logo-band">
      <div className="lb-label">Trusted across biopharma and health systems</div>
      <div className="lb-row">
        {["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"].map(n=><span key={n} className="lb-co">{n}</span>)}
      </div>
    </div>

    {/* STATS */}
    <div className="stats">
      <div className="stats-row">
        {[{n:"80–95%",l:"of pharma AI pilots never scale or deliver measurable value"},{n:"11 mo",l:"average ramp to full rep productivity in biopharma"},{n:"84%",l:"of pharma reps missed quota last year"},{n:"25 yrs",l:"biopharma commercial L&D expertise behind our methodology"}].map(s=>(
          <div className="st" key={s.n}><div className="st-n">{s.n}</div><div className="st-l">{s.l}</div></div>
        ))}
      </div>
    </div>

    {/* THREE CAPABILITY CARDS */}
    <section className="sec sw">
      <div className="mw">
        <div style={{textAlign:"center",marginBottom:48}}>
          <div className="ey" style={{textAlign:"center"}}>What We Do</div>
          <h2 className="h2" style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>Three ways we help biopharma<br/>commercial teams succeed with AI.</h2>
        </div>
        <div className="grid-3">
          {[
            {icon:"🤖",c:"#F4801F",bg:"rgba(244,128,31,.09)",title:"AI Platform",desc:"Four products — Forge, Atlas, Echo, Certify — in one closed loop. Content created automatically rebuilds when assessment gaps emerge. No human handoff.",page:"platform"},
            {icon:"🧭",c:"#007AFF",bg:"rgba(0,122,255,.09)",title:"Advisory & Services",desc:"AI readiness assessments, governance frameworks, AI literacy training, and content development. We diagnose before we prescribe — and deliver at every stage.",page:"services"},
            {icon:"🔬",c:"#7C3AED",bg:"rgba(124,58,237,.09)",title:"Proxa Labs",desc:"Structured AI experimentation for biopharma. We help you design the right pilot, measure what matters, and build a business case your CCO can act on.",page:"services"},
          ].map(c=>(
            <div key={c.title} onClick={()=>setPage(c.page)} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:20,padding:32,cursor:"pointer",transition:"all .25s",borderTop:("3px solid "+c.c)}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 20px 48px rgba(0,0,0,.08)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{width:50,height:50,borderRadius:14,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:18}}>{c.icon}</div>
              <div style={{fontSize:20,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",marginBottom:10}}>{c.title}</div>
              <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.68,marginBottom:18}}>{c.desc}</div>
              <div style={{fontSize:13,color:c.c,fontWeight:600}}>Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIAL */}
    <section className="sec sl">
      <div className="mw">
        <div className="grid-auto-quote" style={{background:"linear-gradient(135deg,#FFFAF6,#FFF4E8)",border:"1.5px solid rgba(244,128,31,.2)",borderRadius:20,padding:"40px 48px"}}>
          <div>
            <div style={{fontSize:28,color:"var(--o)",fontWeight:800,lineHeight:1,marginBottom:20,opacity:.3}}>"</div>
            <p style={{fontSize:18,color:"var(--dk)",lineHeight:1.72,fontStyle:"italic",fontWeight:400,marginBottom:24}}>What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. That single decision changed everything. We walked into our budget review with evidence, not a pitch deck.</p>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#F4801F,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",fontWeight:700,fontFamily:"Manrope,sans-serif",flexShrink:0}}>SC</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif"}}>Sarah Chen</div>
                <div style={{fontSize:13,color:"var(--bd)"}}>VP, Commercial Learning &amp; Development</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,minWidth:180}}>
            {[{n:"23%",l:"call quality improvement"},{n:"0",l:"MLR compliance flags"},{n:"3 wks",l:"pilot to CCO approval"}].map(s=>(
              <div key={s.n} style={{textAlign:"center",padding:"14px 20px",background:"rgba(255,255,255,.8)",borderRadius:12,border:"1px solid rgba(244,128,31,.15)"}}>
                <div style={{fontSize:24,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",lineHeight:1,marginBottom:4}}>{s.n}</div>
                <div style={{fontSize:11,color:"var(--bd)",lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">The mandate is clear.<br/><em>The platform is ready.</em></h2>
        <p className="cf-p">30 minutes. No demo, no pitch. Just your environment and what your actual next step is.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("platform")}>See the Platform →</button>
        </div>
      </div>
    </section>
  </>
  );
};

export default HomePage;
