import PageWrapper from '@/components/PageWrapper'
import PageSection from '@/components/ui/PageSection'
import Badge from '@/components/ui/Badge'
import { BLUE, BORDER, CARD_BG } from '@/lib/ds'

const HIGHLIGHTS = [
  'Logo ready in seconds',
  'Designed from scratch',
  'Fits your brand from the start',
  'Free',
  'Loved by 1,000+ early testers',
]

const DELIVERABLES = [
  {
    title: 'Logo Files',
    desc: 'High-resolution PNG with transparent background, plus SVG, JPG, and PDF — ready for web and print.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M156,32H68a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H188a8,8,0,0,0,8-8V72Z" />
        <polyline points="156,32 156,72 196,72" />
      </svg>
    ),
  },
  {
    title: 'App Icons',
    desc: 'iOS and Android ready — optimized for App Store and Google Play.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="48" y="24" width="160" height="208" rx="16" />
        <line x1="48" y1="64" x2="208" y2="64" />
        <line x1="48" y1="192" x2="208" y2="192" />
      </svg>
    ),
  },
  {
    title: 'Social Kit',
    desc: 'Profile images, cover images, and story formats — sized perfectly for every platform.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="128" cy="128" r="40" />
        <rect x="32" y="32" width="192" height="192" rx="24" />
        <circle cx="180" cy="76" r="12" fill={BLUE} stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Brand Colors',
    desc: 'HEX, RGB, and CMYK — consistent across digital and print.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="128" cy="128" r="96" />
        <circle cx="128" cy="96" r="24" />
        <circle cx="100" cy="148" r="24" />
        <circle cx="156" cy="148" r="24" />
      </svg>
    ),
  },
  {
    title: 'Font Guide',
    desc: 'Carefully paired fonts for headlines, body, and accents — aligned with your brand.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="80,192 128,64 176,192" />
        <line x1="96" y1="152" x2="160" y2="152" />
      </svg>
    ),
  },
  {
    title: 'Brand Guide',
    desc: 'Clear rules for usage, spacing, and consistency — so your brand stays cohesive everywhere.',
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
    title: 'Business Card',
    desc: 'Print-ready layouts, front and back — designed to feel professional from day one.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="24" y="56" width="208" height="144" rx="8" />
        <line x1="24" y1="104" x2="232" y2="104" />
      </svg>
    ),
  },
  {
    title: 'Web Assets',
    desc: 'Favicons, OG images, and web-ready graphics — optimized for modern websites.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="128" cy="128" r="96" />
        <line x1="32" y1="128" x2="224" y2="128" />
        <ellipse cx="128" cy="128" rx="40" ry="96" />
      </svg>
    ),
  },
  {
    title: 'Email Signature',
    desc: 'Clean, branded signatures with your logo, colors, and links.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="32" y="56" width="192" height="144" rx="8" />
        <polyline points="32,56 128,128 224,56" />
      </svg>
    ),
  },
  {
    title: 'Letterhead',
    desc: 'Professional templates for proposals, contracts, and documents.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M156,32H68a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H188a8,8,0,0,0,8-8V72Z" />
        <polyline points="156,32 156,72 196,72" />
        <line x1="96" y1="120" x2="160" y2="120" />
        <line x1="96" y1="152" x2="160" y2="152" />
        <line x1="96" y1="184" x2="128" y2="184" />
      </svg>
    ),
  },
  {
    title: 'Invoice Design',
    desc: 'Branded invoice layouts that make your business look established and trustworthy.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="40" y="40" width="176" height="176" rx="8" />
        <line x1="80" y1="88" x2="176" y2="88" />
        <line x1="80" y1="120" x2="176" y2="120" />
        <line x1="80" y1="152" x2="128" y2="152" />
        <line x1="152" y1="176" x2="176" y2="176" />
      </svg>
    ),
  },
  {
    title: 'Mockups',
    desc: 'Real-world previews — cards, apparel, signage, and more — so you can see your brand in action.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <rect x="32" y="48" width="192" height="144" rx="16" />
        <line x1="160" y1="224" x2="96" y2="224" />
        <line x1="128" y1="192" x2="128" y2="224" />
      </svg>
    ),
  },
]

const VISION_POINTS = [
  'Understand what makes a logo work',
  'Make design decisions — not just outputs',
  'Produce work that feels intentional, not assembled',
]

export default function AboutPage() {
  return (
    <PageWrapper>

      {/* -- Hero -- */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex flex-col gap-6 flex-1">
            <h1
              className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[860px]"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
            >
              About
            </h1>
            <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.02em] text-white/70 max-w-[640px] m-0">
              From name to logo — in seconds
            </p>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/40 max-w-[640px] m-0">
              Create an original, professional logo — instantly.
              No templates. No guesswork. No waiting.
            </p>
          </div>
          <img
            src="/images/illustrations/final-about-hero.png"
            alt="Type a name, get a logo instantly"
            className="flex-shrink-0 w-[200px] md:w-[440px] h-auto opacity-90"
          />
        </div>
      </section>

      {/* -- Highlights strip -- */}
      <PageSection compact tinted>
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-wrap gap-3">
            {HIGHLIGHTS.map((h) => (
              <span
                key={h}
                className="font-bricolage text-sm font-medium text-white/55 px-4 py-2.5 rounded-lg"
                style={{ border: BORDER, background: CARD_BG }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </PageSection>

      {/* -- What We Built -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          <div className="flex-1 flex flex-col gap-5">
            <Badge icon="sparkle" text="What We Built" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
              A new way to design a logo
            </h2>
            <div className="flex flex-col gap-3">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Logo.ai doesn&apos;t use templates.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                It designs from scratch — every time.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Tell us about your business, and in seconds,
                AI designs a logo that fits your brand.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <p className="font-bricolage text-sm font-medium text-white/40 m-0">Their reaction:</p>
              <p className="font-bricolage font-medium text-lg md:text-xl text-white m-0">
                &ldquo;This can&apos;t be real.&rdquo;
              </p>
              <p className="font-bricolage font-medium text-base text-white/55 m-0">It is.</p>
            </div>
            <a
              href="/our-story"
              className="inline-flex w-fit items-center gap-2 font-bricolage font-medium text-sm no-underline transition-colors duration-200 hover:text-white"
              style={{ color: BLUE }}
            >
              Read Our Story →
            </a>
          </div>
          <img
            src="/images/illustrations/final-whatwebuilt.png"
            alt="This can't be real — the reaction to seeing your logo"
            className="w-[200px] lg:w-[480px] flex-shrink-0 h-auto opacity-90"
          />
        </div>
      </PageSection>

      {/* -- What You Get -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
          <div className="flex flex-col gap-4 max-w-[640px]">
            <Badge icon="lightning" text="What You Get" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
              Everything designed around your logo
            </h2>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              From your logo to everything around it —
              every piece works together.
              No gaps. No patchwork. No guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DELIVERABLES.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                style={{ border: BORDER, background: CARD_BG }}
              >
                {d.icon}
                <h3 className="font-bricolage font-medium text-base leading-[1.4em] m-0">{d.title}</h3>
                <p className="font-bricolage text-sm leading-[1.65em] text-white/55 m-0">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* -- How We're Different -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
            <Badge icon="trophy" text="How We're Different" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
              Most tools rely on templates.
            </h2>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              Logo.ai works differently.
            </p>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              It&apos;s trained on real design principles —
              so it understands composition, balance, and structure.
            </p>
            <div className="flex flex-col gap-1 pt-2">
              <p className="font-bricolage text-base md:text-lg text-white/55 m-0">It doesn&apos;t assemble.</p>
              <p className="font-bricolage font-medium text-lg md:text-xl text-white m-0">It designs.</p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* -- Why Now -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
            <Badge icon="lightning" text="Why Now" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
              For years, this wasn&apos;t possible.
            </h2>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              Design required human judgment —
              something software couldn&apos;t replicate.
            </p>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              Recent advances in AI changed that.
            </p>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              For the first time, AI can
              not just produce results — but understand design.
            </p>
            <p className="font-bricolage font-medium text-base md:text-lg text-white m-0 pt-2">
              That&apos;s what makes Logo.ai possible today.
            </p>
          </div>
        </div>
      </PageSection>

      {/* -- Who We Are -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col gap-5">
            <Badge icon="users" text="Who We Are" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
              A small team with a big question
            </h2>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              A small team of engineers, designers, and builders
              focused on one question:
            </p>
            <p className="font-bricolage font-medium text-lg md:text-xl text-white m-0">
              Why does something as simple as a logo
              still take so long to get right?
            </p>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              We&apos;ve been building products for decades
              and saw the same problem every time.
            </p>
            <p className="font-bricolage font-medium text-base md:text-lg text-white/55 m-0">
              So we built something better.
            </p>
          </div>
          <img
            src="/images/illustrations/final-whoweare.png"
            alt="Small team obsessing over one question"
            className="w-[200px] lg:w-[480px] flex-shrink-0 h-auto opacity-90"
          />
        </div>
      </PageSection>

      {/* -- Our Mission -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-[320px] flex-shrink-0 flex flex-col gap-5">
            <Badge icon="shield" text="Our Mission" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[36px] leading-[1.15em] tracking-[-0.04em] m-0">
              Remove the bottleneck from logo design.
            </h2>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              Creating a logo — something foundational —
              takes weeks, costs thousands,
              and still doesn&apos;t feel right.
            </p>
            <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
              We built Logo.ai to fix that.
            </p>
            <p className="font-bricolage font-medium text-base md:text-lg text-white m-0 pt-2">
              So a brand can move from name to identity —
              in minutes, not weeks.
            </p>
          </div>
        </div>
      </PageSection>

      {/* -- Our Vision -- */}
      <PageSection>
        <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
          <div className="flex flex-col gap-5 max-w-[640px]">
            <Badge icon="rocket" text="Our Vision" />
            <h2 className="font-bricolage font-medium text-[28px] md:text-[40px] leading-[1.15em] tracking-[-0.04em] m-0">
              Design that understands what it&apos;s creating.
            </h2>
            <div className="flex flex-col gap-3">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Most tools generate.
                They don&apos;t understand.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                We&apos;re building systems that:
              </p>
              <ul className="flex flex-col gap-2 m-0 pl-0 list-none">
                {VISION_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-[9px] w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                    <span className="font-bricolage text-base md:text-lg text-white/55">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
            style={{ border: BORDER }}
          >
            <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.5em] text-white m-0">
              A world where creating a professional identity
              is instant — and expected.
            </p>
            <div className="flex flex-col gap-1.5">
              <p className="font-bricolage text-base md:text-lg text-white/55 m-0">Not something you wait for.</p>
              <p className="font-bricolage text-base md:text-lg text-white/55 m-0">Not something you outsource.</p>
              <p className="font-bricolage font-medium text-base md:text-lg text-white m-0">
                Something built into the system itself.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col gap-3"
            style={{ border: '1px solid rgba(0,0,255,0.3)', background: 'rgba(0,0,255,0.06)' }}
          >
            <p className="font-bricolage text-base md:text-lg text-white/55 m-0">
              So creating a logo isn&apos;t a project anymore.
            </p>
            <p className="font-bricolage font-medium text-xl md:text-2xl leading-[1.4em] tracking-[-0.03em] text-white m-0">
              It&apos;s just the starting point.
            </p>
          </div>
        </div>
      </PageSection>

    </PageWrapper>
  )
}
