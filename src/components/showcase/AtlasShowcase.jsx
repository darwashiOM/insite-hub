const COMPETENCIES = [
  { label: 'Mechanism of Action', pct: 88, color: '#34D399' },
  { label: 'Clinical Data',        pct: 74, color: '#34D399' },
  { label: 'Objection Handling',   pct: 41, color: '#F59E0B', alert: true },
  { label: 'Compliance',           pct: 96, color: '#34D399' },
];

export default function AtlasShowcase() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#007AFF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Atlas · Rep Pathway</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Sarah Chen · Oncology Onboarding</div>
        </div>
        <div style={{ fontSize: 10, color: '#5C6370' }}>Week 6 of 12</div>
      </div>
      <div style={{ padding: 18, flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#5C6370', marginBottom: 8 }}>COMPETENCY READINESS</div>
          {COMPETENCIES.map(c => (
            <div key={c.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: '#12141A', fontWeight: 500 }}>{c.label} {c.alert && <span style={{ color: '#F59E0B', marginLeft: 4 }}>● gap detected</span>}</span>
                <span style={{ color: '#5C6370', fontWeight: 600 }}>{c.pct}%</span>
              </div>
              <div style={{ height: 4, background: '#E3E5EA', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: c.pct + '%', height: '100%', background: c.color }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 12, background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.25)', borderRadius: 8, fontSize: 11.5, color: '#92400E', marginBottom: 12 }}>
          ⚠ Gap detected in Objection Handling. Adaptive remediation queued.
        </div>
        <div style={{ padding: 12, background: 'rgba(0,122,255,.05)', border: '1px solid rgba(0,122,255,.2)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#007AFF' }}>
          Predicted readiness in 2 weeks: <span style={{ fontSize: 14 }}>92%</span>
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(124,58,237,.06)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 8, fontSize: 11.5, color: '#7C3AED', fontWeight: 600 }}>
          🎭 Echo assessment unlocked
        </div>
      </div>
    </div>
  );
}
