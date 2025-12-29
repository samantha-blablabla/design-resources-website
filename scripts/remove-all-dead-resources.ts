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
async function checkUrlAccessibility(url: string): Promise<boolean> {
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    return response.ok || (response.status >= 300 && response.status < 400);
  } catch (error) {
    return false;
  }
}

/**
 * Check YouTube-specific URL
 */
async function checkYouTubeUrl(url: string): Promise<boolean> {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  if (!videoIdMatch) return false;

  const videoId = videoIdMatch[1];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    const response = await fetch(thumbnailUrl);
    if (!response.ok) return false;

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 1000) return false;

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Smart URL checker
 */
async function checkResourceUrl(url: string, category: string): Promise<boolean> {
  if (category === 'video-tutorials' || url.includes('youtube.com') || url.includes('youtu.be')) {
    return checkYouTubeUrl(url);
  }
  return checkUrlAccessibility(url);
}

/**
 * Remove all dead resources from database
 */
async function removeAllDeadResources() {
  console.log('='.repeat(70));
  console.log('Removing All Dead Resources from Database');
  console.log('This will permanently delete inaccessible resources.');
  console.log('='.repeat(70));
  console.log();

  try {
    // Fetch all resources
    const { data: resources, error: fetchError } = await supabase
      .from('resources')
      .select('id, title, url, category')
      .order('category', { ascending: true });

    if (fetchError) {
      console.error('Error fetching resources:', fetchError);
      return;
    }

    if (!resources || resources.length === 0) {
      console.log('No resources found in the database.');
      return;
    }

    console.log(`Found ${resources.length} resources to check\n`);

    const deadResources: any[] = [];
    let checkedCount = 0;

    // Check each resource
    for (const resource of resources) {
      checkedCount++;
      console.log(`[${checkedCount}/${resources.length}] ${resource.category} - ${resource.title}`);

      if (!resource.url) {
        console.log(`  ✗ DEAD - No URL provided\n`);
        deadResources.push(resource);
        continue;
      }

      const isAccessible = await checkResourceUrl(resource.url, resource.category);

      if (!isAccessible) {
        console.log(`  ✗ DEAD - Will be removed\n`);
        deadResources.push(resource);
      } else {
        console.log(`  ✓ OK\n`);
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Remove dead resources
    if (deadResources.length > 0) {
      console.log('\n' + '='.repeat(70));
      console.log(`Found ${deadResources.length} dead resources. Removing them now...\n`);

      let removedCount = 0;
      let errorCount = 0;

      for (const resource of deadResources) {
        console.log(`Removing: [${resource.category}] ${resource.title}`);

        const { error } = await supabase
          .from('resources')
          .delete()
          .eq('id', resource.id);

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
      console.log(`  Total dead resources found: ${deadResources.length}`);
      console.log(`  ✓ Successfully removed: ${removedCount}`);
      console.log(`  ✗ Errors: ${errorCount}`);
      console.log('='.repeat(70));

    } else {
      console.log('\n✓ All resources are accessible! No resources to remove.\n');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the script
removeAllDeadResources();
