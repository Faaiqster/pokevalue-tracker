import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '../auth/route'

// Mock cards database
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

// GET all cards for the current user
export async function GET(request: NextRequest) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Get cards for the current user
  const userCards = cards.filter(card => card.userId === user.id)
  
  // Add price data to each card
  const cardsWithPrices = userCards.map(card => {
    const price = cardPrices.find(p => p.cardId === card.id)
    return {
      ...card,
      priceCharting: price?.priceCharting || null,
      collectr: price?.collectr || null
    }
  })
  
  return NextResponse.json(cardsWithPrices)
}

// POST to create a new card
export async function POST(request: NextRequest) {
  const user = getCurrentUser(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const cardData = await request.json()
    
    // Create new card
    const newCard = {
      id: cards.length + 1,
      userId: user.id,
      name: cardData.name,
      setName: cardData.set,
      cardNumber: cardData.number,
      condition: cardData.condition || 'NM',
      imageUrl: cardData.imageUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to mock database
    cards.push(newCard)
    
    // Simulate fetching prices
    const newPrice = {
      id: cardPrices.length + 1,
      cardId: newCard.id,
      priceCharting: Math.random() * 100 + 10, // Random price for demo
      collectr: Math.random() * 100 + 15,      // Random price for demo
      fetchedAt: new Date().toISOString()
    }
    
    cardPrices.push(newPrice)
    
    // Return the new card with prices
    return NextResponse.json({
      ...newCard,
      priceCharting: newPrice.priceCharting,
      collectr: newPrice.collectr
    })
  } catch (error) {
    console.error('Error creating card:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
