'use client'

// Shared top nav for every prelaunch (/prelaunch) page. Mirrors
// launch's NSharedHeader but configured for the prelaunch flow:
//   - homeHref points to /prelaunch
//   - CTA scrolls to the hero's email-capture form (#hero-cta) — the
//     prelaunch is a waitlist, NOT the launch onboarding, so the CTA
//     must stay on the page
//   - nav items + dropdown match design-l's structure
//     (Product / How it works / Examples / Why LOGO.AI / Who it's for /
//      Company ▾ / Blog)

import { usePathname } from 'next/navigation'
import MHeader from './MHeader'

// v11 prelaunch nav order:
//   Gallery · How It Works · FAQ · Blog · About · Our Story · Browse Logos ▾
const PRELAUNCH_NAV_ITEMS = [
  { label: 'Gallery',      href: '#gallery' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Blog',         href: '#blog' },
  { label: 'About',        href: '#about' },
  { label: 'Our Story',    href: '#our-story' },
]

const PRELAUNCH_DROPDOWN = {
  label: 'Browse Logos',
  items: [
    { label: 'By Industry', href: '#gallery' },
    { label: 'By Style',    href: '#gallery' },
    { label: 'By Symbol',   href: '#gallery' },
    { label: 'By Color',    href: '#gallery' },
  ],
}

export default function MSharedHeader() {
  const pathname = usePathname()
  const isOnboarding = pathname?.startsWith('/prelaunch/start') ?? false

  return (
    <MHeader
      hideNav={isOnboarding}
      homeHref="/prelaunch"
      ctaLabel="Get My Free Logo"
      // Absolute path so the CTA jumps to the hero email form from any
      // /prelaunch subpage, not just the home page.
      ctaHref="/prelaunch#hero-cta"
      navItems={PRELAUNCH_NAV_ITEMS}
      dropdown={PRELAUNCH_DROPDOWN}
    />
  )
}
