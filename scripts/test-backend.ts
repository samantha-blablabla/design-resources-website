/**
 * Backend Test Script - Test all automation components
 * Run: npx ts-node scripts/test-backend.ts
 */

import { createClient } from '@supabase/supabase-js';

console.log('🔍 Starting Backend Test...\n');

// ==========================================
// 1. TEST ENVIRONMENT VARIABLES
// ==========================================
console.log('📋 Step 1: Checking Environment Variables...');

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'YOUTUBE_API_KEY',
  'GROQ_API_KEY',
  'CRON_SECRET',
];

let allEnvVarsPresent = true;
requiredEnvVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`  ✅ ${varName}: Found`);
  } else {
    console.log(`  ❌ ${varName}: MISSING!`);
    allEnvVarsPresent = false;
  }
});

if (!allEnvVarsPresent) {
  console.log('\n❌ Some environment variables are missing. Please check .env.local');
  process.exit(1);
}

console.log('\n✅ All environment variables present!\n');

// ==========================================
// 2. TEST SUPABASE CONNECTION
// ==========================================
console.log('📋 Step 2: Testing Supabase Connection...');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function testSupabase() {
  try {
    // Test connection by querying tables
    const tables = ['resources', 'inspirations', 'videos', 'articles', 'crawl_logs'];

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.log(`  ❌ Table "${table}": ${error.message}`);
      } else {
        console.log(`  ✅ Table "${table}": ${count ?? 0} rows`);
      }
    }

    console.log('\n✅ Supabase connection successful!\n');
  } catch (error: any) {
    console.log(`\n❌ Supabase error: ${error.message}\n`);
    process.exit(1);
  }
}

// ==========================================
// 3. TEST YOUTUBE API
// ==========================================
console.log('📋 Step 3: Testing YouTube API...');

async function testYouTubeAPI() {
  try {
    const axios = require('axios');
    const testChannelId = 'UCQsVmhSa4X-G3lHlUtejzLA'; // Figma channel

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          channelId: testChannelId,
          part: 'snippet',
          order: 'date',
          type: 'video',
          maxResults: 1,
        },
      }
    );

    if (response.data.items && response.data.items.length > 0) {
      console.log(`  ✅ YouTube API working! Found video: "${response.data.items[0].snippet.title}"`);
    } else {
      console.log('  ⚠️  YouTube API responded but no videos found');
    }

    console.log('\n✅ YouTube API test successful!\n');
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.log(`  ❌ YouTube API error: ${error.response.data.error.message}`);
    } else {
      console.log(`  ❌ YouTube API error: ${error.message}`);
    }
    console.log('\n');
  }
}

// ==========================================
// 4. TEST GROQ AI API
// ==========================================
console.log('📋 Step 4: Testing Groq AI API...');

async function testGroqAPI() {
  try {
    const axios = require('axios');

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello, Groq API is working!"',
          },
        ],
        max_tokens: 50,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log(`  ✅ Groq AI response: "${reply}"`);
    console.log('\n✅ Groq AI test successful!\n');
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.log(`  ❌ Groq AI error: ${error.response.data.error.message}`);
    } else {
      console.log(`  ❌ Groq AI error: ${error.message}`);
    }
    console.log('\n');
  }
}

// ==========================================
// 5. TEST RSS FEEDS
// ==========================================
console.log('📋 Step 5: Testing RSS Feeds...');

async function testRSSFeeds() {
  try {
    const Parser = require('rss-parser');
    const parser = new Parser();

    const testFeeds = [
      { url: 'https://dribbble.com/shots.rss', name: 'Dribbble' },
      { url: 'https://www.producthunt.com/feed', name: 'Product Hunt' },
    ];

    for (const feed of testFeeds) {
      try {
        const result = await parser.parseURL(feed.url);
        console.log(`  ✅ ${feed.name}: ${result.items.length} items found`);
      } catch (err: any) {
        console.log(`  ❌ ${feed.name}: ${err.message}`);
      }
    }

    console.log('\n✅ RSS feeds test completed!\n');
  } catch (error: any) {
    console.log(`  ❌ RSS test error: ${error.message}\n`);
  }
}

// ==========================================
// RUN ALL TESTS
// ==========================================
async function runAllTests() {
  await testSupabase();
  await testYouTubeAPI();
  await testGroqAPI();
  await testRSSFeeds();

  console.log('🎉 All backend tests completed!\n');
  console.log('Next steps:');
  console.log('  1. If all tests passed, your backend is ready!');
  console.log('  2. You can now test the cron job endpoint');
  console.log('  3. Deploy to Vercel and it will run automatically\n');
}

runAllTests().catch(console.error);
