/**
 * Generate Our Story illustrations via Replicate.
 *
 * Produces 6 "section" illustrations:
 *   problem, turning-point, how-built (3 pillar icons), the-name
 *
 * Before/After milestone illustrations are intentionally skipped — that section
 * keeps the dark placeholder until real image pairs are available.
 *
 * Run once (costs ~$0.03 total on flux-schnell):
 *   REPLICATE_API_TOKEN=xxx node scripts/generate-our-story-illustrations.mjs
 *
 * The .env.local loader at the top of this file picks up the token automatically
 * if the env var isn't set in the shell.
 *
 * Outputs land in /public/images/our-story/ as .webp files.
 * Re-run any time to regenerate (it overwrites).
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Replicate from 'replicate'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ── Load .env.local (simple parser — no external deps) ─────────────────────
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  const raw = fs.readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) {
      let val = m[2]
      // strip surrounding quotes if present
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      process.env[m[1]] = val
    }
  }
}

if (!process.env.REPLICATE_API_TOKEN) {
  console.error('✗ REPLICATE_API_TOKEN not found in env or .env.local')
  process.exit(1)
}

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

// ── Model + shared style ───────────────────────────────────────────────────
// flux-schnell: ~$0.003/image, 4-step fast diffusion, good for flat illustrations
const MODEL = 'black-forest-labs/flux-schnell'

// Shared style clause appended to every prompt to enforce the look
const STYLE = [
  'flat vector illustration style',
  'minimalist geometric shapes',
  'purple and white color palette',
  'colors: deep purple #210340, bright purple #7543E3, lavender #C7A8FF, white #FFFFFF',
  'clean lines, no photorealism, no gradients, no shadows',
  'centered composition, solid white or pale lavender background',
  'no text, no letters, no words in the image',
].join(', ')

// ── Generation targets ─────────────────────────────────────────────────────
const TARGETS = [
  // Section illustrations
  {
    slug: 'problem',
    prompt: `${STYLE}. A balanced composition showing two contrasting options: on the left a clock with currency symbols representing slow expensive design, on the right a stack of identical rectangles representing generic templates, separated by a subtle divider`,
    aspect: '4:3',
  },
  {
    slug: 'turning-point',
    prompt: `${STYLE}. A stylized starburst or explosion of light emanating from a central glowing circle, representing a breakthrough idea or AI insight moment, radiating rays outward`,
    aspect: '4:3',
  },
  {
    slug: 'how-built-study',
    prompt: `${STYLE}. A stylized open book with pages fanning out, representing design education and studying classic logo design principles`,
    aspect: '1:1',
  },
  {
    slug: 'how-built-no-template',
    prompt: `${STYLE}. A 2x2 grid of identical square template tiles with a bold diagonal slash line crossing through them, representing the rejection of template-based design`,
    aspect: '1:1',
  },
  {
    slug: 'how-built-badge',
    prompt: `${STYLE}. A circular award badge or rosette with a bold checkmark in the center, representing passing a quality test or certification`,
    aspect: '1:1',
  },
  {
    slug: 'the-name',
    prompt: `${STYLE}. A stylized web browser window frame with rounded corners, empty URL bar, representing a premium web domain, no letters or text visible`,
    aspect: '4:3',
  },
]

// ── Run ────────────────────────────────────────────────────────────────────
const OUT_DIR = path.join(ROOT, 'public', 'images', 'our-story')
fs.mkdirSync(OUT_DIR, { recursive: true })

async function fetchToFile(url, outPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outPath, buf)
}

async function generate(target) {
  const { slug, prompt, aspect } = target
  console.log(`→ generating: ${slug}`)

  const input = {
    prompt,
    aspect_ratio: aspect,
    output_format: 'webp',
    output_quality: 90,
    num_outputs: 1,
    megapixels: '1',
  }

  const output = await replicate.run(MODEL, { input })
  // flux-schnell returns an array of urls; some SDK versions return a FileOutput object
  const urls = (Array.isArray(output) ? output : [output]).map((x) =>
    typeof x === 'string' ? x : (x?.url?.() ?? x)
  )

  if (!urls[0]) throw new Error(`no url returned for ${slug}`)
  const outPath = path.join(OUT_DIR, `${slug}.webp`)
  await fetchToFile(urls[0], outPath)
  console.log(`  ✓ saved ${path.relative(ROOT, outPath)}`)
}

;(async () => {
  for (const t of TARGETS) {
    try {
      await generate(t)
    } catch (e) {
      console.error(`✗ failed ${t.slug}: ${e.message}`)
    }
  }
  console.log('\nDone. Images in public/images/our-story/')
})()
