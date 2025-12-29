-- =============================================
-- Migration 003: Seed với một vài dummy data để test
-- (OPTIONAL - chỉ để test, có thể skip)
-- Copy và paste toàn bộ file này vào Supabase SQL Editor
-- =============================================

-- Insert sample resources
INSERT INTO resources (title, description, url, category, tags, pricing, emoji, gradient, source, featured) VALUES
('Figma Design System', 'Complete design system with components, tokens, and guidelines for modern interfaces.', 'https://figma.com/resources', 'ui-kits', ARRAY['Figma', 'UI Kit', 'Design System'], 'Free', '🎨', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 'Manual', true),
('Iconoir Icon Library', 'Over 1,400+ free SVG icons for your design projects.', 'https://iconoir.com', 'icons', ARRAY['Icons', 'SVG', 'Open Source'], 'Free', '⭐', 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', 'Manual', true),
('Coolors Palette Generator', 'Generate perfect color palettes for your designs.', 'https://coolors.co', 'colors', ARRAY['Colors', 'Palette', 'Tool'], 'Freemium', '🌈', 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', 'Manual', false)
ON CONFLICT (url) DO NOTHING;

-- Insert sample inspirations
INSERT INTO inspirations (title, description, source_url, category, tags, emoji, gradient, source, featured) VALUES
('Modern Landing Page', 'Stunning landing page design with bold typography and vibrant colors.', 'https://dribbble.com/shots/example-1', 'web', ARRAY['Web Design', 'Landing Page'], '🚀', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', 'Dribbble', true),
('Mobile Banking App', 'Clean and intuitive mobile banking interface with smooth UX.', 'https://dribbble.com/shots/example-2', 'mobile', ARRAY['Mobile', 'Banking', 'FinTech'], '📱', 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', 'Dribbble', false)
ON CONFLICT (source_url) DO NOTHING;

-- Insert sample videos
INSERT INTO videos (title, description, youtube_id, url, channel_name, category, duration, thumbnail_url, emoji, gradient, published_at) VALUES
('Figma Auto Layout Tutorial', 'Master Figma Auto Layout in 15 minutes with this comprehensive guide.', 'dQw4w9WgXcQ', 'https://youtube.com/watch?v=dQw4w9WgXcQ', 'Figma', 'tools', '15:20', 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', '⚡', 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', NOW() - INTERVAL '2 days'),
('Color Theory for Designers', 'Learn the fundamentals of color theory and how to apply it to your designs.', 'example123', 'https://youtube.com/watch?v=example123', 'Design Course', 'fundamentals', '12:34', 'https://i.ytimg.com/vi/example123/maxresdefault.jpg', '🎨', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', NOW() - INTERVAL '5 days')
ON CONFLICT (youtube_id) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, description, url, author, source, category, tags, emoji, gradient, published_at) VALUES
('10 UI Design Principles', 'Essential principles every designer should know for creating user-friendly interfaces.', 'https://medium.com/example-1', 'John Doe', 'Medium', 'ui-ux', ARRAY['UI', 'UX', 'Principles'], '📐', 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', NOW() - INTERVAL '3 days'),
('CSS Grid Layout Guide', 'Complete guide to mastering CSS Grid for modern web layouts.', 'https://css-tricks.com/example-1', 'Jane Smith', 'CSS-Tricks', 'web', ARRAY['CSS', 'Grid', 'Layout'], '🎯', 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', NOW() - INTERVAL '7 days')
ON CONFLICT (url) DO NOTHING;

-- Insert sample crawl log
INSERT INTO crawl_logs (source, table_name, status, items_added, items_updated, items_skipped, started_at, completed_at) VALUES
('Manual Seed', 'resources', 'success', 3, 0, 0, NOW(), NOW()),
('Manual Seed', 'inspirations', 'success', 2, 0, 0, NOW(), NOW()),
('Manual Seed', 'videos', 'success', 2, 0, 0, NOW(), NOW()),
('Manual Seed', 'articles', 'success', 2, 0, 0, NOW(), NOW());

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Dummy data seeded successfully!';
  RAISE NOTICE 'ℹ️  Check your tables to see sample data';
END $$;
