// Our Story — long-form editorial. Adapted from logoai-our-story-redesign
// reference HTML; ported into the prelaunch site's MLp visual system
// (Sora display, Outfit body, orange accents). Follows the subpage
// rules at the top of MLpSubpageShell.tsx.
//
// Visual moments (in order):
//   Hero    — h1 + lede + tagline beat ("So we fixed it.")
//   01      — Two-option comparison cards (Designer vs DIY)
//   02      — Origin prose + "30 years" big-number callout
//   03      — Turning point prose + full-bleed quiet pull-quote
//   04      — Built-it prose + stat row + chronological timeline
//   Closer  — Editorial closing h2 with orange accent words
//   CTA     — Same .final-cta-simple block as the home page

import type { Metadata } from 'next'
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

      <main>
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="os-hero">
          <div className="wrap">
            <div className="sec-head">
              <h1>Our Story</h1>
              <p className="lede">
                Thirty years of building things. One problem that never got fixed.
              </p>
              <div className="os-hero-tag">So we fixed it.</div>
            </div>
          </div>
        </section>

        {/* ─── 01. THE PROBLEM ───────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">01 — The Problem</span>
              <h2>Every founder hits the same wall.</h2>
              <p className="lede">
                You have a business idea. You&rsquo;re ready to move. And then &mdash; <strong>the logo.</strong>
              </p>
            </div>

            <div className="os-prose">
              <p>You have two options. Neither is good.</p>
            </div>

            {/* Two-option comparison cards */}
            <div className="os-options">
              <article className="os-opt">
                <span className="os-opt-tag">Option A</span>
                <h3>Hire a designer.</h3>
                <p>
                  A final result that might be great, might be fine, might be neither &mdash; and you
                  won&rsquo;t know until you&rsquo;ve spent the money to find out.
                </p>
                <dl className="os-opt-meta">
                  <div>
                    <dt>3–6 weeks</dt>
                    <dd>Timeline</dd>
                  </div>
                  <div>
                    <dt>$5K–$20K</dt>
                    <dd>Cost</dd>
                  </div>
                  <div>
                    <dt>Maybe</dt>
                    <dd>Outcome</dd>
                  </div>
                </dl>
              </article>

              <article className="os-opt">
                <span className="os-opt-tag">Option B</span>
                <h3>Use a DIY maker.</h3>
                <p>
                  Fast and cheap. But the output looks like it. The same 400 shapes, reshuffled.
                  Your logo ends up looking like <strong>ten thousand others</strong>.
                </p>
                <dl className="os-opt-meta">
                  <div>
                    <dt>Minutes</dt>
                    <dd>Timeline</dd>
                  </div>
                  <div>
                    <dt>$0–$50</dt>
                    <dd>Cost</dd>
                  </div>
                  <div>
                    <dt>Generic</dt>
                    <dd>Outcome</dd>
                  </div>
                </dl>
              </article>
            </div>

            <p className="os-pq-inline">
              For thirty years, those were the only two options. Nobody fixed it. <strong>So we did.</strong>
            </p>
          </div>
        </section>

        {/* ─── 02. ORIGIN ───────────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">02 — Origin</span>
              <h2>Two brothers. Early internet.</h2>
              <p className="lede">
                Flash-based e-greeting cards &mdash; among the first of their kind. Nobody told them
                it would work. It became one of the most visited greeting platforms on the web.
              </p>
            </div>

            <div className="os-prose">
              <p>
                They spent the next three decades building companies across media, education,
                productivity, and e-commerce. Multiple exits. Billions of users.
              </p>
              <p>
                They also built AI long before AI was a buzzword &mdash; <strong>chatbots, game
                opponents that adapted to how you played, recommendation engines, algorithmic
                trading systems, early computer vision.</strong>
              </p>
              <p>
                And through all of it, every company they built or backed ran into the same thing:
                <strong> getting a logo was always slower, harder, and more expensive than it needed
                to be.</strong>
              </p>
            </div>

            {/* Big-number callout — replaces a plain prose moment */}
            <div className="os-pq-stat">
              <div className="os-pq-stat-big">30</div>
              <div className="os-pq-stat-text">
                They kept a mental note.<br />
                That note turned into a grudge.<br />
                That grudge turned into <strong>LOGO.AI</strong>.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 03. THE TURNING POINT ────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">03 — The Turning Point</span>
              <h2>Late 2023. The obvious question.</h2>
              <p className="lede">
                AI was writing code, generating photorealistic images, composing music.
              </p>
            </div>

            <div className="os-prose">
              <p>
                The founders asked the obvious question:{' '}
                <strong>why can&rsquo;t it design a professional logo?</strong>
              </p>
              <p>
                They tried every tool they could find. All of them produced the same thing &mdash;
                warped text, random symbols, no understanding of what a brand actually is. The
                problem wasn&rsquo;t that AI couldn&rsquo;t do it.{' '}
                <strong>The problem was that nobody had taught it properly.</strong>
              </p>
              <p>The tools were generating. They weren&rsquo;t designing.</p>
            </div>

            {/* Full-bleed quiet pull-quote */}
            <blockquote className="os-pq-bleed">
              Stop trying to prompt AI into designing a logo.<br />
              <span className="os-pq-bleed-accent">Start teaching it how design actually works.</span>
            </blockquote>
          </div>
        </section>

        {/* ─── 04. HOW WE BUILT IT ──────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">04 — How We Built It</span>
              <h2>We trained the AI like a design student.</h2>
              <p className="lede">
                <strong>Color theory. Typography. Negative space.</strong> Visual hierarchy. The
                structural logic behind logos that have stood for decades. Not a library of
                pre-made assets to remix. <strong>Real design principles.</strong>
              </p>
            </div>

            <div className="os-prose">
              <p>
                Our benchmark: a professional designer, shown the output blind, can&rsquo;t tell it
                from human work. Not sometimes. <strong>Every time.</strong>
              </p>
              <p>We went back many times. Then one day, we stopped going back.</p>
            </div>

            {/* Heavier stats with sub-labels */}
            <div className="os-stats" role="list">
              <div className="os-stat" role="listitem">
                <div className="os-stat-num">2.5 <span>yrs</span></div>
                <div className="os-stat-label">Of R&amp;D</div>
                <div className="os-stat-sub">From first prompt to production-ready.</div>
              </div>
              <div className="os-stat" role="listitem">
                <div className="os-stat-num">100 <span>k+</span></div>
                <div className="os-stat-label">Logos Analyzed</div>
                <div className="os-stat-sub">Encoded into design principles.</div>
              </div>
              <div className="os-stat" role="listitem">
                <div className="os-stat-num">16</div>
                <div className="os-stat-label">People · 4 Countries</div>
                <div className="os-stat-sub">Designers, engineers, researchers.</div>
              </div>
            </div>

            {/* Chronological timeline */}
            <div className="os-timeline">
              <div className="os-tl-row">
                <div className="os-tl-year">Late 2023</div>
                <div>
                  <div className="os-tl-title">The question was asked.</div>
                  <p className="os-tl-body">AI was everywhere. No one was teaching it design.</p>
                </div>
              </div>
              <div className="os-tl-row">
                <div className="os-tl-year">2024</div>
                <div>
                  <div className="os-tl-title">Deep R&amp;D begins.</div>
                  <p className="os-tl-body">100,000+ logos analyzed. Design principles encoded. Benchmark set.</p>
                </div>
              </div>
              <div className="os-tl-row">
                <div className="os-tl-year">2025</div>
                <div>
                  <div className="os-tl-title">The product earns the name.</div>
                  <p className="os-tl-body">LOGO.AI &mdash; the domain waited until the product deserved it.</p>
                </div>
              </div>
              <div className="os-tl-row">
                <div className="os-tl-year">Now</div>
                <div>
                  <div className="os-tl-title">60 seconds. Every time.</div>
                  <p className="os-tl-body">A professional logo, designed from scratch. Free at launch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CLOSER — editorial closing moment ─────────────────── */}
        <section className="os-closer">
          <div className="wrap">
            <h2>
              The problem took<br />
              <span className="os-closer-accent">thirty years</span> to fix.<br />
              The fix takes<br />
              <span className="os-closer-accent">sixty seconds</span> to use.
            </h2>
          </div>
        </section>

        {/* ─── FINAL CTA — same shape as the home page ─────────── */}
        <section>
          <div className="final-cta-simple">
            <h2 className="final-h2-simple">Ready to Get Your Free Logo?</h2>
            <p className="final-lede">
              Hundreds of thousands have already claimed theirs. Get yours before they&rsquo;re gone.
            </p>
            <MLpEmailForm variant="final" />
            <p className="fine final-fine-simple">
              <strong>No spam. No credit card. Just a free logo.</strong><br />
              We&rsquo;ll email you the moment we go live so you can generate your free logo.
            </p>
            <MLpHeroCounter framing="claimed" tagline="Don't miss yours." />
          </div>
        </section>
      </main>
    </MLpSubpageShell>
  )
}

/* ────────────────────────────────────────────────────────────────────
   Page-only CSS. Theme tokens, layout primitives (.wrap, .sec-head,
   .eyebrow, h1/h2/h3, .lede, body p), footer + nav, AND the email
   form + counter chrome all come from MLpSubpageShell / MLpNavStyles
   / MLpEmailForm / MLpHeroCounter. This block only adds the patterns
   that are unique to the Our Story narrative.
   ──────────────────────────────────────────────────────────────────── */
const STYLES = `
  /* ── Hero: tight top, accent tag line under the lede ───────────── */
  .os-hero { padding-top: clamp(72px, 10vw, 120px); padding-bottom: clamp(56px, 7vw, 88px); }
  .os-hero-tag {
    margin-top: 24px;
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(20px, 2.4vw, 26px);
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: #FF5C2E;
  }

  /* ── Long-form prose stack ─────────────────────────────────────── */
  .os-prose {
    max-width: 720px;
    margin: 0 auto;
    text-align: left;
  }
  .os-prose p {
    margin: 0 0 22px;
    font-family: 'Outfit', sans-serif;
    font-size: clamp(16px, 1.6vw, 18px);
    line-height: 1.7;
    color: rgba(232, 232, 230, 0.78);
    max-width: none;
  }
  .os-prose p strong { color: #f4f4f6; font-weight: 600; }

  /* ── 01: TWO-OPTION COMPARISON CARDS ───────────────────────────── */
  .os-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 960px;
    margin: 40px auto 0;
    text-align: left;
  }
  .os-opt {
    padding: 32px;
    border: 1px solid rgba(232, 232, 230, 0.10);
    border-radius: 18px;
    background: rgba(232, 232, 230, 0.03);
    transition: border-color .2s, transform .2s;
  }
  .os-opt:hover {
    border-color: rgba(255, 92, 46, 0.30);
    transform: translateY(-2px);
  }
  .os-opt-tag {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FF5C2E;
    margin-bottom: 14px;
  }
  .os-opt h3 {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(20px, 2.4vw, 24px);
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    margin: 0 0 14px;
    text-align: left;
  }
  .os-opt p {
    font-family: 'Outfit', sans-serif;
    font-size: 15.5px;
    line-height: 1.6;
    color: rgba(232, 232, 230, 0.72);
    margin: 0 0 22px;
    max-width: none;
  }
  .os-opt p strong { color: #f4f4f6; font-weight: 600; }
  .os-opt-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding-top: 20px;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    margin: 0;
  }
  .os-opt-meta div { display: flex; flex-direction: column; gap: 2px; }
  .os-opt-meta dt {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #f4f4f6;
    letter-spacing: -0.01em;
  }
  .os-opt-meta dd {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(232, 232, 230, 0.45);
    margin: 0;
  }
  @media (max-width: 720px) {
    .os-options { grid-template-columns: 1fr; gap: 16px; }
    .os-opt { padding: 24px; }
  }

  /* ── INLINE PULL-QUOTE (01 closer) ─────────────────────────────── */
  .os-pq-inline {
    margin: 56px auto 0;
    max-width: 720px;
    padding: 28px 0 0;
    border-top: 1.5px solid rgba(255, 92, 46, 0.35);
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: clamp(20px, 2.6vw, 26px);
    line-height: 1.35;
    letter-spacing: -0.015em;
    color: rgba(244, 244, 246, 0.82);
    text-align: left;
  }
  .os-pq-inline strong { color: #FF5C2E; font-weight: 700; }

  /* ── BIG-NUMBER PULL-QUOTE (02) ────────────────────────────────── */
  .os-pq-stat {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 32px;
    align-items: center;
    max-width: 720px;
    margin: 56px auto 0;
    padding: 32px;
    border: 1px solid rgba(255, 92, 46, 0.30);
    border-radius: 20px;
    background:
      radial-gradient(ellipse at top left, rgba(255, 92, 46, 0.08) 0%, rgba(255, 92, 46, 0) 70%),
      rgba(232, 232, 230, 0.03);
    text-align: left;
  }
  .os-pq-stat-big {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(72px, 9vw, 120px);
    line-height: 0.9;
    letter-spacing: -0.05em;
    color: #FF5C2E;
  }
  .os-pq-stat-text {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(15px, 1.6vw, 17px);
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.75);
  }
  .os-pq-stat-text strong { color: #f4f4f6; font-weight: 600; }
  @media (max-width: 560px) {
    .os-pq-stat { grid-template-columns: 1fr; gap: 16px; padding: 24px; text-align: center; }
    .os-pq-stat-big { text-align: center; }
  }

  /* ── FULL-BLEED QUIET PULL-QUOTE (03) ──────────────────────────── */
  .os-pq-bleed {
    margin: 56px auto 0;
    max-width: 800px;
    padding: 40px 32px;
    text-align: center;
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(22px, 3vw, 32px);
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: rgba(244, 244, 246, 0.78);
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
  }
  .os-pq-bleed-accent { color: #FF5C2E; }

  /* ── STATS ROW (04) — heavier with sub-labels ──────────────────── */
  .os-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 960px;
    margin: 64px auto 0;
    padding: 40px 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    text-align: left;
  }
  .os-stat { display: flex; flex-direction: column; gap: 6px; }
  .os-stat-num {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1;
    letter-spacing: -0.025em;
    color: #FF5C2E;
  }
  .os-stat-num span {
    font-size: 0.45em;
    font-weight: 600;
    letter-spacing: 0;
    margin-left: 4px;
    color: rgba(255, 92, 46, 0.75);
  }
  .os-stat-label {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #f4f4f6;
    margin-top: 8px;
  }
  .os-stat-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 13.5px;
    line-height: 1.5;
    color: rgba(232, 232, 230, 0.55);
    margin-top: 4px;
  }
  @media (max-width: 720px) {
    .os-stats { grid-template-columns: 1fr; gap: 24px; padding: 32px 0; }
  }

  /* ── TIMELINE (04) ────────────────────────────────────────────── */
  .os-timeline {
    max-width: 760px;
    margin: 56px auto 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    text-align: left;
  }
  .os-tl-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 24px;
    padding: 24px 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
  }
  .os-tl-row:last-child { border-bottom: 1px solid rgba(232, 232, 230, 0.10); }
  .os-tl-year {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #FF5C2E;
    padding-top: 2px;
  }
  .os-tl-title {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(18px, 2vw, 20px);
    line-height: 1.3;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    margin-bottom: 4px;
  }
  .os-tl-body {
    font-family: 'Outfit', sans-serif;
    font-size: 14.5px;
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.65);
    margin: 0;
    max-width: none;
  }
  @media (max-width: 560px) {
    .os-tl-row { grid-template-columns: 1fr; gap: 8px; }
  }

  /* ── CLOSER — editorial closing h2 ─────────────────────────────── */
  .os-closer { padding: clamp(72px, 10vw, 120px) 0; }
  .os-closer h2 {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(34px, 5.4vw, 56px);
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #f4f4f6;
    max-width: 18ch;
    margin: 0 auto;
  }
  .os-closer-accent { color: #FF5C2E; }

  /* ── FINAL CTA card — copy of the home page's .final-cta-simple ── */
  .final-cta-simple {
    max-width: 1040px;
    margin: 0 auto;
    padding: 72px 80px;
    border: 1.5px solid rgba(255, 92, 46, 0.30);
    border-radius: 24px;
    background:
      radial-gradient(ellipse at top, rgba(255, 92, 46, 0.10) 0%, rgba(255, 92, 46, 0) 60%),
      rgba(232, 232, 230, 0.03);
    text-align: center;
  }
  .final-h2-simple {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(34px, 5.4vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: #f4f4f6;
    margin: 0 0 18px;
  }
  .final-lede {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(16px, 1.8vw, 18px);
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.78);
    margin: 0 auto 28px;
    max-width: 56ch;
  }
  .final-cta-simple .fine {
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.55);
    margin: 16px auto 0;
    max-width: 50ch;
  }
  .final-cta-simple .fine strong { color: #f4f4f6; font-weight: 600; }
  .final-cta-simple .hero-counter-block { margin-top: 28px; }
  @media (max-width: 720px) {
    .final-cta-simple { padding: 44px 24px; border-radius: 18px; }
  }
`
