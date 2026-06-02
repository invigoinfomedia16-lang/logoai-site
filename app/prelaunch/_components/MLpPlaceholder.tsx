// MLpPlaceholder — the "coming soon" inner content for every prelaunch
// subpage that hasn't been redesigned in the new MLp visual language
// yet. Wrap in <MLpSubpageShell> to get the surrounding nav and sticky
// CTA. Each consumer just passes a title (rendered as the h1) and an
// optional muted suffix word that picks up the "muted" wash. Keeps
// every placeholder visually identical so we can lift them in one
// pass once real content lands.

import Link from 'next/link'

export default function MLpPlaceholder({
  title,
  mutedSuffix,
}: {
  title: string
  mutedSuffix?: string
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <main className="lp-placeholder">
        <span className="lp-placeholder-eyebrow">Coming Soon</span>
        <h1 className="lp-placeholder-h1">
          {title}
          {mutedSuffix ? (
            <>
              {' '}
              <span className="muted">{mutedSuffix}</span>
            </>
          ) : null}
        </h1>
        <p className="lp-placeholder-lede">
          We&rsquo;re still building this page. In the meantime, head back to the home page and join the waitlist &mdash; we&rsquo;ll email you the moment we launch.
        </p>
        <Link href="/prelaunch" className="lp-placeholder-back">
          &larr; Back to home
        </Link>
      </main>
    </>
  )
}

const STYLES = `
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
