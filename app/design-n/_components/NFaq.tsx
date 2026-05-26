'use client'

// FAQ — 14-item accordion. Copy verbatim from the LOGOAI landing-page doc,
// section 10.

import { useState } from 'react'

type Item = { question: string; answer: string }

const ITEMS: Item[] = [
  {
    question: 'Will the logos actually look professional?',
    answer:
      'Yes. Our AI designs like a professional designer — getting the font, the colors, and the balance right. Most customers are surprised by the quality. Just tell us about your brand and see for yourself.',
  },
  {
    question: 'Who is Logo.AI for?',
    answer:
      "Founders, agencies, and small business owners — anyone who needs a professional logo. If you've ever needed a logo for a website, business card, or product, this is for you.",
  },
  {
    question: 'Do I need design skills to use this?',
    answer:
      'No. Just enter your business name and a few words about what it does — our AI handles the style, colors, fonts, and layout for you. No design skills, no Photoshop, no creative brief needed.',
  },
  {
    question: 'How many logos will I see?',
    answer:
      "Each time you generate, you'll see 10 logos to preview. Don't love them? Just generate again — you can do this as many times as you want, free. Pay only when you find one you love.",
  },
  {
    question: "What if I don't love any of the logos?",
    answer:
      "You don't pay. We let you preview your logos for free. If they're not what you wanted, just walk away.",
  },
  {
    question: "What's included for $49?",
    answer:
      'Your logo in every format you need (PNG, SVG, PDF, EPS) with a transparent background, full commercial license, and yours forever — re-download as many times as you want. You also get a Brand Guidelines PDF showing how to use your logo, its exact colors, and matching fonts. Plus a 100% Money-Back Guarantee.',
  },
  {
    question: 'Do I own the logo?',
    answer:
      'Yes. Once you download, the logo is yours. You can use it for any commercial purpose, forever.',
  },
  {
    question: 'Where can I use my logo?',
    answer:
      'Anywhere. Your website, products, packaging, social media, business cards, signage, ads, merch, email signatures — anywhere your brand shows up.',
  },
  {
    question: 'Can I trademark my logo?',
    answer:
      "Yes. Since you fully own it and have a commercial license, you can register your logo as a trademark in your country. Whether it can be trademarked depends on your local laws and how unique the design is — so it's a good idea to check with a trademark lawyer.",
  },
  {
    question: 'Will the logo work at any size — small or big?',
    answer:
      'Yes. Every purchase includes SVG files that work at any size without going blurry — perfect for everything from a small icon on your website to a giant billboard. You also get PDF and EPS files for professional printing.',
  },
  {
    question: 'Will my logo work on dark and light backgrounds?',
    answer:
      'Yes. Every download has a transparent background, so your logo looks clean on any background — light, dark, or photo.',
  },
  {
    question: 'Is this a subscription?',
    answer:
      "No. It's a one-time payment of $49. Pay once, own your logo forever. No recurring fees, no surprises.",
  },
  {
    question: 'How long does it take?',
    answer:
      'Under 60 seconds from start to preview. No back-and-forth with a designer, no waiting weeks for changes — just tell us about your brand and your logos are ready.',
  },
  {
    question: 'What happens to my brand information?',
    answer:
      "Your details stay private. We never sell or share them, and we never use them to train our AI. They're only used to make your logos — and the final designs belong to you.",
  },
  {
    question: "What if I'm not happy with my downloaded logo?",
    answer:
      "You're protected by our 100% Money-Back Guarantee. If you're not happy, just reach out — we'll either redo your logo or refund you in full. Your choice.",
  },
  {
    question: 'Will my logo be unique to me?',
    answer:
      "Yes. Our AI creates each logo from scratch based on your brand details — no two are alike. Once you pay for and download your logo, it's yours alone.",
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
      <path d="M4 6L8 10L12 6" style={{ stroke: 'var(--m-ink)' }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="flex flex-col items-stretch py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px]"
      style={{ background: 'var(--n-faq-section-bg, var(--m-surface))' }}
    >
      <div className="flex flex-col gap-12 items-start max-w-[900px] px-2 sm:px-4 w-full mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>FAQ</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink)' }}>
            Your questions, answered
          </h2>
          <p className="m-sub">
            Everything you need to know before you start.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 md:gap-4 items-start w-full">
          {ITEMS.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={item.question}
                className="w-full"
                style={{
                  background: 'var(--n-faq-row-bg, rgba(249,250,251,0.5))',
                  border: 'var(--n-faq-row-border, 1px solid var(--m-border-soft))',
                  borderRadius: '14px',
                  padding: '9px 25px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`n-faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span
                    className="m-display"
                    style={{ fontWeight: 600, fontSize: 17, lineHeight: '25px', color: 'var(--m-ink)' }}
                  >
                    {item.question}
                  </span>
                  <Chevron open={open} />
                </button>
                {open && (
                  <div id={`n-faq-${i}`} className="pb-3 pt-1 pr-8">
                    <p className="m-sans" style={{ fontSize: 15, lineHeight: '24px', color: 'var(--m-text-muted)' }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
