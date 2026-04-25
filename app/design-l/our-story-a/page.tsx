'use client'

// Our Story — Variation A: Long-form Editorial
// L design tokens only. Narrow 680px reading column throughout.
// Left-aligned body copy (vs canonical which is centered section headers).
// Uses LSection for consistent padding, but deliberately NOT LSectionHeader —
// section headers here are left-aligned and smaller to read as a long article.

import LSection from '../_components/LSection'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

function LeftHeader({ eyebrow, title }: { eyebrow: string; title?: string }) {
  return (
    <div className="max-w-[680px] mx-auto mb-8">
      <span className="dk-eyebrow block mb-3" style={{ color: '#7543E3' }}>{eyebrow}</span>
      {title && <h2 className="dk-h2" style={{ color: '#15141A' }}>{title}</h2>}
    </div>
  )
}

export default function OurStoryA() {
  return (
    <>
      <main>
        {/* Hero — canonical pattern, centered */}
        <LSection>
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
          </div>
        </LSection>

        <LSection tone="alt">
          <LeftHeader eyebrow={C.problem.eyebrow} title={C.problem.title} />
          <div className="max-w-[680px] mx-auto">
            {C.problem.options.map((t, i) => (
              <p key={i} className="dk-body-lg mb-5" style={{ color: '#15141A' }}>{t}</p>
            ))}
            <p className="dk-body-lg mb-5" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>{C.problem.gap}</p>
            <p className="dk-h3" style={{ color: '#7543E3' }}>{C.problem.solution}</p>
          </div>
        </LSection>

        <LSection>
          <LeftHeader eyebrow={C.turningPoint.eyebrow} />
          <div className="max-w-[680px] mx-auto">
            <p className="dk-body-lg mb-6" style={{ color: '#15141A' }}>{C.turningPoint.intro}</p>
            <p className="dk-body mb-3" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.turningPoint.quoteLead}</p>
            <blockquote
              className="mb-6"
              style={{
                borderLeft: '4px solid #7543E3',
                paddingLeft: 28,
                margin: 0,
                fontFamily: "'Mozilla Headline', sans-serif",
                fontSize: 32,
                lineHeight: '40px',
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
        </LSection>

        <LSection tone="alt">
          <LeftHeader eyebrow={C.howBuilt.eyebrow} title={C.howBuilt.title} />
          <div className="max-w-[680px] mx-auto">
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {C.howBuilt.pillars.map((p, i) => (
                <li
                  key={i}
                  style={{
                    borderTop: '1px solid rgba(32,18,58,0.1)',
                    paddingTop: 28,
                    paddingBottom: 28,
                    position: 'relative',
                    paddingLeft: 60,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 28,
                      fontFamily: "'Mozilla Headline', sans-serif",
                      fontSize: 32,
                      fontWeight: 600,
                      color: '#7543E3',
                      lineHeight: '32px',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="dk-h3 mb-2" style={{ color: '#15141A' }}>{p.title}</h3>
                  <p className="dk-body" style={{ color: 'rgba(21,20,26,0.7)' }}>{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </LSection>

        <LSection>
          <LeftHeader eyebrow={C.beforeAfter.eyebrow} title={C.beforeAfter.subtitle} />
          <BeforeAfterTimeline />
        </LSection>

        <LSection tone="dark">
          <LeftHeader eyebrow={C.numbers.eyebrow} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24,
              marginBottom: 32,
            }}
          >
            {C.numbers.stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 24,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 36, lineHeight: '44px', fontWeight: 600, color: '#FFFFFF', marginBottom: 6 }}>{s.value}</p>
                <p className="dk-caption" style={{ color: '#C7A8FF' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="dk-body-lg" style={{ color: '#FFFFFF' }}>{C.numbers.locations.join(' · ')}</p>
        </LSection>

        <LSection>
          <LeftHeader eyebrow={C.theName.eyebrow} title={C.theName.title} />
          <div className="max-w-[680px] mx-auto">
            <p className="dk-body-lg mb-5" style={{ color: '#15141A' }}>{C.theName.body}</p>
            <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>{C.theName.closing}</p>
          </div>
        </LSection>

        <LSection tone="alt">
          <LeftHeader eyebrow={C.now.eyebrow} />
          <div className="max-w-[680px] mx-auto">
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
        </LSection>
      </main>
    </>
  )
}
