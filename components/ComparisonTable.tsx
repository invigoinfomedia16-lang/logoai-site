'use client'

import { useInView } from '@/hooks/useInView'
import Badge from './ui/Badge'
import { COMPARISON_ROWS } from '@/data'

const HIGHLIGHT_BG = 'rgba(51, 106, 234, 0.08)'

interface ComparisonTableProps {
  mobile?: boolean
}

function Table({ mobile = false }: ComparisonTableProps) {
  const { ref, inView } = useInView(0.08)
  const cols = mobile ? '120px 1fr 1fr 1fr' : '200px 1fr 1fr 1fr'
  const labelSize = mobile ? 11 : 14
  const headerSize = mobile ? 10 : 12

  return (
    <div
      ref={ref}
      className="w-full max-w-[1000px] mx-auto font-bricolage overflow-x-auto transition-all duration-700 ease-smooth"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {/* Header row */}
      <div
        className="grid pb-5 border-b border-white/[0.1] mb-1"
        style={{ gridTemplateColumns: cols, minWidth: mobile ? 400 : undefined }}
      >
        <span style={{ fontSize: headerSize }} className="font-medium text-[#555] uppercase tracking-[0.08em]">
          Feature
        </span>
        <span
          style={{ fontSize: headerSize, background: HIGHLIGHT_BG, borderRadius: '8px 8px 0 0' }}
          className="font-medium text-white uppercase tracking-[0.08em] text-center px-2"
        >
          Logo.ai
        </span>
        <span style={{ fontSize: headerSize }} className="font-medium text-[#555] tracking-[0.08em] text-center">
          Designer
        </span>
        <span style={{ fontSize: headerSize }} className="font-medium text-[#555] tracking-[0.08em] text-center">
          Other AI logo makers
        </span>
      </div>

      {/* Data rows */}
      {COMPARISON_ROWS.map((row, i) => {
        const isLast = i === COMPARISON_ROWS.length - 1
        return (
          <div
            key={row.label}
            className="grid"
            style={{
              gridTemplateColumns: cols,
              borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
              minWidth: mobile ? 400 : undefined,
            }}
          >
            <div
              style={{ fontSize: labelSize }}
              className="font-medium text-[#aaa] flex items-center py-4"
            >
              {row.label}
            </div>
            <div
              style={{ fontSize: labelSize, background: HIGHLIGHT_BG, borderRadius: isLast ? '0 0 8px 8px' : 0 }}
              className="font-medium text-white text-center flex items-center justify-center py-4 px-2"
            >
              {row.logo}
            </div>
            <div style={{ fontSize: labelSize }} className="text-[#999] text-center flex items-center justify-center py-4">
              {row.designer}
            </div>
            <div style={{ fontSize: labelSize }} className="text-[#999] text-center flex items-center justify-center py-4">
              {row.other}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ComparisonTable() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[1120px] mx-auto flex flex-col gap-8 md:gap-[60px]">
        <div className="flex flex-col gap-2.5">
          <Badge icon="trophy" text="The smart choice" />
          <h2 className="font-bricolage font-medium text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1em] tracking-[-0.04em] m-0">
            Skip the designer, outperform the templates
          </h2>
          <p className="font-bricolage font-medium text-base sm:text-lg leading-7 tracking-[-0.02em] text-white/50 m-0">
            Here's how Logo.ai compares – on speed, cost, quality, and
            everything that matters.
          </p>
        </div>

        <Table />
      </div>
    </section>
  )
}
