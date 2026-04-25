'use client'

// Who It's For — 5 audience segments, alternating tone sections.
// Copy verbatim from CONTENT/NEW/WHO IT'S FOR.docx.

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import LBottomCTA from '../_components/LBottomCTA'
import { getLogosClaimed, getLogosRemaining } from '@/data'

type Segment = {
  eyebrow: string
  title: string
  lede: string
  body: string
  bulletsLabel: string
  bullets: string[]
  quote: string
  attribution: string
  tone: 'default' | 'alt'
}

const SEGMENTS: Segment[] = [
  {
    eyebrow: 'For startup founders',
    title: "You're moving fast. Your logo shouldn't slow you down.",
    lede: "Three weeks on a logo is three weeks you're not building. Three months on a brand identity is three months your competitors are shipping.",
    body: "LOGO.AI designs a logo that looks like you paid for a studio — in sixty seconds. Describe your startup in a sentence or two, and you'll have professional concepts ready to use on your pitch deck, your landing page, your Product Hunt launch.",
    bulletsLabel: 'Why founders choose LOGO.AI:',
    bullets: [
      '60 seconds vs. 6 weeks of agency back-and-forth',
      'Free instead of $20,000+',
      'Looks investor-ready from day one',
      'Works everywhere — pitch deck, website, app icon, socials',
    ],
    quote: 'Sixty seconds. One of them was better than the six my agency sent after three weeks.',
    attribution: 'Daniel Walsh — Founder, Clearline (Fintech)',
    tone: 'alt',
  },
  {
    eyebrow: 'For small businesses',
    title: 'Look established from day one.',
    lede: "Your customers don't care how long you've been in business. They care whether you look like you know what you're doing.",
    body: 'LOGO.AI gives small businesses — restaurants, consultancies, retail shops, service providers — a logo that signals "we\'re the real deal." Professional typography. Clean design. A brand that holds up on your sign, your storefront, your invoices, your social media.',
    bulletsLabel: 'Why small businesses choose LOGO.AI:',
    bullets: [
      "No $5K design bill before you've made your first sale",
      'Same quality a local agency would deliver',
      'Ready for print, web, and signage',
      "Full brand kit available when you're ready to scale",
    ],
    quote: "I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.",
    attribution: 'Sarah Mitchell — Founder, Greenleaf Co. (E-commerce)',
    tone: 'default',
  },
  {
    eyebrow: 'For creators and side projects',
    title: 'Your side project deserves a real logo.',
    lede: "Your podcast, your Substack, your YouTube channel, your indie app, your weekend idea that might turn into something — they all deserve to look the part.",
    body: "LOGO.AI gives creators professional-grade logos without the professional-grade price tag. Whether it's a personal brand, a content series, or a passion project that's not ready for a five-figure design budget, you can have something that looks intentional in under a minute.",
    bulletsLabel: 'Why creators choose LOGO.AI:',
    bullets: [
      'Free means you can actually afford to have one',
      'Every project you launch gets a unique logo',
      'Ready for YouTube thumbnails, podcast art, Twitter banners, app icons',
      'As serious about design as you are about the work',
    ],
    quote: "Finally. A logo tool that doesn't feel like a logo tool.",
    attribution: 'Lauren Brooks — Founder, Habit House (Consumer wellness)',
    tone: 'alt',
  },
  {
    eyebrow: 'For e-commerce brands',
    title: 'Your brand lives on packaging, social, and screens. It needs to work everywhere.',
    lede: "A DTC brand's logo doesn't get one moment to shine — it shows up on product labels, Instagram grids, Shopify storefronts, shipping boxes, ads, and email headers. If it doesn't scale, it doesn't work.",
    body: 'LOGO.AI is built for scale. Every logo is designed to look sharp at every size, on every surface — from a Shopify favicon to a retail shelf label.',
    bulletsLabel: 'Why e-commerce brands choose LOGO.AI:',
    bullets: [
      'Works at 16 pixels and at 16 inches',
      'Transparent PNG ready for any background',
      'Brand kit includes social templates, packaging-ready assets, and mockups',
      "Original design — so your brand doesn't look like every other DTC store",
    ],
    quote: "I've rebranded three companies. This was the only one that didn't take six weeks.",
    attribution: 'Chris Donovan — Founder, Bright Harbor (Consulting)',
    tone: 'default',
  },
  {
    eyebrow: 'For agencies and freelancers',
    title: 'Deliver faster. Charge more. Keep the quality bar high.',
    lede: "Most agencies spend 20–40 hours on early logo exploration — rounds of sketches, revisions, client back-and-forth. That's billable time you could spend on higher-value work.",
    body: 'LOGO.AI lets agencies and freelancers generate dozens of strong, original logo directions in minutes. Use them as starting points, variations, or client-presentation options. Keep the strategic and creative work where the margin is — skip the grinding iteration.',
    bulletsLabel: 'Why agencies use LOGO.AI:',
    bullets: [
      'Explore 10 logo directions in 10 minutes',
      'Save 20+ hours per client on early-stage design',
      'Present more options without burning your team',
      'White-label-friendly for your workflow',
    ],
    quote: "One input. One minute. Real design. I honestly didn't think this existed yet.",
    attribution: 'Megan Foster — Founder, Saltline Studio (Creative agency)',
    tone: 'alt',
  },
]

function SegmentBlock({ s }: { s: Segment }) {
  return (
    <LSection tone={s.tone}>
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-10">
          <span className="dk-eyebrow inline-block mb-4" style={{ color: '#7543E3' }}>{s.eyebrow}</span>
          <h2 className="dk-h2 mb-4" style={{ color: '#15141A' }}>{s.title}</h2>
        </div>
        <div className="max-w-[720px] mx-auto flex flex-col gap-5 mb-8">
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>{s.lede}</p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{s.body}</p>
        </div>
        <div className="max-w-[720px] mx-auto mb-10">
          <p className="dk-caption mb-4" style={{ color: '#7543E3', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            {s.bulletsLabel}
          </p>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {s.bullets.map((b, i) => (
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
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <blockquote
          className="max-w-[720px] mx-auto m-0 p-0"
          style={{
            borderLeft: '3px solid #7543E3',
            paddingLeft: 24,
          }}
        >
          <p className="dk-body-lg mb-3" style={{ color: '#15141A', fontStyle: 'italic' }}>
            &ldquo;{s.quote}&rdquo;
          </p>
          <p className="dk-caption m-0" style={{ color: 'rgba(21,20,26,0.6)' }}>
            {s.attribution}
          </p>
        </blockquote>
        <div className="max-w-[720px] mx-auto mt-8">
          <Link
            href="/design-l#top"
            className="l-link inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', fontWeight: 600 }}
          >
            Claim your free logo <ArrowRight weight="bold" size={14} />
          </Link>
        </div>
      </div>
    </LSection>
  )
}

export default function WhoItsForPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Who It&apos;s For</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            Great design, for everyone starting something
          </p>
          <p className="dk-body-lg max-w-[680px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Whether you&apos;re launching a startup, naming your side project, or branding your new business — LOGO.AI is built for you.
          </p>
          <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
            No design skills. No budget. No problem.
          </p>
        </div>
      </LSection>

      {SEGMENTS.map((s, i) => <SegmentBlock key={i} s={s} />)}

      {/* Not sure where you fit */}
      <LSection>
        <LSectionHeader eyebrow="Not sure where you fit?" title="You just have to be starting something." />
        <div className="max-w-[720px] mx-auto text-center">
          <p className="dk-body-lg mb-5" style={{ color: 'rgba(21,20,26,0.7)' }}>
            You don&apos;t have to be a founder, a small business, or a creator. You just have to be starting something.
          </p>
          <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
            If you have a name and an idea, LOGO.AI has a logo for you.
          </p>
        </div>
      </LSection>

      <LBottomCTA
        title="Your logo is sixty seconds away"
        body={`${getLogosClaimed().toLocaleString('en-US')}+ people have already claimed their spot. ${getLogosRemaining().toLocaleString('en-US')} free logos left.`}
      />
    </main>
  )
}
