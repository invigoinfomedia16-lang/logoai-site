import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

const BUILD_STEPS = [
  {
    title: 'Study the fundamentals',
    desc: 'Color, typography, spacing, and layout.',
  },
  {
    title: 'Train on principles — not templates',
    desc: 'No shortcuts. No assets.',
  },
  {
    title: 'Set a high bar',
    desc: "If it didn't feel original and professional, it didn't ship.",
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
        <div className="max-w-[1120px] mx-auto flex flex-col gap-7">
          <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px] m-0">
            Our Story
          </p>
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[860px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            We didn&apos;t discover this problem.{' '}
            <span className="text-white/40">We watched it repeat.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/55 max-w-[640px] m-0">
            Three decades of building, investing in, and advising companies.
            Every time, the logo was the bottleneck —
            slow, expensive, and still not right.
          </p>
        </div>
      </section>

      {/* ── The Problem ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                The Problem
              </p>
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

            <div className="flex-1 flex flex-col gap-4">
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
                style={{ border: '1px solid rgba(0,0,255,0.3)', background: 'rgba(0,0,255,0.06)' }}
              >
                <p className="font-bricolage text-sm text-white/60 m-0">Neither option worked.</p>
                <p className="font-bricolage text-sm text-white/60 m-0">So we built a third.</p>
                <p className="font-bricolage font-medium text-base text-white m-0">
                  AI that designs original, professional logos — in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── The Turning Point ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                The Turning Point
              </p>
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
            </div>

            <div className="flex-1 flex flex-col gap-5">
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
          </div>
        </section>
      </ScrollReveal>

      {/* ── How We Built It ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[680px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                How We Built It
              </p>
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
                  style={{ border: '1px solid rgba(84,87,94,0.3)' }}
                >
                  <span className="font-bricolage text-xs font-medium text-white/30 uppercase tracking-[2px]">
                    0{i + 1}
                  </span>
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
        </section>
      </ScrollReveal>

      {/* ── The Team ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                The Team
              </p>
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

            <div className="flex-1 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                  Built on experience
                </p>
                <div className="flex flex-col gap-2">
                  {TEAM_STATS.map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                      <span className="font-bricolage text-base text-white/55">{s}</span>
                    </div>
                  ))}
                </div>
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

              <div className="flex flex-col gap-3 pt-2">
                <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                  Leadership
                </p>
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                  Brothers. Serial founders. Repeat builders.
                </p>
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                  Three decades of building products across web and mobile —
                  from early internet platforms to AI systems.
                  Multiple exits.
                  Millions of users reached.
                </p>
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                  We&apos;ve seen the same problem again and again.
                  So we built something better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── The Name ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                The Name
              </p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
                Earned, not bought.
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
                LOGO.AI
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Why Now ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                Why Now
              </p>
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
                That&apos;s what makes LOGO.AI possible.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── What This Unlocks ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                What This Unlocks
              </p>
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
        </section>
      </ScrollReveal>

      {/* ── What Comes Next ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                What Comes Next
              </p>
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
        </section>
      </ScrollReveal>

    </PageWrapper>
  )
}
