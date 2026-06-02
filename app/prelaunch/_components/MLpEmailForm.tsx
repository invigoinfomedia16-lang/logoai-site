'use client'

// MLpEmailForm — shared email form used in the hero + Final CTA. On
// submit it validates the email shape and swaps the form for a
// success card ("You're on the list…"). NOT wired to a backend yet —
// the email lives only in local state; nothing is sent anywhere. This
// gives users feedback during prelaunch; a real waitlist provider
// (Resend / Supabase / Mailchimp) can be layered in later without
// touching the markup at the call sites.

import { useState, type FormEvent } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Variant = 'hero' | 'final'

export default function MLpEmailForm({
  variant = 'hero',
  buttonLabel = 'Get My Free Logo',
}: {
  variant?: Variant
  buttonLabel?: string
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
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
  .email-form .lp-form-error {
    flex-basis: 100%;
    margin: 8px 0 0;
    color: #ff8b6b;
    font-family: var(--sans, 'DM Sans', system-ui, sans-serif);
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
