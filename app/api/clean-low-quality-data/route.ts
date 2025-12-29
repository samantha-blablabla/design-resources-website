import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('🧹 Cleaning low quality data...');

    // Delete resources with "Discussion | Link" pattern (low quality)
    const { data: deleted1, error: error1 } = await supabase
      .from('resources')
      .delete()
      .ilike('description', '%Discussion | Link%');

    // Delete resources with very short or generic descriptions
    const { data: deleted2, error: error2 } = await supabase
      .from('resources')
      .delete()
      .or('description.eq.,description.ilike.%Link%,description.ilike.%Discussion%')
      .lt('char_length(description)', 20);

    // Delete Product Hunt items without proper descriptions
    const { data: deleted3, error: error3 } = await supabase
      .from('resources')
      .delete()
      .eq('source', 'Product Hunt')
      .or('title.ilike.%Xteink%,title.ilike.%Alpie%');

    return NextResponse.json({
      success: true,
      message: 'Low quality data cleaned',
      errors: [error1, error2, error3].filter(e => e !== null),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
