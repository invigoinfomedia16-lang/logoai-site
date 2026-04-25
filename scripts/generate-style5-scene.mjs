/**
 * Style 5 · Bold Editorial Scene (object-only, no people) — one-shot generator.
 * Same Humaaans/Blush aesthetic as Style 4, but pure environmental scene.
 * Uses black-forest-labs/flux-1.1-pro for best prompt adherence.
 *
 * Edit TARGET below, run:
 *   node scripts/generate-style5-scene.mjs
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

// ── TARGET — Problem section, Bold Editorial Scene (no people) ────────────
const TARGET = {
  slug: 'problem-style5-scene',
  aspect_ratio: '4:3',
  prompt: `Bold modern editorial illustration in the Humaaans / Blush scene aesthetic — thick uniform deep-purple outlines, flat vector style, generous negative space, warm cream background. Absolutely NO human figures, NO animals, NO faces, NO hands, NO bodies — this is a pure environmental scene. The story is told entirely through objects.

Scene: an abandoned workspace after a failed design session, telling the story of two bad paths.

On the LEFT side of the composition (the expensive-designer path): a wooden desk with a computer monitor tilted at an angle. On the desk surface — three crumpled balls of paper (rejected logo drafts), a tipped-over coffee cup with a small spill puddle, an analog wall clock lying on its side, and a small stack of 3 coins. A chair is pushed back from the desk, turned slightly askew — as if someone just gave up and walked away.

On the RIGHT side of the composition (the DIY-template path): a tall stack of printed pages resting on the floor; the top page is visible and shows a neat 3x3 grid of nine identical starburst logo templates — mechanical and cookie-cutter.

In the BACKGROUND: a large window with venetian blinds partially open, through which you can see a simple abstract city skyline silhouette — a few geometric tower shapes, no specific buildings, no logos, no text.

FOREGROUND / accent details: one hanging plant suspended from the top of the frame, a potted plant with spiky leaves on the floor near the desk, a rolled-up rug or subtle floor shadow line.

Style: thick deep-purple outlines (roughly 3-4px apparent stroke), flat solid deep-purple fills for the chair, the coffee puddle, one or two plants, and interior architectural shadows. Most forms are outline-only with light interior. Clean editorial geometric construction, bold silhouettes, plenty of cream negative space. Refined but with slight line imperfection for hand-drawn character.

Strict rules: ABSOLUTELY NO human figures, NO animals, NO faces, NO hands, NO feet, NO bodies, NO silhouettes of people. NO text, NO letters, NO numerals, NO readable logos, NO brand names, NO watermarks.

Color palette strictly limited to: warm cream background (#FAF5EE), deep purple (#210340) for all outlines and solid fills, sparse soft mauve (#C7A8FF) for 1-2 tiny accent details only. Absolutely no black (use #210340 instead), no orange, no red, no blue, no green, no yellow, no skin tones.`,
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
