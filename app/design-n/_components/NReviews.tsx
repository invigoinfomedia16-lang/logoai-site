// Reviews Wall — featured review + grid of shorter reviews. Copy from the
// LOGOAI landing-page doc, section 7. Testimonials drawn from LOGO.AI's
// existing customer quotes.

type Review = {
  title: string
  quote: string
  name: string
  role: string
  initials: string
  avatarBg: string
}

const FEATURED: Review = {
  title: 'Beat my agency in 60 seconds',
  quote:
    "I'd been quoted $2,400 and three weeks by a branding agency. I ran Logo.AI on a whim while waiting for their proposal — and one of the ten logos it generated was better than anything they showed me later. I previewed it on a business card and a storefront mockup before paying a cent. Paid $49, downloaded the vector files, done. My agency still hasn't sent the invoice.",
  name: 'Daniel Walsh',
  role: 'Founder, Clearline — Fintech',
  initials: 'DW',
  avatarBg: '#1E3A8A',
}

const REVIEWS: Review[] = [
  {
    title: 'No design skills required',
    quote: "I'm not a designer and didn't have to be. I typed two sentences and got logos that looked studio-made.",
    name: 'Sarah Mitchell',
    role: 'Owner, Greenleaf Co. — Retail',
    initials: 'SM',
    avatarBg: '#7C2D12',
  },
  {
    title: "Couldn't tell it was AI",
    quote: 'Showed three options to my team. Nobody could tell which were AI. Neither could I.',
    name: 'Michael Reyes',
    role: 'Co-Founder, Beacon Labs — SaaS',
    initials: 'MR',
    avatarBg: '#0F766E',
  },
  {
    title: 'Previewed before paying',
    quote: 'Seeing it on a mockup storefront before paying sealed it. Paid $49, never looked back.',
    name: 'Chris Donovan',
    role: 'Founder, Bright Harbor — Agency',
    initials: 'CD',
    avatarBg: '#9D174D',
  },
  {
    title: '$15K studio quality',
    quote: 'The typography alone looks like a $15K studio made it. Then I saw the one-time price.',
    name: 'Alex Rivera',
    role: 'Founder, Stack & Field — E-commerce',
    initials: 'AR',
    avatarBg: '#374151',
  },
  {
    title: 'Generated until I loved it',
    quote: "First batch wasn't quite right, so I generated again — free. Third batch nailed it.",
    name: 'Megan Foster',
    role: 'Founder, Saltline Studio — Creative',
    initials: 'MF',
    avatarBg: '#6D28D9',
  },
  {
    title: 'Vector files included',
    quote: 'SVG, PDF, EPS — everything my printer asked for, included in the $49. No upsells.',
    name: 'Emily Carter',
    role: 'Owner, Rowan & Rye — DTC',
    initials: 'EC',
    avatarBg: '#9F1239',
  },
]

function StarRow({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#FFBA00" aria-hidden="true">
          <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.21-4.1 5.82-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ bg, initials, size = 40 }: { bg: string; initials: string; size?: number }) {
  return (
    <span
      className="m-sans flex shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: bg, color: '#FFFFFF', fontWeight: 600, fontSize: size * 0.36, width: size, height: size }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export default function NReviews() {
  return (
    <section
      id="reviews"
      className="w-full py-14 sm:py-20 md:py-[100px]"
      style={{ background: 'var(--m-surface)' }}
      aria-labelledby="n-reviews-heading"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-5 sm:px-10 md:px-16 lg:px-[96px]">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>
            4.9/5 ★ • Over 12,000 Reviews
          </p>
          <h2 id="n-reviews-heading" className="m-h2 mt-3">
            See what our customers say
          </h2>
          <p className="mt-3 m-sub max-w-[640px]">
            Real reviews from real founders, business owners, and creators. Read a few, then decide.
          </p>
        </div>

        {/* Featured review */}
        <article
          className="mt-12 flex flex-col gap-5 p-8 md:p-10"
          style={{
            background: 'var(--m-brand-bg)',
            border: '1px solid var(--m-brand-soft)',
            borderRadius: 'var(--m-radius-xl)',
          }}
        >
          <StarRow size={20} />
          <h3 className="m-h3" style={{ color: 'var(--m-ink)' }}>{FEATURED.title}</h3>
          <p className="m-body" style={{ fontSize: 18, lineHeight: '29px', color: 'var(--m-text)' }}>
            &ldquo;{FEATURED.quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <Avatar bg={FEATURED.avatarBg} initials={FEATURED.initials} size={48} />
            <div className="flex flex-col">
              <span className="m-sans" style={{ fontWeight: 700, fontSize: 15, color: 'var(--m-ink)' }}>
                {FEATURED.name}
              </span>
              <span className="m-sans" style={{ fontWeight: 400, fontSize: 13, color: 'var(--m-text-soft)' }}>
                {FEATURED.role}
              </span>
            </div>
          </div>
        </article>

        {/* Review grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="m-card-hover flex flex-col p-6 h-full"
              style={{
                background: 'var(--m-surface-alt)',
                borderRadius: 'var(--m-radius-xl)',
              }}
            >
              <StarRow />
              <h3 className="mt-4 m-sans" style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', color: 'var(--m-ink)' }}>
                {r.title}
              </h3>
              <p className="mt-2 m-body-sm">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-4">
                <Avatar bg={r.avatarBg} initials={r.initials} />
                <div className="flex flex-col">
                  <span className="m-sans" style={{ fontWeight: 600, fontSize: 14, lineHeight: '20px', color: 'var(--m-ink)' }}>
                    {r.name}
                  </span>
                  <span className="m-sans" style={{ fontWeight: 400, fontSize: 13, lineHeight: '18px', color: 'var(--m-text-soft)' }}>
                    {r.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
