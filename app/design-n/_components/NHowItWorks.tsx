// How It Works — 4-step grid + privacy strip bar. Copy from the LOGOAI
// landing-page doc, section 4.

function StepNumber({ n }: { n: number }) {
  return (
    <div
      className="flex w-9 h-9 items-center justify-center rounded-full shrink-0"
      style={{ background: 'var(--m-brand)' }}
    >
      <span className="m-sans" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16 }}>{n}</span>
    </div>
  )
}

function CheckInline() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 7.25L5.5 10.25L11.5 3.75" style={{ stroke: 'var(--n-check, #00A63E)' }} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const STEPS = [
  {
    n: 1,
    title: 'Tell us about your brand',
    body: "Just enter your business name and a short description of what you do. That's all we need to get started.",
  },
  {
    n: 2,
    title: 'Watch the AI design it',
    body: "In under 60 seconds, our AI creates original logos — picking the right style, colors, and fonts to match your brand. You don't have to figure anything out.",
  },
  {
    n: 3,
    title: 'See your logos for free',
    body: 'Browse your logos and see them on real things like business cards, websites, and signage — free.',
  },
  {
    n: 4,
    title: 'Pick your favorite and download',
    body: 'Found the one? Pay one simple price and download your logo, ready to use.',
  },
]

const PRIVACY_POINTS = ['Never shared with anyone', 'Never sold', 'Only used to make your logos']

export default function NHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 md:gap-16 items-center w-full max-w-[1280px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>How It Works</p>
          <h2 className="m-h2">
            Get your professional logo in 4 easy steps — under 60 seconds
          </h2>
          <p className="m-sub">
            Free to generate. Free to preview. Pay only if you love it.
          </p>
        </div>

        {/* 4-step grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="m-card-hover flex flex-col gap-4 p-6 h-full"
              style={{
                background: 'var(--m-surface)',
                borderRadius: '20px',
                boxShadow: '0px 1px 3px 0px var(--m-brand-soft), 0px 1px 2px -1px var(--m-brand-soft)',
              }}
            >
              <StepNumber n={s.n} />
              <h3
                className="m-display"
                style={{ color: 'var(--m-ink)', fontWeight: 600, fontSize: 18, lineHeight: '24px' }}
              >
                {s.title}
              </h3>
              <p className="m-body-sm">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Privacy strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full px-6 py-5"
          style={{
            background: 'var(--m-brand-bg)',
            border: '1px solid var(--m-brand-soft)',
            borderRadius: 'var(--m-radius-xl)',
          }}
        >
          <span className="m-sans" style={{ fontWeight: 700, fontSize: 15, color: 'var(--m-ink)' }}>
            Your brand details stay private.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {PRIVACY_POINTS.map((pt) => (
              <span key={pt} className="flex items-center gap-1.5">
                <CheckInline />
                <span className="m-sans" style={{ fontSize: 14, color: 'var(--m-text-muted)' }}>{pt}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
