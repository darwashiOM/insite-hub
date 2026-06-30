import { useEffect } from 'react';
import { usePage } from '../lib/pages';
import SectionRenderer from '../components/SectionRenderer';
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
    document.title = `${page.metaTitle || page.title || 'Proxa Labs'} · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && page.description) meta.content = page.description;
    setSocialCards({ title: page.metaTitle || page.title, description: page.description, image: page.ogImage, url: `${SITE_URL}/${slug}` });
    let robots = document.head.querySelector('meta[name="robots"]');
    if (page.noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex, nofollow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }

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
    return () => setJsonLd('ld-faq', null);
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

  if (!page) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Page not found</h1>
          <p className="blog-sub">The page you’re looking for doesn’t exist or has moved.</p>
          <button onClick={() => setPage('home')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--coral-deep, #e06a3f)', fontWeight: 600 }}>
            ← Back home
          </button>
        </section>
      </div>
    );
  }

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
