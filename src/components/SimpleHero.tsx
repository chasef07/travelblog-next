'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Compass } from 'lucide-react'
import Link from 'next/link'

// Organic flowing lines animation
function OrganicFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Flowing curved lines */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Primary flowing line */}
        <motion.path
          d="M-100 450 Q 200 200, 500 400 T 900 350 T 1300 500 T 1600 300"
          stroke="url(#terracottaGradient)"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Secondary flowing line */}
        <motion.path
          d="M-50 600 Q 300 400, 600 550 T 1000 450 T 1400 600 T 1700 400"
          stroke="url(#sageGradient)"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Tertiary accent line */}
        <motion.path
          d="M100 700 Q 400 500, 700 650 T 1100 550 T 1500 700"
          stroke="url(#sandGradient)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 0.6, ease: "easeInOut" }}
        />

        <defs>
          <linearGradient id="terracottaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#c4704b" />
            <stop offset="70%" stopColor="#d4856a" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="sageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#7a8f7a" />
            <stop offset="60%" stopColor="#9db39d" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d4c0a8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating organic shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #c4704b 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #7a8f7a 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  )
}

// Compass rose element
function CompassRose() {
  return (
    <div className="absolute top-1/2 right-8 lg:right-16 xl:right-24 -translate-y-1/2 hidden md:flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-48 h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full border border-[#d4c0a8]/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-6 lg:inset-8 rounded-full border border-[#d4c0a8]/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Rotating compass needle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: [0, 15, -10, 5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <div className="relative h-full w-px flex flex-col items-center justify-center">
            {/* North arrow */}
            <div
              className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#c4704b]"
              style={{ transform: 'translateY(-40px)' }}
            />
            {/* South arrow */}
            <div
              className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#d4c0a8]/40"
              style={{ transform: 'translateY(40px)' }}
            />
          </div>
        </motion.div>

        {/* Cardinal directions */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-[#c4704b]">N</span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-[#d4c0a8]/40">S</span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-[#d4c0a8]/40">W</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-widest text-[#d4c0a8]/40">E</span>
        </motion.div>

        {/* Center point */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="w-2 h-2 rounded-full bg-[#c4704b]" />
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-between pt-28 md:pt-24 pb-8 md:pb-12"
      style={{
        background: 'linear-gradient(160deg, #1a1714 0%, #2a2520 40%, #1a1714 100%)',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Organic flow animation */}
      <OrganicFlow />

      {/* Compass element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <CompassRose />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full">

        {/* Location indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#2a2520]/60 border border-[#d4c0a8]/15 rounded-full backdrop-blur-sm">
            <motion.span
              className="h-2 w-2 rounded-full bg-[#7a8f7a]"
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="font-mono text-xs tracking-wider text-[#d4c0a8]/70 uppercase">
              Currently in Nosara, Costa Rica
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-editorial-display font-light tracking-tight leading-[0.95] mb-6"
        >
          <motion.span
            variants={letterVariants}
            className="block text-[#faf6f1]"
          >
            Living
          </motion.span>
          <motion.span
            variants={letterVariants}
            className="block text-[#c4704b]"
          >
            Gambit
          </motion.span>
        </motion.h1>

        {/* Tagline with decorative line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-[#c4704b] to-transparent" />
          <span className="font-mono text-sm md:text-base tracking-[0.3em] text-[#d4c0a8] uppercase">
            Life Without Limits
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-[#faf6f1]/50 max-w-lg leading-relaxed font-light"
        >
          Reengineering life through intentional travel, minimalism, and personal growth.
        </motion.p>

      </div>

      {/* Bottom section with CTAs and stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          {/* Stats */}
          <div className="flex items-center gap-8 md:gap-12">
            <div>
              <span className="block text-3xl md:text-4xl font-editorial-display font-light text-[#c4704b]">20</span>
              <span className="text-xs font-mono tracking-wider text-[#d4c0a8]/50 uppercase">Countries</span>
            </div>
            <div className="h-8 w-px bg-[#d4c0a8]/20" />
            <div>
              <span className="block text-3xl md:text-4xl font-editorial-display font-light text-[#c4704b]">4</span>
              <span className="text-xs font-mono tracking-wider text-[#d4c0a8]/50 uppercase">Continents</span>
            </div>
            <div className="h-8 w-px bg-[#d4c0a8]/20" />
            <div>
              <span className="block text-3xl md:text-4xl font-editorial-display font-light text-[#c4704b]">1</span>
              <span className="text-xs font-mono tracking-wider text-[#d4c0a8]/50 uppercase">Purpose</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="#countries"
              className="group inline-flex items-center gap-2 bg-[#c4704b] text-[#1a1714] font-medium rounded-full px-6 py-3 hover:bg-[#d4856a] transition-all duration-300 shadow-lg shadow-[#c4704b]/20"
            >
              <Compass className="h-4 w-4" />
              <span className="uppercase text-sm tracking-wider font-mono">Explore Countries</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[#faf6f1] font-medium border border-[#d4c0a8]/30 rounded-full px-6 py-3 hover:bg-[#faf6f1]/5 hover:border-[#d4c0a8]/50 transition-all duration-300"
            >
              <span className="uppercase text-sm tracking-wider font-mono">Read Stories</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.5 : 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#d4c0a8]/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

    </section>
  )
}
