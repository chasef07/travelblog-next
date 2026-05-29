'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { type CountryData } from '@/utils/comprehensive-map-data'
import { fetchGeoJSON, type GeoJSON } from '@/utils/geojson-loader'
import HeroGlobeMobile from './HeroGlobeMobile'

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

export default function SimpleHero() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  )
  const [geoData, setGeoData] = useState<GeoJSON | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    fetchGeoJSON()
      .then(setGeoData)
      .catch(() => {})
  }, [isDesktop])

  return (
    <section className="app-surface relative min-h-[100svh] overflow-hidden pt-24 pb-8 sm:min-h-0 sm:pt-28 sm:pb-14 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:gap-10 sm:px-6 lg:grid-cols-[1.25fr_1.05fr] lg:items-end lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 sm:mb-7 sm:gap-2 sm:px-4 sm:py-2"
          >
            <span className="relative flex h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40" />
              <span className="relative inline-flex h-full w-full rounded-full bg-green-500" />
            </span>
            <span className="block truncate whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--ui-text-muted)] sm:text-[11px] sm:tracking-[0.28em]">
              Currently in Ericeira, Portugal
            </span>
          </motion.div>

          <h1 className="font-editorial-display text-4xl leading-[0.95] tracking-tight text-[var(--ui-text-primary)] sm:text-6xl md:text-7xl xl:text-8xl">
            Chase Fagen
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ui-text-secondary)] sm:mt-6 sm:text-lg md:text-xl"
          >
            Trying to learn about the world and life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-on-accent)] transition-colors duration-100 hover:bg-[var(--ui-accent-hover)] sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.24em]"
            >
              Read the blog
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)] transition-colors duration-100 hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)] sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.24em]"
            >
              Follow the journey
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-1 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-muted)] transition-colors duration-100 hover:text-[var(--ui-accent)] sm:text-[11px] sm:tracking-[0.24em]"
            >
              Travel guides
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-4 lg:hidden"
          >
            <HeroGlobeMobile />
          </motion.div>
        </div>

        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="h-[460px] w-full overflow-hidden rounded-2xl xl:h-[500px]">
              <GlobeScene
                onSelectCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                geoData={geoData}
              />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ui-text-muted)] sm:text-[11px] sm:tracking-[0.18em]">
              {selectedCountry
                ? `${selectedCountry.name} • ${selectedCountry.visitDate}`
                : 'Click and drag to explore destinations'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
