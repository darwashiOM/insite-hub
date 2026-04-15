export default function QuietLink({ onClick, children, color }) {
  return (
    <button className="quiet-link" onClick={onClick} style={color ? { color } : undefined}>
      {children}
      <span className="quiet-link-arrow">→</span>
    </button>
  );
}
