// src/lib/price-fetchers/collectr.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Fetches price data from Collectr by scraping their website
 * 
 * Note: In a production environment, you would want to:
 * 1. Use their official API if available
 * 2. Implement proper rate limiting
 * 3. Add caching to reduce load on their servers
 * 4. Handle various error cases more gracefully
 */
export async function fetchCollectrPrice(cardName: string, setName: string): Promise<number | null> {
  try {
    // Format the search query
    const searchQuery = `${cardName} ${setName} pokemon`;
    const encodedQuery = encodeURIComponent(searchQuery);
    
    // First, search for the card
    const searchUrl = `https://collectr.com/search?q=${encodedQuery}`;
    const searchResponse = await axios.get(searchUrl);
    
    // Parse the search results
    const $ = cheerio.load(searchResponse.data);
    
    // Find the first result link that looks like a Pokémon card
    const firstResultLink = $('.search-results .card-item a').first().attr('href');
    
    if (!firstResultLink) {
      console.log(`No results found for ${cardName} from ${setName} on Collectr`);
      return null;
    }
    
    // Get the product page
    const productUrl = `https://collectr.com${firstResultLink}`;
    const productResponse = await axios.get(productUrl);
    
    // Parse the product page
    const product$ = cheerio.load(productResponse.data);
    
    // Extract the price (looking for Near Mint price)
    const priceText = product$('.price-value').first().text().trim();
    
    // Convert price text (e.g., "$123.45") to number
    if (priceText) {
      const priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      return priceNumber;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching from Collectr:', error);
    return null;
  }
}
