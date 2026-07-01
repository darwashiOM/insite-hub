import './LogoStrip.css';

// A row of client / partner logos. Data-driven kit section.
export default function LogoStrip({ heading, logos }) {
  const items = (logos || []).filter((l) => l.image);
  if (!items.length && !heading) return null;
  return (
    <section className="logostrip">
      <div className="logostrip-inner">
        {heading && <p className="logostrip-heading">{heading}</p>}
        <div className="logostrip-row">
          {items.map((l, i) => <img key={i} className="logostrip-logo" src={l.image} alt={l.name || ''} loading="lazy" />)}
        </div>
      </div>
    </section>
  );
}
