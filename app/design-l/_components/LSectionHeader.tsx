// Standard centered section header — matches the L homepage exactly:
//   text-center mb-16 max-w-[720px] mx-auto
//   eyebrow (14px/500/0.02em) + dk-h2 + dk-body-lg subhead
// Eyebrow color: #7543E3 on light tones, #C7A8FF on dark.
// Do not override font sizes here — let dk-* classes from layout.tsx own the scale.

type Props = {
  eyebrow?: string
  title?: string
  subhead?: string
  dark?: boolean
}

export default function LSectionHeader({ eyebrow, title, subhead, dark = false }: Props) {
  const titleColor = dark ? '#FFFFFF' : '#15141A'
  const subheadColor = dark ? '#FFFFFF' : 'rgba(21,20,26,0.7)'
  const eyebrowColor = dark ? '#C7A8FF' : '#7543E3'
  // With a full eyebrow+title+subhead stack we want generous breathing room
  // before the section content. With just an eyebrow, mb-16 leaves an awkward gap —
  // collapse to mb-6 so the header sits close to the content that follows.
  const hasFullHeader = Boolean(title || subhead)
  const gapClass = hasFullHeader ? 'mb-16' : 'mb-6'
  return (
    <div className={`text-center ${gapClass} max-w-[720px] mx-auto`}>
      {eyebrow && (
        <span
          className={`dk-eyebrow inline-block ${hasFullHeader ? 'mb-5' : ''}`}
          style={{ color: eyebrowColor, background: 'transparent' }}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="dk-h2 mb-5" style={{ color: titleColor }}>
          {title}
        </h2>
      )}
      {subhead && (
        <p className="dk-body-lg" style={{ color: subheadColor }}>
          {subhead}
        </p>
      )}
    </div>
  )
}
