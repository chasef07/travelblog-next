'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Search,
  Globe,
  BookOpen,
  Video,
  Utensils,
  Plane,
  Backpack,
  Home,
  ArrowRight,
  Command,
  CornerDownLeft
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  keywords?: string[]
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Define commands
  const commands: CommandItem[] = [
    {
      id: 'home',
      label: 'Go to Globe',
      description: 'Return to the main globe view',
      icon: Home,
      action: () => router.push('/'),
      keywords: ['home', 'main', 'globe', 'start']
    },
    {
      id: 'stories',
      label: 'Read Stories',
      description: 'Browse all travel stories',
      icon: BookOpen,
      action: () => router.push('/blog'),
      keywords: ['blog', 'stories', 'posts', 'read', 'articles']
    },
    {
      id: 'vlogs',
      label: 'Watch Signal',
      description: 'Video stories and vlogs',
      icon: Video,
      action: () => router.push('/vlogs'),
      keywords: ['video', 'vlogs', 'watch', 'signal', 'youtube']
    },
    {
      id: 'food',
      label: 'Explore Sustenance',
      description: 'Food discoveries and guides',
      icon: Utensils,
      action: () => router.push('/food'),
      keywords: ['food', 'eat', 'restaurant', 'sustenance', 'cuisine']
    },
    {
      id: 'transport',
      label: 'Movement',
      description: 'Transportation guides',
      icon: Plane,
      action: () => router.push('/transportation'),
      keywords: ['transport', 'travel', 'flight', 'bus', 'movement', 'getting around']
    },
    {
      id: 'packing',
      label: 'Minimal Packing',
      description: 'Packing checklist and gear',
      icon: Backpack,
      action: () => router.push('/packing-checklist'),
      keywords: ['packing', 'gear', 'checklist', 'minimal', 'backpack']
    },
  ]

  // Filter commands based on search
  const filteredCommands = commands.filter(cmd => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.description?.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some(k => k.toLowerCase().includes(searchLower))
    )
  })

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open with Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen(prev => !prev)
      return
    }

    // Close with Escape
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
      return
    }
  }, [isOpen])

  // Handle navigation within palette
  const handlePaletteKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          setIsOpen(false)
        }
        break
    }
  }, [filteredCommands, selectedIndex])

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setSearch('')
    }
  }, [isOpen])

  // Global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-void-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101]"
          >
            <div className="bg-void-deep border border-white/10 overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handlePaletteKeyDown}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-white placeholder:text-white/30
                             font-mono text-sm tracking-wide outline-none"
                />
                <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded">
                  <span className="font-mono text-xs text-white/30">ESC</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="font-mono text-sm text-white/40">No commands found</p>
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredCommands.map((cmd, index) => {
                      const Icon = cmd.icon
                      const isSelected = index === selectedIndex

                      return (
                        <button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action()
                            setIsOpen(false)
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`
                            w-full flex items-center gap-4 px-4 py-3 text-left
                            transition-colors duration-100
                            ${isSelected ? 'bg-signal/10' : 'hover:bg-white/5'}
                          `}
                        >
                          <div className={`
                            p-2 rounded-lg
                            ${isSelected ? 'bg-signal/20 text-signal' : 'bg-white/5 text-white/40'}
                          `}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-mono text-sm tracking-wide ${isSelected ? 'text-signal' : 'text-white'}`}>
                              {cmd.label}
                            </p>
                            {cmd.description && (
                              <p className="font-mono text-xs text-white/40 truncate">
                                {cmd.description}
                              </p>
                            )}
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1 text-signal">
                              <CornerDownLeft className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-white/30">
                    <span className="font-mono text-xs">↑↓</span>
                    <span className="font-mono text-xs">navigate</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/30">
                    <CornerDownLeft className="w-3 h-3" />
                    <span className="font-mono text-xs">select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white/30">
                  <Command className="w-3 h-3" />
                  <span className="font-mono text-xs">K to toggle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
