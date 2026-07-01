import { useEffect } from 'react';
import { useCaseStudy } from '../lib/caseStudies';
import { SITE_URL } from '../lib/site';
import { setJsonLd, buildBreadcrumbLd, buildArticleLd, setSocialCards } from '../lib/jsonLd';
import CaseStudyLayout from '../components/CaseStudyLayout';

function slugFromPath() {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1] || '';
}

export default function CaseStudyPage({ setPage }) {
  const { caseStudy: cs, loading, error } = useCaseStudy(slugFromPath());

  useEffect(() => {
    if (!cs) return;
    const url = (cs.canonical && cs.canonical.trim()) || `${SITE_URL}/case-studies/${cs.slug}`;
    const img = cs.ogImage || cs.heroImage;
    document.title = (cs.metaTitle && cs.metaTitle.trim()) || `${cs.title} · Case study · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && cs.summary) meta.content = cs.summary;
    let robots = document.head.querySelector('meta[name="robots"]');
    if (cs.noindex) {
      if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
      robots.setAttribute('content', 'noindex, nofollow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }
    setSocialCards({ title: cs.title, description: cs.summary, image: img, url });
    setJsonLd('ld-casestudy', buildArticleLd({ title: cs.title, summary: cs.summary, thumb: img, date: cs.date }, url));
    setJsonLd('ld-breadcrumb', buildBreadcrumbLd([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Case studies', url: `${SITE_URL}/case-studies` },
      { name: cs.title, url },
    ]));
    return () => { setJsonLd('ld-casestudy', null); setJsonLd('ld-breadcrumb', null); };
  }, [cs]);

  if (loading) return <div className="proxa-article"><section className="shell blog-index"><p className="blog-sub">Loading…</p></section></div>;
  if (error) return <div className="proxa-article"><section className="shell blog-index"><h1 className="blog-title">Couldn’t load this case study</h1><p className="blog-sub">Please check your connection and try again.</p></section></div>;
  if (!cs) {
    return (
      <div className="proxa-article">
        <section className="shell blog-index">
          <h1 className="blog-title">Case study not found</h1>
          <p className="blog-sub">It may have moved or been unpublished.</p>
          <button className="cs-back" onClick={() => setPage('caseStudies')}>← All case studies</button>
        </section>
      </div>
    );
  }

  return <CaseStudyLayout cs={cs} setPage={setPage} />;
}
