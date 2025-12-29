import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getLogoUrl } from '@/lib/image-fetcher';

// Supabase client với service_role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('🔄 Updating old resources with logo URLs...');

    // Get all resources without image_url
    const { data: resources, error: fetchError } = await supabase
      .from('resources')
      .select('id, url')
      .is('image_url', null);

    if (fetchError) {
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
    }

    let updated = 0;
    let failed = 0;

    for (const resource of resources || []) {
      if (resource.url) {
        const logoUrl = getLogoUrl(resource.url);

        const { error: updateError } = await supabase
          .from('resources')
          .update({ image_url: logoUrl })
          .eq('id', resource.id);

        if (updateError) {
          console.error(`❌ Failed to update resource ${resource.id}:`, updateError);
          failed++;
        } else {
          console.log(`✅ Updated resource ${resource.id} with logo: ${logoUrl}`);
          updated++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      updated,
      failed,
      total: resources?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
