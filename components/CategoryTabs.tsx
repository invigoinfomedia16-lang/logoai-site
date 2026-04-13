'use client'

import { useState } from 'react'
import { CATEGORIES } from '@/data'

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 cursor-pointer"
      style={{
        padding: '8px 16px',
        borderRadius: '10px',
        border: isActive
          ? '1px solid rgba(255,255,255,0.25)'
          : hovered
          ? '1px solid rgba(255,255,255,0.18)'
          : '1px solid rgba(255,255,255,0.08)',
        background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
        fontFamily: 'var(--font-bricolage), Bricolage Grotesque, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        color: isActive ? '#fff' : hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
        whiteSpace: 'nowrap',
        transition: 'border-color 0.2s ease, background 0.2s ease, color 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}

interface CategoryTabsProps {
  active: string
  onSelect: (key: string) => void
}

export default function CategoryTabs({ active, onSelect }: CategoryTabsProps) {
  return (
    <div className="relative">
      {/* Right fade — mobile only, signals more content */}
      <div
        className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, transparent, #0D0D0D)' }}
      />
      <div className="flex md:flex-wrap md:justify-center gap-2.5 overflow-x-auto md:overflow-visible scrollbar-hide pb-1 md:pb-0">
        {CATEGORIES.map((cat) => (
          <TabButton
            key={cat.key}
            label={cat.name}
            isActive={cat.key === active}
            onClick={() => onSelect(cat.key)}
          />
        ))}
      </div>
    </div>
  )
}
