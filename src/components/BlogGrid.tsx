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
    <div className="space-y-12">
      {/* Year Filter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => setSelectedYear('all')}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
            selectedYear === 'all'
              ? 'border-white text-white bg-white/10'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
          }`}
        >
          All
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
              selectedYear === year
                ? 'border-white text-white bg-white/10'
                : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
            }`}
          >
            {year}
          </button>
        ))}

        {/* Results count */}
        <span className="px-4 py-2 text-xs text-white/30 font-mono self-center ml-auto">
          {filteredPosts.length} stories
        </span>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid gap-px bg-white/10 border border-white/10 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group bg-black"
          >
            <Link href={`/blog/${post.year}/${post.slug}`} className="block h-full">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
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
              <div className="p-6 space-y-4">
                {/* Date */}
                <span className="font-mono text-xs tracking-wider text-white/40 uppercase">
                  {post.displayDate}
                </span>

                {/* Title */}
                <h2 className="text-lg font-light text-white group-hover:text-white/80 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2 group-hover:text-white/50 transition-colors duration-300">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-all duration-300 pt-2">
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
          className="text-center py-12 border border-white/10"
        >
          <h3 className="text-lg font-light text-white mb-2">
            No stories found
          </h3>
          <p className="text-white/40 text-sm">
            Try selecting a different year.
          </p>
        </motion.div>
      )}
    </div>
  )
})
