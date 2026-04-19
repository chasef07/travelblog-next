'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { journeyStats } from '@/utils/comprehensive-map-data'

const CHAR_DELAY = 20
const LINE_PAUSE = 200
const SESSION_KEY = 'lg-boot-seen'

type Phase = 'typing' | 'done'

export default function BootSequence() {
  const pathname = usePathname()
  const [show, setShow] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<Phase>('typing')
  const [lines, setLines] = useState<string[]>([])
  const [currentChar, setCurrentChar] = useState('')
  const skipRef = useRef(false)

  const bootLines = [
    '> CHASE FAGEN WELCOMES YOU',
    '> COORDINATES: 32.7157°N, 117.1611°W',
    '> LOCATION: SAN DIEGO, CALIFORNIA',
    `> ${journeyStats.totalCountries} COUNTRIES | ${journeyStats.continents} CONTINENTS | ${journeyStats.totalBlogPosts} POSTS`,
    '> LAUNCHING...',
  ]

  useEffect(() => {
    if (pathname !== '/') {
      setShow(false)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setShow(false)
      return
    }

    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false)
    } else {
      setShow(true)
      document.body.style.overflow = 'hidden'
    }
  }, [pathname])

  const runSequence = useCallback(async () => {
    for (let i = 0; i < bootLines.length; i++) {
      const line = bootLines[i]
      for (let c = 0; c <= line.length; c++) {
        if (skipRef.current) return
        setCurrentChar(line.slice(0, c))
        await new Promise(r => setTimeout(r, CHAR_DELAY))
      }
      setLines(prev => [...prev, line])
      setCurrentChar('')
      if (i < bootLines.length - 1) {
        await new Promise(r => setTimeout(r, LINE_PAUSE))
      }
    }
    if (!skipRef.current) {
      await new Promise(r => setTimeout(r, 350))
      setPhase('done')
      sessionStorage.setItem(SESSION_KEY, '1')
      document.body.style.overflow = ''
    }
  }, [bootLines])

  useEffect(() => {
    if (show) runSequence()
  }, [show, runSequence])

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

          {/* Skip hint */}
          <p className="absolute bottom-6 left-0 w-full text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
            Click to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
