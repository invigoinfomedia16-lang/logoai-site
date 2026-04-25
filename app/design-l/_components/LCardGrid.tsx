// LCardGrid — universal card-grid layout for the L design system.
//
// Pass an array of children (or a `count` if you're rendering manually) and the
// grid resolves to the correct symmetric layout per the L design rules:
//
//    2-3 cards  → single row (grid-cols-2 / grid-cols-3)
//    4 cards    → 2×2     (grid-cols-1 sm:grid-cols-2)
//    6 cards    → 3×2     (grid-cols-1 sm:grid-cols-2 md:grid-cols-3)
//    8 cards    → 4×2     (grid-cols-2 md:grid-cols-4)
//    9 cards    → 3×3     (grid-cols-1 sm:grid-cols-3)
//   12 cards    → 4×3     (grid-cols-2 sm:grid-cols-3 md:grid-cols-4)
//   16 cards    → 4×4     (grid-cols-2 sm:grid-cols-3 md:grid-cols-4)
//   5,7 (odd)   → flex-wrap + justify-center (last orphan centers cleanly)
//   other       → flex-wrap fallback
//
// Usage:
//   <LCardGrid>{ITEMS.map(...)}</LCardGrid>
//   <LCardGrid maxWidth={820} gap="20px">{children}</LCardGrid>
//
// To customise per-card sizing for the flex-wrap fallback (odd counts), pass
// flexBasis / maxWidth / minWidth — they apply to each direct child.

import React from 'react'

type Props = {
  children: React.ReactNode
  /** Manual override; otherwise we count React.Children. */
  count?: number
  /** Container max-width (px or any CSS value). Default: undefined (no cap, controlled by parent). */
  maxWidth?: number | string
  /** Gap between cards. Default: '20px'. */
  gap?: string
  /** Per-card flex-basis for the flex-wrap fallback (odd counts). Default '280px'. */
  itemBasis?: string
  /** Per-card max-width for the flex-wrap fallback. Default 360. */
  itemMax?: number
  /** Per-card min-width for the flex-wrap fallback. Default 240. */
  itemMin?: number
  /** Optional extra Tailwind className (rare). */
  className?: string
}

const GRID_CLASSES: Record<number, string> = {
  2: 'grid grid-cols-1 sm:grid-cols-2',
  3: 'grid grid-cols-1 sm:grid-cols-3',
  4: 'grid grid-cols-1 sm:grid-cols-2',
  6: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  8: 'grid grid-cols-2 md:grid-cols-4',
  9: 'grid grid-cols-1 sm:grid-cols-3',
  12: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  16: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
}

export default function LCardGrid({
  children,
  count,
  maxWidth,
  gap = '20px',
  itemBasis = '280px',
  itemMax = 360,
  itemMin = 240,
  className = '',
}: Props) {
  const childArray = React.Children.toArray(children)
  const n = count ?? childArray.length

  // Even/symmetric counts → fixed responsive grid
  const gridClass = GRID_CLASSES[n]

  if (gridClass) {
    return (
      <div
        className={`${gridClass} ${className} mx-auto`}
        style={{ gap, maxWidth }}
      >
        {children}
      </div>
    )
  }

  // Odd or unknown counts → flex-wrap + justify-center; last orphan centers
  return (
    <div
      className={`flex flex-wrap justify-center ${className} mx-auto`}
      style={{ gap, maxWidth }}
    >
      {childArray.map((child, i) => (
        <div
          key={i}
          style={{
            flex: `1 1 ${itemBasis}`,
            maxWidth: itemMax,
            minWidth: itemMin,
            display: 'flex',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
