import { useEffect } from 'react';
import { usePage } from '../lib/pages';
import SectionRenderer from '../components/SectionRenderer';
import ContentTypeList from '../components/ContentTypeList';
import { setJsonLd, setSocialCards } from '../lib/jsonLd';
import { SITE_URL } from '../lib/site';

function slugFromPath() {
  return window.location.pathname.replace(/^\/+|\/+$/g, '');
}

// A marketer-built page: renders its ordered list of sections from the kit.
export default function DynamicPage({ setPage }) {
  const slug = slugFromPath();
  const { page, loading, error } = usePage(slug);

  useEffect(() => {
    if (!page) return;
    const url = (page.canonical && page.canonical.trim()) || `${SITE_URL}/${slug}`;
    document.title = `${page.metaTitle || page.title || 'Proxa Labs'} · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && page.description) meta.content = page.description;
    setSocialCards({ title: page.metaTitle || page.title, description: page.description, image: page.ogImage, url });
    let robots = document.head.querySelector('meta[name="robots"]');
    if (page.noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex, nofollow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }

    // Page-level structured data (marketer-chosen type). Defaults to nothing extra.
    setJsonLd('ld-page', page.structuredType ? {
      '@context': 'https://schema.org', '@type': page.structuredType,
      name: page.metaTitle || page.title, description: page.description || undefined, url,
    } : null);

    // FAQPage structured data from any FAQ sections (helps AI tools quote answers).
    const faqs = (page.sections || [])
      .filter((s) => s.type === 'faq')
      .flatMap((s) => (s.data && s.data.items) || [])
      .filter((f) => f.question && f.answer);
    setJsonLd('ld-faq', faqs.length ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    } : null);

    // Per-page custom code (admin-authored — trusted). Injected into the head,
    // removed on navigation so it doesn't leak onto the next page.
    let custom = null;
    // Remove any prior copy first — the prerender bakes one into the static head,
    // so without this the client would inject (and re-run) a second one.
    document.getElementById('cms-page-custom')?.remove();
    if (page.customCode && page.customCode.trim()) {
      custom = document.createElement('div');
      custom.id = 'cms-page-custom';
      custom.innerHTML = page.customCode;
      // Re-create <script> nodes so they actually execute (innerHTML scripts don't run).
      custom.querySelectorAll('script').forEach((old) => {
        const s = document.createElement('script');
        for (const a of old.attributes) s.setAttribute(a.name, a.value);
        s.textContent = old.textContent;
        old.replaceWith(s);
      });
      document.head.appendChild(custom);
    }
    return () => {
      setJsonLd('ld-faq', null);
      setJsonLd('ld-page', null);
      if (custom) custom.remove();
    };
  }, [page, slug]);

  if (loading) return <div style={{ minHeight: '60vh' }} />;

  if (error) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Couldn’t load this page</h1>
          <p className="blog-sub">Please check your connection and try again.</p>
        </section>
      </div>
    );
  }

  // No built page at this slug — it may be a custom content-type list (or a real
  // not-found, which ContentTypeList renders).
  if (!page) return <ContentTypeList slug={slug} setPage={setPage} />;

  // A hero section already renders the page's <h1>. If the page has no hero,
  // emit the title as an h1 so every indexable page has exactly one main heading.
  const sections = page.sections || [];
  const hasHero = sections.some((s) => s.type === 'hero');

  return (
    <>
      {!hasHero && <h1 className="t-display" style={{ maxWidth: 1100, margin: '56px auto 8px', padding: '0 24px' }}>{page.metaTitle || page.title}</h1>}
      {sections.map((s, i) => <SectionRenderer key={i} section={s} go={setPage} />)}
    </>
  );
}
