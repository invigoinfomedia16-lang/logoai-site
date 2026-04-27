'use client'

// Mobile-only sticky CTA bar pinned to the bottom of the viewport.
// Renders as a SOLID BAR with its own Tolopea background, top border, and
// backdrop blur — so it visually separates from the page content scrolling
// above it (no transparent floating pill that overlaps the page).
//
// Visible only between the hero CTA scrolling out and the bottom CTA
// entering view. Click scrolls to #hero-cta. Once submitted on any page,
// the CTA swaps to the success state.

import { useEffect, useState } from 'react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { scrollToHeroCTA, useSubmitted } from './useSubmitted'

type Props = {
  label?: string
}

const BAR_HEIGHT = 80 // approx; padding + button height

export default function LStickyCTA({ label = 'Get my free logo' }: Props) {
  const [visible, setVisible] = useState(false)
  const [submitted] = useSubmitted()

  useEffect(() => {
    const update = () => {
      const heroEl =
        document.querySelector<HTMLElement>('[data-l-hero]') ||
        document.querySelector<HTMLElement>('main > section:first-of-type')
      const bottomEl = document.querySelector<HTMLElement>('[data-l-bottom-cta]')

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

  // While the bar is showing on mobile, push body content up by exactly the
  // bar's height so nothing scrolls underneath it. Restored when the bar
  // hides (back at hero, or once the bottom CTA section enters view).
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
        background: 'rgba(33,3,64,0.96)',
        borderTop: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.22)',
        padding: '14px 16px max(14px, env(safe-area-inset-bottom)) 16px',
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s ease',
      }}
    >
      {submitted ? (
        <div
          className="w-full inline-flex items-center justify-center gap-2"
          style={{
            color: '#FFFFFF',
            background: '#7543E3',
            border: '1px solid #7543E3',
            borderRadius: 9999,
            fontFamily: "'Mozilla Text', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            padding: '14px 24px',
          }}
        >
          <Check weight="bold" size={18} /> You&apos;re on the list!
        </div>
      ) : (
        <button
          type="button"
          onClick={scrollToHeroCTA}
          tabIndex={visible ? 0 : -1}
          className="w-full inline-flex items-center justify-center gap-1.5 cursor-pointer"
          style={{
            color: '#FFFFFF',
            background: '#7543E3',
            border: '1px solid #7543E3',
            borderRadius: 9999,
            fontFamily: "'Mozilla Text', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            padding: '14px 24px',
            transition: 'background 0.2s ease',
          }}
          onTouchStart={(e) => { e.currentTarget.style.background = '#5F2EB4' }}
          onTouchEnd={(e) => { e.currentTarget.style.background = '#7543E3' }}
        >
          {label} <ArrowRight weight="bold" size={16} />
        </button>
      )}
    </div>
  )
}
