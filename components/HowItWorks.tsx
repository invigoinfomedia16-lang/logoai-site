import Badge from './ui/Badge'

const STEPS = [
  {
    n: '01',
    h: 'Describe your brand',
    d: "Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.",
    color: '#336AEA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#336AEA" strokeWidth="1.5" width="36" height="36" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    n: '02',
    h: 'Watch AI design it',
    d: 'In under 60 seconds, our AI generates original logo concepts – choosing the right style, colors, and typography for you.',
    color: '#8B5CF6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" width="36" height="36" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    n: '03',
    h: 'Download and launch',
    d: 'Pick your favorite, then download print-ready and web-ready files instantly. No account or credit card needed.',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.5" width="36" height="36" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section
      className="px-5 md:px-8 lg:px-10 py-16 md:py-[120px]"
      style={{ borderTop: '1px solid rgba(84,87,94,0.3)' }}
    >
      <div className="max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col items-center text-center gap-8 md:gap-[60px]">
        <div className="flex flex-col items-center gap-2.5 max-w-[700px]">
          <Badge icon="monitor" text="Simple as 1-2-3" />
          <h2 className="font-bricolage font-semibold leading-[1.1em] tracking-[-0.03em] m-0" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
            From idea to logo in seconds
          </h2>
          <p className="font-inter font-normal text-base sm:text-lg leading-7 text-white/50 m-0">
            No design skills needed. Tell us your brand name and let our AI
            handle the rest.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="border border-white/[0.08] rounded-2xl p-6 md:p-8 flex flex-col gap-4 bg-[#1F1F1F] relative overflow-hidden transition-all duration-300 hover:border-white/[0.15]"
            >
              {step.icon}
              <span
                className="font-inter text-[11px] font-semibold tracking-[2px]"
                style={{ color: step.color }}
              >
                STEP {step.n}
              </span>
              <span className="font-bricolage text-[18px] md:text-[20px] font-medium text-white leading-[1.3em]">
                {step.h}
              </span>
              <span className="font-inter text-sm md:text-[15px] font-normal text-white/50 leading-[1.7]">
                {step.d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
