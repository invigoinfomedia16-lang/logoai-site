// Single source of truth for the Our Story content (from OUR STORY.docx).
// All 5 layout variations import this so copy stays identical everywhere.

export const OUR_STORY_CONTENT = {
  pageTitle: 'Our Story',          // Top-of-page heading (h1)
  heroHeadline: 'Thirty years. Same broken process.',  // Hero dek / subheadline
  heroBody: "Every company we've built, backed, or advised needed a logo. And every time, it was the same story: too slow, too expensive, or too generic.",
  heroClosing: 'So we fixed it.',

  problem: {
    eyebrow: 'The problem',
    title: 'Two bad options. For thirty years.',
    options: [
      "Hire a designer. Six weeks. Tens of thousands of dollars. Rounds of revisions. And often, a result you don't love.",
      "Use a DIY logo maker. Fast and cheap — but built from the same templates as everyone else's logo. Yours ends up looking like ten thousand others.",
    ],
    gap: 'There was no third option. So we built one ourselves.',
    solution: 'AI that designs original logos — in seconds.',
  },

  turningPoint: {
    eyebrow: 'The turning point',
    intro: 'Late 2023. AI was suddenly writing code, generating photorealistic images, composing music.',
    quoteLead: 'Our founders asked the same question out loud:',
    quote: "Why can't it design a logo?",
    diagnosis: "They tried. It couldn't. Warped text, random symbols, zero understanding of what a brand actually is.",
    reframe: "But the capability was there — it just hadn't been taught. The models were generating. They weren't designing.",
    unlock: 'That was the unlock. We stopped trying to prompt AI. We started teaching it.',
  },

  howBuilt: {
    eyebrow: 'How we built it',
    title: 'We trained AI the way a design school trains a student.',
    pillars: [
      {
        title: 'Study the masters.',
        body: 'We broke down the logos that have stood for decades — color, type, spacing, negative space, the invisible grid behind every iconic mark.',
      },
      {
        title: 'No templates. No shortcuts.',
        body: 'Custom models trained on design principles, not stock assets. The AI learns composition, not recombination.',
      },
      {
        title: 'Pass the blind test.',
        body: "Our bar: a professional designer can't tell our output from theirs. We didn't launch until it cleared that bar — consistently.",
      },
    ],
  },

  beforeAfter: {
    eyebrow: 'From warped text to real design',
    subtitle: 'Two and a half years of progress, side by side.',
    placeholder: 'Before/After visual block — 3–4 image pairs showing the same brand prompt across training milestones',
    range: '2023 → 2026',
    // progressLog kept available for variation pages that use it;
    // canonical /our-story uses placeholder + range instead
    progressLog: [
      { year: '2023', state: 'Warped text. Random symbols.' },
      { year: '2024', state: 'Readable letterforms. Composition still off.' },
      { year: '2025', state: 'Legit logos. Some hit, some miss.' },
      { year: '2026', state: 'Professional-grade. Every time.' },
    ],
    claim: "Proof isn't a demo video. It's the logos.",
  },

  numbers: {
    eyebrow: 'The numbers behind it',
    stats: [
      { value: '2+ years',       label: 'in R&D' },
      { value: '100,000+',        label: 'logos analyzed' },
      { value: 'Thousands',       label: 'of training hours' },
      { value: '4 countries',     label: 'of operations' },
    ],
    locations: ['San Francisco (HQ)', 'Singapore', 'Tallinn', 'Dubai'],
  },

  theName: {
    eyebrow: 'The name',
    title: 'LOGO.AI. One of the most sought-after two-word domains in design.',
    body: "We didn't start with the name — we earned it. Only after the product worked did we take it. Not for credibility. Because the product finally deserved it.",
    closing: 'A name should mean something.',
  },

  now: {
    eyebrow: 'Where we are now',
    body: 'A product that designs real logos. A team that believes design should be instant. And two million free logos, ready to go.',
    tease: 'One of them is yours.',
    cta: { text: 'Meet the team behind it', href: '/design-l/leadership' },
  },
}
