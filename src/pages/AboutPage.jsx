import { HexMarkLarge } from '../components/HexMark';

const AboutPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:780}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🏢 About InsiteHub</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>We've been solving problems<br/>biopharma didn't have<br/><span style={{color:"var(--o)"}}>solutions for yet.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>InsiteHub was built on a simple conviction: the best solutions in commercial learning don't come from vendors adapting generic products for pharma. They come from practitioners who've worked inside the environment and built something new because nothing adequate existed.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:64,marginBottom:80}}>
        <div>
          <div className="ey">Our Story</div>
          <h2 className="h2">Innovation that comes from the inside.</h2>
          {[
            "InsiteHub was founded on a track record of building things that didn't exist yet — not because they were technically interesting, but because the existing approaches were failing commercial organizations in ways that mattered. Content that missed launch windows. Training programs that produced completion metrics but not behavior change. Certification processes that gave organizations false confidence about field readiness.",
            "The methodology that defines every InsiteHub engagement today was forged in those failures — watching what happens when AI gets deployed into environments that weren't designed for it, when compliance review surfaces problems after the contract is signed, when a pilot succeeds in a controlled environment and dies at the governance gate.",
            "The result is an organization that leads with diagnosis rather than demonstration, experiments before it commits, and measures success against field performance — not engagement metrics.",
          ].map((p,i)=>(
            <p key={i} style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:18}}>{p}</p>
          ))}
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:28}}>
            <button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button>
            <button className="bs" onClick={()=>setPage("advisory")}>Explore Advisory</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[
            {label:"Vanguard Award · Best Corporate Learning Program in the World",t:"Built something no one had built before — and it worked.",d:"When the standard approach to a major drug launch was a $5M vendor platform, InsiteHub's team built an immersive virtual world for 400 sales reps instead — at a fraction of the cost, with engagement the industry had never seen. That wasn't a technology decision. It was a problem-solving decision."},
            {label:"InsiteXcelerator · NIH Partnership",t:"2nd NIH-partnered biomedical accelerator outside a university in the US.",d:"Securing an NIH grant to accelerate biomedical commercialization through education isn't something a content vendor does. It reflects an institutional commitment to the intersection of innovation, science, and capability development that goes well beyond platform features."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--lt)",borderRadius:16,padding:28,borderLeft:"3px solid var(--o)"}}>
              <div style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:10}}>{c.label}</div>
              <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",lineHeight:1.28}}>{c.t}</div>
              <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INNOVATION PROOF POINTS */}
      <div style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E6)",borderRadius:22,padding:48,marginBottom:80,border:"1px solid rgba(244,128,31,.15)"}}>
        <div style={{marginBottom:36}}>
          <div className="ey">A Pattern of Innovation</div>
          <h2 className="h2" style={{marginBottom:12}}>We don't describe our approach as innovative.<br/>We point to what it produced.</h2>
          <p className="lead">InsiteHub's innovation track record spans virtual world deployments, gamified learning at scale, NIH-funded biomedical acceleration, and now the first closed-loop AI platform in biopharma commercial learning. In each case, the starting point was the same: the existing solution wasn't good enough.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16}}>
          {[
            {icon:"🌐",num:"1st",label:"Virtual world for a drug launch",sub:"Built when competitors were quoting $5M platforms. Won the world's top corporate learning award.",c:"#F4801F"},
            {icon:"🎮",num:"100%",label:"Gamified training participation",sub:"600 sales managers. A SimCity-style game. The first program in the organization's history with universal adoption.",c:"#7C3AED"},
            {icon:"🏛️",num:"2nd",label:"NIH biomedical accelerator outside a university",sub:"One of only two in the US. An institutional signal that no vendor relationship replicates.",c:"#007AFF"},
            {icon:"🔄",num:"Only",label:"Closed-loop AI platform in commercial L&D",sub:"The only platform that automatically connects content creation to behavioral certification — and turns failures into rebuilds.",c:"#059669"},
          ].map(s=>(
            <div key={s.label} style={{textAlign:"center",padding:"24px 16px",background:"rgba(255,255,255,.7)",borderRadius:16,border:"1px solid rgba(244,128,31,.12)"}}>
              <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:6}}>{s.num}</div>
              <div style={{fontSize:13,fontWeight:700,color:"var(--dk)",marginBottom:6,lineHeight:1.3}}>{s.label}</div>
              <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ey">Our History</div>
      <h2 className="h2" style={{marginBottom:44}}>Built from the inside of biopharma. Not looking in from outside.</h2>
      <div className="tl">
        {[
          {date:"2010",t:"InsiteHub Founded",d:"Incorporated through the University of Delaware Spin-In Program and initially formed to serve life sciences commercial organizations. From day one, the focus was on building capability — not just delivering content."},
          {date:"2010s",t:"Expanded Across Life Sciences",d:"Grew from pharma commercial teams into clinical research, health systems, and health-related non-profits. Built a track record across 30+ organizations including AbbVie, Pfizer, Novartis, Biogen, Sanofi, and major academic medical centers."},
          {date:"2014–2018",t:"NIH Grant & InsiteXcelerator",d:"Awarded NIH grant to accelerate biomedical commercialization through education. InsiteXcelerator became the 2nd NIH-partnered biomedical accelerator outside a university in the United States — an institutional credibility signal no vendor relationship replicates."},
          {date:"2018–2022",t:"Enterprise LMS Platform",d:"Developed and launched InsiteX — an enterprise learning management platform built specifically for biopharma compliance, credentialing, and workflow requirements. Proven with multiple pharma and health system clients across four-plus years."},
          {date:"2023–Present",t:"AI-First Transformation",d:"Launched the InsiteHub AI product suite: Forge for agentic content creation, Atlas for adaptive learning, Echo for AI roleplay assessment, and Certify for competency-gated credentialing. The only closed-loop platform in commercial L&D that automatically connects content creation to behavioral certification — and turns assessment failures into new content builds."},
        ].map(t=>(
          <div key={t.date} className="tl-i"><div className="tl-d"/><div className="tl-ey">{t.date}</div><div className="tl-t">{t.t}</div><div className="tl-p">{t.d}</div></div>
        ))}
      </div>
    </div></section>
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Ready to work with a team<br/><em>that's been in your seat?</em></h2>
      <p className="cf-p">Start with a conversation. No demo. No pitch deck. Just your environment and what you're trying to solve.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button><button className="bt-wt" onClick={()=>setPage("advisory")}>Explore Advisory →</button></div>
    </div></section>
  </>
);

export default AboutPage;
