'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How do I use the map after purchase?",
      answer: "After purchase, you'll receive a KMZ file that you can import directly into Google Maps. The file contains all the locations with detailed descriptions and tips. Instructions are included with your download."
    },
    {
      question: "What exactly is included in the map?",
      answer: "You'll get 50+ curated locations including restaurants, cafes, viewpoints, accommodations, activities, and hidden gems. Each location includes detailed descriptions, insider tips, GPS coordinates, and my personal experiences."
    },
    {
      question: "How current are the recommendations?",
      answer: "All recommendations are based on my personal visit to Laos in early 2025. I've tested every location myself during my solo travel journey, so everything is recent and verified."
    },
    {
      question: "Can I use this map offline?",
      answer: "Yes! Once imported to Google Maps, you can download the map area for offline use. This is perfect for when you're traveling in areas with limited internet connectivity."
    },
    {
      question: "What if I'm not satisfied with the map?",
      answer: "I offer a 30-day money-back guarantee. If you're not completely satisfied with the recommendations, just contact me and I'll provide a full refund."
    },
    {
      question: "Will there be maps for other countries?",
      answer: "Absolutely! I&apos;m working on curated maps for Vietnam, Nepal, Thailand, Cambodia, and other countries from my journey. Laos customers will be first to know about new releases."
    },
    {
      question: "How is this different from other travel guides?",
      answer: "Unlike generic guidebooks, these are personally tested recommendations from someone who actually traveled solo for 10 months. Every spot has been visited and verified, with insider tips you won't find anywhere else."
    },
    {
      question: "Can I share the map with friends?",
      answer: "The map is for personal use, but you can definitely show friends the locations when traveling together. Each purchase supports creating more curated content for fellow travelers."
    }
  ]

  return (
    <section className="py-16 px-6 bg-muted/20">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Got Questions?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are the most common questions about the curated travel maps.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-semibold pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? I&apos;m here to help!
          </p>
          <a 
            href="mailto:fagenchase@gmail.com" 
            className="text-primary hover:underline font-medium"
          >
            Send me an email →
          </a>
        </motion.div>
      </div>
    </section>
  )
}