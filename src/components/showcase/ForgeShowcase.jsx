const SOURCE_DOCS = [
  { label: 'Prescribing Information', detail: 'PI sections 5.1, 6.2, 8.4', status: 'Indexed' },
  { label: 'Clinical Study Report', detail: 'CSR efficacy + safety tables', status: 'Cited' },
  { label: 'Brand Message Map', detail: 'Approved launch narrative', status: 'Mapped' },
];

const MODULE_SECTIONS = [
  { title: 'Module 01 · Disease State Context', claims: 18, citations: 18 },
  { title: 'Module 02 · MOA + Clinical Data', claims: 42, citations: 42 },
  { title: 'Module 03 · Safety Conversation', claims: 27, citations: 27 },
];

const MLR_CHECKS = [
  'Every claim tied to source',
  'No unsupported superlatives',
  'Required safety language present',
  'Veeva routing package ready',
];

export default function ForgeShowcase() {
  return (
    <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #E3E5EA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#F4801F', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Forge · Content Workspace</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#12141A' }}>Oncology Launch Training Draft</div>
        </div>
        <div style={{ fontSize: 10, color: '#F4801F', fontWeight: 700, padding: '5px 10px', borderRadius: 12, background: 'rgba(244,128,31,.08)' }}>MLR READY</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 14, padding: 16, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 14, border: '1px solid #E3E5EA', borderRadius: 10, background: '#FAFBFD' }}>
            <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Source Package</div>
            {SOURCE_DOCS.map(doc => (
              <div key={doc.label} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #E8EAF0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#12141A' }}>{doc.label}</span>
                  <span style={{ fontSize: 9.5, color: '#059669', fontWeight: 700 }}>{doc.status}</span>
                </div>
                <div style={{ fontSize: 11, color: '#5C6370', lineHeight: 1.35 }}>{doc.detail}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ padding: '9px 10px', background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8 }}>
                <div style={{ fontSize: 18, fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: '#F4801F', lineHeight: 1 }}>87</div>
                <div style={{ fontSize: 9.5, color: '#5C6370', marginTop: 3 }}>claims found</div>
              </div>
              <div style={{ padding: '9px 10px', background: '#fff', border: '1px solid #E3E5EA', borderRadius: 8 }}>
                <div style={{ fontSize: 18, fontFamily: 'Manrope, sans-serif', fontWeight: 900, color: '#059669', lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: 9.5, color: '#5C6370', marginTop: 3 }}>cited</div>
              </div>
            </div>
          </div>

          <div style={{ padding: 12, background: 'rgba(244,128,31,.06)', border: '1px solid rgba(244,128,31,.22)', borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: '#9A4C13', fontWeight: 700, marginBottom: 4 }}>Draft status</div>
            <div style={{ height: 5, background: 'rgba(244,128,31,.18)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: '92%', height: '100%', background: '#F4801F' }} />
            </div>
            <div style={{ fontSize: 11, color: '#92400E' }}>3 modules generated · reviewer handoff queued</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: 14, border: '1px solid #E3E5EA', borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Generated Training Outline</div>
              <div style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>0 MLR flags</div>
            </div>
            {MODULE_SECTIONS.map(section => (
              <div key={section.title} style={{ padding: '10px 0', borderTop: '1px solid #EEF0F4' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#12141A', marginBottom: 5 }}>{section.title}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, color: '#5C6370', background: '#F4F6F8', padding: '4px 8px', borderRadius: 12 }}>{section.claims} claims</span>
                  <span style={{ fontSize: 10, color: '#059669', background: 'rgba(5,150,105,.08)', padding: '4px 8px', borderRadius: 12 }}>✓ {section.citations} citations</span>
                  <span style={{ fontSize: 10, color: '#F4801F', background: 'rgba(244,128,31,.08)', padding: '4px 8px', borderRadius: 12 }}>MLR pre-check</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 14, background: '#FAFBFD', border: '1px solid #E3E5EA', borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: '#5C6370', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 9 }}>MLR Readiness</div>
            {MLR_CHECKS.map(check => (
              <div key={check} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 11.5, color: '#12141A', marginBottom: 6 }}>
                <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
