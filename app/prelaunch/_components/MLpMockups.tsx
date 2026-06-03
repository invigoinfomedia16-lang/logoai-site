'use client'

// MLpMockups — experimental Mockups section. Tabs across the categories
// that have a unique mockup set in /data (restaurant, coffee-shop, bakery)
// and a 4-up image grid below. Same pill styling as MLpGallery so the two
// sections read as a pair.

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getMockupImages, getSubCategories } from '@/data'

const POPULAR = CATEGORIES.filter((c) => c.isPopular)
const HIDDEN_COUNT = CATEGORIES.length - POPULAR.length
const SLIDE_MS = 3500
const ALL_KEY = '__all__'

export default function MLpMockups() {
  const [cat, setCat] = useState<string>(POPULAR[0]?.key ?? 'restaurant')
  const subs = useMemo(() => getSubCategories(cat), [cat])
  // Default to the "All" pseudo-sub-pill so the user sees the broad
  // category result first and we never assume they want a specific type.
  const [sub, setSub] = useState<string>(ALL_KEY)
  const images = useMemo(() => getMockupImages(cat), [cat])
  const [slide, setSlide] = useState(0)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setSub(ALL_KEY)
    setSlide(0)
  }, [cat])

  const trimmedQuery = query.trim().toLowerCase()
  const visibleCats = useMemo(() => {
    if (trimmedQuery) return CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    const base = showAll ? CATEGORIES : POPULAR
    if (base.some((c) => c.key === cat)) return base
    const active = CATEGORIES.find((c) => c.key === cat)
    return active ? [active, ...base] : base
  }, [trimmedQuery, showAll, cat])

  useEffect(() => {
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % images.length)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [images.length, cat])

  return (
    <div className="lpm">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="lpm-search">
        <svg className="lpm-search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${CATEGORIES.length} industries…`}
          aria-label="Search industries"
        />
      </div>

      {visibleCats.length === 0 ? (
        <p className="lpm-empty">No industries match &ldquo;{query}&rdquo;. Try a different term.</p>
      ) : (
        <div className="lpm-pills" data-expanded={showAll || !!trimmedQuery}>
          {visibleCats.map((c) => {
            const active = c.key === cat
            return (
              <button
                key={c.key}
                type="button"
                className={`lpm-pill${active ? ' is-active' : ''}`}
                onClick={() => { if (!active) setCat(c.key) }}
              >
                {c.name}
              </button>
            )
          })}
        </div>
      )}

      {!trimmedQuery && HIDDEN_COUNT > 0 && (
        <button
          type="button"
          className="lpm-seeall"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? 'Show fewer' : `See all ${CATEGORIES.length} industries`}
          <span className={`lpm-chev${showAll ? ' is-open' : ''}`} aria-hidden>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      )}

      {!trimmedQuery && subs.length > 0 && (
        <div className="lpm-subwrap">
          <div className="lpm-subpills">
            <button
              type="button"
              className={`lpm-subpill${sub === ALL_KEY ? ' is-active' : ''}`}
              onClick={() => { if (sub !== ALL_KEY) setSub(ALL_KEY) }}
            >
              All
            </button>
            {subs.map((s) => {
              const active = s.key === sub
              return (
                <button
                  key={s.key}
                  type="button"
                  className={`lpm-subpill${active ? ' is-active' : ''}`}
                  onClick={() => { if (!active) setSub(s.key) }}
                >
                  {s.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="lpm-frame" role="region" aria-label={`${cat} mockup carousel`}>
        {images.map((src, i) => (
          <Image
            key={`${cat}-${i}`}
            src={src}
            alt={`${cat} logo mockup ${i + 1}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={85}
            priority={i === 0}
            className="lpm-slide"
            style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
          />
        ))}

        <div className="lpm-dots" aria-hidden>
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`lpm-dot${i === slide ? ' is-active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const STYLES = `
  .lpm { display: flex; flex-direction: column; gap: 22px; align-items: center; }

  .lpm-search {
    position: relative;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
  }
  .lpm-search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #7e7e8c;
    pointer-events: none;
  }
  .lpm-search input {
    width: 100%;
    background: #141418;
    border: 1px solid #2a2a32;
    color: #f4f4f6;
    padding: 12px 16px 12px 44px;
    border-radius: 999px;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 15px;
    line-height: 20px;
    outline: none;
    transition: border-color 0.15s ease;
  }
  .lpm-search input::placeholder { color: #7e7e8c; }
  .lpm-search input:focus { border-color: #7e7e8c; }

  .lpm-empty {
    color: #b8b8c4;
    font-size: 14px;
    margin: 0;
    padding: 8px 0;
  }

  /* Plain text + chevron — matches the gallery's .lpg-seeall treatment. */
  .lpm-seeall {
    align-self: center;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: 0;
    padding: 4px 0;
    color: #b8b8c4;
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.15s ease;
  }
  .lpm-seeall:hover { color: #FF5C2E; }
  .lpm-chev {
    display: inline-flex;
    align-items: center;
    color: inherit;
    transition: transform 0.2s ease;
  }
  .lpm-chev.is-open { transform: rotate(180deg); }
  .lpm-arr { color: #FF5C2E; margin-right: 4px; }

  .lpm-pills, .lpm-subpills {
    display: flex; flex-wrap: wrap; gap: 10px;
    justify-content: center;
    width: 100%;
  }

  .lpm-subwrap {
    margin-top: 28px;
    display: flex; flex-direction: column; gap: 14px;
    align-items: center;
    width: 100%;
  }
  .lpm-shown-label {
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 13.5px;
    font-weight: 600;
    color: #b8b8c4;
    letter-spacing: 0.3px;
    margin: 0;
  }
  @media (max-width: 720px) {
    /* Smaller chips on mobile across the board so the section reads
       compact and matches MLpGallery. Size stays consistent between
       collapsed and expanded states so there's no jump on toggle. */
    .lpm-pills, .lpm-subpills {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
      gap: 6px;
    }
    .lpm-pills::-webkit-scrollbar,
    .lpm-subpills::-webkit-scrollbar { display: none; }
    .lpm-pill, .lpm-subpill { flex-shrink: 0; }
    .lpm-pill {
      padding: 6px 12px;
      font-size: 12px;
      letter-spacing: 0.1px;
    }

    /* When the user taps "See all N industries" (or is searching), drop
       the horizontal scroll and let the pills wrap to multiple rows so
       every chip is visible at once. */
    .lpm-pills[data-expanded="true"] {
      flex-wrap: wrap;
      overflow-x: visible;
      padding-bottom: 0;
    }
    .lpm-pills[data-expanded="true"] .lpm-pill { flex-shrink: 1; }
  }

  .lpm-pill {
    background: transparent;
    border: 1px solid #2a2a32;
    color: #b8b8c4;
    padding: 9px 16px;
    border-radius: 999px;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: all 0.15s ease;
    white-space: nowrap;
  }
  .lpm-pill:hover { border-color: rgba(255, 92, 46, 0.55); color: #FF5C2E; }
  .lpm-pill.is-active {
    background: #7c3aed;
    border-color: #7c3aed;
    color: #ffffff;
    font-weight: 600;
  }

  .lpm-subpill {
    background: transparent;
    border: 1px solid #2a2a32;
    color: #7e7e8c;
    padding: 6px 12px;
    border-radius: 999px;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: all 0.15s ease;
    white-space: nowrap;
  }
  .lpm-subpill:hover { color: #FF5C2E; border-color: rgba(255, 92, 46, 0.55); }
  .lpm-subpill.is-active {
    color: #a855f7;
    border-color: #a855f7;
    background: transparent;
    font-weight: 600;
  }

  .lpm-frame {
    position: relative;
    width: 100%;
    align-self: stretch;
    aspect-ratio: 1344 / 768;
    background: #141418;
    border: 1px solid #2a2a32;
    border-radius: 16px;
    overflow: hidden;
  }
  .lpm-slide {
    object-fit: cover;
    transition: opacity 0.7s ease;
  }

  .lpm-dots {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 2;
    padding: 8px 12px;
    background: rgba(10, 10, 12, 0.55);
    border-radius: 999px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .lpm-dot {
    width: 8px;
    height: 8px;
    padding: 0;
    border-radius: 50%;
    border: 0;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, width 0.3s;
  }
  .lpm-dot:hover { background: rgba(255, 255, 255, 0.65); }
  .lpm-dot.is-active {
    background: #FF5C2E;
    width: 22px;
    border-radius: 999px;
  }

  @media (max-width: 640px) {
    .lpm-frame { aspect-ratio: 4 / 3; border-radius: 14px; }
  }
`
