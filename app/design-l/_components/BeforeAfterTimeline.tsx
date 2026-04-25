// Horizontal 4-step Before/After timeline — shared across every Our Story variant.
// Reads progressLog from OurStoryContent so copy edits propagate everywhere.
// Renders: 4 columns (year + dot + state), horizontal connecting line behind dots on desktop,
// stacks to single column on mobile (no line).

import { OUR_STORY_CONTENT as C } from './OurStoryContent'

export default function BeforeAfterTimeline() {
  return (
    <div className="relative max-w-[980px] mx-auto">
      {/* Connecting line — desktop only, sits behind the dots */}
      <div
        className="hidden md:block absolute"
        style={{
          top: 37,
          left: '12.5%',
          right: '12.5%',
          height: 1,
          background: 'rgba(32,18,58,0.15)',
        }}
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
        {C.beforeAfter.progressLog.map((row) => (
          <div key={row.year} className="flex flex-col items-center text-center px-2">
            <span
              style={{
                fontFamily: "'Mozilla Headline', sans-serif",
                fontSize: 32,
                lineHeight: '32px',
                fontWeight: 600,
                color: '#7543E3',
                marginBottom: 16,
              }}
            >
              {row.year}
            </span>
            <span
              className="hidden md:block"
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: '#7543E3',
                marginBottom: 20,
                boxShadow: '0 0 0 4px #FFFFFF',
              }}
              aria-hidden="true"
            />
            <span className="dk-body max-w-[200px]" style={{ color: '#15141A' }}>
              {row.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
