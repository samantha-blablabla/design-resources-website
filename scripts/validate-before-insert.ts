import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Use service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generate YouTube thumbnail URL from video ID
 */
function generateThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Check if YouTube video is accessible
 */
async function checkYouTubeVideo(url: string): Promise<{
  isValid: boolean;
  videoId: string | null;
  thumbnailUrl: string | null;
  error?: string;
}> {
  // Extract video ID
  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    return {
      isValid: false,
      videoId: null,
      thumbnailUrl: null,
      error: 'Invalid YouTube URL format'
    };
  }

  // Generate thumbnail URL
  const thumbnailUrl = generateThumbnailUrl(videoId);

  try {
    // Check if thumbnail is accessible
    const response = await fetch(thumbnailUrl);

    if (!response.ok) {
      return {
        isValid: false,
        videoId,
        thumbnailUrl,
        error: `Video not accessible (HTTP ${response.status})`
      };
    }

    // Check content length - YouTube placeholder images are usually very small
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 1000) {
      return {
        isValid: false,
        videoId,
        thumbnailUrl,
        error: 'Video appears to be deleted (thumbnail too small)'
      };
    }

    return {
      isValid: true,
      videoId,
      thumbnailUrl
    };
  } catch (error) {
    return {
      isValid: false,
      videoId,
      thumbnailUrl,
      error: `Network error: ${error}`
    };
  }
}

/**
 * Validate a batch of YouTube URLs before inserting into database
 * This function should be called by cron jobs or automation scripts
 */
async function validateYouTubeUrls(urls: string[]): Promise<{
  valid: Array<{ url: string; videoId: string; thumbnailUrl: string }>;
  invalid: Array<{ url: string; error: string }>;
}> {
  console.log(`Validating ${urls.length} YouTube URLs...\n`);

  const valid: Array<{ url: string; videoId: string; thumbnailUrl: string }> = [];
  const invalid: Array<{ url: string; error: string }> = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Checking: ${url}`);

    const result = await checkYouTubeVideo(url);

    if (result.isValid && result.videoId && result.thumbnailUrl) {
      console.log(`  ✓ Valid - Video ID: ${result.videoId}\n`);
      valid.push({
        url,
        videoId: result.videoId,
        thumbnailUrl: result.thumbnailUrl
      });
    } else {
      console.log(`  ✗ Invalid - ${result.error}\n`);
      invalid.push({
        url,
        error: result.error || 'Unknown error'
      });
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return { valid, invalid };
}

/**
 * Main function - example usage
 * This demonstrates how to validate URLs before inserting
 */
async function main() {
  // Example: URLs to validate (in real usage, these would come from your cron job)
  const urlsToValidate = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Valid example
    'https://www.youtube.com/watch?v=INVALID_ID',   // Invalid example
  ];

  console.log('='.repeat(70));
  console.log('YouTube URL Validation Script');
  console.log('This script validates YouTube URLs before database insertion');
  console.log('='.repeat(70));
  console.log();

  const results = await validateYouTubeUrls(urlsToValidate);

  console.log('='.repeat(70));
  console.log('Validation Summary:');
  console.log(`  ✓ Valid URLs: ${results.valid.length}`);
  console.log(`  ✗ Invalid URLs: ${results.invalid.length}`);
  console.log('='.repeat(70));

  if (results.valid.length > 0) {
    console.log('\nValid URLs (safe to insert):');
    results.valid.forEach((item, index) => {
      console.log(`${index + 1}. ${item.url}`);
      console.log(`   Video ID: ${item.videoId}`);
      console.log(`   Thumbnail: ${item.thumbnailUrl}\n`);
    });
  }

  if (results.invalid.length > 0) {
    console.log('\nInvalid URLs (DO NOT INSERT):');
    results.invalid.forEach((item, index) => {
      console.log(`${index + 1}. ${item.url}`);
      console.log(`   Error: ${item.error}\n`);
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('Instructions for Cron Jobs:');
  console.log('1. Import validateYouTubeUrls() function from this script');
  console.log('2. Pass your URLs array to validateYouTubeUrls()');
  console.log('3. Only insert URLs from results.valid into database');
  console.log('4. Log or notify about URLs in results.invalid');
  console.log('='.repeat(70));
}

// Export for use in other scripts
export { validateYouTubeUrls, checkYouTubeVideo };

// Run if executed directly
if (require.main === module) {
  main();
}
