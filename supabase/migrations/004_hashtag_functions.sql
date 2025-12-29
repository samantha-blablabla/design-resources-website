-- =============================================
-- Migration 004: Hashtag Functions & Indexes
-- Copy và paste toàn bộ file này vào Supabase SQL Editor
-- =============================================

-- Function: Get trending hashtags across all tables
CREATE OR REPLACE FUNCTION get_trending_hashtags(limit_count INTEGER DEFAULT 20)
RETURNS TABLE(hashtag TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    unnest(tags) as hashtag,
    COUNT(*) as count
  FROM (
    SELECT tags FROM resources WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
    UNION ALL
    SELECT tags FROM inspirations WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
    UNION ALL
    SELECT tags FROM videos WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
    UNION ALL
    SELECT tags FROM articles WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
  ) AS all_tags
  WHERE tags IS NOT NULL
  GROUP BY hashtag
  ORDER BY count DESC, hashtag ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Search by multiple hashtags (AND logic)
CREATE OR REPLACE FUNCTION search_by_hashtags(
  table_name TEXT,
  hashtags TEXT[],
  limit_count INTEGER DEFAULT 50
)
RETURNS SETOF JSONB AS $$
DECLARE
  query TEXT;
BEGIN
  query := format(
    'SELECT to_jsonb(t.*) FROM %I t WHERE tags @> $1 ORDER BY created_at DESC LIMIT $2',
    table_name
  );
  RETURN QUERY EXECUTE query USING hashtags, limit_count;
END;
$$ LANGUAGE plpgsql;

-- Add GIN index for faster hashtag search
CREATE INDEX IF NOT EXISTS idx_resources_tags_gin ON resources USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_inspirations_tags_gin ON inspirations USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_videos_tags_gin ON videos USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_articles_tags_gin ON articles USING GIN (tags);

-- Function: Get related hashtags (hashtags that often appear together)
CREATE OR REPLACE FUNCTION get_related_hashtags(
  input_hashtag TEXT,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE(hashtag TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    unnest(tags) as hashtag,
    COUNT(*) as count
  FROM (
    SELECT tags FROM resources WHERE $1 = ANY(tags)
    UNION ALL
    SELECT tags FROM inspirations WHERE $1 = ANY(tags)
    UNION ALL
    SELECT tags FROM videos WHERE $1 = ANY(tags)
    UNION ALL
    SELECT tags FROM articles WHERE $1 = ANY(tags)
  ) AS related_tags
  WHERE tags IS NOT NULL
    AND unnest(tags) != $1  -- Exclude the input hashtag itself
  GROUP BY hashtag
  ORDER BY count DESC, hashtag ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Get hashtag stats (count per table)
CREATE OR REPLACE FUNCTION get_hashtag_stats(input_hashtag TEXT)
RETURNS TABLE(
  table_name TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'resources'::TEXT, COUNT(*)::BIGINT FROM resources WHERE $1 = ANY(tags)
  UNION ALL
  SELECT 'inspirations'::TEXT, COUNT(*)::BIGINT FROM inspirations WHERE $1 = ANY(tags)
  UNION ALL
  SELECT 'videos'::TEXT, COUNT(*)::BIGINT FROM videos WHERE $1 = ANY(tags)
  UNION ALL
  SELECT 'articles'::TEXT, COUNT(*)::BIGINT FROM articles WHERE $1 = ANY(tags);
END;
$$ LANGUAGE plpgsql;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Hashtag functions created successfully!';
  RAISE NOTICE 'ℹ️  Available functions:';
  RAISE NOTICE '   - get_trending_hashtags(limit)';
  RAISE NOTICE '   - search_by_hashtags(table, hashtags[], limit)';
  RAISE NOTICE '   - get_related_hashtags(hashtag, limit)';
  RAISE NOTICE '   - get_hashtag_stats(hashtag)';
  RAISE NOTICE 'ℹ️  GIN indexes created for faster hashtag search';
END $$;
