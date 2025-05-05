import { golos } from '@/assests/fonts'
import { Header } from '@/components/structure/Header/Header'

import type { Metadata } from 'next'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assests/styles/globals.css'

export const metadata: Metadata = {
  title: 'WeatherScope — Real-Time Weather Forecasts',
  description:
    'Accurate and stylish weather application. Get current conditions, forecasts, and manage your favorite cities with ease.',
  keywords: [
    'weather',
    'forecast',
    'current weather',
    'weather app',
    'weather by city',
    'weather tracking',
    'local weather',
  ],
  authors: [{ name: 'WeatherScope Team', url: 'https://github.com/your-profile' }],
  creator: 'WeatherScope',
  metadataBase: new URL('https://weatherscope.vercel.app'),
  openGraph: {
    title: 'WeatherScope — Accurate Weather, Wherever You Are',
    description:
      'Track weather conditions by city, your current location, or search. Beautiful, fast, and reliable forecasts.',
    url: 'https://weatherscope.vercel.app',
    siteName: 'WeatherScope',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WeatherScope - Weather Forecast Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeatherScope — Real-Time Weather Updates',
    description: 'Minimal, accurate, and responsive weather forecasts at your fingertips.',
    images: ['/og-image.png'],
    creator: '@your_twitter_handle',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={golos.variable}>
        <Header />
        {children}
      </body>
    </html>
  )
}
