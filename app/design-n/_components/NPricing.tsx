// Pricing — single centered $49 one-time card. Copy from the LOGOAI
// landing-page doc, section 9.

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#00A63E" />
      <path d="M5.5 9.25L8 11.75L12.5 6.25" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const FEATURES = [
  'Your logo in every format you need (PNG, SVG, PDF, EPS)',
  'Transparent background — works on any color',
  'Re-download anytime',
  'Full commercial license',
  '100% satisfaction guarantee',
]

export default function NPricing() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-brand-bg)' }}
    >
      <div className="flex flex-col gap-12 items-center w-full max-w-[760px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Pricing</p>
          <h2 className="m-h2">Professional logos at an unbelievable price.</h2>
          <p className="m-sub max-w-[640px]">
            Designers charge $1,500+ for the same quality. We charge a fraction of that. Free to
            generate and preview, pay only if you love it.
          </p>
        </div>

        {/* Pricing card */}
        <div
          className="w-full max-w-[460px] flex flex-col items-center p-8 md:p-10"
          style={{
            background: 'var(--m-surface)',
            border: '2px solid var(--m-brand)',
            borderRadius: 'var(--m-radius-xl)',
            boxShadow: '0 12px 32px rgba(217,119,87,0.14), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span
              className="m-display"
              style={{ fontWeight: 700, fontSize: 64, lineHeight: '64px', color: 'var(--m-ink)' }}
            >
              $49
            </span>
          </div>
          <p
            className="m-sans mt-1"
            style={{ fontSize: 15, color: 'var(--m-text-soft)', fontWeight: 600 }}
          >
            One-time payment
          </p>

          {/* Divider */}
          <div className="w-full my-7" style={{ height: 1, background: 'var(--m-border)' }} />

          {/* What you get */}
          <p
            className="m-sans self-start mb-4"
            style={{ fontWeight: 700, fontSize: 14, color: 'var(--m-ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
          >
            What you get
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
          <a
            href="/design-n/start"
            className="m-cta-lg m-cta-btn inline-flex items-center justify-center gap-3 w-full mt-8"
            style={{
              color: '#FFFFFF',
              borderRadius: 'var(--m-radius-md)',
              padding: '16px 24px',
              boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
            }}
          >
            <span>Generate My Free Logos</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
