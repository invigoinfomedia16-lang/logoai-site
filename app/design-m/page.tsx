// Design M homepage — composition of the 11 ported HEADSHOT sections,
// rendered with LOGO.AI content. Local-only (not deployed); reach it
// at http://localhost:3000/design-m once `npm run dev` is running.

import MHeader from './_components/MHeader'
import MHero from './_components/MHero'
import MHowItWorks from './_components/MHowItWorks'
import MReviews from './_components/MReviews'
import MAmazingFor from './_components/MAmazingFor'
import MGallery from './_components/MGallery'
import MPricing from './_components/MPricing'
import MPrivacy from './_components/MPrivacy'
import MFaq from './_components/MFaq'
import MFinalCTA from './_components/MFinalCTA'
import MFooter from './_components/MFooter'

export default function DesignMHome() {
  return (
    <>
      <MHeader shrinkOnScroll />
      <main>
        <MHero />
        <MHowItWorks />
        <MReviews />
        <MAmazingFor />
        <MGallery />
        <MPricing />
        <MPrivacy />
        <MFaq />
        <MFinalCTA />
      </main>
      <MFooter />
    </>
  )
}
