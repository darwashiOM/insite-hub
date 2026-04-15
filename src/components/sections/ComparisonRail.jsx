export default function ComparisonRail({ eyebrow, heading, columns, rows, background = 'light' }) {
  const bg = background === 'tinted' ? 'section-tinted' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="mw">
        {(eyebrow || heading) && (
          <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2">{heading}</h2>}
          </div>
        )}
        <div className="comparison-rail" style={{ '--cmp-cols': columns.length }}>
          <div className="comparison-rail-head">
            <div className="comparison-rail-cell comparison-rail-feature-label" />
            {columns.map(c => (
              <div key={c.label} className="comparison-rail-cell comparison-rail-col-head" style={c.accent ? { color: c.accent } : undefined}>
                {c.label}
              </div>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} className="comparison-rail-row">
              <div className="comparison-rail-cell comparison-rail-feature-label">{r.label}</div>
              {r.values.map((v, j) => (
                <div key={j} className="comparison-rail-cell">
                  {v === true && <span className="comparison-yes">✓</span>}
                  {v === false && <span className="comparison-no">—</span>}
                  {v === 'partial' && <span className="comparison-partial">partial</span>}
                  {typeof v === 'string' && v !== 'partial' && <span style={{ fontSize: 13, color: 'var(--bd)' }}>{v}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
