'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const FoodGrid = dynamic(() => import('@/components/FoodGrid'), {
  loading: () => (
    <div className="text-center py-12">
      <div className="text-white/40 font-mono tracking-wider text-sm">LOADING CUISINES...</div>
    </div>
  )
})

export default function Page() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
              [ Culinary Adventures ]
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
              Local Flavors
            </h1>
          </div>
          <p className="text-white/50 text-lg leading-relaxed max-w-md md:text-right">
            Each dish tells a story of culture and tradition. Authentic street food and local specialties.
          </p>
        </motion.div>

        <FoodGrid />
      </div>
    </main>
  )
}
