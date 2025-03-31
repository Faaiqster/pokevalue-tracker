import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../auth/route'
import { fetchCardPrices } from '@/lib/price-fetchers/browser-compatible'

// POST to fetch prices for a card
export async function POST(request: NextRequest) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const { cardName, setName, cardNumber } = await request.json()
    
    if (!cardName || !setName || !cardNumber) {
      return NextResponse.json(
        { error: 'Missing required card information' },
        { status: 400 }
      )
    }
    
    // Fetch prices using browser-compatible fetcher
    const prices = await fetchCardPrices(cardName, setName, cardNumber)
    
    return NextResponse.json({
      cardName,
      setName,
      cardNumber,
      prices,
      fetchedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching prices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}

// GET to refresh prices for a specific card ID
export async function GET(request: NextRequest) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const url = new URL(request.url)
  const cardId = url.searchParams.get('cardId')
  
  if (!cardId) {
    return NextResponse.json(
      { error: 'Missing card ID' },
      { status: 400 }
    )
  }
  
  // Mock cards database (same as in /api/cards/route.ts)
  const cards = [
    {
      id: 1,
      userId: 1,
      name: 'Charizard',
      setName: 'Base Set',
      cardNumber: '4/102',
      condition: 'NM',
      imageUrl: null,
      createdAt: new Date('2025-03-15').toISOString(),
      updatedAt: new Date('2025-03-30').toISOString()
    },
    {
      id: 2,
      userId: 1,
      name: 'Pikachu',
      setName: 'Jungle',
      cardNumber: '60/64',
      condition: 'NM',
      imageUrl: null,
      createdAt: new Date('2025-03-20').toISOString(),
      updatedAt: new Date('2025-03-30').toISOString()
    }
  ]
  
  // Find the card
  const card = cards.find(c => c.id === parseInt(cardId) && c.userId === user.id)
  
  if (!card) {
    return NextResponse.json(
      { error: 'Card not found' },
      { status: 404 }
    )
  }
  
  try {
    // Fetch updated prices using browser-compatible fetcher
    const prices = await fetchCardPrices(card.name, card.setName, card.cardNumber)
    
    // In a real implementation, we would update the database here
    
    return NextResponse.json({
      cardId: parseInt(cardId),
      prices,
      fetchedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error refreshing prices:', error)
    return NextResponse.json(
      { error: 'Failed to refresh prices' },
      { status: 500 }
    )
  }
}
