'use client'

import { useState, useMemo, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { blogIndex } from '@/content/blogIndex'

// Determine card size based on position for asymmetric layout
const getCardSize = (index: number): 'large' | 'medium' | 'small' => {
  // Every 5th card is large, every 3rd is medium, rest are small
  if (index % 7 === 0) return 'large'
  if (index % 3 === 1) return 'medium'
  return 'small'
}

export const BlogGrid = memo(function BlogGrid() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Extract unique years
  const years = useMemo(() => {
    const yearSet = new Set(blogIndex.map(post => post.year.toString()))
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a))
  }, [])

  // Filter posts based on selected year
  const filteredPosts = useMemo(() => {
    return blogIndex.filter(post => {
      return selectedYear === 'all' || post.year.toString() === selectedYear
    })
  }, [selectedYear])

  return (
    <div className="space-y-16">
      {/* Header with Filter */}
      <div className="flex flex-col gap-8">
        {/* Year Filter - Experimental Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2"
        >
          <button
            onClick={() => setSelectedYear('all')}
            className={`relative px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${
              selectedYear === 'all'
                ? 'text-signal'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            All Stories
            {selectedYear === 'all' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-px bg-signal"
              />
            )}
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`relative px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${
                selectedYear === year
                  ? 'text-signal'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {year}
              {selectedYear === year && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-signal"
                />
              )}
            </button>
          ))}

          {/* Results count - pushed to right */}
          <div className="ml-auto pl-8 border-l border-white/10">
            <span className="font-mono text-xs text-white/30 tracking-wider">
              {filteredPosts.length} <span className="text-white/20">entries</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Asymmetric Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        {filteredPosts.map((post, index) => {
          const size = getCardSize(index)
          const isHovered = hoveredIndex === index

          return (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`
                group relative bg-void-black overflow-hidden
                ${size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                ${size === 'medium' ? 'md:row-span-2' : ''}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={`/blog/${post.year}/${post.slug}`} className="block h-full">
                {/* Image Container - Variable height based on size */}
                <div className={`
                  relative overflow-hidden
                  ${size === 'large' ? 'h-[400px] md:h-[500px]' : ''}
                  ${size === 'medium' ? 'h-[300px] md:h-[400px]' : ''}
                  ${size === 'small' ? 'h-[250px]' : ''}
                `}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes={size === 'large'
                      ? '(max-width: 768px) 100vw, 66vw'
                      : '(max-width: 768px) 100vw, 33vw'
                    }
                    className={`
                      object-cover transition-all duration-700
                      ${isHovered ? 'scale-105 brightness-75' : 'scale-100 brightness-50'}
                    `}
                    loading={index < 6 ? "eager" : "lazy"}
                    priority={index < 3}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/50 to-transparent" />

                  {/* Index number - top right */}
                  <div className="absolute top-4 right-4 font-mono text-xs text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Content - positioned at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    {/* Date badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-3 h-3 text-signal" />
                      <span className="font-mono text-xs tracking-[0.2em] text-white/50 uppercase">
                        {post.displayDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className={`
                      font-display text-white mb-3 transition-colors duration-300
                      group-hover:text-signal
                      ${size === 'large' ? 'text-2xl md:text-3xl' : ''}
                      ${size === 'medium' ? 'text-xl md:text-2xl' : ''}
                      ${size === 'small' ? 'text-lg' : ''}
                    `}>
                      {post.title}
                    </h2>

                    {/* Excerpt - only on larger cards */}
                    {(size === 'large' || size === 'medium') && (
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4 max-w-lg">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read indicator */}
                    <div className={`
                      flex items-center gap-2 transition-all duration-300
                      ${isHovered ? 'text-signal translate-x-2' : 'text-white/30'}
                    `}>
                      <span className="font-mono text-xs tracking-[0.2em] uppercase">Read</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Hover border effect */}
              <div className={`
                absolute inset-0 border transition-colors duration-300 pointer-events-none
                ${isHovered ? 'border-signal/50' : 'border-white/5'}
              `} />
            </motion.article>
          )
        })}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 border border-white/10"
        >
          <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6">
            <span className="font-mono text-2xl text-white/20">?</span>
          </div>
          <h3 className="font-display text-xl text-white mb-2">
            No stories found
          </h3>
          <p className="text-white/40 text-sm font-mono tracking-wider">
            Try selecting a different year
          </p>
        </motion.div>
      )}
    </div>
  )
})
