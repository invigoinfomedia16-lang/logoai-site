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
    // Electric Violet — vivid electric blue-violet #5A3FE6 picked to render
    // IDENTICALLY across browsers/displays. The earlier #0000FF / #3322EE
    // pushed the blue channel to 93–100%, which sits right at the edge of
    // the sRGB gamut — Chrome's display-p3 pipeline clipped that toward
    // purple while Firefox's sRGB pipeline kept it flat-blue. #5A3FE6
    // (R: 90, G: 63, B: 230 = 90% blue, but R+G also lifted) sits well
    // inside sRGB so no browser has to clip → same look everywhere.
    // Same dark surface base as the other sync.so toggles. Typography
    // inherits the global Mozilla. Scoped via [data-brand-color=
    // "electric-violet"] in layout.tsx.
    name: 'Electric Violet',
    vars: {
      // Balanced electric blue-violet — renders consistently across browsers.
      brand: '#5A3FE6',
      strong: '#8B7BF6',
      // CTA hover — a stop deeper.
      deep: '#4128C2',
      // Featured-review border + soft-brand surfaces — kept near-black
      // so the card edge reads as "almost not there".
      soft: '#161616',
      // Alternating section / card background — barely a percent off
      // pure black.
      bg: '#060607',
      glow: '#8B7BF6',
      onDark: '#8B7BF6',
      // Flat pure-black hero (matches the sync.so site background).
      heroTint: '#000000',
    },
    // Half pure-black / half electric-violet — signals dark theme + CTA.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #5A3FE6 52%, #5A3FE6 100%)',
    hideHeroCarousel: true,
  },
  {
    // Soft Violet — a friendlier sibling of Electric Violet, picked to feel
    // more "premium SaaS" (Stripe / Linear) than "electric / Loop". #7A6BFA
    // sits in the same gamut-stable zone (R: 122, G: 107, B: 250 — no
    // channel at the saturated edge) so it renders identically across
    // browsers. Same dark surface base as the other sync.so toggles;
    // typography inherits the global Mozilla. Scoped via
    // [data-brand-color="soft-violet"] in layout.tsx.
    name: 'Soft Violet',
    vars: {
      // Lighter, friendlier purple-violet.
      brand: '#7A6BFA',
      strong: '#B4ACFE',
      // CTA hover — a stop deeper.
      deep: '#5F4FDE',
      // Featured-review border + soft-brand surfaces — kept near-black so
      // the card edge reads as "almost not there".
      soft: '#161616',
      // Alternating section / card background — barely a percent off pure
      // black, so the lift is just perceptible.
      bg: '#060607',
      glow: '#B4ACFE',
      onDark: '#B4ACFE',
      // Flat pure-black hero (matches the sync.so site background).
      heroTint: '#000000',
    },
    // Half pure-black / half soft-violet — signals dark theme + CTA.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #7A6BFA 52%, #7A6BFA 100%)',
    hideHeroCarousel: true,
  },
  {
    // Bright Vermillion — a punchier, more energetic sibling of the
    // original #E7420F vermillion. Same warm orange-red family but
    // lifted toward "startup orange" — closer to HubSpot / modern SaaS
    // energy. Cross-browser stable (R: 255 sits at the edge but the
    // hue stays warm enough that display-p3 doesn't shift it). Same
    // dark surface base as the other sync.so toggles; typography
    // inherits the global Mozilla. Scoped via
    // [data-brand-color="bright-vermillion"] in layout.tsx.
    name: 'Bright Vermillion',
    vars: {
      // Brighter, more energetic vermillion.
      brand: '#FF5A1F',
      strong: '#FF9472',
      // CTA hover — a stop deeper.
      deep: '#D14515',
      // Featured-review border + soft-brand surfaces — kept near-black
      // so the card edge reads as "almost not there".
      soft: '#161616',
      // Alternating section / card background — barely a percent off
      // pure black.
      bg: '#060607',
      glow: '#FF9472',
      onDark: '#FF9472',
      // Flat pure-black hero.
      heroTint: '#000000',
    },
    // Half pure-black / half bright vermillion — signals dark theme + CTA.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #FF5A1F 52%, #FF5A1F 100%)',
    hideHeroCarousel: true,
  },
  {
    // Charcoal Vermillion — same #FF5A1F CTA as Bright Vermillion, but
    // sitting on Purple Black's softer charcoal base (#050505 surface,
    // #0A0A0A card) instead of pure black. The slightly-warmer charcoal
    // reads a hair less "void" than the pure-black toggles — more like a
    // matte-black product photo than a stage curtain. Cross-browser stable.
    // Typography inherits the global Mozilla. Scoped via
    // [data-brand-color="charcoal-vermillion"] in layout.tsx.
    name: 'Charcoal Vermillion',
    vars: {
      brand: '#FF5A1F',
      strong: '#FF9472',
      deep: '#D14515',
      // Featured-review border + soft-brand surfaces — kept near-black
      // so the card edge reads as "almost not there".
      soft: '#161616',
      // Alternating section / card background — Purple Black's
      // subtle-lift value, a couple stops above the #050505 page base.
      bg: '#0A0A0A',
      glow: '#FF9472',
      onDark: '#FF9472',
      // Hero / page base — Purple Black's softer charcoal, not pure black.
      heroTint: '#050505',
    },
    // Half charcoal / half bright vermillion — signals charcoal theme + CTA.
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #FF5A1F 52%, #FF5A1F 100%)',
    hideHeroCarousel: true,
  },
  {
    // Charcoal Violet — Electric Violet's #5A3FE6 CTA on Purple Black's
    // softer charcoal base (#050505 / #0A0A0A) instead of pure black. The
    // slightly-warmer charcoal reads a hair less "void" than the pure-
    // black toggles — same logic as Charcoal Vermillion, just with the
    // gamut-stable electric violet hue. Cross-browser stable. Typography
    // inherits the global Mozilla. Scoped via [data-brand-color=
    // "charcoal-violet"] in layout.tsx.
    name: 'Charcoal Violet',
    vars: {
      brand: '#5A3FE6',
      strong: '#8B7BF6',
      deep: '#4128C2',
      // Featured-review border + soft-brand surfaces — kept near-black
      // so the card edge reads as "almost not there".
      soft: '#161616',
      // Alternating section / card background — Purple Black's
      // subtle-lift value, a couple stops above the #050505 page base.
      bg: '#0A0A0A',
      glow: '#8B7BF6',
      onDark: '#8B7BF6',
      // Hero / page base — Purple Black's softer charcoal, not pure black.
      heroTint: '#050505',
    },
    // Half charcoal / half electric violet — signals charcoal theme + CTA.
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #5A3FE6 52%, #5A3FE6 100%)',
    hideHeroCarousel: true,
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
