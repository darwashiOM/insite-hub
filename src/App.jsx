import { useState, useEffect } from "react";
import './styles.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import AdvisoryPage from './pages/AdvisoryPage';
import LiteracyPage from './pages/LiteracyPage';
import InsiteXPage from './pages/InsiteXPage';
import ContentPage from './pages/ContentPage';
import ProxaLabsPage from './pages/ProxaLabsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ResourcesPage from './pages/ResourcesPage';
import NewsletterPage from './pages/NewsletterPage';
import ContactPage from './pages/ContactPage';
import FutureProofPage from './pages/FutureProofPage';

const PAGE_TITLES = {
  home: "Proxa Labs · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Atlas, Echo & Certify · Proxa Labs",
  advisory: "Advisory Services · AI Strategy for Biopharma L&D · Proxa Labs",
  literacy: "AI Literacy Program · Role-Targeted AI Fluency · Proxa Labs",
  insitex: "InsiteX LMS · Enterprise Learning for Biopharma · Proxa Labs",
  content: "Content Development · MLR-Compliant Biopharma Content · Proxa Labs",
  proxalab: "The Lab · Structured AI Experimentation · Proxa Labs",
  about: "About Proxa Labs · Innovation-Led Biopharma L&D",
  news: "Announcements · Latest from Proxa Labs",
  resources: "Resources · Frameworks, Guides & Templates · Proxa Labs",
  newsletter: "Newsletter · Stay Ahead of AI in Biopharma · Proxa Labs",
  contact: "Contact Proxa Labs · Start a Conversation",
  futureproof: "Future-Proof Your Organization · Proxa Labs",
};

const DESCS = {
  home: "Proxa Labs is the AI implementation partner built for biopharma commercial learning. Advisory, platform, and experimentation — methodology-first, compliance by design.",
  platform: "The only closed-loop AI platform in biopharma: Forge builds content, Atlas delivers learning, Echo assesses readiness, Certify confirms competency.",
  advisory: "AI strategy, readiness assessments, governance frameworks, and infrastructure planning — advisory services purpose-built for biopharma commercial L&D.",
  literacy: "Role-targeted AI literacy tracks for every part of your commercial organization. Build fluency before deploying tools.",
  insitex: "Enterprise learning management built for biopharma compliance. SCORM, AICC, and PMRC compliance. The foundation the AI platform builds on.",
  content: "MLR-compliant content development — AI-powered (Forge) or traditional instructional design. Built by biopharma commercial practitioners.",
  proxalab: "Structured AI experimentation for biopharma. Define the right use case, design the experiment, measure what matters, build the business case.",
  about: "Proxa Labs brings 25 years of biopharma commercial learning expertise to AI implementation. Innovation-led, compliance by design.",
  news: "Announcements, partnerships, product updates, and research milestones from Proxa Labs and The Lab.",
  resources: "Frameworks, guides, templates, and research from 25 years of biopharma commercial L&D expertise.",
  newsletter: "Frameworks, research, and field notes from Proxa Labs' practitioners. Sent when there's something worth saying.",
  contact: "Start a conversation with Proxa Labs. Ready to talk, want to learn first, or just exploring — we'll meet you where you are.",
  futureproof: "An executive brief from Proxa Labs on building durable AI capability across biopharma commercial organizations.",
};

// Campaign / placeholder pages that should not be indexed by search engines.
const NOINDEX_PAGES = new Set(["futureproof"]);

const PAGES = {
  home: HomePage, platform: PlatformPage, advisory: AdvisoryPage,
  literacy: LiteracyPage, insitex: InsiteXPage, content: ContentPage,
  proxalab: ProxaLabsPage, about: AboutPage, news: NewsPage,
  resources: ResourcesPage, newsletter: NewsletterPage, contact: ContactPage,
  futureproof: FutureProofPage,
};

const PAGE_PATHS = {
  home: "/",
  platform: "/platform",
  advisory: "/advisory",
  literacy: "/ai-literacy",
  insitex: "/insitex-lms",
  content: "/content-development",
  proxalab: "/the-lab",
  about: "/about",
  news: "/announcements",
  resources: "/resources",
  newsletter: "/newsletter",
  contact: "/contact",
  futureproof: "/future-proof-your-organization",
};

const PATH_PAGES = Object.fromEntries(Object.entries(PAGE_PATHS).map(([page, path]) => [path, page]));
// Legacy redirect: the old "/proxa-labs" lab URL now lives at "/the-lab".
const LEGACY_PATHS = { "/proxa-labs": "/the-lab" };
PATH_PAGES["/proxa-labs"] = "proxalab";

const pageFromLocation = () => {
  const normalized = window.location.pathname.replace(/\/+$/, "") || "/";
  return PATH_PAGES[normalized] || "home";
};

const urlForPage = (page, hash) => {
  const path = PAGE_PATHS[page] || PAGE_PATHS.home;
  return hash ? `${path}#${hash.replace(/^#/, "")}` : path;
};

const scrollToHash = (hash) => {
  const cleanHash = hash?.replace(/^#/, "");
  if (!cleanHash) return false;
  const target = document.getElementById(cleanHash);
  if (!target) return false;
  target.scrollIntoView({ behavior: "auto", block: "start" });
  return true;
};

export default function App() {
  const [page, setCurrentPage] = useState(pageFromLocation);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = DESCS[page] || DESCS.home;

    let robots = document.querySelector('meta[name="robots"]');
    if (NOINDEX_PAGES.has(page)) {
      if (!robots) { robots = document.createElement('meta'); robots.name = "robots"; document.head.appendChild(robots); }
      robots.content = "noindex, nofollow";
    } else if (robots) {
      robots.content = "index, follow";
    }

    const hash = window.location.hash.replace(/^#/, "");
    window.setTimeout(() => {
      if (!scrollToHash(hash)) window.scrollTo(0, 0);
    }, 0);
  }, [page]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pageFromLocation());
      window.dispatchEvent(new Event("hashchange"));
      window.setTimeout(() => scrollToHash(window.location.hash), 0);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const normalized = window.location.pathname.replace(/\/+$/, "");
    if (LEGACY_PATHS[normalized]) {
      window.history.replaceState({}, "", LEGACY_PATHS[normalized] + window.location.hash);
    }
  }, []);

  const setPage = (nextPage, options = {}) => {
    const hash = typeof options === "string" ? options : options.hash;
    const nextUrl = urlForPage(nextPage, hash);
    if (window.location.pathname + window.location.hash !== nextUrl) {
      window.history.pushState({}, "", nextUrl);
      window.dispatchEvent(new Event("hashchange"));
    }
    setCurrentPage(PAGES[nextPage] ? nextPage : "home");
    window.setTimeout(() => scrollToHash(hash), 0);
  };

  const Page = PAGES[page] || HomePage;
  return (
    <>
      <Nav page={page} setPage={setPage} scrolled={scrolled} />
      <main><Page setPage={setPage} /></main>
      <Footer setPage={setPage} />
    </>
  );
}
