import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page not found | Chase Fagen',
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="mb-3 text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mb-8 text-muted-foreground">
          This page has wandered off the map. Let&apos;s get you back on track.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft />
            Back to today
          </Link>
        </Button>
      </div>
    </main>
  )
}
