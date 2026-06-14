export default function ProductShowcase({ product, eyebrow, tagline, body, bullets, mockup, reverse = false, background = 'light', id }) {
  const accents = {
    forge:   { color: '#f5825f', bg: 'rgba(245,130,95,.07)' },
    atlas:   { color: '#9ca979', bg: 'rgba(156,169,121,.07)' },
    echo:    { color: '#5e6b7a', bg: 'rgba(94,107,122,.07)' },
    certify: { color: '#75abc0', bg: 'rgba(117,171,192,.07)' },
  };
  const a = accents[product] || accents.forge;
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section id={id} className={`section ${bg}`}>
      <div className="product-showcase" style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
        <div className="product-showcase-text">
          {eyebrow && <div className="t-eyebrow" style={{ color: a.color, marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
          {tagline && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{tagline}</h2>}
          {body && <p className="t-body" style={{ marginBottom: 'var(--space-4)', maxWidth: 480 }}>{body}</p>}
          {bullets?.length > 0 && (
            <ul className="split-feature-bullets" style={{ marginBottom: 'var(--space-5)' }}>
              {bullets.map((b, i) => <li key={i}><span className="bullet-dot" style={{ background: a.color }} />{b}</li>)}
            </ul>
          )}
        </div>
        <div className="product-showcase-mockup" style={{ background: a.bg, borderColor: a.color + '20' }}>
          {mockup}
        </div>
      </div>
    </section>
  );
}
