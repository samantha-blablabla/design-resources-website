const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://db.kmzcbwiqlfdcrqqndglm.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttemNid2lxbGZkY3JxcW5kZ2xtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTM3NTk3NCwiZXhwIjoyMDUwOTUxOTc0fQ.3SJRzMHI0iVAJl-1nN-LVqSGQ3XhoBwzh67b0nkGLnU'
);

// Sample AI Tools data
const aiTools = [
  {
    title: 'Midjourney',
    description: 'AI-powered image generation tool that creates stunning visuals from text descriptions. Perfect for concept art, illustrations, and creative exploration.',
    url: 'https://www.midjourney.com',
    category: 'ai-tools',
    tags: ['AI', 'Image Generation', 'Art'],
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featured: true,
  },
  {
    title: 'ChatGPT',
    description: 'Advanced AI assistant for writing, brainstorming, and problem-solving. Helps designers with copywriting, content creation, and creative ideation.',
    url: 'https://chat.openai.com',
    category: 'ai-tools',
    tags: ['AI', 'Writing', 'Assistant'],
    image_url: 'https://images.unsplash.com/photo-1676277791608-b7b6d80c0dbb?w=800',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featured: true,
  },
  {
    title: 'Runway ML',
    description: 'AI-powered video editing and generation platform. Create, edit, and enhance videos with cutting-edge AI tools for motion design.',
    url: 'https://runwayml.com',
    category: 'ai-tools',
    tags: ['AI', 'Video', 'Motion Design'],
    image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    featured: true,
  },
  {
    title: 'Framer AI',
    description: 'AI-powered website builder that generates responsive sites from text prompts. Perfect for rapid prototyping and web design.',
    url: 'https://www.framer.com/ai',
    category: 'ai-tools',
    tags: ['AI', 'Web Design', 'Prototyping'],
    image_url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featured: true,
  },
  {
    title: 'Adobe Firefly',
    description: 'Adobe\'s AI art generator integrated with Creative Cloud. Generate images, text effects, and creative assets with AI.',
    url: 'https://www.adobe.com/products/firefly.html',
    category: 'ai-tools',
    tags: ['AI', 'Adobe', 'Image Generation'],
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    featured: true,
  },
];

// Sample Featured Tools (general design tools)
const featuredTools = [
  {
    title: 'Figma',
    description: 'Collaborative interface design tool. Create, prototype, and collaborate in real-time with your design team.',
    url: 'https://www.figma.com',
    category: 'ui-kits',
    tags: ['UI Design', 'Prototyping', 'Collaboration'],
    image_url: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=800',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    featured: true,
  },
  {
    title: 'Adobe Creative Cloud',
    description: 'Complete suite of creative tools including Photoshop, Illustrator, InDesign, and more for professional designers.',
    url: 'https://www.adobe.com/creativecloud.html',
    category: 'templates',
    tags: ['Adobe', 'Design Tools', 'Professional'],
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featured: true,
  },
  {
    title: 'Procreate',
    description: 'Professional digital illustration app for iPad. Perfect for sketching, painting, and creating stunning artwork.',
    url: 'https://procreate.com',
    category: 'brushes',
    tags: ['Illustration', 'Digital Art', 'iPad'],
    image_url: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    featured: true,
  },
];

// Sample Latest Resources
const latestResources = [
  {
    title: 'Modern Gradient Pack',
    description: 'Collection of 50 modern gradient presets for your design projects. Compatible with Photoshop, Illustrator, and Figma.',
    url: 'https://www.gradient-pack-example.com',
    category: 'gradients',
    tags: ['Gradients', 'Modern', 'Colorful'],
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    featured: false,
  },
  {
    title: 'UI Kit Pro 2024',
    description: 'Complete UI kit with 200+ components, ready-to-use templates, and design system for modern web applications.',
    url: 'https://www.uikit-example.com',
    category: 'ui-kits',
    tags: ['UI Kit', 'Components', 'Web Design'],
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    featured: false,
  },
  {
    title: 'Texture Bundle Vol. 3',
    description: 'High-resolution texture pack with organic, grunge, and abstract patterns. Perfect for backgrounds and overlays.',
    url: 'https://www.texture-bundle-example.com',
    category: 'textures',
    tags: ['Textures', 'High Resolution', 'Backgrounds'],
    image_url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    featured: false,
  },
  {
    title: 'Icon Set - 500+ Icons',
    description: 'Comprehensive icon collection with 500+ icons in multiple styles. SVG, PNG, and icon font formats included.',
    url: 'https://www.icon-set-example.com',
    category: 'icons',
    tags: ['Icons', 'SVG', 'UI Elements'],
    image_url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    featured: false,
  },
  {
    title: 'Typography Toolkit',
    description: 'Professional font pairing guide with 100+ combinations and typography templates for modern designs.',
    url: 'https://www.typography-toolkit-example.com',
    category: 'fonts',
    tags: ['Typography', 'Fonts', 'Pairings'],
    image_url: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    featured: false,
  },
  {
    title: 'Mockup Collection 2024',
    description: 'Realistic mockup templates for branding, packaging, and product presentation. Fully editable PSD files.',
    url: 'https://www.mockup-collection-example.com',
    category: 'mockups',
    tags: ['Mockups', 'Branding', 'Presentation'],
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    featured: false,
  },
];

async function fillHomeData() {
  console.log('🚀 Starting to fill Home page data...\n');

  // Insert AI Tools
  console.log('📦 Inserting AI Tools...');
  for (const tool of aiTools) {
    const { error } = await supabase
      .from('resources')
      .upsert(tool, { onConflict: 'url' });

    if (error) {
      console.log(`❌ Error inserting ${tool.title}:`, error.message);
    } else {
      console.log(`✅ Added: ${tool.title}`);
    }
  }

  // Insert Featured Tools
  console.log('\n📦 Inserting Featured Tools...');
  for (const tool of featuredTools) {
    const { error } = await supabase
      .from('resources')
      .upsert(tool, { onConflict: 'url' });

    if (error) {
      console.log(`❌ Error inserting ${tool.title}:`, error.message);
    } else {
      console.log(`✅ Added: ${tool.title}`);
    }
  }

  // Insert Latest Resources
  console.log('\n📦 Inserting Latest Resources...');
  for (const resource of latestResources) {
    const { error } = await supabase
      .from('resources')
      .insert(resource);

    if (error) {
      console.log(`❌ Error inserting ${resource.title}:`, error.message);
    } else {
      console.log(`✅ Added: ${resource.title}`);
    }
  }

  console.log('\n✨ Done! Home page data has been filled.');
  console.log('\n📊 Summary:');
  console.log(`- AI Tools: ${aiTools.length}`);
  console.log(`- Featured Tools: ${featuredTools.length}`);
  console.log(`- Latest Resources: ${latestResources.length}`);
}

fillHomeData().catch(console.error);
