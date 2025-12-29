import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const videoTutorials = [
  // DESIGN FUNDAMENTALS
  {
    title: 'Color Theory for Designers - Complete Guide (12:34)',
    description: 'Learn the fundamentals of color theory and how to create stunning color palettes for your designs.',
    url: 'https://www.youtube.com/watch?v=GyVMoejbGFg',
    category: 'video-tutorials',
    tags: ['color-theory', 'fundamentals', 'beginner', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    title: 'Typography Rules: 10 Principles Every Designer Should Know (15:42)',
    description: 'Master typography with these 10 essential principles for better text hierarchy and readability.',
    url: 'https://www.youtube.com/watch?v=QrNi9FmdlxY',
    category: 'video-tutorials',
    tags: ['typography', 'fundamentals', 'principles', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    title: 'Layout Design Principles - Visual Hierarchy Explained (18:23)',
    description: 'Learn how to create effective layouts using visual hierarchy, balance, and composition principles.',
    url: 'https://www.youtube.com/watch?v=a5KYlHNKQB8',
    category: 'video-tutorials',
    tags: ['layout', 'composition', 'visual-hierarchy', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    title: 'Design Principles: Contrast, Repetition, Alignment, Proximity (10:15)',
    description: 'The four fundamental design principles (CRAP) every designer needs to know.',
    url: 'https://www.youtube.com/watch?v=WXzTj9uh8T4',
    category: 'video-tutorials',
    tags: ['principles', 'fundamentals', 'crap', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },

  // FIGMA TUTORIALS
  {
    title: 'Figma Tutorial for Beginners - Complete Course (45:30)',
    description: 'Complete beginner-friendly Figma tutorial covering all essential features and workflows.',
    url: 'https://www.youtube.com/watch?v=HZuk6Wkx_Eg',
    category: 'video-tutorials',
    tags: ['figma', 'tutorial', 'beginner', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    title: 'Figma Auto Layout - Complete Tutorial (28:15)',
    description: 'Master Figma Auto Layout to create responsive and scalable designs efficiently.',
    url: 'https://www.youtube.com/watch?v=TyaGpGDFczw',
    category: 'video-tutorials',
    tags: ['figma', 'auto-layout', 'advanced', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
  },
  {
    title: 'Figma Components & Variants - Best Practices (22:40)',
    description: 'Learn how to create reusable components and variants in Figma for efficient design systems.',
    url: 'https://www.youtube.com/watch?v=y29Xwt9dET0',
    category: 'video-tutorials',
    tags: ['figma', 'components', 'design-system', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  },
  {
    title: 'Figma Prototyping Tutorial - Interactive Designs (19:55)',
    description: 'Create interactive prototypes in Figma with animations, transitions, and smart animate.',
    url: 'https://www.youtube.com/watch?v=P4RF6K5gn6E',
    category: 'video-tutorials',
    tags: ['figma', 'prototyping', 'animation', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },

  // UI/UX DESIGN
  {
    title: 'UI Design Fundamentals - The Complete Guide (32:18)',
    description: 'Essential UI design principles for creating beautiful and user-friendly interfaces.',
    url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
    category: 'video-tutorials',
    tags: ['ui-design', 'fundamentals', 'interface', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  {
    title: 'UX Design Process - From Research to Prototype (41:25)',
    description: 'Complete UX design process including user research, wireframing, and prototyping.',
    url: 'https://www.youtube.com/watch?v=RlQEoJaLQRA',
    category: 'video-tutorials',
    tags: ['ux-design', 'process', 'research', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  },
  {
    title: 'Mobile App UI Design Tutorial - iOS & Android (38:50)',
    description: 'Design beautiful mobile app interfaces for iOS and Android with best practices.',
    url: 'https://www.youtube.com/watch?v=0fYi8SGA20k',
    category: 'video-tutorials',
    tags: ['mobile-design', 'app-design', 'ui', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
  {
    title: 'Design Better Forms - UX Best Practices (16:30)',
    description: 'Learn UX best practices for designing user-friendly forms that convert.',
    url: 'https://www.youtube.com/watch?v=S0lPWXRG2lk',
    category: 'video-tutorials',
    tags: ['forms', 'ux', 'conversion', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  },

  // WEB DESIGN
  {
    title: 'Responsive Web Design - Complete Guide (35:45)',
    description: 'Master responsive web design with modern CSS techniques and best practices.',
    url: 'https://www.youtube.com/watch?v=srvUrASNj0s',
    category: 'video-tutorials',
    tags: ['responsive', 'web-design', 'css', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    title: 'Modern CSS Layout - Grid & Flexbox (29:12)',
    description: 'Learn CSS Grid and Flexbox to create modern, responsive web layouts.',
    url: 'https://www.youtube.com/watch?v=9zBsdzdE4sM',
    category: 'video-tutorials',
    tags: ['css', 'grid', 'flexbox', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
  {
    title: 'Web Animation with CSS & JavaScript (24:38)',
    description: 'Add smooth animations to your websites using CSS animations and JavaScript.',
    url: 'https://www.youtube.com/watch?v=jgw82b5Y2MU',
    category: 'video-tutorials',
    tags: ['animation', 'css', 'javascript', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    title: 'Landing Page Design Tutorial - From Scratch (52:20)',
    description: 'Design a professional landing page from start to finish with conversion-focused design.',
    url: 'https://www.youtube.com/watch?v=aoQ6S1a32j8',
    category: 'video-tutorials',
    tags: ['landing-page', 'web-design', 'conversion', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },

  // DESIGN SYSTEMS & ADVANCED
  {
    title: 'Building a Design System - Complete Guide (48:15)',
    description: 'Learn how to create scalable design systems with components, tokens, and documentation.',
    url: 'https://www.youtube.com/watch?v=Dtd40cHQQlk',
    category: 'video-tutorials',
    tags: ['design-system', 'components', 'tokens', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  {
    title: 'Design Tokens - The Foundation of Design Systems (26:45)',
    description: 'Understand design tokens and how to implement them for consistent design at scale.',
    url: 'https://www.youtube.com/watch?v=wtTstdiBuUk',
    category: 'video-tutorials',
    tags: ['design-tokens', 'design-system', 'advanced', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
  },

  // ACCESSIBILITY
  {
    title: 'Web Accessibility - Complete Guide for Designers (33:50)',
    description: 'Design inclusive and accessible interfaces that work for everyone.',
    url: 'https://www.youtube.com/watch?v=e2nkq3h1P68',
    category: 'video-tutorials',
    tags: ['accessibility', 'wcag', 'inclusive-design', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  },
  {
    title: 'Color Contrast & Accessibility in Design (14:25)',
    description: 'Ensure your designs meet WCAG standards with proper color contrast and accessibility.',
    url: 'https://www.youtube.com/watch?v=Bf7KWXjANxo',
    category: 'video-tutorials',
    tags: ['accessibility', 'color', 'wcag', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },

  // BRANDING & LOGO DESIGN
  {
    title: 'Logo Design Process - From Concept to Final (37:18)',
    description: 'Complete logo design process including research, sketching, and refinement.',
    url: 'https://www.youtube.com/watch?v=RBTiTcHm_ac',
    category: 'video-tutorials',
    tags: ['logo-design', 'branding', 'process', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  {
    title: 'Brand Identity Design - Complete Process (42:30)',
    description: 'Learn how to create complete brand identities from strategy to visual design.',
    url: 'https://www.youtube.com/watch?v=l-S2Y3SF3mM',
    category: 'video-tutorials',
    tags: ['brand-identity', 'branding', 'strategy', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  },

  // CAREER & BUSINESS
  {
    title: 'Design Portfolio Tips - Get Hired as a Designer (21:15)',
    description: 'Build a stunning design portfolio that gets you hired with these proven tips.',
    url: 'https://www.youtube.com/watch?v=u_ikG3145Hs',
    category: 'video-tutorials',
    tags: ['portfolio', 'career', 'hiring', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  },
  {
    title: 'Freelance Design Business - Complete Guide (39:42)',
    description: 'Start and grow your freelance design business with pricing, clients, and workflow tips.',
    url: 'https://www.youtube.com/watch?v=PUSjLHYaJIw',
    category: 'video-tutorials',
    tags: ['freelance', 'business', 'pricing', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  },

  // ADVANCED TECHNIQUES
  {
    title: 'Micro-interactions in UI Design (18:50)',
    description: 'Add delightful micro-interactions to your designs to improve user experience.',
    url: 'https://www.youtube.com/watch?v=CYGOXGk-rTc',
    category: 'video-tutorials',
    tags: ['micro-interactions', 'animation', 'ux', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    title: 'Dark Mode Design - Best Practices (15:33)',
    description: 'Design effective dark mode interfaces with proper contrast and color management.',
    url: 'https://www.youtube.com/watch?v=jmepqJ5UbuM',
    category: 'video-tutorials',
    tags: ['dark-mode', 'ui-design', 'best-practices', 'video'],
    source: 'manual',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
];

async function insertVideoTutorials() {
  console.log('🎬 Starting to insert video tutorials...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const video of videoTutorials) {
    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([video])
        .select();

      if (error) {
        console.error(`❌ Error inserting "${video.title}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Inserted: ${video.title}`);
        successCount++;
      }
    } catch (err) {
      console.error(`❌ Unexpected error inserting "${video.title}":`, err);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully inserted: ${successCount} videos`);
  console.log(`❌ Failed: ${errorCount} videos`);
  console.log(`📦 Total attempted: ${videoTutorials.length} videos`);
  console.log('\n📂 Categories:');
  console.log('   - Design Fundamentals: 4 videos');
  console.log('   - Figma Tools: 4 videos');
  console.log('   - UI/UX Design: 4 videos');
  console.log('   - Web Design: 4 videos');
  console.log('   - Design Systems: 2 videos');
  console.log('   - Accessibility: 2 videos');
  console.log('   - Branding: 2 videos');
  console.log('   - Career: 2 videos');
  console.log('   - Advanced: 2 videos');
}

insertVideoTutorials()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Fatal error:', err);
    process.exit(1);
  });
