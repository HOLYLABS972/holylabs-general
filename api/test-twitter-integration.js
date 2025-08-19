const fetch = require('node-fetch');

class TwitterIntegrationTester {
  constructor(baseURL = 'http://localhost:3001') {
    this.baseURL = baseURL;
  }

  // Test the health endpoint
  async testHealth() {
    console.log('🏥 Testing health endpoint...');
    try {
      const response = await fetch(`${this.baseURL}/api/twitter-to-blog/health`);
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Health check passed');
        console.log('   Status:', data.status);
        console.log('   Message:', data.message);
        return true;
      } else {
        console.log('❌ Health check failed');
        console.log('   Status:', response.status);
        console.log('   Response:', data);
        return false;
      }
    } catch (error) {
      console.log('❌ Health check error:', error.message);
      return false;
    }
  }

  // Test Twitter URL processing
  async testTwitterProcessing(twitterUrl, options = {}) {
    console.log(`🐦 Testing Twitter URL processing: ${twitterUrl}`);
    
    const payload = {
      twitterUrl,
      language: options.language || 'en',
      publishImmediately: options.publishImmediately || false
    };

    try {
      const response = await fetch(`${this.baseURL}/api/twitter-to-blog/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Twitter processing successful');
        console.log('   Blog ID:', data.data.id);
        console.log('   Title (EN):', data.data.title.en);
        console.log('   Title (HE):', data.data.title.he);
        console.log('   Status:', data.data.status);
        console.log('   URL:', data.data.url);
        
        if (data.data.sourceThread) {
          console.log('   Source Thread:');
          console.log('     Username:', data.data.sourceThread.username);
          console.log('     Tweet Count:', data.data.sourceThread.tweetCount);
        }
        
        return { success: true, data: data.data };
      } else {
        console.log('❌ Twitter processing failed');
        console.log('   Status:', response.status);
        console.log('   Error:', data.error);
        console.log('   Message:', data.message);
        return { success: false, error: data };
      }
    } catch (error) {
      console.log('❌ Twitter processing error:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Test Make.com webhook simulation
  async simulateMakeWebhook(twitterUrl) {
    console.log('🔗 Simulating Make.com webhook...');
    
    // Simulate the exact payload that Make.com would send
    const makePayload = {
      twitterUrl: twitterUrl,
      language: 'en',
      publishImmediately: false,
      // Additional Make.com metadata
      source: 'facebook-messenger',
      timestamp: new Date().toISOString(),
      userId: 'test-user-123'
    };

    // Add Make.com style headers
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Make.com',
      'X-Make-Hook-Signature': 'test-signature',
      'X-Forwarded-For': '192.168.1.1'
    };

    try {
      const response = await fetch(`${this.baseURL}/api/twitter-to-blog/webhook`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(makePayload)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Make.com webhook simulation successful');
        console.log('   Response:', data.message);
        return { success: true, data: data.data };
      } else {
        console.log('❌ Make.com webhook simulation failed');
        console.log('   Error:', data.error);
        return { success: false, error: data };
      }
    } catch (error) {
      console.log('❌ Make.com webhook simulation error:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Test various Twitter URL formats
  async testVariousUrlFormats() {
    console.log('🔗 Testing various Twitter URL formats...');
    
    const testUrls = [
      'https://twitter.com/elonmusk/status/1234567890123456789',
      'https://x.com/openai/status/9876543210987654321',
      'https://mobile.twitter.com/github/status/1111111111111111111',
      'https://www.x.com/vercel/status/2222222222222222222',
      'https://twitter.com/holylabs/statuses/3333333333333333333'
    ];

    const results = [];
    
    for (const url of testUrls) {
      console.log(`\n  Testing: ${url}`);
      const result = await this.testTwitterProcessing(url);
      results.push({ url, ...result });
      
      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n📊 URL Format Test Results:');
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.success ? '✅' : '❌'} ${result.url}`);
      if (!result.success) {
        console.log(`     Error: ${result.error.error || result.error}`);
      }
    });

    return results;
  }

  // Test invalid URLs
  async testInvalidUrls() {
    console.log('🚫 Testing invalid URLs...');
    
    const invalidUrls = [
      'https://facebook.com/some/page',
      'https://instagram.com/user',
      'not-a-url-at-all',
      'https://twitter.com/user', // Missing status
      'https://x.com/', // Empty
    ];

    for (const url of invalidUrls) {
      console.log(`\n  Testing invalid URL: ${url}`);
      const result = await this.testTwitterProcessing(url);
      
      if (!result.success) {
        console.log(`  ✅ Correctly rejected: ${result.error.error || result.error}`);
      } else {
        console.log(`  ❌ Should have been rejected but wasn't`);
      }
    }
  }

  // Test bilingual content generation
  async testBilingualGeneration() {
    console.log('🌐 Testing bilingual content generation...');
    
    const testUrl = 'https://twitter.com/testuser/status/1234567890123456789';
    
    // Test English
    console.log('  Testing English generation...');
    const enResult = await this.testTwitterProcessing(testUrl, { language: 'en' });
    
    // Test Hebrew
    console.log('  Testing Hebrew generation...');
    const heResult = await this.testTwitterProcessing(testUrl, { language: 'he' });
    
    if (enResult.success && heResult.success) {
      console.log('✅ Bilingual generation successful');
      console.log('   EN Title:', enResult.data.title.en);
      console.log('   HE Title:', heResult.data.title.he);
    } else {
      console.log('❌ Bilingual generation failed');
    }

    return { english: enResult, hebrew: heResult };
  }

  // Run comprehensive test suite
  async runComprehensiveTests() {
    console.log('🧪 Starting comprehensive Twitter integration tests\n');
    
    const testResults = {
      health: false,
      basicProcessing: false,
      makeWebhook: false,
      urlFormats: [],
      bilingual: false,
      startTime: new Date(),
      endTime: null
    };

    try {
      // 1. Health check
      testResults.health = await this.testHealth();
      
      if (!testResults.health) {
        console.log('\n❌ Health check failed. Stopping tests.');
        return testResults;
      }

      console.log('\n' + '='.repeat(50));
      
      // 2. Basic Twitter processing
      const basicResult = await this.testTwitterProcessing(
        'https://twitter.com/testuser/status/1234567890123456789'
      );
      testResults.basicProcessing = basicResult.success;

      console.log('\n' + '='.repeat(50));
      
      // 3. Make.com webhook simulation
      const makeResult = await this.simulateMakeWebhook(
        'https://x.com/anotheruser/status/9876543210987654321'
      );
      testResults.makeWebhook = makeResult.success;

      console.log('\n' + '='.repeat(50));
      
      // 4. URL format tests
      testResults.urlFormats = await this.testVariousUrlFormats();

      console.log('\n' + '='.repeat(50));
      
      // 5. Invalid URL tests
      await this.testInvalidUrls();

      console.log('\n' + '='.repeat(50));
      
      // 6. Bilingual tests
      const bilingualResult = await this.testBilingualGeneration();
      testResults.bilingual = bilingualResult.english.success && bilingualResult.hebrew.success;

      testResults.endTime = new Date();
      
      // Final summary
      console.log('\n' + '='.repeat(50));
      console.log('📋 TEST SUMMARY');
      console.log('='.repeat(50));
      console.log(`✅ Health Check: ${testResults.health ? 'PASS' : 'FAIL'}`);
      console.log(`✅ Basic Processing: ${testResults.basicProcessing ? 'PASS' : 'FAIL'}`);
      console.log(`✅ Make.com Webhook: ${testResults.makeWebhook ? 'PASS' : 'FAIL'}`);
      console.log(`✅ URL Formats: ${testResults.urlFormats.filter(r => r.success).length}/${testResults.urlFormats.length} PASS`);
      console.log(`✅ Bilingual Support: ${testResults.bilingual ? 'PASS' : 'FAIL'}`);
      
      const duration = testResults.endTime - testResults.startTime;
      console.log(`⏱️  Total Duration: ${duration}ms`);
      
      const allPassed = testResults.health && testResults.basicProcessing && 
                       testResults.makeWebhook && testResults.bilingual;
      
      if (allPassed) {
        console.log('\n🎉 All tests passed! Your Twitter integration is ready.');
        console.log('\nNext steps:');
        console.log('1. Deploy the API to your hosting platform');
        console.log('2. Configure Make.com with your API endpoint');
        console.log('3. Set up Facebook Messenger bot');
        console.log('4. Test with real Twitter URLs');
      } else {
        console.log('\n⚠️  Some tests failed. Please check the logs above.');
      }

    } catch (error) {
      console.log('\n❌ Test suite error:', error.message);
    }

    return testResults;
  }
}

// Run tests if this file is executed directly
async function main() {
  const args = process.argv.slice(2);
  const baseURL = args[0] || 'http://localhost:3001';
  
  console.log(`🚀 Twitter Integration Tester`);
  console.log(`📡 API Base URL: ${baseURL}`);
  console.log('=' .repeat(50));

  const tester = new TwitterIntegrationTester(baseURL);
  
  if (args.includes('--health-only')) {
    await tester.testHealth();
  } else if (args.includes('--single')) {
    const url = args.find(arg => arg.includes('twitter.com') || arg.includes('x.com'));
    if (url) {
      await tester.testTwitterProcessing(url);
    } else {
      console.log('❌ Please provide a Twitter URL when using --single');
    }
  } else {
    await tester.runComprehensiveTests();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TwitterIntegrationTester;
