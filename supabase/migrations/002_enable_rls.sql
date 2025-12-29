-- =============================================
-- Migration 002: Enable Row Level Security (RLS)
-- Copy và paste toàn bộ file này vào Supabase SQL Editor
-- =============================================

-- Enable RLS on all tables
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspirations ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawl_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public READ access (SELECT)
CREATE POLICY "Allow public read access" ON resources
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON inspirations
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON videos
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON crawl_logs
  FOR SELECT USING (true);

-- Policy: Allow INSERT/UPDATE/DELETE from server (service_role)
-- Cron jobs sẽ dùng service_role key để insert data

CREATE POLICY "Allow service role full access" ON resources
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON inspirations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON videos
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON articles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access" ON crawl_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Row Level Security enabled successfully!';
  RAISE NOTICE 'ℹ️  Public can READ, only service_role can WRITE';
END $$;
