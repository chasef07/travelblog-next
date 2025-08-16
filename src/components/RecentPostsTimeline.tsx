'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader } from "./ui/card"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

export default function RecentPostsTimeline() {
  const recentPosts = [
    {
      month: "July 2025",
      title: "Final Adventures in Southeast Asia",
      location: "Vietnam",
      slug: "final-adventures-southeast-asia",
      excerpt: "Last month in Vietnam before heading home. Street food tours, Ha Long Bay, and saying goodbye to Asia.",
      image: "/assets/images/misc/vvviews.jpg",
      postCount: 4,
      readTime: "3 min"
    },
    {
      month: "June 2025", 
      title: "Island Hopping in the Philippines",
      location: "Philippines",
      slug: "island-hopping-philippines",
      excerpt: "Paradise found in Palawan and the Visayas. Crystal clear waters, incredible diving, and island life.",
      image: "/assets/images/misc/whitebeachme-2.jpg",
      postCount: 5,
      readTime: "4 min"
    },
    {
      month: "May 2025",
      title: "Volcanic Adventures in Indonesia", 
      location: "Indonesia",
      slug: "volcanic-adventures-indonesia",
      excerpt: "Climbing volcanoes, exploring temples, and experiencing the diverse culture of Indonesia.",
      image: "/assets/images/misc/rinjani2.jpg",
      postCount: 6,
      readTime: "5 min"
    },
    {
      month: "April 2025",
      title: "Cherry Blossoms and Culture in Japan",
      location: "Japan", 
      slug: "cherry-blossoms-culture-japan",
      excerpt: "Experiencing Japan during sakura season. Tokyo streets, Kyoto temples, and incredible hospitality.",
      image: "/assets/images/food/sush.jpg",
      postCount: 4,
      readTime: "4 min"
    }
  ]

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-background/50 to-muted/20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Recent Adventures
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Final Months
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow the last chapters of this incredible journey across Asia before returning home
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ScrollArea className="w-full">
            <div className="flex gap-6 pb-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.month}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-none w-[320px]"
                >
                  <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 bg-card/80 backdrop-blur-sm border-border/20 h-full">
                    {/* Image Header */}
                    <div className="relative overflow-hidden">
                      <div className="aspect-[16/10] relative">
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Month Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs">
                            {post.month}
                          </Badge>
                        </div>

                        {/* Post Count */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="backdrop-blur-sm text-xs">
                            {post.postCount} posts
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {post.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <Link href={`/blog/2025/${post.slug}`}>
                        <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium group">
                          Read Stories
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/blog">
            <div className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
              View Complete Travel Archive
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}