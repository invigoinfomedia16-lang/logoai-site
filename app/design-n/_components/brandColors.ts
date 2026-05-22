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
      // Neutral dark — the "soft brand" surface (selected chips, hover).
      soft: '#262626',
      // Alternating tinted / card background — a hair off the base.
      bg: '#0F0F0F',
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
    // Freepik design — a full DARK theme. Colours pulled from
    // public/freepik-exact.html: primary CTA #336AEA, darker #1A4FD0,
    // lighter #648EEF, near-black #0D0D0D background. A toggle's vars only
    // carry the brand colours; the dark surfaces / text / borders are
    // applied via the scoped [data-brand-color="freepik"] block in
    // layout.tsx, so no other toggle or the default is affected.
    name: 'Freepik',
    vars: {
      brand: '#336AEA',
      strong: '#648EEF',
      deep: '#1A4FD0',
      // Dark navy — the "soft brand" surface (selected chips, hover tints)
      // on the dark theme.
      soft: '#1C2741',
      // Alternating tinted-section background — a hair off the #0D0D0D base.
      bg: '#141414',
      glow: '#648EEF',
      onDark: '#648EEF',
      // Flat #0D0D0D hero (no gradient) so the hero, the nav bar and the
      // rest of the site all read as one uniform colour.
      heroTint: '#0D0D0D',
    },
    // Half near-black / half blue — signals the dark theme + blue accent.
    swatch:
      'linear-gradient(135deg, #0D0D0D 0%, #0D0D0D 48%, #336AEA 52%, #336AEA 100%)',
    hideHeroCarousel: true,
  },
  {
    // Vermillion — a DARK theme built on the Freepik base: a warm near-black
    // surface (a faint vermillion warmth mixed into the black) paired with
    // the vermillion #E7420F CTA. Dark surfaces / text / borders are applied
    // via the scoped [data-brand-color="vermillion"] block in layout.tsx.
    name: 'Vermillion',
    vars: {
      brand: '#E7420F',
      strong: '#F4926F',
      deep: '#AE320A',
      // Neutral-warm dark — the "soft brand" surface (selected chips, hover).
      soft: '#2A211D',
      // Alternating tinted / card background — a hair off the base.
      bg: '#15100E',
      glow: '#F4926F',
      onDark: '#F4926F',
      // Flat warm near-black hero (matches the surface).
      heroTint: '#100C0A',
    },
    // Half warm-dark / half vermillion — signals the dark theme + CTA colour.
    swatch:
      'linear-gradient(135deg, #100C0A 0%, #100C0A 48%, #E7420F 52%, #E7420F 100%)',
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
      // Neutral dark — the "soft brand" surface (selected chips, hover).
      soft: '#222222',
      // Alternating tinted / card background — a hair off the pure-black base.
      bg: '#0C0C0C',
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
    // Framer — a DARK, fully monochrome theme on the Freepik base: a
    // pure-black background (#000000, Framer's site black) with an
    // exact-white #FFFFFF CTA (white fill, black text). Every accent is
    // white. Dark surfaces / text / borders are applied via the scoped
    // [data-brand-color="framer"] block in layout.tsx.
    name: 'Framer',
    vars: {
      // White — the CTA fill and every accent (eyebrows, stat numbers,
      // borders, selected chips). Fully monochrome.
      brand: '#FFFFFF',
      strong: '#FFFFFF',
      // CTA hover — a soft off-white.
      deep: '#E5E5E5',
      // Neutral dark — the "soft brand" surface (selected chips, hover).
      soft: '#1F1F1F',
      // Alternating tinted / card background — a hair off the pure-black base.
      bg: '#141414',
      glow: '#FFFFFF',
      onDark: '#FFFFFF',
      // Flat pure-black hero (matches the surface).
      heroTint: '#000000',
    },
    // Half pure-black / half white — signals the dark theme + white CTA.
    swatch:
      'linear-gradient(135deg, #000000 0%, #000000 48%, #FFFFFF 52%, #FFFFFF 100%)',
    hideHeroCarousel: true,
  },
  {
    // Character.AI Safety Center palette (from the Figma capture). Matches
    // the Figma's restraint exactly: the page is near-monochrome — off-white
    // #FAFAFA surfaces (the Figma's "surface/base" token), white cards, black
    // panels — and the pastel gradient (cyan #C6F9FF → pink #F2D0FF → cream
    // #FFFDEA, the exact "Topics" section stops) appears in ONE section only.
    name: 'Character.AI',
    vars: {
      brand: '#000000',
      strong: '#000000',
      // CTA hover background. Pure black has nothing darker, so the hover
      // lifts the button to a dark grey instead — visible interaction
      // feedback, the monochrome equivalent of the other toggles' darken.
      deep: '#2E2E2E',
      // Neutral light-grey for hover borders — no lilac tint.
      soft: '#EDEDED',
      // Every section uses the Figma's plain off-white background (#FAFAFA
      // "Alabaster") — including the hero. The pastel gradient appears in
      // exactly ONE section (the "See It In The Real World" mockups band,
      // see --n-mockups-bg in layout.tsx), mirroring the Figma where the
      // gradient is a single mid-page band and everything else is off-white.
      bg: '#FAFAFA',
      glow: '#6E6E6E',
      onDark: '#FFFFFF',
      // A whisper of the brand pastels on the hero — a very faint
      // cyan → lilac wash that fades to pure white well before the section
      // ends, so it merges seamlessly into the white section below (no
      // edge). Far softer than the mockups band, which stays the one bold
      // use of the gradient.
      heroTint:
        'linear-gradient(to bottom, #EBF5FB 0%, #F3EDFA 46%, #FFFFFF 88%)',
    },
    swatch: 'radial-gradient(130% 130% at 15% 0%, #C6F9FF 0%, #F2D0FF 50%, #FFFDEA 100%)',
    hideHeroCarousel: true,
  },
]

// localStorage key — the toggle stores the chosen option NAME here; the
// layout reads it to re-apply on every design-n page load.
export const BRAND_COLOR_KEY = 'logoai:n-brand-color'
