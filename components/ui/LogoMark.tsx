interface LogoMarkProps {
  size?: number
}

export default function LogoMark({ size = 20 }: LogoMarkProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-bricolage), sans-serif',
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '-0.5px',
        color: '#fff',
        display: 'block',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      LOGO
      <span style={{ color: '#fff' }}>.</span>
      AI
    </span>
  )
}
