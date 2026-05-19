// AmazingFor — 3-column use-case grid mirroring HEADSHOT's pattern, with
// LOGO.AI's audience segments from /who-its-for. Combined the 5 docx
// segments into 3 cards that fit the visual rhythm.

import type { ReactNode } from 'react'

type Bullet = { title: string; body: ReactNode }

type UseCaseCard = {
  iconBg: string
  iconStroke: string
  icon: ReactNode
  heading: string
  bullets: Bullet[]
}

const RocketIcon = (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" stroke="#D97757">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const StoreIcon = (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" stroke="#00A63E">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </svg>
)

const SparklesIcon = (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width="24" height="24" stroke="#9810FA">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)

const CARDS: UseCaseCard[] = [
  {
    iconBg: '#F5E2DA',
    iconStroke: '#D97757',
    icon: RocketIcon,
    heading: 'Founders & Small Businesses',
    bullets: [
      {
        title: 'Move at startup speed',
        body: <>60 seconds, not 6 weeks of agency back-and-forth. Free instead of $20,000+. Looks investor-ready from day one.</>,
      },
      {
        title: 'Look established on day one',
        body: <>Your customers don&apos;t care how long you&apos;ve been in business. They care whether you look like you know what you&apos;re doing.</>,
      },
      {
        title: 'Works everywhere your brand shows up',
        body: <>Pitch deck, website, business cards, app icon, signage, social — same logo, every surface.</>,
      },
    ],
  },
  {
    iconBg: '#FAE8FF',
    iconStroke: '#9810FA',
    icon: SparklesIcon,
    heading: 'Creators & Side Projects',
    bullets: [
      {
        title: 'Free means you can actually have one',
        body: <>Your podcast, your Substack, your indie app, your weekend idea — they all deserve a logo that looks intentional.</>,
      },
      {
        title: 'Every project, a unique mark',
        body: <>Generate as many as you want. Different brand → different logo. No subscriptions, no per-export fees.</>,
      },
      {
        title: 'Ready for every surface',
        body: <>YouTube thumbnails, podcast art, Twitter banners, app icons — all sized and exported in one go.</>,
      },
    ],
  },
  {
    iconBg: '#DCFCE7',
    iconStroke: '#00A63E',
    icon: StoreIcon,
    heading: 'E-commerce Brands',
    bullets: [
      {
        title: 'Built for scale',
        body: <>Works at 16 pixels and at 16 inches. Sharp on a Shopify favicon, sharp on a retail shelf label.</>,
      },
      {
        title: 'Original, not template',
        body: <>So your brand doesn&apos;t look like every other DTC store running on the same logo maker.</>,
      },
      {
        title: 'Every format you need',
        body: <>PNG, SVG, PDF, and EPS files with a transparent background — ready for web, print, signage, anywhere.</>,
      },
    ],
  },
]

export default function MAmazingFor() {
  return (
    <section
      id="who-its-for"
      className="flex flex-col items-start py-20 md:pb-[128px] md:pt-0 px-5 sm:px-10 md:px-16 lg:px-[112px] w-full"
    >
      <div className="flex flex-col gap-12 md:gap-16 items-start w-full">
        {/* Header block */}
        <div className="flex flex-col gap-4 items-start w-full text-left">
          <p
            className="m-sans"
            style={{
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              color: 'var(--m-text-soft)',
            }}
          >
            USE CASES
          </p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink-deep)' }}>
            Built for everyone starting something
          </h2>
          <p className="m-sub" style={{ fontSize: 20, lineHeight: '28px' }}>
            Whether you&apos;re launching a startup, branding your weekend project, or scaling a DTC brand — LOGO.AI is built for you.
          </p>
        </div>

        {/* Three-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {CARDS.map((card) => (
            <article
              key={card.heading}
              className="flex flex-col items-start justify-start overflow-clip"
              style={{
                background: 'var(--m-surface)',
                border: '1px solid var(--m-border-soft)',
                borderRadius: '14px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
              }}
            >
              <div className="w-full p-8 flex flex-col items-start">
                {/* Icon */}
                <div className="pb-6">
                  <div
                    className="flex items-center justify-center rounded-lg w-12 h-12"
                    style={{ background: card.iconBg }}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Heading */}
                <h3 className="m-h3 w-full pb-6">{card.heading}</h3>

                {/* Bullets */}
                <ul className="flex flex-col gap-6 items-start w-full">
                  {card.bullets.map((b) => (
                    <li key={b.title} className="flex gap-3 items-start w-full">
                      <span
                        aria-hidden
                        className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full"
                        style={{ background: 'var(--m-brand)' }}
                      />
                      <div className="flex flex-col gap-1 items-start">
                        <p className="m-sans" style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', color: 'var(--m-ink)' }}>
                          {b.title}
                        </p>
                        <p className="m-body-sm">{b.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
