'use client'

import Image from 'next/image'

const PRODUCT_IMAGES = [
  '/images/illustrations/product-restaurant.webp',
  '/images/illustrations/product-coffee.webp',
  '/images/illustrations/product-bakery.webp',
  '/images/illustrations/product-foodtruck.webp',
  '/images/illustrations/product-barbershop.webp',
  '/images/illustrations/product-salon.webp',
  '/images/illustrations/product-nail.webp',
  '/images/illustrations/product-boutique.webp',
  '/images/illustrations/product-clothing.webp',
  '/images/illustrations/product-gym.webp',
  '/images/illustrations/product-cleaning.webp',
  '/images/illustrations/product-landscaping.webp',
  '/images/illustrations/product-pet.webp',
  '/images/illustrations/product-ecommerce.webp',
  '/images/illustrations/product-creator.webp',
  '/images/illustrations/product-tattoo.webp',
]

const doubled = [...PRODUCT_IMAGES, ...PRODUCT_IMAGES]

export default function LogoCarousel() {
  return (
    <div className="h-[340px] overflow-hidden relative" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
      {/* fade edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, #0D0D0D 0%, transparent 120px, transparent calc(100% - 120px), #0D0D0D 100%)',
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
            className="w-[310px] h-[310px] rounded-[16px] flex-shrink-0 overflow-hidden relative bg-[#1A1A1A] group"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-[400ms] ease-smooth group-hover:scale-[1.04]"
              sizes="310px"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
