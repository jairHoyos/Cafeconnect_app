import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'CafeConnect - Plataforma de Compra de Cafe',
  description:
    'Descubre los mejores cafes artesanales del mundo. Compra, califica y comparte tu experiencia.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x3.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x3.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/ico.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-ico.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#242424',
              border: '1px solid #3A3A3A',
              color: '#F5F0EB',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
