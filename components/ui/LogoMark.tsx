interface LogoMarkProps {
  size?: number
}

export default function LogoMark({ size = 26 }: LogoMarkProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-poppins), 'Poppins', 'Inter', sans-serif",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '-1.5px',
        color: '#336AEA',
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitTextStroke: '0.5px #336AEA',
      }}
    >
      LOGO
      <span style={{ letterSpacing: '-1px' }}>.</span>
      AI
    </span>
  )
}
