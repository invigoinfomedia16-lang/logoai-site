// How It Works — 4-step grid (outline-only cards) + privacy strip bar.
// Copy from the LOGOAI landing-page doc, section 4.

function StepNumber({ n }: { n: number }) {
  return (
    <div
      className="flex w-9 h-9 items-center justify-center rounded-full shrink-0"
      style={{ background: 'var(--m-brand)' }}
    >
      <span className="m-sans" style={{ color: 'var(--m-on-brand, #FFFFFF)', fontWeight: 700, fontSize: 16 }}>{n}</span>
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
    body: "Just enter your business name and a few words about what it does. That's it.",
  },
  {
    n: 2,
    title: 'Our AI does the work',
    body: 'In seconds, our AI turns your brand details into 10 original logos — with the right style, colors, and fonts to match your brand.',
  },
  {
    n: 3,
    title: 'Preview your logos for free',
    body: "See a free preview of your logos. Don't love them? Generate again, free.",
  },
  {
    n: 4,
    title: 'Pick your favorite and download',
    body: "Found the one? Pay one simple price and download your logo, ready to use. Don't love any? Walk away — no charge.",
  },
]

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
            Your professional logo in 60 seconds
          </h2>
          <p className="m-sub">
            No design skills needed. All it takes is a few words about your brand — our AI handles the rest.
          </p>
        </div>

        {/* 4-step grid — outline-only cards: m-card-hover gives the 1px
            border, background matches the section so cards read as
            outlined (no filled chrome), small brand-soft shadow lifts
            them just enough. This is the original treatment from before
            the various restyles. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="m-card-hover flex flex-col gap-4 p-6 h-full"
              style={{
                background: 'var(--n-step-card-bg, var(--m-surface))',
                borderRadius: '20px',
                boxShadow: 'var(--n-step-card-shadow, 0px 1px 3px 0px var(--m-brand-soft), 0px 1px 2px -1px var(--m-brand-soft))',
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

        {/* Privacy strip — single em-dash line per the LOGOAI landing-
            page doc, section 4 ("Your brand details stay private — never
            shared, never sold, only used to make your logos."). Centred,
            shrunk to fit. */}
        <div
          className="flex items-center justify-center gap-2 mx-auto px-6 py-4 text-center"
          style={{
            background: 'var(--m-brand-bg)',
            border: '1px solid var(--m-brand-soft)',
            borderRadius: 'var(--m-radius-xl)',
            maxWidth: 'fit-content',
          }}
        >
          <CheckInline />
          <p
            className="m-sans"
            style={{ fontSize: 15, lineHeight: '22px', color: 'var(--m-ink)' }}
          >
            <span style={{ fontWeight: 700 }}>Your brand details stay private</span>
            {' '}— never shared, never sold, only used to make your logos.
          </p>
        </div>
      </div>
    </section>
  )
}
