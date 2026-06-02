// MLpSubpageShell — the lp-root wrapper, nav, theme tokens, and sticky CTA
// bundled into one shell for prelaunch SUBPAGES (about, our-story, etc.).
// The main /prelaunch/page.tsx still owns its own copy of these styles
// inline; this shell is a focused extract of just what the nav + sticky
// CTA need, so any subpage that wraps its content in <MLpSubpageShell>
// gets the same chrome without depending on the main page's CSS.

import type { ReactNode } from 'react'
import MLpNav from './MLpNav'
import MLpStickyCTA from './MLpStickyCTA'

export default function MLpSubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="lp-root is-figma is-figma-type" data-wm="a-white">
      <style dangerouslySetInnerHTML={{ __html: SHELL_STYLES }} />
      <MLpNav />
      {children}
      <MLpStickyCTA />
    </div>
  )
}

const SHELL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;600;700;800&family=Outfit:wght@400;500;600;700&family=Montserrat:wght@900&display=swap');

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
  .lp-root.is-figma .lp-sticky-cta-btn { background: #E8420D; }
  .lp-root.is-figma .lp-sticky-cta-btn:hover { background: #FF5C2E; }

  /* NAV */
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
  .lp-root .lp-nav-links a:hover { color: var(--text); }

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

  /* WORDMARK — Montserrat 900 with a square dot. */
  .lp-root .lp-wm-custom {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    letter-spacing: -0.025em;
    color: var(--text);
    display: inline-flex;
    align-items: center;
    line-height: 1;
    font-size: 24px;
  }
  .lp-root .lp-wm-dot {
    display: inline-block;
    width: 0.2em;
    height: 0.2em;
    background: currentColor;
    margin: 0 0.05em;
    transform: translateY(0.05em);
  }
`
