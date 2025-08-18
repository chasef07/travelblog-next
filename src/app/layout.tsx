import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Script from 'next/script'
import { generatePageMetadata, generateWebsiteJsonLd } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Lone Horizons - Solo Travel Blog & Cultural Adventures Across 16 Countries',
  description: 'Discover authentic solo travel experiences across Asia, Africa & beyond. Real stories, practical tips, and cultural insights from a year-long journey through 16 countries. Travel better, explore deeper.',
  keywords: ['solo travel blog', 'Asia travel guide', 'Africa travel tips', 'cultural travel experiences', 'backpacking Asia', 'solo travel guides', 'travel photography', 'authentic travel stories', 'budget travel tips', 'cultural immersion travel'],
  images: ['/assets/images/misc/posttrip.jpg']
})

export default function RootLayout({ children }:{children: React.ReactNode}){
  const websiteJsonLd = generateWebsiteJsonLd()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        
        {/* Google Analytics - replace with your tracking ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        
        <Header />
        <div className="h-[70px]" />
        {children}
        <Footer />
      </body>
    </html>
  )
}
