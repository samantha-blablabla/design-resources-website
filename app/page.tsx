'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui';
import CategoryGrid from '@/components/CategoryGrid';
import CardSlider, { CardSliderRef } from '@/components/CardSlider';
import FeaturedTools from '@/components/FeaturedTools';
import Link from 'next/link';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
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

    // Refs for controlling sliders
    const featuredSliderRef = useRef<CardSliderRef>(null);
    const latestSliderRef = useRef<CardSliderRef>(null);
    const aiSliderRef = useRef<CardSliderRef>(null);

    // Scroll states for arrows
    const [featuredScrollState, setFeaturedScrollState] = useState({ left: false, right: false });
    const [latestScrollState, setLatestScrollState] = useState({ left: false, right: false });
    const [aiScrollState, setAiScrollState] = useState({ left: false, right: false });

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
            <div className="hero hero-animated">
                <div className="hero-particles">
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                    <span className="particle"></span>
                </div>
                <h1 className="hero-title-animated">Discover the Best Design Resources & Tools</h1>
                <p className="hero-text-animated">
                    A growing archive of curated design resources, frequently updated for the community.
                </p>
            </div>

            {/* Category Menu Cards */}
            <div className="fade-in">
                <CategoryGrid />
            </div>

            {/* Featured Tools Section */}
            {!loading && featuredTools.length > 0 && (
                <>
                    <div className="section-header fade-in">
                        <h2 className="section-title">Featured Tools</h2>
                        <Link href="/resources" className="view-all-link">
                            View All →
                        </Link>
                    </div>
                    <div className="fade-in">
                        <CardSlider
                            ref={featuredSliderRef}
                            items={featuredTools}
                            onScrollStateChange={(left, right) => setFeaturedScrollState({ left, right })}
                        />
                    </div>
                    {/* Slider Controls - Below slider */}
                    <div className="slider-controls-row fade-in">
                        <div className="slider-controls">
                            <button
                                className={`slider-arrow ${!featuredScrollState.left ? 'disabled' : ''}`}
                                onClick={() => featuredSliderRef.current?.scrollLeft()}
                                disabled={!featuredScrollState.left}
                                aria-label="Scroll left"
                            >
                                <NavArrowLeft width={20} height={20} strokeWidth={2} />
                            </button>
                            <button
                                className={`slider-arrow ${!featuredScrollState.right ? 'disabled' : ''}`}
                                onClick={() => featuredSliderRef.current?.scrollRight()}
                                disabled={!featuredScrollState.right}
                                aria-label="Scroll right"
                            >
                                <NavArrowRight width={20} height={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </>
            )}

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
                        <CardSlider
                            ref={latestSliderRef}
                            items={latestResources}
                            onScrollStateChange={(left, right) => setLatestScrollState({ left, right })}
                        />
                    </div>
                    {/* Slider Controls - Below slider */}
                    <div className="slider-controls-row fade-in">
                        <div className="slider-controls">
                            <button
                                className={`slider-arrow ${!latestScrollState.left ? 'disabled' : ''}`}
                                onClick={() => latestSliderRef.current?.scrollLeft()}
                                disabled={!latestScrollState.left}
                                aria-label="Scroll left"
                            >
                                <NavArrowLeft width={20} height={20} strokeWidth={2} />
                            </button>
                            <button
                                className={`slider-arrow ${!latestScrollState.right ? 'disabled' : ''}`}
                                onClick={() => latestSliderRef.current?.scrollRight()}
                                disabled={!latestScrollState.right}
                                aria-label="Scroll right"
                            >
                                <NavArrowRight width={20} height={20} strokeWidth={2} />
                            </button>
                        </div>
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
                        <CardSlider
                            ref={aiSliderRef}
                            items={aiTools}
                            onScrollStateChange={(left, right) => setAiScrollState({ left, right })}
                        />
                    </div>
                    {/* Slider Controls - Below slider */}
                    <div className="slider-controls-row fade-in">
                        <div className="slider-controls">
                            <button
                                className={`slider-arrow ${!aiScrollState.left ? 'disabled' : ''}`}
                                onClick={() => aiSliderRef.current?.scrollLeft()}
                                disabled={!aiScrollState.left}
                                aria-label="Scroll left"
                            >
                                <NavArrowLeft width={20} height={20} strokeWidth={2} />
                            </button>
                            <button
                                className={`slider-arrow ${!aiScrollState.right ? 'disabled' : ''}`}
                                onClick={() => aiSliderRef.current?.scrollRight()}
                                disabled={!aiScrollState.right}
                                aria-label="Scroll right"
                            >
                                <NavArrowRight width={20} height={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
