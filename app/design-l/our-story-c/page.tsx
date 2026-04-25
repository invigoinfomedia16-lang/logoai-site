'use client'

// Our Story — Variation C: Zigzag Alternating (no illustrations)
// Each section splits into text-left/accent-right or accent-left/text-right.
// Instead of SVG figures, the "accent" column is a colored quote block,
// big pullquote, or emphasis element using only Firefox palette + dk-* classes.

import LSection from '../_components/LSection'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

function Split({ accent, reverse = false, children }: { accent: React.ReactNode; reverse?: boolean; children: React.ReactNode }) {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', direction: reverse ? 'rtl' : 'ltr' }}
      className="grid-cols-1 md:!grid-cols-2"
    >
      <div style={{ direction: 'ltr' }}>{children}</div>
      <div style={{ direction: 'ltr' }}>{accent}</div>
    </div>
  )
}

// Accent blocks (no illustrations — only typographic / colored blocks)
function AccentSolution({ label, headline }: { label: string; headline: string }) {
  return (
    <div style={{ background: '#7543E3', borderRadius: 20, padding: 48, color: '#FFFFFF' }}>
      <span className="dk-eyebrow block mb-4" style={{ color: '#C7A8FF' }}>{label}</span>
      <p className="dk-h2" style={{ color: '#FFFFFF' }}>{headline}</p>
    </div>
  )
}

function AccentQuote({ quote }: { quote: string }) {
  return (
    <div style={{ background: '#210340', borderRadius: 20, padding: 48 }}>
      <span
        style={{
          display: 'block',
          fontFamily: "'Mozilla Headline', sans-serif",
          fontSize: 72,
          lineHeight: 1,
          fontWeight: 600,
          color: '#C7A8FF',
          marginBottom: 16,
          opacity: 0.6,
        }}
      >
        &ldquo;
      </span>
      <p
        style={{
          fontFamily: "'Mozilla Headline', sans-serif",
          fontSize: 32,
          lineHeight: '40px',
          fontWeight: 600,
          color: '#FFFFFF',
        }}
      >
        {quote}
      </p>
    </div>
  )
}

function AccentPillars({ pillars }: { pillars: { title: string; body: string }[] }) {
  return (
    <div style={{ background: '#F5F0FF', borderRadius: 20, padding: 40 }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {pillars.map((p, i) => (
          <li key={i} style={{ marginBottom: i === pillars.length - 1 ? 0 : 20 }}>
            <h3
              style={{
                fontFamily: "'Mozilla Headline', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: '#7543E3',
                marginBottom: 6,
              }}
            >
              {`0${i + 1} · ${p.title}`}
            </h3>
            <p className="dk-body" style={{ color: 'rgba(21,20,26,0.75)' }}>{p.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function AccentPlaceholder({ caption, range }: { caption: string; range: string }) {
  return (
    <div
      style={{
        background: '#210340',
        borderRadius: 20,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '1/1',
        textAlign: 'center',
      }}
    >
      <p className="dk-caption mb-3" style={{ color: '#C7A8FF' }}>{range}</p>
      <p className="dk-caption" style={{ color: '#C7A8FF', fontStyle: 'italic', maxWidth: 320 }}>{caption}</p>
    </div>
  )
}

function AccentNumbers({ stats, locations }: { stats: { value: string; label: string }[]; locations: string[] }) {
  return (
    <div style={{ background: '#210340', borderRadius: 20, padding: 40, color: '#FFFFFF' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i}>
            <p style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: 28, lineHeight: '36px', fontWeight: 600, marginBottom: 4 }}>{s.value}</p>
            <p className="dk-caption" style={{ color: '#C7A8FF' }}>{s.label}</p>
          </div>
        ))}
      </div>
      <p className="dk-body">{locations.join(' · ')}</p>
    </div>
  )
}

function AccentDomain() {
  return (
    <div
      style={{
        background: '#F5F0FF',
        borderRadius: 20,
        padding: 48,
        textAlign: 'center',
        aspectRatio: '4/3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontFamily: "'Mozilla Headline', sans-serif",
          fontSize: 'clamp(40px, 8vw, 72px)',
          lineHeight: 1,
          fontWeight: 600,
          color: '#7543E3',
        }}
      >
        LOGO.AI
      </p>
    </div>
  )
}

export default function OurStoryC() {
  return (
    <>
      <main>
        {/* Hero — canonical centered */}
        <LSection>
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
          </div>
        </LSection>

        <LSection tone="alt">
          <Split accent={<AccentSolution label="Our answer" headline={C.problem.solution} />}>
            <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.problem.eyebrow}</span>
            <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.problem.title}</h2>
            {C.problem.options.map((t, i) => (
              <p key={i} className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{t}</p>
            ))}
            <p className="dk-body-lg" style={{ color: 'rgba(21,20,26,0.7)', fontStyle: 'italic' }}>{C.problem.gap}</p>
          </Split>
        </LSection>

        <LSection>
          <Split reverse accent={<AccentQuote quote={C.turningPoint.quote} />}>
            <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.turningPoint.eyebrow}</span>
            <p className="dk-body-lg mb-5" style={{ color: '#15141A' }}>{C.turningPoint.intro}</p>
            <p className="dk-body mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.turningPoint.quoteLead}</p>
            <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.turningPoint.diagnosis}</p>
            <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.turningPoint.reframe}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.turningPoint.unlock}</p>
          </Split>
        </LSection>

        <LSection tone="alt">
          <Split accent={<AccentPillars pillars={C.howBuilt.pillars} />}>
            <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.howBuilt.eyebrow}</span>
            <h2 className="dk-h2" style={{ color: '#15141A' }}>{C.howBuilt.title}</h2>
          </Split>
        </LSection>

        <LSection>
          <div className="max-w-[720px] mx-auto text-center mb-12">
            <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.beforeAfter.eyebrow}</span>
            <h2 className="dk-h2" style={{ color: '#15141A' }}>{C.beforeAfter.subtitle}</h2>
          </div>
          <BeforeAfterTimeline />
        </LSection>

        <LSection tone="alt">
          <Split accent={<AccentNumbers stats={C.numbers.stats} locations={C.numbers.locations} />}>
            <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.numbers.eyebrow}</span>
            <h2 className="dk-h2 mb-4" style={{ color: '#15141A' }}>Two and a half years of work, measured.</h2>
            <p className="dk-body-lg" style={{ color: 'rgba(21,20,26,0.7)' }}>Across four countries, thousands of training hours, and a hundred thousand logos analyzed.</p>
          </Split>
        </LSection>

        <LSection>
          <Split reverse accent={<AccentDomain />}>
            <span className="dk-eyebrow block mb-4" style={{ color: '#7543E3' }}>{C.theName.eyebrow}</span>
            <h2 className="dk-h2 mb-6" style={{ color: '#15141A' }}>{C.theName.title}</h2>
            <p className="dk-body-lg mb-4" style={{ color: '#15141A' }}>{C.theName.body}</p>
            <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500, fontStyle: 'italic' }}>{C.theName.closing}</p>
          </Split>
        </LSection>

        {/* Where we are now — centered dark finale */}
        <LSection tone="dark">
          <div className="max-w-[680px] mx-auto text-center">
            <span className="dk-eyebrow inline-block mb-5" style={{ color: '#C7A8FF' }}>{C.now.eyebrow}</span>
            <p className="dk-body-lg mb-3" style={{ color: '#FFFFFF' }}>{C.now.body}</p>
            <p className="dk-body-lg mb-8" style={{ color: '#FFFFFF', fontWeight: 500 }}>{C.now.tease}</p>
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
