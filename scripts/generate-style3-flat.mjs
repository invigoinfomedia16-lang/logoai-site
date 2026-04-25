/**
 * Style 3 · Flat Geometric Vector (Linear + Figma blend) — one-shot generator.
 * Uses recraft-ai/recraft-v3 + vector_illustration preset (pure flat shapes).
 *
 * Edit TARGET below, run:
 *   node scripts/generate-style3-flat.mjs
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

// ── TARGET — Problem section, Flat Geometric Vector ───────────────────────
const TARGET = {
  slug: 'problem-style3-flat',
  size: '1365x1024',                         // 4:3
  style: 'digital_illustration/2d_art_poster', // flat modernist poster style (closest to pure vector)
  prompt: `Flat geometric vector illustration, strict modernist minimal style, like Linear and Figma marketing pages. Composition conveys being stuck between two bad choices.

Split vertically into two halves by a thin vertical line in deep purple down the middle.

LEFT half ("hire a designer" path): three stacked flat rectangles in deep purple #210340 representing weeks of waiting, a flat geometric hourglass shape in purple heart #7543E3 with sand still draining, a flat stack of three circular coins in mauve #C7A8FF. Compositions are heavy, weighted at the bottom, oppressive.

RIGHT half ("DIY template" path): a perfectly uniform 3-by-3 grid of nine identical flat starburst logo marks, all in mauve #C7A8FF, each one the same cookie-cutter shape. Mechanical, sterile, repeating.

Overall: PURE FLAT SHAPES only. No gradients, no texture, no grain, no hand-drawn quality, no brush strokes. Strong silhouettes, sharp edges, high contrast. Modernist Swiss-design feel, like a Linear.app landing-page graphic. Generous negative space.

Strict rules: NO human figures, NO faces, NO hands, NO animals, NO photography, NO readable text, NO letters, NO numerals. Everything is abstract flat geometric shapes.

Color palette strictly limited to: cream/off-white background #F5F0FF, deep purple #210340, purple heart #7543E3, soft mauve #C7A8FF. Absolutely no other colors — no blue, no green, no red, no orange, no yellow.`,
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
        { rgb: [33, 3, 64] },      // #210340 Tolopea
        { rgb: [117, 67, 227] },   // #7543E3 Purple Heart
        { rgb: [199, 168, 255] },  // #C7A8FF Mauve
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
