'use client'

// Our Story — canonical page
// Follows L homepage design system strictly:
//   - LSection wrapper for every section (px-6 md:px-10 py-24 md:py-32 + max-w-[1100px])
//   - LSectionHeader for every centered eyebrow + h2 + subhead block
//   - .dk-* classes inherited from app/design-l/layout.tsx (no fontSize overrides)
//   - Eyebrow casing UPPERCASE (matches homepage)
//   - Only Firefox palette tokens: #FFFFFF #C7A8FF #E0CAFF #7543E3 #6132BC #210340 #15141A

import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

export default function OurStoryPage() {
  return (
    <>
      <main>
        {/* Hero — matches homepage hero pattern (h1 + body-lg subhead, centered) */}
        <LSection>
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>
              {C.pageTitle}
            </h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
              {C.heroHeadline}
            </p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>
              {C.heroBody}
            </p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
              {C.heroClosing}
            </p>
          </div>
        </LSection>

        {/* The problem — two cards + centered footer accent */}
        <LSection tone="alt">
          <LSectionHeader eyebrow={C.problem.eyebrow} title={C.problem.title} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {C.problem.options.map((t, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, border: '1px solid rgba(32,18,58,0.08)' }}>
                <span
                  style={{
                    display: 'block',
                    marginBottom: 14,
                    fontFamily: "'Mozilla Headline', sans-serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#7543E3',
                  }}
                >
                  0{i + 1}
                </span>
                <p className="dk-body-lg" style={{ color: '#15141A' }}>{t}</p>
              </div>
            ))}
          </div>
          <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: 48 }}>
            <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>
              {C.problem.gap}
            </p>
            <p className="dk-h3" style={{ color: '#7543E3' }}>
              {C.problem.solution}
            </p>
          </div>
        </LSection>

        {/* The turning point — reading column + pullquote */}
        <LSection>
          <LSectionHeader eyebrow={C.turningPoint.eyebrow} />
          <div className="max-w-[720px] mx-auto">
            <p className="dk-body-lg mb-6" style={{ color: '#15141A' }}>
              {C.turningPoint.intro}
            </p>
            <p className="dk-body mb-3" style={{ color: 'rgba(21,20,26,0.7)' }}>
              {C.turningPoint.quoteLead}
            </p>
            <blockquote
              className="mb-6"
              style={{
                borderLeft: '4px solid #7543E3',
                paddingLeft: 'clamp(16px,4vw,28px)',
                margin: 0,
                fontFamily: "'Mozilla Headline', sans-serif",
                fontSize: 'clamp(20px,5vw,32px)',
                lineHeight: 1.25,
                fontWeight: 600,
                color: '#15141A',
              }}
            >
              &ldquo;{C.turningPoint.quote}&rdquo;
            </blockquote>
            <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>
              {C.turningPoint.diagnosis}
            </p>
            <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>
              {C.turningPoint.reframe}
            </p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
              {C.turningPoint.unlock}
            </p>
          </div>
        </LSection>

        {/* How we built it — three pillar cards (mirrors homepage How It Works) */}
        <LSection tone="alt">
          <LSectionHeader eyebrow={C.howBuilt.eyebrow} title={C.howBuilt.title} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 32,
            }}
          >
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
                <h3 className="dk-h3 mb-3" style={{ color: '#15141A' }}>
                  {p.title}
                </h3>
                <p className="dk-body" style={{ color: 'rgba(21,20,26,0.7)' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </LSection>

        {/* Before / After — horizontal 4-step timeline */}
        <LSection>
          <LSectionHeader eyebrow={C.beforeAfter.eyebrow} title={C.beforeAfter.subtitle} />
          <BeforeAfterTimeline />
        </LSection>

        {/* Numbers — dark Tolopea section (mirrors homepage "Going fast") */}
        <LSection tone="dark">
          <LSectionHeader eyebrow={C.numbers.eyebrow} dark />
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
                className="text-center"
                style={{
                  padding: 24,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Mozilla Headline', sans-serif",
                    fontSize: 36,
                    lineHeight: '44px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: 6,
                  }}
                >
                  {s.value}
                </p>
                <p className="dk-caption" style={{ color: '#C7A8FF' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="dk-body-lg text-center" style={{ color: '#FFFFFF' }}>
            {C.numbers.locations.join(' · ')}
          </p>
        </LSection>

        {/* The name */}
        <LSection>
          <LSectionHeader eyebrow={C.theName.eyebrow} title={C.theName.title} />
          <div className="max-w-[680px] mx-auto text-center">
            <p className="dk-body-lg mb-5" style={{ color: '#15141A' }}>
              {C.theName.body}
            </p>
            <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>
              {C.theName.closing}
            </p>
          </div>
        </LSection>

        {/* Where we are now — final CTA */}
        <LSection tone="alt">
          <LSectionHeader eyebrow={C.now.eyebrow} />
          <div className="max-w-[720px] mx-auto text-center">
            <p
              className="mb-4"
              style={{
                fontFamily: "'Mozilla Headline', sans-serif",
                fontSize: 'clamp(22px, 2.4vw, 28px)',
                lineHeight: 1.35,
                fontWeight: 500,
                color: '#15141A',
              }}
            >
              {C.now.body}
            </p>
            <p className="dk-body-lg mb-8" style={{ color: '#7543E3', fontWeight: 500 }}>
              {C.now.tease}
            </p>
            <a
              href={C.now.cta.href}
              className="inline-flex items-center gap-1.5 no-underline transition-all duration-200 cursor-pointer"
              style={{
                color: '#FFFFFF',
                background: '#7543E3',
                fontFamily: "'Mozilla Text', sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                padding: '14px 28px',
                border: '1px solid #7543E3',
                borderRadius: 9999,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#5F2EB4'
                e.currentTarget.style.borderColor = '#5F2EB4'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(32,18,58,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#7543E3'
                e.currentTarget.style.borderColor = '#7543E3'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {C.now.cta.text} →
            </a>
          </div>
        </LSection>

        {/* Staging-only layout-variations strip removed for production. */}
        {false && (
        <section style={{ background: '#F5F0FF', padding: '32px 24px', borderTop: '1px solid rgba(32,18,58,0.08)' }}>
          <div className="max-w-[1100px] mx-auto">
            <p className="dk-caption mb-3" style={{ color: 'rgba(21,20,26,0.6)' }}>
              Our Story — layout variations (staging):
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'a', label: 'A · Long-form Editorial' },
                { key: 'b', label: 'B · Sticky Timeline' },
                { key: 'c', label: 'C · Zigzag Alternating' },
                { key: 'd', label: 'D · Chapter Cards' },
                { key: 'e', label: 'E · Marketing Hero' },
                { key: 'illustrated',    label: 'F · Illustrated (hand-drawn SVG)' },
                { key: 'ai-illustrated', label: 'G · AI-illustrated (Replicate)' },
              ].map((o) => (
                <a
                  key={o.key}
                  href={`/design-l/our-story-${o.key}`}
                  className="no-underline transition-all duration-150"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    borderRadius: 9999,
                    border: '1px solid rgba(33,3,64,0.18)',
                    background: '#FFFFFF',
                    color: '#15141A',
                    fontFamily: "'Mozilla Text', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#7543E3'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.borderColor = '#7543E3' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#15141A'; e.currentTarget.style.borderColor = 'rgba(33,3,64,0.18)' }}
                >
                  {o.label}
                </a>
              ))}
            </div>
          </div>
        </section>
        )}
      </main>
    </>
  )
}
