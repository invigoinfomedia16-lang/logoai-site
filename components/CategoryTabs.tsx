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
    <div className="flex flex-wrap gap-2.5">
      {CATEGORIES.map((cat) => (
        <TabButton
          key={cat.key}
          label={cat.name}
          isActive={cat.key === active}
          onClick={() => onSelect(cat.key)}
        />
      ))}
    </div>
  )
}
