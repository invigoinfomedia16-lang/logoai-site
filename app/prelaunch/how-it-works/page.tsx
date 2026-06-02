import type { Metadata } from 'next'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpPlaceholder from '../_components/MLpPlaceholder'

export const metadata: Metadata = {
  title: 'How It Works — LOGO.AI',
  description: 'How LOGO.AI works — full page coming soon.',
}

export default function HowItWorksPage() {
  return (
    <MLpSubpageShell>
      <MLpPlaceholder title="How It" mutedSuffix="Works" />
    </MLpSubpageShell>
  )
}
