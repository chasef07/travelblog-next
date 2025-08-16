'use client'

import dynamic from 'next/dynamic'
import SimpleHero from "../components/SimpleHero"
import SimpleCountriesGrid from "../components/SimpleCountriesGrid"
import QuickContentNav from "../components/QuickContentNav"

const InteractiveTravelMap = dynamic(() => import("../components/InteractiveTravelMap"), {
  loading: () => (
    <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
      <div className="text-muted-foreground">Loading interactive map...</div>
    </div>
  ),
  ssr: false
})

export default function Page(){
  return (
    <main className="min-h-screen" itemScope itemType="https://schema.org/WebSite">
      {/* Enhanced Hero Section with Profile Image */}
      <SimpleHero />

      {/* Countries Explored Flags - Moved directly after hero */}
      <section id="countries" className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-background/50 to-muted/20"
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
              16 countries visited during this incredible year-long journey
            </p>
          </header>
          <SimpleCountriesGrid />
        </div>
      </section>


      {/* Interactive Travel Map - Replaces Journey Statistics */}
      <InteractiveTravelMap />

      {/* Streamlined Content Navigation */}
      <QuickContentNav />
    </main>
  )
}