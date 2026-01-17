'use client'

import Image from "next/image"
import Link from "next/link"

// Helper to create URL-friendly slug
function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default function SimpleCountriesGrid() {

  const countries = [
    { name: 'Israel', flag: 'IS-flag.jpg', region: 'Middle East' },
    { name: 'Georgia', flag: 'GG-flag.jpg', region: 'Caucasus' },
    { name: 'Kenya', flag: 'KE-flag.jpg', region: 'East Africa' },
    { name: 'Tanzania', flag: 'TZ-flag.jpg', region: 'East Africa' },
    { name: 'Rwanda', flag: 'RW-flag.jpg', region: 'East Africa' },
    { name: 'UAE', flag: 'AE-flag.jpg', region: 'Middle East' },
    { name: 'Nepal', flag: 'NP-flag.jpg', region: 'South Asia' },
    { name: 'Thailand', flag: 'TH-flag.jpg', region: 'Southeast Asia' },
    { name: 'Laos', flag: 'LA-flag.jpg', region: 'Southeast Asia' },
    { name: 'Cambodia', flag: 'CB-flag.jpg', region: 'Southeast Asia' },
    { name: 'China', flag: 'CH-flag.jpg', region: 'East Asia' },
    { name: 'Vietnam', flag: 'VM-flag.jpg', region: 'Southeast Asia' },
    { name: 'Singapore', flag: 'SN-flag.jpg', region: 'Southeast Asia' },
    { name: 'Philippines', flag: 'RP-flag.jpg', region: 'Southeast Asia' },
    { name: 'Indonesia', flag: 'ID-flag.jpg', region: 'Southeast Asia' },
    { name: 'Japan', flag: 'JA-flag.jpg', region: 'East Asia' },
    { name: 'Costa Rica', flag: 'CR-flag.jpg', region: 'Central America' },
    { name: 'Panama', flag: 'PM-flag.jpg', region: 'Central America' },
    { name: 'Guatemala', flag: 'GT-flag.jpg', region: 'Central America' },
    { name: 'El Salvador', flag: 'SV-flag.jpg', region: 'Central America' },
  ] as const

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
      {countries.map((country, index) => (
        <Link
          key={country.name}
          href={`/countries/${slugify(country.name)}`}
          className={`group relative flex flex-col items-center py-8 px-4 border-l border-b border-[#d4c0a8]/10 hover:bg-[#c4704b]/5 transition-colors duration-300 cursor-pointer ${
            index === countries.length - 1 ? 'border-r border-r-[#d4c0a8]/10' : ''
          }`}
        >
          {/* Flag */}
          <div className="relative w-12 h-8 mb-4 overflow-hidden rounded-sm shadow-sm">
            <Image
              src={`/assets/images/flags/${country.flag}`}
              alt={`${country.name} flag`}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
              priority={index < 9}
            />
          </div>

          {/* Country name */}
          <span className="text-xs font-mono tracking-wider uppercase text-[#d4c0a8]/60 group-hover:text-[#c4704b] transition-colors duration-300 text-center">
            {country.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
