// L design-system: single source of truth for nav + footer + social links.
// Every page under /design-l/* imports from here. Homepage, canonical Our Story,
// and every Our Story variant share the same NAV_LINKS / FOOTER_LINKS / SOCIAL_LINKS.
// Edit this file once → every page updates.

export type NavLink = {
  text: string
  href?: string
  children?: { text: string; href: string }[]
}

export const NAV_LINKS: NavLink[] = [
  { text: 'Product',       href: '/design-l/product' },
  { text: 'How it works',  href: '/design-l/how-it-works' },
  { text: 'Examples',      href: '/design-l/examples' },
  { text: 'Why LOGO.AI',   href: '/design-l/why-logo-ai' },
  { text: "Who it's for",  href: '/design-l/who-its-for' },
  {
    text: 'Company',
    children: [
      { text: 'About us',   href: '/design-l/about' },
      { text: 'Our story',  href: '/design-l/our-story' },
      { text: 'Leadership', href: '/design-l/leadership' },
      { text: 'Press',      href: '/design-l/press' },
      { text: 'Contact',    href: '/design-l/contact' },
    ],
  },
  { text: 'Blog', href: '/design-l/blog' },
]

export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { t: 'Why LOGO.AI',  h: '/design-l/why-logo-ai' },
      { t: 'Product',      h: '/design-l/product' },
      { t: 'How it works', h: '/design-l/how-it-works' },
      { t: 'Examples',     h: '/design-l/examples' },
      { t: "Who it's for", h: '/design-l/who-its-for' },
      { t: 'FAQ',          h: '/design-l/faq' },
      { t: 'Blog',         h: '/design-l/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { t: 'About us',   h: '/design-l/about' },
      { t: 'Our story',  h: '/design-l/our-story' },
      { t: 'Leadership', h: '/design-l/leadership' },
      { t: 'Press',      h: '/design-l/press' },
      { t: 'Contact',    h: '/design-l/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { t: 'Privacy policy',   h: '/design-l/privacy' },
      { t: 'Terms of service', h: '/design-l/terms' },
      { t: 'Cookie policy',    h: '/design-l/cookies' },
    ],
  },
]

export const SOCIAL_LINKS = [
  { name: 'Twitter',   href: 'https://twitter.com/logoai' },
  { name: 'LinkedIn',  href: 'https://linkedin.com/company/logoai' },
  { name: 'Instagram', href: 'https://instagram.com/logoai' },
]
