import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCountries } from '@/content/countries-data';

export const metadata: Metadata = {
  title: 'Countries Explored | Living Gambit',
  description: 'Explore travel stories, food guides, and practical tips organized by country. 20 nations across the Middle East, Africa, Asia, and Central America.',
};

export default function CountriesPage() {
  const countries = getAllCountries();

  return (
    <main className="min-h-screen pt-24" style={{ background: 'linear-gradient(160deg, #1a1714 0%, #2a2520 100%)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16">
          <span className="font-mono text-sm tracking-[0.2em] text-[#c4704b] uppercase block mb-4">
            [ Browse by Destination ]
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-editorial-display font-light text-[#faf6f1] mb-6">
            Countries
          </h1>
          <p className="text-[#d4c0a8]/60 text-lg leading-relaxed max-w-2xl">
            20 countries. Countless stories. Select a destination to explore all content in one place.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#d4c0a8]/10">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="group relative bg-[#1a1714] p-6 hover:bg-[#c4704b]/5 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Flag */}
                <div className="relative w-12 h-8 overflow-hidden rounded-sm shrink-0 shadow-sm">
                  <Image
                    src={`/assets/images/flags/${country.flag}`}
                    alt={`${country.name} flag`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-light text-[#faf6f1] group-hover:text-[#c4704b] transition-colors mb-1">
                    {country.name}
                  </h2>
                  <span className="text-xs font-mono tracking-wider text-[#d4c0a8]/50 uppercase">
                    {country.region}
                  </span>
                </div>
              </div>

              {/* Description preview */}
              <p className="mt-4 text-sm text-[#d4c0a8]/40 line-clamp-2 group-hover:text-[#d4c0a8]/70 transition-colors">
                {country.description}
              </p>

              {/* Arrow indicator */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-[#c4704b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
