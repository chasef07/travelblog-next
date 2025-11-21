'use client'

import Link from 'next/link'
import { memo } from 'react'
import { Instagram, Twitter, ArrowUpRight } from 'lucide-react'

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
      icon: Twitter,
    }
  ]

  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          {/* Brand */}
          <div>
            <span className="font-mono text-sm tracking-[0.2em] text-white/40 uppercase block mb-4">
              [ Living Gambit ]
            </span>
            <p className="text-white/50 text-lg leading-relaxed max-w-sm">
              Reengineering life from the ground up.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
              Explore
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group inline-flex items-center gap-1 text-white/60 hover:text-white text-sm font-light tracking-wide transition-colors duration-200"
                >
                  {link.name}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase mb-2">
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
                  className="group flex items-center justify-center w-10 h-10 border border-white/20 rounded-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                >
                  <social.icon className="h-4 w-4 text-white/60 group-hover:text-white transition-colors duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/30 text-xs font-mono tracking-wider">
            © {currentYear} LIVING GAMBIT
          </div>
          <div className="text-white/30 text-xs font-light tracking-wide">
            18 Countries · Around the World
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer
