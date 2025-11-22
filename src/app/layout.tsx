import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Script from 'next/script'
import { generatePageMetadata, generateWebsiteJsonLd } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Living Gambit - Travel, Adventure, Capitalism',
  description: 'Reengineering life from the ground up. Solo travel adventures, entrepreneurship, and building a life on your own terms across 18 countries.',
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
        <link rel="preconnect" href="https://a.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://b.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://c.basemaps.cartocdn.com" />
        <link rel="preconnect" href="https://d.basemaps.cartocdn.com" />
        
        {/* Favicon - minimalist SVG */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        
        {/* Website structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-zinc-900">

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
      </body>
    </html>
  )
}
