'use client'

// MLpLogo — renders the Custom-mode site wordmark. Locked to the
// "A · Original — round O · all white" variant from the LOGO
// VARIATIONS reference file. The previous 12-variant picker has been
// removed since this variant is final.
//
// Markup: Montserrat 900 "LOGO•AI" with a small square dot, all white.
// Colors flow through currentColor / inherit so the dot tracks the
// brand text color.

export default function MLpLogo() {
  return (
    <span className="lp-wm-custom is-wm-a-white" aria-hidden>
      LOGO<span className="lp-wm-dot" style={{ background: 'currentColor' }} />AI
    </span>
  )
}
