import { HexMarkLarge } from '../components/HexMark';

const NewsPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={440} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:720}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📣 Announcements</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>What's new at <span style={{color:"var(--o)"}}>InsiteHub.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>Partnerships, product launches, research milestones, and news from the team building the first closed-loop AI platform in biopharma commercial learning.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      {/* Featured announcement — UMU partnership */}
      <div style={{background:"linear-gradient(135deg,#F8F8FF,#F0F4FF)",border:"1.5px solid rgba(0,122,255,.2)",borderRadius:20,padding:40,marginBottom:40,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:16,right:20,fontSize:11,fontWeight:700,color:"#007AFF",background:"rgba(0,122,255,.1)",borderRadius:20,padding:"3px 11px",letterSpacing:".06em"}}>NEW PARTNERSHIP</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:10}}>April 2026 · Partnership Announcement</div>
            <h2 style={{fontFamily:"Manrope,sans-serif",fontSize:28,fontWeight:900,color:"var(--dk)",letterSpacing:"-.04em",lineHeight:1.15,marginBottom:14}}>InsiteHub partners with UMU.com to power AI Literacy delivery at scale.</h2>
            <p style={{fontSize:15,color:"var(--bd)",lineHeight:1.72,marginBottom:20}}>InsiteHub has entered into a strategic partnership with UMU.com, a leading AI-powered learning platform, to deliver the InsiteHub AI Literacy Program to biopharma commercial organizations globally. The partnership combines InsiteHub's biopharma domain expertise and curriculum design with UMU's enterprise learning delivery infrastructure — enabling scalable, measurable AI literacy programs that integrate with existing LMS environments.</p>
            <p style={{fontSize:15,color:"var(--bd)",lineHeight:1.72,marginBottom:28}}>The AI Literacy Program, now available through UMU, provides role-targeted learning tracks for commercial teams across reps, managers, medical affairs, regulatory, and L&D leadership — building the foundation every AI platform deployment needs to succeed.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button className="bp" onClick={()=>setPage("literacy")}>See the AI Literacy Program</button>
              <button className="bs" onClick={()=>setPage("contact")}>Request Partnership Info</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {icon:"🌐",t:"Global Delivery at Scale",d:"UMU's enterprise infrastructure enables InsiteHub to deliver AI Literacy programs to commercial organizations across North America, Europe, and Asia-Pacific."},
              {icon:"🔗",t:"LMS Integration",d:"The program integrates with InsiteX, existing pharma LMS environments, and UMU's native platform — no rip-and-replace required."},
              {icon:"📊",t:"Measurable Literacy Outcomes",d:"Pre and post assessments track AI literacy gains by role and cohort, with reporting that feeds directly into AI readiness planning and deployment sequencing."},
            ].map(f=>(
              <div key={f.t} style={{background:"rgba(255,255,255,.7)",border:"1px solid rgba(0,122,255,.12)",borderRadius:12,padding:"16px 20px",display:"flex",gap:14}}>
                <div style={{fontSize:20,flexShrink:0}}>{f.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:4}}>{f.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>{f.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional announcements */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:48}}>
        {[
          {date:"March 2026",tag:"Platform Update",tagC:"#7C3AED",tagBg:"rgba(124,58,237,.08)",icon:"🚀",t:"InsiteHub Echo — ComplianceGuard v2 Released",d:"Real-time compliance monitoring now includes enhanced MLR flag categorization, automated rephrasing suggestions, and expanded banned phrase detection across all six commercial verticals. Available to all Echo clients immediately."},
          {date:"February 2026",tag:"Research",tagC:"#059669",tagBg:"rgba(5,150,105,.08)",icon:"🔬",t:"Proxa Labs publishes AI Readiness Scoring Model beta",d:"The Proxa Labs team has released a beta version of the AI Readiness Scoring Model — an 8-dimension maturity framework for measuring commercial L&D AI readiness. Available to advisory engagement clients as part of Phase 1 diagnostics."},
          {date:"January 2026",tag:"Partnership",tagC:"#007AFF",tagBg:"rgba(0,122,255,.08)",icon:"🤝",t:"InsiteHub named University of Delaware AI Center of Excellence Business Partner in Residence",d:"InsiteHub has been appointed Business Partner in Residence at the University of Delaware's AI Center of Excellence — deepening the academic research relationship behind the Proxa Labs experimentation methodology."},
          {date:"December 2025",tag:"Platform Launch",tagC:"#F4801F",tagBg:"rgba(244,128,31,.08)",icon:"⚡",t:"InsiteHub Forge v4.0 — General Availability",d:"Forge's agentic content creation platform reaches general availability, including the Content Gap Analyzer, MLR Package Builder, and Knowledge Session dual-track sourcing engine. Available to enterprise commercial L&D teams now."},
        ].map(a=>(
          <div key={a.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:28,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:11,fontWeight:700,color:a.tagC,background:a.tagBg,borderRadius:20,padding:"3px 10px",letterSpacing:".04em"}}>{a.tag}</span>
              <span style={{fontSize:12,color:"var(--bdl)"}}>{a.date}</span>
            </div>
            <div style={{fontSize:20,marginBottom:10}}>{a.icon}</div>
            <div style={{fontSize:17,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,lineHeight:1.3}}>{a.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.65}}>{a.d}</div>
          </div>
        ))}
      </div>

      {/* Newsletter signup */}
      <div style={{background:"var(--dk)",borderRadius:20,padding:40,display:"flex",alignItems:"center",justifyContent:"space-between",gap:32,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"rgba(255,255,255,.85)",fontFamily:"Manrope,sans-serif",marginBottom:6}}>Get announcements in your inbox.</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>New partnerships, product updates, and research from InsiteHub and Proxa Labs.</div>
        </div>
        <button className="bp" onClick={()=>setPage("newsletter")}>Subscribe to Updates</button>
      </div>
    </div></section>
  </>
);

export default NewsPage;
