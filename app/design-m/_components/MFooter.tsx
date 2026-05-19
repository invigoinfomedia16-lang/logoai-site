// Footer — dark Tolopea-style HEADSHOT footer adapted to LOGO.AI's nav
// taxonomy: Popular Logos, All Industries, Company, Resources, Legal.

const POPULAR_LOGOS = [
  'Restaurant Logos',
  'Coffee Shop Logos',
  'Bakery Logos',
  'Boutique Logos',
  'Gym Logos',
]

const ALL_INDUSTRIES = [
  'Restaurant', 'Coffee Shop', 'Bakery', 'Food Truck',
  'Barbershop', 'Hair Salon', 'Nail Studio', 'Boutique',
  'Clothing Brand', 'Gym', 'Cleaning Service', 'Landscaping',
  'Pet Grooming', 'E-commerce', 'Content Creator', 'Tattoo Studio',
  'Bar', 'Brewery', 'Catering', 'Consulting',
  'Real Estate', 'Photography', 'Wedding', 'Yoga Studio',
]

const COMPANY = ['About Us', 'Our Story', 'Leadership', 'Press', 'Contact']
const RESOURCES = ['How it works', 'Examples', 'Reviews', 'Pricing', 'FAQ', 'Blog']
const LEGAL = ['Terms of Service', 'Privacy Policy', 'Cookie Policy']

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="m-display"
      style={{
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textTransform: 'uppercase',
        color: 'var(--m-text-on-dark)',
      }}
    >
      {children}
    </h4>
  )
}

function LinkList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 items-start w-full">
      {items.map((item) => (
        <li key={item} className="flex flex-col items-start py-0.5 w-full">
          <a
            href="#"
            className="m-sans"
            style={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              color: 'var(--m-text-on-dark-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function MFooter() {
  return (
    <footer
      className="flex flex-col items-start px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'rgba(0,0,0,0.95)' }}
    >
      <div className="flex flex-col gap-12 items-start w-full max-w-[1728px] px-2 sm:px-8 py-12">
        {/* Logo row */}
        <div className="w-full">
          <a href="/design-m" className="flex items-center gap-1.5">
            <span
              style={{
                fontFamily: 'var(--m-font-wordmark), serif',
                fontSize: 26,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
              }}
            >
              LOGO<span style={{ color: 'var(--m-brand)' }}>.</span>AI
            </span>
          </a>
        </div>

        {/* Columns grid — collapses on mobile */}
        <div className="grid w-full grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-x-8 gap-y-10 items-start">
          {/* Col 1 */}
          <div className="flex flex-col gap-4 items-start w-full">
            <ColumnHeading>Popular Logos</ColumnHeading>
            <LinkList items={POPULAR_LOGOS} />
          </div>

          {/* Col 2 — wide, 3-col internal grid */}
          <div className="flex flex-col gap-4 items-start w-full">
            <ColumnHeading>All Industries</ColumnHeading>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 w-full">
              {ALL_INDUSTRIES.map((item) => (
                <li key={item} className="flex flex-col items-start py-0.5 w-full">
                  <a
                    href="#"
                    className="m-sans"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '20px',
                      color: 'var(--m-text-on-dark-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — three sub-stacks */}
          <div className="flex flex-col gap-9 items-start w-full">
            <div className="flex flex-col gap-4 items-start w-full">
              <ColumnHeading>Company</ColumnHeading>
              <LinkList items={COMPANY} />
            </div>
            <div className="flex flex-col gap-4 items-start w-full">
              <ColumnHeading>Resources</ColumnHeading>
              <LinkList items={RESOURCES} />
            </div>
            <div className="flex flex-col gap-4 items-start w-full">
              <ColumnHeading>Legal</ColumnHeading>
              <LinkList items={LEGAL} />
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          className="flex flex-col items-start w-full pt-8 border-t"
          style={{ borderColor: 'var(--m-border-dark)' }}
        >
          <p
            className="m-sans w-full"
            style={{
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '20px',
              color: 'var(--m-text-on-dark-muted)',
            }}
          >
            Copyright © 2026 LOGO.AI, Inc. All rights reserved. LOGO.AI is an independent service.
          </p>
        </div>
      </div>
    </footer>
  )
}
