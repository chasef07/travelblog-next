import dynamic from 'next/dynamic'

const TransportationGrid = dynamic(() => import('@/components/TransportationGrid'), {
  loading: () => (
    <div className="text-center py-12">
      <div className="text-[var(--ui-text-subtle)] font-mono tracking-wider text-sm">LOADING GUIDES...</div>
    </div>
  )
})

export default function Page() {
  return (
    <main className="min-h-screen pt-24 app-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16 rounded-3xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-8 md:p-10 animate-fade-in">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
                [ Getting Around ]
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
                Transportation
              </h1>
            </div>
            <p className="text-[var(--ui-text-muted)] text-lg leading-relaxed max-w-md md:text-right">
              Comprehensive ratings and practical tips for getting around in 20 countries.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
              Rankings & Scorecards
            </span>
            <span className="rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
              Currency Context
            </span>
            <span className="rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
              Language Notes
            </span>
          </div>
        </div>

        <TransportationGrid />
      </div>
    </main>
  )
}
