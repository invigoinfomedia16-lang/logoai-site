// Brand-colour options for the design-n landing-page colour toggle.
// Each option maps the six --m-brand* CSS variables that drive every CTA,
// accent, border tint and glow across design-n. The toggle swaps these
// inline on the .m-theme element; the layout re-applies the saved choice
// on every design-n page so a picked colour carries through the funnel.
//
// To swap a test colour, just change its six hex values below.

export type BrandVars = {
  brand: string   // primary — CTA background, brand text, active borders
  strong: string  // strong text accents (e.g. the "4.9/5" rating figure)
  deep: string    // CTA hover background
  soft: string    // light tint — soft backgrounds, hover borders
  bg: string      // page / funnel background (kept neutral across colours)
  glow: string    // lighter accent glow
}

export type BrandColorOption = {
  name: string
  vars: BrandVars
}

// Neutral funnel/hero background — same warm off-white for every colour so
// only the CTA + accents change (per request).
const NEUTRAL_BG = '#F0EEE6'

export const BRAND_COLORS: BrandColorOption[] = [
  {
    // Current design-n colour.
    name: 'Terracotta',
    vars: {
      brand: '#D97757',
      strong: '#C16545',
      deep: '#A85735',
      soft: '#F5E2DA',
      bg: NEUTRAL_BG,
      glow: '#E89A7E',
    },
  },
  {
    // design-l's exact Purple Heart CTA + accent treatment.
    name: 'Purple (L)',
    vars: {
      brand: '#7543E3',
      strong: '#6132BC',
      deep: '#5F2EB4',
      soft: '#EBE2FF',
      bg: NEUTRAL_BG,
      glow: '#C7A8FF',
    },
  },
  {
    // HEADSHOT's exact CTA blue (Tailwind blue-500/600/700), pulled from
    // HEADSHOT/DESIGN_TOKENS.md — --color-brand #2B7FFF is its primary CTA.
    name: 'Headshot Blue',
    vars: {
      brand: '#2B7FFF',
      strong: '#155DFC',
      deep: '#1447E6',
      soft: '#DBEAFE',
      bg: NEUTRAL_BG,
      glow: '#8EC5FF',
    },
  },
  {
    // Solid black CTA.
    name: 'Black',
    vars: {
      brand: '#1A1A1A',
      strong: '#000000',
      deep: '#000000',
      soft: '#E5E5E5',
      bg: NEUTRAL_BG,
      glow: '#525252',
    },
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
