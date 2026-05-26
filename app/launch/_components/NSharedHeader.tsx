'use client'

// Shared top nav for every launch page. Lives in the launch layout so
// it stays mounted across client-side navigations (landing → onboarding,
// onboarding → results, etc.) — no remount, no jump. usePathname() flips
// hideNav so the nav links + right-side items disappear on the onboarding
// while the bar itself (same height, same logo position) carries through.
//
// shrinkOnScroll is intentionally OFF — the compact "floating pill" mode
// would cause the logo to shift left (the pill is 92% width, centred) when
// scrolled, and snap back to full-width on the new page (scroll resets to
// 0). Keeping the header full-width at all scrolls = the logo's left edge
// is identical on landing and onboarding.

import { usePathname } from 'next/navigation'
import MHeader from '../../prelaunch/_components/MHeader'

export default function NSharedHeader() {
  const pathname = usePathname()
  const isOnboarding = pathname?.startsWith('/launch/start') ?? false

  return (
    <MHeader
      hideNav={isOnboarding}
      homeHref="/launch"
      ctaLabel="Generate My Free Logos"
      ctaHref="/launch/start"
    />
  )
}
