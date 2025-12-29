'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import CategoryGrid from '@/components/CategoryGrid';
import CardSlider from '@/components/CardSlider';
import FeaturedTools from '@/components/FeaturedTools';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
    const [featuredTools, setFeaturedTools] = useState<any[]>([]);
    const [latestResources, setLatestResources] = useState<any[]>([]);
    const [aiTools, setAiTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch featured tools (featured resources)
                const { data: featured } = await supabase
                    .from('resources')
                    .select('*')
                    .eq('featured', true)
                    .limit(3);

                // Fetch latest resources (not videos)
                const { data: latest } = await supabase
                    .from('resources')
                    .select('*')
                    .neq('category', 'video-tutorials')
                    .order('created_at', { ascending: false })
                    .limit(6);

                // Fetch AI tools (resources with 'ai' tag)
                const { data: ai } = await supabase
                    .from('resources')
                    .select('*')
                    .contains('tags', ['ai'])
                    .limit(3);

                setFeaturedTools(featured || []);
                setLatestResources(latest || []);
                setAiTools(ai || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container">
            {/* Hero Section */}
            <div className="hero fade-in">
                <h1>Discover the Best Design Resources & Tools</h1>
                <p>
                    A growing archive of curated design resources, frequently updated for the community.
                </p>
            </div>

            {/* Category Menu Cards */}
            <div className="fade-in">
                <CategoryGrid />
            </div>

            {/* Featured Tools Section */}
            <div className="section-header fade-in">
                <h2 className="section-title">Featured Tools</h2>
                <Link href="/resources" className="view-all-link">
                    View All →
                </Link>
            </div>
            <div className="fade-in">
                <FeaturedTools />
            </div>

            {/* Latest Resources Section */}
            {!loading && latestResources.length > 0 && (
                <>
                    <div className="section-header fade-in">
                        <h2 className="section-title">Latest Resources</h2>
                        <Link href="/resources?sort=latest" className="view-all-link">
                            View All →
                        </Link>
                    </div>
                    <div className="fade-in">
                        <CardSlider items={latestResources} />
                    </div>
                </>
            )}

            {/* Featured AI Tools Section */}
            {!loading && aiTools.length > 0 && (
                <>
                    <div className="section-header fade-in">
                        <h2 className="section-title">Featured AI Tools</h2>
                        <Link href="/resources?tag=ai" className="view-all-link">
                            View All →
                        </Link>
                    </div>
                    <div className="fade-in">
                        <CardSlider items={aiTools} />
                    </div>
                </>
            )}
        </div>
    );
}
