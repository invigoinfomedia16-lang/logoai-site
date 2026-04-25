/**
 * Style 1 · Editorial Painterly (Anthropic direction) — one-shot generator.
 * Uses black-forest-labs/flux-1.1-pro — strong for artistic/textured/painterly renders.
 *
 * Edit TARGET below, run:
 *   node scripts/generate-style1-editorial.mjs
 *
 * Output → public/images/our-story/<slug>.webp
 * This file is NOT wired into the page yet. Review the image first.
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

// ── TARGET — Problem section, Editorial Painterly style ───────────────────
const TARGET = {
  slug: 'problem-style1-editorial',
  aspect_ratio: '4:3',
  prompt: `Swiss-style mid-century editorial illustration in painterly poster style, on textured warm cream paper. Composition split vertically into two halves by a thin dark seam down the middle, suggesting a broken choice.

Left half: a looming, heavy pile of crumpled designer sketches in deep purple ink, painterly brush-stroke edges, oppressive and overwhelming. Above it, an hourglass slowly draining purple sand (most sand is still on top — time is dragging). Beside it, a tall stack of coins suggesting expense. Shapes feel weighed-down and trapped.

Right half: a neat 3-by-3 grid of nine identical starburst logo marks in soft mauve, perfectly uniform and cookie-cutter, mechanically arranged on a lighter cream background. Soulless, sterile repetition.

Between the two halves: a thin vertical empty seam, a narrow dark gap, signifying there is no way through.

Overall aesthetic: Swiss poster design, mid-century editorial magazine cover, painterly texture with visible brush strokes, subtle paper grain. The two halves should visually contrast heavy-dark-expensive against uniform-light-generic — both equally broken.

Strict rules: NO human figures, NO faces, NO hands, NO animals, NO legible text, NO letters, NO recognizable logos, NO brand names.

Color palette strictly limited to: warm cream background, deep purple #210340, purple heart #7543E3, soft mauve #C7A8FF. Absolutely no orange, no green, no pink, no red, no blue, no warm tones outside the cream base.`,
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
