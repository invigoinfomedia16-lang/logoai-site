'use client'

// Product — what LOGO.AI does + how it works + core features + brand kit.
// Copy verbatim from CONTENT/NEW/PRODUCT.docx.

import Link from 'next/link'
import { ArrowRight, Lightning, CurrencyDollarSimple, Brain, GlobeHemisphereWest } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import LBottomCTA from '../_components/LBottomCTA'
import { getLogosClaimed } from '@/data'

const STEPS = [
  {
    num: '01',
    title: 'Describe your brand',
    body: "Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.",
  },
  {
    num: '02',
    title: 'Watch AI design it',
    body: 'In under 60 seconds, our AI generates original logo concepts — choosing the right style, colors, and typography for you.',
  },
  {
    num: '03',
    title: 'Download and launch',
    body: 'Pick your favorite, then download print-ready and web-ready files instantly.',
  },
]

const FEATURES = [
  { Icon: Lightning,             title: 'Ready in seconds',              body: 'No waiting days or weeks. No revisions. Just a finished logo, ready to use.' },
  { Icon: CurrencyDollarSimple,  title: 'Completely free',                body: 'No hidden fees. No watermarks. No credit card. Your logo is yours — forever.' },
  { Icon: Brain,                 title: 'AI that understands your brand', body: "You don't need design skills. The AI reads your industry, tone, and style — and handles every design choice for you." },
  { Icon: GlobeHemisphereWest,   title: 'Works everywhere',               body: 'Built for web, print, and apps — so your brand stays consistent at every size, in every context.' },
]

const BRAND_KIT_ITEMS = [
  { title: 'App Icons',          body: 'App Store and Google Play ready, iOS + Android.' },
  { title: 'Social Kit',         body: 'Profiles, covers, stories. Sized perfectly for every platform.' },
  { title: 'Brand Colors',       body: 'HEX, RGB, CMYK. Web and print.' },
  { title: 'Font Guide',         body: 'Matched fonts for headlines, body, and accents.' },
  { title: 'Brand Guide',        body: "Usage rules, spacing, do's and don'ts." },
  { title: 'Business Card',      body: 'Print-ready front and back.' },
  { title: 'Web Assets',         body: 'Favicons, OG images, optimized graphics.' },
  { title: 'Email Signature',    body: 'Branded with your logo, colors, and links.' },
  { title: 'Letterhead',         body: 'Proposals, contracts, letters.' },
  { title: 'Invoice Design',     body: 'A layout that makes you look established from day one.' },
  { title: 'Mockups',            body: 'Your logo on shirts, cards, signage, and more.' },
]

export default function ProductPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Product</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            Everything LOGO.AI can do for your brand
          </p>
          <p className="dk-body-lg max-w-[680px]" style={{ color: 'rgba(21,20,26,0.7)' }}>
            An original logo in 60 seconds. A full brand kit designed around it. All powered by AI trained on real design principles.
          </p>
        </div>
      </LSection>

      {/* What LOGO.AI does */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="What LOGO.AI does" title="Designed, not assembled." />
        <div className="max-w-[720px] mx-auto flex flex-col gap-5">
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            LOGO.AI generates professional, original logos from a single brand description — in under a minute. No templates. No clip art. No design experience needed.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Behind every logo is AI trained like a design student — color theory, typography pairing, negative space, grid systems, visual hierarchy. Not a library of pre-made assets to recombine.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            The result: a logo that looks designed, not assembled. At every size, in every context.
          </p>
        </div>
      </LSection>

      {/* How it works — 3 steps */}
      <LSection>
        <LSectionHeader eyebrow="How it works" title="Three steps. Sixty seconds." />
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row sm:flex-wrap justify-center gap-5 sm:gap-6 mb-10">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="w-full sm:flex-1"
              style={{
                background: '#F5F0FF',
                borderRadius: 16,
                padding: 'clamp(20px,4vw,32px)',
                border: '1px solid rgba(32,18,58,0.08)',
                maxWidth: 320,
                minWidth: 0,
              }}
            >
              <p
                className="dk-eyebrow mb-3"
                style={{ color: '#7543E3', fontFamily: "'Mozilla Headline', sans-serif", fontSize: 32, lineHeight: 1, fontWeight: 600, letterSpacing: 0, textTransform: 'none' }}
              >
                {s.num}
              </p>
              <h3 className="dk-h3 mb-3" style={{ color: '#15141A' }}>{s.title}</h3>
              <p className="dk-body m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/design-l/how-it-works"
            className="l-link inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', fontWeight: 600 }}
          >
            See full walkthrough <ArrowRight weight="bold" size={14} />
          </Link>
        </div>
      </LSection>

      {/* Core features — 4 feature cards */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="Core features" title="What you get, out of the box." />
        <div className="max-w-[760px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 28,
                border: '1px solid rgba(32,18,58,0.08)',
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: '#F5F0FF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7543E3',
                  marginBottom: 20,
                }}
              >
                <f.Icon weight="bold" size={22} />
              </span>
              <h3 className="dk-h3 mb-3" style={{ color: '#15141A' }}>{f.title}</h3>
              <p className="dk-body m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{f.body}</p>
            </div>
          ))}
        </div>
      </LSection>

      {/* How our AI is different */}
      <LSection>
        <LSectionHeader eyebrow="How our AI is different" title="Trained to design, not to assemble" />
        <div className="max-w-[720px] mx-auto flex flex-col gap-5">
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Our AI was trained on the same principles real designers use — color theory, typography pairing, negative space, grid systems, visual hierarchy.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            The result is a logo that doesn&apos;t just look beautiful. It works beautifully.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Studio-quality typography. Pixel-perfect balance. Colors that communicate. And a design that holds up:
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            On a business card. On a website. On a billboard. On a favicon.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            At every size, in every context.
          </p>
        </div>
      </LSection>

      {/* What you get — Free + Brand Kit */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="What you get" title="Your logo is free. The rest of your brand comes with it." />
        <div className="max-w-[720px] mx-auto text-center mb-10">
          <p className="dk-body-lg" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Most founders need more than a logo. So we built everything else too — business cards, social assets, app icons, mockups, the works. All designed to match your logo.
          </p>
        </div>

        <div className="max-w-[820px] mx-auto flex flex-col gap-6">
          {/* Free — compact callout */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 32,
              border: '2px solid #7543E3',
            }}
          >
            <p className="dk-caption mb-3" style={{ color: '#7543E3', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              Free
            </p>
            <h3 className="dk-h3 mb-3" style={{ color: '#15141A' }}>Logo Files</h3>
            <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
              High-res PNG with transparent background. SVG, JPG, and PDF coming soon.
            </p>
          </div>

          {/* Brand Kit — expanded card with 2-col items grid */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 'clamp(28px, 4vw, 40px)',
              border: '1px solid rgba(32,18,58,0.08)',
            }}
          >
            <p className="dk-caption mb-3" style={{ color: 'rgba(21,20,26,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
              Brand Kit — paid upgrade
            </p>
            <h3 className="dk-h3 mb-6" style={{ color: '#15141A' }}>Everything to launch your brand</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-5 list-none p-0 m-0">
              {BRAND_KIT_ITEMS.map((item, i) => (
                <li key={i}>
                  <p className="dk-body m-0 mb-1" style={{ color: '#15141A', fontWeight: 600 }}>
                    {item.title}
                  </p>
                  <p className="dk-caption m-0" style={{ color: 'rgba(21,20,26,0.65)' }}>
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-[720px] mx-auto text-center mt-10">
          <p className="dk-body-lg" style={{ color: '#15141A', fontWeight: 500 }}>
            The logo is free. The rest is a paid upgrade.
          </p>
        </div>
      </LSection>

      <LBottomCTA
        title="Ready to see what your logo looks like?"
        body={`Join ${getLogosClaimed().toLocaleString('en-US')}+ founders who've already claimed their spot. Two million free logos at launch — first come, first served.`}
      />
    </main>
  )
}
