'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  ArrowRight, Keyboard, Sparkle, RocketLaunch,
  MagicWand, PenNib, Pencil, PaintBrush, Palette, TextAa,
  Stamp, Shield, Fingerprint, Certificate, Medal, SelectionBackground, Gift, Star,
} from '@phosphor-icons/react'
import { getDaysUntilLaunch, getLogosRemaining, CATEGORIES, getCategoryImages, getMockupImages, FOOTER_LINKS, NAV_LINKS, FAQ_ITEMS, BLOG_POSTS } from '@/data'

/*
  DESIGN-K: Black & white version of design-e
  - All blue (#2D5BFF) → black (#000)
  - Yellow CTA → white
  - Hero: black bg with layered wavy SVG pattern (like design.com/maker/tag/3d)
  - Same structure as design-e: nav / hero / logo gallery / mockups / how it works / comparison / stats / FAQ / blog / footer
*/

const HERO_LOGOS = [
  '/Images/Logos/restaurant-logo-1.webp',
  '/Images/Logos/coffee-shop-logo-1.webp',
  '/Images/Logos/bakery-logo-1.webp',
  '/Images/Logos/food-truck-logo-1.webp',
  '/Images/Logos/barbershop-logo-1.webp',
  '/Images/Logos/hair-salon-logo-1.webp',
  '/Images/Logos/nail-studio-logo-1.webp',
  '/Images/Logos/boutique-logo-1.webp',
  '/Images/Logos/clothing-brand-logo-1.webp',
  '/Images/Logos/gym-logo-1.webp',
  '/Images/Logos/cleaning-service-logo-1.webp',
  '/Images/Logos/landscaping-company-logo-1.webp',
  '/Images/Logos/pet-grooming-logo-1.webp',
  '/Images/Logos/e-commerce-brand-logo-7.webp',
  '/Images/Logos/content-creator-logo-1.webp',
  '/Images/Logos/tattoo-studio-logo-1.webp',
]

const PROJECTS = [
  { img: '/Images/illustrations/carousel-v2/SELECTED/1a-restaurant-bag.png', title: 'Smashtown Burgers', cat: 'Restaurant branding' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/2b-coffee-bag.png', title: 'Hearth & Grind', cat: 'Coffee shop identity' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/3a-bakery-box.png', title: 'Corner Oven Co.', cat: 'Bakery packaging' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/4a-foodtruck.png', title: 'StreetStack Tacos', cat: 'Food truck wrap' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/5a-barbershop-towel.png', title: 'Steel & Blade', cat: 'Barbershop merch' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/6a-salon-bottle.png', title: 'Rosewood Hair', cat: 'Salon product line' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/7a-nail-cream.png', title: 'Blossom Nails', cat: 'Beauty packaging' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/8a-boutique-bag.png', title: 'Prairie Rose', cat: 'Boutique branding' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/9b-clothing-tshirt.png', title: 'Street Wolf', cat: 'Apparel design' },
  { img: '/Images/illustrations/carousel-v2/SELECTED/10a-gym-duffle.png', title: 'Apex Combat', cat: 'Gym merchandise' },
]

/* Topographic contour map pattern — organic closed curves like elevation lines on a map */
function generateContour(cx: number, cy: number, baseR: number, ring: number, seed: number) {
  const segs = 64
  let d = ''
  const r = baseR + ring * 26
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * 2 * Math.PI
    // Layered noise to get organic, map-like irregularity
    const n1 = Math.sin(a * 2 + seed) * 0.22
    const n2 = Math.cos(a * 3 + ring * 0.4 + seed * 1.3) * 0.14
    const n3 = Math.sin(a * 5 + ring * 0.15 + seed * 2.1) * 0.09
    const n4 = Math.cos(a * 7 + seed * 0.8) * 0.05
    const rr = r * (1 + n1 + n2 + n3 + n4)
    const x = cx + Math.cos(a) * rr
    const y = cy + Math.sin(a) * rr
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' '
  }
  return d + 'Z'
}

// Several "peaks" scattered across the SVG canvas to create a topographic map feel
const TOPO_PEAKS = [
  { cx: 320,  cy: 280, rings: 9,  baseR: 60,  seed: 0.3 },
  { cx: 1180, cy: 440, rings: 8,  baseR: 80,  seed: 1.8 },
  { cx: 1460, cy: 160, rings: 6,  baseR: 50,  seed: 2.6 },
  { cx: 720,  cy: 720, rings: 7,  baseR: 55,  seed: 3.4 },
  { cx: 150,  cy: 680, rings: 5,  baseR: 45,  seed: 4.7 },
  { cx: 900,  cy: 120, rings: 4,  baseR: 38,  seed: 5.9 },
]

const TOPO_PATHS: { d: string; ring: number }[] = []
TOPO_PEAKS.forEach((p) => {
  for (let r = 0; r < p.rings; r++) {
    TOPO_PATHS.push({ d: generateContour(p.cx, p.cy, p.baseR, r, p.seed), ring: r })
  }
})


/* BackgroundDiagonals — crossing translucent diagonal panels (Getty geometric abstract) */
function BackgroundDiagonals() {
  // Large diagonal parallelograms crossing at various angles with low-opacity white fills.
  const panels = [
    // Top panels — softer opacities while still flowing through nav area
    { cx: 25, cy: -5, w: 240, h: 14, angle: -32, opacity: 0.055 },
    { cx: 75, cy: -3, w: 220, h: 12, angle: 38,  opacity: 0.055 },
    { cx: 50, cy: 4,  w: 300, h: 8,  angle: -18, opacity: 0.06 },
    { cx: 15, cy: 8,  w: 180, h: 10, angle: 42,  opacity: 0.05 },
    { cx: 88, cy: 10, w: 200, h: 12, angle: -48, opacity: 0.045 },

    // Mid
    { cx: 30, cy: 28, w: 200, h: 10, angle: -40, opacity: 0.02 },
    { cx: 68, cy: 32, w: 220, h: 12, angle: 42,  opacity: 0.018 },
    { cx: 20, cy: 55, w: 240, h: 16, angle: 48,  opacity: 0.015 },
    { cx: 75, cy: 50, w: 200, h: 12, angle: -42, opacity: 0.02 },
    { cx: 55, cy: 40, w: 300, h: 6,  angle: -20, opacity: 0.025 },

    // Lower
    { cx: 40, cy: 80, w: 220, h: 14, angle: 35,  opacity: 0.018 },
    { cx: 90, cy: 85, w: 180, h: 10, angle: -50, opacity: 0.015 },
    { cx: 10, cy: 90, w: 160, h: 8,  angle: 30,  opacity: 0.022 },
    { cx: 60, cy: 70, w: 280, h: 6,  angle: 25,  opacity: 0.02 },
  ]
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            // Shade of near-black — subtle contrast against the pure-black hero bg
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsBold — same kinetic feel as Diagonals, but thicker + higher opacity */
function BackgroundDiagonalsBold() {
  const panels = [
    { cx: 25, cy: -5, w: 240, h: 22, angle: -32, opacity: 0.12 },
    { cx: 75, cy: -3, w: 220, h: 20, angle: 38,  opacity: 0.12 },
    { cx: 50, cy: 4,  w: 300, h: 14, angle: -18, opacity: 0.13 },
    { cx: 15, cy: 8,  w: 180, h: 16, angle: 42,  opacity: 0.10 },
    { cx: 88, cy: 10, w: 200, h: 18, angle: -48, opacity: 0.10 },
    { cx: 30, cy: 28, w: 200, h: 16, angle: -40, opacity: 0.07 },
    { cx: 68, cy: 32, w: 220, h: 18, angle: 42,  opacity: 0.065 },
    { cx: 20, cy: 55, w: 240, h: 22, angle: 48,  opacity: 0.06 },
    { cx: 75, cy: 50, w: 200, h: 16, angle: -42, opacity: 0.07 },
    { cx: 55, cy: 40, w: 300, h: 12, angle: -20, opacity: 0.075 },
    { cx: 40, cy: 80, w: 220, h: 18, angle: 35,  opacity: 0.08 },
    { cx: 90, cy: 85, w: 180, h: 14, angle: -50, opacity: 0.07 },
    { cx: 10, cy: 90, w: 160, h: 12, angle: 30,  opacity: 0.09 },
    { cx: 60, cy: 70, w: 280, h: 10, angle: 25,  opacity: 0.075 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsDense — more panels, tighter packing for richer texture */
function BackgroundDiagonalsDense() {
  const panels: { cx: number; cy: number; w: number; h: number; angle: number; opacity: number }[] = []
  let seed = 569
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 28; i++) {
    const leftSide = rnd() < 0.5
    panels.push({
      cx: (leftSide ? 15 : 75) + (rnd() - 0.5) * 40,
      cy: -5 + rnd() * 110,
      w: 160 + rnd() * 140,
      h: 6 + rnd() * 10,
      angle: (leftSide ? -40 : 40) + (rnd() - 0.5) * 30,
      opacity: 0.02 + rnd() * 0.05,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsCross — deliberate X cross-hatch at ±30° */
function BackgroundDiagonalsCross() {
  const panels: { cx: number; cy: number; w: number; h: number; angle: number; opacity: number }[] = []
  // Left-slanting (angle +30)
  for (let i = 0; i < 9; i++) {
    const cy = -10 + i * 14
    panels.push({ cx: 50, cy, w: 260, h: 6, angle: 30, opacity: 0.03 + ((i % 3) * 0.01) })
  }
  // Right-slanting (angle -30)
  for (let i = 0; i < 9; i++) {
    const cy = -4 + i * 14
    panels.push({ cx: 50, cy, w: 260, h: 6, angle: -30, opacity: 0.03 + ((i % 3) * 0.01) })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsParallel — all panels at the same angle (unified flow) */
function BackgroundDiagonalsParallel() {
  const panels: { cx: number; cy: number; w: number; h: number; angle: number; opacity: number }[] = []
  const ANGLE = -22
  let seed = 607
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 18; i++) {
    panels.push({
      cx: 10 + (i * 6) % 90 + rnd() * 8,
      cy: -8 + ((i * 17) % 120),
      w: 220 + rnd() * 120,
      h: 5 + rnd() * 8,
      angle: ANGLE + (rnd() - 0.5) * 4,
      opacity: 0.025 + rnd() * 0.04,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsLong — super-long thin diagonal lines spanning full width */
function BackgroundDiagonalsLong() {
  const panels: { cx: number; cy: number; w: number; h: number; angle: number; opacity: number }[] = []
  let seed = 641
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 12; i++) {
    panels.push({
      cx: 50,
      cy: -8 + i * 10,
      w: 400,
      h: 1.2 + rnd() * 1.6,
      angle: (rnd() < 0.5 ? -1 : 1) * (22 + rnd() * 18),
      opacity: 0.045 + rnd() * 0.06,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsSymmetric — mirrored left/right composition, balanced, center breathable */
function BackgroundDiagonalsSymmetric() {
  // Each entry on the left is mirrored on the right (cx → 100-cx, angle → -angle).
  const left = [
    { cx: 18, cy: 6,  w: 220, h: 10, angle: -34, opacity: 0.055 },
    { cx: 8,  cy: 22, w: 180, h: 8,  angle: -42, opacity: 0.035 },
    { cx: 20, cy: 42, w: 200, h: 9,  angle: -28, opacity: 0.028 },
    { cx: 10, cy: 62, w: 180, h: 8,  angle: -38, opacity: 0.028 },
    { cx: 18, cy: 82, w: 220, h: 10, angle: -32, opacity: 0.035 },
    { cx: 8,  cy: 96, w: 180, h: 9,  angle: -40, opacity: 0.045 },
  ]
  const panels = [
    ...left,
    ...left.map((p) => ({ ...p, cx: 100 - p.cx, angle: -p.angle })),
    // Centered accents along top & bottom (mirrored via their own vertical symmetry)
    { cx: 50, cy: 2,  w: 280, h: 6, angle: -18, opacity: 0.045 },
    { cx: 50, cy: 100,w: 280, h: 6, angle: 18,  opacity: 0.045 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsCorners — 4 corner clusters, center fully clear for headline/CTA */
function BackgroundDiagonalsCorners() {
  // Top-left cluster
  const tl = [
    { cx: 8,  cy: 4,  w: 200, h: 10, angle: -32, opacity: 0.055 },
    { cx: 18, cy: 14, w: 160, h: 8,  angle: -40, opacity: 0.035 },
    { cx: 6,  cy: 22, w: 140, h: 7,  angle: -26, opacity: 0.025 },
  ]
  const tr = tl.map((p) => ({ ...p, cx: 100 - p.cx, angle: -p.angle }))
  const bl = tl.map((p) => ({ ...p, cy: 100 - p.cy, angle: -p.angle }))
  const br = tl.map((p) => ({ ...p, cx: 100 - p.cx, cy: 100 - p.cy }))
  const panels = [...tl, ...tr, ...bl, ...br]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsConverge — panels angled to create a visual funnel toward center (CTA direction cue) */
function BackgroundDiagonalsConverge() {
  // Left side panels angle DOWN-RIGHT toward center; right side panels angle DOWN-LEFT toward center.
  const panels = [
    // Top: both sides angle downward toward center
    { cx: 8,  cy: 6,  w: 200, h: 9,  angle: -30, opacity: 0.055 },
    { cx: 92, cy: 6,  w: 200, h: 9,  angle: 30,  opacity: 0.055 },
    { cx: 18, cy: 18, w: 180, h: 8,  angle: -24, opacity: 0.040 },
    { cx: 82, cy: 18, w: 180, h: 8,  angle: 24,  opacity: 0.040 },
    // Mid: subtle guide lines pointing inward
    { cx: 10, cy: 40, w: 200, h: 7,  angle: -18, opacity: 0.028 },
    { cx: 90, cy: 40, w: 200, h: 7,  angle: 18,  opacity: 0.028 },
    // Below center: angles reverse to visually cradle the CTA zone
    { cx: 14, cy: 62, w: 180, h: 8,  angle: 20,  opacity: 0.030 },
    { cx: 86, cy: 62, w: 180, h: 8,  angle: -20, opacity: 0.030 },
    // Bottom: upward-converging toward center
    { cx: 20, cy: 84, w: 200, h: 9,  angle: 28,  opacity: 0.045 },
    { cx: 80, cy: 84, w: 200, h: 9,  angle: -28, opacity: 0.045 },
    { cx: 10, cy: 96, w: 180, h: 8,  angle: 34,  opacity: 0.040 },
    { cx: 90, cy: 96, w: 180, h: 8,  angle: -34, opacity: 0.040 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsRadiant — panels radiating outward from center (emphasizes central copy/CTA) */
function BackgroundDiagonalsRadiant() {
  // Rays placed around a central exclusion zone. Angles approximate direction toward each ray's position.
  const panels = [
    // Top rays (pointing up-left / up-right)
    { cx: 20, cy: 12, w: 220, h: 7, angle: -55, opacity: 0.045 },
    { cx: 50, cy: 6,  w: 240, h: 6, angle: -75, opacity: 0.050 },
    { cx: 80, cy: 12, w: 220, h: 7, angle: 55,  opacity: 0.045 },
    // Side rays (pointing left / right)
    { cx: 5,  cy: 35, w: 200, h: 6, angle: -20, opacity: 0.030 },
    { cx: 95, cy: 35, w: 200, h: 6, angle: 20,  opacity: 0.030 },
    { cx: 3,  cy: 65, w: 200, h: 6, angle: 20,  opacity: 0.030 },
    { cx: 97, cy: 65, w: 200, h: 6, angle: -20, opacity: 0.030 },
    // Bottom rays
    { cx: 20, cy: 88, w: 220, h: 7, angle: 55,  opacity: 0.045 },
    { cx: 50, cy: 94, w: 240, h: 6, angle: 75,  opacity: 0.050 },
    { cx: 80, cy: 88, w: 220, h: 7, angle: -55, opacity: 0.045 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsWings — dense on left + right sides only, center fully clear */
function BackgroundDiagonalsWings() {
  // Left wing cluster
  const leftWing = [
    { cx: 5,  cy: 12, w: 180, h: 9, angle: -38, opacity: 0.050 },
    { cx: 14, cy: 22, w: 220, h: 8, angle: -32, opacity: 0.040 },
    { cx: 4,  cy: 34, w: 180, h: 8, angle: -42, opacity: 0.030 },
    { cx: 16, cy: 48, w: 200, h: 8, angle: -36, opacity: 0.030 },
    { cx: 5,  cy: 62, w: 180, h: 8, angle: -42, opacity: 0.032 },
    { cx: 14, cy: 76, w: 220, h: 8, angle: -32, opacity: 0.040 },
    { cx: 5,  cy: 88, w: 180, h: 9, angle: -38, opacity: 0.050 },
  ]
  // Mirror for right wing
  const rightWing = leftWing.map((p) => ({ ...p, cx: 100 - p.cx, angle: -p.angle }))
  const panels = [...leftWing, ...rightWing]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsWhisper — same panels as Diagonals, opacity dropped to barely-visible */
function BackgroundDiagonalsWhisper() {
  const panels = [
    { cx: 25, cy: -5, w: 240, h: 14, angle: -32, opacity: 0.020 },
    { cx: 75, cy: -3, w: 220, h: 12, angle: 38,  opacity: 0.020 },
    { cx: 50, cy: 4,  w: 300, h: 8,  angle: -18, opacity: 0.022 },
    { cx: 15, cy: 8,  w: 180, h: 10, angle: 42,  opacity: 0.018 },
    { cx: 88, cy: 10, w: 200, h: 12, angle: -48, opacity: 0.016 },
    { cx: 30, cy: 28, w: 200, h: 10, angle: -40, opacity: 0.010 },
    { cx: 68, cy: 32, w: 220, h: 12, angle: 42,  opacity: 0.008 },
    { cx: 20, cy: 55, w: 240, h: 16, angle: 48,  opacity: 0.008 },
    { cx: 75, cy: 50, w: 200, h: 12, angle: -42, opacity: 0.010 },
    { cx: 55, cy: 40, w: 300, h: 6,  angle: -20, opacity: 0.012 },
    { cx: 40, cy: 80, w: 220, h: 14, angle: 35,  opacity: 0.008 },
    { cx: 90, cy: 85, w: 180, h: 10, angle: -50, opacity: 0.007 },
    { cx: 10, cy: 90, w: 160, h: 8,  angle: 30,  opacity: 0.012 },
    { cx: 60, cy: 70, w: 280, h: 6,  angle: 25,  opacity: 0.010 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsFew — only 7 panels, widely spaced, low opacity */
function BackgroundDiagonalsFew() {
  const panels = [
    { cx: 18, cy: 2,  w: 260, h: 10, angle: -32, opacity: 0.030 },
    { cx: 78, cy: 6,  w: 240, h: 9,  angle: 38,  opacity: 0.028 },
    { cx: 40, cy: 38, w: 300, h: 8,  angle: -22, opacity: 0.022 },
    { cx: 85, cy: 48, w: 220, h: 10, angle: 42,  opacity: 0.020 },
    { cx: 15, cy: 66, w: 220, h: 9,  angle: 40,  opacity: 0.022 },
    { cx: 60, cy: 82, w: 260, h: 8,  angle: -28, opacity: 0.025 },
    { cx: 92, cy: 94, w: 200, h: 10, angle: -44, opacity: 0.028 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsThin — original composition but much thinner panels (hairline feel) */
function BackgroundDiagonalsThin() {
  const panels = [
    { cx: 25, cy: -5, w: 240, h: 3,   angle: -32, opacity: 0.060 },
    { cx: 75, cy: -3, w: 220, h: 2.5, angle: 38,  opacity: 0.055 },
    { cx: 50, cy: 4,  w: 300, h: 2,   angle: -18, opacity: 0.060 },
    { cx: 15, cy: 8,  w: 180, h: 2.5, angle: 42,  opacity: 0.050 },
    { cx: 88, cy: 10, w: 200, h: 2.5, angle: -48, opacity: 0.045 },
    { cx: 30, cy: 28, w: 200, h: 2,   angle: -40, opacity: 0.030 },
    { cx: 68, cy: 32, w: 220, h: 2.5, angle: 42,  opacity: 0.028 },
    { cx: 20, cy: 55, w: 240, h: 3,   angle: 48,  opacity: 0.025 },
    { cx: 75, cy: 50, w: 200, h: 2.5, angle: -42, opacity: 0.030 },
    { cx: 55, cy: 40, w: 300, h: 1.8, angle: -20, opacity: 0.035 },
    { cx: 40, cy: 80, w: 220, h: 3,   angle: 35,  opacity: 0.028 },
    { cx: 90, cy: 85, w: 180, h: 2,   angle: -50, opacity: 0.025 },
    { cx: 10, cy: 90, w: 160, h: 2,   angle: 30,  opacity: 0.035 },
    { cx: 60, cy: 70, w: 280, h: 1.8, angle: 25,  opacity: 0.030 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsEdge — panels only near top/bottom edges, center stays clear */
function BackgroundDiagonalsEdge() {
  const panels = [
    // Top band (cy <= 16)
    { cx: 18, cy: -4, w: 240, h: 10, angle: -32, opacity: 0.045 },
    { cx: 55, cy: 2,  w: 280, h: 8,  angle: -18, opacity: 0.050 },
    { cx: 82, cy: -2, w: 220, h: 10, angle: 38,  opacity: 0.045 },
    { cx: 30, cy: 12, w: 200, h: 7,  angle: 42,  opacity: 0.030 },
    { cx: 72, cy: 14, w: 210, h: 7,  angle: -44, opacity: 0.030 },
    // Bottom band (cy >= 84)
    { cx: 22, cy: 86, w: 220, h: 8,  angle: 36,  opacity: 0.030 },
    { cx: 60, cy: 94, w: 280, h: 7,  angle: 22,  opacity: 0.040 },
    { cx: 90, cy: 88, w: 200, h: 10, angle: -48, opacity: 0.035 },
    { cx: 10, cy: 98, w: 240, h: 8,  angle: 30,  opacity: 0.040 },
    { cx: 75, cy: 100,w: 220, h: 9,  angle: -26, opacity: 0.045 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDiagonalsUnified — single angle, widely spaced, very low opacity (calm flow) */
function BackgroundDiagonalsUnified() {
  const ANGLE = -22
  const panels = [
    { cx: 20, cy: 0,  w: 260, h: 6, opacity: 0.030 },
    { cx: 60, cy: 8,  w: 300, h: 5, opacity: 0.028 },
    { cx: 90, cy: 18, w: 220, h: 6, opacity: 0.025 },
    { cx: 25, cy: 32, w: 280, h: 5, opacity: 0.022 },
    { cx: 70, cy: 42, w: 260, h: 5, opacity: 0.020 },
    { cx: 15, cy: 58, w: 240, h: 5, opacity: 0.022 },
    { cx: 58, cy: 68, w: 300, h: 4, opacity: 0.024 },
    { cx: 88, cy: 80, w: 220, h: 5, opacity: 0.028 },
    { cx: 30, cy: 92, w: 260, h: 6, opacity: 0.030 },
    { cx: 72, cy: 102,w: 280, h: 6, opacity: 0.030 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${ANGLE}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundDarkLayers — clean horizontal bands of near-black shades (no wave, pure strata) */
function BackgroundDarkLayers() {
  const bands = [
    { y: 0,   h: 160, fill: 'rgb(14,14,14)' },
    { y: 160, h: 180, fill: 'rgb(20,20,20)' },
    { y: 340, h: 200, fill: 'rgb(26,26,26)' },
    { y: 540, h: 180, fill: 'rgb(32,32,32)' },
    { y: 720, h: 180, fill: 'rgb(22,22,22)' },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 900">
        {bands.map((b, i) => (
          <rect key={i} x={0} y={b.y} width={1600} height={b.h} fill={b.fill} />
        ))}
      </svg>
    </div>
  )
}

/* ── Sync.so-styled backgrounds — ultra-dark, cinematic, minimal ── */

/* BackgroundSyncNoir — near-pure black with the softest central vignette breathing life in */
function BackgroundSyncNoir() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="sync-noir-center" cx="50%" cy="55%" r="45%">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.05)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.015)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sync-noir-center)" />
      </svg>
    </div>
  )
}

/* BackgroundSyncFigure — soft off-center radial glow suggesting a figure silhouette */
function BackgroundSyncFigure() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="sync-figure-body" cx="55%" cy="58%" r="22%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.06)" />
            <stop offset="70%"  stopColor="rgba(255,255,255,0.01)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="sync-figure-halo" cx="55%" cy="50%" r="60%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.025)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sync-figure-halo)" />
        <rect width="1600" height="900" fill="url(#sync-figure-body)" />
      </svg>
    </div>
  )
}

/* BackgroundSyncGrain — dark base with dense subtle grain/noise overlay */
function BackgroundSyncGrain() {
  // Deterministic grain dots to simulate film-noise texture
  const dots: { x: number; y: number; op: number }[] = []
  let seed = 787
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 900; i++) {
    dots.push({
      x: rnd() * 1600,
      y: rnd() * 900,
      op: 0.015 + rnd() * 0.035,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="sync-grain-breath" cx="50%" cy="55%" r="55%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sync-grain-breath)" />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.7} fill={`rgba(255,255,255,${d.op})`} />
        ))}
      </svg>
    </div>
  )
}

/* BackgroundSyncSpotlight — single strong overhead light with dramatic falloff */
function BackgroundSyncSpotlight() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="sync-spot-core" cx="50%" cy="0%" r="65%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
            <stop offset="35%"  stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sync-spot-core)" />
      </svg>
    </div>
  )
}

/* BackgroundSyncDeep — pure black with a single warm glow creeping from one corner */
function BackgroundSyncDeep() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="sync-deep-warm" cx="92%" cy="92%" r="60%">
            <stop offset="0%"   stopColor="rgba(255,230,200,0.04)" />
            <stop offset="45%"  stopColor="rgba(255,230,200,0.012)" />
            <stop offset="100%" stopColor="rgba(255,230,200,0)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#sync-deep-warm)" />
      </svg>
    </div>
  )
}

/* BackgroundFirefox — flat deep-purple matching the Firefox 150 hero outer edge */
function BackgroundFirefox() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ background: '#210340' }}
    />
  )
}

/* BackgroundSyncMesh — sync.so's hero tint: a single flat grayish wash over the black hero */
function BackgroundSyncMesh() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ background: 'rgba(150,150,155,0.12)' }}
    />
  )
}

/* BackgroundLiveGlow — pixel-match to live logo.ai: near-black hero with a warm tomato glow bleeding down from the top-center (behind the CTA) */
function BackgroundLiveGlow() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          {/* Primary warm glow — emanates from top-center (behind the CTA button area) */}
          <radialGradient id="live-glow-main" cx="50%" cy="-5%" r="55%">
            <stop offset="0%"   stopColor="rgba(232,74,37,0.32)" />
            <stop offset="35%"  stopColor="rgba(232,74,37,0.08)" />
            <stop offset="100%" stopColor="rgba(232,74,37,0)" />
          </radialGradient>
          {/* Broader soft ambient to smooth the falloff */}
          <radialGradient id="live-glow-ambient" cx="50%" cy="10%" r="80%">
            <stop offset="0%"   stopColor="rgba(232,74,37,0.06)" />
            <stop offset="60%"  stopColor="rgba(232,74,37,0.015)" />
            <stop offset="100%" stopColor="rgba(232,74,37,0)" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#live-glow-ambient)" />
        <rect width="1600" height="900" fill="url(#live-glow-main)" />
      </svg>
    </div>
  )
}

/* BackgroundDiagonalsAura — symmetric diagonal edge panels + subtle central glow behind CTA */
function BackgroundDiagonalsAura() {
  // Symmetric diagonal accents clustered at 4 corners
  const tl = [
    { cx: 8,  cy: 8,  w: 200, h: 6, angle: -32, opacity: 0.05 },
    { cx: 18, cy: 18, w: 160, h: 5, angle: -38, opacity: 0.035 },
  ]
  const tr = tl.map((p) => ({ ...p, cx: 100 - p.cx, angle: -p.angle }))
  const bl = tl.map((p) => ({ ...p, cy: 100 - p.cy, angle: -p.angle }))
  const br = tl.map((p) => ({ ...p, cx: 100 - p.cx, cy: 100 - p.cy }))
  const panels = [...tl, ...tr, ...bl, ...br]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Subtle central aura behind CTA */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          width: '900px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0) 80%)',
        }}
      />
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundCenteredOrb — large thin-stroke circle outline framing content + 4 corner diagonals */
function BackgroundCenteredOrb() {
  const corners = [
    { cx: 10, cy: 10, w: 160, h: 5, angle: -32, opacity: 0.040 },
    { cx: 90, cy: 10, w: 160, h: 5, angle: 32,  opacity: 0.040 },
    { cx: 10, cy: 90, w: 160, h: 5, angle: 32,  opacity: 0.040 },
    { cx: 90, cy: 90, w: 160, h: 5, angle: -32, opacity: 0.040 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {/* Large framing circle — behind the content, thin stroke */}
        <circle cx={800} cy={450} r={420} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
        <circle cx={800} cy={450} r={540} fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
      </svg>
      {corners.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundFourPointCompass — 4 diagonal beams radiating from the CTA center to the corners */
function BackgroundFourPointCompass() {
  // Thin wedge-like beams anchored at center, fanning to each corner.
  const beams = [
    { x1: 800, y1: 450, x2: 120,  y2: -40,  opacity: 0.05 },
    { x1: 800, y1: 450, x2: 1480, y2: -40,  opacity: 0.05 },
    { x1: 800, y1: 450, x2: 120,  y2: 940,  opacity: 0.045 },
    { x1: 800, y1: 450, x2: 1480, y2: 940,  opacity: 0.045 },
    // Secondary beams (half-angle offsets) for a richer starburst
    { x1: 800, y1: 450, x2: 300,  y2: -40,  opacity: 0.025 },
    { x1: 800, y1: 450, x2: 1300, y2: -40,  opacity: 0.025 },
    { x1: 800, y1: 450, x2: 300,  y2: 940,  opacity: 0.025 },
    { x1: 800, y1: 450, x2: 1300, y2: 940,  opacity: 0.025 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="compass-core" cx="50%" cy="50%" r="24%">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.7)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        {beams.map((b, i) => (
          <line
            key={i}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke={`rgba(255,255,255,${b.opacity})`}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        ))}
        {/* Mask the center so beams fade away behind the CTA copy */}
        <rect width="1600" height="900" fill="url(#compass-core)" />
      </svg>
    </div>
  )
}

/* BackgroundGridDiagonals — ultra-fine dotted grid + sparse corner-anchored diagonal accents */
function BackgroundGridDiagonals() {
  // Fine dotted grid
  const cols = 48
  const rows = 28
  const stepX = 1600 / cols
  const stepY = 900 / rows
  const dots: { x: number; y: number }[] = []
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      dots.push({ x: c * stepX, y: r * stepY })
    }
  }
  const tl = [
    { cx: 8,  cy: 8,  w: 180, h: 5, angle: -32, opacity: 0.045 },
    { cx: 16, cy: 16, w: 140, h: 4, angle: -38, opacity: 0.028 },
  ]
  const tr = tl.map((p) => ({ ...p, cx: 100 - p.cx, angle: -p.angle }))
  const bl = tl.map((p) => ({ ...p, cy: 100 - p.cy, angle: -p.angle }))
  const br = tl.map((p) => ({ ...p, cx: 100 - p.cx, cy: 100 - p.cy }))
  const panels = [...tl, ...tr, ...bl, ...br]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={0.8} fill="rgba(255,255,255,0.07)" />
        ))}
      </svg>
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: `${p.h}%`,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundTaperedLines — horizontal lines tapering in width toward center (vertical funnel to CTA) */
function BackgroundTaperedLines() {
  // Top block: widths increase as we move up (away from center); mirrored for bottom.
  const top = [
    { cy: 2,  w: 340, opacity: 0.055 },
    { cy: 8,  w: 280, opacity: 0.045 },
    { cy: 14, w: 220, opacity: 0.035 },
    { cy: 20, w: 160, opacity: 0.028 },
    { cy: 26, w: 100, opacity: 0.020 },
  ]
  const bottom = top.map((p) => ({ ...p, cy: 100 - p.cy }))
  const panels = [...top, ...bottom]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: '50%',
            top: `${p.cy}%`,
            width: `${p.w}%`,
            height: '3px',
            transform: 'translate(-50%, -50%)',
            background: `rgba(255,255,255,${p.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundFadeDown — hero bg seamlessly melts into the page bg at the bottom (Canva-style transition) */
function BackgroundFadeDown() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, var(--page-bg) 100%)',
        }}
      />
    </div>
  )
}

/* BackgroundSoftFlow — large soft gradient bands flowing diagonally (Diagonals + Filled Big hybrid) */
function BackgroundSoftFlow() {
  const bands = [
    { cx: 20,  cy: -10, w: 360, h: 110, angle: -22, opacity: 0.045 },
    { cx: 75,  cy: 10,  w: 340, h: 100, angle: -22, opacity: 0.038 },
    { cx: 15,  cy: 45,  w: 380, h: 120, angle: -22, opacity: 0.030 },
    { cx: 70,  cy: 60,  w: 360, h: 110, angle: -22, opacity: 0.032 },
    { cx: 25,  cy: 95,  w: 340, h: 100, angle: -22, opacity: 0.040 },
    { cx: 80,  cy: 108, w: 360, h: 110, angle: -22, opacity: 0.045 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {bands.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${b.cx}%`,
            top: `${b.cy}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
            transform: `translate(-50%, -50%) rotate(${b.angle}deg)`,
            background: `radial-gradient(ellipse at center, rgba(255,255,255,${b.opacity}) 0%, rgba(255,255,255,${b.opacity * 0.4}) 50%, rgba(255,255,255,0) 100%)`,
            filter: 'blur(8px)',
          }}
        />
      ))}
    </div>
  )
}

/* BackgroundHalftoneFade — dot density gradient, densest at edges, sparse in center (frames copy) */
function BackgroundHalftoneFade() {
  const stepX = 24
  const stepY = 22
  const dots: { x: number; y: number; op: number }[] = []
  const cx = 800
  const cy = 450
  const maxDist = Math.hypot(cx, cy)
  for (let y = -stepY; y <= 900 + stepY; y += stepY) {
    for (let x = -stepX; x <= 1600 + stepX; x += stepX) {
      const d = Math.hypot(x - cx, y - cy) / maxDist
      // Sparse center, dense edges — quadratic falloff
      const op = Math.min(0.22, Math.max(0.01, d * d * 0.3))
      dots.push({ x, y, op })
    }
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.2} fill={`rgba(255,255,255,${d.op})`} />
        ))}
      </svg>
    </div>
  )
}

/* BackgroundGrid — ultra-minimal dotted grid (Linear/Vercel editorial) */
function BackgroundGrid() {
  const cols = 40
  const rows = 24
  const stepX = 1600 / cols
  const stepY = 900 / rows
  const dots: { x: number; y: number; op: number }[] = []
  for (let r = -1; r <= rows + 1; r++) {
    for (let c = -1; c <= cols + 1; c++) {
      // Slight random opacity variance so the grid isn't mechanical
      const op = 0.08 + ((r * 7 + c * 3) % 5) * 0.01
      dots.push({ x: c * stepX, y: r * stepY, op })
    }
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.2} fill={`rgba(255,255,255,${d.op})`} />
        ))}
      </svg>
    </div>
  )
}

/* BackgroundHairlines — thin horizontal hairlines, editorial */
function BackgroundHairlines() {
  // Evenly spaced thin horizontal lines, with slight opacity variance.
  const lines: { y: number; op: number }[] = []
  const step = 28 // px in viewBox
  for (let y = -step; y < 900 + step; y += step) {
    const op = 0.05 + (Math.abs(Math.sin(y * 0.013)) * 0.04)
    lines.push({ y, op })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 900">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={0}
            x2={1600}
            y1={l.y}
            y2={l.y}
            stroke={`rgba(255,255,255,${l.op})`}
            strokeWidth={1}
          />
        ))}
      </svg>
    </div>
  )
}

/* BackgroundTopo — organic topographic contour map (uses existing TOPO_PATHS) */
function BackgroundTopo() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <g fill="none" stroke="white">
          {TOPO_PATHS.map((p, i) => (
            <path
              key={i}
              d={p.d}
              strokeWidth={p.ring === 0 ? 1.4 : 0.9}
              opacity={0.12 - p.ring * 0.01}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

/* BackgroundGlow — 3 soft radial white glows (Stripe/Framer minimal) */
function BackgroundGlow() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          <radialGradient id="glow-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="white" stopOpacity="0.18" />
            <stop offset="60%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="white" stopOpacity="0.14" />
            <stop offset="60%" stopColor="white" stopOpacity="0.03" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Top-left, bleeds above nav */}
        <circle cx={200}  cy={-60}  r={520} fill="url(#glow-a)" />
        {/* Mid-right */}
        <circle cx={1450} cy={420}  r={560} fill="url(#glow-b)" />
        {/* Bottom-center, bleeds below */}
        <circle cx={720}  cy={1000} r={600} fill="url(#glow-a)" />
      </svg>
    </div>
  )
}

/* BackgroundStarfield — sparse scattered dots (sophisticated, constellation-like) */
function BackgroundStarfield() {
  // Deterministic but irregular scatter of small stars + a few larger highlights.
  const stars: { x: number; y: number; r: number; op: number }[] = []
  let seed = 11
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < 140; i++) {
    const x = rnd() * 1600
    const y = rnd() * 960 - 30 // bleed top/bottom
    const isBig = rnd() < 0.08
    stars.push({
      x,
      y,
      r: isBig ? 1.6 + rnd() * 0.8 : 0.5 + rnd() * 0.9,
      op: isBig ? 0.35 + rnd() * 0.25 : 0.08 + rnd() * 0.14,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`rgba(255,255,255,${s.op})`} />
        ))}
      </svg>
    </div>
  )
}

/* BackgroundBlueprint — technical blueprint grid with crosshair/plus marks (precision, craft) */
function BackgroundBlueprint() {
  const step = 80
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  // Vertical lines
  for (let x = -step; x <= 1600 + step; x += step) lines.push({ x1: x, y1: -40, x2: x, y2: 940 })
  // Horizontal lines
  for (let y = -step; y <= 900 + step; y += step) lines.push({ x1: -40, y1: y, x2: 1640, y2: y })
  // Crosshair plus marks at every intersection
  const crosses: { x: number; y: number }[] = []
  for (let y = 0; y <= 900; y += step) {
    for (let x = 0; x <= 1600; x += step) crosses.push({ x, y })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {lines.map((l, i) => (
          <line key={`l-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(255,255,255,0.04)" strokeWidth={0.8} />
        ))}
        {crosses.map((c, i) => (
          <g key={`c-${i}`} stroke="rgba(255,255,255,0.14)" strokeWidth={0.9}>
            <line x1={c.x - 4} y1={c.y} x2={c.x + 4} y2={c.y} />
            <line x1={c.x} y1={c.y - 4} x2={c.x} y2={c.y + 4} />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* BackgroundMonogramMist — scattered faint "L" glyphs at various sizes/rotations (on-brand) */
function BackgroundMonogramMist() {
  // Deterministic scatter so SSR matches client.
  const glyphs: { x: number; y: number; size: number; rot: number; op: number }[] = []
  let seed = 17
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 30; i++) {
    glyphs.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 28 + rnd() * 70,
      rot: (rnd() - 0.5) * 40,
      op: 0.03 + rnd() * 0.06,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            transform: `translate(-50%, -50%) rotate(${g.rot}deg)`,
            fontFamily: "'DM Serif Display', serif",
            fontSize: `${g.size}px`,
            lineHeight: 1,
            color: `rgba(255,255,255,${g.op})`,
          }}
        >
          L
        </span>
      ))}
    </div>
  )
}

/* BackgroundMarksScatter — tiny abstract logo-like marks scattered (mini logo gallery) */
function BackgroundMarksScatter() {
  type Mark = { x: number; y: number; size: number; rot: number; op: number; kind: 'circle' | 'square' | 'triangle' | 'cross' | 'dot' | 'ring' }
  const marks: Mark[] = []
  let seed = 29
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: Mark['kind'][] = ['circle', 'square', 'triangle', 'cross', 'dot', 'ring']
  for (let i = 0; i < 45; i++) {
    marks.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 10 + rnd() * 22,
      rot: (rnd() - 0.5) * 60,
      op: 0.08 + rnd() * 0.12,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  const renderMark = (m: Mark, i: number) => {
    const s = m.size
    const half = s / 2
    const stroke = `rgba(255,255,255,${m.op})`
    const common = {
      style: {
        left: `${m.x}%`,
        top: `${m.y}%`,
        width: `${s}px`,
        height: `${s}px`,
        transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
      },
    }
    return (
      <div key={i} className="absolute" style={common.style}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          {m.kind === 'circle' && <circle cx={half} cy={half} r={half - 1.5} fill="none" stroke={stroke} strokeWidth={1.2} />}
          {m.kind === 'square' && <rect x={2} y={2} width={s - 4} height={s - 4} rx={2} fill="none" stroke={stroke} strokeWidth={1.2} />}
          {m.kind === 'triangle' && <polygon points={`${half},2 ${s - 2},${s - 2} 2,${s - 2}`} fill="none" stroke={stroke} strokeWidth={1.2} />}
          {m.kind === 'cross' && <path d={`M${half} 3 V${s - 3} M3 ${half} H${s - 3}`} stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />}
          {m.kind === 'dot' && <circle cx={half} cy={half} r={half * 0.55} fill={stroke} />}
          {m.kind === 'ring' && <>
            <circle cx={half} cy={half} r={half - 2} fill="none" stroke={stroke} strokeWidth={1.2} />
            <circle cx={half} cy={half} r={half * 0.35} fill={stroke} />
          </>}
        </svg>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {marks.map((m, i) => renderMark(m, i))}
    </div>
  )
}

/* BackgroundMonogramsScatter — scattered individual serif letterforms (typography gallery) */
function BackgroundMonogramsScatter() {
  const letters = ['A', 'B', 'L', 'M', 'R', 'S', 'T', 'K', 'N', 'O', 'V', '&']
  const glyphs: { x: number; y: number; size: number; rot: number; op: number; ch: string }[] = []
  let seed = 41
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 28; i++) {
    glyphs.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 28 + rnd() * 60,
      rot: (rnd() - 0.5) * 30,
      op: 0.05 + rnd() * 0.09,
      ch: letters[Math.floor(rnd() * letters.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            transform: `translate(-50%, -50%) rotate(${g.rot}deg)`,
            fontFamily: "'DM Serif Display', serif",
            fontSize: `${g.size}px`,
            lineHeight: 1,
            color: `rgba(255,255,255,${g.op})`,
          }}
        >
          {g.ch}
        </span>
      ))}
    </div>
  )
}

/* BackgroundOutlinesScatter — same concept as Marks Scatter but ALL stroke-only (refined/editorial) */
function BackgroundOutlinesScatter() {
  type Mark = { x: number; y: number; size: number; rot: number; op: number; kind: 'circle' | 'square' | 'triangle' | 'hex' | 'diamond' | 'roundedSq' }
  const marks: Mark[] = []
  let seed = 53
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: Mark['kind'][] = ['circle', 'square', 'triangle', 'hex', 'diamond', 'roundedSq']
  for (let i = 0; i < 42; i++) {
    marks.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 14 + rnd() * 26,
      rot: (rnd() - 0.5) * 50,
      op: 0.10 + rnd() * 0.12,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  const render = (m: Mark, i: number) => {
    const s = m.size
    const half = s / 2
    const stroke = `rgba(255,255,255,${m.op})`
    const style = {
      left: `${m.x}%`,
      top: `${m.y}%`,
      width: `${s}px`,
      height: `${s}px`,
      transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
    }
    return (
      <div key={i} className="absolute" style={style}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          {m.kind === 'circle'    && <circle cx={half} cy={half} r={half - 1.5} fill="none" stroke={stroke} strokeWidth={1.2} />}
          {m.kind === 'square'    && <rect x={2} y={2} width={s - 4} height={s - 4} fill="none" stroke={stroke} strokeWidth={1.2} />}
          {m.kind === 'roundedSq' && <rect x={2} y={2} width={s - 4} height={s - 4} rx={s * 0.22} fill="none" stroke={stroke} strokeWidth={1.2} />}
          {m.kind === 'triangle'  && <polygon points={`${half},2 ${s - 2},${s - 2} 2,${s - 2}`} fill="none" stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" />}
          {m.kind === 'diamond'   && <polygon points={`${half},2 ${s - 2},${half} ${half},${s - 2} 2,${half}`} fill="none" stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" />}
          {m.kind === 'hex'       && <polygon points={`${half},2 ${s - 2},${s * 0.3} ${s - 2},${s * 0.7} ${half},${s - 2} 2,${s * 0.7} 2,${s * 0.3}`} fill="none" stroke={stroke} strokeWidth={1.2} strokeLinejoin="round" />}
        </svg>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {marks.map((m, i) => render(m, i))}
    </div>
  )
}

/* ── Big outline scatter helper: renders a stroke-only shape ── */
type BigOutlineKind = 'circle' | 'square' | 'roundedSq' | 'triangle' | 'diamond' | 'hex'
function bigOutlineShape(kind: BigOutlineKind, s: number, stroke: string, sw: number) {
  const half = s / 2
  switch (kind) {
    case 'circle':
      return <circle cx={half} cy={half} r={half - sw} fill="none" stroke={stroke} strokeWidth={sw} />
    case 'square':
      return <rect x={sw} y={sw} width={s - sw * 2} height={s - sw * 2} fill="none" stroke={stroke} strokeWidth={sw} />
    case 'roundedSq':
      return <rect x={sw} y={sw} width={s - sw * 2} height={s - sw * 2} rx={s * 0.18} fill="none" stroke={stroke} strokeWidth={sw} />
    case 'triangle':
      return <polygon points={`${half},${sw} ${s - sw},${s - sw} ${sw},${s - sw}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    case 'diamond':
      return <polygon points={`${half},${sw} ${s - sw},${half} ${half},${s - sw} ${sw},${half}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
    case 'hex':
      return <polygon points={`${half},${sw} ${s - sw},${s * 0.3} ${s - sw},${s * 0.7} ${half},${s - sw} ${sw},${s * 0.7} ${sw},${s * 0.3}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
  }
}

/* BackgroundBigOutlines — fewer, bigger mixed outlined shapes (50-100px) */
function BackgroundBigOutlines() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 113
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 16; i++) {
    items.push({
      x: rnd() * 115 - 7,
      y: rnd() * 120 - 10,
      size: 60 + rnd() * 60,
      rot: (rnd() - 0.5) * 40,
      op: 0.08 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.4)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeOutlines — very large, sparse outlined shapes (120-220px) */
function BackgroundHugeOutlines() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 149
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 8; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 140 + rnd() * 120,
      rot: (rnd() - 0.5) * 35,
      op: 0.06 + rnd() * 0.06,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* Shared shape data for Huge Outlines + higher-opacity variants */
const HUGE_OUTLINE_SHAPES: { x: number; y: number; size: number; rot: number; kind: BigOutlineKind }[] = (() => {
  let seed = 149
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  const out: { x: number; y: number; size: number; rot: number; kind: BigOutlineKind }[] = []
  for (let i = 0; i < 8; i++) {
    out.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 140 + rnd() * 120,
      rot: (rnd() - 0.5) * 35,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return out
})()

function renderHugeOutlines(opFn: (i: number) => number, sw: number) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {HUGE_OUTLINE_SHAPES.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${opFn(i)})`, sw)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOver — 22 huge outlined shapes scattered across the full hero */
function BackgroundHugeAllOver() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 233
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 22; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 140 + rnd() * 120,
      rot: (rnd() - 0.5) * 40,
      op: 0.12 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverBalanced — deliberate composition (3 large anchors + medium fillers) */
function BackgroundHugeAllOverBalanced() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = [
    // 3 large anchor shapes — triangulated
    { x: 18,  y: 28,  size: 260, rot: -8,  op: 0.14, kind: 'circle' },
    { x: 82,  y: 22,  size: 240, rot: 12,  op: 0.14, kind: 'roundedSq' },
    { x: 50,  y: 82,  size: 280, rot: -5,  op: 0.13, kind: 'hex' },
    // Medium fillers — corners + edges
    { x: 8,   y: -4,  size: 160, rot: 15,  op: 0.16, kind: 'diamond' },
    { x: 95,  y: 70,  size: 170, rot: -18, op: 0.15, kind: 'triangle' },
    { x: 30,  y: 58,  size: 150, rot: 20,  op: 0.12, kind: 'square' },
    { x: 70,  y: 52,  size: 160, rot: -10, op: 0.14, kind: 'circle' },
    { x: 5,   y: 90,  size: 180, rot: 8,   op: 0.15, kind: 'hex' },
    { x: 92,  y: 100, size: 170, rot: -14, op: 0.14, kind: 'roundedSq' },
    { x: 45,  y: -6,  size: 150, rot: -22, op: 0.15, kind: 'triangle' },
    { x: 65,  y: 8,   size: 140, rot: 18,  op: 0.13, kind: 'diamond' },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverMixed — mix of outlined + subtly filled shapes (tonal variety) */
function BackgroundHugeAllOverMixed() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind; filled: boolean }
  const items: M[] = []
  let seed = 257
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 22; i++) {
    const filled = rnd() < 0.35
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 140 + rnd() * 120,
      rot: (rnd() - 0.5) * 40,
      op: filled ? 0.035 + rnd() * 0.025 : 0.14 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
      filled,
    })
  }
  const filledShape = (kind: BigOutlineKind, s: number, fill: string) => {
    const half = s / 2
    switch (kind) {
      case 'circle':    return <circle cx={half} cy={half} r={half - 1} fill={fill} />
      case 'square':    return <rect x={1} y={1} width={s - 2} height={s - 2} fill={fill} />
      case 'roundedSq': return <rect x={1} y={1} width={s - 2} height={s - 2} rx={s * 0.18} fill={fill} />
      case 'triangle':  return <polygon points={`${half},1 ${s - 1},${s - 1} 1,${s - 1}`} fill={fill} />
      case 'diamond':   return <polygon points={`${half},1 ${s - 1},${half} ${half},${s - 1} 1,${half}`} fill={fill} />
      case 'hex':       return <polygon points={`${half},1 ${s - 1},${s * 0.3} ${s - 1},${s * 0.7} ${half},${s - 1} 1,${s * 0.7} 1,${s * 0.3}`} fill={fill} />
    }
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {m.filled
              ? filledShape(m.kind, m.size, `rgba(255,255,255,${m.op})`)
              : bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverFilled — all shapes subtly filled (translucent/frosted) scattered everywhere */
function BackgroundHugeAllOverFilled() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 367
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 24; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 140 + rnd() * 130,
      rot: (rnd() - 0.5) * 40,
      op: 0.04 + rnd() * 0.045,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  const filledShape = (kind: BigOutlineKind, s: number, fill: string) => {
    const half = s / 2
    switch (kind) {
      case 'circle':    return <circle cx={half} cy={half} r={half - 1} fill={fill} />
      case 'square':    return <rect x={1} y={1} width={s - 2} height={s - 2} fill={fill} />
      case 'roundedSq': return <rect x={1} y={1} width={s - 2} height={s - 2} rx={s * 0.18} fill={fill} />
      case 'triangle':  return <polygon points={`${half},1 ${s - 1},${s - 1} 1,${s - 1}`} fill={fill} />
      case 'diamond':   return <polygon points={`${half},1 ${s - 1},${half} ${half},${s - 1} 1,${half}`} fill={fill} />
      case 'hex':       return <polygon points={`${half},1 ${s - 1},${s * 0.3} ${s - 1},${s * 0.7} ${half},${s - 1} 1,${s * 0.7} 1,${s * 0.3}`} fill={fill} />
    }
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {filledShape(m.kind, m.size, `rgba(255,255,255,${m.op})`)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* ── Shared helpers for All-Over Filled variants ── */
const filledShapeRender = (kind: BigOutlineKind, s: number, fill: string) => {
  const half = s / 2
  switch (kind) {
    case 'circle':    return <circle cx={half} cy={half} r={half - 1} fill={fill} />
    case 'square':    return <rect x={1} y={1} width={s - 2} height={s - 2} fill={fill} />
    case 'roundedSq': return <rect x={1} y={1} width={s - 2} height={s - 2} rx={s * 0.18} fill={fill} />
    case 'triangle':  return <polygon points={`${half},1 ${s - 1},${s - 1} 1,${s - 1}`} fill={fill} />
    case 'diamond':   return <polygon points={`${half},1 ${s - 1},${half} ${half},${s - 1} 1,${half}`} fill={fill} />
    case 'hex':       return <polygon points={`${half},1 ${s - 1},${s * 0.3} ${s - 1},${s * 0.7} ${half},${s - 1} 1,${s * 0.7} 1,${s * 0.3}`} fill={fill} />
  }
}

function renderFilledScatter(items: { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }[]) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {filledShapeRender(m.kind, m.size, `rgba(255,255,255,${m.op})`)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverFilledDense — 40 smaller translucent shapes, denser coverage */
function BackgroundHugeAllOverFilledDense() {
  const items: { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }[] = []
  let seed = 401
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 40; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 90 + rnd() * 120,
      rot: (rnd() - 0.5) * 40,
      op: 0.025 + rnd() * 0.03,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return renderFilledScatter(items)
}

/* BackgroundHugeAllOverFilledBold — 14 shapes, higher opacity for more presence */
function BackgroundHugeAllOverFilledBold() {
  const items: { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }[] = []
  let seed = 431
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 14; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 150 + rnd() * 140,
      rot: (rnd() - 0.5) * 35,
      op: 0.09 + rnd() * 0.06,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return renderFilledScatter(items)
}

/* BackgroundHugeAllOverFilledBig — monumental shapes (200-360px) */
function BackgroundHugeAllOverFilledBig() {
  const items: { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }[] = []
  let seed = 463
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 16; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 220 + rnd() * 160,
      rot: (rnd() - 0.5) * 25,
      op: 0.04 + rnd() * 0.035,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return renderFilledScatter(items)
}

/* BackgroundHugeAllOverFilledStratified — 2 layers: big background + medium foreground for depth */
function BackgroundHugeAllOverFilledStratified() {
  const items: { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }[] = []
  let seed = 499
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  // Background — huge, dim
  for (let i = 0; i < 8; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 260 + rnd() * 140,
      rot: (rnd() - 0.5) * 25,
      op: 0.03 + rnd() * 0.02,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  // Foreground — medium, brighter
  for (let i = 0; i < 18; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 120 + rnd() * 90,
      rot: (rnd() - 0.5) * 45,
      op: 0.07 + rnd() * 0.05,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return renderFilledScatter(items)
}

/* BackgroundHugeAllOverFilledGradient — shapes filled with radial gradients (dimensional) */
function BackgroundHugeAllOverFilledGradient() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind; gradId: string }
  const items: M[] = []
  let seed = 541
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 20; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 160 + rnd() * 140,
      rot: (rnd() - 0.5) * 35,
      op: 0.12 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
      gradId: `huge-grad-${i}`,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            <defs>
              <radialGradient id={m.gradId} cx="35%" cy="35%" r="65%">
                <stop offset="0%"  stopColor="white" stopOpacity={m.op} />
                <stop offset="70%" stopColor="white" stopOpacity={m.op * 0.3} />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            {filledShapeRender(m.kind, m.size, `url(#${m.gradId})`)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverDuotone — 2-tier opacity layers for compositional depth */
function BackgroundHugeAllOverDuotone() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 283
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  // Back layer — dimmer, larger
  for (let i = 0; i < 10; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 180 + rnd() * 100,
      rot: (rnd() - 0.5) * 30,
      op: 0.07 + rnd() * 0.03,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  // Front layer — brighter, slightly smaller
  for (let i = 0; i < 12; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 130 + rnd() * 80,
      rot: (rnd() - 0.5) * 40,
      op: 0.22 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverDashed — outlined shapes with dashed strokes (editorial) */
function BackgroundHugeAllOverDashed() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind; dashed: boolean }
  const items: M[] = []
  let seed = 311
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 22; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 140 + rnd() * 120,
      rot: (rnd() - 0.5) * 40,
      op: 0.16 + rnd() * 0.1,
      kind: kinds[Math.floor(rnd() * kinds.length)],
      dashed: rnd() < 0.55,
    })
  }
  const shapeWithDash = (kind: BigOutlineKind, s: number, stroke: string, sw: number, dashed: boolean) => {
    const half = s / 2
    const dash = dashed ? { strokeDasharray: '8 8' } : {}
    switch (kind) {
      case 'circle':    return <circle cx={half} cy={half} r={half - sw} fill="none" stroke={stroke} strokeWidth={sw} {...dash} />
      case 'square':    return <rect x={sw} y={sw} width={s - sw * 2} height={s - sw * 2} fill="none" stroke={stroke} strokeWidth={sw} {...dash} />
      case 'roundedSq': return <rect x={sw} y={sw} width={s - sw * 2} height={s - sw * 2} rx={s * 0.18} fill="none" stroke={stroke} strokeWidth={sw} {...dash} />
      case 'triangle':  return <polygon points={`${half},${sw} ${s - sw},${s - sw} ${sw},${s - sw}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" {...dash} />
      case 'diamond':   return <polygon points={`${half},${sw} ${s - sw},${half} ${half},${s - sw} ${sw},${half}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" {...dash} />
      case 'hex':       return <polygon points={`${half},${sw} ${s - sw},${s * 0.3} ${s - sw},${s * 0.7} ${half},${s - sw} ${sw},${s * 0.7} ${sw},${s * 0.3}`} fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" {...dash} />
    }
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {shapeWithDash(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6, m.dashed)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundHugeAllOverConcentric — each shape has a nested inner ring (richness) */
function BackgroundHugeAllOverConcentric() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 337
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  for (let i = 0; i < 18; i++) {
    items.push({
      x: rnd() * 120 - 10,
      y: rnd() * 125 - 12,
      size: 150 + rnd() * 110,
      rot: (rnd() - 0.5) * 35,
      op: 0.14 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => {
        const innerSize = m.size * 0.6
        const offset = (m.size - innerSize) / 2
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
            }}
          >
            <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
              {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
              <g transform={`translate(${offset} ${offset})`}>
                <svg width={innerSize} height={innerSize} viewBox={`0 0 ${innerSize} ${innerSize}`}>
                  {bigOutlineShape(m.kind, innerSize, `rgba(255,255,255,${m.op * 0.65})`, 1.3)}
                </svg>
              </g>
            </svg>
          </div>
        )
      })}
    </div>
  )
}

function BackgroundHugeBold()    { return renderHugeOutlines(() => 0.20, 1.6) }
function BackgroundHugeVivid()   { return renderHugeOutlines(() => 0.32, 1.6) }
function BackgroundHugeThick()   { return renderHugeOutlines(() => 0.22, 2.6) }
function BackgroundHugeMax()     { return renderHugeOutlines(() => 0.45, 1.8) }
function BackgroundHugeLayered() { return renderHugeOutlines((i) => (i % 2 === 0 ? 0.38 : 0.14), 1.6) }

/* BackgroundMixedScaleOutlines — mix of big + medium outlined shapes for hierarchy */
function BackgroundMixedScaleOutlines() {
  type M = { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }
  const items: M[] = []
  let seed = 181
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: BigOutlineKind[] = ['circle', 'square', 'roundedSq', 'triangle', 'diamond', 'hex']
  // 6 large hero shapes
  for (let i = 0; i < 6; i++) {
    items.push({
      x: rnd() * 115 - 7,
      y: rnd() * 120 - 10,
      size: 130 + rnd() * 90,
      rot: (rnd() - 0.5) * 30,
      op: 0.07 + rnd() * 0.05,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  // 20 medium shapes filling around them
  for (let i = 0; i < 20; i++) {
    items.push({
      x: rnd() * 115 - 7,
      y: rnd() * 120 - 10,
      size: 32 + rnd() * 40,
      rot: (rnd() - 0.5) * 50,
      op: 0.10 + rnd() * 0.08,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, m.size > 100 ? 1.6 : 1.2)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundBigCircles — big outlined circles only at various sizes (clean, focused) */
function BackgroundBigCircles() {
  const circles: { x: number; y: number; r: number; op: number; sw: number }[] = []
  let seed = 211
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 12; i++) {
    circles.push({
      x: rnd() * 115 - 7,
      y: rnd() * 125 - 12,
      r: 45 + rnd() * 90,
      op: 0.07 + rnd() * 0.08,
      sw: rnd() < 0.3 ? 2.2 : 1.4,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={(c.x / 100) * 1600}
            cy={(c.y / 100) * 900}
            r={c.r}
            fill="none"
            stroke={`rgba(255,255,255,${c.op})`}
            strokeWidth={c.sw}
          />
        ))}
      </svg>
    </div>
  )
}

/* BackgroundEdgeFrameOutlines — big outlined shapes anchored at corners/edges, bleeding off */
function BackgroundEdgeFrameOutlines() {
  // Manually placed at the frame edges so composition feels intentional, not random.
  const items: { x: number; y: number; size: number; rot: number; op: number; kind: BigOutlineKind }[] = [
    // Top edge — bleed above nav
    { x: 8,   y: -6,  size: 180, rot: 12,  op: 0.08, kind: 'circle' },
    { x: 45,  y: -10, size: 220, rot: -15, op: 0.07, kind: 'roundedSq' },
    { x: 88,  y: -4,  size: 160, rot: 20,  op: 0.09, kind: 'hex' },
    // Left edge
    { x: -4,  y: 42,  size: 200, rot: 8,   op: 0.07, kind: 'diamond' },
    // Right edge
    { x: 103, y: 58,  size: 210, rot: -18, op: 0.08, kind: 'triangle' },
    // Bottom edge — bleed past
    { x: 22,  y: 104, size: 200, rot: -10, op: 0.08, kind: 'circle' },
    { x: 62,  y: 108, size: 230, rot: 14,  op: 0.07, kind: 'roundedSq' },
    { x: 94,  y: 100, size: 170, rot: -22, op: 0.09, kind: 'hex' },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
          }}
        >
          <svg width={m.size} height={m.size} viewBox={`0 0 ${m.size} ${m.size}`}>
            {bigOutlineShape(m.kind, m.size, `rgba(255,255,255,${m.op})`, 1.6)}
          </svg>
        </div>
      ))}
    </div>
  )
}

/* BackgroundSparkleScatter — mix of 4-point stars, asterisks, and 5-point stars scattered (AI magic) */
function BackgroundSparkleScatter() {
  type S = { x: number; y: number; size: number; rot: number; op: number; kind: 'fourStar' | 'asterisk' | 'fiveStar' | 'dot' }
  const sparks: S[] = []
  let seed = 67
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: S['kind'][] = ['fourStar', 'asterisk', 'fiveStar', 'dot']
  for (let i = 0; i < 50; i++) {
    sparks.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 8 + rnd() * 22,
      rot: (rnd() - 0.5) * 50,
      op: 0.09 + rnd() * 0.14,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  const render = (s: S, i: number) => {
    const sz = s.size
    const half = sz / 2
    const fill = `rgba(255,255,255,${s.op})`
    const style = {
      left: `${s.x}%`,
      top: `${s.y}%`,
      width: `${sz}px`,
      height: `${sz}px`,
      transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
    }
    return (
      <div key={i} className="absolute" style={style}>
        <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`}>
          {s.kind === 'fourStar' && (
            <path d={`M${half} 0 L${half + sz * 0.18} ${half - sz * 0.18} L${sz} ${half} L${half + sz * 0.18} ${half + sz * 0.18} L${half} ${sz} L${half - sz * 0.18} ${half + sz * 0.18} L0 ${half} L${half - sz * 0.18} ${half - sz * 0.18} Z`} fill={fill} />
          )}
          {s.kind === 'asterisk' && (
            <g stroke={fill} strokeWidth={1.4} strokeLinecap="round">
              <line x1={half} y1={2} x2={half} y2={sz - 2} />
              <line x1={2} y1={half} x2={sz - 2} y2={half} />
              <line x1={sz * 0.2} y1={sz * 0.2} x2={sz * 0.8} y2={sz * 0.8} />
              <line x1={sz * 0.2} y1={sz * 0.8} x2={sz * 0.8} y2={sz * 0.2} />
            </g>
          )}
          {s.kind === 'fiveStar' && (
            <polygon
              points={(() => {
                let pts = ''
                for (let k = 0; k < 10; k++) {
                  const a = (Math.PI / 5) * k - Math.PI / 2
                  const r = k % 2 === 0 ? half - 1 : half * 0.42
                  pts += `${half + Math.cos(a) * r},${half + Math.sin(a) * r} `
                }
                return pts.trim()
              })()}
              fill={fill}
            />
          )}
          {s.kind === 'dot' && <circle cx={half} cy={half} r={half * 0.55} fill={fill} />}
        </svg>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {sparks.map((s, i) => render(s, i))}
    </div>
  )
}

/* BackgroundMiniPills — scattered mini pill+dot L marks (brand motif at small scale) */
function BackgroundMiniPills() {
  const pills: { x: number; y: number; size: number; rot: number; op: number }[] = []
  let seed = 79
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 24; i++) {
    pills.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 18 + rnd() * 26,
      rot: (rnd() - 0.5) * 35,
      op: 0.07 + rnd() * 0.10,
    })
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {pills.map((p, i) => {
        const s = p.size
        const fill = `rgba(255,255,255,${p.op})`
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${s}px`,
              height: `${s}px`,
              transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
            }}
          >
            <svg width={s} height={s} viewBox="0 0 32 32">
              <rect x="6" y="4" width="9" height="24" rx="4.5" fill={fill} />
              <circle cx="23" cy="24" r="4" fill={fill} />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

/* BackgroundBadgesScatter — scattered small badge/seal silhouettes (design/certification feel) */
function BackgroundBadgesScatter() {
  type B = { x: number; y: number; size: number; rot: number; op: number; kind: 'circleCross' | 'shield' | 'rondSqCross' | 'ringDot' | 'triTri' }
  const badges: B[] = []
  let seed = 97
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  const kinds: B['kind'][] = ['circleCross', 'shield', 'rondSqCross', 'ringDot', 'triTri']
  for (let i = 0; i < 34; i++) {
    badges.push({
      x: rnd() * 110 - 5,
      y: rnd() * 115 - 8,
      size: 18 + rnd() * 22,
      rot: (rnd() - 0.5) * 25,
      op: 0.09 + rnd() * 0.11,
      kind: kinds[Math.floor(rnd() * kinds.length)],
    })
  }
  const render = (b: B, i: number) => {
    const s = b.size
    const half = s / 2
    const stroke = `rgba(255,255,255,${b.op})`
    const style = {
      left: `${b.x}%`,
      top: `${b.y}%`,
      width: `${s}px`,
      height: `${s}px`,
      transform: `translate(-50%, -50%) rotate(${b.rot}deg)`,
    }
    return (
      <div key={i} className="absolute" style={style}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          {b.kind === 'circleCross' && (
            <g fill="none" stroke={stroke} strokeWidth={1.2}>
              <circle cx={half} cy={half} r={half - 1.5} />
              <line x1={half} y1={s * 0.28} x2={half} y2={s * 0.72} />
              <line x1={s * 0.28} y1={half} x2={s * 0.72} y2={half} />
            </g>
          )}
          {b.kind === 'shield' && (
            <path
              d={`M${half} 2 L${s - 2} ${s * 0.28} V${s * 0.58} Q${s - 2} ${s - 2} ${half} ${s - 2} Q2 ${s - 2} 2 ${s * 0.58} V${s * 0.28} Z`}
              fill="none"
              stroke={stroke}
              strokeWidth={1.2}
              strokeLinejoin="round"
            />
          )}
          {b.kind === 'rondSqCross' && (
            <g fill="none" stroke={stroke} strokeWidth={1.2}>
              <rect x={2} y={2} width={s - 4} height={s - 4} rx={s * 0.22} />
              <line x1={half} y1={s * 0.3} x2={half} y2={s * 0.7} />
              <line x1={s * 0.3} y1={half} x2={s * 0.7} y2={half} />
            </g>
          )}
          {b.kind === 'ringDot' && (
            <g>
              <circle cx={half} cy={half} r={half - 1.5} fill="none" stroke={stroke} strokeWidth={1.2} />
              <circle cx={half} cy={half} r={s * 0.18} fill={stroke} />
            </g>
          )}
          {b.kind === 'triTri' && (
            <g fill="none" stroke={stroke} strokeWidth={1.2} strokeLinejoin="round">
              <polygon points={`${half},2 ${s - 2},${s - 2} 2,${s - 2}`} />
              <polygon points={`${half},${s * 0.35} ${s - 6},${s - 6} 6,${s - 6}`} />
            </g>
          )}
        </svg>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {badges.map((b, i) => render(b, i))}
    </div>
  )
}

/* BackgroundWaves — flowing horizontal S-curves (motion, fluidity) */
function BackgroundWaves() {
  // Generate several wavy paths across the hero at varying amplitudes.
  const waves: { y: number; amp: number; freq: number; op: number }[] = [
    { y: -20, amp: 36, freq: 0.0055, op: 0.08 },
    { y: 80,  amp: 28, freq: 0.006,  op: 0.075 },
    { y: 180, amp: 44, freq: 0.0048, op: 0.065 },
    { y: 290, amp: 30, freq: 0.007,  op: 0.055 },
    { y: 420, amp: 50, freq: 0.0052, op: 0.05 },
    { y: 540, amp: 32, freq: 0.006,  op: 0.055 },
    { y: 660, amp: 42, freq: 0.0058, op: 0.065 },
    { y: 780, amp: 30, freq: 0.007,  op: 0.075 },
    { y: 900, amp: 38, freq: 0.005,  op: 0.085 },
  ]
  const buildPath = (baseY: number, amp: number, freq: number) => {
    let d = ''
    for (let x = -40; x <= 1640; x += 16) {
      const y = baseY + Math.sin(x * freq) * amp + Math.sin(x * freq * 2.3) * (amp * 0.2)
      d += (x === -40 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' '
    }
    return d
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <g fill="none">
          {waves.map((w, i) => (
            <path key={i} d={buildPath(w.y, w.amp, w.freq)} stroke={`rgba(255,255,255,${w.op})`} strokeWidth={1.1} />
          ))}
        </g>
      </svg>
    </div>
  )
}

/* BackgroundSparkleGrid — orderly grid of tiny 4-point sparkles (AI magic + craft) */
function BackgroundSparkleGrid() {
  const stepX = 120
  const stepY = 90
  const sparkles: { x: number; y: number; size: number; op: number }[] = []
  for (let y = -stepY; y <= 900 + stepY; y += stepY) {
    for (let x = -stepX; x <= 1600 + stepX; x += stepX) {
      // Stagger every other row
      const offset = Math.floor(y / stepY) % 2 === 0 ? 0 : stepX / 2
      const size = 5 + ((x + y) % 60 === 0 ? 3 : 0)
      const op = 0.1 + ((x * 3 + y * 7) % 8) * 0.01
      sparkles.push({ x: x + offset, y, size, op })
    }
  }
  const renderSpark = (s: { x: number; y: number; size: number; op: number }, i: number) => {
    const sz = s.size
    return (
      <path
        key={i}
        d={`M${s.x} ${s.y - sz} L${s.x + sz * 0.25} ${s.y - sz * 0.25} L${s.x + sz} ${s.y} L${s.x + sz * 0.25} ${s.y + sz * 0.25} L${s.x} ${s.y + sz} L${s.x - sz * 0.25} ${s.y + sz * 0.25} L${s.x - sz} ${s.y} L${s.x - sz * 0.25} ${s.y - sz * 0.25} Z`}
        fill={`rgba(255,255,255,${s.op})`}
      />
    )
  }
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        {sparkles.map((s, i) => renderSpark(s, i))}
      </svg>
    </div>
  )
}

/* BackgroundOrbits — dense concentric ring clusters + gradient spheres (vinyl record / ripple) */
function BackgroundOrbits() {
  // Ring clusters = many tightly-spaced concentric circles forming vinyl-like patterns.
  const clusters = [
    // Top — bleed through nav
    { cx: 8,   cy: -4,  minR: 60,  step: 4,  count: 42, opacity: 0.14 },
    { cx: 88,  cy: -8,  minR: 70,  step: 4,  count: 48, opacity: 0.13 },
    // Mid
    { cx: 34,  cy: 48,  minR: 40,  step: 3.5,count: 38, opacity: 0.10 },
    { cx: 72,  cy: 56,  minR: 50,  step: 4,  count: 34, opacity: 0.10 },
    // Lower — bleed past bottom
    { cx: 2,   cy: 92,  minR: 50,  step: 4,  count: 40, opacity: 0.11 },
    { cx: 58,  cy: 96,  minR: 60,  step: 4.5,count: 36, opacity: 0.12 },
  ]
  // Gradient spheres layered over/under the ring clusters.
  const spheres = [
    { cx: 28,  cy: -6, r: 280, gradId: 'orb-a', opacity: 0.16 },
    { cx: 64,  cy: 14, r: 240, gradId: 'orb-b', opacity: 0.12 },
    { cx: 18,  cy: 62, r: 220, gradId: 'orb-c', opacity: 0.11 },
    { cx: 82,  cy: 78, r: 300, gradId: 'orb-d', opacity: 0.13 },
    { cx: 48,  cy: 88, r: 200, gradId: 'orb-e', opacity: 0.10 },
  ]
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
        <defs>
          {spheres.map((s) => (
            <radialGradient key={s.gradId} id={s.gradId} cx="35%" cy="35%" r="70%">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="55%"  stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>
        {/* Spheres first (behind) */}
        {spheres.map((s, i) => (
          <circle
            key={`s-${i}`}
            cx={(s.cx / 100) * 1600}
            cy={(s.cy / 100) * 900}
            r={s.r}
            fill={`url(#${s.gradId})`}
            opacity={s.opacity}
          />
        ))}
        {/* Ring clusters on top */}
        {clusters.map((c, i) => {
          const cxPx = (c.cx / 100) * 1600
          const cyPx = (c.cy / 100) * 900
          return (
            <g key={`c-${i}`}>
              {Array.from({ length: c.count }).map((_, r) => (
                <circle
                  key={r}
                  cx={cxPx}
                  cy={cyPx}
                  r={c.minR + r * c.step}
                  fill="none"
                  stroke={`rgba(255,255,255,${c.opacity})`}
                  strokeWidth={0.8}
                />
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* BackgroundRings — thin-line concentric rings (Getty ripple reference) */
function BackgroundRings() {
  const centers = [
    // Centers close to/above the top so their middle-radius rings (most visible) sit right in the top strip
    { cx: 20, cy: 8,  rings: 16, step: 20, maxOpacity: 0.14 },
    { cx: 72, cy: 6,  rings: 18, step: 24, maxOpacity: 0.13 },
    { cx: 5,  cy: 18, rings: 14, step: 18, maxOpacity: 0.12 },
    { cx: 95, cy: 20, rings: 16, step: 22, maxOpacity: 0.12 },
    // Mid / lower hero centers
    { cx: 8,  cy: 40, rings: 14, step: 22, maxOpacity: 0.09 },
    { cx: 58, cy: 32, rings: 18, step: 26, maxOpacity: 0.09 },
    { cx: 95, cy: 52, rings: 16, step: 28, maxOpacity: 0.10 },
    { cx: 30, cy: 70, rings: 20, step: 24, maxOpacity: 0.09 },
    { cx: 82, cy: 88, rings: 14, step: 20, maxOpacity: 0.08 },
  ]
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
      >
        <g fill="none" stroke="white">
          {centers.map((c, i) =>
            Array.from({ length: c.rings }).map((_, r) => {
              const radius = (r + 1) * c.step
              const sw = r % 5 === 0 ? 2 : 1
              const op = c.maxOpacity * (1 - r / c.rings) + 0.02
              return (
                <circle
                  key={`${i}-${r}`}
                  cx={(c.cx / 100) * 1600}
                  cy={(c.cy / 100) * 900}
                  r={radius}
                  strokeWidth={sw}
                  opacity={op}
                />
              )
            })
          )}
        </g>
      </svg>
    </div>
  )
}

/* BackgroundCircles — overlapping filled concentric circles, shades of black merging into top nav */
function BackgroundCircles() {
  // Each blob is a stack of concentric filled circles with stepping shades of near-black.
  const blobs = [
    // Top strip — bigger blobs anchored near/above the nav so circles visibly reach the top edge
    { cx: 15, cy: 2,  rMax: 280, rings: 5 },
    { cx: 50, cy: -5, rMax: 300, rings: 5 },
    { cx: 85, cy: 4,  rMax: 320, rings: 6 },
    { cx: 30, cy: 18, rMax: 220, rings: 4 },
    { cx: 70, cy: 20, rMax: 240, rings: 4 },
    // Mid hero
    { cx: 10, cy: 40, rMax: 240, rings: 5 },
    { cx: 55, cy: 45, rMax: 200, rings: 4 },
    { cx: 95, cy: 55, rMax: 260, rings: 5 },
    // Lower hero
    { cx: 25, cy: 72, rMax: 220, rings: 4 },
    { cx: 65, cy: 80, rMax: 240, rings: 5 },
    { cx: 5,  cy: 92, rMax: 180, rings: 3 },
    { cx: 92, cy: 90, rMax: 220, rings: 4 },
  ]

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
      >
        <g>
          {blobs.map((b, i) =>
            Array.from({ length: b.rings }).map((_, r) => {
              // Near-black shades — outer ring darkest, inner rings slightly lighter.
              const ratio = (b.rings - r) / b.rings
              const radius = b.rMax * ratio
              const shade = 14 + r * 6 // 14, 20, 26, 32, 38 — all near-black, subtle layering
              return (
                <circle
                  key={`${i}-${r}`}
                  cx={(b.cx / 100) * 1600}
                  cy={(b.cy / 100) * 900}
                  r={radius}
                  fill={`rgb(${shade},${shade},${shade})`}
                />
              )
            })
          )}
        </g>
      </svg>
    </div>
  )
}

/* BackgroundBrandMoodboard — LOGO.AI-relevant words + icons scattered in side bands */
function BackgroundBrandMoodboard() {
  // Branding-solution icons — placed in the outer frame so none get obstructed by text.
  // Safe zones: top strip (y<18), bottom strip (y>85), far-left strip (x<14), far-right strip (x>86).
  const icons = [
    // Top strip (above the eyebrow/headline) — y: 3–14
    { Icon: MagicWand,            x: 7,   y: 6,   size: 52, rot: -12 },
    { Icon: Sparkle,              x: 20,  y: 10,  size: 38, rot: 8 },
    { Icon: Palette,              x: 33,  y: 4,   size: 46, rot: 3 },
    { Icon: PenNib,               x: 46,  y: 11,  size: 50, rot: -4 },
    { Icon: TextAa,               x: 58,  y: 5,   size: 42, rot: 10 },
    { Icon: Fingerprint,          x: 70,  y: 12,  size: 48, rot: -8 },
    { Icon: Stamp,                x: 82,  y: 6,   size: 44, rot: 6 },
    { Icon: Shield,               x: 94,  y: 10,  size: 52, rot: -3 },

    // Far-left strip — x: 1–13
    { Icon: Pencil,               x: 4,   y: 22,  size: 40, rot: 9 },
    { Icon: Certificate,          x: 11,  y: 32,  size: 46, rot: -10 },
    { Icon: PaintBrush,           x: 3,   y: 42,  size: 44, rot: 5 },
    { Icon: Medal,                x: 10,  y: 52,  size: 48, rot: -6 },
    { Icon: Star,                 x: 2,   y: 62,  size: 38, rot: 11 },
    { Icon: Sparkle,              x: 12,  y: 72,  size: 36, rot: -7 },
    { Icon: Gift,                 x: 5,   y: 82,  size: 42, rot: 4 },

    // Far-right strip — x: 87–99
    { Icon: PaintBrush,           x: 96,  y: 22,  size: 44, rot: -5 },
    { Icon: Fingerprint,          x: 89,  y: 32,  size: 48, rot: 4 },
    { Icon: Pencil,               x: 98,  y: 42,  size: 40, rot: -11 },
    { Icon: PenNib,               x: 90,  y: 52,  size: 50, rot: 7 },
    { Icon: TextAa,               x: 97,  y: 62,  size: 42, rot: -4 },
    { Icon: Stamp,                x: 88,  y: 72,  size: 44, rot: 13 },
    { Icon: Shield,               x: 98,  y: 82,  size: 48, rot: -7 },

    // Bottom strip (below stats) — y: 88–97
    { Icon: Medal,                x: 6,   y: 94,  size: 46, rot: 5 },
    { Icon: Palette,              x: 18,  y: 90,  size: 52, rot: -2 },
    { Icon: SelectionBackground,  x: 31,  y: 96,  size: 40, rot: 8 },
    { Icon: Certificate,          x: 44,  y: 91,  size: 48, rot: -9 },
    { Icon: Gift,                 x: 56,  y: 96,  size: 42, rot: 6 },
    { Icon: Star,                 x: 68,  y: 90,  size: 40, rot: -11 },
    { Icon: MagicWand,            x: 80,  y: 95,  size: 50, rot: 4 },
    { Icon: Sparkle,              x: 92,  y: 91,  size: 38, rot: -5 },
  ]

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(ellipse 92% 85% at 50% 50%, black 35%, transparent 98%)',
        WebkitMaskImage: 'radial-gradient(ellipse 92% 85% at 50% 50%, black 35%, transparent 98%)',
      }}
    >
      {/* Icons */}
      {icons.map((item, i) => {
        const { Icon } = item
        return (
          <span
            key={`i-${i}`}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) rotate(${item.rot}deg)`,
              color: 'rgba(255, 255, 255, 0.25)',
            }}
          >
            <Icon size={item.size} weight="duotone" />
          </span>
        )
      })}
    </div>
  )
}

/* BackgroundRealLogoWall — scattered LOGO.AI outline logos at low opacity */
const OUTLINE_LOGOS = [
  '/Images/Logos/outlines/restaurant-logo-1-outline.png',
  '/Images/Logos/outlines/coffee-shop-logo-1-outline.png',
  '/Images/Logos/outlines/bakery-logo-1-outline.png',
  '/Images/Logos/outlines/food-truck-logo-1-outline.png',
  '/Images/Logos/outlines/barbershop-logo-1-outline.png',
  '/Images/Logos/outlines/hair-salon-logo-1-outline.png',
  '/Images/Logos/outlines/nail-studio-logo-1-outline.png',
  '/Images/Logos/outlines/boutique-logo-1-outline.png',
  '/Images/Logos/outlines/clothing-brand-logo-1-outline.png',
  '/Images/Logos/outlines/gym-logo-1-outline.png',
  '/Images/Logos/outlines/pet-grooming-logo-1-outline.png',
  '/Images/Logos/outlines/tattoo-studio-logo-1-outline.png',
]

function BackgroundRealLogoWall() {
  // 24 positions — 12 outlines cycled twice (each logo appears ~2x across the hero)
  // Logos placed only in LEFT band (x: 2-28) and RIGHT band (x: 72-98)
  // Center (30-70) is kept clear for the headline + email form
  const positions = [
    // Top edge (top row, above headline) — can cross center since headline starts lower
    { x: 8,   y: 6,  size: 100, rot: -8, idx: 0 },
    { x: 28,  y: 3,  size: 88,  rot: 5,  idx: 3 },
    { x: 72,  y: 3,  size: 92,  rot: 4,  idx: 5 },
    { x: 92,  y: 6,  size: 108, rot: -7, idx: 11 },

    // Left band
    { x: 4,   y: 22, size: 114, rot: 6,  idx: 4 },
    { x: 18,  y: 34, size: 96,  rot: -5, idx: 6 },
    { x: 2,   y: 48, size: 108, rot: 3,  idx: 7 },
    { x: 20,  y: 58, size: 118, rot: -8, idx: 9 },
    { x: 6,   y: 72, size: 104, rot: 5,  idx: 2 },
    { x: 22,  y: 84, size: 112, rot: -4, idx: 8 },
    { x: 8,   y: 94, size: 94,  rot: 7,  idx: 10 },

    // Right band
    { x: 96,  y: 22, size: 110, rot: -6, idx: 1 },
    { x: 82,  y: 34, size: 100, rot: 4,  idx: 6 },
    { x: 98,  y: 48, size: 116, rot: -3, idx: 5 },
    { x: 80,  y: 58, size: 96,  rot: 8,  idx: 2 },
    { x: 94,  y: 72, size: 106, rot: -5, idx: 11 },
    { x: 78,  y: 84, size: 120, rot: 3,  idx: 0 },
    { x: 92,  y: 94, size: 98,  rot: -8, idx: 3 },

    // Bottom edge (below stats row)
    { x: 38,  y: 98, size: 92,  rot: 5,  idx: 7 },
    { x: 62,  y: 98, size: 96,  rot: -6, idx: 9 },
  ]

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 25%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 25%, transparent 95%)',
      }}
    >
      {positions.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
            // Outlines are black-on-white PNGs; invert flips to white-on-black,
            // then opacity dials the intensity against the black hero.
            filter: 'invert(1)',
            opacity: 0.75,
          }}
        >
          <Image
            src={OUTLINE_LOGOS[p.idx]}
            alt=""
            width={200}
            height={200}
            className="w-full h-full object-contain"
            sizes="100px"
          />
        </div>
      ))}
    </div>
  )
}

/* BackgroundLogoWall — scattered abstract "generic" logo marks for hero decoration */
function BackgroundLogoWall() {
  // 24 logo-like SVG marks — monograms, geometric shapes, abstract symbols
  const marks = [
    { t: 'circleLetter', x: 6, y: 14, size: 70, char: 'M', rot: -8 },
    { t: 'squareLetter', x: 18, y: 8, size: 56, char: 'KL', rot: 4 },
    { t: 'triangle', x: 30, y: 22, size: 60, rot: 12 },
    { t: 'cross', x: 46, y: 6, size: 50, rot: -10 },
    { t: 'circleLetter', x: 60, y: 16, size: 72, char: 'A', rot: 6 },
    { t: 'zigzag', x: 78, y: 10, size: 80, rot: -4 },
    { t: 'star', x: 90, y: 24, size: 54, rot: 8 },
    { t: 'squareLetter', x: 4, y: 38, size: 58, char: 'ZQ', rot: 5 },
    { t: 'circle', x: 22, y: 44, size: 62, rot: 0 },
    { t: 'nested', x: 38, y: 50, size: 70, rot: -6 },
    { t: 'arrow', x: 56, y: 42, size: 58, rot: 15 },
    { t: 'circleLetter', x: 72, y: 48, size: 66, char: 'S', rot: -10 },
    { t: 'dots', x: 88, y: 44, size: 58, rot: 0 },
    { t: 'squareLetter', x: 10, y: 68, size: 56, char: 'N', rot: -12 },
    { t: 'triangle', x: 26, y: 74, size: 52, rot: 8 },
    { t: 'wave', x: 42, y: 78, size: 78, rot: -4 },
    { t: 'circleLetter', x: 60, y: 72, size: 60, char: 'R', rot: 10 },
    { t: 'cross', x: 76, y: 80, size: 48, rot: -6 },
    { t: 'nested', x: 92, y: 70, size: 62, rot: 4 },
    { t: 'star', x: 14, y: 90, size: 44, rot: -14 },
    { t: 'circle', x: 34, y: 92, size: 50, rot: 0 },
    { t: 'squareLetter', x: 52, y: 94, size: 46, char: 'B', rot: 6 },
    { t: 'arrow', x: 70, y: 90, size: 52, rot: -8 },
    { t: 'zigzag', x: 86, y: 92, size: 60, rot: 2 },
  ]

  const renderMark = (m: typeof marks[0]) => {
    const s = m.size
    const half = s / 2
    const common = { width: s, height: s, viewBox: `0 0 ${s} ${s}`, xmlns: 'http://www.w3.org/2000/svg' } as const
    const stroke = 'rgba(255,255,255,0.35)'
    switch (m.t) {
      case 'circleLetter':
        return (
          <svg {...common}>
            <circle cx={half} cy={half} r={half - 2} fill="none" stroke={stroke} strokeWidth="1.5" />
            <text x={half} y={half + s * 0.1} fill={stroke} fontSize={s * 0.45} fontFamily="'DM Serif Display', serif" textAnchor="middle" dominantBaseline="middle">{m.char}</text>
          </svg>
        )
      case 'squareLetter':
        return (
          <svg {...common}>
            <rect x="2" y="2" width={s - 4} height={s - 4} rx={s * 0.15} fill="none" stroke={stroke} strokeWidth="1.5" />
            <text x={half} y={half + s * 0.08} fill={stroke} fontSize={s * 0.38} fontFamily="'DM Serif Display', serif" textAnchor="middle" dominantBaseline="middle" fontWeight="700">{m.char}</text>
          </svg>
        )
      case 'triangle':
        return (
          <svg {...common}>
            <polygon points={`${half},4 ${s - 4},${s - 4} 4,${s - 4}`} fill="none" stroke={stroke} strokeWidth="1.5" />
            <circle cx={half} cy={half + 4} r={s * 0.15} fill="none" stroke={stroke} strokeWidth="1.5" />
          </svg>
        )
      case 'cross':
        return (
          <svg {...common}>
            <path d={`M ${half} 4 L ${half} ${s - 4} M 4 ${half} L ${s - 4} ${half}`} stroke={stroke} strokeWidth={s * 0.08} strokeLinecap="round" />
          </svg>
        )
      case 'zigzag':
        return (
          <svg {...common}>
            <polyline points={`4,${half} ${s * 0.25},${half - s * 0.2} ${half},${half + s * 0.15} ${s * 0.75},${half - s * 0.2} ${s - 4},${half}`} fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'star':
        return (
          <svg {...common}>
            <path d={`M ${half} 4 L ${half + s * 0.12} ${half - s * 0.08} L ${s - 4} ${half - s * 0.05} L ${half + s * 0.18} ${half + s * 0.08} L ${half + s * 0.28} ${s - 4} L ${half} ${half + s * 0.22} L ${half - s * 0.28} ${s - 4} L ${half - s * 0.18} ${half + s * 0.08} L 4 ${half - s * 0.05} L ${half - s * 0.12} ${half - s * 0.08} Z`} fill="none" stroke={stroke} strokeWidth="1.5" />
          </svg>
        )
      case 'circle':
        return (
          <svg {...common}>
            <circle cx={half} cy={half} r={half - 2} fill="none" stroke={stroke} strokeWidth="1.5" />
            <circle cx={half} cy={half} r={s * 0.25} fill="none" stroke={stroke} strokeWidth="1.5" />
          </svg>
        )
      case 'nested':
        return (
          <svg {...common}>
            <rect x="2" y="2" width={s - 4} height={s - 4} rx="4" fill="none" stroke={stroke} strokeWidth="1.5" />
            <rect x={s * 0.2} y={s * 0.2} width={s * 0.6} height={s * 0.6} rx="3" fill="none" stroke={stroke} strokeWidth="1.5" />
            <circle cx={half} cy={half} r={s * 0.12} fill={stroke} />
          </svg>
        )
      case 'arrow':
        return (
          <svg {...common}>
            <path d={`M 4 ${half} L ${s - 4} ${half} M ${s * 0.6} ${s * 0.3} L ${s - 4} ${half} L ${s * 0.6} ${s * 0.7}`} fill="none" stroke={stroke} strokeWidth={s * 0.06} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'dots':
        return (
          <svg {...common}>
            {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <circle key={`${r}-${c}`} cx={s * 0.2 + c * s * 0.3} cy={s * 0.2 + r * s * 0.3} r={s * 0.06} fill={stroke} />))}
          </svg>
        )
      case 'wave':
        return (
          <svg {...common}>
            <path d={`M 4 ${half} Q ${s * 0.25} ${half - s * 0.2} ${half} ${half} T ${s - 4} ${half}`} fill="none" stroke={stroke} strokeWidth={s * 0.05} strokeLinecap="round" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{
        maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 90%)',
      }}
    >
      {marks.map((m, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
            opacity: 0.55,
          }}
        >
          {renderMark(m)}
        </div>
      ))}
    </div>
  )
}

// Animated counter — counts from `from` to `to` with ease-out when visible
function AnimatedNum({ from, to, suffix = '' }: { from: number; to: number; suffix?: string }) {
  const [value, setValue] = useState(from)
  const ref = useRef<HTMLSpanElement | null>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true
            const startTime = performance.now()
            const duration = 2000
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1)
              const eased = 1 - (1 - progress) ** 3
              setValue(from + (to - from) * eased)
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.disconnect()
          }
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [from, to])

  return (
    <span ref={ref}>
      {Math.floor(value).toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

// Tab button with proper hover state (B&W aesthetic)
function TabButton({ label, isActive, onClick, pill = false }: { label: string; isActive: boolean; onClick: () => void; pill?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 cursor-pointer"
      style={{
        padding: '8px 16px',
        // Firefox mode ⇒ full pill, matches the hero CTA
        borderRadius: pill ? '9999px' : '10px',
        border: isActive
          ? '1px solid var(--theme-accent)'
          : hovered
          ? '1px solid rgba(0,0,0,0.35)'
          : '1px solid rgba(0,0,0,0.12)',
        background: isActive
          ? 'var(--theme-accent)'
          : hovered
          ? 'rgba(0,0,0,0.04)'
          : 'transparent',
        color: isActive ? 'var(--theme-accent-text)' : hovered ? '#000' : 'rgba(0,0,0,0.65)',
        fontFamily: pill ? "'Mozilla Text', sans-serif" : "'Outfit', sans-serif",
        fontSize: '14px',
        fontWeight: pill ? 600 : 500,
        whiteSpace: 'nowrap',
        transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

type BgStyle =
  | 'diagonals' | 'diagonalsSymmetric' | 'diagonalsConverge'
  | 'syncNoir' | 'syncFigure' | 'syncGrain' | 'syncSpotlight' | 'syncDeep' | 'syncMesh'
  | 'liveGlow'
  | 'firefox'
const BG_OPTIONS: { value: BgStyle; label: string }[] = [
  { value: 'diagonals',          label: 'Diagonals' },
  { value: 'diagonalsSymmetric', label: 'Diagonals Symmetric' },
  { value: 'diagonalsConverge',  label: 'Diagonals Converge' },
  { value: 'syncNoir',           label: 'Sync Noir' },
  { value: 'syncFigure',         label: 'Sync Figure' },
  { value: 'syncGrain',          label: 'Sync Grain' },
  { value: 'syncSpotlight',      label: 'Sync Spotlight' },
  { value: 'syncDeep',           label: 'Sync Deep' },
  { value: 'syncMesh',           label: 'Sync Mesh' },
  { value: 'liveGlow',           label: 'Live Glow' },
]

// ── Final site logo icon: Framed Matched; fillColor lets it invert for light-hero themes ──
function LogoIcon({ fillColor = '#ffffff' }: { fillColor?: string }) {
  const maskId = `nav-framed-pill-matched-mask-${fillColor.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <mask id={maskId}>
        <rect width="32" height="32" fill="black" />
        <rect x="2" y="2" width="28" height="28" rx="5" fill="white" />
        <rect x="6" y="5" width="9" height="22" rx="4.5" fill="black" />
        <circle cx="22" cy="22.5" r="4.5" fill="black" />
      </mask>
      <rect width="32" height="32" fill={fillColor} mask={`url(#${maskId})`} />
    </svg>
  )
}

// 2 CTA color options — main site blue + refined indigo (Stripe-style)
type CtaColor = 'main' | 'indigo'
const CTA_COLORS: Record<CtaColor, { bg: string; glow: string; label: string }> = {
  main:   { bg: '#336AEA', glow: 'rgba(51,106,234,0.45)', label: 'Main Site' },
  indigo: { bg: '#635BFF', glow: 'rgba(99,91,255,0.45)',  label: 'Indigo' },
}

// ── Full-page theme system ──
type Theme = 'editorial'
type ThemeVars = {
  label: string
  pageBg: string
  pageText: string
  pageTextMuted: string
  heroBg: string
  heroText: string
  heroTextMuted: string
  sectionAltBg: string
  surfaceCardBg: string
  borderSubtle: string
  footerBg: string
  accent: string
  accentGlow: string
  accentText: string
}
const THEMES: Record<Theme, ThemeVars> = {
  editorial: {
    label: 'Editorial Mono',
    pageBg: '#ffffff',
    pageText: '#1a1a1a',
    pageTextMuted: 'rgba(26,26,26,0.65)',
    heroBg: '#000000',
    heroText: '#ffffff',
    heroTextMuted: 'rgba(255,255,255,0.7)',
    sectionAltBg: '#fafafa',
    surfaceCardBg: '#ffffff',
    borderSubtle: 'rgba(0,0,0,0.08)',
    footerBg: '#000000',
    accent: '#336AEA',
    accentGlow: 'rgba(51,106,234,0.45)',
    accentText: '#ffffff',
  },
}
const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: 'editorial', label: 'Editorial Mono' },
]

export default function DesignKPage() {
  const [submitted, setSubmitted] = useState(false)
  const [bgStyle, setBgStyle] = useState<BgStyle>('diagonals')
  const [theme, setTheme] = useState<Theme>('editorial')
  // Firefox bg: HERO + FOOTER are the Figma's dark Tolopea purple, but body sections stay WHITE (Figma #FFFFFF) with a subtle lavender-tinted alt and Purple Heart accent.
  const baseTheme = THEMES[theme]
  const t = bgStyle === 'firefox' ? {
    ...baseTheme,
    label: 'Firefox',
    // Body = Figma white
    pageBg: '#FFFFFF',
    pageText: '#15141A',              // Woodsmoke — Figma's exact dark text token for light sections
    pageTextMuted: '#15141A',         // Figma uses the same Woodsmoke (no opacity muting)
    // Hero = dark Tolopea
    heroBg: '#210340',
    heroText: '#FFFFFF',
    heroTextMuted: '#FFFFFF',           // Figma uses pure white everywhere on dark (no opacity muting)
    // Subtle lavender-tinted alt for visual rhythm on light sections
    sectionAltBg: '#F5F0FF',
    surfaceCardBg: '#FFFFFF',
    borderSubtle: 'rgba(32,18,58,0.08)',
    // Footer matches hero — Firefox's dark brand surface
    footerBg: '#210340',
    accent: '#7543E3',
    accentGlow: 'rgba(117,67,227,0.45)',
    accentText: '#FFFFFF',
  } : baseTheme
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const [ctaColor, setCtaColor] = useState<CtaColor>('main')
  // CTA is now derived from the active theme's accent so the whole page stays on-palette
  // CTA color toggle — theme accent / sync.so electric purple / live LOGO.AI tomato orange
  const [ctaStyle, setCtaStyle] = useState<'default' | 'sync' | 'live'>('default')
  // Firefox bg: full-pill CTA using the Figma's Purple Heart #7543E3 (reverted from hot pink)
  const cta =
    bgStyle === 'firefox'
      ? { bg: '#7543E3', glow: 'rgba(117,67,227,0.45)', text: '#ffffff', label: 'Firefox' }
      : ctaStyle === 'sync'
      ? { bg: '#651FFF', glow: 'rgba(101,31,255,0.45)', text: '#ffffff', label: 'Sync' }
      : ctaStyle === 'live'
      ? { bg: '#E84A25', glow: 'rgba(232,74,37,0.45)',  text: '#ffffff', label: 'Live' }
      : { bg: t.accent, glow: t.accentGlow, text: t.accentText, label: t.label }
  void ctaColor; void setCtaColor
  void CTA_COLORS
  // Site-logo weight toggle — simulates heavier weights for DM Serif Display (single-weight font) via text-stroke
  const [logoWeight, setLogoWeight] = useState<'400' | '450' | '500'>('400')
  const logoStrokeWidth = logoWeight === '500' ? '0.75px' : logoWeight === '450' ? '0.4px' : '0'

  // Heading font toggle — Original (DM Serif) vs alt faces; alt faces inherit the same typography rules (sizes, tracking, weights) so only the font family swaps
  const [headingFontStyle, setHeadingFontStyle] = useState<'original' | 'archivo' | 'inter' | 'firefox'>('original')
  // Firefox bg figma-exact text colors: eyebrow = Mauve, headline/subhead/stats = pure white
  const heroMainText = bgStyle === 'firefox' ? '#FFFFFF' : t.heroText
  const heroEyebrowColor = bgStyle === 'firefox' ? '#C7A8FF' : t.heroTextMuted
  const heroSubheadColor = bgStyle === 'firefox' ? '#FFFFFF' : t.heroTextMuted
  const heroStatsMuted  = bgStyle === 'firefox' ? '#FFFFFF' : t.heroTextMuted
  // Firefox bg forces Mozilla Headline to match the Figma; otherwise respect the user's font toggle
  const headingFont =
    bgStyle === 'firefox' ? "'Mozilla Headline'"
    : headingFontStyle === 'firefox' ? "'Mozilla Headline'"
    : headingFontStyle === 'archivo' ? "'Archivo Black'"
    : headingFontStyle === 'inter' ? "'Inter'"
    : "'DM Serif Display'"
  // Weight override — Mozilla Headline uses 600 (SemiBold) per Figma; Inter uses 800
  const headingWeightOverride =
    bgStyle === 'firefox' || headingFontStyle === 'firefox' ? 600
    : headingFontStyle === 'inter' ? 800
    : undefined

  // Active category for the logo gallery
  const [activeCategory, setActiveCategory] = useState<string>('restaurant')
  const [galleryKey, setGalleryKey] = useState(0)
  const galleryImages = getCategoryImages(activeCategory)

  // Single hero logo — cycles through all 16 with crossfade merge
  const [logoIdx, setLogoIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setLogoIdx((i) => (i + 1) % HERO_LOGOS.length)
    }, 3600)
    return () => clearInterval(id)
  }, [])

  // Active category + slide for the mockup carousel
  const [mockupCategory, setMockupCategory] = useState<string>('restaurant')
  const [mockupSlide, setMockupSlide] = useState(0)
  const mockupImages = getMockupImages(mockupCategory)
  useEffect(() => {
    setMockupSlide(0)
  }, [mockupCategory])
  useEffect(() => {
    const id = setInterval(() => {
      setMockupSlide((s) => (s + 1) % mockupImages.length)
    }, 4000)
    return () => clearInterval(id)
  }, [mockupImages.length, mockupCategory])


  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: t.pageBg,
        color: t.pageText,
        // CSS vars for deeper theme use
        ['--page-bg' as any]: t.pageBg,
        ['--page-text' as any]: t.pageText,
        ['--page-text-muted' as any]: t.pageTextMuted,
        ['--hero-bg' as any]: t.heroBg,
        ['--hero-text' as any]: t.heroText,
        ['--hero-text-muted' as any]: t.heroTextMuted,
        ['--section-alt-bg' as any]: t.sectionAltBg,
        ['--surface-card-bg' as any]: t.surfaceCardBg,
        ['--border-subtle' as any]: t.borderSubtle,
        ['--footer-bg' as any]: t.footerBg,
        ['--theme-accent' as any]: t.accent,
        ['--theme-accent-text' as any]: t.accentText,
        ['--heading-font' as any]: headingFont,
        ...(headingWeightOverride ? { ['--heading-weight' as any]: String(headingWeightOverride) } : {}),
        // Firefox bg ⇒ body classes (dk-body, dk-body-lg, dk-nav, dk-btn, dk-caption, dk-eyebrow, dk-h3) swap to Mozilla Text. Other bgs inherit the Outfit fallback.
        ...(bgStyle === 'firefox' ? { ['--body-font' as any]: "'Mozilla Text'" } : {}),
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800;900&family=Mozilla+Headline:wght@300..700&family=Mozilla+Text:ital,wght@0,400..700;1,400..700&family=Outfit:wght@400;500;600;700&display=swap');

        /* Typography system tokens — sizes/tracking/weights stay on the original spec so any alt face inherits the same rules.
           The site logo (.dk-logo / .dk-icon) is pinned to DM Serif Display so the brand mark never swaps with the heading font toggle. */
        .dk-display { font-family: var(--heading-font, 'DM Serif Display'), serif; font-size: 88px; line-height: 1em; letter-spacing: -0.03em; font-weight: var(--heading-weight, 400); }
        .dk-h1      { font-family: var(--heading-font, 'DM Serif Display'), serif; font-size: 64px; line-height: 1.05em; letter-spacing: -0.025em; font-weight: var(--heading-weight, 400); }
        .dk-h2      { font-family: var(--heading-font, 'DM Serif Display'), serif; font-size: 48px; line-height: 1.1em; letter-spacing: -0.02em; font-weight: var(--heading-weight, 400); }
        .dk-h3      { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 22px; line-height: 1.25em; letter-spacing: -0.01em; font-weight: 600; }
        .dk-logo    { font-family: 'DM Serif Display', serif; font-size: 26px; line-height: 1em; letter-spacing: -0.02em; font-weight: 400; }
        .dk-icon    { font-family: 'DM Serif Display', serif; font-size: 22px; line-height: 1em; font-weight: 400; }
        .dk-body-lg { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 18px; line-height: 1.55em; font-weight: 400; }
        .dk-body    { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 16px; line-height: 1.55em; font-weight: 400; }
        .dk-nav     { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 15px; line-height: 1em; font-weight: 500; }
        .dk-btn     { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 15px; line-height: 1em; font-weight: 600; }
        .dk-caption { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 13px; line-height: 1.4em; font-weight: 500; }
        .dk-eyebrow { font-family: var(--body-font, 'Outfit'), sans-serif; font-size: 13px; line-height: 1em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.16em; }

        /* Mobile scaling */
        @media (max-width: 768px) {
          .dk-display { font-size: 52px; }
          .dk-h1      { font-size: 40px; }
          .dk-h2      { font-size: 34px; }
          .dk-h3      { font-size: 20px; }
          .dk-logo    { font-size: 22px; }
        }

        /* Cycling logo cards — fade-up in sequence */
        @keyframes dk-card-fade {
          0%   { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dk-card-cycle {
          animation: dk-card-fade 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Gallery logo fade-in on category switch */
        @keyframes dkLogoFade {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* ── Nav — theme-aware; matches the hero's effective color (including bg-toggle tints) ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 backdrop-blur-sm"
        style={{
          // Flat-color bgs (Sync Mesh, Firefox) use the pre-composited color so the nav blends seamlessly
          background: bgStyle === 'syncMesh'
            ? '#121213'
            : bgStyle === 'firefox'
            ? '#210340'
            : scrolled ? t.heroBg : `${t.heroBg}33`,
          borderBottom: scrolled && bgStyle !== 'syncMesh' && bgStyle !== 'firefox' ? `1px solid ${t.borderSubtle}` : 'none',
        }}
      >
        <div className="flex items-center">
          {/* Site wordmark — pinned to DM Serif Display; weight simulated via text-stroke so 450/500 are visible on a single-weight font */}
          <span
            style={{
              color: t.heroText,
              fontFamily: "'DM Serif Display', serif",
              fontSize: '30px',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              WebkitTextStroke: `${logoStrokeWidth} ${t.heroText}`,
            }}
          >
            LOGO<span className="opacity-50">.</span>AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="dk-nav cursor-pointer hover:opacity-100 transition-all no-underline"
              style={{
                color: t.heroTextMuted,
                // Firefox bg aligns nav type to the Mozilla Text Regular used across the Figma page
                fontFamily: bgStyle === 'firefox' ? "'Mozilla Text', sans-serif" : undefined,
                fontWeight: bgStyle === 'firefox' ? 400 : undefined,
              }}
            >
              {link.text}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-1.5 rounded-lg px-6 py-3 text-white font-medium text-base transition-all bg-transparent border border-white/25 hover:bg-white hover:text-black"
            style={{
              // Firefox bg ⇒ Mozilla Text SemiBold label + pill shape (matches hero CTA)
              fontFamily: bgStyle === 'firefox' ? "'Mozilla Text', sans-serif" : "'Outfit', sans-serif",
              fontWeight: bgStyle === 'firefox' ? 600 : undefined,
              borderRadius: bgStyle === 'firefox' ? 9999 : undefined,
            }}
          >
            {submitted ? '✓ Joined!' : <>Get my free logo <ArrowRight weight="bold" size={14} /></>}
          </button>
        </div>

        <button type="button" aria-label="Open menu" className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]">
          <div className="w-6 h-[2px] rounded-full" style={{ background: t.heroText }} />
          <div className="w-6 h-[2px] rounded-full" style={{ background: t.heroText }} />
        </button>
      </nav>

      {/* ── Hero — centered, scattered LOGO.AI logo wall in background ── */}
      <section
        className="min-h-[90vh] flex items-center relative overflow-hidden"
        style={{ background: t.heroBg }}
      >
        {/* Background — toggleable */}
        {bgStyle === 'diagonals'          && <BackgroundDiagonals />}
        {bgStyle === 'diagonalsSymmetric' && <BackgroundDiagonalsSymmetric />}
        {bgStyle === 'diagonalsConverge'  && <BackgroundDiagonalsConverge />}
        {bgStyle === 'syncNoir'           && <BackgroundSyncNoir />}
        {bgStyle === 'syncFigure'         && <BackgroundSyncFigure />}
        {bgStyle === 'syncGrain'          && <BackgroundSyncGrain />}
        {bgStyle === 'syncSpotlight'      && <BackgroundSyncSpotlight />}
        {bgStyle === 'syncDeep'           && <BackgroundSyncDeep />}
        {bgStyle === 'syncMesh'           && <BackgroundSyncMesh />}
        {bgStyle === 'liveGlow'           && <BackgroundLiveGlow />}
        {bgStyle === 'firefox'            && <BackgroundFirefox />}

        {/* Toggles — stacked top-right */}
        <div className="absolute top-20 right-6 z-30 hidden md:flex flex-col items-end gap-2">
          {/* Background style toggle */}
          <div className="flex flex-wrap justify-end items-center gap-1.5 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-[560px]">
            {BG_OPTIONS.map((opt) => {
              const active = bgStyle === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBgStyle(opt.value)}
                  className="cursor-pointer transition-all"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    background: active ? '#fff' : 'transparent',
                    color: active ? '#000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* CTA color toggle — default accent vs sync.so bright lime */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            {([
              { value: 'default', label: 'CTA Default', swatch: t.accent },
              { value: 'sync',    label: 'CTA Sync',    swatch: '#651FFF' },
              { value: 'live',    label: 'CTA Live',    swatch: '#E84A25' },
            ] as const).map((opt) => {
              const active = ctaStyle === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCtaStyle(opt.value)}
                  className="cursor-pointer transition-all flex items-center gap-2"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    background: active ? '#fff' : 'transparent',
                    color: active ? '#000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  <span
                    className="inline-block rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: opt.swatch,
                      outline: `1px solid ${active ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'}`,
                    }}
                  />
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Heading font toggle — DM Serif Display vs Archivo Black (heavy condensed) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            {(['original', 'archivo', 'inter', 'firefox'] as const).map((f) => {
              const active = headingFontStyle === f
              const chipFont =
                f === 'original' ? "'DM Serif Display', serif"
                : f === 'archivo' ? "'Archivo Black', sans-serif"
                : f === 'inter' ? "'Inter', sans-serif"
                : "'Mozilla Headline', sans-serif"
              const chipWeight = f === 'archivo' ? 900 : f === 'inter' ? 800 : f === 'firefox' ? 600 : 400
              const chipLabel = f === 'original' ? 'Original' : f === 'archivo' ? 'Archivo Black' : f === 'inter' ? 'Inter' : 'Mozilla Headline'
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setHeadingFontStyle(f)}
                  className="cursor-pointer transition-all"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontFamily: chipFont,
                    fontSize: '13px',
                    fontWeight: chipWeight,
                    letterSpacing: '-0.02em',
                    background: active ? '#fff' : 'transparent',
                    color: active ? '#000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {chipLabel}
                </button>
              )
            })}
          </div>

          {/* Site-logo weight toggle — 400 (native) / 450 / 500 (simulated via text-stroke since DM Serif is single-weight) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            {(['400', '450', '500'] as const).map((w) => {
              const active = logoWeight === w
              const chipStroke = w === '500' ? '0.75px currentColor' : w === '450' ? '0.4px currentColor' : '0'
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => setLogoWeight(w)}
                  className="cursor-pointer transition-all"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '15px',
                    letterSpacing: '-0.02em',
                    WebkitTextStroke: chipStroke,
                    background: active ? '#fff' : 'transparent',
                    color: active ? '#000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  Logo {w}
                </button>
              )
            })}
          </div>

        </div>

        {/* Soft center vignette to keep copy legible over marks — skipped for flat-color bgs like Sync Mesh and Firefox */}
        {bgStyle !== 'syncMesh' && bgStyle !== 'firefox' && (
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.05) 100%)' }} />
        )}

        <div className="w-full px-6 md:px-10 pt-28 pb-20 md:pt-0 md:pb-0 relative z-10">
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            <span
              className="dk-eyebrow mb-6 block"
              style={{
                color: heroEyebrowColor,
                // Firefox bg: Figma-exact eyebrow spec (Mozilla Text Regular 400, 14/16.8, 0.02em tracking)
                ...(bgStyle === 'firefox' ? {
                  fontFamily: "'Mozilla Text', sans-serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '16.8px',
                  letterSpacing: '0.02em',
                } : null),
              }}
            >
              World&apos;s best AI logo generator
            </span>

            <h1 className="dk-h1 mb-5" style={{ color: heroMainText }}>
              Get your free logo in seconds
            </h1>

            <p className="dk-body-lg max-w-[480px] mb-8" style={{ color: heroSubheadColor }}>
              Free logo for the first 2,000,000 users. Join now to secure yours at launch.
            </p>

            {/* Email form — two separate bars, same sizing as main file */}
            {submitted ? (
              <p className="dk-h2" style={{ color: heroMainText }}>
                You&apos;re on the list! We&apos;ll email you at launch.
              </p>
            ) : (
              <div className="flex flex-col gap-3 max-w-[720px] w-full items-center">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
                  {/* Email bar — standalone (adapts surface + text to theme, matches CTA pill shape on Firefox) */}
                  <div
                    className="flex-1 flex items-center p-1.5"
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: '#2B2B2B',
                      borderRadius: bgStyle === 'firefox' ? 9999 : 16,
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-transparent border-0 outline-none px-5 py-[18px] sm:py-6 text-lg sm:text-xl"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#ffffff',
                      }}
                    />
                  </div>
                  {/* CTA — standalone, outside the email bar, same main-file size */}
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-2xl border-0 cursor-pointer font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200"
                    style={{
                      padding: 'clamp(20px,2.5vw,28px) clamp(28px,4vw,52px)',
                      background: cta.bg,
                      color: cta.text,
                      fontSize: 'clamp(18px,1.8vw,22px)',
                      fontFamily: bgStyle === 'firefox' ? "'Mozilla Text', sans-serif" : "'Outfit', sans-serif",
                      fontWeight: bgStyle === 'firefox' ? 600 : undefined,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      borderRadius: bgStyle === 'firefox' ? '9999px' : undefined,
                    }}
                    onMouseEnter={(e) => {
                      // Firefox bg ⇒ hot-pink hover darkens to #DB2777, no scale, soft shadow. Other bgs keep scale+glow.
                      if (bgStyle === 'firefox') {
                        e.currentTarget.style.background = '#5F2EB4'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(32,18,58,0.25)'
                      } else {
                        e.currentTarget.style.transform = 'scale(1.02)'
                        e.currentTarget.style.boxShadow = `0 4px 20px ${cta.glow}`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (bgStyle === 'firefox') {
                        e.currentTarget.style.background = cta.bg
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'
                      } else {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Get my free logo
                    <ArrowRight weight="bold" size={20} />
                  </button>
                </div>
                <span className="dk-caption" style={{ color: heroStatsMuted }}>
                  No credit card required.
                </span>
              </div>
            )}

            {/* Stats row — centered */}
            <div className="flex items-center flex-wrap gap-5 mt-10 justify-center">
              <div className="flex flex-col gap-0.5 items-center">
                <span style={{ color: heroMainText, fontFamily: "var(--heading-font, 'DM Serif Display'), serif", fontSize: '26px', lineHeight: '1em' }}>
                  {getLogosRemaining().toLocaleString()}
                </span>
                <span className="dk-caption" style={{ fontSize: '12px', color: heroStatsMuted }}>
                  free logos remaining
                </span>
                <span className="dk-caption" style={{ fontSize: '11px', color: heroStatsMuted, opacity: 0.55 }}>
                  of 2,000,000
                </span>
              </div>

              <div className="w-px h-12" style={{ background: t.borderSubtle }} />

              <div className="flex flex-col gap-0.5 items-center">
                <span style={{ color: heroMainText, fontFamily: "var(--heading-font, 'DM Serif Display'), serif", fontSize: '26px', lineHeight: '1em' }}>
                  {getDaysUntilLaunch()} days
                </span>
                <span className="dk-caption" style={{ fontSize: '12px', color: heroStatsMuted }}>
                  until launch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo Gallery — "Every logo, crafted from scratch" ── */}
      <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: t.pageBg }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : { color: t.pageText, background: t.borderSubtle }
              }
            >
              100% Original
            </span>
            <h2 className="dk-h2 mb-5">
              Every logo, crafted from scratch
            </h2>
            <p className="dk-body-lg" style={{ color: t.pageTextMuted }}>
              No templates, no clip art. Every logo is uniquely generated by AI, just for your brand.
            </p>
          </div>

          {/* Category tabs — B&W aesthetic for design-k */}
          <div className="relative mb-10">
            <div
              className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to right, transparent, #ffffff)' }}
            />
            <div
              className="flex md:flex-wrap md:justify-center gap-2.5 overflow-x-auto md:overflow-visible scrollbar-hide pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {CATEGORIES.map((cat) => (
                <TabButton
                  key={cat.key}
                  label={cat.name}
                  isActive={cat.key === activeCategory}
                  pill={bgStyle === 'firefox'}
                  onClick={() => {
                    if (cat.key === activeCategory) return
                    setActiveCategory(cat.key)
                    setGalleryKey((k) => k + 1)
                  }}
                />
              ))}
            </div>
          </div>

          {/* Logo grid — 12 images per category, fade-in animation on switch */}
          <div key={galleryKey} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {galleryImages.map((src, i) => (
              <div
                key={src}
                className="relative w-full overflow-hidden rounded-2xl bg-[#F5F5F5] group"
                style={{
                  paddingBottom: '100%',
                  opacity: 0,
                  transform: 'translateY(12px) scale(0.97)',
                  animation: `dkLogoFade 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 0.04}s forwards`,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Mockups — "From websites to packaging" ── */}
      <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: t.sectionAltBg }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : { color: t.pageText, background: t.borderSubtle }
              }
            >
              Built to scale
            </span>
            <h2 className="dk-h2 mb-5">
              From websites to packaging
            </h2>
            <p className="dk-body-lg" style={{ color: t.pageTextMuted }}>
              Your logo looks sharp everywhere — social media, business cards, signage, and more.
            </p>
          </div>

          {/* Category tabs */}
          <div className="relative mb-10">
            <div
              className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to right, transparent, #F5F5F5)' }}
            />
            <div
              className="flex md:flex-wrap md:justify-center gap-2.5 overflow-x-auto md:overflow-visible scrollbar-hide pb-1 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {CATEGORIES.map((cat) => (
                <TabButton
                  key={cat.key}
                  label={cat.name}
                  isActive={cat.key === mockupCategory}
                  pill={bgStyle === 'firefox'}
                  onClick={() => {
                    if (cat.key === mockupCategory) return
                    setMockupCategory(cat.key)
                  }}
                />
              ))}
            </div>
          </div>

          {/* Frame — dark on non-Firefox, Firefox purple + white wave-curve overlay on Firefox */}
          <div
            className="w-full relative rounded-[16px] md:rounded-[20px] overflow-hidden"
            style={{
              padding: 'clamp(16px, 4vw, 48px)',
              background: bgStyle === 'firefox' ? '#5B21B6' : '#1a1a1a',
            }}
          >
            {bgStyle === 'firefox' && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 1600 800"
                aria-hidden="true"
              >
                <g fill="none" strokeLinecap="round">
                  <path d="M -60 80  C 300 -20 600 180 900 80  S 1400 -20 1660 80"  stroke="rgba(255,255,255,0.5)"  strokeWidth="2.5" />
                  <path d="M -60 150 C 350 50  650 250 950 150 S 1400 50  1660 150" stroke="rgba(255,255,255,0.4)"  strokeWidth="2" />
                  <path d="M -60 220 C 300 120 600 320 900 220 S 1400 120 1660 220" stroke="rgba(255,255,255,0.3)"  strokeWidth="2" />
                  <path d="M -60 560 C 300 460 600 660 900 560 S 1400 460 1660 560" stroke="rgba(255,255,255,0.3)"  strokeWidth="2" />
                  <path d="M -60 640 C 350 540 650 740 950 640 S 1400 540 1660 640" stroke="rgba(255,255,255,0.4)"  strokeWidth="2" />
                  <path d="M -60 720 C 300 620 600 820 900 720 S 1400 620 1660 720" stroke="rgba(255,255,255,0.5)"  strokeWidth="2.5" />
                </g>
              </svg>
            )}
            {/* Carousel frame */}
            <div
              className="relative z-10 rounded-xl overflow-hidden bg-[#111]"
              style={{ aspectRatio: '1460/760', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              {mockupImages.map((src, i) => (
                <Image
                  key={mockupCategory + '-' + i}
                  src={src}
                  alt=""
                  fill
                  className="object-cover transition-all duration-700"
                  style={{
                    opacity: i === mockupSlide ? 1 : 0,
                    transform: i === mockupSlide ? 'scale(1)' : 'scale(1.04)',
                  }}
                  sizes="100vw"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Dots below the frame */}
          <div className="flex gap-2 items-center justify-center mt-6">
            {mockupImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMockupSlide(i)}
                className="h-2 rounded-full transition-all duration-[400ms] border-0 cursor-pointer"
                style={{
                  width: i === mockupSlide ? 24 : 8,
                  background: i === mockupSlide ? t.accent : 'rgba(0,0,0,0.2)',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Hidden legacy grid preserved — below, uncomment to restore */}
          <div className="hidden">
            {PROJECTS.map((p, i) => (
              <div key={i}>
                <Image src={p.img} alt={p.title} width={768} height={1024} className="w-full h-auto block" sizes="500px" />
                <h3>{p.title}</h3>
                <p>{p.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works — "Simple as 1-2-3" ── */}
      <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: t.pageBg }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : { color: t.pageText, background: t.borderSubtle }
              }
            >
              Simple as 1-2-3
            </span>
            <h2 className="dk-h2 mb-5">
              From idea to logo in seconds
            </h2>
            <p className="dk-body-lg" style={{ color: t.pageTextMuted }}>
              No design skills needed. Tell us your brand name and let our AI handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { Icon: Keyboard, num: '01', title: 'Describe your brand', desc: "Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience." },
              { Icon: Sparkle, num: '02', title: 'Watch AI design it', desc: 'In under 60 seconds, our AI generates original logo concepts – choosing the right style, colors, and typography for you.' },
              { Icon: RocketLaunch, num: '03', title: 'Download and launch', desc: 'Pick your favorite, then download print-ready and web-ready files instantly. No account or credit card needed.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: bgStyle === 'firefox' ? '#7543E3' : '#000' }}
                >
                  <step.Icon weight="bold" size={26} className="text-white" />
                </div>
                <span
                  className="dk-eyebrow mb-2 block"
                  style={
                    bgStyle === 'firefox'
                      ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em' }
                      : { color: t.pageTextMuted }
                  }
                >STEP {step.num}</span>
                <h3
                  className="dk-h3 mb-3"
                  style={
                    bgStyle === 'firefox'
                      ? { fontFamily: "'Mozilla Headline', sans-serif", fontSize: '24px', lineHeight: '26.4px', fontWeight: 600 }
                      : undefined
                  }
                >
                  {step.title}
                </h3>
                <p className="dk-body" style={{ color: t.pageTextMuted }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: t.sectionAltBg }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : { color: t.pageText, background: t.borderSubtle }
              }
            >
              The smart choice
            </span>
            <h2 className="dk-h2 mb-5">
              Skip the designer, outperform the templates
            </h2>
            <p className="dk-body-lg" style={{ color: t.pageTextMuted }}>
              Here&apos;s how LOGO.AI compares – on speed, cost, quality, and everything that matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                title: 'Designer',
                sub: 'Traditional agency route',
                price: '$5K–$50K+',
                priceSub: '/ project',
                featured: false,
                items: [
                  { icon: 'dim', text: '3–6 weeks turnaround' },
                  { icon: 'dim', text: 'High quality (depends on designer)' },
                  { icon: 'cross', text: 'Multiple revision rounds' },
                  { icon: 'cross', text: 'Manual brand briefing' },
                  { icon: 'cross', text: 'Consistency depends on team' },
                  { icon: 'cross', text: 'High effort required' },
                ],
              },
              {
                title: 'LOGO.AI',
                sub: 'AI-powered, instant',
                price: 'Free',
                priceSub: 'for first 2M users',
                featured: true,
                items: [
                  { icon: 'check', text: 'Ready in seconds' },
                  { icon: 'check', text: 'Professional, consistent quality' },
                  { icon: 'check', text: 'No revisions needed' },
                  { icon: 'check', text: 'Automatic brand understanding' },
                  { icon: 'check', text: 'Built-in consistency' },
                  { icon: 'check', text: 'Minimal effort — AI handles it' },
                ],
              },
              {
                title: 'Other AI Logo Makers',
                sub: 'Template-based generators',
                price: '$20–$100',
                priceSub: '/ month',
                featured: false,
                items: [
                  { icon: 'dim', text: '1–3 hours of trial & error' },
                  { icon: 'cross', text: 'Generic, inconsistent output' },
                  { icon: 'cross', text: 'Trial and error approach' },
                  { icon: 'cross', text: 'Limited brand understanding' },
                  { icon: 'cross', text: 'Limited consistency' },
                  { icon: 'dim', text: 'Medium effort required' },
                ],
              },
            ].map((card) => {
              const isFirefox = bgStyle === 'firefox'
              // Firefox palette: featured card uses Tolopea #210340 (matches hero/footer); side cards stay white with theme-aware text
              const featuredBg = isFirefox ? '#210340' : '#000'
              const sideCardBg = isFirefox ? '#FFFFFF' : '#ffffff'
              const sideCardText = isFirefox ? t.pageText : '#1a1a1a'
              const sideCardMuted = isFirefox ? t.pageTextMuted : 'rgba(0,0,0,0.4)'
              const sideCardBodyMuted = isFirefox ? t.pageTextMuted : 'rgba(0,0,0,0.6)'
              const sideCardBorder = isFirefox ? t.borderSubtle : 'rgba(0,0,0,0.08)'
              const sideCardDivider = isFirefox ? t.borderSubtle : 'rgba(0,0,0,0.06)'
              return (
              <div
                key={card.title}
                className={`rounded-2xl p-8 lg:p-10 text-left relative ${
                  card.featured
                    ? 'text-white md:-my-4 md:py-12 lg:py-14 order-first md:order-none'
                    : ''
                }`}
                style={{
                  background: card.featured ? featuredBg : sideCardBg,
                  border: card.featured ? 'none' : `1px solid ${sideCardBorder}`,
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3
                      className="dk-h3 mb-1"
                      style={
                        isFirefox
                          ? { fontFamily: "'Mozilla Headline', sans-serif", fontSize: '24px', lineHeight: '26.4px', fontWeight: 600, color: card.featured ? '#fff' : sideCardText }
                          : { fontSize: '22px', color: card.featured ? '#fff' : sideCardText }
                      }
                    >
                      {card.title}
                    </h3>
                    <p className="dk-caption" style={{ color: card.featured ? (isFirefox ? '#FFFFFF' : 'rgba(255,255,255,0.5)') : sideCardMuted }}>
                      {card.sub}
                    </p>
                  </div>
                </div>
                <div className="mb-8">
                  <span className="dk-h2" style={{ fontSize: '32px', color: card.featured ? '#fff' : sideCardText }}>
                    {card.price}
                  </span>
                  <span className="dk-caption ml-1" style={{ color: card.featured ? 'rgba(255,255,255,0.5)' : sideCardMuted }}>
                    {card.priceSub}
                  </span>
                </div>

                <div className="flex flex-col">
                  {card.items.map((item, j) => (
                    <div
                      key={j}
                      className="dk-body flex items-start gap-3 py-3"
                      style={{
                        fontSize: '14px',
                        borderTop: j === 0 ? 'none' : card.featured ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${sideCardDivider}`,
                        color: card.featured ? (isFirefox ? '#FFFFFF' : 'rgba(255,255,255,0.85)') : sideCardBodyMuted,
                      }}
                    >
                      {/* Icon */}
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                        {(card.featured || item.icon === 'check') ? (
                          <>
                            <circle cx="10" cy="10" r="9" stroke={card.featured ? '#fff' : '#000'} strokeWidth="1.5" />
                            <path d="M6 10.5l2.5 2.5 5-5" stroke={card.featured ? '#fff' : '#000'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </>
                        ) : item.icon === 'dim' ? (
                          <>
                            <circle cx="10" cy="10" r="9" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                            <path d="M6 10.5l2.5 2.5 5-5" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </>
                        ) : (
                          <>
                            <circle cx="10" cy="10" r="9" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                            <path d="M7 7l6 6M13 7l-6 6" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                          </>
                        )}
                      </svg>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats — dark accent section (inherits hero bg so Firefox theme extends here too) ── */}
      <section className="px-6 md:px-10 py-24 md:py-32 text-white relative overflow-hidden" style={{ background: t.heroBg }}>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block text-white/80 mb-5 px-3 py-1 rounded-full bg-white/10'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#C7A8FF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 400, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : undefined
              }
            >
              By the numbers
            </span>
            <h2 className="dk-h2 text-white mb-5">
              Your free logo is waiting
            </h2>
            <p className="dk-body-lg text-white/55">
              854,692 free logos claimed. Secure yours before they&apos;re gone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { from: 800000, to: 854692, label: 'Logos Claimed', desc: 'Free logos claimed by users worldwide.' },
              { from: 1, to: 60, suffix: 's', label: 'Seconds to Generate', desc: 'Average time to generate a complete logo.' },
              { from: 100000, to: 1145308, label: 'Free Spots Left', desc: 'Free logos still available – claim yours now.' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-8 md:p-10 flex flex-col items-center text-center gap-2 bg-white/[0.04] border border-white/[0.08]">
                <p className="dk-display text-white" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1em' }}>
                  <AnimatedNum from={s.from} to={s.to} suffix={s.suffix} />
                </p>
                <p className="dk-eyebrow text-white mt-1 mb-2">{s.label}</p>
                <p className="dk-body" style={{ color: bgStyle === 'firefox' ? '#FFFFFF' : 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA section — mirrors main file: storefront + tilted thumbs + overlay form ── */}
      <section className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]" style={{ background: t.pageBg, borderTop: `1px solid ${t.borderSubtle}` }}>
        {/* Desktop — storefront + thumbnails + overlay */}
        <div className="hidden md:block max-w-[95%] sm:max-w-[90%] mx-auto relative overflow-hidden rounded-[20px]">
          <div className="relative w-full" style={{ aspectRatio: '1460/760' }}>
            <Image
              src="/images/illustrations/hg-storefront.png"
              alt="Hearth & Grind Roasters"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-y-0 left-0 w-[200px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.7), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-[200px] z-[1] pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(13,13,13,0.7), transparent)' }} />
            <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)' }} />

            {/* Left thumbnails — tilted */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-3">
              {[{ src: '/images/illustrations/hg-cup.png', rot: -5 }, { src: '/images/illustrations/hg-bag.png', rot: 3 }, { src: '/images/illustrations/hg-card.png', rot: -4 }].map((t, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border-2 border-white/10 cursor-pointer"
                  style={{
                    width: 'clamp(120px, 14vw, 200px)',
                    aspectRatio: '1',
                    transform: `rotate(${t.rot}deg) scale(1)`,
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1.15)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                    e.currentTarget.style.zIndex = '10'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${t.rot}deg) scale(1)`
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.zIndex = '1'
                  }}
                >
                  <Image src={t.src} alt="" fill className="object-cover" sizes="140px" />
                </div>
              ))}
            </div>

            {/* Right thumbnails — tilted */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-[5] flex flex-col gap-3 items-end">
              {[{ src: '/images/illustrations/hg-apron.png', rot: 4 }, { src: '/images/illustrations/hg-social.png', rot: -3 }, { src: '/images/illustrations/hg-loyalty.png', rot: 5 }].map((t, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border-2 border-white/10 cursor-pointer"
                  style={{
                    width: 'clamp(120px, 14vw, 200px)',
                    aspectRatio: '1',
                    transform: `rotate(${t.rot}deg) scale(1)`,
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1.15)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                    e.currentTarget.style.zIndex = '10'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${t.rot}deg) scale(1)`
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.zIndex = '1'
                  }}
                >
                  <Image src={t.src} alt="" fill className="object-cover" sizes="140px" />
                </div>
              ))}
            </div>

            {/* CTA content overlay */}
            <div className="absolute inset-0 z-[4] flex flex-col justify-end items-center text-center px-10 pb-12 pointer-events-none">
              <h2
                className="dk-h2 m-0 text-white"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
              >
                Your logo is 30 seconds away &mdash; not 30 days
              </h2>
              <p
                className="dk-body-lg text-white/75 m-0 mt-3 max-w-[480px]"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
              >
                Join 149,701 founders already in line. Reserve your free logo before the 2,000,000 free spots run out.
              </p>
              <div className="mt-5 flex flex-col items-center gap-2 max-w-[480px] w-full pointer-events-auto">
                <div className="flex flex-row items-stretch gap-2 w-full">
                  {!submitted && (
                    <div
                      className="flex-1 flex items-center rounded-xl p-[5px]"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(13,13,13,0.6)', backdropFilter: 'blur(8px)' }}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent border-0 outline-none text-white placeholder-white/40 px-4 py-3"
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: '16px' }}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="inline-flex items-center justify-center gap-1 font-semibold border-0 cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-200"
                    style={{
                      padding: submitted ? '14px 0' : 'clamp(12px,1.5vw,16px) clamp(18px,2.5vw,28px)',
                      fontSize: 'clamp(14px,1.5vw,18px)',
                      fontFamily: bgStyle === 'firefox' ? "'Mozilla Text', sans-serif" : "'Outfit', sans-serif",
                      fontWeight: bgStyle === 'firefox' ? 600 : undefined,
                      background: submitted ? 'transparent' : cta.bg,
                      color: submitted ? cta.bg : cta.text,
                      borderRadius: bgStyle === 'firefox' ? 9999 : 12,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      // Firefox bg ⇒ hot-pink hover darkens to #DB2777, no scale, soft shadow. Other bgs keep scale+glow.
                      if (bgStyle === 'firefox') {
                        e.currentTarget.style.background = '#5F2EB4'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(32,18,58,0.25)'
                      } else {
                        e.currentTarget.style.transform = 'scale(1.02)'
                        e.currentTarget.style.boxShadow = `0 4px 20px ${cta.glow}`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (bgStyle === 'firefox') {
                        e.currentTarget.style.background = cta.bg
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'
                      } else {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    {submitted ? "You're on the list!" : <><span>Get my free logo</span><ArrowRight weight="bold" size={16} /></>}
                  </button>
                </div>
                {!submitted && <span className="dk-caption text-white/40">No credit card required.</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — clean text CTA */}
        <div className="md:hidden flex flex-col items-center text-center gap-5">
          <h2 className="dk-h2 m-0" style={{ fontSize: 'clamp(24px, 6vw, 32px)', color: t.pageText }}>
            Your logo is 30 seconds away &mdash; not 30 days
          </h2>
          <p className="dk-body m-0 max-w-[340px]" style={{ color: t.pageTextMuted }}>
            Join 149,701 founders already in line. Reserve your free logo before the 2,000,000 free spots run out.
          </p>
          <div className="flex flex-col items-center gap-2 w-full max-w-[340px]">
            <div
              className="flex flex-col items-stretch rounded-xl p-[5px] w-full"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#2B2B2B' }}
            >
              {!submitted && (
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent border-0 outline-none text-white px-4 py-3"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: '14px' }}
                />
              )}
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="inline-flex items-center justify-center gap-1 font-semibold rounded-xl border-0 cursor-pointer whitespace-nowrap"
                style={{
                  padding: '14px 24px',
                  fontSize: '15px',
                  fontFamily: bgStyle === 'firefox' ? "'Mozilla Text', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: bgStyle === 'firefox' ? 600 : undefined,
                  background: submitted ? 'transparent' : cta.bg,
                  color: submitted ? cta.bg : cta.text,
                  borderRadius: bgStyle === 'firefox' ? 9999 : 10,
                }}
              >
                {submitted ? "You're on the list!" : <><span>Get my free logo</span><ArrowRight weight="bold" size={14} /></>}
              </button>
            </div>
            {!submitted && <span className="dk-caption" style={{ color: t.pageTextMuted }}>No credit card required.</span>}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 md:px-10 py-24 md:py-32" style={{ background: t.pageBg }}>
        <div className="max-w-[880px] mx-auto">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : { color: t.pageText, background: t.borderSubtle }
              }
            >
              FAQ
            </span>
            <h2 className="dk-h2 mb-5">
              Got questions? We&apos;ve got answers
            </h2>
            <p className="dk-body-lg" style={{ color: t.pageTextMuted }}>
              Everything you need to know about creating your free logo.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => {
              const isFirefox = bgStyle === 'firefox'
              return (
                <details
                  key={i}
                  className={`group rounded-2xl overflow-hidden open:shadow-md open:ring-1 transition-all ${
                    isFirefox
                      ? 'bg-[#F5F0FF] open:bg-white open:ring-[#7543E3]/15'
                      : 'bg-[#F5F5F5] open:bg-white open:ring-black/10'
                  }`}
                >
                  <summary className="flex items-center justify-between gap-4 px-7 py-5 cursor-pointer list-none">
                    <span className="dk-h3" style={{ color: isFirefox ? t.pageText : '#1a1a1a' }}>
                      {item.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors relative ${
                        isFirefox
                          ? 'bg-[#7543E3]/12 group-open:bg-[#7543E3]'
                          : 'bg-black/10 group-open:bg-black'
                      }`}
                    >
                      <span
                        className={`block w-3 h-[2px] ${
                          isFirefox ? 'bg-[#7543E3] group-open:bg-white' : 'bg-black group-open:bg-white'
                        }`}
                      />
                      <span
                        className={`block absolute w-[2px] h-3 group-open:rotate-90 transition-transform ${
                          isFirefox ? 'bg-[#7543E3] group-open:bg-white' : 'bg-black group-open:bg-white'
                        }`}
                      />
                    </span>
                  </summary>
                  <div className="dk-body px-7 pb-6" style={{ color: t.pageTextMuted }}>
                    {item.a}
                  </div>
                </details>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      <section className="px-6 md:px-10 py-24 md:py-32" style={{ background: t.sectionAltBg }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span
              className={bgStyle === 'firefox' ? 'dk-eyebrow inline-block mb-5' : 'dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full'}
              style={
                bgStyle === 'firefox'
                  ? { color: '#7543E3', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', fontWeight: 500, lineHeight: '16.8px', letterSpacing: '0.02em', background: 'transparent' }
                  : { color: t.pageText, background: t.borderSubtle }
              }
            >
              Insights
            </span>
            <h2 className="dk-h2 mb-5">
              Tips, trends, and inspiration
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <article key={i} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image src={post.img} alt={post.title} width={600} height={400} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700" sizes="400px" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="dk-eyebrow" style={{ color: t.pageText }}>{post.cat}</span>
                    <span className="text-gray-300">·</span>
                    <span className="dk-caption" style={{ color: t.pageTextMuted }}>{post.date}</span>
                  </div>
                  <h3 className="dk-h3 mb-3">
                    {post.title}
                  </h3>
                  <p className="dk-body mb-4" style={{ color: t.pageTextMuted }}>
                    {post.desc}
                  </p>
                  <span
                    className="dk-btn inline-flex items-center gap-1.5"
                    style={
                      bgStyle === 'firefox'
                        ? { color: '#6132BC', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '3px' }
                        : { color: t.pageText }
                    }
                  >
                    Read more <ArrowRight weight="bold" size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer — matches main file structure ── */}
      <footer
        className="w-full px-6 md:px-10 flex justify-center"
        style={{ background: t.footerBg, borderTop: `1px solid ${t.borderSubtle}` }}
      >
        <div className="w-full max-w-[1100px] py-10 md:py-20 flex flex-col gap-10 md:gap-[60px]">
          {/* Top row */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-[120px]">
            {/* Brand blurb */}
            <div className="flex flex-col gap-5 max-w-[290px]">
              <div className="flex items-center">
                <span className="dk-logo text-white">
                  LOGO<span className="opacity-50">.</span>AI
                </span>
              </div>
              <p
                className="dk-body m-0"
                style={
                  bgStyle === 'firefox'
                    ? { fontFamily: "'Mozilla Text', sans-serif", fontSize: '16px', lineHeight: '22.4px', fontWeight: 400, color: '#FFFFFF' }
                    : { fontSize: '15px', lineHeight: '1.55em', color: 'rgba(255,255,255,0.6)' }
                }
              >
                Get your free AI-generated logo in seconds. Original designs, no templates – crafted for your brand. Free for the first 2,000,000 users.
              </p>
            </div>

            {/* Link columns */}
            <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-[80px]">
              {FOOTER_LINKS.map((group) => (
                <div key={group.title} className="flex flex-col gap-4">
                  <span
                    className={bgStyle === 'firefox' ? 'text-white' : 'dk-eyebrow text-white'}
                    style={
                      bgStyle === 'firefox'
                        ? { fontFamily: "'Mozilla Headline', sans-serif", fontSize: '18px', fontWeight: 600, lineHeight: '22.4px' }
                        : undefined
                    }
                  >{group.title}</span>
                  {group.links.map((link) => (
                    <a
                      key={link.t}
                      href={link.h}
                      className="dk-body no-underline transition-colors"
                      style={
                        bgStyle === 'firefox'
                          ? { color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '16px', lineHeight: '24px', fontWeight: 400 }
                          : { color: 'rgba(255,255,255,0.55)', fontSize: '15px' }
                      }
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = bgStyle === 'firefox' ? '#FFFFFF' : 'rgba(255,255,255,0.55)')}
                    >
                      {link.t}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex justify-between items-center flex-wrap gap-2 pt-6 md:pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <span
              className="dk-caption"
              style={
                bgStyle === 'firefox'
                  ? { color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', lineHeight: '19.6px', fontWeight: 400 }
                  : { color: 'rgba(255,255,255,0.45)' }
              }
            >© 2026 LOGO.AI</span>
            <span
              className="dk-caption"
              style={
                bgStyle === 'firefox'
                  ? { color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', lineHeight: '19.6px', fontWeight: 400 }
                  : { color: 'rgba(255,255,255,0.45)' }
              }
            >LOGO.AI is an independent service.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
