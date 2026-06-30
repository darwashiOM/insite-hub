import './FaqSection.css';

// Accessible FAQ accordion (native <details>). Pairs with FAQPage JSON-LD
// emitted by the page that renders it, so AI tools can quote the answers.
export default function FaqSection({ heading, items }) {
  const faqs = (items || []).filter((f) => f.question);
  if (!faqs.length && !heading) return null;
  return (
    <section className="faq-section">
      <div className="faq-inner">
        {heading && <h2 className="faq-heading">{heading}</h2>}
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details className="faq-item" key={i}>
              <summary>{f.question}</summary>
              {f.answer && <div className="faq-answer">{f.answer}</div>}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
