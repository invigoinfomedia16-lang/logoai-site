import { ReactNode } from 'react'
import ScrollReveal from '@/components/ScrollReveal'
import { BORDER, CARD_BG } from '@/lib/ds'

/**
 * Standard inner-page section wrapper.
 *
 * Enforces consistent:
 *  - horizontal padding (px-5 md:px-8 lg:px-10)
 *  - vertical padding   (py-16 md:py-[120px], or py-[80px] when compact)
 *  - top border         (always present; matches BORDER token)
 *  - optional tinted bg (CARD_BG token)
 *
 * Usage:
 *   <PageSection>
 *     <div className="max-w-[1120px] mx-auto flex flex-col gap-10 md:gap-[60px]">
 *       ...
 *     </div>
 *   </PageSection>
 *
 *   <PageSection compact tinted>  ← stats strip variant
 */
export default function PageSection({
  children,
  tinted  = false,
  compact = false,
}: {
  children: ReactNode
  tinted?:  boolean
  compact?: boolean
}) {
  return (
    <ScrollReveal>
      <section
        className={`px-5 md:px-8 lg:px-10 py-16 ${compact ? 'md:py-[80px]' : 'md:py-[120px]'}`}
        style={{
          borderTop:  BORDER,
          background: tinted ? CARD_BG : undefined,
        }}
      >
        {children}
      </section>
    </ScrollReveal>
  )
}
