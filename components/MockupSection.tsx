'use client'

import { useState, useEffect, useCallback } from 'react'
import Badge from './ui/Badge'
import CategoryTabs from './CategoryTabs'
import MockupCarousel from './MockupCarousel'
import { getMockupImages } from '@/data'

export default function MockupSection() {
  const [active, setActive] = useState('restaurant')
  const [slideIndex, setSlideIndex] = useState(0)
  const images = getMockupImages(active)

  const handleSlideChange = useCallback((i: number) => {
    setSlideIndex(i)
  }, [])

  useEffect(() => {
    setSlideIndex(0)
  }, [active])

  return (
    <section className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]">
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="magnify" text="Built to scale" />
          <h2 className="font-bricolage font-semibold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1em] tracking-[-0.03em] m-0">
            From websites to packaging
          </h2>
          <p className="font-inter font-normal text-base sm:text-lg leading-7 text-white/50 m-0">
            Your logo looks sharp everywhere – social media, business cards,
            signage, and more.
          </p>
        </div>

        <CategoryTabs active={active} onSelect={setActive} />

        {/* Blue → Dark gradient frame */}
        <div className="w-full relative rounded-[16px] md:rounded-[20px] overflow-hidden" style={{ padding: 'clamp(16px, 4vw, 48px)' }}>
          <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, #336AEA 0%, #1A4FD0 40%, #0D1A3D 100%)' }} />

          {/* Carousel inside frame — dots hidden */}
          <div className="relative z-10 rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <MockupCarousel images={images} category={active} hideDots onSlideChange={handleSlideChange} />
          </div>
        </div>

        {/* Dots below the frame */}
        <div className="flex gap-2 items-center justify-center">
          {images.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-[400ms] ease-smooth"
              style={{
                width: i === slideIndex ? 24 : 8,
                background: i === slideIndex ? '#336AEA' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
