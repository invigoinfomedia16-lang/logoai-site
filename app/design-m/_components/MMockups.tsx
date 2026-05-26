'use client'

// MMockups — prelaunch "Works everywhere" section. Reuses the design-n
// mockup carousel pattern (category pills + auto-rotating frame) with
// the design-l section heading. Placeholder until prelaunch copy ships.

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getMockupImages } from '@/data'

const POPULAR_CATEGORIES = CATEGORIES.filter((c) => c.isPopular)

function CategoryPill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button" onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 cursor-pointer m-sans"
      style={{
        padding: '10px 18px', borderRadius: 'var(--m-radius-md)',
        border: active ? '1px solid var(--m-brand)'
          : hovered ? 'var(--n-pill-hover-border, 1px solid var(--m-border-medium))'
          : '1px solid var(--m-border)',
        background: active ? 'var(--m-brand)'
          : hovered ? 'var(--n-pill-hover-bg, var(--m-brand-bg))'
          : 'var(--m-surface)',
        color: active ? 'var(--m-on-brand, #FFFFFF)'
          : hovered ? 'var(--n-pill-hover-color, var(--m-ink))'
          : 'var(--m-text-muted)',
        fontSize: 14, lineHeight: 1, fontWeight: active ? 600 : 500,
        transition: 'all 0.15s ease', whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export default function MMockups() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]?.key ?? 'restaurant')
  const [slide, setSlide] = useState(0)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const mockups = getMockupImages(activeCategory)
  const activeCategoryName = CATEGORIES.find((c) => c.key === activeCategory)?.name ?? 'business'

  useEffect(() => { setSlide(0) }, [activeCategory])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => { setSlide((s) => (s + 1) % mockups.length) }, 3500)
    return () => clearInterval(id)
  }, [mockups.length, activeCategory])

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
      id="mockups"
      className="relative flex flex-col items-start py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--n-mockups-section-bg, var(--m-brand-bg))' }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--n-mockups-bg, var(--m-brand-bg))',
          WebkitMaskImage: 'var(--n-mockups-mask, linear-gradient(to bottom, transparent 0, #000 72px, #000 calc(100% - 72px), transparent 100%))',
          maskImage: 'var(--n-mockups-mask, linear-gradient(to bottom, transparent 0, #000 72px, #000 calc(100% - 72px), transparent 100%))',
        }}
      />
      <div className="relative z-[1] flex flex-col gap-10 md:gap-12 items-start w-full max-w-[1280px] mx-auto px-2 sm:px-4">
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Real-World</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            Picture your logo everywhere
          </h2>
          <p className="m-sub max-w-[820px]">
            Here&apos;s how our logos look on websites, business cards, signage, and anywhere your brand needs to show up.
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center w-full">
          <div className="relative w-full max-w-[460px]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--m-text-muted)', pointerEvents: 'none' }}>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${CATEGORIES.length} industries…`} aria-label="Search industries" className="m-sans w-full"
              style={{
                background: 'var(--m-surface-alt)', border: '1px solid var(--m-border)',
                borderRadius: 'var(--m-radius-md)', color: 'var(--m-ink)',
                fontSize: 15, lineHeight: '20px', padding: '12px 16px 12px 44px', outline: 'none', transition: 'border-color 0.15s ease',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--m-brand)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--m-border)' }} />
          </div>

          {visibleCategories.length === 0 ? (
            <p className="m-sans" style={{ color: 'var(--m-text-muted)', fontSize: 14, padding: '8px 0' }}>
              No industries match &ldquo;{query}&rdquo;. Try a different term.
            </p>
          ) : !trimmedQuery && !showAll ? (
            <div className="relative w-full">
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to right, transparent, var(--m-surface))' }} aria-hidden="true" />
              <div className="flex md:flex-wrap md:justify-center gap-2.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                {visibleCategories.map((cat) => (
                  <CategoryPill key={cat.key} label={cat.name} active={cat.key === activeCategory}
                    onClick={() => { if (cat.key === activeCategory) return; setActiveCategory(cat.key) }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2.5 w-full">
              {visibleCategories.map((cat) => (
                <CategoryPill key={cat.key} label={cat.name} active={cat.key === activeCategory}
                  onClick={() => { if (cat.key === activeCategory) return; setActiveCategory(cat.key) }} />
              ))}
            </div>
          )}

          {!trimmedQuery && hiddenCount > 0 && (
            <button type="button" onClick={() => setShowAll((v) => !v)} className="m-sans"
              style={{ background: 'transparent', border: 'none', color: 'var(--m-brand)', fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: '4px 8px' }}>
              {showAll ? 'Show fewer' : `See all ${CATEGORIES.length} industries →`}
            </button>
          )}
        </div>

        <div className="w-full relative overflow-hidden"
          style={{
            aspectRatio: '1460 / 760', borderRadius: 'var(--m-radius-xl)',
            background: 'var(--n-mockup-frame-bg, var(--m-surface))',
            border: 'var(--n-mockup-frame-border-css, 1px solid var(--m-border))',
            boxShadow: 'var(--n-mockup-frame-shadow, 0 8px 24px rgba(0,0,0,0.08))',
            padding: 'var(--n-mockup-frame-pad, 0)',
          }}>
          {mockups.map((src, i) => (
            <Image key={`${activeCategory}-${i}`} src={src} alt={`A Logo.AI logo shown on real ${activeCategoryName} branding`} fill sizes="100vw"
              className="object-cover transition-all duration-700"
              style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
              priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
