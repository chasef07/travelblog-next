import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight, ListChecks } from 'lucide-react'
import { GridSkeleton, FilterSkeleton } from '@/components/ui/skeleton'

const BlogGrid = dynamic(
  () =>
    import('@/components/BlogGrid').then((mod) => ({ default: mod.BlogGrid })),
  {
    loading: () => (
      <div className="space-y-12">
        <FilterSkeleton count={3} />
        <GridSkeleton count={6} columns="md:grid-cols-2 lg:grid-cols-3" />
      </div>
    ),
  },
)

import { SectionHeader } from '@/components/SectionHeader'

export default function Page() {
  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <SectionHeader
          label="Travel Stories"
          title="Adventures"
          description="Real experiences from 23 countries. Cultural insights, practical tips, and authentic stories."
        />
        <Link
          href="/packing-checklist"
          className="mb-10 flex flex-col gap-4 border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] px-5 py-5 transition-colors duration-100 hover:border-[var(--ui-accent)] sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--ui-border-subtle)] text-[var(--ui-accent)]">
              <ListChecks className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)]">
                Packing checklist
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-[var(--ui-text-muted)]">
                The full backpacking list with gear, clothes, electronics, and
                travel essentials.
              </span>
            </span>
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-accent)]">
            Open list
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
        <BlogGrid />
      </div>
    </main>
  )
}
