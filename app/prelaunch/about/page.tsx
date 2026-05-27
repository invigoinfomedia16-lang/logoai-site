// About — v11 with content-driven design moments.
//
// Locked decisions:
//   * Typography aligned to landing-page utility classes (.m-h1, .m-h2,
//     .m-sub, .m-body) for prose; display font with custom sizing only
//     on intentional visual moments.
//   * No eyebrows. No dividers. No background bands. Sections are
//     separated by generous vertical padding only.
//   * Structure follows the v11 doc literally.
//
// Visual moments injected (from design-l/our-story + design-l/about):
//   1. Hero — two-register stack: italic display-font claim + muted
//      sub-line.
//   2. The problem — pull-quote with a 4px brand-color left rule on
//      the "day one" line.
//   3. Why we are different — mid-dot strip surfacing the four design
//      principles named in the paragraph above it.
//   4. By the numbers — value in display font + brand color + bold;
//      label in sans + ink.
//   5. Also worth reading — arrow links promoted to display-font CTAs
//      with a brand-color arrow + hover nudge.

import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, FlaskConical, Layers, Globe, type LucideIcon } from 'lucide-react'
import MFooter from '../_components/MFooter'
import MFinalCTA from '../_components/MFinalCTA'

export const metadata: Metadata = {
  title: 'About — LOGO.AI',
  description:
    'Professional logos in seconds. No designer. No waiting. No guesswork. We built LOGO.AI to make great branding free, fast, and original.',
}

const STATS: { Icon: LucideIcon; value: string; label: string }[] = [
  { Icon: Clock,        value: '60 seconds', label: 'from brand description to finished logo' },
  { Icon: FlaskConical, value: '2.5 years',  label: 'of R&D before we were happy enough to launch' },
  { Icon: Layers,       value: '100,000+',   label: 'logos analyzed to train our AI' },
  { Icon: Globe,        value: '16 people',  label: 'across San Francisco, Singapore, Tallinn, and Dubai' },
]

const PRINCIPLES = ['Color theory', 'Typography', 'Negative space', 'Visual hierarchy']

const COLUMN_MAX = 760

// .m-h2 is global-CSS'd to white-space: nowrap on desktop; override so
// longer headings ("The problem we exist to solve") can wrap inside the
// narrow editorial column.
const h2Override: React.CSSProperties = { whiteSpace: 'normal' }

const sectionPad: React.CSSProperties = {
  paddingTop: 'clamp(64px, 9vw, 112px)',
  paddingBottom: 'clamp(64px, 9vw, 112px)',
}

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--m-surface)', color: 'var(--m-ink)' }}>
      {/* Hero — two-register stack */}
      <section
        className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]"
        style={{
          paddingTop: 'clamp(96px, 13vw, 160px)',
          paddingBottom: 'clamp(48px, 7vw, 88px)',
        }}
      >
        <div style={{ maxWidth: COLUMN_MAX, margin: '0 auto' }}>
          <h1 className="m-h1">About LOGO.AI</h1>
          <p
            style={{
              marginTop: 24,
              fontFamily: 'var(--m-font-display), serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.8vw, 30px)',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              color: 'var(--m-ink-deep)',
            }}
          >
            Professional logos in seconds.
          </p>
          <p className="m-sub" style={{ marginTop: 10, color: 'var(--m-text-muted)' }}>
            No designer. No waiting. No guesswork.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]" style={sectionPad}>
        <div style={{ maxWidth: COLUMN_MAX, margin: '0 auto' }}>
          <h2 className="m-h2" style={h2Override}>What we do</h2>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p className="m-sub" style={{ color: 'var(--m-ink-deep)' }}>
              LOGO.AI generates professional, original logos in under 60 seconds.
            </p>
            <p className="m-body">
              You describe your brand. Our AI designs your logo. You download it
              and get on with building your business.
            </p>
            <p className="m-body">
              No design skills needed. No creative brief. No back-and-forth. Just
              a logo that looks like a great designer made it — because we taught
              our AI to design like one.
            </p>
          </div>
        </div>
      </section>

      {/* The problem we exist to solve */}
      <section className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]" style={sectionPad}>
        <div style={{ maxWidth: COLUMN_MAX, margin: '0 auto' }}>
          <h2 className="m-h2" style={h2Override}>The problem we exist to solve</h2>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p className="m-sub" style={{ color: 'var(--m-ink-deep)' }}>
              Getting a logo has always been harder than it should be.
            </p>
            <p className="m-body">
              Too expensive if you do it properly. Too generic if you take a
              shortcut. And either way, too slow.
            </p>
            <blockquote
              style={{
                margin: 0,
                marginTop: 8,
                paddingLeft: 'clamp(20px, 3vw, 32px)',
                borderLeft: '4px solid var(--m-brand)',
                fontFamily: 'var(--m-font-display), serif',
                fontSize: 'clamp(22px, 3.2vw, 32px)',
                lineHeight: 1.3,
                fontWeight: 500,
                fontStyle: 'italic',
                letterSpacing: '-0.012em',
                color: 'var(--m-ink-deep)',
              }}
            >
              Every founder deserves a great logo on day one. Not month three.
              Not after five rounds of revisions. Day one.
            </blockquote>
            <p className="m-body">
              We built LOGO.AI because that wasn&rsquo;t possible — until now.
            </p>
          </div>
        </div>
      </section>

      {/* Why we are different */}
      <section className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]" style={sectionPad}>
        <div style={{ maxWidth: COLUMN_MAX, margin: '0 auto' }}>
          <h2 className="m-h2" style={h2Override}>Why we&rsquo;re different</h2>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p className="m-body">
              Most logo tools are template libraries. They take the same 400
              shapes and shuffle them into slightly different configurations. The
              logos look it.
            </p>
            <p className="m-body">
              LOGO.AI doesn&rsquo;t use templates. We trained our AI on real design
              principles — color theory, typography, negative space, visual
              hierarchy. The same fundamentals a design school teaches over four
              years.
            </p>
            <p
              style={{
                marginTop: 4,
                fontFamily: 'var(--m-font-display), serif',
                fontWeight: 600,
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                lineHeight: 1.5,
                letterSpacing: '-0.005em',
                color: 'var(--m-ink-deep)',
              }}
            >
              {PRINCIPLES.map((p, i) => (
                <span key={p}>
                  {p}
                  {i < PRINCIPLES.length - 1 && (
                    <span aria-hidden style={{ color: 'var(--m-brand)', margin: '0 clamp(10px, 1.8vw, 16px)' }}>
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </p>
            <p className="m-body">
              The result: a logo that&rsquo;s original, professional, and actually
              represents your brand. Not a logo that looks like ten thousand
              others.
            </p>
          </div>
        </div>
      </section>

      {/* By the numbers — horizontal cards with functional icons.
          Card chrome matches the home convention: --m-surface-alt bg,
          --m-radius-xl, m-card-hover for the border. Icons label what
          each metric represents (Clock = time, FlaskConical = R&D,
          Layers = training corpus, Globe = distributed team). */}
      <section className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]" style={sectionPad}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <h2 className="m-h2" style={h2Override}>By the numbers</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ marginTop: 40 }}
          >
            {STATS.map(({ Icon, value, label }) => (
              <div
                key={value}
                className="m-card-hover flex flex-col"
                style={{
                  background: 'var(--m-surface-alt)',
                  borderRadius: 'var(--m-radius-xl)',
                  padding: '28px 24px 24px',
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.6}
                  color="var(--m-brand)"
                  aria-hidden
                  style={{ display: 'block' }}
                />
                <div
                  style={{
                    fontFamily: 'var(--m-font-display), serif',
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 3.4vw, 36px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--m-brand)',
                    marginTop: 20,
                    lineHeight: 1.1,
                  }}
                >
                  {value}
                </div>
                <p
                  className="m-body-sm"
                  style={{ color: 'var(--m-text-muted)', marginTop: 8 }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is next */}
      <section className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]" style={sectionPad}>
        <div style={{ maxWidth: COLUMN_MAX, margin: '0 auto' }}>
          <h2 className="m-h2" style={h2Override}>What&rsquo;s next</h2>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p className="m-sub" style={{ color: 'var(--m-ink-deep)' }}>
              The logo is just the start.
            </p>
            <p className="m-body">
              We&rsquo;re building toward a world where everything that comes
              after the logo — the business cards, the social assets, the full
              visual identity — is generated in the same 60 seconds.
            </p>
            <p className="m-sub" style={{ color: 'var(--m-ink-deep)', fontStyle: 'italic', fontWeight: 500 }}>
              A brand shouldn&rsquo;t be a project. It should be a starting point.
            </p>
          </div>
        </div>
      </section>

      {/* Also worth reading */}
      <section className="w-full px-5 sm:px-10 md:px-16 lg:px-[96px]" style={sectionPad}>
        <div style={{ maxWidth: COLUMN_MAX, margin: '0 auto' }}>
          <h2 className="m-h2" style={h2Override}>Also worth reading</h2>
          <ul
            style={{
              marginTop: 32,
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <li>
              <Link
                href="/prelaunch/story"
                className="about-link"
                style={{
                  fontFamily: 'var(--m-font-display), serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.012em',
                  color: 'var(--m-ink-deep)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 16,
                }}
              >
                <span style={{ color: 'var(--m-brand)' }} aria-hidden>&rarr;</span>
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/prelaunch/team"
                className="about-link"
                style={{
                  fontFamily: 'var(--m-font-display), serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.4vw, 26px)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.012em',
                  color: 'var(--m-ink-deep)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 16,
                }}
              >
                <span style={{ color: 'var(--m-brand)' }} aria-hidden>&rarr;</span>
                Meet the Team
              </Link>
            </li>
          </ul>
          <p className="m-body" style={{ marginTop: 36, color: 'var(--m-ink-deep)' }}>
            LOGO.AI is giving away 2,000,000 free logos at launch — first come,
            first served.
          </p>
        </div>
        {/* dangerouslySetInnerHTML on the <style> tag so the `>` child
            selectors aren't re-escaped between server/client renders
            (which caused a hydration mismatch). */}
        <style dangerouslySetInnerHTML={{ __html: `
          .about-link { transition: color 0.18s ease; }
          .about-link:hover { color: var(--m-brand); }
          .about-link > span[aria-hidden] {
            display: inline-block;
            transition: transform 0.18s ease;
          }
          .about-link:hover > span[aria-hidden] { transform: translateX(4px); }
        ` }} />
      </section>

      {/* v11 doc explicitly ends with the email-capture CTA. eyebrow=null
          hides the "Get Started" eyebrow (which is on the home page but
          not in the v11 About content). */}
      <MFinalCTA eyebrow={null} />
      <MFooter />
    </main>
  )
}
