// Dumps each .docx alongside its page.tsx rendered copy into one markdown
// review file. Used for manual page-by-page comparison.

import fs from 'node:fs/promises'
import path from 'node:path'
import mammoth from 'mammoth'

const NEW_DIR =
  'C:/Users/Shehnaz3110/Dropbox/ARTICLE TEMPLATES/SAAS TOOLS/LOGO AI/PRE-LAUNCH/CONTENT/NEW'
const REPO_ROOT = process.cwd()
const PAGES_DIR = path.join(REPO_ROOT, 'app', 'design-l')
const TEMP_LEGACY = path.join(process.env.TEMP || 'C:/Temp', 'WHY_LOGO_AI.docx')

const MAPPING = [
  ['HOMEPAGE.docx', 'page.tsx'],
  ['PRODUCT.docx', 'product/page.tsx'],
  ['HOW It WORKS.docx', 'how-it-works/page.tsx'],
  ['EXAMPLES.docx', 'examples/page.tsx'],
  [TEMP_LEGACY, 'why-logo-ai/page.tsx', 'WHY LOGO AI'],
  ["WHO IT'S FOR.docx", 'who-its-for/page.tsx'],
  ['ABOUT US.docx', 'about/page.tsx'],
  ['OUR STORY.docx', 'our-story/page.tsx'],
  ['LEADERSHIP.docx', 'leadership/page.tsx'],
  ['PRESS.docx', 'press/page.tsx'],
  ['CONTACT.docx', 'contact/page.tsx'],
  ['BLOG.docx', 'blog/page.tsx'],
  ['FAQ.docx', 'faq/page.tsx'],
  ['PRIVACY POLICY.docx', 'privacy/page.tsx'],
  ['TERMS OF SERVICE.docx', 'terms/page.tsx'],
  ['COOKIE POLICY.docx', 'cookies/page.tsx'],
]

async function readDocxParas(p) {
  const abs = path.isAbsolute(p) ? p : path.join(NEW_DIR, p)
  const buf = await fs.readFile(abs)
  const r = await mammoth.extractRawText({ buffer: buf })
  return r.value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

// Pull human-visible strings from a page.tsx — same logic as before but
// keep order (use array, dedupe at end while preserving order)
function extractSiteStrings(source) {
  const seen = new Set()
  const out = []

  function add(s) {
    s = s.trim()
    if (s.length < 3) return
    if (!/[A-Za-z]/.test(s)) return
    if (/^(rgba?\(|#[0-9a-f]{3,8}\b|\d+px$|\d+em$|\d+rem$|\d+%$|var\(|clamp\(|linear-gradient\(|radial-gradient\()/i.test(s))
      return
    if (/^[a-z][a-z0-9-]*-[a-z0-9-]+$/.test(s) && s.length < 30) return
    if (/^https?:\/\//.test(s)) return
    if (/^\/[^\s]*$/.test(s) && s.length < 80) return
    if (/^[a-z]+:[a-z\s]+/i.test(s) && s.length < 30) return
    if (/^(true|false|null|undefined)$/.test(s)) return
    if (/^[A-Z_]+$/.test(s)) return
    if (/^[a-zA-Z0-9_-]+$/.test(s) && s.length < 14) return
    if (/^Mozilla|Outfit|DM Serif|Inter|sans-serif|serif|Bricolage|Sora|Poppins|Bebas|Oswald|Anton|Archivo|Abril|Bodoni|Fraunces|Instrument|Lilita|Lobster|Bungee|Rubik|Modak|Playfair/.test(s))
      return
    if (/^(scale\(|translate|rotate\(|matrix\(|cubic-bezier|ease|ease-in|ease-out|ease-in-out)/.test(s)) return
    if (/^(\d+(\.\d+)?(px|em|rem|%|s|ms|deg)\b\s?)+$/.test(s)) return
    if (/object-(cover|contain|fit)|^(absolute|relative|fixed|sticky|inset-0|flex|grid)\s/.test(s)) return
    if (/^[\w-]+\s\d+(\.\d+)?s?\s/.test(s)) return
    const letters = (s.match(/[A-Za-z]/g) || []).length
    if (letters / s.length < 0.4) return
    const k = s.toLowerCase().replace(/\s+/g, ' ')
    if (seen.has(k)) return
    seen.add(k)
    out.push(s)
  }

  // 1) JSX text nodes
  const jsxText = source.match(/>([^<>{}\n]+?)</g) || []
  for (const m of jsxText) add(m.slice(1, -1))

  // 2) JSX expressions with simple string literals
  const jsxExpr = source.match(/\{['"`][^'"`{}\n][^'"`\n]*?['"`]\}/g) || []
  for (const m of jsxExpr) add(m.slice(2, -2))

  // 3) Common content props
  const propRe =
    /(?:title|body|eyebrow|label|caption|name|role|quote|q|a|num|t|h|tag|lede|intro|tail|callout|description|placeholder|subhead|ctaLabel)\s*[=:]\s*(['"`])((?:\\.|(?!\1).)*?)\1/g
  let m
  while ((m = propRe.exec(source)) !== null) add(m[2])

  // 4) Object literal field strings
  const objStr = source.match(/:\s*['"`]([^'"`\n]{3,}?)['"`]/g) || []
  for (const raw of objStr) {
    const m2 = raw.match(/['"`]([^'"`\n]+)['"`]/)
    if (m2) add(m2[1])
  }

  // 5) Template-literal interpolations: ` ... ${...} ... ` — pull the text parts
  const tlRe = /`([^`]+)`/g
  while ((m = tlRe.exec(source)) !== null) {
    const parts = m[1].split(/\$\{[^}]*\}/g)
    for (const p of parts) add(p)
  }

  return out
}

async function main() {
  const reportLines = []
  reportLines.push('# Page-by-Page Side-by-Side Review')
  reportLines.push('')
  reportLines.push(
    'For each page: ORIGINAL .docx text on the left, SITE-extracted text on the right (deduped, in order).',
  )
  reportLines.push('')
  for (const entry of MAPPING) {
    const [docxPath, pageRel, displayName] = entry
    const display = displayName || path.basename(docxPath).replace(/\.docx?$/i, '')
    reportLines.push('---')
    reportLines.push('')
    reportLines.push(`## ${display}  →  ${pageRel}`)
    reportLines.push('')

    let docxParas, siteStrs
    try {
      docxParas = await readDocxParas(docxPath)
    } catch (e) {
      reportLines.push(`(could not read docx: ${e.message})`)
      continue
    }
    try {
      const src = await fs.readFile(path.join(PAGES_DIR, pageRel), 'utf8')
      siteStrs = extractSiteStrings(src)
    } catch (e) {
      reportLines.push(`(could not read page.tsx: ${e.message})`)
      continue
    }

    reportLines.push('### ORIGINAL (.docx)')
    reportLines.push('```')
    reportLines.push(docxParas.join('\n'))
    reportLines.push('```')
    reportLines.push('')
    reportLines.push('### SITE (page.tsx extracted strings)')
    reportLines.push('```')
    reportLines.push(siteStrs.join('\n'))
    reportLines.push('```')
    reportLines.push('')
  }

  await fs.writeFile(path.join(REPO_ROOT, 'scripts', 'review.md'), reportLines.join('\n'))
  console.log('Wrote scripts/review.md (', reportLines.length, 'lines )')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
