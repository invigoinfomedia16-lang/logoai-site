'use client'

// MLpStickyCTA — mobile-only sticky CTA bar for the experimental landing.
// Same scroll behaviour as the production MStickyCTA but styled for the
// dark editorial palette and uses the landing page's #hero-cta and
// #final-cta IDs as the show/hide anchors:
//   • appears once the user scrolls past the hero
//   • hides once the Final CTA enters view (so it doesn't fight the
//     in-page form)
//   • only renders on mobile (<768px); desktop is unchanged

import { useEffect, useState } from 'react'

const BAR_HEIGHT = 76

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MLpStickyCTA({ label = 'Get My Free Logo' }: { label?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const heroEl = document.getElementById('hero-cta')
      const bottomEl = document.getElementById('final-cta')

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

  // Pad the body on mobile while the bar shows so content doesn't sit under it.
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
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        aria-hidden={!visible}
        className="lp-sticky-cta"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(110%)',
        }}
      >
        <a
          href="#hero-cta"
          tabIndex={visible ? 0 : -1}
          className="lp-sticky-cta-btn"
        >
          <span>{label}</span>
          <ArrowRight />
        </a>
      </div>
    </>
  )
}

const STYLES = `
  .lp-sticky-cta {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background: rgba(10, 10, 12, 0.92);
    border-top: 1px solid #2a2a32;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.4);
    padding: 12px 16px max(12px, env(safe-area-inset-bottom)) 16px;
    transition: transform 0.3s ease;
  }
  @media (max-width: 767px) {
    .lp-sticky-cta { display: block; }
  }

  .lp-sticky-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    background: #7c3aed;
    color: #ffffff;
    border-radius: 10px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 16px;
    padding: 14px 24px;
    text-decoration: none;
    transition: background 0.2s ease;
  }
  .lp-sticky-cta-btn:hover {
    background: #a855f7;
  }
`
