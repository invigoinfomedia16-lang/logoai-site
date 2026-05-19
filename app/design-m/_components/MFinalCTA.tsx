'use client'

// Final CTA — centered headline + button + category tabs scrubber + logo
// strip, mirroring HEADSHOT's final CTA pattern. Uses LOGO.AI's CATEGORIES
// from @/data so the tabs reflect real industries the site supports.

import Image from 'next/image'
import { useRef, useState } from 'react'
import { CATEGORIES, getCategoryImages } from '@/data'

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12M10 4l6 6-6 6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M9 3L5 7L9 11" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M5 3L9 7L5 11" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MFinalCTA() {
  const [activeKey, setActiveKey] = useState<string>(CATEGORIES[0]?.key ?? 'restaurant')
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  const galleryImages = getCategoryImages(activeKey).slice(0, 6)

  return (
    <section
      className="flex flex-col items-start py-20 md:pb-[128px] md:pt-0 w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Heading */}
        <div className="flex flex-col items-center pb-2 px-6 w-full">
          <h2 className="m-h2 text-center max-w-[1000px]" style={{ color: 'var(--m-ink)' }}>
            Your studio-quality logo is sixty seconds away
          </h2>
        </div>

        {/* Primary CTA */}
        <a
          href="#hero-cta"
          className="m-cta-lg inline-flex items-center justify-center gap-3 px-5 py-4"
          style={{
            background: 'var(--m-brand)',
            borderRadius: 'var(--m-radius-md)',
            boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
          }}
        >
          <span>Claim my free logo</span>
          <ArrowRightIcon />
        </a>

        {/* Category tabs scrubber */}
        <div className="flex items-center gap-2 max-w-[1024px] w-full px-4 mt-4">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => handleScroll('left')}
            className="flex items-center justify-center w-9 h-9 shrink-0"
            style={{
              background: 'var(--m-surface)',
              border: '1px solid var(--m-border)',
              borderRadius: 'var(--m-radius-pill)',
            }}
          >
            <ChevronLeftIcon />
          </button>
          <div ref={scrollerRef} className="flex-1 h-10 overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none' }}>
            <div className="flex items-center gap-2 h-full w-max px-1">
              {CATEGORIES.map((cat) => {
                const active = cat.key === activeKey
                return (
                  <button
                    key={cat.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveKey(cat.key)}
                    className="m-sans inline-flex items-center justify-center px-4 py-2 shrink-0"
                    style={{
                      background: active ? 'var(--m-brand-strong)' : 'var(--m-surface)',
                      color: active ? '#FFFFFF' : 'var(--m-text-muted)',
                      border: active ? 'none' : '1px solid var(--m-border)',
                      borderRadius: 'var(--m-radius-pill)',
                      fontSize: 14,
                      lineHeight: '20px',
                      whiteSpace: 'nowrap',
                      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => handleScroll('right')}
            className="flex items-center justify-center w-9 h-9 shrink-0"
            style={{
              background: 'var(--m-surface)',
              border: '1px solid var(--m-border)',
              borderRadius: 'var(--m-radius-pill)',
            }}
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Logo strip — 6 examples for the active category */}
        <div className="relative w-full overflow-hidden mt-4 px-4">
          <div className="flex items-start gap-4 mx-auto max-w-[1100px] justify-center flex-wrap">
            {galleryImages.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative shrink-0 overflow-hidden"
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 'var(--m-radius-lg)',
                  background: 'var(--m-surface-alt)',
                  border: '1px solid var(--m-border-soft)',
                }}
              >
                <Image src={src} alt="" fill sizes="160px" className="object-contain p-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
