// Reviews — 4×2 testimonial grid mirroring HEADSHOT's layout, with the 6
// LOGO.AI testimonials from the original docx + 2 from About Us / Why
// LOGO.AI to fill the 8-card grid.

type Review = {
  title: string
  quote: string
  name: string
  role: string
  initials: string
  avatarBg: string
}

const REVIEWS: Review[] = [
  {
    title: 'Beat my agency',
    quote: 'Sixty seconds. One of them was better than the six my agency sent after three weeks.',
    name: 'Daniel Walsh',
    role: 'Founder, Clearline (Fintech)',
    initials: 'DW',
    avatarBg: '#1E3A8A',
  },
  {
    title: 'No design skills required',
    quote: "I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.",
    name: 'Sarah Mitchell',
    role: 'Founder, Greenleaf Co. (E-commerce)',
    initials: 'SM',
    avatarBg: '#7C2D12',
  },
  {
    title: "Couldn't tell it was AI",
    quote: "I showed three options to my team. They couldn't tell which one was AI. Neither could I.",
    name: 'Michael Reyes',
    role: 'Co-Founder, Beacon Labs (AI tools)',
    initials: 'MR',
    avatarBg: '#0F766E',
  },
  {
    title: 'Three brands, one minute each',
    quote: "I've rebranded three companies. This was the only one that didn't take six weeks.",
    name: 'Chris Donovan',
    role: 'Founder, Bright Harbor (Consulting)',
    initials: 'CD',
    avatarBg: '#9D174D',
  },
  {
    title: '$15K studio quality',
    quote: 'The typography alone looks like it came from a $15K studio. Then I saw the price.',
    name: 'Alex Rivera',
    role: 'Founder, Stack & Field (SaaS)',
    initials: 'AR',
    avatarBg: '#374151',
  },
  {
    title: 'Real design, finally',
    quote: "One input. One minute. Real design. I honestly didn't think this existed yet.",
    name: 'Megan Foster',
    role: 'Founder, Saltline Studio (Creative agency)',
    initials: 'MF',
    avatarBg: '#6D28D9',
  },
  {
    title: "Can't be real",
    quote: "This can't be real. I've paid agencies $20K for worse.",
    name: 'Jake Thompson',
    role: 'Founder, Northstack (B2B SaaS)',
    initials: 'JT',
    avatarBg: '#1F2937',
  },
  {
    title: 'Designed, not assembled',
    quote: "I've used every logo tool out there. This is the first one that actually looks designed, not assembled.",
    name: 'Emily Carter',
    role: 'Founder, Rowan & Rye (DTC)',
    initials: 'EC',
    avatarBg: '#9F1239',
  },
]

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#FFBA00" aria-hidden="true">
          <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.21-4.1 5.82-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ bg, initials }: { bg: string; initials: string }) {
  return (
    <span
      className="m-sans flex w-10 h-10 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: bg, color: '#FFFFFF', fontWeight: 600, fontSize: 14 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="flex flex-col p-6 h-full"
      style={{
        background: 'var(--m-surface-alt)',
        border: '1px solid var(--m-border)',
        borderRadius: 'var(--m-radius-xl)',
        minHeight: 266,
      }}
    >
      <StarRow />
      <h3
        className="mt-4 m-sans"
        style={{ fontWeight: 600, fontSize: 16, lineHeight: '24px', color: 'var(--m-ink)' }}
      >
        {review.title}
      </h3>
      <p className="mt-2 m-body-sm">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <Avatar bg={review.avatarBg} initials={review.initials} />
        <div className="flex flex-col">
          <span className="m-sans" style={{ fontWeight: 600, fontSize: 14, lineHeight: '20px', color: 'var(--m-ink)' }}>
            {review.name}
          </span>
          <span className="m-sans" style={{ fontWeight: 400, fontSize: 13, lineHeight: '18px', color: 'var(--m-text-soft)' }}>
            {review.role}
          </span>
        </div>
      </div>
    </article>
  )
}

export default function MReviews() {
  return (
    <section
      id="reviews"
      className="w-full py-20"
      style={{ background: 'var(--m-surface)' }}
      aria-labelledby="m-reviews-heading"
    >
      <div className="mx-auto flex w-full max-w-[1536px] flex-col px-5 sm:px-10 md:px-16 lg:px-[120px] xl:px-[192px]">
        {/* Eyebrow + heading + subhead */}
        <div className="flex flex-col items-center text-center">
          <span
            className="m-sans"
            style={{
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '20px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: 'var(--m-text-soft)',
            }}
          >
            REVIEWS
          </span>
          <h2 id="m-reviews-heading" className="m-h2 mt-3" style={{ fontSize: 40, lineHeight: '48px', letterSpacing: '-1.2px' }}>
            Trusted by 165,000+ founders
          </h2>
          <p className="mt-3 m-body max-w-[640px]">
            Read what early users are saying about LOGO.AI.
          </p>
        </div>

        {/* 4 × 2 testimonial grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
