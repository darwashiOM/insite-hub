import { HexMark } from '../HexMark';

const NODES = [
  { x: 100, y: 30,  c: "#F4801F", bg: "rgba(244,128,31,.1)", name: "Forge",   sub: "Builds content",       ss: "Courses · Inserts · SOPs" },
  { x: 448, y: 30,  c: "#007AFF", bg: "rgba(0,122,255,.1)",  name: "Atlas",   sub: "Delivers learning",    ss: "Adaptive · Gap-aware" },
  { x: 448, y: 200, c: "#7C3AED", bg: "rgba(124,58,237,.1)", name: "Echo",    sub: "Assesses in roleplay", ss: "HCP avatars · Scoring" },
  { x: 100, y: 200, c: "#059669", bg: "rgba(5,150,105,.1)",  name: "Certify", sub: "Confirms readiness",   ss: "Behavioral proof" },
];

const ARROWS = [
  { d: "M240 62 Q350 18 460 62",   c: "#F4801F", m: "af", lx: 350, ly: 22,  t: "content published" },
  { d: "M548 100 Q594 150 548 200", c: "#007AFF", m: "aa", lx: 638, ly: 154, t: "readiness reached" },
  { d: "M460 238 Q350 282 240 238", c: "#7C3AED", m: "ae", lx: 350, ly: 294, t: "competency demonstrated" },
  { d: "M152 200 Q106 150 152 100", c: "#059669", m: "ac", lx: 56,  ly: 150, t: "gap → rebuild" },
];

export default function ClosedLoopDiagram({ eyebrow = "The Closed Loop", heading = "Build → Develop → Assess → Certify → Repeat", lead = "A continuous cycle. Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps detected restart the loop automatically." }) {
  return (
    <section className="section section-light">
      <div className="mw">
        <div className="closed-loop-diagram">
          <div className="closed-loop-watermark">
            <HexMark size={420} color="#F4801F" strokeWidth={0.7} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              {eyebrow && <div className="t-eyebrow closed-loop-eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
              {heading && <h3 className="closed-loop-heading">{heading}</h3>}
              {lead && <p className="closed-loop-lead">{lead}</p>}
            </div>
            <svg width="100%" viewBox="0 0 700 300" style={{ maxWidth: 680, display: "block", margin: "0 auto" }}>
              <defs>
                {ARROWS.map(a => (
                  <marker key={a.m} id={a.m} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M1 1L9 5L1 9" fill="none" stroke={a.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                ))}
              </defs>
              {ARROWS.map((a, i) => (
                <g key={i}>
                  <path d={a.d} fill="none" stroke={a.c} strokeWidth="1.5" strokeOpacity=".5" markerEnd={`url(#${a.m})`} />
                  <text x={a.lx} y={a.ly} textAnchor="middle" style={{ fontSize: 10, fill: a.c, opacity: .75, fontFamily: "DM Sans,sans-serif" }}>{a.t}</text>
                </g>
              ))}
              {NODES.map(nd => (
                <g key={nd.name}>
                  <rect x={nd.x} y={nd.y} width={148} height={68} rx="11" fill={nd.bg} stroke={nd.c} strokeWidth="1" strokeOpacity=".45" />
                  <text x={nd.x + 74} y={nd.y + 24} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: nd.c, fontFamily: "Manrope,sans-serif" }}>{nd.name}</text>
                  <text x={nd.x + 74} y={nd.y + 41} textAnchor="middle" style={{ fontSize: 11, fill: "rgba(255,255,255,.6)", fontFamily: "DM Sans,sans-serif" }}>{nd.sub}</text>
                  <text x={nd.x + 74} y={nd.y + 56} textAnchor="middle" style={{ fontSize: 9.5, fill: "rgba(255,255,255,.32)", fontFamily: "DM Sans,sans-serif" }}>{nd.ss}</text>
                </g>
              ))}
              {["INTELLIGENT", "CAPABILITY", "DEVELOPMENT"].map((w, i) => (
                <text key={w} x="350" y={138 + i * 15} textAnchor="middle" style={{ fontSize: 9, fill: "rgba(255,255,255,.18)", letterSpacing: ".1em", fontFamily: "Manrope,sans-serif" }}>{w}</text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
