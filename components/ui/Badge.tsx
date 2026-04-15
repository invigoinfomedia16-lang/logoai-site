'use client'

import {
  Globe,
  Stamp,
  Trophy,
  ChartLineUp,
  Question,
  BookOpen,
  Stack,
  ShieldCheck,
  Newspaper,
  Users,
  Buildings,
  Cpu,
  Rocket,
  Clock,
  Lightning,
} from '@phosphor-icons/react'

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

const BLUE = '#648EEF'

const ICONS: Record<IconName, JSX.Element> = {
  sparkle: <Globe weight="bold" size={16} color={BLUE} />,
  fingerprint: <Stamp weight="bold" size={16} color={BLUE} />,
  magnify: <Stack weight="bold" size={16} color={BLUE} />,
  monitor: <Lightning weight="bold" size={16} color={BLUE} />,
  trophy: <Trophy weight="bold" size={16} color={BLUE} />,
  trendup: <ChartLineUp weight="bold" size={16} color={BLUE} />,
  question: <Question weight="bold" size={16} color={BLUE} />,
  article: <BookOpen weight="bold" size={16} color={BLUE} />,
  book: <BookOpen weight="bold" size={16} color={BLUE} />,
  users: <Users weight="bold" size={16} color={BLUE} />,
  newspaper: <Newspaper weight="bold" size={16} color={BLUE} />,
  lightning: <Lightning weight="bold" size={16} color={BLUE} />,
  buildings: <Buildings weight="bold" size={16} color={BLUE} />,
  cpu: <Cpu weight="bold" size={16} color={BLUE} />,
  rocket: <Rocket weight="bold" size={16} color={BLUE} />,
  shield: <ShieldCheck weight="bold" size={16} color={BLUE} />,
  clock: <Clock weight="bold" size={16} color={BLUE} />,
}

interface BadgeProps {
  icon: IconName
  text: string
}

export default function Badge({ icon, text }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 py-1.5">
      {ICONS[icon]}
      <span className="font-inter font-medium text-[13px] leading-[17px] tracking-[2px] uppercase text-[#AAAAAA]">
        {text}
      </span>
    </div>
  )
}
