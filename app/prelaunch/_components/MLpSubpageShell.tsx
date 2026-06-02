// MLpSubpageShell — the full chrome (nav, footer, sticky CTA, shared
// theme tokens, typography, layout primitives) bundled into one shell
// for every prelaunch SUBPAGE. Drop content inside <MLpSubpageShell>
// and use the same .wrap / .sec-head / .eyebrow / h2 / .lede / p
// classes the home page uses — the page automatically inherits the
// home-page visual system.

import type { ReactNode } from 'react'
import MLpNav from './MLpNav'
import MLpStickyCTA from './MLpStickyCTA'
import MLpFooter from './MLpFooter'
import { MLP_NAV_STYLES } from './MLpNavStyles'

export default function MLpSubpageShell({ children }: { children: ReactNode }) {
  return (
    <div className="lp-root is-figma is-figma-type">
      <style dangerouslySetInnerHTML={{ __html: MLP_NAV_STYLES }} />
      <MLpNav />
      {children}
      <MLpFooter />
      <MLpStickyCTA />
    </div>
  )
}
