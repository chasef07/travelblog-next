'use client'

import SimpleHero from "../components/SimpleHero"
import SimpleCountriesGrid from "../components/SimpleCountriesGrid"
import QuickContentNav from "../components/QuickContentNav"

export default function Page(){
  return (
    <main className="min-h-screen" itemScope itemType="https://schema.org/WebSite">
      {/* Enhanced Hero Section with Profile Image */}
      <SimpleHero />

      {/* Section Divider */}
      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      {/* Countries Explored */}
      <section
        id="countries"
        className="app-surface py-14 sm:py-20 relative overflow-hidden"
        aria-labelledby="countries-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-6 mb-10 sm:mb-12">
            <div>
              <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[var(--ui-accent)] uppercase block mb-4">
                [ Countries Explored ]
              </span>
              <h2 id="countries-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
                20 Nations
              </h2>
            </div>
            <p className="text-[var(--ui-text-secondary)] text-base sm:text-lg leading-relaxed max-w-md md:text-right">
              From the Middle East to Southeast Asia, Africa to Central America.
            </p>
          </div>

          {/* Countries grid */}
          <div className="border border-dashed border-[var(--ui-border-strong)]">
            <SimpleCountriesGrid />
          </div>
        </div>
      </section>


      {/* Section Divider */}
      <div className="app-surface relative">
        <div className="section-divider mx-auto max-w-7xl" />
      </div>

      {/* Streamlined Content Navigation */}
      <QuickContentNav />
    </main>
  )
}
