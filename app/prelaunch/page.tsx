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
import MLpUseCases from './_components/MLpUseCases'
import MLpLogo from './_components/MLpLogo'
import MLpHeroCounter from './_components/MLpHeroCounter'
import MLpCountdownBadge from './_components/MLpCountdownBadge'

export const metadata: Metadata = {
  title: 'Free Logos for the First 2,000,000 Users — LOGO.AI',
  description:
    "World's best AI logo generator. Free at launch. Join now to claim yours.",
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;600;700;800&family=Outfit:wght@400;500;600;700&family=Montserrat:wght@900&display=swap');

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
    font-size: 16px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }
  .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }
  .lp-root ::selection { background: var(--accent); color: #fff; }

  /* FIGMA THEME — flips palette to logo.ai Figma file colors:
     #09090b page bg, #E8420D primary CTA, #FF5C2E accent. Flat fills
     only — no hero glow/shadow port. Toggled via MLpThemeToggle which
     adds .is-figma to .lp-root. */
  .lp-root.is-figma {
    --bg:           #09090b;
    /* Elevated surfaces in Figma are translucent Desert-Storm overlays
       on the dark bg, not flat greys. Mirrors the countdown blocks /
       step cards in the Figma file (color/grey/91-5% + 10% border). */
    --bg-elev:      rgba(232, 232, 230, 0.05);
    --bg-elev-2:    rgba(232, 232, 230, 0.08);
    --line:         rgba(232, 232, 230, 0.10);
    --accent:       #FF5C2E;
    --accent-deep:  #E8420D;
    --accent-2:     #FF5C2E;
    --accent-soft:  rgba(232, 66, 13, 0.10);
  }
  /* Sub-component hardcoded purple → orange (MLpGallery, MLpMockups,
     MLpStickyCTA all live inside .lp-root). */
  .lp-root.is-figma .lpg-pill.is-active,
  .lp-root.is-figma .lpm-pill.is-active {
    background: #E8420D;
    border-color: #E8420D;
  }
  .lp-root.is-figma .lpg-subpill.is-active,
  .lp-root.is-figma .lpm-subpill.is-active {
    color: #FF5C2E;
    border-color: #FF5C2E;
  }
  .lp-root.is-figma .lpg-tile:hover { border-color: #E8420D; }
  .lp-root.is-figma .lpg-seeall:hover,
  .lp-root.is-figma .lpm-seeall:hover,
  .lp-root.is-figma .lpg-morebtn:hover { color: #FF5C2E; }
  .lp-root.is-figma .lpg-arr,
  .lp-root.is-figma .lpm-arr { color: #FF5C2E; }
  .lp-root.is-figma .lp-sticky-cta-btn { background: #E8420D; }
  .lp-root.is-figma .lp-sticky-cta-btn:hover { background: #FF5C2E; }
  /* Search-input focus state — tint border + icon orange instead of
     the default neutral gray, so the affordance matches the brand. */
  .lp-root.is-figma .lpg-search input:focus,
  .lp-root.is-figma .lpm-search input:focus {
    border-color: rgba(255, 92, 46, 0.55);
  }
  /* Kill purple glow under the pricing card (per "no hero glow/shadow"
     directive). Keep only the neutral depth shadow. */
  .lp-root.is-figma .pricing-card {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  }
  /* Hardcoded purple rgba tints inside page.tsx that don't pass through
     the CSS variables. */
  .lp-root.is-figma .email-form input:focus {
    box-shadow: 0 0 0 3px rgba(232, 66, 13, 0.18);
  }
  .lp-root.is-figma .compare tbody td.us {
    background: rgba(232, 66, 13, 0.05);
  }

  /* CUSTOM TYPOGRAPHY — confident-tech system using Sora (display) +
     Outfit (UI/body). Designed for the prelaunch page rather than
     copied from the live site. Hierarchy:
       hero H1 → 72 / 800     (biggest moment)
       final H2 → 52 / 800    (endpoint, bigger than section H2)
       section H2 → 44 / 700  (consistent across sections)
       card H3 → 22 / 700 / left
       eyebrow → Outfit 12 / 600 / 0.15em UPPER (color leans on accent)
       lede → Outfit 18 / 400 / 1.55
       body → Outfit 16 / 400 / 1.65
       nav  → Outfit 15 / 500
     Toggled by MLpThemeToggle "Custom" which adds .is-figma-type. */
  .lp-root.is-figma-type {
    --serif: 'Sora', sans-serif;
    --sans:  'Outfit', sans-serif;
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    line-height: 1.65;
  }
  .lp-root.is-figma-type h1,
  .lp-root.is-figma-type h2,
  .lp-root.is-figma-type h3 {
    font-family: 'Sora', sans-serif;
  }
  /* Hero H1 — biggest type on the page. Clamp floor pinned at 34px so
     "Get Your Free Logo" always fits on a single line down to ~320px
     viewports. Hard-wrap is enforced by the .h1-line nowrap span as
     belt-and-suspenders, keeping the heading at exactly 2 rows. */
  .lp-root.is-figma-type .hero h1,
  .lp-root.is-figma-type h1 {
    font-size: clamp(34px, 7.5vw, 72px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.03em;
    text-align: center;
  }
  .lp-root.is-figma-type .hero h1 .h1-line {
    white-space: nowrap;
    display: inline-block;
  }
  /* Re-enable the BR inside the hero h1 — the global .lp-root h1 br
     display:none rule suppresses it by default. */
  .lp-root .hero h1 br { display: inline; }
  /* Final-CTA H2 ("Ready to Get Your Free Logo?") — endpoint moment,
     bigger and bolder than a normal section H2 so it feels like the
     close of the page. */
  .lp-root.is-figma-type .final-cta-simple .final-h2-simple,
  .lp-root.is-figma-type #final-cta h2 {
    font-size: clamp(34px, 5.4vw, 52px);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-align: center;
  }
  /* Section H2s — consistent across all body sections. */
  .lp-root.is-figma-type h2 {
    font-size: clamp(30px, 4.6vw, 44px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-align: center;
  }
  /* H3 — used inside cards (step cards, FAQ rows, pricing). Left-aligned
     so the rhythm of the card reads naturally. */
  .lp-root.is-figma-type h3 {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.005em;
    text-align: start;
  }
  /* Eyebrow — Outfit (not Sora) for visual variety against the display.
     Sized small with strong tracking; color inherits the accent via
     existing rules in the page. */
  .lp-root.is-figma-type .eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  /* Hero lede — slightly bigger than section lede for the first
     read-down moment. */
  .lp-root.is-figma-type .hero-lede {
    font-family: 'Outfit', sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 1.55;
  }
  /* Section lede — consistent below every section H2. */
  .lp-root.is-figma-type .lede {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.55;
  }
  /* Body paragraphs / list items. */
  .lp-root.is-figma-type p,
  .lp-root.is-figma-type li {
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
  }
  /* Card-body paragraphs — slightly smaller than full-width body so
     cards don't feel text-heavy. */
  .lp-root.is-figma-type .step p,
  .lp-root.is-figma-type .pricing-card li,
  .lp-root.is-figma-type .faq-a {
    font-size: 15px;
    line-height: 1.6;
  }
  /* Brand wordmark — tight Sora, paired weight with hero. */
  .lp-root.is-figma-type .lp-brand,
  .lp-root.is-figma-type .lp-brand .wordmark {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    letter-spacing: -0.015em;
  }

  /* Variant E wordmark — Montserrat 900, squared rounded O's, orange
     dot. Hidden by default. Shown only when .is-figma-type is active,
     which also hides the original .lp-brand-icon and the default
     .wordmark text inside both nav and footer brand blocks. */
  .lp-root .lp-wm-custom { display: none; }
  .lp-root.is-figma-type .lp-brand-icon { display: none; }
  .lp-root.is-figma-type .lp-brand .wordmark,
  .lp-root.is-figma-type .lp-footer .brand .wordmark { display: none; }
  .lp-root.is-figma-type .lp-wm-custom {
    display: inline-flex;
    align-items: baseline;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 1;
    color: #f4f4f6;
  }
  .lp-root.is-figma-type .lp-wm-custom .lp-wm-o {
    display: inline-block;
    width: 0.6em;
    height: 0.715em;
    margin: 0 -0.01em;
    vertical-align: baseline;
  }
  .lp-root.is-figma-type .lp-wm-custom .lp-wm-dot {
    display: inline-block;
    width: 0.16em;
    height: 0.16em;
    margin: 0 0.04em;
    vertical-align: baseline;
    background: #FF5C2E;
  }
  /* Group 3 nested-line variants — single full-width SVG. ViewBox is
     ~431 × 108 (≈ 4:1 aspect). Height pegged near the letter cap-
     height of the A/D/E variants so the nested wordmark reads at a
     similar visual scale, not 2× larger. */
  .lp-root.is-figma-type .lp-wm-custom .lp-wm-nested {
    height: 0.85em;
    width: auto;
    display: block;
    color: #f4f4f6;
  }
  /* Custom-mode brand sizing — nav and footer use the same wordmark
     scale established in the original .lp-brand size. */
  .lp-root.is-figma-type .lp-brand { font-size: 24px; gap: 0; }
  .lp-root.is-figma-type .lp-footer .brand { font-size: 26px; gap: 0; }
  /* Nav links + Browse Logos dropdown button — ALL CAPS with light
     tracking. CTA pill stays in title case (per user direction) so
     it reads as an action rather than nav furniture. */
  .lp-root.is-figma-type .lp-nav-links,
  .lp-root.is-figma-type .lp-nav-links a,
  .lp-root.is-figma-type .lp-dropdown > button {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  /* Top nav uses the base layout — brand pinned to the left of the
     1440px content band, links flex-centered between (via base
     .lp-nav-links flex:1 + justify-content:center), CTA on the
     right. No Custom-mode overrides needed here; only the uppercase
     typography for the link text. */
  /* Browse Logos dropdown menu — the default --bg-elev in Custom mode
     is a 5% Desert-Storm overlay (too see-through for a floating
     panel). Switch to a near-solid dark + backdrop blur so the menu
     reads cleanly over any scrolling content. */
  .lp-root.is-figma-type .lp-dropdown-menu {
    background: rgba(20, 20, 24, 0.96);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-color: rgba(232, 232, 230, 0.12);
  }
  /* Mobile clamp — keep displays from overflowing tiny viewports. */
  @media (max-width: 720px) {
    .lp-root.is-figma-type h3 { font-size: 20px; }
    .lp-root.is-figma-type .hero-lede { font-size: 17px; }
    .lp-root.is-figma-type .lede { font-size: 16px; }
  }

  /* ── CUSTOM: USE CASES — icon-led tiles with hover-reveal ──────────
     All 12 items rendered at once across the 3 stacked groups. Each
     group's title becomes a small uppercase orange chip above its
     band of 4 tiles. Tile shows icon + title by default. Description
     slides up from below on hover (max-height + opacity transition). */
  .lp-root.is-figma-type .uc-group { margin-top: 56px; }
  .lp-root.is-figma-type .uc-group:first-of-type { margin-top: 0; }
  .lp-root.is-figma-type .uc-group-title {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #f4f4f6;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0 0 18px;
  }
  .lp-root.is-figma-type .uc-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  .lp-root.is-figma-type .uc-card {
    background: rgba(232, 232, 230, 0.03);
    border: 1px solid rgba(232, 232, 230, 0.08);
    border-radius: 16px;
    padding: 22px 22px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .lp-root.is-figma-type .uc-card:hover {
    background: rgba(232, 232, 230, 0.06);
    border-color: rgba(255, 92, 46, 0.32);
    transform: translateY(-2px);
  }
  .lp-root.is-figma-type .uc-card .uc-icon {
    width: auto;
    height: auto;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    background: transparent;
    color: #FF5C2E;
    border: 0;
    border-radius: 0;
    padding: 0;
    margin: 0;
  }
  .lp-root.is-figma-type .uc-card h4 {
    font-family: 'Sora', sans-serif;
    font-size: 15.5px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.005em;
    color: #f4f4f6;
    margin: 0;
  }
  /* Description always visible — non-collapsible. */
  .lp-root.is-figma-type .uc-card p {
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.55;
    color: #b8b8c4;
    margin: 0;
  }
  /* Tablet — 2 cols per group */
  @media (max-width: 880px) {
    .lp-root.is-figma-type .uc-grid { grid-template-columns: repeat(2, 1fr); }
  }
  /* Mobile — 1 col */
  @media (max-width: 520px) {
    .lp-root.is-figma-type .uc-grid { grid-template-columns: 1fr; }
  }

  /* Default: pricing wrappers are transparent for layout. The
     non-Custom layouts treat .pricing-card as a centered flex column,
     so the wrappers need to disappear from that flow. */
  .lp-root .pricing-left,
  .lp-root .pricing-right { display: contents; }

  /* ── CUSTOM: PRICING split layout ──────────────────────────────────
     Drops the card chrome. Two-column grid using the .pricing-left
     and .pricing-right wrappers as flex columns. CTA on the left
     uses margin-top: auto to pin itself to the bottom so the left
     column's bottom aligns with the bottom of the benefits list on
     the right. */
  .lp-root.is-figma-type .pricing-card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 80px;
    row-gap: 0;
    align-items: stretch;
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 0;
    max-width: 1100px;
    margin: 0 auto;
    text-align: left;
    box-shadow: none;
    overflow: visible;
  }
  .lp-root.is-figma-type .pricing-left {
    display: flex;
    flex-direction: column;
  }
  /* Right column: vertically center the eyebrow + list as a group.
     Keeps them tight (no gap between) while the space above/below
     balances against the taller left column. */
  .lp-root.is-figma-type .pricing-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  /* LEFT COLUMN — price block */
  .lp-root.is-figma-type .pricing-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .lp-root.is-figma-type .pricing-head .strike {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.45);
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
    line-height: 1.2;
  }
  .lp-root.is-figma-type .pricing-head .free {
    font-family: 'Sora', sans-serif;
    font-size: clamp(72px, 11vw, 120px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: #f4f4f6;
  }
  .lp-root.is-figma-type .pricing-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.55;
    color: #b8b8c4;
    margin: 24px 0 0;
    max-width: 38ch;
  }
  .lp-root.is-figma-type .pricing-keep {
    font-family: 'Outfit', sans-serif;
    font-size: 14.5px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.55);
    margin: 8px 0 0;
  }
  .lp-root.is-figma-type .pricing-card .pricing-divider { display: none; }
  .lp-root.is-figma-type .pricing-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #E8420D;
    color: #ffffff;
    padding: 18px 32px;
    border-radius: 999px;
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    width: auto;
    align-self: flex-start;
    min-width: 240px;
    /* Explicit breathing room above the CTA — the right column self-
       centers now, so margin-top: auto would collapse to 0 here. */
    margin-top: 36px;
  }
  .lp-root.is-figma-type .pricing-cta:hover { background: #FF5C2E; }
  .lp-root.is-figma-type .pricing-fine {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    color: rgba(232, 232, 230, 0.45);
    margin: 14px 0 0;
    text-align: left;
  }
  /* RIGHT COLUMN — eyebrow + benefits */
  .lp-root.is-figma-type .pricing-card .pl-title {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #FF5C2E;
    margin: 0 0 20px;
  }
  .lp-root.is-figma-type .pricing-list {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .lp-root.is-figma-type .pricing-list li {
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    line-height: 1.55;
    color: #b8b8c4;
    padding-left: 36px;
    position: relative;
    text-align: left;
  }
  .lp-root.is-figma-type .pricing-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 4px;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: rgba(255, 92, 46, 0.12);
    border: 1px solid rgba(255, 92, 46, 0.22);
  }
  .lp-root.is-figma-type .pricing-list li::after {
    content: "✓";
    position: absolute;
    left: 5px;
    top: 3px;
    width: 14px;
    height: 14px;
    color: #FF5C2E;
    font-size: 13px;
    font-weight: 700;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-top: 4px;
  }
  .lp-root.is-figma-type .pricing-list li strong {
    color: #f4f4f6;
    font-weight: 600;
  }
  /* Tablet / mobile — collapse to single column. The .pricing-left and
     .pricing-right wrappers stack naturally. */
  @media (max-width: 880px) {
    .lp-root.is-figma-type .pricing-card {
      grid-template-columns: 1fr;
      column-gap: 0;
      row-gap: 40px;
    }
    .lp-root.is-figma-type .pricing-cta {
      width: 100%;
      align-self: stretch;
      margin-top: 24px;
      min-width: 0;
    }
  }

  /* ── CUSTOM: EARLY ACCESS / TESTIMONIALS editorial layout ──────────
     Featured testimonial becomes a magazine-style pull-quote (no card,
     no italics) with a giant decorative orange quote-mark above. Other
     testimonials drop card chrome and sit in a 2-column ruled grid:
     top border on container, right border between columns, bottom
     border between rows (no border on the last row). */
  .lp-root.is-figma-type .testimonial-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
    margin: 8px auto 72px;
    padding: 0;
    text-align: center;
  }
  .lp-root.is-figma-type .testimonial-feature::before {
    content: "\\201C";
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: 96px;
    line-height: 0.7;
    color: rgba(255, 92, 46, 0.22);
    margin: 0 0 8px;
    order: 0;
  }
  .lp-root.is-figma-type .testimonial-feature blockquote {
    font-family: 'Sora', sans-serif;
    font-style: normal;
    font-size: clamp(22px, 2.8vw, 30px);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: #f4f4f6;
    margin: 0 0 24px;
    max-width: 32ch;
    order: 1;
  }
  .lp-root.is-figma-type .testimonial-feature blockquote::before { content: none; }
  .lp-root.is-figma-type .testimonial-feature .body {
    font-family: 'Outfit', sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.65;
    color: #b8b8c4;
    margin: 0 0 32px;
    max-width: 60ch;
    order: 2;
  }
  .lp-root.is-figma-type .testimonial-feature .t-cite-featured {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    order: 3;
  }
  .lp-root.is-figma-type .testimonial-feature .t-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(232, 232, 230, 0.15);
  }
  .lp-root.is-figma-type .testimonial-feature cite {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: rgba(232, 232, 230, 0.55);
    font-style: normal;
    text-align: left;
  }
  .lp-root.is-figma-type .testimonial-feature cite strong {
    font-family: 'Sora', sans-serif;
    color: #f4f4f6;
    font-weight: 700;
    font-size: 16px;
    display: block;
    margin-bottom: 2px;
  }
  .lp-root.is-figma-type .testimonial-feature .stars {
    color: rgba(232, 232, 230, 0.55);
    letter-spacing: 6px;
    font-size: 14px;
    margin: 16px 0 0;
    order: 4;
  }

  /* Regular testimonials — strip card chrome, ruled 2-col grid */
  .lp-root.is-figma-type .testimonials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    margin-top: 48px;
  }
  .lp-root.is-figma-type .testimonial {
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    border-radius: 0;
    padding: 36px 28px;
    gap: 16px;
    transition: background 0.18s ease;
  }
  .lp-root.is-figma-type .testimonial:nth-child(even) {
    border-left: 1px solid rgba(232, 232, 230, 0.10);
  }
  .lp-root.is-figma-type .testimonial:nth-last-child(-n+2) { border-bottom: 0; }
  .lp-root.is-figma-type .testimonial:hover {
    background: rgba(232, 232, 230, 0.025);
    border-color: rgba(232, 232, 230, 0.10);
  }
  .lp-root.is-figma-type .testimonial .stars {
    color: rgba(232, 232, 230, 0.55);
    letter-spacing: 4px;
    font-size: 13px;
  }
  .lp-root.is-figma-type .testimonial blockquote {
    font-family: 'Sora', sans-serif;
    font-style: normal;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.005em;
    color: #f4f4f6;
    margin: 0;
  }
  .lp-root.is-figma-type .testimonial blockquote::before {
    content: "\\201C";
    color: #FF5C2E;
    margin-right: 4px;
    font-weight: 800;
  }
  .lp-root.is-figma-type .testimonial p {
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    color: #b8b8c4;
    line-height: 1.6;
    margin: 0;
  }
  .lp-root.is-figma-type .testimonial .t-cite {
    padding-top: 8px;
    align-items: center;
  }
  .lp-root.is-figma-type .testimonial .t-avatar {
    width: 36px;
    height: 36px;
  }
  .lp-root.is-figma-type .testimonial cite {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    color: rgba(232, 232, 230, 0.5);
    font-style: normal;
  }
  .lp-root.is-figma-type .testimonial cite strong {
    font-family: 'Sora', sans-serif;
    color: #f4f4f6;
    font-weight: 700;
    font-size: 14px;
    display: block;
  }
  /* Mobile — single col, no side borders, top border between rows */
  @media (max-width: 760px) {
    .lp-root.is-figma-type .testimonials { grid-template-columns: 1fr; }
    .lp-root.is-figma-type .testimonial,
    .lp-root.is-figma-type .testimonial:nth-child(even) {
      padding: 28px 0;
      border-left: 0;
    }
    .lp-root.is-figma-type .testimonial:nth-last-child(-n+2) {
      border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    }
    .lp-root.is-figma-type .testimonial:last-child { border-bottom: 0; }
  }

  /* ── CUSTOM: HOW IT WORKS — horizontal timeline ────────────────────
     Cards drop their chrome. Each step has a 72px circle badge with
     its numeral, connected to the next step by a dashed line drawn
     behind via ::before. Circle background matches the page bg so the
     line cleanly hides under it. */
  .lp-root.is-figma-type .steps {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    align-items: start;
  }
  .lp-root.is-figma-type .step {
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: none;
  }
  .lp-root.is-figma-type .step:hover {
    border: 0;
    transform: none;
  }
  /* Dashed connector — sits behind the circle of the NEXT step. */
  .lp-root.is-figma-type .step:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 36px;
    left: 50%;
    right: -50%;
    height: 0;
    border-top: 1.5px dashed rgba(255, 92, 46, 0.35);
    z-index: 0;
  }
  .lp-root.is-figma-type .step .step-num {
    position: relative;
    z-index: 1;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: var(--bg);
    border: 1.5px solid rgba(255, 92, 46, 0.40);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #FF5C2E;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
    gap: 0;
  }
  .lp-root.is-figma-type .step .step-num .lbl { display: none; }
  .lp-root.is-figma-type .step h3 {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.005em;
    color: #f4f4f6;
    text-align: center;
    margin: 0 0 10px;
  }
  .lp-root.is-figma-type .step p {
    font-family: 'Outfit', sans-serif;
    font-size: 14.5px;
    font-weight: 400;
    line-height: 1.55;
    color: #b8b8c4;
    text-align: center;
    max-width: 28ch;
    margin: 0 auto;
  }
  /* Tablet — 2-col grid; kill connector at the end of each row */
  @media (max-width: 880px) {
    .lp-root.is-figma-type .steps {
      grid-template-columns: 1fr 1fr;
      gap: 48px 24px;
    }
    .lp-root.is-figma-type .step:nth-child(2n)::before { display: none; }
  }
  /* Mobile — single col, vertical dashed connector under each circle */
  @media (max-width: 520px) {
    .lp-root.is-figma-type .steps {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .lp-root.is-figma-type .step:not(:last-child)::before {
      display: block;
      top: 72px;
      left: 50%;
      right: auto;
      width: 0;
      height: 40px;
      border-top: 0;
      border-left: 1.5px dashed rgba(255, 92, 46, 0.35);
    }
  }

  /* ── CUSTOM: HOW WE COMPARE — winner-pillar table ──────────────────
     Keeps the data table but elevates the LOGO.AI ("us") column as a
     visual pillar with orange border, soft tint, rounded top/bottom,
     and a floating "BEST" badge above the header. Other columns are
     muted so the contrast is obvious at a glance. */
  .lp-root.is-figma-type .compare-wrap {
    background: transparent;
    border: 0;
    border-radius: 0;
    overflow: visible;
    padding-top: 18px;     /* room for the BEST badge */
  }
  .lp-root.is-figma-type .compare {
    border-collapse: separate;
    border-spacing: 0;
    font-family: 'Outfit', sans-serif;
  }
  .lp-root.is-figma-type .compare thead th {
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    padding: 18px 16px;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: rgba(232, 232, 230, 0.4);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .lp-root.is-figma-type .compare thead th.us {
    color: #FF5C2E;
    background: rgba(255, 92, 46, 0.08);
    border-top: 1.5px solid rgba(255, 92, 46, 0.45);
    border-left: 1.5px solid rgba(255, 92, 46, 0.45);
    border-right: 1.5px solid rgba(255, 92, 46, 0.45);
    border-bottom: 1.5px solid rgba(255, 92, 46, 0.20);
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    position: relative;
    width: 28%;
  }
  .lp-root.is-figma-type .compare thead th.us::before {
    content: "BEST";
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    background: #E8420D;
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    padding: 6px 14px;
    border-radius: 999px;
    white-space: nowrap;
    line-height: 1;
  }
  .lp-root.is-figma-type .compare tbody td {
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgba(232, 232, 230, 0.08);
    padding: 18px 16px;
    color: rgba(232, 232, 230, 0.5);
    font-size: 14.5px;
    text-align: center;
  }
  .lp-root.is-figma-type .compare tbody td:first-child {
    color: #f4f4f6;
    font-weight: 500;
    text-align: left;
  }
  .lp-root.is-figma-type .compare tbody td.us {
    background: rgba(255, 92, 46, 0.06);
    border-left: 1.5px solid rgba(255, 92, 46, 0.45);
    border-right: 1.5px solid rgba(255, 92, 46, 0.45);
    color: #f4f4f6;
    font-weight: 600;
  }
  .lp-root.is-figma-type .compare tbody tr:last-child td { border-bottom: 0; }
  .lp-root.is-figma-type .compare tbody tr:last-child td.us {
    border-bottom: 1.5px solid rgba(255, 92, 46, 0.45);
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }
  /* Yes / no / maybe — bright on us, muted on the others */
  .lp-root.is-figma-type .compare .yes {
    color: rgba(255, 92, 46, 0.50);
    font-weight: 700;
  }
  .lp-root.is-figma-type .compare td.us .yes { color: #FF5C2E; }
  .lp-root.is-figma-type .compare .no { color: rgba(232, 232, 230, 0.18); }
  .lp-root.is-figma-type .compare .maybe {
    color: rgba(232, 232, 230, 0.4);
    font-style: italic;
    font-size: 13px;
  }
  .lp-root.is-figma-type .compare-fine {
    color: rgba(232, 232, 230, 0.45);
    font-size: 13px;
    text-align: center;
    margin-top: 24px;
  }
  /* Mobile — tighter cells, smaller badge */
  @media (max-width: 720px) {
    .lp-root.is-figma-type .compare thead th { padding: 14px 8px; font-size: 10px; }
    .lp-root.is-figma-type .compare tbody td { padding: 14px 8px; font-size: 13px; }
    .lp-root.is-figma-type .compare thead th.us::before {
      top: -11px;
      font-size: 9px;
      padding: 4px 10px;
      letter-spacing: 0.18em;
    }
  }

  /* ── CUSTOM: HERO — live countdown badge + counter block ──────────
     1) .hero-urgency  — orange pill at top of hero with D:H:M timer
     2) .hero-counter-block — counter line + progress bar + tagline,
        reused in both hero and final CTA via MLpHeroCounter.
     All values come from the shared useLiveCounter hook. */
  .lp-root.is-figma-type .hero .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lp-root.is-figma-type .form-card .fine-tight {
    margin-bottom: 28px;
  }
  /* Top countdown — plain text line with a live dot. Stripped of
     chip chrome / uppercase / bold so the WORLD'S BEST AI LOGO
     GENERATOR eyebrow below reads as the primary element. The orange
     dot stays as a tiny accent to preserve the "live" cue. */
  .lp-root.is-figma-type .hero-urgency {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 0;
    color: rgba(232, 232, 230, 0.55);
    padding: 0;
    border-radius: 0;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    line-height: 1;
    margin: 0 auto 20px;
    font-variant-numeric: tabular-nums;
  }
  /* Live pulsing dot — reused by the countdown badge */
  .lp-root.is-figma-type .hero-counter-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #FF5C2E;
    box-shadow: 0 0 0 0 rgba(255, 92, 46, 0.55);
    animation: heroLiveDot 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes heroLiveDot {
    0%   { box-shadow: 0 0 0 0   rgba(255, 92, 46, 0.55); }
    70%  { box-shadow: 0 0 0 9px rgba(255, 92, 46, 0); }
    100% { box-shadow: 0 0 0 0   rgba(255, 92, 46, 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .lp-root.is-figma-type .hero-counter-dot { animation: none; }
  }

  /* Live counter block — counter line + progress bar + tagline */
  .lp-root.is-figma-type .hero-counter-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 520px;
    margin: 0 auto;
  }
  .lp-root.is-figma-type .hero-counter-main {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.60);
    line-height: 1.4;
    margin: 0;
    text-align: center;
  }
  .lp-root.is-figma-type .hero-counter-main strong {
    font-family: 'Sora', sans-serif;
    color: #FF5C2E;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  /* Progress bar — orange fill, dark grey track */
  .lp-root.is-figma-type .hero-progress {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: rgba(232, 232, 230, 0.10);
    overflow: hidden;
    margin: 4px 0 2px;
  }
  .lp-root.is-figma-type .hero-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #E8420D, #FF5C2E);
    border-radius: 999px;
    transition: width 0.4s ease;
  }
  .lp-root.is-figma-type .hero-progress-label {
    font-family: 'Outfit', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.50);
    margin: 0;
    text-align: center;
  }
  .lp-root.is-figma-type .hero-progress-label strong {
    font-family: 'Sora', sans-serif;
    color: rgba(232, 232, 230, 0.85);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .lp-root.is-figma-type .hero-counter-tagline {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.45);
    margin: 4px 0 0;
    text-align: center;
    letter-spacing: 0.2px;
  }
  /* Final-CTA eyebrow ("While Spots Last") — matches the section
     eyebrow treatment (Outfit 12 / 600 / uppercase tracked). */
  .lp-root.is-figma-type .final-eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #FF5C2E;
    margin: 0 auto 18px;
    display: block;
    text-align: center;
  }
  /* Final-CTA lede — supporting sentence under the H2. Mirrors the
     .hero-lede treatment (Outfit 18 / 400 / muted Desert Storm). */
  .lp-root.is-figma-type .final-lede {
    font-family: 'Outfit', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.55;
    color: #b8b8c4;
    margin: 18px auto 0;
    text-align: center;
    max-width: 56ch;
  }
  /* Counter block sits below the fine print (mirrors hero placement).
     36px gap above so it doesn't crowd the fine print. */
  .lp-root.is-figma-type .final-cta-simple .hero-counter-block {
    margin-top: 36px;
  }

  /* ── CUSTOM: FAQ — 2-col grid with row-major flow ──────────────────
     Items pair up across the grid (1|2, 3|4, 5|6…). Each row stretches
     to its tallest item so closed-state symmetry is automatic and
     2-line questions don't drift their neighbours. With the exclusive
     accordion (name="faq") only one item can be open at a time, so
     at most one row has dead space — predictable, not chaotic. */
  .lp-root.is-figma-type .faq-list {
    max-width: 1080px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 56px;
    row-gap: 0;
    align-items: start;
  }
  .lp-root.is-figma-type .faq-item {
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    border-bottom: 0;
  }
  /* Bottom border on the last item of each column */
  .lp-root.is-figma-type .faq-item:nth-last-child(-n+2) {
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
  }
  .lp-root.is-figma-type .faq-item summary {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 1.35;
    color: #f4f4f6;
    padding: 20px 0;
    gap: 18px;
  }
  .lp-root.is-figma-type .faq-item summary::after {
    color: #FF5C2E;
    font-size: 22px;
  }
  .lp-root.is-figma-type .faq-item summary:hover { color: #FF5C2E; }
  .lp-root.is-figma-type .faq-answer {
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    line-height: 1.65;
    color: #b8b8c4;
    padding: 0 0 22px;
    max-width: none;
  }
  /* Mobile — single column */
  @media (max-width: 720px) {
    .lp-root.is-figma-type .faq-list {
      grid-template-columns: 1fr;
      max-width: 820px;
    }
    .lp-root.is-figma-type .faq-item {
      border-bottom: 0;
    }
    .lp-root.is-figma-type .faq-item:last-child {
      border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    }
  }

  /* ── CUSTOM: BLOG — 1 featured + 3 mini cards (4 posts) ────────────
     Featured card lives on the left and spans all 3 rows. Three
     horizontal mini-cards (image left, title+desc right) stack in
     col 2, one per row — each row sized to 1/3 of the featured so
     the mini stack fits the same vertical extent. */
  .lp-root.is-figma-type .blog-grid {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 18px;
    align-items: stretch;
  }
  /* Featured card — col 1, spans all 3 rows */
  .lp-root.is-figma-type .blog-card:first-child {
    grid-column: 1;
    grid-row: 1 / span 3;
    background: rgba(232, 232, 230, 0.03);
    border: 1px solid rgba(232, 232, 230, 0.10);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .lp-root.is-figma-type .blog-card:first-child:hover {
    border-color: rgba(255, 92, 46, 0.32);
    transform: translateY(-2px);
  }
  .lp-root.is-figma-type .blog-card:first-child .blog-thumb {
    aspect-ratio: auto;
    flex: 1 1 auto;
    min-height: 0;
  }
  .lp-root.is-figma-type .blog-card:first-child .blog-body {
    padding: 28px 32px 32px;
  }
  .lp-root.is-figma-type .blog-card:first-child .blog-body h3 {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.22;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    margin: 0 0 12px;
  }
  .lp-root.is-figma-type .blog-card:first-child .blog-body p {
    font-family: 'Outfit', sans-serif;
    font-size: 15.5px;
    line-height: 1.55;
    color: #b8b8c4;
    margin: 0;
  }
  /* Mini cards — horizontal layout, one per row in col 2 */
  .lp-root.is-figma-type .blog-card:not(:first-child) {
    background: rgba(232, 232, 230, 0.03);
    border: 1px solid rgba(232, 232, 230, 0.10);
    border-radius: 14px;
    display: grid;
    grid-template-columns: 40% 1fr;
    align-items: stretch;
    overflow: hidden;
    min-height: 0;
  }
  .lp-root.is-figma-type .blog-card:not(:first-child):hover {
    border-color: rgba(255, 92, 46, 0.32);
    transform: translateY(-2px);
  }
  .lp-root.is-figma-type .blog-card:not(:first-child) .blog-thumb {
    aspect-ratio: auto;
    height: 100%;
    min-height: 0;
  }
  .lp-root.is-figma-type .blog-card:not(:first-child) .blog-body {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 0;
  }
  .lp-root.is-figma-type .blog-card:not(:first-child) .blog-body h3 {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.005em;
    color: #f4f4f6;
    margin: 0 0 6px;
  }
  .lp-root.is-figma-type .blog-card:not(:first-child) .blog-body p {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    line-height: 1.5;
    color: #b8b8c4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  /* Tablet/mobile — single column, all cards revert to vertical */
  @media (max-width: 880px) {
    .lp-root.is-figma-type .blog-grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 18px;
    }
    .lp-root.is-figma-type .blog-card:first-child {
      grid-column: auto;
      grid-row: auto;
    }
    .lp-root.is-figma-type .blog-card:first-child .blog-thumb {
      aspect-ratio: 16 / 10;
      flex: none;
    }
  }
  @media (max-width: 520px) {
    .lp-root.is-figma-type .blog-card:not(:first-child) {
      grid-template-columns: 1fr;
    }
    .lp-root.is-figma-type .blog-card:not(:first-child) .blog-thumb {
      aspect-ratio: 16 / 10;
      height: auto;
    }
  }

  /* ── CUSTOM: FINAL CTA — spotlight card ────────────────────────────
     Wraps the existing centered Final CTA in a tinted card with an
     orange border and a soft top-down radial gradient. Closing-moment
     visual weight — no drop-shadow / glow (per user's "no hero glow"
     rule), just a flat tinted card. */
  .lp-root.is-figma-type .final-cta-simple {
    max-width: 1040px;
    padding: 72px 80px;
    border: 1.5px solid rgba(255, 92, 46, 0.30);
    border-radius: 24px;
    background:
      radial-gradient(ellipse at top, rgba(255, 92, 46, 0.10) 0%, rgba(255, 92, 46, 0) 60%),
      rgba(232, 232, 230, 0.03);
  }
  /* Mobile — tighter padding, smaller radius */
  @media (max-width: 720px) {
    .lp-root.is-figma-type .final-cta-simple {
      padding: 44px 24px;
      border-radius: 18px;
    }
  }

  /* ── CUSTOM: TOP NAV — Figma-style edge-to-edge bar ────────────────
     Matches the Figma file's nav: solid #09090b background, edge-to-
     edge, hairline border underneath. Sticks to top on scroll
     (inherited from base) — no condense behavior. */
  .lp-root.is-figma-type .lp-nav {
    background: var(--bg);
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
  }

  /* ── CUSTOM: FOOTER — brand strip on top + 4-col link grid below ───
     Top strip: brand wordmark + tagline aligned horizontally. Below:
     8 link sections flow as a 4-col grid (2 rows). No empty masthead
     column — every region carries weight. */
  .lp-root.is-figma-type .lp-footer .wrap {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
  .lp-root.is-figma-type .lp-footer .footer-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 0;
    padding-bottom: 32px;
  }
  .lp-root.is-figma-type .lp-footer .footer-top .brand {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    gap: 10px;
  }
  /* The .lp-brand-icon is hidden in Custom mode, so no SVG sizing
     override is needed here — the .lp-wm-o SVGs inside .lp-wm-custom
     size themselves via em-relative width/height. */
  .lp-root.is-figma-type .lp-footer .footer-top .tag {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: rgba(232, 232, 230, 0.55);
    margin: 0;
    line-height: 1.4;
    max-width: none;
  }
  .lp-root.is-figma-type .lp-footer .footer-cols {
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 32px;
    margin-bottom: 0;
  }
  .lp-root.is-figma-type .lp-footer .footer-cols h5 {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #f4f4f6;
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  .lp-root.is-figma-type .lp-footer .footer-cols a {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: rgba(232, 232, 230, 0.55);
    line-height: 1.6;
  }
  .lp-root.is-figma-type .lp-footer .footer-cols a:hover { color: #f4f4f6; }
  .lp-root.is-figma-type .lp-footer .footer-cols li { margin-bottom: 10px; }
  .lp-root.is-figma-type .lp-footer .footer-bottom {
    border-top: 0;
    padding-top: 8px;
  }
  /* Tablet — link grid drops to 2 cols, brand strip wraps gracefully */
  @media (max-width: 880px) {
    .lp-root.is-figma-type .lp-footer .footer-cols {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 520px) {
    .lp-root.is-figma-type .lp-footer .footer-cols {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }

  /* Hero/final email-form CTA is intentionally NOT overridden — it
     inherits the same sizing/font as the Figma color toggle (per user
     request: "hero CTA same as Figma toggle"). Only the smaller pills
     pick up Outfit so nav text stays consistent with body. */
  .lp-root.is-figma-type .lp-cta-pill,
  .lp-root.is-figma-type .lp-mobile-cta,
  .lp-root.is-figma-type .lp-sticky-cta-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 14.08px;
    font-weight: 600;
    line-height: 21.12px;
  }
  /* Mobile h2 clamp — h1 base clamp already handles the hero across
     all viewports (the old h1 override here was broken — its 76.8px
     max made mobile bigger than desktop). */
  @media (max-width: 720px) {
    .lp-root.is-figma-type h2 { font-size: clamp(28px, 7vw, 41.6px); }
  }

  /* NAV — sticky, opaque. MSharedHeader is skipped on this exact path
     by MSharedHeader.tsx, so this is the only nav rendered. */
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
    border-radius: 999px;
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
  .lp-root .lp-mobile-sublink { padding-left: 16px; font-size: 15px; color: var(--text-2); }

  /* Accordion section header (tap-to-expand for Company / Browse Logos
     on mobile). Styled to read as a peer of the regular nav links —
     same colour, size, and casing — with a chevron on the right to
     signal the accordion affordance. */
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
  .lp-root .lp-mobile-section {
    color: inherit;
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 400;
    letter-spacing: normal;
    text-transform: none;
  }
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
    font-family: var(--sans);
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

  /* LAYOUT */
  .lp-root .wrap {
    max-width: var(--maxw);
    margin: 0 auto;
    padding: 0 var(--gutter);
  }
  .lp-root section { padding: 100px 0; }
  @media (max-width: 720px) { .lp-root section { padding: 64px 0; } }

  .lp-root .eyebrow {
    font-family: var(--sans);
    font-size: 13px;
    letter-spacing: 0.6px;
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
  .lp-root h1 { font-size: clamp(40px, 6vw, 68px); line-height: 1.02; }
  .lp-root h2 { font-size: clamp(30px, 4.2vw, 46px); line-height: 1.08; margin-top: 18px; }
  .lp-root h3 { font-size: clamp(20px, 2.2vw, 26px); line-height: 1.25; }
  .lp-root h1 .muted, .lp-root h2 .muted, .lp-root h3 .muted { color: inherit; }

  /* H1/H2 collapse the editorial 2-line splits into one line; the muted
     span gets a leading non-breaking space so adjacent words don't fuse. */
  .lp-root h1 br,
  .lp-root h2 br { display: none; }
  .lp-root h1 .muted::before,
  .lp-root h2 .muted::before { content: "\\00a0"; }

  .lp-root p { color: var(--text-2); max-width: 62ch; margin-left: auto; margin-right: auto; }
  .lp-root p strong { color: var(--text); font-weight: 600; }
  .lp-root .lede { color: var(--text-2); font-size: 19px; max-width: 60ch; margin-left: auto; margin-right: auto; }

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
    padding: 100px 0;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .lp-root .hero .eyebrow { margin-bottom: 28px; }
  .lp-root .hero h1 { margin-left: auto; margin-right: auto; }
  .lp-root .hero h1 .muted { color: inherit; }
  .lp-root .hero-lede {
    margin: 28px auto 0;
    color: var(--text-2);
    font-size: 19px;
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
  /* Final CTA — simple centered stack. Spacing mirrors the hero CTA:
       H2 → 28px → counter → 56px → form → 32px + divider → fine */
  .lp-root .final-cta-simple {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 var(--gutter);
    text-align: center;
  }
  .lp-root .final-cta-simple .final-h2-simple {
    font-family: var(--serif);
    font-weight: 400;
    font-size: clamp(28px, 3.6vw, 42px);
    line-height: 1.08;
    letter-spacing: -0.5px;
    margin: 0;
    color: var(--text);
    text-align: center;
  }
  .lp-root .final-cta-simple .final-counter-line {
    font-family: var(--serif);
    font-size: clamp(17px, 1.9vw, 21px);
    color: var(--text-2);
    margin: 28px auto 0;
    max-width: none;
  }
  .lp-root .final-cta-simple .final-counter-line strong { color: var(--accent); font-weight: 400; }
  .lp-root .final-cta-simple .final-form-row { margin-top: 56px; }
  .lp-root .final-cta-simple .final-fine-simple {
    margin-top: 24px;
    color: var(--text-3);
    font-size: 13px;
    line-height: 1.7;
    max-width: 540px;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-root .final-cta-simple .final-fine-simple strong {
    color: var(--text);
    font-weight: 600;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 18px;
  }

  /* Final CTA form — uses the same inline .email-form treatment as the
     hero (rounded rectangles, side-by-side). Just constrains the width
     so it doesn't span the full content column. */
  .lp-root .final-form-row {
    max-width: 540px;
    margin: 0 auto;
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
    font-size: clamp(17px, 1.9vw, 21px);
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

  .lp-root .email-form {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: stretch;
  }
  .lp-root .email-form input {
    flex: 1;
    min-width: 0;
    background: var(--bg);
    border: 1px solid var(--line);
    color: var(--text);
    padding: 15px 22px;
    border-radius: 999px;
    font-family: var(--sans);
    font-size: 17px;
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
    padding: 15px 26px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    font-family: var(--sans);
    transition: background .2s, transform .15s;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  @media (max-width: 560px) {
    .lp-root .email-form { flex-direction: column; gap: 10px; }
    .lp-root .email-form button { width: 100%; }
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
  .lp-root .step h3 { margin-bottom: 10px; }
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
    color: var(--text);
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
    color: var(--accent);
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
    font-size: 56px;
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
    border-radius: 999px;
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
  /* BLOG_CARDS holds 5 posts so the Custom layout has enough material.
     In Purple/Figma modes the legacy 3-col grid only renders the first
     three; the extras stay hidden unless .is-figma-type is active. */
  .lp-root:not(.is-figma-type) .blog-card:nth-child(n+4) { display: none; }
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
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    transition: color 0.2s;
  }
  .lp-root .blog-cta:hover { color: var(--accent); }

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
  .lp-root .final-copy h2 br { display: inline; }
  .lp-root .final-copy h2 .muted::before { content: none; }
  .lp-root .final-copy h2 .muted { color: inherit; }
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
    padding: 100px 0 32px;
    color: var(--text-2);
    margin-top: 0;
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
  {
    title: 'Wordmark vs. icon: which logo style fits your brand?',
    desc: 'When to pick a name-only mark, a symbol, or both — with examples that work.',
    img: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&h=500&fit=crop&auto=format&q=70',
    alt: 'Wood type letterpress blocks arranged on a desk',
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
  if (c.type === 'no')  return <td className={cls}><span className="no">×</span></td>
  if (c.type === 'maybe') return <td className={cls}><span className="maybe">{c.v}</span></td>
  return <td className={cls}>{c.v}</td>
}

export default function PrelaunchLanding() {
  return (
    <div className="lp-root is-figma is-figma-type" data-wm="a-white">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <MLpNav />

      <main>
        {/* ============ 1. HERO ============ */}
        <header className="hero" id="hero-cta">
          <div className="wrap">
            <MLpCountdownBadge />
            <span className="eyebrow">World&rsquo;s Best AI Logo Generator</span>
            <h1>
              <span className="h1-line">Get Your Free Logo</span><br />
              <span className="h1-line muted">in Seconds</span>
            </h1>
            <p className="hero-lede">
              Free logo for the first 2,000,000 users. Claim your spot now.
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

              <MLpHeroCounter tagline="Going fast. Don't miss yours." />
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
            <MLpUseCases />
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
              <div className="pricing-left">
                <div className="pricing-head">
                  <span className="strike">$49</span>
                  <span className="free">Free</span>
                </div>
                <p className="pricing-sub">Free for the first 2,000,000 users — no subscription, no credit card, no catch.</p>
                <p className="pricing-keep">100% yours to keep forever.</p>

                <div className="pricing-divider" />

                <a href="#hero-cta" className="pricing-cta">Get My Free Logo <span>→</span></a>
                <p className="pricing-fine">Free for the first 2,000,000 users. No credit card, ever.</p>
              </div>

              <div className="pricing-right">
                <p className="pl-title">What you get — free</p>
                <ul className="pricing-list">
                  {PRICING_BENEFITS.map((b, i) => (
                    <li key={i}>{b.txt}</li>
                  ))}
                </ul>
              </div>
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
              <p className="lede">Everything you need to know before you sign up for your free logo.</p>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map((f, i) => (
                <details key={i} className="faq-item" name="faq">
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
              <a className="blog-cta" href="#">See all posts</a>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ============ 11. FINAL CTA ============ */}
        <section id="final-cta">
          <div className="final-cta-simple">
            <h2 className="final-h2-simple">Ready to Get Your Free Logo?</h2>
            <p className="final-lede">
              Hundreds of thousands have already claimed theirs. Get yours before they&rsquo;re gone.
            </p>
            <div className="email-form final-form-row">
              <input id="final-email" type="email" placeholder="Enter your email" aria-label="Enter your email" required />
              <button type="button">Get My Free Logo <span className="arr">→</span></button>
            </div>
            <p className="fine final-fine-simple">
              <strong>No spam. No credit card. Just a free logo.</strong><br />
              We&rsquo;ll email you the moment we go live so you can generate your free logo.
            </p>
            <MLpHeroCounter
              framing="claimed"
              tagline="Don't miss yours."
            />
          </div>
        </section>
      </main>

      {/* ============ 12. FOOTER ============ */}
      <footer className="lp-footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="brand" aria-label="LOGO.AI">
              <MLpLogo />
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
