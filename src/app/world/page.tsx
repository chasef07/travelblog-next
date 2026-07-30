import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPinned, Radio } from 'lucide-react'

import GlobeExperience from '@/components/globe/GlobeExperience'
import { Badge } from '@/components/ui/badge'
import { getAllCountries } from '@/content/countries-data'
import { posts } from '@/content/blog/publication'

export const metadata = {
  title: 'World View | Chase Fagen',
  description:
    'Explore Chase Fagen’s travel journal by country and route around the world.',
}

export default function WorldPage() {
  const countries = getAllCountries()
  const regions = new Set(countries.map((country) => country.region)).size

  return (
    <main className="min-h-screen">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge variant="outline" className="mb-5">
                <Radio />
                World map
              </Badge>
              <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
                World view
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Rotate the journey, choose a flag, and drop directly into the
                stories collected there.
              </p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border bg-card/55">
              {[
                [countries.length, 'Countries'],
                [regions, 'Regions'],
                [posts.length, 'Entries'],
              ].map(([value, label]) => (
                <div key={label} className="px-5 py-4 text-center">
                  <span className="block font-mono text-lg tabular-nums text-foreground">
                    {value}
                  </span>
                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <GlobeExperience />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
              Destination index
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Choose a country
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            <MapPinned className="size-3.5" />
            {countries.length} countries
          </div>
        </header>

        <div className="grid overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="group relative m-px flex min-h-36 gap-4 bg-card p-5 outline-none transition-colors hover:bg-accent focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
            >
              <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                <Image
                  src={`/assets/images/flags/${country.flag}`}
                  alt={`${country.name} flag`}
                  fill
                  className="object-contain p-1"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground">
                  {country.region}
                </span>
                <h3 className="mt-1 text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                  {country.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {country.description}
                </p>
              </div>
              <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
