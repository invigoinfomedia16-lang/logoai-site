// Our Story — long-form editorial. Uses the SAME building blocks as
// the home page (.wrap container, .sec-head, .eyebrow, h2, .lede,
// body p) so it reads as a proper subpage of /prelaunch. The shell
// (nav, footer, sticky CTA, typography, theme tokens) all come from
// <MLpSubpageShell> — this file owns content only, not chrome.
//
// Content from Logo_AI_OurStory_v16.docx.

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

      <main>
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="os-hero">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Our Story</span>
              <h1>
                Thirty years of building things.<br />
                One problem that never got fixed.<br />
                <span className="muted">So we fixed it.</span>
              </h1>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ─── 01. THE PROBLEM ───────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">01 — The Problem</span>
              <h2>Every founder hits<br /><span className="muted">the same wall.</span></h2>
            </div>
            <div className="os-prose">
              <p>You have a business idea. You&rsquo;re ready to move. And then &mdash; the logo.</p>
              <p>You have two options. Neither is good.</p>
              <p>
                You hire a designer. Three to six weeks. Rounds of revisions. A final result that
                might be great, might be fine, might be neither &mdash; and you won&rsquo;t know until
                you&rsquo;ve spent $5,000 to $20,000 to find out.
              </p>
              <p>
                Or you use a DIY logo maker. Fast and cheap. But the output looks like it. The same
                400 shapes, reshuffled into slightly different configurations. Your logo ends up
                looking like ten thousand others &mdash; because it&rsquo;s made from the same parts.
              </p>
              <p className="os-callout">
                For thirty years, those were the only two options. Nobody fixed it. <strong>So we did.</strong>
              </p>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ─── 02. WHERE WE STARTED ──────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">02 — Where We Started</span>
              <h2>Two brothers.<br /><span className="muted">Early internet.</span></h2>
            </div>
            <div className="os-prose">
              <p>
                Flash-based e-greeting cards &mdash; among the first of their kind. Nobody told them
                it would work. It became one of the most visited greeting platforms on the web.
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
          </div>
        </section>

        <hr className="rule" />

        {/* ─── 03. THE TURNING POINT ─────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">03 — The Turning Point</span>
              <h2>Late 2023.<br /><span className="muted">An obvious question.</span></h2>
            </div>
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
              <p className="os-callout">
                Stop trying to prompt AI into designing a logo. <strong>Start teaching it how design actually works.</strong>
              </p>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ─── 04. HOW WE BUILT IT ───────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">04 — How We Built It</span>
              <h2>We trained the AI<br /><span className="muted">like a design student.</span></h2>
            </div>
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

            <div className="os-stats" role="list">
              <div className="os-stat" role="listitem">
                <strong>2.5 yrs</strong>
                <span>of R&amp;D</span>
              </div>
              <div className="os-stat" role="listitem">
                <strong>100,000+</strong>
                <span>logos analyzed</span>
              </div>
              <div className="os-stat" role="listitem">
                <strong>16 people</strong>
                <span>across 4 countries</span>
              </div>
            </div>

            <div className="os-prose">
              <p>
                The domain name &mdash; LOGO.AI &mdash; waited until the product deserved it. We
                didn&rsquo;t buy it to look credible. We bought it after the product proved it had
                earned the name.
              </p>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ─── 05. WHERE WE ARE NOW ──────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">05 — Where We Are Now</span>
              <h2>A logo in under 60 seconds.<br /><span className="muted">Designed from scratch. Every time.</span></h2>
            </div>
            <div className="os-prose">
              <p>
                And the logo is just the start. We&rsquo;re building toward a world where your entire
                brand identity &mdash; colors, typography, business cards, social assets &mdash; is
                ready before your coffee gets cold.
              </p>
              <p className="os-callout">
                The problem took thirty years to fix. <strong>The fix takes sixty seconds to use.</strong>
              </p>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ─── ALSO WORTH READING ───────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Also worth reading</span>
            </div>
            <ul className="os-also-list">
              <li>
                <Link href="/prelaunch#who-its-for">
                  Meet the Team <span className="os-arr">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link href="/prelaunch">
                  Why LOGO.AI <span className="os-arr">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <hr className="rule" />

        {/* ─── FINAL CTA — same shape as the home page ───────────── */}
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
  /* The shell + MLP_NAV_STYLES provides .wrap, sec-head, h1/h2, eyebrow,
     lede, p, footer, etc. — same as the home page. This file only adds
     the patterns that are UNIQUE to the Our Story narrative: prose
     stack, callout, stats row, "also" list, and the Final CTA card. */

  /* Hero — slim down the top padding so the eyebrow + h1 read as the
     page opener, not lost in a section gap. */
  .os-hero { padding-top: clamp(64px, 9vw, 120px); padding-bottom: clamp(36px, 5vw, 60px); }

  /* Long-form prose — slightly narrower than the default .lp-root p
     max-width so the line length stays comfortably readable. */
  .os-prose {
    max-width: 660px;
    margin: 0 auto;
    text-align: left;
  }
  .os-prose p {
    margin: 0 0 22px;
    font-size: clamp(16px, 1.6vw, 18px);
    line-height: 1.7;
    color: rgba(232, 232, 230, 0.78);
    max-width: none;
  }

  /* Callout — emphasis line at the end of a section. Orange hairline
     above, Sora 600. NOT italic, NOT serif. */
  .os-prose .os-callout {
    margin: 28px 0 0;
    padding: 22px 0 0;
    border-top: 1.5px solid rgba(255, 92, 46, 0.35);
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    font-size: clamp(20px, 2.4vw, 24px);
    line-height: 1.35;
    letter-spacing: -0.015em;
    color: rgba(244, 244, 246, 0.82);
  }
  .os-prose .os-callout strong { color: #FF5C2E; font-weight: 700; }

  /* Stats row — 3-col, orange Sora numbers, muted labels */
  .os-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin: 56px auto;
    max-width: 660px;
    padding: 32px 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    border-bottom: 1px solid rgba(232, 232, 230, 0.10);
    text-align: left;
  }
  .os-stat {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .os-stat strong {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: clamp(22px, 2.8vw, 28px);
    line-height: 1.1;
    letter-spacing: -0.015em;
    color: #FF5C2E;
  }
  .os-stat span {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.55);
    letter-spacing: 0.02em;
  }
  @media (max-width: 640px) {
    .os-stats { grid-template-columns: 1fr; gap: 18px; padding: 24px 0; }
  }

  /* "Also worth reading" list */
  .os-also-list {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 660px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: left;
  }
  .os-also-list a {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-family: 'Sora', sans-serif;
    font-weight: 700;
    font-size: clamp(20px, 2.4vw, 26px);
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: #f4f4f6;
    text-decoration: none;
    transition: color .15s, transform .2s;
  }
  .os-also-list a:hover { color: #FF5C2E; transform: translateX(4px); }
  .os-arr { color: #FF5C2E; }

  /* Final CTA card — copy of the home page's .final-cta-simple
     treatment so the closing moment matches exactly. */
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
