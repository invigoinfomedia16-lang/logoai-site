'use client'

// Sample Gallery — Design N. The 16-industry category-tab logo grid ported
// from the purple L design's Examples gallery, restyled to N's terracotta
// palette. Copy from the LOGOAI landing-page doc, section 5.

import { useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getCategoryImages } from '@/data'

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

export default function NGallery() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]?.key ?? 'restaurant')
  const [galleryKey, setGalleryKey] = useState(0)
  const galleryImages = getCategoryImages(activeCategory)
  const activeCategoryName =
    CATEGORIES.find((c) => c.key === activeCategory)?.name ?? 'business'

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
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>See For Yourself</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            None of these came from a designer
          </h2>
          <p className="m-sub max-w-[760px]">
            Every logo below was made by our AI from a short brand description. They look like a
            designer made them — because the AI uses the same rules real designers do.
          </p>
        </div>

        {/* Category tabs — 16 industries, horizontal scroll on mobile, wrap on desktop */}
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
                  setGalleryKey((k) => k + 1)
                }}
              />
            ))}
          </div>
        </div>

        {/* Logo grid — 12 per category, staggered fade-in on switch */}
        <div
          key={galleryKey}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 w-full"
        >
          {galleryImages.map((src, i) => (
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
      </div>
    </section>
  )
}
