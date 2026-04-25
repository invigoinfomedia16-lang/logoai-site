'use client'

// Our Story — Variation E: Marketing Hero + Sticky Chapter Nav + Animated Stats
// Big display hero, sticky chapter nav appears on scroll, full-screen Tolopea
// quote section, stats animate on enter.
// Uses LSection / LSectionHeader / dk-* classes; Firefox palette only.

import { useEffect, useRef, useState } from 'react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

const CHAPTERS = [
  { id: 'problem',  label: 'The problem' },
  { id: 'turning',  label: 'Turning point' },
  { id: 'built',    label: 'How we built it' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'numbers',  label: 'Numbers' },
  { id: 'name',     label: 'The name' },
  { id: 'now',      label: 'Now' },
]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, seen }
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const { ref, seen } = useInView<HTMLSpanElement>()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(Math.floor(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{v.toLocaleString('en-US')}{suffix}</span>
}

export default function OurStoryE() {
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Sticky chapter nav — appears after hero */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(32,18,58,0.08)',
          zIndex: 10,
          transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100, padding: '14px 24px', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {CHAPTERS.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="dk-caption no-underline transition-colors duration-150"
              style={{ fontWeight: 500, color: 'rgba(21,20,26,0.7)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#7543E3' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(21,20,26,0.7)' }}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>

      <main>
        {/* Hero — gradient bg, canonical h1 + dek pattern */}
        <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)' }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
              <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
              <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
              <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
              <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
            </div>
          </div>
        </section>

        {/* Problem — two numbered cards */}
        <LSection id="problem">
          <LSectionHeader eyebrow={C.problem.eyebrow} title={C.problem.title} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {C.problem.options.map((t, i) => (
              <div key={i} style={{ background: '#F5F0FF', borderRadius: 16, padding: 28 }}>
                <span style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 26, fontWeight: 600, color: '#7543E3', display: 'block', marginBottom: 12 }}>0{i + 1}</span>
                <p className="dk-body-lg" style={{ color: '#15141A' }}>{t}</p>
              </div>
            ))}
          </div>
          <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: 40 }}>
            <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>{C.problem.gap}</p>
            <p className="dk-h3" style={{ color: '#7543E3' }}>{C.problem.solution}</p>
          </div>
        </LSection>

        {/* Turning point — full-screen Tolopea quote */}
        <LSection id="turning" tone="dark">
          <LSectionHeader eyebrow={C.turningPoint.eyebrow} dark />
          <div className="max-w-[900px] mx-auto text-center">
            <p className="dk-body-lg mb-8" style={{ color: '#FFFFFF' }}>{C.turningPoint.intro}</p>
            <p className="dk-caption mb-5" style={{ color: '#C7A8FF' }}>{C.turningPoint.quoteLead}</p>
            <blockquote
              style={{
                fontFamily: "'Mozilla Headline', sans-serif",
                fontSize: 'clamp(36px, 6vw, 64px)',
                lineHeight: 1.1,
                fontWeight: 600,
                margin: 0,
                marginBottom: 40,
                color: '#FFFFFF',
              }}
            >
              &ldquo;{C.turningPoint.quote}&rdquo;
            </blockquote>
            <p className="dk-body-lg mb-3" style={{ color: '#FFFFFF' }}>{C.turningPoint.diagnosis}</p>
            <p className="dk-body-lg mb-3" style={{ color: '#FFFFFF' }}>{C.turningPoint.reframe}</p>
            <p className="dk-body-lg" style={{ color: '#C7A8FF', fontWeight: 500 }}>{C.turningPoint.unlock}</p>
          </div>
        </LSection>

        {/* How built — numbered icon trio */}
        <LSection id="built">
          <LSectionHeader eyebrow={C.howBuilt.eyebrow} title={C.howBuilt.title} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {C.howBuilt.pillars.map((p, i) => (
              <div key={i} className="text-center">
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: '#7543E3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontFamily: "'Mozilla Headline', sans-serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  0{i + 1}
                </div>
                <h3 className="dk-h3 mb-3" style={{ color: '#15141A' }}>{p.title}</h3>
                <p className="dk-body" style={{ color: 'rgba(21,20,26,0.7)' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </LSection>

        {/* Before/After */}
        <LSection id="evidence" tone="alt">
          <LSectionHeader eyebrow={C.beforeAfter.eyebrow} title={C.beforeAfter.subtitle} />
          <BeforeAfterTimeline />
        </LSection>

        {/* Numbers — animated */}
        <LSection id="numbers" tone="dark">
          <LSectionHeader eyebrow={C.numbers.eyebrow} dark />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { big: <CountUp to={2} suffix="+ years" />, label: 'in R&D' },
              { big: <CountUp to={100000} suffix="+" />,  label: 'logos analyzed' },
              { big: 'Thousands',                          label: 'of training hours' },
              { big: <CountUp to={4} suffix=" countries" />, label: 'of operations' },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center"
                style={{
                  padding: 24,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 36, lineHeight: '44px', fontWeight: 600, color: '#FFFFFF', marginBottom: 6 }}>{s.big}</p>
                <p className="dk-caption" style={{ color: '#C7A8FF' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="dk-body-lg mx-auto text-center" style={{ color: '#FFFFFF', marginTop: 32 }}>{C.numbers.locations.join(' · ')}</p>
        </LSection>

        {/* The name */}
        <LSection id="name">
          <LSectionHeader eyebrow={C.theName.eyebrow} title={C.theName.title} />
          <div className="max-w-[680px] mx-auto text-center">
            <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.theName.body}</p>
            <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>{C.theName.closing}</p>
          </div>
        </LSection>

        {/* Now — final CTA with gradient */}
        <section id="now" className="px-6 md:px-10 py-24 md:py-32" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)' }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="max-w-[820px] mx-auto text-center">
              <span className="dk-eyebrow inline-block mb-5" style={{ color: '#7543E3' }}>{C.now.eyebrow}</span>
              <p className="dk-h2 mb-4" style={{ color: '#15141A' }}>{C.now.body}</p>
              <p className="dk-h2 mb-10" style={{ color: '#7543E3' }}>{C.now.tease}</p>
              <a
                href={C.now.cta.href}
                className="inline-flex items-center gap-2 no-underline"
                style={{ padding: '16px 32px', borderRadius: 9999, background: '#7543E3', color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: 16, fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#6132BC' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#7543E3' }}
              >
                {C.now.cta.text} →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
