'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface MockupCarouselProps {
  images: string[]
  category: string
}

export default function MockupCarousel({ images, category }: MockupCarouselProps) {
  const [active, setActive] = useState(0)

  // Reset on category change
  useEffect(() => {
    setActive(0)
  }, [category])

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(id)
  }, [images.length, category])

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* Blue banner frame */}
      <div
        className="w-full rounded-[32px] md:rounded-[48px]"
        style={{ background: 'rgb(0,0,255)', padding: 'clamp(16px, 3vw, 40px)' }}
      >
        <div
          className="w-full relative overflow-hidden rounded-2xl md:rounded-[28px]"
          style={{ height: 'clamp(240px, 45vw, 560px)' }}
        >
          {images.map((src, i) => (
            <Image
              key={category + '-' + i}
              src={src}
              alt=""
              fill
              className="object-cover transition-all duration-700 ease-smooth"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? 'scale(1)' : 'scale(1.04)',
              }}
              sizes="100vw"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2.5 items-center justify-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-2.5 rounded-[5px] cursor-pointer transition-all duration-[400ms] ease-smooth border-0"
            style={{
              width: i === active ? 36 : 10,
              background:
                i === active
                  ? 'linear-gradient(90deg, rgba(0,0,255,1), rgba(80,120,255,1))'
                  : 'rgba(255,255,255,0.15)',
              border: i === active ? 'none' : '1px solid rgba(255,255,255,0.06)',
              boxShadow: i === active ? '0 0 12px rgba(0,0,255,0.4)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}
