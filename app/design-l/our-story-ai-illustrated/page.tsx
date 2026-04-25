'use client'

// Our Story — Variation: AI-illustrated (Replicate-generated flat vector illustrations)
// Illustrations live at /public/images/our-story/*.webp
// Re-generate with: node scripts/generate-our-story-illustrations.mjs
//
// Before/After section keeps the dark placeholder box — the copy explicitly says
// "Proof isn't a demo video. It's the logos." and an illustrated surrogate would
// contradict that claim. Wait for real image pairs.

import Image from 'next/image'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

const IMG = '/images/our-story'

export default function OurStoryAIIllustrated() {
  return (
    <>
      <main>
        {/* Hero — canonical pattern, no illustration (typography owns the hero) */}
        <LSection>
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
          </div>
        </LSection>

        {/* The problem — text left, illustration right */}
        <LSection tone="alt">
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
            className="grid-cols-1 md:!grid-cols-2"
          >
            <div>
              <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.problem.eyebrow}</span>
              <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.problem.title}</h2>
              {C.problem.options.map((t, i) => (
                <p key={i} className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{t}</p>
              ))}
              <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>{C.problem.gap}</p>
              <p className="dk-h3" style={{ color: '#7543E3' }}>{C.problem.solution}</p>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#FFFFFF' }}>
              <Image src={`${IMG}/problem.webp`} alt="" width={800} height={600} className="w-full h-auto" priority />
            </div>
          </div>
        </LSection>

        {/* Turning point — centered illustration above narrative */}
        <LSection>
          <LSectionHeader eyebrow={C.turningPoint.eyebrow} />
          <div className="max-w-[520px] mx-auto mb-10" style={{ borderRadius: 20, overflow: 'hidden' }}>
            <Image src={`${IMG}/turning-point.webp`} alt="" width={800} height={600} className="w-full h-auto" />
          </div>
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

        {/* How we built it — 3 pillar cards, each with a generated icon */}
        <LSection tone="alt">
          <LSectionHeader eyebrow={C.howBuilt.eyebrow} title={C.howBuilt.title} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {C.howBuilt.pillars.map((p, i) => {
              const icon = ['how-built-study', 'how-built-no-template', 'how-built-badge'][i]
              return (
                <div key={i} className="text-center">
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 20,
                      background: '#FFFFFF',
                      margin: '0 auto 20px',
                      overflow: 'hidden',
                      border: '1px solid rgba(32,18,58,0.08)',
                    }}
                  >
                    <Image src={`${IMG}/${icon}.webp`} alt="" width={240} height={240} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="dk-h3 mb-3" style={{ color: '#15141A' }}>{p.title}</h3>
                  <p className="dk-body" style={{ color: 'rgba(21,20,26,0.7)' }}>{p.body}</p>
                </div>
              )
            })}
          </div>
        </LSection>


        {/* Before / After — horizontal 4-step timeline */}
        <LSection>
          <LSectionHeader eyebrow={C.beforeAfter.eyebrow} title={C.beforeAfter.subtitle} />
          <BeforeAfterTimeline />
        </LSection>

        {/* Numbers — no illustration, data is the point */}
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
                <p style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 36, lineHeight: '44px', fontWeight: 600, color: '#FFFFFF', marginBottom: 6 }}>{s.value}</p>
                <p className="dk-caption" style={{ color: '#C7A8FF' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="dk-body-lg text-center" style={{ color: '#FFFFFF' }}>{C.numbers.locations.join(' · ')}</p>
        </LSection>

        {/* The name — text left, domain illustration right */}
        <LSection>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
            className="grid-cols-1 md:!grid-cols-2"
          >
            <div>
              <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.theName.eyebrow}</span>
              <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.theName.title}</h2>
              <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.theName.body}</p>
              <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>{C.theName.closing}</p>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden' }}>
              <Image src={`${IMG}/the-name.webp`} alt="" width={800} height={600} className="w-full h-auto" />
            </div>
          </div>
        </LSection>

        {/* Where we are now — CTA, no illustration */}
        <LSection tone="alt">
          <LSectionHeader eyebrow={C.now.eyebrow} />
          <div className="max-w-[680px] mx-auto text-center">
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
