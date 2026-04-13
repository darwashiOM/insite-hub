import { useState, useEffect } from "react";
import './styles.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const PAGE_TITLES = {
  home: "InsiteHub · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Atlas, Echo & Certify · InsiteHub",
  services: "Services · Advisory, AI Literacy, Content & Experimentation · InsiteHub",
  about: "About InsiteHub · Innovation-Led Biopharma L&D Since 2010",
  contact: "Contact InsiteHub · Start a Conversation",
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
      platform:"The only closed-loop AI platform in biopharma: Forge builds content, Atlas delivers learning, Echo assesses readiness, Certify confirms competency.",
      services:"Advisory, AI literacy, content development, and structured experimentation — InsiteHub meets you where you are in your AI journey.",
      about:"InsiteHub has been solving biopharma commercial learning challenges for 25 years. Innovation-led, compliance by design.",
      contact:"Start a conversation with InsiteHub. Ready to talk, want to learn first, or just exploring — we'll meet you where you are.",
    };
    let meta = document.querySelector('meta[name="description"]');
    if(!meta){ meta=document.createElement('meta'); meta.name="description"; document.head.appendChild(meta); }
    meta.content = descs[page] || descs.home;
  },[page]);

  const pages={home:HomePage,platform:PlatformPage,services:ServicesPage,about:AboutPage,contact:ContactPage};
  const Page=pages[page]||HomePage;
  return(
    <>
      <Nav page={page} setPage={setPage} scrolled={scrolled}/>
      <main><Page setPage={setPage}/></main>
      <Footer setPage={setPage}/>
    </>
  );
}
