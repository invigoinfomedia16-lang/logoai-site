'use client'

// Mobile-only sticky CTA bar pinned to the bottom of the viewport — ported
// from the L design's LStickyCTA, recolored to N's terracotta palette.
// Renders as a solid bar (own surface background, top border, blur) so it
// reads as a separate layer above the scrolling page. Visible only between
// the hero CTA scrolling out of view and the final CTA section entering it.
// Clicking scrolls to #pricing.

import { useEffect, useState } from 'react'

const BAR_HEIGHT = 76 // approx: padding + button height

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NStickyCTA({ label = 'Generate My Free Logos' }: { label?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const heroEl = document.querySelector<HTMLElement>('[data-n-hero]')
      const bottomEl = document.querySelector<HTMLElement>('[data-n-bottom-cta]')

      const y = window.scrollY
      const wh = window.innerHeight
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom + y : 0
      const bottomTop = bottomEl ? bottomEl.getBoundingClientRect().top + y : Infinity

      const heroPast = y > heroBottom - 80
      const bottomReached = y + wh >= bottomTop
      setVisible(heroPast && !bottomReached)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // While the bar shows on mobile, pad the body so nothing sits under it.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!visible || !isMobile) return
    const prev = document.body.style.paddingBottom
    document.body.style.paddingBottom = BAR_HEIGHT + 24 + 'px'
    return () => {
      document.body.style.paddingBottom = prev
    }
  }, [visible])

  return (
    <div
      aria-hidden={!visible}
      className="md:hidden fixed left-0 right-0 bottom-0 z-40"
      style={{
        background: 'rgba(255,255,255,0.96)',
        borderTop: '1px solid var(--m-border)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.10)',
        padding: '12px 16px max(12px, env(safe-area-inset-bottom)) 16px',
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s ease',
      }}
    >
      <a
        href="/design-n/start"
        tabIndex={visible ? 0 : -1}
        className="m-cta-btn w-full inline-flex items-center justify-center gap-2"
        style={{
          color: '#FFFFFF',
          borderRadius: 'var(--m-radius-md)',
          fontFamily: 'var(--m-font-sans), sans-serif',
          fontWeight: 600,
          fontSize: 16,
          padding: '14px 24px',
        }}
      >
        <span>{label}</span>
        <ArrowRight />
      </a>
    </div>
  )
}
