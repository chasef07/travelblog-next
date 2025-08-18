'use client'

import { motion } from 'framer-motion'
import { Check, Download, MapPin, Star, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function PricingSection() {
  const [isLoading, setIsLoading] = useState(false)

  const features = [
    "50+ Curated locations in Laos",
    "Detailed descriptions for each spot",
    "Insider tips and personal experiences",
    "GPS coordinates for easy navigation",
    "Import directly to Google Maps",
    "Lifetime access to updates",
    "Mobile-friendly format",
    "Money-back guarantee"
  ]

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1RxGudPJ7ly0x6wgPusQ2vQ8',
          productId: 'prod_St301Mcihj8uiA'
        }),
      })

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="pricing" className="py-16 px-6 bg-muted/10">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Simple Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Laos Travel Map
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Skip months of research and start exploring like a local. 
            One-time purchase, lifetime access.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden shadow-xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-primary/20">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 text-xs font-medium">
              LAUNCHING SOON
            </div>

            <CardHeader className="text-center p-8 pb-4">
              <div className="mb-4">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Laos Travel Map</h3>
                <p className="text-muted-foreground mt-2">
                  Curated recommendations from my solo journey
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold">$19.97</span>
                  <div className="text-left text-sm text-muted-foreground">
                    <div className="line-through">$49.97</div>
                    <div>Launch Price</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  One-time payment • Instant download
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-8 pt-0">
              {/* Features List */}
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="w-full gap-2 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handlePurchase}
                disabled={isLoading}
              >
                <Download className="h-5 w-5" />
                {isLoading ? 'Creating Checkout...' : 'Get Instant Access'}
              </Button>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                  <div className="flex flex-col items-center gap-1">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span>Instant Download</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>30-Day Guarantee</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Download className="h-4 w-4 text-blue-500" />
                    <span>Lifetime Access</span>
                  </div>
                </div>
              </div>

              {/* Value Comparison */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-center text-muted-foreground">
                  💡 This saves you 100+ hours of research and tourist trap mistakes. 
                  That&apos;s less than $0.40 per recommendation!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-bold mb-4">More Countries Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            I&apos;m working on curated maps for Vietnam, Nepal, Thailand, and more. 
            Get the Laos map now and be first to know about new releases.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Vietnam', 'Nepal', 'Thailand', 'Cambodia', 'Indonesia'].map((country) => (
              <Badge key={country} variant="outline" className="opacity-60">
                {country} - Coming Soon
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}