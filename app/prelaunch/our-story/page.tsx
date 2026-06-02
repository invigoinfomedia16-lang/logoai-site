// Our Story — placeholder during prelaunch. Will be redesigned in the
// new MLp visual language; until then it shares the same shell as the
// About placeholder. The previous experimental Our Story port lived
// in its own dark-theme design that didn't match the new MLp system,
// so per "no old design anywhere" it's been retired pending redesign.

import type { Metadata } from 'next'
import Link from 'next/link'
import MLpSubpageShell from '../_components/MLpSubpageShell'

export const metadata: Metadata = {
  title: 'Our Story — LOGO.AI',
  description:
    'Thirty years of building things. One problem that never got fixed. So we fixed it. (Our full story is coming soon.)',
}

export default function OurStoryPage() {
  return (
    <MLpSubpageShell>
      <style dangerouslySetInnerHTML={{ __html: PLACEHOLDER_STYLES }} />
      <main className="lp-placeholder">
        <span className="lp-placeholder-eyebrow">Coming Soon</span>
        <h1 className="lp-placeholder-h1">
          Our <span className="muted">Story</span>
        </h1>
        <p className="lp-placeholder-lede">
          We&rsquo;re still writing this page. In the meantime, head back to the home page and join the waitlist &mdash; we&rsquo;ll email you the moment we launch.
        </p>
        <Link href="/prelaunch" className="lp-placeholder-back">
          &larr; Back to home
        </Link>
      </main>
    </MLpSubpageShell>
  )
}

const PLACEHOLDER_STYLES = `
  .lp-placeholder {
    max-width: 720px;
    margin: 0 auto;
    padding: clamp(80px, 12vw, 160px) clamp(20px, 4vw, 48px) clamp(120px, 14vw, 200px);
    text-align: center;
  }
  .lp-placeholder-eyebrow {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FF5C2E;
    margin-bottom: 24px;
  }
  .lp-placeholder-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(40px, 7.5vw, 72px);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: #f4f4f6;
    margin: 0 0 28px;
  }
  .lp-placeholder-h1 .muted { color: rgba(244, 244, 246, 0.42); }
  .lp-placeholder-lede {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(16px, 1.8vw, 18px);
    line-height: 1.6;
    color: #b8b8c4;
    max-width: 52ch;
    margin: 0 auto 40px;
  }
  .lp-placeholder-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #FF5C2E;
    text-decoration: none;
    padding: 12px 20px;
    border: 1px solid rgba(255, 92, 46, 0.35);
    border-radius: 999px;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .lp-placeholder-back:hover {
    background: rgba(255, 92, 46, 0.08);
    border-color: #FF5C2E;
    color: #ffffff;
  }
`
