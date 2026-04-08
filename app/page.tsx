'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogoGallerySection from '@/components/LogoGallerySection'
import MockupSection from '@/components/MockupSection'
import HowItWorks from '@/components/HowItWorks'
import ComparisonTable from '@/components/ComparisonTable'
import StatsSection from '@/components/StatsSection'
import FAQ from '@/components/FAQ'
import BlogSection from '@/components/BlogSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import MobileStickyBar from '@/components/MobileStickyBar'

export default function HomePage() {
  const heroFormRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  const [submitted, setSubmitted] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)

  // Show sticky bar after hero scrolls out, hide once CTA section is visible
  useEffect(() => {
    const handler = () => {
      const heroBottom = heroFormRef.current?.getBoundingClientRect().bottom ?? 0
      const ctaTop = ctaRef.current?.getBoundingClientRect().top ?? window.innerHeight
      setShowStickyBar(heroBottom < 0 && ctaTop > window.innerHeight)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToHero = () => {
    heroFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="font-bricolage bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar onCTAClick={scrollToHero} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <Hero ref={heroFormRef} onSubmit={() => setSubmitted(true)} submitted={submitted} />

      {/* ── Logo gallery ─────────────────────────────────── */}
      <ScrollReveal>
        <LogoGallerySection />
      </ScrollReveal>

      {/* ── Mockup section ───────────────────────────────── */}
      <ScrollReveal>
        <MockupSection />
      </ScrollReveal>

      {/* ── How it works ─────────────────────────────────── */}
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      {/* ── Comparison table ─────────────────────────────── */}
      <ScrollReveal>
        <ComparisonTable />
      </ScrollReveal>

      {/* ── Stats ────────────────────────────────────────── */}
      <ScrollReveal>
        <StatsSection />
      </ScrollReveal>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>

      {/* ── Blog ─────────────────────────────────────────── */}
      <ScrollReveal>
        <BlogSection />
      </ScrollReveal>

      {/* ── Bottom CTA banner ────────────────────────────── */}
      <section ref={ctaRef}>
        <ScrollReveal>
          <CTASection onSubmit={() => setSubmitted(true)} submitted={submitted} />
        </ScrollReveal>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />

      {/* ── Mobile sticky CTA ────────────────────────────── */}
      <MobileStickyBar visible={showStickyBar} onCTAClick={scrollToHero} />
    </div>
  )
}
