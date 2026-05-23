'use client'

// Mockup Showcase — Design N. 16 industry category tabs + a single
// auto-rotating carousel (one mockup at a time, 1460/760 frame) in a plain
// padded container, with pagination dots below. Copy from the LOGOAI
// landing-page doc, section 6.

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getMockupImages } from '@/data'

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 cursor-pointer m-sans"
      style={{
        padding: '10px 18px',
        borderRadius: 'var(--m-radius-md)',
        border: active
          ? '1px solid var(--m-brand)'
          : hovered
          ? '1px solid var(--m-border-medium)'
          : '1px solid var(--m-border)',
        background: active
          ? 'var(--m-brand)'
          : hovered
          ? 'var(--m-brand-bg)'
          : 'var(--m-surface)',
        color: active ? 'var(--m-on-brand, #FFFFFF)' : hovered ? 'var(--m-ink)' : 'var(--m-text-muted)',
        fontSize: 14,
        lineHeight: 1,
        fontWeight: active ? 600 : 500,
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export default function NMockups() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]?.key ?? 'restaurant')
  const [slide, setSlide] = useState(0)
  const mockups = getMockupImages(activeCategory)
  const activeCategoryName =
    CATEGORIES.find((c) => c.key === activeCategory)?.name ?? 'business'

  // Reset to first slide when the category changes.
  useEffect(() => {
    setSlide(0)
  }, [activeCategory])

  // Auto-rotate the carousel — skipped when the visitor prefers reduced motion.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % mockups.length)
    }, 3500)
    return () => clearInterval(id)
  }, [mockups.length, activeCategory])

  return (
    <section
      id="mockups"
      className="relative flex flex-col items-start py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      // Section base. Other toggles use the plain section tint; the
      // Character.AI toggle overrides --n-mockups-section-bg to white so the
      // gradient band's feathered edges dissolve into the exact same white
      // as the sections above and below — a fully seamless blend, no step.
      style={{ background: 'var(--n-mockups-section-bg, var(--m-brand-bg))' }}
    >
      {/* Section-background layer. Most toggles render a plain tint (the
          layer resolves to --m-brand-bg, same as the section base, so the
          band is uniform). The Character.AI toggle sets --n-mockups-bg to
          the pastel gradient; the vertical mask then feathers the band's
          top/bottom edges so it blends softly into the off-white sections
          instead of a hard line — mirroring the Figma's soft-edged band. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--n-mockups-bg, var(--m-brand-bg))',
          // Default: a plain vertical feather (other toggles). The
          // Character.AI toggle overrides --n-mockups-mask with a fade
          // composited over SVG fractal-noise, so the band dissolves into a
          // grainy, cloudy edge instead of a clean line.
          WebkitMaskImage:
            'var(--n-mockups-mask, linear-gradient(to bottom, transparent 0, #000 72px, #000 calc(100% - 72px), transparent 100%))',
          maskImage:
            'var(--n-mockups-mask, linear-gradient(to bottom, transparent 0, #000 72px, #000 calc(100% - 72px), transparent 100%))',
          WebkitMaskSize: 'var(--n-mockups-mask-size, auto)',
          maskSize: 'var(--n-mockups-mask-size, auto)',
          WebkitMaskRepeat: 'var(--n-mockups-mask-repeat, no-repeat)',
          maskRepeat: 'var(--n-mockups-mask-repeat, no-repeat)',
        }}
      />
      <div className="relative z-[1] flex flex-col gap-10 md:gap-12 items-start w-full max-w-[1280px] mx-auto px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>In The Real World</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            Looks great everywhere
          </h2>
          <p className="m-sub max-w-[820px]">
            Here&apos;s how our logos look across websites, business cards, and everywhere your brand shows up. They look sharp at any size, on any surface.
          </p>
        </div>

        {/* Category tabs — 16 industries */}
        <div className="relative w-full">
          <div
            className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, transparent, var(--m-surface))' }}
            aria-hidden="true"
          />
          <div
            className="flex md:flex-wrap md:justify-center gap-2.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.key}
                label={cat.name}
                active={cat.key === activeCategory}
                onClick={() => {
                  if (cat.key === activeCategory) return
                  setActiveCategory(cat.key)
                }}
              />
            ))}
          </div>
        </div>

        {/* Frame — plain padded container around the carousel. Themeable:
            the Character.AI toggle turns it black via --n-mockup-frame-*. */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            padding: 'var(--n-mockup-frame-pad, clamp(6px, 1vw, 12px))',
            background: 'var(--n-mockup-frame-bg, var(--m-surface))',
            border: 'var(--n-mockup-frame-border-css, 1px solid var(--n-mockup-frame-border, var(--m-border)))',
            borderRadius: 16,
            boxShadow: 'var(--n-mockup-frame-shadow, none)',
          }}
        >
          {/* Carousel frame — one mockup at a time, crossfade */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: '1460/760',
              borderRadius: 12,
              background: '#141413',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          >
            {mockups.map((src, i) => (
              <Image
                key={`${activeCategory}-${i}`}
                src={src}
                alt={`A Logo.AI logo shown on real ${activeCategoryName} branding`}
                fill
                sizes="100vw"
                className="object-cover transition-all duration-700"
                style={{
                  opacity: i === slide ? 1 : 0,
                  transform: i === slide ? 'scale(1)' : 'scale(1.04)',
                }}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Pagination dots — below the frame */}
        <div className="flex gap-2 items-center justify-center w-full">
          {mockups.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className="h-2 rounded-full border-0 cursor-pointer transition-all duration-[400ms]"
              style={{
                width: i === slide ? 24 : 8,
                background: i === slide ? 'var(--m-brand)' : 'rgba(16,24,40,0.2)',
              }}
              aria-label={`Go to mockup ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
