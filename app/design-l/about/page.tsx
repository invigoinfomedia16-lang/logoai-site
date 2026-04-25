'use client'

// About Us — canonical-pattern sub-page.
// Follows L homepage design system strictly:
//   - LSection wrapper for every section
//   - LSectionHeader for centered eyebrow + h2 + subhead blocks
//   - .dk-* classes inherited from app/design-l/layout.tsx
//   - Firefox palette only
// Copy is verbatim from CONTENT/NEW/ABOUT US.docx — no deviation.

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'
import LBottomCTA from '../_components/LBottomCTA'
import { getLogosClaimed } from '@/data'

const TESTIMONIALS = [
  { quote: "This can't be real. I've paid agencies $20K for worse.", name: 'Jake Thompson', role: 'Founder, Northstack (B2B SaaS)' },
  { quote: "I've used every logo tool out there. This is the first one that actually looks designed, not assembled.", name: 'Emily Carter', role: 'Founder, Rowan & Rye (DTC)' },
  { quote: "Sixty seconds. One of them was better than the six my agency sent after three weeks.", name: 'Daniel Walsh', role: 'Founder, Clearline (Fintech)' },
  { quote: "I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.", name: 'Sarah Mitchell', role: 'Founder, Greenleaf Co. (E-commerce)' },
  { quote: "I showed three options to my team. They couldn't tell which one was AI. Neither could I.", name: 'Michael Reyes', role: 'Co-Founder, Beacon Labs (AI tools)' },
  { quote: "Finally. A logo tool that doesn't feel like a logo tool.", name: 'Lauren Brooks', role: 'Founder, Habit House (Consumer wellness)' },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero — Our Story pattern: h1 is page name, purple headline below */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>About Us</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            Great design. For everyone.
          </p>
          <p className="dk-body-lg max-w-[680px] mb-4" style={{ color: 'rgba(21,20,26,0.7)' }}>
            We believe every founder, creator, and side project deserves a logo that looks like it came from a top-tier studio.
          </p>
          <p className="dk-body-lg mb-6" style={{ color: '#15141A', fontWeight: 500 }}>
            So we built one that doesn&apos;t cost a thing.
          </p>
          <p className="dk-caption" style={{ color: 'rgba(21,20,26,0.6)' }}>
            &lt;60s generation · 100% original · 2M free logos at launch · $0 no credit card
          </p>
        </div>
      </LSection>

      {/* Why we built it */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="Why we built it" title="Two bad options. So we built a third." />
        <div className="max-w-[720px] mx-auto text-center">
          <p className="dk-body-lg mb-5" style={{ color: 'rgba(21,20,26,0.7)' }}>
            For thirty years, founders have had two bad options: spend $20,000 and six weeks on a designer, or use a template tool and get a logo that looks like ten thousand others.
          </p>
          <p className="dk-body-lg mb-8" style={{ color: '#15141A', fontWeight: 500 }}>
            We built a third option — AI that designs original logos from scratch, in seconds, for free.
          </p>
          <Link
            href="/design-l/our-story"
            className="l-link inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', fontWeight: 600 }}
          >
            Read the full story <ArrowRight weight="bold" size={14} />
          </Link>
        </div>
      </LSection>

      {/* Our mission */}
      <LSection>
        <LSectionHeader eyebrow="Our mission" title="Make professional branding free." />
        <div className="max-w-[720px] mx-auto text-center">
          <p className="dk-body-lg mb-5" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Every idea deserves a logo worthy of it. Not six weeks later. Not twenty thousand dollars later. Now.
          </p>
          <p className="dk-body-lg" style={{ color: 'rgba(21,20,26,0.7)' }}>
            We built LOGO.AI to make that possible — no fees, no waiting, no design degree required. A beautiful, original logo, available to anyone with an idea and an internet connection.
          </p>
        </div>
      </LSection>

      {/* What early users are saying */}
      <LSection tone="alt">
        <LSectionHeader eyebrow="What early users are saying" title="The feedback so far." />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 28,
                border: '1px solid rgba(32,18,58,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 20,
              }}
            >
              <p className="dk-body-lg m-0" style={{ color: '#15141A' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="dk-body m-0" style={{ color: '#15141A', fontWeight: 600 }}>
                  {t.name}
                </p>
                <p className="dk-caption m-0 mt-1" style={{ color: 'rgba(21,20,26,0.6)' }}>
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </LSection>

      {/* Our vision */}
      <LSection>
        <LSectionHeader eyebrow="Our vision" title="A future where design reads your mind." />
        <div className="max-w-[720px] mx-auto text-center flex flex-col gap-5">
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Today, you describe your brand in words. Tomorrow, you won&apos;t have to.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            We&apos;re building toward a world where AI understands a brand the way a founder feels it — through intent, emotion, and instinct. Voice. Image. Memory. Eventually, thought itself.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Imagine launching a company the moment you imagine it. Picture it — and your logo, your site, your product, your entire brand identity exists. Fully designed. Pixel-perfect. Instantly.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            No prompts. No briefs. No wait.
          </p>
          <p className="dk-body-lg m-0" style={{ color: '#15141A', fontWeight: 500 }}>
            A world where the only thing between an idea and a brand is a thought.
          </p>
        </div>
      </LSection>

      <LBottomCTA
        title="Ready to see what your logo looks like?"
        body={`Over ${getLogosClaimed().toLocaleString('en-US')} logos already claimed. Two million free logos — first come, first served.`}
      />
    </main>
  )
}
