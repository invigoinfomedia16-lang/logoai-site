'use client'

// MLpThemeToggle — floating bottom-right pill, three segments:
//   • Purple  — original experimental palette (DM Serif Display + DM Sans)
//   • Figma   — Figma file colors only (#09090b bg, #E8420D CTA, #FF5C2E
//               accent). Keeps current fonts.
//   • Custom  — Figma colors + Figma typography spec (Sora display, Outfit
//               body, exact sizes from the Figma file).
//
// Mode is written to .lp-root as classes:
//   purple → no class
//   figma  → .is-figma
//   custom → .is-figma + .is-figma-type
// CSS for both classes lives in page.tsx STYLES.

import { useEffect, useState } from 'react'

type Mode = 'purple' | 'custom'

const STORAGE_KEY = 'mlp-theme-mode'
const MODES: { key: Mode; label: string }[] = [
  { key: 'purple', label: 'Purple' },
  { key: 'custom', label: 'Custom' },
]

export default function MLpThemeToggle() {
  const [mode, setMode] = useState<Mode>('purple')

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as Mode | null
    // Migrate any legacy 'figma' value to 'purple' since that segment is gone.
    if (saved === 'custom' || saved === 'purple') setMode(saved)
  }, [])

  useEffect(() => {
    const root = document.querySelector('.lp-root')
    if (!root) return
    // Custom mode = Figma colors + Figma typography (both classes).
    root.classList.toggle('is-figma',      mode === 'custom')
    root.classList.toggle('is-figma-type', mode === 'custom')
    try { window.localStorage.setItem(STORAGE_KEY, mode) } catch {}
  }, [mode])

  const accentMode: 'orange' | 'neutral' = mode === 'purple' ? 'neutral' : 'orange'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className={`lp-theme-toggle is-accent-${accentMode}`} role="group" aria-label="Theme">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`lp-theme-seg${mode === m.key ? ' is-on' : ''}`}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>
    </>
  )
}

const STYLES = `
  .lp-theme-toggle {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 4px;
    background: rgba(20, 20, 24, 0.92);
    border: 1px solid #2a2a32;
    border-radius: 999px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  .lp-theme-seg {
    background: transparent;
    color: #b8b8c4;
    border: 0;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.2px;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
  }
  .lp-theme-seg:hover { color: #f4f4f6; }
  .lp-theme-seg.is-on {
    background: #f4f4f6;
    color: #0a0a0c;
  }
  .lp-theme-toggle.is-accent-orange .lp-theme-seg.is-on {
    background: #E8420D;
    color: #ffffff;
  }

  /* Lift above the mobile sticky CTA when present */
  @media (max-width: 767px) {
    .lp-theme-toggle { bottom: 88px; right: 12px; }
    .lp-theme-seg { padding: 7px 12px; font-size: 12px; }
  }
`
