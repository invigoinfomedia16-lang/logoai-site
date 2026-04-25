import Link from 'next/link'
import LogoMark from './ui/LogoMark'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/data'
import { TwitterLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr'

const SOCIAL_ICONS: Record<string, typeof TwitterLogo> = {
  Twitter: TwitterLogo,
  LinkedIn: LinkedinLogo,
  Instagram: InstagramLogo,
}

export default function Footer() {
  return (
    <footer
      className="w-full px-5 md:px-8 lg:px-10 flex justify-center"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="w-full max-w-[95%] sm:max-w-[90%] py-10 md:py-20 flex flex-col gap-10 md:gap-[60px]">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-[120px]">
          {/* Brand blurb */}
          <div className="flex flex-col gap-5 max-w-[290px]">
            <div className="flex items-center">
              <LogoMark size={30} />
            </div>
            <p className="font-bricolage font-medium text-sm md:text-base leading-6 text-white/50 m-0">
              A professional logo, designed by AI in 60 seconds. No templates. Free for the first 2,000,000 users.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.name]
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                  >
                    {Icon ? <Icon size={16} weight="regular" /> : <span>{s.name[0]}</span>}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-[80px]">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <span className="font-bricolage font-bold text-[11px] leading-5 text-white/90 uppercase tracking-[2px]">
                  {group.title}
                </span>
                {group.links.map((link) => (
                  <Link
                    key={link.t}
                    href={link.h}
                    className="font-bricolage font-medium text-sm md:text-base leading-[22px] no-underline transition-colors duration-200"
                    style={{ color: 'rgb(120,120,120)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#fff')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgb(120,120,120)')
                    }
                  >
                    {link.t}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center flex-wrap gap-2 pt-6 md:pt-8"
          style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
        >
          <span className="font-bricolage font-normal text-sm text-white/40">
            © 2026 LOGO.AI
          </span>
          <span className="font-bricolage font-normal text-sm text-white/40">
            LOGO.AI is an independent service.
          </span>
        </div>
      </div>
    </footer>
  )
}
