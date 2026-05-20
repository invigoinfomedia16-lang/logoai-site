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
  // Partial text the user is typing — used by the 'industry' typeahead.
  query?: string
}

function ctxBlock(req: SuggestRequest): string {
  const lines = [
    req.brand ? `Brand name: ${req.brand}` : 'Brand name: (not yet provided)',
    req.industry ? `Industry: ${req.industry}` : '',
    req.niche ? `Niche / type: ${req.niche}` : '',
    req.description ? `Description: ${req.description}` : '',
  ].filter(Boolean)
  return lines.join('\n')
}

function buildPrompt(req: SuggestRequest): string {
  const ctx = ctxBlock(req)

  if (req.kind === 'description') {
    return `You help a business owner pick a plain one-line description of their business for a logo tool. Their brand + industry are in the context below.

Produce 8 description options. Each is ONE plain, factual sentence — what the business is and what it offers. Nothing more. 6-14 words.

A description follows this shape:
  [the business type] + [what it makes / sells / does] + (optionally) ONE neutral qualifier.

The ONLY qualifiers you may add: small-batch, handmade, handcrafted, artisan, local, online, made-to-order, custom, independent, family-run. At most one per sentence, only if it fits the industry. Add nothing else.

ABSOLUTELY FORBIDDEN — including any of these makes the description WRONG, because the user never told you them:
- specific product names or flavours (e.g. "fig jam", "lavender blueberry", "sourdough")
- any person, family member, founder, or backstory ("grandma", "my travels", "inspired by")
- any place ("countryside kitchen", "our town", a city or country)
- times, dates, or seasons-as-story ("at dawn", "summer evenings", "since 1990")
- sensory or marketing language ("bursts with flavour", "cozy", "vibrant", "evokes", "delight")
- customer quotes, ratings, or "loved by..."

If you cannot reach 8 without inventing, REPEAT the core idea in different plain words. Plain and slightly repetitive is REQUIRED. Colourful and invented is a FAILURE.

GOOD (for a jam company — notice: plain, factual, no invented detail):
- "A small-batch company that makes and sells fruit jams and preserves."
- "We make handmade jams, marmalades, and fruit spreads."
- "An artisan jam business selling fruit preserves online and at local markets."
- "A jam maker offering a range of fruit preserves and spreads."
BAD (invented detail — NEVER do this):
- "Inspired by grandma's recipes, small-batch fig jam with a hint of vanilla."
- "Crafted at dawn in our countryside kitchen, every jar bursts with flavour."

${ctx}

Generate exactly 8 plain description options for the business above. Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
  }

  if (req.kind === 'tagline') {
    return `You are helping a small-business owner pick a short tagline for their brand. Each tagline must be 3-7 words, punchy, memorable, and specific. No trailing full stops.

CRITICAL RULES:
1. Each of the 10 taglines MUST cover a DIFFERENT angle. Mix these:
   - ACTION: a verb invitation ("Pour over. Take notes.")
   - CRAFT: nodding to the method ("Slow-roasted since dawn")
   - PROMISE: a specific outcome ("Lunch in twelve minutes")
   - ATTITUDE: a stance or worldview ("Spice that doesn't apologise")
   - WORDPLAY: a clever phrase or twist ("Brewed for the long game")
   - PLACE: a sense of where ("Made on the corner")
   - SENSORY: a taste, sound, texture ("Crackle, steam, repeat")

2. AVOID these cliché taglines:
   - "Just do it" / "Think different" / anything that copies a famous brand
   - "Quality you can taste / trust / feel"
   - "Experience the difference"
   - "[verb] better"
   - "Where [adjective] meets [adjective]"
   - "Your daily [anything]"

3. Each tagline must feel different from the others — not 10 variations of the same idea.

GOOD EXAMPLES:
- "Slow-brewed, never slow served"
- "From the wok, to the table"
- "Two ingredients, no shortcuts"
- "Friday-night dough, every night"
- "Pour over. Take a breath."
- "Sourdough, soup, sourdough."

BAD EXAMPLES (lazy / generic):
- "Quality you can taste"
- "Brewed with love"
- "Coffee, perfected"
- "Where flavour meets passion"

${ctx}

Generate exactly 10 distinct taglines following the rules above. Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
  }

  if (req.kind === 'impression') {
    return `You are helping a small-business owner pick 3 mood words that describe how their brand should feel to customers. Pick the 12 most-fitting words for THIS brand specifically — not generic. Each word should be a single English adjective, capitalized (e.g. "Bold", "Trustworthy", "Grounded"). Tailor to the industry: a law firm should feel "Trustworthy / Authoritative / Discreet", a yoga studio should feel "Calm / Grounded / Soulful", a Sichuan hot-pot place should feel "Bold / Authentic / Communal". Avoid duplicates.

${ctx}

Generate exactly 12 distinct single-word mood adjectives. Respond with ONLY a JSON object of shape: { "suggestions": ["Bold", "Trustworthy", "...", ...] }`
  }

  if (req.kind === 'palette') {
    return `You are helping a small-business owner pick a brand colour palette. Generate 6 distinct palettes specifically suitable for THIS brand. Tailor heavily to industry and niche — a Sichuan hot-pot restaurant should get red/gold/charcoal Chinese-restaurant aesthetics, a yoga studio should get earth tones (sage, terracotta, cream), a tech SaaS should get blues/slates/electric accents. Each palette should be cohesive and printable.

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
        body.kind === 'palette' || body.kind === 'style'
          ? 0.7
          : body.kind === 'industry'
          ? 0.4
          : body.kind === 'description'
          ? 0.25 // very low — plain, literal descriptions, no creative drift
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
