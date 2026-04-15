export default function LongForm({ eyebrow, heading, children, pullQuote, cta, background = 'light' }) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
      <div className="long-form">
        {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
        {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-4)' }}>{heading}</h2>}
        <div className="long-form-body">{children}</div>
        {pullQuote && (
          <blockquote className="long-form-quote">{pullQuote}</blockquote>
        )}
        {cta && (
          <div style={{ marginTop: 'var(--space-5)' }}>
            <button className="bp" onClick={cta.onClick}>{cta.label}</button>
          </div>
        )}
      </div>
    </section>
  );
}
