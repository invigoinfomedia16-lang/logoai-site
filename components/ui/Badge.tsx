type IconName =
  | 'sparkle'
  | 'fingerprint'
  | 'magnify'
  | 'monitor'
  | 'trophy'
  | 'trendup'
  | 'question'
  | 'article'
  | 'book'
  | 'users'
  | 'newspaper'
  | 'lightning'
  | 'buildings'
  | 'cpu'
  | 'rocket'
  | 'shield'
  | 'clock'

const BLUE = '#336AEA'

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
  book: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48,216a24,24,0,0,1,24-24H208V32H72A24,24,0,0,0,48,56Z" />
      <path d="M48,216a24,24,0,0,0,24,24H208V192H72A24,24,0,0,0,48,216Z" />
      <line x1="96" y1="88" x2="160" y2="88" />
      <line x1="96" y1="120" x2="160" y2="120" />
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="80" cy="104" r="40" />
      <path d="M16,200a80,80,0,0,1,128-64" />
      <circle cx="176" cy="144" r="40" />
      <path d="M136,200a80,80,0,0,1,80,0" />
    </svg>
  ),
  newspaper: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M64,208H200a16,16,0,0,0,16-16V48H64V208Z" />
      <path d="M64,208a16,16,0,0,1-32,0V80H64" />
      <line x1="112" y1="96" x2="168" y2="96" />
      <line x1="112" y1="128" x2="168" y2="128" />
      <rect x="96" y="152" width="88" height="32" rx="4" fill={BLUE} stroke="none" opacity="0.4" />
    </svg>
  ),
  lightning: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="152,16 72,144 128,144 104,240 184,112 128,112 152,16" />
    </svg>
  ),
  buildings: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,224 240,224" />
      <rect x="128" y="48" width="96" height="176" rx="8" />
      <path d="M40,224V112a8,8,0,0,1,8-8H96a8,8,0,0,1,8,8v112" />
      <rect x="152" y="184" width="24" height="40" />
    </svg>
  ),
  cpu: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <rect x="88" y="88" width="80" height="80" rx="8" />
      <path d="M112,88V64" /><path d="M144,88V64" />
      <path d="M112,192v-24" /><path d="M144,192v-24" />
      <path d="M88,112H64" /><path d="M88,144H64" />
      <path d="M192,112H168" /><path d="M192,144H168" />
      <rect x="40" y="40" width="176" height="176" rx="16" />
    </svg>
  ),
  rocket: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M105.06,135.06l-37.47,37.47a24,24,0,0,1-34,0,24,24,0,0,1,0-34l37.47-37.47" />
      <path d="M200.56,55.44,153,80.29a87.81,87.81,0,0,0-41.38,41.38L83.43,172.57,83,173a24,24,0,0,0,0,34,24,24,0,0,0,34,0l50.9-28.19A87.81,87.81,0,0,0,209.71,137l24.85-47.56C238.81,78.59,221.41,61.19,200.56,55.44Z" />
      <circle cx="168" cy="88" r="16" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40,114.79V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8v58.79c0,84.18-71.78,111.19-85.54,116a7.83,7.83,0,0,1-4.92,0C111.78,225.98,40,198.97,40,114.79Z" />
      <polyline points="88,128 112,152 168,100" />
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" stroke={BLUE} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="128" cy="128" r="96" />
      <polyline points="128,72 128,128 176,128" />
    </svg>
  ),
}

interface BadgeProps {
  icon: IconName
  text: string
}

export default function Badge({ icon, text }: BadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-xl"
      style={{
        padding: '8px 20px',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}
    >
      {ICONS[icon]}
      <span className="font-inter font-semibold text-[12px] leading-[19px] tracking-[1.5px] uppercase text-white">
        {text}
      </span>
    </div>
  )
}
