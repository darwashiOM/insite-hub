import { useState, useEffect } from 'react';
import Icon from './Icon';

/* Mobile V3: Vertical timeline — 4 steps flowing down, active one highlighted with animated connector */
const LoopMobile = () => {
  const [active, setActive] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setActive(a=>(a+1)%4),3500); return()=>clearInterval(t); },[]);
  const nodes=[
    {label:"Forge",sub:"Builds content",iconName:"agent",c:"#F4801F",bg:"rgba(244,128,31,.06)",
     desc:"AI agents generating MLR-compliant content from your PI, CSRs, and brand assets."},
    {label:"Atlas",sub:"Delivers learning",iconName:"pathway",c:"#007AFF",bg:"rgba(0,122,255,.06)",
     desc:"Adaptive learning pathways closing knowledge gaps before reps reach the field."},
    {label:"Echo",sub:"Assesses readiness",iconName:"roleplay",c:"#7C3AED",bg:"rgba(124,58,237,.06)",
     desc:"Live HCP roleplay with AI physician avatars. Real-time ComplianceGuard monitoring."},
    {label:"Certify",sub:"Confirms competency",iconName:"audit",c:"#059669",bg:"rgba(5,150,105,.06)",
     desc:"Competency-gated certification. Gaps automatically trigger Forge to rebuild."},
  ];
  return (
    <div style={{padding:"20px 20px"}}>
      <div style={{fontSize:9,letterSpacing:".15em",textTransform:"uppercase",fontWeight:700,color:"var(--st)",textAlign:"center",marginBottom:20}}>The Closed Loop</div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {nodes.map((n,i)=>{
          const isAct=i===active;
          return (
            <div key={n.label}>
              <div onClick={()=>setActive(i)} style={{
                display:"flex",gap:14,alignItems:"center",padding:"14px 16px",
                borderRadius:14,cursor:"pointer",transition:"all .3s",
                background:isAct?n.bg:"transparent",
                border:isAct?("1.5px solid "+n.c+"30"):"1.5px solid transparent",
              }}>
                <div style={{
                  width:48,height:48,borderRadius:"50%",flexShrink:0,
                  background:isAct?("white"):n.bg,
                  border:("2px solid "+(isAct?n.c:n.c+"30")),
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:n.c,
                  transition:"all .3s",
                  boxShadow:isAct?("0 0 16px "+n.c+"20"):"none",
                }}>
                  <Icon name={n.iconName} size={isAct?24:20} strokeWidth={1.8}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,fontWeight:800,color:isAct?n.c:"var(--dk)",fontFamily:"Manrope,sans-serif",transition:"color .3s"}}>{n.label}</span>
                    <span style={{fontSize:10,color:"var(--st)"}}>{n.sub}</span>
                  </div>
                  {isAct && <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55,marginTop:6}}>{n.desc}</div>}
                </div>
              </div>
              {/* Connector line */}
              {i<3 && (
                <div style={{display:"flex",justifyContent:"center",padding:"4px 0"}}>
                  <div style={{width:2,height:20,background:i===active?"var(--o)":"var(--br)",borderRadius:1,transition:"background .3s"}}/>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Loop back indicator */}
      <div style={{textAlign:"center",marginTop:8,fontSize:11,color:"var(--o)",fontWeight:600}}>↻ Loop restarts when gaps are detected</div>
    </div>
  );
};
export default LoopMobile;
