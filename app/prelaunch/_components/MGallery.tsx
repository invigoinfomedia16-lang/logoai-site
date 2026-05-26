'use client'

// MGallery — prelaunch "Real examples" gallery. Same industry-pill +
// logo-grid behaviour as NGallery; only the heading copy differs to
// match /design-l. Reuses the launch component directly under the
// hood by re-exporting it with section-heading overrides via DOM
// is not practical, so this is a near-copy with the new copy baked in.

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getCategoryImages, getSubCategories } from '@/data'

const POPULAR_CATEGORIES = CATEGORIES.filter((c) => c.isPopular)
const INITIAL_LOGO_COUNT = 12

function CategoryPill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
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

// Sub-category pill — visually quieter than the main industry pill so the
// two-tier hierarchy reads at a glance. Outlined-when-active instead of
// filled, smaller padding, smaller font.
function SubCategoryPill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
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

export default function MGallery() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]?.key ?? 'restaurant')
  const subCategories = getSubCategories(activeCategory)
  const [activeSubCategory, setActiveSubCategory] = useState<string>(subCategories[0]?.key ?? '')
  // Reset sub-cat to the first option whenever the parent industry changes.
  useEffect(() => {
    setActiveSubCategory(getSubCategories(activeCategory)[0]?.key ?? '')
  }, [activeCategory])
  const [galleryKey, setGalleryKey] = useState(0)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [expandedGrid, setExpandedGrid] = useState(false)
  const galleryImages = getCategoryImages(activeCategory)
  const displayedImages = expandedGrid ? galleryImages : galleryImages.slice(0, INITIAL_LOGO_COUNT)
  const hasMoreLogos = galleryImages.length > INITIAL_LOGO_COUNT
  const activeCategoryName = CATEGORIES.find((c) => c.key === activeCategory)?.name ?? 'business'

  const trimmedQuery = query.trim().toLowerCase()
  const visibleCategories = useMemo(() => {
    if (trimmedQuery) return CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
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
      <style>{`
        @keyframes mLogoFade { to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div className="flex flex-col gap-10 md:gap-12 items-start w-full max-w-[1280px] mx-auto px-2 sm:px-4">
        {/* Heading — v11 prelaunch copy. */}
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Gallery</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            See what your free logo could look like
          </h2>
          <p className="m-sub max-w-[760px]">
            Each logo below was made by our AI. Yours can be too — free, at launch.
          </p>
        </div>

        {/* Search + pills (hybrid mobile layout, same as NGallery). */}
        <div className="flex flex-col gap-5 items-center w-full">
          <div className="relative w-full max-w-[460px]">
            <svg
              width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--m-text-muted)', pointerEvents: 'none' }}
            >
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${CATEGORIES.length} industries…`}
              aria-label="Search industries" className="m-sans w-full"
              style={{
                background: 'var(--m-surface-alt)', border: '1px solid var(--m-border)',
                borderRadius: 'var(--m-radius-md)', color: 'var(--m-ink)',
                fontSize: 15, lineHeight: '20px', padding: '12px 16px 12px 44px',
                outline: 'none', transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--m-brand)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--m-border)' }}
            />
          </div>

          {visibleCategories.length === 0 ? (
            <p className="m-sans" style={{ color: 'var(--m-text-muted)', fontSize: 14, padding: '8px 0' }}>
              No industries match &ldquo;{query}&rdquo;. Try a different term.
            </p>
          ) : !trimmedQuery && !showAll ? (
            <div className="relative w-full">
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, transparent, var(--m-surface))' }}
                aria-hidden="true"
              />
              <div className="flex md:flex-wrap md:justify-center gap-2.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                {visibleCategories.map((cat) => (
                  <CategoryPill key={cat.key} label={cat.name} active={cat.key === activeCategory}
                    onClick={() => {
                      if (cat.key === activeCategory) return
                      setActiveCategory(cat.key); setExpandedGrid(false); setGalleryKey((k) => k + 1)
                    }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2.5 w-full">
              {visibleCategories.map((cat) => (
                <CategoryPill key={cat.key} label={cat.name} active={cat.key === activeCategory}
                  onClick={() => {
                    if (cat.key === activeCategory) return
                    setActiveCategory(cat.key); setExpandedGrid(false); setGalleryKey((k) => k + 1)
                  }} />
              ))}
            </div>
          )}

          {!trimmedQuery && hiddenCount > 0 && (
            <button type="button" onClick={() => setShowAll((v) => !v)} className="m-sans"
              style={{ background: 'transparent', border: 'none', color: 'var(--m-brand)', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}>
              {showAll ? 'Show fewer' : `See all ${CATEGORIES.length} industries →`}
            </button>
          )}

          {/* Sub-category pill row — niches within the selected industry.
              Visually subtler than the main pills (outlined-active, smaller).
              Hidden while the user is searching the industry list. */}
          {!trimmedQuery && subCategories.length > 0 && (
            <div className="relative w-full">
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, transparent, var(--m-surface))' }}
                aria-hidden="true"
              />
              <div className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                {subCategories.map((sub) => (
                  <SubCategoryPill key={sub.key} label={sub.name} active={sub.key === activeSubCategory}
                    onClick={() => {
                      if (sub.key === activeSubCategory) return
                      setActiveSubCategory(sub.key); setExpandedGrid(false); setGalleryKey((k) => k + 1)
                    }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div key={galleryKey} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full">
          {displayedImages.map((src, i) => (
            <div key={src} className="relative w-full overflow-hidden group"
              style={{
                paddingBottom: '100%', borderRadius: 'var(--m-radius-xl)',
                background: 'var(--m-surface)', border: '1px solid var(--m-border)',
                opacity: 0, transform: 'translateY(12px) scale(0.97)',
                animation: `mLogoFade 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 0.04}s forwards`,
              }}>
              <Image src={src} alt={`AI-generated ${activeCategoryName} logo example ${i + 1}`} fill
                className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={i < 4 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>

        {hasMoreLogos && (
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="m-sans" style={{ color: 'var(--m-text-muted)', fontSize: 13 }}>
              Showing {displayedImages.length} of {galleryImages.length}
            </p>
            {!expandedGrid ? (
              <button type="button" onClick={() => setExpandedGrid(true)}
                className="m-sans inline-flex items-center gap-2"
                style={{
                  background: 'transparent', border: '1px solid var(--m-border)',
                  borderRadius: 'var(--m-radius-md)', color: 'var(--m-ink)',
                  fontSize: 14, fontWeight: 600, padding: '12px 22px', cursor: 'pointer',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--m-brand)'; e.currentTarget.style.color = 'var(--m-brand)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--m-border)'; e.currentTarget.style.color = 'var(--m-ink)' }}>
                Show {galleryImages.length - INITIAL_LOGO_COUNT} more logos
                <span aria-hidden="true">↓</span>
              </button>
            ) : (
              <button type="button" onClick={() => setExpandedGrid(false)} className="m-sans"
                style={{ background: 'transparent', border: 'none', color: 'var(--m-brand)', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}>
                Show fewer
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
