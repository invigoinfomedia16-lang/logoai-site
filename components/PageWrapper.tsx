'use client'

import { useRef, useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileStickyBar from './MobileStickyBar'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showStickyBar, setShowStickyBar] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0
      setShowStickyBar(heroBottom < 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="font-bricolage bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar onCTAClick={scrollToTop} />
      <div ref={heroRef} />
      {children}
      <Footer />
      <MobileStickyBar visible={showStickyBar} onCTAClick={scrollToTop} />
    </div>
  )
}
