import PageWrapper from '@/components/PageWrapper'
import PageSection from '@/components/ui/PageSection'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { BLUE, BORDER, CARD_BG } from '@/lib/ds'

const BUILD_STEPS = [
  {
    title: 'Study the fundamentals',
    desc: 'Color, typography, spacing, and layout.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32,56H192a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H72a8,8,0,0,1-8-8V48a8,8,0,0,0-8-8H208" />
        <line x1="80" y1="112" x2="160" y2="112" />
        <line x1="80" y1="144" x2="160" y2="144" />
        <line x1="80" y1="176" x2="128" y2="176" />
      </svg>
    ),
  },
  {
    title: 'Train on principles — not templates',
    desc: 'No shortcuts. No assets.',
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
    title: 'Set a high bar',
    desc: "If it didn't feel original and professional, it didn't ship.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <line x1="96" y1="224" x2="160" y2="224" />
        <line x1="128" y1="184" x2="128" y2="224" />
        <path d="M58,128H48A32,32,0,0,1,16,96V80a8,8,0,0,1,8-8H56" />
        <path d="M198,128h10a32,32,0,0,0,32-32V80a8,8,0,0,0-8-8H200" />
        <path d="M64,48H192a0,0,0,0,1,0,0v88a64,64,0,0,1-64,64h0a64,64,0,0,1-64-64V48A0,0,0,0,1,64,48Z" />
      </svg>
    ),
  },
]

const STATS = [
  { n: '2+', label: 'Years in R&D' },
  { n: '100K+', label: 'Logos analyzed' },
  { n: '1,000s', label: 'Training hours' },
]

const TEAM_STATS = [
  'Three decades of building',
  'Multiple exits',
  'Millions of users reached',
]

const WHY_NOW_POINTS = [
  'Understand structure',
  'Make design decisions',
  'Produce consistent results',
]

const WHAT_NEXT_POINTS = [
  'Understand design',
  'Make decisions',
  'Improve over time',
]

export default function OurStoryPage() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-7 items-center text-center">
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[860px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            Our Story
          </h1>
          <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.02em] text-white/70 max-w-[860px] m-0">
            We didn&apos;t discover this problem. We watched it repeat.
          </p>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/55 max-w-[640px] m-0">
            Three decades of building, investing in, and advising companies.
            Every time, the logo was the bottleneck —
            slow, expensive, and still not right.
          </p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
              <div className="flex-1 flex flex-col gap-5">
                <Badge icon="shield" text="The Problem" />
                <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                  The wall every founder hits
                </h2>
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  Across companies we built and worked with,
                  the same pattern kept repeating.
                  Brilliant founders —
                  stuck for weeks on something that should take minutes.
                </p>
              </div>
              <img
                src="/images/illustrations/final-story-problem.png"
                alt="Founder stuck in logo design chaos"
                className="w-[300px] md:w-[420px] flex-shrink-0 h-auto opacity-90"
              />
            </div>

              <div className="flex flex-col gap-4">
              {/* Option 1 */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="font-bricolage font-medium text-sm text-white/70 m-0">Hire a designer</p>
                <ul className="flex flex-col gap-1.5 m-0 pl-0 list-none">
                  {['3–6 weeks of waiting', 'Endless revisions', 'Still unsure about the result'].map((p) => (
                    <li key={p} className="flex items-start gap-2.5 font-bricolage text-sm text-white/50">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="font-bricolage font-medium text-sm text-white/30 m-0 pt-2 border-t border-white/[0.06]">
                  $5,000 – $50,000
                </p>
              </div>

              {/* Option 2 */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="font-bricolage font-medium text-sm text-white/70 m-0">Other AI logo makers</p>
                <ul className="flex flex-col gap-1.5 m-0 pl-0 list-none">
                  {['Template-based, not real design', 'Logos look similar to others', 'Limited understanding of your brand'].map((p) => (
                    <li key={p} className="flex items-start gap-2.5 font-bricolage text-sm text-white/50">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="font-bricolage font-medium text-sm text-white/30 m-0 pt-2 border-t border-white/[0.06]">
                  Generic results
                </p>
              </div>

              {/* Resolution */}
              <div
                className="rounded-2xl p-6 flex flex-col gap-2"
                style={{ border: '1px solid rgba(51,106,234,0.3)', background: 'rgba(51,106,234,0.06)' }}
              >
                <p className="font-bricolage text-sm text-white/60 m-0">Neither option worked.</p>
                <p className="font-bricolage text-sm text-white/60 m-0">So we built a third.</p>
                <p className="font-bricolage font-medium text-base text-white m-0">
                  AI that designs original, professional logos — in seconds.
                </p>
              </div>
            </div>
          </div>
      </PageSection>

      {/* ── The Turning Point ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
            <div className="flex-1 flex flex-col gap-6">
              <Badge icon="clock" text="The Turning Point" />
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Late 2023.
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">AI could already:</p>
                <ul className="flex flex-col gap-1.5 m-0 pl-0 list-none">
                  {['Generate images', 'Write code', 'Compose music'].map((p) => (
                    <li key={p} className="flex items-start gap-2.5 font-bricolage text-base text-white/55">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="font-bricolage font-medium text-base text-white m-0 mt-1">
                  But logos?
                  <br />
                  <span className="text-white/55 font-normal">Still broken.</span>
                </p>
              </div>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Everything we tried looked wrong:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Warped text', 'Random symbols', 'No sense of brand'].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{ border: '1px solid rgba(84,87,94,0.3)' }}
                  >
                    <span className="text-white/25 flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round">
                        <line x1="200" y1="56" x2="56" y2="200" /><line x1="56" y1="56" x2="200" y2="200" />
                      </svg>
                    </span>
                    <span className="font-bricolage text-sm font-medium text-white/50">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  The problem wasn&apos;t capability.
                </p>
                <p className="font-bricolage font-medium text-lg md:text-xl text-white m-0">
                  It was approach.
                </p>
              </div>
            </div>
            <img
              src="/images/illustrations/final-story-turningpoint.png"
              alt="The eureka moment — a new approach"
              className="w-[200px] lg:w-[400px] flex-shrink-0 h-auto opacity-90"
            />
          </div>
      </PageSection>

      {/* ── How We Built It ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[680px]">
              <Badge icon="cpu" text="How We Built It" />
              <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
                Teaching AI to design
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                We trained AI to understand design — not just generate it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BUILD_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="rounded-2xl p-7 flex flex-col gap-4"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div className="flex items-center justify-between">
                    {step.icon}
                    <span className="font-bricolage text-xs font-medium text-white/20 uppercase tracking-[2px]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-bricolage font-medium text-lg leading-[1.3em] m-0">{step.title}</h3>
                  <p className="font-bricolage text-sm leading-[1.7em] text-white/50 m-0">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-[560px]">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-1.5">
                  <span className="font-bricolage font-bold text-[32px] md:text-[40px] leading-none tracking-[-0.04em]">
                    {s.n}
                  </span>
                  <span className="font-bricolage text-sm font-medium text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
      </PageSection>

      {/* ── The Team ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 flex flex-col gap-5">
              <Badge icon="users" text="The Team" />
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Small team. High standards.
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                Engineers, designers, and AI researchers
                working across four countries.
              </p>
              <p className="font-bricolage font-medium text-base text-white m-0">
                Focused on one goal:
                <br />
                <span className="text-white/55 font-normal">Make AI design logos that actually work.</span>
              </p>
            </div>
            <img
              src="/images/illustrations/final-story-team.png"
              alt="Global team across four countries"
              className="w-[200px] lg:w-[480px] flex-shrink-0 h-auto opacity-90"
            />
          </div>
      </PageSection>

      {/* ── Built on Experience ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col gap-6 items-center text-center">
            <Badge icon="shield" text="Built on Experience" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
              Built on experience
            </h2>
            <div className="flex flex-col gap-2">
              {TEAM_STATS.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                  <span className="font-bricolage text-base text-white/55">{s}</span>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-5"
              style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.02)' }}
            >
              <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0 italic">
                &ldquo;But one belief never changed:
                If people don&apos;t love the product, nothing else matters.&rdquo;
              </p>
            </div>
          </div>
      </PageSection>

      {/* ── Leadership ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <img
              src="/images/illustrations/final-story-leadership.png"
              alt="Brothers and co-founders"
              className="w-[200px] lg:w-[380px] flex-shrink-0 h-auto opacity-90"
            />
            <div className="flex-1 flex flex-col gap-6">
              <Badge icon="users" text="Leadership" />
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Brothers. Serial founders. Repeat builders.
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Three decades of building products across web and mobile —
                from early internet platforms to AI systems.
                Multiple exits.
                Millions of users reached.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                We&apos;ve seen the same problem again and again.
                So we built something better.
              </p>
            </div>
          </div>
      </PageSection>

      {/* ── The Name ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="flex-1 flex flex-col gap-5">
              <Badge icon="trophy" text="The Name" />
              <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
                Earned, not bought
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  We didn&apos;t start with the name.
                  We earned it.
                </p>
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  Only after the product worked —
                  after it could design original, professional logos in seconds —
                  did we take the name.
                </p>
                <p className="font-bricolage font-medium text-base md:text-lg text-white m-0">
                  Because it should mean something.
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span
                className="font-bricolage font-medium select-none text-white"
                style={{ fontSize: 'clamp(56px, 8vw, 100px)', letterSpacing: '-0.04em', lineHeight: 1 }}
              >
                Logo.ai
              </span>
            </div>
          </div>
      </PageSection>

      {/* ── Why Now ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <Badge icon="lightning" text="Why Now" />
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  For years, this wasn&apos;t possible.
                </p>
                <p className="font-bricolage font-medium text-lg md:text-xl text-white m-0">
                  Now it is.
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                AI can finally:
              </p>
              <ul className="flex flex-col gap-2 m-0 pl-0 list-none">
                {WHY_NOW_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                    <span className="font-bricolage text-base md:text-lg text-white/55">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bricolage font-medium text-base md:text-lg text-white m-0 pt-2">
                That&apos;s what makes Logo.ai possible.
              </p>
            </div>
          </div>
      </PageSection>

      {/* ── What This Unlocks ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0">
              <Badge icon="rocket" text="What This Unlocks" />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <p className="font-bricolage font-medium text-lg md:text-2xl leading-[1.5em] tracking-[-0.02em] text-white m-0">
                An original, professional logo —
                designed by AI in seconds.
              </p>
              <div className="flex flex-col gap-1.5 pt-2">
                {['No templates.', 'No waiting.', 'No guesswork.'].map((t) => (
                  <p key={t} className="font-bricolage text-base md:text-lg text-white/55 m-0">{t}</p>
                ))}
              </div>
            </div>
          </div>
      </PageSection>

      {/* ── What Comes Next ── */}
      <PageSection>
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <Badge icon="rocket" text="What Comes Next" />
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                We&apos;re not just building a logo tool.
                We&apos;re building systems that:
              </p>
              <ul className="flex flex-col gap-2 m-0 pl-0 list-none">
                {WHAT_NEXT_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                    <span className="font-bricolage text-base text-white/55">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bricolage font-medium text-base text-white m-0">
                Not just generate —
                <br />
                design.
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                The Future
              </p>
              <h2
                className="font-bricolage font-medium leading-[1.15em] tracking-[-0.04em] m-0"
                style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
              >
                A world where creating a brand identity
                is instant.
              </h2>
              <div className="flex flex-col gap-1.5">
                {['Not a project.', 'Not a bottleneck.', 'Just the starting point.'].map((t) => (
                  <p key={t} className="font-bricolage text-base md:text-lg text-white/55 m-0">{t}</p>
                ))}
              </div>
            </div>
          </div>
      </PageSection>

    </PageWrapper>
  )
}
