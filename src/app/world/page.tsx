import Image from 'next/image'
import { Radio } from 'lucide-react'

import GlobeExperience from '@/components/globe/GlobeExperience'
import { DetailLink } from '@/components/travel-os/DetailLink'
import { Badge } from '@/components/ui/badge'
import { getAllCountries } from '@/content/countries-data'

export const metadata = {
  title: 'World View | Chase Fagen',
  description:
    'Explore Chase Fagen’s travel journal by country and route around the world.',
}

export default function WorldPage() {
  const countries = getAllCountries()

  return (
    <main className="mx-auto flex min-h-screen max-w-[90rem] flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-8 xl:px-12">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="outline" className="mb-3">
            <Radio />
            World map
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            World view
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-right">
          Rotate the journey, choose a flag, and drop directly into the stories
          collected there.
        </p>
      </header>

      <section
        aria-label="Journey atlas"
        className="mt-7 grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(22rem,0.7fr)] lg:items-start"
      >
        <GlobeExperience />

        <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold tracking-widest uppercase">
              Flag index
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              {countries.length} countries
            </span>
          </div>

          <nav
            aria-label="Countries"
            className="grid grid-cols-3 gap-x-2 gap-y-2 min-[480px]:grid-cols-4 sm:grid-cols-5 lg:grid-cols-5"
          >
            {countries.map((country) => (
              <DetailLink
                key={country.slug}
                detailId={`country-${country.slug}`}
                href={`/countries/${country.slug}`}
                className="group flex min-w-0 flex-col items-center gap-1 rounded-md px-1 py-1 text-center outline-none transition-colors hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="relative h-6 w-10 shrink-0 overflow-hidden rounded-sm bg-white ring-1 ring-border transition-transform group-hover:-translate-y-0.5">
                  <Image
                    src={`/assets/images/flags/${country.flag}`}
                    alt=""
                    fill
                    className="object-contain p-0.5"
                    sizes="44px"
                  />
                </span>
                <span className="line-clamp-2 min-h-6 text-[9px] leading-3 font-semibold tracking-wider text-muted-foreground uppercase group-hover:text-foreground">
                  {country.name}
                </span>
              </DetailLink>
            ))}
          </nav>
        </div>
      </section>
    </main>
  )
}
