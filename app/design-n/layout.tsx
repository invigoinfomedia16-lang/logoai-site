// Design N — same visual system as Design M (HEADSHOT design tokens +
// Claude terracotta palette), different content. Reuses the .m-theme scope
// and the same fonts so MHeader / MFooter (imported from design-m) render
// identically. The token <style> block is duplicated here so /design-n is
// self-contained — visiting it doesn't run design-m's layout.

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Open_Sans, DM_Serif_Display } from 'next/font/google'
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

export default function NLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Identical token block to design-m/layout.tsx — keeps /design-n
          self-contained and pixel-matched to /design-m. */}
      <style dangerouslySetInnerHTML={{ __html: `
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
        .m-cta-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 20px; line-height: 28px; color: #FFFFFF; }
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
          color: #FFFFFF;
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

        /* Character.AI — monochrome treatment: black rating stars, black
           mockup frame, pure-black footer, and a bottom CTA with no filled
           band (transparent band, dark text, black button). */
        .m-theme[data-brand-color="character-ai"] {
          --m-star: #000000;
          /* Text on dark backgrounds → pure #FFFFFF (matching the Figma,
             which uses pure white on its black panels) rather than the
             default soft greys. */
          --m-text-on-dark: #FFFFFF;
          --m-text-on-dark-muted: #FFFFFF;
          /* Bottom CTA → a plain tinted section (no band, no card): the
             section carries the tint, the inner block is transparent. */
          --n-cta-section-bg: var(--m-brand-bg);
          --n-cta-band-bg: transparent;
          --n-cta-band-pad: 0;
          --n-cta-fg: var(--m-ink-deep);
          --n-cta-fg-sub: var(--m-text-muted);
          --n-cta-fg-soft: var(--m-text-soft);
          --n-cta-btn-bg: #000000;
          --n-cta-btn-fg: #FFFFFF;
          /* Comparison-table yes/no icons → monochrome (black tick,
             light-grey cross with a dark mark). */
          --n-yes: #000000;
          --n-no: #E5E7EB;
          --n-no-mark: #6A7282;
          /* Black mockup frame; pure-black footer; white footer ticks. */
          --n-mockup-frame-bg: #000000;
          --n-mockup-frame-border: #000000;
          --n-footer-bg: #000000;
          --n-footer-check: #FFFFFF;
        }
      ` }} />
      <div className={`m-theme ${plusJakartaSans.variable} ${openSans.variable} ${dmSerifDisplay.variable}`}>
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
