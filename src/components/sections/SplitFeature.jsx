export default function SplitFeature({
  ratio = '60-40',
  eyebrow,
  heading,
  body,
  bullets,
  cta,
  visual,
  reverse = false,
  background = 'light',
}) {
  const cols = ratio === '50-50' ? '1fr 1fr' : ratio === '40-60' ? '4fr 6fr' : '6fr 4fr';
  const order = reverse ? { textOrder: 2, visualOrder: 1 } : { textOrder: 1, visualOrder: 2 };
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';

  return (
    <section className={`section ${bg}`}>
      <div className="split-feature" style={{ gridTemplateColumns: cols }}>
        <div className="split-feature-text" style={{ order: order.textOrder }}>
          {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{eyebrow}</div>}
          {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
          {body && <p className="t-body" style={{ marginBottom: 'var(--space-4)', maxWidth: 520 }}>{body}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="split-feature-bullets">
              {bullets.map((b, i) => <li key={i}><span className="bullet-dot" />{b}</li>)}
            </ul>
          )}
          {cta && (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <button className="bp" onClick={cta.onClick}>{cta.label}</button>
            </div>
          )}
        </div>
        <div className="split-feature-visual" style={{ order: order.visualOrder }}>
          {visual}
        </div>
      </div>
    </section>
  );
}
