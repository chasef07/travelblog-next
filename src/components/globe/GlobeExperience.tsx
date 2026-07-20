'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import {
  fullJourneyData,
  type CountryData,
} from '@/utils/comprehensive-map-data'
import { fetchGeoJSON, type GeoJSON } from '@/utils/geojson-loader'

const GlobeScene = dynamic(() => import('../GlobeScene'), {
  ssr: false,
})

type GlobeStatus = 'loading' | 'retrying' | 'ready' | 'failed'

export default function GlobeExperience() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  )
  const [geoData, setGeoData] = useState<GeoJSON | null>(null)
  const [status, setStatus] = useState<GlobeStatus>('loading')
  const [sceneReady, setSceneReady] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const load = useCallback(async (retrying = false) => {
    if (retrying) setSceneReady(false)
    setStatus(retrying ? 'retrying' : 'loading')
    try {
      setGeoData(await fetchGeoJSON())
    } catch {
      setStatus('failed')
    }
  }, [])
  const markSceneReady = useCallback(() => setSceneReady(true), [])

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    if (geoData && sceneReady) setStatus('ready')
  }, [geoData, sceneReady])

  const guidance = isDesktop
    ? 'Click and drag to explore destinations'
    : 'Tap and drag to explore destinations'

  return (
    <div data-testid="globe-experience" className="mt-4 space-y-2 lg:mt-0">
      <div className="h-[260px] w-full overflow-hidden rounded-2xl sm:h-[300px] md:h-[340px] lg:h-[460px] xl:h-[500px]">
        {status === 'failed' ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 text-center">
            <p
              data-testid="globe-status"
              role="status"
              className="text-sm text-[var(--ui-text-muted)]"
            >
              Globe unavailable. The rest of the journey is still available.
            </p>
            <button
              type="button"
              onClick={() => void load(true)}
              className="rounded-full border border-[var(--ui-border-strong)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-primary)]"
            >
              Retry globe
            </button>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <GlobeScene
              onSelectCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
              geoData={geoData}
              isMobile={!isDesktop}
              onReady={markSceneReady}
            />
            <span data-testid="globe-status" role="status" className="sr-only">
              {status === 'ready'
                ? 'Ready'
                : status === 'retrying'
                  ? 'Retrying globe'
                  : 'Loading globe'}
            </span>
          </div>
        )}
      </div>
      <p
        data-testid="globe-caption"
        className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ui-text-muted)] sm:text-[11px] sm:tracking-[0.18em]"
      >
        {selectedCountry
          ? `${selectedCountry.name} • ${selectedCountry.visitDate}`
          : guidance}
      </p>
      <select
        aria-label="Select globe destination"
        value={selectedCountry?.name ?? ''}
        onChange={(event) =>
          setSelectedCountry(
            fullJourneyData.find(
              (country) => country.name === event.target.value,
            ) ?? null,
          )
        }
        className="max-w-full rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ui-text-muted)]"
      >
        <option value="">Choose destination</option>
        {fullJourneyData.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  )
}
