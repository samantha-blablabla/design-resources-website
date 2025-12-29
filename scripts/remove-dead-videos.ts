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
 * Check if a YouTube thumbnail is accessible
 */
async function checkYouTubeThumbnail(thumbnailUrl: string): Promise<boolean> {
  try {
    const response = await fetch(thumbnailUrl);

    if (!response.ok) {
      return false;
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 1000) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function removeDeadVideos() {
  console.log('Starting dead video removal...\n');
  console.log('This will permanently delete videos with inaccessible thumbnails.\n');

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
    let checkedCount = 0;

    // Check each video
    for (const video of videos) {
      checkedCount++;
      console.log(`[${checkedCount}/${videos.length}] Checking: ${video.title}`);

      if (!video.thumbnail_url) {
        console.log(`  ⚠️  No thumbnail URL, skipping\n`);
        continue;
      }

      const isAlive = await checkYouTubeThumbnail(video.thumbnail_url);

      if (!isAlive) {
        console.log(`  ✗ DEAD - Will be removed\n`);
        deadVideos.push(video);
      } else {
        console.log(`  ✓ OK\n`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Remove dead videos
    if (deadVideos.length > 0) {
      console.log('\n' + '='.repeat(70));
      console.log(`Found ${deadVideos.length} dead videos. Removing them now...\n`);

      let removedCount = 0;
      let errorCount = 0;

      for (const video of deadVideos) {
        console.log(`Removing: ${video.title}`);

        const { error } = await supabase
          .from('resources')
          .delete()
          .eq('id', video.id);

        if (error) {
          console.log(`  ✗ Error: ${error.message}\n`);
          errorCount++;
        } else {
          console.log(`  ✓ Removed\n`);
          removedCount++;
        }
      }

      console.log('='.repeat(70));
      console.log('Removal Summary:');
      console.log(`  Total dead videos found: ${deadVideos.length}`);
      console.log(`  ✓ Successfully removed: ${removedCount}`);
      console.log(`  ✗ Errors: ${errorCount}`);
      console.log('='.repeat(70));

    } else {
      console.log('\n✓ All videos are accessible! No videos to remove.\n');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the script
removeDeadVideos();
