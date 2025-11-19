'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedGlobe() {
  const [isClient, setIsClient] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations for parallax
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 150,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 150,
    damping: 30
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (!isClient) {
    return <div className="w-full h-full" />
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Globe Container with 3D transforms */}
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.3
        }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ width: '400px', height: '400px' }}
        />

        {/* Main Globe */}
        <motion.div
          className="relative w-80 h-80 rounded-full bg-white/5 backdrop-blur-sm border-2 border-white/10 shadow-2xl shadow-white/5 overflow-hidden"
          animate={{
            rotateZ: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Grid Lines - Latitude */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`lat-${i}`}
              className="absolute left-0 right-0 border-t border-white/10"
              style={{
                top: `${(i + 1) * 11.11}%`,
                transform: 'translateZ(0)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Grid Lines - Longitude */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`long-${i}`}
              className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"
              style={{
                transform: `translateX(-50%) rotateZ(${i * 15}deg)`,
                transformOrigin: 'center center',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />

          {/* Pulsing Center Dot (Current Location) */}
          <motion.div
            className="absolute top-1/3 left-2/3 w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
          </motion.div>

          {/* Travel Path Lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 50 160 Q 100 100, 150 120 T 270 180"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, delay: 1 },
                opacity: { duration: 0.5, delay: 1 }
              }}
            />
            <motion.path
              d="M 160 50 Q 180 120, 220 160 T 280 240"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, delay: 1.3 },
                opacity: { duration: 0.5, delay: 1.3 }
              }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Orbital Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{
            width: '420px',
            height: '420px',
            top: '-20px',
            left: '-20px',
          }}
          animate={{
            rotateZ: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-white/60 -translate-x-1/2 shadow-lg shadow-white/50"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating Stats - Minimal */}
      <motion.div
        className="absolute top-10 left-10 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="text-xs font-medium text-white/60">18 Countries</div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        <div className="text-xs font-medium text-white/60">1 Year</div>
      </motion.div>
    </div>
  )
}
