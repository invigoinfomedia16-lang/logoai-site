'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Examples',     href: '#gallery' },
  { label: 'Reviews',      href: '#reviews' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'FAQ',          href: '#faq' },
]

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <>
          <path d="M5 5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

type MHeaderProps = {
  /** CTA label for the desktop button + mobile-menu button. Defaults to the M-design copy. */
  ctaLabel?: string
  /** Where the wordmark links. Defaults to the M-design route. */
  homeHref?: string
  /** Optional brand tagline shown beside the wordmark (desktop only). */
  tagline?: string
  /** When true, the header shrinks slightly + gains a shadow once the page is scrolled. */
  shrinkOnScroll?: boolean
  /** Where the CTA button links. Defaults to the in-page hero anchor. */
  ctaHref?: string
}

export default function MHeader({
  ctaLabel = 'Claim my free logo',
  homeHref = '/design-m',
  tagline,
  shrinkOnScroll = false,
  ctaHref = '#hero-cta',
}: MHeaderProps = {}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Shrink-on-scroll: once the page is scrolled past a small threshold, the
  // header detaches from the top edge into a floating "pill" — it pulls in
  // from full width to ~92%, drops 12px down, gains rounded corners, a
  // frosted-glass background and a soft shadow. Matches the headshot.ai
  // header behavior (a detach, not a height/padding shrink).
  useEffect(() => {
    if (!shrinkOnScroll) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [shrinkOnScroll])

  const compact = shrinkOnScroll && scrolled
  const EASE = 'cubic-bezier(0,0,0.2,1)'
  const headerTransition = compact || shrinkOnScroll
    ? `top 0.5s ${EASE}, width 0.5s ${EASE}, background-color 0.5s ${EASE}, backdrop-filter 0.5s ${EASE}, border-radius 0.5s ${EASE}, border-color 0.5s ${EASE}, box-shadow 0.5s ${EASE}`
    : undefined

  return (
    <header
      className="sticky z-50 flex flex-col items-stretch"
      style={{
        top: compact ? 12 : 0,
        width: compact ? '92%' : '100%',
        marginInline: 'auto',
        background: compact ? 'var(--m-header-bg, rgba(255,255,255,0.82))' : 'var(--m-surface)',
        backdropFilter: compact ? 'saturate(180%) blur(20px)' : 'none',
        WebkitBackdropFilter: compact ? 'saturate(180%) blur(20px)' : 'none',
        borderRadius: compact ? 14 : 0,
        border: '1px solid transparent',
        borderColor: compact ? 'var(--m-header-border, rgba(0,0,0,0.07))' : 'transparent',
        borderBottomColor: compact ? 'var(--m-header-border, rgba(0,0,0,0.07))' : 'var(--m-border)',
        boxShadow: compact ? '0 16px 44px rgba(0,0,0,0.13)' : 'none',
        transition: headerTransition,
      }}
    >
      <div
        className="w-full px-5 sm:px-8 md:px-12 lg:px-16"
        style={{
          ...(compact ? { paddingLeft: 28, paddingRight: 28 } : null),
          transition: `padding 0.5s ${EASE}`,
        }}
      >
        <div className="mx-auto w-full max-w-[1536px] flex items-center py-[16px]">
        {/* Left zone — wordmark + optional tagline (flex-1 so the center nav is truly centered) */}
        <div className="flex flex-1 items-center gap-3">
          {/* Wordmark — matches the L design: DM Serif Display + Purple Heart dot */}
          <a className="flex items-center gap-1.5" href={homeHref}>
            <span
              style={{
                fontFamily: 'var(--m-logo-font, var(--m-font-wordmark), serif)',
                fontSize: 'var(--m-logo-size, 26px)',
                fontWeight: 'var(--m-logo-weight, 400)',
                lineHeight: 1,
                letterSpacing: 'var(--m-logo-tracking, -0.02em)',
                color: 'var(--m-logo-color, var(--m-ink))',
                whiteSpace: 'nowrap',
              }}
            >
              LOGO<span style={{ color: 'var(--m-logo-color, var(--m-brand))' }}>.</span>AI
            </span>
          </a>
          {tagline && (
            <span
              className="hidden lg:inline-block m-sans"
              style={{
                paddingLeft: 12,
                borderLeft: '1px solid var(--m-border)',
                fontSize: 13,
                lineHeight: 1.2,
                color: 'var(--m-text-soft)',
                whiteSpace: 'nowrap',
              }}
            >
              {tagline}
            </span>
          )}
        </div>

        {/* Center zone — desktop nav, dead-centered between the two flex-1 sides */}
        <nav className="hidden md:block">
          <ul className="flex items-center justify-center gap-1">
            {NAV_ITEMS.map((n) => (
              <li key={n.label} className="px-2 py-2">
                <a
                  href={n.href}
                  className="m-nav transition-colors"
                  style={{ color: 'var(--n-nav-link, var(--m-ink))' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--n-nav-link-hover, var(--m-brand))' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--n-nav-link, var(--m-ink))' }}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="flex h-9 items-center justify-center gap-1.5 rounded-md px-2 m-nav transition-colors"
                style={{ color: 'var(--n-nav-link, var(--m-ink))' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--n-nav-link-hover, var(--m-brand))' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--n-nav-link, var(--m-ink))' }}
              >
                <span>Resources</span>
                <ChevronDown />
              </button>
            </li>
          </ul>
        </nav>

        {/* Right zone — log-in + CTA (flex-1, mirrors the left zone width) */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Desktop log-in + CTA */}
          <a
            href="#"
            className="hidden md:flex h-9 items-center justify-center rounded-md px-4 m-nav transition-colors"
            style={{ color: 'var(--m-ink)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--n-nav-link-hover, var(--m-brand))' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--n-nav-link, var(--m-ink))' }}
          >
            Log in
          </a>
          <a
            href={ctaHref}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 m-sans whitespace-nowrap"
            style={{
              // Filled by default; the Freepik toggle overrides the
              // --n-nav-cta-* vars to make it an outlined button (design-L
              // style) — transparent with a faint border, filling on hover.
              background: 'var(--n-nav-cta-bg, var(--m-brand))',
              color: '#FFFFFF',
              border: '1px solid var(--n-nav-cta-border-c, transparent)',
              borderRadius: 'var(--m-radius-sm)',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              boxShadow:
                'var(--n-nav-cta-shadow, 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1))',
              transition: 'background 0.18s ease, border-color 0.18s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--n-nav-cta-bg-hover, var(--m-brand-deep))'
              el.style.borderColor = 'var(--n-nav-cta-border-c-hover, transparent)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--n-nav-cta-bg, var(--m-brand))'
              el.style.borderColor = 'var(--n-nav-cta-border-c, transparent)'
            }}
          >
            {ctaLabel}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            style={{ color: 'var(--m-ink)' }}
          >
            <MenuIcon open={open} />
          </button>
        </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {open && (
        <div
          className="md:hidden border-t flex flex-col"
          style={{ background: 'var(--m-surface)', borderColor: 'var(--m-border)', padding: '16px 20px 24px 20px' }}
        >
          {NAV_ITEMS.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="m-nav py-3 border-b"
              style={{ color: 'var(--m-ink)', borderColor: 'var(--m-border-soft)' }}
            >
              {n.label}
            </a>
          ))}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="m-sans inline-flex items-center justify-center mt-4"
            style={{
              background: 'var(--m-brand)',
              color: '#FFFFFF',
              borderRadius: 'var(--m-radius-md)',
              fontWeight: 600,
              fontSize: 16,
              padding: '14px 24px',
            }}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  )
}
