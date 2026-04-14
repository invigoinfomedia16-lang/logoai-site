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

function Thumb({ src, rotate, className }: { src: string; rotate: number; className?: string }) {
  return (
    <div
      className={`thumb-hover relative overflow-hidden rounded-xl border-2 border-white/10 cursor-pointer ${className || ''}`}
      style={{
        width: 'clamp(100px, 12vw, 160px)',
        aspectRatio: '1',
        transform: `rotate(${rotate}deg) scale(1)`,
        transition: 'transform 0.3s ease, border-color 0.3s ease, z-index 0s',
        zIndex: 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.2)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) scale(1)`
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
        e.currentTarget.style.zIndex = '1'
      }}
    >
      <Image src={src} alt="" fill className="object-cover" sizes="160px" />
    </div>
  )
}

export default function CTASection({ onSubmit, submitted }: CTASectionProps) {
  return (
    <section className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]" style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}>
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto relative overflow-hidden rounded-[20px]">

        {/* Storefront background */}
        <div className="relative w-full" style={{ aspectRatio: '1460/760' }}>
          <Image
            src="/images/illustrations/hg-storefront.png"
            alt="Hearth & Grind Roasters"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Side gradients so thumbs pop — pointer-events-none */}
          <div className="absolute inset-y-0 left-0 w-[200px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.7), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-[200px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(13,13,13,0.7), transparent)' }} />

          {/* Dark gradient overlay — pointer-events-none */}
          <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)' }} />

          {/* Left thumbnails — tilted, hidden on mobile */}
          <div className="hidden md:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-[5] flex-col gap-3">
            <Thumb src={LEFT_THUMBS[0]} rotate={-5} className="ml-1" />
            <Thumb src={LEFT_THUMBS[1]} rotate={3} className="ml-5" />
            <Thumb src={LEFT_THUMBS[2]} rotate={-4} className="ml-2" />
          </div>

          {/* Right thumbnails — tilted, hidden on mobile */}
          <div className="hidden md:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-[5] flex-col gap-3 items-end">
            <Thumb src={RIGHT_THUMBS[0]} rotate={4} className="mr-2" />
            <Thumb src={RIGHT_THUMBS[1]} rotate={-3} className="mr-5" />
            <Thumb src={RIGHT_THUMBS[2]} rotate={5} className="mr-1" />
          </div>

          {/* CTA content — pointer-events-none on wrapper, auto on interactive elements */}
          <div className="absolute inset-0 z-[4] flex flex-col justify-end items-center text-center px-6 md:px-10 pb-8 md:pb-12 pointer-events-none">
            <h2
              className="font-bricolage font-semibold leading-[1.1em] tracking-[-0.03em] m-0 text-white"
              style={{ fontSize: 'clamp(24px, 4vw, 48px)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Get your free logo in seconds
            </h2>
            <p
              className="font-inter font-normal text-sm md:text-base leading-[22px] text-white/75 m-0 mt-3 max-w-[480px]"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
            >
              Free logo for the first 2,000,000 users. Join now to secure yours at launch.
            </p>
            <div className="mt-5 flex flex-col items-center gap-2 max-w-[480px] w-full pointer-events-auto">
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-xl p-[5px] w-full"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(13,13,13,0.6)', backdropFilter: 'blur(8px)' }}
              >
                {!submitted && (
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent border-0 outline-none text-white font-inter text-sm sm:text-base px-4 py-3"
                  />
                )}
                <button
                  onClick={onSubmit}
                  className="inline-flex items-center justify-center gap-1 font-inter font-semibold text-white rounded-xl border-0 cursor-pointer whitespace-nowrap transition-all duration-200"
                  style={{
                    padding: submitted ? '14px 0' : 'clamp(12px,1.5vw,16px) clamp(18px,2.5vw,28px)',
                    fontSize: 'clamp(14px,1.5vw,18px)',
                    background: submitted ? 'transparent' : '#336AEA',
                    borderRadius: 10,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(51,106,234,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'
                  }}
                >
                  {submitted ? "You're on the list!" : <><span>Get my free logo</span><ArrowRight /></>}
                </button>
              </div>
              {!submitted && (
                <span className="font-inter font-medium text-xs text-white/40">No credit card required.</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
