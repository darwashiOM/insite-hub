export default function CardGrid({
  eyebrow,
  heading,
  lead,
  columns = 3,
  cards,
  cardStyle = 'standard',
  background = 'light',
  centerHeader = false,
  leadMaxWidth = 600,
  className = '',
}) {
  const bg = background === 'tinted' ? 'section-tinted' : background === 'dark' ? 'section-dark' : 'section-light';
  const padding = cardStyle === 'compact' ? 'var(--space-4)' : cardStyle === 'feature' ? 'var(--space-6)' : 'var(--space-5)';

  return (
    <section className={`section ${bg} ${className}`.trim()}>
      <div className="mw">
        {(eyebrow || heading || lead) && (
          <div className={centerHeader ? 'card-grid-header card-grid-header-center' : 'card-grid-header'}>
            {eyebrow && <div className="t-eyebrow" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</div>}
            {heading && <h2 className="t-h2" style={{ marginBottom: 'var(--space-3)' }}>{heading}</h2>}
            {lead && <p className="t-lead" style={{ maxWidth: leadMaxWidth, margin: centerHeader ? '0 auto' : 0 }}>{lead}</p>}
          </div>
        )}
        <div className={`card-grid card-grid-${columns}`}>
          {cards.map((c, i) => (
            <div
              key={c.title || i}
              className="card-grid-card"
              style={{ padding, cursor: c.onClick ? 'pointer' : 'default' }}
              onClick={c.onClick}
            >
              {c.icon && <div className="card-grid-card-icon">{c.icon}</div>}
              {c.tag && <div className="card-grid-card-tag" style={c.tagColor ? { color: c.tagColor, background: c.tagColor + '12' } : undefined}>{c.tag}</div>}
              <div className="card-grid-card-title">{c.title}</div>
              <div className="card-grid-card-body">{c.body}</div>
              {c.linkLabel && <div className="card-grid-card-link">{c.linkLabel} →</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
