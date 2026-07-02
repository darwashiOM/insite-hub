import { articleChecks, caseStudyChecks, pageChecks, videoChecks } from './seoChecks';

// Site-wide SEO/AEO health check: runs the same checks the editors show, across
// everything that's live, and lists exactly what to fix with a jump-to-edit.
export default function SeoHealth({ articles, caseStudies, videos, pages, onEdit }) {
  const groups = [
    { label: 'Blog posts', tab: 'blog', items: articles, checks: articleChecks },
    { label: 'Case studies', tab: 'cs', items: caseStudies, checks: caseStudyChecks },
    { label: 'Videos', tab: 'videos', items: videos, checks: videoChecks },
    { label: 'Landing pages', tab: 'landing', items: pages, checks: pageChecks },
  ];
  if (groups.some((g) => g.items === null)) return <p style={{ color: '#5c6370' }}>Checking the site…</p>;

  let checked = 0;
  const problems = groups.map((g) => {
    const live = (g.items || []).filter((x) => x.published && !x.deletedAt);
    checked += live.length;
    const flagged = live.map((x) => {
      const fails = g.checks(x).filter((c) => !c.ok);
      return fails.length ? { item: x, fails } : null;
    }).filter(Boolean);
    return { ...g, flagged };
  });
  const totalFlagged = problems.reduce((n, g) => n + g.flagged.length, 0);

  return (
    <div>
      {totalFlagged === 0 ? (
        <p className="cms-ok-banner">✓ All {checked} live item{checked === 1 ? '' : 's'} pass their SEO checks — the site is in great shape for Google and AI answers.</p>
      ) : (
        <p className="cms-start-attn">🔎 {checked} live item{checked === 1 ? '' : 's'} checked · {totalFlagged} could be stronger. Fixes are listed below — drafts aren’t counted until published.</p>
      )}
      {problems.map((g) => g.flagged.length > 0 && (
        <div key={g.tab} className="cms-start-group">
          <h2 className="cms-start-h">{g.label}</h2>
          <div className="cms-list">
            {g.flagged.map(({ item, fails }) => (
              <div className="cms-card" key={item.id || item.slug} style={{ alignItems: 'flex-start' }}>
                <div className="cms-card-main">
                  <p className="cms-card-title">{item.title || '(untitled)'}</p>
                  <ul className="cms-health-list">
                    {fails.map((c) => (
                      <li key={c.label} className={c.soft ? 'chk-soft' : 'chk-bad'}>
                        <span className="chk-mark">{c.soft ? '•' : '✕'}</span>{c.label}{c.hint ? <span className="chk-hint"> — {c.hint}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="cms-btn cms-btn-sm" onClick={() => onEdit(g.tab, item.slug)}>Fix it</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
