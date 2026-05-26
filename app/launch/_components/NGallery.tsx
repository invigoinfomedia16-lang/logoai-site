'use client'

// Sample Gallery — Design N. Industry-tab logo grid ported from the
// purple L design's Examples gallery, restyled to N's themable palette.
// Tab UI scales to the full industry list via a search field + the
// 16 "popular" industries shown by default; users can search instantly
// or expand to the full list via "See all". Copy from the LOGOAI
// landing-page doc, section 5.

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getCategoryImages } from '@/data'

// Default-visible chips — those flagged `isPopular` in the data file.
const POPULAR_CATEGORIES = CATEGORIES.filter((c) => c.isPopular)

// How many logos to render in the grid before the user taps "Show more".
// Live site renders 12+12 = 24 per category; we collapse to 12 by default.
const INITIAL_LOGO_COUNT = 12

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

export default function NGallery() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]?.key ?? 'restaurant')
  const [galleryKey, setGalleryKey] = useState(0)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  // Logo-grid expansion (12 → 24 per category). Resets to collapsed
  // whenever the user switches category, so each category starts compact.
  const [expandedGrid, setExpandedGrid] = useState(false)
  const galleryImages = getCategoryImages(activeCategory)
  const displayedImages = expandedGrid
    ? galleryImages
    : galleryImages.slice(0, INITIAL_LOGO_COUNT)
  const hasMoreLogos = galleryImages.length > INITIAL_LOGO_COUNT
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

  return (
    <section
      id="gallery"
      className="flex flex-col items-start py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      {/* Local fade-in keyframe for the logo grid (mirrors the L design). */}
      <style>{`
        @keyframes nLogoFade {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="flex flex-col gap-10 md:gap-12 items-start w-full max-w-[1280px] mx-auto px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Gallery</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            See what your logo could look like
          </h2>
          <p className="m-sub max-w-[760px]">
            Each logo below was made by our AI. Yours can be too.
          </p>
        </div>

        {/* Category browse — search field + popular pills + "See all"
            expander. Search is always available; the pills below show
            POPULAR_COUNT by default and the full list when expanded.
            Live-filters across the full list as the user types. */}
        <div className="flex flex-col gap-5 items-center w-full">
          {/* Search input — centered, max-width so it doesn't dominate */}
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
                      setExpandedGrid(false)
                      setGalleryKey((k) => k + 1)
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
                    setGalleryKey((k) => k + 1)
                  }}
                />
              ))}
            </div>
          )}

          {/* See all / show fewer — only when not searching and there's
              more to show. Plain link, brand-coloured. */}
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
        </div>

        {/* Logo grid — 12 per category by default, expands to the full
            set on "Show more". Staggered fade-in on category switch
            (galleryKey re-mounts the grid). When the user expands, only
            the new logos animate in — existing ones keep their final
            state thanks to React's stable-key reconciliation. */}
        <div
          key={galleryKey}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full"
        >
          {displayedImages.map((src, i) => (
            <div
              key={src}
              className="relative w-full overflow-hidden group"
              style={{
                paddingBottom: '100%',
                borderRadius: 'var(--m-radius-xl)',
                background: 'var(--m-surface)',
                border: '1px solid var(--m-border)',
                opacity: 0,
                transform: 'translateY(12px) scale(0.97)',
                animation: `nLogoFade 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 0.04}s forwards`,
              }}
            >
              <Image
                src={src}
                alt={`AI-generated ${activeCategoryName} logo example ${i + 1}`}
                fill
                className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Show-more control — only renders when the category actually has
            more than INITIAL_LOGO_COUNT logos available (so it auto-hides
            for categories that only ship 12). Counter sits below in a soft
            muted style so it reads as supporting info, not a CTA. */}
        {hasMoreLogos && (
          <div className="flex flex-col items-center gap-2 w-full">
            <p
              className="m-sans"
              style={{ color: 'var(--m-text-muted)', fontSize: 13 }}
            >
              Showing {displayedImages.length} of {galleryImages.length}
            </p>
            {!expandedGrid ? (
              <button
                type="button"
                onClick={() => setExpandedGrid(true)}
                className="m-sans inline-flex items-center gap-2"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--m-border)',
                  borderRadius: 'var(--m-radius-md)',
                  color: 'var(--m-ink)',
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '12px 22px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--m-brand)'
                  e.currentTarget.style.color = 'var(--m-brand)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--m-border)'
                  e.currentTarget.style.color = 'var(--m-ink)'
                }}
              >
                Show {galleryImages.length - INITIAL_LOGO_COUNT} more logos
                <span aria-hidden="true">↓</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setExpandedGrid(false)}
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
                Show fewer
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
