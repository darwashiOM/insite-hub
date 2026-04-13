import { useState } from 'react';
import { HexMark } from './HexMark';
import SocialIcon from './SocialIcon';

const var_dk2 = "#1A1D25";

const Footer = ({ setPage }) => {
  const [email,setEmail]=useState('');
  const [subbed,setSubbed]=useState(false);
  return(
  <footer style={{background:var_dk2,borderTop:"1px solid rgba(255,255,255,.06)"}}>
    <div style={{padding:"48px 56px 32px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.5fr",gap:56,marginBottom:48}}>
          {/* Column 1: Brand */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:16}} onClick={()=>setPage("home")}>
              <HexMark size={34} color="#F4801F" strokeWidth={1.6}/>
              <span style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,letterSpacing:"-.04em",color:"rgba(255,255,255,.75)"}}>Insite<span style={{color:"#F4801F"}}>HUB</span></span>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,.3)",lineHeight:1.72,maxWidth:280,marginBottom:20}}>The AI implementation partner built for biopharma commercial learning — methodology-first, compliance by design.</p>
            <div style={{display:"flex",gap:10}}>
              {[
                {type:"linkedin",href:"https://linkedin.com/company/insitehub",label:"LinkedIn"},
                {type:"facebook",href:"https://facebook.com/insitehub",label:"Facebook"},
                {type:"x",href:"https://x.com/insitehub",label:"X"},
              ].map(s=>(
                <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{width:36,height:36,borderRadius:9,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.35)",transition:"all .2s",textDecoration:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(244,128,31,.4)";e.currentTarget.style.color="#F4801F";e.currentTarget.style.background="rgba(244,128,31,.06)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.35)";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
                  <SocialIcon type={s.type}/>
                </a>
              ))}
            </div>
          </div>
          {/* Column 2: Links */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:16}}>Navigation</div>
            {[["Platform","platform"],["Services","services"],["About","about"],["Contact","contact"],["Book a Demo","contact"]].map(([l,p])=>(
              <div key={l} style={{fontSize:13.5,color:"rgba(255,255,255,.25)",marginBottom:11,cursor:"pointer",transition:"color .15s"}} onClick={()=>setPage(p)} onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.7)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.25)"}>{l}</div>
            ))}
          </div>
          {/* Column 3: Newsletter */}
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:16}}>Stay in the loop</div>
            <p style={{fontSize:13,color:"rgba(255,255,255,.3)",lineHeight:1.6,marginBottom:16}}>Frameworks, research, and field notes from InsiteHub's practitioners. No vendor noise.</p>
            {subbed?(
              <div style={{fontSize:13,color:"#34D399",fontWeight:600}}>✓ You're in. We'll be in touch.</div>
            ):(
              <div className="fn-wrap">
                <input className="fn-in" placeholder="your@company.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                <button className="fn-btn" onClick={()=>{if(email)setSubbed(true)}}>Subscribe</button>
              </div>
            )}
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:26,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,.16)"}}>© 2026 InsiteHub, Inc. · Newark, DE · InsiteHub, Inc. is a Delaware S-Corp</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {["SOC 2 Type II","NIH Partner","Biopharma Native","University of Delaware Partner"].map(t=><div key={t} style={{fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20,border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.2)"}}>{t}</div>)}
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
