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

// ── CTA Button spec (source of truth — matches reference HTML exactly) ──
//
// PRIMARY button (hero — larger):
//   background:    BLUE  →  rgb(0,0,255)
//   borderRadius:  12px
//   padding:       clamp(20px,2.5vw,28px) clamp(28px,4vw,52px)
//   fontSize:      clamp(18px,1.8vw,22px)
//   fontWeight:    600
//   color:         #fff
//
// PRIMARY button (inner pages / section CTAs):
//   background:    BLUE  →  rgb(0,0,255)
//   borderRadius:  12px
//   padding:       clamp(18px,2vw,24px) clamp(24px,3vw,40px)
//   fontSize:      clamp(18px,1.8vw,20px)
//   fontWeight:    600
//   color:         #fff
//
// SECTION CTA button (CTASection at page bottom):
//   same colour, borderRadius: 12px
//   padding:       clamp(14px,2vw,20px) clamp(20px,3vw,32px)
//   fontSize:      clamp(18px,1.8vw,20px)
//   fontWeight:    600
//
// OUTLINE button (Navbar, contact links):
//   background:    transparent
//   border:        1px solid rgba(255,255,255,0.2)
//   borderRadius:  8px
//   padding:       12px 24px
//   fontSize:      16px
//   fontWeight:    500
//   hover:         background #fff, color #000

// ── Section typography scale ──────────────────────────────────────────
// Hero h1:       clamp(36px, 5.5vw, 72px)
// Section h2:    clamp(28px, 3.5vw, 48px)
// Sub-section h2 (sidebar): 28px → 36px (text-[28px] md:text-[36px])
// Card h3:       text-base → text-lg (font-medium)
