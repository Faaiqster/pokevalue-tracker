'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

export default function AddCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [cardData, setCardData] = useState({
    name: '',
    set: '',
    number: '',
    condition: 'NM'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  const handleConditionChange = (value: string) => {
    setCardData(prev => ({ ...prev, condition: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Card added:', cardData)
      setIsLoading(false)
      // Reset form or redirect
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Card</h1>
      
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
            <CardDescription>
              Enter the details of your Pokémon card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Card Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Charizard"
                    value={cardData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="set">Set Name</Label>
                  <Input
                    id="set"
                    name="set"
                    placeholder="e.g. Base Set"
                    value={cardData.set}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="number">Card Number</Label>
                  <Input
                    id="number"
                    name="number"
                    placeholder="e.g. 4/102"
                    value={cardData.number}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={cardData.condition}
                    onValueChange={handleConditionChange}
                  >
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="NM">Near Mint (NM)</SelectItem>
                      <SelectItem value="Mint">Mint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <CardFooter className="flex justify-between pt-6 px-0">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Card'
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
