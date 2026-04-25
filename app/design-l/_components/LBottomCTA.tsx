'use client'

// Shared bottom-CTA block for marketing sub-pages.
// Click handler: smooth-scrolls to homepage hero #hero-cta (or navigates if
// not on homepage). Once the user has submitted on any page, the button is
// replaced by the success state.

import { Check } from '@phosphor-icons/react'
import { ArrowRight } from '@phosphor-icons/react'
import LSection from './LSection'
import { scrollToHeroCTA, useSubmitted } from './useSubmitted'

type Props = {
  title: string
  body?: string
  ctaLabel?: string
  /** @deprecated kept for compatibility — every CTA now scrolls to the hero email form. */
  ctaHref?: string
  caption?: string
  /** @deprecated kept for compatibility. */
  external?: boolean
}

export default function LBottomCTA({
  title,
  body,
  ctaLabel = 'Claim your free logo',
  caption = 'Launching June 2026',
}: Props) {
  const [submitted] = useSubmitted()

  const buttonStyle: React.CSSProperties = {
    color: '#FFFFFF',
    background: '#7543E3',
    fontFamily: "'Mozilla Text', sans-serif",
    fontWeight: 600,
    fontSize: '15px',
    padding: '14px 28px',
    border: '1px solid #7543E3',
    borderRadius: 9999,
  }
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = '#5F2EB4'
    e.currentTarget.style.borderColor = '#5F2EB4'
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(32,18,58,0.25)'
  }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = '#7543E3'
    e.currentTarget.style.borderColor = '#7543E3'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <LSection tone="alt" bottomCta>
      <div className="max-w-[720px] mx-auto flex flex-col items-center text-center">
        <h2 className="dk-h2 mb-5" style={{ color: '#15141A' }}>
          {title}
        </h2>
        {body && (
          <p className="dk-body-lg mb-8" style={{ color: 'rgba(21,20,26,0.7)' }}>
            {body}
          </p>
        )}
        {submitted ? (
          <div
            className="inline-flex items-center gap-2"
            style={buttonStyle}
          >
            <Check weight="bold" size={16} /> You&apos;re on the list!
          </div>
        ) : (
          <button
            type="button"
            onClick={scrollToHeroCTA}
            className="inline-flex items-center gap-1.5 cursor-pointer transition-all duration-200"
            style={buttonStyle}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {ctaLabel} <ArrowRight weight="bold" size={14} />
          </button>
        )}
        {caption && (
          <p className="dk-caption mt-6" style={{ color: 'rgba(21,20,26,0.55)' }}>
            {caption}
          </p>
        )}
      </div>
    </LSection>
  )
}
