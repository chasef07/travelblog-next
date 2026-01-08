import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { generatePageMetadata, generateWebsiteJsonLd } from '@/lib/seo'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import HiddenNav from '@/components/HiddenNav'
import CommandPalette from '@/components/CommandPalette'
import CursorFollower from '@/components/CursorFollower'

// Display typography - geometric with personality for body
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
})

// Distinctive monospace for coordinates, data, technical details
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Living Gambit - Travel, Adventure, Capitalism',
  description: 'Reengineering life from the ground up. Solo travel adventures, entrepreneurship, and building a life on your own terms across 19 countries.',
  keywords: ['solo travel blog', 'Asia travel guide', 'Africa travel tips', 'cultural travel experiences', 'backpacking Asia', 'solo travel guides', 'travel photography', 'authentic travel stories', 'budget travel tips', 'cultural immersion travel'],
  images: ['/assets/images/misc/posttrip.jpg']
})

export default function RootLayout({ children }:{children: React.ReactNode}){
  const websiteJsonLd = generateWebsiteJsonLd()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />

        {/* Clash Display from Fontshare - bold experimental display font */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />

        {/* Favicons - multiple formats for broad compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Living Gambit RSS Feed" href="/feed.xml" />

        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`min-h-screen bg-void-black ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>

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

        <HiddenNav />
        <CommandPalette />
        <CursorFollower />
        {children}
        <SpeedInsights />
        <Analytics />

        {/* Noise overlay for texture */}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
