// MReviews — v11 "Early Testers" section. Seven testimonials from
// founders/creators who got early access before launch. Each has a
// quote, name, role, location, and avatar photo (Unsplash, faces-
// cropped). First testimonial renders as a featured (larger) card; the
// rest sit in a 2-column grid.

import Image from 'next/image'

type Review = {
  quote: string
  name: string
  role: string
  location: string
  photo: string
}

const FEATURED: Review = {
  quote:
    "I've started 4 businesses. Every time, the logo was a $1,200 conversation with a designer that took three weeks and ended in compromise. I did this in 90 seconds and liked it better than any of them.",
  name: 'Chris Danner',
  role: 'Serial Entrepreneur',
  location: 'San Francisco CA',
  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format&fit=crop&crop=faces',
}

const REVIEWS: Review[] = [
  {
    quote:
      "I've been bootstrapping my bakery for two years and a proper logo was always the thing I kept putting off. Took me 47 seconds and I had something I was actually proud to put on my packaging.",
    name: 'Sarah Callahan',
    role: 'Founder, Little Bloom Bakery',
    location: 'Oakland CA',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote:
      "Honestly I was skeptical. I've tried three other AI logo tools and they all looked like clip art. This one genuinely surprised me — the first batch had two logos I'd have been proud to put on a client deck.",
    name: 'Jake Morrison',
    role: 'Freelance Brand Consultant',
    location: 'San Francisco CA',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote:
      "We needed a logo for our gym's rebrand. I generated 10 options in under a minute and our whole team voted on one. Saved us weeks of back-and-forth with a designer.",
    name: 'Jordan Osei',
    role: 'Co-Founder, Iron South Fitness',
    location: 'San Jose CA',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote:
      "I run a small agency and I've started using this to show clients logo directions before we commit to full branding work. It's become part of our process now.",
    name: 'Aisha Reyes',
    role: 'Creative Director, Studio Reyes',
    location: 'San Francisco CA',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote:
      "My Etsy store had been running for 8 months with a logo I made in Canva at midnight. This replaced it in 60 seconds and I've had three customers ask who did my branding.",
    name: 'Megan Fischer',
    role: 'Maker & Seller, The Clay Shelf',
    location: 'Berkeley CA',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    quote:
      "We're pre-revenue and every dollar matters. Getting a logo that looks like it came from a proper studio — for free — is the kind of thing that actually makes a difference at this stage.",
    name: 'Ravi Menon',
    role: 'Co-Founder, Stackly (YC S25)',
    location: 'San Francisco CA',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80&auto=format&fit=crop&crop=faces',
  },
]

function Avatar({ photo, name, size = 40 }: { photo: string; name: string; size?: number }) {
  return (
    <Image
      src={photo}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
      unoptimized
    />
  )
}

function StarRow({ size = 16 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" style={{ fill: 'var(--m-star)' }} aria-hidden="true">
          <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.21-4.1 5.82-.84L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function PersonLine({ r, size = 40 }: { r: Review; size?: number }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <Avatar photo={r.photo} name={r.name} size={size} />
      <div className="flex flex-col">
        <span
          className="m-sans"
          style={{ fontWeight: 700, fontSize: 15, lineHeight: '20px', color: 'var(--m-ink)' }}
        >
          {r.name}
        </span>
        <span
          className="m-sans"
          style={{ fontWeight: 400, fontSize: 13, lineHeight: '18px', color: 'var(--m-text-muted)' }}
        >
          {r.role} — {r.location}
        </span>
      </div>
    </div>
  )
}

export default function MReviews() {
  return (
    <section
      id="reviews"
      className="w-full py-14 sm:py-20 md:py-[100px]"
      style={{ background: 'var(--m-surface)' }}
      aria-labelledby="m-reviews-heading"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col px-5 sm:px-10 md:px-16 lg:px-[96px]">
        <div className="flex flex-col items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Early Access</p>
          <h2 id="m-reviews-heading" className="m-h2 mt-3">
            What our first users are saying
          </h2>
          <p className="mt-3 m-sub max-w-[640px]">
            A few founders and creators who got early access before launch.
          </p>
        </div>

        <article
          className="mt-12 flex flex-col gap-5 p-8 md:p-10"
          style={{
            background: 'var(--m-brand-bg)',
            border: '1px solid var(--m-brand-soft)',
            borderRadius: 'var(--m-radius-xl)',
          }}
        >
          <StarRow size={20} />
          <p
            className="m-body"
            style={{ fontSize: 19, lineHeight: '30px', color: 'var(--m-text)' }}
          >
            &ldquo;{FEATURED.quote}&rdquo;
          </p>
          <PersonLine r={FEATURED} size={48} />
        </article>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <p
                className="mt-4 m-body-sm"
                style={{ fontSize: 15, lineHeight: '23px', color: 'var(--m-text)' }}
              >
                &ldquo;{r.quote}&rdquo;
              </p>
              <PersonLine r={r} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
