'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { DetailLink } from '@/components/travel-os/DetailLink'
import { Button } from '@/components/ui/button'
import {
  fullJourneyData,
  type CountryData,
} from '@/utils/comprehensive-map-data'
import { fetchGeoJSON, type GeoJSON } from '@/utils/geojson-loader'
import { getCountryByName } from '@/content/countries-data'

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
  const selectedCountryPage = selectedCountry
    ? getCountryByName(selectedCountry.name)
    : null

  return (
    <div data-testid="globe-experience" className="flex flex-col gap-3 lg:mt-0">
      <div className="h-[300px] w-full overflow-hidden rounded-xl border bg-background sm:h-[380px] lg:h-[520px]">
        {status === 'failed' ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-card p-6 text-center">
            <p
              data-testid="globe-status"
              role="status"
              className="text-sm text-muted-foreground"
            >
              Globe unavailable. The rest of the journey is still available.
            </p>
            <Button variant="outline" onClick={() => void load(true)}>
              Retry globe
            </Button>
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          data-testid="globe-caption"
          className="text-sm text-muted-foreground"
        >
          {selectedCountry
            ? `${selectedCountry.name} • ${selectedCountry.visitDate}`
            : guidance}
        </p>
        <div className="flex flex-wrap items-center gap-2">
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
            className="h-9 max-w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Choose destination</option>
            {fullJourneyData.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {selectedCountryPage && (
            <Button variant="outline" asChild>
              <DetailLink
                detailId={`globe-country-${selectedCountryPage.slug}`}
                href={`/countries/${selectedCountryPage.slug}`}
              >
                Open country
                <ArrowUpRight />
              </DetailLink>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
