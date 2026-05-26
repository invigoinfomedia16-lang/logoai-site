'use client'

// Scroll-reveal wrapper — fades + lifts its children into view once the
// section enters the viewport. The hidden/visible states live in the
// launch layout's <style> block (.m-reveal / .m-reveal-in) and that
// block also disables the effect under prefers-reduced-motion, so this
// component just toggles the class.

import { useEffect, useRef, useState } from 'react'

export default function NReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={shown ? 'm-reveal m-reveal-in' : 'm-reveal'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
