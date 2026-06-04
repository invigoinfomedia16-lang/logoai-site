'use client'

// MLpRevealOnScroll — adds an `is-in-view` class to a list of
// element selectors as they enter the viewport. Paired with CSS in
// page.tsx that fades + rises the element from 20px below to its
// resting position. Card grids get a small per-item stagger via
// CSS nth-child transition-delays.
//
// Honors prefers-reduced-motion: if the user prefers reduced motion
// we add the class immediately on mount so nothing animates and
// elements paint at their resting position from frame one.

import { useEffect } from 'react'

// Selectors that should reveal on scroll. Order is purely for
// readability — the IntersectionObserver fires per-element so
// reveal order follows the DOM, not this list.
const TARGETS = [
  '.lp-root .sec-head',
  '.lp-root .hero .hero-urgency',
  '.lp-root .hero .eyebrow',
  '.lp-root .hero h1',
  '.lp-root .hero-lede',
  '.lp-root .hero-grid',
  '.lp-root.is-figma-type .uc-group',
  '.lp-root.is-figma-type .testimonial',
  '.lp-root.is-figma-type .blog-card',
  '.lp-root.is-figma-type .step',
  '.lp-root .pricing-card-classic',
  '.lp-root .final-cta-simple',
]

export default function MLpRevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const nodes = TARGETS
      .flatMap((sel) => Array.from(document.querySelectorAll(sel)))
      .filter((el): el is HTMLElement => el instanceof HTMLElement)

    if (nodes.length === 0) return

    // Mark every reveal target so CSS can apply the initial hidden state.
    nodes.forEach((el) => el.classList.add('lp-reveal'))

    // Reduced-motion users skip the animation entirely.
    const reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      nodes.forEach((el) => el.classList.add('is-in-view'))
      return
    }

    // Above-the-fold elements that are already in view on mount get
    // revealed without scroll — otherwise they'd sit hidden until the
    // user moves. IntersectionObserver still catches anything below.
    const reveal = (el: HTMLElement) => el.classList.add('is-in-view')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Already on screen — reveal immediately.
        reveal(el)
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
