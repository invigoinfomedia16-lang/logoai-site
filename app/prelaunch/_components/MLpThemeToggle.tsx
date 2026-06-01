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
  // `closed` hides the toggle entirely. Press Shift+T to reopen, or
  // append ?dev=1 to the URL to force the toggle to stay visible.
  const [closed, setClosed] = useState(false)
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as Mode | null
    // Migrate any legacy 'figma' value to 'purple' since that segment is gone.
    if (saved === 'custom' || saved === 'purple') setMode(saved)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('dev') === '1') setForceShow(true)
    }
  }, [])

  useEffect(() => {
    const root = document.querySelector('.lp-root')
    if (!root) return
    // Custom mode = Figma colors + Figma typography (both classes).
    root.classList.toggle('is-figma',      mode === 'custom')
    root.classList.toggle('is-figma-type', mode === 'custom')
    try { window.localStorage.setItem(STORAGE_KEY, mode) } catch {}
  }, [mode])

  // Shift+T toggles visibility of this widget.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'T' || e.key === 't') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement | null)?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        setClosed((c) => !c)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (closed && !forceShow) return null

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
        <button
          type="button"
          className="lp-theme-close"
          aria-label="Hide theme toggle (Shift+T to reopen)"
          title="Hide (Shift+T to reopen)"
          onClick={() => setClosed(true)}
        >
          ×
        </button>
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
  .lp-theme-close {
    background: transparent;
    color: #7e7e8c;
    border: 0;
    padding: 0 6px 0 4px;
    margin-left: 2px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    cursor: pointer;
    transition: color 0.15s ease;
  }
  .lp-theme-close:hover { color: #f4f4f6; }

  /* Lift above the mobile sticky CTA when present */
  @media (max-width: 767px) {
    .lp-theme-toggle { bottom: 88px; right: 12px; }
    .lp-theme-seg { padding: 7px 12px; font-size: 12px; }
  }
`
