'use client'

// Why LOGO.AI — 5 differentiators + comparison table + testimonials + CTA.
// Copy verbatim from CONTENT/NEW/WHY LOGO AI.doc.

import Link from 'next/link'
import { ArrowRight, Check, X } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import LBottomCTA from '../_components/LBottomCTA'
import { getLogosClaimed } from '@/data'

const DIFFERENTIATORS = [
  {
    num: '01',
    title: "It's faster than anything out there",
    lede: '60 seconds. Not 6 weeks. Not 2 hours of trial and error.',
    body: 'Designers take three to six weeks. Other AI tools take hours of back-and-forth. LOGO.AI generates a finished, professional logo in under a minute.',
    tag: 'One input. One minute. One logo you can actually use.',
  },
  {
    num: '02',
    title: "It's free where others charge",
    lede: '$0. Not $20,000. Not $100 a month.',
    body: 'Hiring a designer costs $5K–$50K+. Other AI logo makers charge monthly subscriptions. LOGO.AI is completely free — no hidden fees, no watermarks, no credit card.',
    tag: 'You own your logo. Forever.',
  },
  {
    num: '03',
    title: "It designs. It doesn't assemble.",
    lede: 'Every logo is original. Not recombined from templates.',
    body: 'Most AI logo makers shuffle clip art and call it design. LOGO.AI was trained on real design principles — color theory, typography pairing, negative space, grid systems, visual hierarchy.',
    tag: "The AI doesn't pick pieces from a library. It makes design decisions.",
  },
  {
    num: '04',
    title: 'It gives you more than a logo',
    lede: "Most tools stop at the logo. LOGO.AI doesn't.",
    body: 'Other logo makers hand you a file and walk away. LOGO.AI gives you a full brand system — business cards, social assets, app icons, mockups, the works. All designed to match.',
    tag: 'The logo is free. The brand kit is a paid upgrade, ready the moment you need it.',
  },
  {
    num: '05',
    title: 'It holds up everywhere',
    lede: 'On a business card. On a billboard. On a favicon. At every size.',
    body: "A great logo isn't just pretty. It works at 16 pixels and at 16 feet. LOGO.AI is built for every screen, every surface, every format — so your brand stays consistent as it scales.",
    tag: null,
  },
]

type Row = { label: string; logoai: string | boolean; designer: string | boolean; otherAI: string | boolean }
const COMPARISON: Row[] = [
  { label: 'Cost',                                   logoai: 'Free',                     designer: '$5K–$50K+',        otherAI: '$20–$100/mo' },
  { label: 'Time to logo',                           logoai: '60 seconds',               designer: '3–6 weeks',        otherAI: '2–4 hours' },
  { label: 'Approach',                               logoai: 'AI-designed',              designer: 'Human process',    otherAI: 'Templates' },
  { label: 'Output quality',                         logoai: 'Professional, consistent', designer: 'High (depends)',   otherAI: 'Generic, inconsistent' },
  { label: 'Originality',                            logoai: true,                       designer: true,               otherAI: false },
  { label: 'Trained on real design principles',      logoai: true,                       designer: 'N/A',              otherAI: false },
  { label: 'Understands your brand',                 logoai: true,                       designer: true,               otherAI: false },
  { label: 'Full brand system',                      logoai: true,                       designer: 'Custom quote',     otherAI: false },
  { label: 'Revisions needed',                       logoai: 'None',                     designer: 'Multiple rounds',  otherAI: 'Trial and error' },
]

const TESTIMONIALS = [
  { quote: "Sixty seconds. One of them was better than the six my agency sent after three weeks.", name: 'Daniel Walsh', role: 'Founder, Clearline (Fintech)' },
  { quote: "I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.", name: 'Sarah Mitchell', role: 'Founder, Greenleaf Co. (E-commerce)' },
  { quote: "I showed three options to my team. They couldn't tell which one was AI. Neither could I.", name: 'Michael Reyes', role: 'Co-Founder, Beacon Labs (AI tools)' },
  { quote: "I've rebranded three companies. This was the only one that didn't take six weeks.", name: 'Chris Donovan', role: 'Founder, Bright Harbor (Consulting)' },
  { quote: "The typography alone looks like it came from a $15K studio. Then I saw the price.", name: 'Alex Rivera', role: 'Founder, Stack & Field (SaaS)' },
  { quote: "One input. One minute. Real design. I honestly didn't think this existed yet.", name: 'Megan Foster', role: 'Founder, Saltline Studio (Creative agency)' },
]

function Cell({ v, accent = false }: { v: string | boolean; accent?: boolean }) {
  if (v === true) return <Check weight="bold" size={22} style={{ color: accent ? '#7543E3' : '#15141A' }} />
  if (v === false) return <X weight="bold" size={22} style={{ color: 'rgba(21,20,26,0.35)' }} />
  return <span className="dk-body" style={{ color: accent ? '#15141A' : 'rgba(21,20,26,0.7)', fontWeight: accent ? 600 : 400 }}>{v}</span>
}

export default function WhyLogoAIPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection hero>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Why LOGO.AI</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            The fastest way to a professional logo
          </p>
          <p className="dk-body-lg max-w-[680px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>
            No designers. No templates. No cost.
          </p>
          <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
            Describe your brand. Get a studio-quality logo in 60 seconds. Completely free.
          </p>
        </div>
      </LSection>

      {/* Demo video — see LOGO.AI in action */}
      <LSection>
        <LSectionHeader eyebrow="See it in action" title="Watch LOGO.AI design a brand in 60 seconds." />
        <div className="max-w-[960px] mx-auto">
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: '16 / 9',
              borderRadius: 20,
              background: 'linear-gradient(135deg, #210340 0%, #3D1B7A 60%, #5B30B5 100%)',
              border: '1px solid rgba(32,18,58,0.08)',
              boxShadow: '0 18px 48px rgba(33,3,64,0.18)',
            }}
          >
            {/* Soft purple glow ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(199,168,255,0.18) 0%, rgba(199,168,255,0) 60%)',
              }}
            />
            {/* Centered play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                aria-hidden="true"
                className="flex items-center justify-center"
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 9999,
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '14px solid transparent',
                    borderBottom: '14px solid transparent',
                    borderLeft: '22px solid #FFFFFF',
                    marginLeft: 6,
                  }}
                />
              </div>
              <p
                className="dk-caption m-0"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Video coming soon
              </p>
            </div>
          </div>
          <p className="dk-caption text-center mt-4" style={{ color: 'rgba(21,20,26,0.55)' }}>
            One input. Sixty seconds. A finished logo.
          </p>
        </div>
      </LSection>

      {/* 5 differentiators — single section so they read as one continuous block */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="What sets us apart" title="Five reasons LOGO.AI is different." />
        <div className="max-w-[900px] mx-auto flex flex-col" style={{ gap: 'clamp(48px, 7vw, 80px)' }}>
          {DIFFERENTIATORS.map((d, i) => (
            <div key={d.num} className="flex flex-col">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 mb-6">
                <span
                  style={{
                    fontFamily: "'Mozilla Headline', sans-serif",
                    fontSize: 'clamp(40px, 6vw, 64px)',
                    lineHeight: 1,
                    fontWeight: 600,
                    color: '#7543E3',
                    flexShrink: 0,
                  }}
                >
                  {d.num}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="dk-h2 mb-3" style={{ color: '#15141A' }}>{d.title}</h3>
                  <p className="dk-body-lg m-0" style={{ color: '#7543E3', fontWeight: 500 }}>{d.lede}</p>
                </div>
              </div>
              <div className="max-w-[720px]" style={{ marginLeft: 'clamp(0px, 7vw, 100px)' }}>
                <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>{d.body}</p>
                {d.tag && (
                  <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>{d.tag}</p>
                )}
              </div>
              {/* Soft divider between differentiators (not after last) */}
              {i < DIFFERENTIATORS.length - 1 && (
                <div
                  className="mx-auto mt-12"
                  style={{
                    width: 60,
                    height: 1,
                    background: 'rgba(117,67,227,0.25)',
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </LSection>

      {/* Comparison table */}
      <LSection>
        <LSectionHeader eyebrow="How LOGO.AI compares" title="Here's the side-by-side." />
        <div className="max-w-[900px] mx-auto" style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid rgba(32,18,58,0.08)',
              overflow: 'hidden',
              minWidth: 720,
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: 'clamp(14px,2.5vw,20px) clamp(12px,2.5vw,24px)', textAlign: 'left', background: 'rgba(32,18,58,0.03)' }}></th>
                <th style={{ padding: 'clamp(14px,2.5vw,20px) clamp(12px,2.5vw,24px)', textAlign: 'left', background: '#F5F0FF', borderBottom: '2px solid #7543E3' }}>
                  <span className="dk-caption" style={{ color: '#7543E3', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>LOGO.AI</span>
                </th>
                <th style={{ padding: 'clamp(14px,2.5vw,20px) clamp(12px,2.5vw,24px)', textAlign: 'left', background: 'rgba(32,18,58,0.03)' }}>
                  <span className="dk-caption" style={{ color: 'rgba(21,20,26,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Hire a Designer</span>
                </th>
                <th style={{ padding: 'clamp(14px,2.5vw,20px) clamp(12px,2.5vw,24px)', textAlign: 'left', background: 'rgba(32,18,58,0.03)' }}>
                  <span className="dk-caption" style={{ color: 'rgba(21,20,26,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Other AI Logo Makers</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={i} style={{ borderTop: i > 0 ? '1px solid rgba(32,18,58,0.06)' : 'none' }}>
                  <td style={{ padding: 'clamp(12px,2.5vw,18px) clamp(12px,2.5vw,24px)', borderTop: '1px solid rgba(32,18,58,0.06)' }}>
                    <span className="dk-body" style={{ color: '#15141A', fontWeight: 500 }}>{row.label}</span>
                  </td>
                  <td style={{ padding: '18px 24px', background: 'rgba(117,67,227,0.04)', borderTop: '1px solid rgba(32,18,58,0.06)' }}>
                    <Cell v={row.logoai} accent />
                  </td>
                  <td style={{ padding: 'clamp(12px,2.5vw,18px) clamp(12px,2.5vw,24px)', borderTop: '1px solid rgba(32,18,58,0.06)' }}>
                    <Cell v={row.designer} />
                  </td>
                  <td style={{ padding: 'clamp(12px,2.5vw,18px) clamp(12px,2.5vw,24px)', borderTop: '1px solid rgba(32,18,58,0.06)' }}>
                    <Cell v={row.otherAI} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LSection>

      {/* Testimonials */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="What founders are saying" title="Real feedback, real projects." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        body={`Join ${getLogosClaimed().toLocaleString('en-US')}+ founders who've already claimed their spot. Two million free logos at launch — first come, first served.`}
        ctaLabel="Claim yours now"
      />
    </main>
  )
}
