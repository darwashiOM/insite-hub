const AnnouncementBand = ({ icon = "🎓", tag = "New", tagColor = "#D97706", title, description, primaryCta, secondaryCta }) => (
  <div style={{
    background: "linear-gradient(135deg,#FFFBF0 0%,#FFF5E0 100%)",
    borderTop: "1px solid rgba(245,158,11,.15)",
    borderBottom: "1px solid rgba(245,158,11,.15)",
    padding: "32px 56px",
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(245,158,11,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{icon}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: tagColor, background: "rgba(245,158,11,.15)", borderRadius: 20, padding: "2px 9px", letterSpacing: ".06em", textTransform: "uppercase" }}>{tag}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--dk)", fontFamily: "Manrope,sans-serif", letterSpacing: "-.025em", marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 13, color: "var(--bd)" }}>{description}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        {primaryCta && <button onClick={primaryCta.onClick} style={{ padding: "11px 24px", borderRadius: 10, background: "#D97706", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap" }}>{primaryCta.label}</button>}
        {secondaryCta && <button onClick={secondaryCta.onClick} style={{ padding: "11px 24px", borderRadius: 10, background: "none", border: "1.5px solid rgba(245,158,11,.4)", color: "#D97706", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap" }}>{secondaryCta.label}</button>}
      </div>
    </div>
  </div>
);

export default AnnouncementBand;
