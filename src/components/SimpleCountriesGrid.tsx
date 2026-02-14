'use client'

import Image from "next/image"
import Link from "next/link"
import { getAllCountries } from "@/content/countries-data"

export default function SimpleCountriesGrid() {
  const countries = getAllCountries()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
      {countries.map((country, index) => (
        <Link
          key={country.name}
          href={`/countries/${country.slug}`}
          className="group relative flex min-h-[116px] flex-col items-center justify-center gap-3 border-r border-b border-[var(--ui-border-subtle)] px-3 py-4 transition-colors duration-300 hover:bg-[var(--ui-accent-soft)]"
        >
          {/* Flag */}
          <div className="relative h-10 w-14 overflow-hidden rounded-md border border-[var(--ui-border-subtle)] shadow-sm">
            <Image
              src={`/assets/images/flags/${country.flag}`}
              alt={`${country.name} flag`}
              fill
              className="object-cover"
              sizes="56px"
              priority={index < 8}
            />
          </div>

          {/* Country name */}
          <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[var(--ui-text-muted)] group-hover:text-[var(--ui-accent)] transition-colors duration-300 text-center leading-tight">
            {country.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
