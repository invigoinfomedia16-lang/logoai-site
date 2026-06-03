'use client'

// MLpHeroCounter — three-part live momentum block used in both the
// hero and the final CTA:
//
//   1. Counter line:        "1,229,889 of 2,000,000 free logos remaining"
//   2. Progress bar:        16.5% filled from "330,651 / 2,000,000 claimed"
//   3. Tagline (variable):  "Claimed every few seconds. Don't miss yours."
//                       or  "Claimed every few seconds. Once they're gone…"
//
// All three pull from the same useLiveCounter source-of-truth so they
// stay in sync. The tagline string is passed in as a prop so the same
// block can be reused in different positions on the page.

import { useLiveCounter } from './useLiveCounter'

const TOTAL_LOGOS = 2_000_000

type Framing = 'claimed' | 'remaining'

export default function MLpHeroCounter({
  tagline,
  framing = 'claimed',
}: {
  tagline: string
  framing?: Framing
}) {
  const { claimed, remaining } = useLiveCounter()
  const pct = Math.min(100, Math.max(0, (claimed / TOTAL_LOGOS) * 100))

  // Bar always visualizes CLAIMED (fills from left). The counter
  // text above can be either claimed or remaining depending on the
  // call site's framing prop. Hero uses claimed; Final CTA uses
  // remaining (so its "Claimed every few seconds…" tagline doesn't
  // duplicate the word in the counter text).
  const count = framing === 'remaining' ? remaining : claimed
  const label = framing === 'remaining' ? 'free logos remaining' : 'free logos claimed'

  return (
    <div className="hero-counter-block">
      <style dangerouslySetInnerHTML={{ __html: COUNTER_STYLES }} />
      <p className="hero-counter-main">
        <strong>{count.toLocaleString('en-US')}</strong> of 2,000,000 {label}
      </p>
      <div
        className="hero-progress"
        role="progressbar"
        aria-label={`${pct.toFixed(1)}% of free logos claimed`}
      >
        <div className="hero-progress-fill" style={{ width: `${pct.toFixed(2)}%` }} />
      </div>
      <p className="hero-counter-tagline">{tagline}</p>
    </div>
  )
}

// Self-contained styling so this component renders the same on
// /prelaunch and every subpage (main page used to provide these
// styles inline; subpages now get them from the component itself).
const COUNTER_STYLES = `
  .hero-counter-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 360px;
    margin: 0 auto;
  }
  .hero-counter-main {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.60);
    line-height: 1.4;
    margin: 0;
    text-align: center;
  }
  .hero-counter-main strong {
    font-family: 'Sora', sans-serif;
    color: #FF5C2E;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .hero-progress {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: rgba(232, 232, 230, 0.10);
    overflow: hidden;
    margin: 4px 0 2px;
  }
  .hero-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #E8420D, #FF5C2E);
    border-radius: 999px;
    transition: width 0.4s ease;
  }
  .hero-counter-tagline {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.45);
    margin: 4px 0 0;
    text-align: center;
    letter-spacing: 0.2px;
  }
`
