'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, Users, MapPin, Star, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ValueProposition() {
  const benefits = [
    {
      icon: Clock,
      title: "Save 100+ Hours of Research",
      description: "I&apos;ve done the legwork so you don&apos;t have to. Skip the endless Google searches and tourist trap reviews.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Discover Like a Local",
      description: "Access spots that only locals know about. Experience authentic Laos beyond the guidebooks.",
      color: "text-green-500"
    },
    {
      icon: Star,
      title: "Tested & Verified",
      description: "Every recommendation has been personally visited and tested during my solo journey through Laos.",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "Ready to Use",
      description: "Import directly to Google Maps and start exploring immediately. No setup or complicated instructions.",
      color: "text-purple-500"
    }
  ]

  const problemSolutions = [
    {
      problem: "Tourist traps everywhere",
      solution: "Authentic local experiences"
    },
    {
      problem: "Outdated guidebook info",
      solution: "Recently tested recommendations"
    },
    {
      problem: "Generic travel advice",
      solution: "Personalized insider tips"
    },
    {
      problem: "Hours of research needed",
      solution: "Ready-to-use curated map"
    }
  ]

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Value Prop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Why Choose Curated Maps?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Travel Smarter, Not Harder
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Stop wasting time on tourist traps and generic recommendations. 
            Get insider access to the hidden gems I discovered during 10 months of solo travel.
          </p>
        </motion.div>

        {/* Problem vs Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-8 bg-gradient-to-r from-red-50/50 to-green-50/50 border-border/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">
                  😤 The Problem with Travel Today
                </h3>
                <div className="space-y-3">
                  {problemSolutions.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-muted-foreground">{item.problem}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">
                  ✨ What You Get Instead
                </h3>
                <div className="space-y-3">
                  {problemSolutions.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">{item.solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-0 text-center">
                  <div className="mb-4">
                    <benefit.icon className={`h-12 w-12 mx-auto ${benefit.color}`} />
                  </div>
                  <h3 className="font-bold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Personal Touch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="max-w-2xl mx-auto">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Curated by Someone Who's Actually Been There
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This isn&apos;t just another generic travel guide. Every recommendation comes from my personal experience 
                exploring Laos for weeks as a solo traveler. I&apos;ve eaten at these restaurants, stayed at these guesthouses, 
                and discovered these hidden spots through real exploration - not internet research.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}