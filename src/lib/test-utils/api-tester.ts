// src/lib/test-utils/api-tester.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

/**
 * Utility for testing API endpoints
 */
export async function testApiEndpoints() {
  const baseUrl = 'http://localhost:3000/api';
  const results = {
    auth: { success: false, message: '' },
    cards: { success: false, message: '' },
    prices: { success: false, message: '' },
    scan: { success: false, message: '' }
  };

  try {
    console.log('Starting API tests...');

    // Test authentication
    console.log('\nTesting authentication API...');
    try {
      const loginResponse = await axios.post(`${baseUrl}/auth`, {
        email: 'user@example.com',
        password: 'password123'
      });
      
      if (loginResponse.status === 200 && loginResponse.data.message === 'Login successful') {
        results.auth.success = true;
        results.auth.message = 'Authentication API working correctly';
        console.log('✅ Authentication API test passed');
      } else {
        results.auth.message = 'Authentication API returned unexpected response';
        console.log('❌ Authentication API test failed');
      }
    } catch (error) {
      results.auth.message = `Authentication API error: ${error.message}`;
      console.log(`❌ Authentication API test failed: ${error.message}`);
    }

    // Test cards API
    console.log('\nTesting cards API...');
    try {
      const cardsResponse = await axios.get(`${baseUrl}/cards`, {
        withCredentials: true
      });
      
      if (cardsResponse.status === 200 && Array.isArray(cardsResponse.data)) {
        results.cards.success = true;
        results.cards.message = 'Cards API working correctly';
        console.log('✅ Cards API test passed');
      } else {
        results.cards.message = 'Cards API returned unexpected response';
        console.log('❌ Cards API test failed');
      }
    } catch (error) {
      results.cards.message = `Cards API error: ${error.message}`;
      console.log(`❌ Cards API test failed: ${error.message}`);
    }

    // Test prices API
    console.log('\nTesting prices API...');
    try {
      const pricesResponse = await axios.post(`${baseUrl}/prices`, {
        cardName: 'Charizard',
        setName: 'Base Set',
        cardNumber: '4/102'
      }, {
        withCredentials: true
      });
      
      if (pricesResponse.status === 200 && pricesResponse.data.prices) {
        results.prices.success = true;
        results.prices.message = 'Prices API working correctly';
        console.log('✅ Prices API test passed');
      } else {
        results.prices.message = 'Prices API returned unexpected response';
        console.log('❌ Prices API test failed');
      }
    } catch (error) {
      results.prices.message = `Prices API error: ${error.message}`;
      console.log(`❌ Prices API test failed: ${error.message}`);
    }

    // Test scan API
    console.log('\nTesting scan API...');
    try {
      // Create a form with a test image
      const form = new FormData();
      const testImagePath = path.join(process.cwd(), 'public', 'test-card.jpg');
      
      // Check if test image exists, if not we'll skip this test
      if (fs.existsSync(testImagePath)) {
        form.append('image', fs.createReadStream(testImagePath));
        
        const scanResponse = await axios.post(`${baseUrl}/scan`, form, {
          withCredentials: true,
          headers: {
            ...form.getHeaders()
          }
        });
        
        if (scanResponse.status === 200 && scanResponse.data.detectedCards) {
          results.scan.success = true;
          results.scan.message = 'Scan API working correctly';
          console.log('✅ Scan API test passed');
        } else {
          results.scan.message = 'Scan API returned unexpected response';
          console.log('❌ Scan API test failed');
        }
      } else {
        results.scan.message = 'Test image not found, skipping scan API test';
        console.log('⚠️ Scan API test skipped (test image not found)');
      }
    } catch (error) {
      results.scan.message = `Scan API error: ${error.message}`;
      console.log(`❌ Scan API test failed: ${error.message}`);
    }

    console.log('\nAPI tests completed');
    return results;
  } catch (error) {
    console.error('Error during API tests:', error);
    return results;
  }
}
