'use client'

// Wordmark icon — concentric "target" mark next to "LOGO.AI" in the
// prelaunch header. Two variants the user can toggle between:
//
//   • 'white'  — all rings white (inherits currentColor from wordmark)
//   • 'purple' — all rings brand purple
//
// Both use thin 1px strokes. Choice persists in localStorage and is
// driven by MIconToggle (the minimal 2-swatch sandbox control).

import { useEffect, useState } from 'react'

export const ICON_STORAGE_KEY = 'm-prelaunch-icon-color'
export const ICON_CHANGE_EVENT = 'm-prelaunch-icon-color-change'

export type IconColor = 'white' | 'purple'
export const DEFAULT_ICON_COLOR: IconColor = 'white'

export default function MWordmarkIcon({ size = 28 }: { size?: number }) {
  const [color, setColor] = useState<IconColor>(DEFAULT_ICON_COLOR)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ICON_STORAGE_KEY) as IconColor | null
      if (saved === 'white' || saved === 'purple') setColor(saved)
    } catch {
      /* localStorage unavailable — default stays */
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<IconColor>).detail
      if (detail === 'white' || detail === 'purple') setColor(detail)
    }
    window.addEventListener(ICON_CHANGE_EVENT, handler)
    return () => window.removeEventListener(ICON_CHANGE_EVENT, handler)
  }, [])

  // Pure colours — bright pure-white (#FFFFFF) or the main brand purple
  // (--m-brand, #7543E3). Read as vivid against the dark background.
  const stroke = color === 'purple' ? 'var(--m-brand)' : '#FFFFFF'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" aria-hidden>
        <circle cx="12" cy="12" r="9.5" stroke={stroke} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6"   stroke={stroke} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.5" stroke={stroke} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="0.9" fill={stroke} />
      </svg>
    </span>
  )
}
