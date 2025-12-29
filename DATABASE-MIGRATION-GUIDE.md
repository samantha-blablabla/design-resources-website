# Database Migration Guide - Add Video Metadata Columns

## What This Does

Adds new columns to the `resources` table to support YouTube video metadata:
- `channel_name` - YouTube channel name (e.g., "DesignCourse")
- `thumbnail_url` - YouTube thumbnail image URL
- `published_at` - Original YouTube publish date
- `duration` - Video duration (e.g., "12:34")

## How to Apply Migration

### Option 1: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `design-resources-website`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the SQL below:

```sql
-- Add video metadata columns to resources table
ALTER TABLE resources
ADD COLUMN IF NOT EXISTS channel_name TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS duration TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_channel_name ON resources(channel_name);
CREATE INDEX IF NOT EXISTS idx_resources_published_at ON resources(published_at);

-- Add comments
COMMENT ON COLUMN resources.channel_name IS 'YouTube channel name for video tutorials';
COMMENT ON COLUMN resources.thumbnail_url IS 'YouTube thumbnail URL for video tutorials';
COMMENT ON COLUMN resources.published_at IS 'Original publish date from YouTube';
COMMENT ON COLUMN resources.duration IS 'Video duration in format MM:SS or H:MM:SS';
```

6. Click **Run** or press `Ctrl+Enter`
7. You should see: `Success. No rows returned`

### Option 2: Use the SQL File

The SQL migration file is located at:
```
supabase/migrations/add-video-metadata-columns.sql
```

Copy the contents and run in Supabase SQL Editor.

## After Migration

Once the columns are added, run the YouTube fetch script to populate videos:

```bash
npx tsx scripts/fetch-youtube-videos.ts
```

This will fetch videos from these channels with all metadata:
- The Futur
- DesignCourse
- Flux Academy
- Jesse Showalter
- Charli Marie

## Verify Migration

To verify the columns were added successfully:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'resources'
  AND column_name IN ('channel_name', 'thumbnail_url', 'published_at', 'duration');
```

You should see all 4 columns listed.

## Automated Daily Updates

The cron job at `/api/cron/daily-update` will automatically fetch new videos daily at 9AM UTC with these metadata fields.

Configured in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-update",
      "schedule": "0 9 * * *"
    }
  ]
}
```
