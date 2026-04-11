'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import LogoMark from './ui/LogoMark'
import ArrowRight from './ui/ArrowRight'
import { NAV_LINKS } from '@/data'

interface NavbarProps {
  onCTAClick: () => void
}

export default function Navbar({ onCTAClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Main nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-center px-5 md:px-8 lg:px-10 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          backgroundColor:
            scrolled || mobileOpen ? 'rgba(13,13,13,0.85)' : 'transparent',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: 'clamp(14px, 2vw, 18px) clamp(16px, 4vw, 40px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease, background-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between w-full max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px]">
          {/* Logo */}
          <Link href="/" className="no-underline flex items-center">
            <LogoMark size={20} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bricolage font-normal text-base text-white/50 no-underline leading-5 transition-colors duration-150 hover:text-white/90"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={onCTAClick}
            className="hidden md:inline-flex items-center font-bricolage font-medium text-base text-white border border-white/20 rounded-lg px-6 py-3 leading-5 transition-all duration-200 bg-transparent cursor-pointer hover:bg-white hover:text-black"
          >
            Get my free logo
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden bg-transparent border-0 cursor-pointer p-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 z-[999] bg-[#0D0D0D]/95 backdrop-blur-2xl px-6 py-6 flex flex-col gap-5 border-b border-white/[0.06]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-bricolage font-normal text-lg text-white/70 no-underline"
            >
              {link.text}
            </Link>
          ))}
          <div className="h-px bg-white/10 w-full" />
          <button
            onClick={() => {
              setMobileOpen(false)
              onCTAClick()
            }}
            className="font-bricolage font-medium text-base text-white border border-white/20 rounded-lg px-6 py-3 text-center bg-transparent cursor-pointer w-full"
          >
            Get my free logo
          </button>
        </div>
      )}
    </>
  )
}
