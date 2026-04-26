import type { Metadata } from 'next'
import '@fontsource/source-sans-3/300.css'
import '@fontsource/source-sans-3/400.css'
import '@fontsource/source-sans-3/500.css'
import '@fontsource/source-sans-3/600.css'
import '@fontsource/source-sans-3/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/600.css'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SmoothScroll from '../components/SmoothScroll'
import { generatePageMetadata, generateWebsiteJsonLd } from '@/lib/seo'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Lifestyle Engineering - Real Value Through Work, Health, and Growth',
  description:
    'Work hard, stay healthy, and grow sustainably. Lifestyle engineering, travel lessons, and systems for long-term performance.',
  keywords: [
    'solo travel blog',
    'Asia travel guide',
    'Africa travel tips',
    'cultural travel experiences',
    'backpacking Asia',
    'solo travel guides',
    'travel photography',
    'authentic travel stories',
    'budget travel tips',
    'cultural immersion travel',
  ],
  images: ['/assets/images/misc/posttrip.jpg'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteJsonLd = generateWebsiteJsonLd()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external domains (lighter than preconnect) */}
        <link rel="dns-prefetch" href="https://a.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://b.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://c.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://d.basemaps.cartocdn.com" />

        {/* Favicons - multiple formats for broad compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Lifestyle Engineering RSS Feed"
          href="/feed.xml"
        />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              async
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
              }}
            />
          </>
        )}

        <SmoothScroll />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <SpeedInsights />
        <Analytics />

        {/* Film grain texture overlay for editorial atmosphere */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
