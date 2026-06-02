// Our Story — long-form editorial in the new MLp visual language.
// Content from Logo_AI_OurStory_v16.docx. Sections (in order):
//   1. Hero — eyebrow + italic display headline
//   2. The Problem — narrative + closing pull-quote
//   3. Where We Started — two brothers, three decades
//   4. The Turning Point — late 2023, "stop prompting, start teaching"
//   5. How We Built It — methodology + 3-stat row
//   6. Where We Are Now — closing
//   7. Also worth reading — cross-links
//   8. Final CTA — same live counter + email form as the main page
//
// Layout: single editorial column (max 680px body, headlines wider).
// All chrome — nav, sticky CTA, theme tokens — comes from
// <MLpSubpageShell>, which pulls from MLpNavStyles. Nothing nav-shaped
// belongs in this file.

import type { Metadata } from 'next'
import Link from 'next/link'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpEmailForm from '../_components/MLpEmailForm'
import MLpHeroCounter from '../_components/MLpHeroCounter'

export const metadata: Metadata = {
  title: 'Our Story — LOGO.AI',
  description:
    'Thirty years of building things. One problem that never got fixed. So we fixed it.',
}

export default function OurStoryPage() {
  return (
    <MLpSubpageShell>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <main className="os-root">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="os-hero">
          <span className="os-eyebrow">Our Story</span>
          <h1 className="os-h1">
            Thirty years of building things.<br />
            One problem that never got fixed.<br />
            <span className="os-h1-accent">So we fixed it.</span>
          </h1>
        </section>

        {/* ─── 1. THE PROBLEM ─────────────────────────────────── */}
        <section className="os-section">
          <span className="os-section-num">01 — The Problem</span>
          <h2 className="os-h2">Every founder hits the same wall.</h2>
          <div className="os-body">
            <p>You have a business idea. You&rsquo;re ready to move. And then &mdash; the logo.</p>
            <p>You have two options. Neither is good.</p>
            <p>
              You hire a designer. Three to six weeks. Rounds of revisions. A final result that might
              be great, might be fine, might be neither &mdash; and you won&rsquo;t know until you&rsquo;ve
              spent $5,000 to $20,000 to find out.
            </p>
            <p>
              Or you use a DIY logo maker. Fast and cheap. But the output looks like it. The same 400
              shapes, reshuffled into slightly different configurations. Your logo ends up looking
              like ten thousand others &mdash; because it&rsquo;s made from the same parts.
            </p>
          </div>
          <blockquote className="os-quote">
            For thirty years, those were the only two options.<br />
            Nobody fixed it. <span className="os-quote-accent">So we did.</span>
          </blockquote>
        </section>

        {/* ─── 2. WHERE WE STARTED ──────────────────────────────── */}
        <section className="os-section">
          <span className="os-section-num">02 — Where We Started</span>
          <h2 className="os-h2">Two brothers. Early internet.</h2>
          <div className="os-body">
            <p>
              Flash-based e-greeting cards &mdash; among the first of their kind. Nobody told them it
              would work. It became one of the most visited greeting platforms on the web.
            </p>
            <p>
              They spent the next three decades building companies across media, education,
              productivity, and e-commerce. Multiple exits. Billions of users. They also built AI
              long before AI was a buzzword &mdash; chatbots, game opponents that adapted to how you
              played, recommendation engines, algorithmic trading systems, early computer vision.
            </p>
            <p>
              And through all of it, every company they built or backed ran into the same thing:
              getting a logo was always slower, harder, and more expensive than it needed to be.
            </p>
            <p>
              They kept a mental note. That note turned into a grudge. That grudge turned into
              LOGO.AI.
            </p>
          </div>
        </section>

        {/* ─── 3. THE TURNING POINT ─────────────────────────────── */}
        <section className="os-section">
          <span className="os-section-num">03 — The Turning Point</span>
          <h2 className="os-h2">Late 2023.</h2>
          <div className="os-body">
            <p>AI was writing code, generating photorealistic images, composing music.</p>
            <p>
              The founders asked the obvious question: why can&rsquo;t it design a professional logo?
            </p>
            <p>
              They tried every tool they could find. All of them produced the same thing &mdash;
              warped text, random symbols, no understanding of what a brand actually is. The problem
              wasn&rsquo;t that AI couldn&rsquo;t do it. The problem was that nobody had taught it
              properly. The tools were generating. They weren&rsquo;t designing.
            </p>
            <p>That was the unlock.</p>
          </div>
          <blockquote className="os-quote">
            Stop trying to prompt AI into designing a logo.<br />
            <span className="os-quote-accent">Start teaching it how design actually works.</span>
          </blockquote>
        </section>

        {/* ─── 4. HOW WE BUILT IT ───────────────────────────────── */}
        <section className="os-section">
          <span className="os-section-num">04 — How We Built It</span>
          <h2 className="os-h2">We trained the AI the way a design school trains a student.</h2>
          <div className="os-body">
            <p>
              Color theory. Typography. Negative space. Visual hierarchy. The structural logic
              behind logos that have stood for decades. Not a library of pre-made assets to remix.
              Real design principles.
            </p>
            <p>
              Our benchmark: a professional designer, shown the output blind, can&rsquo;t tell it
              from human work. Not sometimes. Every time.
            </p>
            <p>We went back many times. Then one day, we stopped going back.</p>
          </div>

          <div className="os-stats" role="list">
            <div className="os-stat" role="listitem">
              <span className="os-stat-num">2.5 yrs</span>
              <span className="os-stat-label">of R&amp;D</span>
            </div>
            <div className="os-stat" role="listitem">
              <span className="os-stat-num">100,000+</span>
              <span className="os-stat-label">logos analyzed</span>
            </div>
            <div className="os-stat" role="listitem">
              <span className="os-stat-num">16 people</span>
              <span className="os-stat-label">across 4 countries</span>
            </div>
          </div>

          <div className="os-body">
            <p>
              The domain name &mdash; LOGO.AI &mdash; waited until the product deserved it. We
              didn&rsquo;t buy it to look credible. We bought it after the product proved it had
              earned the name.
            </p>
          </div>
        </section>

        {/* ─── 5. WHERE WE ARE NOW ──────────────────────────────── */}
        <section className="os-section">
          <span className="os-section-num">05 — Where We Are Now</span>
          <h2 className="os-h2">A logo in under 60 seconds. Designed from scratch. Every time.</h2>
          <div className="os-body">
            <p>
              And the logo is just the start. We&rsquo;re building toward a world where your entire
              brand identity &mdash; colors, typography, business cards, social assets &mdash; is
              ready before your coffee gets cold.
            </p>
          </div>
          <p className="os-closer">
            The problem took thirty years to fix.<br />
            <span className="os-closer-accent">The fix takes sixty seconds to use.</span>
          </p>
        </section>

        {/* ─── ALSO WORTH READING ───────────────────────────────── */}
        <section className="os-also">
          <span className="os-eyebrow">Also worth reading</span>
          <ul className="os-also-list">
            <li>
              <Link href="/prelaunch#who-its-for">
                <span className="os-arr">&rarr;</span> Meet the Team
              </Link>
            </li>
            <li>
              <Link href="/prelaunch">
                <span className="os-arr">&rarr;</span> Why LOGO.AI
              </Link>
            </li>
          </ul>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────── */}
        <section className="os-cta">
          <h2 className="os-cta-h2">Get a Professional Logo. Completely Free.</h2>
          <p className="os-cta-lede">
            Hundreds of thousands have already claimed theirs. Get yours before they&rsquo;re gone.
          </p>
          <MLpEmailForm variant="final" />
          <p className="os-cta-fine">
            <strong>No spam. No credit card. Just a free logo.</strong><br />
            We&rsquo;ll email you the moment we go live so you can generate your free logo.
          </p>
          <MLpHeroCounter framing="remaining" tagline="Don't miss yours." />
        </section>
      </main>
    </MLpSubpageShell>
  )
}

const STYLES = `
  .os-root {
    max-width: 760px;
    margin: 0 auto;
    padding: clamp(64px, 9vw, 120px) clamp(20px, 4vw, 48px) clamp(80px, 10vw, 140px);
    color: #f4f4f6;
  }

  /* ── HERO ────────────────────────────────────────────────────── */
  .os-hero {
    text-align: center;
    margin-bottom: clamp(72px, 11vw, 140px);
  }
  .os-eyebrow {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FF5C2E;
    margin-bottom: 28px;
  }
  .os-h1 {
    font-family: 'DM Serif Display', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(34px, 5.4vw, 56px);
    line-height: 1.16;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    margin: 0 auto;
    max-width: 22ch;
  }
  .os-h1-accent { color: #FF5C2E; }

  /* ── SECTIONS ────────────────────────────────────────────────── */
  .os-section {
    margin: clamp(64px, 9vw, 120px) auto;
    max-width: 680px;
  }
  .os-section-num {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(232, 232, 230, 0.45);
    margin-bottom: 20px;
  }
  .os-h2 {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(28px, 4.2vw, 40px);
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #f4f4f6;
    margin: 0 0 28px;
    max-width: 22ch;
  }
  .os-body p {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(16px, 1.6vw, 18px);
    line-height: 1.65;
    color: rgba(232, 232, 230, 0.78);
    margin: 0 0 22px;
  }

  /* ── PULL QUOTES ─────────────────────────────────────────────── */
  .os-quote {
    margin: clamp(36px, 5vw, 56px) 0 0;
    padding: 24px 0 0;
    border-top: 1.5px solid rgba(255, 92, 46, 0.30);
    font-family: 'DM Serif Display', Georgia, serif;
    font-style: italic;
    font-size: clamp(22px, 3vw, 30px);
    line-height: 1.25;
    color: #f4f4f6;
    letter-spacing: -0.01em;
  }
  .os-quote-accent { color: #FF5C2E; }

  /* ── STATS ROW ───────────────────────────────────────────────── */
  .os-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin: clamp(40px, 6vw, 64px) 0;
    padding: 32px 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
  }
  .os-stat {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .os-stat-num {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: clamp(22px, 3vw, 32px);
    color: #FF5C2E;
    line-height: 1.1;
  }
  .os-stat-label {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.55);
    letter-spacing: 0.02em;
  }
  @media (max-width: 640px) {
    .os-stats { grid-template-columns: 1fr; gap: 18px; padding: 24px 0; }
  }

  /* ── CLOSER ──────────────────────────────────────────────────── */
  .os-closer {
    margin: clamp(36px, 5vw, 56px) 0 0;
    font-family: 'DM Serif Display', Georgia, serif;
    font-style: italic;
    font-size: clamp(22px, 3vw, 30px);
    line-height: 1.25;
    color: #f4f4f6;
    letter-spacing: -0.01em;
  }
  .os-closer-accent { color: #FF5C2E; }

  /* ── ALSO WORTH READING ──────────────────────────────────────── */
  .os-also {
    margin: clamp(72px, 11vw, 140px) auto;
    max-width: 680px;
  }
  .os-also-list {
    list-style: none;
    margin: 18px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .os-also-list a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: clamp(22px, 3vw, 28px);
    color: #f4f4f6;
    text-decoration: none;
    transition: color 0.15s ease, transform 0.2s ease;
  }
  .os-also-list a:hover { color: #FF5C2E; transform: translateX(4px); }
  .os-arr { color: #FF5C2E; }

  /* ── FINAL CTA ───────────────────────────────────────────────── */
  .os-cta {
    margin: clamp(72px, 11vw, 140px) auto 0;
    max-width: 680px;
    padding: clamp(48px, 7vw, 72px) clamp(20px, 4vw, 56px);
    border: 1.5px solid rgba(255, 92, 46, 0.30);
    border-radius: 24px;
    background:
      radial-gradient(ellipse at top, rgba(255, 92, 46, 0.10) 0%, rgba(255, 92, 46, 0) 60%),
      rgba(232, 232, 230, 0.03);
    text-align: center;
  }
  .os-cta-h2 {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(28px, 4.2vw, 40px);
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #f4f4f6;
    margin: 0 0 18px;
    max-width: 18ch;
    margin-left: auto;
    margin-right: auto;
  }
  .os-cta-lede {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(16px, 1.8vw, 18px);
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.78);
    margin: 0 auto 28px;
    max-width: 52ch;
  }
  .os-cta-fine {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.55);
    margin: 16px auto 0;
    max-width: 50ch;
  }
  .os-cta-fine strong { color: #f4f4f6; font-weight: 600; }
  .os-cta .hero-counter-block { margin-top: 28px; }
`
