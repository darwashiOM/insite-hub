const ICONS = {
  // Strategy / advisory
  strategy: <><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></>,
  pilot: <><polygon points="12,3 5,21 12,18 19,21"/></>,
  literacy: <><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></>,
  platform: <><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="6" cy="8" r="0.5" fill="currentColor"/></>,
  content: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/></>,
  lms: <><rect x="3" y="4" width="18" height="14" rx="2"/><line x1="3" y1="20" x2="21" y2="20"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/></>,
  chat: <><path d="M21 12c0 4.5-4 8-9 8a10 10 0 0 1-3.7-.7L3 21l1.7-4.7A8.4 8.4 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"/></>,
  methodology: <><path d="M3 6h18M3 12h18M3 18h12"/><circle cx="20" cy="18" r="2"/></>,
  compliance: <><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></>,
  readiness: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
  // Compliance / risk
  mlr: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="9" y1="8" x2="15" y2="8"/><path d="M9 12l2 2 4-4"/></>,
  governance: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
  infrastructure: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  "org-design": <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="7" x2="12" y2="14"/><line x1="12" y1="14" x2="5" y2="19"/><line x1="12" y1="14" x2="19" y2="19"/></>,
  // Product capability
  agent: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8L7 17M17 7l2.8-2.8"/></>,
  pathway: <><path d="M5 4v16M19 4v16"/><circle cx="5" cy="8" r="1.5"/><circle cx="19" cy="14" r="1.5"/><path d="M5 8 Q12 12 19 14"/></>,
  roleplay: <><circle cx="9" cy="9" r="3"/><circle cx="17" cy="11" r="2.5"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><path d="M14 20c0-2 2-3.5 5-3.5"/></>,
  audit: <><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="9" cy="11" r="1.5"/><line x1="12" y1="11" x2="17" y2="11"/><circle cx="9" cy="15" r="1.5"/><line x1="12" y1="15" x2="17" y2="15"/></>,
  gap: <><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></>,
  remediation: <><path d="M3 12a9 9 0 1 0 9-9"/><polyline points="3 4 3 12 11 12"/></>,
  // Knowledge
  research: <><circle cx="11" cy="11" r="6"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></>,
  framework: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/></>,
  template: <><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="13" y2="8"/><rect x="8" y="11" width="8" height="3"/><line x1="8" y1="17" x2="11" y2="17"/></>,
  checklist: <><polyline points="3 7 5 9 9 5"/><polyline points="3 14 5 16 9 12"/><line x1="12" y1="7" x2="21" y2="7"/><line x1="12" y1="14" x2="21" y2="14"/></>,
  "field-notes": <><path d="M4 4h12a4 4 0 0 1 4 4v13H8a4 4 0 0 1-4-4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></>,
  // News categories
  partnership: <><circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><line x1="11" y1="12" x2="13" y2="12"/></>,
  update: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.7 4.4A9 9 0 0 0 20.5 15"/></>,
  launch: <><path d="M5 16l-2 5 5-2"/><path d="M14.5 5.5L21 12l-9 9-3-3z"/><path d="M14.5 5.5l4-1.5-1.5 4z"/></>,
  award: <><circle cx="12" cy="9" r="6"/><polyline points="9 14 9 21 12 18 15 21 15 14"/></>,
  timeline: <><line x1="3" y1="12" x2="21" y2="12"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></>,
};

export default function Icon({ name, size = 24, color = "currentColor", strokeWidth = 1.8, className, style }) {
  const path = ICONS[name];
  if (!path) {
    if (typeof console !== 'undefined') console.warn(`Icon: unknown name "${name}"`);
    return null;
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
