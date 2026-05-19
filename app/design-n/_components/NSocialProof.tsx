// Social Proof Bar — Design N. The breadth claim (180,000+ brands / 90+
// countries), the prose subtitle that names the industries, and a
// star-rating row. The subtitle carries the industries; no pill strip.

export default function NSocialProof() {
  return (
    <section
      className="flex flex-col items-center py-14 sm:py-20 md:py-[100px] px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-brand-bg)' }}
    >
      <div className="flex flex-col gap-5 items-center text-center w-full max-w-[900px] px-2 sm:px-4">
        {/* Eyebrow */}
        <p className="m-eyebrow" style={{ color: 'var(--m-brand)' }}>
          Trusted by 180,000+ Brands
        </p>

        {/* Title */}
        <h2 className="m-h2" style={{ fontSize: 'clamp(26px, 5.4vw, 40px)', lineHeight: 1.2, letterSpacing: '-1.2px' }}>
          Used by businesses across{' '}
          <span style={{ color: 'var(--m-brand)' }}>90+ countries</span>
        </h2>

        {/* Subtitle */}
        <p className="m-sub" style={{ fontSize: 18, lineHeight: '28px' }}>
          From first-time founders to established companies — restaurants, agencies, startups,
          online stores, and everything in between.
        </p>

        {/* Star-rating row */}
        <div className="flex items-center gap-2 mt-3">
          <span aria-hidden="true" style={{ color: '#F59E0B', fontSize: 18, letterSpacing: 2 }}>
            ★★★★★
          </span>
          <span
            className="m-sans"
            style={{ fontSize: 14, color: 'var(--m-text-muted)', fontWeight: 600 }}
          >
            4.9/5 from 12,000+ reviews
          </span>
        </div>
      </div>
    </section>
  )
}
