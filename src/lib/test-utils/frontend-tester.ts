// src/lib/test-utils/frontend-tester.ts
import puppeteer from 'puppeteer';

/**
 * Utility for testing frontend functionality
 */
export async function testFrontendFunctionality() {
  const results = {
    navigation: { success: false, message: '' },
    dashboard: { success: false, message: '' },
    addCard: { success: false, message: '' },
    collection: { success: false, message: '' },
    cardDetails: { success: false, message: '' },
    scanCards: { success: false, message: '' }
  };

  let browser;
  try {
    console.log('Starting frontend tests...');
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Test navigation
    console.log('\nTesting navigation...');
    try {
      await page.goto('http://localhost:3000');
      await page.waitForSelector('header');
      
      // Check if navigation links exist
      const navLinks = await page.$$eval('nav a', links => links.map(link => link.textContent));
      
      if (navLinks.length >= 4) {
        results.navigation.success = true;
        results.navigation.message = 'Navigation links are present';
        console.log('✅ Navigation test passed');
      } else {
        results.navigation.message = 'Not all navigation links are present';
        console.log('❌ Navigation test failed');
      }
    } catch (error) {
      results.navigation.message = `Navigation error: ${error.message}`;
      console.log(`❌ Navigation test failed: ${error.message}`);
    }
    
    // Test dashboard
    console.log('\nTesting dashboard...');
    try {
      await page.goto('http://localhost:3000/dashboard');
      await page.waitForSelector('h1');
      
      const dashboardTitle = await page.$eval('h1', el => el.textContent);
      const cards = await page.$$('.grid .card');
      
      if (dashboardTitle === 'Dashboard' && cards.length > 0) {
        results.dashboard.success = true;
        results.dashboard.message = 'Dashboard loaded correctly';
        console.log('✅ Dashboard test passed');
      } else {
        results.dashboard.message = 'Dashboard did not load correctly';
        console.log('❌ Dashboard test failed');
      }
    } catch (error) {
      results.dashboard.message = `Dashboard error: ${error.message}`;
      console.log(`❌ Dashboard test failed: ${error.message}`);
    }
    
    // Test add card form
    console.log('\nTesting add card form...');
    try {
      await page.goto('http://localhost:3000/add-card');
      await page.waitForSelector('form');
      
      const inputs = await page.$$('form input');
      const buttons = await page.$$('form button');
      
      if (inputs.length >= 3 && buttons.length >= 1) {
        results.addCard.success = true;
        results.addCard.message = 'Add card form loaded correctly';
        console.log('✅ Add card form test passed');
      } else {
        results.addCard.message = 'Add card form did not load correctly';
        console.log('❌ Add card form test failed');
      }
    } catch (error) {
      results.addCard.message = `Add card form error: ${error.message}`;
      console.log(`❌ Add card form test failed: ${error.message}`);
    }
    
    // Test collection view
    console.log('\nTesting collection view...');
    try {
      await page.goto('http://localhost:3000/collection');
      await page.waitForSelector('h1');
      
      const collectionTitle = await page.$eval('h1', el => el.textContent);
      const searchInput = await page.$('input[placeholder*="Search"]');
      
      if (collectionTitle === 'My Collection' && searchInput) {
        results.collection.success = true;
        results.collection.message = 'Collection view loaded correctly';
        console.log('✅ Collection view test passed');
      } else {
        results.collection.message = 'Collection view did not load correctly';
        console.log('❌ Collection view test failed');
      }
    } catch (error) {
      results.collection.message = `Collection view error: ${error.message}`;
      console.log(`❌ Collection view test failed: ${error.message}`);
    }
    
    // Test card details view
    console.log('\nTesting card details view...');
    try {
      await page.goto('http://localhost:3000/card/1');
      await page.waitForSelector('h1');
      
      const cardName = await page.$eval('h1', el => el.textContent);
      const tabs = await page.$$('.tabs-list button');
      
      if (cardName && tabs.length >= 2) {
        results.cardDetails.success = true;
        results.cardDetails.message = 'Card details view loaded correctly';
        console.log('✅ Card details view test passed');
      } else {
        results.cardDetails.message = 'Card details view did not load correctly';
        console.log('❌ Card details view test failed');
      }
    } catch (error) {
      results.cardDetails.message = `Card details view error: ${error.message}`;
      console.log(`❌ Card details view test failed: ${error.message}`);
    }
    
    // Test scan cards view
    console.log('\nTesting scan cards view...');
    try {
      await page.goto('http://localhost:3000/scan');
      await page.waitForSelector('h1');
      
      const scanTitle = await page.$eval('h1', el => el.textContent);
      const uploadArea = await page.$('.border-dashed');
      
      if (scanTitle === 'Scan Cards' && uploadArea) {
        results.scanCards.success = true;
        results.scanCards.message = 'Scan cards view loaded correctly';
        console.log('✅ Scan cards view test passed');
      } else {
        results.scanCards.message = 'Scan cards view did not load correctly';
        console.log('❌ Scan cards view test failed');
      }
    } catch (error) {
      results.scanCards.message = `Scan cards view error: ${error.message}`;
      console.log(`❌ Scan cards view test failed: ${error.message}`);
    }
    
    console.log('\nFrontend tests completed');
    return results;
  } catch (error) {
    console.error('Error during frontend tests:', error);
    return results;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
