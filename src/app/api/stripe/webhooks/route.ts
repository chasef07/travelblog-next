import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import crypto from 'crypto'

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET

// Email service function (implement with your preferred email provider)
async function sendDownloadEmail(email: string, downloadUrl: string, sessionId: string) {
  // TODO: Implement with your email service (SendGrid, Resend, etc.)
  // For now, just log the email details
  console.log('📧 SEND DOWNLOAD EMAIL:')
  console.log(`To: ${email}`)
  console.log(`Download URL: ${downloadUrl}`)
  console.log(`Session ID: ${sessionId}`)
  
  // Example implementation with fetch to email service:
  // const response = await fetch('https://api.your-email-service.com/send', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${process.env.EMAIL_API_KEY}` },
  //   body: JSON.stringify({
  //     to: email,
  //     subject: 'Your Laos Travel Map Download',
  //     html: `<p>Your download is ready: <a href="${downloadUrl}">Download Map</a></p>`
  //   })
  // })
}

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is required in production')
}

if (!DOWNLOAD_SECRET) {
  throw new Error('DOWNLOAD_SECRET is required for secure downloads')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Verify the webhook signature
    let event
    try {
      // Verify webhook signature using Stripe's method
      const elements = signature.split(',')
      const signatureElements: { [key: string]: string } = {}
      
      for (const element of elements) {
        const [key, value] = element.split('=')
        signatureElements[key] = value
      }

      const timestamp = signatureElements.t
      const v1 = signatureElements.v1

      if (!timestamp || !v1) {
        throw new Error('Invalid signature format')
      }

      // Create expected signature
      const payload = timestamp + '.' + body
      const expectedSignature = crypto
        .createHmac('sha256', STRIPE_WEBHOOK_SECRET!)
        .update(payload, 'utf8')
        .digest('hex')

      if (expectedSignature !== v1) {
        throw new Error('Invalid signature')
      }

      // Check timestamp (prevent replay attacks)
      const webhookTimestamp = parseInt(timestamp) * 1000
      const tolerance = 300000 // 5 minutes
      if (Math.abs(Date.now() - webhookTimestamp) > tolerance) {
        throw new Error('Request timestamp too old')
      }

      event = JSON.parse(body)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      // Store the successful purchase information
      console.log('Payment successful for session:', session.id)
      console.log('Customer email:', session.customer_details?.email)
      console.log('Product purchased:', session.metadata?.product_id)

      // Create a secure download token
      const downloadData = {
        sessionId: session.id,
        productId: session.metadata?.product_id || 'laos-map',
        email: session.customer_details?.email,
        timestamp: Date.now(),
        // Token expires in 7 days
        expires: Date.now() + (7 * 24 * 60 * 60 * 1000)
      }

      // Create HMAC signature for secure download token
      const dataString = JSON.stringify(downloadData)
      const signature = crypto
        .createHmac('sha256', DOWNLOAD_SECRET!)
        .update(dataString)
        .digest('hex')

      const downloadToken = Buffer.from(dataString).toString('base64') + '.' + signature
      const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}`

      // Store the token in a simple file-based cache for retrieval by session ID
      // In production, use a proper database
      try {
        const fs = await import('fs')
        const path = await import('path')
        
        const cacheDir = path.join(process.cwd(), '.cache', 'download-tokens')
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir, { recursive: true })
        }
        
        const tokenFile = path.join(cacheDir, `${session.id}.json`)
        fs.writeFileSync(tokenFile, JSON.stringify({
          token: downloadToken,
          url: downloadUrl,
          email: session.customer_details?.email,
          created: Date.now(),
          expires: downloadData.expires
        }))
      } catch (error) {
        console.error('Failed to cache download token:', error)
      }

      // Send download email (placeholder for now)
      try {
        const email = session.customer_details?.email
        if (email) {
          await sendDownloadEmail(email, downloadUrl, session.id)
        }
      } catch (error) {
        console.error('Failed to send download email:', error)
        // Don't fail the webhook if email fails
      }

      return NextResponse.json({ 
        received: true,
        message: 'Download link sent to email'
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}