'use client'

// Floating bottom-anchored CTA. Visible only between hero CTA scrolling out
// and bottom CTA entering view. On click, scrolls smoothly to the hero email
// form (#hero-cta). Once the user has submitted on any CTA, this swaps to the
// success state ("You're on the list!") and matches the rest of the page.

import { useEffect, useState } from 'react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { scrollToHeroCTA, useSubmitted } from './useSubmitted'

type Props = {
  label?: string
}

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

  // Reserve space at the bottom of the page (mobile only) so the floating CTA
  // doesn't cover content. We add padding to <body> only when the CTA is
  // actually visible AND we're on mobile, then restore the previous value.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!visible || !isMobile) return
    const prev = document.body.style.paddingBottom
    document.body.style.paddingBottom = '92px'
    return () => {
      document.body.style.paddingBottom = prev
    }
  }, [visible])

  const sharedWrap: React.CSSProperties = {
    bottom: 'env(safe-area-inset-bottom, 0px)',
    padding: '16px 20px max(16px, env(safe-area-inset-bottom)) 20px',
    transform: visible ? 'translateY(0)' : 'translateY(140%)',
    opacity: visible ? 1 : 0,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  }

  return (
    <div
      aria-hidden={visible ? undefined : true}
      className="md:hidden fixed left-0 right-0 z-40 flex justify-center pointer-events-none"
      style={sharedWrap}
    >
      {submitted ? (
        <div
          className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto"
          style={{
            color: '#FFFFFF',
            background: '#7543E3',
            fontFamily: "'Mozilla Text', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            padding: '16px 32px',
            maxWidth: 420,
            boxShadow: '0 8px 24px rgba(32,18,58,0.32), 0 2px 6px rgba(0,0,0,0.18)',
          }}
        >
          <Check weight="bold" size={18} /> You&apos;re on the list!
        </div>
      ) : (
        <button
          type="button"
          onClick={scrollToHeroCTA}
          tabIndex={visible ? 0 : -1}
          className="pointer-events-auto inline-flex items-center justify-center gap-1.5 rounded-full cursor-pointer w-full sm:w-auto"
          style={{
            color: '#FFFFFF',
            background: '#7543E3',
            border: 'none',
            fontFamily: "'Mozilla Text', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            padding: '16px 32px',
            maxWidth: 420,
            boxShadow: '0 8px 24px rgba(32,18,58,0.32), 0 2px 6px rgba(0,0,0,0.18)',
            transition: 'background 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5F2EB4'
            e.currentTarget.style.boxShadow = '0 10px 28px rgba(32,18,58,0.4), 0 2px 6px rgba(0,0,0,0.22)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#7543E3'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(32,18,58,0.32), 0 2px 6px rgba(0,0,0,0.18)'
          }}
        >
          {label} <ArrowRight weight="bold" size={16} />
        </button>
      )}
    </div>
  )
}
