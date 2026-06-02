import type { Metadata } from 'next'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpPlaceholder from '../_components/MLpPlaceholder'

export const metadata: Metadata = {
  title: 'About — LOGO.AI',
  description:
    'LOGO.AI — the world’s best AI logo generator, free at launch for the first 2,000,000 users. (Full About page coming soon.)',
}

export default function AboutPage() {
  return (
    <MLpSubpageShell>
      <MLpPlaceholder title="About" mutedSuffix="LOGO.AI" />
    </MLpSubpageShell>
  )
}
