'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { blogIndex } from '@/content/blogIndex'

export function BlogGrid() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')

  // Extract unique years and countries (simplified since no location data)
  const years = useMemo(() => {
    const yearSet = new Set(blogIndex.map(post => post.year.toString()))
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a))
  }, [])

  // For now, extract countries from the title since location isn't available
  const countries = useMemo(() => {
    const countrySet = new Set(
      blogIndex.map(post => {
        // Extract country from title patterns like "Adventures in Laos", "Investing in Georgia"
        const match = post.title.match(/\b(?:in|of)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i)
        return match ? match[1] : ''
      }).filter(Boolean)
    )
    return Array.from(countrySet).sort()
  }, [])

  // Filter posts based on selected filters
  const filteredPosts = useMemo(() => {
    return blogIndex.filter(post => {
      const yearMatch = selectedYear === 'all' || post.year.toString() === selectedYear
      if (selectedCountry === 'all') return yearMatch
      
      // Check if country appears in title
      const countryMatch = post.title.toLowerCase().includes(selectedCountry.toLowerCase())
      return yearMatch && countryMatch
    })
  }, [selectedYear, selectedCountry])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  }

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <motion.div
        variants={filterVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-4 justify-center"
      >
        {/* Year Filter */}
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedYear === 'all'
                ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg'
                : 'bg-[var(--surface-color)] text-[var(--muted-text-color)] hover:bg-[var(--muted-background)] hover:text-[var(--primary-color)]'
            }`}
          >
            All Years
          </motion.button>
          {years.map(year => (
            <motion.button
              key={year}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedYear === year
                  ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg'
                  : 'bg-[var(--surface-color)] text-[var(--muted-text-color)] hover:bg-[var(--muted-background)] hover:text-[var(--primary-color)]'
              }`}
            >
              {year}
            </motion.button>
          ))}
        </div>

        {/* Country Filter */}
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCountry('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCountry === 'all'
                ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg'
                : 'bg-[var(--surface-color)] text-[var(--muted-text-color)] hover:bg-[var(--muted-background)] hover:text-[var(--primary-color)]'
            }`}
          >
            All Countries
          </motion.button>
          {countries.slice(0, 6).map(country => (
            <motion.button
              key={country}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCountry === country
                  ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg'
                  : 'bg-[var(--surface-color)] text-[var(--muted-text-color)] hover:bg-[var(--muted-background)] hover:text-[var(--primary-color)]'
              }`}
            >
              {country}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-[var(--muted-text-color)]"
      >
        {filteredPosts.length === blogIndex.length 
          ? `All ${blogIndex.length} stories` 
          : `${filteredPosts.length} of ${blogIndex.length} stories`}
      </motion.div>

      {/* Blog Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label="Travel blog posts"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredPosts.map((post, index) => {
          // Extract country from title for badge
          const countryMatch = post.title.match(/\b(?:in|of)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i)
          const country = countryMatch ? countryMatch[1] : post.year.toString()
          
          return (
            <motion.article
              key={post.title}
              variants={cardVariants}
              itemScope
              itemType="https://schema.org/BlogPosting"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--surface-color)] via-[var(--surface-color)] to-[color-mix(in_oklab,var(--surface-color)_90%,var(--primary-color)_10%)] shadow-lg hover:shadow-2xl transition-all duration-500"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
            >
              <Link href={`/blog/${post.year}/${post.slug}`} className="block h-full">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`${post.title} - Travel blog post featuring adventure stories`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    itemProp="image"
                    loading="lazy"
                  />
                  
                  {/* Country Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium border border-white/20">
                      {country}
                    </div>
                  </div>

                  {/* Featured badge for first post */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white text-xs font-semibold tracking-wide uppercase shadow-lg">
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-3">
                  {/* Date */}
                  <time
                    dateTime={post.date}
                    itemProp="datePublished"
                    className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--secondary-color)]/10 text-[var(--primary-color)] text-xs font-medium"
                  >
                    {post.displayDate}
                  </time>

                  {/* Title */}
                  <h2
                    itemProp="headline"
                    className="text-xl font-bold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300 line-clamp-2"
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    itemProp="description"
                    className="text-[var(--muted-text-color)] text-sm leading-relaxed line-clamp-3"
                  >
                    {post.excerpt}
                  </p>

                  {/* Read More Arrow */}
                  <div className="flex items-center text-[var(--primary-color)] text-sm font-medium group-hover:text-[var(--secondary-color)] transition-colors duration-300">
                    <span>Read Story</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Hidden Author for SEO */}
                  <div itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                    <span itemProp="name">Chase Fagen</span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.article>
          )
        })}
      </motion.section>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-2">
            No stories found
          </h3>
          <p className="text-[var(--muted-text-color)]">
            Try adjusting your filters to see more stories.
          </p>
        </motion.div>
      )}
    </div>
  )
}
