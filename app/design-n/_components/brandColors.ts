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
    // Purple Black — a DARK theme on the Freepik base: a much-darker
    // near-pure-black background (#050505) paired with design-L's purple
    // #7543E3 CTA. Dark surfaces / text / borders are applied via the scoped
    // [data-brand-color="purple-black"] block in layout.tsx.
    name: 'Purple Black',
    vars: {
      brand: '#7543E3',
      strong: '#A98BF0',
      deep: '#5F2EB4',
      // Featured-review border + soft-brand surfaces — near-black so card
      // edges read as "almost not there" (matches the sync.so / Orange
      // treatment applied site-wide).
      soft: '#161616',
      // Alternating tinted / card background — barely a percent off the
      // page base (#050505), so the lift is just perceptible.
      bg: '#0A0A0A',
      glow: '#A98BF0',
      onDark: '#A98BF0',
      // Flat near-pure-black hero (matches the surface).
      heroTint: '#050505',
    },
    // Half black / half purple — signals the dark theme + the CTA colour.
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #7543E3 52%, #7543E3 100%)',
    hideHeroCarousel: true,
  },
  {
    // Vermillion Black — a DARK theme on the Freepik base: true pure-black
    // #000000 surfaces (neutral, no warmth) paired with the vermillion
    // #E7420F CTA. A stark sibling of the warm-toned Vermillion toggle;
    // dark surfaces / text / borders are applied via the scoped
    // [data-brand-color="vermillion-black"] block in layout.tsx.
    name: 'Vermillion Black',
    vars: {
      brand: '#E7420F',
      strong: '#F4926F',
      deep: '#AE320A',
      // Featured-review border + soft-brand surfaces — near-black so card
      // edges read as "almost not there" (matches the sync.so / Orange
      // treatment applied site-wide).
      soft: '#161616',
      // Alternating tinted / card background — barely a percent off pure
      // black, so the lift is just perceptible.
      bg: '#060607',
      glow: '#F4926F',
      onDark: '#F4926F',
      // Flat true pure-black hero (matches the surface).
      heroTint: '#000000',
    },
    // Half pure-black / half vermillion — signals the dark theme + CTA colour.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #E7420F 52%, #E7420F 100%)',
    hideHeroCarousel: true,
  },
  {
    // sync.so — colours mirrored from the live Framer-built Logo.AI project
    // (understanding-peach-071478.framer.app). Pure-black #000000 surfaces
    // with Framer's exact card tint (#0F1012), Framer's grey scale
    // (#B3B3B3 / #717171), and Framer's exact CTA blue #0000FF (sampled
    // from the live button via Framer's colour picker). Typography stays
    // our Mozilla Headline + Mozilla Text (inherited from the global
    // root — Framer's font stack is intentionally NOT used). Scoped via
    // [data-brand-color="sync-so"] in layout.tsx.
    name: 'sync.so',
    vars: {
      // Framer's exact CTA blue.
      brand: '#0000FF',
      strong: '#7A7AFF',
      // CTA hover — slightly darker blue.
      deep: '#0000CC',
      // Featured-review border + soft-brand surfaces — near-black so card
      // edges read as "almost not there" (matches the sync.so Orange
      // treatment applied site-wide).
      soft: '#161616',
      // Alternating section / card background — barely a percent off pure
      // black, so the lift is just perceptible.
      bg: '#060607',
      glow: '#7A7AFF',
      onDark: '#7A7AFF',
      // Flat pure-black hero (matches Framer's site background).
      heroTint: '#000000',
    },
    // Half pure-black / half electric-blue — signals the dark theme + CTA colour.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #0000FF 52%, #0000FF 100%)',
    hideHeroCarousel: true,
  },
  {
    // sync.so Orange — built on the same Framer / sync.so dark-surface base
    // as the sync.so toggle, but with sync.so's "Flush Orange" #FF7700 CTA
    // (sampled from their Figma design file — variable color/orange/50 /
    // sync.so/Flush Orange). Surface and border tokens mirror their Figma:
    // grey/7 #121213 surface, grey/14 #222225 border, grey/83 #D4D4D4 and
    // grey/65 #A1A1AA text. Typography stays our Mozilla Headline +
    // Mozilla Text (inherited from the global root — sync.so's Satoshi is
    // intentionally NOT used). Scoped via [data-brand-color="sync-so-orange"]
    // in layout.tsx.
    name: 'sync.so Orange',
    vars: {
      // sync.so's exact Flush Orange CTA.
      brand: '#FF7700',
      strong: '#FFA866',
      // CTA hover — a stop darker.
      deep: '#CC5F00',
      // Featured-review border + soft-brand surfaces — kept near-black
      // so the card edge reads as "almost not there", matching sync.so's
      // own pages where the featured card barely lifts off the page.
      soft: '#161616',
      // Alternating section / card background — barely a percent off
      // pure black. sync.so's reference shows cards as an "almost not
      // there" fill; anything visibly grey reads as too lifted.
      bg: '#060607',
      glow: '#FFA866',
      onDark: '#FFA866',
      // Flat pure-black hero (matches the sync.so site background).
      heroTint: '#000000',
    },
    // Half pure-black / half flush-orange — signals dark theme + CTA colour.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #FF7700 52%, #FF7700 100%)',
    hideHeroCarousel: true,
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
