'use client'

// Canonical footer for every page in the L design system.
// Homepage AND sub-pages use this one component.
// Matches homepage footer spec: DM Serif Display wordmark, Firefox palette,
// 3 link columns, social icons, copyright.

import { TwitterLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react'
import { FOOTER_LINKS, SOCIAL_LINKS } from '../_data'

const SOCIAL_ICONS = {
  Twitter: TwitterLogo,
  LinkedIn: LinkedinLogo,
  Instagram: InstagramLogo,
} as const

export default function LFooter() {
  return (
    <footer
      className="w-full px-6 md:px-10 flex justify-center"
      style={{ background: '#210340', color: '#FFFFFF', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="w-full max-w-[1100px] py-10 md:py-20 flex flex-col gap-10 md:gap-[60px]">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-[120px]">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-[290px]">
            <span
              style={{
                color: '#FFFFFF',
                fontFamily: "'DM Serif Display', serif",
                fontSize: '26px',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              LOGO<span style={{ color: '#7543E3' }}>.</span>AI
            </span>
            <p
              className="dk-body m-0"
              style={{ fontFamily: "'Mozilla Text', sans-serif", fontSize: '16px', lineHeight: '22.4px', color: '#FFFFFF' }}
            >
              Get your free AI-generated logo in seconds. Original designs, no templates – crafted for your brand. Free for the first 2,000,000 users.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS] ?? TwitterLogo
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
                  >
                    <Icon size={16} weight="regular" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-[80px]">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <span
                  style={{ fontFamily: "'Mozilla Headline', sans-serif", fontSize: '18px', fontWeight: 600, lineHeight: '22.4px', color: '#FFFFFF' }}
                >
                  {group.title}
                </span>
                {group.links.map((link) => {
                  const idleColor = '#FFFFFF'
                  const hoverColor = '#C7A8FF'
                  return (
                    <a
                      key={link.t}
                      href={link.h}
                      className="no-underline transition-colors duration-150"
                      style={{ color: idleColor, fontFamily: "'Mozilla Text', sans-serif", fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = idleColor }}
                    >
                      {link.t}
                    </a>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center flex-wrap gap-2 pt-6 md:pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span
            style={{ color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', lineHeight: '19.6px', fontWeight: 400 }}
          >
            © 2026 LOGO.AI, Inc.
          </span>
          <span
            style={{ color: '#FFFFFF', fontFamily: "'Mozilla Text', sans-serif", fontSize: '14px', lineHeight: '19.6px', fontWeight: 400 }}
          >
            LOGO.AI is an independent service.
          </span>
        </div>
      </div>
    </footer>
  )
}
