'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getLogosClaimed, getLogosRemaining, getDaysUntilLaunch } from '@/data'

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.16669 10H15.8334" stroke="#FFFFFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="#FFFFFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#00A63E" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M9.99996 1.66669L12.575 6.88335L18.3333 7.72502L14.1666 11.7834L15.15 17.5167L9.99996 14.8084L4.84996 17.5167L5.83329 11.7834L1.66663 7.72502L7.42496 6.88335L9.99996 1.66669Z" fill="#FFBA00" stroke="#FFBA00" strokeWidth="1.66667" strokeLinejoin="round" />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.33333 2L6.13333 4.53333L8.66667 5.33333L6.13333 6.13333L5.33333 8.66667L4.53333 6.13333L2 5.33333L4.53333 4.53333L5.33333 2Z" fill="#FFFFFF" />
      <path d="M12 1.33337V4.00004" stroke="#FFFFFF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.3333 2.66663H10.6666" stroke="#FFFFFF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.3333 10.6666L12 13.3333L12.6666 10.6666L14 9.99996L12.6666 9.33329L12 6.66663L11.3333 9.33329L9.99996 9.99996L11.3333 10.6666Z" fill="#FFFFFF" />
    </svg>
  )
}

// 12 logos drawn from LOGO.AI's existing /Images/Logos library
const HERO_LOGOS = [
  '/Images/Logos/restaurant-logo-1.webp',
  '/Images/Logos/coffee-shop-logo-1.webp',
  '/Images/Logos/bakery-logo-1.webp',
  '/Images/Logos/food-truck-logo-1.webp',
  '/Images/Logos/barbershop-logo-1.webp',
  '/Images/Logos/hair-salon-logo-1.webp',
  '/Images/Logos/nail-studio-logo-1.webp',
  '/Images/Logos/boutique-logo-1.webp',
  '/Images/Logos/clothing-brand-logo-1.webp',
  '/Images/Logos/gym-logo-1.webp',
  '/Images/Logos/cleaning-service-logo-1.webp',
  '/Images/Logos/tattoo-studio-logo-1.webp',
]

const TOTAL_SLIDES = HERO_LOGOS.length

export default function MHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % TOTAL_SLIDES)
    }, 3000)
    return () => clearInterval(id)
  }, [isPaused])

  const slideBasisPct = 100 / 6
  const trackWidthPct = (TOTAL_SLIDES / 6) * 100
  const translatePct = currentSlide * slideBasisPct

  return (
    <section
      className="w-full pb-16 md:pb-[128px]"
      style={{
        background: 'linear-gradient(to bottom, rgba(240,238,230,0.95) 0%, rgba(240,238,230,0.45) 50%, #FFFFFF 100%)',
      }}
    >
      <div className="px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px]">
        <div className="mx-auto w-full max-w-[1536px] px-2 sm:px-4 pt-6 pb-6">
          {/* Eyebrow pill */}
          <div className="flex items-center justify-center">
            <span
              className="m-eyebrow inline-flex items-center justify-center rounded-full px-4 py-2"
              style={{
                background: 'var(--m-surface)',
                color: 'var(--m-brand)',
                boxShadow: '0 0 0 1px var(--m-brand-soft), 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
              }}
            >
              <span aria-hidden="true">💙</span>
              <span className="ml-1.5">#1 AI LOGO GENERATOR</span>
            </span>
          </div>

          {/* H1 */}
          <h1 className="m-h1 mx-auto mt-6 max-w-[896px] text-center">
            Get a Professional Logo in 60 Seconds
          </h1>

          {/* Subhead */}
          <p className="m-sub mx-auto mt-6 max-w-[768px] text-center">
            Describe your brand. Watch AI design it. Download a studio-quality logo —
            ready for your website, your business cards, your launch.
          </p>

          {/* Hero CTA — email + button */}
          <div id="hero-cta" className="mt-6 flex flex-col items-center">
            {submitted ? (
              <p
                className="m-display text-center"
                style={{ fontWeight: 700, fontSize: 24, lineHeight: '32px', color: 'var(--m-ink)' }}
              >
                ✓ You&apos;re on the list! We&apos;ll email you at launch.
              </p>
            ) : (
              <form
                className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-[560px]"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 m-sans px-4 py-[14px]"
                  style={{
                    background: 'var(--m-surface)',
                    color: 'var(--m-ink)',
                    border: '1px solid var(--m-border)',
                    borderRadius: 'var(--m-radius-md)',
                    fontSize: 16,
                    lineHeight: '24px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="m-cta-lg inline-flex items-center justify-center gap-3 px-5"
                  style={{
                    background: 'var(--m-brand)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--m-radius-md)',
                    padding: '16px 20px',
                    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
                  }}
                >
                  <span>Get my free logo</span>
                  <ArrowRight />
                </button>
              </form>
            )}
          </div>

          {/* Trust ticks */}
          {!submitted && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <CheckIcon />
                <span className="m-body" style={{ fontWeight: 500 }}>
                  100% free at launch
                </span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <CheckIcon />
                <span className="m-body" style={{ fontWeight: 500 }}>
                  No credit card required
                </span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <CheckIcon />
                <span className="m-body" style={{ fontWeight: 500 }}>
                  Yours forever
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logo carousel (replaces HEADSHOT's before/after carousel — same horizontal slide pattern) */}
      <div
        className="relative w-full pb-8"
        aria-label="Logo gallery carousel"
        role="region"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[280px] sm:h-[320px] w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{
              width: `${trackWidthPct}%`,
              transform: `translateX(-${translatePct}%)`,
            }}
          >
            {HERO_LOGOS.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="flex shrink-0 flex-col items-start px-2"
                style={{ flexBasis: `${100 / TOTAL_SLIDES}%` }}
              >
                <div
                  className="relative h-[280px] sm:h-[320px] w-full overflow-hidden"
                  style={{
                    borderRadius: 'var(--m-radius-xl)',
                    background: 'var(--m-brand-bg)',
                    border: '1px solid var(--m-border)',
                  }}
                >
                  <Image src={src} alt="" fill sizes="240px" className="object-contain p-4" />
                  <div
                    className="absolute right-3 bottom-3 flex items-center justify-center p-2 backdrop-blur-sm"
                    style={{ background: 'rgba(217,119,87,0.92)', borderRadius: 'var(--m-radius-md)' }}
                  >
                    <SparklesIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edge fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32"
            style={{ background: 'linear-gradient(to right, var(--m-surface-alt), transparent)' }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32"
            style={{ background: 'linear-gradient(to left, var(--m-surface-alt), transparent)' }}
          />
        </div>
      </div>

      {/* Trust strip — counts + rating */}
      <div className="px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px] pt-6 sm:pt-8">
        <div className="mx-auto w-full max-w-[1536px] px-2 sm:px-4">
          <p className="text-center m-body" style={{ fontSize: 18, lineHeight: '28px' }}>
            Over{' '}
            <span style={{ fontWeight: 700, color: 'var(--m-brand)' }}>
              {getLogosClaimed().toLocaleString('en-US')}
            </span>{' '}
            logos already claimed —{' '}
            <span style={{ fontWeight: 700, color: 'var(--m-brand)' }}>
              {getLogosRemaining().toLocaleString('en-US')}
            </span>{' '}
            free logos left.{' '}
            <span style={{ fontWeight: 700, color: 'var(--m-brand)' }}>
              {getDaysUntilLaunch()} days
            </span>{' '}
            until launch.
          </p>

          <p
            className="mt-6 sm:mt-8 text-center m-sans"
            style={{ fontWeight: 600, fontSize: 18, lineHeight: '28px', color: 'var(--m-text-soft)' }}
          >
            Used by founders everywhere
          </p>

          {/* Founder pills row (placeholder for partner / press / customer logos) */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {['Y Combinator', 'Product Hunt', 'TechCrunch', 'Forbes', 'Indie Hackers', 'BetaList'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-center px-4 py-2"
                style={{
                  height: 50,
                  minWidth: 100,
                  color: 'var(--m-text-soft)',
                  fontFamily: 'var(--m-font-display), sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: '-0.3px',
                  opacity: 0.55,
                }}
              >
                {name}
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-0.5">
              <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
            </div>
            <div className="flex items-center gap-2 m-body">
              <span>Verified</span>
              <span style={{ fontWeight: 700, color: 'var(--m-brand-strong)' }}>4.9/5</span>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
