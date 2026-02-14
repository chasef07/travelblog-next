'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Backpack, MapPin, Plane, Utensils, Video } from 'lucide-react'

const contentSections = [
  {
    id: 'vlogs',
    title: 'Video Stories',
    subtitle: 'Watch the journey unfold',
    description: 'Short-form and long-form video across continents.',
    icon: Video,
    href: '/vlogs',
    stat: '5',
    statLabel: 'Episodes',
  },
  {
    id: 'food',
    title: 'Food Adventures',
    subtitle: 'Local flavors first',
    description: 'Street staples and regional dishes worth a detour.',
    icon: Utensils,
    href: '/food',
    stat: '10+',
    statLabel: 'Dishes',
  },
  {
    id: 'transportation',
    title: 'Transportation',
    subtitle: 'Move smarter',
    description: 'How to navigate countries without wasting time or money.',
    icon: Plane,
    href: '/transportation',
    stat: '20+',
    statLabel: 'Guides',
  },
  {
    id: 'packing',
    title: 'Packing System',
    subtitle: 'Minimal gear stack',
    description: 'The exact setup for year-long travel with one carry-on.',
    icon: Backpack,
    href: '/packing-checklist',
    stat: '35',
    statLabel: 'Essentials',
  },
]

export default function QuickContentNav() {
  return (
    <section className="app-surface border-t border-[var(--ui-border-subtle)] py-24">
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
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
                Curated Resources
              </span>
            </div>
            <h2 className="font-editorial text-4xl tracking-tight text-[var(--ui-text-primary)] md:text-5xl lg:text-6xl">
              Build Your Route
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--ui-text-secondary)]">
              Story first, systems second. Use these sections to turn inspiration
              into practical action.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--ui-border-strong)] px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--ui-text-primary)] transition-colors hover:bg-[var(--ui-bg-soft)]"
          >
            Start with stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
            >
              <Link
                href={section.href}
                className="group flex h-full flex-col rounded-2xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] p-6 transition-colors hover:border-[var(--ui-border-strong)]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] text-[var(--ui-accent)]">
                  <section.icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-subtle)]">
                  {section.subtitle}
                </span>
                <h3 className="mt-2 text-xl font-light text-[var(--ui-text-primary)]">
                  {section.title}
                </h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-[var(--ui-text-muted)]">
                  {section.description}
                </p>
                <div className="mt-6 flex items-end justify-between border-t border-[var(--ui-border-subtle)] pt-4">
                  <div>
                    <span className="block font-editorial text-2xl leading-none text-[var(--ui-accent)]">
                      {section.stat}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ui-text-subtle)]">
                      {section.statLabel}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--ui-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--ui-accent)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
