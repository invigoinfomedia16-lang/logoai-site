'use client'

// Canonical top nav for every page in the L design system.
// Behaviour:
//   - Always sticky at top. Backdrop blur + drop shadow once user scrolls past 50px.
//   - Spacer height is measured from the actual nav (avoids the white-line
//     gap that hard-coded heights produce when nav padding clamps).
//   - Mobile: hamburger toggles a slide-down panel with all nav links.
//
// A separate <LStickyCTA /> renders the bottom-anchored "Get my free logo"
// button that appears in the middle scroll window (between hero CTA leaving
// and bottom CTA entering). It scrolls back to the hero email form on click.

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, X, CaretDown, Check } from '@phosphor-icons/react'
import { NAV_LINKS } from '../_data'
import LStickyCTA from './LStickyCTA'
import { scrollToHeroCTA, useSubmitted } from './useSubmitted'

type Props = {
  /** Optional: override the CTA click handler (defaults to scrolling to #top). */
  onCTAClick?: () => void
  /** Optional: replace the CTA label. */
  ctaLabel?: string
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function LNav({ onCTAClick, ctaLabel = 'Get my free logo' }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(64)
  const [submitted] = useSubmitted()
  const navRef = useRef<HTMLElement | null>(null)

  useIsoLayoutEffect(() => {
    if (!navRef.current) return
    const el = navRef.current
    const measure = () => setNavHeight(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [mobileOpen])

  const handleCTA = () => {
    setMobileOpen(false)
    if (onCTAClick) return onCTAClick()
    scrollToHeroCTA()
  }

  return (
    <>
      {/* Spacer matches nav height exactly so no white gap leaks below it */}
      <div style={{ height: navHeight }} aria-hidden="true" />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-md"
        style={{
          background: scrolled ? 'rgba(33,3,64,0.92)' : '#210340',
          color: '#FFFFFF',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          boxShadow: scrolled ? '0 4px 16px rgba(0,0,0,0.18)' : 'none',
          padding: 'clamp(14px, 2vw, 18px) clamp(16px, 4vw, 40px)',
        }}
      >
        <div className="flex items-center justify-between w-full max-w-[95%] sm:max-w-[90%]">
          <a href="/design-l" className="no-underline flex items-center" onClick={() => setMobileOpen(false)}>
            <span
              style={{
                color: '#FFFFFF',
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(22px, 3.4vw, 30px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              LOGO<span style={{ color: '#7543E3' }}>.</span>AI
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.text} className="relative group">
                  <span
                    className="cursor-pointer transition-colors duration-150 inline-flex items-center gap-1 group-hover:text-[#C7A8FF]"
                    style={{ color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', lineHeight: 1, fontWeight: 500 }}
                  >
                    {link.text} <span aria-hidden="true">▾</span>
                  </span>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div
                      className="min-w-[180px] rounded-lg py-2"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(32,18,58,0.08)', boxShadow: '0 8px 24px rgba(32,18,58,0.15)' }}
                    >
                      {link.children.map((c) => {
                        const idle = '#15141A'
                        return (
                          <a
                            key={c.href}
                            href={c.href}
                            className="block px-4 py-2 no-underline transition-colors duration-150"
                            style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 400, color: idle }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#7543E3'; e.currentTarget.style.background = '#F5F0FF' }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = idle; e.currentTarget.style.background = 'transparent' }}
                          >
                            {c.text}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="cursor-pointer transition-colors duration-150 no-underline"
                  style={{ color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', lineHeight: 1, fontWeight: 500 }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#C7A8FF' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#FFFFFF' }}
                >
                  {link.text}
                </a>
              )
            )}
          </div>

          {submitted ? (
            <span
              className="hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-base"
              style={{
                color: '#FFFFFF',
                background: '#7543E3',
                border: '1px solid #7543E3',
                fontFamily: "'Mozilla Text', sans-serif",
                fontWeight: 600,
              }}
            >
              <Check weight="bold" size={14} /> You&apos;re on the list!
            </span>
          ) : (
            <button
              type="button"
              onClick={handleCTA}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-base transition-all duration-200 cursor-pointer"
              style={{
                color: '#FFFFFF',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: "'Mozilla Text', sans-serif",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#7543E3'
                e.currentTarget.style.borderColor = '#7543E3'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              }}
            >
              {ctaLabel} <ArrowRight weight="bold" size={14} />
            </button>
          )}

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            style={{ background: 'transparent', border: 'none' }}
          >
            {mobileOpen ? (
              <X weight="bold" size={22} color="#FFFFFF" />
            ) : (
              <>
                <div className="w-6 h-[2px] rounded-full" style={{ background: '#FFFFFF' }} />
                <div className="w-6 h-[2px] rounded-full" style={{ background: '#FFFFFF' }} />
                <div className="w-6 h-[2px] rounded-full" style={{ background: '#FFFFFF' }} />
              </>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed left-0 right-0 z-40 md:hidden overflow-y-auto"
          style={{
            top: navHeight,
            bottom: 0,
            background: '#210340',
            color: '#FFFFFF',
            padding: '24px 24px 40px 24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.text}>
                  <button
                    type="button"
                    onClick={() => setCompanyOpen((v) => !v)}
                    aria-expanded={companyOpen}
                    className="w-full flex items-center justify-between cursor-pointer"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      fontFamily: "'Mozilla Text', sans-serif",
                      fontSize: '18px',
                      fontWeight: 500,
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {link.text}
                    <span
                      style={{
                        transform: companyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        display: 'inline-flex',
                      }}
                    >
                      <CaretDown weight="bold" size={16} />
                    </span>
                  </button>
                  {companyOpen && (
                    <div className="flex flex-col" style={{ paddingLeft: 16 }}>
                      {link.children.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="no-underline"
                          style={{
                            color: 'rgba(255,255,255,0.78)',
                            fontFamily: "'Mozilla Text', sans-serif",
                            fontSize: '16px',
                            fontWeight: 400,
                            padding: '12px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          {c.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="no-underline"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: "'Mozilla Text', sans-serif",
                    fontSize: '18px',
                    fontWeight: 500,
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {link.text}
                </a>
              )
            )}
          </div>

          {submitted ? (
            <div
              className="w-full inline-flex items-center justify-center gap-2 rounded-full mt-8"
              style={{
                color: '#FFFFFF',
                background: '#7543E3',
                border: '1px solid #7543E3',
                fontFamily: "'Mozilla Text', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                padding: '16px 24px',
              }}
            >
              <Check weight="bold" size={16} /> You&apos;re on the list!
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCTA}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full mt-8 cursor-pointer"
              style={{
                color: '#FFFFFF',
                background: '#7543E3',
                border: '1px solid #7543E3',
                fontFamily: "'Mozilla Text', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
                padding: '16px 24px',
              }}
            >
              {ctaLabel} <ArrowRight weight="bold" size={14} />
            </button>
          )}
        </div>
      )}

      <LStickyCTA label={ctaLabel} />
    </>
  )
}
