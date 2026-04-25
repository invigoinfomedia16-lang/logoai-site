'use client'

// FAQ — categorized Q&A with expandable details.
// Copy verbatim from CONTENT/NEW/FAQ.docx.

import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import LSection from '../_components/LSection'
import { getLogosClaimed } from '@/data'

type QA = { q: string; a: string }
type Category = { title: string; qas: QA[] }

function getFAQ(): Category[] {
  const claimed = getLogosClaimed().toLocaleString('en-US')
  return [
  {
    title: 'The basics',
    qas: [
      { q: 'Is it really free?', a: 'Yes — free to create, free to download. No hidden fees, no credit card, no catch.' },
      { q: 'Why are you offering this for free?', a: "Because the best marketing is a product people can't stop showing off. Try it, love it, tell a friend — that's the plan. We're also betting that most founders will upgrade to the paid brand kit once they see what it does for their launch." },
      { q: 'Will my logo be unique?', a: 'Every logo is designed from scratch for your brand. No templates. No reused assets. Every logo built for your brand, not pulled from a library.' },
      { q: 'How is this different from other AI logo makers?', a: 'Most AI logo makers stitch together templates and stock elements. LOGO.AI designs from scratch using real design principles — so what you get is original, intentional, and yours alone.' },
      { q: 'When does LOGO.AI launch?', a: 'June 2026. Claim your free logo now — before all 2,000,000 free spots are gone.' },
      { q: 'How many free logos are left?', a: `We're giving away 2,000,000 free logos at launch. Over ${claimed} have already been claimed.` },
    ],
  },
  {
    title: 'About the logo',
    qas: [
      { q: 'Will I see multiple logo options?', a: "Yes — you'll get several directions to choose from. Pick the one that fits your brand best." },
      { q: 'Can I edit or customize the logo?', a: "Not at launch — what you generate is what you download. We wanted to get the AI's design right before adding edit tools. Customization features are on the roadmap." },
    ],
  },
  {
    title: 'Using the logo',
    qas: [
      { q: 'Do I own my logo?', a: "Yes — once you download it, it's yours. Full commercial and personal rights, no strings attached." },
      { q: 'Can I use my logo for my business?', a: 'Absolutely — personal, commercial, digital, print, everywhere. Once you download it, there are no restrictions, no royalties, no attribution required.' },
      { q: 'Is my logo trademark-safe?', a: "Every logo is designed to be original and distinct. We can't guarantee trademark clearance though — if you plan to register it, run a quick legal check first." },
      { q: 'What file formats will I get?', a: 'High-resolution PNG with a transparent background at launch. SVG and PDF coming soon.' },
    ],
  },
  {
    title: 'Pricing & brand kit',
    qas: [
      { q: 'How much does the Brand Kit cost?', a: 'Pricing will be announced at launch. The logo itself stays free forever — the brand kit is an optional paid upgrade for founders who want the full package: app icons, social assets, business cards, letterhead, mockups, and more.' },
    ],
  },
  {
    title: 'The process',
    qas: [
      { q: 'Do I need design experience?', a: "No. You describe your brand, and the AI makes every design decision for you — style, colors, typography, layout. In under 60 seconds, you'll have finished logo concepts to choose from." },
      { q: 'What happens after I claim my logo?', a: "Nothing changes — we just save your spot. We'll email you once when we launch, and that's it. No spam, no charges, no follow-up marketing. When you're ready, you create your logo." },
      { q: 'When will I get my logo?', a: "Claim your spot now. We'll email you the moment we launch. Sixty seconds later, you'll have your logo." },
      { q: 'Is my business info safe?', a: "Yes. We don't sell your data or share it with anyone. It's used only to generate your logo." },
      { q: 'Will you actually launch in June?', a: "On track for June 2026. The product is built and tested. We'll update you if anything changes." },
    ],
  },
  ]
}

function FAQItem({ qa }: { qa: QA }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 12,
        border: '1px solid rgba(32,18,58,0.08)',
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 text-left cursor-pointer transition-colors duration-150"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 'clamp(14px,3vw,20px) clamp(16px,4vw,24px)',
          color: '#15141A',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(117,67,227,0.04)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        <span className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>{qa.q}</span>
        <span
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: '#7543E3',
            marginTop: 4,
          }}
          aria-hidden="true"
        >
          <Plus weight="bold" size={20} />
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 clamp(16px,4vw,24px) clamp(16px,3vw,20px) clamp(16px,4vw,24px)' }}>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{qa.a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>FAQ</h1>
          <p className="dk-body-lg" style={{ color: '#7543E3', fontWeight: 500 }}>
            Short answers to common questions.
          </p>
        </div>
      </LSection>

      {/* Categories — single h2 per category, no eyebrow duplication */}
      {getFAQ().map((cat, i) => (
        <LSection key={cat.title} tone={i % 2 === 0 ? 'alt' : 'light'}>
          <div className="max-w-[820px] mx-auto">
            <h2 className="dk-h2 text-center mb-10" style={{ color: '#15141A' }}>{cat.title}</h2>
            <div className="flex flex-col gap-3">
              {cat.qas.map((qa, j) => <FAQItem key={j} qa={qa} />)}
            </div>
          </div>
        </LSection>
      ))}
    </main>
  )
}
