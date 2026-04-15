import { HexMarkLarge } from '../components/HexMark';

const ResourcesPage = ({ setPage }) => (
  <>
    {/* HERO */}
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={440} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:720}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📚 Resources</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>Tools and frameworks you can<br/><span style={{color:"var(--o)"}}>use before you commit to anything.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>25 years of biopharma commercial L&D experience distilled into practical tools. No form required for the frameworks — just thinking you can take into your next leadership conversation.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      {/* FRAMEWORKS & GUIDES - 6 cards */}
      <div className="sh">
        <div className="ey">Frameworks & Guides</div>
        <h2 className="h2">Start here if you're still figuring out<br/>where AI fits in your organization.</h2>
      </div>
      <div className="grid-3" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:60}}>
        {[
          {icon:"📋",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)",tag:"Framework",t:"AI Readiness Self-Assessment",d:"A 15-question framework for evaluating your organization's readiness to deploy AI in commercial learning. Covers data foundations, governance structure, stakeholder alignment, technology infrastructure, and measurement capability.",cta:"Get the Framework"},
          {icon:"🗺️",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.2)",tag:"Guide",t:"The AI Pilot Failure Taxonomy",d:"A breakdown of the four failure patterns that account for 80–95% of pharma AI pilot failures — and what each one looks like from the inside before it becomes a postmortem. Built from first-hand failure observation across 30+ biopharma organizations.",cta:"Get the Guide"},
          {icon:"📊",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.2)",tag:"Template",t:"Commercial L&D AI Business Case Template",d:"The ROI model structure InsiteHub uses with clients to translate pilot evidence into language the CCO, CFO, and CHRO can act on. Includes the metric hierarchy connecting L&D outputs to commercial performance.",cta:"Get the Template"},
          {icon:"🔬",c:"#059669",bg:"rgba(5,150,105,.07)",bc:"rgba(5,150,105,.2)",tag:"Model",t:"Proxa Labs Experimentation Design Canvas",d:"The structured canvas used in every Proxa Labs engagement to define a use case hypothesis, set success criteria, scope the experiment, and identify governance checkpoints — before a single line of code is written or a vendor is engaged.",cta:"Get the Canvas"},
          {icon:"⚖️",c:"#D97706",bg:"rgba(245,158,11,.07)",bc:"rgba(245,158,11,.2)",tag:"Checklist",t:"AI Vendor Evaluation Scorecard",d:"A 24-point evaluation matrix for assessing AI platform vendors in a biopharma commercial context. Covers compliance architecture, integration complexity, total cost of ownership, and implementation risk — built for the buyer who has been burned by demos.",cta:"Get the Scorecard"},
          {icon:"🧠",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)",tag:"Guide",t:"AI Literacy Program Overview",d:"A summary of InsiteHub's AI Literacy Program — what it covers, how it's delivered, which roles it targets, and how it fits into a broader AI deployment sequence. Includes the partnership with UMU.com for enterprise delivery.",cta:"Get the Overview"},
        ].map(r=>(
          <div key={r.t} style={{background:"var(--wh)",border:("1.5px solid "+r.bc),borderRadius:16,padding:28,display:"flex",flexDirection:"column",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow=("0 10px 32px "+r.c+"18")} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{width:44,height:44,borderRadius:12,background:r.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>{r.icon}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:10,fontWeight:700,color:r.c,background:r.bg,borderRadius:20,padding:"2px 9px",letterSpacing:".05em"}}>{r.tag}</span>
            </div>
            <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,lineHeight:1.3,flex:1}}>{r.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62,marginBottom:20}}>{r.d}</div>
            <button onClick={()=>setPage("contact")} style={{padding:"10px 18px",borderRadius:9,background:r.bg,border:("1.5px solid "+r.bc),color:r.c,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .15s",textAlign:"left"}}>{r.cta} →</button>
          </div>
        ))}
      </div>

      {/* ACTIVE RESEARCH - 3 cards (separated by top border) */}
      <div style={{borderTop:"1.5px solid var(--br)",paddingTop:56}}>
        <div className="sh">
          <div className="ey">From Proxa Labs</div>
          <h2 className="h2">Active research and early findings.</h2>
          <p className="lead">Open research from InsiteHub's AI lab — work in progress that will shape how we advise clients and build products.</p>
        </div>
        <div className="grid-3" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[
            {icon:"🎭",tag:"Actively recruiting",tagC:"#7C3AED",t:"Open-Source HCP Avatar Engine",d:"Crowdsourcing a real-time, open-source conversational avatar system via hackathon. $10K prize pool. Reduces vendor lock-in for AI roleplay deployments across the industry."},
            {icon:"📈",tag:"Early results",tagC:"#059669",t:"Behavioral Analytics Correlation Study",d:"Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with InsiteHub Echo cohort data."},
            {icon:"🔬",tag:"In development",tagC:"#F4801F",t:"AI Readiness Predictive Model",d:"Building a predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements."},
          ].map(r=>(
            <div key={r.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div style={{fontSize:24}}>{r.icon}</div>
                <span style={{fontSize:10,fontWeight:700,color:r.tagC,background:"var(--wh)",borderRadius:20,padding:"3px 10px",letterSpacing:".04em"}}>{r.tag}</span>
              </div>
              <div style={{fontSize:16,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,lineHeight:1.3}}>{r.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA PAIR */}
      <div className="sec-cta">
        <button className="bp" onClick={()=>setPage("newsletter")}>Subscribe for New Resources</button>
        <button className="bs" onClick={()=>setPage("proxalab")}>Explore Proxa Labs Research</button>
      </div>
    </div></section>
  </>
);

export default ResourcesPage;
