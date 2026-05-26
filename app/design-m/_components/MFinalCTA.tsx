'use client'

// MFinalCTA — v11 prelaunch closing CTA. "Get Started / Ready to Get
// Your Free Logo? / live counter / email + button / microcopy". Same
// brand-band chrome as the launch site, but the CTA is now a full
// email-capture form (not a Link) so the user never has to leave the
// page — and the counter shares its source with the hero (data/index.ts).

import { useState, type FormEvent } from 'react'
import { useLiveCounter } from './useLiveCounter'

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatNumber(n: number) {
  return n.toLocaleString('en-US')
}

export default function MFinalCTA() {
  // Live counter — shared with MHero via useLiveCounter so the
  // "{N} logos remaining" line ticks down in sync with the hero counter.
  const { remaining } = useLiveCounter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      id="final-cta"
      data-n-bottom-cta
      className="w-full py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px]"
      style={{ background: 'var(--n-cta-section-bg, var(--m-surface))' }}
    >
      <div
        className="max-w-[1280px] mx-auto flex flex-col items-center text-center"
        style={{
          background: 'var(--n-cta-band-bg, var(--m-brand))',
          border: 'var(--n-cta-band-border, none)',
          boxShadow: 'var(--n-cta-band-shadow, none)',
          borderRadius: 20,
          padding: 'var(--n-cta-band-pad, clamp(48px, 8vw, 104px) clamp(24px, 6vw, 80px))',
        }}
      >
        <div className="flex flex-col items-center" style={{ maxWidth: 780 }}>
          <p
            className="m-eyebrow"
            style={{ color: 'var(--n-cta-eyebrow, var(--m-brand))' }}
          >
            Get Started
          </p>
          <h2
            className="m-h1 mt-3"
            style={{ color: 'var(--n-cta-fg, #FFFFFF)', whiteSpace: 'normal' }}
          >
            Ready to Get Your Free Logo?
          </h2>
          <p
            className="m-sub mt-4"
            style={{ color: 'var(--n-cta-fg-sub, var(--m-text-muted))' }}
          >
            <span style={{ fontWeight: 700, color: 'var(--m-ink)' }}>
              {formatNumber(remaining)}
            </span>
            {' '}logos remaining. Don&apos;t miss out.
          </p>

          <div
            id="final-cta-form"
            className="mt-8 flex flex-col items-center gap-3 w-full max-w-[680px] mx-auto"
          >
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
        </div>
      </div>
    </section>
  )
}
