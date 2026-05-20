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
  bg: string      // tinted section / funnel background (matches the brand)
  glow: string    // lighter accent glow
}

export type BrandColorOption = {
  name: string
  vars: BrandVars
}

// The default (current) design-n colour is terracotta — defined in the
// layout's <style> block, not here. The toggle offers the 3 alternatives
// below; "Reset" returns to that terracotta default.
export const BRAND_COLORS: BrandColorOption[] = [
  {
    // design-l's exact Purple Heart CTA + accent treatment.
    // bg = design-l's own alt-section lavender.
    name: 'Purple (L)',
    vars: {
      brand: '#7543E3',
      strong: '#6132BC',
      deep: '#5F2EB4',
      soft: '#EBE2FF',
      bg: '#F5F0FF',
      glow: '#C7A8FF',
    },
  },
  {
    // HEADSHOT's exact CTA blue (Tailwind blue-500/600/700), pulled from
    // HEADSHOT/DESIGN_TOKENS.md — --color-brand #2B7FFF is its primary CTA,
    // --color-brand-bg #EFF6FF its tinted section background.
    name: 'Headshot Blue',
    vars: {
      brand: '#2B7FFF',
      strong: '#155DFC',
      deep: '#1447E6',
      soft: '#DBEAFE',
      bg: '#EFF6FF',
      glow: '#8EC5FF',
    },
  },
  {
    // Solid black CTA — neutral light-grey section tint.
    name: 'Black',
    vars: {
      brand: '#1A1A1A',
      strong: '#000000',
      deep: '#000000',
      soft: '#E5E5E5',
      bg: '#F2F2F1',
      glow: '#525252',
    },
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
