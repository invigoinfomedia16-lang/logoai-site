'use client'

// Our Story — Variation B: Sticky Chapter Timeline
// Left sidebar with chapter list; active chapter highlights as user scrolls.
// All typography via dk-* classes, all colors from Firefox palette.

import { useEffect, useState } from 'react'
import LSection from '../_components/LSection'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

const CHAPTERS = [
  { id: 'intro',       label: '01 · The beginning' },
  { id: 'problem',     label: '02 · The problem' },
  { id: 'turning',     label: '03 · The turning point' },
  { id: 'howBuilt',    label: '04 · How we built it' },
  { id: 'beforeAfter', label: '05 · Before & after' },
  { id: 'numbers',     label: '06 · The numbers' },
  { id: 'theName',     label: '07 · The name' },
  { id: 'now',         label: '08 · Where we are now' },
]

function useActiveChapter() {
  const [active, setActive] = useState('intro')
  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id)
        if (!el) continue
        if (mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActive(c.id)
          return
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

export default function OurStoryB() {
  const active = useActiveChapter()
  return (
    <>
      <main>
        {/* Hero — canonical centered pattern */}
        <LSection id="intro">
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
          </div>
        </LSection>

        {/* Two-column body: sidebar + content stream */}
        <section className="px-6 md:px-10" style={{ background: '#FFFFFF' }}>
          <div
            className="max-w-[1100px] mx-auto"
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 240px) 1fr', gap: 72 }}
          >
            <aside className="hidden md:block" style={{ position: 'sticky', top: 100, alignSelf: 'start', paddingTop: 96 }}>
              <span className="dk-eyebrow block mb-5" style={{ color: '#7543E3' }}>On this page</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {CHAPTERS.slice(1).map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="dk-caption no-underline"
                      style={{
                        display: 'block',
                        padding: '10px 0 10px 16px',
                        borderLeft: active === c.id ? '2px solid #7543E3' : '2px solid rgba(32,18,58,0.1)',
                        color: active === c.id ? '#7543E3' : 'rgba(21,20,26,0.7)',
                        fontWeight: active === c.id ? 600 : 400,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            <div style={{ minWidth: 0 }}>
              <div id="problem" style={{ padding: '96px 0' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.problem.eyebrow}</span>
                <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.problem.title}</h2>
                {C.problem.options.map((t, i) => (
                  <p key={i} className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{t}</p>
                ))}
                <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>{C.problem.gap}</p>
                <p className="dk-h3" style={{ color: '#7543E3' }}>{C.problem.solution}</p>
              </div>

              <div id="turning" style={{ borderTop: '1px solid rgba(32,18,58,0.08)', padding: '72px 0 96px' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.turningPoint.eyebrow}</span>
                <p className="dk-body-lg mb-5" style={{ color: '#15141A' }}>{C.turningPoint.intro}</p>
                <p className="dk-body mb-3" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.turningPoint.quoteLead}</p>
                <blockquote
                  className="mb-6"
                  style={{
                    borderLeft: '4px solid #7543E3',
                    paddingLeft: 24,
                    margin: 0,
                    fontFamily: "'Mozilla Headline', sans-serif",
                    fontSize: 28,
                    lineHeight: '36px',
                    fontWeight: 600,
                    color: '#15141A',
                  }}
                >
                  &ldquo;{C.turningPoint.quote}&rdquo;
                </blockquote>
                <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.turningPoint.diagnosis}</p>
                <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.turningPoint.reframe}</p>
                <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.turningPoint.unlock}</p>
              </div>

              <div id="howBuilt" style={{ borderTop: '1px solid rgba(32,18,58,0.08)', padding: '72px 0 96px' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.howBuilt.eyebrow}</span>
                <h2 className="dk-h2 mb-8" style={{ color: '#15141A' }}>{C.howBuilt.title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                  {C.howBuilt.pillars.map((p, i) => (
                    <div key={i} style={{ background: '#F5F0FF', borderRadius: 16, padding: 24 }}>
                      <span style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 24, fontWeight: 600, color: '#7543E3', display: 'block', marginBottom: 10 }}>0{i + 1}</span>
                      <h3 className="dk-h3 mb-2" style={{ color: '#15141A' }}>{p.title}</h3>
                      <p className="dk-body" style={{ color: 'rgba(21,20,26,0.7)' }}>{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="beforeAfter" style={{ borderTop: '1px solid rgba(32,18,58,0.08)', padding: '72px 0 96px' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.beforeAfter.eyebrow}</span>
                <h2 className="dk-h2 mb-8" style={{ color: '#15141A' }}>{C.beforeAfter.subtitle}</h2>
                <BeforeAfterTimeline />
              </div>

              <div id="numbers" style={{ borderTop: '1px solid rgba(32,18,58,0.08)', padding: '72px 0 96px' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.numbers.eyebrow}</span>
                <div style={{ background: '#210340', borderRadius: 20, padding: 32, color: '#FFFFFF' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginBottom: 24 }}>
                    {C.numbers.stats.map((s, i) => (
                      <div key={i}>
                        <p style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 32, lineHeight: '40px', fontWeight: 600, marginBottom: 4 }}>{s.value}</p>
                        <p className="dk-caption" style={{ color: '#C7A8FF' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="dk-body">{C.numbers.locations.join(' · ')}</p>
                </div>
              </div>

              <div id="theName" style={{ borderTop: '1px solid rgba(32,18,58,0.08)', padding: '72px 0 96px' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.theName.eyebrow}</span>
                <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.theName.title}</h2>
                <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.theName.body}</p>
                <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>{C.theName.closing}</p>
              </div>

              <div id="now" style={{ borderTop: '1px solid rgba(32,18,58,0.08)', padding: '72px 0 128px' }}>
                <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.now.eyebrow}</span>
                <p className="dk-body-lg mb-3" style={{ color: '#15141A' }}>{C.now.body}</p>
                <p className="dk-body-lg mb-8" style={{ color: '#15141A', fontWeight: 500 }}>{C.now.tease}</p>
                <a
                  href={C.now.cta.href}
                  className="inline-flex items-center gap-2 no-underline"
                  style={{ padding: '14px 26px', borderRadius: 9999, background: '#7543E3', color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: 16, fontWeight: 600 }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#6132BC' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#7543E3' }}
                >
                  {C.now.cta.text} →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
