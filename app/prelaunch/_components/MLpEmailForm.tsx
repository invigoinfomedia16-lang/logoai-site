'use client'

// MLpEmailForm — shared email form used in the hero + Final CTA. On
// submit it validates the email shape and swaps the form for a
// success card ("You're on the list…"). The submitted state is shared
// across every instance on the page via useEmailSignup, so submitting
// the hero form also swaps the Final CTA's form into the success
// state (and vice versa). NOT wired to a backend yet — the email
// lives only in sessionStorage; nothing is sent anywhere. A real
// waitlist provider can be layered in inside onSubmit later without
// touching the markup at the call sites.

import { useState, type FormEvent } from 'react'
import { submitSignup, useEmailSignup } from './useEmailSignup'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Variant = 'hero' | 'final'

export default function MLpEmailForm({
  variant = 'hero',
  buttonLabel = 'Get My Free Logo',
}: {
  variant?: Variant
  buttonLabel?: string
}) {
  const { submitted } = useEmailSignup()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    submitSignup(trimmed)
  }

  if (submitted) {
    return (
      <div
        className={`lp-form-success${variant === 'final' ? ' is-final' : ''}`}
        role="status"
        aria-live="polite"
      >
        <style dangerouslySetInnerHTML={{ __html: SUCCESS_STYLES }} />
        <span className="lp-form-success-check" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" fill="#E8420D" />
            <path d="M6.5 11.5l3.2 3.2 5.8-6.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="lp-form-success-text">
          <strong>You&rsquo;re on the list.</strong>
          <span>We&rsquo;ll email you the moment we launch so you can claim your free logo.</span>
        </div>
      </div>
    )
  }

  const className = `email-form${variant === 'final' ? ' final-form-row' : ''}`

  return (
    <form className={className} onSubmit={onSubmit} noValidate>
      <style dangerouslySetInnerHTML={{ __html: FORM_STYLES }} />
      <input
        id={`${variant}-email`}
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (error) setError('')
        }}
        placeholder="Enter your email"
        aria-label="Enter your email"
        aria-invalid={error ? 'true' : 'false'}
        required
      />
      <button type="submit">
        {buttonLabel} <span className="arr">→</span>
      </button>
      {error && (
        <p className="lp-form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

const FORM_STYLES = `
  /* Self-contained form styling so MLpEmailForm renders correctly on
     every page (main /prelaunch + every subpage via MLpSubpageShell).
     Previously these lived only in page.tsx, so subpage forms showed
     up as default browser inputs/buttons. */
  .email-form {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: stretch;
  }
  .email-form input {
    flex: 1;
    min-width: 0;
    /* Elevated tint so the input lifts off the page bg (which is also
       near-black) and reads as an interactive surface. */
    background: rgba(232, 232, 230, 0.04);
    border: 1px solid rgba(232, 232, 230, 0.14);
    color: #f4f4f6;
    padding: 15px 22px;
    border-radius: 999px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 17px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .email-form input::placeholder { color: #7e7e8c; }
  .email-form input:focus {
    border-color: #E8420D;
    box-shadow: 0 0 0 3px rgba(232, 66, 13, 0.18);
  }
  .email-form button {
    background: #E8420D;
    color: #fff;
    border: 0;
    padding: 15px 26px;
    border-radius: 999px;
    /* Match the input font-size so the pill heights line up and the
       button reads as a peer of the input, not a smaller nav-pill. */
    font-family: 'DM Sans', system-ui, sans-serif;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    transition: background .2s, transform .15s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .email-form button:hover {
    background: #FF5C2E;
    transform: translateY(-1px);
  }
  .email-form button .arr { transition: transform .2s; }
  .email-form button:hover .arr { transform: translateX(3px); }
  @media (max-width: 560px) {
    .email-form { flex-direction: column; gap: 10px; }
    .email-form button { width: 100%; }
  }

  .email-form .lp-form-error {
    flex-basis: 100%;
    margin: 8px 0 0;
    color: #ff8b6b;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    text-align: left;
  }
`

const SUCCESS_STYLES = `
  .lp-form-success {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: rgba(232, 66, 13, 0.08);
    border: 1px solid rgba(232, 66, 13, 0.35);
    border-radius: 16px;
    padding: 18px 22px;
    max-width: 620px;
    margin: 0 auto;
    text-align: left;
  }
  .lp-form-success.is-final { max-width: 560px; }
  .lp-form-success-check {
    flex-shrink: 0;
    display: inline-flex;
    padding-top: 2px;
  }
  .lp-form-success-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
  }
  .lp-form-success-text strong {
    color: var(--text, #f4f4f6);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.3;
  }
  .lp-form-success-text span {
    color: var(--text-2, #b8b8c4);
    font-size: 14px;
    line-height: 1.5;
  }
`
