import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'

const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET

if (!DOWNLOAD_SECRET) {
  throw new Error('DOWNLOAD_SECRET is required for secure downloads')
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Download token required' },
        { status: 400 }
      )
    }

    // Parse and verify the download token
    const [encodedData, signature] = token.split('.')
    if (!encodedData || !signature) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      )
    }

    // Decode the data
    let downloadData
    try {
      const dataString = Buffer.from(encodedData, 'base64').toString('utf-8')
      downloadData = JSON.parse(dataString)
    } catch {
      return NextResponse.json(
        { error: 'Invalid token data' },
        { status: 400 }
      )
    }

    // Verify the signature
    const expectedSignature = crypto
      .createHmac('sha256', DOWNLOAD_SECRET!)
      .update(JSON.stringify(downloadData))
      .digest('hex')

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid token signature' },
        { status: 401 }
      )
    }

    // Check if token has expired
    if (Date.now() > downloadData.expires) {
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 410 }
      )
    }

    // Determine which file to serve based on product ID
    const productFiles: { [key: string]: string } = {
      'laos-map': 'Laos-Travel-Guide.kmz'
    }

    const fileName = productFiles[downloadData.productId]
    if (!fileName) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // In development, create a sample file if it doesn't exist
    const filePath = path.join(process.cwd(), 'public', 'downloads', fileName)
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads')

    // Ensure downloads directory exists
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true })
    }

    // Create sample file if it doesn't exist (for development)
    if (!fs.existsSync(filePath)) {
      const sampleContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Laos Hidden Gems - Sample</name>
    <description>Curated travel recommendations for Laos</description>
    <Placemark>
      <name>Sample Location</name>
      <description>This is a sample KMZ file. Replace with actual map data.</description>
      <Point>
        <coordinates>102.6331,19.8563,0</coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`
      fs.writeFileSync(filePath, sampleContent)
    }

    // Log successful download
    console.log(`📥 Download initiated:`, {
      sessionId: downloadData.sessionId,
      productId: downloadData.productId,
      email: downloadData.email,
      fileName,
      timestamp: new Date().toISOString()
    })

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // Set appropriate headers for file download
    const headers = new Headers()
    headers.set('Content-Type', 'application/vnd.google-earth.kmz')
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`)
    headers.set('Content-Length', fileBuffer.length.toString())
    headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')

    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    })

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    )
  }
}