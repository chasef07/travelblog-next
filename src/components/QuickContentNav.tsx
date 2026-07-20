'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, MapPin, Route } from 'lucide-react'
import { atlasCatalog } from '@/content/maps-data'

const intentMetadata = {
  surf: {
    subtitle: 'Warm water + waves',
    icon: Compass,
    statLabel: 'Priority lens',
  },
  adventure: {
    subtitle: 'Nature + motion',
    icon: Compass,
    statLabel: 'Priority lens',
  },
  wellness: {
    subtitle: 'Reset + recovery',
    icon: MapPin,
    statLabel: 'Priority lens',
  },
  journey: {
    subtitle: 'Chronological route',
    icon: Route,
    statLabel: 'Core pillar',
  },
} as const

const contentSections = atlasCatalog.intents.map((intent) => {
  const metadata =
    intentMetadata[intent.id as keyof typeof intentMetadata] ||
    intentMetadata.surf

  return {
    ...intent,
    ...metadata,
  }
})

export default function QuickContentNav() {
  return (
    <section className="app-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-[var(--ui-accent)]" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-text-muted)]">
                Explore by intent
              </span>
            </div>
            <h2 className="font-editorial text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl lg:text-6xl">
              Atlas entry points
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              Start with the question you actually care about and move from
              lived narrative into useful place intelligence.
            </p>
          </div>
          <Link
            href="/maps"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--ui-text-primary)] transition-all duration-100 hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)]"
          >
            See paid maps
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border border-[var(--ui-border-subtle)] bg-[var(--ui-border-subtle)] md:grid-cols-2 lg:grid-cols-4">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              className="bg-[var(--ui-bg-strong)]"
            >
              <Link
                href={section.href}
                className="group flex h-full flex-col p-6 sm:p-7 transition-colors duration-100 hover:bg-[var(--ui-bg-soft)]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-dashed border-[var(--ui-border-strong)] text-[var(--ui-accent)] transition-colors duration-100 group-hover:border-[var(--ui-accent)]">
                  <section.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--ui-text-subtle)]">
                  {section.subtitle}
                </span>
                <h3 className="mt-2 text-xl font-light text-[var(--ui-text-primary)] transition-colors duration-100 group-hover:text-[var(--ui-accent)]">
                  {section.title}
                </h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {section.description}
                </p>
                <div className="mt-6 flex items-end justify-between border-t border-dashed border-[var(--ui-border-subtle)] pt-4">
                  <div>
                    <span className="block font-editorial text-2xl leading-none text-[var(--ui-accent)]">
                      {section.stat}
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-subtle)]">
                      {section.statLabel}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--ui-text-muted)] transition-all duration-100 group-hover:translate-x-1 group-hover:text-[var(--ui-accent)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
