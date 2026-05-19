// Export the Design M homepage copy to a clean .docx, structured by section
// (Hero, How It Works, Reviews, etc.) with copy nested under role labels
// (Eyebrow / H1 / Sub / CTA / etc.). Read-only on the components — content
// hard-coded here so this script is the canonical source of truth for the
// "M homepage copy."
//
// Output: <Dropbox>/ARTICLE TEMPLATES/SAAS TOOLS/LOGO AI/PRE-LAUNCH/
//         CONTENT/NEW/DESIGN-M HOMEPAGE.docx

import fs from 'node:fs/promises'
import path from 'node:path'
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
} from 'docx'

const OUT_DIR =
  'C:/Users/Shehnaz3110/Dropbox/ARTICLE TEMPLATES/SAAS TOOLS/LOGO AI/PRE-LAUNCH/CONTENT/NEW'
const OUT_FILE = path.join(OUT_DIR, 'DESIGN-M HOMEPAGE.docx')

// ───────────────────────────── helpers ─────────────────────────────
const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { before: opts.before ?? 80, after: opts.after ?? 60 },
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italics, size: opts.size })],
  })

const h1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, bold: true })],
  })

const h2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, bold: true })],
  })

const h3 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 60 },
    children: [new TextRun({ text, bold: true })],
  })

const labeled = (label, value) =>
  new Paragraph({
    spacing: { before: 60, after: 40 },
    children: [
      new TextRun({ text: label + ': ', bold: true }),
      new TextRun({ text: value }),
    ],
  })

const bullet = (text, level = 0) =>
  new Paragraph({
    bullet: { level },
    spacing: { before: 30, after: 30 },
    children: [new TextRun({ text })],
  })

const blank = () => new Paragraph({ children: [new TextRun({ text: '' })] })

const divider = () =>
  new Paragraph({
    spacing: { before: 240, after: 120 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: '— — —', color: '999999' })],
  })

// ───────────────────────────── content ─────────────────────────────
const elements = []

// Title page
elements.push(
  new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'LOGO.AI — Design M Homepage Copy', bold: true })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 320 },
    children: [
      new TextRun({
        text: 'Full user-facing copy in section order, as rendered at /design-m.',
        italics: true,
        color: '666666',
        size: 20,
      }),
    ],
  }),
)

// ── HEADER ─────────────────────────────────────────────────────────
elements.push(h1('HEADER (top nav)'))
elements.push(labeled('Wordmark', 'LOGO.AI'))
elements.push(p('Nav items:'))
;['Product', 'How it works', 'Examples', 'Reviews', 'Pricing', 'FAQ', 'Resources'].forEach((n) =>
  elements.push(bullet(n)),
)
elements.push(labeled('Right side links', 'Log in'))
elements.push(labeled('Header CTA', 'Claim my free logo'))

elements.push(divider())

// ── HERO ───────────────────────────────────────────────────────────
elements.push(h1('HERO'))
elements.push(labeled('Eyebrow pill', '💙 #1 AI LOGO GENERATOR'))
elements.push(labeled('H1', 'Get a Professional Logo in 60 Seconds'))
elements.push(
  labeled(
    'Subheadline',
    'Describe your brand. Watch AI design it. Download a studio-quality logo — ready for your website, your business cards, your launch.',
  ),
)
elements.push(labeled('Email placeholder', 'Enter your email address'))
elements.push(labeled('Primary CTA', 'Get my free logo'))
elements.push(labeled('Success state', "✓ You're on the list! We'll email you at launch."))
elements.push(p('Trust ticks (under CTA):'))
;['100% free at launch', 'No credit card required', 'Yours forever'].forEach((t) =>
  elements.push(bullet(t)),
)
elements.push(p('Logo carousel: 12 industry logos auto-rotating (restaurant, coffee shop, bakery, food truck, barbershop, hair salon, nail studio, boutique, clothing brand, gym, cleaning service, tattoo studio).'))
elements.push(
  labeled(
    'Trust strip (live counters)',
    'Over [165,000+] logos already claimed — [1,834,527] free logos left. [29 days] until launch.',
  ),
)
elements.push(labeled('"Used by" caption', 'Used by founders everywhere'))
elements.push(p('Founder/press logo placeholders:'))
;['Y Combinator', 'Product Hunt', 'TechCrunch', 'Forbes', 'Indie Hackers', 'BetaList'].forEach((n) =>
  elements.push(bullet(n)),
)
elements.push(labeled('Rating row', 'Verified  ·  4.9/5  ·  Average Rating'))

elements.push(divider())

// ── HOW IT WORKS ──────────────────────────────────────────────────
elements.push(h1('HOW IT WORKS'))
elements.push(labeled('Eyebrow', 'How It Works'))
elements.push(labeled('H2', 'From a single description to a studio-quality logo'))
elements.push(labeled('Subheadline', 'No design skills. No prompts to engineer. Just three simple steps.'))

const STEPS = [
  {
    n: 1,
    title: 'Describe your brand',
    body: "Enter your business name and a short description — what you do, who you serve, the feeling you want your brand to convey. That's it. No color pickers. No 40-question brand briefs.",
  },
  {
    n: 2,
    title: 'Watch AI design it',
    body: 'In under 60 seconds, our AI generates original logo concepts — choosing the right typography, colors, and layout for you. No clip art. No templates. Real design decisions.',
  },
  {
    n: 3,
    title: 'Download and launch',
    body: 'Pick your favorite. Download high-resolution files instantly — PNG with a transparent background, ready for your website, signage, social media, anywhere.',
  },
]
STEPS.forEach((s) => {
  elements.push(h3(`Step ${s.n} — ${s.title}`))
  elements.push(p(s.body))
})

elements.push(divider())

// ── REVIEWS ────────────────────────────────────────────────────────
elements.push(h1('REVIEWS'))
elements.push(labeled('Eyebrow', 'REVIEWS'))
elements.push(labeled('H2', 'Trusted by 165,000+ founders'))
elements.push(labeled('Subheadline', 'Read what early users are saying about LOGO.AI.'))

const REVIEWS = [
  ['Beat my agency', 'Sixty seconds. One of them was better than the six my agency sent after three weeks.', 'Daniel Walsh', 'Founder, Clearline (Fintech)'],
  ['No design skills required', "I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.", 'Sarah Mitchell', 'Founder, Greenleaf Co. (E-commerce)'],
  ["Couldn't tell it was AI", "I showed three options to my team. They couldn't tell which one was AI. Neither could I.", 'Michael Reyes', 'Co-Founder, Beacon Labs (AI tools)'],
  ['Three brands, one minute each', "I've rebranded three companies. This was the only one that didn't take six weeks.", 'Chris Donovan', 'Founder, Bright Harbor (Consulting)'],
  ['$15K studio quality', 'The typography alone looks like it came from a $15K studio. Then I saw the price.', 'Alex Rivera', 'Founder, Stack & Field (SaaS)'],
  ['Real design, finally', "One input. One minute. Real design. I honestly didn't think this existed yet.", 'Megan Foster', 'Founder, Saltline Studio (Creative agency)'],
  ["Can't be real", "This can't be real. I've paid agencies $20K for worse.", 'Jake Thompson', 'Founder, Northstack (B2B SaaS)'],
  ['Designed, not assembled', "I've used every logo tool out there. This is the first one that actually looks designed, not assembled.", 'Emily Carter', 'Founder, Rowan & Rye (DTC)'],
]
REVIEWS.forEach(([title, quote, name, role]) => {
  elements.push(h3(title))
  elements.push(p(`"${quote}"`))
  elements.push(p(`— ${name}, ${role}`, { italics: true }))
})

elements.push(divider())

// ── AMAZING FOR / USE CASES ───────────────────────────────────────
elements.push(h1('USE CASES (Amazing For)'))
elements.push(labeled('Eyebrow', 'USE CASES'))
elements.push(labeled('H2', 'Built for everyone starting something'))
elements.push(
  labeled(
    'Subheadline',
    "Whether you're launching a startup, branding your weekend project, or scaling a DTC brand — LOGO.AI is built for you.",
  ),
)

const CARDS = [
  {
    heading: 'Founders & Small Businesses',
    bullets: [
      ['Move at startup speed', '60 seconds, not 6 weeks of agency back-and-forth. Free instead of $20,000+. Looks investor-ready from day one.'],
      ['Look established on day one', "Your customers don't care how long you've been in business. They care whether you look like you know what you're doing."],
      ['Works everywhere your brand shows up', 'Pitch deck, website, business cards, app icon, signage, social — same logo, every surface.'],
    ],
  },
  {
    heading: 'Creators & Side Projects',
    bullets: [
      ['Free means you can actually have one', 'Your podcast, your Substack, your indie app, your weekend idea — they all deserve a logo that looks intentional.'],
      ['Every project, a unique mark', 'Generate as many as you want. Different brand → different logo. No subscriptions, no per-export fees.'],
      ['Ready for every surface', 'YouTube thumbnails, podcast art, Twitter banners, app icons — all sized and exported in one go.'],
    ],
  },
  {
    heading: 'E-commerce Brands',
    bullets: [
      ['Built for scale', 'Works at 16 pixels and at 16 inches. Sharp on a Shopify favicon, sharp on a retail shelf label.'],
      ['Original, not template', "So your brand doesn't look like every other DTC store running on the same logo maker."],
      ['Brand kit on demand', 'Social templates, packaging-ready assets, mockups — all matched to your logo, available the moment you need them.'],
    ],
  },
]
CARDS.forEach((c) => {
  elements.push(h3(c.heading))
  c.bullets.forEach(([bt, bb]) => {
    elements.push(new Paragraph({
      bullet: { level: 0 },
      spacing: { before: 60, after: 40 },
      children: [
        new TextRun({ text: bt + ' — ', bold: true }),
        new TextRun({ text: bb }),
      ],
    }))
  })
})

elements.push(divider())

// ── GALLERY ────────────────────────────────────────────────────────
elements.push(h1('GALLERY (Examples marquee)'))
elements.push(labeled('Eyebrow', 'Examples'))
elements.push(labeled('H2', 'Original Logos, Designed Live'))
elements.push(
  labeled(
    'Subheadline',
    'Every logo below was generated by LOGO.AI from a single brand description — in under sixty seconds. No human touch-ups. No templates. No stock assets.',
  ),
)
elements.push(p('Two horizontally-scrolling marquee rows, 16 industry logos total (restaurant, coffee shop, bakery, food truck, barbershop, hair salon, nail studio, boutique, clothing brand, gym, cleaning service, landscaping, pet grooming, e-commerce, content creator, tattoo studio).'))

elements.push(divider())

// ── PRICING ────────────────────────────────────────────────────────
elements.push(h1('PRICING'))
elements.push(labeled('Promo badge (top)', '🎁 100% free at launch — for the first 2,000,000 users'))
elements.push(labeled('H2', 'Free logo. Optional brand kit.'))
elements.push(
  labeled(
    'Subheadline',
    'The logo itself is completely free, forever. The brand kit is a paid upgrade for founders who want the full package — no subscription, no surprises.',
  ),
)

elements.push(h3('Tier 1 — Free Logo'))
elements.push(labeled('Tag', 'Always free'))
elements.push(labeled('Price', '$0 forever'))
elements.push(p('Features:'))
;[
  'High-resolution PNG with transparent background',
  'Original design — never recombined from templates',
  'Full commercial rights, no attribution required',
  'Re-download anytime',
  'Trademark-friendly — designed to be distinct',
].forEach((f) => elements.push(bullet(f)))
elements.push(labeled('Tier 1 CTA', 'Claim my free logo'))

elements.push(h3('Tier 2 — Brand Kit (highlighted)'))
elements.push(labeled('Tier badge', '⭐ Most chosen at launch'))
elements.push(labeled('Tag', 'Optional upgrade'))
elements.push(labeled('Price', 'TBA — pricing announced at launch'))
elements.push(p('Features:'))
;[
  'Everything in the free logo',
  'App icons (iOS + Android, App Store ready)',
  'Social kit (covers, profiles, stories — every platform)',
  'Brand colors (HEX, RGB, CMYK) + matched font guide',
  'Business cards, letterhead, invoice + email signature',
  'Mockups (shirts, signage, packaging) + brand guidelines',
].forEach((f) => elements.push(bullet(f)))
elements.push(labeled('Tier 2 CTA', 'Reserve early access'))

elements.push(labeled('Pricing footnote', 'No credit card required. The free logo stays free forever.'))

elements.push(divider())

// ── PRIVACY ────────────────────────────────────────────────────────
elements.push(h1('PRIVACY'))
elements.push(labeled('Eyebrow', 'Privacy'))
elements.push(labeled('H2', 'Private. Secure. In your control.'))
elements.push(
  labeled(
    'Subheadline',
    "Your brand description and your logo are yours, always. We don't sell your data, we don't train on it, and you can delete it anytime.",
  ),
)

const PRIVACY_CARDS = [
  ['Full ownership, no surprises', [
    'You own every logo we generate.',
    'Use it anywhere — online, in print, in media.',
    'No usage restrictions, no royalties, no attribution.',
  ]],
  ['Never shared or used for training', [
    'Your brand description and logos are never used to train other models.',
    'We never sell or share your data.',
    "It's only used to generate your logo.",
  ]],
  ['Designed to be trademark-safe', [
    'Every logo is generated original — no template recombination.',
    'Designed to be visually distinct from existing marks.',
    "We can't guarantee clearance, but we make it easy to register.",
  ]],
  ['Secure from input to download', [
    'Encryption in transit (HTTPS/TLS) and at rest.',
    'Access controls limit data to authorized personnel.',
    'GDPR + CCPA compliant. Delete your data anytime.',
  ]],
]
PRIVACY_CARDS.forEach(([title, points]) => {
  elements.push(h3(title))
  points.forEach((pt) => elements.push(bullet(pt)))
})

elements.push(divider())

// ── FAQ ────────────────────────────────────────────────────────────
elements.push(h1('FAQ'))
elements.push(labeled('Eyebrow', 'FAQ'))
elements.push(labeled('H2', 'Your questions, answered.'))
elements.push(labeled('Subheadline', 'Pricing, ownership, trademarks, the works.'))

const FAQS = [
  ['Is it really free?', "Yes — free to create, free to download. No hidden fees, no credit card, no catch. We're giving away 2,000,000 free logos at launch on a first-come, first-served basis."],
  ['Why are you offering this for free?', "Because the best marketing is a product people can't stop showing off. Try it, love it, tell a friend — that's the plan. We're also betting that most founders will upgrade to the paid brand kit once they see what it does for their launch."],
  ['Will my logo be unique?', 'Every logo is designed from scratch for your brand. No templates. No reused assets. Each logo is built for your brand specifically, not pulled from a library.'],
  ['How is this different from other AI logo makers?', 'Most AI logo makers stitch together templates and stock elements. LOGO.AI designs from scratch using real design principles — color theory, typography pairing, negative space, grid systems — so what you get is original, intentional, and yours alone.'],
  ['Do I own my logo?', "Yes — once you download it, it's yours. Full commercial and personal rights, no strings attached, no royalties, no attribution required."],
  ['Is my logo trademark-safe?', "Every logo is designed to be original and visually distinct. We can't guarantee trademark clearance — if you plan to register it, run a quick legal check first."],
  ['What file formats will I get?', 'High-resolution PNG with a transparent background at launch. SVG, JPG, and PDF coming soon after.'],
  ['When will I get my logo?', "Claim your spot now. We'll email you the moment we launch (June 2026). Sixty seconds later, you'll have your logo."],
]
FAQS.forEach(([q, a]) => {
  elements.push(h3(q))
  elements.push(p(a))
})

elements.push(p('FAQ footer:'))
elements.push(labeled('Footer headline', 'Still have questions?'))
elements.push(labeled('Footer body', 'Our team is here to help — reach us at hello@logo.ai.'))
elements.push(labeled('Footer CTA', 'Contact us'))

elements.push(divider())

// ── FINAL CTA ──────────────────────────────────────────────────────
elements.push(h1('FINAL CTA'))
elements.push(labeled('H2', 'Your studio-quality logo is sixty seconds away'))
elements.push(labeled('Primary CTA', 'Claim my free logo'))
elements.push(p('Category tabs (16 industries — clicking each updates the logo strip below):'))
;[
  'Restaurant', 'Coffee Shop', 'Bakery', 'Food Truck', 'Barbershop', 'Hair Salon',
  'Nail Studio', 'Boutique', 'Clothing Brand', 'Gym', 'Cleaning Service',
  'Landscaping Company', 'Pet Grooming', 'E Commerce Brand', 'Content Creator', 'Tattoo Studio',
].forEach((c) => elements.push(bullet(c)))
elements.push(p('Below the tabs: 6 example logos shown for the active category.'))

elements.push(divider())

// ── FOOTER ─────────────────────────────────────────────────────────
elements.push(h1('FOOTER (dark Tolopea bar)'))
elements.push(labeled('Wordmark', 'LOGO.AI'))

elements.push(h3('Column: POPULAR LOGOS'))
;['Restaurant Logos', 'Coffee Shop Logos', 'Bakery Logos', 'Boutique Logos', 'Gym Logos'].forEach(
  (l) => elements.push(bullet(l)),
)

elements.push(h3('Column: ALL INDUSTRIES'))
;[
  'Restaurant', 'Coffee Shop', 'Bakery', 'Food Truck', 'Barbershop', 'Hair Salon',
  'Nail Studio', 'Boutique', 'Clothing Brand', 'Gym', 'Cleaning Service', 'Landscaping',
  'Pet Grooming', 'E-commerce', 'Content Creator', 'Tattoo Studio',
  'Bar', 'Brewery', 'Catering', 'Consulting', 'Real Estate', 'Photography', 'Wedding', 'Yoga Studio',
].forEach((l) => elements.push(bullet(l)))

elements.push(h3('Column: BRAND KIT'))
;[
  'App Icons', 'Social Kit', 'Brand Colors', 'Font Guide', 'Brand Guide',
  'Business Cards', 'Letterhead', 'Mockups', 'Email Signature', 'Web Assets',
].forEach((l) => elements.push(bullet(l)))

elements.push(h3('Column: COMPANY'))
;['About Us', 'Our Story', 'Leadership', 'Press', 'Contact'].forEach((l) => elements.push(bullet(l)))

elements.push(h3('Column: RESOURCES'))
;['How it works', 'Examples', 'Reviews', 'Pricing', 'FAQ', 'Blog'].forEach((l) => elements.push(bullet(l)))

elements.push(h3('Column: LEGAL'))
;['Terms of Service', 'Privacy Policy', 'Cookie Policy'].forEach((l) => elements.push(bullet(l)))

elements.push(
  labeled(
    'Copyright',
    'Copyright © 2026 LOGO.AI, Inc. All rights reserved. LOGO.AI is an independent service.',
  ),
)

// ───────────────────────────── write ──────────────────────────────
const doc = new Document({
  sections: [{ properties: {}, children: elements }],
})

await fs.mkdir(OUT_DIR, { recursive: true })
const buf = await Packer.toBuffer(doc)
await fs.writeFile(OUT_FILE, buf)
console.log('Wrote:', OUT_FILE)
console.log('Sections:', elements.filter((e) => e.constructor.name === 'Paragraph').length, 'paragraphs')
