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

  // Fetch world map GeoJSON data when visible
  useEffect(() => {
    if (!isVisible) return

    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
        )
        const data = await response.json()
        setGeoData(data)
      } catch (error) {
        console.error('Failed to load GeoJSON:', error)
      }
    }
    fetchGeoJSON()
  }, [isVisible])

  return (
    <section id="journey" className="py-20 relative overflow-hidden bg-black border-t border-white/10">
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
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
              [ Interactive Journey ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
              Around the World
            </h2>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-md md:text-right">
            Click and drag to explore. Click on markers to discover each destination.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Globe Container */}
          <div
            ref={containerRef}
            className="lg:col-span-2 w-full"
          >
            <div className="overflow-hidden rounded-xl bg-[#0a0a0a] h-[400px] sm:h-[500px] md:h-[600px] w-full">
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
                  <div className="p-6 border border-white/10">
                    <div className="mb-4">
                      <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                        {selectedCountry.visitDate}
                      </span>
                      <h3 className="text-2xl font-light text-white mt-1">{selectedCountry.name}</h3>
                    </div>

                    <p className="text-white/50 leading-relaxed mb-6">
                      {selectedCountry.description}
                    </p>

                    <div className="space-y-2">
                      {selectedCountry.highlights.map((highlight, index) => (
                        <div key={index} className="text-sm text-white/40 flex items-center gap-3">
                          <div className="w-1 h-1 bg-white/40" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="text-xs text-white/30 uppercase tracking-wider">
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
                  <div className="p-6 border border-white/10">
                    <h3 className="font-light text-lg mb-2 text-white">Select a destination</h3>
                    <p className="text-white/40 text-sm">
                      Click on any marker to explore.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey Stats */}
            <motion.div
              className="grid grid-cols-2 border border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 text-center border-r border-white/10">
                <div className="text-2xl font-extralight text-white">
                  <AnimatedCounter value={19} duration={1.5} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Countries</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-2xl font-extralight text-white">
                  <AnimatedCounter value={journeyStats.totalBlogPosts} duration={2} />
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Blogs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
