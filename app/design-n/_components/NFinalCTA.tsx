'use client'

// Final CTA — Design N. Ports the purple L design's bottom-CTA composition:
// storefront image + edge/bottom gradient overlays + 3 tilted thumbnails per
// side + CTA content overlaid at the bottom. Desktop shows the full overlay
// composition; mobile stacks a rounded image banner above the CTA text.
// Copy from the LOGOAI landing-page doc, section 11.

import Image from 'next/image'

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M10 4l6 6-6 6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LEFT_THUMBS = [
  { src: '/images/illustrations/hg-cup.png', rot: -5 },
  { src: '/images/illustrations/hg-bag.png', rot: 3 },
  { src: '/images/illustrations/hg-card.png', rot: -4 },
]
const RIGHT_THUMBS = [
  { src: '/images/illustrations/hg-apron.png', rot: 4 },
  { src: '/images/illustrations/hg-social.png', rot: -3 },
  { src: '/images/illustrations/hg-loyalty.png', rot: 5 },
]

function Thumb({ src, rot }: { src: string; rot: number }) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        width: 'clamp(110px, 13vw, 190px)',
        aspectRatio: '1',
        borderRadius: 'var(--m-radius-xl)',
        border: '2px solid rgba(255,255,255,0.12)',
        transform: `rotate(${rot}deg) scale(1)`,
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        zIndex: 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.12)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rot}deg) scale(1)`
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
        e.currentTarget.style.zIndex = '1'
      }}
    >
      <Image src={src} alt="" fill className="object-contain" sizes="190px" />
    </div>
  )
}

export default function NFinalCTA() {
  return (
    <section
      data-n-bottom-cta
      className="w-full py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px]"
      style={{ background: 'var(--m-surface)' }}
    >
      {/* Desktop — storefront composition with overlay */}
      <div
        className="hidden md:block max-w-[1280px] mx-auto relative overflow-hidden"
        style={{ borderRadius: 20 }}
      >
        <div className="relative w-full" style={{ aspectRatio: '1460/760' }}>
          <Image
            src="/images/illustrations/hg-storefront.png"
            alt=""
            fill
            className="object-cover object-center"
          />

          {/* Edge + bottom gradients */}
          <div
            className="absolute inset-y-0 left-0 w-[200px] z-[1] pointer-events-none"
            style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.7), transparent)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[200px] z-[1] pointer-events-none"
            style={{ background: 'linear-gradient(to left, rgba(10,10,10,0.7), transparent)' }}
          />
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 32%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.2) 78%, transparent 100%)',
            }}
          />
          {/* Localized scrim behind the CTA copy — a dark radial blob
              centred on the text column so the eyebrow + heading stay
              legible even over the bright lit medallion. */}
          <div
            className="absolute inset-x-0 bottom-0 z-[3] pointer-events-none"
            style={{
              height: '78%',
              background:
                'radial-gradient(ellipse 58% 100% at 50% 100%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.25) 70%, transparent 88%)',
            }}
          />

          {/* Left thumbnails — tilted */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-3">
            {LEFT_THUMBS.map((t) => (
              <Thumb key={t.src} src={t.src} rot={t.rot} />
            ))}
          </div>

          {/* Right thumbnails — tilted */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-3 items-end">
            {RIGHT_THUMBS.map((t) => (
              <Thumb key={t.src} src={t.src} rot={t.rot} />
            ))}
          </div>

          {/* CTA content overlay — the inner wrapper takes an explicit
              maxWidth so the heading always wraps inside the centre channel
              and never collides with the tilted thumbnails on either side. */}
          <div
            className="absolute inset-0 z-[4] flex flex-col justify-end items-center text-center pb-14 pointer-events-none"
            style={{
              paddingLeft: 'clamp(24px, 16vw, 260px)',
              paddingRight: 'clamp(24px, 16vw, 260px)',
            }}
          >
            <div
              className="flex flex-col items-center w-full"
              style={{ maxWidth: 480 }}
            >
            <h2
              className="m-h2"
              style={{
                color: '#FFFFFF',
                textShadow: '0 2px 20px rgba(0,0,0,0.55)',
                maxWidth: 480,
                whiteSpace: 'normal',
              }}
            >
              Your professional logo is 60 seconds away
            </h2>
            <p
              className="m-sub mt-3"
              style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 10px rgba(0,0,0,0.45)' }}
            >
              The worst that can happen? You spend a minute and walk away.
            </p>
            <a
              href="/design-n/start"
              className="m-cta-lg m-cta-btn inline-flex items-center justify-center gap-3 mt-6 pointer-events-auto"
              style={{
                color: '#FFFFFF',
                borderRadius: 'var(--m-radius-md)',
                padding: '16px 30px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              }}
            >
              <span>Generate My Free Logos</span>
              <ArrowRight />
            </a>
            <p
              className="m-body-sm mt-3"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              No payment needed to generate and preview your logos • Pay only to download
            </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — clean centered text CTA. Matches the L design's bottom
          CTA on mobile: the storefront composition is desktop-only; small
          screens get a plain, focused heading + button instead. */}
      <div className="md:hidden flex flex-col items-center gap-5 text-center max-w-[400px] mx-auto">
        <h2 className="m-h2">
          Your professional logo is 60 seconds away
        </h2>
        <p className="m-sub">
          The worst that can happen? You spend a minute and walk away.
        </p>
        <a
          href="/design-n/start"
          className="m-cta-lg m-cta-btn w-full inline-flex items-center justify-center gap-3 mt-1"
          style={{
            color: '#FFFFFF',
            borderRadius: 'var(--m-radius-md)',
            padding: '16px 28px',
            boxShadow: '0 1px 1px 0 rgba(0,0,0,0.05)',
          }}
        >
          <span>Generate My Free Logos</span>
          <ArrowRight />
        </a>
        <p className="m-body-sm" style={{ fontSize: 13, color: 'var(--m-text-soft)' }}>
          No payment needed to generate and preview your logos • Pay only to download
        </p>
      </div>
    </section>
  )
}
