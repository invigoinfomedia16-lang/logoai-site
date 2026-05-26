// Built For — 2x2 audience-card grid. Copy from the LOGOAI landing-page
// doc, section 5.

import { Rocket, Store, Briefcase, ShoppingBag, type LucideIcon } from 'lucide-react'

const ITEMS: { Icon: LucideIcon; title: string; body: string }[] = [
  {
    Icon: Rocket,
    title: 'Founders launching startups',
    body: 'Get a professional brand identity for your launch — fast, affordable, and ready for investors.',
  },
  {
    Icon: Store,
    title: 'Small business owners',
    body: 'Restaurants, shops, services — get a logo that matches your industry and looks polished anywhere.',
  },
  {
    Icon: Briefcase,
    title: 'Agencies & freelancers',
    body: 'Deliver client logos in 60 seconds instead of weeks. Built-in commercial license means you can use them for any client.',
  },
  {
    Icon: ShoppingBag,
    title: 'Online store owners',
    body: 'Brand your Shopify, Etsy, or your own site with a logo that converts.',
  },
]

export default function NBuiltFor() {
  return (
    <section
      id="built-for"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 items-center w-full max-w-[1100px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Made For</p>
          <h2 className="m-h2">Built for the people building real businesses</h2>
          <p className="m-sub max-w-[680px]">
            Whatever you&apos;re starting or running, our AI creates a logo that fits.
          </p>
        </div>

        {/* 2x2 audience grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {ITEMS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="m-card-hover flex items-start gap-4 p-6"
              style={{
                background: 'var(--m-surface-alt)',
                borderRadius: 'var(--m-radius-xl)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-flex',
                  color: 'var(--m-brand)',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <Icon size={30} strokeWidth={1.6} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3
                  className="m-display"
                  style={{ fontWeight: 600, fontSize: 18, lineHeight: '24px', color: 'var(--m-ink)' }}
                >
                  {title}
                </h3>
                <p className="m-body-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
