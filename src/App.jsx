import { useState, useEffect } from "react";
import './styles.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import InsiteXPage from './pages/InsiteXPage';
import AdvisoryPage from './pages/AdvisoryPage';
import ContentPage from './pages/ContentPage';
import AboutPage from './pages/AboutPage';
import ProxaLabsPage from './pages/ProxaLabsPage';
import LiteracyPage from './pages/LiteracyPage';
import NewsPage from './pages/NewsPage';
import ResourcesPage from './pages/ResourcesPage';
import NewsletterPage from './pages/NewsletterPage';
import ContactPage from './pages/ContactPage';

const PAGE_TITLES = {
  home: "InsiteHub · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Atlas, Echo & Certify · InsiteHub",
  insitex: "InsiteX LMS · Enterprise Learning for Biopharma · InsiteHub",
  advisory: "Advisory Services · AI Strategy for Biopharma L&D · InsiteHub",
  content: "Content Development · MLR-Compliant Biopharma Content · InsiteHub",
  about: "About InsiteHub · Innovation-Led Biopharma L&D Since 2010",
  proxalab: "Proxa Labs · AI Experimentation Partner for Biopharma · InsiteHub",
  contact: "Contact InsiteHub · Start a Conversation",
  literacy: "AI Literacy Program · Biopharma Commercial Teams · InsiteHub",
  news: "Announcements · InsiteHub",
  resources: "Resources & Frameworks · InsiteHub",
  newsletter: "Newsletter · Stay Ahead of AI in Biopharma · InsiteHub",
};

export default function App() {
  const [page,setPage]=useState("home");
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);

  useEffect(()=>{
    window.scrollTo(0,0);
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    const descs = {
      home:"InsiteHub is the AI implementation partner built for biopharma commercial learning. Advisory, platform, and experimentation — methodology-first, compliance by design.",
      platform:"The only closed-loop AI platform in biopharma: Forge builds content, Atlas delivers learning, Echo assesses readiness, Certify confirms competency. No competitor has this.",
      advisory:"InsiteHub Advisory maps your compliance requirements, governance structure, and AI readiness before recommending anything. Methodology before technology.",
      proxalab:"Proxa Labs helps biopharma commercial L&D organizations design, develop, implement, measure, and navigate AI pilots. Evidence before investment.",
      contact:"Start a conversation with InsiteHub. Ready to talk, want to learn first, or just exploring — we'll meet you where you are.",
    };
    let meta = document.querySelector('meta[name="description"]');
    if(!meta){ meta=document.createElement('meta'); meta.name="description"; document.head.appendChild(meta); }
    meta.content = descs[page] || descs.home;
  },[page]);

  const pages={home:HomePage,platform:PlatformPage,insitex:InsiteXPage,advisory:AdvisoryPage,content:ContentPage,about:AboutPage,proxalab:ProxaLabsPage,literacy:LiteracyPage,news:NewsPage,resources:ResourcesPage,newsletter:NewsletterPage,contact:ContactPage};
  const Page=pages[page]||HomePage;
  return(
    <>
      <Nav page={page} setPage={setPage} scrolled={scrolled}/>
      <main><Page setPage={setPage}/></main>
      <Footer setPage={setPage}/>
    </>
  );
}
