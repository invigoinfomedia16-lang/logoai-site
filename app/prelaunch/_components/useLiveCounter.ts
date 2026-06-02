'use client'

// Shared live-counter hook for the prelaunch site. Both MHero and
// MFinalCTA call this so they share one definition of "live" (1s tick)
// and one source of truth: getLogosRemaining + getLogosClaimed from
// @/data, plus a live D:H:M:S countdown derived from LAUNCH_DATE.
// Initial values are computed synchronously at mount so server-render
// and first client paint match — then the tick refreshes them.

import { useEffect, useState } from 'react'
import {
  LAUNCH_DATE,
  getLogosRemaining,
  getLogosClaimed,
} from '@/data'

export type LiveCounter = {
  remaining: number
  claimed: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function readCountdown(): Pick<LiveCounter, 'days' | 'hours' | 'minutes' | 'seconds'> {
  const now = Date.now()
  const ms = Math.max(0, LAUNCH_DATE.getTime() - now)
  const days = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  const minutes = Math.floor((ms % 3_600_000) / 60_000)
  const seconds = Math.floor((ms % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

function readAll(): LiveCounter {
  return {
    remaining: getLogosRemaining(),
    claimed: getLogosClaimed(),
    ...readCountdown(),
  }
}

export function useLiveCounter(): LiveCounter {
  const [state, setState] = useState<LiveCounter>(() => readAll())

  useEffect(() => {
    // Re-fetch immediately on hydration in case the SSR snapshot is stale.
    setState(readAll())
    const id = window.setInterval(() => setState(readAll()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return state
}
