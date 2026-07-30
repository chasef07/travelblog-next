import { TodayView } from '@/components/travel-os/TodayView'
import { archives, posts } from '@/content/blog/publication'
import { buildJournalYears, findClosestEntriesByYear } from '@/lib/journal'

export const dynamic = 'force-dynamic'

export default function Page() {
  const today = new Date()
  const years = buildJournalYears(posts, archives)
  const latestMonth = years[0].months[0]
  const latestPost = latestMonth.posts[0]
  const echoes = findClosestEntriesByYear(today, posts).filter(
    (echo) => echo.post.id !== latestPost.id,
  )

  return (
    <TodayView
      today={today}
      echoes={echoes}
      latestMonth={latestMonth}
      latestPost={latestPost}
    />
  )
}
