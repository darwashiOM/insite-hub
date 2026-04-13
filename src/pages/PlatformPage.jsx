import { HexMarkLarge } from '../components/HexMark';

const PlatformPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:780}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🤖 AI-First Platform</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Intelligent Capability<br/><span style={{color:"var(--o)"}}>Development.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>The only closed-loop platform that automatically turns assessment failures into new content builds. Four products. One shared data layer. No human handoff, no vendor dependency, no integration tax.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Book a Demo</button>
            <button className="bs" onClick={()=>setPage("services")}>Start with Advisory First</button>
          </div>
        </div>
      </div>
    </div>
    <section className="sec sw">
      <div className="mw">
        {/* Loop diagram dark card */}
        <div style={{background:"var(--dk)",borderRadius:22,padding:"48px 56px",marginBottom:56,position:"relative",overflow:"hidden"}}>
          <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{textAlign:"center",marginBottom:32}}>
              <div className="ey-wt" style={{textAlign:"center"}}>The Closed Loop</div>
              <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:"var(--wh)",letterSpacing:"-.035em",marginBottom:10}}>Build → Develop → Assess → Certify → Repeat</h3>
              <p style={{fontSize:14,color:"rgba(255,255,255,.38)",maxWidth:560,margin:"0 auto"}}>A continuous cycle. Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps detected restart the loop automatically.</p>
            </div>
            <svg width="100%" viewBox="0 0 700 300" style={{maxWidth:680,display:"block",margin:"0 auto"}}>
              <defs>
                {[["af","#F4801F"],["aa","#007AFF"],["ae","#7C3AED"],["ac","#059669"]].map(([id,c])=>(
                  <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M1 1L9 5L1 9" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                ))}
              </defs>
              {[{d:"M240 62 Q350 18 460 62",c:"#F4801F",m:"af",lx:350,ly:22,t:"content published"},{d:"M548 100 Q594 150 548 200",c:"#007AFF",m:"aa",lx:638,ly:154,t:"readiness reached"},{d:"M460 238 Q350 282 240 238",c:"#7C3AED",m:"ae",lx:350,ly:294,t:"competency demonstrated"},{d:"M152 200 Q106 150 152 100",c:"#059669",m:"ac",lx:56,ly:150,t:"gap → rebuild"}].map((a,i)=>(
                <g key={i}>
                  <path d={a.d} fill="none" stroke={a.c} strokeWidth="1.5" strokeOpacity=".5" markerEnd={"url(#"+a.m+")"}/>
                  <text x={a.lx} y={a.ly} textAnchor="middle" style={{fontSize:10,fill:a.c,opacity:.65,fontFamily:"DM Sans,sans-serif"}}>{a.t}</text>
                </g>
              ))}
              {[{x:100,y:30,c:"#F4801F",bg:"rgba(244,128,31,.1)",n:"Forge",s:"Builds content",ss:"Courses · Inserts · SOPs"},{x:448,y:30,c:"#007AFF",bg:"rgba(0,122,255,.1)",n:"Atlas",s:"Delivers learning",ss:"Adaptive · Gap-aware"},{x:448,y:200,c:"#7C3AED",bg:"rgba(124,58,237,.1)",n:"Echo",s:"Assesses in roleplay",ss:"HCP avatars · Scoring"},{x:100,y:200,c:"#059669",bg:"rgba(5,150,105,.1)",n:"Certify",s:"Confirms readiness",ss:"Behavioral proof"}].map(nd=>(
                <g key={nd.n}>
                  <rect x={nd.x} y={nd.y} width={148} height={68} rx="11" fill={nd.bg} stroke={nd.c} strokeWidth="1" strokeOpacity=".45"/>
                  <text x={nd.x+74} y={nd.y+24} textAnchor="middle" style={{fontSize:13,fontWeight:800,fill:nd.c,fontFamily:"Manrope,sans-serif"}}>{nd.n}</text>
                  <text x={nd.x+74} y={nd.y+41} textAnchor="middle" style={{fontSize:11,fill:"rgba(255,255,255,.48)",fontFamily:"DM Sans,sans-serif"}}>{nd.s}</text>
                  <text x={nd.x+74} y={nd.y+56} textAnchor="middle" style={{fontSize:9.5,fill:"rgba(255,255,255,.26)",fontFamily:"DM Sans,sans-serif"}}>{nd.ss}</text>
                </g>
              ))}
              {["INTELLIGENT","CAPABILITY","DEVELOPMENT"].map((w,i)=>(
                <text key={w} x="350" y={138+i*15} textAnchor="middle" style={{fontSize:9,fill:"rgba(255,255,255,.15)",letterSpacing:".1em",fontFamily:"Manrope,sans-serif"}}>{w}</text>
              ))}
            </svg>
          </div>
        </div>
        {/* Product detail cards */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {[
            {c:"#F4801F",bg:"rgba(244,128,31,.07)",icon:"⚡",name:"InsiteHub Forge",tag:"Agentic content creation",desc:"AI agents build MLR-compliant training content from your PI, CSRs, and brand assets — every claim cited, every artifact approval-ready.",bullets:["Auto-generation from clinical data and product labeling","Citation tracking: every claim traced to source","Content Gap Analyzer feeds directly from Echo failures"]},
            {c:"#007AFF",bg:"rgba(0,122,255,.07)",icon:"🎓",name:"InsiteHub Atlas",tag:"AI-powered adaptive learning",desc:"Personalized learning pathways mapped to competencies and role requirements, with real-time gap detection that adjusts before reps reach the field.",bullets:["Competency-role mapping with behavioral rubrics","Adaptive pathways that respond dynamically to gaps","Manager dashboards with predictive readiness scoring"]},
            {c:"#7C3AED",bg:"rgba(124,58,237,.07)",icon:"🎭",name:"InsiteHub Echo",tag:"AI roleplay & behavioral assessment",desc:"Live HCP roleplay with AI physician avatars and real-time compliance monitoring — flagging off-label language and unsupported claims before they become issues.",bullets:["8 HCP digital twin avatars with behavioral models","ComplianceGuard: real-time compliance flagging","Gap payload triggers Forge auto-rebuild pipeline"]},
            {c:"#059669",bg:"rgba(5,150,105,.07)",icon:"✅",name:"Certify",tag:"Demonstrated field readiness",desc:"Certification earned through demonstrated behavioral competency — not attendance. Audit-ready records tied to specific evidence, retained for 10 years.",bullets:["Competency-gated — no attendance shortcuts","Behavioral evidence for every issued certification","SOC 2 Type II compliant, SHA-256 audit logs"]},
          ].map(p=>(
            <div key={p.name} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:18,padding:34,borderLeft:("4px solid "+p.c)}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:22}}>
                <div style={{width:56,height:56,borderRadius:15,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:10}}>
                    <div style={{fontSize:22,fontWeight:900,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em"}}>{p.name}</div>
                    <div style={{fontSize:12,color:"var(--st)"}}>{p.tag}</div>
                  </div>
                  <p style={{fontSize:14.5,color:"var(--bd)",lineHeight:1.7,marginBottom:22}}>{p.desc}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                    {p.bullets.map(b=><div key={b} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13,color:"var(--bd)"}}><div style={{width:5,height:5,borderRadius:"50%",background:p.c,flexShrink:0,marginTop:7}}/>{b}</div>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT UI PREVIEWS */}
        <div style={{marginTop:64}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="ey" style={{textAlign:"center"}}>Platform Previews</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:26,fontWeight:800,color:"var(--dk)",letterSpacing:"-.035em"}}>What it looks like inside.</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[
              {c:"#F4801F",name:"InsiteHub Forge",sub:"Content creation agent session",rows:[
                {label:"Launch Content Agent",pct:88,c:"#F4801F",bg:"rgba(244,128,31,.12)"},
                {label:"MLR citation check",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Veeva routing queued",pct:62,c:"#007AFF",bg:"rgba(0,122,255,.12)"},
              ],status:"3 artifacts ready for MLR review"},
              {c:"#007AFF",name:"InsiteHub Atlas",sub:"Rep pathway dashboard",rows:[
                {label:"Sarah Chen · Oncology pathway",pct:74,c:"#007AFF",bg:"rgba(0,122,255,.12)"},
                {label:"Knowledge gap detected · MOA",pct:41,c:"#F59E0B",bg:"rgba(245,158,11,.12)"},
                {label:"Echo readiness threshold",pct:90,c:"#059669",bg:"rgba(5,150,105,.12)"},
              ],status:"Echo assessment unlocked"},
              {c:"#7C3AED",name:"InsiteHub Echo",sub:"HCP roleplay session · Dr. Kim",rows:[
                {label:"Clinical accuracy score",pct:82,c:"#7C3AED",bg:"rgba(124,58,237,.12)"},
                {label:"Compliance guard · clean",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Objection handling",pct:67,c:"#F59E0B",bg:"rgba(245,158,11,.12)"},
              ],status:"Scorecard generating…"},
              {c:"#059669",name:"Certify",sub:"Certification audit record",rows:[
                {label:"Competency threshold met",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Behavioral evidence logged",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"SHA-256 audit trail",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
              ],status:"Certification issued · 10yr record"},
            ].map(p=>(
              <div key={p.name} className="prod-preview">
                <div className="pp-topbar">
                  {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} className="pp-dot" style={{background:c}}/>)}
                  <div style={{marginLeft:8,fontSize:11,color:"rgba(255,255,255,.25)",fontFamily:"DM Sans,sans-serif"}}>{p.name} · {p.sub}</div>
                </div>
                <div className="pp-content">
                  <div style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:p.c,fontWeight:700,marginBottom:12,opacity:.8}}>{p.sub}</div>
                  {p.rows.map(r=>(
                    <div key={r.label} className="pp-row" style={{background:r.bg}}>
                      <div className="pp-label" style={{color:"rgba(255,255,255,.7)",minWidth:180,fontSize:11}}>{r.label}</div>
                      <div style={{flex:1,height:4,background:"rgba(255,255,255,.08)",borderRadius:2}}>
                        <div className="pp-bar" style={{width:(r.pct+"%"),background:r.c,opacity:.8}}/>
                      </div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",minWidth:32,textAlign:"right"}}>{r.pct}%</div>
                    </div>
                  ))}
                  <div style={{marginTop:14,padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:8,border:"1px solid rgba(255,255,255,.06)",fontSize:11,color:p.c,fontWeight:600}}>⬤ {p.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Platform Demo</button>
          <button className="bs" onClick={()=>setPage("services")}>Start with Advisory First</button>
        </div>

        {/* InsiteX Callout Card */}
        <div style={{marginTop:48,background:"linear-gradient(135deg,rgba(244,128,31,.08),rgba(245,158,11,.10))",border:"1.5px solid rgba(244,128,31,.18)",borderRadius:20,padding:"44px 48px",textAlign:"center"}}>
          <div style={{fontSize:13,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"var(--o)",marginBottom:10}}>Traditional LMS</div>
          <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:"var(--dk)",letterSpacing:"-.035em",marginBottom:12}}>Not ready for AI? Start with InsiteX LMS.</h3>
          <p style={{fontSize:15,color:"var(--bd)",maxWidth:560,margin:"0 auto 24px",lineHeight:1.7}}>InsiteX is our full-featured learning management system — SCORM-compliant, Veeva-integrated, and built for life sciences teams that need a reliable platform today with a clear upgrade path to AI when the time is right.</p>
          <button className="bs" onClick={()=>setPage("services")} style={{margin:"0 auto"}}>Learn About InsiteX →</button>
        </div>
      </div>
    </section>

    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">See the closed loop <em>in action.</em></h2>
        <p className="cf-p">We'll walk you through Forge, Atlas, and Echo in the context of your commercial organization — not a generic product tour.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Demo</button>
          <button className="bt-wt" onClick={()=>setPage("services")}>Start with Advisory →</button>
        </div>
      </div>
    </section>
  </>
);

export default PlatformPage;
