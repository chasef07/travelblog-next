'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail, MapPin, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  // const sessionId = searchParams.get('session_id') // Will be used for order verification

  const handleDownload = () => {
    // This will be implemented with actual file download logic
    alert('Download functionality will be implemented with actual map files!')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="text-center shadow-xl">
          <CardHeader className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <Badge variant="secondary" className="mb-4">
                Payment Successful
              </Badge>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Insider Laos!
              </h1>
              <p className="text-muted-foreground">
                Your curated travel map is ready for download
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <div className="space-y-6">
              {/* Download Section */}
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Your Laos Travel Map</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  50+ curated locations with detailed descriptions and insider tips
                </p>
                <Button 
                  onClick={handleDownload}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Download className="h-4 w-4" />
                  Download Map (KMZ File)
                </Button>
              </div>

              {/* Instructions */}
              <div className="text-left space-y-4">
                <h3 className="font-bold">How to use your map:</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Download the KMZ file</p>
                      <p className="text-muted-foreground">Click the download button above to save the file to your device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Open in Google Maps</p>
                      <p className="text-muted-foreground">Open Google Maps app and import the KMZ file to see all locations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Start exploring!</p>
                      <p className="text-muted-foreground">Each pin includes detailed descriptions and insider tips from my travels</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Notice */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium">Check your email</p>
                  <p className="text-xs text-muted-foreground">
                    You&apos;ll also receive a confirmation email with download links and instructions
                  </p>
                </div>
              </div>

              {/* Support */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-3">
                  Need help or have questions?
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <h3 className="font-bold mb-4">What's Next?</h3>
          <p className="text-muted-foreground mb-6">
            More curated travel maps coming soon for Vietnam, Nepal, Thailand, and other countries from my journey.
          </p>
          <Button variant="outline" asChild>
            <Link href="/blog">Read About My Laos Adventures</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}