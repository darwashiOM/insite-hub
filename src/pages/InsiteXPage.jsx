const InsiteXPage = ({ setPage }) => (
  <>
    <div className="ix-hero">
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.04,pointerEvents:"none"}} preserveAspectRatio="none">
        {Array.from({length:18},(_,i)=><line key={"v"+i} x1={(i*6)+"%"} y1="0%" x2={(i*6)+"%"} y2="100%" stroke="#F4801F" strokeWidth="1"/>)}
        {Array.from({length:10},(_,i)=><line key={"h"+i} x1="0%" y1={(i*11.1)+"%"} x2="100%" y2={(i*11.1)+"%"} stroke="#F4801F" strokeWidth="1"/>)}
      </svg>
      <div style={{position:"absolute",top:-180,right:-180,width:700,height:700,background:"radial-gradient(circle,rgba(244,128,31,.14) 0%,transparent 68%)",borderRadius:"50%",pointerEvents:"none"}}/>
      <div className="mw" style={{position:"relative",zIndex:1}}>
        <div className="pbadge" style={{background:"rgba(244,128,31,.1)",border:"1px solid rgba(244,128,31,.25)",color:"#F4801F"}}>🖥️ InsiteX LMS</div>
        <h1 className="ph1" style={{color:"var(--wh)",maxWidth:760}}>Enterprise learning infrastructure.<br/><span style={{color:"var(--o)"}}>Built for biopharma. Not bolted on.</span></h1>
        <p className="psub" style={{color:"rgba(255,255,255,.48)",marginBottom:40,maxWidth:600}}>A cloud-based all-in-one learning platform for biopharma companies and health systems — with the compliance architecture, credentialing workflows, and content controls that life sciences actually requires.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button className="bp" onClick={()=>setPage("contact")}>Request a Demo</button>
          <button className="bt-wt" onClick={()=>setPage("contact")}>Talk to an Expert</button>
        </div>
        <div style={{display:"flex",gap:44,marginTop:52,paddingTop:40,borderTop:"1px solid rgba(255,255,255,.07)"}}>
          {[{n:"4+",l:"Years serving biopharma"},{n:"30+",l:"Pharma & health system clients"},{n:"SCORM / AICC",l:"& PMRC compliant"},{n:"SOC 2",l:"Type II in progress"}].map(s=>(
            <div key={s.n}><div style={{fontSize:22,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",marginBottom:4}}>{s.n}</div><div style={{fontSize:12,color:"rgba(255,255,255,.32)"}}>{s.l}</div></div>
          ))}
        </div>
      </div>
    </div>
    <section className="sec sw"><div className="mw">
      <div className="sh"><div className="ey">Learner Experience</div><h2 className="h2">Modern, intuitive, and built for the pace of biopharma commercial teams.</h2><p className="lead">InsiteX delivers an engaging learner experience across every device and content modality — with the compliance and credentialing architecture that gives your regulatory team confidence.</p></div>
      <div className="ix-fg">
        {[{icon:"🗺️",t:"Personalized Learning Journey",d:"Custom pathways for each learner based on assigned or elective content. Progress tracking and completion status built in from day one."},{icon:"📱",t:"Device Agnostic + Native App",d:"Full web app that works on any device. Native app adds device-specific enhancements and app store distribution for field teams."},{icon:"🎬",t:"Multiple Modality Support",d:"Handles all media types. Full event management for ILT and vILT. Video processing and custom player included."},{icon:"💬",t:"Live Coaching & Collaboration",d:"Live video coaching tool and online community for informal learning, mentoring, and peer collaboration over time."},{icon:"📅",t:"Live Event Management",d:"Tracks all live events and vILT sessions with full Outlook and calendar integration. Reps always know what to do and when."},{icon:"🏅",t:"Badging & Certifications",d:"Custom badge development, credential assignment, and completion certification. Tracks internal and external certifications in one place."}].map(f=>(
          <div key={f.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{ e.currentTarget.style.borderColor="#F4801F"; e.currentTarget.style.background="rgba(244,128,31,.04)"; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--br)"; e.currentTarget.style.background="var(--lt)"; }}>
            <div style={{width:44,height:44,borderRadius:12,background:"var(--o10)",border:"1px solid var(--o20)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>{f.icon}</div>
            <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8}}>{f.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{f.d}</div>
          </div>
        ))}
      </div>
    </div></section>
    <section className="sec sd2"><div className="mw">
      <div className="sh"><div className="ey-wt">Mission Control</div><h2 className="h2-wt">Admin tools built for compliance teams who can't afford surprises.</h2><p className="lead-wt">InsiteX gives L&D operations real-time dashboards, full versioning control, AI-enabled authoring, and the compliance audit infrastructure biopharma requires.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[{icon:"📊",t:"Actionable Dashboards & Reports",d:"Real-time dashboards for critical information and custom reports for deeper analysis, customizable on the fly."},{icon:"🤖",t:"AI-Enabled Content Authoring",d:"Design and launch eLearning programs with AI assistance. Full versioning control, just-in-time editing, and form creation."},{icon:"📋",t:"Digital Forms & Workflow",d:"Design interactive forms tied back to the master learning record. Owner and approver assignment for compliance tracking."},{icon:"🔄",t:"Versioning Control & Revert",d:"All assets tracked with full versioning. External assets tracked via codes, expiration dates, and content owners."},{icon:"🔒",t:"Group & Role-Based Security",d:"All content access and administration controlled through group security and roles. SSO and Active Directory integration."},{icon:"📝",t:"AI-Enabled Assessments",d:"Comprehensive testing engine for formative and summative evaluation. Tracking, reporting, and custom analytics included."},{icon:"📁",t:"Flexible eLearning Support",d:"Design and launch within the platform or import external content. SCORM and AICC compliant for easy management."},{icon:"✅",t:"Validated & Compliant",d:"PMRC-aligned asset tracking. Fully validated version available. Digital signature capabilities. SOC 2 Type II in progress."}].map(f=>(
          <div key={f.t} className="fc" style={{display:"flex",gap:16,borderRadius:14,padding:20}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(244,128,31,.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.07)"}>
            <div style={{width:42,height:42,borderRadius:10,background:"rgba(244,128,31,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{f.icon}</div>
            <div><div className="fc-t" style={{fontSize:14,marginBottom:5}}>{f.t}</div><div className="fc-d">{f.d}</div></div>
          </div>
        ))}
      </div>
      <div className="sec-cta">
        <button className="bp" onClick={()=>setPage("contact")}>Request a Demo</button>
        <button className="bt-wt" onClick={()=>setPage("platform")}>Ready for AI? See the Platform →</button>
      </div>
    </div></section>
    {/* Upgrade path */}
    <section className="sec sw"><div className="mw">
      <div style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E4)",borderRadius:22,padding:48,border:"1px solid rgba(244,128,31,.18)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <div className="ey">When You're Ready</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:28,fontWeight:900,color:"var(--dk)",marginBottom:14,letterSpacing:"-.04em",lineHeight:1.16}}>InsiteX is the foundation.<br/>The AI platform is the upgrade.</h3>
            <p style={{fontSize:15,color:"var(--bd)",lineHeight:1.7,marginBottom:24}}>When you're ready to add AI-powered content creation, adaptive learning, and HCP roleplay assessment, InsiteX already connects. No rip-and-replace. An expansion of the infrastructure you already have.</p>
            <button className="bp" onClick={()=>setPage("platform")}>See the AI Platform →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {[{f:"InsiteX LMS",fc:"#F4801F",to:"InsiteHub Atlas",tc:"#007AFF",d:"Atlas pathways live natively inside InsiteX. Competency data flows automatically."},{f:"Forge Content",fc:"#F4801F",to:"InsiteX Library",tc:"#007AFF",d:"MLR-approved Forge content publishes directly to the InsiteX content library."},{f:"Echo Scores",fc:"#7C3AED",to:"InsiteX Records",tc:"#059669",d:"Echo behavioral assessments tie back to the master learning record in InsiteX."}].map(r=>(
              <div key={r.f} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:12,padding:18,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"var(--o10)",color:"var(--o)",flexShrink:0,whiteSpace:"nowrap"}}>{r.f}</div>
                <div style={{color:"var(--st)",fontSize:16}}>→</div>
                <div style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"var(--bl10)",color:"var(--bl)",flexShrink:0,whiteSpace:"nowrap"}}>{r.to}</div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div></section>
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">See InsiteX in your <em>commercial environment.</em></h2>
      <p className="cf-p">We'll walk through the platform against your specific compliance requirements, content types, and team structure.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Request a Platform Demo</button><button className="bt-wt" onClick={()=>setPage("advisory")}>Start with Advisory →</button></div>
    </div></section>
  </>
);

export default InsiteXPage;
