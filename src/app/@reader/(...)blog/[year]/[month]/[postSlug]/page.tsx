import { notFound } from 'next/navigation'

import { PostPresentation } from '@/components/travel-os/PostArticle'
import { JournalReader } from '@/components/travel-os/JournalReader'
import { getPost } from '@/content/blog/publication'
import { generatePostMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ year: string; month: string; postSlug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { year, month, postSlug } = await params
  const post = getPost(year, month, postSlug)

  if (!post) return { title: 'Journal entry not found | Chase Fagen' }

  return generatePostMetadata(post)
}

export default async function InterceptedPostPage({ params }: Props) {
  const { year, month, postSlug } = await params
  const post = getPost(year, month, postSlug)
  if (!post) notFound()

  return (
    <JournalReader>
      <PostPresentation post={post} />
    </JournalReader>
  )
}
