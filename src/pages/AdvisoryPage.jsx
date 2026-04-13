import { HexMarkLarge } from '../components/HexMark';

const AdvisoryPage = ({ setPage }) => (
  <>
    <div className="ph" style={{textAlign:"left"}}>
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={500} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:820}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🧭 Advisory</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>
            The right AI solution is the one<br/>that survives <em style={{fontStyle:"normal",color:"var(--o)"}}>your</em> environment.
          </h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Most vendors lead with a demo. We lead with a diagnosis. InsiteHub Advisory maps your compliance requirements, your governance structure, and your team's actual readiness before recommending anything — because what fails biopharma AI implementations is never the technology.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Schedule a Discovery Call</button>
            <button className="bs" onClick={()=>setPage("contact")}>Request an Assessment</button>
          </div>
        </div>
      </div>
    </div>

    {/* THE PROBLEM */}
    <section className="sec sw">
      <div className="mw">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
          <div>
            <div className="ey">Why Advisory First</div>
            <h2 className="h2">Advisory is always the entry point. Not a starting option — a structural requirement.</h2>
            <p className="lead" style={{marginBottom:20}}>Deploying technology before diagnosing your environment is what every other vendor does. It's also why 80–95% of pharma AI pilots never scale. The organizations that succeed don't have better AI — they have better methodology.</p>
            <p className="lead" style={{marginBottom:32}}>InsiteHub Advisory builds your AI literacy, stress-tests use cases against your real organizational constraints, and delivers an executable roadmap your CCO can stand behind — before a single dollar is committed to technology.</p>
            <div className="qb">
              <div className="qb-t">"She doesn't need more evidence that AI can work. She needs a way to ensure it will work for her, in her environment, before she puts her credibility behind it."</div>
              <div className="qb-src">From InsiteHub's VP of Commercial L&D buyer research</div>
            </div>
          </div>
          <div style={{background:"var(--lt)",borderRadius:18,padding:30}}>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"var(--st)",fontWeight:700,marginBottom:20}}>THE FOUR FAILURE PATTERNS</div>
            {[{t:"No path from pilot to production",d:"Pilots are designed to succeed in controlled conditions. Production deployment is a governance, IT validation, and change management challenge. Most pilots were never designed to survive that moment."},{t:"Weak data foundations",d:"The AI works in the demo. It fails when introduced to your actual content architecture — legacy systems, approved materials in formats AI can't reliably process, no structured pipelines between LMS and CRM."},{t:"Misaligned ownership",d:"The pilot was owned by L&D or IT, not a commercial business leader with revenue accountability. Without a sponsor, it stalls at the governance gate and dies quietly in a committee meeting."},{t:"Measurement theater",d:"Engagement metrics that can't show a line to commercial performance. When the CCO asks 'what did this do for revenue?' the answer is a learning maturity framework. Projects that can't answer that question get cut."}].map((f,i)=>(
              <div key={f.t} style={{paddingBottom:i<3?16:0,marginBottom:i<3?16:0,borderBottom:i<3?"1px solid var(--br)":"none"}}>
                <div style={{fontSize:14,fontWeight:700,color:"var(--dk)",marginBottom:5}}>{f.t}</div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.58}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* INLINE CTA */}
    <div style={{padding:"0 56px",background:"var(--sw)"}}>
      <div className="mw" style={{paddingBottom:0}}>
        <div className="cta-bar">
          <div>
            <div className="cta-bar-t">Not sure where to start? That's the right conversation to have.</div>
            <div className="cta-bar-s">A 30-minute diagnostic call costs nothing. It produces a clear picture of where your AI readiness gaps actually are.</div>
          </div>
          <button className="cta-bar-btn" onClick={()=>setPage("contact")}>Book a 30-Minute Call</button>
        </div>
      </div>
    </div>

    {/* ENGAGEMENT TYPES */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">How We Work</div>
          <h2 className="h2">Structured engagements.<br/>Concrete deliverables. No open-ended retainers.</h2>
          <p className="lead">Every InsiteHub Advisory engagement is time-bounded, scoped to a specific question, and ends with a deliverable you can act on — whether or not the engagement continues. The model is designed to generate evidence before asking for commitment.</p>
        </div>
        <div className="ag">
          {[
            {n:"Entry Point",t:"AI Strategy & Roadmap Workshop",d:"Executive alignment on AI investment priorities, use cases, and implementation roadmap. Designed for leadership teams that need to get aligned before they can act. The lowest-risk starting point for any organization."},
            {n:"Foundation",t:"AI Readiness & Maturity Assessment",d:"Custom AI maturity model, commercial learning capability heatmap, technology gap analysis, and prioritized use case roadmap with clear accountability for what happens next. The diagnostic that determines every subsequent investment decision."},
            {n:"Selection",t:"Learning Technology & GenAI Platform Assessment",d:"Comprehensive vendor evaluation, compliance and regulatory risk assessment, integration feasibility study, and vendor scoring matrix. Built for the buyer who has been burned by demos and needs a defensible recommendation."},
            {n:"Governance",t:"AI Governance & Compliance Framework",d:"End-to-end governance framework for AI-generated commercial content. Role-based use guidelines, compliance monitoring architecture, and steering committee operating model. The pre-condition for any regulated AI deployment."},
            {n:"Infrastructure",t:"Learning Infrastructure & AI Integration Assessment",d:"Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap. For organizations where the legacy stack is the real constraint — and where every vendor has underestimated the integration complexity."},
            {n:"Organization",t:"AI-Optimized Org Design",d:"Organizational structure recommendations for AI-enabled commercial learning at scale. Who owns what, how teams evolve, and what the governance model looks like as AI capability expands across the commercial organization."},
          ].map(a=>(
            <div key={a.n} className="ac">
              <div className="ac-n">{a.n}</div>
              <div className="ac-t">{a.t}</div>
              <div className="ac-d">{a.d}</div>
            </div>
          ))}
        </div>
        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("contact")}>Talk to an Advisor</button>
          <button className="bs" onClick={()=>setPage("platform")}>See the AI Platform</button>
          <button className="bt" onClick={()=>setPage("content")}>Content Development Services →</button>
        </div>
      </div>
    </section>

    {/* PROOF */}
    <section className="sec sw">
      <div className="mw">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <div className="ey">Why InsiteHub</div>
            <h2 className="h2">We don't need you to explain biopharma to us.</h2>
            <p className="lead" style={{marginBottom:20}}>InsiteHub's practitioners have operated inside commercial organizations at the level where these decisions actually get made. The failure modes are a first-hand record — not a consulting framework built from the outside looking in.</p>
            <p className="lead" style={{marginBottom:32}}>That means you spend zero time educating us about MLR review timelines, GxP validation, or the political dynamics of a federated commercial structure. Every hour of education overhead is an hour you're not moving toward the outcome your CCO is watching.</p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button className="bp" onClick={()=>setPage("about")}>Our Story &amp; Track Record</button>
              <button className="bs" onClick={()=>setPage("contact")}>Start a Conversation</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[{label:"Vanguard Award · AstraZeneca · 2008–2009",t:"Best Corporate Learning Program in the World",d:"When the standard approach was a $5M vendor platform, InsiteHub's practitioners built something no one had built before — saving the organization ~$10M while delivering engagement the industry had never seen. That program was built under the same launch pressure, compliance constraints, and governance requirements our clients navigate today."},{label:"Methodology Origin · Bell Labs",t:"Experimentation before commitment — not a consulting trend, a foundational principle",d:"The experimentation-before-deployment approach at the core of every InsiteHub engagement traces to Bell Labs: you run controlled experiments before committing to a direction. You don't wait for certainty, but you don't bet the organization on a vendor demo either. That thinking shaped 25 years of biopharma implementation work."}].map(c=>(
              <div key={c.t} style={{background:"var(--lt)",borderRadius:16,padding:28}}>
                <div style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:8}}>{c.label}</div>
                <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.025em",lineHeight:1.3}}>{c.t}</div>
                <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* HOW WE ENGAGE */}
    <section className="sec sl">
      <div className="mw">
        {/* AI Literacy inline callout */}
        <div style={{background:"linear-gradient(135deg,#FFFBF0,#FFF5E0)",border:"1.5px solid rgba(245,158,11,.25)",borderRadius:16,padding:"22px 28px",marginBottom:44,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <div style={{fontSize:28}}>🎓</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:"#D97706",fontFamily:"Manrope,sans-serif",marginBottom:3}}>Before we recommend technology, we often recommend literacy.</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>Organizations that deploy AI tools into teams that don't understand them fail at adoption. The AI Literacy Program runs alongside or ahead of any advisory engagement — and is always worth doing first.</div>
          </div>
          <button onClick={()=>setPage("literacy")} style={{padding:"10px 20px",borderRadius:9,background:"#D97706",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",flexShrink:0,whiteSpace:"nowrap"}}>See the Literacy Program</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
          <div>
            <div className="ey">How We Engage</div>
            <h2 className="h2">Structured engagements.<br/>Clear starting points.<br/>No open-ended commitments.</h2>
            <p className="lead" style={{marginBottom:20}}>Every InsiteHub engagement is time-bounded and scoped to a specific question, with a deliverable you can act on whether or not the relationship continues. We don't do open-ended retainers.</p>
            <p className="lead" style={{marginBottom:32}}>Most clients start with an advisory diagnostic or AI strategy workshop — a defined scope, a concrete deliverable, and a clear picture of what the next step would look like. That's typically where the relationship begins.</p>
            <button className="bp" onClick={()=>setPage("contact")}>Start with a Discovery Call</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {step:"Step 1",icon:"🔍",t:"30-Minute Discovery Call",d:"No cost, no commitment. We map your situation, your constraints, and what's already been tried. At the end, we tell you what we'd look at first — and whether InsiteHub is the right fit."},
              {step:"Step 2",icon:"📋",t:"Scoped Diagnostic or Workshop",d:"A time-bounded engagement with a clear deliverable — an AI readiness assessment, a use case prioritization workshop, or a governance framework. You walk away with something you can use regardless of what comes next."},
              {step:"Step 3",icon:"🚀",t:"Pilot or Platform Engagement",d:"If the diagnostic confirms a fit, we scope the next phase together — a Proxa Labs AI experiment, an advisory roadmap, or a platform implementation. Every subsequent step has defined scope, defined deliverables, and a clear go/no-go point."},
            ].map((s,i)=>(
              <div key={s.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:14,padding:22,display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:10,background:"var(--o10)",border:"1px solid var(--o20)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
                <div>
                  <div style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:4}}>{s.step}</div>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6}}>{s.t}</div>
                  <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">Start with a <em>diagnosis.</em></h2>
        <p className="cf-p">30 minutes. No demo. Tell us about your environment, what you've tried, and where you've been stuck. We'll tell you what we'd look at first.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Schedule a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("platform")}>Explore the Platform →</button>
        </div>
      </div>
    </section>
  </>
);

export default AdvisoryPage;
