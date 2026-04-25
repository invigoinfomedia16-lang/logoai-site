// One-shot fix for double-encoded (UTF-8 → Win-1252 → UTF-8) mojibake in page.tsx.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const target = path.resolve(__dirname, '..', 'app', 'design-l', 'page.tsx')

let text = fs.readFileSync(target, 'utf8')
const before = text.length

// Patterns constructed from raw UTF-8 bytes so they match regardless of source display.
// Original → byte sequence when Win-1252 bytes are re-encoded as UTF-8.
const replacements = [
  // em-dash: E2 80 94 → C3 A2 E2 82 AC E2 80 9D
  [String.fromCharCode(0xE2, 0x20AC, 0x201D), '—'],
  // en-dash: E2 80 93 → C3 A2 E2 82 AC E2 80 9C
  [String.fromCharCode(0xE2, 0x20AC, 0x201C), '–'],
  // left double quote
  [String.fromCharCode(0xE2, 0x20AC, 0x0153), '“'],
  // right double quote (trailing lone "â€")
  [String.fromCharCode(0xE2, 0x20AC), '”'],
  // left single quote
  [String.fromCharCode(0xE2, 0x20AC, 0x02DC), '‘'],
  // right single quote
  [String.fromCharCode(0xE2, 0x20AC, 0x2122), '’'],
  // ellipsis
  [String.fromCharCode(0xE2, 0x20AC, 0x00A6), '…'],
  // bullet
  [String.fromCharCode(0xE2, 0x20AC, 0x00A2), '•'],
  // box drawing ─ : E2 94 80 → C3 A2 E2 80 9D E2 82 AC
  [String.fromCharCode(0xE2, 0x201D, 0x20AC), '─'],
  // arrows → ← ↑ ↓
  [String.fromCharCode(0xE2, 0x2020, 0x2019), '→'],
  [String.fromCharCode(0xE2, 0x2020, 0x2018), '←'],
  [String.fromCharCode(0xE2, 0x2020, 0x2018 + 1), '↑'], // ↑ uses different trailing
  // double arrows
  [String.fromCharCode(0xE2, 0x2021, 0x2019), '⇒'],
  [String.fromCharCode(0xE2, 0x2021, 0x2018), '⇐'],
  // Windows-1252 codepoint low-ascii survivors
  [String.fromCharCode(0x00C2, 0x00B7), '·'],        // middle dot
  [String.fromCharCode(0x00C2, 0x00B0), '°'],
  [String.fromCharCode(0x00C2, 0x00B1), '±'],
  [String.fromCharCode(0x00C2, 0x00A0), ' '],        // nbsp
]

let count = 0
for (const [from, to] of replacements) {
  const occurrences = text.split(from).length - 1
  if (occurrences > 0) {
    text = text.split(from).join(to)
    count += occurrences
    const hex = [...from].map((c) => c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ')
    console.log(`  ${occurrences.toString().padStart(4)}× [${hex}] → ${JSON.stringify(to)}`)
  }
}

fs.writeFileSync(target, text, 'utf8')
console.log(`\n  total: ${count} replacements, ${before} → ${text.length} chars`)
console.log(`  ✓ saved ${path.relative(path.resolve(__dirname, '..'), target)}`)
