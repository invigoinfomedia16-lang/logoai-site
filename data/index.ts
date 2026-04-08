// ─── Categories ─────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { name: 'Restaurant', key: 'restaurant' },
  { name: 'Coffee Shop', key: 'coffee-shop' },
  { name: 'Bakery', key: 'bakery' },
  { name: 'Food Truck', key: 'food-truck' },
  { name: 'Barbershop', key: 'barbershop' },
  { name: 'Hair Salon', key: 'hair-salon' },
  { name: 'Nail Studio', key: 'nail-studio' },
  { name: 'Boutique', key: 'boutique' },
  { name: 'Clothing Brand', key: 'clothing-brand' },
  { name: 'Gym', key: 'gym' },
  { name: 'Cleaning Service', key: 'cleaning-service' },
  { name: 'Landscaping Company', key: 'landscaping' },
  { name: 'Pet Grooming', key: 'pet-grooming' },
  { name: 'E Commerce Brand', key: 'ecommerce' },
  { name: 'Content Creator', key: 'content-creator' },
  { name: 'Tattoo Studio', key: 'tattoo-studio' },
] as const

// ─── Logo images per category ────────────────────────────────────────────────
export const CATEGORY_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://framerusercontent.com/images/BSk3pdXBHSNfTHVxR5JuD48hQ.png',
    'https://framerusercontent.com/images/g8GZEZd4PwDKB44DxQOkoz4qi6k.png',
    'https://framerusercontent.com/images/0PyIHWFyplPz9GMnPpVfthhVn5o.png',
    'https://framerusercontent.com/images/29XqyhtGtTid9mQ6dnAijVQ7bU.png',
    'https://framerusercontent.com/images/J0CGpDmfATTlMBc5XeeWqvMW62E.png',
    'https://framerusercontent.com/images/CeNc6j0eOK4GOSeJPPu3ewCvTls.png',
    'https://framerusercontent.com/images/K97oRzQ3Y73YDG8YKoaOEuBfjTw.png',
    'https://framerusercontent.com/images/TGcAuaTNJ8GiuwgZPz4hBmVB0.png',
    'https://framerusercontent.com/images/oLiN8krQfqFQmYXWV2uNSh1SPU.png',
    'https://framerusercontent.com/images/jys29VPoIjS1QCI2zR73rnhDeo.png',
    'https://framerusercontent.com/images/0fCdcjqC5goyfTPRo5KSorwJqoc.png',
    'https://framerusercontent.com/images/vb6nXrC4GGuaiIEEFcBwfIFRg.png',
  ],
  'coffee-shop': [
    'https://framerusercontent.com/images/lJIjMRB4LWSxlA6cNyz10LjLw.png',
    'https://framerusercontent.com/images/quAkBwAlyLkM8kdgPplv5tSD5s.png',
    'https://framerusercontent.com/images/FuHDnENOTMw0qTvGp4MgNyP9Gw.png',
    'https://framerusercontent.com/images/o1RycivT5fhrZzaMdDXgTFCjoU.png',
    'https://framerusercontent.com/images/yVv4e1hR8MdyVCLBdXlt8gCPIUg.png',
    'https://framerusercontent.com/images/iT6wwTqvTr6AWkTXEkPCZzfnGoM.png',
    'https://framerusercontent.com/images/RTmmcQU3yFbGbHV1AlZvJ1pk1ms.png',
    'https://framerusercontent.com/images/Hnd80XleLfUNVElFx7GFuNgY8Q.png',
    'https://framerusercontent.com/images/pwei6HqVRI9UBvd3DBgImGbpU.png',
    'https://framerusercontent.com/images/VEhEP15ZjhMWQMzWjUjTuDdXpeU.png',
    'https://framerusercontent.com/images/bIfUVpYER91nvbWAfjdmNpCYiA.png',
    'https://framerusercontent.com/images/xXxvRBGwdhey4r8pkhgiYQRP4w.png',
  ],
  bakery: [
    'https://framerusercontent.com/images/9PLxfRYKMPXS56oqYSqL4kVdnic.png',
    'https://framerusercontent.com/images/YSbAJHpuk3XLkAZt20hnTu7lzA.png',
    'https://framerusercontent.com/images/aeTdU8jsCRLRoAtvgktc1iTnK8Y.png',
    'https://framerusercontent.com/images/qQxPEuObk9D3kFN0vSmdKK8wp4A.png',
    'https://framerusercontent.com/images/EcMnPjX9No1rvdW4IJW0tg1c.png',
    'https://framerusercontent.com/images/mCTE1kLysd0funpSEq4obXbI.png',
    'https://framerusercontent.com/images/YSymq3Ffe2rD6poL5jd04FlFE.png',
    'https://framerusercontent.com/images/4VMZa8Nnpn1fD8xYWwFoNxaUs.png',
    'https://framerusercontent.com/images/oHFQxiFvdXEK3SfMoXxIi9IQw0.png',
    'https://framerusercontent.com/images/zNrGdrdzktHy781OT0cSFQjZMk.png',
    'https://framerusercontent.com/images/85TrxuMwg2769aNHT29Ls6iTQ.png',
    'https://framerusercontent.com/images/9W0upIb69IHR9PtEtzkxJKXI.png',
  ],
}

// Default fallback
export const getCategoryImages = (key: string): string[] =>
  CATEGORY_IMAGES[key] ?? CATEGORY_IMAGES['coffee-shop']

// ─── Mockup images per category ──────────────────────────────────────────────
export const MOCKUP_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://www.logo.ai/logo-mockups/bakery/2.webp',
    'https://www.logo.ai/logo-mockups/coffee-shop/3.webp',
    'https://www.logo.ai/logo-mockups/barbershop/3.webp',
    'https://www.logo.ai/logo-mockups/gym/3.webp',
  ],
  'coffee-shop': [
    'https://www.logo.ai/logo-mockups/coffee-shop/3.webp',
    'https://www.logo.ai/logo-mockups/bakery/2.webp',
    'https://www.logo.ai/logo-mockups/barbershop/3.webp',
    'https://www.logo.ai/logo-mockups/gym/3.webp',
  ],
  bakery: [
    'https://www.logo.ai/logo-mockups/barbershop/3.webp',
    'https://www.logo.ai/logo-mockups/bakery/2.webp',
    'https://www.logo.ai/logo-mockups/coffee-shop/3.webp',
    'https://www.logo.ai/logo-mockups/gym/3.webp',
  ],
}

export const getMockupImages = (key: string): string[] =>
  MOCKUP_IMAGES[key] ?? MOCKUP_IMAGES['restaurant']

// ─── Carousel images (hero strip) ────────────────────────────────────────────
export const CAROUSEL_IMAGES = [
  'https://framerusercontent.com/images/lJIjMRB4LWSxlA6cNyz10LjLw.png',
  'https://framerusercontent.com/images/quAkBwAlyLkM8kdgPplv5tSD5s.png',
  'https://framerusercontent.com/images/FuHDnENOTMw0qTvGp4MgNyP9Gw.png',
  'https://framerusercontent.com/images/o1RycivT5fhrZzaMdDXgTFCjoU.png',
  'https://framerusercontent.com/images/yVv4e1hR8MdyVCLBdXlt8gCPIUg.png',
  'https://framerusercontent.com/images/iT6wwTqvTr6AWkTXEkPCZzfnGoM.png',
  'https://framerusercontent.com/images/RTmmcQU3yFbGbHV1AlZvJ1pk1ms.png',
  'https://framerusercontent.com/images/Hnd80XleLfUNVElFx7GFuNgY8Q.png',
  'https://framerusercontent.com/images/pwei6HqVRI9UBvd3DBgImGbpU.png',
  'https://framerusercontent.com/images/VEhEP15ZjhMWQMzWjUjTuDdXpeU.png',
  'https://framerusercontent.com/images/bIfUVpYER91nvbWAfjdmNpCYiA.png',
  'https://framerusercontent.com/images/xXxvRBGwdhey4r8pkhgiYQRP4w.png',
]

// ─── Comparison table ─────────────────────────────────────────────────────────
export const COMPARISON_ROWS = [
  { label: 'Time to logo', logo: 'Seconds', designer: '3–6 weeks', other: '1–3 hours' },
  { label: 'Cost', logo: 'Free', designer: '$5K–$50K+', other: '$20–$100/mo' },
  { label: 'Approach', logo: 'AI-driven design', designer: 'Human process', other: 'Templates' },
  { label: 'Output quality', logo: 'Professional, consistent', designer: 'High (depends)', other: 'Generic, inconsistent' },
  { label: 'Brand understanding', logo: 'Automatic', designer: 'Manual', other: 'Limited' },
  { label: 'Effort required', logo: 'Minimal (AI handles it)', designer: 'High', other: 'Medium' },
  { label: 'Revisions needed', logo: 'None', designer: 'Multiple rounds', other: 'Trial and error' },
  { label: 'Consistency', logo: 'Built-in', designer: 'Depends', other: 'Limited' },
  { label: 'Decision-making', logo: 'Automatic', designer: 'Manual', other: 'Manual' },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: 'Is it really free?',
    a: "Yes – 100%. No hidden fees, no surprise charges, and no credit card needed. If you're one of the first 1,000,000 sign-ups, your custom logo is completely free at launch.",
  },
  {
    q: 'Will my logo be unique?',
    a: 'Every single one. Each logo is generated fresh – just for you. No two are the same. Your brand gets its own look, not a recycled template.',
  },
  {
    q: 'How is this different from other AI logo makers?',
    a: 'Most "logo makers" give you a generic template with your name added. Logo.ai creates a custom logo based on your brand and your industry – powered by advanced AI to deliver something original.',
  },
  {
    q: 'Do I own my logo?',
    a: "Yes. Once you download your logo, it's yours to use on your website, products, social media, packaging, merchandise, and more.",
  },
  {
    q: 'Will I see multiple logo options?',
    a: "Yes. We'll show you multiple logo options upfront. Pick the one you love and download it.",
  },
  {
    q: 'Do I need design experience?',
    a: 'Not at all. Just enter your brand name, answer a few quick questions, and our AI does the rest.',
  },
  {
    q: 'What file formats will I get?',
    a: "You'll receive high-resolution files ready for both web and print – including PNG, SVG, and PDF. Everything you need to use your logo anywhere.",
  },
  {
    q: 'When will I get my logo?',
    a: "The moment we launch! You'll get an email as soon as Logo.ai goes live.",
  },
  {
    q: 'How many free logos are left?',
    a: '1,000,000 total. Over 65,000 spots have already been secured – so the sooner you sign up, the better your chances.',
  },
  {
    q: 'Is my logo trademark-safe?',
    a: "We design logos to reduce look-alike risks. However, we can't guarantee trademark approval. We recommend doing a quick legal check.",
  },
  {
    q: 'Why are you offering this for free?',
    a: "We want 1,000,000 founders to experience Logo.ai firsthand. Once you see the quality, we know you'll come back for brand kits, social assets, and more.",
  },
  {
    q: 'When does LOGO.AI launch?',
    a: "We're launching soon! Secure your spot today so you don't miss the free offer.",
  },
]

// ─── Blog posts ───────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    cat: 'Branding',
    date: 'Mar 15, 2026',
    title: 'Why your logo is your most important brand asset',
    desc: 'Your logo is often the first impression customers have of your business. Learn why investing in a great logo matters.',
    img: 'https://framerusercontent.com/images/xFRqsVOP048JBiBfyzXIC3Qtvb4.jpg',
  },
  {
    cat: 'Design',
    date: 'Mar 10, 2026',
    title: 'The psychology of color in logo design',
    desc: 'Colors evoke emotions and shape perceptions. Discover how to choose the right palette for your brand identity.',
    img: 'https://framerusercontent.com/images/is8DCwRFbjZYmJLEawagzK7Zk.jpg',
  },
  {
    cat: 'Trends',
    date: 'Mar 5, 2026',
    title: '5 logo trends defining 2026',
    desc: 'From minimalism to dynamic logos, explore the design trends reshaping brand identities this year.',
    img: 'https://framerusercontent.com/images/qiOgxPySXuqwQFcVnaSAAsd3Ktk.jpg',
  },
]

// ─── Nav links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { text: 'About', href: '/about' },
  { text: 'Our story', href: '/our-story' },
  { text: 'Leadership', href: '/leadership' },
  { text: 'FAQ', href: '/faq' },
  { text: 'Press', href: '/press' },
]

// ─── Footer links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { t: 'Why logo.ai', h: '/about' },
      { t: 'How it works', h: '/our-story' },
      { t: 'FAQ', h: '/faq' },
      { t: 'Blog', h: '/press' },
    ],
  },
  {
    title: 'Company',
    links: [
      { t: 'About', h: '/about' },
      { t: 'Our story', h: '/our-story' },
      { t: 'Leadership', h: '/leadership' },
      { t: 'Press', h: '/press' },
      { t: 'Contact', h: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { t: 'Privacy policy', h: '#' },
      { t: 'Terms of service', h: '#' },
      { t: 'Cookie policy', h: '#' },
    ],
  },
]
