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
  bg: string      // tinted section / funnel background — may be a gradient
  glow: string    // lighter accent glow
  onDark: string  // brand accent on dark backgrounds (e.g. footer logo dot)
  // Optional full hero background override (e.g. a gradient). When set it
  // replaces the hero's default tint→white fade; when omitted, that fade
  // is used — so colours without it leave the hero unchanged.
  heroTint?: string
}

export type BrandColorOption = {
  name: string
  vars: BrandVars
  // Optional swatch background for the toggle dot — defaults to vars.brand.
  // Used when the brand colour alone doesn't represent the theme (e.g. a
  // gradient theme whose brand is black).
  swatch?: string
  // When true, this colour hides the hero logo carousel on the landing page.
  hideHeroCarousel?: boolean
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
      onDark: '#7543E3',
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
      onDark: '#2B7FFF',
    },
  },
  {
    // Vermillion orange-red CTA (requested exact brand hex #E7420F).
    name: 'Vermillion',
    vars: {
      brand: '#E7420F',
      strong: '#C8390C',
      deep: '#AE320A',
      soft: '#FCE3DB',
      bg: '#FDF0EB',
      glow: '#F4926F',
      onDark: '#E7420F',
    },
  },
  {
    // Solid black CTA — neutral light-grey section tint. onDark is white
    // so the footer logo dot stays visible on the dark footer.
    name: 'Black',
    vars: {
      brand: '#1A1A1A',
      strong: '#000000',
      deep: '#000000',
      soft: '#E5E5E5',
      bg: '#F2F2F1',
      glow: '#525252',
      onDark: '#FFFFFF',
    },
  },
  {
    // Character.AI Safety Center palette (from the Figma capture). The
    // design is black + white with a soft pastel radial gradient as its
    // tint — cyan #C6F9FF → pink #F2D0FF → cream #FFFDEA (the exact stops
    // from the Figma "Topics" section). CTAs are pure black; surfaces white.
    name: 'Character.AI',
    vars: {
      brand: '#000000',
      strong: '#000000',
      deep: '#000000',
      soft: '#ECE3F5',
      bg: 'radial-gradient(130% 130% at 15% 0%, #C6F9FF 0%, #F2D0FF 50%, #FFFDEA 100%)',
      glow: '#6E6E6E',
      onDark: '#FFFFFF',
      heroTint: 'radial-gradient(130% 130% at 15% 0%, #C6F9FF 0%, #F2D0FF 50%, #FFFDEA 100%)',
    },
    swatch: 'radial-gradient(130% 130% at 15% 0%, #C6F9FF 0%, #F2D0FF 50%, #FFFDEA 100%)',
    hideHeroCarousel: true,
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
