// Our Story — minimalist editorial with a timeline spine + select
// visual moments from the our-story-redesign reference HTML.
//
// Spine: big year markers (1995 → Late 2023 → 2024 → Now) carry the
// chronology. Within that, three deliberate visual moments break up
// the prose: a two-option comparison ("Hire a designer" vs "Use a
// DIY maker") in the Problem section; a big "30" pull-quote in 1995;
// and a heavier stats + sub-timeline block in 2024. Everything else
// stays single-column prose carried by air.
//
// Content sourced from Logo_AI_OurStory_v16.docx.

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

      <main className="os">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="os-hero">
          <div className="os-col">
            <h1 className="os-h1">Our Story</h1>
            <p className="os-hero-lede">
              Thirty years of building things. One problem that never got fixed.{' '}
              <span className="os-display-accent-inline">So we fixed it.</span>
            </p>
          </div>
        </section>

        {/* ─── THE PROBLEM (no year — present-day setup) ────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <h2 className="os-marker os-marker-prose">The Problem</h2>
            <p className="os-lede">Every founder hits the same wall.</p>
            <div className="os-prose">
              <p>You have a business idea. You&rsquo;re ready to move. And then &mdash; the logo.</p>
              <p>You have two options. Neither is good.</p>
            </div>
          </div>

          {/* Two-option comparison cards — wider than the prose column */}
          <div className="os-options-wrap">
            <div className="os-options">
              <article className="os-opt">
                <span className="os-opt-tag">Option A</span>
                <h3>Hire a designer.</h3>
                <p>
                  Three to six weeks. Rounds of revisions. A final result that might be great, might
                  be fine, might be neither &mdash; and you won&rsquo;t know until you&rsquo;ve
                  spent the money to find out.
                </p>
                <dl className="os-opt-meta">
                  <div><dt>3–6 weeks</dt><dd>Timeline</dd></div>
                  <div><dt>$5K–$20K</dt><dd>Cost</dd></div>
                  <div><dt>Maybe</dt><dd>Outcome</dd></div>
                </dl>
              </article>

              <article className="os-opt">
                <span className="os-opt-tag">Option B</span>
                <h3>Use a DIY maker.</h3>
                <p>
                  Fast and cheap. But the output looks like it. The same 400 shapes, reshuffled.
                  Your logo ends up looking like <strong>ten thousand others</strong> &mdash;
                  because it&rsquo;s made from the same parts.
                </p>
                <dl className="os-opt-meta">
                  <div><dt>Minutes</dt><dd>Timeline</dd></div>
                  <div><dt>$0–$50</dt><dd>Cost</dd></div>
                  <div><dt>Generic</dt><dd>Outcome</dd></div>
                </dl>
              </article>
            </div>
          </div>

          <div className="os-col">
            <p className="os-resolution">
              For thirty years, those were the only two options. Nobody fixed it. So we did.
            </p>
          </div>
        </section>

        {/* ─── 1995 ─────────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <h2 className="os-marker">1995</h2>
            <p className="os-lede">Two brothers. Early internet.</p>
            <div className="os-prose">
              <p>
                Flash-based e-greeting cards &mdash; among the first of their kind. Nobody told them
                it would work. It became one of the most visited greeting platforms on the web.
              </p>
              <p>
                They spent the next three decades building companies across media, education,
                productivity, and e-commerce. Multiple exits. Billions of users. They also built AI
                long before AI was a buzzword &mdash; chatbots, game opponents that adapted to how
                you played, recommendation engines, algorithmic trading systems, early computer
                vision.
              </p>
              <p>
                And through all of it, every company they built or backed ran into the same thing:
                getting a logo was always slower, harder, and more expensive than it needed to be.
              </p>
            </div>

            {/* Big "30 YEARS" pull-quote — visual punch for the decades beat */}
            <div className="os-pq-stat">
              <div className="os-pq-stat-numwrap">
                <div className="os-pq-stat-big">30</div>
                <div className="os-pq-stat-unit">years</div>
              </div>
              <div className="os-pq-stat-text">
                They kept a mental note.<br />
                That note turned into a grudge.<br />
                That grudge turned into <strong>LOGO.AI</strong>.
              </div>
            </div>
          </div>
        </section>

        {/* ─── LATE 2023 ────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <h2 className="os-marker">Late 2023</h2>
            <p className="os-lede">The obvious question.</p>
            <div className="os-prose">
              <p>AI was writing code, generating photorealistic images, composing music.</p>
              <p>
                The founders asked the obvious question: why can&rsquo;t it design a professional
                logo?
              </p>
              <p>
                They tried every tool they could find. All of them produced the same thing &mdash;
                warped text, random symbols, no understanding of what a brand actually is. The
                problem wasn&rsquo;t that AI couldn&rsquo;t do it. The problem was that nobody had
                taught it properly. The tools were generating. They weren&rsquo;t designing.
              </p>
              <p>That was the unlock.</p>
            </div>
            <p className="os-resolution">
              Stop trying to prompt AI into designing a logo. Start teaching it how design actually
              works.
            </p>
          </div>
        </section>

        {/* ─── 2024 ─────────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <h2 className="os-marker">2024</h2>
            <p className="os-lede">We trained the AI like a design student.</p>
            <div className="os-prose">
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
          </div>

          {/* Heavier stats row with sub-labels */}
          <div className="os-stats-wrap">
            <div className="os-stats">
              <div className="os-stat">
                <div className="os-stat-num">2.5 <span className="os-stat-suf">yrs</span></div>
                <div className="os-stat-label">Of R&amp;D</div>
                <div className="os-stat-sub">From first prompt to production-ready.</div>
              </div>
              <div className="os-stat">
                <div className="os-stat-num">100 <span className="os-stat-suf">k+</span></div>
                <div className="os-stat-label">Logos Analyzed</div>
                <div className="os-stat-sub">Encoded into design principles.</div>
              </div>
              <div className="os-stat">
                <div className="os-stat-num">16</div>
                <div className="os-stat-label">People · 4 Countries</div>
                <div className="os-stat-sub">Designers, engineers, researchers.</div>
              </div>
            </div>
          </div>

          {/* Build sub-timeline — finer-grained chronology of the build */}
          <div className="os-col">
            <div className="os-mini-timeline">
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

        {/* ─── NOW ──────────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <h2 className="os-marker">Now</h2>
            <p className="os-lede">A logo in under 60 seconds. Every time.</p>
            <div className="os-prose">
              <p>
                And the logo is just the start. We&rsquo;re building toward a world where your
                entire brand identity &mdash; colors, typography, business cards, social assets
                &mdash; is ready before your coffee gets cold.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CLOSER — editorial closing statement.
             Both lines white (no muted second line). Orange only on
             the accent words ("thirty years", "sixty seconds"). */}
        <section className="os-closer">
          <div className="os-col">
            <p className="os-display">
              The problem took<br />
              <span className="os-display-accent-inline">thirty years</span> to fix.
            </p>
            <p className="os-display">
              The fix takes<br />
              <span className="os-display-accent-inline">sixty seconds</span> to use.
            </p>
          </div>
        </section>

        {/* ─── FINAL CTA — docx copy ──────────────────────────── */}
        <section>
          <div className="final-cta-simple">
            <h2 className="final-h2-simple">Get a Professional Logo. Completely Free.</h2>
            <p className="final-lede">
              2,000,000 free logos at launch. We&rsquo;ll email you the moment we go live so you
              can generate yours.
            </p>
            <MLpEmailForm variant="final" />
            <p className="fine final-fine-simple">
              <strong>No spam. No credit card. Just a free logo.</strong>
            </p>
            <MLpHeroCounter framing="remaining" tagline="Don't miss yours." />
          </div>
        </section>

        {/* ─── ALSO WORTH READING — same sec-head pattern as the
             home page (eyebrow + h2 + lede). Sits BELOW the CTA as a
             quiet follow-on, not blocking the conversion moment. */}
        <section className="os-also">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">More</span>
              <h2>Also worth reading</h2>
              <p className="lede">Two more chapters that pair with this one.</p>
            </div>
            <ul className="os-also-list">
              <li>
                <Link href="/prelaunch#who-its-for">
                  <span className="os-also-arr">&rarr;</span> Meet the Team
                </Link>
              </li>
              <li>
                <Link href="/prelaunch">
                  <span className="os-also-arr">&rarr;</span> Why LOGO.AI
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </MLpSubpageShell>
  )
}

const STYLES = `
  .os { padding: 0; }

  /* Narrow editorial column for hero, chapter intros, prose, resolution
     lines, closer. Visual moments break OUT of this column at wider
     containers below. */
  .os .os-col {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 48px);
    text-align: center;
  }

  /* ── HERO ──────────────────────────────────────────────────── */
  .os-hero {
    padding: clamp(96px, 14vw, 180px) 0 clamp(72px, 10vw, 120px);
  }
  .os-h1 {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 8vw, 84px);
    line-height: 1.02;
    letter-spacing: -0.035em;
    color: var(--text);
    margin: 0 auto 28px;
  }
  .os-hero-lede {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(18px, 2.2vw, 22px);
    font-weight: 400;
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.78);
    max-width: 32ch;
    margin: 0 auto;
  }
  .os-display {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 6.5vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--text);
    margin: 0 auto 24px;
    max-width: 18ch;
  }
  .os-display-accent-inline { color: #FF5C2E; }

  /* ── CHAPTER ───────────────────────────────────────────────── */
  .os-chapter { padding: clamp(80px, 11vw, 140px) 0; }

  /* The marker IS the chapter's h2 (section title). The year or
     label is the visual entry; the descriptive sentence below it
     reads as the lede. No underline — the orange color + size carry
     the hierarchy without chrome. */
  .os-marker {
    display: inline-block;
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(40px, 6vw, 72px);
    line-height: 1;
    letter-spacing: -0.03em;
    color: #FF5C2E;
    margin: 0 auto 24px;
  }
  /* "The Problem" tag — quieter prose-text style since it's a label,
     not a numeric year. Still h2-sized. */
  .os-marker-prose {
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.015em;
    color: var(--text);
  }

  /* Lede — descriptive sentence right under the h2 marker. */
  .os-lede {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(18px, 2.2vw, 22px);
    font-weight: 500;
    line-height: 1.4;
    color: rgba(232, 232, 230, 0.85);
    margin: 0 auto 36px;
    max-width: 28ch;
  }

  /* ── PROSE ─────────────────────────────────────────────────── */
  .os-prose { text-align: left; }
  .os-prose p {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(16px, 1.6vw, 18px);
    font-weight: 400;
    line-height: 1.75;
    color: rgba(232, 232, 230, 0.78);
    margin: 0 0 28px;
    max-width: none;
  }
  .os-prose p:last-child { margin-bottom: 0; }
  .os-prose p strong { color: var(--text); font-weight: 600; }

  /* Resolution line — orange tint sentence that lands each chapter. */
  .os-resolution {
    margin: 40px auto 0;
    max-width: 660px;
    padding: 24px 0 0;
    border-top: 1.5px solid rgba(255, 92, 46, 0.35);
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: clamp(20px, 2.4vw, 26px);
    line-height: 1.3;
    letter-spacing: -0.015em;
    color: rgba(244, 244, 246, 0.82);
    text-align: left;
  }

  /* ══════════════════════════════════════════════════════════════
     V1 — Two-option comparison cards (Problem)
     ══════════════════════════════════════════════════════════════ */
  .os-options-wrap {
    max-width: 1040px;
    margin: 48px auto;
    padding: 0 clamp(20px, 4vw, 48px);
  }
  .os-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
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
    color: var(--text);
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
  .os-opt p strong { color: var(--text); font-weight: 600; }
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
    color: var(--text);
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

  /* ══════════════════════════════════════════════════════════════
     V2 — Big "30" pull-quote (1995)
     ══════════════════════════════════════════════════════════════ */
  .os-pq-stat {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 32px;
    align-items: center;
    max-width: 660px;
    margin: 56px auto 0;
    padding: 32px;
    border: 1px solid rgba(255, 92, 46, 0.30);
    border-radius: 20px;
    background:
      radial-gradient(ellipse at top left, rgba(255, 92, 46, 0.08) 0%, rgba(255, 92, 46, 0) 70%),
      rgba(232, 232, 230, 0.03);
    text-align: left;
  }
  .os-pq-stat-numwrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
  }
  .os-pq-stat-big {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(72px, 9vw, 120px);
    line-height: 0.9;
    letter-spacing: -0.05em;
    color: #FF5C2E;
  }
  .os-pq-stat-unit {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(12px, 1.2vw, 14px);
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 92, 46, 0.75);
    margin-top: 6px;
  }
  .os-pq-stat-text {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(15px, 1.6vw, 17px);
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.75);
  }
  .os-pq-stat-text strong { color: var(--text); font-weight: 600; }
  @media (max-width: 560px) {
    .os-pq-stat { grid-template-columns: 1fr; gap: 16px; padding: 24px; text-align: center; }
    .os-pq-stat-big { text-align: center; }
  }

  /* ══════════════════════════════════════════════════════════════
     V3 — Heavier stats row (2024)
     ══════════════════════════════════════════════════════════════ */
  .os-stats-wrap {
    max-width: 960px;
    margin: 64px auto 48px;
    padding: 0 clamp(20px, 4vw, 48px);
  }
  .os-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 40px 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    text-align: left;
  }
  .os-stat { display: flex; flex-direction: column; gap: 6px; }
  .os-stat-num {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(40px, 5.4vw, 60px);
    line-height: 1;
    letter-spacing: -0.025em;
    color: #FF5C2E;
  }
  .os-stat-suf {
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
    color: var(--text);
    margin-top: 10px;
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

  /* ══════════════════════════════════════════════════════════════
     V4 — Build sub-timeline (2024)
     ══════════════════════════════════════════════════════════════ */
  .os-mini-timeline {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
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
    color: var(--text);
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

  /* ── ALSO WORTH READING ────────────────────────────────────── */
  .os-also {
    padding: clamp(64px, 9vw, 100px) 0 clamp(48px, 7vw, 80px);
  }
  .os-also-kicker {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(232, 232, 230, 0.55);
    margin-bottom: 24px;
  }
  .os-also-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
    text-align: left;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
  .os-also-list a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(22px, 2.6vw, 28px);
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: var(--text);
    text-decoration: none;
    transition: color .15s ease, transform .2s ease;
  }
  .os-also-list a:hover {
    color: #FF5C2E;
    transform: translateX(4px);
  }
  .os-also-arr { color: #FF5C2E; }

  /* ── CLOSER ────────────────────────────────────────────────── */
  .os-closer {
    padding: clamp(100px, 14vw, 180px) 0 clamp(80px, 12vw, 140px);
  }
  .os-closer .os-display { margin-bottom: 24px; }
  .os-closer .os-display:last-child { margin-bottom: 0; }

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
    color: var(--text);
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
  .final-cta-simple .fine strong { color: var(--text); font-weight: 600; }
  .final-cta-simple .hero-counter-block { margin-top: 28px; }
  @media (max-width: 720px) {
    .final-cta-simple { padding: 44px 24px; border-radius: 18px; }
  }
`
