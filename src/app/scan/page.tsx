'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Camera, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ScanCards() {
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [detectedCards, setDetectedCards] = useState<any[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      
      const file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        setIsUploading(false)
        // Simulate processing
        processImage()
      }
      
      reader.readAsDataURL(file)
    }
  }

  const processImage = () => {
    setIsProcessing(true)
    
    // Simulate API call for card detection
    setTimeout(() => {
      // Mock detected cards
      setDetectedCards([
        { id: 1, name: 'Charizard', set: 'Base Set', number: '4/102', confidence: 0.95 },
        { id: 2, name: 'Pikachu', set: 'Jungle', number: '60/64', confidence: 0.92 }
      ])
      setIsProcessing(false)
    }, 2000)
  }

  const handleCameraCapture = () => {
    // This would be implemented with device camera API
    alert('Camera functionality would be implemented here')
  }

  const addToCollection = (cardId: number) => {
    console.log('Adding card to collection:', cardId)
    // Would call API to add card to collection
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Scan Cards</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Upload an image of your Pokémon cards to automatically detect them
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!uploadedImage ? (
                <div className="grid gap-4">
                  <div className="border-2 border-dashed rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your image here or click to browse
                      </p>
                      <div className="mt-4">
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
                            Select Image
                          </div>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or</p>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={handleCameraCapture}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="relative">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded cards" 
                      className="w-full h-auto rounded-lg"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <div className="text-center text-white">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p>Processing image...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadedImage(null)
                        setDetectedCards([])
                      }}
                    >
                      Clear
                    </Button>
                    <Button 
                      onClick={processImage}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        'Reprocess Image'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Detected Cards</CardTitle>
              <CardDescription>
                {detectedCards.length > 0 
                  ? `${detectedCards.length} cards detected` 
                  : 'Cards will appear here after processing'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {detectedCards.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {isUploading || isProcessing 
                      ? 'Processing your image...' 
                      : 'No cards detected yet. Upload an image to get started.'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {detectedCards.map(card => (
                    <Card key={card.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{card.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {card.set} • #{card.number}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Confidence: {(card.confidence * 100).toFixed(0)}%
                            </p>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => addToCollection(card.id)}
                          >
                            Add
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
