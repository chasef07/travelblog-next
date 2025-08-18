import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    // Check cache for download token
    const cacheDir = path.join(process.cwd(), '.cache', 'download-tokens')
    const tokenFile = path.join(cacheDir, `${sessionId}.json`)

    if (!fs.existsSync(tokenFile)) {
      return NextResponse.json(
        { error: 'Download token not found or expired' },
        { status: 404 }
      )
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf-8'))

    // Check if token has expired
    if (Date.now() > tokenData.expires) {
      // Clean up expired token
      fs.unlinkSync(tokenFile)
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 410 }
      )
    }

    return NextResponse.json({
      token: tokenData.token,
      url: tokenData.url,
      expires: tokenData.expires
    })

  } catch (error) {
    console.error('Error retrieving download token:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve download token' },
      { status: 500 }
    )
  }
}