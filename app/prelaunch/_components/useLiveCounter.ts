'use client'

// Shared live-counter hook for the prelaunch site. Both MHero and
// MFinalCTA call this so they share one definition of "live" (1s tick)
// and one source of truth (getLogosRemaining / getDaysUntilLaunch).
// Initial values are computed synchronously at mount so server-render
// and first client paint match — then the tick refreshes them.

import { useEffect, useState } from 'react'
import { getLogosRemaining, getDaysUntilLaunch } from '@/data'

export type LiveCounter = {
  remaining: number
  days: number
}

export function useLiveCounter(): LiveCounter {
  const [state, setState] = useState<LiveCounter>(() => ({
    remaining: getLogosRemaining(),
    days: getDaysUntilLaunch(),
  }))

  useEffect(() => {
    const tick = () => {
      setState({
        remaining: getLogosRemaining(),
        days: getDaysUntilLaunch(),
      })
    }
    // Re-fetch immediately on hydration in case the SSR snapshot is stale.
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return state
}
