'use client'

// MLpCountdownBadge — orange pill at the top of the hero, above the
// eyebrow. Shows a LIVE D:H:M countdown to LAUNCH_DATE (Aug 1, 2026):
//   ● LAUNCHING IN 54D : 14H : 22M
// Values tick every 1s via the shared useLiveCounter hook. The dot
// pulses (heroLiveDot keyframe in page.tsx) for that "active" cue.

import { useLiveCounter } from './useLiveCounter'

const pad = (n: number) => n.toString().padStart(2, '0')

export default function MLpCountdownBadge() {
  const { days, hours, minutes } = useLiveCounter()
  return (
    <span className="hero-urgency" aria-label={`Launching in ${days} days, ${hours} hours, ${minutes} minutes`}>
      <span className="hero-counter-dot" aria-hidden />
      Launching in {pad(days)}d : {pad(hours)}h : {pad(minutes)}m
    </span>
  )
}
