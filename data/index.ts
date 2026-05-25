// ─── Launch date (single source of truth) ───────────────────────────────────
export const LAUNCH_DATE = new Date('2026-05-24T00:00:00')

export function getDaysUntilLaunch(): number {
  const now = new Date()
  const diff = LAUNCH_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

// ─── Dynamic logos claimed counter ──────────────────────────────────────────
// Base: 129,000 claimed as of April 9, 2026
// Growth: ~2,000-3,000 per day (accelerating as launch nears)
const CLAIMED_BASE = 129000
const CLAIMED_BASE_DATE = new Date('2026-04-09T00:00:00')

export function getLogosClaimed(): number {
  const now = new Date()
  const daysSinceBase = Math.max(0, (now.getTime() - CLAIMED_BASE_DATE.getTime()) / (1000 * 60 * 60 * 24))
  // Accelerating growth: starts ~2000/day, increases as launch approaches
  const dailyGrowth = 2000 + (daysSinceBase * 50)
  const totalClaimed = Math.min(
    Math.floor(CLAIMED_BASE + (daysSinceBase * dailyGrowth)),
    1900000 // cap at 1.9M so there are always some remaining
  )
  return totalClaimed
}

export function getLogosRemaining(): number {
  return 2000000 - getLogosClaimed()
}

// ─── Categories ─────────────────────────────────────────────────────────────
// Full industry list mirrored from the live Logo.AI site: 16 "popular"
// industries (shown by default on landing-page tab strips) + 49 others
// (revealed via search / "See all"). The `isPopular` flag drives which
// chips show up first; consumers that just need the list can iterate
// `CATEGORIES` directly.
export const CATEGORIES = [
  // ── Popular (default visible) ────────────────────────────────────────
  { name: 'Restaurant', key: 'restaurant', isPopular: true },
  { name: 'Coffee Shop', key: 'coffee-shop', isPopular: true },
  { name: 'Bakery', key: 'bakery', isPopular: true },
  { name: 'Food Truck', key: 'food-truck', isPopular: true },
  { name: 'Barbershop', key: 'barbershop', isPopular: true },
  { name: 'Hair Salon', key: 'hair-salon', isPopular: true },
  { name: 'Nail Studio', key: 'nail-studio', isPopular: true },
  { name: 'Boutique', key: 'boutique', isPopular: true },
  { name: 'Clothing Brand', key: 'clothing-brand', isPopular: true },
  { name: 'Gym', key: 'gym', isPopular: true },
  { name: 'Cleaning Service', key: 'cleaning-service', isPopular: true },
  { name: 'Landscaping Company', key: 'landscaping', isPopular: true },
  { name: 'Pet Grooming', key: 'pet-grooming', isPopular: true },
  { name: 'E Commerce Brand', key: 'ecommerce', isPopular: true },
  { name: 'Content Creator', key: 'content-creator', isPopular: true },
  { name: 'Tattoo Studio', key: 'tattoo-studio', isPopular: true },
  // ── All other categories (revealed via search / "See all") ──────────
  { name: 'Accounting Firm', key: 'accounting-firm', isPopular: false },
  { name: 'Architecture Firm', key: 'architecture-firm', isPopular: false },
  { name: 'Auto Repair Shop', key: 'auto-repair-shop', isPopular: false },
  { name: 'Bookstore', key: 'bookstore', isPopular: false },
  { name: 'Branding Agency', key: 'branding-agency', isPopular: false },
  { name: 'Brewery', key: 'brewery', isPopular: false },
  { name: 'Butcher', key: 'butcher', isPopular: false },
  { name: 'Car Dealership', key: 'car-dealership', isPopular: false },
  { name: 'Car Wash', key: 'car-wash', isPopular: false },
  { name: 'Carpenter', key: 'carpenter', isPopular: false },
  { name: 'Catering', key: 'catering', isPopular: false },
  { name: 'Childcare Center', key: 'childcare-center', isPopular: false },
  { name: 'Consulting Firm', key: 'consulting-firm', isPopular: false },
  { name: 'Cyber Security', key: 'cyber-security', isPopular: false },
  { name: 'Dental Clinic', key: 'dental-clinic', isPopular: false },
  { name: 'Donut Shop', key: 'donut-shop', isPopular: false },
  { name: 'Electrician', key: 'electrician', isPopular: false },
  { name: 'Event Planning Company', key: 'event-planning-company', isPopular: false },
  { name: 'General Contractor', key: 'general-contractor', isPopular: false },
  { name: 'Home Builder', key: 'home-builder', isPopular: false },
  { name: 'Home Remodeling', key: 'home-remodeling', isPopular: false },
  { name: 'Hotel', key: 'hotel', isPopular: false },
  { name: 'HVAC Company', key: 'hvac-company', isPopular: false },
  { name: 'Insurance Agency', key: 'insurance-agency', isPopular: false },
  { name: 'Jewellery', key: 'jewellery', isPopular: false },
  { name: 'Law Firm', key: 'law-firm', isPopular: false },
  { name: 'Life Coach', key: 'life-coach', isPopular: false },
  { name: 'Logistics Company', key: 'logistics-company', isPopular: false },
  { name: 'Marketing Agency', key: 'marketing-agency', isPopular: false },
  { name: 'Med Spa', key: 'med-spa', isPopular: false },
  { name: 'Mental Health Practice', key: 'mental-health-practice', isPopular: false },
  { name: 'Mortgage Brokerage', key: 'mortgage-brokerage', isPopular: false },
  { name: 'Moving Company', key: 'moving-company', isPopular: false },
  { name: 'Nutritionist', key: 'nutritionist', isPopular: false },
  { name: 'Online Course Platform', key: 'online-course-platform', isPopular: false },
  { name: 'Orthopedic', key: 'orthopedic', isPopular: false },
  { name: 'Physical Therapy Clinic', key: 'physical-therapy-clinic', isPopular: false },
  { name: 'Plumbing Company', key: 'plumbing-company', isPopular: false },
  { name: 'Pool Service Company', key: 'pool-service-company', isPopular: false },
  { name: 'Property Management Company', key: 'property-management-company', isPopular: false },
  { name: 'Real Estate Agency', key: 'real-estate-agency', isPopular: false },
  { name: 'Roofing Company', key: 'roofing-company', isPopular: false },
  { name: 'SAAS Company', key: 'saas-company', isPopular: false },
  { name: 'Skincare Brand', key: 'skincare-brand', isPopular: false },
  { name: 'Solar Installation Company', key: 'solar-installation-company', isPopular: false },
  { name: 'Tech Startup', key: 'tech-startup', isPopular: false },
  { name: 'Trucking Company', key: 'trucking-company', isPopular: false },
  { name: 'Vape Shop', key: 'vape-shop', isPopular: false },
  { name: 'Veterinary Clinic', key: 'veterinary-clinic', isPopular: false },
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

// Per-category image getter. Target is 24 logos per category (the design
// renders 12 by default + 12 more on "Show more"). When a category ships
// real 24 images, the result is returned as-is; for categories that only
// have a partial set today, the array cycles back to fill to 24 so the
// "Show more" UX is exercised. Replace the data above with real 24-image
// arrays when assets land and this padding becomes a no-op automatically.
const TARGET_LOGO_COUNT = 24
export const getCategoryImages = (key: string): string[] => {
  const base = CATEGORY_IMAGES[key] ?? CATEGORY_IMAGES['coffee-shop']
  if (base.length >= TARGET_LOGO_COUNT) return base.slice(0, TARGET_LOGO_COUNT)
  const out: string[] = []
  for (let i = 0; i < TARGET_LOGO_COUNT; i++) out.push(base[i % base.length])
  return out
}

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
    a: "Yes – 100%. No hidden fees, no surprise charges, and no credit card needed. If you're one of the first 2,000,000 sign-ups, your custom logo is completely free at launch.",
  },
  {
    q: 'Will my logo be unique?',
    a: 'Every single one. Each logo is generated fresh – just for you. No two are the same. Your brand gets its own look, not a recycled template.',
  },
  {
    q: 'How is this different from other AI logo makers?',
    a: 'Most "logo makers" give you a generic template with your name added. LOGO.AI creates a custom logo based on your brand and your industry – powered by advanced AI to deliver something original.',
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
    a: "The moment we launch! You'll get an email as soon as LOGO.AI goes live.",
  },
  {
    q: 'How many free logos are left?',
    a: '2,000,000 total. Spots are being claimed every day — the sooner you sign up, the better your chances.',
  },
  {
    q: 'Is my logo trademark-safe?',
    a: "We design logos to reduce look-alike risks. However, we can't guarantee trademark approval. We recommend doing a quick legal check.",
  },
  {
    q: 'Why is it free to generate and preview?',
    a: "We're 100% confident you'll find a logo you love. Generate and preview as many times as you want — pay $49 once when you find the one. If nothing fits, walk away with no charge.",
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
export type NavLink = {
  text: string
  href?: string
  children?: { text: string; href: string }[]
}

export const NAV_LINKS: NavLink[] = [
  { text: 'Product',       href: '/product' },
  { text: 'How it works',  href: '/how-it-works' },
  { text: 'Examples',      href: '/examples' },
  { text: 'Why LOGO.AI',   href: '/why-logo-ai' },
  { text: "Who it's for",  href: '/who-its-for' },
  {
    text: 'Company',
    children: [
      { text: 'About us',   href: '/about' },
      { text: 'Our story',  href: '/our-story' },
      { text: 'Leadership', href: '/leadership' },
      { text: 'Press',      href: '/press' },
      { text: 'Contact',    href: '/contact' },
    ],
  },
  { text: 'Blog', href: '/blog' },
]

// ─── Footer links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { t: 'Why LOGO.AI',   h: '/why-logo-ai' },
      { t: 'Product',       h: '/product' },
      { t: 'How it works',  h: '/how-it-works' },
      { t: 'Examples',      h: '/examples' },
      { t: "Who it's for",  h: '/who-its-for' },
      { t: 'FAQ',           h: '/#faq' },
      { t: 'Blog',          h: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { t: 'About us',   h: '/about' },
      { t: 'Our story',  h: '/our-story' },
      { t: 'Leadership', h: '/leadership' },
      { t: 'Press',      h: '/press' },
      { t: 'Contact',    h: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { t: 'Privacy policy',    h: '/privacy' },
      { t: 'Terms of service',  h: '/terms' },
      { t: 'Cookie policy',     h: '/cookies' },
    ],
  },
]

// ─── Social links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { name: 'Twitter',   href: 'https://twitter.com/logoai' },
  { name: 'LinkedIn',  href: 'https://linkedin.com/company/logoai' },
  { name: 'Instagram', href: 'https://instagram.com/logoai' },
]
