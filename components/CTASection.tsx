'use client'

import Image from 'next/image'
import ArrowRight from './ui/ArrowRight'

interface CTASectionProps {
  onSubmit: () => void
  submitted: boolean
}

export default function CTASection({ onSubmit, submitted }: CTASectionProps) {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-5">
        {/* Banner */}
        <div
          className="relative w-full rounded-3xl md:rounded-[32px] overflow-hidden"
          style={{ height: 'clamp(300px, 40vw, 500px)' }}
        >
          {/* Background image */}
          <Image
            src="/images/1.jpeg"
            alt=""
            fill
            className="object-cover object-[center_30%]"
            priority
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.15) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-10">
            <div className="flex flex-col gap-2 mb-4">
              <h2
                className="font-bricolage font-medium leading-[1.1em] tracking-[-0.04em] m-0 text-white"
                style={{
                  fontSize: 'clamp(24px, 4vw, 56px)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.6)',
                }}
              >
                Get your free logo in seconds
              </h2>
              <p
                className="font-bricolage font-normal text-sm md:text-base leading-[22px] text-white/75 m-0"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              >
                Free logo for the first 2,000,000 users. Join now to secure
                yours at launch.
              </p>
            </div>

            {/* Email form */}
            <div className="flex flex-col gap-2.5 max-w-[560px] mt-4">
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-xl p-[5px]"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {!submitted && (
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent border-0 outline-none text-white font-bricolage text-base sm:text-lg px-4 py-3.5 sm:py-[18px]"
                  />
                )}
                <button
                  onClick={onSubmit}
                  className="inline-flex items-center justify-center gap-1 font-bricolage font-semibold text-white rounded-xl border-0 cursor-pointer transition-all duration-200 whitespace-nowrap"
                  style={{
                    padding: submitted ? '20px 0' : 'clamp(14px,2vw,20px) clamp(20px,3vw,32px)',
                    fontSize: 'clamp(18px,1.8vw,20px)',
                    background: submitted ? 'transparent' : '#336AEA',
                    borderRadius: 12,
                  }}
                >
                  {submitted ? (
                    "You're on the list! We'll email you at launch."
                  ) : (
                    <>
                      Get my free logo
                      <ArrowRight />
                    </>
                  )}
                </button>
              </div>

              {!submitted && (
                <span className="font-bricolage font-medium text-sm text-white/50">
                  No credit card required.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
