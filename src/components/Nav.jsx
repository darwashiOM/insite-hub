import { useState } from 'react';
import { HexMark } from './HexMark';

const Nav = ({ page, setPage, scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (p) => { setMobileOpen(false); setPage(p); };
  const links = [["Platform","platform"],["Services","services"],["About","about"],["Contact","contact"]];
  return (
    <>
      <nav className={"nav"+(scrolled?" up":"")}>
        <div className="nav-logo" onClick={()=>go("home")}>
          <HexMark size={38} color="#F4801F" strokeWidth={1.7}/>
          <span className="nav-wm">Insite<b>HUB</b></span>
        </div>
        <div className="nav-links">
          {links.map(([l,p])=>(
            <button key={p} className={"nl"+(page===p?" on":"")} onClick={()=>go(p)}>{l}</button>
          ))}
        </div>
        <div className="nav-right">
          <button className="no" onClick={()=>go("contact")}>Book a Demo</button>
          <button className="nav-hamburger" onClick={()=>setMobileOpen(o=>!o)} aria-label="Menu">
            <span style={mobileOpen?{transform:"rotate(45deg) translate(5px,5px)"}:{}}/>
            <span style={mobileOpen?{opacity:0}:{}}/>
            <span style={mobileOpen?{transform:"rotate(-45deg) translate(5px,-5px)"}:{}}/>
          </button>
        </div>
      </nav>
      <div className={"nav-mobile-menu"+(mobileOpen?" open":"")}>
        {links.map(([l,p])=>(
          <button key={p} className={page===p?"on":""} onClick={()=>go(p)}>{l}</button>
        ))}
        <button className="mobile-cta" onClick={()=>go("contact")}>Book a Demo</button>
      </div>
    </>
  );
};

export default Nav;
