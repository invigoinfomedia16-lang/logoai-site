// Design N — same visual system as Design M (HEADSHOT design tokens +
// Claude terracotta palette), different content. Reuses the .m-theme scope
// and the same fonts so MHeader / MFooter (imported from design-m) render
// identically. The token <style> block is duplicated here so /design-n is
// self-contained — visiting it doesn't run design-m's layout.

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Open_Sans, DM_Serif_Display, Poppins } from 'next/font/google'
import { BRAND_COLORS, BRAND_COLOR_KEY } from './_components/brandColors'

export const metadata: Metadata = {
  title: 'Logo.AI — Professional logos in 60 seconds',
  description:
    'Professional logos in 60 seconds. Describe your brand and our AI generates designer-quality logos — free to generate and preview, pay only if you love it.',
}

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--m-font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const openSans = Open_Sans({
  variable: '--m-font-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  variable: '--m-font-wordmark',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

// Poppins — used only by the Freepik toggle's logo wordmark (the "Str 22"
// treatment from the Freepik design: Poppins 900).
const poppins = Poppins({
  variable: '--m-font-poppins',
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
})

export default function NLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Identical token block to design-m/layout.tsx — keeps /design-n
          self-contained and pixel-matched to /design-m. */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Mozilla Headline + Mozilla Text — design-L's typefaces, loaded so
           the Freepik toggle can use them (see [data-brand-color="freepik"]
           below). No other toggle references them. */
        @import url('https://fonts.googleapis.com/css2?family=Mozilla+Headline:wght@300..700&family=Mozilla+Text:ital,wght@0,400..700;1,400..700&display=swap');
        .m-theme {
          --m-brand: #D97757;
          --m-brand-strong: #C16545;
          --m-brand-deep: #A85735;
          --m-brand-soft: #F5E2DA;
          --m-brand-bg: #F0EEE6;
          --m-brand-glow: #E89A7E;
          /* Brand accent for use on dark backgrounds (e.g. footer logo
             dot). Equals --m-brand for colours that read on dark; the
             Black theme overrides it to white so the dot stays visible. */
          --m-brand-on-dark: #D97757;

          --m-ink-deep: #0A0A0A;
          --m-ink: #101828;
          --m-ink-2: #171717;
          --m-text: #364153;
          --m-text-muted: #4A5565;
          --m-text-soft: #6A7282;
          --m-text-faint: #737373;
          --m-text-on-dark: #D1D5DC;
          --m-text-on-dark-muted: #99A1AF;

          --m-surface: #FFFFFF;
          --m-surface-alt: #FAFAFA;
          --m-surface-section-dark: #1C1C1C;
          --m-surface-card-dark: #141413;

          --m-border: #E5E7EB;
          --m-border-soft: #F3F4F6;
          --m-border-medium: #D1D5DC;
          --m-border-dark: #1E2939;

          --m-success: #00A63E;
          --m-success-bright: #00C950;
          --m-success-bold: #00BC7D;
          --m-danger: #FB2C36;
          --m-star: #FFBA00;

          --m-radius-sm: 6px;
          --m-radius-md: 8px;
          --m-radius-lg: 10px;
          --m-radius-xl: 16px;
          --m-radius-pill: 9999px;

          background: var(--m-surface);
          color: var(--m-ink);
          font-family: var(--m-font-sans), ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .m-display { font-family: var(--m-font-display), system-ui, sans-serif; }
        .m-sans    { font-family: var(--m-font-sans), system-ui, sans-serif; }

        .m-h1 { font-family: var(--m-font-display), serif; font-weight: 700; font-size: 60px; line-height: 68px; letter-spacing: -2.8px; color: var(--m-ink); }
        .m-h2 { font-family: var(--m-font-display), serif; font-weight: 600; font-size: 48px; line-height: 60px; letter-spacing: -1.6px; color: var(--m-ink-deep); }
        .m-h3 { font-family: var(--m-font-display), serif; font-weight: 600; font-size: 24px; line-height: 32px; color: var(--m-ink); }
        .m-eyebrow { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; letter-spacing: 0.7px; text-transform: uppercase; }
        .m-eyebrow-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; letter-spacing: 3.2px; text-transform: uppercase; color: var(--m-text-on-dark-muted); }
        .m-sub { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 20px; line-height: 32.5px; color: var(--m-text-muted); }
        .m-body { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: var(--m-text); }
        .m-body-sm { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 14px; line-height: 22.75px; color: var(--m-text-muted); }
        .m-cta-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 20px; line-height: 28px; color: var(--m-on-brand, #FFFFFF); }
        .m-nav { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 14px; line-height: 24px; }

        @media (max-width: 768px) {
          .m-h1 { font-size: 42px; line-height: 50px; letter-spacing: -1.7px; }
          .m-h2 { font-size: 32px; line-height: 40px; letter-spacing: -1px; white-space: normal !important; }
          .m-h3 { font-size: 20px; line-height: 28px; }
          .m-sub { font-size: 17px; line-height: 27px; }
          .m-cta-lg { font-size: 17px; line-height: 24px; }
        }

        @media (max-width: 480px) {
          .m-h1 { font-size: 34px; line-height: 42px; }
          .m-h2 { font-size: 26px; line-height: 32px; }
        }

        @keyframes m-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .m-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: m-marquee-left 60s linear infinite;
        }
        .m-marquee-row:hover .m-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .m-marquee-track { animation: none; }
        }

        /* Shared CTA button — class-based hover so it isn't overridden by
           an inline background. Buttons drop their inline background and
           use this instead. */
        .m-cta-btn {
          background: var(--m-brand);
          color: var(--m-on-brand, #FFFFFF);
          transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }
        .m-cta-btn:hover {
          background: var(--m-brand-deep);
        }
        .m-cta-btn:active {
          transform: translateY(1px);
        }

        /* Shared card hover — lift + border glow. Cards drop their inline
           border and use this instead. */
        .m-card-hover {
          border: 1px solid var(--m-border);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .m-card-hover:hover {
          transform: translateY(-2px);
          border-color: var(--m-brand-soft);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        /* Footer link hover — muted by default, brightens on hover.
           Links drop their inline color and use this instead. */
        .m-footer-link {
          color: var(--m-text-on-dark-muted);
          transition: color 0.15s ease;
        }
        .m-footer-link:hover {
          color: var(--n-footer-link-hover, #FFFFFF);
        }

        /* Scroll-reveal — initial hidden state; NReveal toggles
           .m-reveal-in once the section enters the viewport. */
        .m-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1);
        }
        .m-reveal-in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .m-reveal, .m-reveal-in {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .m-card-hover:hover { transform: none; }
          .m-cta-btn:active { transform: none; }
        }

        @media (max-width: 768px) {
          .m-theme { overflow-x: hidden; }
        }

        /* Colours that set data-hide-hero-carousel hide the landing hero
           carousel (e.g. the Character.AI theme). */
        .m-theme[data-hide-hero-carousel] [data-n-hero-carousel] { display: none; }

        /* Character.AI — near-monochrome treatment matching the Figma:
           off-white #FAFAFA surfaces, white cards, black panels/footer, and
           the pastel gradient reserved for the hero alone. Black rating
           stars, black mockup frame, and a bottom CTA with no filled band. */
        .m-theme[data-brand-color="character-ai"] {
          --m-star: #000000;
          /* Text on dark backgrounds → pure #FFFFFF (matching the Figma,
             which uses pure white on its black panels) rather than the
             default soft greys. */
          --m-text-on-dark: #FFFFFF;
          --m-text-on-dark-muted: #FFFFFF;
          /* Bottom CTA → a plain off-white section (no band, no card): the
             section carries the off-white --m-brand-bg, inner block is
             transparent. */
          --n-cta-section-bg: var(--m-brand-bg);
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-fg: var(--m-ink-deep);
          --n-cta-fg-sub: var(--m-text-muted);
          --n-cta-fg-soft: var(--m-text-soft);
          --n-cta-btn-bg: #000000;
          --n-cta-btn-bg-hover: #2E2E2E;
          --n-cta-btn-fg: #FFFFFF;
          /* Comparison-table yes/no icons → monochrome (black tick,
             light-grey cross with a dark mark). */
          --n-yes: #000000;
          --n-no: #E5E7EB;
          --n-no-mark: #6A7282;
          /* Green check icons (Risk-Free, Pricing, How-It-Works) → black. */
          --n-check: #000000;
          /* Onboarding funnel → monochrome: green success states and the
             green "verified" rating stars go black under this theme. The
             Google "G" is left full-colour — a third-party brand mark,
             exempt from theme recolouring by convention. */
          --m-success: #000000;
          --m-success-bright: #000000;
          --m-success-bold: #000000;
          --n-rating-star: #000000;
          /* Black mockup frame; pure-black footer; white footer ticks. */
          --n-mockup-frame-bg: #000000;
          --n-mockup-frame-border: #000000;
          --n-footer-bg: #000000;
          --n-footer-check: #FFFFFF;
          /* The single use of the pastel gradient — the "See It In The Real
             World" mockups band. The EXACT Figma "Topics" radial gradient:
             stops #C6F9FF → #F2D0FF → #FFFDEA, and geometry derived straight
             from the Figma node's gradient transform matrix
             (matrix(161.28 0 0 170.13 126.28 -271.48), r=10, in a 1928-wide
             box) → centre 6.55%/-14.08vw, radii 83.65vw × 88.24vw. vw units
             keep the Figma's true proportions at any viewport width. */
          --n-mockups-bg: radial-gradient(83.65vw 88.24vw at 6.55% -14.08vw, #C6F9FF 0%, #F2D0FF 50%, #FFFDEA 100%);
          /* The band fades out top and bottom with a long, smooth feather
             so it merges seamlessly into the section — no hard line, no
             grain. The fade runs a generous 200px for a soft, gradual blend. */
          --n-mockups-mask:
            linear-gradient(to bottom, transparent 0, #000 200px, #000 calc(100% - 200px), transparent 100%);
          /* The mockups section base is pure white — same as the sections
             above and below — so the feathered band dissolves into the
             exact surrounding colour with no tonal step at the edges. */
          --n-mockups-section-bg: var(--m-surface);
        }

        /* Character.AI card hover — the brand-soft border tint is neutral
           grey here, so the default hover-border barely reads. Darken it to
           a clear soft grey so cards get a visible hover like other toggles
           (the lift + shadow already apply theme-independently). */
        .m-theme[data-brand-color="character-ai"] .m-card-hover:hover {
          border-color: #C8C8C8;
        }

        /* Freepik — a full dark theme: near-black surfaces, light text,
           blue #336AEA CTA (colours from public/freepik-exact.html).
           Scoped entirely to this toggle, so the other four toggles and
           the default design-n are completely unaffected. */
        .m-theme[data-brand-color="freepik"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          /* Typography — design-L's Mozilla typefaces: Mozilla Headline for
             headings, Mozilla Text for body. Scoped to this toggle only;
             the other toggles keep Plus Jakarta Sans / Open Sans. */
          --m-font-display: 'Mozilla Headline', sans-serif;
          --m-font-sans: 'Mozilla Text', sans-serif;

          --m-surface: #0D0D0D;
          --m-surface-alt: #18181B;

          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          /* Same as --m-border so the footer's inner divider matches its
             top border and the nav divider. */
          --m-border-dark: #2A2A2A;

          /* Footer uses the same surface as the non-scrolled nav bar and
             the page; a top border demarcates it, same as the nav divider. */
          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          /* No inner footer divider — the top border is the only one. */
          --n-footer-divider: transparent;
          /* Mockups frame matches the pricing card — surface background, a
             2px blue border, the same soft shadow, and no dark inner mat
             (padding 0, so the mockup sits flush to the blue border). */
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          /* Top-nav CTA — outlined, design-L style: transparent with a
             faint white border, fills with the brand colour on hover. */
          --n-nav-cta-bg: transparent;
          --n-nav-cta-border-c: rgba(255,255,255,0.25);
          --n-nav-cta-shadow: none;
          --n-nav-cta-bg-hover: var(--m-brand);
          --n-nav-cta-border-c-hover: var(--m-brand);
          /* Hero eyebrow — plain text like the section eyebrows, no pill. */
          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: none;
          --n-hero-eyebrow-pad: 0;
          /* Mockups + pricing sections drop the alternating #141414 tint —
             flat #0D0D0D surface so there are no different-shade bands. The
             mockups section has TWO layers (a base + a masked overlay) — both
             go flat. (Card tints still use --m-brand-bg for subtle lift.) */
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          /* Sticky header's scrolled (compact) pill — frosted dark instead
             of frosted white, with a faint light border. */
          --m-header-bg: rgba(13,13,13,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          /* FAQ accordion rows — dark, slightly raised off the section. */
          --n-faq-row-bg: #161616;
          /* Bottom CTA — no filled band: the heading sits straight on the
             dark section (the Character.AI treatment), with a blue brand
             button instead of a white-on-band one. */
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome pass — no gold, no green, no red. Blue is the one
             accent: rating stars / no-crosses go neutral grey, while the
             check / yes / success marks fold into the single blue accent. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #336AEA;
          --m-success: #336AEA;
          --m-success-bright: #336AEA;
          --m-success-bold: #336AEA;
          --n-yes: #336AEA;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-footer-check: #648EEF;
          /* Checkout modal — dark container + dark social-proof strip
             (defaults are a light off-white / warm tint). */
          --n-checkout-modal-bg: #141414;
          --n-checkout-strip-bg: #161616;
          /* Pricing card — the default shadow has a hardcoded terracotta
             glow; swap it for a blue glow + a deeper neutral shadow. */
          --n-pricing-shadow: 0 12px 32px rgba(51,106,234,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — design-L's logo treatment: DM Serif Display (the
             default wordmark font, weight 400, -0.02em tracking — reached by
             leaving --m-logo-font/weight/tracking unset), white, at 28px. */
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Vermillion — a dark theme built on the Freepik base: a warm
           near-black surface (a faint vermillion warmth mixed into the
           black) with the vermillion #E7420F CTA. Scoped to this toggle. */
        .m-theme[data-brand-color="vermillion"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          /* design-L's Mozilla typefaces — carried over from the Freepik base. */
          --m-font-display: 'Mozilla Headline', sans-serif;
          --m-font-sans: 'Mozilla Text', sans-serif;

          /* Warm near-black surfaces — a faint vermillion warmth in the
             black; reads neutral at a glance but feels subtly warm. */
          --m-surface: #120E0C;
          --m-surface-alt: #1A1411;

          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-nav-cta-bg: transparent;
          --n-nav-cta-border-c: rgba(255,255,255,0.25);
          --n-nav-cta-shadow: none;
          --n-nav-cta-bg-hover: var(--m-brand);
          --n-nav-cta-border-c-hover: var(--m-brand);
          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: none;
          --n-hero-eyebrow-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(18,14,12,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #191310;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome pass — vermillion is the one accent; rating stars and
             no-crosses stay neutral grey. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #E7420F;
          --m-success: #E7420F;
          --m-success-bright: #E7420F;
          --m-success-bold: #E7420F;
          --n-yes: #E7420F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-footer-check: #F4926F;
          --n-checkout-modal-bg: #161210;
          --n-checkout-strip-bg: #191310;
          --n-pricing-shadow: 0 12px 32px rgba(231,66,15,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — the site's heading font (Mozilla Headline, via
             --m-font-display) at the hero-heading weight (700 = .m-h1),
             white, 28px. */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Vermillion Black — a dark theme on the Freepik base: true
           pure-black surfaces (#000000, neutral / no warmth) with the
           vermillion #E7420F CTA. A stark sibling of the warm-toned
           Vermillion toggle. Scoped entirely to this toggle. */
        .m-theme[data-brand-color="vermillion-black"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          /* design-L's Mozilla typefaces — carried over from the Freepik base. */
          --m-font-display: 'Mozilla Headline', sans-serif;
          --m-font-sans: 'Mozilla Text', sans-serif;

          /* True pure-black surfaces — neutral, no warmth. Cards lift a hair
             so they stay visible against the absolute-black base. */
          --m-surface: #000000;
          --m-surface-alt: #0C0C0C;

          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-nav-cta-bg: transparent;
          --n-nav-cta-border-c: rgba(255,255,255,0.25);
          --n-nav-cta-shadow: none;
          --n-nav-cta-bg-hover: var(--m-brand);
          --n-nav-cta-border-c-hover: var(--m-brand);
          /* Hero eyebrow — render as an outlined bar (no fill, faint neutral
             ring) with the CTA's rounded-rect shape (override of the default
             rounded-full pill is in a scoped rule below). */
          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: 0 0 0 1px rgba(255,255,255,0.22);
          --n-hero-eyebrow-pad: 10px 18px;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(0,0,0,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #0C0C0C;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          /* Monochrome pass — vermillion is the one accent; rating stars and
             no-crosses stay neutral grey. */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #E7420F;
          --m-success: #E7420F;
          --m-success-bright: #E7420F;
          --m-success-bold: #E7420F;
          --n-yes: #E7420F;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          /* Footer trust-badge ticks — use the full brand vermillion so they
             match every other check on the page (pricing, risk-free, etc.). */
          --n-footer-check: var(--m-brand);
          /* Footer link hover — match the header's nav-link hover (vermillion)
             so both react to the cursor the same way. */
          --n-footer-link-hover: var(--m-brand);
          /* Hero highlight figures (4.6M / 180,000+ / 90+ countries / 4.9/5)
             — white instead of the brand vermillion, so they read as bold
             white highlights against the pure-black hero. */
          --n-hero-highlight: #FFFFFF;
          /* How-It-Works cards — lift to --m-surface-alt and drop the
             brand-soft shadow so they read like the Risk-Free section cards
             (the m-card-hover 1px border alone defines the card). */
          --n-howitworks-card-bg: var(--m-surface-alt);
          --n-howitworks-card-shadow: none;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #0C0C0C;
          --n-pricing-shadow: 0 12px 32px rgba(231,66,15,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo wordmark — Mozilla Headline 700, white, 28px (same as the
             Vermillion toggle). */
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Vermillion Black — bump the hero content a hair further down from
           the top nav (the rest of the toggles keep their existing spacing).
           :first-child scoping — the hero section has three direct grand-
           children (content / marquee / trust strip); we only want the
           content one. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-hero] > div:first-child > div {
          padding-top: 80px;
        }
        @media (min-width: 768px) {
          .m-theme[data-brand-color="vermillion-black"] [data-n-hero] > div:first-child > div {
            padding-top: 96px;
          }
        }
        /* Vermillion Black — give the hero eyebrow the CTA's rounded-rect
           shape instead of the default rounded-full pill. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-hero] .m-eyebrow {
          border-radius: var(--m-radius-md);
        }
        /* Vermillion Black — hide both the eyebrow stars and the proof-line
           stars; the rating text alone carries the message. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-hero] [data-n-hero-stars] {
          display: none;
        }
        /* Vermillion Black — drop the lift-on-hover for How-It-Works cards
           (they're informational, not clickable; the lift implies an
           interaction that doesn't exist). */
        .m-theme[data-brand-color="vermillion-black"] #how-it-works .m-card-hover:hover {
          transform: none;
          border-color: var(--m-border);
          box-shadow: none;
        }

        /* ─────────────────────────────────────────────────────────────
           Vermillion Black — onboarding: centered-minimal layout.
           Same questions, same one-per-step flow. Only the visual
           design changes: massive question-as-headline, generous
           breathing room, no card chrome, vertically-centered content,
           minimal header (no border, ultra-thin progress hairline,
           step-number badge hidden). Typeform / Framer feel.
           ───────────────────────────────────────────────────────────── */

        /* Header — strip the border + opaque surface so the page reads
           as one continuous black. Tighter top padding. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > header {
          background: transparent !important;
          border-bottom: none !important;
        }
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > header > div {
          padding-top: 18px;
          padding-bottom: 14px;
        }
        /* Row 1 — left-align the logo (was justify-center). The close × is
           absolute-right so it stays on the right edge. Mirrors the
           headshot.ai reference layout. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > header > div > div:first-child {
          justify-content: flex-start !important;
        }
        /* Progress hairline — slimmer (2px) and a touch more transparent. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > header > div > div:nth-child(2) {
          height: 2px !important;
          background: rgba(255,255,255,0.08) !important;
          margin-top: 16px !important;
        }

        /* Main content — wider, top-aligned (not vertically centered) so
           the question sits in the upper third and the dropdown / chip
           grid below the input has room to expand without clipping. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > main {
          max-width: 840px !important;
          padding: 56px 24px 180px !important;
        }
        @media (min-width: 768px) {
          .m-theme[data-brand-color="vermillion-black"] [data-n-start] > main {
            padding: 88px 32px 200px !important;
          }
        }

        /* Step heading — make the question the hero of the screen. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > main h2.m-display {
          font-size: clamp(34px, 5.8vw, 60px) !important;
          line-height: 1.08 !important;
          letter-spacing: -0.025em !important;
          font-weight: 700 !important;
        }
        /* Subtitle — larger and lighter, more space before the form. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > main h2.m-display + p {
          font-size: 18px !important;
          line-height: 1.55 !important;
          margin-top: 18px !important;
          max-width: 580px !important;
          color: var(--m-text-muted) !important;
        }
        /* Gap between the heading block and the form — much more breathing. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] > main > div > div.text-center:first-child {
          margin-bottom: 64px !important;
        }
        @media (min-width: 768px) {
          .m-theme[data-brand-color="vermillion-black"] [data-n-start] > main > div > div.text-center:first-child {
            margin-bottom: 80px !important;
          }
        }
        /* Description / tagline suggestions — show as a 2-col grid instead of
           a stacked list (the businessplan.ai "ready-to-click answers" feel).
           1 col on mobile so each chip stays readable. */
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] [data-n-suggestions] {
          display: grid !important;
          grid-template-columns: 1fr;
          gap: 10px !important;
        }
        @media (min-width: 640px) {
          .m-theme[data-brand-color="vermillion-black"] [data-n-start] [data-n-suggestions] {
            grid-template-columns: 1fr 1fr;
          }
        }
        .m-theme[data-brand-color="vermillion-black"] [data-n-start] [data-n-suggestions] > button {
          height: 100%;
        }

        /* Purple Black — a dark theme on the Freepik base: much-darker
           near-pure-black surfaces (#050505) with design-L's purple #7543E3
           CTA. Scoped entirely to this toggle. */
        .m-theme[data-brand-color="purple-black"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          --m-font-display: 'Mozilla Headline', sans-serif;
          --m-font-sans: 'Mozilla Text', sans-serif;

          /* Much-darker near-pure-black surfaces. */
          --m-surface: #050505;
          --m-surface-alt: #101010;

          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-nav-cta-bg: transparent;
          --n-nav-cta-border-c: rgba(255,255,255,0.25);
          --n-nav-cta-shadow: none;
          --n-nav-cta-bg-hover: var(--m-brand);
          --n-nav-cta-border-c-hover: var(--m-brand);
          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: none;
          --n-hero-eyebrow-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(5,5,5,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #101010;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: #FFFFFF;
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #7543E3;
          --m-success: #7543E3;
          --m-success-bright: #7543E3;
          --m-success-bold: #7543E3;
          --n-yes: #7543E3;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-footer-check: #A98BF0;
          --n-checkout-modal-bg: #0D0D0D;
          --n-checkout-strip-bg: #101010;
          --n-pricing-shadow: 0 12px 32px rgba(117,67,227,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Logo — Freepik's DM Serif wordmark (no font/weight override). */
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }

        /* Framer — a DARK, fully monochrome theme on the Freepik base: a
           pure-black background (#000000, Framer's site black) with an
           exact-white #FFFFFF CTA (white fill, black text). Every accent is
           white. Scoped entirely to this toggle. */
        .m-theme[data-brand-color="framer"] {
          --m-ink-deep: #FFFFFF;
          --m-ink: #F5F5F5;
          --m-ink-2: #F5F5F5;
          --m-text: #C9C9C9;
          --m-text-muted: #AEAEAE;
          --m-text-soft: #8A8A8A;
          --m-text-faint: #6E6E6E;
          --m-text-on-dark: #F5F5F5;
          --m-text-on-dark-muted: #AEAEAE;

          /* design-L's Mozilla typefaces — carried over from the Freepik base. */
          --m-font-display: 'Mozilla Headline', sans-serif;
          --m-font-sans: 'Mozilla Text', sans-serif;

          /* Pure-black surfaces — Framer's site black. */
          --m-surface: #000000;
          --m-surface-alt: #141414;

          /* Text / icon colour on a brand-coloured (white) fill — black,
             since every CTA, check circle and step badge is now white. */
          --m-on-brand: #000000;

          --m-border: #2A2A2A;
          --m-border-soft: #1E1E1E;
          --m-border-medium: #3A3A3A;
          --m-border-dark: #2A2A2A;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-nav-cta-bg: transparent;
          --n-nav-cta-border-c: rgba(255,255,255,0.25);
          --n-nav-cta-shadow: none;
          /* Outlined nav CTA — keep the label white on hover (a faint fill,
             not a solid white fill, so the white text stays readable). */
          --n-nav-cta-bg-hover: rgba(255,255,255,0.12);
          --n-nav-cta-border-c-hover: rgba(255,255,255,0.55);
          /* Nav links — Framer's grey-to-white hover. The theme is
             monochrome (brand == white == near-white ink), so links sit at
             a muted grey and brighten to pure white on hover. */
          --n-nav-link: #AEAEAE;
          --n-nav-link-hover: #FFFFFF;
          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: none;
          --n-hero-eyebrow-pad: 0;
          --n-mockups-section-bg: var(--m-surface);
          --n-mockups-bg: var(--m-surface);
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(0,0,0,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          --n-faq-row-bg: #141414;
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-btn-bg: var(--m-brand);
          --n-cta-btn-bg-hover: var(--m-brand-deep);
          --n-cta-btn-fg: var(--m-on-brand);
          /* Monochrome pass — white is the one accent; rating stars and
             no-crosses stay neutral grey. Check / yes circles are white
             with a black tick (--m-on-brand). */
          --m-star: #C9C9C9;
          --n-rating-star: #C9C9C9;
          --n-check: #FFFFFF;
          --m-success: #FFFFFF;
          --m-success-bright: #FFFFFF;
          --m-success-bold: #D4D4D4;
          --n-yes: #FFFFFF;
          --n-no: #3A3A3A;
          --n-no-mark: #9A9A9A;
          --n-footer-check: #FFFFFF;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #141414;
          --n-pricing-shadow: 0 12px 32px rgba(255,255,255,0.06), 0 2px 10px rgba(0,0,0,0.6);
          /* Logo — Freepik's DM Serif wordmark (no font/weight override). */
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }
      ` }} />
      <div className={`m-theme ${plusJakartaSans.variable} ${openSans.variable} ${dmSerifDisplay.variable} ${poppins.variable}`}>
        {/* Colour-toggle applier — re-applies the brand colour the user
            picked on the landing page (NColorToggle) so the choice carries
            across every design-n page. Runs pre-paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var n=localStorage.getItem(${JSON.stringify(
              BRAND_COLOR_KEY,
            )});if(!n)return;var M=${JSON.stringify(
              Object.fromEntries(
                BRAND_COLORS.map((c) => [
                  c.name,
                  { ...c.vars, hideHeroCarousel: c.hideHeroCarousel },
                ]),
              ),
            )};var v=M[n];if(!v)return;var el=document.currentScript.parentElement;var s=el.style;s.setProperty('--m-brand',v.brand);s.setProperty('--m-brand-strong',v.strong);s.setProperty('--m-brand-deep',v.deep);s.setProperty('--m-brand-soft',v.soft);s.setProperty('--m-brand-bg',v.bg);s.setProperty('--m-brand-glow',v.glow);s.setProperty('--m-brand-on-dark',v.onDark);if(v.heroTint)s.setProperty('--m-hero-tint',v.heroTint);if(v.hideHeroCarousel)el.setAttribute('data-hide-hero-carousel','');el.setAttribute('data-brand-color',n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''));}catch(e){}})();`,
          }}
        />
        {children}
      </div>
    </>
  )
}
