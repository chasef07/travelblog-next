import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Travel Recommendations | Lifestyle Engineering',
  description:
    'Curated best-of lists: hotels, restaurants, activities, and country guides from 20 countries of travel experience.',
}

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen pt-24 app-surface">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
            [ Curated Picks ]
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-editorial-display font-light text-[var(--ui-text-primary)] mb-6">
            Recommendations
          </h1>
          <p className="text-[var(--ui-text-muted)] text-lg leading-relaxed max-w-2xl">
            The best of the best from 20 countries of travel. Hotels,
            restaurants, activities, and more.
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="border border-[var(--ui-border-subtle)] rounded-lg p-12 text-center bg-[var(--ui-bg-soft)]">
          <div className="max-w-md mx-auto">
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <span className="absolute inline-flex h-8 w-8 rounded-full bg-green-500/30 animate-ping" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
            </div>
            <h2 className="text-2xl font-light text-[var(--ui-text-primary)] mb-4">
              Coming Soon
            </h2>
            <p className="text-[var(--ui-text-muted)] mb-8">
              I'm curating my top picks from 20 countries of travel. Check back
              soon for best hotels, restaurants, activities, and insider tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/countries"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--ui-accent)] text-[var(--ui-on-accent)] rounded-full font-medium hover:bg-[var(--ui-accent-hover)] transition-colors shadow-lg"
              >
                Browse Countries
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--ui-border-strong)] text-[var(--ui-text-primary)] rounded-full font-medium hover:bg-[var(--ui-bg-soft)] transition-colors"
              >
                Read Stories
              </Link>
            </div>
          </div>
        </div>

        {/* Preview Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Best Hotels',
              description: 'Where to stay for the best experience',
              icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            },
            {
              title: 'Best Restaurants',
              description: 'Must-try dining experiences',
              icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            },
            {
              title: 'Best Activities',
              description: 'Unforgettable experiences',
              icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            },
          ].map((category) => (
            <div
              key={category.title}
              className="border border-[var(--ui-border-subtle)] rounded-lg p-6 opacity-70 bg-[var(--ui-bg-soft)]"
            >
              <svg
                className="w-8 h-8 text-[var(--ui-accent)] opacity-60 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={category.icon}
                />
              </svg>
              <h3 className="text-lg font-light text-[var(--ui-text-primary)] mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-[var(--ui-text-subtle)]">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
