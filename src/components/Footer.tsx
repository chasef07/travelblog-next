'use client'

import Link from 'next/link'
import { memo } from 'react'
import { Instagram, Github, ArrowUpRight, LucideProps } from 'lucide-react'

function XIcon(props: LucideProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  )
}

const Footer = memo(function Footer(){
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { name: "Journey", href: "/#journey" },
    { name: "Blog", href: "/blog" },
    { name: "Vlogs", href: "/vlogs" },
    { name: "Food", href: "/food" },
    { name: "Transport", href: "/transportation" },
    { name: "Packing", href: "/packing-checklist" }
  ]

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/chasef07/",
      icon: Instagram,
    },
    {
      name: "X",
      href: "https://x.com/chasef07",
      icon: XIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/chasef07",
      icon: Github,
    },
  ]

  return (
    <footer className="relative overflow-hidden app-surface border-t border-[var(--ui-border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="font-editorial text-2xl tracking-tight text-[var(--ui-text-primary)] block mb-3">
              Lifestyle Engineering
            </span>
            <p className="text-[var(--ui-text-secondary)] text-base leading-relaxed max-w-sm font-body italic">
              Lifestyle engineering for real value.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[var(--ui-accent)] uppercase mb-2">
              Explore
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group inline-flex items-center gap-1 text-[var(--ui-text-secondary)] hover:text-[var(--ui-accent)] text-sm font-mono tracking-[0.18em] uppercase transition-colors duration-100"
                >
                  {link.name}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[var(--ui-accent)] uppercase mb-2">
              Connect
            </span>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex items-center justify-center w-10 h-10 border border-[var(--ui-border-subtle)] rounded-sm hover:border-[var(--ui-accent)] hover:bg-[var(--ui-accent-soft)] transition-all duration-100"
                >
                  <social.icon className="h-4 w-4 text-[var(--ui-text-secondary)] group-hover:text-[var(--ui-accent)] transition-colors duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[var(--ui-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[var(--ui-text-muted)] text-xs font-mono tracking-wider">
            © {currentYear} LIFESTYLE ENGINEERING
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-[var(--ui-accent)] text-xs font-mono tracking-wide">
              20 Countries · Around the World
            </div>
            <div className="text-[var(--ui-text-muted)] text-xs font-body tracking-wide">
              Site automation by{' '}
              <a
                href="https://databuddiessolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--ui-accent)] transition-colors underline"
              >
                Data Buddies Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
