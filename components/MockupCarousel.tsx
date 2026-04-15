'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface MockupCarouselProps {
  images: string[]
  category: string
  hideDots?: boolean
  onSlideChange?: (index: number) => void
}

export default function MockupCarousel({ images, category, hideDots, onSlideChange }: MockupCarouselProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [category])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % images.length
        onSlideChange?.(next)
        return next
      })
    }, 4000)
    return () => clearInterval(id)
  }, [images.length, category, onSlideChange])

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div
        className="w-full relative overflow-hidden rounded-xl bg-[#111]"
        style={{ aspectRatio: '1460/760' }}
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

      {!hideDots && (
        <div className="flex gap-2.5 items-center justify-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="h-2 rounded-full cursor-pointer transition-all duration-[400ms] ease-smooth border-0"
              style={{
                width: i === active ? 24 : 8,
                background: i === active ? '#336AEA' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
