'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 300 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device has a pointer (not touch)
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Track hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.hasAttribute('data-cursor-hover') ||
        target.closest('[data-cursor-hover]')

      setIsHovering(!!isHoverable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementHover)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{
            width: isHovering ? 48 : isClicking ? 16 : 32,
            height: isHovering ? 48 : isClicking ? 16 : 32,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        {/* Inner dot */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: isClicking ? 8 : 4,
            height: isClicking ? 8 : 4,
            opacity: isHovering ? 1 : 0.8,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </>
  )
}
