import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import crypto from 'crypto'

// const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
// const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET

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

    // For now, we'll verify the event came from Stripe by checking the signature exists
    // In production, you should properly verify the webhook signature
    let event

    try {
      // Parse the event from Stripe
      event = JSON.parse(body)
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
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
        .createHmac('sha256', DOWNLOAD_SECRET || 'fallback-secret')
        .update(dataString)
        .digest('hex')

      const downloadToken = Buffer.from(dataString).toString('base64') + '.' + signature

      // Log the download token for the user (in production, send via email)
      console.log('Download token created:', downloadToken)
      console.log('Download URL:', `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?token=${downloadToken}`)

      return NextResponse.json({ 
        received: true,
        downloadToken // In production, don't return this - send via email instead
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