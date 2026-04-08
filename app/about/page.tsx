import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'

const DELIVERABLES = [
  { icon: '◻', title: 'Logo Files', desc: 'High-resolution PNG with transparent background, plus SVG, JPG, and PDF — ready for web and print.' },
  { icon: '◻', title: 'App Icons', desc: 'iOS and Android ready — optimized for App Store and Google Play.' },
  { icon: '◻', title: 'Social Kit', desc: 'Profile images, cover images, and story formats — sized perfectly for every platform.' },
  { icon: '◻', title: 'Brand Colors', desc: 'HEX, RGB, and CMYK — consistent across digital and print.' },
  { icon: '◻', title: 'Font Guide', desc: 'Carefully paired fonts for headlines, body, and accents — aligned with your brand.' },
  { icon: '◻', title: 'Brand Guide', desc: 'Clear rules for usage, spacing, and consistency — so your brand stays cohesive everywhere.' },
  { icon: '◻', title: 'Business Card', desc: 'Print-ready layouts, front and back — designed to feel professional from day one.' },
  { icon: '◻', title: 'Web Assets', desc: 'Favicons, OG images, and web-ready graphics — optimized for modern websites.' },
  { icon: '◻', title: 'Email Signature', desc: 'Clean, branded signatures with your logo, colors, and links.' },
  { icon: '◻', title: 'Letterhead', desc: 'Professional templates for proposals, contracts, and documents.' },
  { icon: '◻', title: 'Invoice Design', desc: 'Branded invoice layouts that make your business look established and trustworthy.' },
  { icon: '◻', title: 'Mockups', desc: 'Real-world previews — cards, apparel, signage, and more — so you can see your brand in action.' },
]

const ICONS = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  <svg key="e" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="f" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
]

const DIFF_POINTS = [
  { title: 'Ready in seconds', desc: 'No waiting days or weeks. No revisions. Just a finished logo — ready to use.' },
  { title: 'AI makes the decisions', desc: "You don't need design skills. The AI handles the design choices for you." },
  { title: 'Designed from scratch', desc: 'No templates. Real design principles — color, typography, spacing, and hierarchy.' },
  { title: 'Understands your brand', desc: 'LOGO.AI adapts to your industry, tone, and style — so your logo fits from the start.' },
  { title: 'Works everywhere', desc: 'Built for web, print, and apps — so your brand stays consistent everywhere.' },
  { title: 'Everything works together', desc: 'Your logo, colors, and assets are designed as one system — not separate pieces.' },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
          <p className="font-bricolage text-sm font-medium text-white/40 uppercase tracking-[2px]">About</p>
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[860px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            From name to logo —{' '}
            <span className="text-white/40">in seconds.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/50 max-w-[600px] m-0">
            Create an original, professional logo — instantly. No templates. No guesswork. No waiting.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Logo ready in seconds', 'Designed from scratch', 'Free', 'Loved by 1,000+ early testers'].map((t) => (
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
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">What We Built</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                A new way to design a logo
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                LOGO.AI doesn&apos;t use templates. It designs from scratch — every time. Tell us about your business, and in seconds, AI designs a logo that fits your brand.
              </p>
              <blockquote className="border-l-2 border-white/20 pl-5 m-0">
                <p className="font-bricolage text-base md:text-lg leading-[1.6em] text-white/70 m-0 italic">
                  &ldquo;This can&apos;t be real.&rdquo;
                </p>
                <p className="font-bricolage text-sm text-white/40 m-0 mt-2">— Early tester reaction</p>
              </blockquote>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">How We&apos;re Different</p>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                Most tools rely on templates. LOGO.AI is trained on real design principles — so it understands composition, balance, and structure. It doesn&apos;t assemble. It designs.
              </p>
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
          <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
            <div className="flex flex-col gap-4 max-w-[680px]">
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">Why Choose LOGO.AI</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                Built differently, by design
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DIFF_POINTS.map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                  style={{ border: '1px solid rgba(84,87,94,0.3)' }}
                >
                  <span className="text-white/30">{ICONS[i]}</span>
                  <h3 className="font-bricolage font-medium text-lg leading-[1.3em] m-0">{p.title}</h3>
                  <p className="font-bricolage text-sm leading-[1.7em] text-white/50 m-0">{p.desc}</p>
                </div>
              ))}
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
              <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">What You Get</p>
              <h2 className="font-bricolage font-medium text-[32px] md:text-[44px] leading-[1.1em] tracking-[-0.04em] m-0">
                Everything designed around your logo
              </h2>
              <p className="font-bricolage text-base md:text-lg leading-[1.7em] text-white/50 m-0">
                From your logo to everything around it — every piece works together. No gaps. No patchwork. No guesswork.
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
                  <p className="font-bricolage text-sm leading-[1.65em] text-white/45 m-0">{d.desc}</p>
                </div>
              ))}
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
          <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                label: 'Our Mission',
                heading: 'Remove the bottleneck from logo design.',
                body: 'Creating a logo — something foundational — takes weeks, costs thousands, and still doesn\'t feel right. We built LOGO.AI to fix that. So a brand can move from name to identity — in minutes, not weeks.',
              },
              {
                label: 'Our Vision',
                heading: 'Design that understands what it\'s creating.',
                body: 'Most tools generate. They don\'t understand. We\'re building systems that understand what makes a logo work, make design decisions — not just outputs, and produce work that feels intentional, not assembled.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
                style={{ border: '1px solid rgba(84,87,94,0.3)', background: 'rgba(255,255,255,0.015)' }}
              >
                <p className="font-bricolage text-xs font-medium text-white/40 uppercase tracking-[2px] m-0">{item.label}</p>
                <h2 className="font-bricolage font-medium text-[22px] md:text-[28px] leading-[1.25em] tracking-[-0.03em] m-0">{item.heading}</h2>
                <p className="font-bricolage text-base leading-[1.7em] text-white/50 m-0">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </PageWrapper>
  )
}
