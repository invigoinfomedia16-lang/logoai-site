'use client'

// useEmailSignup — shared signup state across every MLpEmailForm on the
// page. Submitting on the hero flips the Final CTA's instance into the
// success state too (and vice versa) so the user never sees a "did my
// submit not work?" duplicate form below the fold. Persisted to
// sessionStorage so refreshing within the same tab keeps the success
// state — but not localStorage, so the form re-appears on a new
// browser session. Backed by a CustomEvent dispatch so multiple
// instances within the same React tree stay in sync without a context
// provider.

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'lp_signup'
const EVENT_NAME = 'lp-signup-update'

export type SignupState = {
  submitted: boolean
  email: string
}

function readFromStorage(): SignupState {
  if (typeof window === 'undefined') return { submitted: false, email: '' }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed.submitted === 'boolean') {
        return {
          submitted: parsed.submitted,
          email: typeof parsed.email === 'string' ? parsed.email : '',
        }
      }
    }
  } catch {
    // Ignore corrupt storage / quota errors — fall through to default.
  }
  return { submitted: false, email: '' }
}

export function submitSignup(email: string) {
  const next: SignupState = { submitted: true, email }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can fail (Safari private mode, quota); the in-memory
    // event dispatch below still syncs every live instance, so the
    // success state propagates even if persistence fails.
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME))
}

export function useEmailSignup(): SignupState {
  // First render must match SSR (always not-submitted) to avoid a
  // hydration mismatch. The useEffect below rehydrates from
  // sessionStorage immediately after mount.
  const [state, setState] = useState<SignupState>({ submitted: false, email: '' })

  useEffect(() => {
    setState(readFromStorage())
    const onChange = () => setState(readFromStorage())
    window.addEventListener(EVENT_NAME, onChange)
    return () => window.removeEventListener(EVENT_NAME, onChange)
  }, [])

  return state
}
