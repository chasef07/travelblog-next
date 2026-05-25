import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { journeyStats } from '@/utils/comprehensive-map-data'

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string }

function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function XIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { name: 'Writing', href: '/blog' },
    { name: 'Journey', href: '/journey' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Guides', href: '/guides' },
    { name: 'Maps', href: '/maps' },
    { name: 'Packing', href: '/packing-checklist' },
    { name: 'Countries', href: '/countries' },
    { name: 'Vlogs', href: '/vlogs' },
    { name: 'Food', href: '/food' },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/chasef07/',
      icon: InstagramIcon,
    },
    {
      name: 'X',
      href: 'https://x.com/chasef07',
      icon: XIcon,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/chasef07',
      icon: GithubIcon,
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
              {journeyStats.totalCountries} Countries · Around the World
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
}
