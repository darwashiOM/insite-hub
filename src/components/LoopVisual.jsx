import React, { useState, useEffect } from 'react';

const LoopVisual = () => {
  const [active, setActive] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setActive(a=>(a+1)%4),2000); return()=>clearInterval(t); },[]);
  const nodes=[
    {id:0,label:"Forge",  sub:"Builds content",    icon:"⚡",c:"#F4801F",bg:"rgba(244,128,31,.1)", cx:190,cy:76},
    {id:1,label:"Atlas",  sub:"Delivers learning", icon:"🎓",c:"#007AFF",bg:"rgba(0,122,255,.1)",  cx:326,cy:196},
    {id:2,label:"Echo",   sub:"Assesses readiness",icon:"🎭",c:"#7C3AED",bg:"rgba(124,58,237,.1)",cx:190,cy:316},
    {id:3,label:"Certify",sub:"Confirms competency",icon:"✅",c:"#059669",bg:"rgba(5,150,105,.1)", cx:54, cy:196},
  ];
  const flows=[
    {f:0,t:1,label:"content published",c:"#F4801F"},
    {f:1,t:2,label:"readiness reached",c:"#007AFF"},
    {f:2,t:3,label:"gap detected",     c:"#7C3AED"},
    {f:3,t:0,label:"rebuild queued",   c:"#059669"},
  ];
  const an=nodes[active];
  const curvedPath=(from,to,offset=30)=>{
    const mx=(from.cx+to.cx)/2, my=(from.cy+to.cy)/2;
    const dx=to.cx-from.cx, dy=to.cy-from.cy;
    const len=Math.sqrt(dx*dx+dy*dy)||1;
    return "M"+from.cx+" "+from.cy+" Q"+(mx-(dy/len)*offset)+" "+(my+(dx/len)*offset)+" "+to.cx+" "+to.cy;
  };
  return (
    <div className="loop-card">
      <div className="lc-label">The Closed Loop · Intelligent Capability Development</div>
      <svg viewBox="0 0 380 392" style={{width:"100%",maxWidth:380,display:"block",margin:"0 auto"}}>
        <defs>
          {flows.map(f=>(
            <marker key={f.f} id={"m"+f.f} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 1L9 5L1 9" fill="none" stroke={f.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          ))}
        </defs>
        {/* Background hex pattern */}
        <g opacity=".04">
          {[[95,80],[190,80],[285,80],[47,196],[142,196],[237,196],[332,196],[95,312],[190,312],[285,312]].map(([x,y],i)=>(
            <polygon key={i} points={[x+","+(y-28),x+24+","+(y-14),x+24+","+(y+14),x+","+(y+28),(x-24)+","+(y+14),(x-24)+","+(y-14)].join(" ")} stroke="#F4801F" strokeWidth="1" fill="none"/>
          ))}
        </g>
        {/* Connection paths */}
        {flows.map((fl,i)=>{
          const from=nodes[fl.f], to=nodes[fl.t];
          const isAct=active===fl.f;
          const d=curvedPath(from,to,36);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={fl.c} strokeWidth={isAct?2.2:1.2} strokeOpacity={isAct?.75:.15} markerEnd={"url(#m"+fl.f+")"} style={{transition:"all .5s"}}/>
              {isAct&&<text textAnchor="middle" style={{fontSize:9,fill:fl.c,fontFamily:"DM Sans,sans-serif",fontWeight:600,opacity:.9}}>
                <textPath href={"#fp"+i} startOffset="50%">{fl.label}</textPath>
              </text>}
              <path id={"fp"+i} d={d} fill="none" stroke="none"/>
            </g>
          );
        })}
        {/* Nodes */}
        {nodes.map(n=>{
          const isAct=active===n.id;
          return (
            <g key={n.id} onClick={()=>setActive(n.id)} style={{cursor:"pointer"}}>
              {isAct&&<circle cx={n.cx} cy={n.cy} r={52} fill="none" stroke={n.c} strokeWidth="1" strokeOpacity=".12" strokeDasharray="4 5"/>}
              <circle cx={n.cx} cy={n.cy} r={isAct?42:36} fill={n.bg} stroke={n.c} strokeWidth={isAct?1.8:1} strokeOpacity={isAct?.65:.2} style={{transition:"all .4s"}}/>
              <text x={n.cx} y={n.cy-6} textAnchor="middle" style={{fontSize:isAct?20:16,transition:"font-size .3s"}}>{n.icon}</text>
              <text x={n.cx} y={n.cy+11} textAnchor="middle" style={{fontSize:11,fontWeight:800,fill:n.c,fontFamily:"Manrope,sans-serif"}}>{n.label}</text>
              <text x={n.cx} y={n.cy+24} textAnchor="middle" style={{fontSize:9,fill:"rgba(92,99,112,.65)",fontFamily:"DM Sans,sans-serif"}}>{n.sub}</text>
            </g>
          );
        })}
        {/* Center */}
        {["INTELLIGENT","CAPABILITY","DEVELOPMENT"].map((w,i)=>(
          <text key={w} x="190" y={184+i*14} textAnchor="middle" style={{fontSize:8,fill:"rgba(147,155,161,.5)",letterSpacing:".1em",fontFamily:"Manrope,sans-serif"}}>{w}</text>
        ))}
      </svg>
      <div className="lc-callout" style={{background:an.bg,border:("1px solid "+an.c+"25")}}>
        <div style={{fontSize:12,fontWeight:700,color:an.c,marginBottom:3,fontFamily:"Manrope,sans-serif"}}>{an.label} is active</div>
        <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55}}>
          {[
            "AI agents generating MLR-compliant content from your PI, CSRs, and brand assets. Every claim cited automatically.",
            "Adaptive learning pathways delivering competency-targeted content and closing knowledge gaps before reps reach the field.",
            "Live HCP roleplay with AI physician avatars. Real-time ComplianceGuard monitoring. Behavioral scoring against industry benchmarks.",
            "Competency-gated certification issued against behavioral evidence — not attendance. Gaps automatically trigger Forge to rebuild.",
          ][active]}
        </div>
      </div>
      <div className="lc-dots">
        {nodes.map(n=><div key={n.id} className="lc-dot" style={{width:active===n.id?22:6,background:active===n.id?an.c:"var(--br)"}} onClick={()=>setActive(n.id)}/>)}
      </div>
    </div>
  );
};

export default LoopVisual;
