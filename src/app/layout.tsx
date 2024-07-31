import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NZGDA Games',
  description:
    'The NZGDA games directory is the official archive of New Zealand made video games. Discover our games and the kiwi companies that made them.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-auto">
      <body className={`${rubik.className} bg-white overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
