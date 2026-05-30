// Our Story — experimental design (story-design-experiment branch).
// Direct port of logoai-our-story-flat2d.html. Self-contained: own
// fonts (DM Serif Display + DM Sans + Syne via @import), own colour
// palette (#0e0e0f surface + #7c3aed accent), own nav + footer +
// SVG illustrations. The prelaunch layout still wraps this page so
// MSharedHeader sits above; treat that as evaluation chrome — when
// (if) this design wins we'll wire it into the layout properly.

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story — LOGO.AI',
  description:
    'Thirty years of building things. One problem that never got fixed. So we fixed it.',
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');

  /* ──────────────────────────────────────────────────────────────────
     FONT SYSTEM — three families, scoped to this page only.

     DM Serif Display (400 + 400 italic) — every display moment:
        • .hero h1                  (the headline)
        • .nav-logo                 ("LOGO.AI" wordmark in the top nav)
        • .section-title            ("Every founder hits the same wall.")
        • .pull-quote p             (the bold-italic call-outs)
        • .col-title                ("Hire a designer." / "Use a DIY maker.")
        • .stat-number              ("2.5yrs / 100k+ / 16")
        • .timeline-year            ("Late 2023 / 2024 / 2025 / Now")
        • .big-statement h2         ("They trained the AI…", final line)
        • .cta-section h2           ("Get a Professional Logo…")
        • .footer-top .logo         ("LOGO.AI" wordmark in the footer)
        • .footer-cols h4           (footer column headings)

     DM Sans (300 / 400 / 500) — base body + UI text:
        • .story-root               (default body — everything inherits)
        • .nav-dropdown > button    ("Browse Logos" trigger)
        • .nav-cta                  ("Get My Free Logo" button)
        • .section-number           ("01 — THE PROBLEM")
        • .cta-pill input / button  (email form pieces)
        • all body paragraphs, eyebrows, captions, links, microcopy
          inherit this from the root.
     ────────────────────────────────────────────────────────────────── */

  .story-root {
    --bg:        #0e0e0f;
    --surface:   #161618;
    --border:    #222226;
    --text:      #f0ede8;
    --muted:     #6b6870;
    --accent:    #7c3aed;
    --accent2:   #c2410c;
    --divider:   #2a2a30;

    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;  /* FONT: base body — DM Sans */
    font-weight: 300;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  .story-root * { box-sizing: border-box; }

  /* NAV — fully opaque so the prelaunch layout's MSharedHeader doesn't
     bleed through the experimental nav. */
  .story-root .story-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
  }
  .story-root .nav-logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Serif Display', serif;  /* FONT: nav wordmark "LOGO.AI" — DM Serif Display 400 */
    font-weight: 400;
    font-size: 1.1rem;
    letter-spacing: 0.01em;
    color: var(--text);
    text-decoration: none;
  }
  .story-root .nav-logo .wordmark { letter-spacing: 0.01em; }
  .story-root .nav-logo .dot { color: var(--text); }
  .story-root .nav-links {
    display: flex;
    gap: 22px;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
  }
  .story-root .nav-links > li { display: flex; align-items: center; }
  .story-root .nav-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .story-root .nav-links a:hover { color: var(--text); }

  /* Browse Logos dropdown */
  .story-root .nav-dropdown { position: relative; }
  .story-root .nav-dropdown > button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;  /* FONT: dropdown trigger "Browse Logos" — DM Sans 300 */
    font-size: 0.85rem;
    font-weight: 300;
    letter-spacing: 0.04em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .story-root .nav-dropdown > button:hover,
  .story-root .nav-dropdown:hover > button { color: var(--text); }
  .story-root .nav-dropdown > button .chev {
    display: inline-flex;
    align-items: center;
    transition: transform 0.2s;
  }
  .story-root .nav-dropdown:hover > button .chev { transform: rotate(180deg); }
  .story-root .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 0;
    min-width: 168px;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.15s ease, visibility 0s linear 0.15s;
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  }
  .story-root .nav-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transition: opacity 0.15s ease;
  }
  .story-root .dropdown-menu li { display: block; }
  .story-root .dropdown-menu a {
    display: block;
    padding: 8px 18px;
    color: var(--muted);
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .story-root .dropdown-menu a:hover { color: var(--text); }
  .story-root .nav-cta {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;  /* FONT: primary nav CTA "Get My Free Logo" — DM Sans 500 */
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: opacity 0.2s;
  }
  .story-root .nav-cta:hover { opacity: 0.85; }

  /* WRAPPER — 80px top padding to clear the fixed page-local nav.
     Parent layout's MSharedHeader still sits above this; the fixed
     .story-nav (z-index 100) covers it visually for the experiment. */
  .story-root main { padding-top: 80px; }

  /* HERO */
  .story-root .hero {
    padding: 120px 48px 80px;
    max-width: 900px;
    margin: 0 auto;
    border-bottom: 1px solid var(--divider);
  }
  .story-root .breadcrumb {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 32px;
    font-weight: 500;
  }
  .story-root .hero h1 {
    font-family: 'DM Serif Display', serif;  /* FONT: hero H1 "Thirty years of…" — DM Serif Display 400 */
    font-size: clamp(2.8rem, 6vw, 5.2rem);
    line-height: 1.1;
    font-weight: 400;
    color: var(--text);
    margin: 0 0 28px;
  }
  .story-root .hero h1 em { font-style: normal; color: var(--muted); }
  .story-root .hero-sub {
    font-size: 1.1rem;
    color: var(--muted);
    max-width: 560px;
    line-height: 1.8;
    border-left: 2px solid var(--accent);
    padding-left: 20px;
    margin: 0;
  }

  /* OBJECT BREAK */
  .story-root .clay-wrap {
    display: flex; justify-content: center; align-items: center;
    padding: 72px 0;
    position: relative;
  }
  .story-root .clay-wrap .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }
  .story-root .clay-object {
    position: relative;
    width: 180px; height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .story-root .object-label {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }

  /* SECTION */
  .story-root .story-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 48px;
  }
  .story-root .section-number {
    font-family: 'DM Sans', sans-serif;  /* FONT: section eyebrow "01 — THE PROBLEM" — DM Sans 500 */
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .story-root .section-title {
    font-family: 'DM Serif Display', serif;  /* FONT: section H2 "Every founder hits…" — DM Serif Display 400 */
    font-size: clamp(2rem, 4vw, 3.4rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--text);
    margin: 0 0 40px;
    letter-spacing: -0.02em;
  }
  .story-root .section-title .highlight {
    color: var(--text);
  }
  .story-root .body-text {
    font-size: 1.05rem;
    color: #a09ca8;
    line-height: 1.9;
    max-width: 680px;
  }
  .story-root .body-text p { margin: 0 0 20px; }
  .story-root .body-text p:last-child { margin-bottom: 0; }
  .story-root .body-text strong { color: var(--text); font-weight: 500; }

  /* PULL QUOTE */
  .story-root .pull-quote {
    margin: 48px 0;
    padding: 32px 40px;
    border-left: 3px solid var(--accent);
    background: var(--surface);
    border-radius: 0 8px 8px 0;
  }
  .story-root .pull-quote p {
    font-family: 'DM Serif Display', serif;  /* FONT: pull quotes — DM Serif Display 400 italic */
    font-size: clamp(1.2rem, 2.5vw, 1.7rem);
    line-height: 1.4;
    color: var(--text);
    font-style: italic;
    margin: 0;
  }

  /* STATS ROW */
  .story-root .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin-top: 56px;
  }
  .story-root .stat-cell {
    background: var(--surface);
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .story-root .stat-number {
    font-family: 'DM Serif Display', serif;  /* FONT: stat numbers "2.5yrs / 100k+ / 16" — DM Serif Display 400 */
    font-size: 2.6rem;
    font-weight: 400;
    color: var(--text);
    letter-spacing: -0.03em;
  }
  .story-root .stat-unit { color: var(--accent); font-size: 1.4rem; }
  .story-root .stat-label {
    font-size: 0.8rem;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* TWO COLUMN */
  .story-root .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
    margin-top: 40px;
  }
  .story-root .col-label {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 14px;
  }
  .story-root .col-title {
    font-family: 'DM Serif Display', serif;  /* FONT: two-col titles "Hire a designer." / "Use a DIY maker." — DM Serif Display 400 */
    font-size: 1.6rem;
    line-height: 1.3;
    color: var(--text);
    margin: 0 0 16px;
  }

  /* TIMELINE */
  .story-root .timeline { margin-top: 40px; display: flex; flex-direction: column; gap: 0; }
  .story-root .timeline-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 32px;
    padding: 28px 0;
    border-bottom: 1px solid var(--divider);
    position: relative;
  }
  .story-root .timeline-item:last-child { border-bottom: none; }
  .story-root .timeline-year {
    font-family: 'DM Serif Display', serif;  /* FONT: timeline years "Late 2023 / 2024 / 2025 / Now" — DM Serif Display 400 */
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0;
    color: var(--accent);
    padding-top: 4px;
  }
  .story-root .timeline-content strong {
    display: block;
    color: var(--text);
    font-weight: 500;
    font-size: 0.95rem;
    margin-bottom: 4px;
  }
  .story-root .timeline-content span {
    color: var(--muted);
    font-size: 0.88rem;
  }

  /* BIG STATEMENT */
  .story-root .big-statement {
    padding: 100px 48px;
    max-width: 900px;
    margin: 0 auto;
  }
  .story-root .big-statement h2 {
    font-family: 'DM Serif Display', serif;  /* FONT: big statements "They trained the AI…" — DM Serif Display 400 */
    font-size: clamp(2rem, 5vw, 4.2rem);
    line-height: 1.15;
    font-weight: 400;
    color: var(--text);
    margin: 0;
  }
  .story-root .big-statement h2 .ghost {
    color: var(--text);
  }

  /* CTA SECTION */
  .story-root .cta-section {
    max-width: 900px;
    margin: 0 auto;
    padding: 100px 48px 80px;
    text-align: center;
  }
  .story-root .cta-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 24px;
  }
  .story-root .cta-section h2 {
    font-family: 'DM Serif Display', serif;  /* FONT: CTA H2 "Get a Professional Logo…" — DM Serif Display 400 */
    font-size: clamp(2rem, 4vw, 3.2rem);
    line-height: 1.2;
    margin: 0 0 16px;
  }
  .story-root .cta-section p {
    color: var(--muted);
    font-size: 0.95rem;
    margin: 0 0 48px;
  }
  .story-root .cta-pill {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 8px 8px 8px 24px;
    max-width: 480px;
    width: 100%;
  }
  .story-root .cta-pill input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;  /* FONT: CTA email input field — DM Sans 400 */
    font-size: 0.9rem;
  }
  .story-root .cta-pill input::placeholder { color: var(--muted); }
  .story-root .cta-pill button {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 12px 28px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;  /* FONT: CTA submit button "Get My Free Logo" — DM Sans 500 */
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .story-root .cta-pill button:hover { opacity: 0.88; transform: scale(0.98); }
  .story-root .cta-fine {
    margin: 16px 0 0;
    font-size: 0.78rem;
    color: var(--muted);
  }
  .story-root .counter-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(124,58,237,0.1);
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 0.78rem;
    color: #a78bfa;
    margin-bottom: 32px;
    letter-spacing: 0.03em;
  }
  .story-root .counter-badge .dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #7c3aed;
  }

  /* ALSO READING */
  .story-root .also-reading {
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 48px;
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .story-root .also-label {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
    padding-right: 24px;
    border-right: 1px solid var(--divider);
  }
  .story-root .also-links { display: flex; gap: 0; flex-direction: column; }
  .story-root .also-links a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 6px 0;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .story-root .also-links a:hover { color: var(--text); }
  .story-root .also-links a::before { content: '→'; color: var(--accent); font-size: 0.8rem; }

  /* FOOTER */
  .story-root .story-footer {
    border-top: 1px solid var(--divider);
  }
  .story-root .footer-top {
    max-width: 1280px;
    margin: 0 auto;
    padding: 48px 48px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .story-root .footer-top .logo {
    font-family: 'DM Serif Display', serif;  /* FONT: footer wordmark "LOGO.AI" — DM Serif Display 400 */
    font-weight: 400;
    font-size: 1.1rem;
    letter-spacing: 0.01em;
    color: var(--text);
  }
  .story-root .footer-top .logo .dot { color: var(--text); }
  .story-root .footer-tagline {
    font-size: 0.85rem;
    color: var(--muted);
    margin: 0;
  }
  .story-root .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px 32px;
    padding: 32px 48px 48px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .story-root .footer-cols h4 {
    font-family: 'DM Serif Display', serif;  /* FONT: footer column headings "POPULAR INDUSTRIES…" — DM Serif Display 400 */
    font-weight: 400;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text);
    margin: 0 0 18px;
  }
  .story-root .footer-cols ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .story-root .footer-cols a {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.85rem;
    line-height: 1.5;
    transition: color 0.2s;
  }
  .story-root .footer-cols a:hover { color: var(--text); }
  .story-root .footer-trust {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 48px;
    border-top: 1px solid var(--divider);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 18px;
    font-size: 0.8rem;
    color: var(--muted);
  }
  .story-root .footer-trust .badge { display: inline-flex; align-items: center; gap: 6px; }
  .story-root .footer-trust .badge .check { color: var(--accent); font-weight: 600; }
  .story-root .footer-trust .sep { opacity: 0.4; }
  .story-root .footer-bottom {
    border-top: 1px solid var(--divider);
    padding: 20px 48px;
    max-width: 1280px;
    margin: 0 auto;
  }
  .story-root .footer-bottom p { font-size: 0.75rem; color: var(--muted); margin: 0; }

  /* FONT LEGEND — floating dev panel that names each font and where it
     lives on the page. Each row's "Aa" sample is set IN ITS OWN FONT so
     you can see the look at a glance. Sandbox-only — remove for prod. */
  .story-root .font-legend {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 200;
    width: 320px;
    max-width: calc(100vw - 40px);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px 14px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    font-family: 'DM Sans', sans-serif;
  }
  .story-root .font-legend-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 14px;
  }
  .story-root .font-row {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 14px;
    align-items: center;
    padding: 8px 0;
    border-top: 1px solid var(--divider);
  }
  .story-root .font-row:first-of-type { border-top: none; padding-top: 0; }
  .story-root .font-row .sample {
    font-size: 1.7rem;
    line-height: 1;
    text-align: center;
    color: var(--text);
  }
  .story-root .font-row[data-font="serif"] .sample { font-family: 'DM Serif Display', serif; }
  .story-root .font-row[data-font="syne"]  .sample { font-family: 'Syne', sans-serif; font-weight: 800; }
  .story-root .font-row[data-font="sans"]  .sample { font-family: 'DM Sans', sans-serif; font-weight: 500; }
  .story-root .font-row .font-name {
    font-size: 0.78rem;
    color: var(--text);
    font-weight: 500;
    line-height: 1.2;
  }
  .story-root .font-row .font-where {
    font-size: 0.65rem;
    color: var(--muted);
    margin-top: 4px;
    line-height: 1.45;
  }
  @media (max-width: 900px) {
    .story-root .footer-cols { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  }
  @media (max-width: 600px) {
    .story-root .footer-cols { grid-template-columns: 1fr; }
    .story-root .footer-trust { gap: 8px 12px; }
  }
`

export default function OurStoryPage() {
  return (
    <div className="story-root">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* NAV — experimental design, prelaunch site's nav text */}
      <nav className="story-nav">
        <a className="nav-logo" href="/prelaunch">
          {/* Thinline concentric mark — inline so we can control the
              stroke width independently from the prelaunch MWordmarkIcon
              (which is fixed at 1.5px). */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            shapeRendering="geometricPrecision"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10"  stroke="currentColor" strokeWidth="1" />
            <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1" />
            <circle cx="12" cy="12" r="3"   stroke="currentColor" strokeWidth="1" />
            <circle cx="12" cy="12" r="1"   fill="currentColor" />
          </svg>
          <span className="wordmark">LOGO<span className="dot">.</span>AI</span>
        </a>
        <ul className="nav-links">
          <li><a href="/prelaunch#gallery">Gallery</a></li>
          <li><a href="/prelaunch#how-it-works">How It Works</a></li>
          <li><a href="/prelaunch#faq">FAQ</a></li>
          <li><a href="/prelaunch#blog">Blog</a></li>
          <li><a href="/prelaunch/about">About</a></li>
          <li><a href="/prelaunch/our-story">Our Story</a></li>
          <li><a href="#">Who It&rsquo;s For</a></li>
          <li><a href="#">Why LOGO.AI</a></li>
          <li className="nav-dropdown">
            <button type="button">
              Browse Logos
              <span className="chev" aria-hidden>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <ul className="dropdown-menu">
              <li><a href="#">By Industry</a></li>
              <li><a href="#">By Style</a></li>
              <li><a href="#">By Symbol</a></li>
              <li><a href="#">By Color</a></li>
            </ul>
          </li>
        </ul>
        <a href="/prelaunch#hero-cta" className="nav-cta">Get My Free Logo</a>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <p className="breadcrumb">Our Story</p>
          <h1>Thirty years of<br />building things.<br /><em>One problem that<br />never got fixed.</em></h1>
          <p className="hero-sub">So we fixed it.</p>
        </section>

        {/* SECTION 1: THE PROBLEM */}
        <section className="story-section">
          <p className="section-number">01 — The Problem</p>
          <h2 className="section-title">Every founder hits<br />the same <span className="highlight">wall.</span></h2>
          <div className="body-text">
            <p>You have a business idea. You&apos;re ready to move. And then — <strong>the logo.</strong></p>
            <p>You have two options. Neither is good.</p>
          </div>
          <div className="two-col" style={{ marginTop: 48 }}>
            <div>
              <p className="col-label">Option A</p>
              <p className="col-title">Hire a designer.</p>
              <p className="body-text">Three to six weeks. Rounds of revisions. A final result that might be great, might be fine, might be neither — and you won&apos;t know until you&apos;ve spent <strong>$5,000 to $20,000</strong> to find out.</p>
            </div>
            <div>
              <p className="col-label">Option B</p>
              <p className="col-title">Use a DIY maker.</p>
              <p className="body-text">Fast and cheap. But the output looks like it. The same 400 shapes, reshuffled. Your logo ends up looking like <strong>ten thousand others</strong> — because it&apos;s made from the same parts.</p>
            </div>
          </div>
          <div className="pull-quote" style={{ marginTop: 56 }}>
            <p>For thirty years, those were the only two options. Nobody fixed it. So we did.</p>
          </div>
        </section>

        {/* SECTION 2: ORIGIN */}
        <section className="story-section">
          <p className="section-number">02 — Origin</p>
          <h2 className="section-title">Two brothers.<br />Early internet.</h2>
          <div className="body-text">
            <p>Flash-based e-greeting cards — among the first of their kind. Nobody told them it would work. It became one of the most visited greeting platforms on the web.</p>
            <p>They spent the next three decades building companies across <strong>media, education, productivity, and e-commerce.</strong> Multiple exits. Billions of users.</p>
            <p>They also built AI long before AI was a buzzword — chatbots, game opponents that adapted to how you played, recommendation engines, algorithmic trading systems, early computer vision.</p>
            <p>And through all of it, every company they built or backed ran into the same thing: <strong>getting a logo was always slower, harder, and more expensive than it needed to be.</strong></p>
          </div>
          <div className="pull-quote">
            <p>They kept a mental note. That note turned into a grudge. That grudge turned into LOGO.AI.</p>
          </div>
        </section>

        {/* SECTION 3: THE UNLOCK */}
        <section className="story-section">
          <p className="section-number">03 — The Turning Point</p>
          <h2 className="section-title">Late 2023.<br /><span className="highlight">The obvious</span><br />question.</h2>
          <div className="body-text">
            <p>AI was writing code, generating photorealistic images, composing music.</p>
            <p>The founders asked the obvious question: <strong>why can&apos;t it design a professional logo?</strong></p>
            <p>They tried every tool they could find. All of them produced the same thing — warped text, random symbols, no understanding of what a brand actually is. The problem wasn&apos;t that AI couldn&apos;t do it. The problem was that nobody had taught it properly.</p>
            <p>The tools were generating. <strong>They weren&apos;t designing.</strong></p>
          </div>
          <div className="pull-quote">
            <p>Stop trying to prompt AI into designing a logo. Start teaching it how design actually works.</p>
          </div>
        </section>

        {/* BIG STATEMENT */}
        <div className="big-statement">
          <h2>They trained the AI<br />the way a <span className="ghost">design school</span><br />trains a student.</h2>
        </div>

        {/* SECTION 4: BUILD */}
        <section className="story-section">
          <p className="section-number">04 — How We Built It</p>
          <h2 className="section-title">Color theory.<br />Typography.<br />Negative space.</h2>
          <div className="body-text">
            <p>Visual hierarchy. The structural logic behind logos that have stood for decades. Not a library of pre-made assets to remix. <strong>Real design principles.</strong></p>
            <p>Their benchmark: a professional designer, shown the output blind, can&apos;t tell it from human work. Not sometimes. <strong>Every time.</strong></p>
            <p>They went back many times. Then one day, they stopped going back.</p>
          </div>

          <div className="stats-row">
            <div className="stat-cell">
              <div className="stat-number">2.5<span className="stat-unit">yrs</span></div>
              <div className="stat-label">of R&amp;D</div>
            </div>
            <div className="stat-cell">
              <div className="stat-number">100k<span className="stat-unit">+</span></div>
              <div className="stat-label">logos analyzed</div>
            </div>
            <div className="stat-cell">
              <div className="stat-number">16<span className="stat-unit"></span></div>
              <div className="stat-label">people · 4 countries</div>
            </div>
          </div>

          <div className="timeline" style={{ marginTop: 56 }}>
            <div className="timeline-item">
              <div className="timeline-year">Late 2023</div>
              <div className="timeline-content">
                <strong>The question was asked.</strong>
                <span>AI was everywhere. No one was teaching it design.</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <strong>Deep R&amp;D begins.</strong>
                <span>100,000+ logos analyzed. Design principles encoded. Benchmark set.</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <strong>The product earns the name.</strong>
                <span>LOGO.AI — the domain waited until the product deserved it.</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">Now</div>
              <div className="timeline-content">
                <strong>60 seconds. Every time.</strong>
                <span>A professional logo, designed from scratch. Free at launch.</span>
              </div>
            </div>
          </div>
        </section>

        {/* BIG FINAL STATEMENT */}
        <div className="big-statement" style={{ textAlign: 'center', maxWidth: '100%', padding: '120px 48px' }}>
          <h2 style={{ margin: '0 auto', maxWidth: 800 }}>
            The problem took<br /><span className="ghost">thirty years</span> to fix.<br />The fix takes<br />sixty seconds to use.
          </h2>
        </div>

        {/* CTA */}
        <section className="cta-section">
          <p className="cta-eyebrow">2,000,000 free logos at launch</p>
          <div className="counter-badge">
            <span className="dot"></span>
            1,669,349 spots remaining — don&apos;t miss yours
          </div>
          <h2>Get a Professional Logo.<br />Completely Free.</h2>
          <p>We&apos;ll email you the moment we go live so you can generate your free logo.</p>
          <div className="cta-pill">
            <input type="email" placeholder="Enter your email" />
            <button>Get My Free Logo</button>
          </div>
          <p className="cta-fine">No spam. No credit card. Just a free logo.</p>
        </section>

        {/* ALSO READING */}
        <div className="also-reading">
          <span className="also-label">Also worth reading</span>
          <div className="also-links">
            <a href="#">Meet the Team</a>
            <a href="#">Why LOGO.AI</a>
          </div>
        </div>
      </main>

      {/* FOOTER — experimental design + new spec content (8 columns) */}
      <footer className="story-footer">
        <div className="footer-top">
          <span className="logo">LOGO<span className="dot">.</span>AI</span>
          <p className="footer-tagline">Free logos for the first 2,000,000 users</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Popular Industries</h4>
            <ul>
              <li><a href="#">Restaurant Logos</a></li>
              <li><a href="#">Coffee Shop Logos</a></li>
              <li><a href="#">Bakery Logos</a></li>
              <li><a href="#">Boutique Logos</a></li>
              <li><a href="#">Gym Logos</a></li>
            </ul>
          </div>
          <div>
            <h4>Popular Styles</h4>
            <ul>
              <li><a href="#">Minimalist Logos</a></li>
              <li><a href="#">Vintage Logos</a></li>
              <li><a href="#">Monogram Logos</a></li>
              <li><a href="#">Wordmark Logos</a></li>
              <li><a href="#">Modern Logos</a></li>
            </ul>
          </div>
          <div>
            <h4>Popular Symbols</h4>
            <ul>
              <li><a href="#">Crown Logos</a></li>
              <li><a href="#">Animal Logos</a></li>
              <li><a href="#">Leaf Logos</a></li>
              <li><a href="#">Mountain Logos</a></li>
              <li><a href="#">Star Logos</a></li>
            </ul>
          </div>
          <div>
            <h4>Popular Colors</h4>
            <ul>
              <li><a href="#">Black &amp; White Logos</a></li>
              <li><a href="#">Blue Logos</a></li>
              <li><a href="#">Gold Logos</a></li>
              <li><a href="#">Green Logos</a></li>
              <li><a href="#">Pink Logos</a></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/prelaunch#gallery">Gallery</a></li>
              <li><a href="/prelaunch#how-it-works">How It Works</a></li>
              <li><a href="/prelaunch#faq">FAQ</a></li>
              <li><a href="/prelaunch#blog">Blog</a></li>
              <li><a href="#">Who It&rsquo;s For</a></li>
              <li><a href="#">Free Logo Generator</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/prelaunch/about">About Us</a></li>
              <li><a href="/prelaunch/our-story">Our Story</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Why LOGO.AI</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Manifesto</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Before &amp; After</a></li>
              <li><a href="#">Wall of Love</a></li>
              <li><a href="#">$0 Brand Playbook</a></li>
              <li><a href="#">AI vs Designer</a></li>
              <li><a href="#">Science Behind the Logo</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Security Policy</a></li>
              <li><a href="#">Commercial License</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-trust">
          <span className="badge"><span className="check">✓</span> SSL Secure</span>
          <span className="sep">·</span>
          <span className="badge"><span className="check">✓</span> Stripe Payments</span>
          <span className="sep">·</span>
          <span className="badge"><span className="check">✓</span> Your data is safe</span>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2026 Logo.AI. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating font legend — dev/review panel. Lists each font in its
          own typeface so you can see what it looks like + where it's used. */}
      <aside className="font-legend" aria-label="Font legend">
        <p className="font-legend-title">Fonts on this page</p>
        <div className="font-row" data-font="serif">
          <span className="sample">Aa</span>
          <div>
            <div className="font-name">DM Serif Display</div>
            <div className="font-where">Wordmark · Hero h1 · Section H2s · Pull quotes · Stat numbers · Timeline years · Big statements · CTA h2 · Two-col titles · Footer headings</div>
          </div>
        </div>
        <div className="font-row" data-font="sans">
          <span className="sample">Aa</span>
          <div>
            <div className="font-name">DM Sans</div>
            <div className="font-where">Body · Nav links · Section eyebrows · CTA button · Footer links</div>
          </div>
        </div>
      </aside>
    </div>
  )
}
