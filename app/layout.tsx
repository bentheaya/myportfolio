import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { HueProvider } from '@/components/hue/HueProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Benaih Shaback — Mathematics & Systems Engineer',
    template: '%s | Benaih Shaback',
  },
  description: 'Portfolio of Benaih Shaback Galavu — B.Sc. Mathematics & Computer Science, Maseno University. Building neuro-symbolic systems, spatial AI, and distributed backends at the edge of mathematics and software.',
  keywords: ['Benaih Shaback', 'Mathematics', 'Computer Science', 'Maseno University', 'Next.js', 'TypeScript', 'AI', 'Portfolio', 'Kenya'],
  authors: [{ name: 'Benaih Shaback Galavu', url: 'https://github.com/bentheaya' }],
  creator: 'Benaih Shaback Galavu',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Benaih Shaback — Mathematics & Systems Engineer',
    description: 'Building at the intersection of mathematics, distributed systems, and spatial AI. B.Sc. Mathematics & Computer Science student at Maseno University.',
    siteName: 'Benaih Shaback Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benaih Shaback — Mathematics & Systems Engineer',
    description: 'Building at the intersection of mathematics, distributed systems, and spatial AI.',
    creator: '@bentheaya',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import { Shell } from '@/components/layout/shell'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-canvas-bg`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-canvas-bg text-canvas-text">
        <HueProvider>
          <Shell>
            {children}
          </Shell>
        </HueProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
