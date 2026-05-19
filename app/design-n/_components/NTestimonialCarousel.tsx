'use client'

// Testimonial Carousel — Design N. A single rotating customer quote shown
// directly below the pricing card, inside the pricing section (it shares
// that section's background — no separate banner). Mirrors the headshot.ai
// testimonial carousel: a 5-star row, one quote at a time, attribution,
// prev/next arrows and dot pagination. Auto-advances; hovering pauses it.
// Client component (carousel state).

import { useCallback, useEffect, useState } from 'react'

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  avatarBg: string
}

// Five reviews written for LOGO.AI — distinct people/industries from the
// NReviews wall, each leaning on a different proof point (deadline speed,
// skeptic-converted, free iteration, file formats, preview-before-pay).
// Lengths are varied — a couple of punchy short lines plus longer ones.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Trade-show booth in four days, no logo. Generated a batch Tuesday night — it was on the banner by Thursday.",
    name: 'Laura Bennett',
    role: 'Founder, Maple & Oak — Home Goods',
    initials: 'LB',
    avatarBg: '#1E3A8A',
  },
  {
    quote:
      "I expected clip-art junk, honestly. What I got looked like a mark I'd have paid a designer four figures for. It's on my window, my cards, my Instagram.",
    name: 'Tom Hargrove',
    role: 'Owner, Northside Barbers',
    initials: 'TH',
    avatarBg: '#7C2D12',
  },
  {
    quote:
      "First set wasn't us, so I tweaked the description and ran it again — free. Third batch nailed it, and I never paid per attempt.",
    name: 'Hannah Whitfield',
    role: 'Co-founder, Brightroom — SaaS',
    initials: 'HW',
    avatarBg: '#0F766E',
  },
  {
    quote:
      "SVG, transparent PNG, every format my packaging printer asked for — all included, no chasing files.",
    name: 'Nick Carver',
    role: 'Founder, Cinder Coffee Roasters',
    initials: 'NC',
    avatarBg: '#9D174D',
  },
  {
    quote:
      "Seeing it mocked up on a business card and a storefront before I paid a cent is what sold me. I knew exactly what I was buying — paid once, done.",
    name: 'Claire Mercer',
    role: 'Owner, Studio Lumen — Photography',
    initials: 'CM',
    avatarBg: '#6D28D9',
  },
]

const AUTOPLAY_MS = 7000

function StarRow() {
  return (
    <div className="flex items-center justify-center gap-1" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#FFBA00" aria-hidden="true">
          <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.21-4.1 5.82-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {dir === 'left' ? (
        <path d="M12.5 4L6.5 10l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function NavButton({
  dir,
  onClick,
}: {
  dir: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={dir === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      onClick={onClick}
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: 44,
        height: 44,
        color: 'var(--m-text-soft)',
        background: 'var(--m-surface)',
        border: '1px solid var(--m-border)',
        transition: 'background 0.18s ease, border-color 0.18s ease, color 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--m-brand)'
        e.currentTarget.style.borderColor = 'var(--m-brand-soft)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--m-text-soft)'
        e.currentTarget.style.borderColor = 'var(--m-border)'
      }}
    >
      <Arrow dir={dir} />
    </button>
  )
}

export default function NTestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = TESTIMONIALS.length

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  )

  // Auto-advance — paused while the carousel is hovered.
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, count])

  const t = TESTIMONIALS[index]

  return (
    <div
      className="w-full"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes nTestiFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[760px] flex flex-col items-center text-center">
        {/* Quote viewport — arrows flank a single rotating testimonial */}
        <div className="flex w-full items-center gap-3 sm:gap-5">
          <NavButton dir="left" onClick={() => go(index - 1)} />

          {/* Slide — re-keyed on index so the fade-in animation replays */}
          <div
            key={index}
            className="flex flex-1 flex-col items-center"
            style={{ animation: 'nTestiFade 0.45s ease' }}
          >
            <StarRow />

            <blockquote
              className="m-display"
              style={{
                color: 'var(--m-ink)',
                fontSize: 14,
                lineHeight: 1.6,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                // 16px top — matches the star-to-text gap in the NReviews
                // cards (their StarRow → mt-4). Set inline so it isn't
                // overridden the way a margin:0 reset was clobbering it.
                margin: '16px 0 0 0',
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <span
                className="m-sans flex shrink-0 items-center justify-center rounded-full"
                style={{
                  background: t.avatarBg,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: 15,
                  width: 42,
                  height: 42,
                }}
                aria-hidden="true"
              >
                {t.initials}
              </span>
              <div className="flex flex-col items-start">
                <span className="m-sans" style={{ fontWeight: 700, fontSize: 15, color: 'var(--m-ink)' }}>
                  {t.name}
                </span>
                <span
                  className="m-sans"
                  style={{ fontWeight: 400, fontSize: 13, color: 'var(--m-text-soft)' }}
                >
                  {t.role}
                </span>
              </div>
            </div>
          </div>

          <NavButton dir="right" onClick={() => go(index + 1)} />
        </div>

        {/* Dot pagination */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              style={{
                width: i === index ? 26 : 8,
                height: 8,
                borderRadius: 999,
                background: i === index ? 'var(--m-brand)' : 'rgba(0,0,0,0.16)',
                transition: 'width 0.3s ease, background 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
