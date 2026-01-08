'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe, MapPin } from 'lucide-react'
import { type CountryData } from '@/utils/comprehensive-map-data'

// Dynamic import for the globe (Next.js way)
const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-void-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-signal border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">
          Loading Globe
        </span>
      </div>
    </div>
  )
})

// GeoJSON cache
let geoDataCache: any = null

interface GlobeHeroProps {
  onCountrySelect?: (country: CountryData | null) => void
}

export default function GlobeHero({ onCountrySelect }: GlobeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [geoData, setGeoData] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform values based on scroll
  const globeScale = useTransform(smoothProgress, [0, 0.5], [1, 0.6])
  const globeY = useTransform(smoothProgress, [0, 0.5], [0, -100])
  const globeOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [1, 0.8, 0.6])
  const textOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0])
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -50])
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0])

  // Load GeoJSON data
  useEffect(() => {
    const loadGeoData = async () => {
      if (geoDataCache) {
        setGeoData(geoDataCache)
        return
      }

      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
        )
        const data = await response.json()
        geoDataCache = data
        setGeoData(data)
      } catch (error) {
        console.error('Failed to load GeoJSON:', error)
      }
    }

    loadGeoData()
  }, [])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Visibility animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleCountrySelect = useCallback((country: CountryData | null) => {
    setSelectedCountry(country)
    onCountrySelect?.(country)
  }, [onCountrySelect])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] w-full overflow-hidden bg-void-black"
    >
      {/* Globe Container */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          scale: globeScale,
          y: globeY,
          opacity: globeOpacity,
        }}
      >
        <GlobeScene
          onSelectCountry={handleCountrySelect}
          selectedCountry={selectedCountry}
          geoData={geoData}
        />
      </motion.div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-void-black/50 via-transparent to-transparent" />
      </div>

      {/* Main Content Overlay */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Top: Status & Navigation Hint */}
        <div className="pt-8 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-signal rounded-full animate-pulse-glow" />
              <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
                Currently in El Tunco, El Salvador
              </span>
            </div>
          </motion.div>
        </div>

        {/* Center/Bottom: Main Typography */}
        <div className="px-6 md:px-12 pb-32 md:pb-40">
          {/* Brand Name - Massive */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h1
              className="font-display text-massive text-white leading-none tracking-tighter"
              data-text="LIVING GAMBIT"
            >
              <span className="glitch" data-text="LIVING">LIVING</span>
              <br />
              <span className="text-signal">GAMBIT</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-signal" />
            <p className="font-mono text-sm tracking-[0.2em] text-white/50 uppercase">
              Reengineering life from the ground up
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl text-signal">19</span>
              <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Nations</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl text-white">4</span>
              <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Continents</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl text-white">∞</span>
              <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Stories</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Selected Country Info */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-30 max-w-xs"
          >
            <div className="border border-white/10 bg-void-black/80 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-signal" />
                <span className="font-mono text-xs tracking-widest text-white/40 uppercase">Selected</span>
              </div>
              <h3 className="font-display text-2xl text-white mb-2">{selectedCountry.name}</h3>
              <div className="font-mono text-xs text-white/40 tracking-wider">
                {selectedCountry.coordinates[0].toFixed(4)}°N, {selectedCountry.coordinates[1].toFixed(4)}°E
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-signal tracking-widest uppercase">
                  {selectedCountry.visitDate}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer pointer-events-auto"
        style={{ opacity: scrollIndicatorOpacity }}
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Edge Gradients */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-void-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-void-black to-transparent z-10 pointer-events-none" />

      {/* Corner Decorations */}
      <div className="absolute top-8 right-8 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 0.3 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-32 h-32 border border-white/10 rounded-full"
        />
      </div>
    </section>
  )
}
