import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required Supabase environment variables');
}

const supabase = createClient(supabaseUrl!, supabaseKey!);

interface ValidationResult {
  isAccessible: boolean;
  error?: string;
  statusCode?: number;
}

async function validateUrl(url: string): Promise<ValidationResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ResourceValidator/1.0)',
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return { isAccessible: true, statusCode: response.status };
    }

    return {
      isAccessible: false,
      error: `HTTP ${response.status}`,
      statusCode: response.status,
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return { isAccessible: false, error: 'Request timeout' };
    }
    return { isAccessible: false, error: error.message };
  }
}

export async function GET(request: NextRequest) {
  // Only allow requests from Vercel Cron Jobs
  // Vercel automatically adds x-vercel-cron: 1 header to cron requests
  const cronHeader = request.headers.get('x-vercel-cron');

  if (cronHeader !== '1') {
    return NextResponse.json({
      error: 'Unauthorized - This endpoint can only be called by Vercel Cron Jobs'
    }, { status: 401 });
  }

  console.log('🧹 Starting cleanup of dead resources...');

  // Fetch all resources from database
  const { data: resources, error: fetchError } = await supabase
    .from('resources')
    .select('id, title, url, category');

  if (fetchError) {
    console.error('❌ Error fetching resources:', fetchError);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }

  if (!resources || resources.length === 0) {
    console.log('ℹ️  No resources found in database');
    return NextResponse.json({ success: true, summary: { total: 0, checked: 0, removed: 0, errors: 0 } });
  }

  console.log(`📊 Found ${resources.length} resources to validate\n`);

  let checkedCount = 0;
  let removedCount = 0;
  let errorCount = 0;
  const deadResources: any[] = [];

  // Validate each resource
  for (const resource of resources) {
    if (!resource.url) {
      console.log(`⚠️  Skipping resource without URL: ${resource.title}`);
      continue;
    }

    checkedCount++;
    console.log(`[${checkedCount}/${resources.length}] Checking: ${resource.title}`);

    const result = await validateUrl(resource.url);

    if (!result.isAccessible) {
      console.log(`  ❌ Dead link detected: ${result.error}`);
      deadResources.push({
        id: resource.id,
        title: resource.title,
        url: resource.url,
        error: result.error,
      });

      // Delete dead resource from database
      const { error: deleteError } = await supabase
        .from('resources')
        .delete()
        .eq('id', resource.id);

      if (deleteError) {
        console.error(`  ⚠️  Failed to delete: ${deleteError.message}`);
        errorCount++;
      } else {
        console.log(`  🗑️  Removed from database`);
        removedCount++;
      }
    } else {
      console.log(`  ✅ OK (${result.statusCode})`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const summary = {
    total: resources.length,
    checked: checkedCount,
    removed: removedCount,
    errors: errorCount,
  };

  console.log('\n' + '='.repeat(60));
  console.log('📊 Cleanup Summary:');
  console.log('='.repeat(60));
  console.log(`📦 Total resources: ${summary.total}`);
  console.log(`✅ Checked: ${summary.checked}`);
  console.log(`🗑️  Removed: ${summary.removed}`);
  console.log(`❌ Errors: ${summary.errors}`);
  console.log('='.repeat(60));

  return NextResponse.json({
    success: true,
    summary,
    deadResources: deadResources.map(r => ({
      title: r.title,
      url: r.url,
      error: r.error,
    })),
  });
}
