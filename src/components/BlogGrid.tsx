'use client'

import { useState, useMemo, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { blogIndex } from '@/content/blogIndex'

export const BlogGrid = memo(function BlogGrid() {
  const [selectedYear, setSelectedYear] = useState<string>('all')

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
    <div className="space-y-8 sm:space-y-12">
      {/* Year Filter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 pr-2 sm:flex-wrap sm:gap-3 sm:pr-0"
      >
        <button
          onClick={() => setSelectedYear('all')}
          className={`shrink-0 min-h-10 rounded-full border px-4 py-2.5 text-[11px] uppercase tracking-wider font-mono transition-all duration-200 ${
            selectedYear === 'all'
              ? 'border-[var(--ui-border-strong)] text-[var(--ui-text-primary)] bg-[var(--ui-bg-soft)]'
              : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
          }`}
        >
          All
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`shrink-0 min-h-10 rounded-full border px-4 py-2.5 text-[11px] uppercase tracking-wider font-mono transition-all duration-200 ${
              selectedYear === year
                ? 'border-[var(--ui-border-strong)] text-[var(--ui-text-primary)] bg-[var(--ui-bg-soft)]'
                : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
            }`}
          >
            {year}
          </button>
        ))}

        {/* Results count */}
        <span className="w-full px-1 pt-1 text-[11px] text-[var(--ui-text-subtle)] font-mono sm:ml-auto sm:w-auto sm:px-4 sm:pt-0 sm:text-xs sm:self-center">
          {filteredPosts.length} stories
        </span>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group bg-[var(--ui-bg-strong)] hover:bg-[var(--ui-bg-soft)] transition-colors"
          >
            <Link href={`/blog/${post.year}/${post.slug}`} className="block h-full touch-manipulation">
              {/* Image Section */}
              <div className="relative h-44 overflow-hidden sm:h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={index < 6 ? "eager" : "lazy"}
                  priority={index < 3}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="space-y-4 p-5 sm:p-6">
                {/* Date */}
                <span className="font-mono text-xs tracking-wider text-[var(--ui-text-muted)] uppercase">
                  {post.displayDate}
                </span>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-light text-[var(--ui-text-primary)] group-hover:text-[var(--ui-accent)] transition-colors duration-300 line-clamp-2 leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-[var(--ui-text-muted)] leading-relaxed line-clamp-3 sm:line-clamp-2 group-hover:text-[var(--ui-text-secondary)] transition-colors duration-300">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-[var(--ui-text-subtle)] group-hover:text-[var(--ui-accent)] transition-all duration-300 pt-2">
                  <span className="text-xs uppercase tracking-wider">Read</span>
                  <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 border border-[var(--ui-border-subtle)]"
        >
          <h3 className="text-lg font-light text-[var(--ui-text-primary)] mb-2">
            No stories found
          </h3>
          <p className="text-[var(--ui-text-muted)] text-sm">
            Try selecting a different year.
          </p>
        </motion.div>
      )}
    </div>
  )
})
