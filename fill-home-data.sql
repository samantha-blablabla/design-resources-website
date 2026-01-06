-- Fill Home Page Data
-- AI Tools (Featured)

INSERT INTO resources (title, description, url, category, tags, image_url, gradient, featured, created_at, updated_at)
VALUES
(
  'Midjourney',
  'AI-powered image generation tool that creates stunning visuals from text descriptions. Perfect for concept art, illustrations, and creative exploration.',
  'https://www.midjourney.com',
  'ai-tools',
  ARRAY['AI', 'Image Generation', 'Art'],
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  true,
  NOW(),
  NOW()
),
(
  'ChatGPT',
  'Advanced AI assistant for writing, brainstorming, and problem-solving. Helps designers with copywriting, content creation, and creative ideation.',
  'https://chat.openai.com',
  'ai-tools',
  ARRAY['AI', 'Writing', 'Assistant'],
  'https://images.unsplash.com/photo-1676277791608-b7b6d80c0dbb?w=800',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  true,
  NOW(),
  NOW()
),
(
  'Runway ML',
  'AI-powered video editing and generation platform. Create, edit, and enhance videos with cutting-edge AI tools for motion design.',
  'https://runwayml.com',
  'ai-tools',
  ARRAY['AI', 'Video', 'Motion Design'],
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  true,
  NOW(),
  NOW()
),
(
  'Framer AI',
  'AI-powered website builder that generates responsive sites from text prompts. Perfect for rapid prototyping and web design.',
  'https://www.framer.com/ai',
  'ai-tools',
  ARRAY['AI', 'Web Design', 'Prototyping'],
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  true,
  NOW(),
  NOW()
),
(
  'Adobe Firefly',
  'Adobe''s AI art generator integrated with Creative Cloud. Generate images, text effects, and creative assets with AI.',
  'https://www.adobe.com/products/firefly.html',
  'ai-tools',
  ARRAY['AI', 'Adobe', 'Image Generation'],
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (url) DO UPDATE SET
  featured = EXCLUDED.featured,
  updated_at = NOW();

-- Featured Tools (General)

INSERT INTO resources (title, description, url, category, tags, image_url, gradient, featured, created_at, updated_at)
VALUES
(
  'Figma',
  'Collaborative interface design tool. Create, prototype, and collaborate in real-time with your design team.',
  'https://www.figma.com',
  'ui-kits',
  ARRAY['UI Design', 'Prototyping', 'Collaboration'],
  'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=800',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  true,
  NOW(),
  NOW()
),
(
  'Adobe Creative Cloud',
  'Complete suite of creative tools including Photoshop, Illustrator, InDesign, and more for professional designers.',
  'https://www.adobe.com/creativecloud.html',
  'templates',
  ARRAY['Adobe', 'Design Tools', 'Professional'],
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  true,
  NOW(),
  NOW()
),
(
  'Procreate',
  'Professional digital illustration app for iPad. Perfect for sketching, painting, and creating stunning artwork.',
  'https://procreate.com',
  'brushes',
  ARRAY['Illustration', 'Digital Art', 'iPad'],
  'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (url) DO UPDATE SET
  featured = EXCLUDED.featured,
  updated_at = NOW();

-- Latest Resources (Not Featured)

INSERT INTO resources (title, description, url, category, tags, image_url, gradient, featured, created_at, updated_at)
VALUES
(
  'Modern Gradient Pack',
  'Collection of 50 modern gradient presets for your design projects. Compatible with Photoshop, Illustrator, and Figma.',
  'https://www.gradient-pack-example.com',
  'gradients',
  ARRAY['Gradients', 'Modern', 'Colorful'],
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  false,
  NOW(),
  NOW()
),
(
  'UI Kit Pro 2024',
  'Complete UI kit with 200+ components, ready-to-use templates, and design system for modern web applications.',
  'https://www.uikit-example.com',
  'ui-kits',
  ARRAY['UI Kit', 'Components', 'Web Design'],
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  false,
  NOW(),
  NOW()
),
(
  'Texture Bundle Vol. 3',
  'High-resolution texture pack with organic, grunge, and abstract patterns. Perfect for backgrounds and overlays.',
  'https://www.texture-bundle-example.com',
  'textures',
  ARRAY['Textures', 'High Resolution', 'Backgrounds'],
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  false,
  NOW(),
  NOW()
),
(
  'Icon Set - 500+ Icons',
  'Comprehensive icon collection with 500+ icons in multiple styles. SVG, PNG, and icon font formats included.',
  'https://www.icon-set-example.com',
  'icons',
  ARRAY['Icons', 'SVG', 'UI Elements'],
  'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  false,
  NOW(),
  NOW()
),
(
  'Typography Toolkit',
  'Professional font pairing guide with 100+ combinations and typography templates for modern designs.',
  'https://www.typography-toolkit-example.com',
  'fonts',
  ARRAY['Typography', 'Fonts', 'Pairings'],
  'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  false,
  NOW(),
  NOW()
),
(
  'Mockup Collection 2024',
  'Realistic mockup templates for branding, packaging, and product presentation. Fully editable PSD files.',
  'https://www.mockup-collection-example.com',
  'mockups',
  ARRAY['Mockups', 'Branding', 'Presentation'],
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  false,
  NOW(),
  NOW()
)
ON CONFLICT (url) DO NOTHING;
