// Hero — Design N. Matches the LOGOAI landing-page doc, section 1 (eyebrow
// pill, title, subtitle, CTA, microcopy) plus a hero proof band: an infinite
// marquee strip of logo examples. Marquee is pure CSS (m-marquee-track) so
// it loops seamlessly with no half-cut tiles or empty gaps — and the
// component stays a server component.

import Image from 'next/image'

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.16669 10H15.8334" stroke="#FFFFFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="#FFFFFF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="#FFBA00" aria-hidden="true">
      <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.21-4.1 5.82-.84L10 1.5z" />
    </svg>
  )
}

const HERO_LOGOS = [
  '/images/Logos/restaurant-logo-1.webp',
  '/images/Logos/coffee-shop-logo-1.webp',
  '/images/Logos/bakery-logo-1.webp',
  '/images/Logos/food-truck-logo-1.webp',
  '/images/Logos/barbershop-logo-1.webp',
  '/images/Logos/hair-salon-logo-1.webp',
  '/images/Logos/nail-studio-logo-1.webp',
  '/images/Logos/boutique-logo-1.webp',
  '/images/Logos/clothing-brand-logo-1.webp',
  '/images/Logos/gym-logo-1.webp',
  '/images/Logos/cleaning-service-logo-1.webp',
  '/images/Logos/tattoo-studio-logo-1.webp',
]

export default function NHero() {
  // Duplicate inline so the marquee track is exactly 2× — translating -50% loops seamlessly.
  const marqueeTiles = [...HERO_LOGOS, ...HERO_LOGOS]

  return (
    <section
      data-n-hero
      className="w-full pt-2 pb-16 md:pb-24"
      style={{
        // Tinted with --m-brand-bg so the hero follows the brand-colour
        // toggle. Fades brand tint → white. A colour can override the whole
        // hero background via --m-hero-tint (e.g. the Character.AI gradient);
        // when unset, the fade below is used — so other toggles are unchanged.
        background:
          'var(--m-hero-tint, linear-gradient(to bottom, var(--m-brand-bg) 0%, color-mix(in srgb, var(--m-brand-bg) 50%, var(--m-surface)) 58%, var(--m-surface) 100%))',
      }}
    >
      <div className="px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px]">
        <div className="mx-auto w-full max-w-[1536px] px-2 sm:px-4 pt-12 md:pt-16 pb-10">
          {/* Eyebrow pill — rating */}
          <div className="flex items-center justify-center">
            <span
              className="m-eyebrow inline-flex items-center justify-center gap-2 rounded-full px-4 py-2"
              style={{
                background: 'var(--m-surface)',
                color: 'var(--m-brand)',
                boxShadow: '0 0 0 1px var(--m-brand-soft), 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
              }}
            >
              <span className="inline-flex items-center gap-0.5">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </span>
              <span>Rated 4.9/5 ★ from 12,000+ reviews</span>
            </span>
          </div>

          {/* H1 */}
          <h1 className="m-h1 mx-auto mt-6 max-w-[896px] text-center">
            Free to Try AI Logo Generator
          </h1>

          {/* Subhead */}
          <p className="m-sub mx-auto mt-6 max-w-[768px] text-center">
            Get your professional logo in 60 seconds. Free to generate and preview. Pay only if you love it.
          </p>

          {/* CTA */}
          <div id="hero-cta" className="mt-8 flex flex-col items-center gap-3">
            <a
              href="/design-n/start"
              className="m-cta-lg m-cta-btn inline-flex items-center justify-center gap-3"
              style={{
                color: '#FFFFFF',
                borderRadius: 'var(--m-radius-md)',
                padding: '18px 32px',
                boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
              }}
            >
              <span>Generate My Free Logos</span>
              <ArrowRight />
            </a>
            <p className="m-body-sm" style={{ fontSize: 13, color: 'var(--m-text-soft)' }}>
              No payment needed to generate and preview your logos
            </p>
          </div>
        </div>
      </div>

      {/* Hero proof band — infinite marquee of logo examples. Vertical
          padding keeps the cards' rounded corners + shadow clear of the
          overflow-hidden clip edge. */}
      <div data-n-hero-carousel className="m-marquee-row relative w-full overflow-hidden py-6 md:py-8" aria-label="Logo examples" role="region">
        <div className="m-marquee-track">
          {marqueeTiles.map((src, i) => (
            <div key={`${src}-${i}`} className="shrink-0 px-2">
              <div
                className="relative overflow-hidden"
                style={{
                  width: 'clamp(220px, 22vw, 280px)',
                  aspectRatio: '1',
                  borderRadius: 'var(--m-radius-xl)',
                  background: 'var(--m-surface)',
                  border: '1px solid var(--m-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <Image src={src} alt="" fill sizes="280px" className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10"
          style={{ background: 'linear-gradient(to right, var(--m-surface), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10"
          style={{ background: 'linear-gradient(to left, var(--m-surface), transparent)' }}
        />
      </div>

      {/* Trust strip — sits below the marquee. Generated-logos count +
          verified-rating row. M-design carryover, kept by request. */}
      <div className="px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px] pt-4 sm:pt-6">
        <div className="mx-auto w-full max-w-[1536px] px-2 sm:px-4 flex flex-col items-center gap-5">
          <p className="text-center m-body" style={{ fontSize: 18, lineHeight: '28px' }}>
            Over{' '}
            <span style={{ fontWeight: 700, color: 'var(--m-brand)' }}>4.6M</span>
            {' '}logos generated for{' '}
            <span style={{ fontWeight: 700, color: 'var(--m-brand)' }}>180,000+</span>
            {' '}businesses across{' '}
            <span style={{ fontWeight: 700, color: 'var(--m-brand)' }}>90+ countries</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span aria-hidden="true" style={{ color: '#FFBA00', fontSize: 20, letterSpacing: 2 }}>
              ★★★★★
            </span>
            <span className="m-body" style={{ fontWeight: 600 }}>
              <span style={{ fontWeight: 700, color: 'var(--m-brand-strong)' }}>4.9/5</span>
              {' '}from 12,000+ reviews
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
