import React, { useState } from 'react';

const NewsletterInline = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",borderRadius:10,padding:"14px 18px",fontSize:13,color:"#34D399",fontWeight:600}}>
      ✓ You're in. First issue arrives when we have something worth sending.
    </div>
  );
  return (
    <div style={{display:"flex",gap:8}}>
      <input
        value={email} onChange={e=>setEmail(e.target.value)}
        placeholder="your@company.com"
        style={{flex:1,padding:"12px 16px",borderRadius:9,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.75)",fontSize:14,fontFamily:"DM Sans,sans-serif",outline:"none"}}
        onFocus={e=>e.target.style.borderColor="rgba(244,128,31,.5)"}
        onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.12)"}
      />
      <button onClick={()=>{if(email)setDone(true);}}
        style={{padding:"12px 20px",borderRadius:9,background:"var(--o)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",whiteSpace:"nowrap",transition:"background .15s"}}
        onMouseEnter={e=>e.currentTarget.style.background="#D96A0A"}
        onMouseLeave={e=>e.currentTarget.style.background="var(--o)"}>
        Subscribe
      </button>
    </div>
  );
};

export default NewsletterInline;
