// Footer — Design N. Multi-column nav (Popular Logos, Resources, About,
// Legal) + trust-badge strip + copyright. Doc Section 12 covered only
// About and Legal; the other columns are kept by request for richer
// SEO/footer link surface.

const POPULAR_LOGOS = [
  'Restaurant Logos',
  'Coffee Shop Logos',
  'Bakery Logos',
  'Boutique Logos',
  'Gym Logos',
]
const RESOURCES = ['How it works', 'Examples', 'Reviews', 'Pricing', 'FAQ', 'Blog']
const ABOUT = ['About Us', 'Contact Support']
const LEGAL = ['Terms of Use', 'Privacy Policy', 'Refund Policy', 'Security Policy', 'Commercial License']
const TRUST_BADGES = ['SSL Secure', 'Stripe Payments', 'Your data is safe']

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="m-display"
      style={{
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textTransform: 'uppercase',
        color: 'var(--m-text-on-dark)',
      }}
    >
      {children}
    </h4>
  )
}

function LinkList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 items-start w-full">
      {items.map((item) => (
        <li key={item} className="flex flex-col items-start py-0.5 w-full">
          <a
            href="#"
            className="m-sans m-footer-link"
            style={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  )
}

function CheckBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7.25L5.5 10.25L11.5 3.75" style={{ stroke: 'var(--n-footer-check, #00C950)' }} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NFooter() {
  return (
    <footer
      className="flex flex-col items-start px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{
        background: 'var(--n-footer-bg, rgba(0,0,0,0.95))',
        // A top divider — needed when the footer shares the page colour
        // (Freepik); harmless 'none' otherwise.
        borderTop: 'var(--n-footer-border, none)',
      }}
    >
      <div className="flex flex-col gap-12 items-start w-full max-w-[1728px] px-2 sm:px-8 py-12">
        {/* Logo row — wordmark + brand tagline */}
        <div className="w-full flex flex-col gap-2 items-start">
          <a href="/design-n" className="flex items-center gap-1.5">
            <span
              style={{
                fontFamily: 'var(--m-logo-font, var(--m-font-wordmark), serif)',
                fontSize: 'var(--m-logo-size, 26px)',
                fontWeight: 'var(--m-logo-weight, 400)',
                lineHeight: 1,
                letterSpacing: 'var(--m-logo-tracking, -0.02em)',
                color: 'var(--m-logo-color, #FFFFFF)',
                whiteSpace: 'nowrap',
              }}
            >
              LOGO<span style={{ color: 'var(--m-logo-color, var(--m-brand-on-dark))' }}>.</span>AI
            </span>
          </a>
          <p
            className="m-sans"
            style={{ fontSize: 14, lineHeight: '20px', color: 'var(--m-text-on-dark-muted)' }}
          >
            Professional logos in 60 seconds.
          </p>
        </div>

        {/* Columns — 4-column footer: Popular Logos, Resources, About, Legal.
            Collapses to 2 cols on tablet, 1 col on mobile. */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 items-start">
          <div className="flex flex-col gap-4 items-start w-full">
            <ColumnHeading>Popular Logos</ColumnHeading>
            <LinkList items={POPULAR_LOGOS} />
          </div>
          <div className="flex flex-col gap-4 items-start w-full">
            <ColumnHeading>Resources</ColumnHeading>
            <LinkList items={RESOURCES} />
          </div>
          <div className="flex flex-col gap-4 items-start w-full">
            <ColumnHeading>About</ColumnHeading>
            <LinkList items={ABOUT} />
          </div>
          <div className="flex flex-col gap-4 items-start w-full">
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList items={LEGAL} />
          </div>
        </div>

        {/* Bottom bar — copyright (left) + trust badges (right) on one row;
            stacks on mobile. flex-row-reverse keeps the DOM order
            (badges, copyright) so on mobile copyright sits at the bottom. */}
        <div
          className="flex flex-col gap-4 items-start sm:flex-row-reverse sm:items-center sm:justify-between w-full pt-8 border-t"
          style={{ borderColor: 'var(--n-footer-divider, var(--m-border-dark))' }}
        >
          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {TRUST_BADGES.map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckBadge />
                <span
                  className="m-sans"
                  style={{ fontSize: 13, lineHeight: '18px', color: 'var(--m-text-on-dark-muted)' }}
                >
                  {b}
                </span>
              </span>
            ))}
          </div>
          {/* Copyright */}
          <p
            className="m-sans"
            style={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              color: 'var(--m-text-on-dark-muted)',
            }}
          >
            Copyright © 2024–2026 Logo.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
