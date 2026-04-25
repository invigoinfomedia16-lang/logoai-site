'use client'

// Leadership — founders + team + how we operate + closing belief.
// Copy verbatim from CONTENT/NEW/LEADERSHIP.docx.

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import LBottomCTA from '../_components/LBottomCTA'

const FOUNDERS = [
  {
    name: 'Abhinav Reddy',
    role: 'Co-Founder, Product & Technology',
    statement: "Building AI that disappears. The kind you stop noticing because it just gets it right.",
  },
  {
    name: 'Ashwin Reddy',
    role: 'Co-Founder, Strategy & Growth',
    statement: "The best growth strategy is a product people can't stop talking about. Everything else is a distant second.",
  },
]

const PRIOR_WORK = [
  'Media platforms reaching tens of millions — stock photos, comics, and creator communities',
  'Education platforms spanning hundreds of programs and structured learning paths',
  'Productivity tools used by founders, job seekers, and professionals worldwide',
]

const OPERATING_PRINCIPLES = [
  "Remove friction, don't add features",
  'Make the complicated feel simple',
  'Let the system do the work',
  'Ship only what people will love',
]

export default function LeadershipPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Leadership</h1>
          <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500 }}>
            The team behind LOGO.AI
          </p>
        </div>
      </LSection>

      {/* Founders — 2 card grid */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="Our founders" title="Two brothers. One conviction." />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {FOUNDERS.map((f, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 40,
                border: '1px solid rgba(32,18,58,0.08)',
              }}
            >
              <h3 className="dk-h3 m-0 mb-1" style={{ color: '#15141A' }}>{f.name}</h3>
              <p className="dk-caption mb-6" style={{ color: '#7543E3', fontWeight: 500 }}>
                {f.role}
              </p>
              <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.75)', fontStyle: 'italic' }}>
                &ldquo;{f.statement}&rdquo;
              </p>
            </div>
          ))}
        </div>
        <div className="max-w-[720px] mx-auto text-center">
          <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
            Three decades. Two brothers. One conviction: If people don&apos;t love the product, nothing else matters.
          </p>
        </div>
      </LSection>

      {/* Before LOGO.AI */}
      <LSection>
        <LSectionHeader title="Before LOGO.AI" />
        <div className="max-w-[720px] mx-auto">
          <p className="dk-body-lg mb-6" style={{ color: 'rgba(21,20,26,0.7)' }}>
            We built AI systems long before AI was cool — personality chatbots, website assistants, game AI that learned how you played, recommendation engines, and algorithmic trading systems.
          </p>
          <p className="dk-body-lg mb-4" style={{ color: '#15141A', fontWeight: 500 }}>
            And we shipped products across a dozen industries:
          </p>
          <ul className="flex flex-col gap-3 list-none p-0 m-0 mb-6">
            {PRIOR_WORK.map((w, i) => (
              <li key={i} className="dk-body-lg flex items-start gap-3" style={{ color: '#15141A' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 9999,
                    background: '#7543E3',
                    marginTop: 10,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <p className="dk-body-lg" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Some stayed niche. Others scaled to millions. Three decades. Multiple exits. Billions of users reached.
          </p>
        </div>
      </LSection>

      {/* The team */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="The team" title="Twelve people. Four countries. Obsessed with getting it right." />
        <div className="max-w-[720px] mx-auto flex flex-col gap-5 text-center">
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Engineers who left big tech. Designers who left top agencies. AI researchers who&apos;d rather build than publish.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            They all showed up for the same reason — to prove AI can design as well as a human. And the stubbornness to not ship until it does.
          </p>
        </div>
      </LSection>

      {/* How we operate */}
      <LSection>
        <LSectionHeader eyebrow="How we operate" title="Four principles. One goal." />
        <div className="max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {OPERATING_PRINCIPLES.map((p, i) => (
            <div
              key={i}
              style={{
                background: '#F5F0FF',
                borderRadius: 16,
                padding: 28,
                border: '1px solid rgba(32,18,58,0.08)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'Mozilla Headline', sans-serif",
                  fontSize: 28,
                  lineHeight: 1,
                  fontWeight: 600,
                  color: '#7543E3',
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="dk-body-lg m-0" style={{ color: '#15141A' }}>{p}</p>
            </div>
          ))}
        </div>
      </LSection>

      <LBottomCTA
        title="If the product isn't something people love, nothing else matters."
        body="That's what we built LOGO.AI to prove."
        ctaLabel="See what we built"
        caption=""
      />
    </main>
  )
}
