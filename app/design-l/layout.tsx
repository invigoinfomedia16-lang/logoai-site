import type { ReactNode } from 'react'
import LNav from './_components/LNav'
import LFooter from './_components/LFooter'

// Scoped L design system — wraps every page under /design-l/*
// All typography (dk-* classes) + CSS custom properties are namespaced under .l-theme.
// LNav + LFooter render here automatically — every page (homepage + any future
// sub-page) gets the same nav and footer with ZERO import/setup effort.
// To add a new sub-page: drop a page.tsx anywhere under /design-l/* and it
// inherits fonts, typography, theme vars, nav, and footer automatically.
export default function LLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        ═══════════════════════════════════════════════════════════════════════
        L DESIGN SYSTEM — UNIVERSAL RULES (single source of truth)
        Every sub-page under /design-l/* must follow these rules.
        ═══════════════════════════════════════════════════════════════════════

        ┌─ INTERACTIVE PRIMITIVES ───────────────────────────────────────────┐
        │ Use these classes on every interactive element. No inline hover    │
        │ handlers — the class IS the hover behavior. To change a hover      │
        │ pattern globally, edit the class below; every page picks it up.    │
        │                                                                     │
        │   .l-link        Inline accent text link on light bg               │
        │                  (#7543E3 → #6132BC + underline)                   │
        │   .l-link-dark   Same on dark bg (#C7A8FF → #FFFFFF + underline)   │
        │   .l-card-link   "Read more" inside a full-card <a>; hovers when   │
        │                  the parent card is hovered                        │
        │   .l-pill        Chip/tag (Browse by category, filters)            │
        │                  white bg + Purple Heart border/text on hover      │
        │   .l-card-hover  Hoverable card tile; lift + accent border         │
        │                                                                     │
        │ <LBottomCTA>     Closing CTA for marketing pages                   │
        │                  (light alt section + Purple Heart pill +          │
        │                  #7543E3 → #5F2EB4 hover + shadow)                 │
        └─────────────────────────────────────────────────────────────────────┘

        ┌─ CARD GRID ALIGNMENT (by card count) ──────────────────────────────┐
        │                                                                     │
        │   USE: <LCardGrid>{cards}</LCardGrid> — auto-resolves layout per    │
        │   count. Don't write your own grid-template-columns by hand.       │
        │                                                                     │
        │   2-3 cards    grid-cols-2 / grid-cols-3 (single row)              │
        │   4 cards      grid-cols-1 sm:grid-cols-2  → 2×2                   │
        │   6 cards      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 → 3×2     │
        │   8 cards      grid-cols-2 md:grid-cols-4  → 4×2                   │
        │   9 cards      grid-cols-1 sm:grid-cols-3  → 3×3                   │
        │   16 cards     grid-cols-2 sm:grid-cols-3 md:grid-cols-4 → 4×4     │
        │   5, 7 (odd)   flex flex-wrap justify-center                       │
        │                (LCardGrid auto-applies per-child flex sizing)      │
        │                                                                     │
        │   Rule: NEVER use 'grid-template-columns: repeat(auto-fit, ...)'   │
        │   for known card counts — it leaves orphan rows asymmetric.        │
        └─────────────────────────────────────────────────────────────────────┘

        ┌─ PAGE HERO PATTERN (canonical, matches /our-story) ────────────────┐
        │   <h1>     dk-h1, color #15141A   (page name)                      │
        │   <p>      dk-body-lg, color #7543E3, fontWeight: 500 (tagline)    │
        │   <p>      dk-body-lg, color rgba(21,20,26,0.7) (body)             │
        │   <p>      dk-body-lg, color #15141A, fontWeight: 500 (closing)    │
        │   All centered: max-w-[900px] mx-auto flex flex-col items-center   │
        │                 text-center                                         │
        │   Exception: legal pages (just <h1> + "Last updated" + intro)      │
        └─────────────────────────────────────────────────────────────────────┘

        ┌─ SECTION HEADERS ──────────────────────────────────────────────────┐
        │   Use <LSectionHeader eyebrow= title= subhead=>                    │
        │   When the docx only gives a section name → pass title= only       │
        │     (no invented eyebrow, no invented subhead)                     │
        │   When the docx gives heading + subtitle → pass eyebrow + title    │
        └─────────────────────────────────────────────────────────────────────┘

        ┌─ SECTION BACKGROUND TONES ─────────────────────────────────────────┐
        │   <LSection>             white          primary content            │
        │   <LSection tone="alt">  #F5F0FF        break sections, CTAs       │
        │   <LSection tone="dark"> #210340        homepage stats only        │
        │                                                                     │
        │   Bottom CTA must be tone="alt" (light) so it doesn't merge with   │
        │   the Tolopea footer.                                              │
        └─────────────────────────────────────────────────────────────────────┘

        ┌─ COLORS ───────────────────────────────────────────────────────────┐
        │   #7543E3 Purple Heart        primary accent (links, CTA)          │
        │   #5F2EB4 Purple Heart Hover  CTA button hover (matches homepage)  │
        │   #6132BC Purple Heart Dark   inline link hover                    │
        │   #C7A8FF Mauve               on-dark accent text                  │
        │   #E0CAFF Lighter Mauve       very light accents                   │
        │   #F5F0FF Section Alt BG      tone="alt" sections                  │
        │   #210340 Tolopea             nav/footer bg, dark sections         │
        │   #15141A Woodsmoke           body text                            │
        │   No off-palette colors anywhere on /design-l/* pages.             │
        └─────────────────────────────────────────────────────────────────────┘

        ┌─ CONTENT FIDELITY ─────────────────────────────────────────────────┐
        │   Copy on each sub-page must match its source .docx VERBATIM.      │
        │   Mojibake gets cleaned (em-dash, quotes, arrows). Section titles  │
        │   that aren't in the docx must NOT be invented — use the docx      │
        │   heading as the h2 with no eyebrow.                               │
        └─────────────────────────────────────────────────────────────────────┘
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Mozilla+Headline:wght@300..700&family=Mozilla+Text:ital,wght@0,400..700;1,400..700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Bebas+Neue&family=Oswald:wght@700&family=Anton&family=Archivo+Black&family=Abril+Fatface&family=Bodoni+Moda:wght@900&family=Fraunces:wght@900&family=Instrument+Serif&family=Lilita+One&family=Lobster&family=Bungee&family=Rubik+Mono+One&family=Modak&family=Poppins:wght@900&display=swap');

        .l-theme {
          --heading-font: 'Mozilla Headline';
          --body-font: 'Mozilla Text';
          --accent: #7543E3;
          --accent-dark: #6132BC;
          --mauve: #C7A8FF;
          --lighter-mauve: #E0CAFF;
          --tolopea: #210340;
          --woodsmoke: #15141A;
          --page-bg: #FFFFFF;
          --page-text: #15141A;
          --page-text-muted: rgba(21,20,26,0.7);
          --section-alt-bg: #F5F0FF;
          background: var(--page-bg);
          color: var(--page-text);
          font-family: var(--body-font), sans-serif;
        }

        /* Mirrors the L homepage's local <style> block (app/design-l/page.tsx)
           so every sub-page renders with identical typography. */
        .l-theme .dk-display { font-family: var(--heading-font), sans-serif; font-size: 88px;   line-height: 1em;    letter-spacing: -0.03em;  font-weight: 400; white-space: normal; }
        .l-theme .dk-h1      { font-family: var(--heading-font), sans-serif; font-size: 64px;   line-height: 1.05em; letter-spacing: -0.025em; font-weight: 600; white-space: normal; }
        .l-theme .dk-h2      { font-family: var(--heading-font), sans-serif; font-size: 46.8px; line-height: 57.6px; letter-spacing: 0;        font-weight: 600; white-space: normal; }
        .l-theme .dk-h3      { font-family: var(--heading-font), sans-serif; font-size: 24px;   line-height: 26.4px; letter-spacing: 0;        font-weight: 600; }
        .l-theme .dk-body-lg { font-family: var(--body-font),    sans-serif; font-size: 18px;   line-height: 1.55em; font-weight: 400; }
        .l-theme .dk-body    { font-family: var(--body-font),    sans-serif; font-size: 16px;   line-height: 1.55em; font-weight: 400; }
        .l-theme .dk-nav     { font-family: var(--body-font),    sans-serif; font-size: 15px;   line-height: 1em;    font-weight: 500; }
        .l-theme .dk-btn     { font-family: var(--body-font),    sans-serif; font-size: 15px;   line-height: 1em;    font-weight: 600; }
        .l-theme .dk-caption { font-family: var(--body-font),    sans-serif; font-size: 13px;   line-height: 1.4em;  font-weight: 500; }
        /* Eyebrow: inline overrides on the homepage bump these values — replicate the
           RENDERED result here (14px/500/0.02em, UPPERCASE from the class) so sub-pages
           inherit exactly what users see on the homepage. */
        .l-theme .dk-eyebrow { font-family: var(--body-font),    sans-serif; font-size: 14px;   line-height: 16.8px; letter-spacing: 0.02em;   font-weight: 500; text-transform: uppercase; }

        @media (max-width: 768px) {
          .l-theme .dk-display { font-size: 52px; }
          .l-theme .dk-h1      { font-size: 40px; }
          .l-theme .dk-h2      { font-size: 30px; line-height: 1.2em; }
          .l-theme .dk-h3      { font-size: 20px; line-height: 1.25em; }
          .l-theme .dk-body-lg { font-size: 17px; }
        }
        @media (max-width: 480px) {
          .l-theme .dk-display { font-size: 40px; }
          .l-theme .dk-h1      { font-size: 32px; }
          .l-theme .dk-h2      { font-size: 26px; line-height: 1.2em; }
        }

        /* ── Shared link hover patterns (mirror homepage) ────────────────────
           .l-link       — accent text link on light bg   (#7543E3 → #6132BC + underline)
           .l-link-dark  — accent text link on dark bg    (#C7A8FF → #FFFFFF + underline)
           Apply to any inline anchor/Link that needs a text-link hover.
        */
        .l-theme .l-link { color: #7543E3; text-decoration: none; transition: color 0.15s ease; cursor: pointer; }
        .l-theme .l-link:hover { color: #6132BC; text-decoration: underline; text-underline-offset: 3px; }
        .l-theme .l-link-dark { color: #C7A8FF; text-decoration: none; transition: color 0.15s ease; cursor: pointer; }
        .l-theme .l-link-dark:hover { color: #FFFFFF; text-decoration: underline; text-underline-offset: 3px; }
        /* .l-card-link — "Read more" style inside a full-card anchor; hovers when the parent anchor is hovered */
        .l-theme .l-card-link { color: #7543E3; text-decoration: none; transition: color 0.15s ease, text-decoration 0.15s ease; }
        .l-theme a:hover .l-card-link,
        .l-theme a:focus-visible .l-card-link { color: #6132BC; text-decoration: underline; text-underline-offset: 3px; }
        /* .l-pill — pill-shaped tag/chip with subtle hover (categories, industries, filters) */
        .l-theme .l-pill {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          color: #15141A;
          padding: 10px 20px;
          border-radius: 9999px;
          border: 1px solid rgba(32,18,58,0.12);
          font-family: var(--body-font), sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }
        .l-theme .l-pill:hover {
          background: rgba(117,67,227,0.06);
          border-color: #7543E3;
          color: #7543E3;
        }
        /* .l-card-hover — apply to anchor-wrapped cards for a lift + accent-border on hover (Examples tiles, future card grids) */
        .l-theme .l-card-hover {
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .l-theme .l-card-hover:hover {
          transform: translateY(-2px);
          border-color: #7543E3;
          box-shadow: 0 6px 18px rgba(32,18,58,0.08);
        }
        /* Input placeholder color — readable on white surfaces by default */
        .l-theme input::placeholder,
        .l-theme textarea::placeholder { color: rgba(21,20,26,0.45); opacity: 1; }
        /* Dark-bg input variant — apply className="l-input-dark" to inputs sitting on Tolopea/dark surfaces */
        .l-theme input.l-input-dark::placeholder,
        .l-theme textarea.l-input-dark::placeholder { color: rgba(255,255,255,0.55); opacity: 1; }

        /* Hide WebKit scrollbar on horizontal-scroll strips (used for mobile category rows). */
        .l-theme .l-noscrollbar::-webkit-scrollbar { display: none; }
        .l-theme .l-noscrollbar { scrollbar-width: none; -ms-overflow-style: none; }

        /* Mobile safety net: prevent horizontal page overflow on phones — long words,
           wide tables and absolute decorations sometimes leak past the viewport.
           Note: tables that intentionally horizontal-scroll (e.g. comparison tables)
           live inside their own [overflow-x:auto] wrapper, so this rule does not
           force-shrink them. */
        @media (max-width: 768px) {
          .l-theme { overflow-x: hidden; }
          .l-theme h1, .l-theme h2, .l-theme h3 { overflow-wrap: break-word; word-wrap: break-word; }
          .l-theme img, .l-theme video { max-width: 100%; height: auto; }
        }
      ` }} />
      <div className="l-theme">
        <LNav />
        {children}
        <LFooter />
      </div>
    </>
  )
}
