import { notFound } from 'next/navigation'

import { CountryDossier } from '@/components/travel-os/CountryDossier'
import { JournalReader } from '@/components/travel-os/JournalReader'
import { getCountryBySlug } from '@/content/countries-data'

export default async function InterceptedCountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  return (
    <JournalReader>
      <CountryDossier country={country} />
    </JournalReader>
  )
}
