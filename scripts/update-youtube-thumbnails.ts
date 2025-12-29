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
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
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
 * Uses maxresdefault for highest quality, falls back to hqdefault
 */
function generateThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

async function updateYouTubeThumbnails() {
  console.log('Starting YouTube thumbnail update...\n');

  try {
    // Fetch all video tutorial records
    const { data: videos, error: fetchError } = await supabase
      .from('resources')
      .select('id, title, url, thumbnail_url')
      .eq('category', 'video-tutorials');

    if (fetchError) {
      console.error('Error fetching videos:', fetchError);
      return;
    }

    if (!videos || videos.length === 0) {
      console.log('No video tutorials found in the database.');
      return;
    }

    console.log(`Found ${videos.length} video tutorials\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Process each video
    for (const video of videos) {
      console.log(`Processing: ${video.title}`);
      console.log(`  URL: ${video.url}`);

      // Skip if thumbnail already exists
      if (video.thumbnail_url) {
        console.log(`  ✓ Thumbnail already exists, skipping\n`);
        skipCount++;
        continue;
      }

      // Extract video ID
      const videoId = extractYouTubeVideoId(video.url);

      if (!videoId) {
        console.log(`  ✗ Could not extract video ID from URL\n`);
        errorCount++;
        continue;
      }

      // Generate thumbnail URL
      const thumbnailUrl = generateThumbnailUrl(videoId);
      console.log(`  Thumbnail URL: ${thumbnailUrl}`);

      // Update database
      const { error: updateError } = await supabase
        .from('resources')
        .update({ thumbnail_url: thumbnailUrl })
        .eq('id', video.id);

      if (updateError) {
        console.log(`  ✗ Error updating database: ${updateError.message}\n`);
        errorCount++;
        continue;
      }

      console.log(`  ✓ Successfully updated thumbnail\n`);
      successCount++;
    }

    // Summary
    console.log('='.repeat(50));
    console.log('Update Summary:');
    console.log(`  Total videos: ${videos.length}`);
    console.log(`  ✓ Successfully updated: ${successCount}`);
    console.log(`  → Skipped (already exists): ${skipCount}`);
    console.log(`  ✗ Errors: ${errorCount}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the script
updateYouTubeThumbnails();
