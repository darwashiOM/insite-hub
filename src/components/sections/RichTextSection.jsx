import { cleanHtml } from '../../lib/sanitize';
import './RichTextSection.css';

// A formatted-text section (heading + rich body). Body is admin-authored HTML,
// sanitized on render.
export default function RichTextSection({ heading, body }) {
  if (!heading && !body) return null;
  return (
    <section className="richtext-section">
      <div className="richtext-section-inner">
        {heading && <h2 className="t-display richtext-section-h">{heading}</h2>}
        {body && <div className="richtext-section-body" dangerouslySetInnerHTML={cleanHtml(body)} />}
      </div>
    </section>
  );
}
