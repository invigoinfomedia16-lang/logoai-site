'use client'

// Blog (Insights) — featured post + list of latest posts + categories + newsletter.
// Copy verbatim from CONTENT/NEW/BLOG.docx.

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'

const FEATURED = {
  title: 'Why your first logo matters more than you think',
  excerpt: "The difference between a forgettable startup and one people remember often comes down to the first visual impression. Here's why your founding logo is a bigger decision than most founders treat it as.",
  meta: '8 min read · By the LOGO.AI team',
  href: '#',
}

const POSTS = [
  {
    title: 'How AI learned to design a logo',
    excerpt: "Two and a half years. 100,000+ logos analyzed. Thousands of training hours. Here's the inside story of teaching AI to design the way real designers do.",
    meta: '12 min read · By Abhinav Reddy, Co-Founder',
    href: '#',
  },
  {
    title: 'The real cost of a bad logo',
    excerpt: "Most founders don't realize they're paying twice — once for the logo they don't love, and again when they have to rebrand 18 months later. Here's how to avoid it.",
    meta: '6 min read · By the LOGO.AI team',
    href: '#',
  },
  {
    title: 'What makes a logo actually work (not just look nice)',
    excerpt: "A pretty logo and a functional logo aren't the same thing. Here's the difference — and why only one of them holds up at 16 pixels and 16 feet.",
    meta: '10 min read · By the LOGO.AI team',
    href: '#',
  },
  {
    title: 'How to describe your brand to an AI',
    excerpt: "The quality of your logo depends on the quality of your prompt. Here's how to write a brand description that helps AI nail it on the first try.",
    meta: '5 min read · By the LOGO.AI team',
    href: '#',
  },
  {
    title: 'The six-week logo is dead',
    excerpt: "For thirty years, the industry pretended six weeks of back-and-forth was the \"right\" amount of time to design a logo. AI just proved otherwise.",
    meta: '7 min read · By Ashwin Reddy, Co-Founder',
    href: '#',
  },
]

const CATEGORIES = ['Branding', 'AI Design', 'Founder Stories', 'How-To Guides', 'Industry News']

export default function BlogPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Insights</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            Tips, trends, and inspiration
          </p>
          <p className="dk-body-lg max-w-[680px]" style={{ color: 'rgba(21,20,26,0.7)' }}>
            Fresh takes on branding, AI design, and what makes a logo work — straight from the team building the future of logo design.
          </p>
        </div>
      </LSection>

      {/* Featured */}
      <LSection tone="alt">
        <div className="max-w-[900px] mx-auto">
          <Link href={FEATURED.href} className="block no-underline">
            <article
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                padding: 'clamp(32px, 5vw, 56px)',
                border: '1px solid rgba(32,18,58,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              className="hover:shadow-lg flex flex-col items-center text-center"
            >
              <p className="dk-eyebrow mb-5" style={{ color: '#7543E3' }}>Featured</p>
              <h2 className="dk-h2 mb-4 max-w-[680px]" style={{ color: '#15141A' }}>{FEATURED.title}</h2>
              <p className="dk-body-lg mb-5 max-w-[620px]" style={{ color: 'rgba(21,20,26,0.7)' }}>{FEATURED.excerpt}</p>
              <p className="dk-caption mb-5" style={{ color: 'rgba(21,20,26,0.55)' }}>{FEATURED.meta}</p>
              <span
                className="l-card-link inline-flex items-center gap-1.5"
                style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', fontWeight: 600 }}
              >
                Read more <ArrowRight weight="bold" size={14} />
              </span>
            </article>
          </Link>
        </div>
      </LSection>

      {/* Latest posts */}
      <LSection>
        <LSectionHeader eyebrow="Latest posts" title="Fresh from the team" />
        <div className="max-w-[900px] mx-auto flex flex-col gap-5">
          {POSTS.map((p, i) => (
            <Link key={i} href={p.href} className="block no-underline">
              <article
                className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
                style={{
                  background: '#F5F0FF',
                  borderRadius: 16,
                  padding: 'clamp(24px, 3vw, 36px)',
                  border: '1px solid rgba(32,18,58,0.08)',
                }}
              >
                <div className="flex-1 flex flex-col gap-3">
                  <h3 className="dk-h3 m-0" style={{ color: '#15141A' }}>{p.title}</h3>
                  <p className="dk-body m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{p.excerpt}</p>
                  <p className="dk-caption m-0" style={{ color: 'rgba(21,20,26,0.55)' }}>{p.meta}</p>
                </div>
                <span
                  className="l-card-link inline-flex items-center gap-1.5 flex-shrink-0"
                  style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '15px', fontWeight: 600 }}
                >
                  Read more <ArrowRight weight="bold" size={14} />
                </span>
              </article>
            </Link>
          ))}
        </div>

        {/* Browse by category — sits inside the Latest posts section as a footer row */}
        <div className="max-w-[820px] mx-auto text-center mt-16">
          <p className="dk-eyebrow mb-5 inline-block" style={{ color: '#7543E3' }}>Browse by category</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c) => (
              <a key={c} href="#" className="l-pill">{c}</a>
            ))}
          </div>
        </div>
      </LSection>

      {/* Newsletter — light section matching LBottomCTA palette */}
      <LSection tone="alt">
        <div className="max-w-[720px] mx-auto flex flex-col items-center text-center">
          <h2 className="dk-h2 mb-5" style={{ color: '#15141A' }}>
            Get new posts in your inbox
          </h2>
          <p className="dk-body-lg mb-8" style={{ color: 'rgba(21,20,26,0.7)' }}>
            One email a week. Branding tips, design principles, and behind-the-scenes from the LOGO.AI team. No spam.
          </p>
          <form
            className="w-full max-w-[480px] flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 outline-none"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(32,18,58,0.12)',
                borderRadius: 9999,
                padding: '12px 20px',
                color: '#15141A',
                fontFamily: "'Mozilla Text', sans-serif",
                fontSize: '15px',
              }}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
              style={{
                background: '#7543E3',
                color: '#FFFFFF',
                fontFamily: "'Mozilla Text', sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                padding: '14px 28px',
                border: '1px solid #7543E3',
                borderRadius: 9999,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#6132BC'; e.currentTarget.style.borderColor = '#6132BC' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#7543E3'; e.currentTarget.style.borderColor = '#7543E3' }}
            >
              Subscribe <ArrowRight weight="bold" size={14} />
            </button>
          </form>
        </div>
      </LSection>
    </main>
  )
}
