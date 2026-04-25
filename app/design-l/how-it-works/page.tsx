'use client'

// How It Works — 3-step walkthrough + behind-the-scenes + testimonials + CTA.
// Copy verbatim from CONTENT/NEW/HOW It WORKS.docx.

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import LBottomCTA from '../_components/LBottomCTA'
import { getLogosClaimed, getLogosRemaining } from '@/data'

const STEPS = [
  {
    num: '01',
    eyebrow: 'Step 01 — Describe your brand',
    title: 'Tell us who you are in two sentences.',
    body: 'Enter your business name. Add a short description — what you do, who you serve, and the feeling you want your brand to convey.',
    callout: "That's it. No color pickers. No style quizzes. No 40-question brand briefs.",
    aiNote: {
      label: 'What the AI is doing',
      body: 'Reading your description the way a creative director reads a brief. Identifying your industry. Parsing your tone. Inferring your audience. Mapping everything to design decisions — which typefaces will suit you, which color palettes fit your category, which visual styles match your personality.',
    },
    tail: 'In seconds, the AI builds a mental picture of your brand. The kind a designer would take two meetings to form.',
  },
  {
    num: '02',
    eyebrow: 'Step 02 — Watch AI design it',
    title: 'In under 60 seconds, the AI generates original logo concepts — each one designed specifically for your brand.',
    body: 'No loading spinners. No "please wait three business days." Just real-time generation.',
    callout: null,
    aiNote: {
      label: 'What the AI is doing',
      body: 'Applying the same principles a professional designer uses — color theory, typography pairing, negative space, grid systems, visual hierarchy.',
    },
    tail: "It's not pulling shapes from a library. It's not swapping in clip art. It's designing — making decisions about proportion, balance, contrast, and meaning. You'll see multiple directions: different styles, different layouts, different moods. All original. All built for your brand.",
  },
  {
    num: '03',
    eyebrow: 'Step 03 — Download and launch',
    title: 'Pick your favorite. Download instantly.',
    body: 'High-resolution PNG with a transparent background. Ready for your website, your social media, your business cards, your signage — everywhere your brand needs to show up.',
    callout: 'No account setup. No credit card. No watermark.',
    aiNote: {
      label: 'What you get',
      body: 'A real logo. An original design. Yours to use anywhere, forever.',
    },
    tail: 'Want more? The full brand kit — business cards, app icons, social templates, mockups — is available as a paid upgrade whenever you\'re ready.',
  },
]

const TESTIMONIALS = [
  { quote: "Sixty seconds. One of them was better than the six my agency sent after three weeks.", name: 'Daniel Walsh', role: 'Founder, Clearline (Fintech)' },
  { quote: "I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.", name: 'Sarah Mitchell', role: 'Founder, Greenleaf Co. (E-commerce)' },
  { quote: "One input. One minute. Real design. I honestly didn't think this existed yet.", name: 'Megan Foster', role: 'Founder, Saltline Studio (Creative agency)' },
]

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>How It Works</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            From idea to logo in 60 seconds
          </p>
          <p className="dk-body-lg max-w-[680px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Three steps. One input from you. Zero design skills required.
          </p>
          <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
            Here&apos;s exactly what happens when you use LOGO.AI.
          </p>
        </div>
      </LSection>

      {/* Steps */}
      {STEPS.map((s, i) => (
        <LSection key={s.num} tone={i % 2 === 0 ? 'alt' : 'default'}>
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10">
              <p className="dk-eyebrow mb-4" style={{ color: '#7543E3' }}>{s.eyebrow}</p>
              <h2 className="dk-h2" style={{ color: '#15141A' }}>{s.title}</h2>
            </div>
            <div className="max-w-[720px] mx-auto flex flex-col gap-5">
              <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{s.body}</p>
              {s.callout && (
                <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>{s.callout}</p>
              )}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 16,
                  padding: 28,
                  border: '1px solid rgba(32,18,58,0.08)',
                  borderLeft: '3px solid #7543E3',
                  marginTop: 8,
                }}
              >
                <p className="dk-caption m-0 mb-2" style={{ color: '#7543E3', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                  {s.aiNote.label}
                </p>
                <p className="dk-body-lg m-0" style={{ color: '#15141A' }}>{s.aiNote.body}</p>
              </div>
              <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{s.tail}</p>
            </div>
          </div>
        </LSection>
      ))}

      {/* Behind the scenes */}
      <LSection>
        <LSectionHeader eyebrow="Behind the scenes" title="What makes LOGO.AI different from other AI tools" />
        <div className="max-w-[720px] mx-auto flex flex-col gap-5">
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Most AI logo makers recombine pre-made templates and stock assets. They&apos;re essentially clip-art shufflers with a machine-learning coat of paint.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            LOGO.AI is different.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Our AI was trained on the same principles real designers use — studying iconic logos, breaking down what makes them work, learning the invisible grids and ratios behind great design.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            It doesn&apos;t assemble a logo. It designs one. From scratch. Every time.
          </p>
        </div>
      </LSection>

      {/* Testimonials */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="What founders are saying" title="The feedback so far." />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 28,
                border: '1px solid rgba(32,18,58,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                flex: '1 1 280px',
                maxWidth: 340,
                minWidth: 260,
              }}
            >
              <p className="dk-body-lg m-0" style={{ color: '#15141A', fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="dk-body m-0" style={{ color: '#15141A', fontWeight: 600 }}>{t.name}</p>
                <p className="dk-caption m-0 mt-1" style={{ color: 'rgba(21,20,26,0.6)' }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </LSection>

      <LBottomCTA
        title="Your logo is sixty seconds away"
        body={`${getLogosClaimed().toLocaleString('en-US')}+ founders have already claimed their spot. ${getLogosRemaining().toLocaleString('en-US')} free logos left.`}
      />
    </main>
  )
}
