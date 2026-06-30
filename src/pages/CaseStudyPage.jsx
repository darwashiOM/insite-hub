import { useEffect } from 'react';
import { useCaseStudy } from '../lib/caseStudies';
import { SITE_URL } from '../lib/site';
import { setJsonLd, buildBreadcrumbLd, setSocialCards } from '../lib/jsonLd';
import '../components/ArticleLayout.css';
import './CaseStudyPage.css';

function slugFromPath() {
  const parts = window.location.pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1] || '';
}

// Split a textarea field into paragraphs on blank lines / newlines.
const paras = (text) => String(text || '').split(/\n+/).map((s) => s.trim()).filter(Boolean);

export default function CaseStudyPage({ setPage }) {
  const { caseStudy: cs, loading, error } = useCaseStudy(slugFromPath());

  useEffect(() => {
    if (!cs) return;
    document.title = `${cs.title} · Case study · Proxa Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && cs.summary) meta.content = cs.summary;
    const url = `${SITE_URL}/case-studies/${cs.slug}`;
    setSocialCards({ title: cs.title, description: cs.summary, image: cs.ogImage || cs.thumb, url });
    setJsonLd('ld-breadcrumb', buildBreadcrumbLd([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Case studies', url: `${SITE_URL}/case-studies` },
      { name: cs.title, url },
    ]));
    return () => setJsonLd('ld-breadcrumb', null);
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

  const stats = Array.isArray(cs.stats) ? cs.stats.filter((s) => (s.value || s.label)) : [];

  return (
    <div className="proxa-article">
      <section className="shell cs-detail">
        <p className="eyebrow blog-eyebrow">{cs.industry || 'Case study'}</p>
        <h1 className="blog-title">{cs.title}</h1>
        {cs.client && <p className="cs-client">{cs.client}</p>}
        {cs.summary && <p className="blog-sub">{cs.summary}</p>}

        {stats.length > 0 && (
          <div className="cs-stats">
            {stats.map((s, i) => (
              <div className="cs-stat" key={i}>
                <div className="cs-stat-value">{s.value}</div>
                <div className="cs-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {cs.challenge && <div className="cs-block"><h2>The challenge</h2>{paras(cs.challenge).map((p, i) => <p key={i}>{p}</p>)}</div>}
        {cs.solution && <div className="cs-block"><h2>What we did</h2>{paras(cs.solution).map((p, i) => <p key={i}>{p}</p>)}</div>}
        {cs.results && <div className="cs-block"><h2>The results</h2>{paras(cs.results).map((p, i) => <p key={i}>{p}</p>)}</div>}

        <button className="cs-back" onClick={() => setPage('caseStudies')}>← All case studies</button>
      </section>
    </div>
  );
}
