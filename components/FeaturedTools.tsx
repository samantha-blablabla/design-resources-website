'use client';

import { useEffect, useState } from 'react';
import CardSlider from './CardSlider';
import { supabase } from '@/lib/supabase';
import type { Resource } from '@/lib/types';

// Dummy fallback data
const dummyFeaturedTools = [
  {
    id: 1,
    title: 'Figma Design System',
    description: 'Complete design system with components, tokens, and guidelines for modern interfaces.',
    tags: ['figma', 'ui-kits', 'free', 'design-system'],
    gradient: 'linear-gradient(135deg, #DBEAFE 0%, #E0E7FF 100%)',
  },
  {
    id: 2,
    title: 'Icon Library Pro',
    description: 'Over 10,000 customizable icons in multiple styles. Perfect for web and mobile apps.',
    tags: ['icons', 'svg', 'premium', 'ui-design'],
    gradient: 'linear-gradient(135deg, #FCE7F3 0%, #F3E8FF 100%)',
  },
  {
    id: 3,
    title: 'Color Palette Generator',
    description: 'AI-powered tool to generate beautiful color palettes for your next design project.',
    tags: ['colors', 'design-tools', 'ai', 'free'],
    gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FFEDD5 100%)',
  },
];

export default function FeaturedTools() {
  const [resources, setResources] = useState<any[]>(dummyFeaturedTools);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('featured', true)
          .limit(10)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          return;
        }

        if (data && data.length > 0) {
          setResources(data);
        }
      } catch (err) {
        console.error('Error fetching resources:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return <CardSlider items={resources} />;
}
