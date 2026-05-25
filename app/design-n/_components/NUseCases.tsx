// Use Cases — three groups of "where customers use their logo" rendered
// as a 4-card grid per group (3 groups × 4 cards = 12 total). Each card
// uses the standalone icon + lifted --m-surface-alt background pattern.
// Copy from the LOGOAI landing-page doc, section 8, with one additional
// card per shorter group so all rows fill evenly.

import {
  Globe,
  Smartphone,
  Mail,
  ShoppingCart,
  Presentation,
  FileText,
  Megaphone,
  Video,
  IdCard,
  Building2,
  Package,
  Truck,
  type LucideIcon,
} from 'lucide-react'

type UseCase = { Icon: LucideIcon; title: string; body: string }
type Group = { title: string; items: UseCase[] }

const GROUPS: Group[] = [
  {
    title: 'Your Digital Presence',
    items: [
      {
        Icon: Globe,
        title: 'Website & landing pages',
        body: 'The first thing visitors see — make a polished impression in the header, footer, and browser tab icon.',
      },
      {
        Icon: Smartphone,
        title: 'Social media profiles',
        body: 'Instagram, Facebook, LinkedIn, X — a clean profile picture that looks consistent everywhere.',
      },
      {
        Icon: Mail,
        title: 'Email signatures',
        body: 'Add your brand to every email you send — clients and prospects remember a polished look.',
      },
      {
        Icon: ShoppingCart,
        title: 'Your online store',
        body: 'Shopify, Etsy, your own site — branded storefronts convert better.',
      },
    ],
  },
  {
    title: 'Marketing & Sales',
    items: [
      {
        Icon: Presentation,
        title: 'Pitch decks & proposals',
        body: 'Look the part on every slide, cover page, and one-pager you send to clients or investors.',
      },
      {
        Icon: FileText,
        title: 'Invoices & contracts',
        body: 'Branded paperwork looks more credible — and gets paid faster.',
      },
      {
        Icon: Megaphone,
        title: 'Ads & social posts',
        body: 'A consistent logo across ads builds recognition over time.',
      },
      {
        Icon: Video,
        title: 'Webinars & online events',
        body: 'Slide decks, registration pages, and replay landing pages — branded end to end.',
      },
    ],
  },
  {
    title: 'Physical & Print',
    items: [
      {
        Icon: IdCard,
        title: 'Business cards & print',
        body: 'Your logo prints sharp on business cards, brochures, and flyers.',
      },
      {
        Icon: Building2,
        title: 'Storefront signage',
        body: 'Your logo stays sharp at any size — from window decals to giant signs.',
      },
      {
        Icon: Package,
        title: 'Packaging & products',
        body: 'Boxes, labels, tags, merch — full commercial license means you can put your logo on anything.',
      },
      {
        Icon: Truck,
        title: 'Vehicle wraps & fleet',
        body: 'Delivery vans, branded company cars, food trucks — your logo on the move builds local recognition.',
      },
    ],
  },
]

function UseCaseCard({ item }: { item: UseCase }) {
  const { Icon } = item
  return (
    <div
      className="flex flex-col gap-2 p-6"
      style={{
        background: 'var(--n-usecase-card-bg, transparent)',
        border: 'var(--n-usecase-card-border, 1px solid var(--m-border))',
        borderRadius: 'var(--m-radius-md)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          color: 'var(--m-brand)',
          marginBottom: 14,
        }}
      >
        <Icon size={30} strokeWidth={1.6} />
      </span>
      <h4
        className="m-display"
        style={{
          fontWeight: 600,
          fontSize: 18,
          lineHeight: '24px',
          color: 'var(--m-ink)',
        }}
      >
        {item.title}
      </h4>
      <p className="m-body-sm">{item.body}</p>
    </div>
  )
}

export default function NUseCases() {
  return (
    <section
      id="use-cases"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 items-center w-full max-w-[1280px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Where People Use Their Logo</p>
          <h2 className="m-h2">Wherever your brand shows up</h2>
          <p className="m-sub max-w-[720px]">
            Your logo is the face of your business. Here&apos;s where our customers use theirs.
          </p>
        </div>

        {/* Sub-groups — each group is a label + a uniform 4-card grid.
            All groups have exactly 4 items so every row fills evenly,
            no orphan cards or empty cells. */}
        <div className="flex flex-col gap-12 w-full">
          {GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-4 w-full">
              <h3
                className="m-sans"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--m-text-muted)',
                  marginBottom: 4,
                }}
              >
                {group.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
                {group.items.map((item) => (
                  <UseCaseCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
