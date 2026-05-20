// Live AI suggestions endpoint — design-n onboarding.
// Uses OpenAI GPT-4o-mini. Reads OPENAI_API_KEY from .env.local.
//
// Supported `kind` values:
//   - 'description' → 10 brand-aware one-sentence descriptions
//   - 'tagline'     → 10 short brand-aware taglines
//   - 'impression'  → 12 mood words sized to the brand/industry
//   - 'palette'     → 6 brand-aware palettes, each { name, hint, colors[3] }
//   - 'style'       → 6 logo-style ranked-objects { name, pct, desc, ex }
//
// Request body shape:
//   { kind, brand, industry?, niche?, description? }
//
// Returns JSON: { suggestions: T[] } where T depends on `kind`.
//
// Callers fall back to static lists if this endpoint errors out. Never throws.

import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const MODEL = 'gpt-4o-mini'

type SuggestKind = 'description' | 'tagline' | 'impression' | 'palette' | 'style' | 'industry'

interface SuggestRequest {
  kind: SuggestKind
  brand: string
  industry?: string
  niche?: string
  description?: string
  // Mood / feel words picked at step 5 — used by the 'palette' kind.
  impressions?: string
  // Partial text the user is typing — used by the 'industry' typeahead.
  query?: string
}

function ctxBlock(req: SuggestRequest): string {
  const lines = [
    req.brand ? `Brand name: ${req.brand}` : 'Brand name: (not yet provided)',
    req.industry ? `Industry: ${req.industry}` : '',
    req.niche ? `Niche / type: ${req.niche}` : '',
    req.description ? `Description: ${req.description}` : '',
    req.impressions ? `Mood / feel words the owner picked: ${req.impressions}` : '',
  ].filter(Boolean)
  return lines.join('\n')
}

function buildPrompt(req: SuggestRequest): string {
  const ctx = ctxBlock(req)

  if (req.kind === 'description') {
    return `You help a business owner pick a one-line description of their business, shown as click-to-pick options in a logo tool. Their brand name and industry / business type are in the context below.

Produce 10 description options. Each option describes a genuinely DIFFERENT, recognizable VARIANT of that business type — a different specialty, format, focus, customer base, or model — so the user can pick whichever is closest to their real business.

For example, for "coffee shop" the 10 variants could include: a specialty / third-wave coffee shop, a grab-and-go espresso bar, a coffee shop and bakery, a coffee shop with a coworking space, a drive-through coffee shop, a neighborhood café, a coffee roastery with a café, a dessert-and-coffee spot, and so on. For any other industry, find the equivalent real-world variants.

STYLE — match these exactly (plain and factual; examples for a café):
- "A specialty café focused on single-origin coffee and pour-over brewing."
- "A grab-and-go café serving quick espresso drinks and pastries for commuters."
- "A café and bakery offering coffee alongside fresh bread and pastries."
- "A neighborhood café with a relaxed atmosphere, light bites, and indoor seating."
Each option: ONE plain sentence, 8-15 words, starting with "A" or "An".

RULES:
- All 10 must be CLEARLY DISTINCT variants — never a reworded copy of another. The user should tell them apart at a glance.
- Stay plain and factual. NO storytelling, NO marketing or sensory language ("bursts with flavour", "evokes", "tells a story", "lovingly", "at dawn").
- Do NOT invent fabricated specifics — no made-up product names, no people / family / founder / backstory, no cities or countries, no dates. (Recognizable business variants and the obvious offerings of a business type are fine — fabricated facts are not.)

${ctx}

Generate exactly 10 distinct description options. Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
  }

  if (req.kind === 'tagline') {
    return `You are writing short brand taglines for ONE specific business. Here is that business:

${ctx}

Write 10 tagline options for THIS business.

REQUIREMENTS:
- 3-7 words each. Punchy, memorable, easy to say aloud. No trailing full stop.
- EVERY tagline must clearly fit THIS business — its industry and what it actually does (per the description above). Never use a theme, product, place, or feeling that does not apply to it. (A commercial cleaning company's taglines must not mention "home"; a law firm's must not mention "flavour"; match the real business.)
- Base the taglines mainly on the DESCRIPTION and INDUSTRY above. The brand name is light context — you may occasionally play on it, but most taglines should stand on what the business does.
- Vary the angle across the 10: what they do, the benefit/outcome for the customer, the attitude/tone, a touch of wordplay — but every one grounded in this business.
- The 10 must feel distinct from each other, not one idea reworded.

HARD RULE — ZERO CLICHÉS. The following are BANNED. Never output a tagline that matches or even loosely resembles one of these shapes:
- "Where [x] meets [y]"
- "Experience the difference" / "Taste the difference" / "See the difference"
- "Quality you can [taste / trust / feel]"
- "[verb] better" (e.g. "Clean better")
- "Your daily [x]"
- "One [x] at a time"
- "[noun], redefined" / "Redefining [x]"
- "Elevate your [x]"
- anything copying a famous brand ("Just do it", "Think different", "I'm lovin' it")

FINAL STEP — before you respond, re-read all 10 taglines and replace ANY that match or resemble a banned shape above. A single cliché in the output is a failure.

Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
  }

  if (req.kind === 'impression') {
    return `You are helping a small-business owner pick 3 mood words that describe how their brand should feel to customers. Pick the 12 most-fitting words for THIS brand specifically — not generic. Each word should be a single English adjective, capitalized (e.g. "Bold", "Trustworthy", "Grounded"). Tailor to the industry: a law firm should feel "Trustworthy / Authoritative / Discreet", a yoga studio should feel "Calm / Grounded / Soulful", a Sichuan hot-pot place should feel "Bold / Authentic / Communal". Avoid duplicates.

${ctx}

Generate exactly 12 distinct single-word mood adjectives. Respond with ONLY a JSON object of shape: { "suggestions": ["Bold", "Trustworthy", "...", ...] }`
  }

  if (req.kind === 'palette') {
    return `You are helping a small-business owner pick a brand colour palette. Generate 6 distinct palettes specifically suitable for THIS brand. Tailor heavily to industry and niche — a Sichuan hot-pot restaurant should get red/gold/charcoal Chinese-restaurant aesthetics, a yoga studio should get earth tones (sage, terracotta, cream), a tech SaaS should get blues/slates/electric accents. Each palette should be cohesive and printable.

IMPORTANT — if "Mood / feel words" are given in the context below, the palettes MUST reflect them; this is the strongest signal. For example:
- "Calm / Grounded / Soulful" → soft, muted, earthy tones; low contrast.
- "Bold / Energetic / Modern" → vivid, saturated colours; high contrast.
- "Luxurious / Elegant / Premium" → deep, rich tones with gold, black, or jewel accents.
- "Playful / Friendly / Fun" → bright, cheerful colours.
- "Trustworthy / Professional / Reliable" → blues, slates, restrained neutrals.
Every one of the 6 palettes should feel consistent with the chosen mood words.

${ctx}

Generate exactly 6 distinct palettes. Each palette has:
- "name": a short evocative name, 1-2 words (e.g. "Roasted Earth", "Imperial Heat", "Sage & Stone")
- "hint": one short phrase describing the feel, 3-5 words (e.g. "Warm and grounded", "Bold and ceremonial")
- "colors": exactly 3 objects, each with:
  - "name": a colour name (e.g. "Espresso", "Imperial Red")
  - "hex": valid 6-digit hex code starting with # (e.g. "#3E2723")
  - "desc": one short phrase about its role (e.g. "Deep and roasted")

Respond with ONLY a JSON object of shape:
{ "suggestions": [ { "name": "...", "hint": "...", "colors": [ { "name": "...", "hex": "#...", "desc": "..." }, ... ] }, ... ] }`
  }

  if (req.kind === 'style') {
    return `You are helping a small-business owner pick a logo style. The 6 industry-standard logo types are fixed: Wordmark, Combination Mark, Abstract Mark, Lettermark, Brandmark, Emblem. For THIS brand, generate brand-aware data for each: estimate what % of brands in this industry use each type (must sum to ~100), and provide industry-relevant real-world examples for each type.

${ctx}

For each of the 6 logo types, return:
- "name": one of: "Wordmark", "Combination Mark", "Abstract Mark", "Lettermark", "Brandmark", "Emblem"
- "pct": integer 0-100, what percentage of brands in this industry use this type (all 6 should sum to ~100)
- "desc": one short sentence describing the type
- "ex": 3 real-world examples (well-known brands in or adjacent to this industry that use this type), comma-separated

Respond with ONLY a JSON object of shape:
{ "suggestions": [ { "name": "Wordmark", "pct": 35, "desc": "...", "ex": "X, Y, Z" }, ... ] }
Return the 6 types in descending order of "pct".`
  }

  if (req.kind === 'industry') {
    const q = (req.query ?? '').trim()
    return `You power a business-type typeahead for a logo generator. The user has typed "${q}" into a "Business Type" search box.

Return 8-10 specific business types the user is likely searching for.

Rules:
- RELEVANCE: every suggestion must clearly relate to "${q}" — either the suggestion begins with "${q}", or "${q}" appears as a whole word within it. NEVER return an unrelated business type. (For "fa": "Fashion boutique", "Fast food restaurant", "Family diner" are valid; "Financial advisor" is NOT — no word starts with "fa".)
- ORDER: list the suggestions that BEGIN WITH "${q}" first — they are the most likely matches — then the rest.
- If "${q}" already reads as a complete business type, you may add a few natural variations of it (mobile, premium, eco-friendly, franchise, etc.) — but ONLY when "${q}" still appears within them.
- Be specific, not broad: a precise niche ("Personal injury lawyer") over a generic category ("Legal").
- Each label: 1-4 words, sentence case, no duplicates, no descriptions — just the label.

Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
  }

  // Should never reach
  return ''
}

function findFirstArray(obj: unknown): unknown[] | null {
  if (Array.isArray(obj)) return obj
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj as Record<string, unknown>)) {
      const v = (obj as Record<string, unknown>)[k]
      if (Array.isArray(v)) return v
    }
  }
  return null
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ suggestions: [], reason: 'no-key' })
  }

  let body: SuggestRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ suggestions: [], reason: 'bad-json' })
  }

  const validKinds: SuggestKind[] = ['description', 'tagline', 'impression', 'palette', 'style', 'industry']
  if (!body.kind || !validKinds.includes(body.kind)) {
    return NextResponse.json({ suggestions: [], reason: 'bad-kind' })
  }

  try {
    const openai = new OpenAI({ apiKey })
    const prompt = buildPrompt(body)

    // Palette responses are larger (nested structure) — give more headroom.
    // Industry typeahead is small (8 short labels) and latency-sensitive.
    const maxTokens =
      body.kind === 'palette' ? 1500 : body.kind === 'style' ? 900 : body.kind === 'industry' ? 300 : 800

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature:
        body.kind === 'palette' || body.kind === 'style' || body.kind === 'tagline'
          ? 0.7
          : body.kind === 'industry'
          ? 0.4
          : body.kind === 'description'
          ? 0.5 // moderate — distinct variants, but still plain (no invented stories)
          : 0.85,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0]?.message?.content ?? ''

    let parsed: unknown = null
    try {
      parsed = JSON.parse(raw)
    } catch {
      return NextResponse.json({ suggestions: [], reason: 'parse-fail' })
    }

    const arr = findFirstArray(parsed)
    if (!arr) {
      return NextResponse.json({ suggestions: [], reason: 'no-array' })
    }

    return NextResponse.json({ suggestions: arr })
  } catch (err) {
    console.error('[api/suggest] openai error:', err)
    return NextResponse.json({ suggestions: [], reason: 'openai-error' })
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
