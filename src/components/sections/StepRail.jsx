export default function StepRail({ eyebrow, heading, lead, steps, orientation = 'auto', background = 'light', centerHeader = false, className = '', sectionClassName = '' }) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg} ${sectionClassName}`.trim()}>
      <div className="mw">
        {(eyebrow || heading || lead) && (
          <div className={centerHeader ? 'step-rail-header step-rail-header-center' : 'step-rail-header'}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
            {lead && <p className="t-lead">{lead}</p>}
          </div>
        )}
        <div className={`step-rail step-rail-${orientation} ${className}`}>
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
