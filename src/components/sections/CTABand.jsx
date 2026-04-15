import { HexMark } from '../HexMark';

export default function CTABand({ heading, body, primaryCta, secondaryLink }) {
  return (
    <section className="cta-band">
      <div className="cta-band-watermark">
        <HexMark size={420} color="#F4801F" strokeWidth={0.7} />
      </div>
      <div className="cta-band-content">
        <h2 className="cta-band-heading">{heading}</h2>
        {body && <p className="cta-band-body">{body}</p>}
        <div className="cta-band-actions">
          {primaryCta && <button className="bp" onClick={primaryCta.onClick}>{primaryCta.label}</button>}
          {secondaryLink && (
            <button className="quiet-link" onClick={secondaryLink.onClick} style={{ color: 'rgba(255,255,255,.7)' }}>
              {secondaryLink.label}
              <span className="quiet-link-arrow">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
