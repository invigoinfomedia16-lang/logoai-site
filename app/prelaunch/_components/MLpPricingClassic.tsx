// MLpPricingClassic — the OLDER single-card pricing layout we had
// before switching to the side-by-side split. Rendered alongside the
// current .pricing-card in page.tsx; CSS shows one or the other
// depending on whether the design toggle is set to ALT or MAIN.
//
// Layout: centered card on a dark elevated surface, hairline orange
// border, soft top radial wash. Inside: small orange eyebrow, big
// "Free" price (with strikethrough $49 above it), short sub copy,
// hairline divider, benefits checklist (centered single column),
// hairline divider, full-width CTA, fine print below.

import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

type Benefit = { txt: ReactNode }

export default function MLpPricingClassic({ benefits }: { benefits: Benefit[] }) {
  return (
    <div className="pricing-card-classic">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <span className="pcc-eyebrow">Free at Launch</span>

      <div className="pcc-head">
        <span className="pcc-strike">$49</span>
        <span className="pcc-free">Free</span>
        <p className="pcc-sub">
          Free for the first 2,000,000 users &mdash; no subscription, no credit card, no catch.
        </p>
        <p className="pcc-keep">100% yours to keep forever.</p>
      </div>

      <hr className="pcc-divider" />

      <p className="pcc-list-title">What you get &mdash; free</p>
      <ul className="pcc-list">
        {benefits.map((b, i) => (
          <li key={i}>
            <Check size={18} strokeWidth={2.5} aria-hidden />
            <span>{b.txt}</span>
          </li>
        ))}
      </ul>

      <hr className="pcc-divider" />

      <a href="#hero-cta" className="pcc-cta">
        Get My Free Logo <span aria-hidden>&rarr;</span>
      </a>
      <p className="pcc-fine">Free for the first 2,000,000 users. No credit card, ever.</p>
    </div>
  )
}

const STYLES = `
  .pricing-card-classic {
    position: relative;
    max-width: 560px;
    margin: 0 auto;
    padding: 48px clamp(28px, 4vw, 56px) 40px;
    border: 1.5px solid rgba(255, 92, 46, 0.30);
    border-radius: 24px;
    background:
      radial-gradient(ellipse at top, rgba(255, 92, 46, 0.10) 0%, rgba(255, 92, 46, 0) 60%),
      rgba(232, 232, 230, 0.03);
    text-align: center;
    box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.45);
    overflow: hidden;
  }
  /* Thin orange accent at the top — signals "this is the offer" so
     the pricing card reads distinct from other cards on the page. */
  .pricing-card-classic::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 92, 46, 0) 0%,
      rgba(255, 92, 46, 0.85) 50%,
      rgba(255, 92, 46, 0) 100%
    );
  }
  .pcc-eyebrow {
    display: inline-block;
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #FF5C2E;
    margin-bottom: 28px;
  }
  .pcc-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .pcc-strike {
    font-family: 'Outfit', sans-serif;
    font-size: 22px;
    font-weight: 500;
    color: rgba(232, 232, 230, 0.45);
    text-decoration: line-through;
    text-decoration-thickness: 1.5px;
    line-height: 1.2;
  }
  .pcc-free {
    font-family: 'Sora', sans-serif;
    font-size: clamp(56px, 7vw, 80px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    color: var(--text);
  }
  .pcc-sub {
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.55;
    color: rgba(232, 232, 230, 0.78);
    margin: 14px auto 0;
    max-width: 42ch;
  }
  .pcc-keep {
    font-family: 'Outfit', sans-serif;
    font-size: 14.5px;
    font-weight: 600;
    color: rgba(232, 232, 230, 0.90);
    margin: 14px auto 0;
    letter-spacing: 0.01em;
  }
  .pcc-list-title {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(232, 232, 230, 0.62);
    text-align: center;
    margin: 0 auto 22px;
  }

  .pcc-divider {
    height: 0;
    border: 0;
    border-top: 1px solid rgba(232, 232, 230, 0.10);
    margin: 32px 0;
  }

  .pcc-list {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    text-align: left;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .pcc-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(232, 232, 230, 0.82);
  }
  .pcc-list li svg {
    color: #FF5C2E;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .pcc-list li strong { color: var(--text); font-weight: 600; }

  .pcc-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #E8420D;
    color: #fff;
    padding: 16px 32px;
    border-radius: 999px;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 17px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    width: auto;
    align-self: center;
  }
  .pcc-cta:hover { background: #FF5C2E; transform: translateY(-1px); }
  .pcc-cta span { transition: transform 0.2s; }
  .pcc-cta:hover span { transform: translateX(3px); }

  .pcc-fine {
    margin: 16px auto 0;
    font-family: 'Outfit', sans-serif;
    font-size: 12.5px;
    color: rgba(232, 232, 230, 0.55);
    max-width: 42ch;
    text-align: center;
  }

  /* Classic single-card is the live pricing layout. Hide the older
     2-col split-screen .pricing-card markup that still ships in the
     page (kept around as legacy; can be removed later). */
  .lp-root .pricing-card,
  .lp-root.is-figma-type .pricing-card { display: none !important; }

  @media (max-width: 720px) {
    .pricing-card-classic { padding: 36px 24px 32px; }
    .pcc-cta { width: 100%; padding: 16px 24px; }
  }
`
