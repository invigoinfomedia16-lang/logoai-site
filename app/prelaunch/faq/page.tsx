import type { Metadata } from 'next'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpPlaceholder from '../_components/MLpPlaceholder'

export const metadata: Metadata = {
  title: 'FAQ — LOGO.AI',
  description: 'Frequently asked questions about LOGO.AI — full page coming soon.',
}

export default function FaqPage() {
  return (
    <MLpSubpageShell>
      <MLpPlaceholder title="FAQ" />
    </MLpSubpageShell>
  )
}
