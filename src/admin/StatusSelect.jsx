// Draft / Ready for review / Published selector. The editor derives the boolean
// `published` from this on save (published === status 'published'), so rules,
// public queries and prerender keep working unchanged.
export default function StatusSelect({ value, onChange }) {
  return (
    <label className="cms-check" style={{ gap: 8 }}>
      <span style={{ fontWeight: 600 }}>Status</span>
      <select className="cms-select" style={{ maxWidth: 190 }} value={value || 'draft'} onChange={(e) => onChange(e.target.value)}>
        <option value="draft">Draft</option>
        <option value="review">Ready for review</option>
        <option value="published">Published (live)</option>
      </select>
    </label>
  );
}
