// MCompare — v11 "Why Logo.AI" comparison table. Same row-by-row layout
// as the launch site (3 columns: Freelance Designer / Other AI Tools /
// Logo.AI) with the v11 prelaunch row labels — including the new "Free
// at launch", "Free to download", and "No subscription, ever" rows.

type Cell = true | false | string

type Row = {
  feature: string
  freelance: Cell
  otherAI: Cell
  logoai: Cell
}

const ROWS: Row[] = [
  { feature: 'Looks like a designer made it', freelance: true, otherAI: false, logoai: true },
  { feature: 'Time to results', freelance: '1–3 weeks', otherAI: '5–15 minutes', logoai: 'Under 60 seconds' },
  { feature: 'Price', freelance: '$500–$2,500', otherAI: '$20–$96/year', logoai: 'Free at launch*' },
  { feature: 'No design skills needed', freelance: false, otherAI: false, logoai: true },
  { feature: 'Free to download', freelance: false, otherAI: false, logoai: true },
  { feature: 'Free — nothing to lose', freelance: false, otherAI: false, logoai: true },
  { feature: 'Vector files (SVG, PDF, EPS)', freelance: true, otherAI: 'Costs extra', logoai: true },
  { feature: 'Transparent background (PNG)', freelance: 'Sometimes', otherAI: 'Sometimes', logoai: true },
  { feature: 'Brand Guidelines PDF included', freelance: 'Costs extra', otherAI: false, logoai: true },
  { feature: 'Full commercial license', freelance: 'Sometimes', otherAI: 'Sometimes', logoai: true },
  { feature: 'You own the logo forever', freelance: 'Sometimes', otherAI: false, logoai: true },
  { feature: 'Re-download anytime', freelance: false, otherAI: false, logoai: true },
  { feature: 'No subscription, ever', freelance: false, otherAI: false, logoai: true },
]

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="Yes">
      <circle cx="11" cy="11" r="11" style={{ fill: 'var(--n-yes, #00A63E)' }} />
      <path d="M6.5 11.25L9.5 14.25L15.5 7.5" style={{ stroke: 'var(--m-on-brand, #FFFFFF)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-label="No">
      <circle cx="11" cy="11" r="11" style={{ fill: 'var(--n-no, #FB2C36)' }} />
      <path d="M7.5 7.5L14.5 14.5M14.5 7.5L7.5 14.5" style={{ stroke: 'var(--n-no-mark, #FFFFFF)' }} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CellContent({ value, accent }: { value: Cell; accent?: boolean }) {
  if (value === true) return <CheckIcon />
  if (value === false) return <CrossIcon />
  return (
    <span
      className="m-sans"
      style={{
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: accent ? 700 : 400,
        color: accent ? 'var(--m-ink)' : 'var(--m-text-muted)',
        textAlign: 'center',
      }}
    >
      {value}
    </span>
  )
}

export default function MCompare() {
  return (
    <section
      id="why-logo-ai"
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-10 items-center w-full max-w-[1100px] px-2 sm:px-4">
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>Why Logo.AI</p>
          <h2 className="m-h2">Better, faster, and free</h2>
          <p className="m-sub max-w-[640px]">
            See how we compare to a freelance designer or other AI tools.
          </p>
        </div>

        <div className="relative w-full">
          <div
            className="md:hidden absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, transparent, var(--m-surface))' }}
            aria-hidden="true"
          />
          <p
            className="md:hidden m-sans mb-2 text-center"
            style={{ fontSize: 12, color: 'var(--m-text-muted)' }}
          >
            Swipe to compare →
          </p>
          <div className="w-full overflow-x-auto">
            <div
              style={{
                minWidth: 720,
                background: 'var(--m-surface)',
                border: '1px solid var(--m-border)',
                borderRadius: 'var(--m-radius-xl)',
                overflow: 'hidden',
              }}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
                  borderBottom: '1px solid var(--m-border)',
                  background: 'var(--m-surface-alt)',
                }}
              >
                <div className="px-5 py-4" />
                <div className="px-3 py-4 text-center">
                  <span className="m-sans" style={{ fontWeight: 600, fontSize: 14, color: 'var(--m-text-muted)' }}>
                    Freelance Designer
                  </span>
                </div>
                <div className="px-3 py-4 text-center">
                  <span className="m-sans" style={{ fontWeight: 600, fontSize: 14, color: 'var(--m-text-muted)' }}>
                    Other AI Tools
                  </span>
                </div>
                <div
                  className="px-3 py-4 text-center"
                  style={{ background: 'var(--n-compare-logoai-bg, var(--m-brand-bg))' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--m-logo-font, var(--m-font-wordmark), serif)',
                      fontWeight: 'var(--m-logo-weight, 400)',
                      fontSize: 18,
                      letterSpacing: 'var(--m-logo-tracking, -0.02em)',
                      color: 'var(--m-logo-color, var(--m-ink))',
                    }}
                  >
                    LOGO<span style={{ color: 'var(--m-logo-color, var(--m-brand))' }}>.</span>AI
                  </span>
                </div>
              </div>

              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
                    borderBottom: i < ROWS.length - 1 ? '1px solid var(--m-border-soft)' : 'none',
                  }}
                >
                  <div className="px-5 py-3.5">
                    <span className="m-sans" style={{ fontSize: 14, fontWeight: 500, color: 'var(--m-ink)' }}>
                      {row.feature}
                    </span>
                  </div>
                  <div className="px-3 py-3.5 flex items-center justify-center">
                    <CellContent value={row.freelance} />
                  </div>
                  <div className="px-3 py-3.5 flex items-center justify-center">
                    <CellContent value={row.otherAI} />
                  </div>
                  <div
                    className="px-3 py-3.5 flex items-center justify-center h-full"
                    style={{ background: 'var(--n-compare-logoai-bg, var(--m-brand-bg))' }}
                  >
                    <CellContent value={row.logoai} accent />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          className="m-sans w-full text-center"
          style={{ fontSize: 13, lineHeight: '20px', color: 'var(--m-text-muted)' }}
        >
          * Free for the first 2,000,000 users. After that, $49 one-time.
        </p>
      </div>
    </section>
  )
}
