'use client'

// Onboarding — Design N. Follows the LogoOnboarding mock (Downloads/
// onboarding.jsx) structure:
//   Step 1  Business Name      — text input + optional case styling
//   Step 2  Description        — pick from 10 AI suggestions (1-select)
//   Step 3  Services           — pick exactly 3 from 12 (multi)
//   Step 4  Tagline            — pick from 10 AI taglines (1-select, skippable)
//   Step 5  Impression         — pick exactly 3 from 18 chips
//   Step 6  Colors             — palette picker (5 palettes, named swatches)
//   Step 7  Logo Type          — radio with popularity %
//   ⤳ Brand Brief              — summary card → "Generate Logo Prompts"
//   ⤳ Generating               — spinner + rotating phase text
//   ⤳ Results                  — 10 watermarked previews; tap a card to
//                                open the S1-style checkout for that logo.
// Visuals adapted to design-n's terracotta light theme — no dark bg, no
// blue gradient. Eyebrows use uppercase + tracking on Open Sans instead of
// Space Mono so the page stays inside design-n's two-font system.

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import NCheckoutModal from '../_components/NCheckoutModal'
import { useLiveSuggestions, isString, isPalette, isStyle, type PaletteShape, type StyleShape } from './useLiveSuggestions'

// Module-level mirror of the latest live-AI lists for the grid steps. The
// AI-pick handlers in aiInfoForStep() live in the parent (LogoOnboarding)
// but the useLiveSuggestions hooks fire inside FormSteps — so this ref is
// the simplest bridge to make AI-picked values come from the SAME list that
// the grid renders. FormSteps writes via useEffect; aiInfoForStep reads.
const liveListsRef: {
  impressions: string[]
  palettes: PaletteShape[]
  styles: StyleShape[]
} = {
  impressions: [],
  palettes: [],
  styles: [],
}
import { INDUSTRIES, INDUSTRIES_VISIBLE } from './data/industries'
import { SUGGESTIONS_BY_INDUSTRY, DESCRIPTIONS } from './data/suggestions'
import { SERVICES_BY_INDUSTRY, SERVICES } from './data/services'
import { TAGLINES_BY_INDUSTRY, TAGLINES } from './data/taglines'
import { IMPRESSIONS } from './data/impressions'
import type { Palette } from './data/palettes'
import { PALETTES } from './data/palettes'
import { LOGO_TYPES, STYLE_ICONS } from './data/logoTypes'
import { GEN_PHASES } from './data/genPhases'
import { LOGO_PRICE, PREVIEW_COUNT, PREVIEW_LOGOS, RESERVATION_MINUTES } from './data/constants'

/* ------------------------------------------------------------------ */
/* data — verbatim from the mock                                       */
/* ------------------------------------------------------------------ */

// 7-step flow — dropped "Services / Offerings" (was step 4). Reason: doesn't
// meaningfully affect logo art (an offerings list barely influences the logo
// design), competitors (Looka, Tailor Brands, Logo.com, LogoAI, Hatchful)
// don't ask for it. The `services` state on the page is now dead-but-harmless;
// downstream code reads an empty array.
const STEPS = [
  { num: 1, label: 'Business Name', icon: '✦' },
  { num: 2, label: 'Industry',      icon: '◈' },
  { num: 3, label: 'Description',   icon: '◈' },
  { num: 4, label: 'Tagline',       icon: '❝' },
  { num: 5, label: 'Impression',    icon: '◉' },
  { num: 6, label: 'Colors',        icon: '◐' },
  { num: 7, label: 'Logo Type',     icon: '△' },
]
const TOTAL_STEPS = STEPS.length

const NAME_STYLES = ['all lowercase', 'Title Case', 'ALL CAPS', 'camelCase']

/* ------------------------------------------------------------------ */
/* tokens used widely below                                            */
/* ------------------------------------------------------------------ */

const monoLabel: CSSProperties = {
  fontFamily: 'var(--m-font-sans), sans-serif',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--m-brand-strong)',
}

const stepEyebrow: CSSProperties = {
  fontFamily: 'var(--m-font-sans), sans-serif',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--m-brand)',
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

type Phase = 'form' | 'brief' | 'auth' | 'generating' | 'results'

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

export default function LogoOnboarding() {
  const [phase, setPhase] = useState<Phase>('form')
  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)

  // Mock-style form state, full 7 steps.
  const [brandName, setBrandName] = useState('')
  const [nameStyle, setNameStyle] = useState('')
  // industry = the broad-category key (e.g. 'restaurant') used to gate
  // downstream static-fallback lookups (SUGGESTIONS_BY_INDUSTRY etc).
  // industryLabel = the exact niche label the user picked (e.g. 'Chinese
  // restaurant'). Many INDUSTRIES entries share a key but each has a unique
  // label; we store the label separately so the input displays the user's
  // actual choice and the AI gets niche-specific context.
  const [industry, setIndustry] = useState<string | null>(null)
  const [industryLabel, setIndustryLabel] = useState<string>('')
  const [description, setDescription] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [tagline, setTagline] = useState('')
  const [impressions, setImpressions] = useState<string[]>([])
  const [paletteIndex, setPaletteIndex] = useState<number | null>(null)
  const [logoTypeIndex, setLogoTypeIndex] = useState<number | null>(null)
  // Trigger flags — true once the user has interacted with the description /
  // tagline step (focus or AI-pick). Controls when the API fires and when
  // suggestion rows become visible. Lives at the page level so both the
  // FormSteps (focus) and the footer AI-pick handler can flip them.
  const [descTriggered, setDescTriggered] = useState(false)
  const [taglineTriggered, setTaglineTriggered] = useState(false)
  const [email, setEmail] = useState('')

  // Generating screen — rotating phase text, auto-advances.
  const [genLine, setGenLine] = useState(0)
  useEffect(() => {
    if (phase !== 'generating') return
    setGenLine(0)
    const tick = setInterval(
      () => setGenLine((l) => Math.min(l + 1, GEN_PHASES.length - 1)),
      650,
    )
    const done = setTimeout(() => setPhase('results'), 3400)
    return () => {
      clearInterval(tick)
      clearTimeout(done)
    }
  }, [phase])

  // Reservation timer — kicks in once results render.
  const [reservedAt, setReservedAt] = useState<number | null>(null)
  const [now, setNow] = useState<number>(() => Date.now())
  useEffect(() => {
    if (phase !== 'results') return
    if (reservedAt === null) setReservedAt(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [phase, reservedAt])
  const msLeft = reservedAt ? Math.max(0, reservedAt + RESERVATION_MINUTES * 60_000 - now) : RESERVATION_MINUTES * 60_000
  const mLeft = Math.floor(msLeft / 60_000)
  const sLeft = Math.floor((msLeft % 60_000) / 1000)
  const timerTone: 'normal' | 'warn' | 'critical' = msLeft <= 60_000 ? 'critical' : msLeft <= 5 * 60_000 ? 'warn' : 'normal'

  // Per-card unlock state (mock checkout).
  const [unlocked, setUnlocked] = useState<boolean[]>(() => Array(PREVIEW_COUNT).fill(false))
  const [checkoutFor, setCheckoutFor] = useState<number | null>(null)


  const palette = useMemo(
    () => (paletteIndex !== null ? PALETTES[paletteIndex] : null),
    [paletteIndex],
  )

  // `brand` is used in onboarding copy ("What does Rose offer?"). The
  // logo artwork respects nameStyle/casing; copy always title-cases the
  // first letter so we never address the user with "what does rose…".
  const brand = (() => {
    const raw = brandName.trim()
    if (!raw) return 'your brand'
    return raw.charAt(0).toUpperCase() + raw.slice(1)
  })()
  const formattedBrand = applyCase(brandName.trim() || 'Your Brand', nameStyle)

  /* nav */

  function canProceed() {
    if (step === 1) return brandName.trim().length > 0
    if (step === 2) return industry !== null
    if (step === 3) return description.length > 0
    // Step 4 — Tagline. User must either type one or click "Let AI pick a
    // tagline" (one click fills it). This keeps the AI-button footer pattern
    // consistent across all AI-suggestion steps.
    if (step === 4) return tagline.length > 0
    if (step === 5) return impressions.length === 3
    if (step === 6) return paletteIndex !== null
    // Step 7 — requires a style pick (or AI pick fills it). Footer shows
    // "Let AI pick the style" when nothing picked, "Generate my logos" once.
    if (step === 7) return logoTypeIndex !== null
    return false
  }

  // Per-step "Let AI pick" handler. Returns null when the step requires
  // genuine user input (1: Name, 2: Industry) — those have no AI fallback.
  // Otherwise: filling defaults flips canProceed to true and the footer
  // swaps from the AI button to Continue automatically.
  function aiInfoForStep(): { onPick: () => void; label: string } | null {
    if (step === 3) {
      const pool = industry ? SUGGESTIONS_BY_INDUSTRY[industry] ?? DESCRIPTIONS : DESCRIPTIONS
      return {
        onPick: () => {
          // Flip trigger so the rows + live AI call fire too.
          setDescTriggered(true)
          if (pool.length === 0) return
          setDescription(pool[Math.floor(Math.random() * pool.length)])
        },
        label: 'Let AI pick a description',
      }
    }
    if (step === 4) {
      const pool = industry ? TAGLINES_BY_INDUSTRY[industry] ?? TAGLINES : TAGLINES
      return {
        onPick: () => {
          setTaglineTriggered(true)
          if (pool.length === 0) return
          setTagline(pool[Math.floor(Math.random() * pool.length)])
        },
        label: 'Let AI pick a tagline',
      }
    }
    if (step === 5) {
      return {
        onPick: () => {
          // Pick from the SAME list the grid is rendering (live AI or static
          // fallback). Otherwise the picked words wouldn't appear selected.
          const pool = liveListsRef.impressions.length > 0 ? liveListsRef.impressions : IMPRESSIONS
          const shuffled = [...pool].sort(() => Math.random() - 0.5)
          setImpressions(shuffled.slice(0, 3))
        },
        label: 'Let AI pick 3 words',
      }
    }
    if (step === 6) {
      return {
        onPick: () => {
          const pool = liveListsRef.palettes.length > 0 ? liveListsRef.palettes : PALETTES
          setPaletteIndex(Math.floor(Math.random() * pool.length))
        },
        label: 'Let AI pick a palette',
      }
    }
    if (step === 7) {
      return {
        onPick: () => {
          // Pick the most popular style (first in the live ordering — AI
          // returns them sorted descending by popularity %).
          setLogoTypeIndex(0)
        },
        label: 'Let AI pick the style',
      }
    }
    return null
  }

  function transitionTo(fn: () => void) {
    setAnimating(true)
    setTimeout(() => {
      fn()
      setAnimating(false)
    }, 280)
  }

  function goNext() {
    if (step < TOTAL_STEPS) {
      transitionTo(() => setStep((s) => s + 1))
    } else {
      // S1 flow — no brief review screen between Step 8 and auth.
      // If the user didn't pick a style, default to Wordmark (most popular).
      if (logoTypeIndex === null) setLogoTypeIndex(0)
      transitionTo(() => setPhase('auth'))
    }
  }

  function goBack() {
    if (phase === 'auth') {
      transitionTo(() => setPhase('form'))
    } else if (step > 1) {
      transitionTo(() => setStep((s) => s - 1))
    }
  }

  function authContinue() {
    // Mock auth — real version would round-trip Google SSO or magic-link.
    transitionTo(() => setPhase('generating'))
  }

  function toggleService(s: string) {
    setServices((cur) =>
      cur.includes(s)
        ? cur.filter((x) => x !== s)
        : cur.length < 3
        ? [...cur, s]
        : cur,
    )
  }

  function toggleImpression(w: string) {
    setImpressions((cur) =>
      cur.includes(w)
        ? cur.filter((x) => x !== w)
        : cur.length < 3
        ? [...cur, w]
        : cur,
    )
  }

  const progress =
    phase === 'brief' || phase === 'auth' || phase === 'generating' || phase === 'results'
      ? 100
      : ((step - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div style={{ minHeight: '100vh', background: 'var(--m-brand-bg)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes nStartFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes nStartSpin { to { transform: rotate(360deg); } }
        @keyframes nPreviewStream { from { opacity: 0; transform: translateY(10px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes nDrawerSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes nDrawerSlideMobile { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .n-start-input:focus { border-color: var(--m-brand) !important; box-shadow: 0 0 0 3px var(--m-brand-soft); }
        .n-start-input::placeholder { color: var(--m-text-soft); opacity: 1; font-style: italic; transition: color 0.4s ease; }
        .n-start-input:focus::placeholder { color: var(--m-text-muted); }
        .n-preview-card { transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease; }
        .n-preview-card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(0,0,0,0.14); border-color: var(--m-brand) !important; }
        .n-preview-stream { opacity: 0; animation: nPreviewStream 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .n-preview-stream { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ───────────── header — S1 layout ─────────────
          Row 1: centered wordmark (with close × top-right)
          Row 2: progress bar (dark INK fill, not the CTA colour)
          Row 3: ← Back left  •  step circle right */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--m-surface)',
          borderBottom: '1px solid var(--m-border)',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '18px 24px 14px' }}>
          {/* Row 1 — centered wordmark */}
          <div className="relative flex items-center justify-center">
            <a href="/design-n" className="inline-flex items-center" aria-label="Logo.AI home" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'var(--m-font-wordmark), serif',
                  fontSize: 24,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: 'var(--m-ink)',
                }}
              >
                LOGO<span style={{ color: 'var(--m-brand)' }}>.</span>AI
              </span>
            </a>
            <a
              href="/design-n"
              aria-label="Exit onboarding"
              className="absolute"
              style={{
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--m-text-soft)',
                textDecoration: 'none',
                fontSize: 22,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </a>
          </div>

          {/* Row 2 — progress bar (dark, not the CTA colour) */}
          {phase !== 'results' && (
            <div
              style={{
                height: 6,
                background: 'var(--m-surface-alt)',
                borderRadius: 9999,
                overflow: 'hidden',
                marginTop: 16,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  borderRadius: 9999,
                  background: 'var(--m-ink)',
                  transition: 'width 0.55s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </div>
          )}

          {/* Row 3 — Back link on the left, step-number circle on the right */}
          {phase !== 'results' && (
            <div
              className="flex items-center justify-between"
              style={{ marginTop: 14, minHeight: 28 }}
            >
              {((phase === 'form' && step > 1) || phase === 'brief' || phase === 'auth') ? (
                <button
                  type="button"
                  onClick={goBack}
                  aria-label="Go back"
                  className="m-sans inline-flex items-center"
                  style={{
                    gap: 6,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--m-text-soft)',
                    fontSize: 14,
                    fontWeight: 500,
                    padding: 0,
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--m-ink)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--m-text-soft)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Back</span>
                </button>
              ) : (
                <span />
              )}

              {phase === 'form' && (
                <span
                  className="m-display inline-flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--m-brand)',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                  aria-label={`Step ${step} of ${TOTAL_STEPS}`}
                >
                  {step}
                </span>
              )}
            </div>
          )}

          {/* No urgency timer on results — previews don't actually expire,
              users can regenerate freely. Manufactured urgency would feel
              cheap and contradict the "unlimited generations" promise. */}
        </div>
      </header>

      {/* ───────────── content ───────────── */}
      <main
        style={{
          flex: 1,
          maxWidth: 720,
          width: '100%',
          margin: '0 auto',
          padding: phase === 'results' ? '32px 16px 120px' : '72px 24px 140px',
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 0.28s cubic-bezier(0.22,1,0.36,1), transform 0.28s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {phase === 'form' && (
          <FormSteps
            step={step}
            brand={brand}
            brandName={brandName}
            setBrandName={setBrandName}
            nameStyle={nameStyle}
            setNameStyle={setNameStyle}
            industry={industry}
            setIndustry={setIndustry}
            industryLabel={industryLabel}
            setIndustryLabel={setIndustryLabel}
            descTriggered={descTriggered}
            setDescTriggered={setDescTriggered}
            taglineTriggered={taglineTriggered}
            setTaglineTriggered={setTaglineTriggered}
            description={description}
            setDescription={setDescription}
            services={services}
            toggleService={toggleService}
            setServices={setServices}
            tagline={tagline}
            setTagline={setTagline}
            onSkipTagline={() => transitionTo(() => { setTagline(''); setStep((s) => s + 1) })}
            impressions={impressions}
            toggleImpression={toggleImpression}
            setImpressions={setImpressions}
            paletteIndex={paletteIndex}
            setPaletteIndex={setPaletteIndex}
            logoTypeIndex={logoTypeIndex}
            setLogoTypeIndex={setLogoTypeIndex}
          />
        )}

        {phase === 'brief' && (
          <BrandBrief
            brand={formattedBrand}
            description={description}
            services={services}
            tagline={tagline}
            impressions={impressions}
            palette={palette}
            logoType={logoTypeIndex !== null ? LOGO_TYPES[logoTypeIndex] : null}
            onGenerate={() => transitionTo(() => setPhase('auth'))}
          />
        )}

        {phase === 'auth' && (
          <AuthWall
            email={email}
            onEmailChange={setEmail}
            onContinue={authContinue}
            /* Back lives in the page header now, no inline back inside AuthWall. */
          />
        )}

        {phase === 'generating' && (
          <Generating brand={formattedBrand} line={GEN_PHASES[genLine]} />
        )}

        {phase === 'results' && (
          <Results
            brandName={brandName}
            tagline={tagline}
            palette={palette}
            logoTypeIndex={logoTypeIndex}
            unlocked={unlocked}
            onTap={(i) => {
              if (unlocked[i]) {
                window.alert('Mock: downloading HD pack for logo #' + (i + 1))
              } else {
                setCheckoutFor(i)
              }
            }}
            onStartOver={() => {
              setPhase('form')
              setStep(1)
            }}
          />
        )}
      </main>

      {/* ───────────── S1-style single-button sticky footer (form only).
          When the step isn't filled yet AND has an AI default, the slot
          shows the AI button; the moment the user picks/types, it flips
          to Continue. ───────────── */}
      {phase === 'form' && (() => {
        const ai = aiInfoForStep()
        return (
          <FooterNav
            onNext={goNext}
            canProceed={canProceed()}
            nextLabel={step === TOTAL_STEPS ? 'Generate my logos' : 'Continue'}
            aiPick={ai?.onPick}
            aiLabel={ai?.label}
          />
        )
      })()}

      {/* ───────────── checkout modal ───────────── */}
      <NCheckoutModal
        open={checkoutFor !== null}
        index={checkoutFor ?? 0}
        price={LOGO_PRICE}
        preview={
          checkoutFor !== null ? (
            <LogoArtwork
              variant={checkoutFor}
              brandName={brandName}
              tagline={tagline}
              palette={palette}
            />
          ) : null
        }
        onClose={() => setCheckoutFor(null)}
        onPaid={() => {
          setUnlocked((u) => {
            const next = u.slice()
            if (checkoutFor !== null) next[checkoutFor] = true
            return next
          })
          // Persist brand snapshot so the dashboard reflects the user's
          // actual brand (name, tagline, palette) instead of the sample.
          if (typeof window !== 'undefined') {
            try {
              const industryLabel =
                INDUSTRIES.find((i) => i.key === industry)?.label ?? ''
              const logoStyleName =
                logoTypeIndex !== null ? LOGO_TYPES[logoTypeIndex]?.name : ''
              window.localStorage.setItem(
                'logoai:brand',
                JSON.stringify({
                  name: formattedBrand,
                  tagline,
                  industry: industryLabel,
                  style: logoStyleName,
                  palette: palette?.colors ?? [],
                }),
              )
            } catch {
              /* localStorage unavailable — fall back to dashboard default */
            }
          }
        }}
      />

    </div>
  )
}

/* ------------------------------------------------------------------ */
/* form steps                                                          */
/* ------------------------------------------------------------------ */

type FormProps = {
  step: number
  brand: string
  brandName: string
  setBrandName: (v: string) => void
  nameStyle: string
  setNameStyle: (v: string) => void
  industry: string | null
  setIndustry: (v: string | null) => void
  industryLabel: string
  setIndustryLabel: (v: string) => void
  descTriggered: boolean
  setDescTriggered: (v: boolean) => void
  taglineTriggered: boolean
  setTaglineTriggered: (v: boolean) => void
  description: string
  setDescription: (v: string) => void
  services: string[]
  toggleService: (s: string) => void
  setServices: (v: string[]) => void
  tagline: string
  setTagline: (v: string) => void
  onSkipTagline: () => void
  impressions: string[]
  toggleImpression: (w: string) => void
  setImpressions: (v: string[]) => void
  paletteIndex: number | null
  setPaletteIndex: (i: number) => void
  logoTypeIndex: number | null
  setLogoTypeIndex: (i: number) => void
}

/* ------------------------------------------------------------------ */
/* IndustryCombobox — search + browse picker for step 2.               */
/* Empty + focused → dropdown shows the 8 most common industries.      */
/* Typing → dropdown filters to substring matches across all 25.       */
/* Pick → input fills with the industry label; small × clears.         */
/* ------------------------------------------------------------------ */

function IndustryCombobox({
  industry,
  setIndustry,
  industryLabel,
  setIndustryLabel,
}: {
  industry: string | null
  setIndustry: (k: string) => void
  industryLabel: string
  setIndustryLabel: (v: string) => void
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Filter list. Substring match across the full taxonomy (~560 entries).
  // Empty query → no dropdown items at all (type-to-find UX, matching
  // businessplan.ai). Placeholder + helper text guide the user instead of
  // a browse-all surface.
  // Dedupe by label so the dropdown never shows the same label twice (some
  // labels appear under multiple keys, e.g. "Career coaching" exists under
  // both 'consulting' and 'education'). First occurrence wins.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return [] as typeof INDUSTRIES
    const seen = new Set<string>()
    return INDUSTRIES.filter((ind) => {
      if (!ind.label.toLowerCase().includes(q)) return false
      if (seen.has(ind.label)) return false
      seen.add(ind.label)
      return true
    })
  }, [query])

  // Outside-click / Escape close the dropdown.
  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Display the niche label the user actually clicked (e.g. "Chinese
  // restaurant"), not the broad-category label (which would always be
  // the first INDUSTRIES entry sharing the key, i.e. "Restaurant").
  const inputValue = industry && !query ? industryLabel : query

  function commit(key: string, label: string) {
    setIndustry(key)
    setIndustryLabel(label)
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }
  function clear() {
    setIndustry('' as unknown as string) // resets state; gating handles null/''
    setIndustryLabel('')
    setQuery('')
    setOpen(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <div ref={wrapRef} className="relative">
      <label
        htmlFor="n-industry"
        className="m-sans block"
        style={{ fontSize: 12, color: 'var(--m-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}
      >
        Start typing — we&rsquo;ll suggest options
      </label>
      <div className="relative">
        <input
          id="n-industry"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            const v = e.target.value
            setQuery(v)
            // Typing while a value is committed → switch to "edit" mode.
            if (industry) {
              setIndustry('' as unknown as string)
              setIndustryLabel('')
            }
            // Open dropdown only once there is a query to match against —
            // empty input shows no list (placeholder/helper text guide).
            setOpen(v.trim().length > 0)
          }}
          onFocus={() => {
            // Only re-open the dropdown on focus if there's already a query
            // to filter against. Empty + focused stays clean.
            if (query.trim().length > 0) setOpen(true)
          }}
          placeholder="e.g. Italian restaurant"
          autoComplete="off"
          className="n-start-input m-sans w-full"
          style={{ ...textInputStyle, paddingRight: industry ? 40 : 16 }}
        />
        {industry && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear industry"
            className="absolute"
            style={{
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              color: 'var(--m-text-soft)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              lineHeight: 1,
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)'; (e.currentTarget as HTMLElement).style.color = 'var(--m-ink)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--m-text-soft)' }}
          >
            ×
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: 0,
            right: 0,
            marginTop: 6,
            maxHeight: 320,
            overflowY: 'auto',
            background: 'var(--m-surface)',
            border: '1px solid var(--m-border)',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
            padding: 6,
          }}
        >
          {filtered.map((ind) => {
              // Note: many entries share the same `key` (e.g. 30+ restaurant
              // niches all use key='restaurant'). React keys must be unique
              // per-list, so we use the label here — labels ARE unique across
              // the full INDUSTRIES taxonomy.
              const isSel = industry === ind.key && industryLabel === ind.label
              return (
                <button
                  key={ind.label}
                  type="button"
                  onClick={() => commit(ind.key, ind.label)}
                  className="m-sans w-full text-left"
                  style={{
                    display: 'block',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: isSel ? 'var(--m-brand-soft)' : 'transparent',
                    color: isSel ? 'var(--m-brand-strong)' : 'var(--m-ink)',
                    fontSize: 14,
                    fontWeight: isSel ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)' }}
                  onMouseLeave={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  {ind.label}
                </button>
              )
            })}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* DescriptionCombobox — same pattern as IndustryCombobox but for     */
/* free-text values. One input that you can type freely into OR pick   */
/* a suggestion from the dropdown. No separate textarea.               */
/* ------------------------------------------------------------------ */

function SuggestionCombobox({
  id,
  label,
  value,
  onChange,
  suggestions,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  suggestions: string[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const VISIBLE = 5
  const visibleSuggestions = showAll ? suggestions : suggestions.slice(0, VISIBLE)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <label
        htmlFor={id}
        className="m-sans block"
        style={{ fontSize: 12, color: 'var(--m-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}
      >
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          if (!open) setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        className="n-start-input m-sans w-full"
        style={textInputStyle}
      />

      {open && suggestions.length > 0 && (
        <div
          role="listbox"
          aria-label="Description suggestions"
          style={{
            position: 'absolute',
            zIndex: 10,
            left: 0,
            right: 0,
            marginTop: 6,
            maxHeight: 320,
            overflowY: 'auto',
            background: 'var(--m-surface)',
            border: '1px solid var(--m-border)',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
            padding: 6,
          }}
        >
          <p
            className="m-sans"
            style={{
              padding: '6px 12px 4px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--m-text-soft)',
            }}
          >
            Suggestions
          </p>
          {visibleSuggestions.map((s) => {
            const isSel = value === s
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onChange(s)
                  setOpen(false)
                  inputRef.current?.blur()
                }}
                className="m-sans w-full text-left"
                style={{
                  display: 'block',
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: isSel ? 'var(--m-brand-soft)' : 'transparent',
                  color: isSel ? 'var(--m-brand-strong)' : 'var(--m-ink)',
                  fontSize: 14,
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)' }}
                onMouseLeave={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {s}
              </button>
            )
          })}
          {suggestions.length > VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="m-sans w-full"
              style={{
                marginTop: 2,
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: 'var(--m-brand-strong)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {showAll ? 'Show fewer' : `Show ${suggestions.length - VISIBLE} more`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* ServicesCombobox — multi-select pick-3. Chip-input pattern: picked  */
/* services appear as removable chips above the input; the input opens */
/* a dropdown of suggestions to add from. Press Enter to commit a      */
/* typed-in custom service. Stops accepting input at the 3-limit.      */
/* ------------------------------------------------------------------ */

function ServicesCombobox({
  selected,
  onToggle,
  suggestions,
  max,
}: {
  selected: string[]
  onToggle: (s: string) => void
  suggestions: string[]
  max: number
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const VISIBLE = 5
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Dropdown shows suggestions that aren't already picked, optionally
  // filtered by the typed query.
  const remaining = useMemo(
    () => suggestions.filter((s) => !selected.includes(s)),
    [suggestions, selected],
  )
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return remaining
    return remaining.filter((s) => s.toLowerCase().includes(q))
  }, [query, remaining])
  const visibleFiltered = !query.trim() && !showAll
    ? filtered.slice(0, VISIBLE)
    : filtered

  const atMax = selected.length >= max

  function commit(service: string) {
    if (atMax) return
    if (selected.includes(service)) return
    onToggle(service)
    setQuery('')
  }
  function commitCustom() {
    const trimmed = query.trim()
    if (!trimmed || atMax || selected.includes(trimmed)) return
    onToggle(trimmed)
    setQuery('')
  }

  const allDone = selected.length === max

  return (
    <div ref={wrapRef} className="relative">
      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
        <label
          htmlFor="n-services"
          className="m-sans block"
          style={{ fontSize: 12, color: 'var(--m-text-soft)', fontWeight: 600, letterSpacing: '0.04em' }}
        >
          Pick {max} services
        </label>
        <span
          className="m-sans"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: allDone ? 'var(--m-success)' : 'var(--m-text-soft)',
          }}
        >
          {selected.length}/{max} selected
        </span>
      </div>

      {/* Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 10 }}>
          {selected.map((s) => (
            <span
              key={s}
              className="m-sans inline-flex items-center"
              style={{
                gap: 6,
                padding: '6px 4px 6px 10px',
                borderRadius: 9999,
                background: 'var(--m-brand-soft)',
                color: 'var(--m-brand-strong)',
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid var(--m-brand)',
              }}
            >
              <span>{s}</span>
              <button
                type="button"
                onClick={() => onToggle(s)}
                aria-label={`Remove ${s}`}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--m-brand-strong)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  lineHeight: 1,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(193,101,69,0.18)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <input
        id="n-services"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!open) setOpen(true)
        }}
        onFocus={() => { if (!atMax) setOpen(true) }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            commitCustom()
          }
        }}
        placeholder={
          atMax
            ? `${max} picked — remove one to add another`
            : 'Type to add a service, or pick from the list'
        }
        disabled={atMax}
        autoComplete="off"
        className="n-start-input m-sans w-full"
        style={{
          ...textInputStyle,
          opacity: atMax ? 0.65 : 1,
          cursor: atMax ? 'not-allowed' : 'text',
        }}
      />

      {/* Dropdown */}
      {open && !atMax && filtered.length > 0 && (
        <div
          role="listbox"
          aria-label="Service suggestions"
          style={{
            position: 'absolute',
            zIndex: 10,
            left: 0,
            right: 0,
            marginTop: 6,
            maxHeight: 320,
            overflowY: 'auto',
            background: 'var(--m-surface)',
            border: '1px solid var(--m-border)',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
            padding: 6,
          }}
        >
          <p
            className="m-sans"
            style={{
              padding: '6px 12px 4px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--m-text-soft)',
            }}
          >
            Suggestions
          </p>
          {visibleFiltered.map((s) => (
            <button
              key={s}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => commit(s)}
              className="m-sans w-full text-left"
              style={{
                display: 'block',
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: 'var(--m-ink)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.12s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {s}
            </button>
          ))}
          {!query.trim() && filtered.length > VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="m-sans w-full"
              style={{
                marginTop: 2,
                padding: '8px 12px',
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: 'var(--m-brand-strong)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {showAll ? 'Show fewer' : `Show ${filtered.length - VISIBLE} more`}
            </button>
          )}
          {query.trim() && !filtered.some((s) => s.toLowerCase() === query.trim().toLowerCase()) && (
            <button
              type="button"
              onClick={commitCustom}
              className="m-sans w-full text-left"
              style={{
                marginTop: 2,
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: 'var(--m-brand-strong)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Add &ldquo;{query.trim()}&rdquo; as a custom service
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// Subtle status line beneath Steps 3 & 4 comboboxes. Shows
// "Generating tailored suggestions…" while the OpenAI call is in flight,
// then "✨ AI-tailored to your brand" once live results arrive. Stays
// silent if the API errored and the static fallback is in use — no
// scary failure state visible to the user.
// Loading-only status line shown beneath an AI-powered step's input. The
// "AI-tailored to your brand" badge used to render when source==='live' but
// the user found it cluttering — now we only show the loading state.
function LiveSuggestionStatus({
  loading,
}: {
  loading: boolean
  source?: 'static' | 'live'
}) {
  if (!loading) return null
  return (
    <p
      className="m-sans"
      style={{ fontSize: 11, color: 'var(--m-text-soft)', fontStyle: 'italic' }}
    >
      ✨ Generating tailored suggestions…
    </p>
  )
}

// Row-based suggestion list — used on Steps 3 (description) and 4 (tagline).
// Shows `visibleCount` items by default with a "Show N more" toggle; clicking
// a row populates the input. Selected row gets a brand-soft background.
// Skeleton placeholder shown while AI is generating on grid steps (5/6/7).
// Greyed-out boxes in the same grid shape so the step doesn't look empty.
// `shape` controls the silhouette: chip = short pill, palette = card with
// swatch strip, style = square card.
function SkeletonGrid({
  shape,
  count,
}: {
  shape: 'chip' | 'palette' | 'style'
  count: number
}) {
  const items = Array.from({ length: count })
  const inlineKeyframes = (
    <style>{`@keyframes nSkelPulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }`}</style>
  )
  const baseStyle: CSSProperties = {
    background: 'var(--m-surface-alt, #F1ECE6)',
    borderRadius: 12,
    animation: 'nSkelPulse 1.4s ease-in-out infinite',
  }

  if (shape === 'chip') {
    return (
      <>
        {inlineKeyframes}
        <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 10 }}>
          {items.map((_, i) => (
            <div key={i} style={{ ...baseStyle, height: 60 }} />
          ))}
        </div>
      </>
    )
  }
  if (shape === 'palette') {
    return (
      <>
        {inlineKeyframes}
        <div className="grid grid-cols-2" style={{ gap: 12 }}>
          {items.map((_, i) => (
            <div key={i} style={{ ...baseStyle, padding: 14, borderRadius: 14 }}>
              <div style={{ height: 80, background: 'rgba(0,0,0,0.06)', borderRadius: 10 }} />
              <div style={{ marginTop: 12, height: 14, width: '50%', background: 'rgba(0,0,0,0.08)', borderRadius: 6 }} />
              <div style={{ marginTop: 6, height: 10, width: '70%', background: 'rgba(0,0,0,0.06)', borderRadius: 5 }} />
            </div>
          ))}
        </div>
      </>
    )
  }
  // style
  return (
    <>
      {inlineKeyframes}
      <div className="grid grid-cols-3" style={{ gap: 10 }}>
        {items.map((_, i) => (
          <div key={i} style={{ ...baseStyle, aspectRatio: '1 / 1', borderRadius: 14 }} />
        ))}
      </div>
    </>
  )
}

function SuggestionRows({
  label,
  items,
  total,
  visibleCount,
  expanded,
  onToggleExpand,
  selectedValue,
  onPick,
}: {
  label: string
  items: string[]
  total: number
  visibleCount: number
  expanded: boolean
  onToggleExpand: () => void
  selectedValue: string
  onPick: (v: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      <p
        className="m-sans"
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--m-text-soft)',
        }}
      >
        {label}
      </p>
      <div className="flex flex-col" style={{ gap: 8 }}>
        {items.map((s, i) => {
          const selected = selectedValue === s
          return (
            <button
              key={`${s}|${i}`}
              type="button"
              onClick={() => onPick(s)}
              className="m-sans text-left"
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                border: '1.5px solid',
                borderColor: selected ? 'var(--m-brand)' : 'var(--m-border)',
                background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                color: selected ? 'var(--m-ink)' : 'var(--m-text)',
                fontSize: 14,
                fontWeight: selected ? 600 : 500,
                lineHeight: 1.4,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
            >
              {s}
            </button>
          )
        })}
      </div>
      {total > visibleCount && (
        <button
          type="button"
          onClick={onToggleExpand}
          className="m-sans"
          style={{
            alignSelf: 'flex-start',
            padding: '6px 0',
            background: 'transparent',
            border: 'none',
            color: 'var(--m-brand-strong)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {expanded ? 'Show fewer' : `Show ${total - visibleCount} more`}
        </button>
      )}
    </div>
  )
}

// LogoArtwork — SVG-style logo renderer for the Results screen previews.
// Takes a `variant` index (0-9) and the user's actual brand name, tagline,
// and palette so each preview reflects the live inputs (not a static PNG).
// 10 distinct layouts so the 5x2 grid feels varied. Static and intentionally
// simple — not photoreal, but always shows the user's actual brand name.
function LogoArtwork({
  variant,
  brandName,
  tagline,
  palette,
}: {
  variant: number
  brandName: string
  tagline: string
  palette: Palette | null
}) {
  const display = brandName.trim() || 'Your Brand'
  const initials = display
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
  const ink = palette?.colors[0]?.hex ?? '#1F2937'
  const surface = palette?.colors[1]?.hex ?? '#FAF7F4'
  const accent = palette?.colors[2]?.hex ?? '#D97757'

  const baseBox: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: surface,
    padding: 18,
    textAlign: 'center',
    gap: 6,
    overflow: 'hidden',
  }
  const wordmark = (size = 24, weight: number | string = 600, font: 'wordmark' | 'sans' = 'wordmark') => (
    <span
      style={{
        fontFamily: font === 'wordmark' ? 'var(--m-font-wordmark), serif' : 'var(--m-font-sans), sans-serif',
        fontSize: size,
        fontWeight: weight,
        color: ink,
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        maxWidth: '100%',
        wordBreak: 'break-word',
      }}
    >
      {display}
    </span>
  )
  const tagSmallCaps = tagline ? (
    <span className="m-sans" style={{ fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent }}>
      {tagline}
    </span>
  ) : null

  // 10 variants, cycled. Each emphasises a different layout/style choice.
  switch (variant % 10) {
    case 0: // simple wordmark
      return <div style={baseBox}>{wordmark(26)}{tagSmallCaps}</div>
    case 1: // wordmark + small line beneath
      return (
        <div style={baseBox}>
          {wordmark(26)}
          <span style={{ width: 36, height: 2, background: accent, marginTop: 2 }} />
          {tagSmallCaps}
        </div>
      )
    case 2: // dot + wordmark (horizontal)
      return (
        <div style={{ ...baseBox, flexDirection: 'row', gap: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: accent, flexShrink: 0 }} />
          {wordmark(22)}
        </div>
      )
    case 3: // wordmark in ALL CAPS sans
      return (
        <div style={baseBox}>
          <span style={{ fontFamily: 'var(--m-font-sans), sans-serif', fontSize: 18, fontWeight: 700, color: ink, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            {display}
          </span>
          {tagSmallCaps}
        </div>
      )
    case 4: // initials monogram in circle
      return (
        <div style={baseBox}>
          <span
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              background: ink,
              color: surface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--m-font-wordmark), serif',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.04em',
            }}
          >
            {initials}
          </span>
          {wordmark(13, 500, 'sans')}
        </div>
      )
    case 5: // square icon + name beside
      return (
        <div style={{ ...baseBox, flexDirection: 'row', gap: 10 }}>
          <span style={{ width: 28, height: 28, borderRadius: 6, background: ink, flexShrink: 0 }} />
          {wordmark(20)}
        </div>
      )
    case 6: // stacked: icon top, name bottom
      return (
        <div style={baseBox}>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: ink, marginBottom: 6 }} />
          {wordmark(20)}
        </div>
      )
    case 7: // badge — name inside circular outline
      return (
        <div style={baseBox}>
          <span
            style={{
              width: '78%',
              aspectRatio: '1 / 1',
              maxWidth: 120,
              borderRadius: '50%',
              border: `2px solid ${ink}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              textAlign: 'center',
            }}
          >
            <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 16, color: ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              {display}
            </span>
          </span>
        </div>
      )
    case 8: // two-line treatment for multi-word brands
      {
        const parts = display.split(/\s+/).filter(Boolean)
        if (parts.length >= 2) {
          return (
            <div style={baseBox}>
              <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 22, color: ink, lineHeight: 1, letterSpacing: '-0.01em' }}>
                {parts[0]}
              </span>
              <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 22, color: accent, lineHeight: 1, letterSpacing: '-0.01em' }}>
                {parts.slice(1).join(' ')}
              </span>
            </div>
          )
        }
        return <div style={baseBox}>{wordmark(26)}{tagSmallCaps}</div>
      }
    case 9: // bold sans with accent underline
      return (
        <div style={baseBox}>
          <span style={{ fontFamily: 'var(--m-font-sans), sans-serif', fontSize: 22, fontWeight: 800, color: ink, letterSpacing: '-0.02em' }}>
            {display}
          </span>
          <span style={{ width: '40%', height: 3, background: accent, marginTop: 4, maxWidth: 60 }} />
          {tagSmallCaps}
        </div>
      )
    default:
      return <div style={baseBox}>{wordmark(26)}{tagSmallCaps}</div>
  }
}

function FormSteps(p: FormProps) {
  const { step } = p
  // Long lists collapse to 5 by default with a "Show more" link — 10/12
  // is too many to scan in a single glance.
  const [descExpanded, setDescExpanded] = useState(false)
  const [taglineExpanded, setTaglineExpanded] = useState(false)
  const [servicesExpanded, setServicesExpanded] = useState(false)
  const [industriesExpanded, setIndustriesExpanded] = useState(false)
  // Trigger flags come from the parent (LogoOnboarding) — see FormProps.
  const { descTriggered, setDescTriggered, taglineTriggered, setTaglineTriggered } = p
  // Auto-expand the industries grid if the user has picked something
  // outside the default 8 (so the chosen tile isn't hidden when they
  // return to step 2 via Back).
  useEffect(() => {
    if (!industriesExpanded && p.industry) {
      const visibleKeys = INDUSTRIES.slice(0, INDUSTRIES_VISIBLE).map((i) => i.key)
      if (!visibleKeys.includes(p.industry)) setIndustriesExpanded(true)
    }
  }, [p.industry, industriesExpanded])
  const visibleIndustries = industriesExpanded
    ? INDUSTRIES
    : INDUSTRIES.slice(0, INDUSTRIES_VISIBLE)
  const DESC_VISIBLE = 5
  const SERVICES_VISIBLE = 5
  // All suggestion lists filter by the picked industry. If no industry
  // picked yet (or industry is 'other'), fall back to the generic mock
  // lists. Keeps the data accurate to the user's business instead of
  // pushing LOGO.AI-themed suggestions at everyone.
  // Live AI suggestions via OpenAI GPT-4o-mini. The hook shows the static
  // fallback list immediately, then silently replaces it with brand-aware
  // results once the API responds. Only fetches on Steps 3 and 4 (when those
  // inputs are visible) and only after the user has typed a brand name. If
  // the API errors out, the static list stays — user never sees a failure.
  const staticDescList = p.industry
    ? SUGGESTIONS_BY_INDUSTRY[p.industry] ?? DESCRIPTIONS
    : DESCRIPTIONS
  const servicesList = p.industry
    ? SERVICES_BY_INDUSTRY[p.industry] ?? SERVICES
    : SERVICES
  const staticTaglineList = p.industry
    ? TAGLINES_BY_INDUSTRY[p.industry] ?? TAGLINES
    : TAGLINES
  // Prefer the exact niche the user picked (e.g. "Chinese restaurant"),
  // falling back to the broad-category label for the picked key.
  const industryLabel = p.industryLabel
    || (p.industry ? INDUSTRIES.find((i) => i.key === p.industry)?.label ?? null : null)
  const liveDesc = useLiveSuggestions<string>({
    kind: 'description',
    brand: p.brandName,
    industry: industryLabel,
    fallback: staticDescList,
    // Fire only when this specific step is visible AND the user has triggered it.
    enabled: step === 3 && descTriggered,
    validate: isString,
  })
  const liveTagline = useLiveSuggestions<string>({
    kind: 'tagline',
    brand: p.brandName,
    industry: industryLabel,
    fallback: staticTaglineList,
    enabled: step === 4 && taglineTriggered,
    validate: isString,
  })
  // Live AI for Step 5 (Impression). Brand-aware mood words specific to the
  // industry — e.g. a law firm gets "Discreet / Authoritative / Sharp"
  // instead of generic "Bold / Playful / Modern".
  const liveImpression = useLiveSuggestions<string>({
    kind: 'impression',
    brand: p.brandName,
    industry: industryLabel,
    description: p.description || undefined,
    fallback: IMPRESSIONS,
    enabled: step === 5,
    validate: isString,
  })
  // Live AI for Step 6 (Colours). Brand-aware palettes — e.g. a Sichuan
  // hot-pot place gets red/gold/charcoal, a yoga studio gets sage/terracotta.
  const livePalettes = useLiveSuggestions<PaletteShape>({
    kind: 'palette',
    brand: p.brandName,
    industry: industryLabel,
    description: p.description || undefined,
    fallback: PALETTES,
    enabled: step === 6,
    validate: isPalette,
  })
  // Live AI for Step 7 (Style). Industry-specific popularity % and real
  // brand examples for each of the 6 logo types.
  const liveStyles = useLiveSuggestions<StyleShape>({
    kind: 'style',
    brand: p.brandName,
    industry: industryLabel,
    description: p.description || undefined,
    fallback: LOGO_TYPES,
    enabled: step === 7,
    validate: isStyle,
  })
  const descList = liveDesc.suggestions
  const taglineList = liveTagline.suggestions
  // Mirror the live lists into the module-level ref so the parent's
  // aiInfoForStep handlers can pick from the SAME list the grid shows.
  useEffect(() => { liveListsRef.impressions = liveImpression.suggestions }, [liveImpression.suggestions])
  useEffect(() => { liveListsRef.palettes = livePalettes.suggestions }, [livePalettes.suggestions])
  useEffect(() => { liveListsRef.styles = liveStyles.suggestions }, [liveStyles.suggestions])
  const impressionsList = liveImpression.suggestions
  const palettesList = livePalettes.suggestions
  const stylesList = liveStyles.suggestions
  const visibleDescriptions = descExpanded ? descList : descList.slice(0, DESC_VISIBLE)
  const visibleTaglines = taglineExpanded ? taglineList : taglineList.slice(0, DESC_VISIBLE)
  const visibleServices = servicesExpanded ? servicesList : servicesList.slice(0, SERVICES_VISIBLE)
  const title =
    step === 1 ? "What's your business name?" :
    step === 2 ? `What kind of business is ${p.brand}?` :
    step === 3 ? `What does ${p.brand} do?` :
    step === 4 ? 'Want to add a tagline?' :
    step === 5 ? `What first impression should ${p.brand} make?` :
    step === 6 ? `Pick the colours for ${p.brand}` :
    /* 7 */     'Which logo style do you prefer?'
  const sub =
    step === 1 ? "We'll print this exact name on your logos." :
    step === 2 ? 'The more specific, the better.' :
    step === 3 ? 'Pick a suggestion that fits, or write your own.' :
    step === 4 ? "Optional — but a great tagline adds personality and sticks in people's minds." :
    step === 5 ? 'Pick 3 words that define how your brand should feel to people.' :
    step === 6 ? 'Pick the colour direction that feels right. White background stays default.' :
    /* 7 */     (() => {
                  const label = INDUSTRIES.find((i) => i.key === p.industry)?.label.toLowerCase()
                  return label
                    ? `The most popular styles for ${label} brands like ${p.brand || 'yours'}.`
                    : `The most popular styles for brands like ${p.brand || 'yours'}.`
                })()

  return (
    <div>
      {/* S1-style step header — heading + sub, no eyebrow chip, centered */}
      <div className="text-center" style={{ marginBottom: 44 }}>
        <h2
          className="m-display"
          style={{
            fontSize: 'clamp(22px, 4.4vw, 32px)',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--m-ink)',
            margin: 0,
          }}
        >
          {title}
        </h2>
        <p
          className="m-sans"
          style={{
            marginTop: 10,
            fontSize: 16,
            color: 'var(--m-text-muted)',
            lineHeight: 1.5,
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {sub}
        </p>
      </div>

      {/* Step 1 — Business Name. Casing pills live beneath the input and
          show the user's typed name transformed into each case; clicking
          a pill commits the transform to the input. */}
      {step === 1 && (
        <div className="flex flex-col" style={{ gap: 16 }}>
          <div>
            <input
              type="text"
              value={p.brandName}
              onChange={(e) => {
                p.setBrandName(e.target.value)
                // Typing manually breaks the "last pill" link.
                if (p.nameStyle) p.setNameStyle('')
              }}
              aria-label="Business name"
              autoFocus
              className="n-start-input m-sans w-full"
              style={textInputStyle}
            />
          </div>
          {/* Casing block only appears once the user has started typing —
              empty pills with no name aren't useful. Duplicate transforms
              (e.g. lowercase + camelCase produce the same string on a
              single-word name) are deduped so the user never sees two
              identical pills. */}
          {p.brandName.trim().length > 0 && (() => {
            const seen = new Set<string>()
            const uniqueStyles = NAME_STYLES.filter((s) => {
              const preview = applyCase(p.brandName, s)
              if (seen.has(preview)) return false
              seen.add(preview)
              return true
            })
            return (
              <div style={{ animation: 'nStartFade 0.3s ease' }}>
                <label className="m-sans block" style={{ fontSize: 12, color: 'var(--m-text-soft)', marginBottom: 8, fontWeight: 600, letterSpacing: '0.04em' }}>
                  Preferred styling <span style={{ fontWeight: 400 }}>— optional</span>
                </label>
                <div className="flex flex-wrap" style={{ gap: 8 }}>
                  {uniqueStyles.map((s) => {
                    const preview = applyCase(p.brandName, s)
                    const selected = p.brandName === preview && p.nameStyle === s
                    return (
                      <Pill
                        key={s}
                        selected={selected}
                        onClick={() => {
                          p.setBrandName(applyCase(p.brandName, s))
                          p.setNameStyle(s)
                        }}
                      >
                        {preview}
                      </Pill>
                    )
                  })}
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Step 2 — Industry (autocomplete combobox: focus shows 8 default,
          typing filters all 25 by substring, click selects). Owns the
          screen so the busy "industry + description" Step 2 problem
          disappears. */}
      {step === 2 && (
        <IndustryCombobox
          industry={p.industry}
          setIndustry={(k) => {
            p.setIndustry(k)
            // Switching industry invalidates a previously-picked suggestion
            // from another industry — clear it so step 3 re-picks.
            const newList = SUGGESTIONS_BY_INDUSTRY[k] ?? []
            if (p.description && !newList.includes(p.description)) {
              p.setDescription('')
            }
          }}
          industryLabel={p.industryLabel}
          setIndustryLabel={p.setIndustryLabel}
        />
      )}

      {/* Step 3 — Description. Plain input + suggestion rows below.
          Rows hidden until the user focuses the input or clicks "Let AI
          pick" in the footer — no auto-API-spend on users who skip past. */}
      {step === 3 && (
        <div className="flex flex-col" style={{ gap: 16 }}>
          <div>
            <label htmlFor="n-description-input" className="m-sans block" style={{ fontSize: 12, color: 'var(--m-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>
              Describe your business
            </label>
            <input
              id="n-description-input"
              type="text"
              value={p.description}
              onChange={(e) => p.setDescription(e.target.value)}
              onFocus={() => setDescTriggered(true)}
              autoComplete="off"
              className="n-start-input m-sans w-full"
              style={textInputStyle}
            />
          </div>

          {/* Show loading text while AI is generating; show rows only once
              suggestions are ready (live AI result, or static fallback if AI
              errored). Never mix the two visible at once. */}
          {descTriggered && liveDesc.loading && (
            <LiveSuggestionStatus loading={true} />
          )}
          {descTriggered && !liveDesc.loading && (
            <SuggestionRows
              label="Suggestions"
              items={visibleDescriptions}
              total={descList.length}
              visibleCount={DESC_VISIBLE}
              expanded={descExpanded}
              onToggleExpand={() => setDescExpanded((v) => !v)}
              selectedValue={p.description}
              onPick={p.setDescription}
            />
          )}
        </div>
      )}

      {/* Step 4 — Tagline. Same gated pattern as Step 3. Continue is always
          enabled (tagline is optional per source-doc voice). */}
      {step === 4 && (
        <div className="flex flex-col" style={{ gap: 16 }}>
          <div>
            <label htmlFor="n-tagline-input" className="m-sans block" style={{ fontSize: 12, color: 'var(--m-text-soft)', marginBottom: 6, fontWeight: 600, letterSpacing: '0.04em' }}>
              Tagline
            </label>
            <input
              id="n-tagline-input"
              type="text"
              value={p.tagline}
              onChange={(e) => p.setTagline(e.target.value)}
              onFocus={() => setTaglineTriggered(true)}
              autoComplete="off"
              className="n-start-input m-sans w-full"
              style={textInputStyle}
            />
          </div>

          {taglineTriggered && liveTagline.loading && (
            <LiveSuggestionStatus loading={true} />
          )}
          {taglineTriggered && !liveTagline.loading && (
            <SuggestionRows
              label="Suggestions"
              items={visibleTaglines}
              total={taglineList.length}
              visibleCount={DESC_VISIBLE}
              expanded={taglineExpanded}
              onToggleExpand={() => setTaglineExpanded((v) => !v)}
              selectedValue={p.tagline}
              onPick={p.setTagline}
            />
          )}

          {/* True skip path — tagline is genuinely optional. Clears any
              typed value and jumps to the next step. */}
          <button
            type="button"
            onClick={p.onSkipTagline}
            className="m-sans"
            style={{
              alignSelf: 'center',
              marginTop: 8,
              padding: '6px 12px',
              background: 'transparent',
              border: 'none',
              color: 'var(--m-text-soft)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'underline',
              textDecorationColor: 'var(--m-border-medium)',
              textUnderlineOffset: 3,
            }}
          >
            Skip — no tagline
          </button>
        </div>
      )}

      {/* Step 5 — Impression. Uniform 2-col mobile / 3-col desktop grid.
          12 items divide cleanly into both. Shows skeleton while AI loads,
          then real grid (live or static fallback). */}
      {step === 5 && (
        <div className="flex flex-col" style={{ gap: 16 }}>
          <CountHeader label="Pick 3 words" count={p.impressions.length} target={3} />
          {liveImpression.loading ? (
            <SkeletonGrid shape="chip" count={12} />
          ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 10 }}>
            {impressionsList.map((w) => {
              const selected = p.impressions.includes(w)
              const disabled = !selected && p.impressions.length >= 3
              return (
                <button
                  key={w}
                  type="button"
                  disabled={disabled}
                  onClick={() => p.toggleImpression(w)}
                  className="m-sans inline-flex items-center"
                  style={{
                    gap: 10,
                    width: '100%',
                    minHeight: 60,
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: '1.5px solid',
                    borderColor: selected ? 'var(--m-brand)' : 'var(--m-border)',
                    background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                    color: disabled ? 'var(--m-text-faint)' : selected ? 'var(--m-ink)' : 'var(--m-text)',
                    fontSize: 15,
                    fontWeight: selected ? 600 : 500,
                    lineHeight: 1.35,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.55 : 1,
                    textAlign: 'left',
                    transition: 'border-color 0.15s ease, background 0.15s ease, color 0.15s ease',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center shrink-0"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: selected ? 'none' : '1.5px solid var(--m-border-medium)',
                      background: selected ? 'var(--m-brand)' : 'transparent',
                      color: '#FFFFFF',
                      fontSize: 12,
                      transition: 'background 0.15s ease, border-color 0.15s ease',
                    }}
                  >
                    {selected && '✓'}
                  </span>
                  <span style={{ flex: 1 }}>{w}</span>
                </button>
              )
            })}
          </div>
          )}
        </div>
      )}

      {/* Step 6 — Colours. 2-col grid of expanded palette cards. Skeleton
          while AI generates brand-aware palettes, then real grid. */}
      {step === 6 && (
        <div className="flex flex-col" style={{ gap: 10 }}>
          {livePalettes.loading ? (
            <SkeletonGrid shape="palette" count={6} />
          ) : (
          <div className="grid grid-cols-2" style={{ gap: 12 }}>
          {palettesList.map((pal, i) => {
            const selected = p.paletteIndex === i
            return (
              <button
                key={pal.name}
                type="button"
                onClick={() => p.setPaletteIndex(i)}
                title={`${pal.name} — ${pal.hint}`}
                className="m-sans text-left relative flex flex-col"
                style={{
                  padding: 14,
                  borderRadius: 14,
                  border: '1.5px solid',
                  borderColor: selected ? 'var(--m-brand)' : 'var(--m-border)',
                  background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, background 0.15s ease',
                }}
              >
                <span
                  className="flex overflow-hidden"
                  style={{
                    borderRadius: 10,
                    border: '1px solid var(--m-border)',
                    height: 80,
                    width: '100%',
                  }}
                >
                  {pal.colors.map((c) => (
                    <span
                      key={c.hex}
                      style={{ flex: 1, background: c.hex }}
                    />
                  ))}
                </span>
                <span className="flex flex-col" style={{ marginTop: 12, gap: 3 }}>
                  <span
                    className="m-display"
                    style={{ fontSize: 17, fontWeight: 600, color: 'var(--m-ink)', lineHeight: 1.2 }}
                  >
                    {pal.name}
                  </span>
                  <span
                    className="m-sans"
                    style={{ fontSize: 13, color: 'var(--m-text-soft)', lineHeight: 1.35 }}
                  >
                    {pal.hint}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center"
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: selected ? 'none' : '1.5px solid rgba(255,255,255,0.85)',
                    background: selected ? 'var(--m-brand)' : 'rgba(0,0,0,0.15)',
                    color: '#FFFFFF',
                    fontSize: 12,
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  {selected && '✓'}
                </span>
              </button>
            )
          })}
          </div>
          )}
        </div>
      )}

      {/* Step 7 — Logo Style. Visual thumbnail grid. Each card shows a
          generic illustration of that style; description, popularity %,
          and real-world examples appear on hover. 6 styles in a 3-col
          row. Skeleton while AI computes brand-specific popularity. */}
      {step === 7 && (
        <div className="flex flex-col" style={{ gap: 10 }}>
          {liveStyles.loading ? (
            <SkeletonGrid shape="style" count={6} />
          ) : (
          <div className="grid grid-cols-3" style={{ gap: 10 }}>
          {stylesList.map((lt, i) => {
            const selected = p.logoTypeIndex === i
            return (
              <button
                key={lt.name}
                type="button"
                onClick={() => p.setLogoTypeIndex(i)}
                className="group relative m-sans overflow-hidden"
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: 14,
                  border: '1.5px solid',
                  borderColor: selected ? 'var(--m-brand)' : 'var(--m-border)',
                  background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, background 0.15s ease',
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 14,
                    right: 14,
                    bottom: 44,
                    color: 'var(--m-ink)',
                  }}
                >
                  {STYLE_ICONS[lt.name]}
                </span>
                <span
                  className="m-display"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 14,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--m-ink)',
                  }}
                >
                  {lt.name}
                </span>
                <span
                  className="flex flex-col justify-center opacity-0 group-hover:opacity-100"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: 18,
                    background: 'rgba(17, 24, 39, 0.94)',
                    color: '#FFFFFF',
                    transition: 'opacity 0.18s ease',
                    pointerEvents: 'none',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--m-font-sans), sans-serif',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.18)',
                      color: '#FFFFFF',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      alignSelf: 'flex-start',
                      marginBottom: 8,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Used by {lt.pct}% of brands
                  </span>
                  <span className="m-display" style={{ fontSize: 16, fontWeight: 700, display: 'block', marginBottom: 8 }}>{lt.name}</span>
                  <span style={{ fontSize: 12, lineHeight: 1.45, color: 'rgba(255,255,255,0.92)', display: 'block' }}>
                    {lt.desc}
                  </span>
                  <span style={{ fontSize: 11, lineHeight: 1.45, marginTop: 8, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', display: 'block' }}>
                    e.g. {lt.ex}
                  </span>
                </span>
                {selected && (
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center"
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'var(--m-brand)',
                      color: '#FFFFFF',
                      fontSize: 12,
                      zIndex: 2,
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            )
          })}
          </div>
          )}
          {!liveStyles.loading && (
            <p
              className="m-sans"
              style={{
                marginTop: 6,
                fontSize: 11,
                color: 'var(--m-text-soft)',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              Industry-typical estimate — popularity % and example brands generated by AI.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Brand brief                                                         */
/* ------------------------------------------------------------------ */

function BrandBrief({
  brand,
  description,
  services,
  tagline,
  impressions,
  palette,
  logoType,
  onGenerate,
}: {
  brand: string
  description: string
  services: string[]
  tagline: string
  impressions: string[]
  palette: Palette | null
  logoType: { name: string } | null
  onGenerate: () => void
}) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ ...monoLabel, color: 'var(--m-brand-strong)', marginBottom: 8 }}>Your Brand Brief</div>
        <h1
          className="m-display"
          style={{
            fontSize: 'clamp(28px, 5.4vw, 36px)',
            fontWeight: 700,
            color: 'var(--m-ink)',
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {brand}
        </h1>
        {tagline && (
          <p className="m-sans" style={{ fontSize: 15, color: 'var(--m-text-soft)', marginTop: 8, fontStyle: 'italic' }}>
            &ldquo;{tagline}&rdquo;
          </p>
        )}
      </div>

      <div
        className="flex flex-col"
        style={{
          background: 'var(--m-surface)',
          border: '1px solid var(--m-border)',
          borderRadius: 16,
          padding: 28,
          gap: 22,
        }}
      >
        {[
          { label: 'Business',    value: description || '—' },
          { label: 'Services',    value: services.join(', ') || '—' },
          { label: 'Tagline',     value: tagline || 'None' },
          { label: 'Impression',  value: impressions.join(', ') || '—' },
        ].map((row) => (
          <div key={row.label}>
            <div style={{ ...monoLabel, marginBottom: 6 }}>{row.label}</div>
            <div className="m-sans" style={{ fontSize: 15, color: 'var(--m-ink)', lineHeight: 1.5 }}>
              {row.value}
            </div>
          </div>
        ))}

        <div>
          <div style={{ ...monoLabel, marginBottom: 10 }}>Colors</div>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {palette &&
              palette.colors.map((c) => (
                <div key={c.hex} className="flex items-start" style={{ gap: 10 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: c.hex,
                      border: '1px solid var(--m-border)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div className="flex items-center" style={{ gap: 6 }}>
                      <span className="m-sans" style={{ fontSize: 13, color: 'var(--m-ink)', fontWeight: 600 }}>{c.name}</span>
                      <span className="m-sans" style={{ fontSize: 11, color: 'var(--m-text-soft)' }}>{c.hex}</span>
                    </div>
                    <div className="m-sans" style={{ fontSize: 11, color: 'var(--m-text-soft)', marginTop: 1, lineHeight: 1.4 }}>
                      {c.desc}
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex items-center" style={{ gap: 10 }}>
              <div
                style={{ width: 28, height: 28, borderRadius: 8, background: '#FFFFFF', border: '1px solid var(--m-border)' }}
              />
              <div>
                <div className="m-sans" style={{ fontSize: 13, color: 'var(--m-ink)', fontWeight: 600 }}>Background</div>
                <div className="m-sans" style={{ fontSize: 11, color: 'var(--m-text-soft)' }}>#FFFFFF</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ ...monoLabel, marginBottom: 6 }}>Logo Type</div>
          <div className="m-sans" style={{ fontSize: 15, color: 'var(--m-ink)' }}>
            {logoType ? logoType.name : '—'}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button
          type="button"
          onClick={onGenerate}
          className="m-cta-btn m-sans inline-flex items-center gap-2"
          style={{
            padding: '14px 32px',
            borderRadius: 12,
            border: 'none',
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(217,119,87,0.30)',
          }}
        >
          Generate logo prompts ✦
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Generating                                                          */
/* ------------------------------------------------------------------ */

function Generating({ brand, line }: { brand: string; line: string }) {
  return (
    <div className="mx-auto flex flex-col items-center text-center" style={{ maxWidth: 480, paddingTop: 40 }}>
      <span
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '3px solid var(--m-brand-soft)',
          borderTopColor: 'var(--m-brand)',
          animation: 'nStartSpin 0.8s linear infinite',
        }}
      />
      <h1 className="m-display" style={{ marginTop: 28, fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700, color: 'var(--m-ink)' }}>
        Creating logos for {brand}…
      </h1>
      <p key={line} className="m-body" style={{ marginTop: 8, color: 'var(--m-text-soft)', animation: 'nStartFade 0.3s ease' }}>
        {line}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Auth Wall — ports HEADSHOT S1's TrialAuthWall layout. Sits between  */
/* the Brand Brief and the Generating screen as a sign-in gate.        */
/* ------------------------------------------------------------------ */

function AuthWall({
  email,
  onEmailChange,
  onContinue,
  onBack,
}: {
  email: string
  onEmailChange: (v: string) => void
  onContinue: () => void
  onBack?: () => void
}) {
  const valid = isValidEmail(email)
  return (
    <div className="relative" style={{ minHeight: 'calc(100vh - 200px)' }}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="m-sans inline-flex items-center gap-1.5"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--m-text-muted)',
            fontSize: 14,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back</span>
        </button>
      )}

      <div className="flex flex-col items-center" style={{ paddingTop: 40 }}>
        {/* Headline + sub */}
        <h1
          className="m-display text-center"
          style={{
            maxWidth: 720,
            fontSize: 'clamp(22px, 4.4vw, 28px)',
            fontWeight: 700,
            lineHeight: 1.25,
            color: 'var(--m-ink)',
            margin: 0,
          }}
        >
          Your logos are ready to preview
        </h1>
        <p
          className="m-sans text-center"
          style={{ marginTop: 10, maxWidth: 560, fontSize: 16, color: 'var(--m-text-muted)' }}
        >
          Sign in to view them — no payment needed yet.
        </p>

        {/* Auth card */}
        <div
          className="w-full"
          style={{
            maxWidth: 480,
            marginTop: 32,
            padding: 28,
            background: 'var(--m-surface)',
            border: '1px solid var(--m-border)',
            borderRadius: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <button
            type="button"
            onClick={onContinue}
            className="m-sans w-full inline-flex items-center justify-center gap-2.5"
            style={{
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid var(--m-border)',
              background: 'var(--m-surface)',
              color: 'var(--m-ink)',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05" />
              <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center" style={{ marginTop: 20, gap: 16 }}>
            <span style={{ height: 1, flex: 1, background: 'var(--m-border)' }} />
            <span className="m-sans" style={{ fontSize: 13, color: 'var(--m-text-soft)' }}>Or continue with email</span>
            <span style={{ height: 1, flex: 1, background: 'var(--m-border)' }} />
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            className="n-start-input m-sans w-full"
            style={{
              marginTop: 20,
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid var(--m-border)',
              background: 'var(--m-surface)',
              fontSize: 15,
              color: 'var(--m-ink)',
              outline: 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            }}
          />
          <button
            type="button"
            onClick={() => valid && onContinue()}
            disabled={!valid}
            className="m-sans w-full"
            style={{
              marginTop: 12,
              padding: '14px 16px',
              borderRadius: 8,
              border: 'none',
              background: valid ? 'var(--m-ink)' : 'var(--m-border-medium)',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 500,
              cursor: valid ? 'pointer' : 'not-allowed',
              opacity: valid ? 1 : 0.7,
              transition: 'opacity 0.15s ease, background 0.15s ease',
            }}
          >
            Continue with email
          </button>

          <p className="m-sans text-center" style={{ marginTop: 14, fontSize: 12, color: 'var(--m-text-soft)' }}>
            New accounts are subject to our{' '}
            <a href="/terms" style={{ color: 'var(--m-text-muted)', textDecoration: 'underline' }}>Terms</a>{' '}and{' '}
            <a href="/privacy" style={{ color: 'var(--m-text-muted)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>

        {/* Trust strip */}
        <div
          className="inline-flex items-center"
          style={{ marginTop: 28, gap: 8, fontFamily: 'var(--m-font-sans), sans-serif', fontSize: 13, color: 'var(--m-text-muted)' }}
        >
          <span style={{ fontWeight: 700, color: 'var(--m-ink)' }}>Trusted by 180,000+ brands</span>
          <span style={{ color: 'var(--m-text-soft)' }}>·</span>
          <span className="inline-flex items-center" style={{ gap: 4 }}>
            <span className="inline-flex" style={{ gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#16A34A" aria-hidden="true">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </span>
            <span>4.9/5 verified rating</span>
          </span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* AuthGateModal — same UI pattern as AuthWall, presented as a modal    */
/* that fires only when a signed-out user taps a locked logo card.      */
/* ------------------------------------------------------------------ */

function AuthGateModal({
  open,
  email,
  onEmailChange,
  onContinue,
  onClose,
}: {
  open: boolean
  email: string
  onEmailChange: (v: string) => void
  onContinue: () => void
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null
  const valid = isValidEmail(email)

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: '40px 16px',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="n-authgate-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full"
        style={{
          maxWidth: 480,
          background: 'var(--m-surface)',
          borderRadius: 16,
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}
      >
        {/* close button */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '14px 18px', borderBottom: '1px solid var(--m-border)' }}
        >
          <span
            className="m-display"
            style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 18, color: 'var(--m-ink)', letterSpacing: '-0.02em' }}
          >
            LOGO<span style={{ color: 'var(--m-brand)' }}>.</span>AI
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="m-sans"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--m-text-soft)',
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: 28 }}>
          <h2
            id="n-authgate-title"
            className="m-display text-center"
            style={{
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: 700,
              lineHeight: 1.25,
              color: 'var(--m-ink)',
              margin: 0,
            }}
          >
            Sign in to download this logo
          </h2>
          <p
            className="m-sans text-center"
            style={{ marginTop: 8, fontSize: 14, color: 'var(--m-text-muted)' }}
          >
            One quick sign-in keeps your logo safe so you can come back to it any time.
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="m-sans w-full inline-flex items-center justify-center gap-2.5"
            style={{
              marginTop: 24,
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid var(--m-border)',
              background: 'var(--m-surface)',
              color: 'var(--m-ink)',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05" />
              <path d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center" style={{ marginTop: 20, gap: 16 }}>
            <span style={{ height: 1, flex: 1, background: 'var(--m-border)' }} />
            <span className="m-sans" style={{ fontSize: 13, color: 'var(--m-text-soft)' }}>Or continue with email</span>
            <span style={{ height: 1, flex: 1, background: 'var(--m-border)' }} />
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            autoFocus
            className="n-start-input m-sans w-full"
            style={{
              marginTop: 18,
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid var(--m-border)',
              background: 'var(--m-surface)',
              fontSize: 15,
              color: 'var(--m-ink)',
              outline: 'none',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && valid) onContinue()
            }}
          />
          <button
            type="button"
            onClick={() => valid && onContinue()}
            disabled={!valid}
            className="m-sans w-full"
            style={{
              marginTop: 12,
              padding: '14px 16px',
              borderRadius: 8,
              border: 'none',
              background: valid ? 'var(--m-ink)' : 'var(--m-border-medium)',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 500,
              cursor: valid ? 'pointer' : 'not-allowed',
              opacity: valid ? 1 : 0.7,
              transition: 'opacity 0.15s ease, background 0.15s ease',
            }}
          >
            Continue with email
          </button>

          <p className="m-sans text-center" style={{ marginTop: 14, fontSize: 12, color: 'var(--m-text-soft)' }}>
            New accounts are subject to our{' '}
            <a href="/terms" style={{ color: 'var(--m-text-muted)', textDecoration: 'underline' }}>Terms</a>{' '}and{' '}
            <a href="/privacy" style={{ color: 'var(--m-text-muted)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* RefinePanel — slide-in drawer (desktop) / bottom sheet (mobile)      */
/* that exposes the optional refinements (tagline, palette, logo type, */
/* casing). Apply re-runs the generating animation.                      */
/* ------------------------------------------------------------------ */

function RefinePanel({
  open,
  onClose,
  onApply,
  tagline,
  setTagline,
  paletteIndex,
  setPaletteIndex,
  logoTypeIndex,
  setLogoTypeIndex,
  nameStyle,
  setNameStyle,
}: {
  open: boolean
  onClose: () => void
  onApply: () => void
  tagline: string
  setTagline: (v: string) => void
  paletteIndex: number | null
  setPaletteIndex: (i: number) => void
  logoTypeIndex: number | null
  setLogoTypeIndex: (i: number) => void
  nameStyle: string
  setNameStyle: (v: string) => void
}) {
  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="n-refine-title"
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col"
        style={{
          width: 'min(420px, 100%)',
          height: '100%',
          background: 'var(--m-surface)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.18)',
          animation: 'nDrawerSlide 0.28s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{ padding: '14px 20px', borderBottom: '1px solid var(--m-border)' }}
        >
          <div>
            <h2 id="n-refine-title" className="m-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--m-ink)', margin: 0 }}>
              Refine
            </h2>
            <p className="m-sans" style={{ marginTop: 2, fontSize: 12, color: 'var(--m-text-soft)' }}>
              Tweak anything — preview re-rolls free.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="m-sans"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--m-text-soft)', fontSize: 24, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* body — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {/* Tagline */}
          <RefineSection title="Tagline">
            <div className="flex flex-col" style={{ gap: 6 }}>
              {TAGLINES.slice(0, 6).map((t) => {
                const sel = tagline === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTagline(sel ? '' : t)}
                    className="m-sans text-left"
                    style={{
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: sel ? 'var(--m-brand)' : 'var(--m-border)',
                      background: sel ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                      color: sel ? 'var(--m-ink)' : 'var(--m-text-muted)',
                      fontSize: 13,
                      fontStyle: 'italic',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, background 0.15s ease, color 0.15s ease',
                    }}
                  >
                    &ldquo;{t}&rdquo;
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => setTagline('')}
                className="m-sans"
                style={{
                  marginTop: 6,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px dashed var(--m-border)',
                  background: 'transparent',
                  color: 'var(--m-text-soft)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                No tagline
              </button>
            </div>
          </RefineSection>

          {/* Palette */}
          <RefineSection title="Colours">
            <div className="flex flex-col" style={{ gap: 8 }}>
              {PALETTES.map((pal, i) => {
                const sel = paletteIndex === i
                return (
                  <button
                    key={pal.name}
                    type="button"
                    onClick={() => setPaletteIndex(i)}
                    className="text-left flex items-center"
                    style={{
                      gap: 12,
                      padding: 10,
                      borderRadius: 10,
                      border: '2px solid',
                      borderColor: sel ? 'var(--m-brand)' : 'var(--m-border)',
                      background: sel ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, background 0.15s ease',
                    }}
                  >
                    <span className="flex shrink-0" style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid var(--m-border)' }}>
                      {pal.colors.map((c) => (
                        <span key={c.hex} style={{ width: 16, height: 28, background: c.hex }} />
                      ))}
                    </span>
                    <span className="m-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-ink)' }}>
                      {pal.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </RefineSection>

          {/* Logo type */}
          <RefineSection title="Logo type">
            <div className="flex flex-col" style={{ gap: 6 }}>
              {LOGO_TYPES.map((lt, i) => {
                const sel = logoTypeIndex === i
                return (
                  <button
                    key={lt.name}
                    type="button"
                    onClick={() => setLogoTypeIndex(i)}
                    className="m-sans text-left flex items-center justify-between"
                    style={{
                      gap: 8,
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: sel ? 'var(--m-brand)' : 'var(--m-border)',
                      background: sel ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                      color: 'var(--m-ink)',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, background 0.15s ease',
                    }}
                  >
                    <span>{lt.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--m-text-soft)', fontWeight: 500 }}>{lt.pct}%</span>
                  </button>
                )
              })}
            </div>
          </RefineSection>

          {/* Casing — the option I pulled out of step 1 */}
          <RefineSection title="Name casing">
            <div className="flex flex-wrap" style={{ gap: 8 }}>
              <Pill selected={nameStyle === ''} onClick={() => setNameStyle('')}>Auto</Pill>
              {NAME_STYLES.map((s) => (
                <Pill key={s} selected={nameStyle === s} onClick={() => setNameStyle(s)}>
                  {s}
                </Pill>
              ))}
            </div>
          </RefineSection>
        </div>

        {/* footer apply bar */}
        <div
          className="shrink-0 flex items-center gap-3"
          style={{
            padding: '14px 20px max(14px, env(safe-area-inset-bottom))',
            borderTop: '1px solid var(--m-border)',
            background: 'var(--m-surface)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="m-sans"
            style={{
              flex: '0 0 auto',
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid var(--m-border)',
              background: 'transparent',
              color: 'var(--m-text-muted)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onApply}
            className="m-cta-btn m-sans inline-flex items-center justify-center gap-2"
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: 8,
              border: 'none',
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(217,119,87,0.30)',
            }}
          >
            Re-roll my logos
            <span aria-hidden="true">✦</span>
          </button>
        </div>
      </aside>
    </div>
  )
}

function RefineSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h3
        className="m-display"
        style={{ marginBottom: 10, fontSize: 14, fontWeight: 700, color: 'var(--m-ink)', letterSpacing: '-0.01em' }}
      >
        {title}
      </h3>
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

function Results({
  brandName,
  tagline,
  palette,
  logoTypeIndex,
  unlocked,
  onTap,
  onStartOver,
}: {
  brandName: string
  tagline: string
  palette: Palette | null
  logoTypeIndex: number | null
  unlocked: boolean[]
  onTap: (i: number) => void
  onStartOver: () => void
}) {
  return (
    <div className="mx-auto w-full px-2 sm:px-4" style={{ maxWidth: 1600 }}>
      <div className="flex flex-col items-center text-center">
        <div style={{ ...monoLabel }}>Your logos are ready</div>
        <h1
          className="m-display"
          style={{
            marginTop: 8,
            fontSize: 'clamp(24px, 4vw, 34px)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--m-ink)',
          }}
        >
          Pick the one you love — {(() => {
            const n = brandName.trim()
            if (!n) return 'there'
            return n.charAt(0).toUpperCase() + n.slice(1)
          })()}
        </h1>
        <p className="m-body" style={{ marginTop: 10, maxWidth: 560, color: 'var(--m-text-soft)' }}>
          Download HD files in every format for{' '}
          <strong style={{ color: 'var(--m-ink)', fontWeight: 700 }}>${LOGO_PRICE} one-time</strong>.
          Yours forever. No subscription.
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        style={{ gap: 20, marginTop: 36 }}
      >
        {Array.from({ length: PREVIEW_COUNT }).map((_, i) => {
          const isUnlocked = unlocked[i]
          return (
            <button
              key={i}
              type="button"
              onClick={() => onTap(i)}
              aria-label={isUnlocked ? `Download HD pack for logo ${i + 1}` : `Download logo ${i + 1} for $${LOGO_PRICE}`}
              className="n-preview-card n-preview-stream group relative overflow-hidden text-left"
              style={{
                aspectRatio: '1 / 1',
                borderRadius: 14,
                border: '1px solid var(--m-border)',
                background: '#FFFFFF',
                padding: 0,
                cursor: 'pointer',
                animationDelay: `${i * 110}ms`,
              }}
            >
              <div style={{ position: 'absolute', inset: 0 }}>
                <LogoArtwork variant={i} brandName={brandName} tagline={tagline} palette={palette} />
              </div>
              {!isUnlocked && <WatermarkOverlay />}

              {/* Hover pill — small white pill at the bottom of the card.
                  Fades in on desktop hover; logo art stays fully visible. */}
              {!isUnlocked && (
                <span
                  aria-hidden="true"
                  className="absolute opacity-0 group-hover:opacity-100"
                  style={{
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    transition: 'opacity 0.18s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="m-sans inline-flex items-center"
                    style={{
                      gap: 6,
                      padding: '7px 14px',
                      borderRadius: 9999,
                      background: '#FFFFFF',
                      color: 'var(--m-ink)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      border: '1px solid var(--m-border)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Get for ${LOGO_PRICE}
                    <span aria-hidden="true" style={{ color: 'var(--m-brand)' }}>→</span>
                  </span>
                </span>
              )}

              {isUnlocked && (
                <span
                  className="absolute"
                  style={{
                    top: 8,
                    left: 8,
                    padding: '4px 8px',
                    borderRadius: 9999,
                    background: 'var(--m-success)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--m-font-sans), sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  PURCHASED
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Value reassurance — S1 pattern. Reinforces what unlock gives you. */}
      <div
        className="m-sans"
        style={{
          marginTop: 32,
          padding: '20px 24px',
          borderRadius: 16,
          border: '1px solid var(--m-border)',
          background: 'var(--m-surface-alt, #FAF7F4)',
          textAlign: 'center',
        }}
      >
        <div className="m-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--m-ink)', marginBottom: 6 }}>
          What you get for $49
        </div>
        <div style={{ fontSize: 13, color: 'var(--m-text-muted)', lineHeight: 1.55 }}>
          HD PNG · vector SVG · print PDF & EPS · light and dark variants · full commercial license
        </div>
      </div>

      <div className="flex flex-col items-center" style={{ marginTop: 24, gap: 6 }}>
        <button
          type="button"
          onClick={onStartOver}
          className="m-sans"
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-text-soft)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Want something different? Generate again
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* sub-components                                                      */
/* ------------------------------------------------------------------ */

const textInputStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 12,
  border: '1px solid var(--m-border)',
  background: 'var(--m-surface)',
  fontFamily: 'var(--m-font-sans), sans-serif',
  fontSize: 16,
  color: 'var(--m-ink)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
}

function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="m-sans"
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        border: '1px solid',
        borderColor: selected ? 'var(--m-brand)' : 'var(--m-border)',
        background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
        color: selected ? 'var(--m-brand-strong)' : 'var(--m-text-muted)',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'border-color 0.15s ease, background 0.15s ease, color 0.15s ease',
      }}
    >
      {children}
    </button>
  )
}

function ListRow({
  selected,
  disabled = false,
  onClick,
  number,
  showCheckWhenSelected = false,
  children,
}: {
  selected: boolean
  disabled?: boolean
  onClick: () => void
  number: number
  showCheckWhenSelected?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="m-sans text-left flex items-center"
      style={{
        gap: 10,
        padding: '12px 14px',
        borderRadius: 10,
        border: '1px solid',
        borderColor: selected ? 'var(--m-brand)' : 'var(--m-border)',
        background: selected ? 'var(--m-brand-soft)' : 'var(--m-surface)',
        color: disabled ? 'var(--m-text-faint)' : selected ? 'var(--m-ink)' : 'var(--m-text-muted)',
        fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'border-color 0.15s ease, background 0.15s ease, color 0.15s ease',
      }}
    >
      <span
        className="inline-flex items-center justify-center flex-shrink-0"
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          background: selected ? 'var(--m-brand)' : 'var(--m-border)',
          color: selected ? '#FFFFFF' : 'var(--m-text-soft)',
          fontFamily: 'var(--m-font-sans), sans-serif',
        }}
      >
        {selected && showCheckWhenSelected ? '✓' : number}
      </span>
      {children}
    </button>
  )
}

function CountHeader({ label, count, target }: { label: string; count: number; target: number }) {
  // S1-style section header — display-font semibold label, right-aligned
  // count badge. No uppercase monospace.
  const done = count === target
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
      <span
        className="m-display"
        style={{ fontSize: 17, fontWeight: 600, color: 'var(--m-ink)', letterSpacing: '-0.01em' }}
      >
        {label}
      </span>
      <span
        className="m-sans"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: done ? 'var(--m-success)' : 'var(--m-text-soft)',
        }}
      >
        {count}/{target} selected
      </span>
    </div>
  )
}

// "Let AI decide" — small text-button that lives at the bottom of each
// optional step. Click → onPick() fills the step's field with a sensible
// default. Continue stays available; we don't auto-advance.
function AIDecideLink({ onPick, label }: { onPick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="m-sans inline-flex items-center justify-center"
      style={{
        alignSelf: 'center',
        gap: 6,
        marginTop: 4,
        padding: '8px 16px',
        borderRadius: 9999,
        border: '1px dashed var(--m-brand-soft)',
        background: 'transparent',
        color: 'var(--m-brand-strong)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-brand-soft)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--m-brand)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--m-brand-soft)' }}
    >
      <span aria-hidden="true">✦</span>
      <span>{label}</span>
    </button>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  // Used for non-count section labels (e.g. "AI suggestions",
  // "AI-generated taglines"). Same S1 typographic treatment as CountHeader.
  return (
    <div
      className="m-display"
      style={{ marginBottom: 12, fontSize: 17, fontWeight: 600, color: 'var(--m-ink)', letterSpacing: '-0.01em' }}
    >
      {children}
    </div>
  )
}

function FooterNav({
  onNext,
  canProceed,
  nextLabel,
  aiPick,
  aiLabel,
}: {
  onNext: () => void
  canProceed: boolean
  nextLabel: string
  aiPick?: () => void
  aiLabel?: string
}) {
  // Single CTA in the footer. When the user hasn't engaged with the step
  // yet AND the step has an AI default, the slot shows a "✦ Let AI pick"
  // button. The moment they make any selection (canProceed flips true),
  // it swaps to Continue. Steps without an AI option (1, 2) still show
  // a disabled Continue until valid.
  const showAi = !canProceed && Boolean(aiPick && aiLabel)
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: '#FFFFFF',
        borderTop: '1px solid var(--m-border)',
        padding: '14px 16px max(14px, env(safe-area-inset-bottom)) 16px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: 720, display: 'flex', justifyContent: 'center', gap: 12 }}>
        {showAi && aiPick ? (
          <button
            type="button"
            onClick={aiPick}
            className="m-sans"
            style={{
              padding: '14px 32px',
              borderRadius: 'var(--m-radius-md)',
              border: '1px solid var(--m-brand)',
              background: 'transparent',
              color: 'var(--m-brand)',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ✨ {aiLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={canProceed ? 'm-cta-btn' : ''}
            style={{
              padding: '14px 48px',
              borderRadius: 'var(--m-radius-md)',
              fontFamily: 'var(--m-font-sans), sans-serif',
              fontSize: 16,
              fontWeight: 600,
              color: '#FFFFFF',
              background: canProceed ? undefined : 'var(--m-border-medium)',
              cursor: canProceed ? 'pointer' : 'not-allowed',
              border: 'none',
            }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}


/* ------------------------------------------------------------------ */
/* Restored helper stubs — earlier large edits truncated their full   */
/* implementations. Minimal-but-correct versions live here.            */
/* ------------------------------------------------------------------ */

function applyCase(name: string, style: string): string {
  const trimmed = name.trim()
  if (!trimmed) return name
  switch (style) {
    case 'all lowercase':
      return trimmed.toLowerCase()
    case 'ALL CAPS':
      return trimmed.toUpperCase()
    case 'camelCase': {
      const parts = trimmed.split(/\s+/)
      return parts
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w[0].toUpperCase() + w.slice(1).toLowerCase(),
        )
        .join('')
    }
    case 'Title Case':
    default:
      return trimmed.replace(
        /\w\S*/g,
        (w) => w[0].toUpperCase() + w.slice(1).toLowerCase(),
      )
  }
}

function WatermarkOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(0,0,0,0.16)',
        fontFamily: 'var(--m-font-sans), sans-serif',
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '0.22em',
        transform: 'rotate(-22deg)',
      }}
    >
      PREVIEW
    </div>
  )
}
