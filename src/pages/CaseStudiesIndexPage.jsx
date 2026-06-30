import { usePublishedCaseStudies } from '../lib/caseStudies';
import '../components/ArticleLayout.css';

// Public index of published case studies.
export default function CaseStudiesIndexPage({ setPage }) {
  const { caseStudies, loading, error } = usePublishedCaseStudies();

  return (
    <div className="proxa-article">
      <section className="shell blog-index">
        <p className="eyebrow blog-eyebrow">Case studies</p>
        <h1 className="blog-title">Proof in the field</h1>
        <p className="blog-sub">
          How biopharma commercial teams put Proxa Labs to work — the challenge, what we did, and the results.
        </p>

        {loading ? (
          <p className="blog-sub">Loading…</p>
        ) : error ? (
          <p className="blog-sub">Couldn’t load case studies. Please refresh.</p>
        ) : caseStudies.length === 0 ? (
          <p className="blog-sub">No case studies published yet — check back soon.</p>
        ) : (
          <div className="blog-grid">
            {caseStudies.map((c) => (
              <button key={c.id} className="blog-card" onClick={() => setPage('caseStudy', { slug: c.slug })}>
                <div className="blog-card-img" style={c.heroImage ? { backgroundImage: `url(${c.heroImage})` } : undefined} />
                <p className="card-pillar">{c.industry || c.client || 'Case study'}</p>
                <p className="card-title">{c.title}</p>
                {c.client && <p className="card-meta">{c.client}</p>}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
