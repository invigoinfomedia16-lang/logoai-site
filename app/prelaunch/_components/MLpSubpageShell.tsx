// MLpSubpageShell — the lp-root wrapper, nav, theme tokens, and sticky
// CTA bundled into one shell for prelaunch SUBPAGES (about, our-story,
// gallery, how-it-works, who-its-for, faq, etc.). The styles come from
// MLpNavStyles — the single source of truth shared with the main
// /prelaunch/page.tsx — so any nav/theme/wordmark change lifts every
// page in lockstep with no manual hunt for parallel locations.

import type { ReactNode } from 'react'
import MLpNav from './MLpNav'
import MLpStickyCTA from './MLpStickyCTA'
import { MLP_NAV_STYLES } from './MLpNavStyles'

export default function MLpSubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="lp-root is-figma is-figma-type">
      <style dangerouslySetInnerHTML={{ __html: MLP_NAV_STYLES }} />
      <MLpNav />
      {children}
      <MLpStickyCTA />
    </div>
  )
}
