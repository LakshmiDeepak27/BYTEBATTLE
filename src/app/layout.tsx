import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['600'] })

export const metadata: Metadata = {
  title: 'BYTE BATTLE',
  description: 'Cyberpunk Coding Contest Registration',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={orbitron.className}>
        {/* Global Cyberpunk Effects */}
        <div className="cyber-background" />
        <div className="scanlines" />
        
        {/* Actual Page Content */}
        {children}
      </body>
    </html>
  )
}
