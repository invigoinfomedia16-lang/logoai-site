// Design N homepage — same visual system as Design M, content from the
// LOGOAI landing-page doc. Top nav (MHeader) is shared with design-m, just
// with the doc's CTA label. Footer is NFooter (M's footer design, doc links,
// Brand Kit removed). Local-only — http://localhost:3010/design-n

import MHeader from '../design-m/_components/MHeader'
import NReveal from './_components/NReveal'
import NStickyCTA from './_components/NStickyCTA'
import NHero from './_components/NHero'
import NRiskFree from './_components/NRiskFree'
import NHowItWorks from './_components/NHowItWorks'
import NGallery from './_components/NGallery'
import NMockups from './_components/NMockups'
import NReviews from './_components/NReviews'
import NCompare from './_components/NCompare'
import NPricing from './_components/NPricing'
import NFaq from './_components/NFaq'
import NFinalCTA from './_components/NFinalCTA'
import NFooter from './_components/NFooter'

export default function DesignNHome() {
  return (
    <>
      <MHeader
        ctaLabel="Generate My Free Logos"
        homeHref="/design-n"
        shrinkOnScroll
        ctaHref="/design-n/start"
      />
      <main>
        {/* NHero is above the fold — render it immediately, no reveal. */}
        <NHero />
        <NReveal><NRiskFree /></NReveal>
        <NReveal><NHowItWorks /></NReveal>
        <NReveal><NGallery /></NReveal>
        <NReveal><NMockups /></NReveal>
        <NReveal><NReviews /></NReveal>
        <NReveal><NCompare /></NReveal>
        <NReveal><NPricing /></NReveal>
        <NReveal><NFaq /></NReveal>
        <NReveal><NFinalCTA /></NReveal>
      </main>
      <NFooter />
      <NStickyCTA />
    </>
  )
}
