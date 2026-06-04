'use client'

// MLpNav — top nav for the experimental landing page. Desktop renders
// the wrapping pill nav; mobile (<768px) renders the LOGO + hamburger
// only, with a slide-down panel exposing the same nav items, dropdown
// items, and CTA. Pattern mirrors MHeader's mobile menu so the
// experimental design ships the same mobile UX as the Vercel site.

import { useEffect, useState } from 'react'
import MLpLogo from './MLpLogo'

// Gallery, How It Works, Who's It For, and FAQ each get their own
// dedicated page (currently placeholders). Sections of the same name
// still live on the main /prelaunch page — the nav points to the
// dedicated routes so the URL is meaningful + linkable.
const NAV_ITEMS = [
  { label: 'Gallery',      href: '/prelaunch/gallery' },
  { label: 'How It Works', href: '/prelaunch/how-it-works' },
  { label: "Who's It For", href: '/prelaunch/who-its-for' },
  { label: 'FAQ',          href: '/prelaunch/faq' },
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
  // Track which dropdown sections are expanded inside the mobile panel.
  // Independent (not exclusive) — multiple can be open at once. Reset when
  // the panel itself closes so it always re-opens collapsed.
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleSection = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Sarpanch 900 powers the nav wordmark. Load it once on mount so
  // the face is available across the whole prelaunch experience.
  useEffect(() => {
    const href = 'https://fonts.googleapis.com/css2?family=Sarpanch:wght@900&display=swap'
    if (document.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [])

  // Close the panel if the viewport resizes up past the breakpoint.
  useEffect(() => {
    if (!open) return
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  // When the panel closes, collapse every section so the next open starts clean.
  useEffect(() => {
    if (!open) setExpanded(new Set())
  }, [open])

  return (
    <>
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <a className="lp-brand" href="/prelaunch#hero-cta" aria-label="LOGO.AI">
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
          <a href="/prelaunch#hero-cta" className="lp-cta-pill lp-cta-desktop">Get My Free Logo</a>

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
            {DROPDOWNS.map((dd) => {
              const isOpen = expanded.has(dd.label)
              return (
                <div key={dd.label} className="lp-mobile-accordion">
                  <button
                    type="button"
                    className="lp-mobile-section-btn"
                    aria-expanded={isOpen ? 'true' : 'false'}
                    onClick={() => toggleSection(dd.label)}
                  >
                    <span className="lp-mobile-section">{dd.label}</span>
                    <span className={`lp-mobile-chev${isOpen ? ' is-open' : ''}`} aria-hidden>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5 L6 7.5 L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && dd.items.map((d) => (
                    <a key={d.label} href={d.href} onClick={() => setOpen(false)} className="lp-mobile-link lp-mobile-sublink">
                      {d.label}
                    </a>
                  ))}
                </div>
              )
            })}
            <a href="/prelaunch#hero-cta" onClick={() => setOpen(false)} className="lp-mobile-cta">
              Get My Free Logo
            </a>
          </div>
        )}
      </nav>
    </>
  )
}
