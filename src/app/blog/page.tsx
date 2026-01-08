'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { GridSkeleton, FilterSkeleton } from '@/components/ui/skeleton'

const BlogGrid = dynamic(() => import('@/components/BlogGrid').then(mod => ({ default: mod.BlogGrid })), {
  loading: () => (
    <div className="space-y-12">
      <FilterSkeleton count={3} />
      <GridSkeleton count={6} columns="md:grid-cols-2 lg:grid-cols-3" />
    </div>
  )
})

export default function Page() {
  return (
    <main className="min-h-screen bg-void-black pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          {/* Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-signal" />
            <span className="font-mono text-xs tracking-[0.3em] text-signal uppercase">
              Travel Stories
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-statement text-white mb-6">
            Stories
          </h1>

          {/* Description */}
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Real experiences from 19 countries across 4 continents.
            Cultural insights, practical tips, and authentic stories from the road.
          </p>
        </motion.div>

        {/* Grid */}
        <BlogGrid />
      </div>
    </main>
  )
}
