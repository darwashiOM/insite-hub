export default function EditorialHero({ eyebrow, headline, subhead, primaryCta, secondaryLink, visual, badge, dark = false }) {
  return (
    <section className={dark ? 'editorial-hero editorial-hero-dark' : 'editorial-hero'}>
      <div className="editorial-hero-inner">
        <div className="editorial-hero-content">
          {badge && <div className="editorial-hero-badge">{badge}</div>}
          {eyebrow && <div className="t-eyebrow editorial-hero-eyebrow">{eyebrow}</div>}
          <h1 className="t-display editorial-hero-headline">{headline}</h1>
          {subhead && <p className="editorial-hero-subhead">{subhead}</p>}
          {(primaryCta || secondaryLink) && (
            <div className="editorial-hero-actions">
              {primaryCta && <button className="bp" onClick={primaryCta.onClick}>{primaryCta.label}</button>}
              {secondaryLink && (
                <button className="quiet-link" onClick={secondaryLink.onClick}>
                  {secondaryLink.label}
                  <span className="quiet-link-arrow">→</span>
                </button>
              )}
            </div>
          )}
        </div>
        {visual && <div className="editorial-hero-visual">{visual}</div>}
      </div>
    </section>
  );
}
