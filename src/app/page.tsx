'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, BookOpen, Video, MapPin, Utensils, Plane, Backpack } from 'lucide-react'
import { type CountryData } from '@/utils/comprehensive-map-data'
import { fullJourneyData } from '@/utils/comprehensive-map-data'

// Dynamic imports for heavy components
const GlobeHero = dynamic(() => import('@/components/GlobeHero'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-void-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-signal border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-sm tracking-[0.3em] text-white/30 uppercase">Loading</span>
      </div>
    </div>
  )
})

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Navigation items with experimental styling
const navItems = [
  { href: '/blog', label: 'Stories', icon: BookOpen, count: 17 },
  { href: '/vlogs', label: 'Signal', icon: Video, count: null },
  { href: '/food', label: 'Sustenance', icon: Utensils, count: null },
  { href: '/transportation', label: 'Movement', icon: Plane, count: null },
  { href: '/packing-checklist', label: 'Minimal', icon: Backpack, count: null },
]

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)

  const handleCountrySelect = useCallback((country: CountryData | null) => {
    setSelectedCountry(country)
  }, [])

  return (
    <main className="min-h-screen bg-void-black" itemScope itemType="https://schema.org/WebSite">
      {/* Fullscreen Globe Hero */}
      <GlobeHero onCountrySelect={handleCountrySelect} />

      {/* Journey Section */}
      <section className="relative py-32 bg-void-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-signal" />
              <span className="font-mono text-xs tracking-[0.3em] text-signal uppercase">The Journey</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-statement text-white mb-6"
            >
              19 Nations.<br />
              <span className="text-white/40">One Path.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 text-lg max-w-xl leading-relaxed"
            >
              From the Middle East to Southeast Asia, Africa to Central America.
              Each marker is a chapter. Each arc is a leap of faith.
            </motion.p>
          </motion.div>

          {/* Countries Grid - Orbital/Experimental Layout */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/5"
          >
            {fullJourneyData.map((country, index) => (
              <motion.div
                key={country.name}
                variants={fadeInUp}
                className="group relative bg-void-black p-6 hover:bg-white/5 transition-colors duration-300 cursor-pointer"
                onClick={() => setSelectedCountry(country)}
              >
                {/* Index number */}
                <span className="absolute top-3 right-3 font-mono text-xs text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Country name */}
                <h3 className="font-display text-lg text-white group-hover:text-signal transition-colors mb-2">
                  {country.name}
                </h3>

                {/* Visit date */}
                <span className="font-mono text-xs tracking-wider text-white/30 uppercase">
                  {country.visitDate}
                </span>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-signal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation Section - Experimental Cards */}
      <section className="relative py-32 bg-void-deep border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-interference" />
              <span className="font-mono text-xs tracking-[0.3em] text-interference uppercase">Explore</span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-headline text-white"
            >
              Dive Deeper
            </motion.h2>
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5"
          >
            {navItems.map((item, index) => (
              <motion.div key={item.href} variants={fadeInUp}>
                <Link
                  href={item.href}
                  className="group relative block bg-void-black p-8 hover:bg-white/5 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <item.icon className="w-8 h-8 text-white/30 group-hover:text-signal transition-colors" />
                  </div>

                  {/* Label */}
                  <h3 className="font-display text-2xl text-white mb-2 group-hover:text-signal transition-colors">
                    {item.label}
                  </h3>

                  {/* Count if available */}
                  {item.count && (
                    <span className="font-mono text-xs text-white/30">
                      {item.count} entries
                    </span>
                  )}

                  {/* Arrow */}
                  <ArrowRight className="absolute bottom-8 right-8 w-5 h-5 text-white/20 group-hover:text-signal group-hover:translate-x-2 transition-all" />

                  {/* Bottom border animation */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-signal scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            ))}

            {/* Featured Story Card */}
            <motion.div variants={fadeInUp} className="md:col-span-2 lg:col-span-1">
              <Link
                href="/blog"
                className="group relative block bg-void-black p-8 hover:bg-signal/10 transition-all duration-300 h-full"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-signal text-void-black font-mono text-xs tracking-wider uppercase mb-6">
                      Latest
                    </span>
                    <h3 className="font-display text-2xl text-white mb-4">
                      Read the latest story
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Adventures, reflections, and the pursuit of something more.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-signal mt-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 bg-void-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span className="font-display text-xl text-white">Living Gambit</span>
              <p className="font-mono text-xs text-white/30 mt-2 tracking-wider">
                Reengineering life from the ground up
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white/40 hover:text-signal transition-colors tracking-wider uppercase"
              >
                Instagram
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-white/40 hover:text-signal transition-colors tracking-wider uppercase"
              >
                X
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="font-mono text-xs text-white/20 tracking-wider">
              © {new Date().getFullYear()} Living Gambit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
