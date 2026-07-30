import Image from 'next/image'
import Link from 'next/link'
import { Radio } from 'lucide-react'

import GlobeExperience from '@/components/globe/GlobeExperience'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAllCountries } from '@/content/countries-data'

export const metadata = {
  title: 'World View | Chase Fagen',
  description:
    'Explore Chase Fagen’s travel journal by country and route around the world.',
}

export default function WorldPage() {
  const countries = getAllCountries()

  return (
    <main className="min-h-screen">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-10">
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
          </div>

          <GlobeExperience />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Countries
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {countries.map((country) => (
            <Button
              key={country.slug}
              asChild
              variant="outline"
              className="h-auto justify-start p-3"
            >
              <Link href={`/countries/${country.slug}`}>
                <span className="relative h-7 w-10 shrink-0 overflow-hidden rounded-sm bg-white">
                  <Image
                    src={`/assets/images/flags/${country.flag}`}
                    alt=""
                    fill
                    className="object-contain p-0.5"
                    sizes="40px"
                  />
                </span>
                <span>{country.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </section>
    </main>
  )
}
