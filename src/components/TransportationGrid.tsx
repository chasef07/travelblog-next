'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { transportationData, TransportInfo } from '../content/transportation-data'

export default function TransportationGrid() {
  const [sortBy, setSortBy] = useState<'score' | 'country'>('score')
  
  const sortedData = [...transportationData].sort((a, b) => {
    if (sortBy === 'score') {
      return b.score - a.score
    }
    return a.country.localeCompare(b.country)
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-8"
    >
      {/* Sort Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy('score')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            sortBy === 'score'
              ? 'bg-[var(--secondary-color)] text-white shadow-md'
              : 'bg-[var(--surface-color)] text-[var(--text-color)] hover:bg-[var(--secondary-color)] hover:text-white border border-[var(--border-color)]'
          }`}
        >
          Sort by Score
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy('country')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            sortBy === 'country'
              ? 'bg-[var(--secondary-color)] text-white shadow-md'
              : 'bg-[var(--surface-color)] text-[var(--text-color)] hover:bg-[var(--secondary-color)] hover:text-white border border-[var(--border-color)]'
          }`}
        >
          Sort by Country
        </motion.button>
      </motion.div>

      {/* Transportation Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-6 lg:gap-8"
      >
        {sortedData.map((transport, index) => (
          <motion.div
            key={transport.country}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <TransportCard transport={transport} rank={index + 1} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

function TransportCard({ transport, rank }: { transport: TransportInfo; rank: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600 bg-green-50 dark:bg-green-900/20'
    if (score >= 7) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    if (score >= 5.5) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 bg-red-50 dark:bg-red-900/20'
  }

  const getScoreBorder = (score: number) => {
    if (score >= 8.5) return 'border-green-200 dark:border-green-800'
    if (score >= 7) return 'border-blue-200 dark:border-blue-800'
    if (score >= 5.5) return 'border-yellow-200 dark:border-yellow-800'
    return 'border-red-200 dark:border-red-800'
  }

  return (
    <div className="group bg-[var(--surface-color)] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ring-1 ring-black/5">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        
        {/* Score Badge */}
        <div className="flex-shrink-0">
          <div className={`relative w-24 h-24 rounded-2xl ${getScoreColor(transport.score)} ${getScoreBorder(transport.score)} border-2 flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{transport.score}</div>
              <div className="text-xs font-medium opacity-75">/ 10</div>
            </div>
            {rank <= 3 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--accent-color)] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                {rank}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-[var(--primary-color)] group-hover:text-[var(--secondary-color)] transition-colors duration-300">
              {transport.country}
            </h3>
            <p className="text-lg text-[var(--text-color)] mt-2 leading-relaxed">
              {transport.description}
            </p>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
            <div>
              <h4 className="font-semibold text-[var(--primary-color)] mb-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Currency
              </h4>
              <p className="text-sm text-[var(--muted-text-color)]">{transport.currencyRate}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[var(--primary-color)] mb-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                </svg>
                Languages
              </h4>
              <p className="text-sm text-[var(--muted-text-color)]">
                {transport.languages.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}