'use client'

import { useState } from 'react'
import Badge from './ui/Badge'
import { FAQ_ITEMS } from '@/data'

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-faq-item
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-colors duration-200"
      style={{
        borderBottom: open
          ? '1px solid rgba(51,106,234,0.4)'
          : '1px solid rgba(255,255,255,0.08)',
        backgroundColor: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
      }}
    >
      {/* Question row */}
      <div className="flex justify-between items-start py-5 gap-4">
        <span
          className="font-bricolage font-medium text-base leading-6 flex-1 transition-colors duration-200"
          style={{ color: hovered || open ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)' }}
        >
          {q}
        </span>

        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-300 ease-smooth"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            <path
              d="M7 1V13M1 7H13"
              stroke={hovered || open ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Answer */}
      <div
        className="accordion-content"
        style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.23,1,0.32,1)' }}
      >
        <p className="font-bricolage font-normal text-sm leading-[1.7] text-white/50 pr-10 pb-5 m-0">
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const half = Math.ceil(FAQ_ITEMS.length / 2)
  const cols = [FAQ_ITEMS.slice(0, half), FAQ_ITEMS.slice(half)]

  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[1120px] mx-auto flex flex-col gap-8 md:gap-[60px]">
        <div className="flex flex-col gap-2.5">
          <Badge icon="question" text="FAQ" />
          <h2 className="font-bricolage font-medium leading-[1.1em] tracking-[-0.04em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            Got questions? We've got answers
          </h2>
          <p className="font-bricolage font-medium text-base sm:text-lg leading-7 tracking-[-0.02em] text-white/50 m-0">
            Everything you need to know about creating your free logo.
          </p>
        </div>

        {/* Two-column layout on desktop, single column on mobile */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {cols.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 w-full">
              {col.map((item, si) => (
                <FAQItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  index={ci * half + si}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
