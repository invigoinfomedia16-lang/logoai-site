'use client'

import Link from 'next/link'

// Final CTA — Design N. A plain, high-focus brand-colour band: centred
// heading + subline + a white button + microcopy. No imagery — the bottom
// CTA is purely for conversion focus. The band uses --m-brand so it
// follows the landing-page colour toggle.

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M10 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function NFinalCTA() {
  return (
    <section
      data-n-bottom-cta
      className="w-full py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px]"
      style={{ background: 'var(--n-cta-section-bg, var(--m-surface))' }}
    >
      <div
        className="max-w-[1280px] mx-auto flex flex-col items-center text-center"
        style={{
          // Themeable — most toggles render a filled brand band; the
          // Character.AI toggle clears it (transparent) so the CTA reads as
          // a plain tinted section, the colour coming from --n-cta-section-bg.
          background: 'var(--n-cta-band-bg, var(--m-brand))',
          border: 'var(--n-cta-band-border, none)',
          boxShadow: 'var(--n-cta-band-shadow, none)',
          borderRadius: 20,
          padding: 'var(--n-cta-band-pad, clamp(48px, 8vw, 104px) clamp(24px, 6vw, 80px))',
        }}
      >
        <div className="flex flex-col items-center" style={{ maxWidth: 780 }}>
          <p className="m-eyebrow" style={{ color: 'var(--n-cta-eyebrow, var(--m-brand))' }}>Get Started</p>
          {/* Heading uses .m-h1 — same size as the landing-page hero. */}
          <h2 className="m-h1 mt-3" style={{ color: 'var(--n-cta-fg, #FFFFFF)', whiteSpace: 'normal' }}>
            Your professional logo is 60 seconds away
          </h2>
          <p className="m-sub mt-4" style={{ color: 'var(--n-cta-fg-sub, var(--m-text-muted))' }}>
            Worst case, you lose 60 seconds. Best case, you find a logo you love.
          </p>
          <Link
            href="/design-n/start"
            className="m-cta-lg inline-flex items-center justify-center gap-3 mt-8"
            style={{
              background: 'var(--n-cta-btn-bg, #FFFFFF)',
              color: 'var(--n-cta-btn-fg, var(--m-brand))',
              borderRadius: 'var(--m-radius-md)',
              padding: '16px 32px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              transition: 'background 0.18s ease',
            }}
            // Same hover as every other CTA (.m-cta-btn): darken the
            // background. Done in JS because the inline background can't be
            // overridden by a stylesheet :hover rule.
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--n-cta-btn-bg-hover, #EBEBEB)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--n-cta-btn-bg, #FFFFFF)'
            }}
          >
            <span>Generate My Free Logos</span>
            <ArrowRight />
          </Link>
          <p
            className="m-body-sm mt-4"
            style={{ fontSize: 13, color: 'var(--n-cta-fg-soft, rgba(255,255,255,0.72))' }}
          >
            No credit card required to preview your logos
          </p>
        </div>
      </div>
    </section>
  )
}
