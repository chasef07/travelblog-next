import Image from 'next/image'
import { ExternalLink, Play } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
          <Card key={vlog.id} className="overflow-hidden py-0">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${vlog.youtubeId}/maxresdefault.jpg`}
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
            <CardContent>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {vlog.description}
              </p>
            </CardContent>
            <CardFooter className="pb-6">
              <Button asChild variant="outline" size="sm">
                <a
                  href={`https://www.youtube.com/watch?v=${vlog.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch
                  <ExternalLink data-icon="inline-end" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
