'use client';

import { useState } from 'react';
import { Card } from '@/components/ui';

// Dummy resources with pastel gradients
const allDummyResources = [
    // UI Kits
    {
        id: 1,
        title: 'Figma Design System',
        description: 'Complete design system with components, tokens, and guidelines for modern interfaces.',
        tags: ['figma', 'ui-kits', 'free'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        category: 'ui-kits',
    },
    {
        id: 2,
        title: 'Mobile UI Kit Pro',
        description: 'Professional mobile app UI kit with 200+ screens and components.',
        tags: ['mobile', 'ui-kits', 'premium'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        category: 'ui-kits',
    },
    // Icons
    {
        id: 3,
        title: 'Icon Library Pro',
        description: 'Over 10,000 customizable icons in multiple styles. Perfect for web and mobile apps.',
        tags: ['icons', 'svg', 'premium'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        category: 'icons',
    },
    {
        id: 4,
        title: 'Minimal Icon Set',
        description: 'Clean and minimal icon set for modern interfaces. 500+ icons included.',
        tags: ['icons', 'minimal', 'free'],
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        category: 'icons',
    },
    // Illustrations
    {
        id: 5,
        title: 'Character Illustrations',
        description: 'Beautiful character illustrations for web and mobile applications.',
        tags: ['illustrations', 'characters', 'free'],
        gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        category: 'illustrations',
    },
    {
        id: 6,
        title: 'Abstract Backgrounds',
        description: 'Modern abstract background illustrations and patterns.',
        tags: ['illustrations', 'backgrounds', 'premium'],
        gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
        category: 'illustrations',
    },
    // Photos
    {
        id: 7,
        title: 'Stock Photo Library',
        description: 'High-quality stock photos for commercial and personal use.',
        tags: ['photos', 'stock', 'free'],
        gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        category: 'photos',
    },
    // Colors
    {
        id: 8,
        title: 'Color Palette Generator',
        description: 'AI-powered tool to generate beautiful color palettes for your next design project.',
        tags: ['colors', 'design-tools', 'ai'],
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        category: 'colors',
    },
    {
        id: 9,
        title: 'Gradient Collection',
        description: 'Curated collection of beautiful gradients for modern designs.',
        tags: ['colors', 'gradients', 'free'],
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        category: 'colors',
    },
    // Typography
    {
        id: 10,
        title: 'Typography Insights',
        description: 'Learn the fundamentals of typography and how to use fonts effectively in design.',
        tags: ['typography', 'guide', 'free'],
        gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
        category: 'typography',
    },
    // Design Tools
    {
        id: 11,
        title: 'Prototyping Tool',
        description: 'Create interactive prototypes with ease. No coding required.',
        tags: ['design-tools', 'prototyping', 'freemium'],
        gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        category: 'design-tools',
    },
    // AI Tools
    {
        id: 12,
        title: 'AI Image Generator',
        description: 'Generate stunning images from text descriptions using advanced AI technology.',
        tags: ['ai', 'images', 'freemium'],
        gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
        category: 'ai',
    },
    // Accessibility
    {
        id: 13,
        title: 'Accessibility Checker',
        description: 'Ensure your designs meet WCAG standards with this comprehensive accessibility tool.',
        tags: ['accessibility', 'design-tools', 'free'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        category: 'accessibility',
    },
    // Courses
    {
        id: 14,
        title: 'UI/UX Design Masterclass',
        description: 'Complete course covering all aspects of modern UI/UX design.',
        tags: ['course', 'ui-design', 'premium'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        category: 'courses',
    },
    {
        id: 15,
        title: 'Design System Workshop',
        description: 'Learn to build scalable design systems from scratch.',
        tags: ['course', 'design-system', 'premium'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        category: 'courses',
    },
];

// Filter categories
const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'ui-kits', label: 'UI Kits' },
    { id: 'icons', label: 'Icons' },
    { id: 'illustrations', label: 'Illustrations' },
    { id: 'photos', label: 'Stock Photos' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Color Palettes' },
    { id: 'design-tools', label: 'Design Tools' },
    { id: 'ai', label: 'AI Tools' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'courses', label: 'Courses' },
];

const pricingFilters = [
    { id: 'all', label: 'All' },
    { id: 'free', label: 'Free' },
    { id: 'freemium', label: 'Freemium' },
    { id: 'premium', label: 'Premium' },
];

export default function ResourcesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPricing, setSelectedPricing] = useState('all');

    // Filter resources
    const filteredResources = allDummyResources.filter((resource) => {
        const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
        const pricingMatch = selectedPricing === 'all' || resource.tags.some(tag => tag.toLowerCase() === selectedPricing);
        return categoryMatch && pricingMatch;
    });

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="section-title">All Resources</h1>
                <p className="page-description">
                    Browse our complete collection of design resources, tools, and assets
                </p>
            </div>

            {/* Category Filters */}
            <div className="filters-section">
                <div className="filter-group">
                    <h3 className="filter-label">Category</h3>
                    <div className="filter-bar">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-label">Pricing</h3>
                    <div className="filter-bar">
                        {pricingFilters.map((filter) => (
                            <button
                                key={filter.id}
                                className={`filter-button ${selectedPricing === filter.id ? 'active' : ''}`}
                                onClick={() => setSelectedPricing(filter.id)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="results-count">
                Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
            </div>

            {/* Resources Grid */}
            <div className="grid">
                {filteredResources.map((resource) => (
                    <Card
                        key={resource.id}
                        title={resource.title}
                        description={resource.description}
                        tags={resource.tags}
                        emoji={resource.emoji}
                        gradient={resource.gradient}
                    />
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="empty-state">
                    <p>No resources found matching your filters.</p>
                    <button
                        className="filter-button"
                        onClick={() => {
                            setSelectedCategory('all');
                            setSelectedPricing('all');
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
