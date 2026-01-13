'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: "/countries", label: "Countries" },
  { href: "/blog", label: "Stories" },
  { href: "/recommendations", label: "Picks" },
  { href: "/food", label: "Food" },
  { href: "/transportation", label: "Transport" },
  { href: "/packing-checklist", label: "Packing" }
]

export default function Header(){
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "px-32 pt-2 md:px-48 lg:px-64" : "px-4 pt-6"
    )}>
      <div className={cn(
        "mx-auto flex max-w-screen-xl items-center justify-between rounded-full border border-[#d4c0a8]/15 bg-[#1a1714]/70 backdrop-blur-md shadow-sm transition-all duration-300",
        isScrolled ? "px-4 py-1.5" : "px-8 py-3"
      )}>
        <Link href="/" className="flex items-center gap-3" aria-label="Living Gambit home">
          <svg className="shrink-0 text-[#c4704b]" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-mono tracking-wider uppercase text-[#d4c0a8]/60 transition-colors hover:text-[#c4704b]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d4c0a8]/15 bg-[#faf6f1]/5 text-[#faf6f1] shadow-sm md:hidden"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={isMobileNavOpen}
          >
            {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileNavOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-[#1a1714]/98 backdrop-blur-md"
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className="mx-auto flex min-h-full w-full max-w-screen-sm flex-col items-center justify-center gap-8 px-6 py-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute top-6 right-6">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-10 w-10 rounded-full border border-[#d4c0a8]/15 bg-[#faf6f1]/5 text-[#faf6f1] shadow-sm"
                  )}
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
                    className="text-xl font-mono tracking-wider uppercase text-[#d4c0a8]/70 transition-colors hover:text-[#c4704b]"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}