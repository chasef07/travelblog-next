'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { type CountryData } from '@/utils/comprehensive-map-data'
import { fetchGeoJSON, type GeoJSON } from '@/utils/geojson-loader'

const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[var(--ui-bg-strong)]">
      <span className="font-mono text-xs tracking-wider text-[var(--ui-text-muted)]">
        LOADING GLOBE...
      </span>
    </div>
  ),
})

export default function HeroGlobeMobile() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  )
  const [geoData, setGeoData] = useState<GeoJSON | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)')
    const updateMobile = () => setIsMobile(query.matches)
    updateMobile()
    query.addEventListener('change', updateMobile)
    return () => query.removeEventListener('change', updateMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    let isMounted = true
    fetchGeoJSON()
      .then((data) => {
        if (isMounted) setGeoData(data)
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [isMobile])

  if (!isMobile) return null

  return (
    <div className="space-y-2">
      <div className="h-[210px] w-full overflow-hidden rounded-2xl sm:h-[230px] md:h-[250px]">
        <GlobeScene
          onSelectCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
          geoData={geoData}
        />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ui-text-muted)] sm:text-[11px] sm:tracking-[0.18em]">
        {selectedCountry
          ? `${selectedCountry.name} • ${selectedCountry.visitDate}`
          : 'Tap and drag to explore destinations'}
      </p>
    </div>
  )
}
