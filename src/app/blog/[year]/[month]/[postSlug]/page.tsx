import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { PostPresentation } from '@/components/travel-os/PostArticle'
import { Button } from '@/components/ui/button'
import {
  getArchiveForPost,
  getPost,
  postStaticParams,
} from '@/content/blog/publication'
import { generatePostMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ year: string; month: string; postSlug: string }>
}

export function generateStaticParams() {
  return postStaticParams()
}

export async function generateMetadata({ params }: Props) {
  const { year, month, postSlug } = await params
  const post = getPost(year, month, postSlug)

  if (!post) return { title: 'Journal entry not found | Chase Fagen' }

  return generatePostMetadata(post)
}

export default async function PostPage({ params }: Props) {
  const { year, month, postSlug } = await params
  const post = getPost(year, month, postSlug)
  if (!post) notFound()

  const archive = getArchiveForPost(post)

  return (
    <main className="min-h-full">
      {archive && (
        <div className="mx-auto max-w-3xl px-6 pt-8 sm:px-10">
          <Button asChild variant="ghost" size="sm">
            <Link href={archive.url}>
              <ArrowLeft data-icon="inline-start" />
              {archive.displayDate}
            </Link>
          </Button>
        </div>
      )}
      <PostPresentation post={post} />
    </main>
  )
}
