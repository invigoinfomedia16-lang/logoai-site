import PageWrapper from '@/components/PageWrapper'
import PageSection from '@/components/ui/PageSection'
import { COMPARISON_ROWS } from '@/data'
import Badge from '@/components/ui/Badge'
import { BLUE, BORDER, CARD_BG } from '@/lib/ds'

const FEATURES = [
  {
    title: 'Ready in seconds',
    desc: 'No waiting days or weeks. No revisions. Just a finished logo — ready to use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="128" cy="128" r="96" />
        <polyline points="128,72 128,128 176,128" />
      </svg>
    ),
  },
  {
    title: 'AI makes the decisions',
    desc: "You don't need design skills. The AI handles the design choices for you.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="88" y="88" width="80" height="80" rx="8" />
        <path d="M112,88V64" /><path d="M144,88V64" />
        <path d="M112,192v-24" /><path d="M144,192v-24" />
        <path d="M88,112H64" /><path d="M88,144H64" />
        <path d="M192,112H168" /><path d="M192,144H168" />
        <rect x="40" y="40" width="176" height="176" rx="16" />
      </svg>
    ),
  },
  {
    title: 'Understands your brand',
    desc: 'LOGO.AI adapts to your industry, tone, and style — so your logo fits from the start.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M128,24A104,104,0,0,0,24,128" />
        <path d="M128,24A104,104,0,0,1,232,128" />
        <path d="M128,72a56,56,0,0,0-56,56c0,23.76,7.84,46.55,22.3,64.81" />
        <path d="M128,72a56,56,0,0,1,56,56,120.43,120.43,0,0,1-7.13,40.91" />
        <path d="M128,120v0a199.28,199.28,0,0,1-15.8,77.53" />
        <path d="M128,120a199.28,199.28,0,0,0,2.46,31.42" />
      </svg>
    ),
  },
  {
    title: 'Designed from scratch',
    desc: 'No templates. Real design principles — color, typography, spacing, and hierarchy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M92,164l-40,40a8,8,0,0,0,0,11.31l8,7.93a8,8,0,0,0,11.32,0L112,184" />
        <path d="M184,32l32,32-96,96L88,128Z" />
        <line x1="152" y1="56" x2="200" y2="104" />
      </svg>
    ),
  },
  {
    title: 'Works everywhere',
    desc: 'Built for web, print, and apps — so your brand stays consistent everywhere.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="128" cy="128" r="96" />
        <line x1="32" y1="128" x2="224" y2="128" />
        <ellipse cx="128" cy="128" rx="40" ry="96" />
      </svg>
    ),
  },
  {
    title: 'Everything works together',
    desc: 'Your logo, colors, and assets are designed as one system — not separate pieces.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="32" y="32" width="84" height="84" rx="8" />
        <rect x="140" y="32" width="84" height="84" rx="8" />
        <rect x="32" y="140" width="84" height="84" rx="8" />
        <rect x="140" y="140" width="84" height="84" rx="8" />
      </svg>
    ),
  },
]

const STEPS = [
  'Tell us about your business',
  'AI makes the design decisions',
  'Get a finished logo',
  'Choose from multiple logo options',
]

export default function AboutPage() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
          <Badge icon="lightning" text="Why LOGO.AI" />
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[860px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            From name to logo —{' '}
            <span className="text-white">in seconds.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/55 max-w-[600px] m-0">
            No delays. No guesswork. No back-and-forth.
          </p>
          <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/40 max-w-[640px] m-0">
            LOGO.AI turns your brand into an original, professional logo — instantly.
            Built to look right everywhere your brand appears.
          </p>
        </div>
      </section>

      {/* ── Why choose LOGO.AI ── */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
          <div className="flex flex-col gap-4 max-w-[640px]">
            <Badge icon="sparkle" text="Why choose LOGO.AI" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.1em] tracking-[-0.04em] m-0">
              LOGO.AI replaces manual design with fast, consistent results.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                style={{ border: BORDER, background: CARD_BG }}
              >
                {f.icon}
                <h3 className="font-bricolage font-medium text-base leading-[1.4em] m-0">{f.title}</h3>
                <p className="font-bricolage text-sm leading-[1.65em] text-white/55 m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* ── How LOGO.AI compares ── */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
          <div className="flex flex-col gap-4 max-w-[640px]">
            <Badge icon="trophy" text="How LOGO.AI compares" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.1em] tracking-[-0.04em] m-0">
              See how LOGO.AI compares to designers and other AI logo makers.
            </h2>
          </div>

          {/* Table — horizontally scrollable on mobile */}
          <div className="w-full overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
            <div style={{ minWidth: 480 }}>
              {/* Header */}
              <div
                className="grid pb-4 border-b font-bricolage"
                style={{ gridTemplateColumns: '180px 1fr 1fr 1fr', borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-[11px] font-medium text-white/40 uppercase tracking-[2px]">Feature</span>
                <span
                  className="text-[11px] font-medium text-white uppercase tracking-[2px] text-center px-2 py-1 rounded-t-lg"
                  style={{ background: 'rgba(0,0,255,0.1)' }}
                >
                  LOGO.AI
                </span>
                <span className="text-[11px] font-medium text-white/40 uppercase tracking-[2px] text-center">Designer</span>
                <span className="text-[11px] font-medium text-white/40 uppercase tracking-[2px] text-center">Other AI logo makers</span>
              </div>

              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className="grid font-bricolage"
                  style={{
                    gridTemplateColumns: '180px 1fr 1fr 1fr',
                    borderBottom: i < COMPARISON_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <div className="text-[13px] font-medium text-white/55 flex items-center py-4">{row.label}</div>
                  <div
                    className="text-[13px] font-medium text-white text-center flex items-center justify-center py-4 px-2"
                    style={{
                      background: 'rgba(0,0,255,0.08)',
                      borderRadius: i === COMPARISON_ROWS.length - 1 ? '0 0 8px 8px' : 0,
                    }}
                  >
                    {row.logo}
                  </div>
                  <div className="text-[13px] text-white/40 text-center flex items-center justify-center py-4">{row.designer}</div>
                  <div className="text-[13px] text-white/40 text-center flex items-center justify-center py-4">{row.other}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* ── See it in action ── */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
          <div className="flex flex-col gap-4 max-w-[580px]">
            <Badge icon="monitor" text="See it in action" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.1em] tracking-[-0.04em] m-0">
              Name to logo. Without the process.
            </h2>
            <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
              See how LOGO.AI turns a simple name into a complete, professional logo — without templates, revisions, or guesswork.
            </p>
          </div>

          {/* Steps flow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step}
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{ border: BORDER, background: CARD_BG }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center font-bricolage text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(0,0,255,0.15)', color: BLUE }}
                  >
                    {i + 1}
                  </span>
                  {i < STEPS.length - 1 && (
                    <svg className="hidden md:block w-4 h-4 text-white/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </div>
                <p className="font-bricolage text-sm font-medium leading-[1.5em] text-white/55 m-0">{step}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl p-8 md:p-12 flex flex-col items-center gap-6 text-center"
            style={{ border: BORDER, background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex flex-col gap-2">
              <p className="font-bricolage font-medium text-base text-white/55 m-0">Demo video coming soon</p>
              <p className="font-bricolage text-sm text-white/40 m-0">Try it yourself — create your logo in seconds</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 font-bricolage font-semibold text-white no-underline transition-all duration-200 hover:opacity-90"
              style={{ background: BLUE, borderRadius: 12, padding: 'clamp(18px,2vw,24px) clamp(24px,3vw,40px)', fontSize: 'clamp(18px,1.8vw,20px)' }}
            >
              Get my free logo
            </a>
          </div>
        </div>
      </PageSection>

      {/* ── Built for real use ── */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-8 max-w-[760px]">
          <div className="flex flex-col gap-4">
            <Badge icon="shield" text="Built for real use" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
              Not just something that looks good — but something that works everywhere your brand appears.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['On a business card.', 'On a website.', 'On a billboard.'].map((item) => (
              <div
                key={item}
                className="rounded-xl px-5 py-4 text-center"
                style={{ border: BORDER, background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="font-bricolage font-medium text-base text-white/55 m-0">{item}</p>
              </div>
            ))}
          </div>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.6em] text-white/55 m-0">
            At every size, in every context.
          </p>
        </div>
      </PageSection>

    </PageWrapper>
  )
}
