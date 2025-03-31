'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export default function Collection() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock collection data
  const cards = [
    { id: 1, name: 'Charizard', set: 'Base Set', number: '4/102', priceCharting: 350.00, collectr: 375.50, condition: 'NM' },
    { id: 2, name: 'Pikachu', set: 'Jungle', number: '60/64', priceCharting: 15.50, collectr: 18.25, condition: 'NM' },
    { id: 3, name: 'Blastoise', set: 'Base Set', number: '2/102', priceCharting: 180.25, collectr: 195.00, condition: 'Good' },
    { id: 4, name: 'Venusaur', set: 'Base Set', number: '15/102', priceCharting: 120.75, collectr: 135.50, condition: 'NM' },
    { id: 5, name: 'Mewtwo', set: 'Base Set', number: '10/102', priceCharting: 85.25, collectr: 92.00, condition: 'Mint' },
  ]
  
  // Filter cards based on search query
  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.set.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.number.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Calculate total collection value
  const totalPriceCharting = cards.reduce((sum, card) => sum + card.priceCharting, 0)
  const totalCollectr = cards.reduce((sum, card) => sum + card.collectr, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Collection</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{cards.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">PriceCharting Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalPriceCharting.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collectr Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalCollectr.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards by name, set, or number..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <Link href={`/card/${card.id}`} key={card.id}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{card.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {card.set} • #{card.number} • {card.condition}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${Math.max(card.priceCharting, card.collectr).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        PC: ${card.priceCharting.toFixed(2)} | Collectr: ${card.collectr.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cards found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
