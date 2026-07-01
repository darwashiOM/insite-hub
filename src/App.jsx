import { useState, useEffect, useRef, lazy, Suspense } from "react";
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
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import { prefetchContent, useRedirects, usePageSeo } from './lib/content';
import { trackPageView } from './analytics';
import { SITE_URL, OG_IMAGE } from './lib/site';
import { setJsonLd, buildOrgLd } from './lib/jsonLd';
// Blog + admin are code-split so the Firebase SDK loads only on /blog routes and
// the admin (not on the homepage / marketing pages).
// If a hashed chunk is missing (stale tab after a redeploy), reload once to pick
// up the fresh index.html instead of white-screening.
function lazyWithReload(factory) {
  return lazy(() => factory().catch((err) => {
    if (!sessionStorage.getItem('chunkReloaded')) {
      sessionStorage.setItem('chunkReloaded', '1');
      window.location.reload();
      return new Promise(() => {}); // hang until the reload happens
    }
    throw err;
  }));
}
const BlogIndexPage = lazyWithReload(() => import('./pages/BlogIndexPage'));
const ArticlePage = lazyWithReload(() => import('./pages/ArticlePage'));
const CaseStudiesIndexPage = lazyWithReload(() => import('./pages/CaseStudiesIndexPage'));
const CaseStudyPage = lazyWithReload(() => import('./pages/CaseStudyPage'));
const VideoGalleryPage = lazyWithReload(() => import('./pages/VideoGalleryPage'));
const CmsFormPage = lazyWithReload(() => import('./pages/CmsFormPage'));
const DynamicPage = lazyWithReload(() => import('./pages/DynamicPage'));
const AdminPage = lazyWithReload(() => import('./admin/AdminPage'));

const PAGE_TITLES = {
  home: "Proxa Labs · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Cue, Stage & Trace · Proxa Labs",
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
  blog: "Blog · Proxa Labs",
  article: "Proxa Labs",
  caseStudies: "Case Studies · Proxa Labs",
  caseStudy: "Case Study · Proxa Labs",
  videos: "Videos · Proxa Labs",
  form: "Proxa Labs",
  dynamicPage: "Proxa Labs",
  admin: "CMS · Proxa Labs",
  notfound: "Page not found · Proxa Labs",
};

const DESCS = {
  home: "Proxa Labs is the AI implementation partner built for biopharma commercial learning. Advisory, platform, and experimentation — methodology-first, compliance by design.",
  platform: "The only closed-loop AI platform in biopharma: Forge builds content, Cue delivers learning, Stage assesses readiness, Trace confirms competency.",
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
  blog: "Field notes and frameworks from Proxa Labs on commercial readiness, AI evidence, and closing the gap between training and a field that can perform.",
  article: "Field notes and frameworks from Proxa Labs on commercial readiness.",
  caseStudies: "Real biopharma commercial teams, real results — the challenge, what Proxa Labs did, and the outcomes.",
  caseStudy: "A Proxa Labs case study — challenge, approach, and results.",
  videos: "Short, practical videos on AI in biopharma commercial learning — strategy, evidence, and the field.",
  form: "Proxa Labs.",
  dynamicPage: "Proxa Labs.",
  admin: "Proxa Labs content management.",
  notfound: "The page you're looking for doesn't exist or has moved.",
};

// Campaign / placeholder / private pages that should not be indexed.
const NOINDEX_PAGES = new Set(["futureproof", "admin", "notfound"]);

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

const PAGES = {
  home: HomePage, platform: PlatformPage, advisory: AdvisoryPage,
  literacy: LiteracyPage, insitex: InsiteXPage, content: ContentPage,
  proxalab: ProxaLabsPage, about: AboutPage, news: NewsPage,
  resources: ResourcesPage, newsletter: NewsletterPage, contact: ContactPage,
  futureproof: FutureProofPage, blog: BlogIndexPage, article: ArticlePage,
  caseStudies: CaseStudiesIndexPage, caseStudy: CaseStudyPage,
  videos: VideoGalleryPage, form: CmsFormPage, dynamicPage: DynamicPage,
  admin: AdminPage, notfound: NotFoundPage,
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
  blog: "/blog",
  caseStudies: "/case-studies",
  videos: "/videos",
  admin: "/noonewillfindthis",
};

const PATH_PAGES = Object.fromEntries(Object.entries(PAGE_PATHS).map(([page, path]) => [path, page]));
// Legacy redirect: the old "/proxa-labs" lab URL now lives at "/the-lab".
const LEGACY_PATHS = { "/proxa-labs": "/the-lab" };
PATH_PAGES["/proxa-labs"] = "proxalab";

const pageFromLocation = () => {
  const normalized = window.location.pathname.replace(/\/+$/, "") || "/";
  // /blog/<slug> resolves to the dynamic article page (slug read from the URL).
  if (normalized.startsWith("/blog/") && normalized !== "/blog") return "article";
  if (normalized.startsWith("/case-studies/") && normalized !== "/case-studies") return "caseStudy";
  if (normalized.startsWith("/forms/") && normalized !== "/forms") return "form";
  if (PATH_PAGES[normalized]) return PATH_PAGES[normalized];
  // A single clean segment (e.g. /ai-readiness-day) might be a marketer-built CMS
  // page — try to resolve it. Anything else (multi-segment junk, scanner noise
  // like /wp-login.php) goes straight to not-found, with no Firestore read.
  return /^\/[a-z0-9][a-z0-9-]*$/.test(normalized) ? "dynamicPage" : "notfound";
};

const urlForPage = (page, hash, slug) => {
  let path;
  if (page === "article" && slug) path = `/blog/${slug}`;
  else if (page === "caseStudy" && slug) path = `/case-studies/${slug}`;
  else if (page === "form" && slug) path = `/forms/${slug}`;
  else if (PAGE_PATHS[page]) path = PAGE_PATHS[page];
  else path = `/${page}`; // a CMS-built page — its key is its slug
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
  // Bumped on every navigation to force a re-render even when the page key is
  // unchanged (e.g. article -> article), so the pathname-keyed page remounts.
  const [navTick, setNavTick] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Warm the page-content cache early so overrides are ready before navigation.
  useEffect(() => { prefetchContent(); }, []);

  // Site-wide Organization + WebSite structured data (one-time).
  useEffect(() => { setJsonLd('ld-org', buildOrgLd()); }, []);

  const pageSeo = usePageSeo(page);
  useEffect(() => {
    // Per-page SEO override (editable in the Site pages editor) wins over the
    // in-code default. Content pages set their own meta later from their data.
    const title = (pageSeo.seoTitle && pageSeo.seoTitle.trim()) || PAGE_TITLES[page] || PAGE_TITLES.home;
    const desc = (pageSeo.seoDescription && pageSeo.seoDescription.trim()) || DESCS[page] || DESCS.home;
    const ogImage = (pageSeo.seoImage && pageSeo.seoImage.trim()) || OG_IMAGE;
    // Slug-based routes (blog post, case study, form, built page) have no PAGE_PATHS
    // entry — use the real pathname so canonical/og:url aren't defaulted to "/".
    const slugRoute = page === "article" || page === "caseStudy" || page === "form" || page === "dynamicPage";
    const canonical = SITE_URL + (slugRoute ? window.location.pathname : (PAGE_PATHS[page] || "/"));

    document.title = title;
    upsertMeta("name", "description", desc);
    upsertLink("canonical", canonical);

    // Social / link-preview cards. Set here so the prerender snapshot captures them.
    upsertMeta("property", "og:type", page === "article" ? "article" : "website");
    upsertMeta("property", "og:site_name", "Proxa Labs");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", ogImage);

    let robots = document.querySelector('meta[name="robots"]');
    if (NOINDEX_PAGES.has(page) || pageSeo.seoNoindex) {
      if (!robots) { robots = document.createElement('meta'); robots.name = "robots"; document.head.appendChild(robots); }
      robots.content = "noindex, nofollow";
    } else if (robots) {
      robots.content = "index, follow";
    }

    const hash = window.location.hash.replace(/^#/, "");
    window.setTimeout(() => {
      if (!scrollToHash(hash)) window.scrollTo(0, 0);
    }, 0);
  }, [page, pageSeo]);

  // Fire a GA4 page_view on every navigation (SPA — no full page loads).
  useEffect(() => {
    trackPageView(window.location.pathname + window.location.hash, document.title);
  }, [navTick]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pageFromLocation());
      setNavTick((t) => t + 1);
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

  // Marketer-managed redirects (from the CMS). Applied once when they load: if the
  // current path matches a rule, forward to its target — client-side for internal
  // paths (no reload loop), full navigation for external URLs.
  const redirects = useRedirects();
  const redirectedRef = useRef(false);
  useEffect(() => {
    if (redirectedRef.current || !redirects.length) return;
    redirectedRef.current = true;
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const rule = redirects.find((r) => r && r.from && ((r.from.replace(/\/+$/, "") || "/") === path));
    if (rule && rule.to && rule.to.replace(/\/+$/, "") !== path) {
      if (/^https?:\/\//.test(rule.to)) {
        window.location.href = rule.to;
      } else {
        window.history.replaceState({}, "", rule.to);
        window.dispatchEvent(new PopStateEvent("popstate")); // re-resolve via the popstate handler
      }
    }
  }, [redirects]);

  const setPage = (nextPage, options = {}) => {
    const hash = typeof options === "string" ? options : options.hash;
    const slug = typeof options === "object" ? options.slug : undefined;
    const nextUrl = urlForPage(nextPage, hash, slug);
    if (window.location.pathname + window.location.hash !== nextUrl) {
      window.history.pushState({}, "", nextUrl);
      window.dispatchEvent(new Event("hashchange"));
    }
    setCurrentPage(PAGES[nextPage] ? nextPage : "dynamicPage");
    setNavTick((t) => t + 1);
    window.setTimeout(() => scrollToHash(hash), 0);
  };

  const Page = PAGES[page] || HomePage;
  // For the dynamic article page, key by pathname so it remounts (re-fetches)
  // when navigating between articles.
  const pageKey = (page === "article" || page === "caseStudy" || page === "form" || page === "dynamicPage") ? window.location.pathname : page;

  // The admin is a standalone full-screen app — no marketing nav/footer.
  if (page === "admin") {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}><Page setPage={setPage} /></Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <>
      <Nav page={page} setPage={setPage} scrolled={scrolled} />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <Page key={pageKey} setPage={setPage} />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer setPage={setPage} />
    </>
  );
}
