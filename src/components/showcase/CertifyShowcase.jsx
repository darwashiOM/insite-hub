const COMPETENCIES = [
  'Mechanism of Action — verified Echo session #2841',
  'Clinical Data — verified Echo session #2856',
  'Objection Handling — verified Echo session #2879',
  'MLR Compliance — 100% across 12 sessions',
  'Manager observation — passed (8 of 8 criteria)',
];

export default function CertifyShowcase() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #FAFBFD 0%, #F2F4F8 100%)', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Certify · Audit Record</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Certification of Field Readiness</div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18 }}>✓</div>
      </div>
      <div style={{ padding: 24, flex: 1 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Issued To</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#12141A' }}>Sarah Chen, Oncology Specialist</div>
          <div style={{ fontSize: 12, color: '#5C6370', marginTop: 2 }}>Pfizer · Northeast Region · Cohort A26-04</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Behavioral Evidence (5 of 5 verified)</div>
          {COMPETENCIES.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#12141A', marginBottom: 4 }}>
              <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: '10px 14px', background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8 }}>
            <div style={{ fontSize: 9, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Issued</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#12141A' }}>Apr 12, 2026</div>
          </div>
          <div style={{ padding: '10px 14px', background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8 }}>
            <div style={{ fontSize: 9, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Valid Through</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#12141A' }}>Apr 12, 2027</div>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 10, background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5C6370', wordBreak: 'break-all' }}>
          <div style={{ fontSize: 9, color: '#059669', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>SHA-256 Audit Hash</div>
          a3f9c2b8e1d47f6c5a82b9e3d1c4f7a8b2e6d9c1f4a7b3e8d2c5f9a1b4e7c3d
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 9.5, padding: '4px 10px', borderRadius: 12, background: 'rgba(5,150,105,.08)', color: '#059669', fontWeight: 700, letterSpacing: '0.05em' }}>SOC 2 Type II</span>
          <span style={{ fontSize: 9.5, padding: '4px 10px', borderRadius: 12, background: 'rgba(5,150,105,.08)', color: '#059669', fontWeight: 700, letterSpacing: '0.05em' }}>10-yr retention</span>
        </div>
      </div>
    </div>
  );
}
