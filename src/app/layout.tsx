import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Script from 'next/script'
import { generatePageMetadata, generateWebsiteJsonLd } from '@/lib/seo'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = generatePageMetadata({
  title: 'The Value Engine - Lifestyle Engineering for Real Value',
  description: 'Work hard, stay healthy, and grow sustainably. Lifestyle engineering, travel lessons, and systems for long-term performance.',
  keywords: ['solo travel blog', 'Asia travel guide', 'Africa travel tips', 'cultural travel experiences', 'backpacking Asia', 'solo travel guides', 'travel photography', 'authentic travel stories', 'budget travel tips', 'cultural immersion travel'],
  images: ['/assets/images/misc/posttrip.jpg']
})

export default function RootLayout({ children }:{children: React.ReactNode}){
  const websiteJsonLd = generateWebsiteJsonLd()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('value-engine-theme') || localStorage.getItem('living-gambit-theme');
                  var allowed = ['sunset', 'coast', 'graphite'];
                  var theme = allowed.indexOf(stored || '') >= 0 ? stored : 'sunset';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'sunset');
                }
              })();
            `,
          }}
        />
        {/* DNS prefetch for external domains (lighter than preconnect) */}
        <link rel="dns-prefetch" href="https://a.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://b.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://c.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://d.basemaps.cartocdn.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />

        {/* Favicons - multiple formats for broad compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="The Value Engine RSS Feed" href="/feed.xml" />

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
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <Header />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />

        {/* Film grain texture overlay for editorial atmosphere */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
