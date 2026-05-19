// Privacy — 2x2 feature grid mirroring HEADSHOT, with LOGO.AI's privacy
// commitments adapted from the Privacy Policy + Trademark sections.

type IconCmp = (props: { className?: string }) => JSX.Element

function CrownIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.667 6 16 8l1.333-2" />
      <path d="m4 13.333 4 8h16l4-8-6.667 4L16 9.333 10.667 17.333z" />
      <path d="M8 26.667h16" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5.333" y="14.667" width="21.333" height="13.333" rx="2.667" />
      <path d="M10.667 14.667V9.333a5.333 5.333 0 0 1 10.666 0v5.334" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 2.667 4 8v8c0 7.4 5.067 13.333 12 14.667 6.933-1.334 12-7.267 12-14.667V8z" />
    </svg>
  )
}

function StampIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 12V8a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v4" />
      <path d="M9 12h14a2 2 0 0 1 2 2v2H7v-2a2 2 0 0 1 2-2z" />
      <path d="M5 22h22a0 0 0 0 1 0 0v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z" />
      <path d="M11 16v6" />
      <path d="M21 16v6" />
    </svg>
  )
}

type Feature = { Icon: IconCmp; title: string; bullets: string[] }

const FEATURES: Feature[] = [
  {
    Icon: CrownIcon,
    title: 'Full ownership, no surprises',
    bullets: [
      'You own every logo we generate.',
      'Use it anywhere — online, in print, in media.',
      'No usage restrictions, no royalties, no attribution.',
    ],
  },
  {
    Icon: LockIcon,
    title: 'Never shared or used for training',
    bullets: [
      'Your brand description and logos are never used to train other models.',
      'We never sell or share your data.',
      "It's only used to generate your logo.",
    ],
  },
  {
    Icon: StampIcon,
    title: 'Designed to be trademark-safe',
    bullets: [
      "Every logo is generated original — no template recombination.",
      'Designed to be visually distinct from existing marks.',
      "We can't guarantee clearance, but we make it easy to register.",
    ],
  },
  {
    Icon: ShieldIcon,
    title: 'Secure from input to download',
    bullets: [
      'Encryption in transit (HTTPS/TLS) and at rest.',
      'Access controls limit data to authorized personnel.',
      'GDPR + CCPA compliant. Delete your data anytime.',
    ],
  },
]

export default function MPrivacy() {
  return (
    <section
      id="privacy"
      className="flex flex-col items-start py-20 md:pb-[128px] md:pt-0 px-5 sm:px-10 md:px-16 lg:px-[96px] w-full"
      style={{ background: 'var(--m-surface)' }}
    >
      <div className="flex flex-col gap-12 items-start w-full max-w-[1728px] px-2 sm:px-4">
        {/* Heading */}
        <div className="flex flex-col items-start w-full">
          <p className="m-eyebrow-lg pb-4">Privacy</p>
          <h2 className="m-h2 pb-4" style={{ color: 'var(--m-ink)' }}>
            Private. Secure. In your control.
          </h2>
          <p className="m-sub" style={{ fontSize: 20, lineHeight: '28px' }}>
            Your brand description and your logo are yours, always. We don&apos;t sell your data, we don&apos;t train on it, and you can delete it anytime.
          </p>
        </div>

        {/* 2x2 feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          {FEATURES.map(({ Icon, title, bullets }) => (
            <article
              key={title}
              className="flex flex-col items-start p-8"
              style={{
                background: 'var(--m-surface)',
                border: '1px solid var(--m-border-medium)',
                borderRadius: '14px',
              }}
            >
              <div className="pb-6">
                <Icon />
              </div>
              <h3
                className="m-display pb-3"
                style={{ color: 'var(--m-ink)', fontWeight: 600, fontSize: 20, lineHeight: '28px' }}
              >
                {title}
              </h3>
              <ul className="m-body-sm" style={{ fontSize: 16, lineHeight: '28px' }}>
                {bullets.map((b) => (
                  <li key={b}>&bull; {b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
