'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeDollarSign, Languages, TrendingUp } from 'lucide-react'
import { transportationData, TransportInfo } from '../content/transportation-data'

function getScoreBand(score: number) {
  if (score >= 8.5) {
    return {
      label: 'excellent',
      badgeClasses: 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200',
      scoreClasses: 'border-emerald-400/40 text-emerald-200',
    }
  }
  if (score >= 7) {
    return {
      label: 'strong',
      badgeClasses: 'border-cyan-400/35 bg-cyan-500/15 text-cyan-200',
      scoreClasses: 'border-cyan-400/40 text-cyan-200',
    }
  }
  if (score >= 5.5) {
    return {
      label: 'mixed',
      badgeClasses: 'border-amber-400/35 bg-amber-500/15 text-amber-200',
      scoreClasses: 'border-amber-400/40 text-amber-200',
    }
  }
  return {
    label: 'challenging',
    badgeClasses: 'border-rose-400/35 bg-rose-500/15 text-rose-200',
    scoreClasses: 'border-rose-400/40 text-rose-200',
  }
}

export default function TransportationGrid() {
  const [sortBy, setSortBy] = useState<'score' | 'country'>('score')

  const sortedData = useMemo(() => {
    return [...transportationData].sort((a, b) => {
      if (sortBy === 'score') {
        return b.score - a.score
      }
      return a.country.localeCompare(b.country)
    })
  }, [sortBy])

  const summary = useMemo(() => {
    const total = transportationData.length
    const avg = transportationData.reduce((sum, entry) => sum + entry.score, 0) / total
    const best = transportationData.reduce((top, entry) => (entry.score > top.score ? entry : top), transportationData[0])
    const strong = transportationData.filter((entry) => entry.score >= 7).length
    return {
      average: avg.toFixed(1),
      best,
      strong,
      total,
    }
  }, [])

  return (
    <div className="space-y-10">
      <div className="grid gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-3">
        <div className="bg-[var(--ui-bg-strong)] p-6">
          <div className="flex items-center gap-2 text-[var(--ui-text-subtle)]">
            <TrendingUp className="h-4 w-4" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em]">Average Score</span>
          </div>
          <div className="mt-3 text-4xl font-extralight text-[var(--ui-text-primary)]">{summary.average}</div>
          <p className="mt-1 text-sm text-[var(--ui-text-muted)]">Across {summary.total} countries</p>
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-6">
          <div className="flex items-center gap-2 text-[var(--ui-text-subtle)]">
            <Languages className="h-4 w-4" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em]">Top Network</span>
          </div>
          <div className="mt-3 text-2xl font-light text-[var(--ui-text-primary)]">{summary.best.country}</div>
          <p className="mt-1 text-sm text-[var(--ui-text-muted)]">Score {summary.best.score.toFixed(1)} / 10</p>
        </div>

        <div className="bg-[var(--ui-bg-strong)] p-6">
          <div className="flex items-center gap-2 text-[var(--ui-text-subtle)]">
            <BadgeDollarSign className="h-4 w-4" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em]">Reliable Transit</span>
          </div>
          <div className="mt-3 text-4xl font-extralight text-[var(--ui-text-primary)]">{summary.strong}</div>
          <p className="mt-1 text-sm text-[var(--ui-text-muted)]">Countries scoring 7.0+</p>
        </div>
      </div>

      {/* Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-3 py-3"
      >
        <button
          onClick={() => setSortBy('score')}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border rounded-full ${
            sortBy === 'score'
              ? 'border-[var(--ui-accent)] text-[var(--ui-on-accent)] bg-[var(--ui-accent)]'
              : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
          }`}
        >
          Sort: Score
        </button>
        <button
          onClick={() => setSortBy('country')}
          className={`px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all duration-200 border rounded-full ${
            sortBy === 'country'
              ? 'border-[var(--ui-accent)] text-[var(--ui-on-accent)] bg-[var(--ui-accent)]'
              : 'border-[var(--ui-border-subtle)] text-[var(--ui-text-muted)] hover:border-[var(--ui-border-strong)] hover:text-[var(--ui-text-primary)]'
          }`}
        >
          Sort: Country
        </button>

        <span className="px-3 py-1.5 text-xs text-[var(--ui-text-subtle)] font-mono self-center ml-auto border border-[var(--ui-border-subtle)] rounded-full">
          {sortedData.length} countries
        </span>
      </motion.div>

      {/* Transportation Grid */}
      <div className="grid gap-4">
        {sortedData.map((transport, index) => (
          <motion.div
            key={transport.country}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02, duration: 0.35 }}
          >
            <TransportCard transport={transport} rank={index + 1} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TransportCard({ transport, rank }: { transport: TransportInfo; rank: number }) {
  const scoreBand = getScoreBand(transport.score)

  return (
    <article className="group rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-6 lg:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex shrink-0 items-start gap-3">
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-2xl border ${scoreBand.scoreClasses}`}>
            <div className="text-center leading-none">
              <div className="text-2xl font-extralight">
                {transport.score}
              </div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">/10</div>
            </div>
            {rank <= 3 && (
              <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ui-accent)] text-[10px] font-mono text-[var(--ui-on-accent)]">
                {rank}
              </div>
            )}
          </div>

          <div className="pt-1">
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] ${scoreBand.badgeClasses}`}>
              {scoreBand.label}
            </span>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
              Rank #{rank}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-light text-[var(--ui-text-primary)] transition-colors duration-100 group-hover:text-[var(--ui-accent)]">
              {transport.country}
            </h3>
            <p className="mt-3 leading-relaxed font-light text-[var(--ui-text-muted)]">
              {transport.description}
            </p>
          </div>

          <div className="grid gap-3 border-t border-[var(--ui-border-subtle)] pt-4 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-3">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                Currency Snapshot
              </span>
              <span className="mt-1 block text-sm text-[var(--ui-text-secondary)]">{transport.currencyRate}</span>
            </div>

            <div className="rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-3">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                Language Context
              </span>
              <span className="mt-1 block text-sm text-[var(--ui-text-secondary)]">
                {transport.languages.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
