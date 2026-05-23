// Risk-Free — 2x2 check-item grid + centered CTA. Copy from the LOGOAI
// landing-page doc, section 2.

import Link from 'next/link'

function CheckBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" style={{ fill: 'var(--n-check, #00A63E)' }} />
      <path d="M6 10.25L8.75 13L14 7" style={{ stroke: 'var(--m-on-brand, #FFFFFF)' }} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

const ITEMS = [
  {
    title: 'Start without commitment',
    body: "No payment to start. Just tell us about your brand and we'll generate your logos.",
  },
  {
    title: 'Preview before you pay',
    body: 'See a free preview of your logos before you decide.',
  },
  {
    title: "Don't love them? Don't pay.",
    body: "If they're not what you wanted, just walk away. No charge, no questions.",
  },
  {
    title: "Even after paying, you're covered",
    body: "If you're not 100% happy, we'll redo your logo or refund you in full.",
  },
]

export default function NRiskFree() {
  return (
    <section
      id="risk-free"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 items-center w-full max-w-[1100px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Risk-Free</p>
          <h2 className="m-h2">Pay only if you love your logo</h2>
          <p className="m-sub max-w-[680px]">
            We&apos;re confident you&apos;ll love yours. If you don&apos;t, you don&apos;t pay.
          </p>
        </div>

        {/* 2x2 check grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="m-card-hover flex items-start gap-4 p-6"
              style={{
                background: 'var(--m-surface-alt)',
                borderRadius: 'var(--m-radius-xl)',
              }}
            >
              <span className="mt-0.5 shrink-0"><CheckBadge /></span>
              <div className="flex flex-col gap-1">
                <h3
                  className="m-display"
                  style={{ fontWeight: 600, fontSize: 18, lineHeight: '24px', color: 'var(--m-ink)' }}
                >
                  {item.title}
                </h3>
                <p className="m-body-sm">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/design-n/start"
          className="m-cta-lg m-cta-btn inline-flex items-center justify-center gap-3"
          style={{
            color: 'var(--m-on-brand, #FFFFFF)',
            borderRadius: 'var(--m-radius-md)',
            padding: '16px 28px',
            boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
          }}
        >
          <span>Generate My Free Logos</span>
          <ArrowRight />
        </Link>
      </div>
    </section>
  )
}
