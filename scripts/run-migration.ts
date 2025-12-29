import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🔧 Running database migration...\n');

  const sql = `
-- Add video metadata columns to resources table
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS channel_name TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS duration TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_channel_name ON resources(channel_name);
CREATE INDEX IF NOT EXISTS idx_resources_published_at ON resources(published_at);
  `.trim();

  try {
    // Execute using raw SQL query
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
      console.error('❌ Migration failed via RPC:', error.message);
      console.log('\n📋 Please run this SQL manually in Supabase Dashboard:\n');
      console.log('=' .repeat(60));
      console.log(sql);
      console.log('=' .repeat(60));
      console.log('\n🔗 Go to: https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm/sql/new\n');
    } else {
      console.log('✅ Migration completed successfully!');
      console.log('✅ Added columns: channel_name, thumbnail_url, published_at, duration');
      console.log('✅ Created indexes for better performance');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Please run this SQL manually in Supabase Dashboard:\n');
    console.log('=' .repeat(60));
    console.log(sql);
    console.log('=' .repeat(60));
    console.log('\n🔗 Go to: https://supabase.com/dashboard/project/kmzcbwiqlfdcrqqndglm/sql/new\n');
  }
}

runMigration()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
