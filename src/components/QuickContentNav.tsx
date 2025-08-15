'use client'

import { motion } from 'framer-motion'
import { Camera, Utensils, Backpack, MapPin, ArrowRight, Video } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

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
    id: 'blog',
    title: 'Travel Stories',
    description: 'Adventures, insights, and cultural discoveries',
    icon: Camera,
    count: 48,
    recent: ['Lost in Translation: Tokyo', 'Street Food Paradise', 'Island Hopping Adventures'],
    href: '/blog',
    color: 'from-slate-600 to-slate-800'
  },
  {
    id: 'vlogs',
    title: 'Video Stories',
    description: 'Visual adventures and behind-the-scenes moments',
    icon: Video,
    count: 24,
    recent: ['Mountain Trek in Nepal', 'Street Markets of Thailand', 'Sunrise over Bagan'],
    href: '/vlogs',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'food',
    title: 'Food Adventures',
    description: 'Local cuisine, street food, and culinary experiences',
    icon: Utensils,
    count: 32,
    recent: ['Ramen Mastery in Fukuoka', 'Night Market Adventures', 'Authentic Thai Flavors'],
    href: '/food',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'transportation',
    title: 'Transportation',
    description: 'Getting around guides and travel tips',
    icon: MapPin,
    count: 16,
    recent: ['Mastering the Shinkansen', 'Motorbike Adventures', 'Island Ferry Hopping'],
    href: '/transportation',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'packing',
    title: 'Packing Guides',
    description: 'Minimalist travel gear and packing strategies',
    icon: Backpack,
    count: 12,
    recent: ['One Bag Asia Packing', 'Essential Travel Gear', 'Climate-Based Packing'],
    href: '/packing-checklist',
    color: 'from-indigo-500 to-purple-600'
  }
]

export default function QuickContentNav() {
  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Explore Content
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">Dive into stories, food adventures, travel tips, and packing guides</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {section.count} items
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {section.description}
                    </p>
                  </div>

                  {/* Recent Items */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Recent:</h4>
                    <div className="space-y-1">
                      {section.recent.slice(0, 2).map((item, i) => (
                        <div key={i} className="text-sm truncate">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    asChild
                  >
                    <a href={section.href} className="flex items-center justify-center gap-2">
                      View All
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Want to follow along on my journey? Subscribe for updates and new stories.
          </p>
          <Button size="lg" variant="outline" className="gap-2">
            Subscribe to Updates
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}