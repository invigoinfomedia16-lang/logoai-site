'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ArrowRight from './ui/ArrowRight'

interface CTASectionProps {
  onSubmit: () => void
  submitted: boolean
}

const SLIDES = [
  {
    label: 'Coffee Shop',
    brand: 'Oro — Every Cup, Golden',
    main: '/images/illustrations/cta-oro-main.webp',
    left: ['/images/illustrations/cta-oro-cup.webp', '/images/illustrations/cta-oro-card.webp', '/images/illustrations/cta-oro-bag.webp'],
    right: ['/images/illustrations/cta-oro-menu.webp', '/images/illustrations/cta-oro-apron.webp', '/images/illustrations/cta-oro-loyalty.webp'],
  },
  {
    label: 'Gym',
    brand: 'Prime Strength Gym',
    main: '/images/illustrations/cta-gym-main.webp',
    left: ['/images/illustrations/cta-gym-towel.webp', '/images/illustrations/cta-gym-bottle.webp', '/images/illustrations/cta-gym-tshirt.webp'],
    right: ['/images/illustrations/cta-gym-keycard.webp', '/images/illustrations/cta-gym-waterbottle.webp', '/images/illustrations/cta-gym-bag.webp'],
  },
  {
    label: 'Boutique',
    brand: 'Velvet Rose Boutique',
    main: '/images/illustrations/cta-boutique-main.webp',
    left: ['/images/illustrations/cta-bout-bag.webp', '/images/illustrations/cta-bout-tag.webp', '/images/illustrations/cta-bout-box.webp'],
    right: ['/images/illustrations/cta-bout-tissue.webp', '/images/illustrations/cta-bout-loyalty.webp', '/images/illustrations/cta-bout-window.webp'],
  },
  {
    label: 'E-Commerce',
    brand: 'Nova Market',
    main: '/images/illustrations/cta-ecom-main.webp',
    left: ['/images/illustrations/cta-ecom-box.webp', '/images/illustrations/cta-ecom-laptop.webp', '/images/illustrations/cta-ecom-sticker.webp'],
    right: ['/images/illustrations/cta-ecom-phone.webp', '/images/illustrations/cta-ecom-thankyou.webp', '/images/illustrations/cta-ecom-social.webp'],
  },
]

export default function CTASection({ onSubmit, submitted }: CTASectionProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[active]

  return (
    <section className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]" style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}>
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center gap-6">

        {/* ── One unified banner ── */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden" style={{ minHeight: 'clamp(450px, 55vw, 650px)' }}>

          {/* Background — main image fills entire banner */}
          {SLIDES.map((s, i) => (
            <div key={s.label} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: active === i ? 1 : 0 }}>
              <Image src={s.main} alt={s.brand} fill className="object-cover object-center" priority={i === 0} />
            </div>
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.75) 30%, rgba(13,13,13,0.45) 60%, rgba(13,13,13,0.2) 100%)' }} />

          {/* All content inside the banner */}
          <div className="relative z-10 h-full flex flex-col justify-between" style={{ minHeight: 'clamp(450px, 55vw, 650px)' }}>

            {/* Top area — breathing room for storefront image */}
            <div />

            {/* Middle — CTA text + form */}
            <div className="flex flex-col items-center text-center px-6 md:px-10">
              <h2 className="font-bricolage font-medium leading-[1.1em] tracking-[-0.04em] m-0 text-white" style={{ fontSize: 'clamp(24px, 4vw, 48px)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
                Get your free logo in seconds
              </h2>
              <p className="font-bricolage font-normal text-sm md:text-base leading-[22px] text-white/75 m-0 mt-2 max-w-[480px]" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
                Free logo for the first 2,000,000 users. Join now to secure yours at launch.
              </p>
              <div className="mt-5 flex flex-col items-center gap-2 max-w-[480px] w-full">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-xl p-[5px] w-full" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(13,13,13,0.6)', backdropFilter: 'blur(8px)' }}>
                  {!submitted && <input type="email" placeholder="Enter your email address" className="flex-1 bg-transparent border-0 outline-none text-white font-bricolage text-sm sm:text-base px-4 py-3" />}
                  <button onClick={onSubmit} className="inline-flex items-center justify-center gap-1 font-bricolage font-semibold text-white rounded-xl border-0 cursor-pointer whitespace-nowrap" style={{ padding: submitted ? '14px 0' : 'clamp(12px,1.5vw,16px) clamp(18px,2.5vw,28px)', fontSize: 'clamp(14px,1.5vw,18px)', background: submitted ? 'transparent' : '#336AEA', borderRadius: 10 }}>
                    {submitted ? "You're on the list!" : <><span>Get my free logo</span><ArrowRight /></>}
                  </button>
                </div>
                {!submitted && <span className="font-bricolage font-medium text-xs text-white/40">No credit card required.</span>}
              </div>
            </div>

            {/* Bottom — thumbnails inside banner */}
            <div className="flex items-end gap-2 md:gap-3 px-4 md:px-6 pb-4 md:pb-6">
              {/* Left 3 thumbnails */}
              <div className="hidden md:flex flex-col gap-2 flex-shrink-0" style={{ width: 'clamp(80px, 10vw, 140px)' }}>
                {slide.left.map((t, i) => (
                  <div key={i} className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                    <Image src={t} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Center — brand label + dots */}
              <div className="flex-1 flex flex-col items-center gap-3 pb-2">
                <p className="font-bricolage text-xs font-medium text-white/50 m-0">
                  {slide.brand} — <span className="text-white/30">created with Logo.ai</span>
                </p>
                <div className="flex gap-2">
                  {SLIDES.map((s, i) => (
                    <button key={s.label} onClick={() => setActive(i)} title={s.label} className="border-0 cursor-pointer p-0 transition-all duration-200" style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? '#336AEA' : 'rgba(255,255,255,0.2)' }} />
                  ))}
                </div>
              </div>

              {/* Right 3 thumbnails */}
              <div className="hidden md:flex flex-col gap-2 flex-shrink-0" style={{ width: 'clamp(80px, 10vw, 140px)' }}>
                {slide.right.map((t, i) => (
                  <div key={i} className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
                    <Image src={t} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Mobile thumbnails — horizontal scroll below banner */}
        <div className="md:hidden flex gap-2 overflow-x-auto w-full scrollbar-hide">
          {[...slide.left, ...slide.right].map((t, i) => (
            <div key={i} className="relative flex-shrink-0 w-[90px] rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
              <Image src={t} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
