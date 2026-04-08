import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'

const STEPS = [
  {
    title: 'Study the fundamentals',
    desc: 'Color, typography, spacing, and layout — the building blocks of every great logo.',
  },
  {
    title: 'Train on principles — not templates',
    desc: 'No shortcuts. No pre-made assets. The AI learns to design, not to assemble.',
  },
  {
    title: 'Set a high bar',
    desc: "If it didn't feel original and professional, it didn't ship.",
  },
]

const STATS = [
  { n: '2+', label: 'Years in R&D' },
  { n: '100K+', label: 'Logos analysed' },
  { n: '1,000s', label: 'Training hours' },
]

export default function OurStoryPage() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
          <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px]">Our Story</p>
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[820px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            We didn&apos;t discover this problem.{' '}
            <span className="text-white/40">We watched it repeat.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/50 max-w-[620px] m-0">
            Three decades of building, investing in, and advising companies. Every time, the logo was the bottleneck — slow, expensive, and still not right.
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
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">The Problem</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                The wall every founder hits
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                Across companies we built and worked with, the same pattern kept repeating. Brilliant founders — stuck for weeks on something that should take minutes.
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {[
                {
                  label: 'Hire a designer',
                  points: ['3–6 weeks of waiting', 'Endless revisions', 'Still unsure about the result'],
                  cost: '$5,000 – $50,000',
                  bad: true,
                },
                {
                  label: 'Other AI logo makers',
                  points: ['Template-based, not real design', 'Logos look similar to others', 'Limited understanding of your brand'],
                  cost: 'Generic results',
                  bad: true,
                },
              ].map((opt) => (
                <div
                  key={opt.label}
                  className="rounded-2xl p-6 flex flex-col gap-3"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <p className="font-bricolage font-medium text-sm text-white/60 m-0">{opt.label}</p>
                  <ul className="flex flex-col gap-1.5 m-0 pl-0 list-none">
                    {opt.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 font-bricolage text-sm text-white/45">
                        <span className="mt-[5px] w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="font-bricolage font-medium text-sm text-white/30 m-0 pt-1 border-t border-white/[0.06]">{opt.cost}</p>
                </div>
              ))}

              <div
                className="rounded-2xl p-6 flex flex-col gap-2"
                style={{ border: '1px solid rgba(0,0,255,0.3)', background: 'rgba(0,0,255,0.06)' }}
              >
                <p className="font-bricolage font-medium text-sm text-white/60 m-0">So we built a third.</p>
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
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-4 max-w-[680px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">The Turning Point</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                Late 2023
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                AI could already generate images, write code, and compose music. But logos? Still broken. Everything we tried looked wrong. The problem wasn&apos;t capability — it was approach.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Warped text', 'Random symbols', 'No sense of brand'].map((item) => (
                <div
                  key={item}
                  className="rounded-xl p-5 flex items-center gap-3"
                  style={{ border: '1px solid rgba(84,87,94,0.3)' }}
                >
                  <span className="text-white/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </span>
                  <span className="font-bricolage text-sm font-medium text-white/50">{item}</span>
                </div>
              ))}
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
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">How We Built It</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                Teaching AI to design
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                We trained AI to understand design — not just generate it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {STEPS.map((step, i) => (
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

            <div className="grid grid-cols-3 gap-5 max-w-[600px]">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-bricolage font-bold text-[32px] md:text-[40px] leading-none tracking-[-0.04em]">{s.n}</span>
                  <span className="font-bricolage text-sm font-medium text-white/40">{s.label}</span>
                </div>
              ))}
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
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">The Name</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                Earned, not bought
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                We didn&apos;t start with the name. We earned it. Only after the product worked — after it could design original, professional logos in seconds — did we take the name.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                Because it should mean something.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span
                className="font-bricolage font-medium select-none"
                style={{ fontSize: 'clamp(56px, 8vw, 100px)', letterSpacing: '-0.04em', lineHeight: 1 }}
              >
                LOGO<span className="text-white">.</span>AI
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── The Future ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-8 max-w-[720px]">
            <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">The Future</p>
            <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
              A world where creating a brand identity is instant.
            </h2>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
              Not a project. Not a bottleneck. Just the starting point.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </PageWrapper>
  )
}
