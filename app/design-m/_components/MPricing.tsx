// Pricing — uses HEADSHOT's dark card pricing aesthetic, adapted to
// LOGO.AI's single-tier model: $49 one-time for the logo + every file
// format you need.

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#00C950" />
      <path d="M5 8.25L7.25 10.5L11 5.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const FEATURES = [
  'Your logo in every format you need (PNG, SVG, PDF, EPS)',
  'Transparent background — works on any colour',
  'Re-download anytime',
  'Full commercial license',
  '100% satisfaction guarantee',
]

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0">
        <CheckIcon />
      </span>
      <span className="m-sans" style={{ color: 'var(--m-text-on-dark)', fontSize: 14, lineHeight: '22px' }}>
        {children}
      </span>
    </li>
  )
}

export default function MPricing() {
  return (
    <section
      id="pricing"
      className="w-full pt-5 px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px]"
    >
      <div
        className="relative mx-auto w-full max-w-[1536px] py-16 md:py-24 px-5 sm:px-10 md:px-16"
        style={{
          background: '#0A0A0A',
          borderRadius: 'var(--m-radius-xl)',
        }}
      >
        {/* Promo badge floats above */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5">
          <span
            className="m-sans inline-flex items-center px-4 py-2 whitespace-nowrap"
            style={{
              background: '#FFFFFF',
              color: 'var(--m-ink)',
              borderRadius: 'var(--m-radius-pill)',
              fontWeight: 600,
              fontSize: 14,
              lineHeight: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            }}
          >
            🎁 Generate and preview free — pay only when you love it
          </span>
        </div>

        {/* Heading block */}
        <div className="mx-auto max-w-[768px] text-center mb-12 md:mb-16">
          <h2 className="m-h2" style={{ color: '#FFFFFF', fontSize: 48, lineHeight: '56px' }}>
            Professional logos at an unbelievable price.
          </h2>
          <p className="m-sub mt-4" style={{ color: 'var(--m-text-on-dark)', fontSize: 18, lineHeight: '28px' }}>
            One simple price. Every format you need. No subscriptions, no add-ons, no surprises — just the logo you love, ready to launch.
          </p>
        </div>

        {/* Single-tier card */}
        <div className="mx-auto max-w-[520px]">
          <article
            className="relative flex flex-col p-8"
            style={{
              background: '#1C1C1C',
              border: '2px solid var(--m-brand)',
              borderRadius: 'var(--m-radius-xl)',
              boxShadow: '0 0 0 6px rgba(217,119,87,0.12)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="m-display" style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 22, lineHeight: '28px' }}>
                Your Logo
              </h3>
              <span
                className="m-sans"
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--m-brand)',
                }}
              >
                One-time
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-5">
              <span className="m-display" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 60, lineHeight: '60px' }}>
                $49
              </span>
              <span className="m-sans" style={{ color: 'var(--m-text-on-dark-muted)', fontSize: 14 }}>
                one-time, yours forever
              </span>
            </div>
            <ul className="flex flex-col gap-4 mt-8">
              {FEATURES.map((f) => (
                <FeatureRow key={f}>{f}</FeatureRow>
              ))}
            </ul>
            <a
              href="#hero-cta"
              className="m-sans inline-flex items-center justify-center mt-8 px-5 py-3"
              style={{
                background: 'linear-gradient(90deg, #D97757 0%, #E89A7E 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--m-radius-md)',
                fontWeight: 600,
                fontSize: 15,
                lineHeight: '24px',
              }}
            >
              Design my logo
            </a>
          </article>
        </div>

        <p
          className="m-sans text-center mt-12"
          style={{ color: 'var(--m-text-on-dark-muted)', fontSize: 14, lineHeight: '22px' }}
        >
          No credit card to preview. Only pay if you love what you see.
        </p>
      </div>
    </section>
  )
}
