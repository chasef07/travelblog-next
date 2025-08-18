'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Solo Traveler",
      content: "Chase's recommendations helped me discover the most amazing hidden waterfall in Laos. I would never have found it on my own!",
      rating: 5,
      location: "From his blog comments"
    },
    {
      name: "Travel Blogger",
      role: "Digital Nomad",
      content: "The level of detail in his travel posts is incredible. You can tell he actually spent time in these places and knows them well.",
      rating: 5,
      location: "Fellow traveler"
    },
    {
      name: "Adventure Seeker",
      role: "Backpacker",
      content: "His authentic approach to travel really resonates. No touristy BS, just real experiences and honest recommendations.",
      rating: 5,
      location: "Instagram follower"
    }
  ]

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            What Travelers Say
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Fellow Adventurers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what other travelers are saying about the authentic experiences 
            and insider tips from my journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary/30 mb-3" />
                    <p className="text-muted-foreground leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-primary">10</div>
              <div className="text-xs text-muted-foreground">Months Traveling</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-xs text-muted-foreground">Countries Visited</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-xs text-muted-foreground">Blog Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-xs text-muted-foreground">Locations Tested</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}