'use client'

// MLpLogo — renders the Custom-mode site wordmark. Watches .lp-root
// for a `data-wm` attribute (managed by MLpLogoToggle) and switches
// between 12 wordmark variants pulled from the LOGO VARIATIONS
// reference file:
//
//   Group 1 — Montserrat, tight tracking
//     A · Original — round O
//
//   Group 2 — Montserrat, slight spacing (+0.02em)
//     D · Squared O sharp — all letters aligned
//     E · Squared O rounded — all letters aligned
//
//   Group 3 — Nested-line, no spacing (single full-width SVG)
//     1 · Nested outline
//     4 · Dense nested
//     5 · Nested sharp
//
// × 2 colorways each (all white, white + orange dot) = 12 variants.
// Letters use currentColor so the SVG inherits whatever font color
// the brand sets; the orange-dot colorway switches just the dot.

import { useEffect, useState } from 'react'

export type WmVariant =
  | 'a-white'  | 'a-orange'
  | 'd-white'  | 'd-orange'
  | 'e-white'  | 'e-orange'
  | 'n1-white' | 'n1-orange'
  | 'n4-white' | 'n4-orange'
  | 'n5-white' | 'n5-orange'

export const WM_VARIANTS: WmVariant[] = [
  'a-white',  'a-orange',
  'd-white',  'd-orange',
  'e-white',  'e-orange',
  'n1-white', 'n1-orange',
  'n4-white', 'n4-orange',
  'n5-white', 'n5-orange',
]

export const DEFAULT_WM: WmVariant = 'e-orange'

function isVariant(v: string | null): v is WmVariant {
  return !!v && (WM_VARIANTS as string[]).includes(v)
}

// Squared O paths — sharp = right angles, rounded = soft corners.
const O_SHARP   = 'M0 0 H31 V36 H0 Z M9 10 H22 V26 H9 Z'
const O_ROUNDED = 'M4 0 H27 Q31 0 31 4 V32 Q31 36 27 36 H4 Q0 36 0 32 V4 Q0 0 4 0 Z M11 10 H20 Q22 10 22 12 V24 Q22 26 20 26 H11 Q9 26 9 24 V12 Q9 10 11 10 Z'

function SquaredO({ d }: { d: string }) {
  return (
    <svg className="lp-wm-o" viewBox="0 0 31 36" fill="none">
      <path d={d} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

// Group 3 nested-line variants — each is a single full-width SVG that
// draws the entire "LOGO.AI" wordmark as concentric outlines. All paths
// inherit stroke from a wrapping <g>. The 2 dot <rect>s switch stroke
// color based on the colorway.

// Variant 1 — Nested outline (4-layer L · 4-layer O × 2 · 4-layer Y-arrow · 4-layer rectangle · 4-layer A · trailing bars)
const V1_PATHS = [
  'M0 0 L0 100 L60 100','M6 0 L6 94 L60 94','M12 0 L12 88 L60 88','M18 0 L18 82 L60 82',
  'M74 0 L126 0 Q138 0 138 12 L138 88 Q138 100 126 100 L74 100 Q62 100 62 88 L62 12 Q62 0 74 0 Z',
  'M80 6 L120 6 Q132 6 132 18 L132 82 Q132 94 120 94 L80 94 Q68 94 68 82 L68 18 Q68 6 80 6 Z',
  'M86 12 L114 12 Q126 12 126 24 L126 76 Q126 88 114 88 L86 88 Q74 88 74 76 L74 24 Q74 12 86 12 Z',
  'M92 18 L108 18 Q120 18 120 30 L120 70 Q120 82 108 82 L92 82 Q80 82 80 70 L80 30 Q80 18 92 18 Z',
  'M218 42.0 L218 88 Q218 100 206 100 L152 100 Q140 100 140 88 L140 12 Q140 0 152 0 L206 0 Q218 0 218 12 L218 30.0',
  'M180.56 42.0 L218 42.0',
  'M212 42.0 L212 82 Q212 94 200 94 L158 94 Q146 94 146 82 L146 18 Q146 6 158 6 L200 6 Q212 6 212 18 L212 30.0',
  'M180.56 42.0 L212 42.0',
  'M206 42.0 L206 76 Q206 88 194 88 L164 88 Q152 88 152 76 L152 24 Q152 12 164 12 L194 12 Q206 12 206 24 L206 30.0',
  'M180.56 42.0 L206 42.0',
  'M200 42.0 L200 70 Q200 82 188 82 L170 82 Q158 82 158 70 L158 30 Q158 18 170 18 L188 18 Q200 18 200 30 L200 30.0',
  'M180.56 42.0 L200 42.0',
  'M232 0 L284 0 Q296 0 296 12 L296 88 Q296 100 284 100 L232 100 Q220 100 220 88 L220 12 Q220 0 232 0 Z',
  'M238 6 L278 6 Q290 6 290 18 L290 82 Q290 94 278 94 L238 94 Q226 94 226 82 L226 18 Q226 6 238 6 Z',
  'M244 12 L272 12 Q284 12 284 24 L284 76 Q284 88 272 88 L244 88 Q232 88 232 76 L232 24 Q232 12 244 12 Z',
  'M250 18 L266 18 Q278 18 278 30 L278 70 Q278 82 266 82 L250 82 Q238 82 238 70 L238 30 Q238 18 250 18 Z',
  'M311.2 100 L335.52 0 L362.88 0 L387.2 100',
  'M320.4416 62.0 L377.9584 62.0',
  'M317.2 100 L338.52 6 L359.88 6 L381.2 100',
  'M325.8187234042553 62.0 L372.58127659574467 62.0',
  'M323.2 100 L341.52 12 L356.88 12 L375.2 100',
  'M331.1109090909091 62.0 L367.2890909090909 62.0',
  'M329.2 100 L344.52 18 L353.88 18 L369.2 100',
  'M336.29951219512196 62.0 L362.100487804878 62.0',
  'M389.2 0 L389.2 100','M395.2 0 L395.2 100','M401.2 0 L401.2 100','M407.2 0 L407.2 100',
]

// Variant 4 — Dense nested (6-layer everything, finer stroke-width 2.2)
const V4_PATHS = [
  'M0.0 0 L0.0 100.0 L60 100.0','M4.5 0 L4.5 95.5 L60 95.5','M9.0 0 L9.0 91.0 L60 91.0',
  'M13.5 0 L13.5 86.5 L60 86.5','M18.0 0 L18.0 82.0 L60 82.0','M22.5 0 L22.5 77.5 L60 77.5',
  'M74.0 0.0 L126.0 0.0 Q138.0 0.0 138.0 12.0 L138.0 88.0 Q138.0 100.0 126.0 100.0 L74.0 100.0 Q62.0 100.0 62.0 88.0 L62.0 12.0 Q62.0 0.0 74.0 0.0 Z',
  'M78.5 4.5 L121.5 4.5 Q133.5 4.5 133.5 16.5 L133.5 83.5 Q133.5 95.5 121.5 95.5 L78.5 95.5 Q66.5 95.5 66.5 83.5 L66.5 16.5 Q66.5 4.5 78.5 4.5 Z',
  'M83.0 9.0 L117.0 9.0 Q129.0 9.0 129.0 21.0 L129.0 79.0 Q129.0 91.0 117.0 91.0 L83.0 91.0 Q71.0 91.0 71.0 79.0 L71.0 21.0 Q71.0 9.0 83.0 9.0 Z',
  'M87.5 13.5 L112.5 13.5 Q124.5 13.5 124.5 25.5 L124.5 74.5 Q124.5 86.5 112.5 86.5 L87.5 86.5 Q75.5 86.5 75.5 74.5 L75.5 25.5 Q75.5 13.5 87.5 13.5 Z',
  'M92.0 18.0 L108.0 18.0 Q120.0 18.0 120.0 30.0 L120.0 70.0 Q120.0 82.0 108.0 82.0 L92.0 82.0 Q80.0 82.0 80.0 70.0 L80.0 30.0 Q80.0 18.0 92.0 18.0 Z',
  'M96.5 22.5 L103.5 22.5 Q115.5 22.5 115.5 34.5 L115.5 65.5 Q115.5 77.5 103.5 77.5 L96.5 77.5 Q84.5 77.5 84.5 65.5 L84.5 34.5 Q84.5 22.5 96.5 22.5 Z',
  'M218.0 42.0 L218.0 88.0 Q218.0 100.0 206.0 100.0 L152.0 100.0 Q140.0 100.0 140.0 88.0 L140.0 12.0 Q140.0 0.0 152.0 0.0 L206.0 0.0 Q218.0 0.0 218.0 12.0 L218.0 30.0',
  'M180.56 42.0 L218.0 42.0',
  'M213.5 42.0 L213.5 83.5 Q213.5 95.5 201.5 95.5 L156.5 95.5 Q144.5 95.5 144.5 83.5 L144.5 16.5 Q144.5 4.5 156.5 4.5 L201.5 4.5 Q213.5 4.5 213.5 16.5 L213.5 30.0',
  'M180.56 42.0 L213.5 42.0',
  'M209.0 42.0 L209.0 79.0 Q209.0 91.0 197.0 91.0 L161.0 91.0 Q149.0 91.0 149.0 79.0 L149.0 21.0 Q149.0 9.0 161.0 9.0 L197.0 9.0 Q209.0 9.0 209.0 21.0 L209.0 30.0',
  'M180.56 42.0 L209.0 42.0',
  'M204.5 42.0 L204.5 74.5 Q204.5 86.5 192.5 86.5 L165.5 86.5 Q153.5 86.5 153.5 74.5 L153.5 25.5 Q153.5 13.5 165.5 13.5 L192.5 13.5 Q204.5 13.5 204.5 25.5 L204.5 30.0',
  'M180.56 42.0 L204.5 42.0',
  'M200.0 42.0 L200.0 70.0 Q200.0 82.0 188.0 82.0 L170.0 82.0 Q158.0 82.0 158.0 70.0 L158.0 30.0 Q158.0 18.0 170.0 18.0 L188.0 18.0 Q200.0 18.0 200.0 30.0 L200.0 30.0',
  'M180.56 42.0 L200.0 42.0',
  'M195.5 42.0 L195.5 65.5 Q195.5 77.5 183.5 77.5 L174.5 77.5 Q162.5 77.5 162.5 65.5 L162.5 34.5 Q162.5 22.5 174.5 22.5 L183.5 22.5 Q195.5 22.5 195.5 34.5 L195.5 30.0',
  'M180.56 42.0 L195.5 42.0',
  'M232.0 0.0 L284.0 0.0 Q296.0 0.0 296.0 12.0 L296.0 88.0 Q296.0 100.0 284.0 100.0 L232.0 100.0 Q220.0 100.0 220.0 88.0 L220.0 12.0 Q220.0 0.0 232.0 0.0 Z',
  'M236.5 4.5 L279.5 4.5 Q291.5 4.5 291.5 16.5 L291.5 83.5 Q291.5 95.5 279.5 95.5 L236.5 95.5 Q224.5 95.5 224.5 83.5 L224.5 16.5 Q224.5 4.5 236.5 4.5 Z',
  'M241.0 9.0 L275.0 9.0 Q287.0 9.0 287.0 21.0 L287.0 79.0 Q287.0 91.0 275.0 91.0 L241.0 91.0 Q229.0 91.0 229.0 79.0 L229.0 21.0 Q229.0 9.0 241.0 9.0 Z',
  'M245.5 13.5 L270.5 13.5 Q282.5 13.5 282.5 25.5 L282.5 74.5 Q282.5 86.5 270.5 86.5 L245.5 86.5 Q233.5 86.5 233.5 74.5 L233.5 25.5 Q233.5 13.5 245.5 13.5 Z',
  'M250.0 18.0 L266.0 18.0 Q278.0 18.0 278.0 30.0 L278.0 70.0 Q278.0 82.0 266.0 82.0 L250.0 82.0 Q238.0 82.0 238.0 70.0 L238.0 30.0 Q238.0 18.0 250.0 18.0 Z',
  'M254.5 22.5 L261.5 22.5 Q273.5 22.5 273.5 34.5 L273.5 65.5 Q273.5 77.5 261.5 77.5 L254.5 77.5 Q242.5 77.5 242.5 65.5 L242.5 34.5 Q242.5 22.5 254.5 22.5 Z',
  'M307.04 100 L331.36 0.0 L358.72 0.0 L383.04 100',
  'M316.2816 62.0 L373.7984 62.0',
  'M311.54 100 L333.61 4.5 L356.47 4.5 L378.54 100',
  'M320.32178010471205 62.0 L369.758219895288 62.0',
  'M316.04 100 L335.86 9.0 L354.22 9.0 L374.04 100',
  'M324.3164835164835 62.0 L365.7635164835165 62.0',
  'M320.54 100 L338.11 13.5 L351.97 13.5 L369.54 100',
  'M328.258612716763 62.0 L361.821387283237 62.0',
  'M325.04 100 L340.36 18.0 L349.72 18.0 L365.04 100',
  'M332.139512195122 62.0 L357.94048780487805 62.0',
  'M329.54 100 L342.61 22.5 L347.47 22.5 L360.54 100',
  'M335.94851612903227 62.0 L354.13148387096777 62.0',
  'M385.04 0 L385.04 100','M389.54 0 L389.54 100','M394.04 0 L394.04 100',
  'M398.54 0 L398.54 100','M403.04 0 L403.04 100','M407.54 0 L407.54 100',
]

// Variant 5 — Nested sharp (4-layer everything, sharp right-angle joins)
const V5_PATHS = [
  'M0 0 L0 100 L60 100','M6 0 L6 94 L60 94','M12 0 L12 88 L60 88','M18 0 L18 82 L60 82',
  'M62 0 L138 0 L138 100 L62 100 Z','M68 6 L132 6 L132 94 L68 94 Z',
  'M74 12 L126 12 L126 88 L74 88 Z','M80 18 L120 18 L120 82 L80 82 Z',
  'M218 42.0 L218 100 L140 100 L140 0 L218 0 L218 28.000000000000004',
  'M180.56 42.0 L218 42.0',
  'M212 42.0 L212 94 L146 94 L146 6 L212 6 L212 28.000000000000004',
  'M180.56 42.0 L212 42.0',
  'M206 42.0 L206 88 L152 88 L152 12 L206 12 L206 28.000000000000004',
  'M180.56 42.0 L206 42.0',
  'M200 42.0 L200 82 L158 82 L158 18 L200 18 L200 28.000000000000004',
  'M180.56 42.0 L200 42.0',
  'M220 0 L296 0 L296 100 L220 100 Z','M226 6 L290 6 L290 94 L226 94 Z',
  'M232 12 L284 12 L284 88 L232 88 Z','M238 18 L278 18 L278 82 L238 82 Z',
  'M311.2 100 L335.52 0 L362.88 0 L387.2 100',
  'M320.4416 62.0 L377.9584 62.0',
  'M317.2 100 L338.52 6 L359.88 6 L381.2 100',
  'M325.8187234042553 62.0 L372.58127659574467 62.0',
  'M323.2 100 L341.52 12 L356.88 12 L375.2 100',
  'M331.1109090909091 62.0 L367.2890909090909 62.0',
  'M329.2 100 L344.52 18 L353.88 18 L369.2 100',
  'M336.29951219512196 62.0 L362.100487804878 62.0',
  'M389.2 0 L389.2 100','M395.2 0 L395.2 100','M401.2 0 L401.2 100','M407.2 0 L407.2 100',
]

type NestedProps = { paths: string[]; sw: number; dotOrange: boolean; dot: { o: [number, number, number]; i: [number, number, number] } }

function NestedSvg({ paths, sw, dotOrange, dot }: NestedProps) {
  const dotStroke = dotOrange ? '#FF5C2E' : 'currentColor'
  return (
    <svg className="lp-wm-nested" viewBox="-4 -4 431.2 108" fill="none" preserveAspectRatio="xMinYMid meet">
      <g stroke="currentColor" strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d, i) => <path key={i} d={d} />)}
      </g>
      <rect x={dot.o[0]} y={dot.o[1]} width={dot.o[2]} height={dot.o[2]} rx="1" stroke={dotStroke} strokeWidth={sw} fill="none" />
      <rect x={dot.i[0]} y={dot.i[1]} width={dot.i[2]} height={dot.i[2]} rx="1" stroke={dotStroke} strokeWidth={sw} fill="none" />
    </svg>
  )
}

const DOT_V1: NestedProps['dot'] = { o: [298.0, 88.8, 11.2], i: [302.2, 93.0, 2.8] }
const DOT_V4: NestedProps['dot'] = { o: [298.0, 92.96, 7.04], i: [301.15, 96.11, 0.74] }
const DOT_V5 = DOT_V1

function renderVariant(v: WmVariant) {
  const orange = v.endsWith('-orange')

  // Group 1 / 2 — type + tiny SVG O hybrids.
  if (v.startsWith('a-') || v.startsWith('d-') || v.startsWith('e-')) {
    const dotStyle = orange ? { background: '#FF5C2E' } : { background: 'currentColor' }
    const dot = <span className="lp-wm-dot" style={dotStyle} />
    if (v.startsWith('a-')) return <>LOGO{dot}AI</>
    const path = v.startsWith('d-') ? O_SHARP : O_ROUNDED
    return <>L<SquaredO d={path} />G<SquaredO d={path} />{dot}AI</>
  }

  // Group 3 — single full-width nested-line SVG.
  if (v.startsWith('n1-')) return <NestedSvg paths={V1_PATHS} sw={3.5} dotOrange={orange} dot={DOT_V1} />
  if (v.startsWith('n4-')) return <NestedSvg paths={V4_PATHS} sw={2.2} dotOrange={orange} dot={DOT_V4} />
  return <NestedSvg paths={V5_PATHS} sw={3.5} dotOrange={orange} dot={DOT_V5} />
}

export default function MLpLogo() {
  const [variant, setVariant] = useState<WmVariant>(DEFAULT_WM)

  useEffect(() => {
    const root = document.querySelector('.lp-root')
    if (!root) return
    const sync = () => {
      const v = root.getAttribute('data-wm')
      if (isVariant(v)) setVariant(v)
    }
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['data-wm'] })
    return () => obs.disconnect()
  }, [])

  return (
    <span className={`lp-wm-custom is-wm-${variant}`} aria-hidden>
      {renderVariant(variant)}
    </span>
  )
}
