'use client'

// Cross-component "submitted" flag. Once the user submits their email anywhere
// on the site, every CTA on every page swaps to the success state and stays
// there. Persisted to localStorage and broadcast via a window event so all
// components hydrate from the same source of truth.

import { useCallback, useEffect, useState } from 'react'

const KEY = 'logoai:submitted'
const EVENT = 'logoai:submitted-changed'

function read(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function useSubmitted(): [boolean, () => void] {
  const [submitted, setLocal] = useState<boolean>(false)

  useEffect(() => {
    setLocal(read())
    const onChange = () => setLocal(read())
    window.addEventListener(EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const markSubmitted = useCallback(() => {
    try {
      window.localStorage.setItem(KEY, '1')
    } catch {
      // ignore — still update in-memory
    }
    window.dispatchEvent(new Event(EVENT))
    setLocal(true)
  }, [])

  return [submitted, markSubmitted]
}

// Smooth-scrolls to the homepage hero email form. Works on any page:
//   - On a page with #hero-cta in the DOM → smooth scroll to it.
//   - Otherwise → navigate to /design-l#hero-cta.
export function scrollToHeroCTA() {
  if (typeof window === 'undefined') return
  const el = document.getElementById('hero-cta')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  } else {
    window.location.href = '/design-l#hero-cta'
  }
}
