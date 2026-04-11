'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileStickyBar from './MobileStickyBar'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showStickyBar, setShowStickyBar] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0
      setShowStickyBar(heroBottom < 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const goToHeroCTA = () => {
    router.push('/#hero-cta')
  }

  return (
    <div className="font-bricolage bg-[#0D0D0D] text-white min-h-screen overflow-x-hidden">
      <Navbar onCTAClick={goToHeroCTA} />
      <div ref={heroRef} />
      {children}
      <Footer />
      <MobileStickyBar visible={showStickyBar} onCTAClick={goToHeroCTA} />
    </div>
  )
}
