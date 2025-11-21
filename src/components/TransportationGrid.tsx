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
    <div className="space-y-12">
      {/* Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => setSortBy('score')}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
            sortBy === 'score'
              ? 'border-white text-white bg-white/10'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
          }`}
        >
          By Score
        </button>
        <button
          onClick={() => setSortBy('country')}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border ${
            sortBy === 'country'
              ? 'border-white text-white bg-white/10'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
          }`}
        >
          By Country
        </button>

        <span className="px-4 py-2 text-xs text-white/30 font-mono self-center ml-auto">
          {sortedData.length} countries
        </span>
      </motion.div>

      {/* Transportation Grid */}
      <div className="grid gap-px bg-white/10 border border-white/10">
        {sortedData.map((transport, index) => (
          <motion.div
            key={transport.country}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03, duration: 0.4 }}
          >
            <TransportCard transport={transport} rank={index + 1} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TransportCard({ transport, rank }: { transport: TransportInfo; rank: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-400 border-green-400/30'
    if (score >= 7) return 'text-blue-400 border-blue-400/30'
    if (score >= 5.5) return 'text-yellow-400 border-yellow-400/30'
    return 'text-red-400 border-red-400/30'
  }

  return (
    <div className="group bg-black hover:bg-white/5 transition-colors p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">

        {/* Score Badge */}
        <div className="flex-shrink-0">
          <div className={`relative w-20 h-20 border ${getScoreColor(transport.score)} flex items-center justify-center`}>
            <div className="text-center">
              <div className={`text-2xl font-extralight ${getScoreColor(transport.score).split(' ')[0]}`}>
                {transport.score}
              </div>
              <div className="text-xs text-white/30 font-mono">/ 10</div>
            </div>
            {rank <= 3 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs font-mono flex items-center justify-center">
                {rank}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <span className="font-mono text-xs tracking-wider text-white/40 uppercase block mb-2">
              Rank #{rank}
            </span>
            <h3 className="text-xl font-light text-white group-hover:text-white/80 transition-colors duration-300">
              {transport.country}
            </h3>
            <p className="text-white/50 mt-3 leading-relaxed font-light">
              {transport.description}
            </p>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
            <div>
              <span className="font-mono text-xs tracking-wider text-white/30 uppercase block mb-1">
                Currency
              </span>
              <span className="text-sm text-white/60">{transport.currencyRate}</span>
            </div>

            <div>
              <span className="font-mono text-xs tracking-wider text-white/30 uppercase block mb-1">
                Languages
              </span>
              <span className="text-sm text-white/60">
                {transport.languages.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
