'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'

export default function Header(){
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { href: "/#journey", label: "Journey" },
    { href: "/blog", label: "Stories" },
    { href: "/vlogs", label: "Vlogs" },
    { href: "/food", label: "Food" },
    { href: "/transportation", label: "Transport" },
    { href: "/packing-checklist", label: "Packing" }
  ]

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 h-[70px] z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-xl border-b border-border' 
            : 'bg-background/90 backdrop-blur-md shadow-md border-b border-border/50'
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-300">
              <svg className="shrink-0" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="text-xl md:text-2xl font-bold">Lone Horizons</span>
            </Link>
          </motion.div>
        
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <Link href={item.href} className="font-medium">
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="space-y-6 mt-8">
                  <div className="text-lg font-semibold">Navigation</div>
                  <nav className="space-y-2">
                    {navigationItems.map((item) => (
                      <Button 
                        key={item.href}
                        variant="ghost" 
                        className="w-full justify-start h-auto p-3"
                        asChild
                      >
                        <Link href={item.href}>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  )
}