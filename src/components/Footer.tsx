'use client'

import Link from 'next/link'
import { memo } from 'react'
import { Instagram, Twitter, Facebook } from 'lucide-react'
import { Button } from './ui/button'

const Footer = memo(function Footer(){
  const currentYear = new Date().getFullYear()
  
  const navigationLinks = [
    { name: "Journey", href: "/#journey" },
    { name: "Stories", href: "/blog" },
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
      color: "hover:text-pink-400"
    },
    {
      name: "Twitter",
      href: "https://x.com/chasef07",
      icon: Twitter,
      color: "hover:text-blue-400"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/chase.fagen",
      icon: Facebook,
      color: "hover:text-blue-500"
    }
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 py-8">
        {/* Mobile-First Footer Content */}
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <div className="flex items-center justify-center gap-3">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Lone Horizons
            </span>
          </div>
            
          {/* Navigation Links - Mobile Optimized */}
          <nav className="flex flex-wrap items-center justify-center gap-1">
            {navigationLinks.map((link) => (
              <Button 
                key={link.name}
                variant="ghost" 
                size="sm" 
                asChild
                className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
              >
                <Link href={link.href}>
                  {link.name}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Social Links and Copyright - Stacked on Mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`p-2 transition-colors ${social.color}`}
                >
                  <Link 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
            
            <div className="text-muted-foreground text-sm">
              © {currentYear} Lone Horizons
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer