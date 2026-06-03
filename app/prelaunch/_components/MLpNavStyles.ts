// MLpNavStyles — single source of truth for the prelaunch site's
// theme tokens, nav, dropdown, hamburger panel, sticky CTA tint, and
// wordmark CSS. Imported and injected by:
//
//   * /prelaunch/page.tsx (the main landing)
//   * MLpSubpageShell.tsx (the wrapper every subpage uses)
//
// Anything that styles the nav, dropdowns (desktop OR mobile), the
// theme palette, or the wordmark belongs here — NOT in either of the
// two consumer files. Updates to this file lift every prelaunch page
// in lockstep with no manual hunt for parallel locations.
//
// Rules of thumb:
//   - When adding a rule that has a desktop AND mobile variant, put
//     both selectors in the same rule body (see .lp-dropdown-menu a
//     and .lp-mobile-sublink, which share the menu-item typography
//     in one rule). Saves a second rule body that can drift.
//   - Page-specific CSS (hero, sections, footer columns, etc.) does
//     NOT belong here — that lives in /prelaunch/page.tsx.

export const MLP_NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;600;700;800&family=Outfit:wght@400;500;600;700&family=Montserrat:wght@900&display=swap');

  /* ── THEME TOKENS ─────────────────────────────────────────────────
     The prelaunch site is locked to a single palette (dark bg + orange
     accents). Rules below apply directly to .lp-root. */
  .lp-root {
    --bg:           #09090b;
    --bg-elev:      rgba(232, 232, 230, 0.05);
    --bg-elev-2:    rgba(232, 232, 230, 0.08);
    --line:         rgba(232, 232, 230, 0.10);
    --text:         #f4f4f6;
    --text-2:       #b8b8c4;
    --text-3:       #7e7e8c;
    --accent:       #FF5C2E;
    --accent-deep:  #E8420D;
    --accent-2:     #FF5C2E;
    --accent-soft:  rgba(232, 66, 13, 0.10);
    --serif:        'DM Serif Display', Georgia, serif;
    --sans:         'DM Sans', system-ui, sans-serif;
    --maxw:         1180px;
    --gutter:       clamp(20px, 4vw, 48px);

    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.65;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }
  .lp-root ::selection { background: var(--accent); color: #fff; }
  .lp-root.lp-sticky-cta-btn { background: #E8420D; }
  .lp-root.lp-sticky-cta-btn:hover { background: #FF5C2E; }

  /* ── NAV ──────────────────────────────────────────────────────── */
  .lp-root .lp-nav {
    position: sticky; top: 0; z-index: 50;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .lp-root .lp-nav-inner {
    max-width: 1440px;
    margin: 0 auto;
    padding: 16px clamp(20px, 3vw, 40px);
    display: flex; align-items: center; gap: 32px;
  }
  .lp-root .lp-brand {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--serif);
    font-size: 24px;
    font-weight: 400;
    color: var(--text);
    text-decoration: none;
    margin-right: 8px;
  }
  .lp-root .lp-nav-links {
    display: flex; gap: 22px; flex: 1; list-style: none; margin: 0; padding: 0;
    font-size: 14px; color: var(--text-2);
    align-items: center;
    justify-content: center;
  }
  .lp-root .lp-nav-links a {
    color: var(--text-2);
    text-decoration: none;
    transition: color .2s;
    white-space: nowrap;
  }
  .lp-root .lp-nav-links a:hover { color: var(--accent); }

  /* ── NAV TYPOGRAPHY ─────────────────────────────────────────────
     One rule covers both desktop nav links AND the mobile hamburger
     items so the casing/font never flips at the breakpoint.
     ALL CAPS Outfit 600 for nav-level items. */
  .lp-root .lp-nav-links,
  .lp-root .lp-nav-links a,
  .lp-root .lp-dropdown > button,
  .lp-root .lp-mobile-link,
  .lp-root .lp-mobile-section {
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .lp-root .lp-nav-links,
  .lp-root .lp-nav-links a,
  .lp-root .lp-dropdown > button { font-size: 13px; }

  /* Items INSIDE a dropdown (desktop hover menu + mobile accordion
     sublinks) — sentence case, slightly larger, lighter weight. Same
     rule covers both so they stay in sync. */
  .lp-root .lp-dropdown-menu a,
  .lp-root .lp-mobile-sublink {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-transform: none;
    letter-spacing: normal;
  }

  /* ── DROPDOWN (desktop hover menu) ─────────────────────────────── */
  .lp-root .lp-dropdown { position: relative; }
  .lp-root .lp-dropdown > button {
    background: none; border: none; padding: 0;
    color: var(--text-2);
    font-family: var(--sans);
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    transition: color .2s;
  }
  .lp-root .lp-dropdown:hover > button { color: var(--accent); }
  .lp-root .lp-dropdown > button .chev { display: inline-flex; transition: transform .2s; }
  .lp-root .lp-dropdown:hover > button .chev { transform: rotate(180deg); }
  .lp-root .lp-dropdown-menu {
    position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    margin-top: 10px;
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 6px 0;
    min-width: 168px;
    list-style: none;
    opacity: 0; visibility: hidden;
    transition: opacity .15s ease, visibility 0s linear .15s;
    box-shadow: 0 16px 40px -8px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.4);
    z-index: 60;
  }
  .lp-root .lp-dropdown:hover .lp-dropdown-menu {
    opacity: 1; visibility: visible;
    transition: opacity .15s ease;
  }
  .lp-root .lp-dropdown-menu li { display: block; }
  .lp-root .lp-dropdown-menu a {
    display: block; padding: 8px 18px;
    color: var(--text-2);
  }
  .lp-root .lp-dropdown-menu a:hover { color: var(--accent); }

  /* ── CTA PILL ──────────────────────────────────────────────────── */
  .lp-root .lp-cta-pill {
    display: inline-flex; align-items: center; justify-content: center;
    white-space: nowrap;
    background: var(--accent-deep);
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 14.08px;
    line-height: 21.12px;
    padding: 10px 18px;
    border-radius: 999px;
    text-decoration: none;
    transition: transform .15s, background .2s;
  }
  .lp-root .lp-cta-pill:hover { background: var(--accent); transform: translateY(-1px); }

  /* ── HAMBURGER ICON ────────────────────────────────────────────── */
  .lp-root .lp-burger {
    display: none;
    background: transparent;
    border: 0;
    padding: 0;
    width: 40px; height: 40px;
    align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--text);
    margin-left: auto;
  }
  .lp-root .lp-burger-icon {
    position: relative;
    display: inline-flex; flex-direction: column;
    width: 22px; height: 16px;
    justify-content: space-between;
  }
  .lp-root .lp-burger-icon span {
    display: block;
    width: 100%; height: 1.5px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 0.2s ease, opacity 0.2s ease;
    transform-origin: center;
  }
  .lp-root .lp-burger-icon.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .lp-root .lp-burger-icon.is-open span:nth-child(2) { opacity: 0; }
  .lp-root .lp-burger-icon.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── MOBILE PANEL ──────────────────────────────────────────────── */
  .lp-root .lp-mobile-panel {
    display: none;
    border-top: 1px solid var(--line);
    background: var(--bg);
    padding: 16px var(--gutter) 24px;
    flex-direction: column;
  }
  .lp-root .lp-mobile-link {
    display: block;
    color: var(--text);
    text-decoration: none;
    font-family: var(--sans);
    font-size: 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
    transition: color 0.15s;
  }
  .lp-root .lp-mobile-link:hover { color: var(--accent-2); }
  .lp-root .lp-mobile-sublink { padding-left: 16px; color: var(--text-2); }

  .lp-root .lp-mobile-section-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--line);
    padding: 14px 0;
    cursor: pointer;
    font-family: var(--sans);
    text-align: left;
    color: var(--text);
    transition: color 0.15s;
  }
  .lp-root .lp-mobile-section { color: inherit; }
  .lp-root .lp-mobile-chev {
    display: inline-flex;
    align-items: center;
    color: var(--text-3);
    transition: transform 0.2s ease;
  }
  .lp-root .lp-mobile-chev.is-open { transform: rotate(180deg); }
  .lp-root .lp-mobile-cta {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--accent-deep);
    color: #fff;
    text-decoration: none;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 16px;
    padding: 14px 24px;
    border-radius: 999px;
    margin-top: 18px;
    transition: background 0.2s;
  }
  .lp-root .lp-mobile-cta:hover { background: var(--accent); }

  @media (max-width: 880px) {
    .lp-root .lp-nav-links { gap: 14px; font-size: 13px; }
  }
  @media (max-width: 767px) {
    .lp-root .lp-nav-links,
    .lp-root .lp-cta-desktop { display: none; }
    .lp-root .lp-burger { display: inline-flex; }
    .lp-root .lp-mobile-panel { display: flex; }
  }

  /* ── LAYOUT PRIMITIVES — same .wrap / section / .sec-head pattern
     the home page uses. Subpages render their content using these
     same class names so they share the rhythm. */
  .lp-root .wrap {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 0 var(--gutter);
  }
  .lp-root section { padding: 100px 0; text-align: center; }
  @media (max-width: 720px) { .lp-root section { padding: 64px 0; } }

  .lp-root .sec-head { margin-bottom: 48px; text-align: center; }
  .lp-root .sec-head .eyebrow { margin-bottom: 22px; }
  .lp-root .sec-head h2 { margin-top: 0; margin-left: auto; margin-right: auto; }
  .lp-root .sec-head .lede { margin-top: 18px; }
  .lp-root .rule {
    height: 0; margin: 0; border: 0;
    border-top: 1px solid var(--line);
  }

  /* ── SHARED TYPOGRAPHY — same as the home page. Page-specific
     content (hero, pricing, gallery, etc.) lives in /prelaunch/page.tsx,
     but every page reads the same h1/h2/h3, eyebrow, lede, body
     treatments from here. */
  .lp-root h1, .lp-root h2, .lp-root h3 {
    text-align: center;
    margin-top: 0;
  }
  .lp-root h1 {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(34px, 7.5vw, 72px);
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: var(--text);
  }
  .lp-root h2 {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(30px, 4.6vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--text);
  }
  .lp-root h3 {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 22px;
    line-height: 1.3;
    letter-spacing: -0.005em;
    color: var(--text);
  }
  .lp-root h1 .muted,
  .lp-root h2 .muted,
  .lp-root h3 .muted { color: rgba(232, 232, 230, 0.42); }

  .lp-root .eyebrow {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .lp-root .lede {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--text-2);
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-root .hero-lede {
    font-family: 'Outfit', sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--text-2);
  }

  .lp-root p {
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
    color: var(--text-2);
    max-width: 62ch;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-root li { font-family: 'Outfit', sans-serif; font-weight: 400; }
  .lp-root p strong { color: var(--text); font-weight: 600; }

  /* ── FOOTER ──────────────────────────────────────────────────── */
  .lp-root .lp-footer {
    border-top: 1px solid var(--line);
    background: var(--bg);
    padding: 100px 0 32px;
    color: var(--text-2);
  }
  .lp-root .lp-footer .wrap {
    display: flex;
    flex-direction: column;
    gap: 48px;
    text-align: left;
  }
  .lp-root .lp-footer .footer-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 32px;
  }
  .lp-root .lp-footer .footer-top .brand {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .lp-root .lp-footer .footer-top .tag {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: rgba(232, 232, 230, 0.55);
    margin: 0;
    line-height: 1.4;
    max-width: none;
  }
  .lp-root .lp-footer .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 32px;
  }
  @media (max-width: 880px) {
    .lp-root .lp-footer .footer-cols { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 520px) {
    .lp-root .lp-footer .footer-cols { grid-template-columns: 1fr; gap: 32px; }
  }
  .lp-root .lp-footer .footer-cols h5 {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #f4f4f6;
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  .lp-root .lp-footer .footer-cols ul { list-style: none; padding: 0; margin: 0; }
  .lp-root .lp-footer .footer-cols li { margin-bottom: 10px; }
  .lp-root .lp-footer .footer-cols a {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: rgba(232, 232, 230, 0.55);
    line-height: 1.6;
    text-decoration: none;
    transition: color .2s;
  }
  .lp-root .lp-footer .footer-cols a:hover { color: var(--accent); }
  .lp-root .lp-footer .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-top: 8px;
  }
  .lp-root .lp-footer .footer-bottom .badges {
    display: flex; flex-wrap: wrap; gap: 22px;
    font-size: 12px;
    color: rgba(232, 232, 230, 0.55);
  }
  .lp-root .lp-footer .footer-bottom .badges span {
    display: inline-flex; align-items: center; gap: 8px;
  }
  .lp-root .lp-footer .footer-bottom .badges span svg { color: var(--accent); }
  .lp-root .lp-footer .footer-bottom .copy {
    font-size: 12px;
    color: rgba(232, 232, 230, 0.55);
  }

  /* ── WORDMARK — Montserrat 900 with a small square dot. ──────────
     Sits at the text baseline, NOT vertically centered, so the dot
     reads as part of the "LOGO•AI" wordmark rather than floating
     mid-line. The .lp-brand-icon and the plain .wordmark fallback
     text are hidden in this state. */
  .lp-root .lp-brand-icon { display: none; }
  .lp-root .lp-brand .wordmark,
  .lp-root .lp-footer .brand .wordmark { display: none; }
  .lp-root .lp-wm-custom {
    display: inline-flex;
    align-items: baseline;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    font-size: 24px;
    color: var(--text);
  }
  .lp-root .lp-wm-dot {
    display: inline-block;
    width: 0.16em;
    height: 0.16em;
    margin: 0 0.04em;
    vertical-align: baseline;
    background: #FF5C2E;
  }
`
