// Design M homepage — the PRELAUNCH landing page. Content mirrors the
// v11 prelaunch copy doc (Logo_AI_Pre_Launch_Page_Copy_v11.docx):
// waitlist framing, "free for first 2,000,000 users" hook, real-time
// counter, free-at-launch pricing card, Early Testers testimonials,
// Use Cases grid, plus the standard launch-site sections styled in
// Purple Charcoal.

import NReveal from '../design-n/_components/NReveal'
import MHero from './_components/MHero'
import MGallery from './_components/MGallery'
import MMockups from './_components/MMockups'
import MHowItWorks from './_components/MHowItWorks'
import MReviews from './_components/MReviews'
import MUseCases from './_components/MUseCases'
import MPricing from './_components/MPricing'
import MCompare from './_components/MCompare'
import MFinalCTA from './_components/MFinalCTA'
import MFaq from './_components/MFaq'
import MBlog from './_components/MBlog'
import MFooter from './_components/MFooter'
import MStickyCTA from './_components/MStickyCTA'

export default function DesignMHome() {
  return (
    <>
      <main>
        {/* Hero is above the fold — render immediately, no reveal. */}
        <MHero />
        <NReveal><MGallery /></NReveal>
        <NReveal><MMockups /></NReveal>
        <NReveal><MHowItWorks /></NReveal>
        <NReveal><MReviews /></NReveal>
        <NReveal><MUseCases /></NReveal>
        <NReveal><MPricing /></NReveal>
        <NReveal><MCompare /></NReveal>
        <NReveal><MFaq /></NReveal>
        <NReveal><MBlog /></NReveal>
        <NReveal><MFinalCTA /></NReveal>
      </main>
      <MFooter />
      <MStickyCTA />
    </>
  )
}
