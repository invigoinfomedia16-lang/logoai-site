// Prelaunch landing — experimental design (story-design-experiment branch).
// Design language ported from prelaunch-standalone/our-story-redesign.html.
// Content from Logo_AI_Pre_Launch_Page_Copy_v19.docx (12 sections).
// Self-contained: own fonts (DM Serif Display + DM Sans), own palette,
// own nav + footer. The prelaunch layout still wraps this page so
// MSharedHeader sits above as evaluation chrome — when (if) this
// design wins we'll wire it into the layout properly.

import type { Metadata } from 'next'
import {
  Globe, Smartphone, Mail, ShoppingCart,
  Presentation, FileText, Megaphone, MailOpen,
  IdCard, Building2, Package, Flag,
  Check,
  type LucideIcon,
} from 'lucide-react'
import MLpGallery from './_components/MLpGallery'
import MLpMockups from './_components/MLpMockups'
import MLpNav from './_components/MLpNav'
import MLpStickyCTA from './_components/MLpStickyCTA'

export const metadata: Metadata = {
  title: 'Free Logos for the First 2,000,000 Users — LOGO.AI',
  description:
    "World's best AI logo generator. Free at launch. Join now to claim yours.",
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

  .lp-root {
    --bg:           var(--lp-bg, #0a0a0c);
    --bg-elev:      #141418;
    --bg-elev-2:    #1c1c22;
    --line:         #2a2a32;
    --text:         #f4f4f6;
    --text-2:       #b8b8c4;
    --text-3:       #7e7e8c;
    --accent:       #a855f7;
    --accent-deep:  #7c3aed;
    --accent-2:     #c084fc;
    --accent-soft:  rgba(168, 85, 247, 0.12);
    --serif:        'DM Serif Display', Georgia, serif;
    --sans:         'DM Sans', system-ui, sans-serif;
    --maxw:         1180px;
    --gutter:       clamp(20px, 4vw, 48px);

    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 17px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }
  .lp-root ::selection { background: var(--accent); color: #fff; }

  /* NAV — sticky, opaque. MSharedHeader is skipped on this exact path
     by MSharedHeader.tsx, so this is the only nav rendered. */
  .lp-root .lp-nav {
    position: sticky; top: 0; z-index: 50;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .lp-root .lp-nav-inner {
    max-width: none;
    margin: 0;
    padding: 16px clamp(20px, 4vw, 56px);
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
  .lp-brand-icon { display: inline-flex; align-items: center; }
  .lp-root .lp-brand .wordmark { letter-spacing: 0.01em; }
  .lp-root .lp-brand .dot { color: var(--text); }
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
  .lp-root .lp-nav-links a:hover { color: var(--text); }

  /* Browse Logos dropdown */
  .lp-root .lp-dropdown { position: relative; }
  .lp-root .lp-dropdown > button {
    background: none; border: none; padding: 0;
    color: var(--text-2);
    font-family: var(--sans);
    font-size: 14px;
    cursor: pointer;
    display: inline-flex; align-items: center; gap: 6px;
    transition: color .2s;
  }
  .lp-root .lp-dropdown:hover > button { color: var(--text); }
  .lp-root .lp-dropdown > button .chev { display: inline-flex; transition: transform .2s; }
  .lp-root .lp-dropdown:hover > button .chev { transform: rotate(180deg); }
  .lp-root .lp-dropdown-menu {
    position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    margin-top: 12px;
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 8px 0;
    min-width: 168px;
    list-style: none;
    opacity: 0; visibility: hidden;
    transition: opacity .15s ease, visibility 0s linear .15s;
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  }
  .lp-root .lp-dropdown:hover .lp-dropdown-menu {
    opacity: 1; visibility: visible;
    transition: opacity .15s ease;
  }
  .lp-root .lp-dropdown-menu li { display: block; }
  .lp-root .lp-dropdown-menu a {
    display: block; padding: 8px 18px;
    color: var(--text-2); font-size: 14px;
  }
  .lp-root .lp-dropdown-menu a:hover { color: var(--text); }

  .lp-root .lp-cta-pill {
    display: inline-flex; align-items: center; justify-content: center;
    white-space: nowrap;
    background: var(--accent-deep);
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 18px;
    border-radius: 10px;
    text-decoration: none;
    transition: transform .15s, background .2s;
  }
  .lp-root .lp-cta-pill:hover { background: var(--accent); transform: translateY(-1px); }

  /* Hamburger — hidden on desktop, shown on mobile. */
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

  /* Mobile slide-down panel. */
  .lp-root .lp-mobile-panel {
    display: none;
    border-top: 1px solid var(--line);
    background: var(--bg);
    padding: 16px var(--gutter) 24px;
    flex-direction: column;
  }
  .lp-root .lp-mobile-link {
    color: var(--text);
    text-decoration: none;
    font-family: var(--sans);
    font-size: 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
    transition: color 0.15s;
  }
  .lp-root .lp-mobile-link:hover { color: var(--accent-2); }
  .lp-root .lp-mobile-sublink { padding-left: 16px; font-size: 15px; color: var(--text-2); }
  .lp-root .lp-mobile-section {
    color: var(--text-3);
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 18px 0 8px;
    border-bottom: 1px solid var(--line);
  }
  .lp-root .lp-mobile-cta {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--accent-deep);
    color: #fff;
    text-decoration: none;
    font-family: var(--sans);
    font-weight: 600;
    font-size: 16px;
    padding: 14px 24px;
    border-radius: 10px;
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

  /* LAYOUT */
  .lp-root .wrap {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 0 var(--gutter);
  }
  .lp-root section { padding: 88px 0; }
  @media (max-width: 720px) { .lp-root section { padding: 56px 0; } }

  .lp-root .eyebrow {
    font-family: var(--sans);
    font-size: 14px;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 600;
    display: inline-block;
  }

  .lp-root h1, .lp-root h2, .lp-root h3 {
    font-family: var(--serif);
    font-weight: 400;
    letter-spacing: -0.5px;
  }
  .lp-root h1 { font-size: clamp(56px, 8vw, 96px); line-height: 1.02; }
  .lp-root h2 { font-size: clamp(42px, 5.6vw, 70px); line-height: 1.08; margin-top: 18px; }
  .lp-root h3 { font-size: clamp(26px, 2.8vw, 32px); line-height: 1.25; }
  .lp-root h1 .muted, .lp-root h2 .muted, .lp-root h3 .muted { color: var(--text-3); }

  /* H1/H2 collapse the editorial 2-line splits into one line; the muted
     span gets a leading non-breaking space so adjacent words don't fuse. */
  .lp-root h1 br,
  .lp-root h2 br { display: none; }
  .lp-root h1 .muted::before,
  .lp-root h2 .muted::before { content: "\\00a0"; }

  .lp-root p { color: var(--text-2); max-width: 62ch; margin-left: auto; margin-right: auto; }
  .lp-root p strong { color: var(--text); font-weight: 600; }
  .lp-root .lede { color: var(--text-2); font-size: 22px; max-width: 60ch; margin-left: auto; margin-right: auto; }

  /* Section heads: centered eyebrow + h2 + lede stack. */
  .lp-root .sec-head { margin-bottom: 48px; text-align: center; }
  .lp-root .sec-head .eyebrow { margin-bottom: 22px; }
  .lp-root .sec-head h2 { margin-top: 0; margin-left: auto; margin-right: auto; }
  .lp-root .sec-head .lede { margin-top: 18px; }

  /* Site-wide center alignment. Headings centered, body text centered
     within its max-width cap, grids/tables stay structurally centered. */
  .lp-root section { text-align: center; }
  .lp-root .wrap { text-align: center; }
  .lp-root h1, .lp-root h2, .lp-root h3 { text-align: center; }

  /* Overrides — elements that must stay left-aligned for readability
     regardless of the global center alignment. */
  .lp-root .footer-cols,
  .lp-root .footer-cols * { text-align: left; }
  .lp-root .pricing-list,
  .lp-root .pricing-list * { text-align: left; }
  .lp-root .uc-card,
  .lp-root .uc-card * { text-align: left; }
  .lp-root .step,
  .lp-root .step * { text-align: left; }
  .lp-root .blog-card,
  .lp-root .blog-card * { text-align: left; }
  .lp-root .testimonial,
  .lp-root .testimonial * { text-align: left; }
  /* .testimonial-feature is now intentionally centered (see its own rule). */
  .lp-root .faq-item,
  .lp-root .faq-item * { text-align: left; }
  .lp-root .compare th,
  .lp-root .compare td:first-child { text-align: left; }
  .lp-root .compare th:first-child,
  .lp-root .compare td:first-child { text-align: left; }
  /* Form card content inside the centered hero already inherits center;
     final-cta's split layout keeps its left side left-aligned. */
  .lp-root .final-copy,
  .lp-root .final-copy * { text-align: left; }
  .lp-root .final-cta .form-card,
  .lp-root .final-cta .form-card * { text-align: left; }

  /* DIVIDER — flat 1px line matching the nav bottom border. Edge-to-edge. */
  .lp-root .rule {
    height: 0;
    margin: 0;
    border: 0;
    border-top: 1px solid var(--line);
  }

  /* Gallery + Mockups use the wider 1280px wrap to match logo.ai's
     image-grid scale. All other sections stay at 1180px. */
  .lp-root #gallery .wrap,
  .lp-root #mockups .wrap { max-width: 1280px; }

  /* ============ HERO ============ */
  .lp-root .hero {
    padding: 72px 0 90px;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .lp-root .hero .eyebrow { margin-bottom: 28px; }
  .lp-root .hero h1 { margin-left: auto; margin-right: auto; }
  .lp-root .hero h1 .muted { color: var(--text-3); }
  .lp-root .hero-lede {
    margin: 28px auto 0;
    color: var(--text-2);
    font-size: 22px;
    max-width: 52ch;
  }
  .lp-root .hero .form-card { margin-left: auto; margin-right: auto; text-align: center; }
  .lp-root .hero .form-card .fine { max-width: none; }
  .lp-root .hero .form-card .stat-line { max-width: none; }

  /* Hero form card — borrow CTA-block card from the redesign */
  .lp-root .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: 56px;
    align-items: end;
    margin-top: 64px;
  }
  @media (max-width: 960px) { .lp-root .hero-grid { grid-template-columns: 1fr; gap: 40px; } }

  .lp-root .form-card {
    padding: 0;
    position: relative;
  }
  /* Inside the Final CTA, the form card keeps its boxed treatment for
     contrast against the band wrapper. */
  .lp-root .final-cta .form-card {
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 32px;
  }
  .lp-root .stat-line {
    font-family: var(--serif);
    font-size: clamp(18px, 2vw, 22px);
    line-height: 1.35;
    color: var(--text);
    margin: 0 0 12px;
  }
  .lp-root .stat-line strong { color: var(--accent); font-weight: 400; }
  .lp-root .stat-line .sep { color: var(--text-3); margin: 0 6px; }
  .lp-root .stat-line .pct { color: var(--text-2); }

  .lp-root .hero-counter-main {
    font-family: var(--serif);
    font-size: clamp(20px, 2.2vw, 24px);
    line-height: 1.35;
    color: var(--text);
    max-width: none;
    margin: 40px 0 16px;
  }
  .lp-root .hero-counter-main strong { color: var(--accent); font-weight: 400; }
  .lp-root .hero-progress {
    max-width: 280px;
    margin: 0 auto 18px;
  }
  .lp-root .hero-counter-sub {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 2.4px;
    color: var(--text-3);
    max-width: none;
    margin: 0;
  }

  .lp-root .progress {
    height: 4px;
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    overflow: hidden;
  }
  .lp-root .progress-fill {
    height: 100%;
    background: linear-gradient(to right, var(--accent-deep), var(--accent));
    border-radius: 999px;
  }

  /* CTA microcopy + stat row — used by both Hero and Final CTA forms. */
  .lp-root .cta-micro-strong {
    margin: 28px auto 4px;
    max-width: none;
    color: var(--text);
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 600;
  }
  .lp-root .cta-micro {
    margin: 0 auto;
    max-width: none;
    color: var(--text-3);
    font-family: var(--sans);
    font-size: 13.5px;
  }
  .lp-root .cta-stats {
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid var(--line);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    text-align: center;
  }
  .lp-root .cta-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .lp-root .cta-stat strong {
    font-family: var(--serif);
    font-size: clamp(22px, 2.4vw, 28px);
    font-weight: 400;
    color: var(--text);
    line-height: 1.1;
  }
  .lp-root .cta-stat span {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .lp-root .cta-stat-progress {
    width: 70%;
    margin-top: 8px;
  }
  @media (max-width: 520px) {
    .lp-root .cta-stats { grid-template-columns: 1fr; gap: 18px; }
  }

  .lp-root .email-form { display: flex; flex-direction: column; gap: 10px; }
  .lp-root .email-form input {
    background: var(--bg);
    border: 1px solid var(--line);
    color: var(--text);
    padding: 15px 18px;
    border-radius: 10px;
    font-family: var(--sans);
    font-size: 19px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .lp-root .email-form input::placeholder { color: var(--text-3); }
  .lp-root .email-form input:focus {
    border-color: var(--accent-deep);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.18);
  }
  .lp-root .email-form button {
    background: var(--accent-deep);
    color: #fff;
    border: 0;
    padding: 16px 22px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 19px;
    cursor: pointer;
    font-family: var(--sans);
    margin-top: 4px;
    transition: background .2s, transform .15s;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  }
  .lp-root .email-form button:hover { background: var(--accent); transform: translateY(-1px); }
  .lp-root .email-form button .arr { transition: transform .2s; }
  .lp-root .email-form button:hover .arr { transform: translateX(3px); }

  .lp-root .fine {
    margin-top: 32px;
    color: var(--text-3);
    font-size: 13px;
    line-height: 1.7;
  }
  .lp-root .fine strong {
    color: var(--text);
    font-weight: 600;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 18px;
  }
  .lp-root .fine-tight { padding-bottom: 4px; }

  .lp-root .hero-counters {
    display: flex; flex-wrap: wrap; gap: 28px;
    margin-top: 32px;
    padding-top: 28px;
    border-top: 1px solid var(--line);
  }
  .lp-root .hero-counter .num {
    font-family: var(--serif);
    font-size: clamp(32px, 4vw, 44px);
    color: var(--text);
    line-height: 1;
  }
  .lp-root .hero-counter .lbl {
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-3);
    margin-top: 8px;
  }
  .lp-root .hero-counter .num .accent { color: var(--accent); }

  /* ============ GALLERY ============ */
  .lp-root .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  @media (max-width: 880px) { .lp-root .gallery-grid { grid-template-columns: repeat(2, 1fr); } }
  .lp-root .gallery-tile {
    aspect-ratio: 1;
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 14px;
    display: grid; place-items: center;
    color: var(--text-3);
    font-family: var(--serif);
    font-size: 22px;
    position: relative;
    overflow: hidden;
    transition: border-color .2s, transform .2s;
  }
  .lp-root .gallery-tile:hover { border-color: var(--text-3); transform: translateY(-2px); }
  .lp-root .gallery-tile::before {
    content: "";
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 30% 30%, rgba(168,85,247,0.18), transparent 55%),
      radial-gradient(circle at 70% 70%, rgba(192,132,252,0.12), transparent 55%);
    pointer-events: none;
  }
  .lp-root .gallery-tile span { position: relative; z-index: 1; }

  /* ============ MOCKUPS ============ */
  .lp-root .mockup-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  @media (max-width: 880px) { .lp-root .mockup-grid { grid-template-columns: 1fr; } }
  .lp-root .mockup-tile {
    aspect-ratio: 4/3;
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 22px;
    display: flex; flex-direction: column; justify-content: flex-end;
    position: relative; overflow: hidden;
    transition: border-color .2s;
  }
  .lp-root .mockup-tile:hover { border-color: var(--text-3); }
  .lp-root .mockup-tile::before {
    content: "";
    position: absolute; inset: 0;
    background:
      radial-gradient(circle at 50% 40%, rgba(168,85,247,0.16), transparent 60%);
    pointer-events: none;
  }
  .lp-root .mockup-tile .mt-label {
    position: relative; z-index: 1;
    font-family: var(--serif);
    font-size: 20px;
    color: var(--text);
  }
  .lp-root .mockup-tile .mt-tag {
    position: relative; z-index: 1;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 6px;
  }

  /* ============ HOW IT WORKS ============ */
  .lp-root .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  @media (max-width: 880px) { .lp-root .steps { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 520px) { .lp-root .steps { grid-template-columns: 1fr; } }
  .lp-root .step {
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 28px;
    transition: border-color .2s, transform .2s;
  }
  .lp-root .step:hover { border-color: var(--text-3); transform: translateY(-2px); }
  .lp-root .step .step-num {
    font-family: var(--serif);
    font-size: 36px;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 14px;
    display: flex; align-items: baseline; gap: 8px;
  }
  .lp-root .step .step-num .lbl {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-3);
  }
  .lp-root .step h3 { font-size: 22px; line-height: 1.25; margin-bottom: 10px; }
  .lp-root .step p { color: var(--text-2); font-size: 14.5px; margin: 0; }

  .lp-root .privacy-line {
    margin-top: 32px;
    color: var(--text-3);
    font-size: 13.5px;
    letter-spacing: 0.2px;
  }
  .lp-root .privacy-line::before {
    content: "✓";
    color: var(--accent);
    margin-right: 8px;
  }

  /* ============ TESTIMONIALS ============ */
  .lp-root .testimonial-feature {
    margin: 8px auto 56px;
    padding: 36px 24px;
    max-width: 760px;
    text-align: center;
  }
  .lp-root .testimonial-feature * { text-align: center; }
  .lp-root .testimonial-feature .stars {
    margin-bottom: 18px;
  }
  .lp-root .testimonial-feature blockquote {
    font-family: var(--serif);
    font-style: italic;
    font-size: clamp(22px, 2.6vw, 30px);
    line-height: 1.3;
    color: var(--text);
    margin: 0 0 22px;
  }
  .lp-root .testimonial-feature blockquote::before {
    content: "\\201C";
    color: var(--accent);
    margin-right: 6px;
  }
  .lp-root .testimonial-feature .body {
    color: var(--text-2);
    font-size: 17px;
    line-height: 1.6;
    max-width: 56ch;
    margin: 0 0 22px;
  }
  .lp-root .testimonial-feature .t-cite-featured {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin: 0 auto;
  }
  .lp-root .testimonial-feature cite {
    font-style: normal;
    font-size: 13px;
    color: var(--text-3);
    letter-spacing: 0.3px;
    line-height: 1.4;
    text-align: left;
  }
  .lp-root .testimonial-feature cite strong { color: var(--text-2); font-weight: 600; display: block; font-size: 14px; }

  .lp-root .testimonials {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 22px;
  }
  @media (max-width: 760px) { .lp-root .testimonials { grid-template-columns: 1fr; } }
  .lp-root .testimonial {
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 32px;
    display: flex; flex-direction: column; gap: 18px;
    transition: border-color .2s;
  }
  .lp-root .testimonial:hover { border-color: var(--text-3); }
  .lp-root .stars {
    color: var(--accent);
    letter-spacing: 4px;
    font-size: 14px;
  }
  .lp-root .testimonial blockquote {
    font-family: var(--serif);
    font-style: italic;
    font-size: 22px;
    line-height: 1.35;
    color: var(--text);
    margin: 0;
  }
  .lp-root .testimonial blockquote::before {
    content: "\\201C";
    color: var(--accent);
    margin-right: 4px;
  }
  .lp-root .testimonial p { color: var(--text-2); margin: 0; font-size: 15px; }
  .lp-root .testimonial .t-cite {
    display: flex; align-items: center; gap: 12px;
    padding-top: 16px;
  }
  .lp-root .t-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--line);
    flex-shrink: 0;
  }
  .lp-root .testimonial cite {
    font-style: normal;
    font-size: 13px;
    color: var(--text-3);
    letter-spacing: 0.3px;
    line-height: 1.4;
  }
  .lp-root .testimonial cite strong { color: var(--text-2); font-weight: 600; display: block; font-size: 14px; }

  /* ============ USE CASES ============ */
  .lp-root .uc-group { margin-top: 48px; }
  .lp-root .uc-group:first-of-type { margin-top: 0; }
  .lp-root .uc-group-title {
    font-family: var(--serif);
    font-size: 22px;
    color: var(--text);
    margin-bottom: 28px;
    text-align: left;
  }
  .lp-root .uc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
  }
  @media (max-width: 880px) { .lp-root .uc-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .lp-root .uc-grid { grid-template-columns: 1fr; } }
  .lp-root .uc-card {
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 22px;
    transition: border-color .2s, transform .2s;
  }
  .lp-root .uc-card:hover { border-color: var(--text-3); transform: translateY(-2px); }
  .lp-root .uc-icon {
    color: var(--text-2);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }
  .lp-root .uc-card h4 {
    font-family: var(--serif);
    font-weight: 400;
    font-size: 18px;
    color: var(--text);
    margin: 0 0 8px;
  }
  .lp-root .uc-card p { font-size: 14px; color: var(--text-2); margin: 0; }

  /* ============ PRICING ============ */
  /* Pricing card — Vercel-pattern narrow centered pillar adapted to the
     dark editorial palette. Stacked $49→Free price, centered head, left-
     aligned features inside the centered card, full-width CTA at bottom. */
  .lp-root .pricing-card {
    background: var(--bg-elev);
    border: 2px solid var(--accent-deep);
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 12px 32px rgba(124,58,237,0.18), 0 2px 10px rgba(0,0,0,0.4);
  }
  @media (max-width: 720px) { .lp-root .pricing-card { padding: 32px 24px; } }

  .lp-root .pricing-head {
    display: flex; align-items: baseline; justify-content: center;
    gap: 14px;
  }
  .lp-root .pricing-head .strike {
    font-family: var(--serif);
    font-size: 28px;
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-thickness: 2px;
  }
  .lp-root .pricing-head .free {
    font-family: var(--serif);
    font-size: 64px;
    color: var(--accent);
    line-height: 1;
  }
  .lp-root .pricing-head .tag { display: none; }

  .lp-root .pricing-sub {
    color: var(--text-2);
    font-size: 14.5px;
    margin: 14px 0 4px;
    max-width: 40ch;
  }
  .lp-root .pricing-keep {
    color: var(--text);
    font-weight: 600;
    font-size: 14.5px;
    margin: 0;
  }

  /* Internal divider — same flat line as section dividers. */
  .lp-root .pricing-card .pricing-divider {
    width: 100%;
    height: 1px;
    background: var(--line);
    margin: 28px 0;
  }

  .lp-root .pricing-list {
    list-style: none; padding: 0;
    margin: 0 0 28px;
    display: flex; flex-direction: column; gap: 14px;
    width: 100%;
    text-align: left;
  }
  .lp-root .pricing-card .pl-title {
    font-size: 12px;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--text);
    font-weight: 700;
    margin: 0 0 14px;
    text-align: left;
    width: 100%;
    align-self: flex-start;
  }
  .lp-root .pricing-list li {
    position: relative;
    padding-left: 26px;
    color: var(--text-2);
    font-size: 15px;
    line-height: 1.5;
    text-align: left;
  }
  .lp-root .pricing-list li::before {
    content: "✓";
    color: var(--accent);
    font-weight: 700;
    position: absolute;
    left: 0;
    top: 0;
  }
  .lp-root .pricing-list li strong { color: var(--text); font-weight: 600; }

  .lp-root .pricing-cta {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent-deep);
    color: #fff;
    padding: 16px 28px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    width: 100%;
    transition: background .2s, transform .15s;
  }
  .lp-root .pricing-cta:hover { background: var(--accent); }
  .lp-root .pricing-fine {
    color: var(--text-3);
    font-size: 12.5px;
    margin-top: 14px;
    text-align: center;
  }

  /* ============ COMPARE ============ */
  .lp-root .compare-wrap {
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 16px;
    overflow: hidden;
  }
  .lp-root .compare {
    width: 100%;
    border-collapse: collapse;
    font-size: 14.5px;
  }
  .lp-root .compare thead th {
    background: var(--bg-elev-2);
    color: var(--text-3);
    font-family: var(--sans);
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    padding: 18px 16px;
    border-bottom: 1px solid var(--line);
  }
  .lp-root .compare thead th:first-child { text-align: left; }
  .lp-root .compare thead th.us {
    color: var(--accent);
  }
  .lp-root .compare tbody td {
    padding: 16px;
    border-bottom: 1px solid var(--line);
    color: var(--text-2);
    text-align: center;
    vertical-align: middle;
  }
  .lp-root .compare tbody tr:last-child td { border-bottom: 0; }
  .lp-root .compare tbody td:first-child {
    text-align: left;
    color: var(--text);
    font-weight: 500;
  }
  .lp-root .compare tbody td.us {
    background: rgba(168, 85, 247, 0.05);
    color: var(--text);
    font-weight: 600;
  }
  .lp-root .compare .yes { color: var(--accent); font-weight: 700; }
  .lp-root .compare .no { color: var(--text-3); }
  .lp-root .compare .maybe { color: var(--text-3); font-style: italic; font-size: 13px; }
  .lp-root .compare-fine {
    color: var(--text-3); font-size: 13px;
    margin-top: 18px;
  }
  @media (max-width: 720px) {
    .lp-root .compare thead th { padding: 14px 8px; font-size: 10px; letter-spacing: 1px; }
    .lp-root .compare tbody td { padding: 12px 8px; font-size: 13px; }
  }

  /* ============ FAQ ============ */
  .lp-root .faq-list {
    max-width: 820px;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-root .faq-item {
    border-bottom: 1px solid var(--line);
  }
  .lp-root .faq-item:first-child { border-top: 1px solid var(--line); }
  .lp-root .faq-item summary {
    cursor: pointer;
    padding: 22px 0;
    display: flex; justify-content: space-between; align-items: center;
    gap: 24px;
    list-style: none;
    font-family: var(--serif);
    font-size: 19px;
    color: var(--text);
    transition: color .2s;
  }
  .lp-root .faq-item summary::-webkit-details-marker { display: none; }
  .lp-root .faq-item summary::after {
    content: "+";
    color: var(--accent);
    font-family: var(--sans);
    font-size: 24px;
    font-weight: 400;
    line-height: 1;
    transition: transform .2s;
  }
  .lp-root .faq-item[open] summary::after { content: "−"; }
  .lp-root .faq-item summary:hover { color: var(--text-2); }
  .lp-root .faq-answer {
    padding: 0 0 24px;
    color: var(--text-2);
    max-width: 70ch;
  }

  /* ============ BLOG ============ */
  .lp-root .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  @media (max-width: 880px) { .lp-root .blog-grid { grid-template-columns: 1fr; } }
  .lp-root .blog-card {
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 14px;
    overflow: hidden;
    text-decoration: none;
    display: flex; flex-direction: column;
    transition: border-color .2s, transform .2s;
  }
  .lp-root .blog-card:hover { border-color: var(--text-3); transform: translateY(-2px); }
  .lp-root .blog-thumb {
    aspect-ratio: 16/10;
    background: var(--bg-elev-2);
    overflow: hidden;
  }
  .lp-root .blog-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  .lp-root .blog-card:hover .blog-thumb img { transform: scale(1.04); }
  .lp-root .blog-body { padding: 24px; }
  .lp-root .blog-body h3 {
    font-size: 22px;
    color: var(--text);
    margin: 0 0 10px;
  }
  .lp-root .blog-body p { color: var(--text-2); margin: 0; font-size: 14.5px; }
  .lp-root .blog-cta {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 36px;
    color: var(--text-2);
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: color 0.2s;
  }
  .lp-root .blog-cta span { color: var(--accent); transition: transform 0.2s; }
  .lp-root .blog-cta:hover { color: var(--text); }
  .lp-root .blog-cta:hover span { transform: translateX(3px); }

  /* ============ FINAL CTA ============ */
  .lp-root .final-cta {
    background: var(--bg-elev);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 56px;
    margin: 0 var(--gutter);
    position: relative;
    overflow: hidden;
  }
  .lp-root .final-cta-wrap { max-width: var(--maxw); margin: 0 auto; padding: 0; }
  @media (max-width: 720px) { .lp-root .final-cta { padding: 36px 28px; } }
  .lp-root .final-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 56px;
    align-items: center;
  }
  .lp-root .final-grid > * { min-width: 0; }
  @media (max-width: 880px) { .lp-root .final-grid { grid-template-columns: minmax(0, 1fr); gap: 40px; } }
  .lp-root .final-copy .eyebrow { margin-bottom: 22px; }
  .lp-root .final-copy h2 {
    margin-top: 0;
    font-size: clamp(30px, 3.4vw, 42px);
    line-height: 1.15;
  }
  .lp-root .final-copy h2 .muted { color: var(--text-3); }
  .lp-root .final-copy p { color: var(--text-2); margin-top: 18px; max-width: 42ch; }
  .lp-root .final-counter-line {
    font-family: var(--serif);
    font-size: clamp(20px, 2.4vw, 26px);
    line-height: 1.35;
    color: var(--text);
    margin-top: 28px;
  }
  .lp-root .final-counter-line strong { color: var(--accent); font-weight: 400; }
  .lp-root .final-counter-line b { color: var(--text); font-weight: 600; }
  .lp-root .final-copy-body {
    color: var(--text-2);
    font-size: 16px;
    line-height: 1.6;
    margin: 18px 0 28px;
    max-width: 46ch;
  }
  .lp-root .final-counter-sub {
    color: var(--text-3);
    font-size: 13.5px;
    margin: 6px 0 0;
  }
  .lp-root .final-progress {
    margin-top: 18px;
    width: 100%;
    max-width: 100%;
  }
  .lp-root .cta-trust {
    display: flex; align-items: center; gap: 14px;
    margin-top: 28px;
    font-size: 14px; color: var(--text-2);
  }
  .lp-root .cta-trust strong { color: var(--text); font-weight: 600; }
  .lp-root .avatars { display: flex; align-items: center; }
  .lp-root .avatars img {
    width: 34px; height: 34px;
    border-radius: 50%;
    border: 2px solid var(--bg-elev);
    object-fit: cover;
    margin-left: -10px;
    background: var(--bg-elev-2);
  }
  .lp-root .avatars img:first-child { margin-left: 0; }

  .lp-root .cta-benefits {
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin: 22px 0 0;
    padding: 22px 0 0;
    border-top: 1px solid var(--line);
    font-size: 13px;
    color: var(--text-2);
    flex-wrap: wrap;
  }
  .lp-root .cta-benefits li {
    display: inline-flex; align-items: center; gap: 6px;
  }
  .lp-root .cta-benefits li::before {
    content: "✓";
    color: var(--accent);
    font-weight: 700;
  }

  /* ============ FOOTER ============ */
  .lp-root .lp-footer {
    border-top: 1px solid var(--line);
    background: var(--bg);
    padding: 72px 0 32px;
    color: var(--text-2);
    margin-top: 72px;
  }
  .lp-root .footer-top {
    margin-bottom: 56px;
    text-align: left;
  }
  .lp-root .footer-top .tag { margin: 8px 0 0; max-width: none; }
  .lp-root .footer-top .brand {
    font-family: var(--serif);
    font-size: 26px;
    font-weight: 400;
    color: var(--text);
    display: inline-flex; align-items: center; gap: 10px;
  }
  .lp-root .footer-top .brand .dot { color: var(--text); }
  .lp-root .footer-top .tag {
    color: var(--text-3);
    font-size: 14px;
    margin-top: 8px;
  }
  .lp-root .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px 32px;
    margin-bottom: 56px;
  }
  @media (max-width: 880px) { .lp-root .footer-cols { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .lp-root .footer-cols { grid-template-columns: 1fr; } }
  .lp-root .footer-cols h5 {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text);
    font-weight: 600;
    margin: 0 0 20px;
  }
  .lp-root .footer-cols ul { list-style: none; padding: 0; margin: 0; }
  .lp-root .footer-cols li { margin-bottom: 12px; }
  .lp-root .footer-cols a {
    color: var(--text-2);
    text-decoration: none;
    font-size: 14px;
    transition: color .2s;
  }
  .lp-root .footer-cols a:hover { color: var(--text); }
  .lp-root .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-top: 28px;
    border-top: 1px solid var(--line);
  }
  .lp-root .footer-bottom .badges {
    display: flex; flex-wrap: wrap;
    gap: 22px;
    font-size: 12px;
    color: var(--text-3);
  }
  .lp-root .footer-bottom .badges span {
    display: inline-flex; align-items: center; gap: 8px;
  }
  .lp-root .footer-bottom .badges span svg { color: var(--accent); }
  .lp-root .footer-bottom .copy { font-size: 12px; color: var(--text-3); }
`

const STEPS = [
  {
    n: '01',
    title: 'Sign up today',
    body: "Enter your email to claim your spot. We'll email you the moment we go live so you can generate your free logo.",
  },
  {
    n: '02',
    title: 'Tell us about your brand',
    body: "Just enter your business name and a few words about what it does. That's it.",
  },
  {
    n: '03',
    title: 'Our AI does the work',
    body: 'In seconds, our AI turns your brand details into 10 original logos — with the right style, colors, and fonts to match your brand.',
  },
  {
    n: '04',
    title: 'Preview and download',
    body: 'See your logos, pick your favorite, and download it free. No credit card, no catch — just your logo.',
  },
]

const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?w=96&h=96&fit=crop&crop=faces&auto=format&q=70`

const FEATURED_TESTIMONIAL = {
  headline: "I expected something I'd have to fix. I got something I shipped that afternoon.",
  body: "I typed in our studio name and what we do, and the options that came back actually looked designed — proper type, balanced spacing, nothing that screamed software made it. I picked one, put it on our site that afternoon, and our biggest client asked who'd done our new identity.",
  name: 'Nadia Okafor',
  meta: 'Studio Founder, San Francisco CA',
  img: UNSPLASH('photo-1531123897727-8f129e1688ce'),
}

const TESTIMONIALS = [
  {
    headline: "It looks like we paid a studio. We didn't.",
    body: "I generated a logo for our coffee company and the mark was genuinely clean — the kind of thing I'd have expected to wait three weeks and a few thousand dollars for. It's been on our bags for three months. Customers keep asking who designed it.",
    name: 'Ben Hartley',
    meta: 'Coffee Roaster, Oakland CA',
    img: UNSPLASH('photo-1507003211169-0a1dd7228f2d'),
  },
  {
    headline: 'First time our whole team agreed on anything brand-related.',
    body: "We typed in our company name and what we build, generated ten options, and dropped them in Slack for a team vote. We agreed before the meeting ended. The one we picked still looks sharp on everything from the favicon to the deck.",
    name: 'Preethi Nair',
    meta: 'Startup Co-Founder, San Francisco CA',
    img: UNSPLASH('photo-1438761681033-6461ffad8d80'),
  },
  {
    headline: 'Three investors asked about our branding.',
    body: "I dropped the logo into our deck and three investors on separate calls commented on it. It looked considered — like we'd thought about our brand as carefully as our product. I told them how I got it. Two asked for the link.",
    name: 'Marcus Webb',
    meta: 'Startup Founder, San Francisco CA',
    img: UNSPLASH('photo-1500648767791-00dcc994a43e'),
  },
  {
    headline: 'I briefed two designers last year. Neither got this close.',
    body: "Four months, two designers, endless revisions, and I never loved the result. The first batch here had one I'd have happily paid for. Downloaded it the same day. It actually looks like it belongs to my firm.",
    name: 'Claire Sutton',
    meta: 'Architect, Berkeley CA',
    img: UNSPLASH('photo-1494790108377-be9c29b29330'),
  },
  {
    headline: "The logo was the only thing left. Now it's done.",
    body: "My store sat finished for two months because I couldn't face the logo. I generated ten options, found one that looked like a real brand, and launched three days later. It holds up on the packaging and the site equally well.",
    name: 'James Okonkwo',
    meta: 'Shop Owner, San Jose CA',
    img: UNSPLASH('photo-1531427186611-ecfd6d936c79'),
  },
  {
    headline: 'Updated our App Store listing. It finally looks like a real product.',
    body: "I generated a logo for our app and picked the clearest one. The icon reads perfectly even at the tiny App Store size, which is harder than it sounds. Downloads ticked up the week after we updated it.",
    name: 'Suki Park',
    meta: 'App Co-Founder, San Francisco CA',
    img: UNSPLASH('photo-1544005313-94ddf0286df2'),
  },
  {
    headline: 'My embroidery supplier said it was one of the cleanest files she’d seen.',
    body: "I needed something for staff uniforms. I downloaded the vector file and sent it over, and my supplier called to say the lines were so clean it stitched perfectly first time. The logo itself looks like a proper restaurant brand.",
    name: 'Rosa Delgado',
    meta: 'Restaurant Owner, San Jose CA',
    img: UNSPLASH('photo-1573496359142-b8d87734a5a2'),
  },
  {
    headline: "They assumed we'd worked with a designer for months.",
    body: "We generated options the morning of our first customer meeting and picked one over breakfast. It looked polished enough that they assumed we'd had a designer on it for months. It took us about a minute.",
    name: 'Theo Marchetti',
    meta: 'Startup Co-Founder, San Francisco CA',
    img: UNSPLASH('photo-1492562080023-ab3db95bfbce'),
  },
]

type UseCase = { Icon: LucideIcon; t: string; d: string }

const USE_CASE_GROUPS: { group: string; items: UseCase[] }[] = [
  {
    group: 'Your Digital Presence',
    items: [
      { Icon: Globe,        t: 'Website & landing pages',  d: 'The first thing visitors see — make a polished impression in the header, footer, and browser tab icon.' },
      { Icon: Smartphone,   t: 'Social media profiles',    d: 'Instagram, Facebook, LinkedIn, X — a clean profile picture that looks consistent everywhere.' },
      { Icon: Mail,         t: 'Email signatures',         d: 'Add your brand to every email you send — clients and prospects remember a polished look.' },
      { Icon: ShoppingCart, t: 'Your online store',        d: 'Shopify, Etsy, your own site — branded storefronts convert better.' },
    ],
  },
  {
    group: 'Marketing & Sales',
    items: [
      { Icon: Presentation, t: 'Pitch decks & proposals',          d: 'Look the part on every slide, cover page, and one-pager you send to clients or investors.' },
      { Icon: FileText,     t: 'Invoices & contracts',             d: 'Branded paperwork looks more credible — and gets paid faster.' },
      { Icon: Megaphone,    t: 'Ads & social posts',               d: 'A consistent logo across ads builds recognition over time.' },
      { Icon: MailOpen,     t: 'Email campaigns & newsletters',    d: 'Branded marketing emails feel more professional — and stand out in crowded inboxes.' },
    ],
  },
  {
    group: 'Physical & Print',
    items: [
      { Icon: IdCard,    t: 'Business cards & print',  d: 'Your logo prints sharp on business cards, brochures, and flyers.' },
      { Icon: Building2, t: 'Storefront signage',      d: 'Your logo stays sharp at any size — from window decals to giant signs.' },
      { Icon: Package,   t: 'Packaging & products',    d: 'Boxes, labels, tags, merch — full commercial license means you can put your logo on anything.' },
      { Icon: Flag,      t: 'Event banners & posters', d: 'Stand out at trade shows, pop-ups, and conferences with a logo that holds up at any size.' },
    ],
  },
]

const PRICING_BENEFITS = [
  { txt: <>Your logo in <strong>every format</strong> you need (PNG, SVG, PDF, EPS)</> },
  { txt: <><strong>Transparent background</strong> — works on any background color</> },
  { txt: <><strong>Brand Guidelines PDF</strong> — how to use your logo, its exact colors, and matching fonts</> },
  { txt: <><strong>Full commercial license</strong> — use it anywhere you want</> },
  { txt: <><strong>Yours forever</strong> — re-download as many times as you want</> },
]

type Cell = { type: 'yes' | 'no' | 'text' | 'maybe'; v?: string }

const COMPARE_ROWS: { row: string; freelance: Cell; ai: Cell; us: Cell }[] = [
  { row: 'Looks like a designer made it',     freelance: { type: 'yes' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'Time to results',                   freelance: { type: 'text', v: '1–3 weeks' }, ai: { type: 'text', v: '5–15 minutes' }, us: { type: 'text', v: 'Under 60 seconds' } },
  { row: 'Price',                             freelance: { type: 'text', v: '$500–$2,500' }, ai: { type: 'text', v: '$20–$96/year' }, us: { type: 'text', v: 'Free at launch*' } },
  { row: 'No design skills needed',           freelance: { type: 'no' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'Free to download',                  freelance: { type: 'no' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'Free — nothing to lose',            freelance: { type: 'no' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'Vector files (SVG, PDF, EPS)',      freelance: { type: 'yes' }, ai: { type: 'text', v: 'Costs extra' }, us: { type: 'yes' } },
  { row: 'Transparent background (PNG)',      freelance: { type: 'maybe', v: 'Sometimes' }, ai: { type: 'maybe', v: 'Sometimes' }, us: { type: 'yes' } },
  { row: 'Brand Guidelines PDF included',     freelance: { type: 'text', v: 'Costs extra' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'Full commercial license',           freelance: { type: 'maybe', v: 'Sometimes' }, ai: { type: 'maybe', v: 'Sometimes' }, us: { type: 'yes' } },
  { row: 'You own the logo forever',          freelance: { type: 'maybe', v: 'Sometimes' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'Re-download anytime',               freelance: { type: 'no' }, ai: { type: 'no' }, us: { type: 'yes' } },
  { row: 'No subscription, ever',             freelance: { type: 'no' }, ai: { type: 'no' }, us: { type: 'yes' } },
]

const FAQ_ITEMS = [
  { q: 'Is the logo actually free?',                       a: "Yes — completely free for the first 2,000,000 users. No credit card, no trial, no catch. Sign up now to claim your spot, then download your logo free on launch day." },
  { q: 'Why are you giving logos away for free?',          a: "We're launching soon and we want the world to see what LOGO.AI can do. The best way to do that is to let 2,000,000 founders, creators, and small business owners experience it themselves — free." },
  { q: 'What if the free spots run out before I sign up?', a: "Your spot is reserved the moment you sign up. If you're in before we hit 2,000,000, your free logo is guaranteed — no matter how many people sign up after you." },
  { q: 'When exactly can I get my logo?',                  a: "We're launching soon. The moment we go live, you'll be able to log in and generate your free logo. We'll send you a reminder email on launch day." },
  { q: 'Do I need design skills?',                         a: "No. Just enter your business name and a few words about what it does — our AI handles the style, colors, fonts, and layout for you. No design skills, no Photoshop, no creative brief needed." },
  { q: 'How many logos will I see?',                       a: "Each time you generate, you'll see 10 logos to choose from. Don't love them? Generate again — free. For the first 2,000,000 users, downloading is free too. No payment, ever." },
  { q: "What's included in the free logo?",                a: "Everything. Your logo in every format (PNG, SVG, PDF, EPS) with a transparent background, full commercial license, Brand Guidelines PDF, and yours forever — re-download as many times as you want." },
  { q: 'Will my logo be unique to me?',                    a: "Yes. Our AI creates each logo from scratch based on your brand details — no two are alike. Once you download, it's yours alone." },
  { q: "What if I don't love my logo?",                    a: "Generate again — free. You can generate as many times as you want until you find one you love. Don't love any of them? Walk away — your spot is still free." },
  { q: 'What happens after the 2,000,000 free logos are gone?', a: "After the launch offer ends, LOGO.AI will be $49 — one-time, no subscription. So if you're reading this, now is the time to claim yours free." },
  { q: 'What happens to my email address?',                a: "We'll send you a launch day reminder and that's it. No spam, no sales emails, no sharing your data with anyone. Ever." },
  { q: 'Can I trademark my free logo?',                    a: "Yes. Since you fully own it and have a commercial license, you can register your logo as a trademark in your country. Whether it can be trademarked depends on your local laws and how unique the design is — so it's worth checking with a trademark lawyer." },
]

const BLOG_CARDS = [
  {
    title: 'How to choose colors that match your brand',
    desc: 'A simple guide to picking colors that feel right for your business.',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&auto=format&q=70',
    alt: 'Color palette swatches',
  },
  {
    title: '5 logo mistakes that make your brand look amateur',
    desc: 'Common pitfalls to avoid when building your brand identity.',
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format&q=70',
    alt: 'Designer sketching brand identity ideas',
  },
  {
    title: "Restaurant logo ideas: what works and what doesn't",
    desc: 'Industry-specific tips for crafting a logo that fits your business.',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop&auto=format&q=70',
    alt: 'Restaurant interior with signage',
  },
]

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Popular Industries', links: ['Restaurant Logos', 'Coffee Shop Logos', 'Bakery Logos', 'Boutique Logos', 'Gym Logos'] },
  { title: 'Popular Styles',     links: ['Minimalist Logos', 'Vintage Logos', 'Monogram Logos', 'Wordmark Logos', 'Modern Logos'] },
  { title: 'Popular Symbols',    links: ['Crown Logos', 'Animal Logos', 'Leaf Logos', 'Mountain Logos', 'Star Logos'] },
  { title: 'Popular Colors',     links: ['Black & White Logos', 'Blue Logos', 'Gold Logos', 'Green Logos', 'Pink Logos'] },
  { title: 'Quick Links',        links: ['Gallery', 'How It Works', 'FAQ', 'Blog', "Who It's For", 'Free Logo Generator'] },
  { title: 'Company',            links: ['About Us', 'Our Story', 'Team', 'Why LOGO.AI', 'Press', 'Manifesto', 'Contact Support'] },
  { title: 'Explore',            links: ['Before & After', 'Wall of Love', '$0 Brand Playbook', 'AI vs Designer', 'Science Behind the Logo'] },
  { title: 'Legal',              links: ['Terms of Use', 'Privacy Policy', 'Refund Policy', 'Security Policy', 'Commercial License', 'Cookie Policy'] },
]

function CompareCell({ c, isUs }: { c: Cell; isUs?: boolean }) {
  const cls = isUs ? 'us' : ''
  if (c.type === 'yes') return <td className={cls}><span className="yes">✓</span></td>
  if (c.type === 'no')  return <td className={cls}><span className="no">—</span></td>
  if (c.type === 'maybe') return <td className={cls}><span className="maybe">{c.v}</span></td>
  return <td className={cls}>{c.v}</td>
}

export default function PrelaunchLanding() {
  return (
    <div className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <MLpNav />

      <main>
        {/* ============ 1. HERO ============ */}
        <header className="hero" id="hero-cta">
          <div className="wrap">
            <span className="eyebrow">World&rsquo;s Best AI Logo Generator</span>
            <h1>
              Get Your Free Logo<br />
              <span className="muted">in Seconds</span>
            </h1>
            <p className="hero-lede">
              Free logo for the first 2,000,000 users. Join now to claim yours at launch.
            </p>

            <div className="form-card" style={{ marginTop: 56, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
              <div className="email-form">
                <input id="hero-email" type="email" placeholder="Enter your email" aria-label="Enter your email" required />
                <button type="button">Get My Free Logo <span className="arr">→</span></button>
              </div>

              <p className="fine fine-tight">
                <strong>No spam. No credit card. Just a free logo.</strong><br />
                We&rsquo;ll email you the moment we go live so you can generate your free logo.
              </p>

              <p className="hero-counter-main">
                <strong>1,669,349</strong> logos remaining
              </p>
              <div className="progress hero-progress"><div className="progress-fill" style={{ width: '83.5%' }} /></div>
              <p className="hero-counter-sub">55 DAYS UNTIL LAUNCH</p>
            </div>
          </div>
        </header>

        <hr className="rule" />

        {/* ============ 2. GALLERY ============ */}
        <section id="gallery">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Gallery</span>
              <h2>See what your free logo<br /><span className="muted">could look like</span></h2>
              <p className="lede">Each logo below was made by our AI. Yours can be too — free, at launch.</p>
            </div>
            <MLpGallery />
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 3. MOCKUPS ============ */}
        <section id="mockups">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Real-World</span>
              <h2>Picture your logo<br /><span className="muted">everywhere</span></h2>
              <p className="lede">Here&rsquo;s how our logos look on websites, business cards, signage, and anywhere your brand needs to show up.</p>
            </div>
            <MLpMockups />
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 4. HOW IT WORKS ============ */}
        <section id="how-it-works">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How It Works</span>
              <h2>Your free logo in 60 seconds —<br /><span className="muted">on launch day</span></h2>
              <p className="lede">No design skills needed. Sign up today. The moment we go live, your free logo is waiting.</p>
            </div>
            <div className="steps">
              {STEPS.map((s) => (
                <div key={s.n} className="step">
                  <div className="step-num">{s.n}<span className="lbl">Step</span></div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
            <p className="privacy-line">Your brand details stay private — never shared, never sold, only used to make your logos.</p>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 5. TESTIMONIALS ============ */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Early Access</span>
              <h2>What our first users<br /><span className="muted">are saying</span></h2>
              <p className="lede">A few of the founders and creators we gave early access to before launch.</p>
            </div>
            {/* Featured review — Nadia Okafor, marked Featured in v19 */}
            <div className="testimonial-feature">
              <div className="stars">★★★★★</div>
              <blockquote>{FEATURED_TESTIMONIAL.headline}</blockquote>
              <p className="body">{FEATURED_TESTIMONIAL.body}</p>
              <div className="t-cite t-cite-featured">
                <img src={FEATURED_TESTIMONIAL.img} alt="" className="t-avatar" />
                <cite><strong>{FEATURED_TESTIMONIAL.name}</strong>{FEATURED_TESTIMONIAL.meta}</cite>
              </div>
            </div>

            <div className="testimonials">
              {TESTIMONIALS.map((t) => (
                <article key={t.name} className="testimonial">
                  <div className="stars">★★★★★</div>
                  <blockquote>{t.headline}</blockquote>
                  <p>{t.body}</p>
                  <div className="t-cite">
                    <img src={t.img} alt="" className="t-avatar" />
                    <cite><strong>{t.name}</strong>{t.meta}</cite>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 6. USE CASES ============ */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Use Cases</span>
              <h2>Use your logo everywhere<br /><span className="muted">your brand goes</span></h2>
              <p className="lede">Your logo is the face of your business. Here&rsquo;s where you&rsquo;ll put yours.</p>
            </div>
            {USE_CASE_GROUPS.map((g) => (
              <div key={g.group} className="uc-group">
                <div className="uc-group-title">{g.group}</div>
                <div className="uc-grid">
                  {g.items.map(({ Icon, t, d }) => (
                    <div key={t} className="uc-card">
                      <span className="uc-icon"><Icon size={20} strokeWidth={1.6} /></span>
                      <h4>{t}</h4>
                      <p>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 7. PRICING ============ */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Pricing</span>
              <h2>Designer-quality logos —<br /><span className="muted">free at launch</span></h2>
              <p className="lede">
                A freelance designer costs $1,500+. Other AI tools charge $20–$96/year. We&rsquo;re giving ours away free to the first 2,000,000 users.
              </p>
            </div>
            <div className="pricing-card">
              <div className="pricing-head">
                <span className="strike">$49</span>
                <span className="free">Free</span>
              </div>
              <p className="pricing-sub">Free for the first 2,000,000 users — no subscription, no credit card, no catch.</p>
              <p className="pricing-keep">100% yours to keep forever.</p>

              <div className="pricing-divider" />

              <p className="pl-title">What you get — free</p>
              <ul className="pricing-list">
                {PRICING_BENEFITS.map((b, i) => (
                  <li key={i}>{b.txt}</li>
                ))}
              </ul>

              <a href="#hero-cta" className="pricing-cta">Get My Free Logo <span>→</span></a>
              <p className="pricing-fine">Free for the first 2,000,000 users. No credit card, ever.</p>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 8. COMPARE ============ */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">How We Compare</span>
              <h2>Better, faster,<br /><span className="muted">and free</span></h2>
              <p className="lede">See how we compare to a freelance designer or other AI tools.</p>
            </div>
            <div className="compare-wrap">
              <table className="compare">
                <thead>
                  <tr>
                    <th></th>
                    <th>Freelance Designer</th>
                    <th>Other AI Tools</th>
                    <th className="us">LOGO.AI</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.row}>
                      <td>{r.row}</td>
                      <CompareCell c={r.freelance} />
                      <CompareCell c={r.ai} />
                      <CompareCell c={r.us} isUs />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="compare-fine">* Free for the first 2,000,000 users. After that, $49 one-time.</p>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 9. FAQ ============ */}
        <section id="faq">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">FAQ</span>
              <h2>Your questions,<br /><span className="muted">answered</span></h2>
              <p className="lede">Everything you need to know before you sign up.</p>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary>{f.q}</summary>
                  <p className="faq-answer">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 10. BLOG ============ */}
        <section id="blog">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Blog</span>
              <h2>Logo &amp; branding tips<br /><span className="muted">for your business</span></h2>
              <p className="lede">Practical guides to help you build a brand that stands out.</p>
            </div>
            <div className="blog-grid">
              {BLOG_CARDS.map((b) => (
                <a key={b.title} className="blog-card" href="#">
                  <div className="blog-thumb">
                    <img src={b.img} alt={b.alt} loading="lazy" />
                  </div>
                  <div className="blog-body">
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                </a>
              ))}
            </div>
            <div>
              <a className="blog-cta" href="#">See all posts <span>→</span></a>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 11. FINAL CTA ============ */}
        <section id="final-cta">
          <div className="final-cta-wrap">
            <div className="final-cta">
              <div className="final-grid">
                <div className="final-copy">
                  <span className="eyebrow">Free at launch</span>
                  <h2>Ready to Get{' '}<span className="muted">Your Free Logo?</span></h2>
                  <p className="final-counter-line">
                    <strong>1,669,349</strong> of 2,000,000 free logos left.
                  </p>
                  <p className="final-counter-sub">330,651 people already signed up · 55 days until launch.</p>
                  <div className="progress final-progress"><div className="progress-fill" style={{ width: '16.5%' }} /></div>
                </div>

                <div className="form-card">
                  <div className="email-form">
                    <input id="final-email" type="email" placeholder="Enter your email" aria-label="Enter your email" required />
                    <button type="button">Get My Free Logo <span className="arr">→</span></button>
                  </div>

                  <p className="fine">
                    <strong>No spam. No credit card. Just a free logo.</strong><br />
                    We&rsquo;ll email you the moment we go live so you can generate your free logo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ 12. FOOTER ============ */}
      <footer className="lp-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="brand">
              <span className="lp-brand-icon">
                <svg width="34" height="34" viewBox="0 0 200 200" fill="none" aria-hidden>
                  <circle cx="100" cy="100" r="81.25" stroke="currentColor" strokeWidth="6.25"  fill="none" opacity="0.5" />
                  <circle cx="100" cy="100" r="50"    stroke="currentColor" strokeWidth="11.25" fill="none" opacity="0.75" />
                  <circle cx="100" cy="100" r="18.75" stroke="currentColor" strokeWidth="18.75" fill="none" />
                </svg>
              </span>
              <span>LOGO<span className="dot">.</span>AI</span>
            </div>
            <p className="tag">Free logos for the first 2,000,000 users</p>
          </div>

          <div className="footer-cols">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h5>{col.title}</h5>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}><a href="#">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <div className="badges">
              <span><Check size={14} strokeWidth={2.5} /> SSL Secure</span>
              <span><Check size={14} strokeWidth={2.5} /> Stripe Payments</span>
              <span><Check size={14} strokeWidth={2.5} /> Your data is safe</span>
            </div>
            <div className="copy">Copyright © 2026 LOGO.AI. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <MLpStickyCTA />
    </div>
  )
}
