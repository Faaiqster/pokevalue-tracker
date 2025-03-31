'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, Camera, DollarSign, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  // Mock data for demonstration
  const collectionValue = {
    priceCharting: 1250.75,
    collectr: 1345.50,
    cardCount: 42
  }

  const recentCards = [
    { id: 1, name: 'Charizard', set: 'Base Set', number: '4/102', value: 350.00 },
    { id: 2, name: 'Pikachu', set: 'Jungle', number: '60/64', value: 15.50 },
    { id: 3, name: 'Blastoise', set: 'Base Set', number: '2/102', value: 180.25 }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">PriceCharting Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">${collectionValue.priceCharting.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collectr Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">${collectionValue.collectr.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">{collectionValue.cardCount}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            <div className="flex space-x-4">
              <Link href="/add-card">
                <Button variant="outline" className="flex items-center">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </Link>
              <Link href="/scan">
                <Button variant="outline" className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Cards
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Recently Added Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentCards.map(card => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>{card.set} • #{card.number}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">${card.value.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
