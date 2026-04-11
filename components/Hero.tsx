'use client'

import { forwardRef, useEffect, useState } from 'react'
import Badge from './ui/Badge'
import ArrowRight from './ui/ArrowRight'
import AnimatedCounter from './ui/AnimatedCounter'
import LogoCarousel from './LogoCarousel'
import { getDaysUntilLaunch, getLogosRemaining } from '@/data'

interface HeroProps {
  onSubmit: () => void
  submitted: boolean
}

const BORDER_SUBTLE = 'rgba(84,87,94,0.3)'

const Hero = forwardRef<HTMLDivElement, HeroProps>(function Hero(
  { onSubmit, submitted },
  ref
) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
  }, [])

  const slide = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-60px)',
    transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
  })

  return (
    <section className="px-5 md:px-8 lg:px-10 pt-[120px] md:pt-[180px] pb-10 md:pb-[60px]">
      <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto flex flex-col gap-7 md:gap-10 items-center text-center">
        {/* Text block */}
        <div className="flex flex-col items-center gap-3.5 md:gap-5">
          <div style={slide(0.3)}>
            <Badge icon="sparkle" text="World's best AI logo generator" />
          </div>

          <h1
            className="font-bricolage font-bold leading-[1.1em] tracking-[-0.04em] m-0"
            style={{
              ...slide(0.5),
              fontSize: 'clamp(36px, 6vw, 68px)',
            }}
          >
            Get your free logo in seconds
          </h1>

          <p
            className="font-bricolage font-semibold leading-7 tracking-[-0.02em] text-white/50 m-0 max-w-[520px]"
            style={{ ...slide(0.7), fontSize: 'clamp(16px, 2vw, 18px)' }}
          >
            Free logo for the first 1,000,000 users. Join now to secure yours
            at launch.
          </p>
        </div>

        {/* Email form */}
        <div
          id="hero-cta"
          ref={ref}
          className="flex flex-col gap-3 max-w-[720px]"
          style={slide(0.9)}
        >
          {submitted ? (
            <p className="font-bricolage font-semibold text-white m-0" style={{ fontSize: 'clamp(17px,1.8vw,20px)' }}>
              You're on the list! We'll email you at launch.
            </p>
          ) : (
            <>
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl p-1.5"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: '#2B2B2B',
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent border-0 outline-none text-white font-bricolage font-normal px-5 py-[18px] sm:py-6 text-lg sm:text-xl"
                />

                <button
                  onClick={onSubmit}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border-0 cursor-pointer font-bricolage font-semibold text-white whitespace-nowrap flex-shrink-0 transition-all duration-200"
                  style={{
                    padding: 'clamp(20px,2.5vw,28px) clamp(28px,4vw,52px)',
                    background: '#336AEA',
                    fontSize: 'clamp(18px,1.8vw,22px)',
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
                  Get my free logo
                  <ArrowRight />
                </button>
              </div>

              <span className="font-bricolage font-medium text-sm text-white/50">
                No credit card required.
              </span>
            </>
          )}
        </div>

        {/* Stats row */}
        <div
          className="flex items-center flex-wrap gap-4 w-fit mx-auto"
          style={slide(1)}
        >
          <AnimatedCounter
            start={getLogosRemaining() + 50000}
            end={getLogosRemaining()}
            label="free logos remaining"
            sublabel="of 1,000,000"
          />

          {/* Divider (hidden on mobile) */}
          <div
            className="hidden sm:block w-px h-10"
            style={{ background: BORDER_SUBTLE }}
          />

          <div className="flex flex-col items-center gap-0.5">
            <span className="font-bricolage font-bold text-lg text-white/85">
              {getDaysUntilLaunch()} days
            </span>
            <span className="font-bricolage font-medium text-xs text-white/40">
              until launch
            </span>
          </div>
        </div>

        {/* Carousel strip */}
        <div style={slide(1.1)}>
          <LogoCarousel />
        </div>
      </div>
    </section>
  )
})

export default Hero
