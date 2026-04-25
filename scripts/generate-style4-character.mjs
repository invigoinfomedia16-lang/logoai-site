/**
 * Style 4 · Bold Editorial Character (Humaaans / Blush aesthetic) — one-shot generator.
 * Uses black-forest-labs/flux-1.1-pro for best prompt adherence on this style.
 *
 * Edit TARGET below, run:
 *   node scripts/generate-style4-character.mjs
 *
 * Output → public/images/our-story/<slug>.webp
 * Not wired into any page — review the file, then tell me to integrate.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Replicate from 'replicate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load .env.local
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) {
      let val = m[2]
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
      process.env[m[1]] = val
    }
  }
}
if (!process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN missing'); process.exit(1) }

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

// ── TARGET — Problem section, Bold Editorial Character style ──────────────
const TARGET = {
  slug: 'problem-style4-character',
  aspect_ratio: '4:3',
  prompt: `Bold modern editorial character illustration in the Humaaans / Blush aesthetic — thick uniform outlines, solid color fills, stylized proportions, flat vector look.

Scene: a single tall slim stylized character sitting slumped forward on a simple wooden stool, elbows resting on their knees, head buried in both hands — visibly exhausted, overwhelmed, defeated. NO face visible (the hands cover it completely). Hair shown as a simple solid shape. The character's pants and shoes are solid deep purple; the shirt is outline-only with a light interior.

On the floor to the character's LEFT: a single crumpled ball of paper (a rejected logo sketch), a small tipped-over coffee cup, and an analog wall clock leaning against the stool.

On the floor to the character's RIGHT: a small neat grid of six identical rectangular logo templates, each one the same cookie-cutter mark.

Between them, the character is stuck in the middle — the visual focus is the character's body language: shoulders up, head down, hands covering face.

Style: thick deep-purple outlines (roughly 4-5px apparent stroke), flat solid deep-purple fills for pants/shoes/hair, minimal interior line detail, generous negative space around the character. Clean editorial composition, confident silhouette-heavy forms, modern SaaS-illustration feel. Slight imperfection in the line-work gives it a hand-drawn quality while staying refined.

Strict rules: NO visible face, NO facial features, NO nose, NO mouth, NO eyes (face is hidden behind hands). NO text, NO letters, NO numerals, NO readable logos, NO brand names. NO animals.

Color palette strictly limited to: warm cream background (#FAF5EE), deep purple (#210340) for all outlines and major fills, sparse soft mauve (#C7A8FF) for 1-2 small accent details only. Absolutely no black (use #210340 instead), no orange, no red, no blue, no green, no yellow, no skin tones, no photorealistic rendering.`,
}
// ───────────────────────────────────────────────────────────────────────────

const OUT_DIR = path.join(ROOT, 'public', 'images', 'our-story')
fs.mkdirSync(OUT_DIR, { recursive: true })

async function fetchToFile(url, outPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`)
  fs.writeFileSync(outPath, Buffer.from(await res.arrayBuffer()))
}

;(async () => {
  console.log(`→ generating: ${TARGET.slug} (flux-1.1-pro, ${TARGET.aspect_ratio})`)
  const output = await replicate.run('black-forest-labs/flux-1.1-pro', {
    input: {
      prompt: TARGET.prompt,
      aspect_ratio: TARGET.aspect_ratio,
      output_format: 'webp',
      output_quality: 90,
      safety_tolerance: 2,
      prompt_upsampling: false,
    },
  })
  const url = typeof output === 'string' ? output : (Array.isArray(output) ? output[0] : output?.url?.() ?? output)
  if (!url) throw new Error('no url returned')
  const outPath = path.join(OUT_DIR, `${TARGET.slug}.webp`)
  await fetchToFile(url, outPath)
  console.log(`  ✓ saved ${path.relative(ROOT, outPath)}`)
  console.log(`  (not wired into any page — review the file, then tell me to integrate)`)
})().catch((e) => { console.error(e); process.exit(1) })
