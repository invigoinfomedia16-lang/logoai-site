'use client'

// MLpNav — top nav for the experimental landing page. Desktop renders
// the wrapping pill nav; mobile (<768px) renders the LOGO + hamburger
// only, with a slide-down panel exposing the same nav items, dropdown
// items, and CTA. Pattern mirrors MHeader's mobile menu so the
// experimental design ships the same mobile UX as the Vercel site.

import { useEffect, useState } from 'react'
import MLpLogo from './MLpLogo'

const NAV_ITEMS = [
  { label: 'Gallery',      href: '#gallery' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Blog',         href: '#blog' },
  { label: 'About',        href: '/prelaunch/about' },
  { label: 'Our Story',    href: '/prelaunch/our-story' },
  { label: "Who's It For", href: '#' },
  { label: 'Why LOGO.AI',  href: '#' },
]

const DROPDOWN = {
  label: 'Browse Logos',
  items: [
    { label: 'By Industry', href: '#' },
    { label: 'By Style',    href: '#' },
    { label: 'By Symbol',   href: '#' },
    { label: 'By Color',    href: '#' },
  ],
}

export default function MLpNav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Close the panel if the viewport resizes up past the breakpoint.
  useEffect(() => {
    if (!open) return
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  return (
    <>
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <a className="lp-brand" href="#hero-cta" aria-label="LOGO.AI">
            <span className="lp-brand-icon" aria-hidden>
              <svg width="30" height="30" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="81.25" stroke="currentColor" strokeWidth="6.25"  fill="none" opacity="0.5" />
                <circle cx="100" cy="100" r="50"    stroke="currentColor" strokeWidth="11.25" fill="none" opacity="0.75" />
                <circle cx="100" cy="100" r="18.75" stroke="currentColor" strokeWidth="18.75" fill="none" />
              </svg>
            </span>
            <span className="wordmark" aria-hidden>LOGO<span className="dot">.</span>AI</span>
            <MLpLogo />
          </a>

          {/* Desktop nav links */}
          <ul className="lp-nav-links">
            {NAV_ITEMS.map((n) => (
              <li key={n.label}><a href={n.href}>{n.label}</a></li>
            ))}
            <li className="lp-dropdown">
              <button type="button">
                {DROPDOWN.label}
                <span className="chev" aria-hidden>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              <ul className="lp-dropdown-menu">
                {DROPDOWN.items.map((d) => (
                  <li key={d.label}><a href={d.href}>{d.label}</a></li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Desktop CTA */}
          <a href="#hero-cta" className="lp-cta-pill lp-cta-desktop">Get My Free Logo</a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lp-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`lp-burger-icon${open ? ' is-open' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {/* Mobile slide-down panel */}
        {open && (
          <div className="lp-mobile-panel">
            {NAV_ITEMS.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="lp-mobile-link">
                {n.label}
              </a>
            ))}
            <div className="lp-mobile-section">{DROPDOWN.label}</div>
            {DROPDOWN.items.map((d) => (
              <a key={d.label} href={d.href} onClick={() => setOpen(false)} className="lp-mobile-link lp-mobile-sublink">
                {d.label}
              </a>
            ))}
            <a href="#hero-cta" onClick={() => setOpen(false)} className="lp-mobile-cta">
              Get My Free Logo
            </a>
          </div>
        )}
      </nav>
    </>
  )
}
