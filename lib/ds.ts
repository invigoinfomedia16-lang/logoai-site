/**
 * Design System Tokens — single source of truth.
 * Import from here. Never redeclare these inline.
 *
 * Usage:
 *   import { BLUE, BORDER, CARD } from '@/lib/ds'
 */

// ── Brand colour ──────────────────────────────────────────────────────
export const BLUE = 'rgb(0,0,255)'

// ── Borders ───────────────────────────────────────────────────────────
export const BORDER      = '1px solid rgba(84,87,94,0.3)'   // default section/card border
export const BLUE_BORDER = '1px solid rgba(0,0,255,0.3)'    // blue-tinted border
export const BLUE_BORDER_FAINT = '1px solid rgba(0,0,255,0.2)' // softer blue border

// ── Backgrounds ───────────────────────────────────────────────────────
export const CARD_BG        = 'rgba(255,255,255,0.015)' // default card / tinted section bg
export const BLUE_BG        = 'rgba(0,0,255,0.06)'      // blue-tinted card bg
export const BLUE_BG_SUBTLE = 'rgba(0,0,255,0.05)'      // even softer blue bg
export const BLUE_BG_LIGHT  = 'rgba(0,0,255,0.1)'       // avatar / badge fill

// ── Text opacity scale ────────────────────────────────────────────────
// Use ONLY these Tailwind classes. Do not invent new opacity values.
//
//   text-white          primary   — headings
//   text-white/55       secondary — body paragraphs
//   text-white/40       muted     — labels, captions, eyebrow overlines
//   text-white/25       faint     — decorative dots, minor decorative elements
//
// ❌ Do NOT use: /45 /50 /60 /65 /70 /80

// ── Section typography scale ──────────────────────────────────────────
// Hero h1:       clamp(36px, 5.5vw, 72px)
// Section h2:    clamp(28px, 3.5vw, 48px)
// Sub-section h2 (sidebar): 28px → 36px (text-[28px] md:text-[36px])
// Card h3:       text-base → text-lg (font-medium)
