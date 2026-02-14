import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found | The Value Engine',
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: false }
}

export default function NotFound() {
  return (
    <main className="min-h-screen app-surface pt-24">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="font-mono text-sm tracking-[0.2em] text-[var(--ui-text-subtle)] uppercase block mb-8">
          [ Error 404 ]
        </span>

        <h1 className="text-8xl md:text-9xl font-extralight text-[var(--ui-text-primary)] mb-6">
          404
        </h1>

        <p className="text-xl text-[var(--ui-text-muted)] font-light mb-12 max-w-md mx-auto">
          This page has wandered off the map. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-[var(--ui-text-primary)] font-medium border border-[var(--ui-border-strong)] rounded-full px-8 py-4 hover:bg-[var(--ui-accent)] hover:text-[var(--ui-on-accent)] transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase text-sm tracking-wider">Back to Home</span>
        </Link>
      </div>
    </main>
  )
}
