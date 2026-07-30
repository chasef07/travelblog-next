import { notFound } from 'next/navigation'

import { CountryDossier } from '@/components/travel-os/CountryDossier'
import { getAllCountries, getCountryBySlug } from '@/content/countries-data'
import { generatePageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ country: string }>
}

export function generateStaticParams() {
  return getAllCountries().map((country) => ({ country: country.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)

  if (!country) return { title: 'Country not found' }

  return generatePageMetadata({
    title: `${country.name} Travel Journal`,
    description: country.description,
    path: `/countries/${country.slug}`,
    keywords: [country.name, `${country.name} travel journal`],
  })
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  return (
    <main className="min-h-full">
      <CountryDossier country={country} />
    </main>
  )
}
