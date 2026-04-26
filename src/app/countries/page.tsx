import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCountries } from '@/content/countries-data'

export const metadata: Metadata = {
  title: 'Countries Explored | Lifestyle Engineering',
  description:
    'Explore travel stories, food guides, and practical tips organized by country. 20 nations across the Middle East, Africa, Asia, and Central America.',
}

export default function CountriesPage() {
  const countries = getAllCountries()

  return (
    <main className="min-h-screen app-surface pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-accent)] uppercase block mb-4">
            [ Browse by Destination ]
          </span>
          <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial-display font-light text-[var(--ui-text-primary)]">
            Countries
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-[var(--ui-text-muted)] leading-relaxed">
            20 countries. Countless stories. Select a destination to explore all
            content in one place.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[var(--ui-border-subtle)]">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="group relative bg-[var(--ui-bg-strong)] p-4 sm:p-6 hover:bg-[var(--ui-accent-soft)] transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Flag */}
                <div className="relative h-10 w-14 overflow-hidden rounded-md border border-[var(--ui-border-subtle)] shrink-0 shadow-sm">
                  <Image
                    src={`/assets/images/flags/${country.flag}`}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg font-light text-[var(--ui-text-primary)] group-hover:text-[var(--ui-accent)] transition-colors mb-1">
                    {country.name}
                  </h2>
                  <span className="text-xs font-mono tracking-wider text-[var(--ui-text-subtle)] uppercase">
                    {country.region}
                  </span>
                </div>
              </div>

              {/* Description preview */}
              <p className="mt-3 sm:mt-4 text-sm text-[var(--ui-text-subtle)] line-clamp-3 sm:line-clamp-2 group-hover:text-[var(--ui-text-muted)] transition-colors">
                {country.description}
              </p>

              {/* Arrow indicator */}
              <div className="absolute top-5 right-5 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-4 h-4 text-[var(--ui-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
