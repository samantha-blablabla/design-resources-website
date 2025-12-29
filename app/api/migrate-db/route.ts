import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    console.log('🔧 Adding video metadata columns...');

    // Execute SQL directly using Supabase client
    const migrations = [
      `ALTER TABLE resources ADD COLUMN IF NOT EXISTS channel_name TEXT`,
      `ALTER TABLE resources ADD COLUMN IF NOT EXISTS thumbnail_url TEXT`,
      `ALTER TABLE resources ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE`,
      `ALTER TABLE resources ADD COLUMN IF NOT EXISTS duration TEXT`,
    ];

    const results = [];
    for (const sql of migrations) {
      const { data, error } = await supabase.rpc('exec_sql', { sql });

      if (error) {
        console.error(`Error executing: ${sql}`, error);
        results.push({ sql, error: error.message });
      } else {
        console.log(`✅ Executed: ${sql}`);
        results.push({ sql, success: true });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migration attempted',
      results,
      note: 'If errors occurred, please add columns manually in Supabase dashboard'
    });

  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        instructions: 'Please add these columns manually in Supabase SQL Editor:\n' +
          '1. channel_name (TEXT)\n' +
          '2. thumbnail_url (TEXT)\n' +
          '3. published_at (TIMESTAMP WITH TIME ZONE)\n' +
          '4. duration (TEXT)\n\n' +
          'Use the SQL file in supabase/migrations/add-video-metadata-columns.sql'
      },
      { status: 500 }
    );
  }
}
