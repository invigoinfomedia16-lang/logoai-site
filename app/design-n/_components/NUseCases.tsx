// Use Cases — three groups of "where customers use their logo" rendered
// as horizontal bars (wide rows, icon-left + text-right) stacked under
// each group label. All bars are full-width so sizing is perfectly
// uniform across all 10 items. Copy from the LOGOAI landing-page doc,
// section 8.

import {
  Globe,
  Smartphone,
  Mail,
  ShoppingCart,
  Presentation,
  FileText,
  Megaphone,
  IdCard,
  Building2,
  Package,
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
    ],
  },
]

function UseCaseBar({ item }: { item: UseCase }) {
  const { Icon } = item
  return (
    <div
      className="flex items-start gap-4 px-5 py-4"
      style={{
        background: 'var(--m-surface-alt)',
        borderRadius: 'var(--m-radius-md)',
      }}
    >
      <span
        aria-hidden="true"
        className="shrink-0"
        style={{
          display: 'inline-flex',
          color: 'var(--m-brand)',
          marginTop: 2,
        }}
      >
        <Icon size={26} strokeWidth={1.6} />
      </span>
      <div className="flex flex-col gap-1 min-w-0">
        <h4
          className="m-display"
          style={{
            fontWeight: 600,
            fontSize: 17,
            lineHeight: '22px',
            color: 'var(--m-ink)',
          }}
        >
          {item.title}
        </h4>
        <p className="m-body-sm">{item.body}</p>
      </div>
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

        {/* Sub-groups — each group is a label + a vertical stack of full-
            width bars. All bars uniform across the whole section since
            they're all the same width regardless of which group. */}
        <div className="flex flex-col gap-10 w-full max-w-[880px] mx-auto">
          {GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3 w-full">
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
              <div className="flex flex-col gap-2 w-full">
                {group.items.map((item) => (
                  <UseCaseBar key={item.title} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
