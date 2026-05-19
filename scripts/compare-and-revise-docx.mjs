// Reads each .docx in CONTENT/NEW, finds the corresponding page.tsx,
// extracts copy from each, identifies content that exists on the site but
// NOT in the .docx, and writes a "Revised" version with the new content
// marked in Purple Heart (#7543E3) plus a purple justification line under it.
//
// Pages with no net-new content are skipped (no file written).
// Originals in NEW/ are never touched — only writes to NEW/Revised/.

import fs from 'node:fs/promises'
import path from 'node:path'
import mammoth from 'mammoth'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx'

const NEW_DIR =
  'C:/Users/Shehnaz3110/Dropbox/ARTICLE TEMPLATES/SAAS TOOLS/LOGO AI/PRE-LAUNCH/CONTENT/NEW'
const REVISED_DIR = path.join(NEW_DIR, 'Revised')
const REPO_ROOT = process.cwd()
const PAGES_DIR = path.join(REPO_ROOT, 'app', 'design-l')

// ── DOCX → page.tsx file mapping ──────────────────────────────────────────
const MAPPING = [
  ['HOMEPAGE.docx',          'page.tsx'],
  ['PRODUCT.docx',           'product/page.tsx'],
  ['HOW It WORKS.docx',      'how-it-works/page.tsx'],
  ['EXAMPLES.docx',          'examples/page.tsx'],
  // .doc legacy file converted to .docx in TEMP via Word COM (see workflow note)
  [path.join(process.env.TEMP || process.env.TMP || 'C:/Users/Shehnaz3110/AppData/Local/Temp', 'WHY_LOGO_AI.docx'), 'why-logo-ai/page.tsx', 'WHY LOGO AI'],
  ["WHO IT'S FOR.docx",      'who-its-for/page.tsx'],
  ['ABOUT US.docx',          'about/page.tsx'],
  ['OUR STORY.docx',         'our-story/page.tsx'],
  ['LEADERSHIP.docx',        'leadership/page.tsx'],
  ['PRESS.docx',             'press/page.tsx'],
  ['CONTACT.docx',           'contact/page.tsx'],
  ['BLOG.docx',              'blog/page.tsx'],
  ['FAQ.docx',               'faq/page.tsx'],
  ['PRIVACY POLICY.docx',    'privacy/page.tsx'],
  ['TERMS OF SERVICE.docx',  'terms/page.tsx'],
  ['COOKIE POLICY.docx',     'cookies/page.tsx'],
]

const PURPLE = '7543E3' // Purple Heart, no leading #

// Normalize a string: collapse whitespace, decode HTML entities common in JSX,
// strip pure punctuation lines.
function normalize(s) {
  return s
    .replace(/‘|’|&apos;|&#x27;/g, "'")
    .replace(/“|”|&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&mdash;|—/g, '—')
    .replace(/&ndash;|–/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Read a .docx and return an ordered array of paragraphs (text only).
async function readDocxParagraphs(filepath) {
  const buf = await fs.readFile(filepath)
  const result = await mammoth.extractRawText({ buffer: buf })
  return result.value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

// Extract all human-visible text strings from a page.tsx file.
// We pull content from:
//   - JSX text nodes (>Hello world<)
//   - Common string-prop content (title=, body=, eyebrow=, label=, caption=, name=, role=, q=, a=, name=, etc.)
//   - Data arrays inside the file (objects with title/body/etc string fields)
function extractSiteCopy(source) {
  const strings = new Set()

  // 1. JSX text nodes — content between > and <
  const jsxText = source.match(/>([^<>{}\n]+?)</g) || []
  for (const m of jsxText) {
    const t = m.slice(1, -1).trim()
    if (t.length >= 3 && /[A-Za-z]/.test(t)) strings.add(t)
  }

  // 2. JSX expressions that contain string literals: {' text '}, {"text"}, {`text`}
  const jsxExpr = source.match(/\{['"`][^'"`{}\n][^'"`\n]*?['"`]\}/g) || []
  for (const m of jsxExpr) {
    const t = m.slice(2, -2).trim()
    if (t.length >= 3 && /[A-Za-z]/.test(t)) strings.add(t)
  }

  // 3. Common content props: title= body= eyebrow= label= caption= name= role= quote= ctaLabel=
  const propRe = /(?:title|body|eyebrow|label|caption|name|role|quote|q|a|num|t|h|tag|lede|intro|q|tail|callout|description|placeholder|subhead|ctaLabel|aria-label)\s*[=:]\s*(['"`])((?:\\.|(?!\1).)*?)\1/g
  let m
  while ((m = propRe.exec(source)) !== null) {
    const t = m[2].trim()
    if (t.length >= 3 && /[A-Za-z]/.test(t)) strings.add(t)
  }

  // 4. Object literal field strings inside arrays (data arrays in the file)
  // Match `: 'string'` or `: "string"` patterns
  const objStr = source.match(/:\s*['"`]([^'"`\n]{3,}?)['"`]/g) || []
  for (const raw of objStr) {
    const m2 = raw.match(/['"`]([^'"`\n]+)['"`]/)
    if (!m2) continue
    const t = m2[1].trim()
    if (t.length >= 3 && /[A-Za-z]/.test(t) && !/^[a-z-]+$/.test(t)) strings.add(t)
  }

  // Filter out things that are clearly code/css/identifiers
  const clean = []
  for (const s of strings) {
    // Skip CSS/style fragments
    if (/^(rgba?\(|#[0-9a-f]{3,8}\b|\d+px$|\d+em$|\d+rem$|\d+%$|var\(|clamp\(|linear-gradient\(|radial-gradient\()/i.test(s)) continue
    if (/^[a-z][a-z0-9-]*-[a-z0-9-]+$/.test(s) && s.length < 30) continue // class names like "dk-body"
    if (/^https?:\/\//.test(s)) continue
    if (/^\/[^\s]*$/.test(s) && s.length < 80) continue // paths/URLs
    if (/^[a-z]+:[a-z\s]+/i.test(s) && s.length < 30) continue // css inline
    if (/^(true|false|null|undefined)$/.test(s)) continue
    if (/^[A-Z_]+$/.test(s)) continue // CONSTS
    if (/^[a-zA-Z0-9_-]+$/.test(s) && s.length < 14) continue // probably id/key
    if (/^Mozilla|Outfit|DM Serif|Inter|sans-serif|serif|Bricolage|Sora|Poppins|Bebas|Oswald|Anton|Archivo|Abril|Bodoni|Fraunces|Instrument|Lilita|Lobster|Bungee|Rubik|Modak|Playfair/.test(s)) continue // font names
    if (/^(scale\(|translate|rotate\(|matrix\(|cubic-bezier|ease|ease-in|ease-out|ease-in-out)/.test(s)) continue // CSS transforms
    if (/^(\d+(\.\d+)?(px|em|rem|%|s|ms|deg)\b\s?)+$/.test(s)) continue // pure numeric css values
    if (/object-(cover|contain|fit)|^(absolute|relative|fixed|sticky|inset-0|flex|grid)\s/.test(s)) continue
    if (/^[\w-]+\s\d+(\.\d+)?s?\s/.test(s)) continue // animation defs
    // Skip strings that are mostly punctuation/symbols (e.g. arrow chars)
    const letters = (s.match(/[A-Za-z]/g) || []).length
    if (letters / s.length < 0.4) continue
    clean.push(s)
  }
  return clean
}

// Sentence-ish chunks from a long string.
function sentences(s) {
  return s
    .split(/(?<=[.!?])\s+(?=[A-Z(])/)
    .map((x) => x.trim())
    .filter((x) => x.length >= 3)
}

// Decide whether a site-string is "covered" by the docx text.
// We use a fuzzy include: normalize both, then check substring or high-overlap word match.
function isCovered(needle, hayNorm, hayWords) {
  const n = normalize(needle)
  if (n.length < 4) return true
  if (hayNorm.includes(n)) return true
  // Word-overlap fallback for slightly reworded copy
  const tokens = n.toLowerCase().split(/\W+/).filter((w) => w.length >= 4)
  if (tokens.length === 0) return true
  let hits = 0
  for (const t of tokens) if (hayWords.has(t)) hits++
  return hits / tokens.length >= 0.85 // 85% of meaningful tokens present
}

// Build the docx output for one page.
function buildDocx({ pageTitle, originalParagraphs, additions }) {
  const paragraphs = []

  // Header
  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: pageTitle, bold: true })],
    }),
  )
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Revised — purple text = added on the live site, not present in original .docx',
          italics: true,
          color: PURPLE,
          size: 20,
        }),
      ],
    }),
  )
  paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }))

  // Original copy block
  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: 'Original copy (unchanged)', bold: true })],
    }),
  )
  for (const p of originalParagraphs) {
    paragraphs.push(new Paragraph({ children: [new TextRun({ text: p })] }))
  }
  paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }))

  // Additions block
  paragraphs.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: `Net-new content on the live site (${additions.length} item${additions.length === 1 ? '' : 's'})`,
          bold: true,
          color: PURPLE,
        }),
      ],
    }),
  )
  for (const a of additions) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 120 },
        children: [
          new TextRun({ text: '• ', bold: true, color: PURPLE }),
          new TextRun({ text: a.text, color: PURPLE, bold: true }),
        ],
      }),
    )
    paragraphs.push(
      new Paragraph({
        indent: { left: 360 },
        children: [
          new TextRun({
            text: `[Justification: ${a.justification}]`,
            italics: true,
            color: PURPLE,
            size: 20,
          }),
        ],
      }),
    )
  }

  return new Document({ sections: [{ properties: {}, children: paragraphs }] })
}

// Heuristic justifications based on what kind of content it is.
function justify(text) {
  const t = text.toLowerCase()
  // Section headers / eyebrows
  if (/^(see it in action|how to reach us|still stuck|the walkthrough|what sets us apart|our founders|the basics|by industry)/i.test(text)) {
    return 'Added as section eyebrow/heading for visual consistency across sub-pages'
  }
  if (/^(video coming soon|no credit card|launching june 2026)/i.test(t)) {
    return 'UI caption/microcopy added on the site for clarity'
  }
  if (/coming soon|placeholder|free logos|until launch|spots left/i.test(t)) {
    return 'Live-counter or launch-state UI copy not part of the original brief'
  }
  if (/get my free logo|claim your|reserve your/i.test(t)) {
    return 'CTA button label used across the L design'
  }
  if (/two brothers\. one conviction|five reasons|three steps\. sixty seconds/i.test(t)) {
    return 'Eyebrow/title added during section-header consistency pass'
  }
  if (/youre on the list|you\'re on the list|on the list|we\'ll email you/i.test(t)) {
    return 'Email-success state added on the site (not in the original copy doc)'
  }
  if (/perfect patch|smashtown|hearth & grind|corner oven|streetstack|steel & blade|rosewood|blossom|prairie rose|street wolf|apex combat|freshnest|happy tail|ecomarket|pixelforge|pixel raider|dead rose/i.test(t)) {
    return 'Industry tile cover-image label / brand example used on the live site'
  }
  return 'Net-new copy on the site that does not appear in the original .docx'
}

async function processOne(docxName, pageRel, displayNameOverride) {
  // docxName may be an absolute path (for the converted legacy .doc) or just a filename
  const docxPath = path.isAbsolute(docxName) ? docxName : path.join(NEW_DIR, docxName)
  const pagePath = path.join(PAGES_DIR, pageRel)
  const displayName = displayNameOverride || path.basename(docxName).replace(/\.docx?$/i, '').trim()

  const [docxParas, pageSrc] = await Promise.all([
    readDocxParagraphs(docxPath),
    fs.readFile(pagePath, 'utf8'),
  ])

  const docxText = docxParas.join('\n')
  const docxNorm = normalize(docxText)
  const docxWords = new Set(
    docxNorm
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 4),
  )

  const siteStrings = extractSiteCopy(pageSrc)

  // Expand: split long strings into sentences so we can flag a single new
  // sentence inside a longer paragraph that mostly matches.
  const expanded = []
  for (const s of siteStrings) {
    const ss = sentences(s)
    if (ss.length > 1) expanded.push(...ss)
    else expanded.push(s)
  }

  // De-dupe by normalized form
  const seen = new Set()
  const uniqueSite = []
  for (const s of expanded) {
    const k = normalize(s).toLowerCase()
    if (seen.has(k)) continue
    seen.add(k)
    uniqueSite.push(s)
  }

  // Filter: skip strings that are obviously not human-facing prose
  const candidates = uniqueSite.filter((s) => {
    if (s.length < 4) return false
    if (/^\d+$/.test(s)) return false
    if (/^[#\/.,:;\-_]+$/.test(s)) return false
    return true
  })

  const additions = []
  for (const c of candidates) {
    if (!isCovered(c, docxNorm, docxWords)) {
      additions.push({ text: c, justification: justify(c) })
    }
  }

  // De-dupe additions and trim absurdly long ones
  const uniqAdds = []
  const addSeen = new Set()
  for (const a of additions) {
    const k = normalize(a.text).toLowerCase()
    if (addSeen.has(k)) continue
    addSeen.add(k)
    uniqAdds.push(a)
  }

  // Sort additions: short headings/eyebrows first, longer paragraphs after
  uniqAdds.sort((a, b) => a.text.length - b.text.length)

  return {
    docxName: displayName,
    pagePath,
    originalParagraphs: docxParas,
    additions: uniqAdds,
    pageTitle: displayName,
  }
}

async function main() {
  await fs.mkdir(REVISED_DIR, { recursive: true })

  const summary = []
  for (const entry of MAPPING) {
    const [docxName, pageRel, displayName] = entry
    try {
      const result = await processOne(docxName, pageRel, displayName)
      if (result.additions.length === 0) {
        summary.push({ docxName, action: 'skipped (no additions)', count: 0 })
        continue
      }
      const doc = buildDocx({
        pageTitle: result.pageTitle,
        originalParagraphs: result.originalParagraphs,
        additions: result.additions,
      })
      const buf = await Packer.toBuffer(doc)
      const outName = result.pageTitle + ' — REVISED.docx'
      const outPath = path.join(REVISED_DIR, outName)
      await fs.writeFile(outPath, buf)
      summary.push({
        docxName,
        action: 'wrote ' + outName,
        count: result.additions.length,
      })
    } catch (err) {
      summary.push({ docxName, action: 'ERROR: ' + err.message, count: 0 })
    }
  }

  console.log('\n=== Summary ===')
  for (const s of summary) {
    const tag = s.count > 0 ? `+${s.count}` : ' 0'
    console.log(`${tag.padStart(4, ' ')}  ${s.docxName.padEnd(28)} → ${s.action}`)
  }
  console.log('\nRevised files written to:', REVISED_DIR)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
