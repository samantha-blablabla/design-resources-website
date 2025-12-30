'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { createClient } from '@supabase/supabase-js';
import {
    Sparks, PenTablet, ColorFilter, Cube, Text, ColorWheel,
    Frame, Palette, MouseButtonLeft, Book, Flash, Settings,
    MediaImage, ThreeStars
} from 'iconoir-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Dummy resources with pastel gradients - BACKUP ONLY
const allDummyResources = [
    // Brushes
    {
        id: 1,
        title: 'Watercolor Brush Pack',
        description: 'Professional watercolor brushes for Photoshop and Procreate with 50+ unique styles.',
        tags: ['brushes', 'photoshop', 'procreate'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        category: 'brushes',
    },
    {
        id: 2,
        title: 'Ink Brushes Collection',
        description: 'Realistic ink brushes for digital painting and illustration work.',
        tags: ['brushes', 'illustrator', 'ink'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        category: 'brushes',
    },
    // Gradients
    {
        id: 3,
        title: 'Modern UI Gradients',
        description: 'Collection of 100 modern gradients perfect for web and mobile design.',
        tags: ['gradients', 'ui', 'web'],
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        category: 'gradients',
    },
    {
        id: 4,
        title: 'Vibrant Gradient Pack',
        description: 'Bold and vibrant gradients for eye-catching designs and backgrounds.',
        tags: ['gradients', 'colorful', 'backgrounds'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        category: 'gradients',
    },
    // Textures
    {
        id: 5,
        title: 'Concrete Textures',
        description: 'High-resolution concrete textures for realistic and industrial designs.',
        tags: ['textures', 'concrete', 'industrial'],
        gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        category: 'textures',
    },
    {
        id: 6,
        title: 'Paper Textures Collection',
        description: 'Authentic paper textures for vintage and organic design projects.',
        tags: ['textures', 'paper', 'vintage'],
        gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
        category: 'textures',
    },
    // Patterns
    {
        id: 7,
        title: 'Geometric Patterns',
        description: 'Seamless geometric patterns for modern and minimalist designs.',
        tags: ['patterns', 'geometric', 'seamless'],
        gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        category: 'patterns',
    },
    {
        id: 8,
        title: 'Floral Pattern Pack',
        description: 'Beautiful floral patterns perfect for feminine and elegant designs.',
        tags: ['patterns', 'floral', 'elegant'],
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        category: 'patterns',
    },
    // Mockups
    {
        id: 9,
        title: 'iPhone 15 Pro Mockup',
        description: 'High-quality iPhone mockup with customizable screen and realistic shadows.',
        tags: ['mockups', 'iphone', 'mobile'],
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        category: 'mockups',
    },
    {
        id: 10,
        title: 'MacBook Pro Mockup',
        description: 'Professional MacBook mockup for showcasing web and app designs.',
        tags: ['mockups', 'laptop', 'apple'],
        gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
        category: 'mockups',
    },
    // UI Kits
    {
        id: 11,
        title: 'Dashboard UI Kit',
        description: 'Complete dashboard UI kit with 50+ components for web applications.',
        tags: ['ui-kits', 'dashboard', 'figma'],
        gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        category: 'ui-kits',
    },
    {
        id: 12,
        title: 'Mobile App UI Kit',
        description: 'Comprehensive mobile UI kit with 100+ screens and components.',
        tags: ['ui-kits', 'mobile', 'sketch'],
        gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
        category: 'ui-kits',
    },
    // Text Effects
    {
        id: 13,
        title: 'Gold Text Effects',
        description: 'Luxury gold text effects for Photoshop with 10 premium styles.',
        tags: ['text-effects', 'photoshop', 'gold'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        category: 'text-effects',
    },
    // Icons
    {
        id: 14,
        title: 'Minimal Line Icons',
        description: 'Clean line icon set with 500+ icons in SVG format for any project.',
        tags: ['icons', 'line', 'svg'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        category: 'icons',
    },
    // Fonts
    {
        id: 15,
        title: 'Modern Sans Serif Font',
        description: 'Contemporary sans-serif typeface perfect for web and branding projects.',
        tags: ['fonts', 'typography', 'sans-serif'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        category: 'fonts',
    },
];

// Filter categories for graphic design resources with iconoir-react icons
const categories = [
    { id: 'all', label: 'All Resources', icon: Sparks },
    { id: 'brushes', label: 'Brushes', icon: PenTablet },
    { id: 'gradients', label: 'Gradients', icon: ColorFilter },
    { id: 'textures', label: 'Textures', icon: Palette },
    { id: 'patterns', label: 'Patterns', icon: Frame },
    { id: 'mockups', label: 'Mockups', icon: Frame },
    { id: 'ui-kits', label: 'UI Kits', icon: Cube },
    { id: 'text-effects', label: 'Text Effects', icon: Text },
    { id: 'icons', label: 'Icons', icon: ThreeStars },
    { id: 'fonts', label: 'Fonts', icon: Book },
    { id: 'templates', label: 'Templates', icon: MediaImage },
    { id: 'actions', label: 'Actions', icon: Flash },
    { id: 'presets', label: 'Presets', icon: Settings },
    { id: 'illustrations', label: 'Illustrations', icon: ColorWheel },
    { id: '3d-assets', label: '3D Assets', icon: Cube },
    { id: 'stock-photos', label: 'Stock Photos', icon: MediaImage },
];


export default function ResourcesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allResources, setAllResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch graphic design resources from Supabase
    useEffect(() => {
        async function fetchResources() {
            try {
                const { data, error } = await supabase
                    .from('resources')
                    .select('*')
                    .in('category', [
                        'brushes', 'gradients', 'textures', 'patterns', 'mockups',
                        'ui-kits', 'text-effects', 'icons', 'fonts', 'templates',
                        'actions', 'presets', 'illustrations', '3d-assets', 'stock-photos'
                    ])
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching resources:', error);
                    setAllResources(allDummyResources); // Fallback to dummy data
                } else if (data && data.length > 0) {
                    setAllResources(data);
                } else {
                    // No data yet, use dummy
                    setAllResources(allDummyResources);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                setAllResources(allDummyResources); // Fallback to dummy data
            } finally {
                setLoading(false);
            }
        }

        fetchResources();
    }, []);

    // Filter resources
    const filteredResources = allResources.filter((resource) => {
        return selectedCategory === 'all' || resource.category === selectedCategory;
    });

    return (
        <div className="container">
            <div className="page-header fade-in">
                <h1 className="section-title">Graphic Design Resources</h1>
                <p className="page-description">
                    Free and premium downloadable resources - Brushes, Textures, Mockups, UI Kits, and more
                </p>
            </div>

            {/* Category Filters - Grid Layout */}
            <div className="filters-section fade-in">
                <div className="category-grid">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <div className="category-icon">
                                    <category.icon width={32} height={32} strokeWidth={1.5} />
                                </div>
                                <span className="category-title">{category.label}</span>
                            </button>
                        ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="results-count fade-in">
                {loading ? 'Loading...' : `Showing ${filteredResources.length} ${filteredResources.length === 1 ? 'resource' : 'resources'}`}
            </div>

            {/* Resources Grid */}
            {loading ? (
                <div className="empty-state">
                    <p>Loading resources...</p>
                </div>
            ) : (
                <div className="grid fade-in">
                {filteredResources.map((resource) => (
                    <Card
                        key={resource.id}
                        title={resource.title}
                        description={resource.description}
                        tags={resource.tags}
                        gradient={resource.gradient}
                        imageUrl={resource.image_url}
                        url={resource.url}
                    />
                ))}
            </div>
            )}

            {!loading && filteredResources.length === 0 && (
                <div className="empty-state">
                    <p>No resources found matching your filters.</p>
                    <button
                        className="filter-button"
                        onClick={() => {
                            setSelectedCategory('all');
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
