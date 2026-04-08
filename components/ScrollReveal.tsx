'use client'

import { useInView } from '@/hooks/useInView'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollReveal({
  children,
  className = '',
}: ScrollRevealProps) {
  const { ref, inView } = useInView(0.08)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {children}
    </div>
  )
}
