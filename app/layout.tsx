import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Logo.ai – Free AI Logo Generator',
  description:
    'Get your free AI-generated logo in seconds. Free for the first 1,000,000 users.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="font-bricolage bg-[#0D0D0D] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
