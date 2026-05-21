'use client'

// NColorToggle — floating colour A/B control for the design-n landing page.
// Clicking a swatch swaps the six --m-brand* CSS variables on the .m-theme
// element and stores the choice in localStorage. The design-n layout reads
// that choice on every page load, so a picked colour carries through the
// funnel and dashboard too. Kept visible so stakeholders can flip colours.

import { useEffect, useState } from 'react'
import { BRAND_COLORS, BRAND_COLOR_KEY, type BrandVars } from './brandColors'

const BRAND_PROPS = [
  '--m-brand',
  '--m-brand-strong',
  '--m-brand-deep',
  '--m-brand-soft',
  '--m-brand-bg',
  '--m-brand-glow',
  '--m-brand-on-dark',
] as const

function themeEl(): HTMLElement | null {
  return document.querySelector('.m-theme') as HTMLElement | null
}

function applyVars(v: BrandVars) {
  const el = themeEl()
  if (!el) return
  el.style.setProperty('--m-brand', v.brand)
  el.style.setProperty('--m-brand-strong', v.strong)
  el.style.setProperty('--m-brand-deep', v.deep)
  el.style.setProperty('--m-brand-soft', v.soft)
  el.style.setProperty('--m-brand-bg', v.bg)
  el.style.setProperty('--m-brand-glow', v.glow)
  el.style.setProperty('--m-brand-on-dark', v.onDark)
}

// Drop the inline overrides → falls back to the layout's terracotta default.
function clearVars() {
  const el = themeEl()
  if (!el) return
  BRAND_PROPS.forEach((p) => el.style.removeProperty(p))
}

// data-brand-color on .m-theme drives colour-specific CSS (e.g. the Black
// theme hides the hero carousel). null clears it (terracotta default).
function setColorAttr(name: string | null) {
  const el = themeEl()
  if (!el) return
  if (name) el.setAttribute('data-brand-color', name.toLowerCase())
  else el.removeAttribute('data-brand-color')
}

export default function NColorToggle() {
  // -1 = no override (the terracotta default). 0..n = a BRAND_COLORS option.
  const [active, setActive] = useState(-1)

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
        setColorAttr(BRAND_COLORS[idx].name)
      }
    } catch {
      /* localStorage unavailable — default colour stays */
    }
  }, [])

  function pick(i: number) {
    setActive(i)
    applyVars(BRAND_COLORS[i].vars)
    setColorAttr(BRAND_COLORS[i].name)
    try {
      localStorage.setItem(BRAND_COLOR_KEY, BRAND_COLORS[i].name)
    } catch {
      /* ignore — colour still applies for this session */
    }
  }

  function reset() {
    setActive(-1)
    clearVars()
    setColorAttr(null)
    try {
      localStorage.removeItem(BRAND_COLOR_KEY)
    } catch {
      /* ignore */
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--m-text-soft)',
          }}
        >
          Brand colour · {active >= 0 ? BRAND_COLORS[active].name : 'Default'}
        </span>
        <button
          type="button"
          onClick={reset}
          disabled={active < 0}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: active < 0 ? 'var(--m-border-medium)' : 'var(--m-brand)',
            cursor: active < 0 ? 'default' : 'pointer',
          }}
        >
          Reset
        </button>
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
