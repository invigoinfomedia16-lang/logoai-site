'use client'

// Cookie Policy — shorter legal, 5 sections.
// Copy verbatim from CONTENT/NEW/COOKIE POLICY.docx.

import LSection from '../_components/LSection'

type Section = { title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    title: 'What are cookies?',
    body: (
      <>
        <p>Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences, keep you logged in, and understand how visitors use the site.</p>
        <p>Some cookies are essential to make a website work. Others help us improve the experience.</p>
      </>
    ),
  },
  {
    title: 'Cookies we use',
    body: (
      <>
        <p><strong>Strictly necessary (always on)</strong> — These cookies are essential for LOGO.AI to function. They can&apos;t be turned off.</p>
        <ul>
          <li>Session cookies — keep you logged in during your visit</li>
          <li>Security cookies — protect against fraud and unauthorized access</li>
          <li>Load balancing — ensure the site works reliably</li>
        </ul>
        <p><strong>Functional (optional)</strong> — These cookies remember your preferences.</p>
        <ul>
          <li>Language and region preferences</li>
          <li>Interface choices</li>
        </ul>
        <p><strong>Analytics (optional)</strong> — These cookies help us understand how visitors use LOGO.AI so we can improve it.</p>
        <ul>
          <li>Traffic analytics — anonymized data about how visitors use our site</li>
          <li>Performance monitoring — information about site speed and errors</li>
        </ul>
        <p><strong>Marketing (optional)</strong> — These cookies help us reach people who might benefit from LOGO.AI.</p>
        <ul>
          <li>Conversion tracking — measuring the effectiveness of our marketing campaigns</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Third-party cookies',
    body: (
      <>
        <p>Some of our partners set their own cookies when you visit our site. These include analytics, hosting, and advertising providers that help us deliver and improve our service.</p>
        <p>We don&apos;t control these cookies. Check the partner&apos;s privacy policy for more information.</p>
      </>
    ),
  },
  {
    title: 'How to manage cookies',
    body: (
      <>
        <p><strong>On LOGO.AI:</strong> When you first visit our site, you&apos;ll see a cookie banner letting you accept or decline non-essential cookies. You can change these preferences any time in your account settings.</p>
        <p><strong>In your browser:</strong> Most browsers let you block or delete cookies. Here&apos;s how:</p>
        <ul>
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
          <li><strong>Safari:</strong> Preferences → Privacy</li>
          <li><strong>Firefox:</strong> Settings → Privacy &amp; Security</li>
          <li><strong>Edge:</strong> Settings → Privacy, search, and services</li>
        </ul>
        <p><strong>Note:</strong> Blocking essential cookies may prevent parts of LOGO.AI from working properly.</p>
      </>
    ),
  },
  {
    title: 'Updates to this policy',
    body: (
      <p>We&apos;ll update this policy if we change the cookies we use. Check back for the latest version.</p>
    ),
  },
  {
    title: 'Questions?',
    body: (
      <p><a href="mailto:privacy@logo.ai" className="l-link" style={{ fontWeight: 500 }}>privacy@logo.ai</a></p>
    ),
  },
]

export default function CookiesPage() {
  return (
    <main>
      <LSection>
        <div className="max-w-[720px] mx-auto text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Cookie Policy</h1>
          <p className="dk-caption mb-8" style={{ color: 'rgba(21,20,26,0.55)' }}>
            Last updated: May 1, 2026
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.75)', textAlign: 'left' }}>
            This Cookie Policy explains what cookies are, how we use them on LOGO.AI, and how you can manage your cookie preferences.
          </p>
        </div>
      </LSection>

      <LSection tone="alt">
        <div className="max-w-[720px] mx-auto flex flex-col gap-12 legal-prose">
          {SECTIONS.map((s, i) => (
            <section key={i}>
              <h2 className="dk-h3 mb-4" style={{ color: '#15141A' }}>
                {s.title}
              </h2>
              <div className="dk-body-lg" style={{ color: '#15141A', lineHeight: '1.7' }}>
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <style jsx global>{`
          .legal-prose ul {
            list-style: disc;
            padding-left: 24px;
            margin: 8px 0 16px;
            color: rgba(21,20,26,0.75);
          }
          .legal-prose li { margin-bottom: 6px; }
          .legal-prose p { margin: 0 0 12px; color: rgba(21,20,26,0.75); }
          .legal-prose strong { color: #15141A; font-weight: 600; }
        `}</style>
      </LSection>
    </main>
  )
}
