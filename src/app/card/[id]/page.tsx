'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CardDetails({ params }: { params: { id: string } }) {
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Mock card data - would be fetched from API based on params.id
  const card = {
    id: parseInt(params.id),
    name: 'Charizard',
    set: 'Base Set',
    number: '4/102',
    priceCharting: 350.00,
    collectr: 375.50,
    condition: 'NM',
    addedDate: '2025-03-15T12:00:00Z',
    lastUpdated: '2025-03-30T09:15:00Z',
    priceHistory: [
      { date: '2025-03-15', priceCharting: 345.00, collectr: 370.00 },
      { date: '2025-03-22', priceCharting: 348.50, collectr: 372.25 },
      { date: '2025-03-30', priceCharting: 350.00, collectr: 375.50 }
    ]
  }

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Card deleted:', card.id)
      // Would redirect to collection page
      setIsDeleting(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/collection" className="flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Collection
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Card Image</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6">
              <div className="bg-muted rounded-lg w-full aspect-[2/3] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Card image placeholder</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>
                {card.set} • #{card.number} • {card.condition}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="history">Price History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Set</p>
                      <p>{card.set}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Number</p>
                      <p>{card.number}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Condition</p>
                      <p>{card.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Added Date</p>
                      <p>{new Date(card.addedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                      <p>{new Date(card.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="pricing">
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">PriceCharting Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${card.priceCharting.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Last updated: {new Date(card.lastUpdated).toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Collectr Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${card.collectr.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Last updated: {new Date(card.lastUpdated).toLocaleString()}</p>
                      </CardContent>
                    </Card>
                    
                    <Button variant="outline">Refresh Prices</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="text-left p-3 text-sm font-medium">Date</th>
                            <th className="text-right p-3 text-sm font-medium">PriceCharting</th>
                            <th className="text-right p-3 text-sm font-medium">Collectr</th>
                          </tr>
                        </thead>
                        <tbody>
                          {card.priceHistory.map((entry, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-3 text-sm">{entry.date}</td>
                              <td className="p-3 text-sm text-right">${entry.priceCharting.toFixed(2)}</td>
                              <td className="p-3 text-sm text-right">${entry.collectr.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
