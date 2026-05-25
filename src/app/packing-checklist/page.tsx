import dynamic from 'next/dynamic'

const ModernPackingChecklist = dynamic(
  () => import('@/components/ModernPackingChecklist'),
  {
    loading: () => (
      <div className="text-center py-12">
        <div className="text-[var(--ui-text-subtle)] font-mono tracking-wider text-sm">
          LOADING CHECKLIST...
        </div>
      </div>
    ),
  },
)

export default function Page() {
  return (
    <main className="min-h-screen pt-24 app-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-16 rounded-3xl border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-strong)] p-8 md:p-10 animate-fade-in">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
                [ Travel Essentials ]
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[var(--ui-text-primary)]">
                Packing List
              </h1>
            </div>
            <p className="text-[var(--ui-text-muted)] text-lg leading-relaxed max-w-md md:text-right">
              Everything for a year-long journey across 23 countries.
              Battle-tested and essential.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
              Filter by Category
            </span>
            <span className="rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
              Save Progress
            </span>
            <span className="rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ui-text-muted)]">
              Essential vs Optional
            </span>
          </div>
        </div>

        <ModernPackingChecklist />
      </div>
    </main>
  )
}
