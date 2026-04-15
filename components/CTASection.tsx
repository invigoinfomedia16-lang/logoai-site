'use client'

import Image from 'next/image'
import ArrowRight from './ui/ArrowRight'

interface CTASectionProps {
  onSubmit: () => void
  submitted: boolean
}

const LEFT_THUMBS = [
  '/images/illustrations/hg-cup.png',
  '/images/illustrations/hg-bag.png',
  '/images/illustrations/hg-card.png',
]

const RIGHT_THUMBS = [
  '/images/illustrations/hg-apron.png',
  '/images/illustrations/hg-social.png',
  '/images/illustrations/hg-loyalty.png',
]

function Thumb({ src, rotate }: { src: string; rotate: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border-2 border-white/10 cursor-pointer"
      style={{
        width: 'clamp(80px, 10vw, 140px)',
        aspectRatio: '1',
        transform: `rotate(${rotate}deg) scale(1)`,
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        zIndex: 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.15)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) scale(1)`
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.zIndex = '1'
      }}
    >
      <Image src={src} alt="" fill className="object-cover" sizes="140px" />
    </div>
  )
}

export default function CTASection({ onSubmit, submitted }: CTASectionProps) {
  return (
    <section className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]" style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}>

      {/* Desktop: storefront + thumbnails + overlay */}
      <div className="hidden md:block max-w-[95%] sm:max-w-[90%] mx-auto relative overflow-hidden rounded-[20px]">
        <div className="relative w-full" style={{ aspectRatio: '1460/760' }}>
          <Image
            src="/images/illustrations/hg-storefront.png"
            alt="Hearth & Grind Roasters"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-y-0 left-0 w-[200px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.7), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-[200px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(13,13,13,0.7), transparent)' }} />
          <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)' }} />

          {/* Left thumbnails — tilted */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-3">
            <Thumb src={LEFT_THUMBS[0]} rotate={-5} />
            <Thumb src={LEFT_THUMBS[1]} rotate={3} />
            <Thumb src={LEFT_THUMBS[2]} rotate={-4} />
          </div>

          {/* Right thumbnails — tilted */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-3 items-end">
            <Thumb src={RIGHT_THUMBS[0]} rotate={4} />
            <Thumb src={RIGHT_THUMBS[1]} rotate={-3} />
            <Thumb src={RIGHT_THUMBS[2]} rotate={5} />
          </div>

          {/* CTA content */}
          <div className="absolute inset-0 z-[4] flex flex-col justify-end items-center text-center px-10 pb-12 pointer-events-none">
            <h2
              className="font-bricolage font-semibold leading-[1.1em] tracking-[-0.03em] m-0 text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Get your free logo in seconds
            </h2>
            <p
              className="font-inter font-normal text-base leading-[22px] text-white/75 m-0 mt-3 max-w-[480px]"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
            >
              Free logo for the first 2,000,000 users. Join now to secure yours at launch.
            </p>
            <div className="mt-5 flex flex-col items-center gap-2 max-w-[480px] w-full pointer-events-auto">
              <div
                className="flex flex-row items-center rounded-xl p-[5px] w-full"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(13,13,13,0.6)', backdropFilter: 'blur(8px)' }}
              >
                {!submitted && (
                  <input type="email" placeholder="Enter your email address" className="flex-1 bg-transparent border-0 outline-none text-white font-inter text-base px-4 py-3" />
                )}
                <button
                  onClick={onSubmit}
                  className="inline-flex items-center justify-center gap-1 font-inter font-semibold text-white rounded-xl border-0 cursor-pointer whitespace-nowrap transition-all duration-200"
                  style={{ padding: submitted ? '14px 0' : 'clamp(12px,1.5vw,16px) clamp(18px,2.5vw,28px)', fontSize: 'clamp(14px,1.5vw,18px)', background: submitted ? 'transparent' : '#336AEA', borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(51,106,234,0.4)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)' }}
                >
                  {submitted ? "You're on the list!" : <><span>Get my free logo</span><ArrowRight /></>}
                </button>
              </div>
              {!submitted && <span className="font-inter font-medium text-xs text-white/40">No credit card required.</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: clean text CTA */}
      <div className="md:hidden flex flex-col items-center text-center gap-5">
        <h2
          className="font-bricolage font-semibold leading-[1.15em] tracking-[-0.03em] m-0 text-white"
          style={{ fontSize: 'clamp(24px, 6vw, 32px)' }}
        >
          Get your free logo in seconds
        </h2>
        <p className="font-inter font-normal text-sm leading-[22px] text-white/60 m-0 max-w-[320px]">
          Free logo for the first 2,000,000 users. Join now to secure yours at launch.
        </p>
        <div className="flex flex-col items-center gap-2 w-full max-w-[340px]">
          <div
            className="flex flex-col items-stretch rounded-xl p-[5px] w-full"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#2B2B2B' }}
          >
            {!submitted && (
              <input type="email" placeholder="Enter your email address" className="bg-transparent border-0 outline-none text-white font-inter text-sm px-4 py-3" />
            )}
            <button
              onClick={onSubmit}
              className="inline-flex items-center justify-center gap-1 font-inter font-semibold text-white rounded-xl border-0 cursor-pointer whitespace-nowrap"
              style={{ padding: '14px 24px', fontSize: '15px', background: submitted ? 'transparent' : '#336AEA', borderRadius: 10 }}
            >
              {submitted ? "You're on the list!" : <><span>Get my free logo</span><ArrowRight /></>}
            </button>
          </div>
          {!submitted && <span className="font-inter font-medium text-xs text-white/40">No credit card required.</span>}
        </div>
      </div>

    </section>
  )
}
