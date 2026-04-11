'use client'

import React, { useEffect, useRef, useState } from 'react'
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
  icon?: React.ReactNode
}

function StatCard({ label, from, to, suffix = '', desc, icon }: StatCardProps) {
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
      className="border rounded-2xl p-7 md:p-9 flex flex-col justify-between gap-6 min-h-[220px] md:min-h-[300px] bg-transparent"
      style={{ borderColor: 'rgba(84,87,94,0.3)' }}
    >
      <div className="flex items-center justify-between">
        <span className="font-bricolage text-xs md:text-sm font-medium text-white/40 uppercase tracking-[1.5px] leading-[1.4em]">
          {label}
        </span>
        {icon && (
          <span style={{ color: '#336AEA', opacity: 0.7 }}>{icon}</span>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-bricolage text-5xl md:text-[64px] font-bold text-white leading-none tracking-[-0.04em]">
          {formatNum(value)}
          {suffix}
        </span>
        <span className="font-bricolage text-sm md:text-base font-medium text-white/50 leading-[1.6em]">
          {desc}
        </span>
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[1120px] mx-auto flex flex-col gap-8 md:gap-[60px]">
        <div className="flex flex-col gap-2.5">
          <Badge icon="trendup" text="By the numbers" />
          <h2 className="font-bricolage font-medium leading-[1.1em] tracking-[-0.04em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Your free logo is waiting
          </h2>
          <p className="font-bricolage font-medium text-base sm:text-lg leading-7 tracking-[-0.02em] text-white/50 m-0">
            854,692 free logos left. Secure yours before they're gone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            label="Logos Claimed"
            from={800000}
            to={854692}
            icon={
              /* Phosphor: Medal */
              <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="128" cy="168" r="64"/>
                <polyline points="84,96 80,40 128,64 176,40 172,96"/>
              </svg>
            }
            desc="Free logos claimed by users worldwide."
          />
          <StatCard
            label="Seconds to Generate"
            from={1}
            to={60}
            suffix="s"
            icon={
              /* Phosphor: Lightning */
              <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="152,16 72,144 128,144 104,240 184,112 128,112 152,16"/>
              </svg>
            }
            desc="Average time to generate a complete logo."
          />
          <StatCard
            label="Free Spots Left"
            from={100000}
            to={145308}
            icon={
              /* Phosphor: Ticket */
              <svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                <path d="M32,80a16,16,0,0,1,0-32H224a16,16,0,0,1,0,32,40,40,0,0,0,0,80,16,16,0,0,1,0,32H32a16,16,0,0,1,0-32,40,40,0,0,0,0-80Z"/>
                <line x1="96" y1="48" x2="96" y2="208"/>
              </svg>
            }
            desc="Free logos still available – claim yours now."
          />
        </div>
      </div>
    </section>
  )
}
