'use client'

import { motion } from 'framer-motion'
import { MapPin, Star, Download, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function MapSalesHero() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30 flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      {/* Background Map Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/assets/images/misc/laosfall-2.jpg"
          alt="Laos travel background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="gap-2 text-sm px-4 py-2">
              <MapPin className="h-4 w-4" />
              Curated by a Solo Traveler Who&apos;s Been There
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Skip Tourist Traps,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Discover
              </span>{' '}
              Hidden Gems
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Get insider access to my curated Google Maps recommendations from 10 months of solo travel. 
              Discover authentic local experiences that most travelers never find.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>100+ Hours of Research</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-green-500" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Money-Back Guarantee</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="gap-2 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={scrollToPricing}
            >
              <MapPin className="h-5 w-5" />
              Get Your Maps Now
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Starting with <strong>Laos</strong> • More countries coming soon
            </p>
          </div>

          {/* Social Proof Numbers */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-xs text-muted-foreground">Countries Explored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10</div>
              <div className="text-xs text-muted-foreground">Months on the Road</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-xs text-muted-foreground">Hidden Gems Found</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}