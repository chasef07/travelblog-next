'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

// Animated geometric element
function GeometricAnimation() {
  return (
    <div className="absolute top-1/2 right-12 lg:right-24 -translate-y-1/2 hidden md:block">
      <div className="relative w-64 h-64 lg:w-80 lg:h-80">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Middle rotating ring - opposite direction */}
        <motion.div
          className="absolute inset-8 border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner rotating ring */}
        <motion.div
          className="absolute inset-16 border border-white/15 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting dots on outer ring */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={`outer-${i}`}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
              style={{ transform: `translateX(${128}px) translateY(-50%)` }}
            />
          </motion.div>
        ))}

        {/* Orbiting dots on middle ring */}
        {[45, 135, 225, 315].map((angle, i) => (
          <motion.div
            key={`middle-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
            }}
            animate={{
              rotate: [angle, angle - 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{ transform: `translateX(${96}px) translateY(-50%)` }}
            />
          </motion.div>
        ))}

        {/* Center pulsing element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-2 h-2 bg-white/40 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Diagonal lines */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

export default function SimpleHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex flex-col justify-start md:justify-between pt-32 md:pt-24 pb-12">

      {/* Light beam effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-full h-96 opacity-30"
          style={{
            background: 'linear-gradient(250deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 60%)',
            filter: 'blur(40px)',
            transform: 'rotate(-15deg) translateX(20%)',
          }}
        />
      </div>

      {/* Geometric animation on right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <GeometricAnimation />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-none md:flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">

        {/* Currently in pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 rounded-full">
            {/* Pulsing dot */}
            <motion.span
              className="h-2 w-2 rounded-full bg-green-500"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="font-mono text-xs tracking-wider text-white/60 uppercase">
              Currently in Clearwater, FL
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white leading-[0.9] mb-6"
        >
          Living
          <br />
          Gambit
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/40 font-light tracking-wide max-w-md mb-4 md:mb-0"
        >
          Travel, Adventure, Capitalism
        </motion.p>

      </div>

      {/* Bottom section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-end gap-4 md:gap-8">

          {/* Description and CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl md:text-right"
          >
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Reengineering life from the ground up.
            </p>

            <div className="flex items-center gap-6 md:justify-end">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-white font-medium border border-white/80 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all duration-200"
              >
                <span className="uppercase text-sm tracking-wider">Read Stories</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
