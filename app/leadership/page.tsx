import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'

const BLUE = 'rgb(0,0,255)'

// Phosphor-style icon helpers — viewBox 256×256, strokeWidth 20
function Icon({ children, size = 24 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      stroke={BLUE}
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

const FOUNDERS = [
  {
    name: 'Abhinav Reddy',
    role: 'Co-founder — Product & Technology',
    bio: "Obsessed with making AI feel invisible — the kind where you forget you're not working with a human designer.",
    icon: (
      <Icon>
        <circle cx="128" cy="96" r="56" />
        <path d="M36,224a96,96,0,0,1,184,0" />
      </Icon>
    ),
  },
  {
    name: 'Ashwin Reddy',
    role: 'Co-founder — Strategy & Growth',
    bio: 'Focused on building products people talk about, share, and keep coming back to — where growth is driven by the product, not just marketing.',
    icon: (
      <Icon>
        <polyline points="232 56 136 152 96 112 24 184" />
        <polyline points="232 120 232 56 168 56" />
      </Icon>
    ),
  },
]

const EARLY_AI = [
  'Personality chatbots that could hold basic conversations',
  'Messenger bots on MSN and AIM',
  'Website assistants that guided users step by step',
  'Interactive AI systems with stories, puzzles, and choices',
  'AI game opponents that adapted to how people played',
  'Recommendation systems based on what users clicked and engaged with',
  'Automated trading systems for algorithmic stock strategies',
  'Virtual pets that reacted and changed based on user interaction',
  'Early computer vision systems that could recognize patterns and images',
]

const INDUSTRIES = [
  { label: 'Media', desc: 'Stock photos, comics, and large online communities', icon: (
    <Icon size={20}><rect x="32" y="48" width="192" height="144" rx="16"/><line x1="160" y1="224" x2="96" y2="224"/><line x1="128" y1="192" x2="128" y2="224"/></Icon>
  )},
  { label: 'Insurance', desc: 'Health, life, auto, and business coverage', icon: (
    <Icon size={20}><path d="M40,114.79V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.79c0,84.18-71.78,111.19-85.54,116a7.83,7.83,0,0,1-4.92,0C111.78,225.98,40,198.97,40,114.79Z"/><polyline points="88,136 112,160 168,104"/></Icon>
  )},
  { label: 'Education', desc: 'Fields, programs, and structured learning paths', icon: (
    <Icon size={20}><path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87V176a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V117.87l19.76-14.81a8,8,0,0,0,0-14.12Z"/><path d="M216,224H40"/></Icon>
  )},
  { label: 'Career', desc: 'Roles, certifications, and career discovery', icon: (
    <Icon size={20}><rect x="32" y="72" width="192" height="144" rx="8"/><path d="M168,72V56a16,16,0,0,0-16-16H104A16,16,0,0,0,88,56V72"/><line x1="128" y1="120" x2="128" y2="168"/><line x1="104" y1="144" x2="152" y2="144"/></Icon>
  )},
  { label: 'Productivity', desc: 'Resumes, portfolios, and interview prep', icon: (
    <Icon size={20}><path d="M156,32H68a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H188a8,8,0,0,0,8-8V72Z"/><polyline points="156,32 156,72 196,72"/><line x1="96" y1="120" x2="160" y2="120"/><line x1="96" y1="152" x2="160" y2="152"/><line x1="96" y1="184" x2="128" y2="184"/></Icon>
  )},
  { label: 'E-Commerce', desc: 'Pets, wellness, hobbies, outdoor, collectibles', icon: (
    <Icon size={20}><path d="M222.14,58.87l-20.08,85.42A16,16,0,0,1,186.5,157H72.74a16,16,0,0,1-15.52-12L40.87,55H24"/><circle cx="104" cy="208" r="16"/><circle cx="176" cy="208" r="16"/><polyline points="240,104 192,104"/><line x1="216" y1="80" x2="216" y2="128"/></Icon>
  )},
]

const STATS = [
  { n: 'Three decades', label: 'of building', icon: (
    <Icon size={28}><circle cx="128" cy="128" r="96"/><polyline points="128,64 128,128 184,128"/></Icon>
  )},
  { n: 'Multiple', label: 'Exits', icon: (
    <Icon size={28}><path d="M216,112v96a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V112"/><polyline points="216,56 128,8 40,56"/><polyline points="96,184 128,216 160,184"/><line x1="128" y1="112" x2="128" y2="216"/></Icon>
  )},
  { n: 'Millions', label: 'Users reached', icon: (
    <Icon size={28}><circle cx="80" cy="104" r="40"/><path d="M16,200a80,80,0,0,1,128-64"/><circle cx="176" cy="144" r="40"/><path d="M136,200a80,80,0,0,1,80,0"/></Icon>
  )},
]

const BELIEFS = [
  {
    title: 'Removing friction',
    desc: 'Every step that slows a user down is a step that loses them. We cut it.',
    icon: (
      <Icon size={28}><line x1="200" y1="56" x2="56" y2="200"/><line x1="56" y1="56" x2="200" y2="200"/></Icon>
    ),
  },
  {
    title: 'Making decisions simpler',
    desc: 'Complexity is a design failure. The right system makes the hard choice obvious.',
    icon: (
      <Icon size={28}><path d="M154.8,197.6a80,80,0,1,1,42.8-42.8"/><polyline points="220,56 132,144 100,112"/></Icon>
    ),
  },
  {
    title: 'Building systems that do the work',
    desc: 'A great product doesn\'t just help you work — it works for you.',
    icon: (
      <Icon size={28}><rect x="88" y="88" width="80" height="80" rx="8"/><path d="M112,88V64"/><path d="M144,88V64"/><path d="M112,192v-24"/><path d="M144,192v-24"/><path d="M88,112H64"/><path d="M88,144H64"/><path d="M192,112H168"/><path d="M192,144H168"/><rect x="40" y="40" width="176" height="176" rx="16"/></Icon>
    ),
  },
]

const BUILDING = [
  {
    title: 'Understand design',
    desc: 'Not just pattern-match outputs — actually reason about composition, hierarchy, and intent.',
    icon: (
      <Icon size={28}><path d="M1,128S48,32,128,32s127,96,127,96-47,96-127,96S1,128,1,128Z"/><circle cx="128" cy="128" r="40"/></Icon>
    ),
  },
  {
    title: 'Make decisions',
    desc: 'Choose the right color, the right weight, the right spacing — autonomously and correctly.',
    icon: (
      <Icon size={28}><rect x="40" y="40" width="176" height="176" rx="8"/><line x1="128" y1="88" x2="128" y2="128"/><line x1="108" y1="108" x2="128" y2="128"/></Icon>
    ),
  },
  {
    title: 'Improve over time',
    desc: 'Every logo generated makes the next one better. That\'s how good systems compound.',
    icon: (
      <Icon size={28}><polyline points="232 56 136 152 96 112 24 184"/><polyline points="232 120 232 56 168 56"/></Icon>
    ),
  },
]

const AHEAD = [
  {
    title: 'Anyone can create a professional brand',
    desc: 'No agency. No budget. No design degree. Just a name and an idea.',
    icon: (
      <Icon size={28}><circle cx="80" cy="104" r="40"/><path d="M16,200a80,80,0,0,1,128-64"/><circle cx="176" cy="144" r="40"/><path d="M136,200a80,80,0,0,1,80,0"/></Icon>
    ),
  },
  {
    title: 'Good design is built into the system',
    desc: 'Quality is not a premium feature. It\'s the baseline.',
    icon: (
      <Icon size={28}><polyline points="88,136 112,160 168,104"/><path d="M40,114.79V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.79c0,84.18-71.78,111.19-85.54,116a7.83,7.83,0,0,1-4.92,0C111.78,225.98,40,198.97,40,114.79Z"/></Icon>
    ),
  },
  {
    title: 'Time, cost, and access are no longer barriers',
    desc: 'What used to take weeks and thousands of dollars now takes seconds — for free.',
    icon: (
      <Icon size={28}><polyline points="152,16 72,144 128,144 104,240 184,112 128,112 152,16"/></Icon>
    ),
  },
]

export default function LeadershipPage() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
          <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px]">Leadership &amp; Journey</p>
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[800px]"
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
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,0,255,0.1)', border: '1px solid rgba(0,0,255,0.2)' }}
                    >
                      <span className="font-bricolage font-semibold text-lg" style={{ color: BLUE }}>
                        {f.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-bricolage font-medium text-[20px] md:text-[24px] leading-[1.2em] tracking-[-0.03em] m-0">{f.name}</h2>
                      <p className="font-bricolage text-sm font-medium text-white/40 m-0">{f.role}</p>
                    </div>
                  </div>
                  <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">{f.bio}</p>
                  <div className="pt-2 border-t border-white/[0.06]">
                    <span className="opacity-40">{f.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Joint statement */}
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col gap-4"
              style={{ border: '1px solid rgba(84,87,94,0.3)' }}
            >
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                We&apos;ve been building together since our teens.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                It started with early web experiments — Flash-based e-greeting cards, among the first of their kind.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                That project grew into one of the most visited greeting platforms on the web.
              </p>
              <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.5em] text-white m-0">
                People showed up.<br />So we kept building.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Early AI Experiments ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[360px] flex-shrink-0 flex flex-col gap-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="88" y="88" width="80" height="80" rx="8"/>
                  <path d="M112,88V64"/><path d="M144,88V64"/>
                  <path d="M112,192v-24"/><path d="M144,192v-24"/>
                  <path d="M88,112H64"/><path d="M88,144H64"/>
                  <path d="M192,112H168"/><path d="M192,144H168"/>
                  <rect x="40" y="40" width="176" height="176" rx="16"/>
                </svg>
              </div>
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Early AI Experiments</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Long before AI became mainstream
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">
                We were already building systems that could respond and improve.
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {EARLY_AI.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl px-5 py-4 flex items-start gap-3"
                  style={{ border: '1px solid rgba(84,87,94,0.25)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <span
                    className="mt-[3px] flex-shrink-0 font-bricolage text-xs font-bold w-5 text-right"
                    style={{ color: 'rgba(0,0,255,0.4)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-bricolage text-sm leading-[1.6em] text-white/55">{item}</span>
                </div>
              ))}
              <div className="mt-3 rounded-xl px-5 py-4" style={{ background: 'rgba(0,0,255,0.06)', border: '1px solid rgba(0,0,255,0.2)' }}>
                <p className="font-bricolage text-sm leading-[1.7em] text-white/70 m-0">
                  It didn&apos;t look like today&apos;s AI — but the goal was the same:<br />
                  <span className="font-medium text-white">Build systems that respond, learn, and improve over time.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Building Across Industries ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-5 max-w-[680px]">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16,224 240,224"/>
                  <rect x="128" y="48" width="96" height="176" rx="8"/>
                  <path d="M40,224V112a8,8,0,0,1,8-8H96a8,8,0,0,1,8,8v112"/>
                  <line x1="152" y1="96" x2="152" y2="96"/><line x1="184" y1="96" x2="184" y2="96"/>
                  <line x1="152" y1="128" x2="152" y2="128"/><line x1="184" y1="128" x2="184" y2="128"/>
                  <line x1="152" y1="160" x2="152" y2="160"/><line x1="184" y1="160" x2="184" y2="160"/>
                  <rect x="152" y="184" width="24" height="40"/>
                </svg>
              </div>
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Building Across Industries</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                Products built and scaled at real scale
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">
                Alongside those experiments, we built and scaled products across multiple industries:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INDUSTRIES.map((ind) => (
                <div
                  key={ind.label}
                  className="rounded-xl p-5 flex flex-col gap-3"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
                  >
                    {ind.icon}
                  </div>
                  <h3 className="font-bricolage font-medium text-base m-0">{ind.label}</h3>
                  <p className="font-bricolage text-sm leading-[1.6em] text-white/50 m-0">{ind.desc}</p>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-7 flex flex-col gap-3"
              style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(84,87,94,0.3)' }}
            >
              <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                Some products stayed focused. Others scaled to millions of users.
              </p>
              <p className="font-bricolage font-medium text-base md:text-lg leading-[1.6em] text-white m-0">
                Across all of them, the goal stayed the same: Build products people actually use — and keep coming back to.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Experience that adds up ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[80px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-14">
            <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Experience that adds up</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
                  >
                    {s.icon}
                  </div>
                  <span className="font-bricolage font-bold text-[28px] md:text-[36px] leading-none tracking-[-0.04em]">{s.n}</span>
                  <span className="font-bricolage text-sm md:text-base font-medium text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-7 md:p-8 flex flex-col gap-2"
              style={{ border: '1px solid rgba(0,0,255,0.2)', background: 'rgba(0,0,255,0.05)' }}
            >
              <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px] m-0">One belief never changed</p>
              <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.03em] text-white m-0">
                If people don&apos;t love the product, nothing else matters.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── The Pattern We Couldn't Ignore ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224H215.45a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09Z"/>
                  <line x1="128" y1="104" x2="128" y2="144"/>
                  <circle cx="128" cy="180" r="12" fill={BLUE} stroke="none"/>
                </svg>
              </div>
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">The Pattern We Couldn&apos;t Ignore</p>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Across everything we built, one problem kept repeating:
              </p>
              <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.03em] text-white m-0">
                Creating a logo was always harder than it should be.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {['Too slow.', 'Too expensive.', 'Too uncertain.'].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl px-4 py-3 text-center"
                    style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    <span className="font-bricolage font-medium text-sm text-white/55">{label}</span>
                  </div>
                ))}
              </div>
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
          <div className="max-w-[1120px] mx-auto flex flex-col gap-8 max-w-[760px]">
            <div className="flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
              >
                <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="152,16 72,144 128,144 104,240 184,112 128,112 152,16"/>
                </svg>
              </div>
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Why LOGO.AI</p>
            </div>
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
              When AI reached the point where it could understand design — not just generate outputs —
            </h2>
            <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.03em] text-white m-0">
              We knew exactly what to build.
            </p>
            <div className="flex flex-col gap-2">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">Not another tool.</p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">Not another template system.</p>
              <p className="font-bricolage font-medium text-base md:text-lg leading-[1.7em] text-white m-0">
                AI that designs original, professional logos — in seconds.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── How We Think ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[580px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">How We Think</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                We don&apos;t believe in adding features for the sake of it.
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">We believe in:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BELIEFS.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
                  >
                    {b.icon}
                  </div>
                  <h3 className="font-bricolage font-medium text-base leading-[1.4em] m-0">{b.title}</h3>
                  <p className="font-bricolage text-sm leading-[1.65em] text-white/50 m-0">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── What We're Building ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[580px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">What We&apos;re Building</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                LOGO.AI is just the start.
              </h2>
              <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">
                We&apos;re building systems that:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BUILDING.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
                  >
                    {b.icon}
                  </div>
                  <h3 className="font-bricolage font-medium text-base leading-[1.4em] m-0">{b.title}</h3>
                  <p className="font-bricolage text-sm leading-[1.65em] text-white/50 m-0">{b.desc}</p>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-7 text-center"
              style={{ border: '1px solid rgba(0,0,255,0.2)', background: 'rgba(0,0,255,0.05)' }}
            >
              <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.5em] text-white m-0">
                Not just tools — systems that design.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Looking Ahead ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[580px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Looking Ahead</p>
              <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
                We&apos;re building toward a world where:
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {AHEAD.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,0,255,0.08)', border: '1px solid rgba(0,0,255,0.2)' }}
                  >
                    {a.icon}
                  </div>
                  <h3 className="font-bricolage font-medium text-base leading-[1.4em] m-0">{a.title}</h3>
                  <p className="font-bricolage text-sm leading-[1.65em] text-white/50 m-0">{a.desc}</p>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col gap-4"
              style={{ border: '1px solid rgba(84,87,94,0.3)' }}
            >
              <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.03em] text-white m-0">
                Creating a logo shouldn&apos;t be a project.
              </p>
              <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.03em] text-white/40 m-0">
                It should take seconds.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

    </PageWrapper>
  )
}
