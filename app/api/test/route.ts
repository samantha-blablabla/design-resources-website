/**
 * Backend Test API - Test all automation components
 * Access: http://localhost:3004/api/test
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: {},
  };

  // ==========================================
  // 1. TEST ENVIRONMENT VARIABLES
  // ==========================================
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'YOUTUBE_API_KEY',
    'GROQ_API_KEY',
    'CRON_SECRET',
  ];

  results.tests.envVars = {};
  requiredEnvVars.forEach((varName) => {
    results.tests.envVars[varName] = process.env[varName] ? '✅ Found' : '❌ Missing';
  });

  // ==========================================
  // 2. TEST SUPABASE CONNECTION
  // ==========================================
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  results.tests.supabase = {};
  const tables = ['resources', 'inspirations', 'videos', 'articles', 'crawl_logs'];

  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (error) {
        results.tests.supabase[table] = `❌ ${error.message}`;
      } else {
        results.tests.supabase[table] = `✅ ${count ?? 0} rows`;
      }
    } catch (err: any) {
      results.tests.supabase[table] = `❌ ${err.message}`;
    }
  }

  // ==========================================
  // 3. TEST YOUTUBE API
  // ==========================================
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          channelId: 'UCQsVmhSa4X-G3lHlUtejzLA', // Figma channel
          part: 'snippet',
          order: 'date',
          type: 'video',
          maxResults: 1,
        },
        timeout: 10000,
      }
    );

    if (response.data.items && response.data.items.length > 0) {
      results.tests.youtube = `✅ Working! Found: "${response.data.items[0].snippet.title}"`;
    } else {
      results.tests.youtube = '⚠️  API responded but no videos found';
    }
  } catch (error: any) {
    if (error.response?.data?.error) {
      results.tests.youtube = `❌ ${error.response.data.error.message}`;
    } else {
      results.tests.youtube = `❌ ${error.message}`;
    }
  }

  // ==========================================
  // 4. TEST GROQ AI API
  // ==========================================
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: 'Respond with: "Groq AI is working!"',
          },
        ],
        max_tokens: 20,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    const reply = response.data.choices[0].message.content;
    results.tests.groqAI = `✅ ${reply}`;
  } catch (error: any) {
    if (error.response?.data?.error) {
      results.tests.groqAI = `❌ ${error.response.data.error.message}`;
    } else {
      results.tests.groqAI = `❌ ${error.message}`;
    }
  }

  // ==========================================
  // 5. TEST RSS FEEDS
  // ==========================================
  results.tests.rssFeeds = {};
  const Parser = require('rss-parser');
  const parser = new Parser();

  const testFeeds = [
    { url: 'https://dribbble.com/shots.rss', name: 'Dribbble' },
    { url: 'https://www.producthunt.com/feed', name: 'Product Hunt' },
  ];

  for (const feed of testFeeds) {
    try {
      const result = await parser.parseURL(feed.url);
      results.tests.rssFeeds[feed.name] = `✅ ${result.items.length} items`;
    } catch (err: any) {
      results.tests.rssFeeds[feed.name] = `❌ ${err.message}`;
    }
  }

  // ==========================================
  // SUMMARY
  // ==========================================
  const allTestsPassed =
    Object.values(results.tests.envVars).every((v) => (v as string).startsWith('✅')) &&
    Object.values(results.tests.supabase).every((v) => (v as string).startsWith('✅')) &&
    (results.tests.youtube as string).startsWith('✅') &&
    (results.tests.groqAI as string).startsWith('✅') &&
    Object.values(results.tests.rssFeeds).every((v) => (v as string).startsWith('✅'));

  results.summary = allTestsPassed
    ? '🎉 All tests passed! Backend is ready.'
    : '⚠️  Some tests failed. Check details above.';

  return NextResponse.json(results, { status: 200 });
}
