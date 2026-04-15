const SituationCard = ({ icon, title, description }) => (
  <div className="ac" style={{ background: "var(--wh)" }}>
    <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
    <div className="ac-t" style={{ fontSize: 15 }}>{title}</div>
    <div className="ac-d">{description}</div>
  </div>
);
export default SituationCard;
