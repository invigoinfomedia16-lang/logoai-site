'use client'

import Badge from './ui/Badge'
import { Keyboard, Sparkle, RocketLaunch } from '@phosphor-icons/react'

const ICON_COLOR = 'rgba(255,255,255,0.25)'

const STEPS = [
  {
    n: '01',
    h: 'Describe your brand',
    d: "Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.",
    icon: <Keyboard weight="bold" size={32} color={ICON_COLOR} />,
  },
  {
    n: '02',
    h: 'Watch AI design it',
    d: 'In under 60 seconds, our AI generates original logo concepts – choosing the right style, colors, and typography for you.',
    icon: <Sparkle weight="bold" size={32} color={ICON_COLOR} />,
  },
  {
    n: '03',
    h: 'Download and launch',
    d: 'Pick your favorite, then download print-ready and web-ready files instantly. No account or credit card needed.',
    icon: <RocketLaunch weight="bold" size={32} color={ICON_COLOR} />,
  },
]

export default function HowItWorks() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="monitor" text="Simple as 1-2-3" />
          <h2 className="font-bricolage font-semibold leading-[1.1em] tracking-[-0.03em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            From idea to logo in seconds
          </h2>
          <p className="font-inter font-normal text-base sm:text-lg leading-7 text-white/50 m-0">
            No design skills needed. Tell us your brand name and let our AI
            handle the rest.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="border border-white/[0.08] rounded-2xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden transition-all duration-300 hover:border-white/[0.15] bg-[#1A1A1A]"
            >
              {/* Icon top-right */}
              <div className="absolute top-8 right-8 md:top-10 md:right-10">
                {step.icon}
              </div>
              <div className="flex flex-col gap-4 pr-12">
                <span className="font-inter text-[11px] font-semibold tracking-[2px] text-white/30">
                  STEP {step.n}
                </span>
                <span className="font-bricolage text-[20px] md:text-[24px] font-normal text-white leading-[1.3em]">
                  {step.h}
                </span>
                <span className="font-inter text-sm md:text-[15px] font-normal text-white/50 leading-[1.7]">
                  {step.d}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
