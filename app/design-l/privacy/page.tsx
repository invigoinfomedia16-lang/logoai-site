'use client'

// Privacy Policy — long-form legal text, numbered sections.
// Copy verbatim from CONTENT/NEW/PRIVACY POLICY.docx.

import LSection from '../_components/LSection'

type Section = { num: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    num: '1',
    title: 'Who we are',
    body: (
      <>
        <p>LOGO.AI is operated by LOGO.AI, Inc., headquartered in San Francisco, California, with teams in Singapore, Tallinn, and Dubai.</p>
        <p>For the purposes of GDPR, we are the data controller of the personal information you share with us.</p>
      </>
    ),
  },
  {
    num: '2',
    title: 'What we collect',
    body: (
      <>
        <p>We collect only the data we need to deliver our service.</p>
        <p><strong>You give us:</strong></p>
        <ul>
          <li><strong>Email address</strong> — to let you claim your free logo and send you account updates</li>
          <li><strong>Brand description</strong> — the business name and short description you enter to generate your logo</li>
          <li><strong>Logo preferences</strong> — any choices you make during the design process</li>
        </ul>
        <p><strong>We automatically collect:</strong></p>
        <ul>
          <li><strong>Device and browser information</strong> — IP address, browser type, operating system</li>
          <li><strong>Usage data</strong> — pages viewed, features used, time spent on site</li>
          <li><strong>Cookies and similar technologies</strong> — see our Cookie Policy for details</li>
        </ul>
        <p><strong>We do not collect:</strong></p>
        <ul>
          <li>Payment information (not until you purchase the paid brand kit)</li>
          <li>Social security numbers, government IDs, or financial account details</li>
          <li>Data from other accounts unless you explicitly share it</li>
        </ul>
      </>
    ),
  },
  {
    num: '3',
    title: 'How we use your data',
    body: (
      <>
        <p>We use your data only to:</p>
        <ul>
          <li>Generate and deliver your logo</li>
          <li>Send you account and service updates</li>
          <li>Improve our AI and product based on aggregated, anonymized patterns</li>
          <li>Respond to your support requests</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p><strong>What we will never do:</strong></p>
        <ul>
          <li>Sell your personal data to third parties</li>
          <li>Use your logo or brand description to train third-party AI models</li>
          <li>Share your contact information with advertisers</li>
          <li>Track you across the web for advertising purposes</li>
        </ul>
      </>
    ),
  },
  {
    num: '4',
    title: 'Who we share it with',
    body: (
      <>
        <p>We share data only with carefully chosen partners who help us run LOGO.AI:</p>
        <ul>
          <li><strong>Cloud hosting providers</strong> — to store and serve our product</li>
          <li><strong>Email service providers</strong> — to send account and support emails</li>
          <li><strong>Analytics providers</strong> — to understand how our product is used (anonymized where possible)</li>
          <li><strong>Payment processors</strong> — if and when you purchase the paid brand kit</li>
        </ul>
        <p>All partners are contractually bound to protect your data and use it only for the specific services they provide to us.</p>
      </>
    ),
  },
  {
    num: '5',
    title: 'How long we keep it',
    body: (
      <>
        <ul>
          <li><strong>Account data</strong> — for as long as you have an account, plus 30 days after deletion</li>
          <li><strong>Generated logos</strong> — stored for your access for the life of your account</li>
          <li><strong>Usage data</strong> — up to 24 months, then anonymized or deleted</li>
          <li><strong>Legal records</strong> — as required by applicable law</li>
        </ul>
        <p>You can request deletion of your data at any time by emailing <a href="mailto:privacy@logo.ai" className="l-link">privacy@logo.ai</a>.</p>
      </>
    ),
  },
  {
    num: '6',
    title: 'Your rights',
    body: (
      <>
        <p>Depending on where you live, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Delete your data (right to be forgotten)</li>
          <li>Export your data in a portable format</li>
          <li>Object to certain uses of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:privacy@logo.ai" className="l-link">privacy@logo.ai</a>. We&apos;ll respond within 30 days.</p>
        <p><strong>California residents:</strong> You have additional rights under the California Consumer Privacy Act (CCPA). See Section 8 below.</p>
      </>
    ),
  },
  {
    num: '7',
    title: 'How we protect it',
    body: (
      <>
        <ul>
          <li>Encryption in transit (HTTPS/TLS) and at rest</li>
          <li>Access controls limiting internal data access to authorized personnel</li>
          <li>Regular security audits and penetration testing</li>
          <li>Incident response protocols for any data breach</li>
        </ul>
        <p>No system is perfect, but we treat your data as seriously as we&apos;d treat our own.</p>
      </>
    ),
  },
  {
    num: '8',
    title: 'California residents (CCPA)',
    body: (
      <>
        <p>California residents have the right to:</p>
        <ul>
          <li>Know what personal information we collect, use, disclose, and sell</li>
          <li>Delete personal information we collect</li>
          <li>Opt out of the sale of personal information (we don&apos;t sell your data)</li>
          <li>Non-discrimination for exercising these rights</li>
        </ul>
        <p>To exercise these rights, email <a href="mailto:privacy@logo.ai" className="l-link">privacy@logo.ai</a> with &ldquo;CCPA Request&rdquo; in the subject line.</p>
      </>
    ),
  },
  {
    num: '9',
    title: 'European residents (GDPR)',
    body: (
      <p>European residents have full rights under the General Data Protection Regulation (GDPR). This includes all rights listed in Section 6, plus the right to lodge a complaint with your local data protection authority.</p>
    ),
  },
  {
    num: '10',
    title: "Children's privacy",
    body: (
      <p>LOGO.AI is not intended for users under 13. We do not knowingly collect data from children. If you believe a child has provided us data, email <a href="mailto:privacy@logo.ai" className="l-link">privacy@logo.ai</a> and we will delete it promptly.</p>
    ),
  },
  {
    num: '11',
    title: 'International data transfers',
    body: (
      <p>Your data may be transferred to and processed in countries outside your own — including the United States. We use Standard Contractual Clauses and other approved mechanisms to ensure your data receives adequate protection wherever it&apos;s processed.</p>
    ),
  },
  {
    num: '12',
    title: 'Changes to this policy',
    body: (
      <p>We&apos;ll update this policy as our product evolves. We&apos;ll email you about any material changes. Continued use of LOGO.AI after an update means you accept the revised policy.</p>
    ),
  },
  {
    num: '13',
    title: 'Contact us',
    body: (
      <>
        <p>Questions, concerns, or requests about your privacy?</p>
        <p><a href="mailto:privacy@logo.ai" className="l-link" style={{ fontWeight: 500 }}>privacy@logo.ai</a></p>
        <p>Or by mail:<br />LOGO.AI, Inc.<br />[Street Address]<br />San Francisco, CA [ZIP]<br />United States</p>
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <main>
      {/* Hero */}
      <LSection>
        <div className="max-w-[720px] mx-auto text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Privacy Policy</h1>
          <p className="dk-caption mb-8" style={{ color: 'rgba(21,20,26,0.55)' }}>
            Last updated: May 1, 2026
          </p>
          <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.75)', textAlign: 'left' }}>
            At LOGO.AI, your privacy isn&apos;t an afterthought — it&apos;s how we operate. This Privacy Policy explains what data we collect, why we collect it, and how we keep it safe.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.75)', textAlign: 'left' }}>
            We&apos;ve written this in plain English. If anything is unclear, reach out at <a href="mailto:privacy@logo.ai" className="l-link">privacy@logo.ai</a>.
          </p>
        </div>
      </LSection>

      {/* Sections — long-form, single-column */}
      <LSection tone="alt">
        <div className="max-w-[720px] mx-auto flex flex-col gap-12 legal-prose">
          {SECTIONS.map((s) => (
            <section key={s.num} id={`section-${s.num}`}>
              <h2
                className="dk-h3 mb-4"
                style={{ color: '#15141A' }}
              >
                <span style={{ color: '#7543E3', marginRight: 12 }}>{s.num}.</span>
                {s.title}
              </h2>
              <div
                className="dk-body-lg"
                style={{ color: '#15141A', lineHeight: '1.7' }}
              >
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
