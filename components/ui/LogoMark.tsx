interface LogoMarkProps {
  size?: number
}

export default function LogoMark({ size = 20 }: LogoMarkProps) {
  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 900,
        fontSize: size + 3,
        lineHeight: 1,
        letterSpacing: '-1.5px',
        color: '#F5F5F5',
        display: 'block',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitTextStroke: '0.6px #F5F5F5',
        textShadow: '3px 3px 0 #555, 4px 4px 0 #333',
      }}
    >
      LOGO
      <span style={{ letterSpacing: '-1px' }}>.</span>
      AI
    </span>
  )
}
