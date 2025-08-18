'use client'

import { motion } from 'framer-motion'
import { Eye, Star, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function MapPreview() {
  const samplePins = [
    {
      title: "Secret Waterfall Cafe",
      description: "Hidden cafe behind Kuang Si Falls - locals only spot with amazing views",
      category: "Food & Drink",
      rating: "5.0"
    },
    {
      title: "Sunset Viewpoint",
      description: "Best sunset in Luang Prabang without the crowds. 15-min motorbike ride",
      category: "Nature",
      rating: "4.9"
    },
    {
      title: "Night Market Alternative", 
      description: "Where locals actually eat - authentic Lao street food at 1/3 the price",
      category: "Local Experience",
      rating: "4.8"
    }
  ]

  return (
    <section className="py-16 px-6 bg-muted/20">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Map Preview
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See What You&apos;re Getting
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A sneak peek at the curated recommendations you&apos;ll receive. 
            Each pin includes detailed descriptions and insider tips.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Blurred Map Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="overflow-hidden shadow-xl bg-card/80 backdrop-blur-sm border-border/20">
              <div className="relative">
                {/* Blurred Map Image */}
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/assets/images/misc/laosfall-2.jpg"
                    alt="Laos map preview - blurred"
                    fill
                    className="object-cover filter blur-sm"
                  />
                  
                  {/* Overlay with Pin Indicators */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent">
                    {/* Sample Pin Dots */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Unlock Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="text-center text-white">
                      <Lock className="h-12 w-12 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-semibold">Unlock Full Map</p>
                      <p className="text-sm opacity-80">50+ Curated Locations</p>
                    </div>
                  </div>
                </div>
                
                {/* Map Stats */}
                <div className="p-4 bg-background/95 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-xs text-muted-foreground">Locations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">8</div>
                      <div className="text-xs text-muted-foreground">Categories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-xs text-muted-foreground">Tested</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sample Pin Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Sample Recommendations</h3>
              <p className="text-muted-foreground">
                Here&apos;s a taste of the detailed insights you&apos;ll get with each location. 
                Every pin includes practical tips and personal experiences.
              </p>
            </div>

            <div className="space-y-4">
              {samplePins.map((pin, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{pin.title}</h4>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{pin.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{pin.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {pin.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">What you&apos;ll get:</p>
                  <p className="text-sm text-muted-foreground">
                    Detailed descriptions, insider tips, GPS coordinates, and personal experiences for every location
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}