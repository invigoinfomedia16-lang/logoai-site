// Our Story — minimalist editorial with a timeline spine.
// Year markers (1995 → Late 2023 → 2024 → Now) are the dominant
// visual structure; everything else is typography + whitespace.
// No cards, no boxes, no pull-quote chrome — just prose carried by
// air and a single orange-accent resolution line per chapter.
//
// Content sourced from Logo_AI_OurStory_v16.docx.

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

      <main className="os">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="os-hero">
          <div className="os-col">
            <span className="os-kicker">Our Story</span>
            <h1 className="os-display">
              Thirty years of<br />
              building things.
            </h1>
            <p className="os-display os-display-soft">
              One problem that<br />
              never got fixed.
            </p>
            <p className="os-display os-display-accent">So we fixed it.</p>
          </div>
        </section>

        {/* ─── THE PROBLEM (no year — present-day setup) ────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <span className="os-marker os-marker-tag">The Problem</span>
            <h2 className="os-title">Every founder hits the same wall.</h2>
            <div className="os-prose">
              <p>You have a business idea. You&rsquo;re ready to move. And then &mdash; the logo.</p>
              <p>You have two options. Neither is good.</p>
              <p>
                You hire a designer. Three to six weeks. Rounds of revisions. A final result that
                might be great, might be fine, might be neither &mdash; and you won&rsquo;t know
                until you&rsquo;ve spent $5,000 to $20,000 to find out.
              </p>
              <p>
                Or you use a DIY logo maker. Fast and cheap. But the output looks like it. The same
                400 shapes, reshuffled into slightly different configurations. Your logo ends up
                looking like ten thousand others &mdash; because it&rsquo;s made from the same parts.
              </p>
              <p className="os-resolution">
                For thirty years, those were the only two options. Nobody fixed it. So we did.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 1995 ─────────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <span className="os-marker">1995</span>
            <h2 className="os-title">Two brothers. Early internet.</h2>
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
              <p className="os-resolution">
                They kept a mental note. That note turned into a grudge. That grudge turned into
                LOGO.AI.
              </p>
            </div>
          </div>
        </section>

        {/* ─── LATE 2023 ────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <span className="os-marker">Late 2023</span>
            <h2 className="os-title">The obvious question.</h2>
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
              <p className="os-resolution">
                Stop trying to prompt AI into designing a logo. Start teaching it how design
                actually works.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 2024 ─────────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <span className="os-marker">2024</span>
            <h2 className="os-title">We trained the AI like a design student.</h2>
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

            {/* Stats — inline text row, no boxes */}
            <p className="os-inline-stats">
              <span><strong>2.5 yrs</strong> of R&amp;D</span>
              <span className="os-dot">·</span>
              <span><strong>100,000+</strong> logos analyzed</span>
              <span className="os-dot">·</span>
              <span><strong>16 people</strong> across 4 countries</span>
            </p>

            <div className="os-prose">
              <p>
                The domain name &mdash; LOGO.AI &mdash; waited until the product deserved it. We
                didn&rsquo;t buy it to look credible. We bought it after the product proved it had
                earned the name.
              </p>
            </div>
          </div>
        </section>

        {/* ─── NOW ──────────────────────────────────────────────── */}
        <section className="os-chapter">
          <div className="os-col">
            <span className="os-marker">Now</span>
            <h2 className="os-title">A logo in under 60 seconds. Every time.</h2>
            <div className="os-prose">
              <p>
                And the logo is just the start. We&rsquo;re building toward a world where your
                entire brand identity &mdash; colors, typography, business cards, social assets
                &mdash; is ready before your coffee gets cold.
              </p>
            </div>
          </div>
        </section>

        {/* ─── CLOSER — editorial closing statement ─────────────── */}
        <section className="os-closer">
          <div className="os-col">
            <p className="os-display">
              The problem took<br />
              <span className="os-display-accent-inline">thirty years</span> to fix.
            </p>
            <p className="os-display os-display-soft">
              The fix takes<br />
              <span className="os-display-accent-inline">sixty seconds</span> to use.
            </p>
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

const STYLES = `
  /* ── ROOT — the whole page is one centered editorial column ─── */
  .os { padding: 0; }

  /* Override the shared section { text-align: center } only for the
     editorial chapters — the kicker, marker, and h2 are still centered,
     but long-form prose reads left-aligned for readability. */
  .os .os-col {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 clamp(20px, 4vw, 48px);
    text-align: center;
  }

  /* ── HERO ──────────────────────────────────────────────────────
     Three-beat hero. Each line is its own display paragraph so the
     reader pauses between them. Last line picks up the orange
     "resolution" accent. */
  .os-hero {
    padding: clamp(96px, 14vw, 180px) 0 clamp(72px, 10vw, 120px);
  }
  .os-kicker {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(232, 232, 230, 0.55);
    margin-bottom: 36px;
  }
  .os-display {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 6.5vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #f4f4f6;
    margin: 0 0 24px;
    max-width: 18ch;
    margin-left: auto;
    margin-right: auto;
  }
  .os-display-soft { color: rgba(232, 232, 230, 0.55); }
  .os-display-accent { color: #FF5C2E; margin-bottom: 0; }
  .os-display-accent-inline { color: #FF5C2E; }

  /* ── CHAPTER (year + title + prose) ─────────────────────────── */
  .os-chapter {
    padding: clamp(80px, 11vw, 140px) 0;
  }

  /* The marker is the year (or a label like "The Problem"). It's
     the visual entry point for each chapter — large, uppercase,
     orange. A hairline below ties it to the chapter title. */
  .os-marker {
    display: inline-block;
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1;
    letter-spacing: -0.025em;
    color: #FF5C2E;
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 92, 46, 0.30);
  }
  /* Non-year tags (like "The Problem") read at a smaller scale so
     they don't compete with the actual year markers below. */
  .os-marker-tag {
    font-size: clamp(13px, 1.4vw, 15px);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding-bottom: 14px;
  }

  .os-title {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(28px, 3.8vw, 38px);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #f4f4f6;
    margin: 0 0 36px;
    max-width: 22ch;
    margin-left: auto;
    margin-right: auto;
  }

  /* ── PROSE — left-aligned, comfortable measure ──────────────── */
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

  /* Resolution line — the orange accent at the end of each
     chapter that lands the beat. Slightly bolder, slightly bigger,
     and tinted orange. */
  .os-prose .os-resolution {
    color: #f4f4f6;
    font-weight: 500;
    font-size: clamp(17px, 1.8vw, 19px);
    line-height: 1.55;
    margin-top: 36px;
  }
  .os-prose .os-resolution::first-letter { /* no special treatment */ }
  /* Resolution highlights — last sentence inside the resolution
     paragraph gets the orange tint via a span wrap (kept simple
     here: whole line stays muted-white, since pulling out the last
     sentence would require markup hacks. The visual weight comes
     from size + leading + spacing). */

  /* ── INLINE STATS ROW ──────────────────────────────────────── */
  .os-inline-stats {
    margin: 56px 0;
    font-family: 'Outfit', sans-serif;
    font-size: clamp(15px, 1.5vw, 17px);
    color: rgba(232, 232, 230, 0.62);
    line-height: 1.6;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    gap: 8px 14px;
    max-width: none;
  }
  .os-inline-stats strong {
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    color: #FF5C2E;
    letter-spacing: -0.01em;
  }
  .os-inline-stats .os-dot {
    color: rgba(232, 232, 230, 0.30);
    font-weight: 400;
  }

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
