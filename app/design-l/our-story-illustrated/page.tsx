'use client'

// Our Story — Variation: Illustrated
// Canonical layout + flat geometric vector illustrations for sections where they
// add value: Problem (contrast), Turning Point (unlock moment), How We Built It
// (per-pillar icon), Before/After (warped→clean), The Name (domain visual).
// All illustrations use Firefox palette only. All typography via dk-* classes.

import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import BeforeAfterTimeline from '../_components/BeforeAfterTimeline'
import { OUR_STORY_CONTENT as C } from '../_components/OurStoryContent'

// ── Illustrations ───────────────────────────────────────────────────────────

// Problem: two bad options. Left = hourglass + coin stack (slow + expensive),
// Right = 3x3 grid of identical logo marks (templated / all the same).
// Thin dashed seam in the middle + a light X-strike signalling "neither works."
function ProblemIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-auto" aria-hidden="true">
      {/* Dashed vertical seam — no third option */}
      <line x1="200" y1="32" x2="200" y2="288" stroke="#210340" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" />

      {/* ── LEFT · The designer path: slow + expensive ── */}
      {/* Hourglass */}
      <g transform="translate(100 120)" stroke="#210340" strokeWidth="4" strokeLinejoin="round">
        <rect x="-40" y="-52" width="80" height="6" rx="1.5" fill="#210340" />
        <rect x="-40"  y="46" width="80" height="6" rx="1.5" fill="#210340" />
        {/* top chamber (draining) */}
        <path d="M -34 -46 L 34 -46 L 4 -3 L -4 -3 Z" fill="#C7A8FF" />
        {/* bottom chamber (filling) */}
        <path d="M -34 46 L 34 46 L 4 3 L -4 3 Z" fill="none" />
        {/* the trickle of sand */}
        <line x1="0" y1="-3" x2="0" y2="18" stroke="#7543E3" strokeWidth="3" strokeLinecap="round" />
        {/* sand pile in bottom chamber */}
        <path d="M -20 46 L 20 46 L 10 30 L -10 30 Z" fill="#7543E3" stroke="none" />
      </g>

      {/* Stack of coins — money */}
      <g transform="translate(100 244)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${-i * 11})`}>
            <ellipse cx="0" cy="0" rx="34" ry="9" fill={i === 2 ? '#7543E3' : '#6132BC'} stroke="#210340" strokeWidth="2" />
            {i === 2 && (
              <text x="0" y="4" textAnchor="middle" fontFamily="'Mozilla Headline', sans-serif" fontSize="14" fontWeight="700" fill="#FFFFFF">$</text>
            )}
          </g>
        ))}
      </g>

      {/* ── RIGHT · The DIY path: 3x3 grid of identical logo marks ── */}
      <g transform="translate(300 160)">
        {Array.from({ length: 9 }).map((_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const cx = (col - 1) * 36
          const cy = (row - 1) * 36
          return (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <circle cx="0" cy="0" r="14" fill="#C7A8FF" />
              {/* stylized 4-point mark inside each — identical cookie-cutter shape */}
              <path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#6132BC" />
            </g>
          )
        })}
      </g>

      {/* X-strike across both — neither works */}
      <g stroke="#7543E3" strokeWidth="4" strokeLinecap="round" opacity="0.35">
        <line x1="50" y1="55"  x2="350" y2="265" />
        <line x1="350" y1="55" x2="50"  y2="265" />
      </g>
    </svg>
  )
}

// Turning point: starburst / spark = the unlock moment
function TurningPointIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-auto" aria-hidden="true">
      {/* Outer radiating rays */}
      <g stroke="#C7A8FF" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2
          const r1 = i % 2 === 0 ? 80 : 100
          const r2 = i % 2 === 0 ? 150 : 130
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * r1}
              y1={160 + Math.sin(a) * r1}
              x2={200 + Math.cos(a) * r2}
              y2={160 + Math.sin(a) * r2}
              strokeWidth={i % 2 === 0 ? 5 : 3}
              opacity={i % 2 === 0 ? 0.9 : 0.6}
            />
          )
        })}
      </g>
      {/* Inner core circle (the idea) */}
      <circle cx="200" cy="160" r="52" fill="#7543E3" />
      {/* Central glyph — stylized spark/star */}
      <path
        d="M 200 130 L 208 154 L 232 160 L 208 166 L 200 190 L 192 166 L 168 160 L 192 154 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

// Per-pillar icons for "How we built it" — 3 distinct simple marks, all 64×64 viewBox
function IconStudy() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      {/* Open book shape */}
      <path d="M 32 18 L 14 22 L 14 46 L 32 42 Z" fill="#7543E3" />
      <path d="M 32 18 L 50 22 L 50 46 L 32 42 Z" fill="#6132BC" />
      <line x1="20" y1="30" x2="28" y2="29" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
      <line x1="20" y1="35" x2="28" y2="34" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
      <line x1="36" y1="29" x2="44" y2="30" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
      <line x1="36" y1="34" x2="44" y2="35" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
    </svg>
  )
}

function IconNoTemplate() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      {/* Template grid */}
      <rect x="14" y="14" width="14" height="14" rx="2" fill="#C7A8FF" />
      <rect x="36" y="14" width="14" height="14" rx="2" fill="#C7A8FF" />
      <rect x="14" y="36" width="14" height="14" rx="2" fill="#C7A8FF" />
      <rect x="36" y="36" width="14" height="14" rx="2" fill="#C7A8FF" />
      {/* Red-purple slash indicating "no templates" */}
      <line x1="10" y1="54" x2="54" y2="10" stroke="#7543E3" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      {/* Rosette / checkmark badge */}
      <circle cx="32" cy="28" r="18" fill="#7543E3" />
      <path d="M 24 28 L 30 34 L 40 22" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ribbons below */}
      <path d="M 22 42 L 20 56 L 28 50 Z" fill="#6132BC" />
      <path d="M 42 42 L 44 56 L 36 50 Z" fill="#6132BC" />
    </svg>
  )
}

// Before/After: warped scribble → clean logo mark
function BeforeAfterIllustration() {
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto" aria-hidden="true">
      <rect width="600" height="220" rx="20" fill="#210340" />
      {/* Left side — warped / broken text */}
      <g transform="translate(60 110)">
        <path d="M -30 -20 q 10 -30 25 -5 q 10 20 -10 15 q -20 -8 5 10" fill="none" stroke="#C7A8FF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M 10 -15 q 15 -10 10 15 q -8 15 -15 0" fill="none" stroke="#C7A8FF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <circle cx="55" cy="-5" r="8" fill="#C7A8FF" opacity="0.5" />
        <rect x="40" y="10" width="30" height="4" fill="#C7A8FF" opacity="0.4" transform="rotate(-12 55 12)" />
      </g>
      {/* Arrow */}
      <g transform="translate(280 110)">
        <line x1="-30" y1="0" x2="30" y2="0" stroke="#E0CAFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        <path d="M 20 -8 L 30 0 L 20 8" fill="none" stroke="#E0CAFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      </g>
      {/* Right side — clean logo mark (circle + wordmark bar) */}
      <g transform="translate(420 110)">
        <circle cx="0" cy="0" r="32" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
        <rect x="50" y="-6" width="70" height="12" rx="2" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

// The name: a browser-window-ish block displaying LOGO.AI
function NameIllustration() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-auto" aria-hidden="true">
      <rect width="400" height="260" rx="18" fill="#F5F0FF" stroke="rgba(32,18,58,0.1)" />
      {/* Window dots */}
      <circle cx="28" cy="28" r="5" fill="#C7A8FF" />
      <circle cx="46" cy="28" r="5" fill="#C7A8FF" />
      <circle cx="64" cy="28" r="5" fill="#C7A8FF" />
      {/* URL bar */}
      <rect x="20" y="50" width="360" height="34" rx="8" fill="#FFFFFF" stroke="rgba(32,18,58,0.1)" />
      <text x="40" y="72" fontFamily="'Mozilla Text', sans-serif" fontSize="14" fill="rgba(21,20,26,0.55)">
        https://logo.ai
      </text>
      {/* Big wordmark */}
      <text
        x="200"
        y="180"
        textAnchor="middle"
        fontFamily="'Mozilla Headline', sans-serif"
        fontSize="56"
        fontWeight="600"
        fill="#7543E3"
      >
        LOGO.AI
      </text>
    </svg>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function OurStoryIllustrated() {
  return (
    <>
      <main>
        {/* Hero — canonical centered pattern, no illustration (typography-forward) */}
        <LSection>
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>{C.pageTitle}</h1>
            <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>{C.heroHeadline}</p>
            <p className="dk-body-lg max-w-[620px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{C.heroBody}</p>
            <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>{C.heroClosing}</p>
          </div>
        </LSection>

        {/* The problem — split: text left, contrast illustration right */}
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
            <div><ProblemIllustration /></div>
          </div>
        </LSection>

        {/* The turning point — centered illustration above the narrative */}
        <LSection>
          <LSectionHeader eyebrow={C.turningPoint.eyebrow} />
          <div className="max-w-[400px] mx-auto mb-10">
            <TurningPointIllustration />
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

        {/* How we built it — 3 pillar cards, each with a custom icon instead of a numbered square */}
        <LSection tone="alt">
          <LSectionHeader eyebrow={C.howBuilt.eyebrow} title={C.howBuilt.title} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {C.howBuilt.pillars.map((p, i) => {
              const Icon = [IconStudy, IconNoTemplate, IconBadge][i]
              return (
                <div key={i} className="text-center">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20,
                      background: '#F5F0FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      padding: 14,
                    }}
                  >
                    <Icon />
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

        {/* The name — split: text left, domain illustration right */}
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
            <div><NameIllustration /></div>
          </div>
        </LSection>

        {/* Where we are now — no illustration, CTA is the focus */}
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
