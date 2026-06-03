# Prelaunch site

The live prelaunch page lives in this folder. Production URL:
**https://logoai-site-lac.vercel.app/prelaunch**

## What's here

| Path | What it is |
|---|---|
| `page.tsx` | The main `/prelaunch` landing page (long file — section-by-section content + page-specific CSS in a STYLES string at the bottom). |
| `layout.tsx` | Thin layout wrapper — no shared chrome here; the chrome comes from `MLpSubpageShell` on every subpage and from the main `page.tsx` for the landing. |
| `_components/` | Every UI component the prelaunch site uses (all prefixed `MLp*`). |
| `about/`, `faq/`, `gallery/`, `how-it-works/`, `our-story/`, `who-its-for/` | Subpages. Most are minimal placeholders today; `our-story/` is a full editorial layout. |

## Design system primer

**Three rules to internalise before editing:**

### 1. Use `<MLpSubpageShell>` on every subpage

It wraps the page in the shared chrome — nav, footer, sticky CTA, theme tokens, layout primitives, typography, mobile breakpoints. Never render `<MLpNav>`, `<MLpFooter>`, or `<MLpStickyCTA>` directly.

```tsx
import MLpSubpageShell from '../_components/MLpSubpageShell'

export default function MyPage() {
  return (
    <MLpSubpageShell>
      <main>{/* sections go here */}</main>
    </MLpSubpageShell>
  )
}
```

### 2. Every section follows the same pattern

```tsx
<section>
  <div className="wrap">
    <div className="sec-head">
      <span className="eyebrow">Short tag</span>
      <h2>Section name</h2>
      <p className="lede">Descriptive sentence.</p>
    </div>
    {/* section body */}
  </div>
</section>
```

- `eyebrow` = short tag (a category, a number, "01", "About")
- `h2` = the section's **name**
- `lede` = the descriptive sentence under it
- body content follows

Section padding (100px top/bottom, 64px on mobile) is automatic.

### 3. Single sources of truth — don't duplicate

| Concern | Lives in |
|---|---|
| Theme tokens (`--bg`, `--accent`, etc.) | `_components/MLpNavStyles.ts` |
| Nav, dropdown, mobile panel, hamburger | `_components/MLpNavStyles.ts` |
| Footer structure + typography | `_components/MLpNavStyles.ts` |
| Section primitives (`.wrap`, `.sec-head`, `.eyebrow`, h1/h2/h3, `.lede`, `p`) | `_components/MLpNavStyles.ts` |
| Email form (`.email-form` input/button) | `_components/MLpEmailForm.tsx` |
| Live counter + progress bar | `_components/MLpHeroCounter.tsx` |
| Countdown badge | `_components/MLpCountdownBadge.tsx` |

**Never redefine any of the above in `page.tsx` or a subpage.** A change in the source-of-truth file flows automatically to every page.

The top of `_components/MLpSubpageShell.tsx` has a full 9-section rules block — read it before building anything new.

## Typography

| Use | Family | Weight |
|---|---|---|
| Display (h1, h2, h3) | Sora | 700 / 800 |
| Body, lede, eyebrow | Outfit | 400 / 500 / 600 / 700 |

Two families, that's it. No DM Serif Display italic anywhere (that was a legacy editorial style; it's been removed).

## Colours

| Token | Value |
|---|---|
| `--bg` | `#09090b` (near-black page) |
| `--text` | `#f4f4f6` (off-white) |
| `--text-2` | `#b8b8c4` (muted) |
| `--text-3` | `#7e7e8c` (more muted) |
| `--accent` | `#FF5C2E` (orange) |
| `--accent-deep` | `#E8420D` (deep orange, primary CTAs) |
| `--line` | `rgba(232, 232, 230, 0.10)` (hairlines) |

All hover states across the site land on `var(--accent)`.

## Components — at a glance

- `MLpNav.tsx` — top nav. Desktop horizontal, mobile hamburger with accordion dropdowns. Reads NAV_ITEMS + DROPDOWNS arrays inside the file.
- `MLpFooter.tsx` — footer. Reads FOOTER_COLUMNS array inside.
- `MLpStickyCTA.tsx` — pinned-to-bottom CTA bar on mobile only (hidden above 767px).
- `MLpSubpageShell.tsx` — the shell every subpage wraps with.
- `MLpEmailForm.tsx` — email capture form. Variants: `hero` (in the landing hero) and `final` (in any Final CTA block). Submit state is shared across instances via `useEmailSignup` (so submitting on the hero also flips the Final CTA into the success state).
- `MLpHeroCounter.tsx` — live counter line + progress bar + tagline. Reads `getLogosClaimed()` / `getLogosRemaining()` from `/data/index.ts` via `useLiveCounter`.
- `MLpCountdownBadge.tsx` — live D:H:M countdown to `LAUNCH_DATE` (Aug 1 2026, defined in `/data/index.ts`).
- `MLpGallery.tsx`, `MLpMockups.tsx`, `MLpUseCases.tsx` — the three big interactive sections on the landing page.
- `MLpLogo.tsx` — the wordmark (Montserrat 900 with a small orange dot).
- `MLpPlaceholder.tsx` — "Coming Soon" body used by placeholder subpages.

## Email capture — NOT wired to a backend

`MLpEmailForm` collects email into `sessionStorage` only. Nothing is sent. Replace the body of `onSubmit` in `MLpEmailForm.tsx` to wire a real waitlist (Resend / Mailchimp / Supabase / whatever).

## What lives outside this folder

- `app/launch/` — the **post-launch product site** (different from prelaunch). Ignore unless asked.
- `app/page.tsx` — the site-root page; redirects `/` → `/prelaunch`.
- `app/icon.svg` — the favicon (orange "L" mark).
- `app/globals.css` — global CSS + Tailwind base layers. Affects everything.
- `data/index.ts` — `LAUNCH_DATE`, `CATEGORIES`, `getLogosClaimed()`, `getLogosRemaining()`. Read by the prelaunch site.
- `public/` — static images served by Next.

## Mobile

Mobile breakpoints are baked into the shared CSS:

- `<= 880px` — nav links shrink slightly
- `<= 767px` — desktop nav hides, hamburger appears, mobile sticky CTA appears
- `<= 720px` — section padding shrinks from 100px to 64px; H2s scale down; footer cols collapse 4 → 2
- `<= 560px` — email form stacks vertically
- `<= 520px` — footer cols collapse 2 → 1
- `<= 480px` — typography clamps tighten further

No per-page mobile CSS should be needed for these patterns. Only add @media rules for genuinely page-specific things (custom grids, hero-only treatments).

## Running it

```
npm install
npm run dev          # http://localhost:3100
npm run build        # production build (verify before pushing)
```

Vercel auto-deploys every push to `main`.
