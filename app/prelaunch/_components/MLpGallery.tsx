'use client'

// MLpGallery — experimental landing-page gallery (story-design-experiment
// branch). Same data hooks as MGallery (CATEGORIES, sub-categories, image
// set), but styled in the dark editorial palette used by /prelaunch on this
// branch. No search field, no "see all" toggle — the experiment keeps the
// gallery focused on the pill row + grid.

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, getCategoryImages, getSubCategories } from '@/data'

const POPULAR = CATEGORIES.filter((c) => c.isPopular)
const INITIAL = 12
const HIDDEN_COUNT = CATEGORIES.length - POPULAR.length

const ALL_KEY = '__all__'

export default function MLpGallery() {
  // Root ref — when the user collapses the expanded industry chips,
  // the chip block shrinks dramatically and their current scroll
  // position lands inside the next section (How It Works). After
  // collapsing we scroll the gallery back into view.
  const rootRef = useRef<HTMLDivElement>(null)
  const [cat, setCat] = useState<string>(POPULAR[0]?.key ?? 'restaurant')
  const subs = useMemo(() => getSubCategories(cat), [cat])
  // Default to the "All" pseudo-sub-pill so the user sees the broad
  // category result first and we never assume they want a specific type.
  const [sub, setSub] = useState<string>(ALL_KEY)
  const [expanded, setExpanded] = useState(false)
  const [gridKey, setGridKey] = useState(0)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setSub(ALL_KEY)
    setExpanded(false)
    setGridKey((k) => k + 1)
  }, [cat])

  const images = getCategoryImages(cat)
  const shown = expanded ? images : images.slice(0, INITIAL)
  const hasMore = images.length > INITIAL
  const catName = CATEGORIES.find((c) => c.key === cat)?.name ?? 'business'

  const trimmedQuery = query.trim().toLowerCase()
  const visibleCats = useMemo(() => {
    if (trimmedQuery) return CATEGORIES.filter((c) => c.name.toLowerCase().includes(trimmedQuery))
    const base = showAll ? CATEGORIES : POPULAR
    if (base.some((c) => c.key === cat)) return base
    const active = CATEGORIES.find((c) => c.key === cat)
    return active ? [active, ...base] : base
  }, [trimmedQuery, showAll, cat])

  const handleToggleShowAll = () => {
    const collapsing = showAll
    setShowAll((v) => !v)
    if (collapsing) {
      // Wait one frame so the DOM has reflowed at the smaller height
      // before scrolling — otherwise the browser scrolls to the
      // pre-collapse position of the gallery root, which is too high.
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <div className="lpg" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="lpg-search">
        <svg className="lpg-search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
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
        <p className="lpg-empty">No industries match &ldquo;{query}&rdquo;. Try a different term.</p>
      ) : (
        <div className="lpg-pills" data-expanded={showAll || !!trimmedQuery}>
          {visibleCats.map((c) => {
            const active = c.key === cat
            return (
              <button
                key={c.key}
                type="button"
                className={`lpg-pill${active ? ' is-active' : ''}`}
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
          className="lpg-seeall"
          onClick={handleToggleShowAll}
        >
          {showAll ? 'Show fewer' : `See all ${CATEGORIES.length} industries`}
        </button>
      )}

      {!trimmedQuery && subs.length > 0 && (
        <div className="lpg-subwrap">
          <div className="lpg-subpills">
            <button
              type="button"
              className={`lpg-subpill${sub === ALL_KEY ? ' is-active' : ''}`}
              onClick={() => { if (sub !== ALL_KEY) { setSub(ALL_KEY); setGridKey((k) => k + 1) } }}
            >
              All
            </button>
            {subs.map((s) => {
              const active = s.key === sub
              return (
                <button
                  key={s.key}
                  type="button"
                  className={`lpg-subpill${active ? ' is-active' : ''}`}
                  onClick={() => { if (!active) { setSub(s.key); setGridKey((k) => k + 1) } }}
                >
                  {s.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div key={gridKey} className="lpg-grid">
        {shown.map((src, i) => (
          <div key={src} className="lpg-tile" style={{ animationDelay: `${i * 0.04}s` }}>
            <Image
              src={src}
              alt={`AI-generated ${catName} logo example ${i + 1}`}
              width={1024}
              height={1024}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={85}
              loading={i < 4 ? 'eager' : 'lazy'}
              className="lpg-tile-img"
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="lpg-more">
          <p className="lpg-count">Showing {shown.length} of {images.length}</p>
          <button type="button" className="lpg-morebtn" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Show fewer' : `Show ${images.length - INITIAL} more logos`}
          </button>
        </div>
      )}
    </div>
  )
}

const STYLES = `
  .lpg { display: flex; flex-direction: column; gap: 22px; align-items: center; }

  .lpg-search {
    position: relative;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
  }
  .lpg-search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #7e7e8c;
    pointer-events: none;
  }
  .lpg-search input {
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
  .lpg-search input::placeholder { color: #7e7e8c; }
  .lpg-search input:focus { border-color: #7e7e8c; }

  .lpg-empty {
    color: #b8b8c4;
    font-size: 14px;
    margin: 0;
    padding: 8px 0;
  }

  .lpg-seeall {
    align-self: center;
    background: transparent;
    border: 0;
    padding: 4px 0;
    color: #b8b8c4;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    transition: color 0.15s ease;
  }
  .lpg-seeall:hover { color: #a855f7; }

  .lpg-pills, .lpg-subpills {
    display: flex; flex-wrap: wrap; gap: 10px;
    justify-content: center;
    width: 100%;
  }

  .lpg-subwrap {
    margin-top: 28px;
    display: flex; flex-direction: column; gap: 14px;
    align-items: center;
    width: 100%;
  }
  .lpg-shown-label {
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 13.5px;
    font-weight: 600;
    color: #b8b8c4;
    letter-spacing: 0.3px;
    margin: 0;
  }
  @media (max-width: 720px) {
    .lpg-pills, .lpg-subpills {
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
    }
    .lpg-pills::-webkit-scrollbar,
    .lpg-subpills::-webkit-scrollbar { display: none; }
    .lpg-pill, .lpg-subpill { flex-shrink: 0; }

    /* When "See all N industries" is tapped (or a search is active),
       drop the horizontal scroll and let the chips wrap to multiple
       rows so every industry is visible at once. */
    .lpg-pills[data-expanded="true"] {
      flex-wrap: wrap;
      overflow-x: visible;
      padding-bottom: 0;
    }
    .lpg-pills[data-expanded="true"] .lpg-pill { flex-shrink: 1; }
  }

  .lpg-pill {
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
  .lpg-pill:hover { border-color: #7e7e8c; color: #f4f4f6; }
  .lpg-pill.is-active {
    background: #7c3aed;
    border-color: #7c3aed;
    color: #ffffff;
    font-weight: 600;
  }

  .lpg-subpill {
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
  .lpg-subpill:hover { color: #f4f4f6; border-color: #7e7e8c; }
  .lpg-subpill.is-active {
    color: #a855f7;
    border-color: #a855f7;
    background: transparent;
    font-weight: 600;
  }

  .lpg-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 4px;
    width: 100%;
  }
  @media (max-width: 1024px) { .lpg-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 640px)  { .lpg-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }

  @keyframes lpgFade {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .lpg-tile {
    position: relative;
    aspect-ratio: 1;
    background: #141418;
    border: 1px solid #2a2a32;
    border-radius: 16px;
    overflow: hidden;
    opacity: 0;
    animation: lpgFade 0.5s cubic-bezier(0.23,1,0.32,1) forwards;
    transition: border-color 0.2s, transform 0.2s;
  }
  .lpg-tile:hover { border-color: #7c3aed; transform: translateY(-2px); }
  .lpg-tile img,
  .lpg-tile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lpg-more {
    display: flex; flex-direction: column; align-items: center;
    gap: 10px; margin-top: 8px;
    width: 100%;
  }
  .lpg-count {
    color: #7e7e8c;
    font-size: 13px;
    margin: 0;
  }
  .lpg-morebtn {
    background: transparent;
    border: 0;
    padding: 4px 0;
    color: #b8b8c4;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    transition: color 0.15s ease;
  }
  .lpg-morebtn:hover { color: #a855f7; }
  .lpg-arr { color: #a855f7; margin-right: 4px; }
`
