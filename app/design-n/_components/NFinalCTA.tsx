'use client'

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
      style={{ background: 'var(--m-surface)' }}
    >
      <div
        className="max-w-[1280px] mx-auto flex flex-col items-center text-center"
        style={{
          background: 'var(--m-brand)',
          borderRadius: 20,
          padding: 'clamp(48px, 8vw, 104px) clamp(24px, 6vw, 80px)',
        }}
      >
        <div className="flex flex-col items-center" style={{ maxWidth: 620 }}>
          <h2 className="m-h2" style={{ color: '#FFFFFF', whiteSpace: 'normal' }}>
            Your professional logo is 60 seconds away
          </h2>
          <p className="m-sub mt-4" style={{ color: 'rgba(255,255,255,0.86)' }}>
            The worst that can happen? You spend a minute and walk away.
          </p>
          <a
            href="/design-n/start"
            className="m-cta-lg inline-flex items-center justify-center gap-3 mt-8"
            style={{
              background: '#FFFFFF',
              color: 'var(--m-brand)',
              borderRadius: 'var(--m-radius-md)',
              padding: '16px 32px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.24)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)'
            }}
          >
            <span>Generate My Free Logos</span>
            <ArrowRight />
          </a>
          <p
            className="m-body-sm mt-4"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}
          >
            No payment needed to generate and preview your logos • Pay only to download
          </p>
        </div>
      </div>
    </section>
  )
}
