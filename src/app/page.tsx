'use client'

import dynamic from 'next/dynamic'
import SimpleHero from "../components/SimpleHero"
import QuickContentNav from "../components/QuickContentNav"
import SimpleCountriesGrid from "../components/SimpleCountriesGrid"

const EnhancedMap = dynamic(() => import("../components/EnhancedMap"), {
  loading: () => (
    <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
      <div className="text-muted-foreground">Loading interactive journey map...</div>
    </div>
  ),
  ssr: false
})

export default function Page(){
  return (
    <main className="min-h-screen" itemScope itemType="https://schema.org/WebSite">
      {/* Simplified Hero Section */}
      <SimpleHero />

      {/* Interactive Map - Primary Focus */}
      <section id="journey" className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-background to-muted/20" 
               aria-labelledby="journey-heading">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <header className="text-center mb-12">
            <h2 id="journey-heading" className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Journey Map
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Interactive visualization of my travels across 15+ countries and 6 continents
            </p>
          </header>
          
          <div className="relative">
            <div className="h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-card ring-1 ring-border/20 shadow-xl">
              <EnhancedMap />
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid - Secondary Focus */}
      <section id="countries" className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background"
               aria-labelledby="countries-heading">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <header className="text-center mb-12">
            <h2 id="countries-heading" className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Countries Explored
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A visual journey through the flags of countries I&apos;ve explored
            </p>
          </header>
          <SimpleCountriesGrid />
        </div>
      </section>

      {/* Quick Content Navigation */}
      <QuickContentNav />
    </main>
  )
}