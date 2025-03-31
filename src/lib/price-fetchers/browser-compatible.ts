// src/lib/price-fetchers/browser-compatible.ts
/**
 * Browser-compatible version of the price fetchers
 * This version uses mock data instead of requiring axios and cheerio for web scraping
 */

/**
 * Mock function to simulate fetching prices from PriceCharting
 */
export async function fetchPriceChartingPrice(cardName: string, setName: string): Promise<number | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock prices based on card name
  const mockPrices: Record<string, number> = {
    'Charizard': 350.00,
    'Pikachu': 15.50,
    'Blastoise': 180.25,
    'Venusaur': 120.75,
    'Mewtwo': 85.25
  };
  
  // Return price if card exists in our mock database, otherwise return a random price
  return mockPrices[cardName] || Math.floor(Math.random() * 100) + 10;
}

/**
 * Mock function to simulate fetching prices from Collectr
 */
export async function fetchCollectrPrice(cardName: string, setName: string): Promise<number | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Return mock prices based on card name (slightly different from PriceCharting for realism)
  const mockPrices: Record<string, number> = {
    'Charizard': 375.50,
    'Pikachu': 18.25,
    'Blastoise': 195.00,
    'Venusaur': 135.50,
    'Mewtwo': 92.00
  };
  
  // Return price if card exists in our mock database, otherwise return a random price
  return mockPrices[cardName] || Math.floor(Math.random() * 110) + 15;
}

/**
 * Fetches prices from multiple sources and returns them in a standardized format
 */
export async function fetchCardPrices(cardName: string, setName: string, cardNumber: string) {
  try {
    // Fetch prices from both sources in parallel
    const [priceChartingPrice, collectrPrice] = await Promise.all([
      fetchPriceChartingPrice(cardName, setName),
      fetchCollectrPrice(cardName, setName)
    ]);
    
    return {
      priceCharting: priceChartingPrice || null,
      collectr: collectrPrice || null,
      fetchedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching card prices:', error);
    return {
      priceCharting: null,
      collectr: null,
      fetchedAt: new Date().toISOString(),
      error: 'Failed to fetch prices'
    };
  }
}
