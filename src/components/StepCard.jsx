const StepCard = ({ number, title, description, highlight }) => (
  <div className="ps" style={{ background: highlight ? "rgba(245,158,11,.04)" : "" }}>
    <div className="ps-n" style={{ background: highlight ? "rgba(245,158,11,.15)" : "var(--o10)", color: highlight ? "#D97706" : "var(--o)" }}>{number}</div>
    <div>
      <div className="ps-t" style={{ color: highlight ? "#D97706" : "var(--dk)" }}>
        {title}
        {highlight && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: "#D97706", background: "rgba(245,158,11,.15)", borderRadius: 20, padding: "1px 7px", letterSpacing: ".05em" }}>NEW</span>}
      </div>
      <div className="ps-d">{description}</div>
    </div>
  </div>
);
export default StepCard;
