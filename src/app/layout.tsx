import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Patchwork Jobs',
  description: 'Remote dev jobs worth applying to.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  )
}
