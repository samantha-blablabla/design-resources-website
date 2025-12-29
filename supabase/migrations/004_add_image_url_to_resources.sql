-- ==========================================
-- Migration: Add image_url column to resources table
-- ==========================================
-- This allows storing thumbnail images for resources
-- (e.g. from Product Hunt, design tool websites, etc.)

ALTER TABLE resources
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN resources.image_url IS 'Optional thumbnail/preview image URL for the resource';
