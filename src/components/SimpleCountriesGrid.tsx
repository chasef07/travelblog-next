'use client'

import Image from "next/image"
import Link from "next/link"
import { getAllCountries } from "@/content/countries-data"

export default function SimpleCountriesGrid() {
  const countries = getAllCountries()

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
      {countries.map((country, index) => (
        <Link
          key={country.name}
          href={`/countries/${country.slug}`}
          className="group flex flex-col items-center justify-center gap-2 border-b border-r border-dashed border-[var(--ui-border-strong)] px-2 py-4 aspect-square sm:aspect-auto sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:px-4 sm:py-3 transition-colors duration-100 hover:bg-[var(--ui-accent-soft)]"
        >
          {/* Flag */}
          <div className="relative h-8 w-11 shrink-0 overflow-hidden">
            <Image
              src={`/assets/images/flags/${country.flag}`}
              alt={`${country.name} flag`}
              fill
              className="object-cover"
              sizes="44px"
              priority={index < 6}
            />
          </div>

          {/* Country name */}
          <span className="text-[11px] font-mono font-medium tracking-[0.24em] uppercase text-[var(--ui-text-muted)] group-hover:text-[var(--ui-text-primary)] transition-colors duration-100">
            {country.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
