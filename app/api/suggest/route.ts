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
    return `You are helping a small-business owner fill in a one-sentence description of THEIR OWN business, for an AI logo generator. Their brand name and industry are in the context below. Produce 10 description options they can pick from or lightly edit.

WHAT A GOOD OPTION IS:
- It reads like a plain, real description of what the business does — not a slogan, not a story.
- All 10 describe the SAME business (the one in the context). They are alternative wordings the user chooses between — NOT 10 different businesses.
- 8-16 words, clear and natural. Mix first-person ("We make...") and neutral ("A studio that...") phrasings.
- Vary the wording, length, and which facet leads (what they make / who it serves / how it works) — but every option must stay consistent and plausible for that one business.

STRICT — NEVER DO THIS:
- Do NOT invent specifics the user did not provide — no made-up product names, flavours, founder or family backstory, locations, dates, or customer quotes. Describe the business only at the level its industry tells you.
- Do NOT write storytelling or marketing copy ("Each jar holds a story...", "bursts with flavour", "lovingly crafted").
- Avoid clichés: "made with love", "quality you can taste", "your go-to", "in the heart of", "elevating the experience".

EXAMPLE — for a bakery, GOOD options look like:
- "A neighbourhood bakery making fresh bread and pastries daily."
- "We bake handmade breads, cakes, and pastries from scratch."
- "A small-batch bakery specialising in sourdough and seasonal pastries."
EXAMPLE — BAD options (invent specifics / tell a story — never do this):
- "Each loaf carries my grandmother's recipe and a story of home."
- "We hand-fold our croissants at dawn so every bite bursts with butter."

${ctx}

Generate exactly 10 distinct description options for the business in the context above. Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
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
      temperature: body.kind === 'palette' || body.kind === 'style' ? 0.7 : body.kind === 'industry' ? 0.4 : 0.85,
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
