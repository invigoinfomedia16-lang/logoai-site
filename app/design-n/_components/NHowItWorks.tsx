// How It Works — horizontal 4-step stepper + privacy strip bar. Copy
// from the LOGOAI landing-page doc, section 4.

import { Fragment } from 'react'

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
    body: 'In under 60 seconds, our AI turns your brand details into 10 original logos — with the right style, colors, and fonts to match your brand.',
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
            Get your professional logo in 4 easy steps — under 60 seconds
          </h2>
          <p className="m-sub">
            No design skills needed. Just tell us about your brand — our AI handles the rest.
          </p>
        </div>

        {/* 4-step grid */}
        {/* Horizontal 4-step stepper — number circles + content stacked
            in a row, connected by a thin horizontal line. Stacks vertically
            on mobile. Breaks the cards-grid rhythm: this is a process, not
            a comparison. */}
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-0 w-full">
          {STEPS.map((s, i) => {
            const isLast = i === STEPS.length - 1
            return (
              <Fragment key={s.n}>
                <div className="flex flex-col items-center text-center md:flex-1 md:px-3">
                  <StepNumber n={s.n} />
                  <h3
                    className="m-display mt-5"
                    style={{ color: 'var(--m-ink)', fontWeight: 600, fontSize: 18, lineHeight: '24px' }}
                  >
                    {s.title}
                  </h3>
                  <p className="m-body-sm mt-2" style={{ maxWidth: 240 }}>{s.body}</p>
                </div>
                {/* Connector line — md+ only, hidden on last. Vertically
                    centered with the step circle (circle is 36px → 18px). */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block"
                    style={{
                      flex: '0 0 24px',
                      height: 1,
                      background: 'var(--m-border)',
                      marginTop: 18,
                    }}
                  />
                )}
              </Fragment>
            )
          })}
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
          <span className="flex items-center gap-1.5">
            <CheckInline />
            <span className="m-sans" style={{ fontSize: 14, color: 'var(--m-text-muted)' }}>
              Never shared. Never sold. Only used to make your logos.
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
