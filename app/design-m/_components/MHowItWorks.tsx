// HowItWorks — 3-step walkthrough mirroring HEADSHOT's 4-card grid pattern
// (numbered circle + step heading + body), with LOGO.AI's actual 3 steps
// from the original docx and live site. Each card has a tinted preview
// surface above the numbered step block.

import Image from 'next/image'

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7.25L5.625 9.875L11 4.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="flex items-center pr-3">
      <div
        className="flex w-8 h-8 items-center justify-center rounded-full"
        style={{ background: 'var(--m-brand)' }}
      >
        <span className="m-sans" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16, lineHeight: '24px' }}>
          {n}
        </span>
      </div>
    </div>
  )
}

const STEPS = [
  {
    num: 1,
    title: 'Describe your brand',
    body: "Enter your business name and a short description — what you do, who you serve, the feeling you want your brand to convey. That's it. No color pickers. No 40-question brand briefs.",
  },
  {
    num: 2,
    title: 'Watch AI design it',
    body: 'In under 60 seconds, our AI generates original logo concepts — choosing the right typography, colors, and layout for you. No clip art. No templates. Real design decisions.',
  },
  {
    num: 3,
    title: 'Download and launch',
    body: 'Pick your favorite. Download high-resolution files instantly — PNG with a transparent background, ready for your website, signage, social media, anywhere.',
  },
]

// Preview tiles use existing logo gallery images so the visual carries some
// "real product" feel without depending on HEADSHOT-only assets.
const PREVIEWS = [
  ['/images/Logos/restaurant-logo-1.webp', '/images/Logos/coffee-shop-logo-1.webp', '/images/Logos/bakery-logo-1.webp'],
  ['/images/Logos/barbershop-logo-1.webp', '/images/Logos/hair-salon-logo-1.webp', '/images/Logos/nail-studio-logo-1.webp'],
  ['/images/Logos/clothing-brand-logo-1.webp', '/images/Logos/gym-logo-1.webp', '/images/Logos/tattoo-studio-logo-1.webp'],
]

export default function MHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-start py-20 md:pb-[128px] md:pt-0 px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 md:gap-16 items-start max-w-[1728px] px-2 sm:px-4 w-full">
        {/* Eyebrow + h2 + sub */}
        <div className="flex flex-col gap-4 items-stretch w-full">
          <p className="m-eyebrow-lg text-center">How It Works</p>
          <h2 className="m-h2 text-center">
            From a single description to a studio-quality logo
          </h2>
          <p className="m-sub text-center" style={{ color: 'var(--m-text-muted)' }}>
            No design skills. No prompts to engineer. Just three simple steps.
          </p>
        </div>

        {/* 3-step grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex flex-col items-start">
              {/* Preview card */}
              <div className="flex flex-col items-start pb-6 w-full">
                <div
                  className="flex flex-col h-[280px] md:h-[320px] items-center justify-center w-full overflow-hidden p-4"
                  style={{
                    background: 'var(--m-surface)',
                    border: '1px solid var(--m-border)',
                    borderRadius: '24px',
                    boxShadow: '0px 1px 3px 0px var(--m-brand-soft), 0px 1px 2px -1px var(--m-brand-soft)',
                  }}
                >
                  <div className="grid grid-cols-3 gap-3 w-full max-w-[300px]">
                    {PREVIEWS[i].map((src) => (
                      <div key={src} className="relative aspect-square">
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            border: '2px solid #FFFFFF',
                            borderRadius: '14px',
                            background: 'var(--m-brand-bg)',
                            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)',
                          }}
                        >
                          <Image src={src} alt="" fill sizes="100px" className="object-contain p-1.5" />
                        </div>
                        <div
                          className="absolute -right-1 -top-1 flex items-center justify-center w-5 h-5 rounded-full"
                          style={{ background: 'var(--m-success-bright)' }}
                        >
                          <CheckIcon />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step heading + body */}
              <div className="flex flex-col gap-3 items-start px-2 w-full">
                <div className="flex items-center w-full">
                  <StepNumber n={s.num} />
                  <h3
                    className="m-display"
                    style={{ color: 'var(--m-ink)', fontWeight: 600, fontSize: 18, lineHeight: '24px' }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p className="m-body-sm">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
