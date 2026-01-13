'use client'

import { useState, useEffect, useRef } from 'react'
import { journeyStats, type CountryData } from '@/utils/comprehensive-map-data'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import GlobeScene from './GlobeScene'

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

  return (
    <section id="journey" className="py-20 relative overflow-hidden border-t border-[#d4c0a8]/10" style={{ background: 'linear-gradient(180deg, #2a2520 0%, #1a1714 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-[#c4704b] uppercase block mb-4">
              [ Interactive Journey ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[#faf6f1]">
              Around the World
            </h2>
          </div>
          <p className="text-[#d4c0a8]/60 text-lg leading-relaxed max-w-md md:text-right">
            Click and drag to explore. Click on markers to discover each destination.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Globe Container */}
          <div
            ref={containerRef}
            className="lg:col-span-2 w-full"
          >
            <div className="overflow-hidden rounded-xl bg-[#1a1714] border border-[#d4c0a8]/10 h-[400px] sm:h-[500px] md:h-[600px] w-full">
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
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="p-6 border border-[#d4c0a8]/10 bg-[#2a2520]/50 backdrop-blur-sm">
                    <div className="mb-4">
                      <span className="font-mono text-xs tracking-wider text-[#c4704b] uppercase">
                        {selectedCountry.visitDate}
                      </span>
                      <h3 className="text-2xl font-light text-[#faf6f1] mt-1">{selectedCountry.name}</h3>
                    </div>

                    <p className="text-[#d4c0a8]/60 leading-relaxed mb-6">
                      {selectedCountry.description}
                    </p>

                    <div className="space-y-2">
                      {selectedCountry.highlights.map((highlight, index) => (
                        <div key={index} className="text-sm text-[#d4c0a8]/50 flex items-center gap-3">
                          <div className="w-1 h-1 bg-[#c4704b]" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#d4c0a8]/10">
                      <span className="text-xs text-[#7a8f7a] uppercase tracking-wider">
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
                  <div className="p-6 border border-[#d4c0a8]/10 bg-[#2a2520]/50 backdrop-blur-sm">
                    <h3 className="font-light text-lg mb-2 text-[#faf6f1]">Select a destination</h3>
                    <p className="text-[#d4c0a8]/50 text-sm">
                      Click on any marker to explore.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey Stats */}
            <motion.div
              className="grid grid-cols-2 border border-[#d4c0a8]/10 bg-[#2a2520]/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 text-center border-r border-[#d4c0a8]/10">
                <div className="text-2xl font-extralight text-[#c4704b]">
                  <AnimatedCounter value={journeyStats.totalCountries} duration={1.5} />
                </div>
                <div className="text-xs text-[#d4c0a8]/50 uppercase tracking-wider mt-1">Countries</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-extralight text-[#c4704b]">
                  <AnimatedCounter value={journeyStats.totalBlogPosts} duration={2} />
                </div>
                <div className="text-xs text-[#d4c0a8]/50 uppercase tracking-wider mt-1">Stories</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
