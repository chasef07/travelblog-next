'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Globe,
  BookOpen,
  Video,
  Utensils,
  Plane,
  Backpack,
  Home,
  X,
  Command
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
}

const navItems: NavItem[] = [
  { href: '/', label: 'Globe', icon: Home, shortcut: 'G' },
  { href: '/blog', label: 'Stories', icon: BookOpen, shortcut: 'S' },
  { href: '/vlogs', label: 'Signal', icon: Video, shortcut: 'V' },
  { href: '/food', label: 'Sustenance', icon: Utensils, shortcut: 'F' },
  { href: '/transportation', label: 'Movement', icon: Plane, shortcut: 'M' },
  { href: '/packing-checklist', label: 'Minimal', icon: Backpack, shortcut: 'P' },
]

export default function HiddenNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const pathname = usePathname()

  // Track mouse position for edge detection
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })

    // Show nav when mouse is near left edge (within 40px)
    const nearLeftEdge = e.clientX < 40
    const nearTopEdge = e.clientY < 60

    if (nearLeftEdge || nearTopEdge) {
      setIsVisible(true)
    } else if (!isHovering) {
      setIsVisible(false)
    }
  }, [isHovering])

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    // Show nav with Escape key
    if (e.key === 'Escape') {
      setIsVisible(prev => !prev)
      return
    }

    // Navigation shortcuts (when nav is visible)
    if (isVisible) {
      const item = navItems.find(i => i.shortcut?.toLowerCase() === e.key.toLowerCase())
      if (item) {
        window.location.href = item.href
      }
    }
  }, [isVisible])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleMouseMove, handleKeyDown])

  return (
    <>
      {/* Edge Trigger Zone - Visual indicator */}
      <div
        className="fixed left-0 top-0 w-1 h-full z-50 pointer-events-none"
        style={{
          background: isVisible
            ? 'linear-gradient(to right, rgba(255,77,0,0.3), transparent)'
            : 'linear-gradient(to right, rgba(255,255,255,0.05), transparent)'
        }}
      />

      {/* Navigation Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full z-50 flex items-center"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false)
              setIsVisible(false)
            }}
          >
            {/* Background with blur */}
            <div className="absolute inset-0 bg-void-black/90 backdrop-blur-xl border-r border-white/10" />

            {/* Content */}
            <div className="relative px-6 py-8 flex flex-col h-full">
              {/* Brand */}
              <div className="mb-12">
                <Link href="/" className="block">
                  <span className="font-display text-lg text-white hover:text-signal transition-colors">
                    LG
                  </span>
                </Link>
              </div>

              {/* Nav Items */}
              <div className="flex-1 flex flex-col justify-center gap-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          group flex items-center gap-4 px-4 py-3 rounded-lg
                          transition-all duration-200
                          ${isActive
                            ? 'bg-signal/10 text-signal'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-mono text-sm tracking-wider uppercase">
                          {item.label}
                        </span>
                        {item.shortcut && (
                          <span className="ml-auto font-mono text-xs text-white/20 group-hover:text-white/40 transition-colors">
                            {item.shortcut}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer hint */}
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/30">
                  <Command className="w-3 h-3" />
                  <span className="font-mono text-xs tracking-wider">K to search</span>
                </div>
                <div className="flex items-center gap-2 text-white/30 mt-2">
                  <span className="font-mono text-xs tracking-wider">ESC to toggle</span>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Top bar - minimal, always visible hint */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Brand hint */}
          <div className="pointer-events-auto">
            <Link
              href="/"
              className="font-display text-sm text-white/30 hover:text-white transition-colors"
            >
              Living Gambit
            </Link>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <button
              onClick={() => setIsVisible(true)}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full
                         text-white/40 hover:text-white hover:border-white/30 transition-all"
            >
              <span className="font-mono text-xs tracking-wider">Menu</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
