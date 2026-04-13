import { HexMarkLarge } from '../components/HexMark';

const ServicesPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:780}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🧭 Services</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>We meet you<br/><span style={{color:"var(--o)"}}>where you are.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Whether you need a strategy, a structured experiment, AI literacy across your team, or content for an upcoming launch — every engagement starts with understanding your environment first.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
            <button className="bs" onClick={()=>setPage("platform")}>See the AI Platform</button>
          </div>
        </div>
      </div>
    </div>

    {/* ADVISORY */}
    <section className="sec sw">
      <div className="mw">
        <div className="sh">
          <div className="ey">Advisory</div>
          <h2 className="h2">We diagnose before we prescribe.</h2>
          <p className="lead">Most vendors lead with a demo. We lead with a diagnosis — mapping your compliance requirements, governance structure, and AI readiness before recommending anything. Every engagement is time-bounded with a concrete deliverable.</p>
        </div>
        <div className="ag">
          {[
            {n:"Entry Point",t:"AI Strategy & Roadmap Workshop",d:"Executive alignment on AI priorities, use cases, and implementation roadmap. The lowest-risk starting point."},
            {n:"Foundation",t:"AI Readiness & Maturity Assessment",d:"Custom AI maturity model, capability heatmap, technology gap analysis, and prioritized use case roadmap."},
            {n:"Selection",t:"Learning Technology & GenAI Assessment",d:"Comprehensive vendor evaluation, compliance risk assessment, and integration feasibility study."},
            {n:"Governance",t:"AI Governance & Compliance Framework",d:"End-to-end governance framework for AI-generated commercial content. Role-based guidelines and monitoring."},
            {n:"Infrastructure",t:"Learning Infrastructure Assessment",d:"Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap."},
            {n:"Organization",t:"AI-Optimized Org Design",d:"Organizational structure recommendations for AI-enabled commercial learning at scale."},
          ].map(a=>(
            <div key={a.n} className="ac">
              <div className="ac-n">{a.n}</div>
              <div className="ac-t">{a.t}</div>
              <div className="ac-d">{a.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* AI LITERACY */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">AI Literacy Program</div>
          <h2 className="h2">Your team can't use AI tools<br/>they don't understand or trust.</h2>
          <p className="lead">Before your organization deploys AI, it needs a foundation — the concepts, the vocabulary, the judgment to know when AI is helping and when it isn't. Role-targeted tracks for every part of your commercial structure.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[
            {icon:"🧠",t:"What AI Actually Does",d:"How LLMs work, where they fail, and why outputs require human judgment.",audience:"All roles"},
            {icon:"⚖️",t:"AI in a Regulated Environment",d:"How AI interacts with MLR review, GxP validation, and compliance requirements.",audience:"Medical · Regulatory"},
            {icon:"✍️",t:"AI for Content Creation",d:"Prompt design, output review, citation verification, and the human judgment layer.",audience:"L&D · Marketing"},
            {icon:"🎭",t:"AI in Field Conversations",d:"AI-generated talking points, coached preparation, and HCP persona behaviors.",audience:"Commercial · Sales"},
            {icon:"📊",t:"AI and Performance Data",d:"How to interpret AI-generated competency scores and readiness predictions.",audience:"Managers · Leaders"},
            {icon:"🗺️",t:"Building an AI-Ready Mindset",d:"Experiment-first culture, evaluating vendor claims, and institutional vocabulary.",audience:"Leadership · CLO"},
          ].map(m=>(
            <div key={m.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#D97706";e.currentTarget.style.background="rgba(245,158,11,.04)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--wh)";}}>
              <div style={{fontSize:26,marginBottom:12}}>{m.icon}</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6,lineHeight:1.3}}>{m.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55,marginBottom:10}}>{m.d}</div>
              <div style={{fontSize:11,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.1)",borderRadius:20,padding:"3px 10px",display:"inline-block"}}>{m.audience}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CONTENT DEVELOPMENT */}
    <section className="sec sw">
      <div className="mw">
        <div className="sh">
          <div className="ey">Content Development</div>
          <h2 className="h2">Built for field readiness.<br/>Not completion rates.</h2>
          <p className="lead">MLR-compliant content developed with behavioral effectiveness as a design requirement — AI-powered when you're ready, human-led when you're not.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[
            {icon:"🤖",t:"AI-Powered Content (Forge)",d:"Forge agents generate MLR-compliant modules from PI, CSRs, and brand assets. Every claim cited. Development drops from months to hours."},
            {icon:"✍️",t:"Traditional Instructional Design",d:"Full-service content by practitioners with deep biopharma commercial backgrounds. Human-led, compliance-first, field-validated."},
            {icon:"⚖️",t:"MLR-Integrated Design",d:"Compliance as a design input, not a last gate. Fewer revision cycles. Faster time-to-field."},
            {icon:"🔄",t:"AI-Assisted Human Review",d:"Forge drafts the structure, citations, and compliance scaffolding. InsiteHub practitioners review and validate."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:28}}>
              <div style={{fontSize:26,marginBottom:14}}>{c.icon}</div>
              <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em"}}>{c.t}</div>
              <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.67}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PROXA LABS */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">Proxa Labs</div>
          <h2 className="h2">Your AI mandate deserves<br/>a properly designed experiment.</h2>
          <p className="lead">Proxa Labs helps you define the right AI use case, design a structured experiment, measure success against criteria that matter — and build the business case that turns results into action.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
          {[
            {n:"Phase 1",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.18)",icon:"🎯",title:"Define the Right Use Case",d:"Map your landscape, identify where AI creates value, and produce a prioritized use case hypothesis."},
            {n:"Phase 2",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)",icon:"🔬",title:"Design the Experiment",d:"Structure a pilot against your real constraints — compliance, IT, governance — not a controlled demo."},
            {n:"Phase 3",c:"#059669",bg:"rgba(5,150,105,.07)",bc:"rgba(5,150,105,.18)",icon:"📈",title:"Measure Success",d:"Define metrics before the experiment runs. Commercial performance, not engagement theater."},
            {n:"Phase 4",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.18)",icon:"📋",title:"Build the Business Case",d:"Translate results into a leadership-ready ROI model and implementation roadmap."},
          ].map(ph=>(
            <div key={ph.n} style={{background:ph.bg,border:("1.5px solid "+ph.bc),borderRadius:18,padding:24}}>
              <div style={{fontSize:22,marginBottom:10}}>{ph.icon}</div>
              <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:ph.c,fontWeight:700,marginBottom:6}}>{ph.n}</div>
              <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,letterSpacing:"-.02em",lineHeight:1.25}}>{ph.title}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>{ph.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* INSITEX LMS */}
    <section className="sec sw">
      <div className="mw">
        <div style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E4)",borderRadius:20,padding:"40px 48px",border:"1px solid rgba(244,128,31,.18)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <div className="ey">InsiteX LMS</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:900,color:"var(--dk)",marginBottom:14,letterSpacing:"-.035em",lineHeight:1.16}}>Enterprise learning infrastructure.<br/>Built for biopharma.</h3>
            <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7,marginBottom:20}}>A cloud-based learning platform with the compliance architecture, credentialing workflows, and content controls that life sciences requires. It's the foundation the AI platform builds on — and the upgrade path is seamless.</p>
            <button className="bp" onClick={()=>setPage("contact")}>Request a Demo</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[{n:"4+",l:"Years serving biopharma"},{n:"30+",l:"Pharma & health system clients"},{n:"SCORM / AICC",l:"& PMRC compliant"},{n:"SOC 2",l:"Type II in progress"}].map(s=>(
              <div key={s.n} style={{display:"flex",alignItems:"center",gap:16,padding:"12px 18px",background:"rgba(255,255,255,.7)",borderRadius:12,border:"1px solid rgba(244,128,31,.12)"}}>
                <div style={{fontSize:20,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",minWidth:70}}>{s.n}</div>
                <div style={{fontSize:13,color:"var(--bd)"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">Not sure where to start?<br/><em>That's the right conversation to have.</em></h2>
        <p className="cf-p">30 minutes. No demo, no pitch. Just your environment and what's been blocking you.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("platform")}>See the Platform →</button>
        </div>
      </div>
    </section>
  </>
);

export default ServicesPage;
