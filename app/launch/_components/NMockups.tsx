'use client'

// Mockup Showcase — Design N. 16 industry category tabs + a single
// auto-rotating carousel (one mockup at a time, 1460/760 frame) in a plain
// padded container, with pagination dots below. Copy from the LOGOAI
// landing-page doc, section 6.

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getMockupImages, getSubCategories } from '@/data'

// Default-visible chips — those flagged `isPopular` in the data file.
const POPULAR_CATEGORIES = CATEGORIES.filter((c) => c.isPopular)

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
          ? 'var(--n-pill-hover-border, 1px solid var(--m-border-medium))'
          : '1px solid var(--m-border)',
        background: active
          ? 'var(--m-brand)'
          : hovered
          ? 'var(--n-pill-hover-bg, var(--m-brand-bg))'
          : 'var(--m-surface)',
        color: active
          ? 'var(--m-on-brand, #FFFFFF)'
          : hovered
          ? 'var(--n-pill-hover-color, var(--m-ink))'
          : 'var(--m-text-muted)',
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

// Sub-category pill — quieter than the main industry pill so the two-tier
// hierarchy reads clearly. Outlined-when-active, smaller padding + font.
function SubCategoryPill({
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
        padding: '7px 13px',
        borderRadius: 'var(--m-radius-md)',
        border: active
          ? '1px solid var(--m-brand)'
          : hovered
          ? '1px solid var(--m-border-medium)'
          : '1px solid var(--m-border)',
        background: active
          ? 'var(--m-brand-bg)'
          : hovered
          ? 'var(--m-surface-alt)'
          : 'transparent',
        color: active
          ? 'var(--m-brand)'
          : hovered
          ? 'var(--m-ink)'
          : 'var(--m-text-muted)',
        fontSize: 12.5,
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
  const subCategories = getSubCategories(activeCategory)
  const [activeSubCategory, setActiveSubCategory] = useState<string>(subCategories[0]?.key ?? '')
  useEffect(() => {
    setActiveSubCategory(getSubCategories(activeCategory)[0]?.key ?? '')
  }, [activeCategory])
  const [slide, setSlide] = useState(0)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const mockups = getMockupImages(activeCategory)
  const activeCategoryName =
    CATEGORIES.find((c) => c.key === activeCategory)?.name ?? 'business'

  // Visible pills:
  //  - searching → live filter against the full list (case-insensitive)
  //  - showAll   → full list
  //  - default   → POPULAR_CATEGORIES (the 16 flagged in data/index.ts)
  // Always include the active category so the user never loses their
  // selection even if it falls outside the visible window.
  const trimmedQuery = query.trim().toLowerCase()
  const visibleCategories = useMemo(() => {
    if (trimmedQuery) {
      return CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    }
    const base = showAll ? CATEGORIES : POPULAR_CATEGORIES
    if (base.some((c) => c.key === activeCategory)) return base
    const active = CATEGORIES.find((c) => c.key === activeCategory)
    return active ? [active, ...base] : base
  }, [trimmedQuery, showAll, activeCategory])

  const hiddenCount = CATEGORIES.length - POPULAR_CATEGORIES.length

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
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Real-World</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            Picture your logo everywhere
          </h2>
          <p className="m-sub max-w-[820px]">
            Here&apos;s how our logos look on websites, business cards, signage, and anywhere your brand needs to show up.
          </p>
        </div>

        {/* Category browse — search field + popular pills + "See all"
            expander. Same pattern as NGallery: search is always available;
            pills show POPULAR_COUNT by default, full list when expanded;
            live-filter as the user types. */}
        <div className="flex flex-col gap-5 items-center w-full">
          {/* Search input */}
          <div className="relative w-full max-w-[460px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--m-text-muted)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${CATEGORIES.length} industries…`}
              aria-label="Search industries"
              className="m-sans w-full"
              style={{
                background: 'var(--m-surface-alt)',
                border: '1px solid var(--m-border)',
                borderRadius: 'var(--m-radius-md)',
                color: 'var(--m-ink)',
                fontSize: 15,
                lineHeight: '20px',
                padding: '12px 16px 12px 44px',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--m-brand)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--m-border)'
              }}
            />
          </div>

          {/* Pills — hybrid mobile layout:
              - Default (popular + not searching): single horizontal-scroll
                row on mobile (16 chips swipe comfortably; fade hint at right
                edge), wrap on tablet+.
              - Expanded or searching: wrap on every breakpoint so all
                visible chips are tappable without endless swiping. */}
          {visibleCategories.length === 0 ? (
            <p
              className="m-sans"
              style={{ color: 'var(--m-text-muted)', fontSize: 14, padding: '8px 0' }}
            >
              No industries match &ldquo;{query}&rdquo;. Try a different term.
            </p>
          ) : !trimmedQuery && !showAll ? (
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
                {visibleCategories.map((cat) => (
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
          ) : (
            <div className="flex flex-wrap justify-center gap-2.5 w-full">
              {visibleCategories.map((cat) => (
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
          )}

          {/* See all / show fewer */}
          {!trimmedQuery && hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="m-sans"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--m-brand)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 8px',
              }}
            >
              {showAll ? 'Show fewer' : `See all ${CATEGORIES.length} industries →`}
            </button>
          )}

          {/* Sub-category niches under the selected industry. */}
          {!trimmedQuery && subCategories.length > 0 && (
            <div className="relative w-full">
              <div
                className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, transparent, var(--m-brand-bg))' }}
                aria-hidden="true"
              />
              <div
                className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {subCategories.map((sub) => (
                  <SubCategoryPill
                    key={sub.key}
                    label={sub.name}
                    active={sub.key === activeSubCategory}
                    onClick={() => {
                      if (sub.key === activeSubCategory) return
                      setActiveSubCategory(sub.key)
                    }}
                  />
                ))}
              </div>
            </div>
          )}
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
