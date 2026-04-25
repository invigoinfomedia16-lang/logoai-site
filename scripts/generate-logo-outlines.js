/*
  generate-logo-outlines.js
  Converts each of the 16 LOGO.AI logos into a clean hand-drawn outline version.
  Uses Replicate + Flux Kontext Pro (image-to-image edit).

  Prereqs:
    - REPLICATE_API_TOKEN in .env.local
    - Source logos in public/Images/Logos/
  Output:
    - public/Images/Logos/outlines/{name}-outline.webp
*/

const fs = require('fs')
const path = require('path')
const Replicate = require('replicate')

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const [k, ...rest] = line.split('=')
    if (k && rest.length) process.env[k.trim()] = rest.join('=').trim()
  })
}

if (!process.env.REPLICATE_API_TOKEN) {
  console.error('✗ REPLICATE_API_TOKEN missing from .env.local')
  process.exit(1)
}

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'Images', 'Logos')
const OUT_DIR = path.join(SOURCE_DIR, 'outlines')

// 12 most iconic + varied logos (skipped cleaning/landscaping/ecommerce/content-creator)
const SOURCES = [
  'restaurant-logo-1.webp',
  'coffee-shop-logo-1.webp',
  'bakery-logo-1.webp',
  'food-truck-logo-1.webp',
  'barbershop-logo-1.webp',
  'hair-salon-logo-1.webp',
  'nail-studio-logo-1.webp',
  'boutique-logo-1.webp',
  'clothing-brand-logo-1.webp',
  'gym-logo-1.webp',
  'pet-grooming-logo-1.webp',
  'tattoo-studio-logo-1.webp',
]

const PROMPT = `Convert this logo into a clean minimalist line drawing sketch.
Use only thin black outlines on a plain white background.
Remove all color, shading, gradients, and fills — just clean single-weight pen strokes.
Keep the same composition and key elements, but render them as if someone hand-drew them with a fine-tip pen.
Style: minimal, elegant, hand-sketched, black ink on white paper.
No text styling beyond the original letters. Do not add decorations.`

async function processOne(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename)
  const outName = filename.replace(/\.(webp|png|jpg)$/i, '-outline.png')
  const outPath = path.join(OUT_DIR, outName)

  if (fs.existsSync(outPath)) {
    console.log(`  ⇢ skip (exists): ${outName}`)
    return
  }

  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ✗ missing source: ${filename}`)
    return
  }

  console.log(`  ↑ uploading ${filename}…`)
  const imageBuffer = fs.readFileSync(sourcePath)
  const base64 = `data:image/webp;base64,${imageBuffer.toString('base64')}`

  console.log(`  ⟳ generating outline…`)
  const output = await replicate.run(
    'black-forest-labs/flux-kontext-pro',
    {
      input: {
        prompt: PROMPT,
        input_image: base64,
        aspect_ratio: 'match_input_image',
        output_format: 'png',
        safety_tolerance: 2,
      },
    }
  )

  // `output` is a file-like object or URL. Normalize.
  const url = typeof output === 'string' ? output : (output?.url ? output.url() : String(output))
  console.log(`  ↓ downloading from ${url.toString().slice(0, 80)}…`)

  const res = await fetch(url.toString())
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outPath, buf)
  console.log(`  ✓ saved: ${outName} (${(buf.length / 1024).toFixed(1)}KB)`)
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  console.log(`→ Generating ${SOURCES.length} outline logos into ${OUT_DIR}\n`)

  for (let i = 0; i < SOURCES.length; i++) {
    console.log(`[${i + 1}/${SOURCES.length}] ${SOURCES[i]}`)
    try {
      await processOne(SOURCES[i])
    } catch (e) {
      console.error(`  ✗ failed: ${e.message}`)
    }
    console.log('')
  }

  console.log('✓ Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
