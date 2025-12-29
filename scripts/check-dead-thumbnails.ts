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
 * Check if a URL is accessible
 */
async function checkUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok; // Returns true if status is 200-299
  } catch (error) {
    return false;
  }
}

/**
 * Check YouTube video availability by checking thumbnail
 */
async function checkYouTubeThumbnail(thumbnailUrl: string): Promise<boolean> {
  try {
    const response = await fetch(thumbnailUrl);

    // YouTube returns 404 for deleted videos
    if (!response.ok) {
      return false;
    }

    // Check content length - YouTube placeholder images are usually very small
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 1000) {
      // Too small, likely a placeholder for deleted video
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function checkDeadThumbnails() {
  console.log('Starting dead thumbnail check...\n');
  console.log('This may take a few minutes as we check each video...\n');

  try {
    // Fetch all video tutorial records
    const { data: videos, error: fetchError } = await supabase
      .from('resources')
      .select('id, title, url, thumbnail_url')
      .eq('category', 'video-tutorials')
      .order('title');

    if (fetchError) {
      console.error('Error fetching videos:', fetchError);
      return;
    }

    if (!videos || videos.length === 0) {
      console.log('No video tutorials found in the database.');
      return;
    }

    console.log(`Found ${videos.length} video tutorials to check\n`);

    const deadVideos: any[] = [];
    const aliveVideos: any[] = [];
    let checkedCount = 0;

    // Check each video
    for (const video of videos) {
      checkedCount++;
      console.log(`[${checkedCount}/${videos.length}] Checking: ${video.title}`);

      if (!video.thumbnail_url) {
        console.log(`  ⚠️  No thumbnail URL\n`);
        continue;
      }

      const isAlive = await checkYouTubeThumbnail(video.thumbnail_url);

      if (!isAlive) {
        console.log(`  ✗ DEAD - Thumbnail not accessible`);
        console.log(`  URL: ${video.url}`);
        console.log(`  Thumbnail: ${video.thumbnail_url}\n`);
        deadVideos.push(video);
      } else {
        console.log(`  ✓ OK\n`);
        aliveVideos.push(video);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Summary
    console.log('='.repeat(70));
    console.log('Check Summary:');
    console.log(`  Total videos checked: ${videos.length}`);
    console.log(`  ✓ Alive: ${aliveVideos.length}`);
    console.log(`  ✗ Dead: ${deadVideos.length}`);
    console.log('='.repeat(70));

    if (deadVideos.length > 0) {
      console.log('\nDead videos found:\n');
      deadVideos.forEach((video, index) => {
        console.log(`${index + 1}. ${video.title}`);
        console.log(`   ID: ${video.id}`);
        console.log(`   URL: ${video.url}\n`);
      });

      console.log('\nTo remove these dead videos, run:');
      console.log('  npx tsx scripts/remove-dead-videos.ts\n');
    } else {
      console.log('\n✓ All videos are accessible!\n');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the script
checkDeadThumbnails();
