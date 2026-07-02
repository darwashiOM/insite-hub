// Yoast-style pass/fail checklist. Each check: { ok, label, hint?, soft? } —
// soft items render as a suggestion (•) instead of a failure (✕).
export default function SeoChecklist({ checks }) {
  const done = checks.filter((c) => c.ok).length;
  const allGood = done === checks.length;
  return (
    <div className="cms-checklist">
      <p className="cms-checklist-h">
        SEO check — {done}/{checks.length} {allGood ? '· looking great ✓' : ''}
      </p>
      <ul>
        {checks.map((c) => (
          <li key={c.label} className={c.ok ? 'chk-ok' : c.soft ? 'chk-soft' : 'chk-bad'}>
            <span className="chk-mark">{c.ok ? '✓' : c.soft ? '•' : '✕'}</span>
            {c.label}
            {!c.ok && c.hint ? <span className="chk-hint"> — {c.hint}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
