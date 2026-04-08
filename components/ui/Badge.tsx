type IconName =
  | 'sparkle'
  | 'fingerprint'
  | 'magnify'
  | 'monitor'
  | 'trophy'
  | 'trendup'
  | 'question'
  | 'article'

const BLUE = 'rgb(0,0,255)'

const ICONS: Record<IconName, JSX.Element> = {
  sparkle: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill={BLUE}>
      <path d="M8 1L9.2 6.2L14 8L9.2 9.8L8 15L6.8 9.8L2 8L6.8 6.2L8 1Z" />
      <path d="M13 1.5L13.4 3L15 3.5L13.4 4L13 5.5L12.6 4L11 3.5L12.6 3L13 1.5Z" opacity="0.45" />
      <path d="M3 11L3.3 12L4.5 12.5L3.3 13L3 14L2.7 13L1.5 12.5L2.7 12L3 11Z" opacity="0.3" />
    </svg>
  ),
  fingerprint: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M128,24A104,104,0,0,0,24,128" />
      <path d="M128,24A104,104,0,0,1,232,128" />
      <path d="M128,72a56,56,0,0,0-56,56c0,23.76,7.84,46.55,22.3,64.81" />
      <path d="M128,72a56,56,0,0,1,56,56,120.43,120.43,0,0,1-7.13,40.91" />
      <path d="M128,120v0a199.28,199.28,0,0,1-15.8,77.53" />
      <path d="M128,120a199.28,199.28,0,0,0,2.46,31.42" />
    </svg>
  ),
  magnify: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="116" cy="116" r="84" />
      <line x1="175.4" y1="175.4" x2="224" y2="224" />
    </svg>
  ),
  monitor: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <rect x="32" y="48" width="192" height="144" rx="16" />
      <line x1="160" y1="224" x2="96" y2="224" />
      <line x1="128" y1="192" x2="128" y2="224" />
    </svg>
  ),
  trophy: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <line x1="96" y1="224" x2="160" y2="224" />
      <line x1="128" y1="184" x2="128" y2="224" />
      <path d="M58,128H48A32,32,0,0,1,16,96V80a8,8,0,0,1,8-8H56" />
      <path d="M198,128h10a32,32,0,0,0,32-32V80a8,8,0,0,0-8-8H200" />
      <path d="M64,48H192a0,0,0,0,1,0,0v88a64,64,0,0,1-64,64h0a64,64,0,0,1-64-64V48A0,0,0,0,1,64,48Z" />
    </svg>
  ),
  trendup: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="232 56 136 152 96 112 24 184" />
      <polyline points="232 120 232 56 168 56" />
    </svg>
  ),
  question: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M92,100a36,36,0,1,1,57.6,28.8A23.54,23.54,0,0,0,136,148v12" />
      <circle cx="128" cy="192" r="12" fill={BLUE} stroke="none" />
    </svg>
  ),
  article: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <rect x="32" y="48" width="192" height="160" rx="8" />
      <line x1="76" y1="96" x2="180" y2="96" />
      <line x1="76" y1="128" x2="180" y2="128" />
      <line x1="76" y1="160" x2="148" y2="160" />
    </svg>
  ),
}

interface BadgeProps {
  icon: IconName
  text: string
}

export default function Badge({ icon, text }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-0 bg-transparent">
      {ICONS[icon]}
      <span className="font-bricolage font-medium text-[13px] leading-[17px] tracking-[2px] uppercase text-white/70">
        {text}
      </span>
    </div>
  )
}
