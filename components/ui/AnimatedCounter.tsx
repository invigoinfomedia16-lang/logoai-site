'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/useInView'

function easeOut(t: number) {
  return 1 - (1 - t) ** 3
}

function formatNum(n: number) {
  return Math.floor(n).toLocaleString('en-US')
}

interface AnimatedCounterProps {
  start: number
  end: number
  suffix?: string
  label: string
  sublabel?: string
}

export default function AnimatedCounter({
  start,
  end,
  suffix = '',
  label,
  sublabel,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView(0.3)
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const duration = 2000

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setValue(start + (end - start) * easeOut(progress))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, start, end])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 font-bricolage text-center"
    >
      <span className="font-bold text-lg text-white/85 whitespace-nowrap tabular-nums">
        {formatNum(value)}
        {suffix}
        {sublabel && (
          <span className="text-white/40 font-bold"> {sublabel}</span>
        )}
      </span>
      <span className="font-medium text-xs text-white/40 whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
