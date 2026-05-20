'use client'

// NColorToggle — floating colour A/B control for the design-n landing page.
// Clicking a swatch swaps the six --m-brand* CSS variables on the .m-theme
// element and stores the choice in localStorage. The design-n layout reads
// that choice on every page load, so a picked colour carries through the
// funnel and dashboard too. Kept visible so stakeholders can flip colours.

import { useEffect, useState } from 'react'
import { BRAND_COLORS, BRAND_COLOR_KEY, type BrandVars } from './brandColors'

function applyVars(v: BrandVars) {
  const el = document.querySelector('.m-theme') as HTMLElement | null
  if (!el) return
  el.style.setProperty('--m-brand', v.brand)
  el.style.setProperty('--m-brand-strong', v.strong)
  el.style.setProperty('--m-brand-deep', v.deep)
  el.style.setProperty('--m-brand-soft', v.soft)
  el.style.setProperty('--m-brand-bg', v.bg)
  el.style.setProperty('--m-brand-glow', v.glow)
}

export default function NColorToggle() {
  const [active, setActive] = useState(0)

  // Reflect the saved choice on mount (the layout already applied the
  // variables pre-paint — this just syncs the toggle's active state).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BRAND_COLOR_KEY)
      if (!saved) return
      const idx = BRAND_COLORS.findIndex((c) => c.name === saved)
      if (idx >= 0) {
        setActive(idx)
        applyVars(BRAND_COLORS[idx].vars)
      }
    } catch {
      /* localStorage unavailable — default colour stays */
    }
  }, [])

  function pick(i: number) {
    setActive(i)
    applyVars(BRAND_COLORS[i].vars)
    try {
      localStorage.setItem(BRAND_COLOR_KEY, BRAND_COLORS[i].name)
    } catch {
      /* ignore — colour still applies for this session */
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        background: '#FFFFFF',
        border: '1px solid var(--m-border)',
        borderRadius: 14,
        boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontFamily: 'var(--m-font-sans), sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--m-text-soft)',
        }}
      >
        Brand colour · {BRAND_COLORS[active].name}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {BRAND_COLORS.map((c, i) => {
          const isActive = i === active
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => pick(i)}
              aria-label={`Use ${c.name}`}
              title={c.name}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: c.vars.brand,
                border: isActive ? '2px solid var(--m-ink)' : '2px solid #FFFFFF',
                boxShadow: isActive
                  ? '0 0 0 2px var(--m-ink)'
                  : '0 0 0 1px var(--m-border)',
                cursor: 'pointer',
                padding: 0,
                transition: 'transform 0.12s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.12)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
