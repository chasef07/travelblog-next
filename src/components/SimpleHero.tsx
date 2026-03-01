'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { blogIndex } from '@/content/blogIndex'
import HeroGlobeMobile from './HeroGlobeMobile'

const stats = [
  { value: '20', label: 'Countries' },
  { value: '4', label: 'Continents' },
  { value: '16', label: 'Months' },
]

export default function SimpleHero() {
  const latestPost = [...blogIndex].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0]
  const latestMonthHref = latestPost ? `/blog/${latestPost.year}/${latestPost.slug}` : '/blog'
  const latestMonthLabel = latestPost?.displayDate ?? 'Latest'

  return (
    <section className="app-surface relative min-h-[100svh] overflow-hidden border-b border-[var(--ui-border-subtle)] pt-24 pb-8 sm:min-h-0 sm:pt-28 sm:pb-14 md:pt-36 md:pb-24">
      <div
        className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'var(--ui-accent-soft)' }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'var(--ui-accent-soft)' }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 sm:gap-10 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 sm:mb-7 sm:gap-2 sm:px-4 sm:py-2"
          >
            <span className="relative flex h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/40" />
              <span className="relative inline-flex h-full w-full rounded-full bg-green-500" />
            </span>
            <span className="block truncate whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ui-text-muted)] sm:text-xs sm:tracking-[0.22em]">
              Currently in Clearwater, Florida
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-editorial-display text-4xl leading-[0.95] tracking-tight text-[var(--ui-text-primary)] sm:text-6xl md:text-7xl xl:text-8xl"
          >
            Lifestyle{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--gradient-primary)' }}
            >
              Engineering
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ui-text-secondary)] sm:mt-6 sm:text-lg md:text-xl"
          >
            Don&apos;t let life control you, you control life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4"
          >
            <Link
              href={latestMonthHref}
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--ui-accent)] px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ui-on-accent)] transition-colors hover:bg-[var(--ui-accent-hover)] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.18em]"
            >
              Latest: {latestMonthLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-4 lg:hidden"
          >
            <HeroGlobeMobile />
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hidden rounded-3xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-7 backdrop-blur-sm lg:block"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ui-text-muted)]">
            Journey Snapshot
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ui-text-secondary)]">
            Built from one-way tickets, notebooks, and a carry-on backpack.
            Every page here is field-tested.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[var(--ui-border-subtle)] pt-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-editorial text-3xl leading-none text-[var(--ui-accent)]">
                  {stat.value}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ui-text-subtle)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
