import { generatePageMetadata } from '@/lib/seo'
import MapSalesHero from '@/components/maps/MapSalesHero'
import MapPreview from '@/components/maps/MapPreview'
import ValueProposition from '@/components/maps/ValueProposition'
import PricingSection from '@/components/maps/PricingSection'
import FAQ from '@/components/maps/FAQ'
import Testimonials from '@/components/maps/Testimonials'

export const metadata = generatePageMetadata({
  title: 'Curated Travel Maps - Skip Tourist Traps, Discover Hidden Gems',
  description: 'Get insider access to curated Google Maps recommendations from 10 months of solo travel. Skip tourist traps and discover authentic local experiences in Laos and beyond.',
  path: '/maps',
  keywords: ['travel maps', 'google maps recommendations', 'Laos travel guide', 'hidden gems', 'insider travel tips', 'curated travel recommendations', 'solo travel maps', 'authentic travel experiences'],
  images: ['/assets/images/maps/laos-map-preview.jpg']
})

export default function MapsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <MapSalesHero />
      
      {/* Map Preview with Blurred Screenshots */}
      <MapPreview />
      
      {/* Value Proposition */}
      <ValueProposition />
      
      {/* Pricing & Purchase */}
      <PricingSection />
      
      {/* Social Proof */}
      <Testimonials />
      
      {/* FAQ */}
      <FAQ />
    </main>
  )
}