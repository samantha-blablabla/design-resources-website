-- Add video metadata columns to resources table
-- Run this in Supabase SQL Editor

ALTER TABLE resources
ADD COLUMN IF NOT EXISTS channel_name TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS duration TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_channel_name ON resources(channel_name);
CREATE INDEX IF NOT EXISTS idx_resources_published_at ON resources(published_at);

-- Add comment
COMMENT ON COLUMN resources.channel_name IS 'YouTube channel name for video tutorials';
COMMENT ON COLUMN resources.thumbnail_url IS 'YouTube thumbnail URL for video tutorials';
COMMENT ON COLUMN resources.published_at IS 'Original publish date from YouTube';
COMMENT ON COLUMN resources.duration IS 'Video duration in format MM:SS or H:MM:SS';
