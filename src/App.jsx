import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   INSITEHUB · v4
   Typography: Manrope (headings) + DM Sans (body)
   Colors: #F4801F orange · #939BA1 steel · #007AFF blue
   Mark: 4-hex cluster, outline only, orange
───────────────────────────────────────────────────────────────────────────── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --o:  #F4801F;  --o10: rgba(244,128,31,.09); --o20: rgba(244,128,31,.18); --og: rgba(244,128,31,.28);
    --st: #939BA1;
    --bl: #007AFF;  --bl10: rgba(0,122,255,.09);
    --dk: #12141A;  --dk2: #1A1D25;  --dk3: #222630;
    --bd: #5C6370;  --bdl: #8B919A;
    --lt: #F5F6F8;  --lt2: #ECEDF0;
    --br: #E3E5EA;  --brk: rgba(255,255,255,.07);
    --wh: #FFFFFF;  --tx: #12141A;
  }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; background:var(--wh); color:var(--tx); overflow-x:hidden; -webkit-font-smoothing:antialiased; }
  h1,h2,h3,h4 { font-family:'Manrope',sans-serif; }

  /* ── NAV ────────────────────────────────────────── */
  .nav {
    position:fixed; inset:0 0 auto; z-index:300; height:68px;
    display:flex; align-items:center; justify-content:space-between; padding:0 56px;
    background:rgba(255,255,255,.97); backdrop-filter:blur(20px);
    border-bottom:1px solid var(--br); transition:box-shadow .3s;
  }
  .nav.up { box-shadow:0 2px 28px rgba(0,0,0,.06); }
  .nav-logo { display:flex; align-items:center; gap:12px; cursor:pointer; user-select:none; }
  .nav-wm { font-family:'Manrope',sans-serif; font-size:19px; font-weight:800; letter-spacing:-.04em; color:var(--dk); }
  .nav-wm b { color:var(--o); font-weight:800; }
  .nav-links { display:flex; gap:2px; }
  .nl { font-size:13.5px; font-weight:500; color:var(--bd); cursor:pointer; padding:7px 13px; border-radius:8px; border:none; background:none; font-family:'DM Sans',sans-serif; transition:all .15s; }
  .nl:hover { color:var(--tx); background:var(--lt); }
  .nl.on { color:var(--o); }
  .nav-right { display:flex; gap:10px; align-items:center; }
  .ng { font-size:13px; font-weight:500; color:var(--bd); cursor:pointer; padding:8px 18px; border-radius:8px; border:1px solid var(--br); background:none; font-family:'DM Sans',sans-serif; transition:all .15s; }
  .ng:hover { border-color:var(--o); color:var(--o); }
  .no { font-size:13px; font-weight:700; color:#fff; cursor:pointer; padding:9px 22px; border-radius:8px; border:none; background:var(--o); font-family:'DM Sans',sans-serif; transition:all .15s; letter-spacing:.01em; }
  .no:hover { background:#D96A0A; box-shadow:0 4px 20px var(--og); transform:translateY(-1px); }

  /* ── BUTTONS ─────────────────────────────────────── */
  .bp { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:700; color:#fff; cursor:pointer; padding:14px 32px; border-radius:11px; border:none; background:var(--o); transition:all .2s; letter-spacing:.01em; }
  .bp:hover { background:#D96A0A; transform:translateY(-2px); box-shadow:0 14px 32px var(--og); }
  .bs { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; color:var(--tx); cursor:pointer; padding:14px 30px; border-radius:11px; border:1.5px solid var(--br); background:var(--wh); transition:all .2s; }
  .bs:hover { border-color:var(--o); color:var(--o); background:var(--o10); }
  .bt { display:inline-flex; align-items:center; gap:6px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; color:var(--bd); cursor:pointer; padding:8px 0; border:none; background:none; transition:color .15s; }
  .bt:hover { color:var(--tx); }
  .bt-wt { display:inline-flex; align-items:center; gap:6px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; color:rgba(255,255,255,.5); cursor:pointer; padding:14px 28px; border-radius:11px; border:1.5px solid rgba(255,255,255,.14); background:none; transition:all .2s; }
  .bt-wt:hover { color:rgba(255,255,255,.85); border-color:rgba(255,255,255,.3); }

  /* ── HERO ────────────────────────────────────────── */
  .hero {
    min-height:100vh; display:flex; align-items:center; justify-content:center;
    padding:100px 56px 80px; position:relative; overflow:hidden;
    background:linear-gradient(160deg, #FEFEFE 0%, #F9FAFB 55%, #F4F6FF 100%);
  }
  .hero::before {
    content:''; position:absolute; top:-180px; right:-180px;
    width:760px; height:760px; border-radius:50%;
    background:radial-gradient(ellipse, rgba(244,128,31,.07) 0%, transparent 62%);
    pointer-events:none;
  }
  .hero::after {
    content:''; position:absolute; bottom:-140px; left:-140px;
    width:580px; height:580px; border-radius:50%;
    background:radial-gradient(ellipse, rgba(0,122,255,.05) 0%, transparent 65%);
    pointer-events:none;
  }
  .hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; max-width:1200px; width:100%; position:relative; z-index:1; }
  .hero-pill { display:inline-flex; align-items:center; gap:8px; background:var(--o10); border:1px solid var(--o20); border-radius:100px; padding:5px 15px; font-size:11px; font-weight:700; color:var(--o); letter-spacing:.08em; text-transform:uppercase; margin-bottom:22px; }
  .hpd { width:6px; height:6px; border-radius:50%; background:var(--o); animation:hpulse 2s ease-in-out infinite; }
  @keyframes hpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
  .hero-h1 { font-size:clamp(40px,5.2vw,68px); font-weight:900; line-height:1.05; letter-spacing:-.045em; color:var(--dk); margin-bottom:20px; }
  .hero-h1 em { font-style:normal; color:var(--o); }
  .hero-p { font-size:18px; color:var(--bd); line-height:1.72; max-width:480px; margin-bottom:36px; font-weight:400; }
  .hero-actions { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:44px; }
  .hero-social { display:flex; align-items:center; gap:12px; }
  .hs-label { font-size:12px; color:var(--bdl); white-space:nowrap; }
  .hs-logos { display:flex; gap:18px; flex-wrap:wrap; }
  .hs-co { font-size:11px; font-weight:800; color:var(--bdl); letter-spacing:.04em; text-transform:uppercase; opacity:.55; }

  /* ── LOOP VISUAL ─────────────────────────────────── */
  .loop-card { background:var(--wh); border:1px solid var(--br); border-radius:24px; padding:32px; box-shadow:0 28px 72px rgba(0,0,0,.07),0 4px 16px rgba(0,0,0,.03); position:relative; overflow:hidden; }
  .loop-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#F4801F,#007AFF,#7C3AED,#059669); border-radius:24px 24px 0 0; }
  .lc-label { font-size:10px; letter-spacing:.15em; text-transform:uppercase; font-weight:700; color:var(--st); margin-bottom:24px; }
  .lc-callout { border-radius:12px; padding:14px 16px; transition:all .4s; margin-top:20px; }
  .lc-dots { display:flex; justify-content:center; gap:7px; margin-top:18px; }
  .lc-dot { height:5px; border-radius:3px; transition:all .35s; cursor:pointer; }

  /* ── LOGO BAND ───────────────────────────────────── */
  .logo-band { background:var(--wh); border-top:1px solid var(--br); border-bottom:1px solid var(--br); padding:28px 56px; }
  .lb-label { font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--bdl); text-align:center; margin-bottom:18px; }
  .lb-row { display:flex; gap:36px; align-items:center; justify-content:center; flex-wrap:wrap; }
  .lb-co { font-size:12px; font-weight:800; color:var(--bdl); text-transform:uppercase; letter-spacing:.04em; opacity:.5; transition:opacity .2s; cursor:default; }
  .lb-co:hover { opacity:.85; }

  /* ── STATS BAND ──────────────────────────────────── */
  .stats { background:var(--dk); padding:60px 56px; }
  .stats-row { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
  .st { padding:0 44px; border-right:1px solid var(--brk); }
  .st:first-child { padding-left:0; }
  .st:last-child { border-right:none; }
  .st-n { font-family:'Manrope',sans-serif; font-size:42px; font-weight:900; color:var(--o); letter-spacing:-.05em; line-height:1; margin-bottom:8px; }
  .st-l { font-size:13px; color:rgba(255,255,255,.38); line-height:1.55; }

  /* ── GENERIC SECTION ─────────────────────────────── */
  .sec { padding:100px 56px; }
  .sw { background:var(--wh); }
  .sl { background:var(--lt); }
  .sd { background:var(--dk); }
  .sd2 { background:var(--dk2); }
  .mw { max-width:1200px; margin:0 auto; }
  .ey { font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--o); font-weight:700; margin-bottom:11px; }
  .ey-wt { font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--o); font-weight:700; margin-bottom:11px; }
  .h2 { font-size:clamp(26px,3.4vw,42px); font-weight:800; letter-spacing:-.04em; color:var(--dk); line-height:1.16; margin-bottom:16px; }
  .h2-wt { font-size:clamp(26px,3.4vw,42px); font-weight:800; letter-spacing:-.04em; color:var(--wh); line-height:1.16; margin-bottom:16px; }
  .lead { font-size:16.5px; color:var(--bd); line-height:1.72; max-width:580px; }
  .lead-wt { font-size:16.5px; color:rgba(255,255,255,.42); line-height:1.72; max-width:580px; }
  .sh { margin-bottom:52px; }
  .sec-cta { display:flex; align-items:center; gap:14px; margin-top:44px; flex-wrap:wrap; }

  /* ── PRODUCT CARDS ───────────────────────────────── */
  .pg { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .pc { background:var(--wh); border:1.5px solid var(--br); border-radius:20px; padding:32px; position:relative; overflow:hidden; transition:all .25s; cursor:pointer; }
  .pc:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,.08); border-color:transparent; }
  .pc-bar { position:absolute; top:0; left:0; right:0; height:2.5px; border-radius:20px 20px 0 0; }
  .pc-gl { position:absolute; width:200px; height:200px; border-radius:50%; filter:blur(56px); top:-70px; right:-50px; pointer-events:none; opacity:.1; }
  .pc-ir { display:flex; align-items:center; gap:14px; margin-bottom:18px; margin-top:10px; }
  .pc-ic { width:50px; height:50px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
  .pc-nm { font-size:20px; font-weight:800; color:var(--dk); letter-spacing:-.03em; }
  .pc-tg { font-size:12px; color:var(--st); margin-top:2px; }
  .pc-ds { font-size:14px; color:var(--bd); line-height:1.68; margin-bottom:22px; }
  .pc-bl { display:flex; flex-direction:column; gap:9px; }
  .pc-bi { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:var(--bd); line-height:1.4; }
  .pbd { width:5px; height:5px; border-radius:50%; flex-shrink:0; margin-top:6px; }

  /* ── DIFF CARDS ──────────────────────────────────── */
  .dg { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .dc { background:var(--wh); border:1.5px solid var(--br); border-radius:18px; padding:34px; transition:all .2s; }
  .dc:hover { border-color:var(--o); box-shadow:0 10px 32px rgba(244,128,31,.07); }
  .dc-n { font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:var(--o); font-weight:700; margin-bottom:14px; }
  .dc-t { font-size:21px; font-weight:800; color:var(--dk); letter-spacing:-.035em; margin-bottom:12px; line-height:1.2; }
  .dc-b { font-size:14px; color:var(--bd); line-height:1.72; margin-bottom:18px; }
  .dc-q { font-size:13.5px; font-style:italic; color:var(--o); border-left:2.5px solid var(--o20); padding-left:14px; line-height:1.55; }

  /* ── ADVISORY ENGAGEMENTS ────────────────────────── */
  .ag { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
  .ac { background:var(--wh); border:1.5px solid var(--br); border-radius:16px; padding:28px; transition:all .2s; position:relative; overflow:hidden; }
  .ac::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--o); transform:scaleX(0); transform-origin:left; transition:transform .3s; }
  .ac:hover { border-color:var(--o20); box-shadow:0 8px 28px rgba(244,128,31,.07); }
  .ac:hover::after { transform:scaleX(1); }
  .ac-n { font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--o); font-weight:700; margin-bottom:10px; }
  .ac-t { font-size:17px; font-weight:700; color:var(--dk); margin-bottom:10px; line-height:1.3; }
  .ac-d { font-size:13px; color:var(--bd); line-height:1.62; }

  /* ── FEATURE CARDS ───────────────────────────────── */
  .fc { background:rgba(255,255,255,.04); border:1px solid var(--brk); border-radius:16px; padding:26px; transition:all .2s; }
  .fc:hover { border-color:rgba(244,128,31,.3); background:rgba(244,128,31,.03); }
  .fc-ic { width:44px; height:44px; border-radius:11px; background:var(--o10); display:flex; align-items:center; justify-content:center; font-size:19px; margin-bottom:14px; }
  .fc-t { font-size:15px; font-weight:700; color:var(--wh); margin-bottom:8px; }
  .fc-d { font-size:13px; color:rgba(255,255,255,.4); line-height:1.6; }

  /* ── QUOTE BLOCK ─────────────────────────────────── */
  .qb { background:var(--wh); border-left:3px solid var(--o); border-radius:0 14px 14px 0; padding:24px 28px; border-top:1px solid var(--br); border-bottom:1px solid var(--br); border-right:1px solid var(--br); }
  .qb-t { font-size:15.5px; color:var(--bd); line-height:1.72; font-style:italic; margin-bottom:12px; }
  .qb-src { font-size:12px; font-weight:700; color:var(--o); letter-spacing:.04em; text-transform:uppercase; }

  /* ── INLINE CTA BANNER ───────────────────────────── */
  .cta-bar { background:linear-gradient(135deg,var(--o) 0%,#E06B0A 100%); border-radius:20px; padding:40px 48px; display:flex; align-items:center; justify-content:space-between; gap:32px; margin:0; }
  .cta-bar-t { font-size:22px; font-weight:800; color:#fff; letter-spacing:-.025em; line-height:1.25; }
  .cta-bar-s { font-size:14px; color:rgba(255,255,255,.75); margin-top:6px; line-height:1.55; }
  .cta-bar-btn { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; color:var(--o); cursor:pointer; padding:12px 26px; border-radius:10px; border:none; background:#fff; transition:all .2s; white-space:nowrap; flex-shrink:0; }
  .cta-bar-btn:hover { background:#FFF5ED; transform:translateY(-1px); box-shadow:0 8px 20px rgba(0,0,0,.12); }

  /* ── FULL CTA ─────────────────────────────────────── */
  .cta-full { background:linear-gradient(140deg,var(--dk) 0%,#1C1208 100%); padding:120px 56px; text-align:center; position:relative; overflow:hidden; }
  .cta-full::before { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:900px; height:900px; border-radius:50%; background:radial-gradient(circle,rgba(244,128,31,.13) 0%,transparent 68%); pointer-events:none; }
  .cf-h { font-size:clamp(32px,5vw,58px); font-weight:900; letter-spacing:-.045em; color:var(--wh); line-height:1.06; margin-bottom:18px; }
  .cf-h em { font-style:normal; color:var(--o); }
  .cf-p { font-size:17px; color:rgba(255,255,255,.42); line-height:1.7; max-width:520px; margin:0 auto 40px; }
  .cf-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

  /* ── PAGE HERO ───────────────────────────────────── */
  .ph { padding:148px 56px 80px; background:linear-gradient(160deg,#FEFEFE 0%,#F9FAFA 60%,#F3F5FF 100%); position:relative; overflow:hidden; }
  .ph-dk { padding:148px 56px 80px; background:var(--dk); position:relative; overflow:hidden; }
  .pbadge { display:inline-flex; align-items:center; gap:7px; border-radius:100px; padding:5px 14px; margin-bottom:18px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
  .ph1 { font-size:clamp(34px,5.5vw,64px); font-weight:900; letter-spacing:-.045em; line-height:1.06; margin-bottom:18px; }
  .psub { font-size:17.5px; line-height:1.72; max-width:640px; }

  /* ── TIMELINE ────────────────────────────────────── */
  .tl { position:relative; padding-left:44px; }
  .tl::before { content:''; position:absolute; left:7px; top:10px; bottom:10px; width:2px; background:var(--br); }
  .tl-i { position:relative; margin-bottom:44px; }
  .tl-d { position:absolute; left:-41px; top:4px; width:18px; height:18px; border-radius:50%; background:var(--o); border:3px solid var(--wh); box-shadow:0 0 0 2px var(--o20); }
  .tl-ey { font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--o); font-weight:700; margin-bottom:6px; }
  .tl-t { font-size:18px; font-weight:700; color:var(--dk); margin-bottom:8px; }
  .tl-p { font-size:14px; color:var(--bd); line-height:1.68; }

  /* ── CONTACT ─────────────────────────────────────── */
  .cg { display:grid; grid-template-columns:1fr 1fr; gap:64px; max-width:960px; margin:0 auto; }
  .fl { display:block; font-size:13px; font-weight:600; color:var(--dk); margin-bottom:7px; }
  .fi { width:100%; padding:13px 16px; border-radius:10px; border:1.5px solid var(--br); background:var(--wh); font-size:14px; color:var(--tx); font-family:'DM Sans',sans-serif; transition:border-color .15s; outline:none; margin-bottom:16px; }
  .fi:focus { border-color:var(--o); }
  .fsub { width:100%; padding:14px; border-radius:11px; border:none; background:var(--o); color:#fff; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; letter-spacing:.01em; }
  .fsub:hover { background:#D96A0A; box-shadow:0 10px 28px var(--og); }

  /* ── INSITEX ─────────────────────────────────────── */
  .ix-hero { background:linear-gradient(150deg,#0D1017 0%,#161B27 55%,#0D1017 100%); padding:148px 56px 80px; position:relative; overflow:hidden; }
  .ix-fg { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
  .ix-cap3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-top:56px; }
  .ix-cap-i { text-align:center; padding:36px 28px; background:rgba(255,255,255,.03); border:1px solid var(--brk); border-radius:18px; transition:all .2s; }
  .ix-cap-i:hover { border-color:rgba(244,128,31,.3); background:rgba(244,128,31,.03); }

  /* ── PROXA LABS ──────────────────────────────────── */
  .pl-cards { display:grid; grid-template-columns:1fr 1fr; gap:14px; }

  /* ── PATH STEPS ──────────────────────────────────── */
  .ps { display:flex; gap:16px; padding:18px 0; border-bottom:1px solid var(--br); }
  .ps:last-child { border:none; }
  .ps-n { width:32px; height:32px; border-radius:50%; background:var(--o10); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:var(--o); flex-shrink:0; font-family:'Manrope',sans-serif; margin-top:2px; }
  .ps-t { font-size:15px; font-weight:700; color:var(--dk); margin-bottom:3px; }
  .ps-d { font-size:13.5px; color:var(--bd); line-height:1.55; }

  /* ── NAV DROPDOWN ────────────────────────────────── */
  .nav-drop { position:relative; }
  .nav-drop-menu {
    display:none; position:absolute; top:calc(100% + 8px); left:50%; transform:translateX(-50%);
    background:var(--wh); border:1px solid var(--br); border-radius:16px;
    box-shadow:0 20px 60px rgba(0,0,0,.12),0 4px 16px rgba(0,0,0,.06);
    padding:8px; width:580px; z-index:400;
  }
  .nav-drop:hover .nav-drop-menu { display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px; }
  .ndm-item { padding:14px 16px; border-radius:10px; cursor:pointer; transition:background .15s; }
  .ndm-item:hover { background:var(--lt); }
  .ndm-icon { font-size:18px; margin-bottom:6px; }
  .ndm-title { font-size:13px; font-weight:700; color:var(--dk); margin-bottom:3px; font-family:'Manrope',sans-serif; }
  .ndm-desc { font-size:11.5px; color:var(--bd); line-height:1.45; }
  .ndm-tag { font-size:10px; font-weight:700; color:var(--o); background:var(--o10); border-radius:20px; padding:2px 8px; display:inline-block; margin-top:6px; letter-spacing:.04em; }
  .nl-drop { display:flex; align-items:center; gap:4px; }
  .nl-drop svg { transition:transform .2s; }
  .nav-drop:hover .nl-drop svg { transform:rotate(180deg); }

  /* ── SCROLL REVEAL ───────────────────────────────── */
  .reveal { opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-delay-1 { transition-delay:.1s; }
  .reveal-delay-2 { transition-delay:.2s; }
  .reveal-delay-3 { transition-delay:.3s; }
  .reveal-delay-4 { transition-delay:.4s; }

  /* ── PRODUCT PREVIEW CARDS ───────────────────────── */
  .prod-preview { background:var(--dk2); border:1px solid rgba(255,255,255,.06); border-radius:16px; overflow:hidden; }
  .pp-topbar { height:32px; background:rgba(255,255,255,.04); border-bottom:1px solid rgba(255,255,255,.05); display:flex; align-items:center; gap:6px; padding:0 14px; }
  .pp-dot { width:8px; height:8px; border-radius:50%; }
  .pp-content { padding:16px; }
  .pp-row { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; margin-bottom:6px; }
  .pp-label { font-size:11px; font-weight:600; font-family:'Manrope',sans-serif; }
  .pp-bar { height:4px; border-radius:2px; flex:1; }

  /* ── STAT COUNTER ────────────────────────────────── */
  .stat-num { font-family:'Manrope',sans-serif; font-size:42px; font-weight:900; color:var(--o); letter-spacing:-.05em; line-height:1; }

  /* ── COMPARISON TABLE ────────────────────────────── */
  .cmp-row { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:0; border-bottom:1px solid var(--br); }
  .cmp-row:last-child { border:none; }
  .cmp-cell { padding:14px 20px; font-size:13px; color:var(--bd); display:flex; align-items:center; }
  .cmp-cell:not(:first-child) { justify-content:center; border-left:1px solid var(--br); }
  .cmp-head { font-weight:700; color:var(--dk); font-size:13px; }
  .cmp-win { color:var(--o); font-size:17px; }
  .cmp-no  { color:var(--br); font-size:17px; }
  .cmp-part { color:var(--bdl); font-size:12px; }

  /* ── FOOTER NEWSLETTER ───────────────────────────── */
  .fn-wrap { display:flex; gap:10px; margin-top:20px; }
  .fn-in { flex:1; padding:11px 16px; border-radius:9px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05); color:rgba(255,255,255,.7); font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color .15s; }
  .fn-in:focus { border-color:rgba(244,128,31,.5); }
  .fn-in::placeholder { color:rgba(255,255,255,.25); }
  .fn-btn { padding:11px 20px; border-radius:9px; background:var(--o); border:none; color:#fff; font-size:13px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .15s; white-space:nowrap; }
  .fn-btn:hover { background:#D96A0A; }

  @media (max-width:960px) {
    .nav { padding:0 22px; } .nav-links { display:none; }
    .hero,.sec,.ph,.ph-dk,.ix-hero,.cta-full { padding-left:24px; padding-right:24px; }
    .hero-inner { grid-template-columns:1fr; } .hero-right { display:none; }
    .pg,.dg,.ag,.ix-fg,.ix-cap3,.cg,.pl-cards { grid-template-columns:1fr; }
    .stats-row { grid-template-columns:1fr 1fr; }
    .st { border-right:none; border-bottom:1px solid var(--brk); padding:18px 0; }
    .cta-bar { flex-direction:column; align-items:flex-start; }
    .cmp-row { grid-template-columns:1.5fr 1fr 1fr; }
    .cmp-row > .cmp-cell:nth-child(4) { display:none; }
  }
`;

/* ── HEX MARK ─────────────────────────────────────────────────────────────────
   4-hex cluster from the InsiteHub brand style guide.
   Three hexagons in a tight offset cluster + one partially visible.
   Outline only, orange stroke.
──────────────────────────────────────────────────────────────────────────── */
const HexMark = ({ size = 36, color = "#F4801F", strokeWidth = 1.6 }) => {
  // Flat-top hexagon helper: center cx,cy, radius r
  const hex = (cx, cy, r) => {
    const pts = Array.from({length:6},(_,i)=>{
      const a = (Math.PI/3)*i - Math.PI/6;
      return (cx + r*Math.cos(a)) + "," + (cy + r*Math.sin(a));
    });
    return pts.join(" ");
  };
  const r = size * 0.27;
  const dx = r * 1.73; // horizontal spacing = sqrt(3)*r
  const dy = r * 1.5;  // vertical spacing = 1.5*r
  // 4-hex cluster: top-left, top-right, bottom-left, bottom-right offset
  const centers = [
    [size*0.28, size*0.30],  // top-left
    [size*0.28 + dx, size*0.30],  // top-right
    [size*0.28 + dx*0.5, size*0.30 + dy],  // bottom-middle-left
    [size*0.28 + dx*1.5, size*0.30 + dy],  // bottom-right
  ];
  return (
    <svg width={size} height={size} viewBox={"0 0 "+size+" "+size} fill="none" style={{flexShrink:0}}>
      {centers.map(([cx,cy],i)=>(
        <polygon key={i} points={hex(cx,cy,r)} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinejoin="round"/>
      ))}
    </svg>
  );
};

/* Large decorative hex mark for backgrounds */
const HexMarkLarge = ({ size = 480, color = "#F4801F", opacity = 0.05 }) => (
  <div style={{position:"absolute",pointerEvents:"none",opacity}}>
    <HexMark size={size} color={color} strokeWidth={0.8}/>
  </div>
);

/* ── SCROLL REVEAL HOOK ────────────────────────────────────────────────────── */
const useReveal = () => {
  useEffect(()=>{
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    },{threshold:0.12});
    els.forEach(el=>io.observe(el));
    return()=>io.disconnect();
  });
};

/* ── SHARED NAV ────────────────────────────────────────────────────────────── */
const Nav = ({ page, setPage, scrolled }) => {
  const [dropOpen, setDropOpen] = useState(false);
  const dropItems = [
    {icon:"🧭",title:"I need an AI strategy",desc:"Assess your readiness and build a roadmap before any technology decision.",tag:"Advisory",p:"advisory"},
    {icon:"🔬",title:"I want to run an AI pilot",desc:"Structure the experiment, define success criteria, build the business case.",tag:"Proxa Labs",p:"proxalab"},
    {icon:"🎓",title:"I need AI literacy training",desc:"Build AI fluency across your commercial organization before deploying tools.",tag:"AI Literacy",p:"literacy"},
    {icon:"🚀",title:"I'm ready for a platform",desc:"See Forge, Atlas, Echo, and Certify — the only closed-loop AI platform.",tag:"AI Platform",p:"platform"},
    {icon:"📚",title:"I need content for a launch",desc:"AI-generated or human-led, MLR-compliant content on your timeline.",tag:"Content",p:"content"},
    {icon:"🖥️",title:"I need an LMS first",desc:"Enterprise learning infrastructure built for biopharma compliance.",tag:"InsiteX LMS",p:"insitex"},
    {icon:"💬",title:"I'm not sure yet",desc:"30 minutes. No pitch. Tell us where you're stuck.",tag:"Book a Call",p:"contact"},
  ];
  return (
    <nav className={"nav"+(scrolled?" up":"")}>
      <div className="nav-logo" onClick={()=>{ setDropOpen(false); setPage("home"); }}>
        <HexMark size={38} color="#F4801F" strokeWidth={1.7}/>
        <span className="nav-wm">Insite<b>HUB</b></span>
      </div>
      <div className="nav-links">
        {/* WHERE TO START dropdown — React state controlled */}
        <div style={{position:"relative"}}>
          <button
            className="nl nl-drop"
            onClick={()=>setDropOpen(o=>!o)}
            style={{color:dropOpen?"var(--o)":"var(--bd)"}}
          >
            Where to Start
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{transform:dropOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s"}}>
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {dropOpen && (
            <div style={{
              position:"absolute",top:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",
              background:"var(--wh)",border:"1px solid var(--br)",borderRadius:16,
              boxShadow:"0 20px 60px rgba(0,0,0,.14),0 4px 16px rgba(0,0,0,.06)",
              padding:8,width:600,zIndex:400,
              display:"grid",gridTemplateColumns:"1fr 1fr",gap:4
            }}>
              {dropItems.map(d=>(
                <div
                  key={d.p}
                  onClick={()=>{ setDropOpen(false); setPage(d.p); }}
                  style={{padding:"14px 16px",borderRadius:10,cursor:"pointer",transition:"background .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--lt)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
                  <div style={{fontSize:18,marginBottom:5}}>{d.icon}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--dk)",marginBottom:3,fontFamily:"Manrope,sans-serif"}}>{d.title}</div>
                  <div style={{fontSize:11.5,color:"var(--bd)",lineHeight:1.45,marginBottom:6}}>{d.desc}</div>
                  <span style={{fontSize:10,fontWeight:700,color:"var(--o)",background:"var(--o10)",borderRadius:20,padding:"2px 8px",display:"inline-block",letterSpacing:".04em"}}>{d.tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {[["AI Platform","platform"],["AI Literacy","literacy"],["InsiteX LMS","insitex"],["Advisory","advisory"],["Content","content"],["Proxa Labs","proxalab"],["About","about"]].map(([l,p])=>(
          <button key={p} className={"nl"+(page===p?" on":"")} onClick={()=>{ setDropOpen(false); setPage(p); }}>{l}</button>
        ))}
      </div>
      <div className="nav-right">
        <button className="ng" onClick={()=>{ setDropOpen(false); setPage("contact"); }}>Contact</button>
        <button className="no" onClick={()=>{ setDropOpen(false); setPage("contact"); }}>Book a Demo</button>
      </div>
    </nav>
  );
};

/* ── SHARED FOOTER ─────────────────────────────────────────────────────────── */
const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    x: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const Footer = ({ setPage }) => {
  const [email,setEmail]=useState('');
  const [subbed,setSubbed]=useState(false);
  return(
  <footer style={{background:var_dk2,borderTop:"1px solid rgba(255,255,255,.06)"}}>
    {/* Newsletter bar */}
    <div style={{borderBottom:"1px solid rgba(255,255,255,.06)",padding:"40px 56px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:16,fontWeight:700,color:"rgba(255,255,255,.75)",fontFamily:"Manrope,sans-serif",marginBottom:4}}>Stay ahead of AI in biopharma commercial learning.</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.28)"}}>Frameworks, research, and field notes from InsiteHub's practitioners. No vendor noise.</div>
        </div>
        {subbed?(
          <div style={{fontSize:13,color:"#34D399",fontWeight:600}}>✓ You're in. We'll be in touch.</div>
        ):(
          <div className="fn-wrap" style={{minWidth:340}}>
            <input className="fn-in" placeholder="your@company.com" value={email} onChange={e=>setEmail(e.target.value)}/>
            <button className="fn-btn" onClick={()=>{if(email)setSubbed(true)}}>Get the Frameworks</button>
          </div>
        )}
      </div>
    </div>
    {/* Main footer */}
    <div style={{padding:"52px 56px 32px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"2.4fr 1fr 1fr 1fr",gap:52,marginBottom:48}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:16}} onClick={()=>setPage("home")}>
              <HexMark size={34} color="#F4801F" strokeWidth={1.6}/>
              <span style={{fontFamily:"Manrope,sans-serif",fontSize:18,fontWeight:800,letterSpacing:"-.04em",color:"rgba(255,255,255,.75)"}}>Insite<span style={{color:"#F4801F"}}>HUB</span></span>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,.3)",lineHeight:1.72,maxWidth:280,marginBottom:20}}>The AI implementation partner built for the organizational complexity of biopharma commercial learning — not adapted for it.</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
              {[{l:"Start with Advisory",p:"advisory"},{l:"See the Platform",p:"platform"},{l:"Explore Proxa Labs",p:"proxalab"}].map(b=>(
                <button key={b.l} onClick={()=>setPage(b.p)} style={{fontSize:12,fontWeight:600,padding:"6px 14px",borderRadius:8,border:"1px solid rgba(255,255,255,.1)",background:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(244,128,31,.4)";e.currentTarget.style.color="#F4801F";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.4)"}}>{b.l}</button>
              ))}
            </div>
            {/* Social icons */}
            <div style={{display:"flex",gap:10}}>
              {[
                {type:"linkedin",href:"https://linkedin.com/company/insitehub",label:"LinkedIn"},
                {type:"facebook",href:"https://facebook.com/insitehub",label:"Facebook"},
                {type:"x",href:"https://x.com/insitehub",label:"X"},
              ].map(s=>(
                <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{width:36,height:36,borderRadius:9,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.35)",transition:"all .2s",textDecoration:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(244,128,31,.4)";e.currentTarget.style.color="#F4801F";e.currentTarget.style.background="rgba(244,128,31,.06)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.35)";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
                  <SocialIcon type={s.type}/>
                </a>
              ))}
            </div>
          </div>
          {[
            ["AI Platform",["InsiteHub Forge","platform"],["InsiteHub Atlas","platform"],["InsiteHub Echo","platform"],["Certify","platform"],["InsiteX LMS","insitex"],["AI Literacy Program","literacy"]],
            ["Services",["Advisory","advisory"],["Content Development","content"],["InsiteXcelerator","home"],["Proxa Labs","proxalab"]],
            ["Company",["About","about"],["Announcements","news"],["Resources & Guides","resources"],["Newsletter","newsletter"],["Contact","contact"],["Book a Demo","contact"]],
          ].map(([h,...links])=>(
            <div key={h}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",color:"rgba(255,255,255,.28)",marginBottom:16}}>{h}</div>
              {links.map(([l,p])=><div key={l} style={{fontSize:13.5,color:"rgba(255,255,255,.25)",marginBottom:11,cursor:"pointer",transition:"color .15s"}} onClick={()=>setPage(p)} onMouseEnter={e=>e.target.style.color="rgba(255,255,255,.7)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.25)"}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:26,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
          <div style={{fontSize:12,color:"rgba(255,255,255,.16)"}}>© 2026 InsiteHub, Inc. · Newark, DE · InsiteHub, Inc. is a Delaware S-Corp</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {["SOC 2 Type II","NIH Partner","Biopharma Native","University of Delaware Partner"].map(t=><div key={t} style={{fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20,border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.2)"}}>{t}</div>)}
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};
const var_dk2 = "#1A1D25";

/* ── LOOP VISUAL COMPONENT ─────────────────────────────────────────────────── */
const LoopVisual = () => {
  const [active, setActive] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setActive(a=>(a+1)%4),2000); return()=>clearInterval(t); },[]);
  const nodes=[
    {id:0,label:"Forge",  sub:"Builds content",    icon:"⚡",c:"#F4801F",bg:"rgba(244,128,31,.1)", cx:190,cy:76},
    {id:1,label:"Atlas",  sub:"Delivers learning", icon:"🎓",c:"#007AFF",bg:"rgba(0,122,255,.1)",  cx:326,cy:196},
    {id:2,label:"Echo",   sub:"Assesses readiness",icon:"🎭",c:"#7C3AED",bg:"rgba(124,58,237,.1)",cx:190,cy:316},
    {id:3,label:"Certify",sub:"Confirms competency",icon:"✅",c:"#059669",bg:"rgba(5,150,105,.1)", cx:54, cy:196},
  ];
  const flows=[
    {f:0,t:1,label:"content published",c:"#F4801F"},
    {f:1,t:2,label:"readiness reached",c:"#007AFF"},
    {f:2,t:3,label:"gap detected",     c:"#7C3AED"},
    {f:3,t:0,label:"rebuild queued",   c:"#059669"},
  ];
  const an=nodes[active];
  const curvedPath=(from,to,offset=30)=>{
    const mx=(from.cx+to.cx)/2, my=(from.cy+to.cy)/2;
    const dx=to.cx-from.cx, dy=to.cy-from.cy;
    const len=Math.sqrt(dx*dx+dy*dy)||1;
    return "M"+from.cx+" "+from.cy+" Q"+(mx-(dy/len)*offset)+" "+(my+(dx/len)*offset)+" "+to.cx+" "+to.cy;
  };
  return (
    <div className="loop-card">
      <div className="lc-label">The Closed Loop · Intelligent Capability Development</div>
      <svg viewBox="0 0 380 392" style={{width:"100%",maxWidth:380,display:"block",margin:"0 auto"}}>
        <defs>
          {flows.map(f=>(
            <marker key={f.f} id={"m"+f.f} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M1 1L9 5L1 9" fill="none" stroke={f.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          ))}
        </defs>
        {/* Background hex pattern */}
        <g opacity=".04">
          {[[95,80],[190,80],[285,80],[47,196],[142,196],[237,196],[332,196],[95,312],[190,312],[285,312]].map(([x,y],i)=>(
            <polygon key={i} points={[x+","+(y-28),x+24+","+(y-14),x+24+","+(y+14),x+","+(y+28),(x-24)+","+(y+14),(x-24)+","+(y-14)].join(" ")} stroke="#F4801F" strokeWidth="1" fill="none"/>
          ))}
        </g>
        {/* Connection paths */}
        {flows.map((fl,i)=>{
          const from=nodes[fl.f], to=nodes[fl.t];
          const isAct=active===fl.f;
          const d=curvedPath(from,to,36);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={fl.c} strokeWidth={isAct?2.2:1.2} strokeOpacity={isAct?.75:.15} markerEnd={"url(#m"+fl.f+")"} style={{transition:"all .5s"}}/>
              {isAct&&<text textAnchor="middle" style={{fontSize:9,fill:fl.c,fontFamily:"DM Sans,sans-serif",fontWeight:600,opacity:.9}}>
                <textPath href={"#fp"+i} startOffset="50%">{fl.label}</textPath>
              </text>}
              <path id={"fp"+i} d={d} fill="none" stroke="none"/>
            </g>
          );
        })}
        {/* Nodes */}
        {nodes.map(n=>{
          const isAct=active===n.id;
          return (
            <g key={n.id} onClick={()=>setActive(n.id)} style={{cursor:"pointer"}}>
              {isAct&&<circle cx={n.cx} cy={n.cy} r={52} fill="none" stroke={n.c} strokeWidth="1" strokeOpacity=".12" strokeDasharray="4 5"/>}
              <circle cx={n.cx} cy={n.cy} r={isAct?42:36} fill={n.bg} stroke={n.c} strokeWidth={isAct?1.8:1} strokeOpacity={isAct?.65:.2} style={{transition:"all .4s"}}/>
              <text x={n.cx} y={n.cy-6} textAnchor="middle" style={{fontSize:isAct?20:16,transition:"font-size .3s"}}>{n.icon}</text>
              <text x={n.cx} y={n.cy+11} textAnchor="middle" style={{fontSize:11,fontWeight:800,fill:n.c,fontFamily:"Manrope,sans-serif"}}>{n.label}</text>
              <text x={n.cx} y={n.cy+24} textAnchor="middle" style={{fontSize:9,fill:"rgba(92,99,112,.65)",fontFamily:"DM Sans,sans-serif"}}>{n.sub}</text>
            </g>
          );
        })}
        {/* Center */}
        {["INTELLIGENT","CAPABILITY","DEVELOPMENT"].map((w,i)=>(
          <text key={w} x="190" y={184+i*14} textAnchor="middle" style={{fontSize:8,fill:"rgba(147,155,161,.5)",letterSpacing:".1em",fontFamily:"Manrope,sans-serif"}}>{w}</text>
        ))}
      </svg>
      <div className="lc-callout" style={{background:an.bg,border:("1px solid "+an.c+"25")}}>
        <div style={{fontSize:12,fontWeight:700,color:an.c,marginBottom:3,fontFamily:"Manrope,sans-serif"}}>{an.label} is active</div>
        <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55}}>
          {[
            "AI agents generating MLR-compliant content from your PI, CSRs, and brand assets. Every claim cited automatically.",
            "Adaptive learning pathways delivering competency-targeted content and closing knowledge gaps before reps reach the field.",
            "Live HCP roleplay with AI physician avatars. Real-time ComplianceGuard monitoring. Behavioral scoring against industry benchmarks.",
            "Competency-gated certification issued against behavioral evidence — not attendance. Gaps automatically trigger Forge to rebuild.",
          ][active]}
        </div>
      </div>
      <div className="lc-dots">
        {nodes.map(n=><div key={n.id} className="lc-dot" style={{width:active===n.id?22:6,background:active===n.id?an.c:"var(--br)"}} onClick={()=>setActive(n.id)}/>)}
      </div>
    </div>
  );
};

/* ── INLINE NEWSLETTER SIGNUP ──────────────────────────────────────────────── */
const NewsletterInline = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  if (done) return (
    <div style={{background:"rgba(52,211,153,.1)",border:"1px solid rgba(52,211,153,.25)",borderRadius:10,padding:"14px 18px",fontSize:13,color:"#34D399",fontWeight:600}}>
      ✓ You're in. First issue arrives when we have something worth sending.
    </div>
  );
  return (
    <div style={{display:"flex",gap:8}}>
      <input
        value={email} onChange={e=>setEmail(e.target.value)}
        placeholder="your@company.com"
        style={{flex:1,padding:"12px 16px",borderRadius:9,border:"1px solid rgba(255,255,255,.12)",background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.75)",fontSize:14,fontFamily:"DM Sans,sans-serif",outline:"none"}}
        onFocus={e=>e.target.style.borderColor="rgba(244,128,31,.5)"}
        onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.12)"}
      />
      <button onClick={()=>{if(email)setDone(true);}}
        style={{padding:"12px 20px",borderRadius:9,background:"var(--o)",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",whiteSpace:"nowrap",transition:"background .15s"}}
        onMouseEnter={e=>e.currentTarget.style.background="#D96A0A"}
        onMouseLeave={e=>e.currentTarget.style.background="var(--o)"}>
        Subscribe
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════════════ */
const HomePage = ({ setPage }) => {
  useReveal();
  return (
  <>
    {/* HERO */}
    <section className="hero">
      <div className="hero-inner">
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:22}}>
            <div className="hero-pill" style={{marginBottom:0}}><div className="hpd"/>AI-First · Innovation-Led · Purpose-Built for Biopharma</div>
            <div className="hero-pill" style={{marginBottom:0,background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",color:"#D97706",cursor:"pointer"}} onClick={()=>setPage("literacy")}>
              <span style={{fontSize:9}}>NEW</span> · AI Literacy Program — Now Available
            </div>
          </div>
          <h1 className="hero-h1">
            InsiteHub gives biopharma<br/>commercial teams the <em>strategy,<br/>the literacy, and the platform</em><br/>to go from AI mandate to AI results.
          </h1>
          <p className="hero-p">The only closed-loop AI platform built for biopharma — and the only partner with the advisory methodology, AI literacy program, and implementation track record to make it stick. Built from the inside. Stress-tested in the field. Designed to work where others have failed.</p>
          <div className="hero-actions">
            <button className="bp" onClick={()=>setPage("platform")}>See the Platform</button>
            <button className="bs" onClick={()=>setPage("advisory")}>Start with Advisory</button>
            <button className="bt" onClick={()=>setPage("contact")}>Book a Demo →</button>
          </div>
          <div className="hero-social">
            <span className="hs-label">Trusted by</span>
            <div className="hs-logos">
              {["Pfizer","Novartis","AstraZeneca","Sanofi","Amgen","Biogen","Roche"].map(n=><span key={n} className="hs-co">{n}</span>)}
            </div>
          </div>
          {/* Thought leadership reference */}
          <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(0,0,0,.07)",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:"var(--bdl)"}}>Latest research:</span>
            <span onClick={()=>setPage("proxalab")} style={{fontSize:12,fontWeight:600,color:"var(--o)",cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(244,128,31,.3)"}}>r=0.84 — AI competency scores vs. field performance outcomes</span>
            <span style={{fontSize:12,color:"var(--bdl)"}}>·</span>
            <span onClick={()=>setPage("newsletter")} style={{fontSize:12,fontWeight:600,color:"var(--bd)",cursor:"pointer"}} onMouseEnter={e=>e.target.style.color="var(--o)"} onMouseLeave={e=>e.target.style.color="var(--bd)"}>Subscribe for new research →</span>
          </div>
        </div>
        <div style={{position:"relative"}}><LoopVisual/></div>
      </div>
    </section>

    {/* CLIENT LOGOS */}
    <div className="logo-band">
      <div className="lb-label">Trusted across biopharma and health systems</div>
      <div className="lb-row">
        {["AbbVie","Allergan","Amgen","AstraZeneca","Bayer","Biogen","BMS","Genentech","GSK","Janssen","Merck","Novartis","Novo Nordisk","Pfizer","Roche","Sanofi","Takeda","Teva","Gilead","Mass General","Penn Medicine","MD Anderson"].map(n=><span key={n} className="lb-co">{n}</span>)}
      </div>
    </div>

    {/* ANNOUNCEMENTS STRIP */}
    <section className="sec sw" style={{paddingTop:0,paddingBottom:0}}>
      <div className="mw">
        <div style={{borderTop:"1.5px solid var(--br)",padding:"40px 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div className="ey" style={{marginBottom:0}}>Latest from InsiteHub</div>
            <button className="bt" onClick={()=>setPage("news")}>All Announcements →</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            {[
              {tag:"New Partnership",tagC:"#007AFF",tagBg:"rgba(0,122,255,.08)",date:"April 2026",t:"InsiteHub partners with UMU.com for AI Literacy delivery",p:"news"},
              {tag:"Platform Update",tagC:"#7C3AED",tagBg:"rgba(124,58,237,.08)",date:"March 2026",t:"Echo ComplianceGuard v2 — enhanced MLR flagging released",p:"news"},
              {tag:"Research",tagC:"#059669",tagBg:"rgba(5,150,105,.08)",date:"February 2026",t:"Proxa Labs AI Readiness Scoring Model beta now available",p:"proxalab"},
            ].map(a=>(
              <div key={a.t} onClick={()=>setPage(a.p)} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:14,padding:20,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--o)";e.currentTarget.style.background="rgba(244,128,31,.03)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--lt)";}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontSize:10,fontWeight:700,color:a.tagC,background:a.tagBg,borderRadius:20,padding:"2px 9px",letterSpacing:".04em"}}>{a.tag}</span>
                  <span style={{fontSize:11,color:"var(--bdl)"}}>{a.date}</span>
                </div>
                <div style={{fontSize:14,fontWeight:600,color:"var(--dk)",lineHeight:1.45}}>{a.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>



    {/* STATS */}
    <div className="stats">
      <div className="stats-row">
        {[{n:"80–95%",l:"of pharma AI pilots never scale or deliver measurable value"},{n:"11 mo",l:"average ramp to full rep productivity in biopharma"},{n:"84%",l:"of pharma reps missed quota last year"},{n:"25 yrs",l:"biopharma commercial L&D expertise behind our methodology"}].map(s=>(
          <div className="st" key={s.n}><div className="st-n">{s.n}</div><div className="st-l">{s.l}</div></div>
        ))}
      </div>
    </div>

    {/* THOUGHT LEADERSHIP STRIP */}
    <div style={{background:"var(--wh)",borderBottom:"1px solid var(--br)",padding:"36px 56px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,letterSpacing:".14em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:4}}>The Thinking Behind the Platform</div>
            <div style={{fontSize:20,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em"}}>From the practitioners who built it.</div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button className="bt" onClick={()=>setPage("resources")}>All Frameworks &amp; Guides →</button>
            <button onClick={()=>setPage("newsletter")} style={{padding:"9px 18px",borderRadius:9,background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .15s",whiteSpace:"nowrap"}} onMouseEnter={e=>{e.currentTarget.style.background="var(--o20)";}} onMouseLeave={e=>{e.currentTarget.style.background="var(--o10)";}}>
              Subscribe for new research
            </button>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14}}>
          {[
            {icon:"🗺️",tag:"Guide",tagC:"#7C3AED",tagBg:"rgba(124,58,237,.08)",t:"The AI Pilot Failure Taxonomy",d:"Four failure patterns that account for 80–95% of pharma AI pilot failures — and what each one looks like from the inside before it becomes a postmortem.",p:"resources"},
            {icon:"📋",tag:"Framework",tagC:"#F4801F",tagBg:"rgba(244,128,31,.08)",t:"AI Readiness Self-Assessment",d:"A 15-question framework for evaluating your organization's readiness to deploy AI — governance, data, stakeholder alignment, and measurement capability.",p:"resources"},
            {icon:"🔬",tag:"Research",tagC:"#059669",tagBg:"rgba(5,150,105,.08)",t:"r=0.84 — AI competency scores vs. field performance",d:"Early Proxa Labs data on the correlation between AI-assessed behavioral competencies and real-world commercial performance outcomes.",p:"proxalab"},
            {icon:"📊",tag:"Template",tagC:"#007AFF",tagBg:"rgba(0,122,255,.08)",t:"Commercial L&D AI Business Case Template",d:"The ROI model structure we use with clients to frame pilot results in the language the CCO, CFO, and CHRO actually use to make decisions.",p:"resources"},
          ].map(c=>(
            <div key={c.t} onClick={()=>setPage(c.p)} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:14,padding:20,cursor:"pointer",transition:"all .2s",display:"flex",flexDirection:"column",gap:10}} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--o)";e.currentTarget.style.background="rgba(244,128,31,.03)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--lt)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:10,fontWeight:700,color:c.tagC,background:c.tagBg,borderRadius:20,padding:"2px 9px",letterSpacing:".04em"}}>{c.tag}</span>
                <div style={{fontSize:18}}>{c.icon}</div>
              </div>
              <div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",lineHeight:1.35}}>{c.t}</div>
              <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.55,flex:1}}>{c.d}</div>
              <div style={{fontSize:12,color:"var(--o)",fontWeight:600}}>Read →</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* AI LITERACY ANNOUNCEMENT BAND */}
    <div style={{background:"linear-gradient(135deg,#FFFBF0 0%,#FFF5E0 100%)",borderTop:"1px solid rgba(245,158,11,.15)",borderBottom:"1px solid rgba(245,158,11,.15)",padding:"32px 56px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:32,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <div style={{width:52,height:52,borderRadius:14,background:"rgba(245,158,11,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>🎓</div>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:11,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.15)",borderRadius:20,padding:"2px 9px",letterSpacing:".06em",textTransform:"uppercase"}}>New Program</span>
              <span style={{fontSize:12,color:"var(--bdl)"}}>Now available for biopharma commercial teams</span>
            </div>
            <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.025em",marginBottom:2}}>AI Literacy Program — the prerequisite every AI deployment needs.</div>
            <div style={{fontSize:13,color:"var(--bd)"}}>Build AI fluency across every role before tools go live. Teams that understand AI adopt it. Teams that don't, resist it.</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,flexShrink:0}}>
          <button onClick={()=>setPage("literacy")} style={{padding:"11px 24px",borderRadius:10,background:"#D97706",border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .2s",whiteSpace:"nowrap"}} onMouseEnter={e=>e.currentTarget.style.background="#B45309"} onMouseLeave={e=>e.currentTarget.style.background="#D97706"}>See the Program</button>
          <button onClick={()=>setPage("contact")} style={{padding:"11px 24px",borderRadius:10,background:"none",border:"1.5px solid rgba(245,158,11,.4)",color:"#D97706",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .2s",whiteSpace:"nowrap"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(245,158,11,.08)"} onMouseLeave={e=>e.currentTarget.style.background="none"}>Get the Overview</button>
        </div>
      </div>
    </div>

    {/* WHY INSITEHUB */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">The InsiteHub Difference</div>
          <h2 className="h2">Innovation isn't a talking point here.<br/>It's a track record.</h2>
          <p className="lead">InsiteHub built an award-winning virtual world for a European drug launch when competitors were spending $5M on vendor platforms. We secured an NIH grant and launched one of the only two biomedical accelerators outside a university in the US. We pioneered gamification in pharmaceutical training before it had a name. And we built the first closed-loop AI platform in biopharma commercial learning. The methodology behind all of it is the same: define the real problem, experiment before you commit, and never ship something you haven't stress-tested in the actual environment.</p>
        </div>
        <div className="dg">
          {[
            {n:"01 / Methodology Before Technology",t:"We diagnose before we prescribe.",b:"Every engagement starts with the question your organization actually needs answered: what will determine whether any AI implementation succeeds or fails here? Most vendors skip this. We never do.",q:"Most vendors lead with a demo. We lead with a diagnosis — because the thing that determines whether AI works is never about the technology."},
            {n:"02 / Compliance by Design",t:"Their compliance story is a retrofit. Ours is not.",b:"MLR review, GxP validation, and compressed launch windows are the operating conditions InsiteHub was designed around from day one. Every platform built for another industry and adapted for biopharma is playing catch-up.",q:"Biopharma compliance was a design requirement. Not a feature we added later."},
            {n:"03 / Insider Credibility",t:"We don't need you to explain pharma to us.",b:"InsiteHub's practitioners have operated inside the environments they now advise. The failure modes are already known. The governance dynamics are already understood. That's not a talking point — it's a 25-year track record.",q:"Every hour spent educating a vendor about MLR timelines is an hour you're not moving toward the outcome you need."},
            {n:"04 / Experimentation Before Commitment",t:"You don't commit until you have evidence.",b:"InsiteHub's model inverts the typical vendor sequence. We run structured experiments to test fit in your environment before you stake your credibility on it. In biopharma, a failed pilot doesn't just cost budget — it costs launch momentum.",q:"In biopharma, a failed pilot costs more than a budget line. We generate evidence before you scale."},
          ].map(d=>(
            <div key={d.n} className="dc">
              <div className="dc-n">{d.n}</div>
              <div className="dc-t">{d.t}</div>
              <div className="dc-b">{d.b}</div>
              <div className="dc-q">"{d.q}"</div>
            </div>
          ))}
        </div>
        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("advisory")}>Explore Advisory Services</button>
          <button className="bs" onClick={()=>setPage("about")}>Our Innovation Track Record</button>
        </div>
      </div>
    </section>

    {/* AI PRODUCTS */}
    <section className="sec sw">
      <div className="mw">
        <div className="sh">
          <div className="ey">AI-First Platform</div>
          <h2 className="h2">Four products. One closed loop.<br/>No competitor has this.</h2>
          <p className="lead">Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps automatically restart the loop. The only platform that turns assessment failures into new content builds without a human handoff.</p>
        </div>
        <div className="pg">
          {[
            {c:"#F4801F",bg:"rgba(244,128,31,.09)",icon:"⚡",name:"InsiteHub Forge",tag:"Agentic content creation",desc:"AI agents build MLR-compliant training from your PI, CSRs, and brand assets. Hours, not months. Every claim traced to source. No instructional designer required.",bullets:["Auto-generation from clinical data and PI","Every claim cited — MLR artifacts auto-built","Veeva workflow integration","Content Gap Analyzer closes the loop from Echo"]},
            {c:"#007AFF",bg:"rgba(0,122,255,.09)",icon:"🎓",name:"InsiteHub Atlas",tag:"AI-powered adaptive learning",desc:"Adaptive AI tutor delivering personalized pathways, closing knowledge gaps in real time, and ensuring reps are field-ready before the launch window closes.",bullets:["Competency-mapped personalized pathways","Gap-aware adaptive remediation engine","Manager dashboards with predictive readiness","Integrates with InsiteX LMS and Veeva"]},
            {c:"#7C3AED",bg:"rgba(124,58,237,.09)",icon:"🎭",name:"InsiteHub Echo",tag:"AI roleplay & behavioral assessment",desc:"Reps practice live HCP conversations with AI-powered physician avatars. ComplianceGuard monitors every message in real time. Behavioral scoring benchmarked against top quartile.",bullets:["8 HCP digital twin avatars","ComplianceGuard real-time flagging","Behavioral scorecard + industry benchmarks","Gap payload feeds Forge auto-rebuild"]},
            {c:"#059669",bg:"rgba(5,150,105,.09)",icon:"✅",name:"Certify",tag:"Demonstrated field readiness",desc:"Certification earned through demonstrated competency, not attendance. Behavioral evidence tied to every certification. 10-year audit trail. Loop restarts on any gap detected.",bullets:["Competency-gated — no attendance shortcuts","Behavioral evidence for every credential","SHA-256 immutable 10-year audit log","SOC 2 Type II compliant"]},
          ].map(p=>(
            <div key={p.name} className="pc" onClick={()=>setPage("platform")}>
              <div className="pc-bar" style={{background:p.c}}/><div className="pc-gl" style={{background:p.c}}/>
              <div className="pc-ir">
                <div className="pc-ic" style={{background:p.bg}}>{p.icon}</div>
                <div><div className="pc-nm">{p.name}</div><div className="pc-tg">{p.tag}</div></div>
              </div>
              <div className="pc-ds">{p.desc}</div>
              <div className="pc-bl">{p.bullets.map(b=><div key={b} className="pc-bi"><div className="pbd" style={{background:p.c}}/>{b}</div>)}</div>
            </div>
          ))}
        </div>
        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("platform")}>Deep Dive: AI Platform</button>
          <button className="bt" onClick={()=>setPage("insitex")}>Not ready for AI? See InsiteX LMS →</button>
        </div>
      </div>
    </section>

    {/* INLINE CTA */}
    <div style={{padding:"0 56px 0",background:"var(--wh)"}}>
      <div className="mw">
        <div className="cta-bar">
          <div>
            <div className="cta-bar-t">Talk to someone who's been in your seat.</div>
            <div className="cta-bar-s">30 minutes. No demo, no pitch deck. Just your environment and what's been blocking you.</div>
          </div>
          <button className="cta-bar-btn" onClick={()=>{}}>Schedule a Discovery Call</button>
        </div>
      </div>
    </div>

    {/* WHO THIS IS FOR */}
    <section className="sec sl">
      <div className="mw">
        <div style={{textAlign:"center",marginBottom:52}}>
          <div className="ey" style={{textAlign:"center"}}>Who InsiteHub Is For</div>
          <h2 className="h2" style={{textAlign:"center",maxWidth:640,margin:"0 auto 16px"}}>Built for the commercial L&D leader who's done with pilots that go nowhere.</h2>
          <p className="lead" style={{textAlign:"center",margin:"0 auto"}}>If any of these sound like your situation, you're in the right place.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:44}}>
          {[
            {icon:"🎯",t:"You have an AI mandate with no clear path forward",d:"Your CCO wants results. Your IT and compliance teams want governance. Your budget requires ROI. You're navigating all three without a methodology that accounts for any of them."},
            {icon:"🔥",t:"You've run a pilot that didn't scale",d:"It worked in the demo. It looked good in the pilot report. And then it died at the governance gate or got quietly deprioritized when the business sponsor moved on."},
            {icon:"⏱️",t:"You have a launch in 6–9 months and content isn't ready",d:"The commercial team needs field-ready reps. The content pipeline is behind. MLR review adds 60 days on a good day. You need a faster path that doesn't sacrifice compliance."},
            {icon:"🔍",t:"You're evaluating AI vendors and can't tell who to trust",d:"Every vendor says they're built for biopharma. Every demo looks polished. You've been burned before and need someone who can help you evaluate with the rigor the decision requires."},
            {icon:"📊",t:"Your L&D team is measuring completion rates, not performance",d:"You know the CCO scorecard tracks rep readiness, call quality, and launch execution speed — not module completion. You need a partner who speaks that language."},
            {icon:"🏗️",t:"You're building AI capability from scratch",d:"No existing platform. No governance framework. No internal AI literacy. You need a structured starting point, not a vendor pitch that assumes you're already ready to deploy."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{ e.currentTarget.style.borderColor="#F4801F"; e.currentTarget.style.boxShadow="0 8px 24px rgba(244,128,31,.07)"; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--br)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{fontSize:24,marginBottom:12}}>{c.icon}</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,lineHeight:1.3}}>{c.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{c.d}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <button className="bp" onClick={()=>setPage("contact")} style={{marginRight:14}}>Start a Conversation</button>
          <button className="bs" onClick={()=>setPage("advisory")}>See How We Work</button>
        </div>
      </div>
    </section>

    {/* TESTIMONIAL / CASE STUDY */}
    <section className="sec sw">
      <div className="mw">
        <div style={{textAlign:"center",marginBottom:52}}>
          <div className="ey" style={{textAlign:"center"}}>Client Story</div>
          <h2 className="h2" style={{textAlign:"center",maxWidth:600,margin:"0 auto 16px"}}>From failed pilot to funded AI roadmap in under six months.</h2>
          <p className="lead" style={{textAlign:"center",margin:"0 auto"}}>How a mid-size oncology company used Proxa Labs to go from AI pressure to a CCO-approved implementation plan.</p>
        </div>

        {/* Story timeline */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:0,marginBottom:48,background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:20,overflow:"hidden"}}>
          {[
            {phase:"The Situation",c:"#7C3AED",bg:"rgba(124,58,237,.04)",icon:"🏥",text:"A VP of Commercial L&D at a mid-size oncology company had run two AI coaching pilots. Both showed promise in demo conditions. Neither survived IT validation. The CCO was losing patience. The next quarter's budget review was 90 days away."},
            {phase:"Define & Design",c:"#F4801F",bg:"rgba(244,128,31,.04)",icon:"🎯",text:"Proxa Labs conducted a 3-week use case diagnostic. We identified that both pilots had failed for the same reason: the AI was being evaluated on engagement metrics, not on whether it changed rep behavior before an HCP call. We redesigned the experiment around a single bounded question: does AI roleplay practice improve first-call quality scores in a 12-rep cohort?"},
            {phase:"Measure & Execute",c:"#059669",bg:"rgba(5,150,105,.04)",icon:"📈",text:"The 6-week pilot ran against pre-defined success criteria: a 15% improvement in manager-assessed call quality, and zero MLR compliance flags in session transcripts. Both thresholds were met. Call quality improved 23%. The compliance record was clean. The evidence was real and defensible."},
            {phase:"The Business Case",c:"#007AFF",bg:"rgba(0,122,255,.04)",icon:"📋",text:"Proxa Labs built the business case alongside the pilot — not after it. The CCO presentation framed results in commercial terms: reduced ramp time, measurable call quality lift, and a phased AI roadmap with clear go/no-go decision points. The program was approved and funded within three weeks of the pilot conclusion."},
          ].map((s,i,arr)=>(
            <div key={s.phase} style={{padding:28,borderRight:i<arr.length-1?"1px solid var(--br)":"none",background:s.bg,position:"relative"}}>
              <div style={{width:36,height:36,borderRadius:10,background:(s.c+"15"),border:("1px solid "+s.c+"30"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginBottom:14}}>{s.icon}</div>
              <div style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:s.c,fontWeight:700,marginBottom:8}}>{s.phase}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.65}}>{s.text}</div>
            </div>
          ))}
        </div>

        {/* Testimonial quote */}
        <div style={{background:"linear-gradient(135deg,#FFFAF6,#FFF4E8)",border:"1.5px solid rgba(244,128,31,.2)",borderRadius:20,padding:"40px 48px",display:"grid",gridTemplateColumns:"1fr auto",gap:48,alignItems:"center"}}>
          <div>
            <div style={{fontSize:28,color:"var(--o)",fontWeight:800,lineHeight:1,marginBottom:20,opacity:.3}}>"</div>
            <p style={{fontSize:18,color:"var(--dk)",lineHeight:1.72,fontStyle:"italic",fontWeight:400,marginBottom:24}}>We had been trying to make AI work for 18 months. Two pilots, two postmortems, and a CCO who was starting to ask whether L&D could actually lead this. What Proxa Labs did differently was refuse to let us skip the hard part — defining what success actually looked like before we built anything. That single decision changed everything. We walked into our budget review with evidence, not a pitch deck.</p>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#F4801F,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",fontWeight:700,fontFamily:"Manrope,sans-serif",flexShrink:0}}>SC</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif"}}>Sarah Chen</div>
                <div style={{fontSize:13,color:"var(--bd)"}}>VP, Commercial Learning &amp; Development</div>
                <div style={{fontSize:12,color:"var(--o)",fontWeight:600,marginTop:2}}>Mid-Size Oncology Biopharma · Series C</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,minWidth:200}}>
            {[{n:"23%",l:"improvement in manager-assessed call quality"},{n:"0",l:"MLR compliance flags across all sessions"},{n:"3 wks",l:"from pilot conclusion to CCO approval"},{n:"6 mo",l:"full AI roadmap funded and in execution"}].map(s=>(
              <div key={s.n} style={{textAlign:"center",padding:"14px 20px",background:"rgba(255,255,255,.8)",borderRadius:12,border:"1px solid rgba(244,128,31,.15)"}}>
                <div style={{fontSize:24,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",lineHeight:1,marginBottom:4}}>{s.n}</div>
                <div style={{fontSize:11,color:"var(--bd)",lineHeight:1.4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-cta" style={{justifyContent:"center"}}>
          <button className="bp" onClick={()=>setPage("proxalab")}>See the Experimentation Model</button>
          <button className="bs" onClick={()=>setPage("contact")}>Start a Conversation</button>
        </div>
      </div>
    </section>

    {/* NOT READY */}
    <section className="sec sw" style={{paddingTop:60}}>
      <div className="mw">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
          <div>
            <div className="ey">For Every Stage of the Journey</div>
            <h2 className="h2">AI is where we're headed.<br/>But we meet you where you are.</h2>
            <p className="lead" style={{marginBottom:32}}>InsiteHub has been delivering enterprise learning infrastructure for biopharma commercial teams for over four years. The AI platform is our destination. Your timeline is yours to set.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              {[{icon:"🗄️",n:"InsiteX LMS",d:"Enterprise learning management purpose-built for biopharma compliance, credentialing, and workflow.",tag:"Enterprise LMS",p:"insitex"},{icon:"📚",n:"Traditional Content",d:"Full-service instructional design by practitioners with deep pharma commercial backgrounds. Human-led, compliance-first.",tag:"Content Services",p:"content"},{icon:"🎓",n:"AI Literacy Program",d:"Build AI fluency across your commercial organization before deploying tools. The prerequisite every AI implementation needs.",tag:"New Program",p:"literacy",highlight:true}].map(c=>(
                <div key={c.n} onClick={()=>setPage(c.p)} style={{background:c.highlight?"rgba(245,158,11,.05)":"var(--lt)",border:c.highlight?"1.5px solid rgba(245,158,11,.3)":"1.5px solid var(--br)",borderRadius:16,padding:24,cursor:"pointer",transition:"all .2s",position:"relative"}} onMouseEnter={e=>{ e.currentTarget.style.borderColor=c.highlight?"#D97706":"#F4801F"; e.currentTarget.style.background=c.highlight?"rgba(245,158,11,.08)":"rgba(244,128,31,.04)"; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor=c.highlight?"rgba(245,158,11,.3)":"var(--br)"; e.currentTarget.style.background=c.highlight?"rgba(245,158,11,.05)":"var(--lt)"; }}>
                  {c.highlight && <div style={{position:"absolute",top:12,right:12,fontSize:10,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.15)",borderRadius:20,padding:"2px 8px",letterSpacing:".05em"}}>NEW</div>}
                  <div style={{fontSize:26,marginBottom:12}}>{c.icon}</div>
                  <div style={{fontSize:17,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.025em",marginBottom:7}}>{c.n}</div>
                  <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6,marginBottom:14}}>{c.d}</div>
                  <div style={{fontSize:11,fontWeight:700,color:c.highlight?"#D97706":"var(--o)",background:c.highlight?"rgba(245,158,11,.1)":"var(--o10)",borderRadius:20,padding:"4px 12px",display:"inline-block",letterSpacing:".05em",border:c.highlight?"1px solid rgba(245,158,11,.2)":"1px solid var(--o20)"}}>{c.tag}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:"var(--wh)",borderRadius:20,padding:34,border:"1.5px solid var(--br)",boxShadow:"0 8px 36px rgba(0,0,0,.05)"}}>
            <div style={{fontSize:10,letterSpacing:".14em",textTransform:"uppercase",color:"var(--st)",fontWeight:700,marginBottom:24}}>YOUR PATH WITH INSITEHUB</div>
            {[
              {n:"01",t:"Start where you are",d:"InsiteX LMS or traditional content. Proven, compliant, built for pharma."},
              {n:"02",t:"Assess your AI readiness",d:"Advisory team maps your constraints before recommending anything. No technology pitch."},
              {n:"03",t:"Build AI literacy across your team",d:"Equip every role — reps, managers, medical affairs — with the fluency to adopt AI tools effectively.",highlight:true},
              {n:"04",t:"Experiment before committing",d:"Structured pilots generate evidence in your environment before you scale."},
              {n:"05",t:"Deploy with confidence",d:"Forge, Atlas, and Echo built to survive your governance environment — not a generic enterprise."},
            ].map(s=>(
              <div key={s.n} className="ps" style={{background:s.highlight?"rgba(245,158,11,.04)":""}}><div className="ps-n" style={{background:s.highlight?"rgba(245,158,11,.15)":"var(--o10)",color:s.highlight?"#D97706":"var(--o)"}}>{s.n}</div><div><div className="ps-t" style={{color:s.highlight?"#D97706":"var(--dk)"}}>{s.t}{s.highlight&&<span style={{marginLeft:8,fontSize:10,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.15)",borderRadius:20,padding:"1px 7px",letterSpacing:".05em"}}>NEW</span>}</div><div className="ps-d">{s.d}</div></div></div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* THOUGHT LEADERSHIP + NEWSLETTER */}
    <section className="sec sw">
      <div className="mw">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>

          {/* LEFT — thought leadership */}
          <div>
            <div className="ey">Thought Leadership</div>
            <h2 className="h2">We write what we know.<br/>From the inside of biopharma.</h2>
            <p className="lead" style={{marginBottom:32}}>InsiteHub's practitioners have spent 25 years inside the environments they write about. Everything we publish is drawn from first-hand implementation experience — what works, what fails, and why the standard playbook keeps producing the same postmortems.</p>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
              {[
                {icon:"🔬",label:"Research & Data",d:"Original data from InsiteHub's advisory engagements and Proxa Labs experiments — failure patterns, readiness benchmarks, and correlation studies you won't find anywhere else.",tag:"Proxa Labs"},
                {icon:"📋",label:"Frameworks & Tools",d:"Practical tools you can use before committing to anything — AI readiness assessments, pilot design canvases, vendor scorecards, and business case templates.",tag:"Free to Use"},
                {icon:"🧠",label:"Field Notes",d:"Anonymized insight from active advisory engagements — what questions organizations are actually asking, what's failing in the field, and what separates the pilots that scale from the ones that don't.",tag:"Practitioner Insight"},
              ].map(f=>(
                <div key={f.label} style={{display:"flex",gap:14,padding:"16px 20px",background:"var(--lt)",borderRadius:12,border:"1.5px solid var(--br)",cursor:"pointer",transition:"all .2s"}} onClick={()=>setPage("resources")} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--o)";e.currentTarget.style.background="rgba(244,128,31,.03)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--lt)";}}>
                  <div style={{fontSize:22,flexShrink:0}}>{f.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif"}}>{f.label}</div>
                      <div style={{fontSize:10,fontWeight:700,color:"var(--o)",background:"var(--o10)",borderRadius:20,padding:"2px 8px",letterSpacing:".04em",flexShrink:0}}>{f.tag}</div>
                    </div>
                    <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>{f.d}</div>
                  </div>
                  <div style={{color:"var(--o)",fontSize:16,flexShrink:0,alignSelf:"center"}}>→</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button className="bp" onClick={()=>setPage("resources")}>Browse All Frameworks &amp; Guides</button>
              <button className="bs" onClick={()=>setPage("proxalab")}>Proxa Labs Research</button>
            </div>
          </div>

          {/* RIGHT — newsletter signup */}
          <div style={{position:"sticky",top:88}}>
            <div style={{background:"var(--dk)",borderRadius:22,padding:36,position:"relative",overflow:"hidden"}}>
              {/* Subtle hex watermark */}
              <div style={{position:"absolute",top:-40,right:-40,opacity:.06,pointerEvents:"none"}}>
                <HexMark size={220} color="#F4801F" strokeWidth={0.7}/>
              </div>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(244,128,31,.15)",borderRadius:20,padding:"4px 12px",marginBottom:16}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"var(--o)",animation:"hpulse 2s ease-in-out infinite"}}/>
                  <span style={{fontSize:11,fontWeight:700,color:"var(--o)",letterSpacing:".06em"}}>FIELD NOTES · NEWSLETTER</span>
                </div>
                <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:900,color:"rgba(255,255,255,.9)",letterSpacing:"-.035em",lineHeight:1.2,marginBottom:12}}>Stay ahead of AI in biopharma commercial learning.</h3>
                <p style={{fontSize:14,color:"rgba(255,255,255,.38)",lineHeight:1.68,marginBottom:24}}>Frameworks, research, field notes, and partnership announcements from InsiteHub's practitioners. Sent when there's something genuinely worth your time. No vendor noise.</p>

                {/* What you get */}
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
                  {[
                    "Original research from Proxa Labs before it's published",
                    "New frameworks and tools — subscribers first",
                    "Field notes from active advisory engagements",
                    "Partnership & product announcements",
                  ].map(l=>(
                    <div key={l} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(244,128,31,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="#F4801F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,.45)",lineHeight:1.5}}>{l}</div>
                    </div>
                  ))}
                </div>

                <NewsletterInline/>

                <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.2)"}}>No spam. Unsubscribe anytime.</div>
                  <div style={{display:"flex",gap:8}}>
                    {[
                      {type:"linkedin",href:"https://linkedin.com/company/insitehub"},
                      {type:"facebook",href:"https://facebook.com/insitehub"},
                      {type:"x",href:"https://x.com/insitehub"},
                    ].map(s=>(
                      <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer"
                        style={{width:30,height:30,borderRadius:7,border:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,.28)",transition:"all .15s",textDecoration:"none"}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(244,128,31,.4)";e.currentTarget.style.color="#F4801F";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.28)";}}>
                        <SocialIcon type={s.type}/>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


    {/* FINAL CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">The mandate is clear.<br/><em>The platform is ready.</em></h2>
        <p className="cf-p">InsiteHub works with commercial L&D leaders who have an AI imperative and no reliable way to execute it. Let's figure out what your actual next step is.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("contact")}>Request a Platform Demo</button>
        </div>
      </div>
    </section>
  </>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   ADVISORY PAGE
══════════════════════════════════════════════════════════════════════════ */
const AdvisoryPage = ({ setPage }) => (
  <>
    <div className="ph" style={{textAlign:"left"}}>
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={500} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:820}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🧭 Advisory</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>
            The right AI solution is the one<br/>that survives <em style={{fontStyle:"normal",color:"var(--o)"}}>your</em> environment.
          </h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Most vendors lead with a demo. We lead with a diagnosis. InsiteHub Advisory maps your compliance requirements, your governance structure, and your team's actual readiness before recommending anything — because what fails biopharma AI implementations is never the technology.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Schedule a Discovery Call</button>
            <button className="bs" onClick={()=>setPage("contact")}>Request an Assessment</button>
          </div>
        </div>
      </div>
    </div>

    {/* THE PROBLEM */}
    <section className="sec sw">
      <div className="mw">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
          <div>
            <div className="ey">Why Advisory First</div>
            <h2 className="h2">Advisory is always the entry point. Not a starting option — a structural requirement.</h2>
            <p className="lead" style={{marginBottom:20}}>Deploying technology before diagnosing your environment is what every other vendor does. It's also why 80–95% of pharma AI pilots never scale. The organizations that succeed don't have better AI — they have better methodology.</p>
            <p className="lead" style={{marginBottom:32}}>InsiteHub Advisory builds your AI literacy, stress-tests use cases against your real organizational constraints, and delivers an executable roadmap your CCO can stand behind — before a single dollar is committed to technology.</p>
            <div className="qb">
              <div className="qb-t">"She doesn't need more evidence that AI can work. She needs a way to ensure it will work for her, in her environment, before she puts her credibility behind it."</div>
              <div className="qb-src">From InsiteHub's VP of Commercial L&D buyer research</div>
            </div>
          </div>
          <div style={{background:"var(--lt)",borderRadius:18,padding:30}}>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"var(--st)",fontWeight:700,marginBottom:20}}>THE FOUR FAILURE PATTERNS</div>
            {[{t:"No path from pilot to production",d:"Pilots are designed to succeed in controlled conditions. Production deployment is a governance, IT validation, and change management challenge. Most pilots were never designed to survive that moment."},{t:"Weak data foundations",d:"The AI works in the demo. It fails when introduced to your actual content architecture — legacy systems, approved materials in formats AI can't reliably process, no structured pipelines between LMS and CRM."},{t:"Misaligned ownership",d:"The pilot was owned by L&D or IT, not a commercial business leader with revenue accountability. Without a sponsor, it stalls at the governance gate and dies quietly in a committee meeting."},{t:"Measurement theater",d:"Engagement metrics that can't show a line to commercial performance. When the CCO asks 'what did this do for revenue?' the answer is a learning maturity framework. Projects that can't answer that question get cut."}].map((f,i)=>(
              <div key={f.t} style={{paddingBottom:i<3?16:0,marginBottom:i<3?16:0,borderBottom:i<3?"1px solid var(--br)":"none"}}>
                <div style={{fontSize:14,fontWeight:700,color:"var(--dk)",marginBottom:5}}>{f.t}</div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.58}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* INLINE CTA */}
    <div style={{padding:"0 56px",background:"var(--sw)"}}>
      <div className="mw" style={{paddingBottom:0}}>
        <div className="cta-bar">
          <div>
            <div className="cta-bar-t">Not sure where to start? That's the right conversation to have.</div>
            <div className="cta-bar-s">A 30-minute diagnostic call costs nothing. It produces a clear picture of where your AI readiness gaps actually are.</div>
          </div>
          <button className="cta-bar-btn" onClick={()=>setPage("contact")}>Book a 30-Minute Call</button>
        </div>
      </div>
    </div>

    {/* ENGAGEMENT TYPES */}
    <section className="sec sl">
      <div className="mw">
        <div className="sh">
          <div className="ey">How We Work</div>
          <h2 className="h2">Structured engagements.<br/>Concrete deliverables. No open-ended retainers.</h2>
          <p className="lead">Every InsiteHub Advisory engagement is time-bounded, scoped to a specific question, and ends with a deliverable you can act on — whether or not the engagement continues. The model is designed to generate evidence before asking for commitment.</p>
        </div>
        <div className="ag">
          {[
            {n:"Entry Point",t:"AI Strategy & Roadmap Workshop",d:"Executive alignment on AI investment priorities, use cases, and implementation roadmap. Designed for leadership teams that need to get aligned before they can act. The lowest-risk starting point for any organization."},
            {n:"Foundation",t:"AI Readiness & Maturity Assessment",d:"Custom AI maturity model, commercial learning capability heatmap, technology gap analysis, and prioritized use case roadmap with clear accountability for what happens next. The diagnostic that determines every subsequent investment decision."},
            {n:"Selection",t:"Learning Technology & GenAI Platform Assessment",d:"Comprehensive vendor evaluation, compliance and regulatory risk assessment, integration feasibility study, and vendor scoring matrix. Built for the buyer who has been burned by demos and needs a defensible recommendation."},
            {n:"Governance",t:"AI Governance & Compliance Framework",d:"End-to-end governance framework for AI-generated commercial content. Role-based use guidelines, compliance monitoring architecture, and steering committee operating model. The pre-condition for any regulated AI deployment."},
            {n:"Infrastructure",t:"Learning Infrastructure & AI Integration Assessment",d:"Data architecture review, AI infrastructure readiness analysis, and phased modernization roadmap. For organizations where the legacy stack is the real constraint — and where every vendor has underestimated the integration complexity."},
            {n:"Organization",t:"AI-Optimized Org Design",d:"Organizational structure recommendations for AI-enabled commercial learning at scale. Who owns what, how teams evolve, and what the governance model looks like as AI capability expands across the commercial organization."},
          ].map(a=>(
            <div key={a.n} className="ac">
              <div className="ac-n">{a.n}</div>
              <div className="ac-t">{a.t}</div>
              <div className="ac-d">{a.d}</div>
            </div>
          ))}
        </div>
        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("contact")}>Talk to an Advisor</button>
          <button className="bs" onClick={()=>setPage("platform")}>See the AI Platform</button>
          <button className="bt" onClick={()=>setPage("content")}>Content Development Services →</button>
        </div>
      </div>
    </section>

    {/* PROOF */}
    <section className="sec sw">
      <div className="mw">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <div className="ey">Why InsiteHub</div>
            <h2 className="h2">We don't need you to explain biopharma to us.</h2>
            <p className="lead" style={{marginBottom:20}}>InsiteHub's practitioners have operated inside commercial organizations at the level where these decisions actually get made. The failure modes are a first-hand record — not a consulting framework built from the outside looking in.</p>
            <p className="lead" style={{marginBottom:32}}>That means you spend zero time educating us about MLR review timelines, GxP validation, or the political dynamics of a federated commercial structure. Every hour of education overhead is an hour you're not moving toward the outcome your CCO is watching.</p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button className="bp" onClick={()=>setPage("about")}>Our Story &amp; Track Record</button>
              <button className="bs" onClick={()=>setPage("contact")}>Start a Conversation</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[{label:"Vanguard Award · AstraZeneca · 2008–2009",t:"Best Corporate Learning Program in the World",d:"When the standard approach was a $5M vendor platform, InsiteHub's practitioners built something no one had built before — saving the organization ~$10M while delivering engagement the industry had never seen. That program was built under the same launch pressure, compliance constraints, and governance requirements our clients navigate today."},{label:"Methodology Origin · Bell Labs",t:"Experimentation before commitment — not a consulting trend, a foundational principle",d:"The experimentation-before-deployment approach at the core of every InsiteHub engagement traces to Bell Labs: you run controlled experiments before committing to a direction. You don't wait for certainty, but you don't bet the organization on a vendor demo either. That thinking shaped 25 years of biopharma implementation work."}].map(c=>(
              <div key={c.t} style={{background:"var(--lt)",borderRadius:16,padding:28}}>
                <div style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:8}}>{c.label}</div>
                <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.025em",lineHeight:1.3}}>{c.t}</div>
                <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* HOW WE ENGAGE */}
    <section className="sec sl">
      <div className="mw">
        {/* AI Literacy inline callout */}
        <div style={{background:"linear-gradient(135deg,#FFFBF0,#FFF5E0)",border:"1.5px solid rgba(245,158,11,.25)",borderRadius:16,padding:"22px 28px",marginBottom:44,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <div style={{fontSize:28}}>🎓</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:"#D97706",fontFamily:"Manrope,sans-serif",marginBottom:3}}>Before we recommend technology, we often recommend literacy.</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>Organizations that deploy AI tools into teams that don't understand them fail at adoption. The AI Literacy Program runs alongside or ahead of any advisory engagement — and is always worth doing first.</div>
          </div>
          <button onClick={()=>setPage("literacy")} style={{padding:"10px 20px",borderRadius:9,background:"#D97706",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",flexShrink:0,whiteSpace:"nowrap"}}>See the Literacy Program</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
          <div>
            <div className="ey">How We Engage</div>
            <h2 className="h2">Structured engagements.<br/>Clear starting points.<br/>No open-ended commitments.</h2>
            <p className="lead" style={{marginBottom:20}}>Every InsiteHub engagement is time-bounded and scoped to a specific question, with a deliverable you can act on whether or not the relationship continues. We don't do open-ended retainers.</p>
            <p className="lead" style={{marginBottom:32}}>Most clients start with an advisory diagnostic or AI strategy workshop — a defined scope, a concrete deliverable, and a clear picture of what the next step would look like. That's typically where the relationship begins.</p>
            <button className="bp" onClick={()=>setPage("contact")}>Start with a Discovery Call</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {step:"Step 1",icon:"🔍",t:"30-Minute Discovery Call",d:"No cost, no commitment. We map your situation, your constraints, and what's already been tried. At the end, we tell you what we'd look at first — and whether InsiteHub is the right fit."},
              {step:"Step 2",icon:"📋",t:"Scoped Diagnostic or Workshop",d:"A time-bounded engagement with a clear deliverable — an AI readiness assessment, a use case prioritization workshop, or a governance framework. You walk away with something you can use regardless of what comes next."},
              {step:"Step 3",icon:"🚀",t:"Pilot or Platform Engagement",d:"If the diagnostic confirms a fit, we scope the next phase together — a Proxa Labs AI experiment, an advisory roadmap, or a platform implementation. Every subsequent step has defined scope, defined deliverables, and a clear go/no-go point."},
            ].map((s,i)=>(
              <div key={s.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:14,padding:22,display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:36,height:36,borderRadius:10,background:"var(--o10)",border:"1px solid var(--o20)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{s.icon}</div>
                <div>
                  <div style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:4}}>{s.step}</div>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6}}>{s.t}</div>
                  <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">Start with a <em>diagnosis.</em></h2>
        <p className="cf-p">30 minutes. No demo. Tell us about your environment, what you've tried, and where you've been stuck. We'll tell you what we'd look at first.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Schedule a Discovery Call</button>
          <button className="bt-wt" onClick={()=>setPage("platform")}>Explore the Platform →</button>
        </div>
      </div>
    </section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   PLATFORM PAGE
══════════════════════════════════════════════════════════════════════════ */
const PlatformPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:780}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🤖 AI-First Platform</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Intelligent Capability<br/><span style={{color:"var(--o)"}}>Development.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>The only closed-loop platform that automatically turns assessment failures into new content builds. Four products. One shared data layer. No human handoff, no vendor dependency, no integration tax.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>setPage("contact")}>Book a Demo</button>
            <button className="bs" onClick={()=>setPage("advisory")}>Start with Advisory First</button>
          </div>
        </div>
      </div>
    </div>
    <section className="sec sw">
      <div className="mw">
        {/* Loop diagram dark card */}
        <div style={{background:"var(--dk)",borderRadius:22,padding:"48px 56px",marginBottom:56,position:"relative",overflow:"hidden"}}>
          <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{textAlign:"center",marginBottom:32}}>
              <div className="ey-wt" style={{textAlign:"center"}}>The Closed Loop</div>
              <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:"var(--wh)",letterSpacing:"-.035em",marginBottom:10}}>Build → Develop → Assess → Certify → Repeat</h3>
              <p style={{fontSize:14,color:"rgba(255,255,255,.38)",maxWidth:560,margin:"0 auto"}}>A continuous cycle. Content created in Forge powers learning in Atlas, assessed in Echo, drives Certify — and gaps detected restart the loop automatically.</p>
            </div>
            <svg width="100%" viewBox="0 0 700 300" style={{maxWidth:680,display:"block",margin:"0 auto"}}>
              <defs>
                {[["af","#F4801F"],["aa","#007AFF"],["ae","#7C3AED"],["ac","#059669"]].map(([id,c])=>(
                  <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M1 1L9 5L1 9" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                ))}
              </defs>
              {[{d:"M240 62 Q350 18 460 62",c:"#F4801F",m:"af",lx:350,ly:22,t:"content published"},{d:"M548 100 Q594 150 548 200",c:"#007AFF",m:"aa",lx:638,ly:154,t:"readiness reached"},{d:"M460 238 Q350 282 240 238",c:"#7C3AED",m:"ae",lx:350,ly:294,t:"competency demonstrated"},{d:"M152 200 Q106 150 152 100",c:"#059669",m:"ac",lx:56,ly:150,t:"gap → rebuild"}].map((a,i)=>(
                <g key={i}>
                  <path d={a.d} fill="none" stroke={a.c} strokeWidth="1.5" strokeOpacity=".5" markerEnd={"url(#"+a.m+")"}/>
                  <text x={a.lx} y={a.ly} textAnchor="middle" style={{fontSize:10,fill:a.c,opacity:.65,fontFamily:"DM Sans,sans-serif"}}>{a.t}</text>
                </g>
              ))}
              {[{x:100,y:30,c:"#F4801F",bg:"rgba(244,128,31,.1)",n:"Forge",s:"Builds content",ss:"Courses · Inserts · SOPs"},{x:448,y:30,c:"#007AFF",bg:"rgba(0,122,255,.1)",n:"Atlas",s:"Delivers learning",ss:"Adaptive · Gap-aware"},{x:448,y:200,c:"#7C3AED",bg:"rgba(124,58,237,.1)",n:"Echo",s:"Assesses in roleplay",ss:"HCP avatars · Scoring"},{x:100,y:200,c:"#059669",bg:"rgba(5,150,105,.1)",n:"Certify",s:"Confirms readiness",ss:"Behavioral proof"}].map(nd=>(
                <g key={nd.n}>
                  <rect x={nd.x} y={nd.y} width={148} height={68} rx="11" fill={nd.bg} stroke={nd.c} strokeWidth="1" strokeOpacity=".45"/>
                  <text x={nd.x+74} y={nd.y+24} textAnchor="middle" style={{fontSize:13,fontWeight:800,fill:nd.c,fontFamily:"Manrope,sans-serif"}}>{nd.n}</text>
                  <text x={nd.x+74} y={nd.y+41} textAnchor="middle" style={{fontSize:11,fill:"rgba(255,255,255,.48)",fontFamily:"DM Sans,sans-serif"}}>{nd.s}</text>
                  <text x={nd.x+74} y={nd.y+56} textAnchor="middle" style={{fontSize:9.5,fill:"rgba(255,255,255,.26)",fontFamily:"DM Sans,sans-serif"}}>{nd.ss}</text>
                </g>
              ))}
              {["INTELLIGENT","CAPABILITY","DEVELOPMENT"].map((w,i)=>(
                <text key={w} x="350" y={138+i*15} textAnchor="middle" style={{fontSize:9,fill:"rgba(255,255,255,.15)",letterSpacing:".1em",fontFamily:"Manrope,sans-serif"}}>{w}</text>
              ))}
            </svg>
          </div>
        </div>
        {/* Product detail cards */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {[
            {c:"#F4801F",bg:"rgba(244,128,31,.07)",icon:"⚡",name:"InsiteHub Forge",tag:"Agentic content creation",desc:"Forge AI agents build MLR-compliant training content from your PI, CSRs, and brand assets. Every claim is automatically cited. MLR review artifacts are auto-generated alongside the content — not as an afterthought. The Content Gap Analyzer monitors Echo scorecard data and queues new content builds when competency gaps emerge, closing the loop without any human handoff.",bullets:["Auto-generation from clinical data and product labeling","Citation tracking: every claim traced to PI or CSR","Veeva MLR workflow integration — approval-ready output","Content Gap Analyzer feeds directly from Echo scorecard failures","AI-assisted and traditional instructional design options available"]},
            {c:"#007AFF",bg:"rgba(0,122,255,.07)",icon:"🎓",name:"InsiteHub Atlas",tag:"AI-powered adaptive learning",desc:"Atlas delivers personalized learning pathways mapped to specific competencies and role requirements. The gap-aware engine identifies knowledge deficiencies in real time and adjusts content delivery before reps reach the field. Manager and admin dashboards provide full visibility into team readiness, certification progress, and competency heat maps across the commercial organization.",bullets:["Competency-role mapping with behavioral rubrics","Adaptive pathways that respond dynamically to gap detection","AI Tutor: four modes — Explain / Quiz / Deep Dive / Practice","Manager dashboards with predictive readiness scoring and alerts","Veeva and InsiteX LMS integration"]},
            {c:"#7C3AED",bg:"rgba(124,58,237,.07)",icon:"🎭",name:"InsiteHub Echo",tag:"AI roleplay & behavioral assessment",desc:"Echo delivers live HCP roleplay using AI-powered physician avatars with behavioral models based on real physician interaction patterns. ComplianceGuard monitors every rep message in real time — flagging off-label language, unsupported claims, and competitor references before they become compliance issues. Behavioral scoring benchmarks reps against industry averages and top quartile performance.",bullets:["8 HCP digital twin avatars with physician behavioral models","ComplianceGuard: 8 real-time detection categories","Behavioral scorecard: pacing, objection handling, empathy signals","Full transcript + SHA-256 immutable audit log","Gap payload → Forge auto-rebuild pipeline"]},
            {c:"#059669",bg:"rgba(5,150,105,.07)",icon:"✅",name:"Certify",tag:"Demonstrated field readiness",desc:"Certification is earned through demonstrated behavioral competency — not attendance. Reps must pass Echo assessments, complete Atlas pathways, and meet competency thresholds before receiving any credential. Certification records are audit-ready, tied to specific behavioral evidence, and retained for 10 years. When certification requirements change or gaps emerge, the loop restarts automatically.",bullets:["Competency-gated — no pathway shortcuts, no attendance credit","Behavioral evidence tied to every issued certification","10-year audit trail with SHA-256 immutable logs","SOC 2 Type II compliant certification architecture","Triggers Forge content rebuild automatically on competency failure"]},
          ].map(p=>(
            <div key={p.name} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:18,padding:34,borderLeft:("4px solid "+p.c)}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:22}}>
                <div style={{width:56,height:56,borderRadius:15,background:p.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{p.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:14,marginBottom:10}}>
                    <div style={{fontSize:22,fontWeight:900,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em"}}>{p.name}</div>
                    <div style={{fontSize:12,color:"var(--st)"}}>{p.tag}</div>
                  </div>
                  <p style={{fontSize:14.5,color:"var(--bd)",lineHeight:1.7,marginBottom:22}}>{p.desc}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                    {p.bullets.map(b=><div key={b} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13,color:"var(--bd)"}}><div style={{width:5,height:5,borderRadius:"50%",background:p.c,flexShrink:0,marginTop:7}}/>{b}</div>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Platform Demo</button>
          <button className="bs" onClick={()=>setPage("advisory")}>Start with Advisory First</button>
          <button className="bt" onClick={()=>setPage("insitex")}>Not ready for AI? See InsiteX →</button>
        </div>

        {/* PRODUCT UI PREVIEWS */}
        <div style={{marginTop:64}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="ey" style={{textAlign:"center"}}>Platform Previews</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:26,fontWeight:800,color:"var(--dk)",letterSpacing:"-.035em"}}>What it looks like inside.</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            {[
              {c:"#F4801F",name:"InsiteHub Forge",sub:"Content creation agent session",rows:[
                {label:"Launch Content Agent",pct:88,c:"#F4801F",bg:"rgba(244,128,31,.12)"},
                {label:"MLR citation check",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Veeva routing queued",pct:62,c:"#007AFF",bg:"rgba(0,122,255,.12)"},
              ],status:"3 artifacts ready for MLR review"},
              {c:"#007AFF",name:"InsiteHub Atlas",sub:"Rep pathway dashboard",rows:[
                {label:"Sarah Chen · Oncology pathway",pct:74,c:"#007AFF",bg:"rgba(0,122,255,.12)"},
                {label:"Knowledge gap detected · MOA",pct:41,c:"#F59E0B",bg:"rgba(245,158,11,.12)"},
                {label:"Echo readiness threshold",pct:90,c:"#059669",bg:"rgba(5,150,105,.12)"},
              ],status:"Echo assessment unlocked"},
              {c:"#7C3AED",name:"InsiteHub Echo",sub:"HCP roleplay session · Dr. Kim",rows:[
                {label:"Clinical accuracy score",pct:82,c:"#7C3AED",bg:"rgba(124,58,237,.12)"},
                {label:"Compliance guard · clean",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Objection handling",pct:67,c:"#F59E0B",bg:"rgba(245,158,11,.12)"},
              ],status:"Scorecard generating…"},
              {c:"#059669",name:"Certify",sub:"Certification audit record",rows:[
                {label:"Competency threshold met",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"Behavioral evidence logged",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
                {label:"SHA-256 audit trail",pct:100,c:"#059669",bg:"rgba(5,150,105,.12)"},
              ],status:"Certification issued · 10yr record"},
            ].map(p=>(
              <div key={p.name} className="prod-preview">
                <div className="pp-topbar">
                  {["#FF5F57","#FEBC2E","#28C840"].map(c=><div key={c} className="pp-dot" style={{background:c}}/>)}
                  <div style={{marginLeft:8,fontSize:11,color:"rgba(255,255,255,.25)",fontFamily:"DM Sans,sans-serif"}}>{p.name} · {p.sub}</div>
                </div>
                <div className="pp-content">
                  <div style={{fontSize:10,letterSpacing:".1em",textTransform:"uppercase",color:p.c,fontWeight:700,marginBottom:12,opacity:.8}}>{p.sub}</div>
                  {p.rows.map(r=>(
                    <div key={r.label} className="pp-row" style={{background:r.bg}}>
                      <div className="pp-label" style={{color:"rgba(255,255,255,.7)",minWidth:180,fontSize:11}}>{r.label}</div>
                      <div style={{flex:1,height:4,background:"rgba(255,255,255,.08)",borderRadius:2}}>
                        <div className="pp-bar" style={{width:(r.pct+"%"),background:r.c,opacity:.8}}/>
                      </div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)",minWidth:32,textAlign:"right"}}>{r.pct}%</div>
                    </div>
                  ))}
                  <div style={{marginTop:14,padding:"8px 12px",background:"rgba(255,255,255,.03)",borderRadius:8,border:"1px solid rgba(255,255,255,.06)",fontSize:11,color:p.c,fontWeight:600}}>⬤ {p.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sec-cta">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Platform Demo</button>
          <button className="bs" onClick={()=>setPage("advisory")}>Start with Advisory First</button>
          <button className="bt" onClick={()=>setPage("insitex")}>Not ready for AI? See InsiteX →</button>
        </div>
      </div>
    </section>

    {/* LITERACY PREREQ CALLOUT */}
    <section className="sec sl"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:48,alignItems:"center"}}>
        <div>
          <div className="ey">Before You Deploy</div>
          <h2 className="h2">Make sure your team is ready for what you're about to give them.</h2>
          <p className="lead" style={{marginBottom:24}}>The most common reason AI platforms underdeliver isn't the technology — it's that the team hasn't built the foundation to use them well. InsiteHub's AI Literacy Program closes that gap before go-live, and makes every platform dollar work harder.</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"DM Sans,sans-serif",fontSize:15,fontWeight:700,color:"#fff",cursor:"pointer",padding:"14px 32px",borderRadius:11,border:"none",background:"#D97706",transition:"all .2s"}} onClick={()=>setPage("literacy")}>See the AI Literacy Program</button>
            <button className="bs" onClick={()=>setPage("contact")}>Talk to Us About Sequencing</button>
          </div>
        </div>
        <div style={{background:"rgba(245,158,11,.06)",border:"1.5px solid rgba(245,158,11,.2)",borderRadius:18,padding:28}}>
          {["Teams understand what tools do — and don't do","Managers can interpret AI-generated readiness scores","Compliance teams know the MLR risk profile","Adoption happens faster, resistance is lower","Platform ROI is realized, not just purchased"].map(t=>(
            <div key={t} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
              <div style={{color:"#D97706",fontWeight:700,fontSize:14,flexShrink:0}}>✓</div>
              <div style={{fontSize:13,color:"var(--dk)",lineHeight:1.5}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div></section>

    <section className="cta-full">
      <div style={{position:"relative",zIndex:1}}>
        <h2 className="cf-h">See the closed loop <em>in action.</em></h2>
        <p className="cf-p">We'll walk you through Forge, Atlas, and Echo in the context of your commercial organization — not a generic product tour.</p>
        <div className="cf-btns">
          <button className="bp" onClick={()=>setPage("contact")}>Book a Demo</button>
          <button className="bt-wt" onClick={()=>setPage("advisory")}>Start with Advisory →</button>
        </div>
      </div>
    </section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   INSITEX LMS PAGE
══════════════════════════════════════════════════════════════════════════ */
const InsiteXPage = ({ setPage }) => (
  <>
    <div className="ix-hero">
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.04,pointerEvents:"none"}} preserveAspectRatio="none">
        {Array.from({length:18},(_,i)=><line key={"v"+i} x1={(i*6)+"%"} y1="0%" x2={(i*6)+"%"} y2="100%" stroke="#F4801F" strokeWidth="1"/>)}
        {Array.from({length:10},(_,i)=><line key={"h"+i} x1="0%" y1={(i*11.1)+"%"} x2="100%" y2={(i*11.1)+"%"} stroke="#F4801F" strokeWidth="1"/>)}
      </svg>
      <div style={{position:"absolute",top:-180,right:-180,width:700,height:700,background:"radial-gradient(circle,rgba(244,128,31,.14) 0%,transparent 68%)",borderRadius:"50%",pointerEvents:"none"}}/>
      <div className="mw" style={{position:"relative",zIndex:1}}>
        <div className="pbadge" style={{background:"rgba(244,128,31,.1)",border:"1px solid rgba(244,128,31,.25)",color:"#F4801F"}}>🖥️ InsiteX LMS</div>
        <h1 className="ph1" style={{color:"var(--wh)",maxWidth:760}}>Enterprise learning infrastructure.<br/><span style={{color:"var(--o)"}}>Built for biopharma. Not bolted on.</span></h1>
        <p className="psub" style={{color:"rgba(255,255,255,.48)",marginBottom:40,maxWidth:600}}>A cloud-based all-in-one learning platform for biopharma companies and health systems — with the compliance architecture, credentialing workflows, and content controls that life sciences actually requires.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <button className="bp" onClick={()=>setPage("contact")}>Request a Demo</button>
          <button className="bt-wt" onClick={()=>setPage("contact")}>Talk to an Expert</button>
        </div>
        <div style={{display:"flex",gap:44,marginTop:52,paddingTop:40,borderTop:"1px solid rgba(255,255,255,.07)"}}>
          {[{n:"4+",l:"Years serving biopharma"},{n:"30+",l:"Pharma & health system clients"},{n:"SCORM / AICC",l:"& PMRC compliant"},{n:"SOC 2",l:"Type II in progress"}].map(s=>(
            <div key={s.n}><div style={{fontSize:22,fontWeight:900,color:"var(--o)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",marginBottom:4}}>{s.n}</div><div style={{fontSize:12,color:"rgba(255,255,255,.32)"}}>{s.l}</div></div>
          ))}
        </div>
      </div>
    </div>
    <section className="sec sw"><div className="mw">
      <div className="sh"><div className="ey">Learner Experience</div><h2 className="h2">Modern, intuitive, and built for the pace of biopharma commercial teams.</h2><p className="lead">InsiteX delivers an engaging learner experience across every device and content modality — with the compliance and credentialing architecture that gives your regulatory team confidence.</p></div>
      <div className="ix-fg">
        {[{icon:"🗺️",t:"Personalized Learning Journey",d:"Custom pathways for each learner based on assigned or elective content. Progress tracking and completion status built in from day one."},{icon:"📱",t:"Device Agnostic + Native App",d:"Full web app that works on any device. Native app adds device-specific enhancements and app store distribution for field teams."},{icon:"🎬",t:"Multiple Modality Support",d:"Handles all media types. Full event management for ILT and vILT. Video processing and custom player included."},{icon:"💬",t:"Live Coaching & Collaboration",d:"Live video coaching tool and online community for informal learning, mentoring, and peer collaboration over time."},{icon:"📅",t:"Live Event Management",d:"Tracks all live events and vILT sessions with full Outlook and calendar integration. Reps always know what to do and when."},{icon:"🏅",t:"Badging & Certifications",d:"Custom badge development, credential assignment, and completion certification. Tracks internal and external certifications in one place."}].map(f=>(
          <div key={f.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{ e.currentTarget.style.borderColor="#F4801F"; e.currentTarget.style.background="rgba(244,128,31,.04)"; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--br)"; e.currentTarget.style.background="var(--lt)"; }}>
            <div style={{width:44,height:44,borderRadius:12,background:"var(--o10)",border:"1px solid var(--o20)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>{f.icon}</div>
            <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8}}>{f.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{f.d}</div>
          </div>
        ))}
      </div>
    </div></section>
    <section className="sec sd2"><div className="mw">
      <div className="sh"><div className="ey-wt">Mission Control</div><h2 className="h2-wt">Admin tools built for compliance teams who can't afford surprises.</h2><p className="lead-wt">InsiteX gives L&D operations real-time dashboards, full versioning control, AI-enabled authoring, and the compliance audit infrastructure biopharma requires.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[{icon:"📊",t:"Actionable Dashboards & Reports",d:"Real-time dashboards for critical information and custom reports for deeper analysis, customizable on the fly."},{icon:"🤖",t:"AI-Enabled Content Authoring",d:"Design and launch eLearning programs with AI assistance. Full versioning control, just-in-time editing, and form creation."},{icon:"📋",t:"Digital Forms & Workflow",d:"Design interactive forms tied back to the master learning record. Owner and approver assignment for compliance tracking."},{icon:"🔄",t:"Versioning Control & Revert",d:"All assets tracked with full versioning. External assets tracked via codes, expiration dates, and content owners."},{icon:"🔒",t:"Group & Role-Based Security",d:"All content access and administration controlled through group security and roles. SSO and Active Directory integration."},{icon:"📝",t:"AI-Enabled Assessments",d:"Comprehensive testing engine for formative and summative evaluation. Tracking, reporting, and custom analytics included."},{icon:"📁",t:"Flexible eLearning Support",d:"Design and launch within the platform or import external content. SCORM and AICC compliant for easy management."},{icon:"✅",t:"Validated & Compliant",d:"PMRC-aligned asset tracking. Fully validated version available. Digital signature capabilities. SOC 2 Type II in progress."}].map(f=>(
          <div key={f.t} className="fc" style={{display:"flex",gap:16,borderRadius:14,padding:20}} onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(244,128,31,.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.07)"}>
            <div style={{width:42,height:42,borderRadius:10,background:"rgba(244,128,31,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{f.icon}</div>
            <div><div className="fc-t" style={{fontSize:14,marginBottom:5}}>{f.t}</div><div className="fc-d">{f.d}</div></div>
          </div>
        ))}
      </div>
      <div className="sec-cta">
        <button className="bp" onClick={()=>setPage("contact")}>Request a Demo</button>
        <button className="bt-wt" onClick={()=>setPage("platform")}>Ready for AI? See the Platform →</button>
      </div>
    </div></section>
    {/* Upgrade path */}
    <section className="sec sw"><div className="mw">
      <div style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E4)",borderRadius:22,padding:48,border:"1px solid rgba(244,128,31,.18)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <div className="ey">When You're Ready</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:28,fontWeight:900,color:"var(--dk)",marginBottom:14,letterSpacing:"-.04em",lineHeight:1.16}}>InsiteX is the foundation.<br/>The AI platform is the upgrade.</h3>
            <p style={{fontSize:15,color:"var(--bd)",lineHeight:1.7,marginBottom:24}}>When you're ready to add AI-powered content creation, adaptive learning, and HCP roleplay assessment, InsiteX already connects. No rip-and-replace. An expansion of the infrastructure you already have.</p>
            <button className="bp" onClick={()=>setPage("platform")}>See the AI Platform →</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {[{f:"InsiteX LMS",fc:"#F4801F",to:"InsiteHub Atlas",tc:"#007AFF",d:"Atlas pathways live natively inside InsiteX. Competency data flows automatically."},{f:"Forge Content",fc:"#F4801F",to:"InsiteX Library",tc:"#007AFF",d:"MLR-approved Forge content publishes directly to the InsiteX content library."},{f:"Echo Scores",fc:"#7C3AED",to:"InsiteX Records",tc:"#059669",d:"Echo behavioral assessments tie back to the master learning record in InsiteX."}].map(r=>(
              <div key={r.f} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:12,padding:18,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"var(--o10)",color:"var(--o)",flexShrink:0,whiteSpace:"nowrap"}}>{r.f}</div>
                <div style={{color:"var(--st)",fontSize:16}}>→</div>
                <div style={{fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20,background:"var(--bl10)",color:"var(--bl)",flexShrink:0,whiteSpace:"nowrap"}}>{r.to}</div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div></section>
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">See InsiteX in your <em>commercial environment.</em></h2>
      <p className="cf-p">We'll walk through the platform against your specific compliance requirements, content types, and team structure.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Request a Platform Demo</button><button className="bt-wt" onClick={()=>setPage("advisory")}>Start with Advisory →</button></div>
    </div></section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   REMAINING PAGES (Content, About, Proxa Labs, Contact) — preserved from v3
══════════════════════════════════════════════════════════════════════════ */
const ContentPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:720}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📄 Content Development</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>Built for field readiness.<br/><span style={{color:"var(--o)"}}>Not completion rates.</span></h1>
        <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>A product launch doesn't get a second chance. InsiteHub content is developed with MLR compliance and behavioral effectiveness as design requirements — AI-powered when you're ready, human-led when you're not.</p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}><button className="bp" onClick={()=>setPage("contact")}>Talk to a Content Expert</button><button className="bs" onClick={()=>setPage("platform")}>See Forge (AI Content)</button></div>
      </div>
    </div></div>
    <section className="sec sw"><div className="mw">
      <div className="sh"><div className="ey">Two Tracks. One Standard.</div><h2 className="h2">AI-powered when you're ready.<br/>Human-led when you're not.</h2><p className="lead">InsiteHub delivers across both tracks with the same compliance standards and behavioral orientation. The track you choose today doesn't determine where you go next.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:48}}>
        {[{icon:"🤖",t:"AI-Powered Content (Forge)",d:"Forge agents generate MLR-compliant modules from PI, CSRs, and brand assets. Every claim cited. MLR review artifacts auto-generated. Development drops from months to hours — without sacrificing compliance integrity."},{icon:"✍️",t:"Traditional Instructional Design",d:"Full-service content by practitioners with deep biopharma commercial backgrounds. Therapy area expertise. Compliance-first. Field-validated. For organizations that need human judgment at every step."},{icon:"⚖️",t:"MLR-Integrated Design",d:"Compliance as a design input, not a last gate. Fewer revision cycles. Faster time-to-field. Content built to survive the governance process without sacrificing behavioral effectiveness. The buyers who've watched content stall in MLR review know exactly what this difference costs."},{icon:"🔄",t:"AI-Assisted Human Review",d:"Forge drafts the structure, citations, and compliance scaffolding. InsiteHub practitioners review, refine, and validate. The speed and consistency of AI with the quality assurance of experienced human judgment."}].map(c=>(
          <div key={c.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:28}}>
            <div style={{fontSize:26,marginBottom:14}}>{c.icon}</div>
            <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em"}}>{c.t}</div>
            <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.67}}>{c.d}</div>
          </div>
        ))}
      </div>
      <div style={{background:"var(--wh)",borderRadius:18,padding:32,border:"1.5px solid var(--br)"}}>
        <div className="ey">Therapy Area Coverage</div>
        <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"var(--dk)",marginBottom:14,letterSpacing:"-.03em"}}>Built for the complexity of biopharma commercial launches.</h3>
        <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7,maxWidth:680,marginBottom:22}}>InsiteHub content practitioners bring deep therapy area expertise across biopharma's major commercial categories. Content is not generic — it is developed with scientific rigor, regulatory sensitivity, and the field deployment realities that distinguish pharma from enterprise L&D.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {["Oncology","Immunology","Rare Disease","Cardiovascular","Metabolic","Neuroscience","Respiratory","Infectious Disease","Ophthalmology","Hematology"].map(t=>(
            <div key={t} style={{fontSize:12,fontWeight:600,padding:"7px 16px",borderRadius:20,background:"var(--lt)",border:"1.5px solid var(--br)",color:"var(--bd)"}}>{t}</div>
          ))}
        </div>
      </div>
      <div className="sec-cta">
        <button className="bp" onClick={()=>setPage("contact")}>Talk to a Content Expert</button>
        <button className="bs" onClick={()=>setPage("platform")}>See Forge in the AI Platform</button>
      </div>
    </div></section>
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Content that reaches the field <em>on time.</em></h2>
      <p className="cf-p">Tell us about your next launch or your current content bottleneck. We'll show you how InsiteHub handles it.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Talk to a Content Expert</button><button className="bt-wt" onClick={()=>setPage("platform")}>See Forge →</button></div>
    </div></section>
  </>
);

const AboutPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:780}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>🏢 About InsiteHub</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>We've been solving problems<br/>biopharma didn't have<br/><span style={{color:"var(--o)"}}>solutions for yet.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>InsiteHub was built on a simple conviction: the best solutions in commercial learning don't come from vendors adapting generic products for pharma. They come from practitioners who've worked inside the environment and built something new because nothing adequate existed.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:64,marginBottom:80}}>
        <div>
          <div className="ey">Our Story</div>
          <h2 className="h2">Innovation that comes from the inside.</h2>
          {[
            "InsiteHub was founded on a track record of building things that didn't exist yet — not because they were technically interesting, but because the existing approaches were failing commercial organizations in ways that mattered. Content that missed launch windows. Training programs that produced completion metrics but not behavior change. Certification processes that gave organizations false confidence about field readiness.",
            "The methodology that defines every InsiteHub engagement today was forged in those failures — watching what happens when AI gets deployed into environments that weren't designed for it, when compliance review surfaces problems after the contract is signed, when a pilot succeeds in a controlled environment and dies at the governance gate.",
            "The result is an organization that leads with diagnosis rather than demonstration, experiments before it commits, and measures success against field performance — not engagement metrics.",
          ].map((p,i)=>(
            <p key={i} style={{fontSize:15.5,color:"var(--bd)",lineHeight:1.75,marginBottom:18}}>{p}</p>
          ))}
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:28}}>
            <button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button>
            <button className="bs" onClick={()=>setPage("advisory")}>Explore Advisory</button>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[
            {label:"Vanguard Award · Best Corporate Learning Program in the World",t:"Built something no one had built before — and it worked.",d:"When the standard approach to a major drug launch was a $5M vendor platform, InsiteHub's team built an immersive virtual world for 400 sales reps instead — at a fraction of the cost, with engagement the industry had never seen. That wasn't a technology decision. It was a problem-solving decision."},
            {label:"InsiteXcelerator · NIH Partnership",t:"2nd NIH-partnered biomedical accelerator outside a university in the US.",d:"Securing an NIH grant to accelerate biomedical commercialization through education isn't something a content vendor does. It reflects an institutional commitment to the intersection of innovation, science, and capability development that goes well beyond platform features."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--lt)",borderRadius:16,padding:28,borderLeft:"3px solid var(--o)"}}>
              <div style={{fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:10}}>{c.label}</div>
              <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",marginBottom:10,fontFamily:"Manrope,sans-serif",letterSpacing:"-.03em",lineHeight:1.28}}>{c.t}</div>
              <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* INNOVATION PROOF POINTS */}
      <div style={{background:"linear-gradient(135deg,#FFF8F1,#FFF2E6)",borderRadius:22,padding:48,marginBottom:80,border:"1px solid rgba(244,128,31,.15)"}}>
        <div style={{marginBottom:36}}>
          <div className="ey">A Pattern of Innovation</div>
          <h2 className="h2" style={{marginBottom:12}}>We don't describe our approach as innovative.<br/>We point to what it produced.</h2>
          <p className="lead">InsiteHub's innovation track record spans virtual world deployments, gamified learning at scale, NIH-funded biomedical acceleration, and now the first closed-loop AI platform in biopharma commercial learning. In each case, the starting point was the same: the existing solution wasn't good enough.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16}}>
          {[
            {icon:"🌐",num:"1st",label:"Virtual world for a drug launch",sub:"Built when competitors were quoting $5M platforms. Won the world's top corporate learning award.",c:"#F4801F"},
            {icon:"🎮",num:"100%",label:"Gamified training participation",sub:"600 sales managers. A SimCity-style game. The first program in the organization's history with universal adoption.",c:"#7C3AED"},
            {icon:"🏛️",num:"2nd",label:"NIH biomedical accelerator outside a university",sub:"One of only two in the US. An institutional signal that no vendor relationship replicates.",c:"#007AFF"},
            {icon:"🔄",num:"Only",label:"Closed-loop AI platform in commercial L&D",sub:"The only platform that automatically connects content creation to behavioral certification — and turns failures into rebuilds.",c:"#059669"},
          ].map(s=>(
            <div key={s.label} style={{textAlign:"center",padding:"24px 16px",background:"rgba(255,255,255,.7)",borderRadius:16,border:"1px solid rgba(244,128,31,.12)"}}>
              <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:6}}>{s.num}</div>
              <div style={{fontSize:13,fontWeight:700,color:"var(--dk)",marginBottom:6,lineHeight:1.3}}>{s.label}</div>
              <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ey">Our History</div>
      <h2 className="h2" style={{marginBottom:44}}>Built from the inside of biopharma. Not looking in from outside.</h2>
      <div className="tl">
        {[
          {date:"2010",t:"InsiteHub Founded",d:"Incorporated through the University of Delaware Spin-In Program and initially formed to serve life sciences commercial organizations. From day one, the focus was on building capability — not just delivering content."},
          {date:"2010s",t:"Expanded Across Life Sciences",d:"Grew from pharma commercial teams into clinical research, health systems, and health-related non-profits. Built a track record across 30+ organizations including AbbVie, Pfizer, Novartis, Biogen, Sanofi, and major academic medical centers."},
          {date:"2014–2018",t:"NIH Grant & InsiteXcelerator",d:"Awarded NIH grant to accelerate biomedical commercialization through education. InsiteXcelerator became the 2nd NIH-partnered biomedical accelerator outside a university in the United States — an institutional credibility signal no vendor relationship replicates."},
          {date:"2018–2022",t:"Enterprise LMS Platform",d:"Developed and launched InsiteX — an enterprise learning management platform built specifically for biopharma compliance, credentialing, and workflow requirements. Proven with multiple pharma and health system clients across four-plus years."},
          {date:"2023–Present",t:"AI-First Transformation",d:"Launched the InsiteHub AI product suite: Forge for agentic content creation, Atlas for adaptive learning, Echo for AI roleplay assessment, and Certify for competency-gated credentialing. The only closed-loop platform in commercial L&D that automatically connects content creation to behavioral certification — and turns assessment failures into new content builds."},
        ].map(t=>(
          <div key={t.date} className="tl-i"><div className="tl-d"/><div className="tl-ey">{t.date}</div><div className="tl-t">{t.t}</div><div className="tl-p">{t.d}</div></div>
        ))}
      </div>
    </div></section>
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Ready to work with a team<br/><em>that's been in your seat?</em></h2>
      <p className="cf-p">Start with a conversation. No demo. No pitch deck. Just your environment and what you're trying to solve.</p>
      <div className="cf-btns"><button className="bp" onClick={()=>setPage("contact")}>Start a Conversation</button><button className="bt-wt" onClick={()=>setPage("advisory")}>Explore Advisory →</button></div>
    </div></section>
  </>
);

const ProxaLabsPage = ({ setPage }) => (
  <>
    {/* HERO — vibrant purple-to-orange gradient, light feel */}
    <div style={{
      background:"linear-gradient(135deg, #F8F0FF 0%, #EDE0FF 30%, #FFF0E8 70%, #FFF8F2 100%)",
      padding:"148px 56px 80px", position:"relative", overflow:"hidden",
    }}>
      {/* Large decorative hex marks */}
      <div style={{position:"absolute",top:-60,right:-60,opacity:.12}}>
        <HexMark size={320} color="#7C3AED" strokeWidth={0.8}/>
      </div>
      <div style={{position:"absolute",bottom:-80,left:-40,opacity:.07}}>
        <HexMark size={260} color="#F4801F" strokeWidth={0.8}/>
      </div>
      {/* Glow blobs */}
      <div style={{position:"absolute",top:-100,right:100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-80,left:200,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(244,128,31,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>

      <div className="mw" style={{position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
          <div>
            <div className="pbadge" style={{background:"rgba(124,58,237,.1)",border:"1px solid rgba(124,58,237,.25)",color:"#7C3AED",marginBottom:20}}>🔬 Proxa Labs · AI Experimentation Partner</div>
            <h1 className="ph1" style={{color:"var(--dk)"}}>
              Your AI mandate deserves<br/>
              <span style={{background:"linear-gradient(135deg,#7C3AED,#F4801F)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>a properly designed experiment.</span>
            </h1>
            <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Proxa Labs helps commercial L&D organizations define the right AI use case, design a structured experiment, measure success against criteria that matter to leadership — and build the business case that turns results into action. Evidence before investment. Every time.</p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button style={{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:700,color:"#fff",cursor:"pointer",padding:"13px 28px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#7C3AED,#9B3AED)",transition:"all .2s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                Visit proxalabs.com →
              </button>
              <button className="bs" onClick={()=>setPage("contact")}>Get in Touch</button>
            </div>
          </div>
          {/* Right: animated stat cards */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[
              {icon:"🎯",label:"Use Case Definition",val:"Phase 1",desc:"Find the right problem before designing any solution — the step most organizations skip",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.18)"},
              {icon:"🔬",label:"Experiment Design",val:"Phase 2",desc:"Built to test against your real constraints — not a controlled environment engineered to succeed",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)"},
              {icon:"📈",label:"Success Measurement",val:"Phase 3",desc:"Metrics defined before the experiment runs — commercial performance, not engagement theater",c:"#059669",bg:"rgba(5,150,105,.07)",bc:"rgba(5,150,105,.18)"},
              {icon:"📋",label:"Business Case",val:"Phase 4",desc:"A leadership-ready ROI model and implementation roadmap before any scaling decision is made",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.18)"},
            ].map(s=>(
              <div key={s.label} style={{background:s.bg,border:("1.5px solid "+s.bc),borderRadius:18,padding:22,transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                <div style={{fontSize:22,marginBottom:10}}>{s.icon}</div>
                <div style={{fontSize:28,fontWeight:900,color:s.c,fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:6}}>{s.val}</div>
                <div style={{fontSize:12,fontWeight:700,color:s.c,marginBottom:6,letterSpacing:".03em"}}>{s.label}</div>
                <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* WHAT IS PROXA LABS */}
    <section className="sec sw"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
        <div>
          <div className="ey">What is Proxa Labs</div>
          <h2 className="h2">The lab behind the platform.<br/>And your AI experimentation partner.</h2>
          <p className="lead" style={{marginBottom:18}}>Proxa Labs exists because most AI implementations in biopharma don't fail at the technology level — they fail at the experimentation level. The use case was wrong, the success criteria were vague, the pilot wasn't designed to generate evidence, and no one built the business case until after the money was spent.</p>
          <p className="lead" style={{marginBottom:18}}>Proxa Labs was built to fix that specific problem. We help commercial L&D organizations design and execute structured AI experiments that generate defensible evidence — and turn that evidence into leadership-ready business cases before any large-scale commitment is made.</p>
          <p className="lead" style={{marginBottom:28}}>This is the same methodology that produced every InsiteHub AI product. It works externally for exactly the same reasons it works internally: it inverts the sequence. Evidence before investment. Every time.</p>
          {/* Specialty statement */}
          <div style={{background:"linear-gradient(135deg,rgba(124,58,237,.07),rgba(244,128,31,.07))",border:"1.5px solid rgba(124,58,237,.2)",borderRadius:16,padding:24}}>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"#7C3AED",fontWeight:700,marginBottom:12}}>Our Specialty</div>
            <p style={{fontSize:15,color:"var(--dk)",fontWeight:600,lineHeight:1.6,marginBottom:14}}>We specialize in helping organizations design, develop, implement, measure, and navigate AI pilots — end to end.</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {step:"Design",d:"Define the right use case, set honest success criteria, and structure the experiment to generate evidence — not just results."},
                {step:"Develop",d:"Build the pilot with your actual organizational constraints baked in: compliance, IT, governance, and stakeholder dynamics."},
                {step:"Implement",d:"Run the pilot with rigor. Monitor against pre-defined metrics. Surface issues before they become governance problems."},
                {step:"Measure",d:"Evaluate against commercial performance — not learning engagement. Produce results your CCO can interrogate."},
                {step:"Navigate",d:"Guide the transition from pilot evidence to organizational commitment. Build the business case. Manage the stakeholder map."},
              ].map((s,i)=>(
                <div key={s.step} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#7C3AED",background:"rgba(124,58,237,.1)",borderRadius:6,padding:"3px 9px",flexShrink:0,marginTop:1,letterSpacing:".04em"}}>{s.step}</div>
                  <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            {icon:"🧪",t:"Lab-Based Methodology",d:"Every engagement starts with a structured experiment — not a deployment. We test fit in your environment before any scaling decision is made.",c:"#7C3AED",bg:"rgba(124,58,237,.07)"},
            {icon:"🤝",t:"NIH Partnership",d:"InsiteHub leads InsiteXcelerator — one of only two NIH-partnered biomedical accelerators outside a university in the US.",c:"#059669",bg:"rgba(5,150,105,.07)"},
            {icon:"🌐",t:"Open Source Initiative",d:"Proxa Labs open-sources biopharma AI tooling, including an active hackathon to crowdsource an open-source HCP avatar engine.",c:"#F4801F",bg:"rgba(244,128,31,.07)"},
            {icon:"🎓",t:"University of Delaware",d:"AI Center of Excellence Business Partner in Residence. Bridging academic AI research and biopharma commercial deployment.",c:"#007AFF",bg:"rgba(0,122,255,.07)"},
          ].map(c=>(
            <div key={c.t} style={{background:c.bg,border:("1.5px solid "+c.c+"22"),borderRadius:16,padding:22,transition:"all .2s"}} onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px "+c.c+"18"; }} onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{fontSize:22,marginBottom:10}}>{c.icon}</div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8}}>{c.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div></section>

    {/* THE PROBLEM */}
    <section className="sec sl"><div className="mw">
      <div style={{maxWidth:760,margin:"0 auto",textAlign:"center",marginBottom:56}}>
        <div className="ey" style={{textAlign:"center"}}>Why Experimentation Fails</div>
        <h2 className="h2" style={{textAlign:"center"}}>Most AI pilots don't fail because the technology is wrong.<br/>They fail because the experiment was never designed properly.</h2>
        <p className="lead" style={{margin:"0 auto",textAlign:"center"}}>When there's no defined use case, no hypothesis, no success criteria, and no path from pilot to business case — the pilot produces interesting data and then quietly dies in a committee meeting. Proxa Labs exists to change that sequence.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {[
          {icon:"❓",t:"The use case is too broad",d:"'Use AI in training' is not a use case. It's a mandate. Organizations that succeed with AI start with a specific problem that has a measurable outcome — and they validate that problem before building anything.",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.15)"},
          {icon:"📐",t:"The experiment isn't designed to generate evidence",d:"A pilot that's scoped to succeed in controlled conditions proves nothing. A properly designed experiment tests the solution against your actual constraints — governance, data, workflow, compliance — so the results are defensible.",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.15)"},
          {icon:"📊",t:"There's no path to a business case",d:"Even pilots that work fail to scale because no one built the business case while the evidence was fresh. Leadership needs ROI framing, risk assessment, and a credible implementation path — not learning metrics.",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.15)"},
        ].map(p=>(
          <div key={p.t} style={{background:p.bg,border:("1.5px solid "+p.bc),borderRadius:18,padding:28}}>
            <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,.8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:16}}>{p.icon}</div>
            <div style={{fontSize:17,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,letterSpacing:"-.03em",lineHeight:1.25}}>{p.t}</div>
            <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{p.d}</div>
          </div>
        ))}
      </div>
    </div></section>

    {/* THE FOUR-PHASE EXPERIMENTATION MODEL */}
    <section className="sec sw"><div className="mw">
      <div className="sh">
        <div className="ey">The Proxa Labs Experimentation Model</div>
        <h2 className="h2">From pressure to proof.<br/>Four phases. One defensible outcome.</h2>
        <p className="lead">Every Proxa Labs client engagement follows the same structured sequence — designed to produce a leadership-ready business case, not just a pilot report. Each phase builds on the last, and the evidence generated at every step is the input for the next.</p>
      </div>

      {/* Phase cards — large, sequential, connected */}
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {[
          {
            n:"Phase 01", c:"#7C3AED", bg:"rgba(124,58,237,.06)", bc:"rgba(124,58,237,.15)",
            icon:"🎯", title:"Define the Right Use Case",
            sub:"Before anything is designed or built, we answer the question that determines whether all subsequent investment is justified: what specific problem does AI actually solve here, and is it the right problem to solve first?",
            body:"Most organizations arrive with a mandate — 'do something with AI' — rather than a use case. Proxa Labs starts by mapping the commercial learning landscape against the organization's strategic priorities, capability gaps, and governance constraints. We identify where AI creates the most value, where it creates the most risk, and where the organizational readiness exists to actually execute. The output is a prioritized use case hypothesis: a specific, bounded problem with a testable solution and a measurable outcome.",
            deliverable:"Prioritized use case brief with problem statement, hypothesis, expected impact, and organizational feasibility assessment.",
            outcomes:["Problem clearly bounded and separated from adjacent mandates","Use case ranked by value, feasibility, and governance risk","Stakeholder alignment map — who owns success, who can veto","Clear go/no-go criteria before experiment design begins"],
          },
          {
            n:"Phase 02", c:"#F4801F", bg:"rgba(244,128,31,.06)", bc:"rgba(244,128,31,.18)",
            icon:"🔬", title:"Design the Experiment",
            sub:"A well-designed AI experiment tests the solution against your actual constraints — not a controlled environment engineered to succeed. This is where most pilots go wrong, and it's the most important phase Proxa Labs manages.",
            body:"Proxa Labs designs structured experiments that are built to be honest. That means introducing real organizational friction — the compliance review process, the IT validation requirements, the BU ownership dynamics — during the experiment, not after it. We define the experiment scope, the participant cohort, the data collection approach, and the governance checkpoints. We identify the conditions under which the experiment will be considered a success and, equally important, the conditions under which it will be stopped. The result is an experiment that generates evidence you can defend, not just results that look good in a slide deck.",
            deliverable:"Experiment design document: scope, hypothesis, success criteria, failure criteria, governance checkpoints, and data collection plan.",
            outcomes:["Experiment designed against real organizational constraints","Success and failure criteria defined before the experiment runs","Data collection approach aligned to leadership's decision criteria","Governance and compliance requirements accounted for in design"],
          },
          {
            n:"Phase 03", c:"#059669", bg:"rgba(5,150,105,.06)", bc:"rgba(5,150,105,.15)",
            icon:"📈", title:"Define and Measure Success",
            sub:"Success criteria defined after a pilot produces good results are not success criteria — they're post-hoc rationalization. Proxa Labs defines what success looks like before the experiment runs, and measures against those criteria with independent rigor.",
            body:"We work with commercial leadership, L&D, and IT to define the metrics that actually matter to the organization's decision-makers — not the metrics that are easy to collect. In biopharma commercial learning, that means connecting learning outcomes to commercial performance: rep readiness scores, time-to-productivity, call quality, content velocity, and launch execution speed. Alongside the commercial metrics, we design the governance and compliance metrics that determine whether a solution is scalable in a regulated environment. Every measurement is tied back to the original use case hypothesis so the evaluation is clean, defensible, and free of confirmation bias.",
            deliverable:"Success measurement framework with primary metrics, secondary indicators, measurement methodology, and evaluation timeline.",
            outcomes:["Metrics defined pre-experiment — no post-hoc goal-setting","Commercial performance metrics, not just learning engagement metrics","Compliance and governance metrics built into evaluation criteria","Independent measurement approach to protect credibility of results"],
          },
          {
            n:"Phase 04", c:"#007AFF", bg:"rgba(0,122,255,.06)", bc:"rgba(0,122,255,.15)",
            icon:"📋", title:"Build the Business Case",
            sub:"The experiment is over. The evidence is real. Now the work that determines whether any of it scales: translating experimental results into a leadership-ready business case that survives budget scrutiny, compliance review, and the CCO's quarterly report.",
            body:"Most organizations treat business case development as an afterthought — something the L&D team does after the fact to justify a decision that's already been made. Proxa Labs builds the business case as a live artifact throughout the engagement, updating it at each phase so that when the experiment concludes, the case is ready. We frame the results in the language of commercial performance — revenue impact, cost reduction, risk mitigation — and build the ROI model, risk assessment, and implementation roadmap that executives actually use to make decisions. The output is not a learning metrics report. It's a decision document your CCO, CFO, and CHRO can act on.",
            deliverable:"Executive business case: ROI model, risk assessment, implementation roadmap, resource requirements, and phased scaling plan.",
            outcomes:["ROI framed in commercial performance terms — not L&D metrics","Risk assessment built for compliance, IT, and finance stakeholders","Phased implementation roadmap with clear go/no-go decision points","Ready for CCO, CFO, and CHRO — not just L&D leadership"],
          },
        ].map((ph,i,arr)=>(
          <div key={ph.n} style={{position:"relative"}}>
            <div style={{background:ph.bg,border:("1.5px solid "+ph.bc),borderRadius:20,padding:40,transition:"box-shadow .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 16px 48px "+ph.c+"12"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
                {/* Left */}
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                    <div style={{width:52,height:52,borderRadius:15,background:(ph.c+"15"),border:("1.5px solid "+ph.c+"30"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{ph.icon}</div>
                    <div>
                      <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:ph.c,fontWeight:700,marginBottom:3}}>{ph.n}</div>
                      <div style={{fontSize:22,fontWeight:900,color:"var(--dk)",fontFamily:"Manrope,sans-serif",letterSpacing:"-.04em",lineHeight:1.15}}>{ph.title}</div>
                    </div>
                  </div>
                  <p style={{fontSize:15,fontWeight:600,color:"var(--dk)",lineHeight:1.6,marginBottom:14,fontStyle:"italic"}}>{ph.sub}</p>
                  <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.72,marginBottom:20}}>{ph.body}</p>
                  <div style={{background:"rgba(255,255,255,.8)",border:("1px solid "+ph.bc),borderRadius:12,padding:"14px 18px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:ph.c,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Key Deliverable</div>
                    <div style={{fontSize:13.5,color:"var(--dk)",lineHeight:1.55}}>{ph.deliverable}</div>
                  </div>
                </div>
                {/* Right — outcomes */}
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:ph.c,letterSpacing:".1em",textTransform:"uppercase",marginBottom:16}}>What this phase produces</div>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {ph.outcomes.map((o,j)=>(
                      <div key={j} style={{display:"flex",gap:12,alignItems:"flex-start",background:"rgba(255,255,255,.7)",borderRadius:12,padding:"14px 16px",border:("1px solid "+ph.bc)}}>
                        <div style={{width:22,height:22,borderRadius:"50%",background:ph.c,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div style={{fontSize:13.5,color:"var(--dk)",lineHeight:1.5}}>{o}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Connector arrow between phases */}
            {i < arr.length-1 && (
              <div style={{display:"flex",justifyContent:"center",padding:"12px 0",zIndex:1,position:"relative"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                  <div style={{width:2,height:12,background:"var(--br)"}}/>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M8 10L0 0h16z" fill="var(--br)"/></svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sec-cta" style={{marginTop:48}}>
        <button className="bp" onClick={()=>setPage("contact")}>Start an Experimentation Engagement</button>
        <button className="bs" onClick={()=>setPage("advisory")}>See Advisory Services</button>
      </div>
    </div></section>

    {/* INLINE CTA */}
    <div style={{padding:"0 56px",background:"var(--sw)"}}>
      <div className="mw">
        <div className="cta-bar">
          <div>
            <div className="cta-bar-t">You have an AI mandate. We have the methodology to execute it.</div>
            <div className="cta-bar-s">A 30-minute conversation to assess whether your current use case is the right one. No demo, no commitment.</div>
          </div>
          <button className="cta-bar-btn" onClick={()=>setPage("contact")}>Start the Conversation</button>
        </div>
      </div>
    </div>

    {/* ACTIVE RESEARCH */}
    <section style={{background:"linear-gradient(135deg,#F5F0FF 0%,#EDE8FF 40%,#FFF5EE 100%)",padding:"96px 56px"}}>
      <div className="mw">
        <div className="sh">
          <div className="ey">Active Research</div>
          <h2 className="h2">What Proxa Labs is working on.</h2>
          <p className="lead">Open research areas that will shape the next generation of InsiteHub products — and inform how we design client experimentation engagements.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          {[
            {icon:"🎭",c:"#7C3AED",bg:"rgba(124,58,237,.08)",bc:"rgba(124,58,237,.18)",t:"Open-Source HCP Avatar Engine",d:"Active hackathon to crowdsource a real-time, open-source conversational avatar system — reducing Echo's dependency on vendor-locked infrastructure. $10K prize pool. Open to developers worldwide.",tag:"Actively recruiting"},
            {icon:"🔬",c:"#F4801F",bg:"rgba(244,128,31,.08)",bc:"rgba(244,128,31,.2)",t:"AI Readiness Scoring Model",d:"Proprietary maturity model for measuring commercial L&D AI readiness across 8 organizational dimensions. Research goal: predictive modeling of pilot success probability before any technology is deployed.",tag:"In development"},
            {icon:"🧠",c:"#007AFF",bg:"rgba(0,122,255,.08)",bc:"rgba(0,122,255,.2)",t:"Behavioral Learning Analytics",d:"Research into the correlation between AI-assessed behavioral competencies (Echo) and field performance outcomes. Early data shows r=0.84 correlation between module quality scores and certification rates.",tag:"Early results"},
          ].map(r=>(
            <div key={r.t} style={{background:r.bg,border:("1.5px solid "+r.bc),borderRadius:18,padding:28,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,.7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{r.icon}</div>
                <div style={{fontSize:10,fontWeight:700,color:r.c,background:"rgba(255,255,255,.7)",borderRadius:20,padding:"4px 12px",letterSpacing:".05em",textTransform:"uppercase"}}>{r.tag}</div>
              </div>
              <div style={{fontSize:18,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,letterSpacing:"-.03em",lineHeight:1.25}}>{r.t}</div>
              <div style={{fontSize:13.5,color:"var(--bd)",lineHeight:1.65}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">Most AI pilots fail before<br/><em>the experiment is even designed.</em></h2>
      <p className="cf-p">Proxa Labs helps you design experiments that generate real evidence — and turn that evidence into a business case your leadership can act on.</p>
      <div className="cf-btns">
        <button className="bp" onClick={()=>setPage("contact")}>Start an Experimentation Engagement</button>
        <button className="bt-wt">Visit proxalabs.com →</button>
      </div>
    </div></section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   AI LITERACY PAGE
══════════════════════════════════════════════════════════════════════════ */
const LiteracyPage = ({ setPage }) => (
  <>
    <div className="ph">
      <div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={460} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:800}}>
          <div className="pbadge" style={{background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.25)",color:"#D97706"}}>🎓 AI Literacy</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Your team can't use AI tools<br/>they don't <span style={{color:"#D97706"}}>understand or trust.</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>Before your commercial organization can deploy AI effectively, it needs a foundation — the concepts, the vocabulary, the judgment to know when AI is helping and when it isn't. InsiteHub's AI Literacy program builds that foundation across every role in your commercial structure.</p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <button className="bp" style={{background:"#D97706"}} onClick={()=>setPage("contact")}>Get the Program Overview</button>
            <button className="bs" onClick={()=>setPage("advisory")}>Start with Advisory First</button>
          </div>
        </div>
      </div>
    </div>

    {/* THE PROBLEM */}
    <section className="sec sl"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
        <div>
          <div className="ey">Why AI Literacy First</div>
          <h2 className="h2">Most AI implementations fail before the technology is ever deployed.</h2>
          <p className="lead" style={{marginBottom:20}}>The failure point isn't the platform. It's the team. Commercial organizations that try to deploy AI tools into a workforce that doesn't understand what AI actually does — and doesn't do — face resistance, misuse, and eventually abandonment.</p>
          <p className="lead" style={{marginBottom:32}}>AI literacy isn't a nice-to-have prerequisite. It's the single most important investment you can make before any AI platform goes live. It's also the fastest way to build the internal credibility that lets AI adoption succeed at scale.</p>
          <button className="bp" style={{background:"#D97706"}} onClick={()=>setPage("contact")}>Talk to Us About Literacy</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[
            {icon:"😰",t:"Teams that don't understand AI resist it",d:"Resistance to AI tools is almost always rooted in confusion, not opposition. People don't resist what they understand. They resist what feels opaque, unpredictable, or threatening to their role."},
            {icon:"⚠️",t:"Teams that misuse AI create compliance risk",d:"In a regulated commercial environment, an AI-literate team is a compliance control. An AI-illiterate team is a liability. The difference shows up in MLR review, field conversations, and audit trails."},
            {icon:"📉",t:"Low adoption kills ROI on every platform investment",d:"The fastest way to undermine a $500K AI platform investment is to deploy it into a team that doesn't know why it exists. Adoption without literacy is a slow-motion project failure."},
          ].map(c=>(
            <div key={c.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:14,padding:22,display:"flex",gap:16}}>
              <div style={{fontSize:24,flexShrink:0}}>{c.icon}</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:6}}>{c.t}</div>
                <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></section>

    {/* WHAT THE PROGRAM COVERS */}
    <section className="sec sw"><div className="mw">
      <div className="sh">
        <div className="ey">Program Overview</div>
        <h2 className="h2">Built for biopharma commercial teams.<br/>Not a generic AI course.</h2>
        <p className="lead">Every module is grounded in the commercial contexts your team actually works in — MLR review, HCP conversations, content creation, field execution, and compliance. This isn't a technology overview. It's a capability program.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:48}}>
        {[
          {icon:"🧠",t:"What AI Actually Does",d:"The foundational concepts — how large language models work, what they're good at, where they fail, and why the outputs require human judgment. Built for commercial professionals, not engineers.",audience:"All roles"},
          {icon:"⚖️",t:"AI in a Regulated Environment",d:"How AI interacts with MLR review, GxP validation, and compliance requirements. What the regulatory risk profile looks like. How to use AI tools without creating audit exposure.",audience:"Medical · Regulatory · Commercial"},
          {icon:"✍️",t:"AI for Content Creation",d:"How to work effectively with AI content generation tools — prompt design, output review, citation verification, and the human judgment layer that MLR requires regardless of how content is generated.",audience:"L&D · Medical Affairs · Marketing"},
          {icon:"🎭",t:"AI in Field Conversations",d:"What reps need to understand about AI-generated talking points, AI-coached preparation, and how HCP personas behave differently than human practice partners. How to trust — and verify — AI preparation tools.",audience:"Commercial · Sales"},
          {icon:"📊",t:"AI and Commercial Performance Data",d:"How AI-generated competency scores, behavioral assessments, and readiness predictions should be interpreted by managers. The difference between AI-assisted coaching and AI-replacing judgment.",audience:"Managers · L&D Leaders"},
          {icon:"🗺️",t:"Building an AI-Ready Mindset",d:"The organizational culture dimension — how to approach AI as an experiment-first capability, how to evaluate vendor claims, and how to develop the institutional vocabulary that lets AI governance work.",audience:"Leadership · CLO · VP L&D"},
        ].map(m=>(
          <div key={m.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:26,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#D97706";e.currentTarget.style.background="rgba(245,158,11,.04)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.background="var(--lt)";}}>
            <div style={{fontSize:26,marginBottom:12}}>{m.icon}</div>
            <div style={{fontSize:15,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,lineHeight:1.3}}>{m.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62,marginBottom:12}}>{m.d}</div>
            <div style={{fontSize:11,fontWeight:700,color:"#D97706",background:"rgba(245,158,11,.1)",borderRadius:20,padding:"3px 10px",display:"inline-block"}}>{m.audience}</div>
          </div>
        ))}
      </div>

      {/* DELIVERY */}
      <div style={{background:"linear-gradient(135deg,#FFFBF0,#FFF5E0)",border:"1px solid rgba(245,158,11,.2)",borderRadius:20,padding:48}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"#D97706",fontWeight:700,marginBottom:12}}>How It's Delivered</div>
            <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:24,fontWeight:800,color:"var(--dk)",marginBottom:14,letterSpacing:"-.03em",lineHeight:1.2}}>Modular. Role-specific.<br/>Designed to fit your launch calendar.</h3>
            <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7,marginBottom:20}}>The program is structured as a series of modular learning experiences — each role receives a targeted track, not a generic all-hands overview. Delivery can be integrated into InsiteX LMS, Atlas, or any existing LMS infrastructure.</p>
            <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7}}>For organizations preparing to deploy an AI platform, the literacy program runs 4–8 weeks ahead of platform launch. For organizations still evaluating AI, it runs as a standalone capability investment that returns value regardless of which platform you ultimately choose.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {icon:"🎯",t:"Role-Targeted Tracks",d:"Separate pathways for reps, managers, medical affairs, regulatory, and L&D leadership. Each track covers only what's relevant to that role."},
              {icon:"🔗",t:"Platform-Agnostic",d:"The program works independently of any InsiteHub platform. It doesn't require an AI deployment to be underway — it builds the foundation for one."},
              {icon:"📏",t:"Measurable Readiness Outcomes",d:"Pre and post assessments track AI literacy gains by role. Outputs tie directly to your AI readiness score and inform deployment sequencing."},
              {icon:"⚡",t:"4–8 Week Deployment",d:"Structured to integrate into existing commercial learning calendars. Minimal disruption to field teams. Maximum impact before AI tools go live."},
            ].map(d=>(
              <div key={d.t} style={{background:"rgba(255,255,255,.7)",borderRadius:12,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{fontSize:18,flexShrink:0}}>{d.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:3}}>{d.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{d.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sec-cta">
        <button className="bp" style={{background:"#D97706"}} onClick={()=>setPage("contact")}>Get the Program Overview</button>
        <button className="bs" onClick={()=>setPage("advisory")}>Bundle with Advisory</button>
        <button className="bt" onClick={()=>setPage("platform")}>See the AI Platform →</button>
      </div>
    </div></section>

    <section className="cta-full"><div style={{position:"relative",zIndex:1}}>
      <h2 className="cf-h">AI tools don't fail.<br/><em>Unprepared teams do.</em></h2>
      <p className="cf-p">Build the foundation before you deploy the platform. InsiteHub's AI Literacy program makes every subsequent AI investment more likely to stick.</p>
      <div className="cf-btns">
        <button className="bp" onClick={()=>setPage("contact")}>Get the Program Overview</button>
        <button className="bt-wt" onClick={()=>setPage("proxalab")}>Start with an AI Experiment →</button>
      </div>
    </div></section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ANNOUNCEMENTS PAGE
══════════════════════════════════════════════════════════════════════════ */
const NewsPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={440} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:720}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📣 Announcements</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>What's new at <span style={{color:"var(--o)"}}>InsiteHub.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>Partnerships, product launches, research milestones, and news from the team building the first closed-loop AI platform in biopharma commercial learning.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      {/* Featured announcement — UMU partnership */}
      <div style={{background:"linear-gradient(135deg,#F8F8FF,#F0F4FF)",border:"1.5px solid rgba(0,122,255,.2)",borderRadius:20,padding:40,marginBottom:40,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:16,right:20,fontSize:11,fontWeight:700,color:"#007AFF",background:"rgba(0,122,255,.1)",borderRadius:20,padding:"3px 11px",letterSpacing:".06em"}}>NEW PARTNERSHIP</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"var(--o)",fontWeight:700,marginBottom:10}}>April 2026 · Partnership Announcement</div>
            <h2 style={{fontFamily:"Manrope,sans-serif",fontSize:28,fontWeight:900,color:"var(--dk)",letterSpacing:"-.04em",lineHeight:1.15,marginBottom:14}}>InsiteHub partners with UMU.com to power AI Literacy delivery at scale.</h2>
            <p style={{fontSize:15,color:"var(--bd)",lineHeight:1.72,marginBottom:20}}>InsiteHub has entered into a strategic partnership with UMU.com, a leading AI-powered learning platform, to deliver the InsiteHub AI Literacy Program to biopharma commercial organizations globally. The partnership combines InsiteHub's biopharma domain expertise and curriculum design with UMU's enterprise learning delivery infrastructure — enabling scalable, measurable AI literacy programs that integrate with existing LMS environments.</p>
            <p style={{fontSize:15,color:"var(--bd)",lineHeight:1.72,marginBottom:28}}>The AI Literacy Program, now available through UMU, provides role-targeted learning tracks for commercial teams across reps, managers, medical affairs, regulatory, and L&D leadership — building the foundation every AI platform deployment needs to succeed.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button className="bp" onClick={()=>setPage("literacy")}>See the AI Literacy Program</button>
              <button className="bs" onClick={()=>setPage("contact")}>Request Partnership Info</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {icon:"🌐",t:"Global Delivery at Scale",d:"UMU's enterprise infrastructure enables InsiteHub to deliver AI Literacy programs to commercial organizations across North America, Europe, and Asia-Pacific."},
              {icon:"🔗",t:"LMS Integration",d:"The program integrates with InsiteX, existing pharma LMS environments, and UMU's native platform — no rip-and-replace required."},
              {icon:"📊",t:"Measurable Literacy Outcomes",d:"Pre and post assessments track AI literacy gains by role and cohort, with reporting that feeds directly into AI readiness planning and deployment sequencing."},
            ].map(f=>(
              <div key={f.t} style={{background:"rgba(255,255,255,.7)",border:"1px solid rgba(0,122,255,.12)",borderRadius:12,padding:"16px 20px",display:"flex",gap:14}}>
                <div style={{fontSize:20,flexShrink:0}}>{f.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:4}}>{f.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>{f.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional announcements */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:48}}>
        {[
          {date:"March 2026",tag:"Platform Update",tagC:"#7C3AED",tagBg:"rgba(124,58,237,.08)",icon:"🚀",t:"InsiteHub Echo — ComplianceGuard v2 Released",d:"Real-time compliance monitoring now includes enhanced MLR flag categorization, automated rephrasing suggestions, and expanded banned phrase detection across all six commercial verticals. Available to all Echo clients immediately."},
          {date:"February 2026",tag:"Research",tagC:"#059669",tagBg:"rgba(5,150,105,.08)",icon:"🔬",t:"Proxa Labs publishes AI Readiness Scoring Model beta",d:"The Proxa Labs team has released a beta version of the AI Readiness Scoring Model — an 8-dimension maturity framework for measuring commercial L&D AI readiness. Available to advisory engagement clients as part of Phase 1 diagnostics."},
          {date:"January 2026",tag:"Partnership",tagC:"#007AFF",tagBg:"rgba(0,122,255,.08)",icon:"🤝",t:"InsiteHub named University of Delaware AI Center of Excellence Business Partner in Residence",d:"InsiteHub has been appointed Business Partner in Residence at the University of Delaware's AI Center of Excellence — deepening the academic research relationship behind the Proxa Labs experimentation methodology."},
          {date:"December 2025",tag:"Platform Launch",tagC:"#F4801F",tagBg:"rgba(244,128,31,.08)",icon:"⚡",t:"InsiteHub Forge v4.0 — General Availability",d:"Forge's agentic content creation platform reaches general availability, including the Content Gap Analyzer, MLR Package Builder, and Knowledge Session dual-track sourcing engine. Available to enterprise commercial L&D teams now."},
        ].map(a=>(
          <div key={a.t} style={{background:"var(--wh)",border:"1.5px solid var(--br)",borderRadius:16,padding:28,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <span style={{fontSize:11,fontWeight:700,color:a.tagC,background:a.tagBg,borderRadius:20,padding:"3px 10px",letterSpacing:".04em"}}>{a.tag}</span>
              <span style={{fontSize:12,color:"var(--bdl)"}}>{a.date}</span>
            </div>
            <div style={{fontSize:20,marginBottom:10}}>{a.icon}</div>
            <div style={{fontSize:17,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,lineHeight:1.3}}>{a.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.65}}>{a.d}</div>
          </div>
        ))}
      </div>

      {/* Newsletter signup */}
      <div style={{background:"var(--dk)",borderRadius:20,padding:40,display:"flex",alignItems:"center",justifyContent:"space-between",gap:32,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"rgba(255,255,255,.85)",fontFamily:"Manrope,sans-serif",marginBottom:6}}>Get announcements in your inbox.</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.35)"}}>New partnerships, product updates, and research from InsiteHub and Proxa Labs.</div>
        </div>
        <button className="bp" onClick={()=>setPage("newsletter")}>Subscribe to Updates</button>
      </div>
    </div></section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   RESOURCES PAGE
══════════════════════════════════════════════════════════════════════════ */
const ResourcesPage = ({ setPage }) => (
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={440} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:720}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📚 Resources</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>Tools and frameworks you can<br/><span style={{color:"var(--o)"}}>use before you commit to anything.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>25 years of biopharma commercial L&D experience distilled into practical tools. No form required for the frameworks — just thinking you can take into your next leadership conversation.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      {/* Featured resources */}
      <div className="sh">
        <div className="ey">Frameworks & Guides</div>
        <h2 className="h2">Start here if you're still figuring out<br/>where AI fits in your organization.</h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:60}}>
        {[
          {icon:"📋",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)",tag:"Framework",t:"AI Readiness Self-Assessment",d:"A 15-question framework for evaluating your organization's readiness to deploy AI in commercial learning. Covers data foundations, governance structure, stakeholder alignment, technology infrastructure, and measurement capability.",cta:"Get the Framework"},
          {icon:"🗺️",c:"#7C3AED",bg:"rgba(124,58,237,.07)",bc:"rgba(124,58,237,.2)",tag:"Guide",t:"The AI Pilot Failure Taxonomy",d:"A breakdown of the four failure patterns that account for 80–95% of pharma AI pilot failures — and what each one looks like from the inside before it becomes a postmortem. Built from first-hand failure observation across 30+ biopharma organizations.",cta:"Get the Guide"},
          {icon:"📊",c:"#007AFF",bg:"rgba(0,122,255,.07)",bc:"rgba(0,122,255,.2)",tag:"Template",t:"Commercial L&D AI Business Case Template",d:"The ROI model structure InsiteHub uses with clients to translate pilot evidence into language the CCO, CFO, and CHRO can act on. Includes the metric hierarchy connecting L&D outputs to commercial performance.",cta:"Get the Template"},
          {icon:"🔬",c:"#059669",bg:"rgba(5,150,105,.07)",bc:"rgba(5,150,105,.2)",tag:"Model",t:"Proxa Labs Experimentation Design Canvas",d:"The structured canvas used in every Proxa Labs engagement to define a use case hypothesis, set success criteria, scope the experiment, and identify governance checkpoints — before a single line of code is written or a vendor is engaged.",cta:"Get the Canvas"},
          {icon:"⚖️",c:"#D97706",bg:"rgba(245,158,11,.07)",bc:"rgba(245,158,11,.2)",tag:"Checklist",t:"AI Vendor Evaluation Scorecard",d:"A 24-point evaluation matrix for assessing AI platform vendors in a biopharma commercial context. Covers compliance architecture, integration complexity, total cost of ownership, and implementation risk — built for the buyer who has been burned by demos.",cta:"Get the Scorecard"},
          {icon:"🧠",c:"#F4801F",bg:"rgba(244,128,31,.07)",bc:"rgba(244,128,31,.2)",tag:"Guide",t:"AI Literacy Program Overview",d:"A summary of InsiteHub's AI Literacy Program — what it covers, how it's delivered, which roles it targets, and how it fits into a broader AI deployment sequence. Includes the partnership with UMU.com for enterprise delivery.",cta:"Get the Overview"},
        ].map(r=>(
          <div key={r.t} style={{background:"var(--wh)",border:("1.5px solid "+r.bc),borderRadius:16,padding:28,display:"flex",flexDirection:"column",transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow=("0 10px 32px "+r.c+"18")} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{width:44,height:44,borderRadius:12,background:r.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>{r.icon}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:10,fontWeight:700,color:r.c,background:r.bg,borderRadius:20,padding:"2px 9px",letterSpacing:".05em"}}>{r.tag}</span>
            </div>
            <div style={{fontSize:16,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,lineHeight:1.3,flex:1}}>{r.t}</div>
            <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62,marginBottom:20}}>{r.d}</div>
            <button onClick={()=>setPage("contact")} style={{padding:"10px 18px",borderRadius:9,background:r.bg,border:("1.5px solid "+r.bc),color:r.c,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"DM Sans,sans-serif",transition:"all .15s",textAlign:"left"}}>{r.cta} →</button>
          </div>
        ))}
      </div>

      {/* Research section */}
      <div style={{borderTop:"1.5px solid var(--br)",paddingTop:56}}>
        <div className="sh">
          <div className="ey">From Proxa Labs</div>
          <h2 className="h2">Active research and early findings.</h2>
          <p className="lead">Open research from InsiteHub's AI lab — work in progress that will shape how we advise clients and build products.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[
            {icon:"🎭",tag:"Actively recruiting",tagC:"#7C3AED",t:"Open-Source HCP Avatar Engine",d:"Crowdsourcing a real-time, open-source conversational avatar system via hackathon. $10K prize pool. Reduces vendor lock-in for AI roleplay deployments across the industry."},
            {icon:"📈",tag:"Early results",tagC:"#059669",t:"Behavioral Analytics Correlation Study",d:"Early data shows r=0.84 correlation between AI-assessed behavioral competencies and field performance outcomes. Full study ongoing with InsiteHub Echo cohort data."},
            {icon:"🔬",tag:"In development",tagC:"#F4801F",t:"AI Readiness Predictive Model",d:"Building a predictive model for pilot success probability based on pre-deployment organizational readiness scores. Training data drawn from 30+ biopharma advisory engagements."},
          ].map(r=>(
            <div key={r.t} style={{background:"var(--lt)",border:"1.5px solid var(--br)",borderRadius:16,padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div style={{fontSize:24}}>{r.icon}</div>
                <span style={{fontSize:10,fontWeight:700,color:r.tagC,background:"var(--wh)",borderRadius:20,padding:"3px 10px",letterSpacing:".04em"}}>{r.tag}</span>
              </div>
              <div style={{fontSize:16,fontWeight:700,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:8,lineHeight:1.3}}>{r.t}</div>
              <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.62}}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sec-cta">
        <button className="bp" onClick={()=>setPage("newsletter")}>Subscribe for New Resources</button>
        <button className="bs" onClick={()=>setPage("proxalab")}>Explore Proxa Labs Research</button>
      </div>
    </div></section>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   NEWSLETTER PAGE
══════════════════════════════════════════════════════════════════════════ */
const NewsletterPage = ({ setPage }) => {
  const [form,setForm]=useState({email:"",name:"",role:"",interests:[]});
  const [done,setDone]=useState(false);
  const interests=["AI Platform Updates","Advisory Insights","Proxa Labs Research","AI Literacy Program","Announcements & Partnerships","New Frameworks & Guides"];
  const toggle=i=>setForm(f=>({...f,interests:f.interests.includes(i)?f.interests.filter(x=>x!==i):[...f.interests,i]}));
  return(
  <>
    <div className="ph"><div className="mw" style={{position:"relative"}}>
      <HexMarkLarge size={420} color="#F4801F" opacity={0.04}/>
      <div style={{position:"relative",zIndex:1,maxWidth:680}}>
        <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📬 Newsletter</div>
        <h1 className="ph1" style={{color:"var(--dk)"}}>Stay ahead of AI in<br/><span style={{color:"var(--o)"}}>biopharma commercial learning.</span></h1>
        <p className="psub" style={{color:"var(--bd)"}}>Frameworks, research, field notes, and announcements from InsiteHub's practitioners. Sent when there's something worth saying. No vendor noise, no weekly cadence for its own sake.</p>
      </div>
    </div></div>

    <section className="sec sw"><div className="mw">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}}>
        {/* Form */}
        <div>
          {done ? (
            <div style={{background:"rgba(5,150,105,.07)",border:"1px solid rgba(5,150,105,.2)",borderRadius:16,padding:40,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:16}}>✓</div>
              <div style={{fontSize:22,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10}}>You're subscribed.</div>
              <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.68,marginBottom:24}}>First issue lands when we have something genuinely worth your time. Check the resources page in the meantime.</div>
              <button className="bp" onClick={()=>setPage("resources")}>Browse Frameworks & Guides</button>
            </div>
          ) : (
            <>
              <label className="fl">First Name *</label>
              <input className="fi" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
              <label className="fl">Work Email *</label>
              <input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
              <label className="fl">Your Role</label>
              <select className="fi" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} style={{appearance:"none"}}>
                <option value="">Select your role...</option>
                {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r=><option key={r}>{r}</option>)}
              </select>
              <label className="fl" style={{marginBottom:12}}>What are you most interested in?</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
                {interests.map(i=>(
                  <div key={i} onClick={()=>toggle(i)} style={{padding:"10px 14px",borderRadius:9,border:("1.5px solid "+(form.interests.includes(i)?"var(--o)":"var(--br)")),background:form.interests.includes(i)?"var(--o10)":"var(--wh)",cursor:"pointer",fontSize:13,color:form.interests.includes(i)?"var(--o)":"var(--bd)",fontWeight:form.interests.includes(i)?600:400,transition:"all .15s",lineHeight:1.4}}>
                    {form.interests.includes(i)?"✓ ":""}{i}
                  </div>
                ))}
              </div>
              <button className="fsub" onClick={()=>{if(form.name&&form.email)setDone(true)}}>Subscribe →</button>
              <div style={{fontSize:12,color:"var(--bdl)",marginTop:12}}>No spam. Unsubscribe anytime. We send when there's something worth sending.</div>
            </>
          )}
        </div>
        {/* What to expect */}
        <div>
          <div className="ey">What You'll Receive</div>
          <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"var(--dk)",marginBottom:20,letterSpacing:"-.03em"}}>Useful thinking.<br/>When there's something to say.</h3>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[
              {icon:"🔬",t:"Proxa Labs Research Updates",d:"Early findings, new frameworks, and research milestones from InsiteHub's AI experimentation lab — before they become full publications."},
              {icon:"📣",t:"Partnership & Product Announcements",d:"New partnerships (like UMU.com), platform updates, and program launches — directly from the team building them."},
              {icon:"📋",t:"New Frameworks & Guides",d:"Every new resource InsiteHub publishes — AI readiness tools, business case templates, vendor evaluation scorecards — sent to subscribers first."},
              {icon:"🧠",t:"Field Notes from Advisory Engagements",d:"Anonymized patterns and insights from InsiteHub's advisory work — what's working, what's failing, and what questions organizations are actually asking right now."},
            ].map(c=>(
              <div key={c.t} style={{display:"flex",gap:14,padding:16,background:"var(--lt)",borderRadius:12,border:"1.5px solid var(--br)"}}>
                <div style={{fontSize:20,flexShrink:0}}>{c.icon}</div>
                <div><div style={{fontSize:14,fontWeight:700,color:"var(--dk)",marginBottom:4,fontFamily:"Manrope,sans-serif"}}>{c.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.55}}>{c.d}</div></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:20,padding:"14px 18px",background:"var(--o10)",borderRadius:12,border:"1px solid var(--o20)"}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--o)",marginBottom:3}}>Follow us on social</div>
            <div style={{fontSize:13,color:"var(--bd)",marginBottom:12}}>Real-time updates between newsletters.</div>
            <div style={{display:"flex",gap:10}}>
              {[{type:"linkedin",href:"https://linkedin.com/company/insitehub",label:"LinkedIn"},
                {type:"facebook",href:"https://facebook.com/insitehub",label:"Facebook"},
                {type:"x",href:"https://x.com/insitehub",label:"X"}].map(s=>(
                <a key={s.type} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{width:36,height:36,borderRadius:9,border:"1px solid var(--br)",background:"var(--wh)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--bd)",transition:"all .2s",textDecoration:"none"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--o)";e.currentTarget.style.color="var(--o)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--br)";e.currentTarget.style.color="var(--bd)";}}>
                  <SocialIcon type={s.type}/>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div></section>
  </>
  );
};

const ContactPage = ({ setPage }) => {
  const [form,setForm]=useState({name:"",company:"",email:"",role:"",interest:"",message:""});
  const [sent,setSent]=useState(false);
  const [track,setTrack]=useState("talk"); // talk | learn | explore
  const u=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  return(
    <>
      <div className="ph"><div className="mw" style={{position:"relative"}}>
        <HexMarkLarge size={400} color="#F4801F" opacity={0.04}/>
        <div style={{position:"relative",zIndex:1,maxWidth:680}}>
          <div className="pbadge" style={{background:"var(--o10)",border:"1px solid var(--o20)",color:"var(--o)"}}>📬 Contact</div>
          <h1 className="ph1" style={{color:"var(--dk)"}}>Where are you<br/>in the <span style={{color:"var(--o)"}}>journey?</span></h1>
          <p className="psub" style={{color:"var(--bd)",marginBottom:36}}>We'll route you to the right starting point — whether you're ready for a real conversation or just beginning to explore.</p>
          {/* Entry point selector */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            {[
              {id:"talk",icon:"🗣️",t:"Ready to talk",d:"Let's have a real conversation about your situation."},
              {id:"learn",icon:"📚",t:"Want to learn first",d:"Send me frameworks I can use before committing to anything."},
              {id:"explore",icon:"🔍",t:"Just exploring",d:"I'm early stage — send me what would be most useful."},
            ].map(opt=>(
              <div key={opt.id} onClick={()=>setTrack(opt.id)} style={{padding:18,borderRadius:14,border:("2px solid "+(track===opt.id?"var(--o)":"var(--br)")),background:track===opt.id?"var(--o10)":"var(--wh)",cursor:"pointer",transition:"all .2s"}}>
                <div style={{fontSize:22,marginBottom:8}}>{opt.icon}</div>
                <div style={{fontSize:14,fontWeight:700,color:track===opt.id?"var(--o)":"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:4}}>{opt.t}</div>
                <div style={{fontSize:12,color:"var(--bd)",lineHeight:1.5}}>{opt.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div></div>
      <section className="sec sw"><div className="mw">
        <div className="cg">
          <div>
            {sent?(
              <div style={{background:"rgba(5,150,105,.07)",border:"1px solid rgba(5,150,105,.2)",borderRadius:16,padding:40,textAlign:"center"}}>
                <div style={{fontSize:40,marginBottom:16}}>✅</div>
                <div style={{fontSize:22,fontWeight:800,color:"var(--dk)",fontFamily:"Manrope,sans-serif",marginBottom:10,letterSpacing:"-.03em"}}>
                  {track==="talk" ? "Message received." : track==="learn" ? "Frameworks on the way." : "We'll send you something useful."}
                </div>
                <div style={{fontSize:14,color:"var(--bd)",lineHeight:1.68}}>
                  {track==="talk" ? "We'll be in touch within one business day. Urgent launch timeline? We'll prioritize." : "Check your inbox within 24 hours for the AI Readiness Framework and Pilot Failure Taxonomy."}
                </div>
              </div>
            ):(
              <>
                {track==="learn" && (
                  <div style={{background:"var(--o10)",border:"1px solid var(--o20)",borderRadius:12,padding:16,marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:600,color:"var(--o)",marginBottom:4}}>You'll receive:</div>
                    <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>AI Readiness Self-Assessment · AI Pilot Failure Taxonomy · Business Case Template — three frameworks you can use immediately.</div>
                  </div>
                )}
                {track==="explore" && (
                  <div style={{background:"var(--bl10)",border:"1px solid rgba(0,122,255,.2)",borderRadius:12,padding:16,marginBottom:20}}>
                    <div style={{fontSize:13,fontWeight:600,color:"var(--bl)",marginBottom:4}}>We'll send you:</div>
                    <div style={{fontSize:13,color:"var(--bd)",lineHeight:1.6}}>A short overview of how InsiteHub works and what kind of organizations get the most value — no pitch, no follow-up pressure.</div>
                  </div>
                )}
                <label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={u("name")}/>
                <label className="fl">Work Email *</label><input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={u("email")}/>
                {track==="talk" && <>
                  <label className="fl">Company</label><input className="fi" placeholder="Your organization" value={form.company} onChange={u("company")}/>
                  <label className="fl">Your Role</label>
                  <select className="fi" value={form.role} onChange={u("role")} style={{appearance:"none"}}>
                    <option value="">Select your role...</option>
                    {["VP / Head of Commercial L&D","CLO","Director of Learning Technology","Head of Sales Force Effectiveness","Commercial IT / Digital","Other"].map(r=><option key={r}>{r}</option>)}
                  </select>
                  <label className="fl">I'm interested in...</label>
                  <select className="fi" value={form.interest} onChange={u("interest")} style={{appearance:"none"}}>
                    <option value="">Select...</option>
                    {["AI Platform (Forge, Atlas, Echo)","InsiteX LMS","Advisory Services","Content Development","Proxa Labs Experimentation","General inquiry"].map(i=><option key={i}>{i}</option>)}
                  </select>
                  <label className="fl">Tell us about your situation</label>
                  <textarea className="fi" rows={4} placeholder="What are you trying to solve? Where have you been stuck?" value={form.message} onChange={u("message")} style={{resize:"vertical"}}/>
                </>}
                <button className="fsub" onClick={()=>{if(form.name&&form.email)setSent(true)}}>
                  {track==="talk" ? "Send Message →" : track==="learn" ? "Send Me the Frameworks →" : "Send Me the Overview →"}
                </button>
              </>
            )}
          </div>
          <div>
            <div style={{marginBottom:28}}>
              <div className="ey">What to expect</div>
              <h3 style={{fontFamily:"Manrope,sans-serif",fontSize:22,fontWeight:800,color:"var(--dk)",marginBottom:12,letterSpacing:"-.03em"}}>We respond within one business day.</h3>
              <p style={{fontSize:14,color:"var(--bd)",lineHeight:1.7}}>The first conversation is always diagnostic — your environment, your constraints, what you've already tried. No sales pitch. No deck. Just whether InsiteHub is the right fit for where you are.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              {[
                {icon:"🔍",t:"Discovery Call (30 min)",d:"Your environment. What you've tried. What's blocking you. We tell you what we'd look at first.",track:"talk"},
                {icon:"📋",t:"Platform Demo",d:"Forge, Atlas, or Echo — in the context of your commercial organization.",track:"talk"},
                {icon:"📚",t:"AI Readiness Framework",d:"A self-assessment and pilot failure taxonomy you can use before committing to any conversation.",track:"learn"},
                {icon:"🗺️",t:"Advisory Assessment",d:"A defined, time-bounded diagnostic that produces a deliverable you can act on.",track:"talk"},
              ].map(c=>(
                <div key={c.t} onClick={()=>setTrack(c.track)} style={{display:"flex",gap:14,padding:16,background:track===c.track?"var(--o10)":"var(--lt)",borderRadius:13,border:("1.5px solid "+(track===c.track?"var(--o20)":"var(--br)")),cursor:"pointer",transition:"all .2s"}}>
                  <div style={{fontSize:18,flexShrink:0}}>{c.icon}</div>
                  <div><div style={{fontSize:14,fontWeight:700,color:track===c.track?"var(--o)":"var(--dk)",marginBottom:3}}>{c.t}</div><div style={{fontSize:13,color:"var(--bd)",lineHeight:1.5}}>{c.d}</div></div>
                </div>
              ))}
            </div>
            <div style={{marginTop:22,padding:20,background:"var(--o10)",borderRadius:13,border:"1px solid var(--o20)"}}>
              <div style={{fontSize:13,color:"var(--o)",fontWeight:700,marginBottom:4}}>Newark, Delaware</div>
              <div style={{fontSize:13,color:"var(--bd)"}}>InsiteHub, Inc. · 591 Collaboration Way, Suite 613</div>
              <div style={{fontSize:13,color:"var(--bd)",marginTop:3}}>insitehub.com · proxalabs.com</div>
            </div>
          </div>
        </div>
      </div></section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════════════════════════════════════ */
const PAGE_TITLES = {
  home: "InsiteHub · AI-First Commercial Learning for Biopharma",
  platform: "AI Platform · Forge, Atlas, Echo & Certify · InsiteHub",
  insitex: "InsiteX LMS · Enterprise Learning for Biopharma · InsiteHub",
  advisory: "Advisory Services · AI Strategy for Biopharma L&D · InsiteHub",
  content: "Content Development · MLR-Compliant Biopharma Content · InsiteHub",
  about: "About InsiteHub · Innovation-Led Biopharma L&D Since 2010",
  proxalab: "Proxa Labs · AI Experimentation Partner for Biopharma · InsiteHub",
  contact: "Contact InsiteHub · Start a Conversation",
  literacy: "AI Literacy Program · Biopharma Commercial Teams · InsiteHub",
  news: "Announcements · InsiteHub",
  resources: "Resources & Frameworks · InsiteHub",
  newsletter: "Newsletter · Stay Ahead of AI in Biopharma · InsiteHub",
};

export default function App() {
  const [page,setPage]=useState("home");
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);

  useEffect(()=>{
    window.scrollTo(0,0);
    // Update document title per page
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    // Update meta description
    const descs = {
      home:"InsiteHub is the AI implementation partner built for biopharma commercial learning. Advisory, platform, and experimentation — methodology-first, compliance by design.",
      platform:"The only closed-loop AI platform in biopharma: Forge builds content, Atlas delivers learning, Echo assesses readiness, Certify confirms competency. No competitor has this.",
      advisory:"InsiteHub Advisory maps your compliance requirements, governance structure, and AI readiness before recommending anything. Methodology before technology.",
      proxalab:"Proxa Labs helps biopharma commercial L&D organizations design, develop, implement, measure, and navigate AI pilots. Evidence before investment.",
      contact:"Start a conversation with InsiteHub. Ready to talk, want to learn first, or just exploring — we'll meet you where you are.",
    };
    let meta = document.querySelector('meta[name="description"]');
    if(!meta){ meta=document.createElement('meta'); meta.name="description"; document.head.appendChild(meta); }
    meta.content = descs[page] || descs.home;
  },[page]);

  const pages={home:HomePage,platform:PlatformPage,insitex:InsiteXPage,advisory:AdvisoryPage,content:ContentPage,about:AboutPage,proxalab:ProxaLabsPage,literacy:LiteracyPage,news:NewsPage,resources:ResourcesPage,newsletter:NewsletterPage,contact:ContactPage};
  const Page=pages[page]||HomePage;
  return(
    <>
      <style>{CSS}</style>
      <Nav page={page} setPage={setPage} scrolled={scrolled}/>
      <main><Page setPage={setPage}/></main>
      <Footer setPage={setPage}/>
    </>
  );
}
