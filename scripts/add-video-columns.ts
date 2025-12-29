import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addVideoColumns() {
  console.log('🔧 Adding new columns to resources table...\n');

  try {
    // Add channel_name column
    const { error: channelError } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE resources ADD COLUMN IF NOT EXISTS channel_name TEXT;`
    });

    if (channelError) {
      console.log('Note: channel_name column may already exist or needs manual creation');
    } else {
      console.log('✅ Added channel_name column');
    }

    // Add thumbnail_url column
    const { error: thumbnailError } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE resources ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;`
    });

    if (thumbnailError) {
      console.log('Note: thumbnail_url column may already exist or needs manual creation');
    } else {
      console.log('✅ Added thumbnail_url column');
    }

    // Add published_at column
    const { error: publishedError } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE resources ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;`
    });

    if (publishedError) {
      console.log('Note: published_at column may already exist or needs manual creation');
    } else {
      console.log('✅ Added published_at column');
    }

    // Add duration column
    const { error: durationError } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE resources ADD COLUMN IF NOT EXISTS duration TEXT;`
    });

    if (durationError) {
      console.log('Note: duration column may already exist or needs manual creation');
    } else {
      console.log('✅ Added duration column');
    }

    console.log('\n✨ Migration completed!');
    console.log('\nNote: If you see errors above, you may need to add these columns manually in Supabase dashboard:');
    console.log('  - channel_name (TEXT)');
    console.log('  - thumbnail_url (TEXT)');
    console.log('  - published_at (TIMESTAMP WITH TIME ZONE)');
    console.log('  - duration (TEXT)');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Please add these columns manually in Supabase dashboard:');
    console.log('  - channel_name (TEXT)');
    console.log('  - thumbnail_url (TEXT)');
    console.log('  - published_at (TIMESTAMP WITH TIME ZONE)');
    console.log('  - duration (TEXT)');
  }
}

addVideoColumns()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Fatal error:', err);
    process.exit(1);
  });
