import fs from 'node:fs/promises'
import path from 'node:path'
import mammoth from 'mammoth'

const NEW_DIR = 'C:/Users/Shehnaz3110/Dropbox/ARTICLE TEMPLATES/SAAS TOOLS/LOGO AI/PRE-LAUNCH/CONTENT/NEW'
const files = ['LEADERSHIP.docx', 'HOW It WORKS.docx', 'CONTACT.docx']
for (const f of files) {
  const buf = await fs.readFile(path.join(NEW_DIR, f))
  const r = await mammoth.extractRawText({ buffer: buf })
  console.log('====', f, '====')
  console.log(r.value)
}
