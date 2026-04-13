import { HexMarkLarge } from '../components/HexMark';

const LiteracyPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:800}}>
          <div className="pbadge" style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",color:"#D97706"}}>🎓 AI Literacy</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Your team can't use AI tools<br/>they don't <span style={{color:"#D97706"}}>understand or trust.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Before your commercial organization can deploy AI effectively, it needs a foundation — the concepts, the vocabulary, the judgment to know when AI is helping and when it isn't. InsiteHub's AI Literacy program builds that foundation across every role in your commercial structure.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" style={{background:"#D97706"}} onClick={()=>setPage("contact")}>Get the Program Overview</button>
            <button className="bs" onClick={()=>setPage("advisory")}>Start with Advisory First</button>
          </div>
        </div>
      </div>
    </div>

    {/* THE PROBLEM */}
    <section className="sec sl"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
        <div>
          <div className="ey">Why AI Literacy First</div>
          <h2 className="h2">Most AI implementations fail before the technology is ever deployed.</h2>
          <p className="lead" style={{marginBottom:20}}>The failure point isn't the platform. It's the team. Commercial organizations that try to deploy AI tools into a workforce that doesn't understand what AI actually does — and doesn't do — face resistance, misuse, and eventually abandonment.</p>
          <p className="lead" style={{marginBottom:32}}>AI literacy isn't a nice-to-have prerequisite. It's the single most important investment you can make before any AI platform goes live. It's also the fastest way to build the internal credibility that lets AI adoption succeed at scale.</p>
          <button className="bp" style={{background:"#D97706"}} onClick={()=>setPage("contact")}>Talk to Us About Literacy</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[
            {icon:"😰",t:"Teams that don't understand AI resist it",d:"Resistance to AI tools is almost always rooted in confusion, not opposition. People don't resist what they understand. They resist what feels opaque, unpredictable, or threatening to their role."},
            {icon:"⚠️",t:"Teams that misuse AI create compliance risk",d:"In a regulated commercial environment, an AI-literate team is a compliance control. An AI-illiterate team is a liability. The difference shows up in MLR review, field conversations, and audit trails."},
            {icon:"📉",t:"Low adoption kills ROI on every platform investment",d:"The fastest way to undermine a $500K AI platform investment is to deploy it into a team that doesn't know why it exists. Adoption without literacy is a slow-motion project failure."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:14,padding:22,display:"flex",gap:16}}>
              <div style={{fontSize:24,flexShrink:0}}>{c.icon}</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6}}>{c.t}</div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></section>

    {/* WHAT THE PROGRAM COVERS */}
    <section className="sec sw"><div className="mw">
      <div className="sh">
        <div className="ey">Program Overview</div>
        <h2 className="h2">Built for biopharma commercial teams.<br/>Not a generic AI course.</h2>
        <p className="lead">Every module is grounded in the commercial contexts your team actually works in — MLR review, HCP conversations, content creation, field execution, and compliance. This isn't a technology overview. It's a capability program.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:48}}>
        {[
          {icon:"🧠",t:"What AI Actually Does",d:"The foundational concepts — how large language models work, what they're good at, where they fail, and why the outputs require human judgment. Built for commercial professionals, not engineers.",audience:"All roles"},
          {icon:"⚖️",t:"AI in a Regulated Environment",d:"How AI interacts with MLR review, GxP validation, and compliance requirements. What the regulatory risk profile looks like. How to use AI tools without creating audit exposure.",audience:"Medical · Regulatory · Commercial"},
          {icon:"✍️",t:"AI for Content Creation",d:"How to work effectively with AI content generation tools — prompt design, output review, citation verification, and the human judgment layer that MLR requires regardless of how content is generated.",audience:"L&D · Medical Affairs · Marketing"},
          {icon:"🎭",t:"AI in Field Conversations",d:"What reps need to understand about AI-generated talking points, AI-coached preparation, and how HCP personas behave differently than human practice partners. How to trust — and verify — AI preparation tools.",audience:"Commercial · Sales"},
          {icon:"📊",t:"AI and Commercial Performance Data",d:"How AI-generated competency scores, behavioral assessments, and readiness predictions should be interpreted by managers. The difference between AI-assisted coaching and AI-replacing judgment.",audience:"Managers · L&D Leaders"},
          {icon:"🗺️",t:"Building an AI-Ready Mindset",d:"The organizational culture dimension — how to approach AI as an experiment-first capability, how to evaluate vendor claims, and how to develop the institutional vocabulary that lets AI governance work.",audience:"Leadership · CLO · VP L&D"},
        ].map(m=>(
          <div key={m.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#D97706";e.currentTarget.style.background="rgba(245,158,11,.04)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--lt)";}}>
            <div style={{fontSize:26,marginBottom:12}}>{m.icon}</div>
            <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,lineHeight:1.3}}>{m.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62,marginBottom:12}}>{m.d}</div>
            <div style={{fontSize:11,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.1)",borderRadius:20,padding:"3px 10px",display:"inline-block"}}>{m.audience}</div>
          </div>
        ))}
      </div>

      {/* DELIVERY */}
      <div style={{background:"linear-gradient(135deg,#FFFBF0,#FFF5E0)",border:"1px solid rgba(245,158,11,.2)",borderRadius:20,padding:48}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"#D97706",fontWeight:700,marginBottom:12}}>How It's Delivered</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:"var(--dk)",marginBottom:14,letterSpacing:"-.03em",lineHeight:1.2}}>Modular. Role-specific.<br/>Designed to fit your launch calendar.</h3>
            <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7,marginBottom:20}}>The program is structured as a series of modular learning experiences — each role receives a targeted track, not a generic all-hands overview. Delivery can be integrated into InsiteX LMS, Atlas, or any existing LMS infrastructure.</p>
            <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7}}>For organizations preparing to deploy an AI platform, the literacy program runs 4–8 weeks ahead of platform launch. For organizations still evaluating AI, it runs as a standalone capability investment that returns value regardless of which platform you ultimately choose.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {icon:"🎯",t:"Role-Targeted Tracks",d:"Separate pathways for reps, managers, medical affairs, regulatory, and L&D leadership. Each track covers only what's relevant to that role."},
              {icon:"🔗",t:"Platform-Agnostic",d:"The program works independently of any InsiteHub platform. It doesn't require an AI deployment to be underway — it builds the foundation for one."},
              {icon:"📏",t:"Measurable Readiness Outcomes",d:"Pre and post assessments track AI literacy gains by role. Outputs tie directly to your AI readiness score and inform deployment sequencing."},
              {icon:"⚡",t:"4–8 Week Deployment",d:"Structured to integrate into existing commercial learning calendars. Minimal disruption to field teams. Maximum impact before AI tools go live."},
            ].map(d=>(
              <div key={d.t} style={{background:"rgba(255,255,255,.7)",borderRadius:12,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{fontSize:18,flexShrink:0}}>{d.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:3}}>{d.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{d.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec-cta">
        <button className="bp" style={{background:"#D97706"}} onClick={()=>setPage("contact")}>Get the Program Overview</button>
        <button className="bs" onClick={()=>setPage("advisory")}>Bundle with Advisory</button>
        <button className="bt" onClick={()=>setPage("platform")}>See the AI Platform →</button>
      </div>
    </div></section>

    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">AI tools don't fail.<br/><em>Unprepared teams do.</em></h2>
      <p className="cf-p">Build the foundation before you deploy the platform. InsiteHub's AI Literacy program makes every subsequent AI investment more likely to stick.</p>
      <div className="cf-btns">
        <button className="bp" onClick={()=>setPage("contact")}>Get the Program Overview</button>
        <button className="bt-wt" onClick={()=>setPage("proxalab")}>Start with an AI Experiment →</button>
      </div>
    </div></section>
  </>
);

export default LiteracyPage;
