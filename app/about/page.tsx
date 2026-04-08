import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'

const DELIVERABLES = [
  {
    title: 'Logo Files',
    desc: 'High-resolution PNG with transparent background, plus SVG, JPG, and PDF — ready for web and print.',
  },
  {
    title: 'App Icons',
    desc: 'iOS and Android ready — optimized for App Store and Google Play.',
  },
  {
    title: 'Social Kit',
    desc: 'Profile images, cover images, and story formats — sized perfectly for every platform.',
  },
  {
    title: 'Brand Colors',
    desc: 'HEX, RGB, and CMYK — consistent across digital and print.',
  },
  {
    title: 'Font Guide',
    desc: 'Carefully paired fonts for headlines, body, and accents — aligned with your brand.',
  },
  {
    title: 'Brand Guide',
    desc: 'Clear rules for usage, spacing, and consistency — so your brand stays cohesive everywhere.',
  },
  {
    title: 'Business Card',
    desc: 'Print-ready layouts, front and back — designed to feel professional from day one.',
  },
  {
    title: 'Web Assets',
    desc: 'Favicons, OG images, and web-ready graphics — optimized for modern websites.',
  },
  {
    title: 'Email Signature',
    desc: 'Clean, branded signatures with your logo, colors, and links.',
  },
  {
    title: 'Letterhead',
    desc: 'Professional templates for proposals, contracts, and documents.',
  },
  {
    title: 'Invoice Design',
    desc: 'Branded invoice layouts that make your business look established and trustworthy.',
  },
  {
    title: 'Mockups',
    desc: 'Real-world previews — cards, apparel, signage, and more — so you can see your brand in action.',
  },
]

const TAGS = [
  'Logo ready in seconds',
  'Designed from scratch',
  'Fits your brand from the start',
  'Free',
  'Loved by 1,000+ early testers',
]

const VISION_POINTS = [
  'Understand what makes a logo work',
  'Make design decisions — not just outputs',
  'Produce work that feels intentional, not assembled',
]

export default function AboutPage() {
  return (
    <PageWrapper>

      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-7">
          <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px] m-0">
            About LOGO.AI
          </p>
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[860px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            From name to logo —{' '}
            <span className="text-white/40">in seconds.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/55 max-w-[600px] m-0">
            Create an original, professional logo — instantly.
            No templates. No guesswork. No waiting.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {TAGS.map((t) => (
              <span
                key={t}
                className="font-bricolage text-sm font-medium text-white/60 px-3.5 py-1.5 rounded-lg"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Built ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                What We Built
              </p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                A new way to design a logo
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  LOGO.AI doesn&apos;t use templates.
                  <br />
                  It designs from scratch — every time.
                </p>
                <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                  Tell us about your business, and in seconds,
                  AI designs a logo that fits your brand.
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              <div
                className="rounded-2xl p-8 flex flex-col gap-5"
                style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                  Their reaction
                </p>
                <blockquote className="m-0">
                  <p
                    className="font-bricolage font-medium leading-[1.2em] tracking-[-0.03em] text-white m-0"
                    style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
                  >
                    &ldquo;This can&apos;t be real.&rdquo;
                  </p>
                </blockquote>
                <p className="font-bricolage text-base font-medium text-white/50 m-0">
                  It is.
                </p>
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 font-bricolage font-medium text-sm text-white/60 no-underline hover:text-white transition-colors duration-200 w-fit"
                >
                  → Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── What You Get ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[680px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                What You Get
              </p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
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
                  className="rounded-xl p-5 flex flex-col gap-2.5"
                  style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <h3 className="font-bricolage font-medium text-base m-0 text-white">{d.title}</h3>
                  <p className="font-bricolage text-sm leading-[1.65em] text-white/50 m-0">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── How We're Different ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[280px] flex-shrink-0">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                How We&apos;re Different
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Most tools rely on templates.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                LOGO.AI works differently.
                It&apos;s trained on real design principles —
                so it understands composition, balance, and structure.
              </p>
              <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.5em] text-white m-0">
                It doesn&apos;t assemble.
                <br />
                It designs.
              </p>
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
            <div className="lg:w-[280px] flex-shrink-0">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                Why Now
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                For years, this wasn&apos;t possible.
                Design required human judgment —
                something software couldn&apos;t replicate.
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                Recent advances in AI changed that.
                For the first time, AI can
                not just produce results — but understand design.
              </p>
              <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.5em] text-white m-0">
                That&apos;s what makes LOGO.AI possible today.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Who We Are ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-[280px] flex-shrink-0">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                Who We Are
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                A small team of engineers, designers, and builders
                focused on one question:
              </p>
              <p className="font-bricolage font-medium text-lg md:text-2xl leading-[1.4em] tracking-[-0.02em] text-white m-0">
                Why does something as simple as a logo
                still take so long to get right?
              </p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/55 m-0">
                We&apos;ve been building products for decades
                and saw the same problem every time.
                So we built something better.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Mission & Vision ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
              style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
            >
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                Our Mission
              </p>
              <h2 className="font-bricolage font-medium text-[22px] md:text-[28px] leading-[1.25em] tracking-[-0.03em] m-0">
                Remove the bottleneck from logo design.
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                  Creating a logo — something foundational —
                  takes weeks, costs thousands,
                  and still doesn&apos;t feel right.
                </p>
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                  We built LOGO.AI to fix that.
                  So a brand can move from name to identity —
                  in minutes, not weeks.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
              style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
            >
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">
                Our Vision
              </p>
              <h2 className="font-bricolage font-medium text-[22px] md:text-[28px] leading-[1.25em] tracking-[-0.03em] m-0">
                Design that understands what it&apos;s creating.
              </h2>
              <div className="flex flex-col gap-3">
                <p className="font-bricolage text-base leading-[1.7em] text-white/55 m-0">
                  Most tools generate.
                  They don&apos;t understand.
                  We&apos;re building systems that:
                </p>
                <ul className="flex flex-col gap-2 m-0 pl-0 list-none">
                  {VISION_POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      <span className="font-bricolage text-base leading-[1.7em] text-white/55">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Closing ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col gap-6 max-w-[760px]">
            <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] text-white/55 m-0">
              A world where creating a professional identity
              is instant — and expected.
              Not something you wait for.
              Not something you outsource.
              Something built into the system itself.
            </p>
            <p
              className="font-bricolage font-medium leading-[1.2em] tracking-[-0.03em] text-white m-0"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              So creating a logo isn&apos;t a project anymore.
              <br />
              <span className="text-white/40">It&apos;s just the starting point.</span>
            </p>
          </div>
        </section>
      </ScrollReveal>

    </PageWrapper>
  )
}
