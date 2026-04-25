/**
 * One-shot illustration generator.
 * Uses recraft-ai/recraft-v3 — a model specifically tuned for flat / vector /
 * hand-drawn style illustrations. Style preset passed as `style` arg.
 *
 * Edit TARGET below, run:
 *   node scripts/generate-one.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Replicate from 'replicate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// Load .env.local (no external deps)
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

// ── TARGET — edit this for each one-off run ───────────────────────────────
// Notion-style: simple hand-drawn line illustrations, ONE clear concept per image.
// Keep the prompt SHORT. Long prompts → flux-style detailed scenes, not Notion minimalism.
const TARGET = {
  slug: 'problem',
  size: '1365x1024',                            // ≈ 4:3 aspect
  style: 'digital_illustration/hand_drawn_outline', // line art — thin outlined drawings
  prompt: `Minimalist hand-drawn line art illustration, Notion documentation style. Conveys EXHAUSTION and FRUSTRATION with a broken design process.

Scene on a clean cream background: an overhead view of a designer's desk at the end of a long night. The main focal element is a single HAND (no arm above wrist, no body, no face) slumped tired across the desk, still weakly holding a worn pencil. Around the hand: three crumpled balls of paper (failed logo drafts), one half-drawn incomplete logo sketch visible on a flat sheet, a vintage analog clock showing very late hours (2 AM), an empty coffee cup lying on its side with a few drops spilled.

Style: clean thin uniform PURPLE hand-drawn outline on every object. Very minimal lavender fills inside shapes, lots of empty cream negative space around the scene. Objects loosely scattered — medium density, 5 elements total. Casual, expressive, hand-drawn quality.

Strict rules: NO face, NO body, NO arm above the wrist. NO text anywhere, NO letters, NO numbers except the clock face (2 simple marks is ok), NO logos with readable names, NO brand names. Color palette limited to deep purple #210340 (outlines), lavender #C7A8FF (soft fills), cream #F5F0FF (background). Absolutely no orange, no pink, no warm colors.`,
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
  console.log(`→ generating: ${TARGET.slug} (recraft-v3, ${TARGET.style})`)
  const output = await replicate.run('recraft-ai/recraft-v3', {
    input: {
      prompt: TARGET.prompt,
      size: TARGET.size,
      style: TARGET.style,
      // Firefox palette — recraft will bias toward these RGB values
      colors: [
        { rgb: [33, 3, 64] },      // #210340 Tolopea
        { rgb: [117, 67, 227] },   // #7543E3 Purple Heart
        { rgb: [199, 168, 255] },  // #C7A8FF Mauve
        { rgb: [245, 240, 255] },  // #F5F0FF pale lilac (near-white background)
      ],
    },
  })
  const url = typeof output === 'string' ? output : (Array.isArray(output) ? output[0] : output?.url?.() ?? output)
  if (!url) throw new Error('no url returned')
  // Recraft returns a PNG URL; save it as .webp via the same extension (browsers handle either; Next.js re-optimizes)
  const outPath = path.join(OUT_DIR, `${TARGET.slug}.webp`)
  await fetchToFile(url, outPath)
  console.log(`  ✓ saved ${path.relative(ROOT, outPath)}`)
  console.log(`  ↻ clear Next.js cache + hard-refresh:`)
  console.log(`     rm -rf .next/cache/images && reload http://localhost:3000/design-l/our-story-ai-illustrated`)
})().catch((e) => { console.error(e); process.exit(1) })
