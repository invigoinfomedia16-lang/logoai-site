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

// CTA family — used by NColorToggle to lay out all purple swatches on
// one row and all orange/vermillion swatches on another. Purely a UI
// grouping; doesn't affect what the toggle does.
export type BrandColorFamily = 'purple' | 'orange'

export type BrandColorOption = {
  name: string
  vars: BrandVars
  // Optional swatch background for the toggle dot — defaults to vars.brand.
  // Used when the brand colour alone doesn't represent the theme (e.g. a
  // gradient theme whose brand is black).
  swatch?: string
  // When true, this colour hides the hero logo carousel on the landing page.
  hideHeroCarousel?: boolean
  // CTA family (purple vs orange). Drives the toggle's two-row layout.
  family: BrandColorFamily
}

// The default (current) design-n colour is terracotta — defined in the
// layout's <style> block, not here. The toggle offers the 3 alternatives
// below; "Reset" returns to that terracotta default.
export const BRAND_COLORS: BrandColorOption[] = [
  {
    // Purple Pure Black — design-L's #7543E3 CTA on a true pure-black base
    // (#000000 page, #060607 cards). Hairline borders. Typography inherits
    // the global Mozilla. Scoped via
    // [data-brand-color="purple-pure-black"] in layout.tsx.
    name: 'Purple Pure Black',
    vars: {
      brand: '#7543E3',
      strong: '#A98BF0',
      deep: '#5F2EB4',
      soft: '#161616',
      bg: '#060607',
      glow: '#A98BF0',
      onDark: '#A98BF0',
      heroTint: '#000000',
    },
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #7543E3 52%, #7543E3 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Purple Freepik — #7543E3 CTA on the old Freepik graphite base
    // (#0D0D0D page, #18181B cards) — a more "lifted" dark-grey feel
    // than charcoal, closer to Linear / Vercel-docs grey. Visible borders
    // (#2A2A2A) since hairlines would disappear into the lifted cards.
    // Scoped via [data-brand-color="purple-freepik"] in layout.tsx.
    name: 'Purple Freepik',
    vars: {
      brand: '#7543E3',
      strong: '#A98BF0',
      deep: '#5F2EB4',
      soft: '#2A2A2A',
      bg: '#18181B',
      glow: '#A98BF0',
      onDark: '#A98BF0',
      heroTint: '#0D0D0D',
    },
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #7543E3 52%, #7543E3 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Purple Charcoal — #7543E3 CTA on Purple Black's softer charcoal base
    // (#050505 page, #0A0A0A cards). Reads a hair less "void" than the
    // pure-black variant. Scoped via
    // [data-brand-color="purple-charcoal"] in layout.tsx.
    name: 'Purple Charcoal',
    vars: {
      brand: '#7543E3',
      strong: '#A98BF0',
      deep: '#5F2EB4',
      soft: '#161616',
      bg: '#0A0A0A',
      glow: '#A98BF0',
      onDark: '#A98BF0',
      heroTint: '#050505',
    },
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #7543E3 52%, #7543E3 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Vermillion Black — a DARK theme on the Freepik base: true pure-black
    // #000000 surfaces (neutral, no warmth) paired with the vermillion
    // #E7420F CTA. A stark sibling of the warm-toned Vermillion toggle;
    // dark surfaces / text / borders are applied via the scoped
    // [data-brand-color="vermillion-black"] block in layout.tsx.
    name: 'Vermillion Pure Black',
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
    family: 'orange',
  },
  {
    // Vermillion Freepik — Vermillion Black's #E7420F CTA on the old
    // Freepik graphite base (#0D0D0D page, #18181B cards). More "lifted"
    // / grey than charcoal; visible borders since the cards aren't
    // hugging the page. Typography inherits the global Mozilla.
    // Scoped via [data-brand-color="vermillion-freepik"] in layout.tsx.
    name: 'Vermillion Freepik',
    vars: {
      brand: '#E7420F',
      strong: '#F4926F',
      deep: '#AE320A',
      // Featured-review border + soft-brand surfaces — sits between the
      // page (#0D0D0D) and the card (#18181B) so it reads as a soft tint.
      soft: '#2A2A2A',
      // Alternating section / card background — Freepik's exact graphite
      // card tint (#18181B).
      bg: '#18181B',
      glow: '#F4926F',
      onDark: '#F4926F',
      // Hero / page base — Freepik's graphite.
      heroTint: '#0D0D0D',
    },
    // Half graphite / half vermillion — signals the graphite theme + CTA.
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #E7420F 52%, #E7420F 100%)',
    hideHeroCarousel: true,
    family: 'orange',
  },
  {
    // Vermillion Charcoal — Vermillion Black's #E7420F CTA on Purple
    // Black's softer charcoal base (#050505 / #0A0A0A) instead of pure
    // black. The slightly-warmer charcoal reads a hair less "void" than
    // the pure-black toggles — same logic as Charcoal Vermillion (with
    // the brighter #FF5A1F) and Charcoal Violet, just with the deeper
    // original vermillion hue. Typography inherits the global Mozilla.
    // Scoped via [data-brand-color="vermillion-charcoal"] in layout.tsx.
    name: 'Vermillion Charcoal',
    vars: {
      brand: '#E7420F',
      strong: '#F4926F',
      deep: '#AE320A',
      // Featured-review border + soft-brand surfaces — kept near-black
      // so the card edge reads as "almost not there".
      soft: '#161616',
      // Alternating section / card background — Purple Black's
      // subtle-lift value, a couple stops above the #050505 page base.
      bg: '#0A0A0A',
      glow: '#F4926F',
      onDark: '#F4926F',
      // Hero / page base — Purple Black's softer charcoal, not pure black.
      heroTint: '#050505',
    },
    // Half charcoal / half vermillion — signals charcoal theme + CTA.
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #E7420F 52%, #E7420F 100%)',
    hideHeroCarousel: true,
    family: 'orange',
  },
  {
    // Electric Violet — vivid electric blue-violet #5A3FE6 picked to render
    // IDENTICALLY across browsers/displays. The earlier #0000FF / #3322EE
    // pushed the blue channel to 93–100%, which sits right at the edge of
    // the sRGB gamut — Chrome's display-p3 pipeline clipped that toward
    // purple while Firefox's sRGB pipeline kept it flat-blue. #5A3FE6
    // (R: 90, G: 63, B: 230) sits well inside sRGB so no browser has to
    // clip → same look everywhere. This is the pure-black base of the
    // Electric Violet trio (Black / Freepik / Charcoal). Typography
    // inherits the global Mozilla. Scoped via
    // [data-brand-color="electric-violet"] in layout.tsx.
    name: 'Electric Violet Pure Black',
    vars: {
      brand: '#5A3FE6',
      strong: '#8B7BF6',
      deep: '#4128C2',
      soft: '#161616',
      bg: '#060607',
      glow: '#8B7BF6',
      onDark: '#8B7BF6',
      heroTint: '#000000',
    },
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #5A3FE6 52%, #5A3FE6 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Electric Violet Freepik — #5A3FE6 CTA on the old Freepik graphite
    // base (#0D0D0D page, #18181B cards). Visible borders since the cards
    // aren't hugging the page. Scoped via
    // [data-brand-color="electric-violet-freepik"] in layout.tsx.
    name: 'Electric Violet Freepik',
    vars: {
      brand: '#5A3FE6',
      strong: '#8B7BF6',
      deep: '#4128C2',
      // Featured-review border — sits between the page and the card so it
      // reads as a soft tint on the Freepik graphite base.
      soft: '#2A2A2A',
      // Freepik card tint.
      bg: '#18181B',
      glow: '#8B7BF6',
      onDark: '#8B7BF6',
      heroTint: '#0D0D0D',
    },
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #5A3FE6 52%, #5A3FE6 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Electric Violet Charcoal — #5A3FE6 CTA on Purple Black's softer
    // charcoal base (#050505 / #0A0A0A). Reads a hair less "void" than
    // the pure-black variant. Was previously named "Charcoal Violet";
    // renamed for consistency with the Electric Violet trio. Scoped via
    // [data-brand-color="electric-violet-charcoal"] in layout.tsx.
    name: 'Electric Violet Charcoal',
    vars: {
      brand: '#5A3FE6',
      strong: '#8B7BF6',
      deep: '#4128C2',
      soft: '#161616',
      // Charcoal card tint.
      bg: '#0A0A0A',
      glow: '#8B7BF6',
      onDark: '#8B7BF6',
      heroTint: '#050505',
    },
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #5A3FE6 52%, #5A3FE6 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Soft Violet — a friendlier sibling of Electric Violet, picked to feel
    // more "premium SaaS" (Stripe / Linear) than "electric / Loop". #7A6BFA
    // sits in the same gamut-stable zone (R: 122, G: 107, B: 250) so it
    // renders identically across browsers. This is the pure-black base of
    // the Soft Violet trio (Black / Freepik / Charcoal). Typography
    // inherits the global Mozilla. Scoped via
    // [data-brand-color="soft-violet"] in layout.tsx.
    name: 'Soft Violet Pure Black',
    vars: {
      brand: '#7A6BFA',
      strong: '#B4ACFE',
      deep: '#5F4FDE',
      soft: '#161616',
      bg: '#060607',
      glow: '#B4ACFE',
      onDark: '#B4ACFE',
      heroTint: '#000000',
    },
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #7A6BFA 52%, #7A6BFA 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Soft Violet Freepik — #7A6BFA CTA on the Freepik graphite base.
    // Scoped via [data-brand-color="soft-violet-freepik"] in layout.tsx.
    name: 'Soft Violet Freepik',
    vars: {
      brand: '#7A6BFA',
      strong: '#B4ACFE',
      deep: '#5F4FDE',
      soft: '#2A2A2A',
      bg: '#18181B',
      glow: '#B4ACFE',
      onDark: '#B4ACFE',
      heroTint: '#0D0D0D',
    },
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #7A6BFA 52%, #7A6BFA 100%)',
    hideHeroCarousel: true,
    family: 'purple',
  },
  {
    // Soft Violet Charcoal — #7A6BFA CTA on Purple Black's charcoal base.
    // Scoped via [data-brand-color="soft-violet-charcoal"] in layout.tsx.
    name: 'Soft Violet Charcoal',
    vars: {
      brand: '#7A6BFA',
      strong: '#B4ACFE',
      deep: '#5F4FDE',
      soft: '#161616',
      bg: '#0A0A0A',
      glow: '#B4ACFE',
      onDark: '#B4ACFE',
      heroTint: '#050505',
    },
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #7A6BFA 52%, #7A6BFA 100%)',
    hideHeroCarousel: true,
    family: 'purple',
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
    name: 'Bright Vermillion Pure Black',
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
    family: 'orange',
  },
  {
    // Bright Vermillion Freepik — #FF5A1F CTA on Freepik graphite base.
    // Scoped via [data-brand-color="bright-vermillion-freepik"] in
    // layout.tsx.
    name: 'Bright Vermillion Freepik',
    vars: {
      brand: '#FF5A1F',
      strong: '#FF9472',
      deep: '#D14515',
      soft: '#2A2A2A',
      bg: '#18181B',
      glow: '#FF9472',
      onDark: '#FF9472',
      heroTint: '#0D0D0D',
    },
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #FF5A1F 52%, #FF5A1F 100%)',
    hideHeroCarousel: true,
    family: 'orange',
  },
  {
    // Bright Vermillion Charcoal — same #FF5A1F CTA as Bright Vermillion
    // Pure Black, but on Purple Black's softer charcoal base (#050505
    // surface, #0A0A0A card). Cross-browser stable. Typography inherits
    // the global Mozilla. Scoped via
    // [data-brand-color="bright-vermillion-charcoal"] in layout.tsx.
    name: 'Bright Vermillion Charcoal',
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
    family: 'orange',
  },
  {
    // Terracotta Pure Black — design-n's default terracotta #D97757 CTA
    // (the colour shown on Reset) on a true pure-black base (#000000 /
    // #060607). The terracotta usually sits on a warm off-white page;
    // this variant flips it onto pure black so the warm coral pops as a
    // single bright accent. Scoped via
    // [data-brand-color="terracotta-pure-black"] in layout.tsx.
    name: 'Terracotta Pure Black',
    vars: {
      brand: '#D97757',
      strong: '#C16545',
      deep: '#A85735',
      soft: '#161616',
      bg: '#060607',
      glow: '#E89A7E',
      onDark: '#E89A7E',
      heroTint: '#000000',
    },
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #D97757 52%, #D97757 100%)',
    hideHeroCarousel: true,
    family: 'orange',
  },
  {
    // Terracotta Freepik — #D97757 CTA on Freepik's graphite base
    // (#0D0D0D / #18181B). Visible borders. Scoped via
    // [data-brand-color="terracotta-freepik"] in layout.tsx.
    name: 'Terracotta Freepik',
    vars: {
      brand: '#D97757',
      strong: '#C16545',
      deep: '#A85735',
      soft: '#2A2A2A',
      bg: '#18181B',
      glow: '#E89A7E',
      onDark: '#E89A7E',
      heroTint: '#0D0D0D',
    },
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #D97757 52%, #D97757 100%)',
    hideHeroCarousel: true,
    family: 'orange',
  },
  {
    // Terracotta Charcoal — #D97757 CTA on Purple Black's charcoal base
    // (#050505 / #0A0A0A). Scoped via
    // [data-brand-color="terracotta-charcoal"] in layout.tsx.
    name: 'Terracotta Charcoal',
    vars: {
      brand: '#D97757',
      strong: '#C16545',
      deep: '#A85735',
      soft: '#161616',
      bg: '#0A0A0A',
      glow: '#E89A7E',
      onDark: '#E89A7E',
      heroTint: '#050505',
    },
    swatch:
      'linear-gradient(135deg, #050505 0%, #050505 48%, #D97757 52%, #D97757 100%)',
    hideHeroCarousel: true,
    family: 'orange',
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
