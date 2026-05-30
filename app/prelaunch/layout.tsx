// Design M — the PRELAUNCH site. Visually identical to launch's
// Purple Charcoal toggle, but with the colour permanently locked (no
// toggle UI, no localStorage). Reuses launch's components directly
// via imports in /prelaunch/page.tsx so any future polish to a section
// component lifts both sites at once.
//
// The stylesheet below is a focused copy of launch's layout: the
// root .m-theme tokens + global typography/animation rules + the one
// Purple Charcoal scoped block. The other 11 toggle scoped blocks are
// intentionally NOT included — they'd be dead code on the prelaunch
// site since the toggle UI isn't shipped here.

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Open_Sans, DM_Serif_Display, Poppins } from 'next/font/google'
import MSharedHeader from './_components/MSharedHeader'

export const metadata: Metadata = {
  title: 'Logo.AI — Professional logos in 60 seconds (prelaunch)',
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

const poppins = Poppins({
  variable: '--m-font-poppins',
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
})

// Purple Charcoal brand-var values — applied inline on the .m-theme
// wrapper so the components read the correct CTA / hover / glow colours
// without needing the launch toggle JS. Mirror of brandColors.ts entry
// `Purple Charcoal`.
const PURPLE_CHARCOAL_VARS: Record<string, string> = {
  '--m-brand': '#7543E3',
  '--m-brand-strong': '#A98BF0',
  '--m-brand-deep': '#5F2EB4',
  '--m-brand-soft': '#161616',
  '--m-brand-bg': '#0A0A0A',
  '--m-brand-glow': '#A98BF0',
  '--m-brand-on-dark': '#A98BF0',
  '--m-hero-tint': '#050505',
}

export default function MLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Mozilla Headline + Mozilla Text — the global typeface stack. */
        @import url('https://fonts.googleapis.com/css2?family=Mozilla+Headline:wght@300..700&family=Mozilla+Text:ital,wght@0,400..700;1,400..700&display=swap');

        .m-theme {
          /* These brand vars are also set inline on the wrapper div so
             the CTA colours apply immediately on first paint. The CSS
             values below are fallbacks — the inline ones win. */
          --m-brand: #D97757;
          --m-brand-strong: #C16545;
          --m-brand-deep: #A85735;
          --m-brand-soft: #F5E2DA;
          --m-brand-bg: #F0EEE6;
          --m-brand-glow: #E89A7E;
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

          --n-hero-eyebrow-bg: transparent;
          --n-hero-eyebrow-shadow: none;
          --n-hero-eyebrow-pad: 0;

          --n-howitworks-card-bg: var(--m-surface-alt);
          --n-howitworks-card-shadow: none;

          --n-footer-check: var(--m-brand);
          --n-footer-link-hover: var(--m-brand);

          --m-font-display: 'Mozilla Headline', sans-serif;
          --m-font-sans: 'Mozilla Text', sans-serif;
          --m-logo-font: var(--m-font-display);
          --m-logo-weight: 700;
          --m-logo-size: 28px;

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

        .m-card-hover {
          border: 1px solid var(--m-border);
        }

        .m-footer-link {
          color: var(--m-text-on-dark-muted);
          transition: color 0.15s ease;
        }
        .m-footer-link:hover {
          color: var(--n-footer-link-hover, #FFFFFF);
        }

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
          .m-cta-btn:active { transform: none; }
        }

        @media (max-width: 768px) {
          .m-theme { overflow-x: hidden; }
        }

        /* hideHeroCarousel — Purple Charcoal sets this on the wrapper. */
        .m-theme[data-hide-hero-carousel] [data-n-hero-carousel] { display: none; }

        /* Purple Charcoal — the prelaunch site's permanent palette.
           Mirror of the scoped block in /launch/layout.tsx (kept in
           sync manually; both sites share the visual system). */
        .m-theme[data-brand-color="purple-charcoal"] {
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

          --m-surface: #050505;
          --m-surface-alt: #0A0A0A;

          --m-border: #161616;
          --m-border-soft: #101010;
          --m-border-medium: #222225;
          --m-border-dark: #161616;

          --n-footer-bg: var(--m-surface);
          --n-footer-border: 1px solid var(--m-border);
          --n-footer-divider: transparent;
          --n-mockup-frame-bg: var(--m-surface);
          --n-mockup-frame-border-css: 2px solid var(--m-brand);
          --n-mockup-frame-shadow: var(--n-pricing-shadow);
          --n-mockup-frame-pad: 0;
          --n-pricing-section-bg: var(--m-surface);
          --m-header-bg: rgba(5,5,5,0.85);
          --m-header-border: rgba(255,255,255,0.1);
          /* Section rhythm — Mockups + FAQ lift to --m-surface-alt; FAQ
             rows flip to --m-surface so they still read as cards against
             the lifted section. */
          --n-mockups-section-bg: var(--m-surface-alt);
          --n-mockups-bg: var(--m-surface-alt);
          --n-faq-section-bg: var(--m-surface-alt);
          --n-faq-row-bg: var(--m-surface);
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
          --n-hero-highlight: #FFFFFF;
          --n-checkout-modal-bg: #0A0A0A;
          --n-checkout-strip-bg: #0A0A0A;
          --n-step-card-bg: var(--m-surface-alt);
          --n-step-card-shadow: none;
          --n-usecase-card-bg: var(--m-surface-alt);
          --n-usecase-card-border: 1px solid transparent;
          --n-pill-hover-border: 1px solid var(--m-brand);
          --n-pill-hover-bg: var(--m-surface);
          --n-pill-hover-color: var(--m-brand);
          --n-pricing-shadow: 0 12px 32px rgba(117,67,227,0.22), 0 2px 10px rgba(0,0,0,0.5);
          /* Audit fixes — match the Purple Charcoal scope in launch. */
          --n-compare-logoai-bg: rgba(117, 67, 227, 0.08);
          --n-hero-marquee-card-bg: var(--m-surface-alt);
          --n-faq-row-border: 1px solid var(--m-border);
          --n-pricing-divider: var(--m-border-medium);
          --m-logo-size: 28px;
          --m-logo-color: #FFFFFF;
        }
      ` }} />
      <div
        className={`m-theme ${plusJakartaSans.variable} ${openSans.variable} ${dmSerifDisplay.variable} ${poppins.variable}`}
        data-brand-color="purple-charcoal"
        data-hide-hero-carousel=""
        style={PURPLE_CHARCOAL_VARS as React.CSSProperties}
      >
        {/* Shared top nav — same MHeader as launch, but with home and
            onboarding paths pointed at /prelaunch. */}
        <MSharedHeader />
        {children}
      </div>
    </>
  )
}
