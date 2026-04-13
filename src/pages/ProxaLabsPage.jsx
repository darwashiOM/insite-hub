import { HexMark } from '../components/HexMark';

const ProxaLabsPage = ({ setPage }) => (
  <>
    {/* HERO — vibrant purple-to-orange gradient, light feel */}
    <div style={{
      background:"linear-gradient(135deg, #F8F0FF 0%, #EDE0FF 30%, #FFF0E8 70%, #FFF8F2 100%)",
      padding:"148px 56px 80px", position:"relative", overflow:"hidden",
    }}>
      {/* Large decorative hex marks */}
      <div style={{position:"absolute",top:-60,right:-60,opacity:.12}}>
        <HexMark size={320} color="#7C3AED" strokeWidth={0.8}/>
      </div>
      <div style={{position:"absolute",bottom:-80,left:-40,opacity:.07}}>
        <HexMark size={260} color="#F4801F" strokeWidth={0.8}/>
      </div>
      {/* Glow blobs */}
      <div style={{position:"absolute",top:-100,right:100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-80,left:200,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(244,128,31,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>

      <div className="mw" style={{position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
          <div>
            <div className="pbadge" style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:"#7C3AED",marginBottom:20}}>🔬 Proxa Labs · AI Experimentation Partner</div>
            <h1 className="ph1" style={{color:"var(--dk)"}}>
              Your AI mandate deserves<br/>
              <span style={{background:"linear-gradient(135deg,#7C3AED,#F4801F)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>a properly designed experiment.</span>
            </h1>
            <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Proxa Labs helps commercial L&D organizations define the right AI use case, design a structured experiment, measure success against criteria that matter to leadership — and build the business case that turns results into action. Evidence before investment. Every time.</p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:700,color:"#fff",cursor:"pointer",padding:"13px 28px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#7C3AED,#9B3AED)",transition:"all .2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                Visit proxalabs.com →
              </button>
              <button className="bs" onClick={()=>setPage("contact")}>Get in Touch</button>
            </div>
          </div>
          {/* Right: animated stat cards */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[
              {icon:"🎯",label:"Use Case Definition",val:"Phase 1",desc:"Find the right problem before designing any solution — the step most organizations skip",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.18)"},
              {icon:"🔬",label:"Experiment Design",val:"Phase 2",desc:"Built to test against your real constraints — not a controlled environment engineered to succeed",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)"},
              {icon:"📈",label:"Success Measurement",val:"Phase 3",desc:"Metrics defined before the experiment runs — commercial performance, not engagement theater",c:"#059669",bg:"rgba(5,150,105,.07)",bc:"rgba(5,150,105,.18)"},
              {icon:"📋",label:"Business Case",val:"Phase 4",desc:"A leadership-ready ROI model and implementation roadmap before any scaling decision is made",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.18)"},
            ].map(s=>(
              <div key={s.label} style={{background:s.bg,border:("1.5px solid "+s.bc),borderRadius:18,padding:22,transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                <div style={{fontSize:22,marginBottom:10}}>{s.icon}</div>
                <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:6}}>{s.val}</div>
                <div style={{fontSize:12,fontWeight:700,color:s.c,marginBottom:6,letterSpacing:".03em"}}>{s.label}</div>
                <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* WHAT IS PROXA LABS */}
    <section className="sec sw"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
        <div>
          <div className="ey">What is Proxa Labs</div>
          <h2 className="h2">The lab behind the platform.<br/>And your AI experimentation partner.</h2>
          <p className="lead" style={{marginBottom:18}}>Proxa Labs exists because most AI implementations in biopharma don't fail at the technology level — they fail at the experimentation level. The use case was wrong, the success criteria were vague, the pilot wasn't designed to generate evidence, and no one built the business case until after the money was spent.</p>
          <p className="lead" style={{marginBottom:18}}>Proxa Labs was built to fix that specific problem. We help commercial L&D organizations design and execute structured AI experiments that generate defensible evidence — and turn that evidence into leadership-ready business cases before any large-scale commitment is made.</p>
          <p className="lead" style={{marginBottom:28}}>This is the same methodology that produced every InsiteHub AI product. It works externally for exactly the same reasons it works internally: it inverts the sequence. Evidence before investment. Every time.</p>
          {/* Specialty statement */}
          <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.07),rgba(244,128,31,.07))",border:"1.5px solid rgba(124,58,237,.2)",borderRadius:16,padding:24}}>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"#7C3AED",fontWeight:700,marginBottom:12}}>Our Specialty</div>
            <p style={{fontSize:15,color:"var(--dk)",fontWeight:600,lineHeight:1.6,marginBottom:14}}>We specialize in helping organizations design, develop, implement, measure, and navigate AI pilots — end to end.</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {step:"Design",d:"Define the right use case, set honest success criteria, and structure the experiment to generate evidence — not just results."},
                {step:"Develop",d:"Build the pilot with your actual organizational constraints baked in: compliance, IT, governance, and stakeholder dynamics."},
                {step:"Implement",d:"Run the pilot with rigor. Monitor against pre-defined metrics. Surface issues before they become governance problems."},
                {step:"Measure",d:"Evaluate against commercial performance — not learning engagement. Produce results your CCO can interrogate."},
                {step:"Navigate",d:"Guide the transition from pilot evidence to organizational commitment. Build the business case. Manage the stakeholder map."},
              ].map((s,i)=>(
                <div key={s.step} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#7C3AED",background:"rgba(124,58,237,.1)",borderRadius:6,padding:"3px 9px",flexShrink:0,marginTop:1,letterSpacing:".04em"}}>{s.step}</div>
                  <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            {icon:"🧪",t:"Lab-Based Methodology",d:"Every engagement starts with a structured experiment — not a deployment. We test fit in your environment before any scaling decision is made.",c:"#7C3AED",bg:"rgba(124,58,237,.07)"},
            {icon:"🤝",t:"NIH Partnership",d:"InsiteHub leads InsiteXcelerator — one of only two NIH-partnered biomedical accelerators outside a university in the US.",c:"#059669",bg:"rgba(5,150,105,.07)"},
            {icon:"🌐",t:"Open Source Initiative",d:"Proxa Labs open-sources biopharma AI tooling, including an active hackathon to crowdsource an open-source HCP avatar engine.",c:"#F4801F",bg:"rgba(244,128,31,.07)"},
            {icon:"🎓",t:"University of Delaware",d:"AI Center of Excellence Business Partner in Residence. Bridging academic AI research and biopharma commercial deployment.",c:"#007AFF",bg:"rgba(0,122,255,.07)"},
          ].map(c=>(
            <div key={c.t} style={{background:c.bg,border:("1.5px solid "+c.c+"22"),borderRadius:16,padding:22,transition:"all .2s"}} onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px "+c.c+"18"; }} onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{fontSize:22,marginBottom:10}}>{c.icon}</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8}}>{c.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div></section>

    {/* THE PROBLEM */}
    <section className="sec sl"><div className="mw">
      <div style={{maxWidth:760,margin:"0 auto",textAlign:"center",marginBottom:56}}>
        <div className="ey" style={{textAlign:"center"}}>Why Experimentation Fails</div>
        <h2 className="h2" style={{textAlign:"center"}}>Most AI pilots don't fail because the technology is wrong.<br/>They fail because the experiment was never designed properly.</h2>
        <p className="lead" style={{margin:"0 auto",textAlign:"center"}}>When there's no defined use case, no hypothesis, no success criteria, and no path from pilot to business case — the pilot produces interesting data and then quietly dies in a committee meeting. Proxa Labs exists to change that sequence.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[
          {icon:"❓",t:"The use case is too broad",d:"'Use AI in training' is not a use case. It's a mandate. Organizations that succeed with AI start with a specific problem that has a measurable outcome — and they validate that problem before building anything.",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.15)"},
          {icon:"📐",t:"The experiment isn't designed to generate evidence",d:"A pilot that's scoped to succeed in controlled conditions proves nothing. A properly designed experiment tests the solution against your actual constraints — governance, data, workflow, compliance — so the results are defensible.",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.15)"},
          {icon:"📊",t:"There's no path to a business case",d:"Even pilots that work fail to scale because no one built the business case while the evidence was fresh. Leadership needs ROI framing, risk assessment, and a credible implementation path — not learning metrics.",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.15)"},
        ].map(p=>(
          <div key={p.t} style={{background:p.bg,border:("1.5px solid "+p.bc),borderRadius:18,padding:28}}>
            <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:16}}>{p.icon}</div>
            <div style={{fontSize:17,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,letterSpacing:"-.03em",lineHeight:1.25}}>{p.t}</div>
            <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{p.d}</div>
          </div>
        ))}
      </div>
    </div></section>

    {/* THE FOUR-PHASE EXPERIMENTATION MODEL */}
    <section className="sec sw"><div className="mw">
      <div className="sh">
        <div className="ey">The Proxa Labs Experimentation Model</div>
        <h2 className="h2">From pressure to proof.<br/>Four phases. One defensible outcome.</h2>
        <p className="lead">Every Proxa Labs client engagement follows the same structured sequence — designed to produce a leadership-ready business case, not just a pilot report. Each phase builds on the last, and the evidence generated at every step is the input for the next.</p>
      </div>

      {/* Phase cards — large, sequential, connected */}
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {[
          {
            n:"Phase 01", c:"#7C3AED", bg:"rgba(124,58,237,.06)", bc:"rgba(124,58,237,.15)",
            icon:"🎯", title:"Define the Right Use Case",
            sub:"Before anything is designed or built, we answer the question that determines whether all subsequent investment is justified: what specific problem does AI actually solve here, and is it the right problem to solve first?",
            body:"Most organizations arrive with a mandate — 'do something with AI' — rather than a use case. Proxa Labs starts by mapping the commercial learning landscape against the organization's strategic priorities, capability gaps, and governance constraints. We identify where AI creates the most value, where it creates the most risk, and where the organizational readiness exists to actually execute. The output is a prioritized use case hypothesis: a specific, bounded problem with a testable solution and a measurable outcome.",
            deliverable:"Prioritized use case brief with problem statement, hypothesis, expected impact, and organizational feasibility assessment.",
            outcomes:["Problem clearly bounded and separated from adjacent mandates","Use case ranked by value, feasibility, and governance risk","Stakeholder alignment map — who owns success, who can veto","Clear go/no-go criteria before experiment design begins"],
          },
          {
            n:"Phase 02", c:"#F4801F", bg:"rgba(244,128,31,.06)", bc:"rgba(244,128,31,.18)",
            icon:"🔬", title:"Design the Experiment",
            sub:"A well-designed AI experiment tests the solution against your actual constraints — not a controlled environment engineered to succeed. This is where most pilots go wrong, and it's the most important phase Proxa Labs manages.",
            body:"Proxa Labs designs structured experiments that are built to be honest. That means introducing real organizational friction — the compliance review process, the IT validation requirements, the BU ownership dynamics — during the experiment, not after it. We define the experiment scope, the participant cohort, the data collection approach, and the governance checkpoints. We identify the conditions under which the experiment will be considered a success and, equally important, the conditions under which it will be stopped. The result is an experiment that generates evidence you can defend, not just results that look good in a slide deck.",
            deliverable:"Experiment design document: scope, hypothesis, success criteria, failure criteria, governance checkpoints, and data collection plan.",
            outcomes:["Experiment designed against real organizational constraints","Success and failure criteria defined before the experiment runs","Data collection approach aligned to leadership's decision criteria","Governance and compliance requirements accounted for in design"],
          },
          {
            n:"Phase 03", c:"#059669", bg:"rgba(5,150,105,.06)", bc:"rgba(5,150,105,.15)",
            icon:"📈", title:"Define and Measure Success",
            sub:"Success criteria defined after a pilot produces good results are not success criteria — they're post-hoc rationalization. Proxa Labs defines what success looks like before the experiment runs, and measures against those criteria with independent rigor.",
            body:"We work with commercial leadership, L&D, and IT to define the metrics that actually matter to the organization's decision-makers — not the metrics that are easy to collect. In biopharma commercial learning, that means connecting learning outcomes to commercial performance: rep readiness scores, time-to-productivity, call quality, content velocity, and launch execution speed. Alongside the commercial metrics, we design the governance and compliance metrics that determine whether a solution is scalable in a regulated environment. Every measurement is tied back to the original use case hypothesis so the evaluation is clean, defensible, and free of confirmation bias.",
            deliverable:"Success measurement framework with primary metrics, secondary indicators, measurement methodology, and evaluation timeline.",
            outcomes:["Metrics defined pre-experiment — no post-hoc goal-setting","Commercial performance metrics, not just learning engagement metrics","Compliance and governance metrics built into evaluation criteria","Independent measurement approach to protect credibility of results"],
          },
          {
            n:"Phase 04", c:"#007AFF", bg:"rgba(0,122,255,.06)", bc:"rgba(0,122,255,.15)",
            icon:"📋", title:"Build the Business Case",
            sub:"The experiment is over. The evidence is real. Now the work that determines whether any of it scales: translating experimental results into a leadership-ready business case that survives budget scrutiny, compliance review, and the CCO's quarterly report.",
            body:"Most organizations treat business case development as an afterthought — something the L&D team does after the fact to justify a decision that's already been made. Proxa Labs builds the business case as a live artifact throughout the engagement, updating it at each phase so that when the experiment concludes, the case is ready. We frame the results in the language of commercial performance — revenue impact, cost reduction, risk mitigation — and build the ROI model, risk assessment, and implementation roadmap that executives actually use to make decisions. The output is not a learning metrics report. It's a decision document your CCO, CFO, and CHRO can act on.",
            deliverable:"Executive business case: ROI model, risk assessment, implementation roadmap, resource requirements, and phased scaling plan.",
            outcomes:["ROI framed in commercial performance terms — not L&D metrics","Risk assessment built for compliance, IT, and finance stakeholders","Phased implementation roadmap with clear go/no-go decision points","Ready for CCO, CFO, and CHRO — not just L&D leadership"],
          },
        ].map((ph,i,arr)=>(
          <div key={ph.n} style={{position:"relative"}}>
            <div style={{background:ph.bg,border:("1.5px solid "+ph.bc),borderRadius:20,padding:40,transition:"box-shadow .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 16px 48px "+ph.c+"12"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
                {/* Left */}
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                    <div style={{width:52,height:52,borderRadius:15,background:(ph.c+"15"),border:("1.5px solid "+ph.c+"30"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{ph.icon}</div>
                    <div>
                      <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:ph.c,fontWeight:700,marginBottom:3}}>{ph.n}</div>
                      <div style={{fontSize:22,fontWeight:900,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1.15}}>{ph.title}</div>
                    </div>
                  </div>
                  <p style={{fontSize:15,fontWeight:600,color:"var(--dk)",lineHeight:1.6,marginBottom:14,fontStyle:"italic"}}>{ph.sub}</p>
                  <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.72,marginBottom:20}}>{ph.body}</p>
                  <div style={{background:"rgba(255,255,255,.8)",border:("1px solid "+ph.bc),borderRadius:12,padding:"14px 18px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:ph.c,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Key Deliverable</div>
                    <div style={{fontSize:13.5,color:"var(--dk)",lineHeight:1.55}}>{ph.deliverable}</div>
                  </div>
                </div>
                {/* Right — outcomes */}
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:ph.c,letterSpacing:".1em",textTransform:"uppercase",marginBottom:16}}>What this phase produces</div>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {ph.outcomes.map((o,j)=>(
                      <div key={j} style={{display:"flex",gap:12,alignItems:"flex-start",background:"rgba(255,255,255,.7)",borderRadius:12,padding:"14px 16px",border:("1px solid "+ph.bc)}}>
                        <div style={{width:22,height:22,borderRadius:"50%",background:ph.c,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div style={{fontSize:13.5,color:"var(--dk)",lineHeight:1.5}}>{o}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Connector arrow between phases */}
            {i < arr.length-1 && (
              <div style={{display:"flex",justifyContent:"center",padding:"12px 0",zIndex:1,position:"relative"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                  <div style={{width:2,height:12,background:"var(--br)"}}/>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M8 10L0 0h16z" fill="var(--br)"/></svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sec-cta" style={{marginTop:48}}>
        <button className="bp" onClick={()=>setPage("contact")}>Start an Experimentation Engagement</button>
        <button className="bs" onClick={()=>setPage("advisory")}>See Advisory Services</button>
      </div>
    </div></section>

    {/* INLINE CTA */}
    <div style={{padding:"0 56px",background:"var(--sw)"}}>
      <div className="mw">
        <div className="cta-bar">
          <div>
            <div className="cta-bar-t">You have an AI mandate. We have the methodology to execute it.</div>
            <div className="cta-bar-s">A 30-minute conversation to assess whether your current use case is the right one. No demo, no commitment.</div>
          </div>
          <button className="cta-bar-btn" onClick={()=>setPage("contact")}>Start the Conversation</button>
        </div>
      </div>
    </div>

    {/* ACTIVE RESEARCH */}
    <section style={{background:"linear-gradient(135deg,#F5F0FF 0%,#EDE8FF 40%,#FFF5EE 100%)",padding:"96px 56px"}}>
      <div className="mw">
        <div className="sh">
          <div className="ey">Active Research</div>
          <h2 className="h2">What Proxa Labs is working on.</h2>
          <p className="lead">Open research areas that will shape the next generation of InsiteHub products — and inform how we design client experimentation engagements.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[
            {icon:"🎭",c:"#7C3AED",bg:"rgba(124,58,237,.08)",bc:"rgba(124,58,237,.18)",t:"Open-Source HCP Avatar Engine",d:"Active hackathon to crowdsource a real-time, open-source conversational avatar system — reducing Echo's dependency on vendor-locked infrastructure. $10K prize pool. Open to developers worldwide.",tag:"Actively recruiting"},
            {icon:"🔬",c:"#F4801F",bg:"rgba(244,128,31,.08)",bc:"rgba(244,128,31,.2)",t:"AI Readiness Scoring Model",d:"Proprietary maturity model for measuring commercial L&D AI readiness across 8 organizational dimensions. Research goal: predictive modeling of pilot success probability before any technology is deployed.",tag:"In development"},
            {icon:"🧠",c:"#007AFF",bg:"rgba(0,122,255,.08)",bc:"rgba(0,122,255,.2)",t:"Behavioral Learning Analytics",d:"Research into the correlation between AI-assessed behavioral competencies (Echo) and field performance outcomes. Early data shows r=0.84 correlation between module quality scores and certification rates.",tag:"Early results"},
          ].map(r=>(
            <div key={r.t} style={{background:r.bg,border:("1.5px solid "+r.bc),borderRadius:18,padding:28,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{r.icon}</div>
                <div style={{fontSize:10,fontWeight:700,color:r.c,background:"rgba(255,255,255,.7)",borderRadius:20,padding:"4px 12px",letterSpacing:".05em",textTransform:"uppercase"}}>{r.tag}</div>
              </div>
              <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,letterSpacing:"-.03em",lineHeight:1.25}}>{r.t}</div>
              <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Most AI pilots fail before<br/><em>the experiment is even designed.</em></h2>
      <p className="cf-p">Proxa Labs helps you design experiments that generate real evidence — and turn that evidence into a business case your leadership can act on.</p>
      <div className="cf-btns">
        <button className="bp" onClick={()=>setPage("contact")}>Start an Experimentation Engagement</button>
        <button className="bt-wt">Visit proxalabs.com →</button>
      </div>
    </div></section>
  </>
);

export default ProxaLabsPage;
