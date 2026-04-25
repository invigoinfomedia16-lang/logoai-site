'use client'

// Contact — 5 contact methods + 4 office locations + closing note.
// Copy verbatim from CONTENT/NEW/CONTACT.docx.

import LSection from '../_components/LSection'
import LSectionHeader from '../_components/LSectionHeader'

const CONTACT_METHODS = [
  {
    title: 'General questions',
    body: 'Have a question about LOGO.AI? Want to share feedback? Just want to say hi?',
    email: 'hello@logo.ai',
    response: 'Response within 48 hours',
  },
  {
    title: 'Support',
    body: 'Need help with your account, a logo, or the brand kit?',
    email: 'support@logo.ai',
    response: 'Response within 24 hours',
  },
  {
    title: 'Press',
    body: 'Writing about LOGO.AI? Looking for brand assets, interviews, or embargoed materials?',
    email: 'press@logo.ai',
    response: 'Response within 24 hours',
    linkText: 'Visit our Press page for media kit and resources',
    linkHref: '/design-l/press',
  },
  {
    title: 'Partnerships',
    body: 'Want to work with us? Integration partner, affiliate, or business opportunity?',
    email: 'partnerships@logo.ai',
    response: 'Response within 3 business days',
  },
  {
    title: 'Legal',
    body: 'Privacy requests, DMCA notices, or other legal inquiries?',
    email: 'legal@logo.ai',
    response: null,
  },
]

const OFFICES = [
  { city: 'San Francisco', note: '(HQ)', address: '[Street address, San Francisco, CA]' },
  { city: 'Singapore',     note: '',     address: '[Office address]' },
  { city: 'Tallinn',       note: '',     address: '[Office address]' },
  { city: 'Dubai',         note: '',     address: '[Office address]' },
]

export default function ContactPage() {
  return (
    <main>
      {/* Hero — Our Story pattern */}
      <LSection>
        <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Contact</h1>
          <p className="dk-body-lg mb-4" style={{ color: '#7543E3', fontWeight: 500 }}>
            Let&apos;s talk
          </p>
          <p className="dk-body-lg max-w-[620px]" style={{ color: 'rgba(21,20,26,0.7)' }}>
            However you want to reach us — we&apos;re listening.
          </p>
        </div>
      </LSection>

      {/* Contact methods grid */}
      <LSection tone="alt">
        <div
          className="max-w-[900px] mx-auto"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          {CONTACT_METHODS.map((m, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 28,
                border: '1px solid rgba(32,18,58,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                flex: '1 1 280px',
                maxWidth: 340,
                minWidth: 260,
              }}
            >
              <h3 className="dk-h3 m-0" style={{ color: '#15141A' }}>{m.title}</h3>
              <p className="dk-body m-0" style={{ color: 'rgba(21,20,26,0.7)' }}>{m.body}</p>
              <a
                href={`mailto:${m.email}`}
                className="l-link dk-body-lg"
                style={{ fontWeight: 500 }}
              >
                {m.email}
              </a>
              {m.response && (
                <p className="dk-caption m-0" style={{ color: 'rgba(21,20,26,0.55)' }}>
                  {m.response}
                </p>
              )}
              {m.linkText && m.linkHref && (
                <a
                  href={m.linkHref}
                  className="l-link dk-caption inline-flex items-center gap-1"
                  style={{ fontWeight: 500, marginTop: 4 }}
                >
                  → {m.linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </LSection>

      {/* Offices */}
      <LSection>
        <LSectionHeader eyebrow="Our offices" title="Four cities. One mission." />
        <div className="max-w-[640px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {OFFICES.map((o, i) => (
            <div
              key={i}
              style={{
                background: '#F5F0FF',
                borderRadius: 16,
                padding: 24,
                border: '1px solid rgba(32,18,58,0.08)',
              }}
            >
              <p className="dk-body-lg m-0 mb-2" style={{ color: '#15141A', fontWeight: 600 }}>
                {o.city}{o.note && <span style={{ color: '#7543E3', fontWeight: 500 }}> {o.note}</span>}
              </p>
              <p className="dk-caption m-0" style={{ color: 'rgba(21,20,26,0.6)' }}>
                {o.address}
              </p>
            </div>
          ))}
        </div>
      </LSection>

      {/* Closing note */}
      <LSection tone="alt">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="dk-body-lg" style={{ color: '#15141A' }}>
            Can&apos;t find what you need? Send us a note at{' '}
            <a href="mailto:hello@logo.ai" className="l-link" style={{ fontWeight: 500 }}>hello@logo.ai</a>
            {' '}and we&apos;ll route it to the right team.
          </p>
        </div>
      </LSection>
    </main>
  )
}
