import { useState } from 'react';
import { HexMarkLarge } from '../components/HexMark';
import SocialIcon from '../components/SocialIcon';

const NewsletterPage = ({ setPage }) => {
  const [form,setForm]=useState({email:"",name:"",role:"",interests:[]});
  const [done,setDone]=useState(false);
  const interests=["AI Platform Updates","Advisory Insights","Proxa Labs Research","AI Literacy Program","Announcements & Partnerships","New Frameworks & Guides"];
  const toggle=i=>setForm(f=>({...f,interests:f.interests.includes(i)?f.interests.filter(x=>x!==i):[...f.interests,i]}));
  return(
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:680}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📬 Newsletter</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>Stay ahead of AI in<br/><span style={{color:"var(--o)"}}>biopharma commercial learning.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>Frameworks, research, field notes, and announcements from InsiteHub's practitioners. Sent when there's something worth saying. No vendor noise, no weekly cadence for its own sake.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
        {/* Form */}
        <div>
          {done ? (
            <div style={{background:"rgba(5,150,105,.07)",border:"1px solid rgba(5,150,105,.2)",borderRadius:16,padding:40,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:16}}>✓</div>
              <div style={{fontSize:22,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10}}>You're subscribed.</div>
              <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.68,marginBottom:24}}>First issue lands when we have something genuinely worth your time. Check the resources page in the meantime.</div>
              <button className="bp" onClick={()=>setPage("resources")}>Browse Frameworks & Guides</button>
            </div>
          ) : (
            <>
              <label className="fl">First Name *</label>
              <input className="fi" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
              <label className="fl">Work Email *</label>
              <input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
              <label className="fl">Your Role</label>
              <select className="fi" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} style={{appearance:"none"}}>
                <option value="">Select your role...</option>
                {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r=><option key={r}>{r}</option>)}
              </select>
              <label className="fl" style={{marginBottom:12}}>What are you most interested in?</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
                {interests.map(i=>(
                  <div key={i} onClick={()=>toggle(i)} style={{padding:"10px 14px",borderRadius:9,border:("1.5px solid "+(form.interests.includes(i)?"var(--o)":"var(--br)")),background:form.interests.includes(i)?"var(--o10)":"var(--wh)",cursor:"pointer",fontSize:13,color:form.interests.includes(i)?"var(--o)":"var(--bd)",fontWeight:form.interests.includes(i)?600:400,transition:"all .15s",lineHeight:1.4}}>
                    {form.interests.includes(i)?"✓ ":""}{i}
                  </div>
                ))}
              </div>
              <button className="fsub" onClick={()=>{if(form.name&&form.email)setDone(true)}}>Subscribe →</button>
              <div style={{fontSize:12,color:"var(--bdl)",marginTop:12}}>No spam. Unsubscribe anytime. We send when there's something worth sending.</div>
            </>
          )}
        </div>
        {/* What to expect */}
        <div>
          <div className="ey">What You'll Receive</div>
          <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"var(--dk)",marginBottom:20,letterSpacing:"-.03em"}}>Useful thinking.<br/>When there's something to say.</h3>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {icon:"🔬",t:"Proxa Labs Research Updates",d:"Early findings, new frameworks, and research milestones from InsiteHub's AI experimentation lab — before they become full publications."},
              {icon:"📣",t:"Partnership & Product Announcements",d:"New partnerships (like UMU.com), platform updates, and program launches — directly from the team building them."},
              {icon:"📋",t:"New Frameworks & Guides",d:"Every new resource InsiteHub publishes — AI readiness tools, business case templates, vendor evaluation scorecards — sent to subscribers first."},
              {icon:"🧠",t:"Field Notes from Advisory Engagements",d:"Anonymized patterns and insights from InsiteHub's advisory work — what's working, what's failing, and what questions organizations are actually asking right now."},
            ].map(c=>(
              <div key={c.t} style={{display:"flex",gap:14,padding:16,background:"var(--lt)",borderRadius:12,border:"1.5px solid var(--br)"}}>
                <div style={{fontSize:20,flexShrink:0}}>{c.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"var(--dk)",marginBottom:4,fontFamily:"Manrope,sans-serif"}}>{c.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>{c.d}</div></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:20,padding:"14px 18px",background:"var(--o10)",borderRadius:12,border:"1px solid var(--o20)"}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--o)",marginBottom:3}}>Follow us on social</div>
            <div style={{fontSize:13,color:"var(--bd)",marginBottom:12}}>Real-time updates between newsletters.</div>
            <div style={{display:"flex",gap:10}}>
              {[{type:"linkedin",href:"https://linkedin.com/company/insitehub",label:"LinkedIn"},
                {type:"facebook",href:"https://facebook.com/insitehub",label:"Facebook"},
                {type:"x",href:"https://x.com/insitehub",label:"X"}].map(s=>(
                <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{width:36,height:36,borderRadius:9,border:"1px solid var(--br)",background:"var(--wh)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--bd)",transition:"all .2s",textDecoration:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--o)";e.currentTarget.style.color="var(--o)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.color="var(--bd)";}}>
                  <SocialIcon type={s.type}/>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div></section>
  </>
  );
};

export default NewsletterPage;
