'use client';

import { useState } from 'react';
import { Card } from '@/components/ui';

// Dummy inspiration items with pastel gradients
const allInspirationItems = [
    // Web Design
    {
        id: 1,
        title: 'Modern Landing Page',
        description: 'Stunning landing page design with bold typography and vibrant colors.',
        tags: ['web-design', 'landing-page'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        category: 'web',
    },
    {
        id: 2,
        title: 'E-commerce Homepage',
        description: 'Beautiful e-commerce design with product showcase and smooth navigation.',
        tags: ['web-design', 'ecommerce'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        category: 'web',
    },
    {
        id: 3,
        title: 'Portfolio Website',
        description: 'Creative portfolio design showcasing work with stunning visuals.',
        tags: ['web-design', 'portfolio'],
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        category: 'web',
    },
    // Mobile Design
    {
        id: 4,
        title: 'Mobile App Interface',
        description: 'Clean and intuitive mobile app design with smooth user experience.',
        tags: ['mobile', 'app-design'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        category: 'mobile',
    },
    {
        id: 5,
        title: 'Fitness App UI',
        description: 'Energetic fitness app design with motivating visuals and clear metrics.',
        tags: ['mobile', 'health'],
        gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        category: 'mobile',
    },
    {
        id: 6,
        title: 'Social Media App',
        description: 'Engaging social media interface with focus on content and interactions.',
        tags: ['mobile', 'social'],
        gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
        category: 'mobile',
    },
    // Dashboard & Data
    {
        id: 7,
        title: 'Dashboard Design',
        description: 'Complex data visualization made simple with beautiful dashboard design.',
        tags: ['dashboard', 'data-viz'],
        gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        category: 'dashboard',
    },
    {
        id: 8,
        title: 'Analytics Platform',
        description: 'Comprehensive analytics dashboard with real-time data insights.',
        tags: ['dashboard', 'analytics'],
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        category: 'dashboard',
    },
    {
        id: 9,
        title: 'Project Management',
        description: 'Collaborative project management interface with task tracking.',
        tags: ['dashboard', 'Productivity'],
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        category: 'dashboard',
    },
    // Branding
    {
        id: 10,
        title: 'Brand Identity System',
        description: 'Complete brand identity with logo, colors, and visual guidelines.',
        tags: ['branding', 'Identity'],
        gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
        category: 'branding',
    },
    {
        id: 11,
        title: 'Logo Design Collection',
        description: 'Inspiring logo designs across various industries and styles.',
        tags: ['branding', 'Logo'],
        gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        category: 'branding',
    },
    {
        id: 12,
        title: 'Brand Guidelines',
        description: 'Professional brand guidelines showcasing design system usage.',
        tags: ['branding', 'Guidelines'],
        gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
        category: 'branding',
    },
    // Illustration & Graphics
    {
        id: 13,
        title: 'Illustration Series',
        description: 'Beautiful illustration series with cohesive style and storytelling.',
        tags: ['Illustration', 'Art'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        category: 'illustration',
    },
    {
        id: 14,
        title: '3D Design Showcase',
        description: 'Stunning 3D designs and renders for modern digital projects.',
        tags: ['3D', 'Graphics'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        category: 'illustration',
    },
    {
        id: 15,
        title: 'Motion Graphics',
        description: 'Eye-catching motion graphics and animated design elements.',
        tags: ['Animation', 'Motion'],
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        category: 'illustration',
    },
];

// Category filters
const categories = [
    { id: 'all', label: 'All Inspiration' },
    { id: 'web', label: 'web-design' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'dashboard', label: 'Dashboards' },
    { id: 'branding', label: 'branding' },
    { id: 'illustration', label: 'Illustration' },
];

export default function InspirationPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Filter items
    const filteredItems = selectedCategory === 'all'
        ? allInspirationItems
        : allInspirationItems.filter(item => item.category === selectedCategory);

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="section-title">Inspiration Gallery</h1>
                <p className="page-description">
                    Get inspired by beautiful design examples and creative work from around the web
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
            </div>

            {/* Results Count */}
            <div className="results-count">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </div>

            {/* Gallery Grid - Masonry-style layout */}
            <div className="inspiration-grid">
                {filteredItems.map((item) => (
                    <Card
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        tags={item.tags}
                        emoji={item.emoji}
                        gradient={item.gradient}
                    />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="empty-state">
                    <p>No inspiration items found.</p>
                    <button
                        className="filter-button"
                        onClick={() => setSelectedCategory('all')}
                    >
                        Show All
                    </button>
                </div>
            )}
        </div>
    );
}
