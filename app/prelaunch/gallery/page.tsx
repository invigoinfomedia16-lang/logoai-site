import type { Metadata } from 'next'
import MLpSubpageShell from '../_components/MLpSubpageShell'
import MLpPlaceholder from '../_components/MLpPlaceholder'

export const metadata: Metadata = {
  title: 'Gallery — LOGO.AI',
  description: 'Browse the LOGO.AI gallery — full page coming soon.',
}

export default function GalleryPage() {
  return (
    <MLpSubpageShell>
      <MLpPlaceholder title="Gallery" />
    </MLpSubpageShell>
  )
}
