export default function StepRail({ eyebrow, heading, lead, steps, orientation = 'auto', background = 'light' }) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="mw">
        {(eyebrow || heading || lead) && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
            {lead && <p className="t-lead" style={{ maxWidth: 600 }}>{lead}</p>}
          </div>
        )}
        <div className={`step-rail step-rail-${orientation}`}>
          {steps.map((s, i) => (
            <div key={s.n || i} className={`step-rail-step ${s.highlight ? 'step-rail-step-highlight' : ''}`}>
              <div className="step-rail-num">{s.n}</div>
              <div className="step-rail-content">
                <div className="step-rail-title">{s.title}</div>
                <div className="step-rail-body">{s.body}</div>
              </div>
              {i < steps.length - 1 && <div className="step-rail-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
