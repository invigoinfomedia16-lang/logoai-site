/**
 * Style 2 · Hand-drawn Ink Line (Notion direction, purple) — one-shot generator.
 * Uses recraft-ai/recraft-v3 + digital_illustration/hand_drawn_outline preset.
 *
 * Edit TARGET below, run:
 *   node scripts/generate-style2-handdrawn.mjs
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

// ── TARGET — Problem section, Hand-drawn Ink Line ─────────────────────────
const TARGET = {
  slug: 'problem-style2-handdrawn',
  size: '1365x1024',                                 // 4:3
  style: 'digital_illustration/hand_drawn_outline',  // thin single-weight ink line
  prompt: `Minimalist hand-drawn line art illustration, Notion documentation style. Conveys the frustration of being STUCK between two bad choices.

Scene: overhead top-down view of a designer's wooden desk, split visually into two sides by a single vertical pencil line running down the middle.

LEFT side (the "hire a designer" path): three crumpled balls of paper (rejected logo drafts), an invoice with a big dollar-sign scribble on it, a vintage analog clock showing a late hour, a slow-dripping hourglass. Objects feel heavy and scattered.

RIGHT side (the "DIY template" path): a perfectly neat 3-by-3 grid of nine nearly-identical simple starburst logo sketches, all the same, cookie-cutter and mechanical. Objects feel sterile and uniform.

IN THE MIDDLE: a single tired HAND (no arm above wrist, no body, no face) slumped across the dividing line, weakly holding a worn pencil. The hand is the emotional anchor.

Style: clean thin uniform PURPLE hand-drawn outlines on every object, single stroke weight, expressive but loose. Very minimal lavender fills inside a few shapes for subtle depth. Lots of empty cream negative space. Casual, imperfect, expressive hand-drawn quality.

Strict rules: NO face, NO body, NO arm above the wrist. NO text anywhere, NO letters, NO numbers except simple clock marks (2 small ticks). NO logos with readable names. NO brand names.

Color palette strictly limited to: deep purple #210340 (outlines), lavender #C7A8FF (soft fills), cream #F5F0FF (background). Absolutely no orange, no pink, no red, no green, no warm colors.`,
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
      colors: [
        { rgb: [33, 3, 64] },      // #210340 Tolopea (outlines)
        { rgb: [117, 67, 227] },   // #7543E3 Purple Heart
        { rgb: [199, 168, 255] },  // #C7A8FF Mauve (soft fills)
        { rgb: [245, 240, 255] },  // #F5F0FF cream background
      ],
    },
  })
  const url = typeof output === 'string' ? output : (Array.isArray(output) ? output[0] : output?.url?.() ?? output)
  if (!url) throw new Error('no url returned')
  const outPath = path.join(OUT_DIR, `${TARGET.slug}.webp`)
  await fetchToFile(url, outPath)
  console.log(`  ✓ saved ${path.relative(ROOT, outPath)}`)
  console.log(`  (not wired into any page — review the file, then tell me to integrate)`)
})().catch((e) => { console.error(e); process.exit(1) })
