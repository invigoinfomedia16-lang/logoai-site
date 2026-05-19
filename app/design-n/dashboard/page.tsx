'use client'

// Dashboard — Design N. Single Brand Hub.
// What the source-of-truth landing page promises for $49:
//   • Logo in every format (PNG, SVG, PDF, EPS)
//   • Transparent background
//   • Re-download anytime
//   • Full commercial license
//   • 100% satisfaction guarantee
//
// Tabs reflect that promise — Files (the formats) and Variations (layouts
// of the same logo). Brand kit, Mockups, and Receipts were removed because
// the source copy doesn't sell any of those.
//
// Sample data for the demo. A real build would read the brand from the
// user's account record.

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

/* ---------- sample purchased brand (would come from the account API).
   Mutated on mount with anything saved during onboarding so the user's
   actual brand name flows through every tab. ---------------------------- */

let BRAND = {
  name: 'Velvet Roast',
  tagline: 'Roasted fresh, every morning',
}

const FILES = [
  { fmt: 'PNG',  desc: 'Web · transparent background', size: '512 KB' },
  { fmt: 'SVG',  desc: 'Vector · infinitely scalable', size: '24 KB' },
  { fmt: 'PDF',  desc: 'Print · vector', size: '38 KB' },
  { fmt: 'EPS',  desc: 'Print · vector', size: '32 KB' },
]

const COLOR_MODES: { key: string; label: string; desc: string }[] = [
  { key: 'full',  label: 'Full colour',  desc: 'Primary version of your logo' },
  { key: 'dark',  label: 'On dark',      desc: 'White / light variant' },
  { key: 'mono',  label: 'Single colour', desc: 'Black ink, foil, embossing' },
]

const VARIATIONS = [
  { id: 'wordmark',   name: 'Wordmark',         desc: 'Brand name only' },
  { id: 'horizontal', name: 'Horizontal',       desc: 'Icon left of name' },
  { id: 'stacked',    name: 'Stacked',          desc: 'Icon above name' },
  { id: 'monogram',   name: 'Monogram',         desc: 'Initials inside mark' },
  { id: 'icon',       name: 'Icon only',        desc: 'Mark with no text' },
  { id: 'badge',      name: 'Badge',            desc: 'Circle / seal layout' },
]

type Tab = 'files' | 'variations'

/* ---------- icons ---------- */

function Stroke({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}
function IconBrand() {
  // Bookmark — quiet, industry-agnostic marker for "this is your saved brand".
  return (
    <Stroke>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </Stroke>
  )
}
function IconReceipt() {
  return (
    <Stroke>
      <path d="M5 3v18l3-2 3 2 3-2 3 2 2-2V3z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </Stroke>
  )
}
function IconHelp() {
  return (
    <Stroke>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 4" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </Stroke>
  )
}
function IconPlus() {
  return (
    <Stroke>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Stroke>
  )
}
function IconDownload() {
  return (
    <Stroke>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </Stroke>
  )
}
function IconCopy() {
  return (
    <Stroke size={14}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Stroke>
  )
}

/* ---------- shared sub-components ---------- */

function LogoArtwork({
  variant,
  colorMode,
  bg = '#FFFFFF',
}: {
  variant: 'wordmark' | 'horizontal' | 'stacked' | 'monogram' | 'icon' | 'badge'
  colorMode: 'full' | 'dark' | 'mono'
  bg?: string
}) {
  // Default ink colours for the LogoArtwork SVG generator. The user-visible
  // tabs (Files, Variations) don't display a palette anymore, so these are
  // just internal colours for the rendered preview.
  const c0 = '#3E2723'
  const c1 = '#F5E6D3'
  const c2 = '#6B8E5A'
  const isDark = colorMode === 'dark'
  const ink = colorMode === 'mono' ? '#141413' : isDark ? '#FFFFFF' : c0
  const accent = colorMode === 'mono' ? '#141413' : isDark ? '#FFFFFF' : c2
  const surface = isDark ? '#141413' : bg

  const base: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 24,
    background: surface,
    textAlign: 'center',
    overflow: 'hidden',
  }

  const wordmark = (size = 32) => (
    <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: size, color: ink, letterSpacing: '-0.02em', lineHeight: 1 }}>
      {BRAND.name}
    </span>
  )
  const initials = 'BC'
  const dot = <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />

  switch (variant) {
    case 'wordmark':
      return (
        <div style={base}>
          {wordmark(34)}
          {BRAND.tagline && (
            <span className="m-sans" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent }}>
              {BRAND.tagline}
            </span>
          )}
        </div>
      )
    case 'horizontal':
      return (
        <div style={{ ...base, flexDirection: 'row', gap: 14 }}>
          <span style={{ width: 36, height: 36, borderRadius: '50%', background: ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: accent }} />
          </span>
          {wordmark(28)}
        </div>
      )
    case 'stacked':
      return (
        <div style={base}>
          <span style={{ width: 40, height: 40, borderRadius: '50%', background: ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: accent }} />
          </span>
          {wordmark(24)}
        </div>
      )
    case 'monogram':
      return (
        <div style={base}>
          <span
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: ink,
              color: surface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--m-font-wordmark), serif',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '-0.04em',
            }}
          >
            {initials}
          </span>
        </div>
      )
    case 'icon':
      return (
        <div style={base}>
          <span
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: accent }} />
          </span>
        </div>
      )
    case 'badge':
      return (
        <div style={base}>
          <span
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              border: `2px solid ${ink}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 13, color: ink, letterSpacing: '-0.02em' }}>{BRAND.name.split(' ')[0]}</span>
            {dot}
            <span className="m-sans" style={{ fontSize: 7, letterSpacing: '0.24em', textTransform: 'uppercase', color: ink }}>EST. 2026</span>
          </span>
        </div>
      )
  }
}

/* ---------- page ---------- */

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>('files')
  const [colorMode, setColorMode] = useState<'full' | 'dark' | 'mono'>('full')
  const [, setBrandVersion] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem('logoai:brand')
      if (!raw) return
      const stored = JSON.parse(raw) as Partial<typeof BRAND>
      BRAND = {
        ...BRAND,
        ...(stored.name ? { name: stored.name } : {}),
        ...(stored.tagline !== undefined ? { tagline: stored.tagline } : {}),
      }
      setBrandVersion((v) => v + 1)
    } catch {
      /* localStorage unavailable or malformed — keep sample defaults */
    }
  }, [])

  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--m-surface)' }}>
      <Sidebar />

      <main className="flex-1" style={{ padding: '32px 24px 64px' }}>
        {/* mobile wordmark (sidebar hidden < md) */}
        <div className="md:hidden flex items-center justify-between" style={{ marginBottom: 20 }}>
          <a href="/design-n" className="flex items-center gap-1.5">
            <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 22, color: 'var(--m-ink)', letterSpacing: '-0.02em' }}>
              LOGO<span style={{ color: 'var(--m-brand)' }}>.</span>AI
            </span>
          </a>
        </div>

        {/* hero — owned logo */}
        <section className="grid md:grid-cols-[1.2fr_1fr]" style={{ gap: 24, alignItems: 'stretch' }}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 16,
              border: '1px solid var(--m-border)',
              background: 'var(--m-surface-alt)',
              aspectRatio: '5 / 3',
            }}
          >
            <LogoArtwork variant="wordmark" colorMode={colorMode} />
          </div>

          <div className="flex flex-col" style={{ gap: 16 }}>
            <div>
              <h1
                className="m-display"
                style={{ fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.5px', color: 'var(--m-ink)', margin: 0 }}
              >
                {BRAND.name}
              </h1>
              {BRAND.tagline && (
                <p className="m-sans" style={{ marginTop: 6, fontSize: 14, color: 'var(--m-text-muted)', fontStyle: 'italic' }}>
                  &ldquo;{BRAND.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* colour mode switcher — chips are self-explanatory, no eyebrow */}
            <div>
              <div className="flex" style={{ gap: 6 }}>
                {COLOR_MODES.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setColorMode(m.key as 'full' | 'dark' | 'mono')}
                    className="m-sans"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: colorMode === m.key ? 'var(--m-brand)' : 'var(--m-border)',
                      background: colorMode === m.key ? 'var(--m-brand-soft)' : 'var(--m-surface)',
                      color: colorMode === m.key ? 'var(--m-ink)' : 'var(--m-text-muted)',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex" style={{ gap: 10, marginTop: 'auto' }}>
              <button
                type="button"
                onClick={() => alert('Mock: zip download starting…')}
                className="m-cta-btn m-sans inline-flex items-center justify-center gap-2"
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: 10,
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(217,119,87,0.28)',
                }}
              >
                <IconDownload />
                Download all files
              </button>
            </div>
          </div>
        </section>

        {/* tab bar */}
        <nav
          className="flex"
          style={{
            marginTop: 32,
            gap: 4,
            borderBottom: '1px solid var(--m-border)',
            overflowX: 'auto',
          }}
        >
          {([
            ['files',      'Files'],
            ['variations', 'Variations'],
          ] as const).map(([key, label]) => {
            const active = tab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className="m-sans"
                style={{
                  padding: '12px 16px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid',
                  borderColor: active ? 'var(--m-brand)' : 'transparent',
                  marginBottom: -1,
                  color: active ? 'var(--m-ink)' : 'var(--m-text-soft)',
                  fontSize: 14,
                  fontWeight: active ? 700 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
              >
                {label}
              </button>
            )
          })}
        </nav>

        <section style={{ marginTop: 24 }}>
          {tab === 'files' && <FilesTab colorMode={colorMode} />}
          {tab === 'variations' && <VariationsTab colorMode={colorMode} />}
        </section>
      </main>
    </div>
  )
}

/* ---------- sidebar ---------- */

function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col shrink-0"
      style={{
        position: 'sticky',
        top: 0,
        width: 220,
        height: '100vh',
        background: 'var(--m-brand-bg)',
        borderRight: '1px solid var(--m-border)',
        padding: '24px 16px',
      }}
    >
      <a href="/design-n" className="flex items-center" style={{ padding: '0 8px' }}>
        <span style={{ fontFamily: 'var(--m-font-wordmark), serif', fontSize: 22, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--m-ink)' }}>
          LOGO<span style={{ color: 'var(--m-brand)' }}>.</span>AI
        </span>
      </a>

      <p
        className="m-sans"
        style={{
          marginTop: 28,
          padding: '0 8px',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--m-text-soft)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        My brand
      </p>
      <nav className="flex flex-col" style={{ marginTop: 8, gap: 2 }}>
        <SidebarLink active href="/design-n/dashboard" icon={<IconBrand />} label={BRAND.name} />
      </nav>

      <a
        href="/design-n/start"
        className="m-sans inline-flex items-center gap-2.5"
        style={{
          marginTop: 14,
          padding: '8px',
          borderRadius: 6,
          background: 'transparent',
          color: 'var(--m-text-muted)',
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background 0.15s ease, color 0.15s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.color = 'var(--m-ink)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--m-text-muted)' }}
      >
        <IconPlus /> Start a new brand
      </a>

      <div style={{ marginTop: 24 }}>
        <SidebarLink href="#" icon={<IconHelp />} label="Help & support" />
      </div>

      <div style={{ flex: 1 }} />

      <div className="flex items-center gap-2.5" style={{ padding: 8 }}>
        <div
          className="flex items-center justify-center m-display"
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--m-brand)', color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}
        >
          JM
        </div>
        <div className="flex flex-col">
          <span className="m-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--m-ink)', lineHeight: '16px' }}>
            John Mayer
          </span>
          <span
            className="m-sans"
            style={{ fontSize: 11, color: 'var(--m-text-soft)', lineHeight: '14px', width: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            john@example.com
          </span>
        </div>
      </div>
    </aside>
  )
}

function SidebarLink({ href, icon, label, active = false }: { href: string; icon?: ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href={href}
      className="m-sans flex items-center gap-2.5"
      style={{
        padding: '8px',
        borderRadius: 6,
        background: active ? 'var(--m-brand-soft)' : 'transparent',
        color: active ? 'var(--m-brand-strong)' : 'var(--m-ink)',
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        textDecoration: 'none',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)' } }}
      onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent' } }}
    >
      {icon}
      {label}
    </a>
  )
}

/* ---------- tabs ---------- */

function FilesTab({ colorMode }: { colorMode: 'full' | 'dark' | 'mono' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 14 }}>
      {FILES.map((f) => (
        <article
          key={f.fmt}
          className="flex flex-col"
          style={{
            borderRadius: 14,
            border: '1px solid var(--m-border)',
            background: 'var(--m-surface)',
            overflow: 'hidden',
          }}
        >
          <div
            className="relative"
            style={{ aspectRatio: '4 / 3', background: 'var(--m-surface-alt)' }}
          >
            <LogoArtwork variant="wordmark" colorMode="full" />
          </div>
          <div className="flex flex-col" style={{ padding: 14, gap: 10 }}>
            <div>
              <div className="flex items-center justify-between" style={{ gap: 6 }}>
                <span className="m-display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--m-ink)' }}>
                  {f.fmt}
                </span>
                <span className="m-sans" style={{ fontSize: 11, color: 'var(--m-text-soft)' }}>
                  {f.size}
                </span>
              </div>
              <div className="m-sans" style={{ marginTop: 2, fontSize: 12, color: 'var(--m-text-muted)' }}>
                {f.desc}
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert(`Mock: ${f.fmt} download starting…`)}
              className="m-sans inline-flex items-center justify-center gap-1.5"
              style={{
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid var(--m-border)',
                background: 'var(--m-surface)',
                color: 'var(--m-ink)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s ease, border-color 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface-alt)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--m-surface)' }}
            >
              <IconDownload />
              Download
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

function VariationsTab({ colorMode }: { colorMode: 'full' | 'dark' | 'mono' }) {
  return (
    <div>
      <p className="m-sans" style={{ marginBottom: 14, fontSize: 13, color: 'var(--m-text-muted)' }}>
        Layout variants of the same logo. All included — download each one in any format.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 14 }}>
        {VARIATIONS.map((v) => (
          <article
            key={v.id}
            className="flex flex-col"
            style={{
              borderRadius: 14,
              border: '1px solid var(--m-border)',
              background: 'var(--m-surface)',
              overflow: 'hidden',
            }}
          >
            <div className="relative" style={{ aspectRatio: '4 / 3', background: 'var(--m-surface-alt)' }}>
              <LogoArtwork variant={v.id as 'wordmark' | 'horizontal' | 'stacked' | 'monogram' | 'icon' | 'badge'} colorMode={colorMode} />
            </div>
            <div className="flex items-center justify-between" style={{ padding: '12px 14px' }}>
              <div>
                <div className="m-display" style={{ fontSize: 13, fontWeight: 700, color: 'var(--m-ink)' }}>
                  {v.name}
                </div>
                <div className="m-sans" style={{ fontSize: 11, color: 'var(--m-text-soft)' }}>
                  {v.desc}
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`Mock: downloading ${v.name} variant`)}
                aria-label={`Download ${v.name}`}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--m-text-muted)' }}
              >
                <IconDownload />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="m-sans"
      style={{
        padding: '4px 10px',
        borderRadius: 9999,
        background: 'var(--m-surface-alt)',
        color: 'var(--m-text-muted)',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}
