import Image from 'next/image'
import { Play } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { vlogsData } from '@/content/vlogs-data'

export default function VlogsPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          <Play />
          {vlogsData.length} videos
        </Badge>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Vlogs
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Travel stories that work better in motion.
          </p>
        </div>
      </header>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vlogsData.map((vlog) => (
          <a
            key={vlog.id}
            href={`https://www.youtube.com/watch?v=${vlog.youtubeId}`}
            target="_blank"
            rel="noreferrer"
            className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Card className="h-full overflow-hidden py-0 transition-colors group-hover:bg-accent/40">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${vlog.youtubeId}/hqdefault.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="leading-snug">{vlog.title}</CardTitle>
                <CardDescription>{vlog.country}</CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {vlog.description}
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </main>
  )
}
