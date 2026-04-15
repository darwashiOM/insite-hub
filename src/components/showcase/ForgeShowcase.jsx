const LOG_LINES = [
  { time: '12:01:04', icon: '▸', text: 'Loading PI for Lumeris® XR (oncology indication)', state: 'progress' },
  { time: '12:01:08', icon: '✓', text: 'Found 247 claims in source documents', state: 'success' },
  { time: '12:01:11', icon: '▸', text: 'Generating MLR-ready content draft', state: 'progress' },
  { time: '12:01:18', icon: '✓', text: 'All 247 claims cited to PI sections 5.1, 6.2, 8.4', state: 'success' },
  { time: '12:01:21', icon: '▸', text: 'Running ComplianceGuard pre-check', state: 'progress' },
  { time: '12:01:23', icon: '✓', text: '0 issues — content ready for MLR routing', state: 'success' },
  { time: '12:01:25', icon: '▸', text: 'Routing to Veeva PromoMats workflow', state: 'progress' },
  { time: '12:01:27', icon: '⬤', text: 'Done · Artifact ID: FRG-2841-A', state: 'done' },
];

export default function ForgeShowcase() {
  return (
    <div style={{ background: '#0F1118', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#161A24', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div style={{ marginLeft: 8, color: 'rgba(255,255,255,.45)', fontSize: 11, fontFamily: '"JetBrains Mono", monospace' }}>Forge Agent · Session #2841 · Running</div>
        <div style={{ marginLeft: 'auto', color: '#F4801F', fontSize: 10, fontWeight: 600 }}>● LIVE</div>
      </div>
      <div style={{ padding: 16, fontFamily: '"JetBrains Mono", "Menlo", monospace', fontSize: 11.5, lineHeight: 1.8, color: 'rgba(255,255,255,.75)', flex: 1 }}>
        {LOG_LINES.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: 'rgba(255,255,255,.3)', minWidth: 60 }}>{l.time}</span>
            <span style={{ color: l.state === 'success' ? '#34D399' : l.state === 'done' ? '#F4801F' : 'rgba(255,255,255,.5)', minWidth: 14 }}>{l.icon}</span>
            <span>{l.text}</span>
          </div>
        ))}
        <div style={{ marginTop: 14, padding: 12, background: 'rgba(244,128,31,.08)', border: '1px solid rgba(244,128,31,.2)', borderRadius: 8, fontFamily: '"DM Sans", sans-serif', fontSize: 12, color: '#F4801F' }}>
          → 3 artifacts ready for MLR review. Click to view in Veeva PromoMats.
        </div>
      </div>
    </div>
  );
}
