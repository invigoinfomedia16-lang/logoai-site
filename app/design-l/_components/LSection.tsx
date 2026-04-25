// Standard section wrapper — matches the L homepage pattern exactly:
//   <section className="px-6 md:px-10 py-24 md:py-32" style={{ background }}>
//     <div className="max-w-[1100px] mx-auto">...</div>
//   </section>
// Three tones: 'light' (white), 'alt' (lilac #F5F0FF), 'dark' (Tolopea #210340).

import type { ReactNode } from 'react'

type Tone = 'light' | 'alt' | 'dark'

export default function LSection({
  tone = 'light',
  id,
  hero = false,
  bottomCta = false,
  children,
}: {
  tone?: Tone
  id?: string
  /** Marks this section as the page hero (used by LNav to drive sticky behavior). */
  hero?: boolean
  /** Marks this section as the closing bottom CTA (used by LNav to hide when reached). */
  bottomCta?: boolean
  children: ReactNode
}) {
  const bg = tone === 'dark' ? '#210340' : tone === 'alt' ? '#F5F0FF' : '#FFFFFF'
  const color = tone === 'dark' ? '#FFFFFF' : '#15141A'
  return (
    <section
      id={id}
      data-l-hero={hero ? '' : undefined}
      data-l-bottom-cta={bottomCta ? '' : undefined}
      className="px-5 sm:px-6 md:px-10 py-14 sm:py-20 md:py-32"
      style={{ background: bg, color }}
    >
      <div className="max-w-[1100px] mx-auto">{children}</div>
    </section>
  )
}
