import Breadcrumbs from './Breadcrumbs';
import './ArticleLayout.css';
import '../pages/CaseStudyPage.css';

// Split a textarea field into paragraphs on blank lines / newlines.
const paras = (text) => String(text || '').split(/\n+/).map((s) => s.trim()).filter(Boolean);

// Presentational case-study body — shared by the public page and the editor preview.
export default function CaseStudyLayout({ cs, setPage }) {
  const stats = Array.isArray(cs.stats) ? cs.stats.filter((s) => (s.value || s.label)) : [];
  return (
    <div className="proxa-article">
      <section className="shell cs-detail">
        <Breadcrumbs go={setPage} items={[
          { name: 'Home', page: 'home' },
          { name: 'Case studies', page: 'caseStudies' },
          { name: cs.title || 'Case study' },
        ]} />
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

        <button className="cs-back" onClick={() => setPage?.('caseStudies')}>← All case studies</button>
      </section>
    </div>
  );
}
