import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const manualResources = [
  // ICON LIBRARIES
  {
    title: 'Iconoir',
    description: 'Over 1,400+ free SVG icons with a consistent minimal design. Open source and ready to use in your projects.',
    url: 'https://iconoir.com/',
    category: 'icons',
    tags: ['icons', 'svg', 'free', 'open-source'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    title: 'Heroicons',
    description: 'Beautiful hand-crafted SVG icons by the makers of Tailwind CSS. Available in outline and solid styles.',
    url: 'https://heroicons.com/',
    category: 'icons',
    tags: ['icons', 'svg', 'tailwind', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    title: 'Lucide Icons',
    description: 'A community-driven fork of Feather Icons with over 1,000+ icons. Clean, consistent, and customizable.',
    url: 'https://lucide.dev/',
    category: 'icons',
    tags: ['icons', 'svg', 'free', 'react'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    title: 'Tabler Icons',
    description: 'Over 4,500+ free and open source icons designed with attention to detail to make your design stand out.',
    url: 'https://tabler-icons.io/',
    category: 'icons',
    tags: ['icons', 'svg', 'free', 'open-source'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },
  {
    title: 'Phosphor Icons',
    description: 'A flexible icon family for interfaces, diagrams, presentations. Available in multiple weights and styles.',
    url: 'https://phosphoricons.com/',
    category: 'icons',
    tags: ['icons', 'svg', 'free', 'flexible'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },

  // ILLUSTRATIONS
  {
    title: 'unDraw',
    description: 'Free, open-source illustrations for every project. Customize colors to match your brand instantly.',
    url: 'https://undraw.co/',
    category: 'illustrations',
    tags: ['illustrations', 'svg', 'free', 'customizable'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
  },
  {
    title: 'Storyset',
    description: 'Awesome free customizable illustrations for your next project. Edit colors and download in SVG or PNG.',
    url: 'https://storyset.com/',
    category: 'illustrations',
    tags: ['illustrations', 'svg', 'free', 'animated'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  },
  {
    title: 'Blush',
    description: 'Create, mix, and customize illustrations made by artists around the world. Free and premium options.',
    url: 'https://blush.design/',
    category: 'illustrations',
    tags: ['illustrations', 'png', 'free', 'customizable'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
  {
    title: 'Open Doodles',
    description: 'A free set of sketchy illustrations of people. Mix and match to create unique characters.',
    url: 'https://www.opendoodles.com/',
    category: 'illustrations',
    tags: ['illustrations', 'svg', 'free', 'characters'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  {
    title: 'ManyPixels',
    description: 'Free gallery of royalty-free illustrations. Perfect for landing pages, mobile apps, and presentations.',
    url: 'https://www.manypixels.co/gallery',
    category: 'illustrations',
    tags: ['illustrations', 'svg', 'free', 'landing-page'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  },

  // UI KITS & COMPONENTS
  {
    title: 'Shadcn UI',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS. Copy and paste into your apps.',
    url: 'https://ui.shadcn.com/',
    category: 'ui-kits',
    tags: ['ui-components', 'react', 'tailwind', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
  {
    title: 'Flowbite',
    description: 'Free Tailwind CSS component library with over 600+ components. Open source and well documented.',
    url: 'https://flowbite.com/',
    category: 'ui-kits',
    tags: ['ui-components', 'tailwind', 'free', 'open-source'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  },
  {
    title: 'DaisyUI',
    description: 'The most popular component library for Tailwind CSS. Pure CSS, no JavaScript required.',
    url: 'https://daisyui.com/',
    category: 'ui-kits',
    tags: ['ui-components', 'tailwind', 'css', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    title: 'Headless UI',
    description: 'Completely unstyled, accessible UI components by Tailwind Labs. Built for React and Vue.',
    url: 'https://headlessui.com/',
    category: 'ui-kits',
    tags: ['ui-components', 'react', 'vue', 'accessibility'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },

  // COLOR TOOLS
  {
    title: 'Coolors',
    description: 'The super fast color palette generator! Create, save and share perfect palettes in seconds.',
    url: 'https://coolors.co/',
    category: 'colors',
    tags: ['colors', 'palette', 'generator', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    title: 'Color Hunt',
    description: 'Free and open platform for color inspiration with thousands of trendy hand-picked color palettes.',
    url: 'https://colorhunt.co/',
    category: 'colors',
    tags: ['colors', 'palette', 'inspiration', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },
  {
    title: 'Huemint',
    description: 'AI color palette generator using machine learning to create unique color schemes.',
    url: 'https://huemint.com/',
    category: 'colors',
    tags: ['colors', 'ai', 'palette', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    title: 'Realtime Colors',
    description: 'Visualize color palettes on a real website in real-time. Perfect for testing color schemes.',
    url: 'https://www.realtimecolors.com/',
    category: 'colors',
    tags: ['colors', 'preview', 'testing', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
  },
  {
    title: 'Adobe Color',
    description: 'Create color palettes with the color wheel or image, browse thousands of color combinations.',
    url: 'https://color.adobe.com/',
    category: 'colors',
    tags: ['colors', 'palette', 'adobe', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  },

  // TYPOGRAPHY
  {
    title: 'Google Fonts',
    description: 'Making the web more beautiful, fast, and open through great typography. Over 1,400+ font families.',
    url: 'https://fonts.google.com/',
    category: 'typography',
    tags: ['fonts', 'typography', 'free', 'web-fonts'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
  {
    title: 'FontPair',
    description: 'Beautiful Google Font combinations and pairs. Find the perfect font pairing for your design.',
    url: 'https://www.fontpair.co/',
    category: 'typography',
    tags: ['fonts', 'pairing', 'inspiration', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  {
    title: 'Font Joy',
    description: 'Generate font pairings in one click using neural networks. Simple and fast.',
    url: 'https://fontjoy.com/',
    category: 'typography',
    tags: ['fonts', 'pairing', 'ai', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  },
  {
    title: 'Typescale',
    description: 'Create stunning typography scales for web design. Preview and export to CSS.',
    url: 'https://typescale.com/',
    category: 'typography',
    tags: ['typography', 'scale', 'tool', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
  {
    title: 'Fontshare',
    description: 'Free fonts service from Indian Type Foundry. Quality fonts that are free for personal and commercial use.',
    url: 'https://www.fontshare.com/',
    category: 'typography',
    tags: ['fonts', 'free', 'commercial', 'quality'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  },

  // DESIGN TOOLS
  {
    title: 'Remove.bg',
    description: 'Remove image backgrounds 100% automatically in 5 seconds with one click. Perfect for product photos.',
    url: 'https://www.remove.bg/',
    category: 'tools',
    tags: ['image', 'background-removal', 'ai', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    title: 'TinyPNG',
    description: 'Smart PNG and JPEG compression. Reduce file size without losing quality.',
    url: 'https://tinypng.com/',
    category: 'tools',
    tags: ['image', 'compression', 'optimization', 'free'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    title: 'Squoosh',
    description: 'Make images smaller using best-in-class codecs, right in the browser. By Google Chrome Labs.',
    url: 'https://squoosh.app/',
    category: 'tools',
    tags: ['image', 'compression', 'optimization', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    title: 'Photopea',
    description: 'Free online photo editor supporting PSD, XCF, Sketch, XD and CDR formats. Works like Photoshop.',
    url: 'https://www.photopea.com/',
    category: 'tools',
    tags: ['photo-editor', 'psd', 'free', 'online'],
    source: 'manual',
    featured: true,
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },

  // MOCKUPS & TEMPLATES
  {
    title: 'Mockuuups Studio',
    description: 'Drag-and-drop tool to create stunning product mockups. Free and premium mockups available.',
    url: 'https://mockuuups.studio/',
    category: 'mockups',
    tags: ['mockups', 'product', 'presentation', 'free'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    title: 'Shots',
    description: 'Create amazing mockups for your app or website design. Quick and easy to use.',
    url: 'https://shots.so/',
    category: 'mockups',
    tags: ['mockups', 'screenshots', 'free', 'online'],
    source: 'manual',
    featured: false,
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
  },
];

async function insertResources() {
  console.log('🚀 Starting to insert manual resources...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const resource of manualResources) {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([resource])
        .select();

      if (error) {
        console.error(`❌ Error inserting "${resource.title}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Inserted: ${resource.title}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Unexpected error inserting "${resource.title}":`, err);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully inserted: ${successCount} resources`);
  console.log(`❌ Failed: ${errorCount} resources`);
  console.log(`📦 Total attempted: ${manualResources.length} resources`);
  console.log(`⭐ Featured resources: ${manualResources.filter(r => r.featured).length}`);
}

insertResources()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Fatal error:', err);
    process.exit(1);
  });
