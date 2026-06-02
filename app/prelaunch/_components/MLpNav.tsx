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
  { label: "Who's It For", href: '#' },
  { label: 'FAQ',          href: '#faq' },
]

const DROPDOWNS: { label: string; items: { label: string; href: string }[] }[] = [
  {
    label: 'Company',
    items: [
      { label: 'About Us',        href: '/prelaunch/about' },
      { label: 'Our Story',       href: '/prelaunch/our-story' },
      { label: 'Team',            href: '#' },
      { label: 'Why LOGO.AI',     href: '#' },
      { label: 'Manifesto',       href: '#' },
      { label: 'Press',           href: '#' },
      { label: 'Contact Support', href: '#' },
    ],
  },
  {
    label: 'Browse Logos',
    items: [
      { label: 'By Industry', href: '#' },
      { label: 'By Style',    href: '#' },
      { label: 'By Symbol',   href: '#' },
      { label: 'By Color',    href: '#' },
    ],
  },
]

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
            <MLpLogo />
          </a>

          {/* Desktop nav links */}
          <ul className="lp-nav-links">
            {NAV_ITEMS.map((n) => (
              <li key={n.label}><a href={n.href}>{n.label}</a></li>
            ))}
            {DROPDOWNS.map((dd) => (
              <li key={dd.label} className="lp-dropdown">
                <button type="button">
                  {dd.label}
                  <span className="chev" aria-hidden>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <ul className="lp-dropdown-menu">
                  {dd.items.map((d) => (
                    <li key={d.label}><a href={d.href}>{d.label}</a></li>
                  ))}
                </ul>
              </li>
            ))}
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
            {DROPDOWNS.map((dd) => (
              <div key={dd.label}>
                <div className="lp-mobile-section">{dd.label}</div>
                {dd.items.map((d) => (
                  <a key={d.label} href={d.href} onClick={() => setOpen(false)} className="lp-mobile-link lp-mobile-sublink">
                    {d.label}
                  </a>
                ))}
              </div>
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
