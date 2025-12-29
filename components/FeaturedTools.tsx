'use client';

import { useEffect, useState } from 'react';
import CardSlider from './CardSlider';
import { supabase } from '@/lib/supabase';
import type { Resource } from '@/lib/types';

// Dummy fallback data
const dummyData = [
  {
    id: 1,
    title: 'Loading...',
    description: 'Fetching featured tools from database...',
    tags: ['loading'],
    emoji: '⏳',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
];

export default function FeaturedTools() {
  const [resources, setResources] = useState<any[]>(dummyData);
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
