'use client'

// FAQ — accordion list using HEADSHOT's design pattern + LOGO.AI's actual
// FAQ items from the original docx (deduped to the 8 most asked).

import { useState } from 'react'

type Item = { question: string; answer: string }

const ITEMS: Item[] = [
  {
    question: 'Is it really free?',
    answer: 'Yes — free to create, free to download. No hidden fees, no credit card, no catch. We\'re giving away 2,000,000 free logos at launch on a first-come, first-served basis.',
  },
  {
    question: 'Why are you offering this for free?',
    answer: "Because the best marketing is a product people can't stop showing off. Generating and previewing your logo is completely free — you only pay $49 once if you find one you love and want to keep.",
  },
  {
    question: 'Will my logo be unique?',
    answer: 'Every logo is designed from scratch for your brand. No templates. No reused assets. Each logo is built for your brand specifically, not pulled from a library.',
  },
  {
    question: 'How is this different from other AI logo makers?',
    answer: 'Most AI logo makers stitch together templates and stock elements. LOGO.AI designs from scratch using real design principles — color theory, typography pairing, negative space, grid systems — so what you get is original, intentional, and yours alone.',
  },
  {
    question: 'Do I own my logo?',
    answer: "Yes — once you download it, it's yours. Full commercial and personal rights, no strings attached, no royalties, no attribution required.",
  },
  {
    question: 'Is my logo trademark-safe?',
    answer: "Every logo is designed to be original and visually distinct. We can't guarantee trademark clearance — if you plan to register it, run a quick legal check first.",
  },
  {
    question: 'What file formats will I get?',
    answer: 'High-resolution PNG with a transparent background at launch. SVG, JPG, and PDF coming soon after.',
  },
  {
    question: 'When will I get my logo?',
    answer: 'Claim your spot now. We\'ll email you the moment we launch (June 2026). Sixty seconds later, you\'ll have your logo.',
  },
]

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', flexShrink: 0 }}
    >
      <path d="M4 6L8 10L12 6" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ContactArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="flex flex-col items-stretch py-20 md:pb-[128px] md:pt-0 px-5 sm:px-10 md:px-16 lg:px-[96px]"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 items-start max-w-[1728px] px-2 sm:px-4 w-full mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-start w-full">
          <span
            className="m-sans"
            style={{
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '3.2px',
              textTransform: 'uppercase',
              color: 'var(--m-text-soft)',
            }}
          >
            FAQ
          </span>
          <h2 className="m-h2" style={{ color: 'var(--m-ink)' }}>
            Your questions, answered.
          </h2>
          <p className="m-sub" style={{ fontSize: 20, lineHeight: '28px' }}>
            Pricing, ownership, trademarks, the works.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 md:gap-6 items-start w-full">
          {ITEMS.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={item.question}
                className="w-full"
                style={{
                  background: 'rgba(249,250,251,0.5)',
                  border: '1px solid var(--m-border-soft)',
                  borderRadius: '14px',
                  padding: '9px 25px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`m-faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-2.5 text-left"
                  style={{ background: 'transparent', border: 'none', borderRadius: 'var(--m-radius-md)', cursor: 'pointer' }}
                >
                  <span
                    className="m-display"
                    style={{ fontWeight: 600, fontSize: 18, lineHeight: '26px', color: 'var(--m-ink)' }}
                  >
                    {item.question}
                  </span>
                  <Chevron open={open} />
                </button>
                {open && (
                  <div id={`m-faq-${i}`} className="pb-3 pt-1 pr-8">
                    <p className="m-sans" style={{ fontSize: 16, lineHeight: '24px', color: 'var(--m-text-muted)' }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full pt-8 border-t"
          style={{ borderColor: 'var(--m-border-soft)' }}
        >
          <div className="flex flex-col gap-1 items-start">
            <h3 className="m-display" style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', color: 'var(--m-ink)' }}>
              Still have questions?
            </h3>
            <p className="m-sans" style={{ fontSize: 16, lineHeight: '24px', color: 'var(--m-text-muted)' }}>
              Our team is here to help — reach us at hello@logo.ai.
            </p>
          </div>
          <a
            href="mailto:hello@logo.ai"
            className="m-sans inline-flex items-center justify-center gap-2 px-3 py-2 shrink-0"
            style={{
              background: 'var(--m-ink-2)',
              color: 'var(--m-surface-alt)',
              borderRadius: 'var(--m-radius-pill)',
              fontSize: 14,
              lineHeight: '20px',
              boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
            }}
          >
            <span>Contact us</span>
            <ContactArrow />
          </a>
        </div>
      </div>
    </section>
  )
}
