import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required in production')
}

if (!NEXT_PUBLIC_BASE_URL) {
  console.warn('NEXT_PUBLIC_BASE_URL not set, using localhost fallback')
}

export async function POST(request: NextRequest) {
  try {
    const { priceId, productId } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const checkoutSession = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'payment_method_types[0]': 'card',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'success_url': `${NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/maps/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/maps`,
        'metadata[product_id]': productId || '',
        'allow_promotion_codes': 'true',
        'billing_address_collection': 'required',
        'customer_creation': 'always',
      }),
    })

    if (!checkoutSession.ok) {
      const errorData = await checkoutSession.text()
      console.error('Stripe API error:', {
        status: checkoutSession.status,
        statusText: checkoutSession.statusText,
        error: errorData
      })
      
      return NextResponse.json(
        { 
          error: 'Stripe checkout failed',
          details: `Status: ${checkoutSession.status} - ${errorData}`,
          priceId,
          productId
        },
        { status: 500 }
      )
    }

    const session = await checkoutSession.json()

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
        priceId,
        productId
      },
      { status: 500 }
    )
  }
}