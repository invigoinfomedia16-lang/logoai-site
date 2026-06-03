// MLpSubpageShell — the full chrome (nav, footer, sticky CTA, shared
// theme tokens, typography, layout primitives) bundled into one shell
// for every prelaunch SUBPAGE. Drop content inside <MLpSubpageShell>
// and use the same .wrap / .sec-head / .eyebrow / h2 / .lede / p
// classes the home page uses — the page automatically inherits the
// home-page visual system.
//
// ╔══════════════════════════════════════════════════════════════════╗
// ║                  PRELAUNCH SUBPAGE RULES                         ║
// ║              (read this before building any new page)            ║
// ╠══════════════════════════════════════════════════════════════════╣
// ║                                                                  ║
// ║ 1. WRAP                                                          ║
// ║    Every subpage's root JSX is:                                  ║
// ║        <MLpSubpageShell>                                         ║
// ║          <style dangerouslySetInnerHTML={{ __html: STYLES }} />  ║
// ║          <main>... your sections ...</main>                      ║
// ║        </MLpSubpageShell>                                        ║
// ║    Never render <MLpNav>, <MLpFooter>, <MLpStickyCTA> manually.  ║
// ║    Never set theme tokens (--bg / --text / --accent etc.) in     ║
// ║    page CSS — they come from MLpNavStyles.                       ║
// ║                                                                  ║
// ║ 2. SECTION PATTERN                                               ║
// ║    Every section follows:                                        ║
// ║        <section>                                                 ║
// ║          <div className="wrap">                                  ║
// ║            <div className="sec-head">                            ║
// ║              <span className="eyebrow">Short tag</span>          ║
// ║              <h2>Section Name</h2>                               ║
// ║              <p className="lede">Descriptive sentence.</p>       ║
// ║            </div>                                                ║
// ║            {/* body */}                                          ║
// ║          </div>                                                  ║
// ║        </section>                                                ║
// ║    Section padding (100px / 64px mobile) is automatic.           ║
// ║                                                                  ║
// ║ 3. HIERARCHY                                                     ║
// ║    eyebrow = short tag ("01", "Origin", "Free at Launch")        ║
// ║    h2      = section NAME ("The Problem", "How We Built It")     ║
// ║    lede    = descriptive sentence under the h2                   ║
// ║    body    = paragraphs / cards / stats / etc.                   ║
// ║    Same shape on the home page — keeps the rhythm consistent.    ║
// ║                                                                  ║
// ║ 4. TYPOGRAPHY                                                    ║
// ║    Display: Sora 800/700 (h1, h2)                                ║
// ║    Body:    Outfit 400/500 (p, lede)                             ║
// ║    Eyebrow: Outfit 12px 700 uppercase, orange                    ║
// ║    NEVER use DM Serif Display italic (legacy editorial)          ║
// ║    NEVER redefine h1/h2/h3 sizing in page CSS —                  ║
// ║    inherit from MLpNavStyles.                                    ║
// ║                                                                  ║
// ║ 5. ALIGNMENT                                                     ║
// ║    Centered: sec-head, CTAs, stat rows, image grids              ║
// ║    Left-aligned: long-form prose, list cards, timeline rows      ║
// ║    For prose, wrap in a max-width container (~660px) with        ║
// ║    text-align: left.                                             ║
// ║                                                                  ║
// ║ 6. COMPONENTS (use, don't reimplement)                           ║
// ║    Email capture:  <MLpEmailForm variant="final" />              ║
// ║    Live counter:   <MLpHeroCounter framing="..." tagline="..."/> ║
// ║    Countdown:      <MLpCountdownBadge />                         ║
// ║    All three ship their own CSS — they render identically on     ║
// ║    every page.                                                   ║
// ║                                                                  ║
// ║ 7. FINAL CTA BLOCK                                               ║
// ║    Reuse the home page shape exactly:                            ║
// ║        <section>                                                 ║
// ║          <div className="final-cta-simple">                      ║
// ║            <h2 className="final-h2-simple">…</h2>                ║
// ║            <p className="final-lede">…</p>                       ║
// ║            <MLpEmailForm variant="final" />                      ║
// ║            <p className="fine final-fine-simple">…</p>           ║
// ║            <MLpHeroCounter framing="claimed" tagline="…" />      ║
// ║          </div>                                                  ║
// ║        </section>                                                ║
// ║                                                                  ║
// ║ 8. MOBILE                                                        ║
// ║    Section padding auto-shrinks at 720px. Forms auto-stack at    ║
// ║    560px. Footer grid auto-collapses 4 → 2 → 1 cols.             ║
// ║    No per-page mobile CSS needed for any of these.               ║
// ║    Only add @media rules for genuinely page-specific patterns    ║
// ║    (custom grids, hero-only treatments, etc.).                   ║
// ║                                                                  ║
// ║ 9. DON'T                                                         ║
// ║    ✗ Add <hr className="rule" /> on long-form editorial pages    ║
// ║    ✗ Use inline text-align: center on body paragraphs            ║
// ║    ✗ Create ad-hoc .xx-h1 / .xx-eyebrow classes — use shared     ║
// ║    ✗ Set font-size on h1/h2/h3 in page CSS                       ║
// ║    ✗ Override .lp-nav, .lp-footer, or .email-form styling        ║
// ║                                                                  ║
// ╚══════════════════════════════════════════════════════════════════╝

import type { ReactNode } from 'react'
import MLpNav from './MLpNav'
import MLpStickyCTA from './MLpStickyCTA'
import MLpFooter from './MLpFooter'
import { MLP_NAV_STYLES } from './MLpNavStyles'

export default function MLpSubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="lp-root">
      <style dangerouslySetInnerHTML={{ __html: MLP_NAV_STYLES }} />
      <MLpNav />
      {children}
      <MLpFooter />
      <MLpStickyCTA />
    </div>
  )
}
