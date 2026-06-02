import type { Metadata } from 'next'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpPlaceholder from '../_components/MLpPlaceholder'

export const metadata: Metadata = {
  title: 'Our Story — LOGO.AI',
  description:
    'Thirty years of building things. One problem that never got fixed. So we fixed it. (Full story coming soon.)',
}

export default function OurStoryPage() {
  return (
    <MLpSubpageShell>
      <MLpPlaceholder title="Our" mutedSuffix="Story" />
    </MLpSubpageShell>
  )
}
