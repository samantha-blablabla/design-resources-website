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
async function checkUrlAccessibility(url: string): Promise<{
  isAccessible: boolean;
  statusCode?: number;
  error?: string;
}> {
  if (!url) {
    return { isAccessible: false, error: 'Empty URL' };
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Consider 2xx and 3xx as accessible
    if (response.ok || (response.status >= 300 && response.status < 400)) {
      return { isAccessible: true, statusCode: response.status };
    }

    return {
      isAccessible: false,
      statusCode: response.status,
      error: `HTTP ${response.status}`
    };
  } catch (error: any) {
    return {
      isAccessible: false,
      error: error.message || 'Network error'
    };
  }
}

/**
 * Check YouTube-specific URL
 */
async function checkYouTubeUrl(url: string): Promise<{
  isAccessible: boolean;
  error?: string;
}> {
  // Extract video ID
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);

  if (!videoIdMatch) {
    return { isAccessible: false, error: 'Invalid YouTube URL' };
  }

  const videoId = videoIdMatch[1];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    const response = await fetch(thumbnailUrl);

    if (!response.ok) {
      return { isAccessible: false, error: 'Video not found or deleted' };
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 1000) {
      return { isAccessible: false, error: 'Video appears to be deleted' };
    }

    return { isAccessible: true };
  } catch (error: any) {
    return { isAccessible: false, error: error.message };
  }
}

/**
 * Smart URL checker - uses appropriate method based on URL type
 */
async function checkResourceUrl(url: string, category: string): Promise<{
  isAccessible: boolean;
  error?: string;
}> {
  // YouTube videos need special handling
  if (category === 'video-tutorials' || url.includes('youtube.com') || url.includes('youtu.be')) {
    return checkYouTubeUrl(url);
  }

  // For other resources, use standard HTTP check
  const result = await checkUrlAccessibility(url);
  return {
    isAccessible: result.isAccessible,
    error: result.error
  };
}

/**
 * Validate all resources in the database
 */
async function validateAllResources() {
  console.log('='.repeat(70));
  console.log('Validating All Resources in Database');
  console.log('This may take several minutes...');
  console.log('='.repeat(70));
  console.log();

  try {
    // Fetch all resources
    const { data: resources, error: fetchError } = await supabase
      .from('resources')
      .select('id, title, url, category, thumbnail_url, image_url')
      .order('category', { ascending: true })
      .order('title', { ascending: true });

    if (fetchError) {
      console.error('Error fetching resources:', fetchError);
      return;
    }

    if (!resources || resources.length === 0) {
      console.log('No resources found in the database.');
      return;
    }

    console.log(`Found ${resources.length} resources to validate\n`);

    const deadResources: any[] = [];
    const aliveResources: any[] = [];
    const categoryCounts: { [key: string]: { total: number; dead: number; alive: number } } = {};

    let checkedCount = 0;

    // Check each resource
    for (const resource of resources) {
      checkedCount++;

      // Initialize category counter
      if (!categoryCounts[resource.category]) {
        categoryCounts[resource.category] = { total: 0, dead: 0, alive: 0 };
      }
      categoryCounts[resource.category].total++;

      console.log(`[${checkedCount}/${resources.length}] ${resource.category} - ${resource.title}`);

      if (!resource.url) {
        console.log(`  ⚠️  No URL provided\n`);
        categoryCounts[resource.category].dead++;
        deadResources.push({ ...resource, reason: 'No URL' });
        continue;
      }

      const result = await checkResourceUrl(resource.url, resource.category);

      if (!result.isAccessible) {
        console.log(`  ✗ DEAD - ${result.error || 'Not accessible'}`);
        console.log(`  URL: ${resource.url}\n`);
        categoryCounts[resource.category].dead++;
        deadResources.push({ ...resource, reason: result.error });
      } else {
        console.log(`  ✓ OK\n`);
        categoryCounts[resource.category].alive++;
        aliveResources.push(resource);
      }

      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Print summary
    console.log('='.repeat(70));
    console.log('Validation Summary by Category:');
    console.log('='.repeat(70));

    Object.entries(categoryCounts).forEach(([category, counts]) => {
      const deadPercentage = ((counts.dead / counts.total) * 100).toFixed(1);
      console.log(`\n${category}:`);
      console.log(`  Total: ${counts.total}`);
      console.log(`  ✓ Alive: ${counts.alive}`);
      console.log(`  ✗ Dead: ${counts.dead} (${deadPercentage}%)`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('Overall Summary:');
    console.log(`  Total resources: ${resources.length}`);
    console.log(`  ✓ Alive: ${aliveResources.length}`);
    console.log(`  ✗ Dead: ${deadResources.length}`);
    console.log('='.repeat(70));

    if (deadResources.length > 0) {
      console.log('\nDead Resources Found:\n');

      // Group by category
      const deadByCategory: { [key: string]: any[] } = {};
      deadResources.forEach(resource => {
        if (!deadByCategory[resource.category]) {
          deadByCategory[resource.category] = [];
        }
        deadByCategory[resource.category].push(resource);
      });

      Object.entries(deadByCategory).forEach(([category, items]) => {
        console.log(`\n${category.toUpperCase()} (${items.length} dead):`);
        items.forEach((resource, index) => {
          console.log(`  ${index + 1}. ${resource.title}`);
          console.log(`     Reason: ${resource.reason}`);
          console.log(`     URL: ${resource.url}`);
          console.log(`     ID: ${resource.id}\n`);
        });
      });

      console.log('='.repeat(70));
      console.log('To remove all dead resources, run:');
      console.log('  npx tsx scripts/remove-all-dead-resources.ts');
      console.log('='.repeat(70));
    } else {
      console.log('\n✓ All resources are accessible!\n');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the script
validateAllResources();
