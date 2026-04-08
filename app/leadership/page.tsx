import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'

const FOUNDERS = [
  {
    name: 'Abhinav Reddy',
    role: 'Co-founder — Product & Technology',
    bio: 'Obsessed with making AI feel invisible — the kind where you forget you\'re not working with a human designer.',
  },
  {
    name: 'Ashwin Reddy',
    role: 'Co-founder — Strategy & Growth',
    bio: 'Focused on building products people talk about, share, and keep coming back to — where growth is driven by the product, not just marketing.',
  },
]

const EARLY_AI = [
  'Personality chatbots that could hold basic conversations',
  'Messenger bots on MSN and AIM',
  'Website assistants that guided users step by step',
  'Interactive AI systems with stories, puzzles, and choices',
  'AI game opponents that adapted to how people played',
  'Recommendation systems based on user behaviour',
  'Automated trading systems for algorithmic strategies',
  'Virtual pets that reacted based on user interaction',
  'Early computer vision systems for pattern recognition',
]

const INDUSTRIES = [
  { label: 'Media', desc: 'Stock photos, comics, and large online communities' },
  { label: 'Insurance', desc: 'Health, life, auto, and business coverage' },
  { label: 'Education', desc: 'Fields, programs, and structured learning paths' },
  { label: 'Career', desc: 'Roles, certifications, and career discovery' },
  { label: 'Productivity', desc: 'Resumes, portfolios, and interview prep' },
  { label: 'E-Commerce', desc: 'Pets, wellness, hobbies, outdoor, collectibles' },
]

const STATS = [
  { n: '30+', label: 'Years building' },
  { n: 'Multiple', label: 'Exits' },
  { n: 'Millions', label: 'Users reached' },
]

export default function LeadershipPage() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
          <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px]">Leadership</p>
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[760px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            Built over decades,{' '}
            <span className="text-white/40">not months.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/50 max-w-[580px] m-0">
            Brothers. Serial founders. Repeat builders. Three decades of building products across web and mobile — from early internet platforms to AI systems.
          </p>
        </div>
      </section>

      {/* ── Founders ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Founders</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FOUNDERS.map((f) => (
                <div
                  key={f.name}
                  className="rounded-2xl p-8 md:p-10 flex flex-col gap-6"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  {/* Avatar placeholder */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,0,255,0.15)', border: '1px solid rgba(0,0,255,0.3)' }}
                  >
                    <span className="font-bricolage font-semibold text-lg text-white/80">
                      {f.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-bricolage font-medium text-[22px] md:text-[26px] leading-[1.2em] tracking-[-0.03em] m-0">{f.name}</h2>
                    <p className="font-bricolage text-sm font-medium text-white/40 m-0">{f.role}</p>
                  </div>
                  <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">{f.bio}</p>
                </div>
              ))}
            </div>

            {/* Joint statement */}
            <div
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ border: '1px solid rgba(84,87,94,0.3)' }}
            >
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/60 m-0">
                We&apos;ve been building together since our teens. It started with early web experiments — Flash-based e-greeting cards, among the first of their kind. That project grew into one of the most visited greeting platforms on the web.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/60 m-0">
                People showed up. So we kept building.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Stats ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[80px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="max-w-[1120px] mx-auto grid grid-cols-3 gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <span className="font-bricolage font-bold text-[36px] md:text-[52px] leading-none tracking-[-0.04em]">{s.n}</span>
                <span className="font-bricolage text-sm md:text-base font-medium text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Early AI ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[360px] flex-shrink-0 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Early AI Experiments</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Long before AI became mainstream
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">
                We were already building systems that could respond and improve. It didn&apos;t look like today&apos;s AI — but the goal was the same.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EARLY_AI.map((item) => (
                <div
                  key={item}
                  className="rounded-xl px-4 py-3.5 flex items-start gap-3"
                  style={{ border: '1px solid rgba(84,87,94,0.25)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                  <span className="font-bricolage text-sm leading-[1.6em] text-white/55">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Industries ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[680px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Building Across Industries</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Products built and scaled at real scale
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">
                Some stayed focused. Others scaled to millions of users. Across all of them, the goal stayed the same: build products people actually use — and keep coming back to.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INDUSTRIES.map((ind) => (
                <div
                  key={ind.label}
                  className="rounded-xl p-5 flex flex-col gap-2"
                  style={{ border: '1px solid rgba(84,87,94,0.3)' }}
                >
                  <h3 className="font-bricolage font-medium text-base m-0">{ind.label}</h3>
                  <p className="font-bricolage text-sm leading-[1.6em] text-white/45 m-0">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Why LOGO.AI ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-6 max-w-[720px]">
            <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Why LOGO.AI</p>
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
              When AI reached the point where it could understand design — not just generate outputs — we knew exactly what to build.
            </h2>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
              Not another tool. Not another template system. AI that designs original, professional logos — in seconds.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </PageWrapper>
  )
}
