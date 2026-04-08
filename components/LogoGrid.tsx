'use client'

import Image from 'next/image'

interface LogoGridProps {
  images: string[]
  animKey: number
  mobile?: boolean
}

export default function LogoGrid({ images, animKey, mobile = false }: LogoGridProps) {
  return (
    <>
      <div
        key={animKey}
        className="w-full grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="w-full relative overflow-hidden rounded-2xl bg-[rgba(15,15,20,1)] group"
            style={{
              paddingBottom: '100%',
              opacity: 0,
              transform: 'translateY(12px) scale(0.97)',
              animation: `logoFade 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 0.04}s forwards`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-[400ms] ease-smooth group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={i < 4 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
    </>
  )
}
