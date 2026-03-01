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
    title: `${countryInfo.name} Travel Guide | Lifestyle Engineering`,
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
    <main className="min-h-screen app-surface">
      {/* Hero Section */}
      <section className="relative border-b border-[var(--ui-border-subtle)] pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <Link href="/countries" className="text-[var(--ui-text-subtle)] hover:text-[var(--ui-accent)] text-sm font-mono tracking-wider uppercase transition-colors">
              Countries
            </Link>
            <span className="text-[var(--ui-text-subtle)] mx-2">/</span>
            <span className="text-[var(--ui-text-muted)] text-sm font-mono tracking-wider uppercase">
              {countryInfo.name}
            </span>
          </nav>

          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
            {/* Flag and basic info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative h-11 w-16 overflow-hidden rounded-md border border-[var(--ui-border-subtle)] shadow-lg sm:h-14 sm:w-20">
                <Image
                  src={`/assets/images/flags/${countryInfo.flag}`}
                  alt={`${countryInfo.name} flag`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>
              <div>
                <span className="text-xs font-mono tracking-wider text-[var(--ui-accent)] uppercase block mb-2">
                  {countryInfo.region}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-editorial-display font-light text-[var(--ui-text-primary)]">
                  {countryInfo.name}
                </h1>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-xl text-[var(--ui-text-muted)] leading-relaxed">
            {countryInfo.description}
          </p>

          {/* Highlights */}
          {countryInfo.highlights && countryInfo.highlights.length > 0 && (
            <div className="mt-7 sm:mt-8 flex flex-wrap gap-2">
              {countryInfo.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-[var(--ui-border-subtle)] px-3 py-1 text-[11px] sm:text-xs font-mono tracking-wider text-[var(--ui-text-muted)]"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Dates */}
          {countryInfo.dates && (
            <div className="mt-5 sm:mt-6 text-xs sm:text-sm text-[var(--ui-text-subtle)] font-mono">
              Visited: {new Date(countryInfo.dates.firstVisit).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              {countryInfo.dates.lastVisit && ` - ${new Date(countryInfo.dates.lastVisit).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
            </div>
          )}
        </div>
      </section>

      {/* Content Navigation */}
      <section className="sticky top-14 z-40 border-b border-[var(--ui-border-subtle)] bg-[var(--ui-header-bg)] backdrop-blur-sm sm:top-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="no-scrollbar flex gap-6 overflow-x-auto py-3.5 sm:gap-8 sm:py-4">
            <a href="#stories" className="shrink-0 text-xs sm:text-sm font-mono tracking-wider text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-colors uppercase">
              Stories
            </a>
            {countryFood.length > 0 && (
              <a href="#food" className="shrink-0 text-xs sm:text-sm font-mono tracking-wider text-[var(--ui-text-muted)] hover:text-[var(--ui-accent)] transition-colors uppercase">
                Food ({countryFood.length})
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section id="stories" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-light text-[var(--ui-text-primary)] mb-8">Stories from {countryInfo.name}</h2>
          <p className="text-[var(--ui-text-muted)] mb-8">
            Blog posts for this country are being organized. Check back soon or browse all stories on the{' '}
            <Link href="/blog" className="text-[var(--ui-accent)] hover:underline">blog page</Link>.
          </p>
        </div>
      </section>

      {/* Food Section */}
      {countryFood.length > 0 && (
        <section id="food" className="border-t border-[var(--ui-border-subtle)] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-light text-[var(--ui-text-primary)] mb-8">Food in {countryInfo.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryFood.map((item, index) => (
                <div key={index} className="bg-[var(--ui-bg-soft)] rounded-lg overflow-hidden group border border-[var(--ui-border-subtle)]">
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
                    <h3 className="text-lg font-light text-[var(--ui-text-primary)] mb-2">{item.name}</h3>
                    <p className="text-sm text-[var(--ui-text-muted)]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Countries */}
      <section className="border-t border-[var(--ui-border-subtle)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 text-[var(--ui-text-subtle)] hover:text-[var(--ui-accent)] transition-colors"
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
