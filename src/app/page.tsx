'use client'

import dynamic from 'next/dynamic'
import SimpleHero from "../components/SimpleHero"
import SimpleCountriesGrid from "../components/SimpleCountriesGrid"
import QuickContentNav from "../components/QuickContentNav"

const InteractiveGlobe = dynamic(() => import("../components/InteractiveGlobe"), {
  loading: () => (
    <section className="py-20 relative overflow-hidden border-t border-[#d4c0a8]/10" style={{ background: '#1a1714' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-[#d4c0a8]/40 font-mono tracking-wider text-sm">LOADING GLOBE...</div>
        </div>
      </div>
    </section>
  ),
  ssr: false
})

export default function Page(){
  return (
    <main className="min-h-screen" itemScope itemType="https://schema.org/WebSite">
      {/* Enhanced Hero Section with Profile Image */}
      <SimpleHero />

      {/* Countries Explored */}
      <section id="countries" className="py-20 relative overflow-hidden border-t border-[#d4c0a8]/10"
               aria-labelledby="countries-heading"
               style={{ background: 'linear-gradient(180deg, #1a1714 0%, #2a2520 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-sm tracking-[0.2em] text-[#c4704b] uppercase block mb-4">
                [ Countries Explored ]
              </span>
              <h2 id="countries-heading" className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[#faf6f1]">
                20 Nations
              </h2>
            </div>
            <p className="text-[#d4c0a8]/60 text-lg leading-relaxed max-w-md md:text-right">
              From the Middle East to Southeast Asia, Africa to Central America.
            </p>
          </div>

          {/* Countries grid */}
          <div className="border-t border-l border-[#d4c0a8]/10">
            <SimpleCountriesGrid />
          </div>
        </div>
      </section>


      {/* Interactive 3D Globe */}
      <InteractiveGlobe />

      {/* Streamlined Content Navigation */}
      <QuickContentNav />
    </main>
  )
}