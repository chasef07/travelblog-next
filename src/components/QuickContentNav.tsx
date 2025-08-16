'use client'

import { motion } from 'framer-motion'
import { Utensils, Backpack, ArrowRight, Video, Plane } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Link from 'next/link'

interface ContentSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  count: number
  recent: string[]
  href: string
  color: string
}

const contentSections: ContentSection[] = [
  {
    id: 'vlogs',
    title: 'Video Stories',
    description: 'Visual adventures and behind-the-scenes travel moments',
    icon: Video,
    count: 24,
    recent: ['Mountain Trek in Nepal', 'Street Markets of Thailand', 'Sunrise over Bagan'],
    href: '/vlogs',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
  },
  {
    id: 'food',
    title: 'Food Adventures',
    description: 'Local cuisine, street food, and culinary experiences',
    icon: Utensils,
    count: 32,
    recent: ['Ramen Mastery in Japan', 'Night Market Adventures', 'Authentic Thai Flavors'],
    href: '/food',
    color: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Getting around guides and travel tips',
    icon: Plane,
    count: 16,
    recent: ['Mastering the Shinkansen', 'Motorbike Adventures', 'Island Ferry Hopping'],
    href: '/transportation',
    color: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
  },
  {
    id: 'packing',
    title: 'Packing Guides',
    description: 'Minimalist travel gear and packing strategies',
    icon: Backpack,
    count: 12,
    recent: ['One Bag Asia Packing', 'Essential Travel Gear', 'Climate-Based Packing'],
    href: '/packing-checklist',
    color: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white'
  }
]

export default function QuickContentNav() {
  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-muted/40 to-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Discover More
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore different aspects of this incredible journey - from daily adventures to practical travel wisdom
          </p>
        </div>

        {/* 4-Column Grid for Content Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-card/70 backdrop-blur-sm">
                {/* Enhanced Header with Gradient */}
                <div className={`h-1 ${section.color}`} />
                
                <CardContent className="p-4 md:p-6 space-y-4">
                  {/* Icon and Count Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-2.5 md:p-3 rounded-xl ${section.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
                      {section.count}
                    </Badge>
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Recent Items with Better Mobile Layout */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent:</h4>
                    <div className="space-y-1">
                      {section.recent.slice(0, 2).map((item, i) => (
                        <div key={i} className="text-xs md:text-sm text-foreground/80 truncate">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mt-4"
                    asChild
                  >
                    <a href={section.href} className="flex items-center justify-center gap-2">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
            <h3 className="text-xl font-bold mb-3">
              Explore More Adventures
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Dive deeper into the stories, experiences, and practical insights from this incredible year-long journey around the world.
            </p>
            <Button size="lg" className="gap-2 shadow-lg" asChild>
              <Link href="/blog">
                Read All Stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}