'use client'

import { useState } from 'react'
import PageWrapper from '@/components/PageWrapper'
import ScrollReveal from '@/components/ScrollReveal'
import Badge from '@/components/ui/Badge'

const FAQS = [
  {
    q: 'Is it really free?',
    a: "Yes — there's no cost to create and download your logo. No hidden fees. No credit card required.",
  },
  {
    q: 'Will my logo be unique?',
    a: 'Yes — every logo is designed from scratch for your brand. No templates. No reuse.',
  },
  {
    q: 'How is this different from other AI logo makers?',
    a: "Most other AI logo makers use templates or pre-made elements. LOGO.AI designs logos from scratch using real design principles — so the result is original and consistent.",
  },
  {
    q: 'Do I own my logo?',
    a: 'Yes — once you download it, you have full rights to use it anywhere, for personal or commercial use.',
  },
  {
    q: "Will I see multiple logo options?",
    a: "Yes — you'll get multiple logo options for your brand. Pick the one that fits best.",
  },
  {
    q: 'Do I need design experience?',
    a: 'No — you just answer a few simple questions. Our AI handles the design decisions for you.',
  },
  {
    q: 'What file formats will I get?',
    a: "You'll get a high-resolution PNG with a transparent background. Additional formats like SVG and PDF are coming soon.",
  },
  {
    q: 'When will I get my logo?',
    a: "As soon as we launch. You'll get an email when it's live. Then create and download your logo in seconds.",
  },
  {
    q: 'How many free logos are left?',
    a: "We're offering 1,000,000 free logos at launch. Over 129,000 have already been claimed. Spots are limited — join early to secure yours.",
  },
  {
    q: 'Is my logo trademark-safe?',
    a: "We design each logo to be original and distinct. However, we can't guarantee trademark approval. If you plan to trademark your logo, we recommend a quick legal check.",
  },
  {
    q: 'Why are you offering this for free?',
    a: "We want people to experience the quality for themselves. If it's good, it spreads.",
  },
  {
    q: 'When does LOGO.AI launch?',
    a: 'Launching in 21 days. Join now to secure your spot.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-faq-item
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-colors duration-200"
      style={{
        borderBottom: open ? '1px solid rgba(0,0,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
        backgroundColor: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
      }}
    >
      <div className="flex justify-between items-start py-5 gap-4">
        <span
          className="font-bricolage font-medium text-base leading-6 flex-1 transition-colors duration-200"
          style={{ color: hovered || open ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)' }}
        >
          {q}
        </span>
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center">
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <path
              d="M7 1V13M1 7H13"
              stroke={hovered || open ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)'}
              strokeWidth="1.5" strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.23,1,0.32,1)' }}>
        <p className="font-bricolage text-sm leading-[1.7] text-white/50 pr-10 pb-5 m-0">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  const half = Math.ceil(FAQS.length / 2)
  const cols = [FAQS.slice(0, half), FAQS.slice(half)]

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="px-5 md:px-8 lg:px-10 pt-[140px] md:pt-[200px] pb-16 md:pb-[120px]">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
          <Badge icon="question" text="FAQ" />
          <h1
            className="font-bricolage font-medium leading-[1.08em] tracking-[-0.04em] m-0 max-w-[760px]"
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
          >
            Got questions?{' '}
            <span className="text-white/40">We&apos;ve got answers.</span>
          </h1>
          <p className="font-bricolage font-medium text-lg md:text-xl leading-[1.7em] tracking-[-0.02em] text-white/55 max-w-[500px] m-0">
            Everything you need to know about creating your free logo.
          </p>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col lg:flex-row gap-0 lg:gap-16 items-start">
            {cols.map((col, ci) => (
              <div key={ci} className="flex-1 min-w-0 w-full">
                {col.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Still have questions ── */}
      <ScrollReveal>
        <section
          className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="font-bricolage font-medium text-[24px] md:text-[32px] leading-[1.2em] tracking-[-0.03em] m-0">
                Still have questions?
              </h2>
              <p className="font-bricolage text-base text-white/50 m-0">
                We&apos;re happy to help — reach out any time.
              </p>
            </div>
            <a
              href="mailto:hello@logo.ai"
              className="inline-flex items-center gap-2 font-bricolage font-medium text-base text-white no-underline rounded-xl px-6 py-3.5 transition-all duration-200 hover:bg-white hover:text-black flex-shrink-0"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Contact us
            </a>
          </div>
        </section>
      </ScrollReveal>
    </PageWrapper>
  )
}
