import Badge from './ui/Badge'

const STEPS = [
  {
    n: '01',
    h: 'Describe your brand',
    d: "Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.",
  },
  {
    n: '02',
    h: 'Watch AI design it',
    d: 'In under 60 seconds, our AI generates original logo concepts – choosing the right style, colors, and typography for you.',
  },
  {
    n: '03',
    h: 'Download and launch',
    d: 'Pick your favorite, then download print-ready and web-ready files instantly. No account or credit card needed.',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-[60px]">
        {/* Heading */}
        <div className="flex flex-col gap-2.5">
          <Badge icon="monitor" text="Simple as 1-2-3" />
          <h2 className="font-bricolage font-medium leading-[1.1em] tracking-[-0.04em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            From idea to logo in seconds
          </h2>
          <p className="font-bricolage font-medium text-base sm:text-lg leading-7 tracking-[-0.02em] text-white/50 m-0">
            No design skills needed. Tell us your brand name and let our AI
            handle the rest.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="border border-white/[0.12] rounded-2xl p-6 md:p-8 flex flex-col gap-5 bg-transparent"
            >
              <span className="font-bricolage text-sm font-medium text-white/40 leading-[1.4em]">
                {step.n}
              </span>
              <span className="font-bricolage text-[18px] md:text-[22px] font-medium text-white leading-[1.3em]">
                {step.h}
              </span>
              <span className="font-bricolage text-sm md:text-base font-medium text-white/70 leading-[1.6em]">
                {step.d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
