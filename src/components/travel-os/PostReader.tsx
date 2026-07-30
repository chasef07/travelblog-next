'use client'

import { useRouter } from 'next/navigation'

import BlogPost from '@/components/BlogPost'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { PublishedPost } from '@/content/blog/publication'
import { parseBlogDate } from '@/content/blog/publication'
import { getCountryFlag } from '@/lib/journal'

function readableDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseBlogDate(date))
}

export function PostReader({
  monthHref,
  post,
}: {
  monthHref: string
  post: PublishedPost
}) {
  const router = useRouter()

  return (
    <Sheet
      open
      onOpenChange={(open) => {
        if (!open) router.push(monthHref)
      }}
    >
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:w-[72vw] sm:max-w-3xl"
      >
        <SheetHeader className="border-b px-6 py-5 pr-14 sm:px-10 sm:py-8 sm:pr-16">
          <Badge variant="secondary" className="mb-2">
            <span aria-hidden="true">{getCountryFlag(post.country)}</span>
            {post.country}
          </Badge>
          <SheetTitle>{post.title}</SheetTitle>
          <SheetDescription>
            {post.location} · {readableDate(post.date)} · {post.readingTime} min
            read
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <BlogPost post={post} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
