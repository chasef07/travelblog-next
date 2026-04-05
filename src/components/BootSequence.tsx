'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => null,
})

const BOOT_LINES = [
  '> CHASE FAGEN WELCOMES YOU',
  '> COORDINATES: 27.9659°N, 82.8001°W',
  '> LOCATION: CLEARWATER, FLORIDA',
  '> 20 COUNTRIES | 4 CONTINENTS | 211 POSTS',
  '> LAUNCHING...',
]

const CHAR_DELAY = 20
const LINE_PAUSE = 200
const SESSION_KEY = 'lg-boot-seen'

// Shared GeoJSON fetch (reuse cache from SimpleHero)
let geoCache: unknown = null
let geoPromise: Promise<unknown> | null = null

function fetchGeoJSON() {
  if (geoCache) return Promise.resolve(geoCache)
  if (geoPromise) return geoPromise
  geoPromise = fetch(
    'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
  )
    .then(r => r.json())
    .then(data => { geoCache = data; return data })
    .catch(() => { geoPromise = null; return null })
  return geoPromise
}

type Phase = 'typing' | 'globe' | 'shrinking' | 'done'

export default function BootSequence() {
  const [show, setShow] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<Phase>('typing')
  const [lines, setLines] = useState<string[]>([])
  const [currentChar, setCurrentChar] = useState('')
  const [geoData, setGeoData] = useState<unknown>(null)
  const skipRef = useRef(false)

  // Check sessionStorage
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false)
    } else {
      setShow(true)
      document.body.style.overflow = 'hidden'
      // Start loading globe data during typing
      fetchGeoJSON().then(setGeoData)
    }
  }, [])

  // Typewriter engine
  const runSequence = useCallback(async () => {
    for (let i = 0; i < BOOT_LINES.length; i++) {
      const line = BOOT_LINES[i]
      for (let c = 0; c <= line.length; c++) {
        if (skipRef.current) return
        setCurrentChar(line.slice(0, c))
        await new Promise(r => setTimeout(r, CHAR_DELAY))
      }
      setLines(prev => [...prev, line])
      setCurrentChar('')
      if (i < BOOT_LINES.length - 1) {
        await new Promise(r => setTimeout(r, LINE_PAUSE))
      }
    }
    if (!skipRef.current) {
      await new Promise(r => setTimeout(r, 400))
      setPhase('globe')
    }
  }, [])

  useEffect(() => {
    if (show) runSequence()
  }, [show, runSequence])

  // Globe phase → shrink after 2.5s
  useEffect(() => {
    if (phase === 'globe') {
      const timer = setTimeout(() => setPhase('shrinking'), 2500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Shrinking phase → done after animation completes
  useEffect(() => {
    if (phase === 'shrinking') {
      const timer = setTimeout(() => {
        setPhase('done')
        sessionStorage.setItem(SESSION_KEY, '1')
        document.body.style.overflow = ''
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Skip handler
  const skip = useCallback(() => {
    if (phase === 'done') return
    skipRef.current = true
    setPhase('done')
    sessionStorage.setItem(SESSION_KEY, '1')
    document.body.style.overflow = ''
  }, [phase])

  if (show === null || show === false) return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={skip}
          className="fixed inset-0 z-[9999] cursor-pointer bg-black"
        >
          {/* CRT scanline overlay */}
          <div
            className="boot-scanlines pointer-events-none absolute inset-0 z-10"
          />
          {/* Phase 1: Typing */}
          <AnimatePresence>
            {phase === 'typing' && (
              <motion.div
                key="typing"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex h-full flex-col justify-center px-6 sm:px-12 md:px-20"
              >
                <div className="max-w-2xl">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className="font-mono text-xs leading-relaxed text-white/90 sm:text-sm md:text-base"
                    >
                      {line}
                    </p>
                  ))}
                  {currentChar && (
                    <p className="font-mono text-xs leading-relaxed text-white/90 sm:text-sm md:text-base">
                      {currentChar}
                      <span className="animate-pulse">▊</span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 2: Full-screen globe */}
          {(phase === 'globe' || phase === 'shrinking') && (
            <motion.div
              key="globe-phase"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                ...(phase === 'shrinking' ? {
                  scale: 0.35,
                  y: '-15vh',
                  x: '20vw',
                  borderRadius: '24px',
                } : {}),
              }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 1, ease: [0.77, 0, 0.175, 1] },
                y: { duration: 1, ease: [0.77, 0, 0.175, 1] },
                x: { duration: 1, ease: [0.77, 0, 0.175, 1] },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-[80vh] w-[80vh] max-h-[600px] max-w-[600px]">
                <GlobeScene
                  onSelectCountry={() => {}}
                  selectedCountry={null}
                  geoData={geoData as never}
                />
              </div>
            </motion.div>
          )}

          {/* Globe phase label */}
          {phase === 'globe' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute bottom-16 left-0 w-full text-center font-mono text-xs uppercase tracking-[0.3em] text-white/40"
            >
              20 countries explored
            </motion.p>
          )}

          {/* Skip hint */}
          <p className="absolute bottom-6 left-0 w-full text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
            Click to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
