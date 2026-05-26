// MBlog — prelaunch Blog section. Same card grid as the launch site;
// content matches v11 doc: "Blog / Logo & branding tips for your
// business / Practical guides to help you build a brand that stands out."
// CTA: "See all posts →"

import Image from 'next/image'
import Link from 'next/link'

const POSTS: { photo: string; title: string; preview: string; href: string }[] = [
  {
    photo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80&auto=format&fit=crop',
    title: 'Why your logo is your most important brand asset',
    preview:
      'Your logo is often the first impression customers have of your business. Learn why investing in a great logo matters.',
    href: '#',
  },
  {
    photo: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80&auto=format&fit=crop',
    title: 'The psychology of color in logo design',
    preview:
      'Colors evoke emotions and shape perceptions. Discover how to choose the right palette for your brand identity.',
    href: '#',
  },
  {
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop',
    title: '5 logo trends defining 2026',
    preview:
      'From minimalism to dynamic logos, explore the design trends reshaping brand identities this year.',
    href: '#',
  },
]

export default function MBlog() {
  return (
    <section
      id="blog"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 items-center w-full max-w-[1280px] px-2 sm:px-4">
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Blog</p>
          <h2 className="m-h2">Logo &amp; branding tips for your business</h2>
          <p className="m-sub max-w-[680px]">
            Practical guides to help you build a brand that stands out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="m-card-hover flex flex-col group"
              style={{
                background: 'var(--m-surface-alt)',
                border: '1px solid var(--m-border)',
                borderRadius: 'var(--m-radius-xl)',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  borderBottom: '1px solid var(--m-border)',
                }}
              >
                <Image
                  src={post.photo}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-2" style={{ padding: 20 }}>
                <h3
                  className="m-display"
                  style={{
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.3,
                    color: 'var(--m-ink)',
                  }}
                >
                  {post.title}
                </h3>
                <p className="m-body-sm">{post.preview}</p>
                <span
                  className="m-sans"
                  style={{
                    color: 'var(--m-brand)',
                    fontWeight: 600,
                    fontSize: 14,
                    marginTop: 8,
                  }}
                >
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="#"
          className="m-sans"
          style={{
            color: 'var(--m-brand)',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          See all posts →
        </Link>
      </div>
    </section>
  )
}
