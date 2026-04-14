interface LogoMarkProps {
  size?: number
}

const letters = [
  { ch: 'L', rot: -4, y: -1, ml: 0 },
  { ch: 'O', rot: 3,  y: 1,  ml: -2 },
  { ch: 'G', rot: -3, y: -1, ml: -2 },
  { ch: 'O', rot: 4,  y: 1,  ml: -2 },
  { ch: '.', rot: 0,  y: 3,  ml: -1 },
  { ch: 'A', rot: -3, y: -1, ml: -1 },
  { ch: 'I', rot: 4,  y: 1,  ml: -2 },
]

export default function LogoMark({ size = 30 }: LogoMarkProps) {
  const dotSize = Math.round(size * 0.78)
  return (
    <span
      style={{
        fontFamily: "var(--font-poppins), 'Poppins', 'Inter', sans-serif",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: 0,
        color: '#336AEA',
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        WebkitTextStroke: `0.5px #336AEA`,
      }}
    >
      {letters.map((l, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: `rotate(${l.rot}deg) translateY(${l.y}px)`,
            marginLeft: l.ml,
            fontSize: l.ch === '.' ? dotSize : undefined,
          }}
        >
          {l.ch}
        </span>
      ))}
    </span>
  )
}
