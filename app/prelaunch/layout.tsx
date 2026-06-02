// /prelaunch layout — minimal. No shared header, no shared theme wrapper.
// The main /prelaunch page and every subpage owns its own nav (MLpNav)
// and visual chrome so the old launch-site design language never leaks
// into prelaunch routes. The legacy m-theme wrapper, MSharedHeader, and
// the old font loads were removed deliberately: any prelaunch subpage
// that isn't built in the new MLp design lives as an empty placeholder
// rather than rendering the old design.

import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logo.AI — Free logos for the first 2,000,000 users (prelaunch)',
  description:
    "World's best AI logo generator. Free at launch. Join now to claim yours.",
}

export default function PrelaunchLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
