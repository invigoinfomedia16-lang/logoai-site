'use client'

import { useState } from 'react'
import Badge from './ui/Badge'
import CategoryTabs from './CategoryTabs'
import MockupCarousel from './MockupCarousel'
import { getMockupImages } from '@/data'

export default function MockupSection() {
  const [active, setActive] = useState('restaurant')

  return (
    <section className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]">
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="magnify" text="Built to scale" />
          <h2 className="font-bricolage font-medium text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1em] tracking-[-0.04em] m-0">
            From websites to packaging
          </h2>
          <p className="font-bricolage font-medium text-base sm:text-lg leading-7 tracking-[-0.02em] text-white/50 m-0">
            Your logo looks sharp everywhere – social media, business cards,
            signage, and more.
          </p>
        </div>

        <CategoryTabs active={active} onSelect={setActive} />

        <MockupCarousel images={getMockupImages(active)} category={active} />
      </div>
    </section>
  )
}
