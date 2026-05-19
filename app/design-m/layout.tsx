// Design M — port of the HEADSHOT visual system applied to LOGO.AI content.
// Scoped to .m-theme so it doesn't bleed into design-l, design-k, or the
// Freepik design at root. Fonts loaded via next/font and applied to the
// wrapper div only.

import type { ReactNode } from 'react'
import { Plus_Jakarta_Sans, Open_Sans, DM_Serif_Display } from 'next/font/google'

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

// Wordmark font — matches the L design's LOGO.AI wordmark.
const dmSerifDisplay = DM_Serif_Display({
  variable: '--m-font-wordmark',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export default function MLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        Design M tokens — cloned from HEADSHOT/app/globals.css (Figma source
        of truth) but scoped to .m-theme so they don't leak into the rest of
        the site. Hex values inlined so we don't depend on Tailwind v4's
        @theme syntax (this project is on Tailwind v3).
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        .m-theme {
          /* Brand — Anthropic / Claude palette pulled from anthropic.com.
             #D97757 is Claude's signature warm terracotta (most-used accent
             in their stylesheet), and #F0EEE6 is the cream they use as the
             warm neutral background. The strong/deep/glow tints are derived
             from the same hue family. */
          --m-brand: #D97757;
          --m-brand-strong: #C16545;
          --m-brand-deep: #A85735;
          --m-brand-soft: #F5E2DA;
          --m-brand-bg: #F0EEE6;
          --m-brand-glow: #E89A7E;

          /* Ink + text */
          --m-ink-deep: #0A0A0A;
          --m-ink: #101828;
          --m-ink-2: #171717;
          --m-text: #364153;
          --m-text-muted: #4A5565;
          --m-text-soft: #6A7282;
          --m-text-faint: #737373;
          --m-text-on-dark: #D1D5DC;
          --m-text-on-dark-muted: #99A1AF;

          /* Surfaces */
          --m-surface: #FFFFFF;
          --m-surface-alt: #FAFAFA;
          --m-surface-section-dark: #1C1C1C;
          --m-surface-card-dark: #141413;

          /* Borders */
          --m-border: #E5E7EB;
          --m-border-soft: #F3F4F6;
          --m-border-medium: #D1D5DC;
          --m-border-dark: #1E2939;

          /* Status / accent */
          --m-success: #00A63E;
          --m-success-bright: #00C950;
          --m-success-bold: #00BC7D;
          --m-danger: #FB2C36;
          --m-star: #FFBA00;

          /* Radius */
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

        /* Type roles — exact pairings from HEADSHOT DESIGN_TOKENS.md */
        .m-display { font-family: var(--m-font-display), system-ui, sans-serif; }
        .m-sans    { font-family: var(--m-font-sans), system-ui, sans-serif; }

        .m-h1 { font-family: var(--m-font-display), serif; font-weight: 700; font-size: 48px; line-height: 60px; letter-spacing: -2.4px; color: var(--m-ink); }
        .m-h2 { font-family: var(--m-font-display), serif; font-weight: 600; font-size: 48px; line-height: 60px; letter-spacing: -1.6px; color: var(--m-ink-deep); }
        .m-h3 { font-family: var(--m-font-display), serif; font-weight: 600; font-size: 24px; line-height: 32px; color: var(--m-ink); }
        .m-eyebrow { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 14px; line-height: 20px; letter-spacing: 0.7px; text-transform: uppercase; }
        .m-eyebrow-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; letter-spacing: 3.2px; text-transform: uppercase; color: var(--m-text-on-dark-muted); }
        .m-sub { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 20px; line-height: 32.5px; color: var(--m-text-muted); }
        .m-body { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 16px; line-height: 24px; color: var(--m-text); }
        .m-body-sm { font-family: var(--m-font-sans), sans-serif; font-weight: 400; font-size: 14px; line-height: 22.75px; color: var(--m-text-muted); }
        .m-cta-lg { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 20px; line-height: 28px; color: #FFFFFF; }
        .m-nav { font-family: var(--m-font-sans), sans-serif; font-weight: 600; font-size: 14px; line-height: 24px; }

        /* Mobile downshift */
        @media (max-width: 768px) {
          .m-h1 { font-size: 36px; line-height: 44px; letter-spacing: -1.4px; }
          .m-h2 { font-size: 32px; line-height: 40px; letter-spacing: -1px; white-space: normal !important; }
          .m-h3 { font-size: 20px; line-height: 28px; }
          .m-sub { font-size: 17px; line-height: 27px; }
          .m-cta-lg { font-size: 17px; line-height: 24px; }
        }

        @media (max-width: 480px) {
          .m-h1 { font-size: 30px; line-height: 38px; }
          .m-h2 { font-size: 26px; line-height: 32px; }
        }

        /* Marquee animation (used by gallery) */
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

        /* Mobile safety: prevent x-overflow */
        @media (max-width: 768px) {
          .m-theme { overflow-x: hidden; }
        }
      ` }} />
      <div className={`m-theme ${plusJakartaSans.variable} ${openSans.variable} ${dmSerifDisplay.variable}`}>
        {children}
      </div>
    </>
  )
}
