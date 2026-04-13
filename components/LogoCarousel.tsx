'use client'

import Image from 'next/image'
import { CAROUSEL_IMAGES } from '@/data'

const doubled = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES]

export default function LogoCarousel() {
  return (
    <div className="h-[260px] overflow-hidden relative" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
      {/* fade edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, rgb(0,0,0) 0%, transparent 120px, transparent calc(100% - 120px), rgb(0,0,0) 100%)',
        }}
      />

      {/* scrolling strip */}
      <div
        className="flex gap-4 pt-2.5 animate-marquee"
        style={{ width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="w-[280px] h-[240px] rounded-[14px] flex-shrink-0 overflow-hidden relative bg-[rgba(15,15,20,1)] group"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-[400ms] ease-smooth group-hover:scale-[1.04]"
              sizes="280px"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
