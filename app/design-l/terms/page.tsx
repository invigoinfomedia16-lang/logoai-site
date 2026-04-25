'use client'

// Terms of Service — long-form legal text, numbered sections.
// Copy verbatim from CONTENT/NEW/TERMS OF SERVICE.docx.

import LSection from '../_components/LSection'

type Section = { num: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    num: '1',
    title: 'Who can use LOGO.AI',
    body: (
      <>
        <p>You can use LOGO.AI if you are:</p>
        <ul>
          <li>At least 13 years old (or the minimum age in your country)</li>
          <li>Using the service for lawful purposes</li>
          <li>Not prohibited from receiving services under applicable law</li>
        </ul>
        <p>If you&apos;re using LOGO.AI on behalf of a company, you confirm you have authority to bind that company to these Terms.</p>
      </>
    ),
  },
  {
    num: '2',
    title: 'Your account',
    body: (
      <ul>
        <li>You must provide accurate information when creating an account or claiming a logo</li>
        <li>You&apos;re responsible for keeping your account secure</li>
        <li>Don&apos;t share your login credentials with anyone else</li>
        <li>Notify us immediately at <a href="mailto:support@logo.ai" className="l-link">support@logo.ai</a> if you suspect unauthorized access</li>
      </ul>
    ),
  },
  {
    num: '3',
    title: 'Your free logo',
    body: (
      <>
        <p>When you claim a free logo with LOGO.AI:</p>
        <p><strong>You get:</strong></p>
        <ul>
          <li>A high-resolution PNG file with transparent background</li>
          <li>Full commercial and personal rights to use the logo</li>
          <li>The right to modify the logo as you see fit</li>
          <li>The right to trademark the logo (though we can&apos;t guarantee clearance)</li>
        </ul>
        <p><strong>You don&apos;t get:</strong></p>
        <ul>
          <li>Exclusive rights to the visual style (the AI uses common design principles)</li>
          <li>Any guarantee that a similar-looking logo won&apos;t exist elsewhere</li>
          <li>Ownership of the AI model or underlying technology</li>
        </ul>
        <p><strong>We promise:</strong></p>
        <ul>
          <li>Your logo is yours. Forever. No royalties. No attribution required.</li>
          <li>We won&apos;t revoke your logo for any reason after you&apos;ve claimed it.</li>
          <li>We won&apos;t sell the same logo to someone else.</li>
        </ul>
      </>
    ),
  },
  {
    num: '4',
    title: 'The paid brand kit',
    body: (
      <>
        <p>If you purchase the paid brand kit, the same ownership rights in Section 3 apply to all assets you receive.</p>
        <p><strong>Refunds:</strong> If you&apos;re not satisfied with your brand kit purchase, contact us at <a href="mailto:support@logo.ai" className="l-link">support@logo.ai</a> within 14 days of purchase for a full refund. After 14 days, purchases are final unless otherwise required by law.</p>
      </>
    ),
  },
  {
    num: '5',
    title: 'Acceptable use',
    body: (
      <>
        <p>You agree NOT to use LOGO.AI to:</p>
        <ul>
          <li>Create logos that infringe on others&apos; trademarks or copyrights</li>
          <li>Generate content that is illegal, hateful, violent, or sexually explicit</li>
          <li>Impersonate individuals, companies, or brands you don&apos;t own</li>
          <li>Reverse engineer, scrape, or replicate our AI or platform</li>
          <li>Interfere with our service, servers, or other users</li>
          <li>Use the service to build competing products</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these rules.</p>
      </>
    ),
  },
  {
    num: '6',
    title: 'Intellectual property',
    body: (
      <>
        <p><strong>Ours:</strong> The LOGO.AI platform, website, AI model, and brand name are owned by LOGO.AI, Inc. You cannot copy, modify, or reuse our platform or AI.</p>
        <p><strong>Yours:</strong> The logos you generate are yours to use as described in Section 3.</p>
        <p><strong>Feedback:</strong> If you share ideas, feedback, or suggestions with us, we may use them without obligation or payment.</p>
      </>
    ),
  },
  {
    num: '7',
    title: 'Trademark disclaimer',
    body: (
      <>
        <p>LOGO.AI generates original logos designed to be distinct. However, we cannot guarantee:</p>
        <ul>
          <li>Your logo won&apos;t resemble an existing trademark</li>
          <li>Your logo will be approved for trademark registration</li>
          <li>Your logo won&apos;t be challenged by another party</li>
        </ul>
        <p>If you plan to register a trademark, we strongly recommend a professional trademark search and legal review before filing.</p>
      </>
    ),
  },
  {
    num: '8',
    title: 'Disclaimers',
    body: (
      <>
        <p>LOGO.AI is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;</p>
        <p>We make no warranties that:</p>
        <ul>
          <li>The service will be uninterrupted, error-free, or completely secure</li>
          <li>Specific logo results will meet your expectations</li>
          <li>The service will fit a particular purpose</li>
        </ul>
        <p>To the fullest extent allowed by law, we disclaim all implied warranties, including merchantability and fitness for a particular purpose.</p>
      </>
    ),
  },
  {
    num: '9',
    title: 'Limitation of liability',
    body: (
      <>
        <p>To the fullest extent allowed by law, LOGO.AI and its team are not liable for:</p>
        <ul>
          <li>Indirect, incidental, special, or consequential damages</li>
          <li>Loss of profits, data, or business opportunities</li>
          <li>Damages exceeding the amount you&apos;ve paid us in the past 12 months (or $100 if you haven&apos;t paid us anything)</li>
        </ul>
        <p>Some jurisdictions don&apos;t allow these limitations, so they may not apply to you.</p>
      </>
    ),
  },
  {
    num: '10',
    title: 'Indemnification',
    body: (
      <>
        <p>You agree to defend and indemnify LOGO.AI against any claims arising from:</p>
        <ul>
          <li>Your use of the service in violation of these Terms</li>
          <li>Your misuse of generated logos</li>
          <li>Your violation of applicable law</li>
        </ul>
      </>
    ),
  },
  {
    num: '11',
    title: 'Termination',
    body: (
      <>
        <p>You can stop using LOGO.AI at any time. We can suspend or terminate your account if:</p>
        <ul>
          <li>You violate these Terms</li>
          <li>Your use of the service poses a legal or security risk</li>
          <li>We&apos;re required to do so by law</li>
        </ul>
        <p>If we terminate your account without cause, you keep all logos you&apos;ve already claimed.</p>
      </>
    ),
  },
  {
    num: '12',
    title: 'Changes to these Terms',
    body: (
      <p>We&apos;ll update these Terms as our product evolves. We&apos;ll email you about any material changes. Continued use after an update means you accept the revised Terms.</p>
    ),
  },
  {
    num: '13',
    title: 'Governing law',
    body: (
      <>
        <p>These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved in the state or federal courts of San Francisco County, California.</p>
        <p><strong>If you&apos;re in the EU:</strong> You also have rights under your country&apos;s consumer protection laws, which cannot be overridden by these Terms.</p>
      </>
    ),
  },
  {
    num: '14',
    title: 'Contact us',
    body: (
      <>
        <p>Questions about these Terms?</p>
        <p><a href="mailto:legal@logo.ai" className="l-link" style={{ fontWeight: 500 }}>legal@logo.ai</a></p>
        <p>LOGO.AI, Inc.<br />[Street Address]<br />San Francisco, CA [ZIP]<br />United States</p>
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <main>
      <LSection>
        <div className="max-w-[720px] mx-auto text-center">
          <h1 className="dk-h1 mb-5" style={{ color: '#15141A' }}>Terms of Service</h1>
          <p className="dk-caption mb-8" style={{ color: 'rgba(21,20,26,0.55)' }}>
            Last updated: May 1, 2026
          </p>
          <p className="dk-body-lg mb-4" style={{ color: 'rgba(21,20,26,0.75)', textAlign: 'left' }}>
            Welcome to LOGO.AI. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website, product, and services. By using LOGO.AI, you agree to these Terms.
          </p>
          <p className="dk-body-lg m-0" style={{ color: 'rgba(21,20,26,0.75)', textAlign: 'left' }}>
            We&apos;ve written them to be as clear as possible. If anything is confusing, reach out at <a href="mailto:legal@logo.ai" className="l-link">legal@logo.ai</a>.
          </p>
        </div>
      </LSection>

      <LSection tone="alt">
        <div className="max-w-[720px] mx-auto flex flex-col gap-12 legal-prose">
          {SECTIONS.map((s) => (
            <section key={s.num} id={`section-${s.num}`}>
              <h2 className="dk-h3 mb-4" style={{ color: '#15141A' }}>
                <span style={{ color: '#7543E3', marginRight: 12 }}>{s.num}.</span>
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
