const TRANSCRIPT = [
  { who: 'rep', text: 'Lumeris has shown a 40% reduction in disease progression compared to standard of care.', flag: { type: 'warn', text: 'Claim not in PI for monotherapy use. Did you mean "in combination therapy"?' } },
  { who: 'rep', text: 'Apologies — in combination with bortezomib, the data shows a 38% reduction in PFS.', flag: { type: 'ok', text: 'Approved phrasing — citation matches PI section 5.1' } },
  { who: 'hcp', text: 'What about safety in elderly patients?' },
];

const SCORES = [
  { label: 'Clinical Accuracy', value: 88 },
  { label: 'Compliance',        value: 100 },
  { label: 'Objection Handling', value: 72 },
];

export default function EchoShowcase() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Echo · HCP Roleplay</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Dr. Kim · Hematologist · Live Session</div>
        </div>
        <div style={{ fontSize: 10, color: '#7C3AED', fontWeight: 600 }}>● RECORDING</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', flex: 1 }}>
        <div style={{ background: 'linear-gradient(180deg, #2A1845, #1A0F2E)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #4C1D95)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 22 }}>DK</div>
        </div>
        <div style={{ padding: 14, fontSize: 12, lineHeight: 1.55 }}>
          {TRANSCRIPT.map((t, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 700, color: t.who === 'rep' ? '#007AFF' : '#7C3AED', fontSize: 11, marginBottom: 2 }}>{t.who === 'rep' ? 'You' : 'Dr. Kim'}</div>
              <div style={{ color: '#12141A' }}>{t.text}</div>
              {t.flag && (
                <div style={{ marginTop: 4, padding: '6px 10px', borderRadius: 6, fontSize: 11, background: t.flag.type === 'warn' ? 'rgba(245,158,11,.1)' : 'rgba(5,150,105,.08)', color: t.flag.type === 'warn' ? '#92400E' : '#047857', borderLeft: `2px solid ${t.flag.type === 'warn' ? '#F59E0B' : '#059669'}` }}>
                  {t.flag.type === 'warn' ? '⚠ ComplianceGuard: ' : '✓ ComplianceGuard: '}{t.flag.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 14px', borderTop: '1px solid #E3E5EA', background: '#F9FAFB', display: 'flex', gap: 14 }}>
        {SCORES.map(s => (
          <div key={s.label} style={{ flex: 1 }}>
            <div style={{ fontSize: 9.5, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            <div style={{ fontSize: 18, fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: s.value >= 85 ? '#059669' : s.value >= 70 ? '#F59E0B' : '#DC2626' }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
