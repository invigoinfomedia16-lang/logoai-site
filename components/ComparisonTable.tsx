'use client'

import { useInView } from '@/hooks/useInView'
import Badge from './ui/Badge'

const CHECK = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="10" cy="10" r="9" stroke="#336AEA" strokeWidth="1.5" />
    <path d="M6 10.5l2.5 2.5 5-5" stroke="#336AEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CHECK_DIM = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <path d="M6 10.5l2.5 2.5 5-5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CROSS = (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const CARDS = [
  {
    title: 'Designer',
    sub: 'Traditional agency route',
    price: '$5K–$50K+',
    priceSub: '/ project',
    featured: false,
    items: [
      { icon: 'dim', text: '3–6 weeks turnaround' },
      { icon: 'dim', text: 'High quality (depends on designer)' },
      { icon: 'cross', text: 'Multiple revision rounds' },
      { icon: 'cross', text: 'Manual brand briefing' },
      { icon: 'cross', text: 'Consistency depends on team' },
      { icon: 'cross', text: 'High effort required' },
    ],
  },
  {
    title: 'Logo.ai',
    sub: 'AI-powered, instant',
    price: 'Free',
    priceSub: 'for first 2M users',
    featured: true,
    items: [
      { icon: 'check', text: 'Ready in seconds' },
      { icon: 'check', text: 'Professional, consistent quality' },
      { icon: 'check', text: 'No revisions needed' },
      { icon: 'check', text: 'Automatic brand understanding' },
      { icon: 'check', text: 'Built-in consistency' },
      { icon: 'check', text: 'Minimal effort — AI handles it' },
    ],
  },
  {
    title: 'Other AI Logo Makers',
    sub: 'Template-based generators',
    price: '$20–$100',
    priceSub: '/ month',
    featured: false,
    items: [
      { icon: 'dim', text: '1–3 hours of trial & error' },
      { icon: 'cross', text: 'Generic, inconsistent output' },
      { icon: 'cross', text: 'Trial and error approach' },
      { icon: 'cross', text: 'Limited brand understanding' },
      { icon: 'cross', text: 'Limited consistency' },
      { icon: 'dim', text: 'Medium effort required' },
    ],
  },
]

function getIcon(type: string) {
  if (type === 'check') return CHECK
  if (type === 'dim') return CHECK_DIM
  return CROSS
}

export default function ComparisonTable() {
  const { ref, inView } = useInView(0.08)

  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="trophy" text="The smart choice" />
          <h2 className="font-bricolage font-semibold leading-[1.1em] tracking-[-0.03em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Skip the designer, outperform the templates
          </h2>
          <p className="font-inter font-normal text-base sm:text-lg leading-7 text-white/50 m-0">
            Here&apos;s how Logo.ai compares – on speed, cost, quality, and
            everything that matters.
          </p>
        </div>

        <div
          ref={ref}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 transition-all duration-700 ease-smooth"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl p-8 lg:p-10 text-left relative transition-all duration-300 ${
                card.featured
                  ? 'bg-[#1F1F1F] border border-[rgba(51,106,234,0.3)] md:-my-4 md:py-12 lg:py-14'
                  : 'bg-[#1A1A1A] border border-white/[0.06]'
              }`}
              style={
                card.featured
                  ? { background: 'linear-gradient(180deg, rgba(51,106,234,0.08) 0%, #1F1F1F 100%)' }
                  : undefined
              }
            >
              {/* Featured card stands out via gradient + blue accents — no label needed */}

              <h3
                className="font-bricolage text-xl font-medium mb-1"
                style={{ color: card.featured ? '#648EEF' : '#F5F5F5' }}
              >
                {card.title}
              </h3>
              <p className="font-inter text-[13px] text-white/40 mb-6">
                {card.sub}
              </p>
              <div className="mb-8">
                <span className="font-bricolage text-[28px] lg:text-[32px] font-semibold text-white">
                  {card.price}
                </span>
                <span className="font-inter text-sm text-white/40 ml-1">
                  {card.priceSub}
                </span>
              </div>

              <div className="flex flex-col">
                {card.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 font-inter text-[14px] leading-relaxed"
                    style={{
                      borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                      color: card.featured ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {getIcon(card.featured ? 'check' : item.icon)}
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
