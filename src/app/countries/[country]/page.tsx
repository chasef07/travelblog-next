import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCountries, getCountryBySlug } from '@/content/countries-data';
import { foodData } from '@/content/food-data';

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  const countries = getAllCountries();
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const countryInfo = getCountryBySlug(slug);

  if (!countryInfo) {
    return { title: 'Country Not Found' };
  }

  return {
    title: `${countryInfo.name} Travel Guide | Living Gambit`,
    description: countryInfo.description,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const countryInfo = getCountryBySlug(slug);

  if (!countryInfo) {
    notFound();
  }

  // Get food data for this country
  const countryFood = foodData[countryInfo.name] || [];

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(160deg, #1a1714 0%, #2a2520 100%)' }}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 border-b border-[#d4c0a8]/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/countries" className="text-[#d4c0a8]/50 hover:text-[#c4704b] text-sm font-mono tracking-wider uppercase transition-colors">
              Countries
            </Link>
            <span className="text-[#d4c0a8]/20 mx-2">/</span>
            <span className="text-[#d4c0a8]/70 text-sm font-mono tracking-wider uppercase">
              {countryInfo.name}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Flag and basic info */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-14 overflow-hidden rounded shadow-lg">
                <Image
                  src={`/assets/images/flags/${countryInfo.flag}`}
                  alt={`${countryInfo.name} flag`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <span className="text-xs font-mono tracking-wider text-[#c4704b] uppercase block mb-2">
                  {countryInfo.region}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-editorial-display font-light text-[#faf6f1]">
                  {countryInfo.name}
                </h1>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-8 text-xl text-[#d4c0a8]/70 max-w-3xl leading-relaxed">
            {countryInfo.description}
          </p>

          {/* Highlights */}
          {countryInfo.highlights && countryInfo.highlights.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {countryInfo.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3 py-1 text-xs font-mono tracking-wider text-[#d4c0a8]/60 border border-[#d4c0a8]/20 rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Dates */}
          {countryInfo.dates && (
            <div className="mt-6 text-sm text-[#d4c0a8]/40 font-mono">
              Visited: {new Date(countryInfo.dates.firstVisit).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              {countryInfo.dates.lastVisit && ` - ${new Date(countryInfo.dates.lastVisit).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
            </div>
          )}
        </div>
      </section>

      {/* Content Navigation */}
      <section className="border-b border-[#d4c0a8]/10 sticky top-16 bg-[#1a1714]/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 py-4">
            <a href="#stories" className="text-sm font-mono tracking-wider text-[#d4c0a8]/60 hover:text-[#c4704b] transition-colors uppercase">
              Stories
            </a>
            {countryFood.length > 0 && (
              <a href="#food" className="text-sm font-mono tracking-wider text-[#d4c0a8]/60 hover:text-[#c4704b] transition-colors uppercase">
                Food ({countryFood.length})
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-light text-[#faf6f1] mb-8">Stories from {countryInfo.name}</h2>
          <p className="text-[#d4c0a8]/50 mb-8">
            Blog posts for this country are being organized. Check back soon or browse all stories on the{' '}
            <Link href="/blog" className="text-[#c4704b] hover:underline">blog page</Link>.
          </p>
        </div>
      </section>

      {/* Food Section */}
      {countryFood.length > 0 && (
        <section id="food" className="py-16 border-t border-[#d4c0a8]/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-light text-[#faf6f1] mb-8">Food in {countryInfo.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryFood.map((item, index) => (
                <div key={index} className="bg-[#faf6f1]/5 rounded-lg overflow-hidden group border border-[#d4c0a8]/10">
                  {item.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-light text-[#faf6f1] mb-2">{item.name}</h3>
                    <p className="text-sm text-[#d4c0a8]/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Countries */}
      <section className="py-16 border-t border-[#d4c0a8]/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 text-[#d4c0a8]/50 hover:text-[#c4704b] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-mono tracking-wider uppercase">Back to all countries</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
