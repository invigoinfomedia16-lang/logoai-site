'use client'

// MLpUseCases — Use Cases section. Renders the same 3-stacked-group
// markup (.uc-group / .uc-grid / .uc-card) in every theme mode. Custom
// mode styles those classes as icon-led tiles with hover-reveal
// descriptions via page.tsx CSS overrides.

import {
  Globe, Smartphone, Mail, ShoppingCart,
  Presentation, FileText, Megaphone, MailOpen,
  IdCard, Building2, Package, Flag,
  type LucideIcon,
} from 'lucide-react'

type UseCase = { Icon: LucideIcon; t: string; d: string }

const GROUPS: { group: string; items: UseCase[] }[] = [
  {
    group: 'Your Digital Presence',
    items: [
      { Icon: Globe,        t: 'Website & landing pages',  d: 'The first thing visitors see — make a polished impression in the header, footer, and browser tab icon.' },
      { Icon: Smartphone,   t: 'Social media profiles',    d: 'Instagram, Facebook, LinkedIn, X — a clean profile picture that looks consistent everywhere.' },
      { Icon: Mail,         t: 'Email signatures',         d: 'Add your brand to every email you send — clients and prospects remember a polished look.' },
      { Icon: ShoppingCart, t: 'Your online store',        d: 'Shopify, Etsy, your own site — branded storefronts convert better.' },
    ],
  },
  {
    group: 'Marketing & Sales',
    items: [
      { Icon: Presentation, t: 'Pitch decks & proposals',          d: 'Look the part on every slide, cover page, and one-pager you send to clients or investors.' },
      { Icon: FileText,     t: 'Invoices & contracts',             d: 'Branded paperwork looks more credible — and gets paid faster.' },
      { Icon: Megaphone,    t: 'Ads & social posts',               d: 'A consistent logo across ads builds recognition over time.' },
      { Icon: MailOpen,     t: 'Email campaigns & newsletters',    d: 'Branded marketing emails feel more professional — and stand out in crowded inboxes.' },
    ],
  },
  {
    group: 'Physical & Print',
    items: [
      { Icon: IdCard,    t: 'Business cards & print',  d: 'Your logo prints sharp on business cards, brochures, and flyers.' },
      { Icon: Building2, t: 'Storefront signage',      d: 'Your logo stays sharp at any size — from window decals to giant signs.' },
      { Icon: Package,   t: 'Packaging & products',    d: 'Boxes, labels, tags, merch — full commercial license means you can put your logo on anything.' },
      { Icon: Flag,      t: 'Event banners & posters', d: 'Stand out at trade shows, pop-ups, and conferences with a logo that holds up at any size.' },
    ],
  },
]

export default function MLpUseCases() {
  return (
    <>
      {GROUPS.map((g) => (
        <div key={g.group} className="uc-group">
          <div className="uc-group-title">{g.group}</div>
          <div className="uc-grid">
            {g.items.map(({ Icon, t, d }) => (
              <div key={t} className="uc-card">
                <span className="uc-icon"><Icon size={20} strokeWidth={1.6} /></span>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
