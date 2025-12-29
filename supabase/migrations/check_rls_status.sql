-- =============================================
-- Check RLS Status & Policies
-- Copy và paste vào Supabase SQL Editor để kiểm tra
-- =============================================

-- Check if RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('resources', 'inspirations', 'videos', 'articles', 'crawl_logs')
ORDER BY tablename;

-- Check existing policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename IN ('resources', 'inspirations', 'videos', 'articles', 'crawl_logs')
ORDER BY tablename, policyname;
