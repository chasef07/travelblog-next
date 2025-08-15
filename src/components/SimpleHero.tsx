'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

export default function SimpleHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToMap = () => {
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30 flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Current Status */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="gap-2 text-sm px-4 py-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                Currently in Clearwater, FL
              </Badge>
            </motion.div>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              Lone{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Horizons
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              Reengineering life from the ground up
            </motion.p>
          </div>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="gap-2 text-lg px-8 py-6"
              onClick={scrollToMap}
            >
              <MapPin className="h-5 w-5" />
              Explore My Journey
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}