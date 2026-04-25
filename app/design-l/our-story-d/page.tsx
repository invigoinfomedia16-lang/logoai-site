'use client'

// Our Story — Variation D: Chapter Cards Stack
// Each section is a rounded card with a numbered chapter label.
// Cards stack vertically on a mauve backdrop.
// Same design tokens — dk-* classes inherit, Firefox palette only.

import LSection from '../_components/LSection'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

type CardVariant = 'white' | 'mauve' | 'dark'

function ChapterCard({ num, eyebrow, variant = 'white', children }: { num: string; eyebrow: string; variant?: CardVariant; children: React.ReactNode }) {
  const bg = variant === 'dark' ? '#210340' : variant === 'mauve' ? '#F5F0FF' : '#FFFFFF'
  const border = variant === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(32,18,58,0.08)'
  const accent = variant === 'dark' ? '#C7A8FF' : '#7543E3'
  return (
    <article
      style={{
        background: bg,
        borderRadius: 20,
        border: `1px solid ${border}`,
        padding: 'clamp(28px, 5vw, 56px)',
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 32, lineHeight: '32px', fontWeight: 600, color: accent }}>{num}</span>
        <span className="dk-eyebrow" style={{ color: accent }}>{eyebrow}</span>
      </div>
      {children}
    </article>
  )
}

export default function OurStoryD() {
  return (
    <>
      <main style={{ background: '#F5F0FF' }}>
        {/* Hero card */}
        <LSection tone="alt">
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
          </div>
        </LSection>

        {/* Chapter card stack */}
        <section className="px-6 md:px-10" style={{ paddingBottom: 128 }}>
          <div className="max-w-[900px] mx-auto flex flex-col gap-6">

            <ChapterCard num="01" eyebrow={C.problem.eyebrow}>
              <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.problem.title}</h2>
              {C.problem.options.map((t, i) => (
                <p key={i} className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{t}</p>
              ))}
              <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>{C.problem.gap}</p>
              <p className="dk-h3" style={{ color: '#7543E3' }}>{C.problem.solution}</p>
            </ChapterCard>

            <ChapterCard num="02" eyebrow={C.turningPoint.eyebrow} variant="mauve">
              <p className="dk-body-lg mb-6" style={{ color: '#15141A' }}>{C.turningPoint.intro}</p>
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
            </ChapterCard>

            <ChapterCard num="03" eyebrow={C.howBuilt.eyebrow}>
              <h2 className="dk-h2 mb-8" style={{ color: '#15141A' }}>{C.howBuilt.title}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                {C.howBuilt.pillars.map((p, i) => (
                  <div key={i} style={{ background: '#F5F0FF', borderRadius: 14, padding: 20 }}>
                    <span style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 22, fontWeight: 600, color: '#7543E3', display: 'block', marginBottom: 10 }}>0{i + 1}</span>
                    <h3 className="dk-h3 mb-2" style={{ color: '#15141A' }}>{p.title}</h3>
                    <p className="dk-body" style={{ color: 'rgba(21,20,26,0.7)' }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </ChapterCard>

            <ChapterCard num="04" eyebrow={C.beforeAfter.eyebrow} variant="mauve">
              <h2 className="dk-h2 mb-8" style={{ color: '#15141A' }}>{C.beforeAfter.subtitle}</h2>
              <BeforeAfterTimeline />
            </ChapterCard>

            <ChapterCard num="05" eyebrow={C.numbers.eyebrow} variant="dark">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 24, marginBottom: 28 }}>
                {C.numbers.stats.map((s, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 32, lineHeight: '40px', fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>{s.value}</p>
                    <p className="dk-caption" style={{ color: '#C7A8FF' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="dk-body" style={{ color: '#FFFFFF' }}>{C.numbers.locations.join(' · ')}</p>
            </ChapterCard>

            <ChapterCard num="06" eyebrow={C.theName.eyebrow}>
              <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.theName.title}</h2>
              <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.theName.body}</p>
              <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>{C.theName.closing}</p>
            </ChapterCard>

            <ChapterCard num="07" eyebrow={C.now.eyebrow} variant="mauve">
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
            </ChapterCard>

          </div>
        </section>
      </main>
    </>
  )
}
