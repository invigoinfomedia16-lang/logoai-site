'use client'

// MHero — prelaunch hero modeled on /design-l. Free-logo claim framing
// with a real-time logos-remaining counter and days-until-launch
// countdown, replacing launch's "Rated 4.9/5" eyebrow + paid CTA.
// Visual chrome (marquee, layout, padding) mirrors NHero so the hero
// reads identically against Purple Charcoal.

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { useLiveCounter } from './useLiveCounter'

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.16669 10H15.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const HERO_LOGOS = [
  '/images/Logos/restaurant-logo-1.webp',
  '/images/Logos/coffee-shop-logo-1.webp',
  '/images/Logos/bakery-logo-1.webp',
  '/images/Logos/food-truck-logo-1.webp',
  '/images/Logos/barbershop-logo-1.webp',
  '/images/Logos/hair-salon-logo-1.webp',
  '/images/Logos/nail-studio-logo-1.webp',
  '/images/Logos/boutique-logo-1.webp',
  '/images/Logos/clothing-brand-logo-1.webp',
  '/images/Logos/gym-logo-1.webp',
  '/images/Logos/cleaning-service-logo-1.webp',
  '/images/Logos/tattoo-studio-logo-1.webp',
]

function formatNumber(n: number) {
  return n.toLocaleString('en-US')
}

export default function MHero() {
  // Live counter — shared with MFinalCTA via useLiveCounter so both
  // sections always display the same value (1s tick, same source).
  const { remaining, days } = useLiveCounter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    // Placeholder — wire to your email-capture endpoint when ready.
    setSubmitted(true)
  }

  const marqueeTiles = [...HERO_LOGOS, ...HERO_LOGOS]

  return (
    <section
      data-n-hero
      className="w-full pt-2 pb-16 md:pb-24"
      style={{
        background:
          'var(--m-hero-tint, linear-gradient(to bottom, var(--m-brand-bg) 0%, color-mix(in srgb, var(--m-brand-bg) 50%, var(--m-surface)) 58%, var(--m-surface) 100%))',
      }}
    >
      <div className="px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px]">
        <div className="mx-auto w-full max-w-[1536px] px-2 sm:px-4 pt-12 md:pt-16 pb-10">
          <p
            className="m-eyebrow text-center"
            style={{ color: 'var(--m-brand)' }}
          >
            World&apos;s Best AI Logo Generator
          </p>

          <h1 className="m-h1 mx-auto mt-4 max-w-[896px] text-center">
            Get Your Free Logo in Seconds
          </h1>

          <p className="m-sub mx-auto mt-6 max-w-[768px] text-center">
            Free logo for the first{' '}
            <span style={{ fontWeight: 700, color: 'var(--n-hero-highlight, var(--m-brand))' }}>
              2,000,000
            </span>
            {' '}users. Join now to claim yours at launch.
          </p>

          {/* Email signup — replaces the launch site's "Generate My Free
              Logos" Link with a waitlist email-capture pair (input + CTA
              button), plus a success state. Mirrors the design-l hero. */}
          <div id="hero-cta" className="mt-8 flex flex-col items-center gap-3 w-full max-w-[680px] mx-auto">
            {submitted ? (
              <p
                className="m-display"
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  lineHeight: '30px',
                  color: 'var(--m-ink)',
                  textAlign: 'center',
                }}
              >
                You&apos;re on the list! We&apos;ll email you at launch.
              </p>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
                  aria-label="Get notified at launch"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="m-sans flex-1"
                    style={{
                      background: 'var(--m-surface-alt)',
                      border: '1px solid var(--m-border)',
                      borderRadius: 'var(--m-radius-md)',
                      color: 'var(--m-ink)',
                      fontSize: 16,
                      lineHeight: '24px',
                      padding: '16px 20px',
                      outline: 'none',
                      transition: 'border-color 0.15s ease',
                      minWidth: 0,
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--m-brand)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--m-border)' }}
                  />
                  <button
                    type="submit"
                    className="m-cta-lg m-cta-btn inline-flex items-center justify-center gap-3 flex-shrink-0"
                    style={{
                      color: 'var(--m-on-brand, #FFFFFF)',
                      borderRadius: 'var(--m-radius-md)',
                      padding: '16px 28px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
                    }}
                  >
                    <span>Get My Free Logo</span>
                    <ArrowRight />
                  </button>
                </form>
                <p
                  className="m-body-sm text-center"
                  style={{ fontSize: 13, lineHeight: '20px', color: 'var(--m-text-muted)' }}
                >
                  No spam. No credit card. Just a free logo.
                </p>
                <p
                  className="m-body-sm text-center"
                  style={{ fontSize: 13, lineHeight: '20px', color: 'var(--m-text-muted)' }}
                >
                  We&apos;ll email you the moment we go live so you can generate your free logo.
                </p>
              </>
            )}
          </div>

          {/* Counter rows — two separate lines per v11 doc, no separator.
              Both values recalculated on hydration so they reflect the
              current live state from data/index.ts. */}
          <div className="mt-8 flex flex-col items-center gap-2 text-center">
            <p className="m-body" style={{ fontSize: 15, lineHeight: '22px' }}>
              <span style={{ fontWeight: 700, color: 'var(--n-hero-highlight, var(--m-brand))' }}>
                {formatNumber(remaining)}
              </span>
              {' '}free logos remaining of 2,000,000
            </p>
            <p className="m-body" style={{ fontSize: 15, lineHeight: '22px' }}>
              <span style={{ fontWeight: 700, color: 'var(--n-hero-highlight, var(--m-brand))' }}>
                {days}
              </span>
              {' '}{days === 1 ? 'day' : 'days'} until launch
            </p>
          </div>
        </div>
      </div>

      <div data-n-hero-carousel className="m-marquee-row relative w-full overflow-hidden py-6 md:py-8" aria-label="Logo examples" role="region">
        <div className="m-marquee-track">
          {marqueeTiles.map((src, i) => (
            <div key={`${src}-${i}`} className="shrink-0 px-2">
              <div
                className="relative overflow-hidden"
                style={{
                  width: 'clamp(220px, 22vw, 280px)',
                  aspectRatio: '1',
                  borderRadius: 'var(--m-radius-xl)',
                  background: 'var(--n-hero-marquee-card-bg, var(--m-surface))',
                  border: '1px solid var(--m-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <Image src={src} alt="" fill sizes="280px" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10"
          style={{ background: 'linear-gradient(to right, var(--m-surface), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10"
          style={{ background: 'linear-gradient(to left, var(--m-surface), transparent)' }}
        />
      </div>
    </section>
  )
}
