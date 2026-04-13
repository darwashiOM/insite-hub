import { useState, useEffect } from 'react';

const LoopVisual = () => {
  const [active, setActive] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setActive(a=>(a+1)%4),3500); return()=>clearInterval(t); },[]);
  const nodes=[
    {id:0,label:"Forge",  sub:"Builds content",    icon:"⚡",c:"#F4801F",bg:"rgba(244,128,31,.06)", cx:220,cy:52},
    {id:1,label:"Atlas",  sub:"Delivers learning", icon:"🎓",c:"#007AFF",bg:"rgba(0,122,255,.06)",  cx:370,cy:180},
    {id:2,label:"Echo",   sub:"Assesses readiness",icon:"🎭",c:"#7C3AED",bg:"rgba(124,58,237,.06)",cx:220,cy:290},
    {id:3,label:"Certify",sub:"Confirms competency",icon:"✅",c:"#059669",bg:"rgba(5,150,105,.06)", cx:75, cy:180},
  ];
  const flows=[
    {f:0,t:1,label:"content published",c:"#F4801F"},
    {f:1,t:2,label:"readiness reached",c:"#007AFF"},
    {f:2,t:3,label:"gap detected",c:"#7C3AED"},
    {f:3,t:0,label:"rebuild queued",c:"#059669"},
  ];
  const an=nodes[active];
  const curvedPath=(from,to,offset=30)=>{
    const mx=(from.cx+to.cx)/2, my=(from.cy+to.cy)/2;
    const dx=to.cx-from.cx, dy=to.cy-from.cy;
    const len=Math.sqrt(dx*dx+dy*dy)||1;
    return {d:"M"+from.cx+" "+from.cy+" Q"+(mx-(dy/len)*offset)+" "+(my+(dx/len)*offset)+" "+to.cx+" "+to.cy, lx:mx-(dy/len)*(offset+14), ly:my+(dx/len)*(offset+14)};
  };
  const css = `
    @keyframes loopDash { to { stroke-dashoffset: -20; } }
    .loop-active-flow { animation: loopDash 0.8s linear infinite; }
  `;
  return (
    <div className="loop-card">
      <style>{css}</style>
      <div className="lc-label">The Closed Loop · Intelligent Capability Development</div>
      <svg viewBox="0 0 440 380" style={{width:"100%",maxWidth:440,display:"block",margin:"0 auto"}}>
        <defs>
          {flows.map((f,i)=>(
            <marker key={i} id={"lm"+i} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 1L9 5L1 9" fill="none" stroke={f.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          ))}
          {nodes.map(n=>(
            <filter key={n.id} id={"lglow"+n.id} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feFlood floodColor={n.c} floodOpacity="0.2" result="color"/>
              <feComposite in="color" in2="blur" operator="in" result="glow"/>
              <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
        </defs>
        {/* Connection paths + flow labels */}
        {flows.map((fl,i)=>{
          const from=nodes[fl.f], to=nodes[fl.t];
          const isAct=active===fl.f;
          const {d,lx,ly}=curvedPath(from,to,42);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={fl.c} strokeWidth={1} strokeOpacity={.07} markerEnd={"url(#lm"+i+")"}/>
              {isAct && <path d={d} fill="none" stroke={fl.c} strokeWidth={2.5} strokeOpacity={.55} strokeDasharray="6 14" className="loop-active-flow" markerEnd={"url(#lm"+i+")"}/>}
              {isAct && <text x={lx} y={ly} textAnchor="middle" style={{fontSize:9,fontWeight:600,fill:fl.c,fontFamily:"DM Sans,sans-serif",opacity:.8}}>{fl.label}</text>}
            </g>
          );
        })}
        {/* Center text */}
        <text x="222" y="172" textAnchor="middle" style={{fontSize:7,fill:"rgba(147,155,161,.65)",letterSpacing:".18em",fontFamily:"Manrope,sans-serif"}}>
          INTELLIGENT CAPABILITY DEVELOPMENT
        </text>
        {/* Nodes */}
        {nodes.map(n=>{
          const isAct=active===n.id;
          const r = isAct ? 40 : 34;
          return (
            <g key={n.id} onClick={()=>setActive(n.id)} style={{cursor:"pointer"}} filter={isAct?("url(#lglow"+n.id+")"):undefined}>
              {isAct && <circle cx={n.cx} cy={n.cy} r={r+10} fill="none" stroke={n.c} strokeWidth="1.2" strokeOpacity=".14" strokeDasharray="5 6"/>}
              <circle cx={n.cx} cy={n.cy} r={r} fill="white"/>
              <circle cx={n.cx} cy={n.cy} r={r} fill={n.bg} stroke={n.c} strokeWidth={isAct?2.2:1} strokeOpacity={isAct?.6:.14} style={{transition:"all .4s"}}/>
              <text x={n.cx} y={n.cy+6} textAnchor="middle" style={{fontSize:isAct?28:22,transition:"font-size .3s"}}>{n.icon}</text>
              <text x={n.cx} y={n.cy+r+18} textAnchor="middle" style={{fontSize:14,fontWeight:800,fill:n.c,fontFamily:"Manrope,sans-serif"}}>{n.label}</text>
              <text x={n.cx} y={n.cy+r+32} textAnchor="middle" style={{fontSize:10.5,fill:"rgba(92,99,112,.55)",fontFamily:"DM Sans,sans-serif"}}>{n.sub}</text>
            </g>
          );
        })}
      </svg>
      <div className="lc-callout" style={{background:an.bg,border:("1px solid "+an.c+"25")}}>
        <div style={{fontSize:13,fontWeight:700,color:an.c,marginBottom:4,fontFamily:"Manrope,sans-serif"}}>{an.label} is active</div>
        <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55}}>
          {["AI agents generating MLR-compliant content from your PI, CSRs, and brand assets. Every claim cited automatically.",
            "Adaptive learning pathways delivering competency-targeted content and closing knowledge gaps before reps reach the field.",
            "Live HCP roleplay with AI physician avatars. Real-time ComplianceGuard monitoring. Behavioral scoring against industry benchmarks.",
            "Competency-gated certification issued against behavioral evidence — not attendance. Gaps automatically trigger Forge to rebuild."][active]}
        </div>
      </div>
      <div className="lc-dots">
        {nodes.map(n=><div key={n.id} className="lc-dot" style={{width:active===n.id?22:6,background:active===n.id?an.c:"var(--br)"}} onClick={()=>setActive(n.id)}/>)}
      </div>
    </div>
  );
};

export default LoopVisual;
