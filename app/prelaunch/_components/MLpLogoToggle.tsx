'use client'

// MLpLogoToggle — floating picker that lets the user switch the site
// wordmark in Custom mode between 12 variants pulled from the LOGO
// VARIATIONS reference file. Writes the active key to `data-wm` on
// .lp-root; MLpLogo watches that attribute and re-renders.
//
// Visible only when .is-figma-type is active (custom theme is on),
// since the wordmark variants only render in custom mode. With 12
// variants the chip row would be too wide for one line, so the grid
// wraps to a second row.

import { useEffect, useState } from 'react'
import { DEFAULT_WM, WM_VARIANTS, type WmVariant } from './MLpLogo'

const STORAGE_KEY = 'mlp-wm-variant'

const VARIANT_LABELS: { key: WmVariant; label: string }[] = [
  { key: 'a-white',   label: 'A · White' },
  { key: 'a-orange',  label: 'A · Orange' },
  { key: 'd-white',   label: 'D · White' },
  { key: 'd-orange',  label: 'D · Orange' },
  { key: 'e-white',   label: 'E · White' },
  { key: 'e-orange',  label: 'E · Orange' },
  { key: 'n1-white',  label: 'N1 · White' },
  { key: 'n1-orange', label: 'N1 · Orange' },
  { key: 'n4-white',  label: 'N4 · White' },
  { key: 'n4-orange', label: 'N4 · Orange' },
  { key: 'n5-white',  label: 'N5 · White' },
  { key: 'n5-orange', label: 'N5 · Orange' },
]

export default function MLpLogoToggle() {
  const [variant, setVariant] = useState<WmVariant>(DEFAULT_WM)
  const [isCustom, setIsCustom] = useState(false)
  // `closed` hides the toggle entirely. Press Shift+L to reopen, or
  // append ?dev=1 to force it visible.
  const [closed, setClosed] = useState(false)
  const [forceShow, setForceShow] = useState(false)

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as WmVariant | null
    if (saved && (WM_VARIANTS as string[]).includes(saved)) setVariant(saved)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('dev') === '1') setForceShow(true)
    }
  }, [])

  useEffect(() => {
    const root = document.querySelector('.lp-root')
    if (!root) return
    root.setAttribute('data-wm', variant)
    try { window.localStorage.setItem(STORAGE_KEY, variant) } catch {}
  }, [variant])

  useEffect(() => {
    const root = document.querySelector('.lp-root')
    if (!root) return
    const sync = () => setIsCustom(root.classList.contains('is-figma-type'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Shift+L toggles visibility of this widget.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'L' || e.key === 'l') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement | null)?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        setClosed((c) => !c)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!isCustom) return null
  if (closed && !forceShow) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="lp-wm-toggle" role="group" aria-label="Logo variant">
        <span className="lp-wm-toggle-label">Logo</span>
        <div className="lp-wm-toggle-grid">
          {VARIANT_LABELS.map((v) => (
            <button
              key={v.key}
              type="button"
              className={`lp-wm-toggle-btn${variant === v.key ? ' is-on' : ''}`}
              onClick={() => setVariant(v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="lp-wm-toggle-close"
          aria-label="Hide logo toggle (Shift+L to reopen)"
          title="Hide (Shift+L to reopen)"
          onClick={() => setClosed(true)}
        >
          ×
        </button>
      </div>
    </>
  )
}

const STYLES = `
  .lp-wm-toggle {
    position: fixed;
    right: 20px;
    bottom: 76px;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    background: rgba(20, 20, 24, 0.92);
    border: 1px solid #2a2a32;
    border-radius: 18px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    font-family: 'DM Sans', system-ui, sans-serif;
    max-width: calc(100vw - 40px);
  }
  .lp-wm-toggle-label {
    color: #7e7e8c;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .lp-wm-toggle-grid {
    display: grid;
    grid-template-columns: repeat(6, auto);
    gap: 4px;
  }
  .lp-wm-toggle-btn {
    background: transparent;
    color: #b8b8c4;
    border: 0;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.2px;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }
  .lp-wm-toggle-btn:hover { color: #f4f4f6; }
  .lp-wm-toggle-btn.is-on {
    background: #E8420D;
    color: #ffffff;
  }
  .lp-wm-toggle-close {
    background: transparent;
    color: #7e7e8c;
    border: 0;
    padding: 0 4px;
    margin-left: 2px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    cursor: pointer;
    align-self: flex-start;
    transition: color 0.15s ease;
  }
  .lp-wm-toggle-close:hover { color: #f4f4f6; }
  @media (max-width: 900px) {
    .lp-wm-toggle-grid { grid-template-columns: repeat(4, auto); }
  }
  @media (max-width: 640px) {
    .lp-wm-toggle {
      bottom: 144px;
      right: 12px;
      max-width: calc(100% - 24px);
    }
    .lp-wm-toggle-grid { grid-template-columns: repeat(3, auto); gap: 3px; }
    .lp-wm-toggle-btn { padding: 5px 8px; font-size: 11px; }
  }
`
