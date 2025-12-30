import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  url?: string;
  category: string;
  tags?: string[];
  image_url?: string;
  type: 'resource' | 'video' | 'inspiration';
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchResources = async () => {
      setLoading(true);
      try {
        const searchTerm = `%${query.toLowerCase()}%`;

        // Search across all resources
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm},tags.cs.{${query.toLowerCase()}}`)
          .limit(10);

        if (error) {
          console.error('Search error:', error);
          setResults([]);
        } else {
          // Map results with type based on category
          const mappedResults: SearchResult[] = (data || []).map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description || '',
            url: item.url,
            category: item.category,
            tags: item.tags,
            image_url: item.image_url,
            type: item.category === 'video-tutorials' ? 'video' :
                  item.category === 'inspiration' ? 'inspiration' : 'resource'
          }));

          setResults(mappedResults);
        }
      } catch (err) {
        console.error('Unexpected search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(searchResources, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { results, loading };
}
