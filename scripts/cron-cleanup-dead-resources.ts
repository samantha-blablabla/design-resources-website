#!/usr/bin/env node
/**
 * Cron Job Script: Cleanup Dead Resources
 *
 * This script is designed to run as a scheduled cron job to automatically
 * detect and remove dead resources from the database.
 *
 * Usage:
 *   - As a one-time run: npx tsx scripts/cron-cleanup-dead-resources.ts
 *   - As a cron job: Add to your crontab or deployment platform
 *
 * Recommended Schedule:
 *   - Daily: 0 2 * * * (2 AM daily)
 *   - Weekly: 0 2 * * 0 (2 AM every Sunday)
 *   - Monthly: 0 2 1 * * (2 AM on 1st of month)
 *
 * Environment Variables Required:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local (only in local development)
try {
  const dotenv = await import('dotenv');
  dotenv.config({ path: '.env.local' });
} catch (error) {
  // dotenv not available (e.g., in GitHub Actions), use process.env directly
  console.log('Running without dotenv (using environment variables directly)');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ValidationResult {
  isAccessible: boolean;
  error?: string;
}

// Configuration
const CONFIG = {
  // Maximum concurrent checks to avoid rate limiting
  MAX_CONCURRENT: 5,
  // Delay between checks (ms)
  DELAY_BETWEEN_CHECKS: 300,
  // Request timeout (ms)
  REQUEST_TIMEOUT: 10000,
  // Dry run mode (don't actually delete)
  DRY_RUN: process.env.DRY_RUN === 'true',
};

/**
 * Check YouTube URL accessibility
 */
async function checkYouTubeUrl(url: string): Promise<ValidationResult> {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);

  if (!videoIdMatch) {
    return { isAccessible: false, error: 'Invalid YouTube URL format' };
  }

  const videoId = videoIdMatch[1];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);

    const response = await fetch(thumbnailUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return { isAccessible: false, error: 'Video deleted or unavailable' };
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) < 1000) {
      return { isAccessible: false, error: 'Video appears to be deleted' };
    }

    return { isAccessible: true };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { isAccessible: false, error: 'Request timeout' };
    }
    return { isAccessible: false, error: error.message };
  }
}

/**
 * Check general URL accessibility
 */
async function checkGeneralUrl(url: string): Promise<ValidationResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);

    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ResourceValidator/1.0)'
      }
    });

    clearTimeout(timeout);

    if (response.ok || (response.status >= 300 && response.status < 400)) {
      return { isAccessible: true };
    }

    return { isAccessible: false, error: `HTTP ${response.status}` };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { isAccessible: false, error: 'Request timeout' };
    }
    return { isAccessible: false, error: error.message };
  }
}

/**
 * Smart resource validation
 */
async function validateResource(url: string, category: string): Promise<ValidationResult> {
  if (!url) {
    return { isAccessible: false, error: 'No URL provided' };
  }

  if (category === 'video-tutorials' || url.includes('youtube.com') || url.includes('youtu.be')) {
    return checkYouTubeUrl(url);
  }

  return checkGeneralUrl(url);
}

/**
 * Main cron job function
 */
async function runCleanupJob() {
  const startTime = Date.now();
  console.log('='.repeat(70));
  console.log(`[CRON] Dead Resources Cleanup - ${new Date().toISOString()}`);
  console.log(`[MODE] ${CONFIG.DRY_RUN ? 'DRY RUN (no deletion)' : 'PRODUCTION (will delete)'}`);
  console.log('='.repeat(70));
  console.log();

  try {
    // Fetch all resources
    const { data: resources, error: fetchError } = await supabase
      .from('resources')
      .select('id, title, url, category')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('[ERROR] Failed to fetch resources:', fetchError);
      process.exit(1);
    }

    if (!resources || resources.length === 0) {
      console.log('[INFO] No resources found in database');
      return;
    }

    console.log(`[INFO] Checking ${resources.length} resources...\n`);

    const deadResources: any[] = [];
    const stats = {
      total: resources.length,
      checked: 0,
      alive: 0,
      dead: 0,
      errors: 0,
    };

    // Check each resource
    for (const resource of resources) {
      stats.checked++;

      const result = await validateResource(resource.url, resource.category);

      if (!result.isAccessible) {
        console.log(`[DEAD] ${resource.category} - ${resource.title}`);
        console.log(`       Reason: ${result.error}`);
        console.log(`       URL: ${resource.url}\n`);

        deadResources.push({
          ...resource,
          reason: result.error
        });
        stats.dead++;
      } else {
        stats.alive++;
      }

      // Progress indicator every 10 resources
      if (stats.checked % 10 === 0) {
        console.log(`[PROGRESS] ${stats.checked}/${stats.total} checked...`);
      }

      await new Promise(resolve => setTimeout(resolve, CONFIG.DELAY_BETWEEN_CHECKS));
    }

    console.log('\n' + '='.repeat(70));
    console.log('[SUMMARY] Validation Complete');
    console.log('='.repeat(70));
    console.log(`Total Resources: ${stats.total}`);
    console.log(`✓ Alive: ${stats.alive}`);
    console.log(`✗ Dead: ${stats.dead}`);
    console.log('='.repeat(70));

    // Remove dead resources if not in dry run mode
    if (deadResources.length > 0) {
      console.log();

      if (CONFIG.DRY_RUN) {
        console.log('[DRY RUN] Would delete the following resources:\n');
        deadResources.forEach((r, i) => {
          console.log(`${i + 1}. [${r.category}] ${r.title}`);
          console.log(`   Reason: ${r.reason}`);
          console.log(`   ID: ${r.id}\n`);
        });
      } else {
        console.log('[DELETE] Removing dead resources...\n');

        for (const resource of deadResources) {
          const { error } = await supabase
            .from('resources')
            .delete()
            .eq('id', resource.id);

          if (error) {
            console.log(`[ERROR] Failed to delete: ${resource.title}`);
            console.log(`        ${error.message}\n`);
            stats.errors++;
          } else {
            console.log(`[DELETED] ${resource.title}`);
          }
        }

        console.log('\n' + '='.repeat(70));
        console.log('[DELETION] Summary');
        console.log('='.repeat(70));
        console.log(`✓ Successfully deleted: ${stats.dead - stats.errors}`);
        console.log(`✗ Errors: ${stats.errors}`);
        console.log('='.repeat(70));
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log();
    console.log(`[COMPLETE] Job finished in ${duration}s`);
    console.log('='.repeat(70));

  } catch (error) {
    console.error('[ERROR] Unexpected error:', error);
    process.exit(1);
  }
}

// Run the job
runCleanupJob();
