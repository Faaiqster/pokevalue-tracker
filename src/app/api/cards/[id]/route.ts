import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../../auth/route'

// GET card by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const cardId = parseInt(params.id)
  
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
  
  // Mock card prices
  const cardPrices = [
    {
      id: 1,
      cardId: 1,
      priceCharting: 350.00,
      collectr: 375.50,
      fetchedAt: new Date('2025-03-30').toISOString()
    },
    {
      id: 2,
      cardId: 2,
      priceCharting: 15.50,
      collectr: 18.25,
      fetchedAt: new Date('2025-03-30').toISOString()
    }
  ]
  
  // Mock price history
  const priceHistory = [
    { cardId: 1, date: '2025-03-15', priceCharting: 345.00, collectr: 370.00 },
    { cardId: 1, date: '2025-03-22', priceCharting: 348.50, collectr: 372.25 },
    { cardId: 1, date: '2025-03-30', priceCharting: 350.00, collectr: 375.50 },
    { cardId: 2, date: '2025-03-20', priceCharting: 14.75, collectr: 17.50 },
    { cardId: 2, date: '2025-03-30', priceCharting: 15.50, collectr: 18.25 }
  ]
  
  // Find the card
  const card = cards.find(c => c.id === cardId && c.userId === user.id)
  
  if (!card) {
    return NextResponse.json(
      { error: 'Card not found' },
      { status: 404 }
    )
  }
  
  // Get current price
  const price = cardPrices.find(p => p.cardId === cardId)
  
  // Get price history
  const history = priceHistory.filter(p => p.cardId === cardId)
  
  // Return card with price data
  return NextResponse.json({
    ...card,
    priceCharting: price?.priceCharting || null,
    collectr: price?.collectr || null,
    priceHistory: history
  })
}

// PUT to update a card
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const cardId = parseInt(params.id)
  
  // Mock cards database (same as in /api/cards/route.ts)
  let cards = [
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
  
  try {
    const cardData = await request.json()
    
    // Find the card index
    const cardIndex = cards.findIndex(c => c.id === cardId && c.userId === user.id)
    
    if (cardIndex === -1) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      )
    }
    
    // Update the card
    cards[cardIndex] = {
      ...cards[cardIndex],
      name: cardData.name || cards[cardIndex].name,
      setName: cardData.set || cards[cardIndex].setName,
      cardNumber: cardData.number || cards[cardIndex].cardNumber,
      condition: cardData.condition || cards[cardIndex].condition,
      imageUrl: cardData.imageUrl || cards[cardIndex].imageUrl,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json(cards[cardIndex])
  } catch (error) {
    console.error('Error updating card:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE a card
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const cardId = parseInt(params.id)
  
  // Mock cards database (same as in /api/cards/route.ts)
  let cards = [
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
  
  // Find the card index
  const cardIndex = cards.findIndex(c => c.id === cardId && c.userId === user.id)
  
  if (cardIndex === -1) {
    return NextResponse.json(
      { error: 'Card not found' },
      { status: 404 }
    )
  }
  
  // Remove the card
  cards.splice(cardIndex, 1)
  
  return NextResponse.json({ message: 'Card deleted successfully' })
}
