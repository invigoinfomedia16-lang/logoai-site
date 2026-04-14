import type { Metadata } from 'next'
import { Inter, Poppins, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-poppins',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Logo.ai – Free AI Logo Generator',
  description:
    'Get your free AI-generated logo in seconds. Free for the first 2,000,000 users.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${sora.variable}`}>
      <body className="font-inter bg-[#0D0D0D] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
