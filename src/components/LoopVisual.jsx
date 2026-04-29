import { useEffect, useState } from 'react';

const NODES = [
  {
    id: 0,
    label: 'Forge',
    sub: 'Builds MLR-compliant content',
    color: '#993C1D',
    text: '#712B13',
    fill: '#FAECE7',
    x: 40,
    y: 80,
  },
  {
    id: 1,
    label: 'Atlas',
    sub: 'Delivers adaptive learning',
    color: '#185FA5',
    text: '#0C447C',
    fill: '#E6F1FB',
    x: 440,
    y: 80,
  },
  {
    id: 2,
    label: 'Echo',
    sub: 'Assesses in live HCP roleplay',
    color: '#534AB7',
    text: '#3C3489',
    fill: '#EEEDFE',
    x: 440,
    y: 320,
  },
  {
    id: 3,
    label: 'Certify',
    sub: 'Verifies behavioral competency',
    color: '#0F6E56',
    text: '#085041',
    fill: '#E1F5EE',
    x: 40,
    y: 320,
  },
];

const FLOWS = [
  { from: 0, label: 'content published', color: '#5F5E5A', d: 'M 240 120 Q 340 80 440 120', tx: 340, ty: 80, anchor: 'middle' },
  { from: 1, label: 'readiness reached', color: '#5F5E5A', d: 'M 540 160 Q 620 240 540 320', tx: 640, ty: 244, anchor: 'end' },
  { from: 2, label: 'competency demonstrated', color: '#5F5E5A', d: 'M 440 360 Q 340 400 240 360', tx: 340, ty: 424, anchor: 'middle' },
  { from: 3, label: 'gap → rebuild', color: '#993C1D', d: 'M 140 320 Q 60 240 140 160', tx: 40, ty: 244, anchor: 'start', dashed: true },
];

const CALLOUTS = [
  'AI agents generate MLR-compliant content from your PI, CSRs, and brand assets, with every claim cited automatically.',
  'Adaptive learning pathways deliver competency-targeted content and close knowledge gaps before reps reach the field.',
  'Live HCP roleplay assesses readiness with real-time compliance monitoring and behavioral scoring against benchmarks.',
  'Competency-gated certification verifies demonstrated field readiness. Gaps automatically trigger Forge to rebuild.',
];

export default function LoopVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive(current => (current + 1) % NODES.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const activeNode = NODES[active];

  return (
    <div className="loop-card">
      <style>{`
        @keyframes loopDash { to { stroke-dashoffset: -22; } }
        .loop-active-flow { animation: loopDash 0.8s linear infinite; }
      `}</style>
      <div className="lc-label">The Closed Loop · Intelligent Capability Development</div>
      <svg viewBox="0 0 680 480" role="img" aria-labelledby="loop-title loop-desc" className="loop-oval-svg">
        <title id="loop-title">InsiteHub closed-loop diagram</title>
        <desc id="loop-desc">Four-product oval cycle showing Forge building content, Atlas delivering learning, Echo assessing readiness, and Certify verifying competency.</desc>
        <defs>
          {FLOWS.map(flow => (
            <marker key={flow.from} id={`loop-arrow-${flow.from}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke={flow.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          ))}
          {NODES.map(node => (
            <filter key={node.id} id={`loop-glow-${node.id}`} x="-25%" y="-60%" width="150%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feFlood floodColor={node.color} floodOpacity="0.18" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        <ellipse cx="340" cy="240" rx="280" ry="180" fill="none" stroke="#B4B2A9" strokeWidth="0.5" strokeDasharray="3 4" />
        <text x="340" y="228" textAnchor="middle" dominantBaseline="central" className="loop-center-text">Intelligent Capability</text>
        <text x="340" y="252" textAnchor="middle" dominantBaseline="central" className="loop-center-text">Development</text>

        {FLOWS.map(flow => {
          const isActive = active === flow.from;
          return (
            <g key={flow.from}>
              <path
                d={flow.d}
                fill="none"
                stroke={flow.color}
                strokeWidth={isActive ? 2.2 : 1}
                strokeOpacity={isActive ? 0.9 : 0.5}
                strokeDasharray={flow.dashed || isActive ? '4 4' : undefined}
                className={isActive ? 'loop-active-flow' : undefined}
                markerEnd={`url(#loop-arrow-${flow.from})`}
              />
              <text
                x={flow.tx}
                y={flow.ty}
                textAnchor={flow.anchor}
                fill={isActive ? activeNode.color : '#3D3D3A'}
                className={isActive ? 'loop-flow-label loop-flow-label-active' : 'loop-flow-label'}
              >
                {flow.label}
              </text>
            </g>
          );
        })}

        {NODES.map(node => {
          const isActive = active === node.id;
          return (
            <g key={node.id} onClick={() => setActive(node.id)} className="loop-node" filter={isActive ? `url(#loop-glow-${node.id})` : undefined}>
              <rect
                x={node.x}
                y={node.y}
                width="200"
                height="80"
                rx="12"
                fill={node.fill}
                stroke={node.color}
                strokeWidth={isActive ? 2.4 : 0.7}
              />
              <rect
                x={node.x + 7}
                y={node.y + 7}
                width="186"
                height="66"
                rx="9"
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                strokeOpacity={isActive ? 0.24 : 0}
              />
              <text x={node.x + 100} y={node.y + 32} textAnchor="middle" dominantBaseline="central" fill={node.text} className="loop-node-title">{node.label}</text>
              <text x={node.x + 100} y={node.y + 56} textAnchor="middle" dominantBaseline="central" fill={node.color} className="loop-node-sub">{node.sub}</text>
            </g>
          );
        })}
      </svg>

      <div className="lc-callout" style={{ background: activeNode.fill, border: `1px solid ${activeNode.color}25` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: activeNode.color, marginBottom: 4, fontFamily: 'Manrope,sans-serif' }}>{activeNode.label} is active</div>
        <div style={{ fontSize: 12, color: 'var(--bd)', lineHeight: 1.55 }}>{CALLOUTS[active]}</div>
      </div>
      <div className="lc-dots">
        {NODES.map(node => (
          <div
            key={node.id}
            className="lc-dot"
            style={{ width: active === node.id ? 22 : 6, background: active === node.id ? activeNode.color : 'var(--br)' }}
            onClick={() => setActive(node.id)}
          />
        ))}
      </div>
    </div>
  );
}
