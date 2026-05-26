'use client'

// MFaq — prelaunch FAQ accordion. Items mirror design-l: 11 questions
// focused on the prelaunch / "free for first 2M users" framing rather
// than the launch site's 16-question paid-product FAQ.

import { useState } from 'react'

type Item = { question: string; answer: string }

const ITEMS: Item[] = [
  {
    question: 'Is the logo actually free?',
    answer:
      "Yes — completely free for the first 2,000,000 users. No credit card, no trial, no catch. Sign up now to claim your spot, then download your logo free on launch day.",
  },
  {
    question: 'Why are you giving logos away for free?',
    answer:
      "We're launching soon and we want the world to see what Logo.AI can do. The best way to do that is to let 2,000,000 founders, creators, and small business owners experience it themselves — free.",
  },
  {
    question: 'What if the free spots run out before I sign up?',
    answer:
      "Your spot is reserved the moment you sign up. If you're in before we hit 2,000,000, your free logo is guaranteed — no matter how many people sign up after you.",
  },
  {
    question: 'When exactly can I get my logo?',
    answer:
      "We're launching soon. The moment we go live, you'll be able to log in and generate your free logo. We'll send you a reminder email on launch day.",
  },
  {
    question: 'Do I need design skills?',
    answer:
      'No. Just enter your business name and a few words about what it does — our AI handles the style, colors, fonts, and layout for you. No design skills, no Photoshop, no creative brief needed.',
  },
  {
    question: 'How many logos will I see?',
    answer:
      "Each time you generate, you'll see 10 logos to choose from. Don't love them? Generate again — free. For the first 2,000,000 users, downloading is free too. No payment, ever.",
  },
  {
    question: "What's included in the free logo?",
    answer:
      'Everything. Your logo in every format (PNG, SVG, PDF, EPS) with a transparent background, full commercial license, Brand Guidelines PDF, and yours forever — re-download as many times as you want.',
  },
  {
    question: 'Will my logo be unique to me?',
    answer:
      "Yes. Our AI creates each logo from scratch based on your brand details — no two are alike. Once you download, it's yours alone.",
  },
  {
    question: "What if I don't love my logo?",
    answer:
      "Generate again — free. You can generate as many times as you want until you find one you love. Don't love any of them? Walk away — your spot is still free.",
  },
  {
    question: 'What happens after the 2,000,000 free logos are gone?',
    answer:
      "After the launch offer ends, Logo.AI will be $49 — one-time, no subscription. So if you're reading this, now is the time to claim yours free.",
  },
  {
    question: 'What happens to my email address?',
    answer:
      "We'll send you a launch day reminder and that's it. No spam, no sales emails, no sharing your data with anyone. Ever.",
  },
  {
    question: 'Can I trademark my free logo?',
    answer:
      "Yes. Since you fully own it and have a commercial license, you can register your logo as a trademark in your country. Whether it can be trademarked depends on your local laws and how unique the design is — so it's worth checking with a trademark lawyer.",
  },
]

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', flexShrink: 0 }}
    >
      <path d="M4 6L8 10L12 6" style={{ stroke: 'var(--m-ink)' }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="flex flex-col items-stretch py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px]"
      style={{ background: 'var(--n-faq-section-bg, var(--m-surface))' }}
    >
      <div className="flex flex-col gap-12 items-start max-w-[900px] px-2 sm:px-4 w-full mx-auto">
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>FAQ</p>
          <h2 className="m-h2" style={{ color: 'var(--m-ink)' }}>Your questions, answered</h2>
          <p className="m-sub">Everything you need to know before you sign up.</p>
        </div>

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
                  aria-expanded={open ? 'true' : 'false'}
                  aria-controls={`m-faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <span className="m-display" style={{ fontWeight: 600, fontSize: 17, lineHeight: '25px', color: 'var(--m-ink)' }}>
                    {item.question}
                  </span>
                  <Chevron open={open} />
                </button>
                {open && (
                  <div id={`m-faq-${i}`} className="pb-3 pt-1 pr-8">
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
