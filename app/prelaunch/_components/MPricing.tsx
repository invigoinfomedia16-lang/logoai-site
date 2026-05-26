// MPricing — v11 prelaunch "Free at launch" pricing card. Strikethrough
// $49 → Free for the first 2,000,000 users. Same visual chrome as the
// launch site's NPricing card (2px brand border, big price, feature
// checklist), with the prelaunch "What you get — free" framing.

import Link from 'next/link'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" style={{ fill: 'var(--n-check, #00A63E)' }} />
      <path d="M5.5 9.25L8 11.75L12.5 6.25" style={{ stroke: 'var(--m-on-brand, #FFFFFF)' }} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const FEATURES = [
  'Your logo in every format you need (PNG, SVG, PDF, EPS)',
  'Transparent background — works on any background color',
  'Brand Guidelines PDF — how to use your logo, its exact colors, and matching fonts',
  'Full commercial license — use it anywhere you want',
  'Yours forever — re-download as many times as you want',
]

export default function MPricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--n-pricing-section-bg, var(--m-brand-bg))' }}
    >
      <div className="flex flex-col gap-12 items-center w-full max-w-[760px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Pricing</p>
          <h2 className="m-h2">Designer-quality logos — free at launch</h2>
          <p className="m-sub max-w-[640px]">
            A freelance designer costs $1,500+. Other AI tools charge $20–$96/year. We&apos;re giving ours away free to the first 2,000,000 users.
          </p>
        </div>

        {/* Pricing card */}
        <div
          className="w-full max-w-[460px] flex flex-col items-center p-8 md:p-10"
          style={{
            background: 'var(--m-surface)',
            border: '2px solid var(--m-brand)',
            borderRadius: 'var(--m-radius-xl)',
            boxShadow:
              'var(--n-pricing-shadow, 0 12px 32px rgba(217,119,87,0.14), 0 2px 8px rgba(0,0,0,0.06))',
          }}
        >
          {/* Price — $49 strike-through, Free in brand */}
          <div className="flex items-baseline gap-3">
            <span
              className="m-display"
              style={{
                fontWeight: 600,
                fontSize: 28,
                lineHeight: '32px',
                color: 'var(--m-text-muted)',
                textDecoration: 'line-through',
                textDecorationThickness: '2px',
              }}
            >
              $49
            </span>
            <span
              className="m-display"
              style={{
                fontWeight: 700,
                fontSize: 64,
                lineHeight: '64px',
                color: 'var(--m-brand)',
              }}
            >
              Free
            </span>
          </div>
          <div
            className="m-sans mt-2 flex flex-col items-center gap-1 text-center"
            style={{ fontSize: 15, color: 'var(--m-text-muted)', fontWeight: 600 }}
          >
            <span>Free for the first 2,000,000 users — no subscription, no credit card, no catch.</span>
            <span style={{ fontWeight: 500 }}>100% yours to keep forever.</span>
          </div>

          {/* Divider */}
          <div className="w-full my-7" style={{ height: 1, background: 'var(--n-pricing-divider, var(--m-border))' }} />

          {/* What you get */}
          <p
            className="m-sans self-start mb-4"
            style={{ fontWeight: 700, fontSize: 14, color: 'var(--m-ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            What you get — free
          </p>
          <ul className="flex flex-col gap-3.5 w-full">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0"><CheckIcon /></span>
                <span className="m-sans" style={{ fontSize: 15, lineHeight: '22px', color: 'var(--m-text)' }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="#hero-cta"
            className="m-cta-lg m-cta-btn inline-flex items-center justify-center gap-3 w-full mt-8"
            style={{
              color: 'var(--m-on-brand, #FFFFFF)',
              borderRadius: 'var(--m-radius-md)',
              padding: '16px 24px',
              boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
            }}
          >
            <span>Get My Free Logo</span>
            <ArrowRight />
          </Link>
          <p
            className="m-sans mt-3 text-center"
            style={{ fontSize: 13, color: 'var(--m-text-muted)' }}
          >
            Free for the first 2,000,000 users. No credit card, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
