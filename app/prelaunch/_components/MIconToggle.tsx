'use client'

// MIconToggle — minimal 2-swatch picker for the wordmark icon colour.
// Just White vs Purple variants of the concentric target mark. Stores
// the choice in localStorage and dispatches ICON_CHANGE_EVENT so the
// MWordmarkIcon in the header updates instantly.
//
// Sandbox / preview control — only mounted on the prelaunch layout,
// removable in one line once the colour is locked.

import { useEffect, useState } from 'react'
import {
  ICON_STORAGE_KEY,
  ICON_CHANGE_EVENT,
  DEFAULT_ICON_COLOR,
  type IconColor,
} from './MWordmarkIcon'

function emitChange(c: IconColor) {
  window.dispatchEvent(new CustomEvent<IconColor>(ICON_CHANGE_EVENT, { detail: c }))
}

function TargetMark({ stroke }: { stroke: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" shapeRendering="geometricPrecision" aria-hidden>
      <circle cx="12" cy="12" r="9.5" stroke={stroke} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6"   stroke={stroke} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" stroke={stroke} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="0.9" fill={stroke} />
    </svg>
  )
}

// Pure vivid colours — match the header's MWordmarkIcon.
const OPTIONS: { id: IconColor; label: string; stroke: string }[] = [
  { id: 'white',  label: 'White',  stroke: '#FFFFFF' },
  { id: 'purple', label: 'Purple', stroke: '#7543E3' },
]

export default function MIconToggle() {
  const [active, setActive] = useState<IconColor>(DEFAULT_ICON_COLOR)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ICON_STORAGE_KEY) as IconColor | null
      if (saved === 'white' || saved === 'purple') setActive(saved)
    } catch {
      /* ignore */
    }
  }, [])

  function pick(c: IconColor) {
    setActive(c)
    try {
      localStorage.setItem(ICON_STORAGE_KEY, c)
    } catch {
      /* ignore */
    }
    emitChange(c)
  }

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label="Open icon picker"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #222225',
          background: '#0A0A0A',
          color: '#FFFFFF',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TargetMark stroke="#FFFFFF" />
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        background: '#0A0A0A',
        border: '1px solid #222225',
        borderRadius: 14,
        boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: 'var(--m-font-sans), sans-serif',
        color: '#F5F5F5',
        width: 200,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#AEAEAE',
          }}
        >
          Icon colour
        </span>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse icon picker"
          style={{
            border: 'none',
            background: 'transparent',
            padding: 0,
            color: '#8A8A8A',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {OPTIONS.map(({ id, label, stroke }) => {
          const isActive = id === active
          return (
            <button
              key={id}
              type="button"
              onClick={() => pick(id)}
              aria-label={`Use ${label} icon`}
              title={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '10px 8px',
                background: isActive ? 'rgba(117,67,227,0.15)' : '#161616',
                border: isActive ? '1px solid #7543E3' : '1px solid #222225',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'background 0.12s ease, border-color 0.12s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = '#7543E3'
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = '#222225'
              }}
            >
              <TargetMark stroke={stroke} />
              <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? '#FFFFFF' : '#8A8A8A' }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
