'use client'

import ArrowRight from './ui/ArrowRight'

interface MobileStickyBarProps {
  visible: boolean
  onCTAClick: () => void
}

export default function MobileStickyBar({
  visible,
  onCTAClick,
}: MobileStickyBarProps) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[998] px-4 flex items-center justify-center transition-transform duration-[400ms] ease-smooth"
      style={{
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        paddingTop: 12,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onCTAClick()
        }}
        className="flex items-center justify-center gap-1.5 w-full no-underline rounded-xl py-4 px-6 font-bricolage font-semibold text-white"
        style={{ background: 'rgb(0,0,255)', fontSize: 18 }}
      >
        Get my free logo
        <ArrowRight />
      </a>
    </div>
  )
}
