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
    return `You are helping a small-business owner pick a one-sentence description of their brand for an AI logo generator. Each description must be 10-15 words, founder-voiced, and CONCRETE — not generic marketing copy.

CRITICAL RULES:
1. Each of the 10 descriptions MUST cover a DIFFERENT angle from this list. Use each angle at most twice:
   - WHAT: the actual product or service in plain words
   - WHO: a specific audience or customer segment
   - VIBE: the feel, mood, or aesthetic
   - METHOD: the craft, process, or how it's made
   - ORIGIN: founder story, heritage, or backstory
   - SCALE: solo / neighbourhood / national / niche
   - PROMISE: the unique thing they deliver
   - PHYSICAL: the space, location, or environment

2. AVOID these cliché phrases entirely (they appear in 80% of bad AI outputs):
   - "serving fresh / locally-sourced"
   - "perfect for busy families / professionals"
   - "made with love / passion / care"
   - "quality you can taste"
   - "in the heart of"
   - "for the modern [anything]"
   - "your go-to spot"
   - "elevating the [anything] experience"

3. Each description should include AT LEAST ONE CONCRETE DETAIL — a specific dish, a place, a customer type, a process, a material, a time of day. Avoid abstract adjectives.

GOOD EXAMPLES (notice the variety of angles, specificity, and rhythm):
- "Single-origin pour-over coffee for early-shift workers and freelancers."
- "Two siblings, one wood-fired oven, sourdough pizza Tuesday through Saturday."
- "Hand-pulled noodles and chilli oil from a third-generation Sichuan family."
- "Open-kitchen tapas bar where every plate finishes at the table."
- "Catering for tech offices that want lunches engineers actually eat."

BAD EXAMPLES (notice the sameness, vagueness, and clichés — DO NOT do this):
- "A neighbourhood restaurant serving fresh, locally-sourced cuisine."
- "Authentic Chinese dishes made fresh for our local community."
- "Family-owned restaurant serving traditional recipes with care."
- "Casual dining experience featuring beloved favourites."

${ctx}

Generate exactly 10 distinct one-sentence descriptions following the rules above. Make each one feel like a different writer wrote it. Respond with ONLY a JSON object of shape: { "suggestions": ["...", "...", ...] }`
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
    return `You power a business-type typeahead for a logo generator. The user is typing into a "Business Type" search box and has entered: "${q}".

Return 8-10 SPECIFIC business-type suggestions that are variations on "${q}". Cover this spread:
- The 2-3 most literal, common interpretations of "${q}" first.
- A mobile / on-location version (e.g. "Mobile auto detailing").
- A luxury / premium version (e.g. "Luxury car detailing").
- An eco-friendly / sustainable version (e.g. "Eco-friendly auto detailing").
- A scale variation — solo/boutique vs franchise/chain (e.g. "Auto detailing franchise").
- 1-2 adjacent / related business types the user might also mean.

Rules:
- Each is a short label, 1-4 words. Be SPECIFIC, never broad — "Personal injury lawyer" not "Legal", "Hot yoga studio" not "Fitness".
- Sentence case (capitalize first word only) unless a proper noun.
- No duplicates. No descriptions — just the label.
- If "${q}" is too short or vague to interpret, return 8 common, popular business types instead.

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
