/**
 * Helper script để convert tags thành hashtags format
 * Run: npx ts-node lib/update-dummy-hashtags.ts
 */

import { generateHashtags } from './ai-categorizer';

// Test hashtag generation
const testCases = [
  {
    title: 'Figma Design System',
    description: 'Complete design system with components, tokens, and guidelines for modern interfaces.',
    category: 'ui-kits'
  },
  {
    title: 'Color Palette Generator',
    description: 'AI-powered tool to generate beautiful color palettes for your next design project.',
    category: 'colors'
  },
  {
    title: 'Modern Landing Page',
    description: 'Stunning landing page design with bold typography and vibrant colors.',
    category: 'web'
  },
  {
    title: 'Figma Auto Layout Tutorial',
    description: 'Master Figma Auto Layout in 15 minutes with this comprehensive guide.',
    category: 'tools'
  },
];

console.log('🏷️  Hashtag Generation Test\n');

testCases.forEach(({ title, description, category }) => {
  const hashtags = generateHashtags(title, description, category);
  console.log(`📝 ${title}`);
  console.log(`   Category: ${category}`);
  console.log(`   Hashtags: ${hashtags.map(h => `#${h}`).join(' ')}`);
  console.log('');
});
