'use client'

import Image from 'next/image'

// Order: max contrast between adjacent cards — no similar colors or shapes next to each other
const PORTRAIT_IMAGES = [
  '/images/illustrations/p-restaurant.png',     // Coral — bag
  '/images/illustrations/p-ecommerce-v2.png',   // Violet — laptop
  '/images/illustrations/p-barbershop.png',     // Teal — towel
  '/images/illustrations/p-pet.png',             // Yellow — dog
  '/images/illustrations/p-clothing.png',        // Blue — hang tag
  '/images/illustrations/p-bakery.png',          // Pink — box
  '/images/illustrations/p-landscaping-v2.png',  // Green — cap
  '/images/illustrations/p-tattoo.png',          // Charcoal — card
  '/images/illustrations/p-foodtruck.png',       // Orange — truck
  '/images/illustrations/p-salon-v2.png',        // Lavender — bottle
  '/images/illustrations/p-gym.png',             // Lime — bag
  '/images/illustrations/p-nail-v2.png',         // Mint — hand cream
  '/images/illustrations/p-creator.png',         // Cyan — phone
  '/images/illustrations/p-boutique.png',        // Rose — bag
  '/images/illustrations/p-cleaning.png',        // Sky Blue — van
  '/images/illustrations/p-coffee.png',          // Amber — cup
]

const doubled = [...PORTRAIT_IMAGES, ...PORTRAIT_IMAGES]

export default function LogoCarousel() {
  return (
    <div className="overflow-hidden relative" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', height: 'clamp(300px, 50vw, 400px)' }}>
      {/* fade edges */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(90deg, #0D0D0D 0%, transparent clamp(40px, 10vw, 120px), transparent calc(100% - clamp(40px, 10vw, 120px)), #0D0D0D 100%)',
        }}
      />

      {/* scrolling strip — portrait cards */}
      <div
        className="flex gap-3.5 pt-2 animate-marquee"
        style={{ width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="w-[200px] md:w-[280px] rounded-[20px] flex-shrink-0 overflow-hidden relative bg-[#1A1A1A] group"
            style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
          >
            <Image
              src={src}
              alt=""
              width={768}
              height={1024}
              className="w-full h-auto block transition-transform duration-[400ms] ease-smooth group-hover:scale-[1.06]"
              sizes="250px"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
