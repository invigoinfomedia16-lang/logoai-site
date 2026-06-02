import type { Metadata } from 'next'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpPlaceholder from '../_components/MLpPlaceholder'

export const metadata: Metadata = {
  title: "Who It's For — LOGO.AI",
  description: 'Who LOGO.AI is for — full page coming soon.',
}

export default function WhoItsForPage() {
  return (
    <MLpSubpageShell>
      <MLpPlaceholder title="Who It's" mutedSuffix="For" />
    </MLpSubpageShell>
  )
}
