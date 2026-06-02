'use client'

// MLpRemainingCount — tiny inline client component that renders the
// LIVE remaining-logos count via the shared useLiveCounter hook.
// Used anywhere the remaining number needs to appear inside a server
// component (e.g. the Our Story subpage's CTA badge). For the hero
// and final CTA, use MLpHeroCounter instead (counter + progress bar
// + tagline). For just the number, this is the lighter wrapper.

import { useLiveCounter } from './useLiveCounter'

export default function MLpRemainingCount() {
  const { remaining } = useLiveCounter()
  return <>{remaining.toLocaleString()}</>
}
