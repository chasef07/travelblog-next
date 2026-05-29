'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/vlogs', label: 'Vlogs' },
  { href: '/guides', label: 'Guides' },
  { href: '/packing-checklist', label: 'Packing' },
]

export default function Header() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      requestAnimationFrame(() => {
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileNavOpen])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:border focus:border-[var(--ui-border-strong)] focus:bg-[var(--ui-bg-strong)] focus:px-4 focus:py-2 focus:text-sm focus:font-mono focus:tracking-wider focus:text-[var(--ui-text-primary)] focus:uppercase"
      >
        Skip to content
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--ui-border-subtle)] bg-[var(--ui-header-bg)] backdrop-blur-md transition-all duration-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Lifestyle Engineering home"
          >
            <svg
              className="shrink-0 text-[var(--ui-text-primary)]"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--ui-text-primary)]">
                Lifestyle Engineering
              </span>
              <span className="hidden text-[11px] text-[var(--ui-text-subtle)] md:block">
                Writing, work, journey
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-mono tracking-[0.22em] font-medium uppercase text-[var(--ui-text-secondary)] transition-colors duration-100 hover:text-[var(--ui-accent)]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/guides"
              className="hidden items-center gap-2 rounded-full border border-[var(--ui-border-strong)] px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--ui-text-primary)] transition-colors hover:border-[var(--ui-accent)] hover:text-[var(--ui-accent)] md:inline-flex"
            >
              Guides
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-soft)] text-[var(--ui-text-primary)] shadow-sm md:hidden"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav"
            >
              {isMobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-[60] bg-[var(--ui-body-bg)] md:hidden">
          <div
            id="mobile-nav"
            className="flex min-h-full w-full flex-col items-center justify-center gap-8 px-6 py-8"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="absolute top-4 right-5">
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[var(--ui-border-subtle)] text-[var(--ui-text-primary)]"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 w-full">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xl font-mono tracking-[0.22em] font-medium uppercase text-[var(--ui-text-secondary)] transition-colors duration-100 hover:text-[var(--ui-accent)]"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}
