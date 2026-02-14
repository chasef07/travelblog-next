'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { journeyStats, type CountryData } from '@/utils/comprehensive-map-data'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'

const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--ui-bg-strong)]">
      <span className="font-mono tracking-wider text-sm text-[var(--ui-text-muted)]">LOADING GLOBE...</span>
    </div>
  ),
})

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number, duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    })

    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [count, rounded, value, duration])

  return <span>{displayValue}</span>
}

// GeoJSON types
interface GeoJSONGeometry {
  type: string
  coordinates: number[] | number[][] | number[][][] | number[][][][]
}

interface GeoJSONFeature {
  type: string
  geometry: GeoJSONGeometry
}

interface GeoJSON {
  type: string
  features: GeoJSONFeature[]
}

// Module-level cache for GeoJSON data
let geoJSONCache: GeoJSON | null = null
let geoJSONPromise: Promise<GeoJSON> | null = null

async function fetchGeoJSON(): Promise<GeoJSON> {
  // Return cached data if available
  if (geoJSONCache) {
    return geoJSONCache
  }

  // Return pending promise if fetch is in progress
  if (geoJSONPromise) {
    return geoJSONPromise
  }

  // Start new fetch and cache the promise
  geoJSONPromise = fetch(
    'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
  )
    .then(response => response.json())
    .then(data => {
      geoJSONCache = data
      return data
    })
    .catch(error => {
      console.error('Failed to load GeoJSON:', error)
      geoJSONPromise = null // Reset on error to allow retry
      throw error
    })

  return geoJSONPromise
}

// Main export component
export default function InteractiveGlobe() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [geoData, setGeoData] = useState<GeoJSON | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 767px)').matches
  })
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection observer to load globe only when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fetch world map GeoJSON data when visible (uses module-level cache)
  useEffect(() => {
    if (!isVisible) return

    fetchGeoJSON()
      .then(data => setGeoData(data))
      .catch(() => {}) // Error already logged in fetchGeoJSON
  }, [isVisible])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const updateMobile = () => setIsMobile(query.matches)
    updateMobile()
    query.addEventListener('change', updateMobile)
    return () => query.removeEventListener('change', updateMobile)
  }, [])

  if (isMobile) {
    return null
  }

  return (
    <section id="journey" className="app-surface relative overflow-hidden border-t border-[var(--ui-border-subtle)] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-start md:justify-between md:gap-6"
        >
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
              [ Interactive Journey ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
              Around the World
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg text-[var(--ui-text-secondary)] leading-relaxed md:text-right">
            {isMobile
              ? 'Tap and drag to explore. Tap markers to open each destination.'
              : 'Click and drag to explore. Click on markers to discover each destination.'}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Globe Container */}
          <div
            ref={containerRef}
            className="lg:col-span-2 w-full"
          >
            <div className="overflow-hidden rounded-2xl h-[340px] sm:h-[500px] md:h-[600px] w-full">
              {isVisible && (
                <GlobeScene
                  onSelectCountry={setSelectedCountry}
                  selectedCountry={selectedCountry}
                  geoData={geoData}
                />
              )}
            </div>
          </div>

          {/* Country Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 sm:space-y-6"
          >
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-4 sm:p-6 backdrop-blur-sm">
                    <div className="mb-3 sm:mb-4">
                      <span className="font-mono text-xs tracking-wider text-[var(--ui-accent)] uppercase">
                        {selectedCountry.visitDate}
                      </span>
                      <h3 className="mt-1 text-xl sm:text-2xl font-light text-[var(--ui-text-primary)]">{selectedCountry.name}</h3>
                    </div>

                    <p className="mb-5 sm:mb-6 text-sm sm:text-base text-[var(--ui-text-secondary)] leading-relaxed">
                      {selectedCountry.description}
                    </p>

                    <div className="space-y-1.5 sm:space-y-2">
                      {selectedCountry.highlights.map((highlight, index) => (
                        <div key={index} className="text-xs sm:text-sm text-[var(--ui-text-muted)] flex items-center gap-2.5 sm:gap-3">
                          <div className="w-1 h-1 bg-[var(--ui-accent)]" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 sm:mt-6 pt-4 border-t border-[var(--ui-border-subtle)]">
                      <span className="text-xs text-[var(--ui-text-subtle)] uppercase tracking-wider">
                        {selectedCountry.blogPostsCount} stories written
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-4 sm:p-6 backdrop-blur-sm">
                    <h3 className="font-light text-lg mb-2 text-[var(--ui-text-primary)]">Select a destination</h3>
                    <p className="text-[var(--ui-text-muted)] text-sm">
                      {isMobile ? 'Tap any marker to explore.' : 'Click on any marker to explore.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey Stats */}
            <motion.div
              className="grid grid-cols-2 rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="p-3.5 sm:p-4 text-center border-r border-[var(--ui-border-subtle)]">
                <div className="text-xl sm:text-2xl font-extralight text-[var(--ui-accent)]">
                  <AnimatedCounter value={journeyStats.totalCountries} duration={1.5} />
                </div>
                <div className="text-xs text-[var(--ui-text-muted)] uppercase tracking-wider mt-1">Countries</div>
              </div>
              <div className="p-3.5 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-extralight text-[var(--ui-accent)]">
                  <AnimatedCounter value={journeyStats.totalBlogPosts} duration={2} />
                </div>
                <div className="text-xs text-[var(--ui-text-muted)] uppercase tracking-wider mt-1">Stories</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
