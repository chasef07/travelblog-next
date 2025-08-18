import { NextRequest, NextResponse } from 'next/server'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
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
        'success_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/maps/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/maps`,
        'metadata[product_id]': productId || '',
        'allow_promotion_codes': 'true',
        'billing_address_collection': 'required',
        'customer_creation': 'always',
      }),
    })

    if (!checkoutSession.ok) {
      const errorData = await checkoutSession.text()
      console.error('Stripe API error:', errorData)
      throw new Error(`Stripe API error: ${checkoutSession.status}`)
    }

    const session = await checkoutSession.json()

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}