import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../auth/route'
import { detectCards } from '@/lib/image-recognition/card-detector-browser'

export async function POST(request: NextRequest) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    
    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }
    
    // Convert file to data URL for browser-compatible processing
    const arrayBuffer = await imageFile.arrayBuffer()
    
    // Detect cards in the image using browser-compatible detector
    const detectedCards = await detectCards(arrayBuffer)
    
    return NextResponse.json({
      detectedCards,
      count: detectedCards.length,
      processedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}
