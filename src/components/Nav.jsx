import { HexMark } from './HexMark';

const Nav = ({ page, setPage, scrolled }) => {
  return (
    <nav className={"nav"+(scrolled?" up":"")}>
      <div className="nav-logo" onClick={()=>setPage("home")}>
        <HexMark size={38} color="#F4801F" strokeWidth={1.7}/>
        <span className="nav-wm">Insite<b>HUB</b></span>
      </div>
      <div className="nav-links">
        {[["Platform","platform"],["Services","services"],["About","about"],["Contact","contact"]].map(([l,p])=>(
          <button key={p} className={"nl"+(page===p?" on":"")} onClick={()=>setPage(p)}>{l}</button>
        ))}
      </div>
      <div className="nav-right">
        <button className="no" onClick={()=>setPage("contact")}>Book a Demo</button>
      </div>
    </nav>
  );
};

export default Nav;
