import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays } from 'lucide-react'

import { MonthOverview } from '@/components/travel-os/MonthOverview'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  archiveStaticParams,
  getArchive,
  getPostsForArchive,
} from '@/content/blog/publication'
import { generatePageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ year: string; month: string }>
}

export function generateStaticParams() {
  return archiveStaticParams()
}

export async function generateMetadata({ params }: Props) {
  const { year, month } = await params
  const archive = getArchive(year, month)

  if (!archive) return { title: 'Journal month not found | Chase Fagen' }

  return generatePageMetadata({
    title: `${archive.displayDate} Travel Journal`,
    description: archive.excerpt,
    path: archive.url,
    type: 'article',
  })
}

export default async function ArchivePage({ params }: Props) {
  const { year, month } = await params
  const archive = getArchive(year, month)
  if (!archive) notFound()

  const posts = getPostsForArchive(year, month)
  if (posts.length > 0) {
    return <MonthOverview archive={archive} posts={posts} />
  }

  return (
    <main className="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-5 py-16 sm:px-8">
      <Badge variant="outline" className="mb-6 w-fit">
        <CalendarDays />
        {archive.displayDate}
      </Badge>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        No entries yet
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        This month is on the timeline, but its first post has not been
        published.
      </p>
      <Button asChild variant="outline" className="mt-8 w-fit">
        <Link href="/">
          <ArrowLeft data-icon="inline-start" />
          Return to Today
        </Link>
      </Button>
    </main>
  )
}
