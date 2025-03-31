// src/lib/test-utils/test-runner.ts
import { testApiEndpoints } from './api-tester';
import { testFrontendFunctionality } from './frontend-tester';

/**
 * Main test runner that executes all tests
 */
export async function runAllTests() {
  console.log('=== PokéValue Tracker Test Suite ===');
  console.log('Starting tests at:', new Date().toLocaleString());
  console.log('===================================\n');
  
  // Run API tests
  console.log('RUNNING API TESTS');
  console.log('===================================');
  const apiResults = await testApiEndpoints();
  
  // Run frontend tests
  console.log('\nRUNNING FRONTEND TESTS');
  console.log('===================================');
  const frontendResults = await testFrontendFunctionality();
  
  // Compile results
  const results = {
    api: apiResults,
    frontend: frontendResults
  };
  
  // Calculate success rates
  const apiTests = Object.values(apiResults);
  const apiSuccessCount = apiTests.filter(test => test.success).length;
  const apiSuccessRate = (apiSuccessCount / apiTests.length) * 100;
  
  const frontendTests = Object.values(frontendResults);
  const frontendSuccessCount = frontendTests.filter(test => test.success).length;
  const frontendSuccessRate = (frontendSuccessCount / frontendTests.length) * 100;
  
  const totalTests = apiTests.length + frontendTests.length;
  const totalSuccessCount = apiSuccessCount + frontendSuccessCount;
  const totalSuccessRate = (totalSuccessCount / totalTests) * 100;
  
  // Print summary
  console.log('\n===================================');
  console.log('TEST SUMMARY');
  console.log('===================================');
  console.log(`API Tests: ${apiSuccessCount}/${apiTests.length} passed (${apiSuccessRate.toFixed(2)}%)`);
  console.log(`Frontend Tests: ${frontendSuccessCount}/${frontendTests.length} passed (${frontendSuccessRate.toFixed(2)}%)`);
  console.log(`Overall: ${totalSuccessCount}/${totalTests} passed (${totalSuccessRate.toFixed(2)}%)`);
  console.log('\nTests completed at:', new Date().toLocaleString());
  
  return {
    results,
    summary: {
      api: { total: apiTests.length, passed: apiSuccessCount, rate: apiSuccessRate },
      frontend: { total: frontendTests.length, passed: frontendSuccessCount, rate: frontendSuccessRate },
      overall: { total: totalTests, passed: totalSuccessCount, rate: totalSuccessRate }
    }
  };
}

// If this file is run directly, execute the tests
if (require.main === module) {
  runAllTests()
    .then(results => {
      // Exit with appropriate code based on test results
      process.exit(results.summary.overall.passed === results.summary.overall.total ? 0 : 1);
    })
    .catch(error => {
      console.error('Error running tests:', error);
      process.exit(1);
    });
}
