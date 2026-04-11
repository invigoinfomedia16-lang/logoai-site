/**
 * Design System Tokens — single source of truth.
 * Import from here. Never redeclare these inline.
 *
 * Usage:
 *   import { BLUE, BORDER, CARD } from '@/lib/ds'
 */

// ── Brand colour ──────────────────────────────────────────────────────
export const BLUE = '#336AEA'

// ── Backgrounds ───────────────────────────────────────────────────────
export const SITE_BG        = '#0D0D0D'
export const CARD_BG        = 'rgba(245,245,245,0.015)' // default card / tinted section bg
export const INPUT_BG       = '#2B2B2B'                  // form input backgrounds
export const BLUE_BG        = 'rgba(51,106,234,0.06)'   // blue-tinted card bg
export const BLUE_BG_SUBTLE = 'rgba(51,106,234,0.05)'   // even softer blue bg
export const BLUE_BG_LIGHT  = 'rgba(51,106,234,0.1)'    // avatar / badge fill

// ── Borders ───────────────────────────────────────────────────────────
export const BORDER      = '1px solid rgba(84,87,94,0.3)'      // default section/card border
export const BLUE_BORDER = '1px solid rgba(51,106,234,0.3)'    // blue-tinted border
export const BLUE_BORDER_FAINT = '1px solid rgba(51,106,234,0.2)' // softer blue border

// ── Text colours (Figma hex codes) ────────────────────────────────────
// Use these exact values. Do NOT use opacity-based text-white/xx.
//
//   #F5F5F5   primary   — headings, strong text
//   #AAAAAA   secondary — body paragraphs, muted text
//   #777777   subtle    — labels, captions, placeholders
//   #C5C5C5   nav       — navigation links
//   #648EEF   accent    — badge icons, highlights
//   #336AEA   cta       — buttons, links

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
