'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail, MapPin, ExternalLink, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [downloadToken, setDownloadToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDownloadToken = async () => {
      if (!sessionId) {
        setError('No session ID found. Please contact support.')
        setLoading(false)
        return
      }

      try {
        // Fetch the real download token from our API
        const response = await fetch(`/api/download-token?session_id=${sessionId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Download not ready yet. Please wait a moment and refresh the page.')
          } else if (response.status === 410) {
            setError('Download link has expired. Please contact support.')
          } else {
            throw new Error('Failed to fetch download token')
          }
          setLoading(false)
          return
        }

        const data = await response.json()
        setDownloadToken(data.token)
      } catch (error) {
        console.error('Error fetching download token:', error)
        setError('Failed to prepare download. Please contact support.')
      } finally {
        setLoading(false)
      }
    }

    fetchDownloadToken()
  }, [sessionId])

  const handleDownload = () => {
    if (!downloadToken) {
      alert('Download not ready yet. Please wait a moment.')
      return
    }

    // Create the download URL
    const downloadUrl = `/api/download?token=${downloadToken}`
    
    // Open download in new tab
    window.open(downloadUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Preparing Your Download</h2>
        <p className="text-muted-foreground">Please wait while we generate your secure download link...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Card className="text-center">
          <CardContent className="p-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-red-600">Download Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <div className="space-y-3">
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
              <p className="text-xs text-muted-foreground">
                If the problem persists, please contact support with your session ID: {sessionId}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
                  disabled={!downloadToken}
                >
                  <Download className="h-4 w-4" />
                  {downloadToken ? 'Download Laos Travel Guide (KMZ)' : 'Preparing Download...'}
                </Button>
                
                {downloadToken && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Download link expires in 7 days</span>
                  </div>
                )}
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
          <h3 className="font-bold mb-4">What&apos;s Next?</h3>
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