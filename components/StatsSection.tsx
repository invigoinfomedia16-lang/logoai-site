'use client'

import React, { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import Badge from './ui/Badge'

function easeOut(t: number) {
  return 1 - (1 - t) ** 3
}

function formatNum(n: number) {
  return Math.floor(n).toLocaleString('en-US')
}

interface StatCardProps {
  label: string
  from: number
  to: number
  suffix?: string
  desc: string
}

function StatCard({ label, from, to, suffix = '', desc }: StatCardProps) {
  const { ref, inView } = useInView(0.3)
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const duration = 2000
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(from + (to - from) * easeOut(progress))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, from, to])

  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 md:p-10 flex flex-col items-center text-center gap-2 bg-transparent border border-white/[0.1] transition-all duration-300 hover:border-white/[0.2]"
    >
      <span className="font-bricolage text-[36px] md:text-[44px] font-bold text-white leading-none tracking-[-0.02em]">
        {formatNum(value)}
        {suffix && <span className="text-[20px] md:text-[24px] text-white/50 ml-0.5">{suffix}</span>}
      </span>
      <span className="font-inter text-[13px] font-semibold text-[#336AEA] uppercase tracking-[1px] mt-1 mb-2">
        {label}
      </span>
      <span className="font-inter text-[15px] font-normal text-white/50 leading-[1.7]">
        {desc}
      </span>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="trendup" text="By the numbers" />
          <h2 className="font-bricolage font-semibold leading-[1.1em] tracking-[-0.03em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Your free logo is waiting
          </h2>
          <p className="font-inter font-normal text-base sm:text-lg leading-7 text-white/50 m-0">
            854,692 free logos claimed. Secure yours before they&apos;re gone.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <StatCard
            label="Logos Claimed"
            from={800000}
            to={854692}
            desc="Free logos claimed by users worldwide."
          />
          <StatCard
            label="Seconds to Generate"
            from={1}
            to={60}
            suffix="s"
            desc="Average time to generate a complete logo."
          />
          <StatCard
            label="Free Spots Left"
            from={100000}
            to={1145308}
            desc="Free logos still available – claim yours now."
          />
        </div>
      </div>
    </section>
  )
}
