'use client'

// Mockup Showcase — Design N. Mirrors the purple L design's mockup section:
// 16 industry category tabs + a single auto-rotating carousel (one mockup at
// a time, 1460/760 frame) wrapped in the L-design "frame" treatment
// (gradient-mesh padded container + vignette), with pagination dots below.
// Recolored to the terracotta palette. Copy from the LOGOAI landing-page
// doc, section 6.

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
        color: active ? '#FFFFFF' : hovered ? 'var(--m-ink)' : 'var(--m-text-muted)',
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
      className="flex flex-col items-start py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-brand-bg)' }}
    >
      <div className="flex flex-col gap-10 md:gap-12 items-start w-full max-w-[1280px] mx-auto px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>See It In The Real World</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            From favicon to billboard.
          </h2>
          <p className="m-sub max-w-[820px]">
            A great logo has to work everywhere — tiny on a browser tab, huge on a storefront,
            and everything in between. Here&apos;s how a logo from Logo.AI looks across the things
            your business uses every day.
          </p>
        </div>

        {/* Category tabs — 16 industries */}
        <div className="relative w-full">
          <div
            className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, transparent, var(--m-brand-bg))' }}
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

        {/* Frame — gradient-mesh padded container (mirrors the L design frame,
            recolored to the terracotta palette) */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            padding: 'clamp(16px, 4vw, 48px)',
            background: 'var(--m-brand-deep)',
            borderRadius: 20,
          }}
        >
          {/* Gradient mesh + vignette */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1600 800"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="n-mock-a" cx="25%" cy="28%" r="55%">
                <stop offset="0%" stopColor="#E89A7E" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#E89A7E" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="n-mock-b" cx="78%" cy="74%" r="55%">
                <stop offset="0%" stopColor="#D97757" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#D97757" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="n-mock-vig" cx="50%" cy="50%" r="75%">
                <stop offset="55%" stopColor="#2A1810" stopOpacity="0" />
                <stop offset="100%" stopColor="#2A1810" stopOpacity="0.55" />
              </radialGradient>
            </defs>
            <rect width="1600" height="800" fill="url(#n-mock-a)" />
            <rect width="1600" height="800" fill="url(#n-mock-b)" />
            <rect width="1600" height="800" fill="url(#n-mock-vig)" />
          </svg>

          {/* Carousel frame — one mockup at a time, crossfade */}
          <div
            className="relative z-10 overflow-hidden"
            style={{
              aspectRatio: '1460/760',
              borderRadius: 12,
              background: '#141413',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
