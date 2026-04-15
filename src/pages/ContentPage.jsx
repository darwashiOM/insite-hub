import { HexMarkLarge } from '../components/HexMark';

const ContentPage = ({ setPage }) => (
  <>
    {/* HERO */}
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:720}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📄 Content Development</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>Built for field readiness.<br/><span style={{color:"var(--o)"}}>Not completion rates.</span></h1>
        <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>A product launch doesn't get a second chance. InsiteHub content is developed with MLR compliance and behavioral effectiveness as design requirements — AI-powered when you're ready, human-led when you're not.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}><button className="bp" onClick={()=>setPage("contact")}>Talk to a Content Expert</button><button className="bs" onClick={()=>setPage("platform")}>See Forge (AI Content)</button></div>
      </div>
    </div></div>

    {/* SPLIT: AI-POWERED VS TRADITIONAL + 4 CAPABILITY CARDS */}
    <section className="sec sw"><div className="mw">
      <div className="sh"><div className="ey">Two Tracks. One Standard.</div><h2 className="h2">AI-powered when you're ready.<br/>Human-led when you're not.</h2><p className="lead">InsiteHub delivers across both tracks with the same compliance standards and behavioral orientation. The track you choose today doesn't determine where you go next.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:48}}>
        {[{icon:"🤖",t:"AI-Powered Content (Forge)",d:"Forge agents generate MLR-compliant modules from PI, CSRs, and brand assets. Every claim cited. MLR review artifacts auto-generated. Development drops from months to hours — without sacrificing compliance integrity."},{icon:"✍️",t:"Traditional Instructional Design",d:"Full-service content by practitioners with deep biopharma commercial backgrounds. Therapy area expertise. Compliance-first. Field-validated. For organizations that need human judgment at every step."},{icon:"⚖️",t:"MLR-Integrated Design",d:"Compliance as a design input, not a last gate. Fewer revision cycles. Faster time-to-field. Content built to survive the governance process without sacrificing behavioral effectiveness. The buyers who've watched content stall in MLR review know exactly what this difference costs."},{icon:"🔄",t:"AI-Assisted Human Review",d:"Forge drafts the structure, citations, and compliance scaffolding. InsiteHub practitioners review, refine, and validate. The speed and consistency of AI with the quality assurance of experienced human judgment."}].map(c=>(
          <div key={c.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:28}}>
            <div style={{fontSize:26,marginBottom:14}}>{c.icon}</div>
            <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em"}}>{c.t}</div>
            <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.67}}>{c.d}</div>
          </div>
        ))}
      </div>

      {/* THERAPY AREA COVERAGE */}
      <div style={{background:"var(--wh)",borderRadius:18,padding:32,border:"1.5px solid var(--br)"}}>
        <div className="ey">Therapy Area Coverage</div>
        <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"var(--dk)",marginBottom:14,letterSpacing:"-.03em"}}>Built for the complexity of biopharma commercial launches.</h3>
        <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7,maxWidth:680,marginBottom:22}}>InsiteHub content practitioners bring deep therapy area expertise across biopharma's major commercial categories. Content is not generic — it is developed with scientific rigor, regulatory sensitivity, and the field deployment realities that distinguish pharma from enterprise L&D.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {["Oncology","Immunology","Rare Disease","Cardiovascular","Metabolic","Neuroscience","Respiratory","Infectious Disease","Ophthalmology","Hematology"].map(t=>(
            <div key={t} style={{fontSize:12,fontWeight:600,padding:"7px 16px",borderRadius:20,background:"var(--lt)",border:"1.5px solid var(--br)",color:"var(--bd)"}}>{t}</div>
          ))}
        </div>
      </div>

      {/* CTA BUTTONS */}
      <div className="sec-cta">
        <button className="bp" onClick={()=>setPage("contact")}>Talk to a Content Expert</button>
        <button className="bs" onClick={()=>setPage("platform")}>See Forge in the AI Platform</button>
      </div>
    </div></section>

    {/* CTA */}
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Content that reaches the field <em>on time.</em></h2>
      <p className="cf-p">Tell us about your next launch or your current content bottleneck. We'll show you how InsiteHub handles it.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Talk to a Content Expert</button><button className="bt-wt" onClick={()=>setPage("platform")}>See Forge →</button></div>
    </div></section>
  </>
);

export default ContentPage;
