// src/scripts/run-tests.js
const { runAllTests } = require('../lib/test-utils/test-runner');

console.log('Starting PokéValue Tracker test suite...');

// Create a test image for scan API testing
const fs = require('fs');
const path = require('path');

const testImageDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(testImageDir)) {
  fs.mkdirSync(testImageDir, { recursive: true });
}

// Create a simple placeholder test image if it doesn't exist
const testImagePath = path.join(testImageDir, 'test-card.jpg');
if (!fs.existsSync(testImagePath)) {
  console.log('Creating test image for scan API testing...');
  // This would normally be a real card image, but for testing we'll use a placeholder
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(300, 420);
  const ctx = canvas.getContext('2d');
  
  // Draw a card-like shape
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 300, 420);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 290, 410);
  
  // Add some text to simulate a card
  ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText('Charizard', 100, 50);
  ctx.fillText('Base Set', 100, 80);
  ctx.fillText('4/102', 130, 380);
  
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(testImagePath, buffer);
  console.log('Test image created successfully.');
}

// Run the tests
runAllTests()
  .then(results => {
    console.log('\nTest results:', JSON.stringify(results.summary, null, 2));
    
    if (results.summary.overall.passed === results.summary.overall.total) {
      console.log('\n✅ All tests passed successfully!');
    } else {
      console.log(`\n⚠️ Some tests failed: ${results.summary.overall.passed}/${results.summary.overall.total} passed`);
    }
  })
  .catch(error => {
    console.error('Error running tests:', error);
  });
