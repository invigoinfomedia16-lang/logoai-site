# Logo.AI — Design System

Single source of truth for the `/prelaunch` design. Use this before adding new sections, components, or styles so the page stays uniform.

The canonical CSS lives in the **FINAL CASCADE GUARD** block at the bottom of [`app/prelaunch/page.tsx`](app/prelaunch/page.tsx) STYLES. That block is loaded last so its rules win the cascade. If a new rule needs to override anything, add it AFTER the guard, not before.

---

## Type system

Two faces:
- **Sora** (display) — used for H1, H2, H3, card titles, testimonial quotes
- **Outfit** (body) — used for lede, body, card body, eyebrows, captions, UI labels

Plus **Sarpanch 900** for the nav wordmark only (loaded by `MLpNav` on mount).

### Tier table

| Tier | Spec | Used by |
|---|---|---|
| **H1** (hero) | Sora 800 / large | Hero headline only |
| **H2** (section) | Sora 700 / `clamp(30px, 4.6vw, 44px)` / `-0.022em` | Every section headline |
| **H3** (sub-display) | Sora 700 / 24px / `-0.018em` | Use-case group title |
| **Pull-quote** | Sora 600 / `clamp(16px, 1.4vw, 18px)` / 88% white | Testimonial blockquote |
| **H4** (card title) | Sora 700 / 16px / `-0.01em` | Blog card title |
| **Step title** | Sora 700 / 18px / `-0.01em` | How It Works step title |
| **Row title** | Outfit 700 / 15px | Use-case sub-item title |
| **Cite name** | Sora 600 / 14px / 100% white | Testimonial author name |
| **Lede** | Outfit 400 / 18px / 1.55 / 72% white / max 56ch | Every section lede |
| **Body** | Outfit 400 / 15px / 1.55 / 70% white | How It Works step description |
| **Card body** | Outfit 400 / 14.5px / 1.55 / 65% white | Blog card body, testimonial body |
| **Row description** | Outfit 400 / 13.5px / 1.55 / 62% white | Use-case sub-item description |
| **Cite role** | Outfit 400 / 13.5px / 55% white | Testimonial role/location |
| **Eyebrow** | Outfit 700 / 11px / `0.18em` uppercase / accent | Every section eyebrow |

### Type rules

- H1 is the only place big display type lives. Every other H2 is the section ceiling.
- One serif moment is reserved for the wordmark (Sarpanch 900). Body is Sora + Outfit only.
- Eyebrows are LABELS, not claims. "Brand Identity" — yes. "World's best AI logo generator" — no.
- Pull-quotes are bigger than card titles because they ARE the content.
- Row titles use Outfit (not Sora) because they're compact list-row labels paired with icons.

---

## Color system

Dark theme on `#0e0e0f` background.

### Text opacity ladder

| Token | Color | Used by |
|---|---|---|
| `--text` | `#E8E8E6` (100%) | Headlines, card titles, cite name |
| 90% | `rgba(232,232,230,0.90)` | Pricing "100% yours to keep" promise line |
| 88% | `rgba(232,232,230,0.88)` | Testimonial quote |
| 72% | `rgba(232,232,230,0.72)` | Lede |
| 70% | `rgba(232,232,230,0.70)` | Body (step description) |
| 65% | `rgba(232,232,230,0.65)` | Card body |
| 62% | `rgba(232,232,230,0.62)` | Row description |
| 55% | `rgba(232,232,230,0.55)` | Caption (cite role, fine print) |

### Accent — orange only

- `--accent: #FF5C2E` — eyebrows, primary CTAs, icon tints, hover borders
- `--accent-deep: #E8420D` — CTA buttons (base), pricing CTA
- `rgba(255,92,46,0.32)` — card hover border
- `rgba(255,92,46,0.08)` — use-case icon background tint

**Restraint rule.** The accent does **two jobs only**: section eyebrows + primary CTAs. The pricing card gets one extra accent (a thin top-border gradient line) because it's the conversion moment. Everything else — counter numbers, body text, footnotes — is neutral.

---

## Spacing system

8px grid. All values divisible by 4 unless there's a real reason not to be.

| Token | Value | Used for |
|---|---|---|
| **Section padding** | `90px 0` (mobile `64px 0`) | Every section, including hero |
| **Sec-head margin** | `56px` below | Space between eyebrow/H2/lede and section content |
| **Hero element gaps** | 32px between hero pieces | Eyebrow → H1, H1 → lede |
| **Hero grid** | `margin-top: 72px; gap: 64px` (mobile 56/40) | Hero form column gap |
| **Card grid gap** | `24px` | Use cases, testimonials, blog grids |
| **Card padding (dense)** | `40px 36px` (mobile `32px 24px`) | Use-case group cards, testimonials |
| **Card padding (image)** | `22px 22px 24px` | Blog card body (image carries the visual weight) |
| **Final CTA padding** | `90px 0` (matches section rhythm) | The closing-moment block |

---

## Card chrome

Every bordered card uses the same shell so the page reads as one system.

```
background:    rgba(232, 232, 230, 0.03)
border:        1px solid rgba(232, 232, 230, 0.10)
border-radius: 16px
hover-border:  rgba(255, 92, 46, 0.32)
transition:    border-color 200ms
```

Applied to: `.uc-group`, `.testimonial`, `.blog-card`.

The pricing card (`MLpPricingClassic`) gets a custom shell because it's the conversion moment — thicker orange border, soft radial wash, and a top-edge accent gradient line.

---

## Layout patterns

| Section | Layout |
|---|---|
| **Hero** | Vertical stack: urgency pill → eyebrow → H1 → lede → form grid (asymmetric 1fr / 1.05fr). 90px section padding. |
| **Gallery, Mockups** | Sub-components (`MLpGallery`, `MLpMockups`) with their own internal type. Wider `.wrap` (1280px). |
| **How It Works** | 4 numbered steps in a row on desktop, 2-col on tablet, 1-col on mobile. **No dashed connectors below 880px** — the numbers + stacking convey sequence. |
| **Use Cases** | 3-col category-card grid. Viewport breakout (`calc(100vw - 40px)` / `max-width: 1400px`) so cards have room to breathe. Each group is a card; sub-items are rows of icon + title + description. |
| **Testimonials** | 2-col bordered cards. **No featured pull-quote** — every testimonial is a peer. Stars at top, Sora 600 quote dominant, cite name + role pinned to bottom. |
| **Pricing** | Single centered card (`MLpPricingClassic`). Top orange accent line. Strike $49, big "Free", neutral promise line, divider, "WHAT YOU GET" label, benefits list with check icons, divider, CTA, fine print. |
| **FAQ** | 1-col, 820px max-width. Each question is its own editorial row. |
| **Blog** | 3-col equal grid. Image on top, body below. Hides cards 4+. |
| **Final CTA** | Centered card stack. H2 matches section H2 spec (`clamp(30, 4.6vw, 44)`). |

---

## Animation

Reveal-on-scroll via `MLpRevealOnScroll`. The component finds target elements (`.sec-head`, hero pieces, cards, steps, etc.), adds `.lp-reveal` to set the initial hidden state, then swaps in `.is-in-view` when the element enters the viewport.

| Spec | Value |
|---|---|
| Initial offset | `translateY(40px)` |
| Initial opacity | `0` |
| Duration | `800ms` |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out) |
| Stagger between siblings | `90ms` (caps at 4 children) |
| Reduced-motion | Respected — all motion disabled if user prefers reduced motion |

**What we don't do:** parallax, scroll-jacking, letter-by-letter text reveals, bouncy easings, page-load splash screens. Quiet motion only.

---

## Adding new sections — checklist

1. **Padding**: 90px top + bottom. No exceptions unless documented here.
2. **Section head**: Eyebrow → H2 → lede, with 56px below the lede.
3. **Eyebrow**: 11px / 0.18em uppercase / orange. Use a LABEL, not a marketing claim.
4. **H2**: `clamp(30px, 4.6vw, 44px)` Sora 700. No custom sizes.
5. **Lede**: 18px Outfit / 72% white / 56ch max. One short sentence.
6. **Cards** (if any): use the canonical chrome (16px radius, 0.03 bg, 0.10 border).
7. **Card titles**: Sora 700 / 16px (or row-title Outfit 700 / 15px if it's a compact list).
8. **Card body**: Outfit 14.5px / 65% white.
9. **Accent**: only on eyebrow + CTA. Everything else neutral.
10. **Add to reveal targets**: if the new section has section-head or card group, add the selectors to `TARGETS` in [`MLpRevealOnScroll.tsx`](app/prelaunch/_components/MLpRevealOnScroll.tsx).

---

## Where things live

| Concern | File |
|---|---|
| Live design CSS (canonical) | [`app/prelaunch/page.tsx`](app/prelaunch/page.tsx) — **FINAL CASCADE GUARD** block at bottom of STYLES |
| Nav + wordmark + font loading | [`app/prelaunch/_components/MLpNav.tsx`](app/prelaunch/_components/MLpNav.tsx) |
| Header wordmark classes | [`app/prelaunch/_components/MHeader.tsx`](app/prelaunch/_components/MHeader.tsx) (`.mlp-wordmark-text`, `.mlp-wordmark-dot`) |
| Pricing card | [`app/prelaunch/_components/MLpPricingClassic.tsx`](app/prelaunch/_components/MLpPricingClassic.tsx) (self-contained STYLES) |
| Use cases | [`app/prelaunch/_components/MLpUseCases.tsx`](app/prelaunch/_components/MLpUseCases.tsx) |
| Scroll reveal | [`app/prelaunch/_components/MLpRevealOnScroll.tsx`](app/prelaunch/_components/MLpRevealOnScroll.tsx) |
| Sticky CTA | [`app/prelaunch/_components/MLpStickyCTA.tsx`](app/prelaunch/_components/MLpStickyCTA.tsx) |
| Theme tokens (`--text`, `--bg`, `--accent`) | [`app/prelaunch/_components/MLpNavStyles.ts`](app/prelaunch/_components/MLpNavStyles.ts) |

---

## What this doc is NOT

This is a **project-specific** design system for Logo.AI's `/prelaunch` page. The generic web-design principles (8px grid, modular type, anti-AI-slop rules) live in [`.claude/skills/web-design-pro/`](.claude/skills/web-design-pro/) and are reusable across projects. Don't merge the two — they serve different scopes.
