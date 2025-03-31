// src/lib/price-fetchers/index.ts
import { fetchPriceChartingPrice } from './pricecharting';
import { fetchCollectrPrice } from './collectr';

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
