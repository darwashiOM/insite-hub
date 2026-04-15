export default function ProductShowcase({ product, eyebrow, tagline, body, bullets, mockup, reverse = false, background = 'light' }) {
  const accents = {
    forge:   { color: '#F4801F', bg: 'rgba(244,128,31,.07)' },
    atlas:   { color: '#007AFF', bg: 'rgba(0,122,255,.07)' },
    echo:    { color: '#7C3AED', bg: 'rgba(124,58,237,.07)' },
    certify: { color: '#059669', bg: 'rgba(5,150,105,.07)' },
  };
  const a = accents[product] || accents.forge;
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  return (
    <section className={`section ${bg}`}>
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
