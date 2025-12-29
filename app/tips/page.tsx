'use client';

import { useState, useEffect } from 'react';
import { VideoCard } from '@/components/ui';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Dummy video tutorials with pastel gradients - BACKUP ONLY
const allVideoTips = [
    // Design Fundamentals
    {
        id: 1,
        title: 'Color Theory Basics',
        description: 'Learn how to choose and combine colors effectively in your designs.',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        duration: '12:34',
        category: 'fundamentals',
    },
    {
        id: 2,
        title: 'Typography Best Practices',
        description: 'Master the art of typography and create better text hierarchies.',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        duration: '8:45',
        category: 'fundamentals',
    },
    {
        id: 3,
        title: 'Layout & Composition',
        description: 'Learn the principles of effective layout design and visual hierarchy.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        duration: '10:15',
        category: 'fundamentals',
    },
    // Tools & Software
    {
        id: 4,
        title: 'Figma Tips & Tricks',
        description: 'Boost your productivity with these essential Figma shortcuts and features.',
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        duration: '15:20',
        category: 'tools',
    },
    {
        id: 5,
        title: 'Adobe XD Masterclass',
        description: 'Complete guide to designing and prototyping in Adobe XD.',
        gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        duration: '20:30',
        category: 'tools',
    },
    {
        id: 6,
        title: 'Sketch Workflow',
        description: 'Optimize your design workflow in Sketch with plugins and shortcuts.',
        gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
        duration: '14:22',
        category: 'tools',
    },
    // UI/UX Design
    {
        id: 7,
        title: 'UI Design Principles',
        description: 'Essential UI design principles for creating user-friendly interfaces.',
        gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
        duration: '18:40',
        category: 'ui-ux',
    },
    {
        id: 8,
        title: 'UX Research Methods',
        description: 'Learn effective UX research techniques to understand your users better.',
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        duration: '16:55',
        category: 'ui-ux',
    },
    {
        id: 9,
        title: 'Prototyping Basics',
        description: 'Create interactive prototypes to test and validate your design ideas.',
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        duration: '11:30',
        category: 'ui-ux',
    },
    // Web Design
    {
        id: 10,
        title: 'Responsive Design',
        description: 'Design websites that work beautifully on all devices and screen sizes.',
        gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
        duration: '13:45',
        category: 'web',
    },
    {
        id: 11,
        title: 'CSS Grid & Flexbox',
        description: 'Master modern CSS layout techniques for responsive web design.',
        gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        duration: '17:20',
        category: 'web',
    },
    {
        id: 12,
        title: 'Web Animations',
        description: 'Add life to your websites with smooth and engaging animations.',
        gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
        duration: '14:10',
        category: 'web',
    },
    // Advanced Topics
    {
        id: 13,
        title: 'Design Systems',
        description: 'Build scalable design systems for consistent product experiences.',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        duration: '22:15',
        category: 'advanced',
    },
    {
        id: 14,
        title: 'Accessibility in Design',
        description: 'Create inclusive designs that work for everyone.',
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        duration: '19:30',
        category: 'advanced',
    },
    {
        id: 15,
        title: 'Design Handoff',
        description: 'Smooth developer handoff with proper documentation and specs.',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        duration: '12:50',
        category: 'advanced',
    },
];

// Category filters - updated to match tags in database
const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'figma', label: 'Figma' },
    { id: 'ui-design', label: 'UI/UX Design' },
    { id: 'web-design', label: 'Web Design' },
    { id: 'design-system', label: 'Design Systems' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'branding', label: 'Branding' },
    { id: 'career', label: 'Career' },
];

export default function TipsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allVideos, setAllVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch video tutorials from Supabase
    useEffect(() => {
        async function fetchVideos() {
            try {
                const { data, error } = await supabase
                    .from('resources')
                    .select('*')
                    .eq('category', 'video-tutorials')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching videos:', error);
                    setAllVideos(allVideoTips); // Fallback to dummy data
                } else {
                    setAllVideos(data || []);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
                setAllVideos(allVideoTips); // Fallback to dummy data
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    // Filter videos by tag
    const filteredVideos = selectedCategory === 'all'
        ? allVideos
        : allVideos.filter(video => video.tags?.includes(selectedCategory));

    return (
        <div className="container">
            <div className="page-header fade-in">
                <h1 className="section-title">Tips & Tricks</h1>
                <p className="page-description">
                    Learn design tips and tricks through our curated video tutorials and guides
                </p>
            </div>

            {/* Category Filters */}
            <div className="filters-section fade-in">
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
            <div className="results-count fade-in">
                {loading ? 'Loading...' : `Showing ${filteredVideos.length} ${filteredVideos.length === 1 ? 'video' : 'videos'}`}
            </div>

            {/* Videos Grid */}
            {loading ? (
                <div className="empty-state">
                    <p>Loading videos...</p>
                </div>
            ) : (
                <div className="grid fade-in">
                    {filteredVideos.map((video) => (
                        <VideoCard
                            key={video.id}
                            title={video.title}
                            description={video.description}
                            gradient={video.gradient}
                            duration={video.duration}
                            url={video.url}
                            thumbnailUrl={video.image_url || video.thumbnail_url}
                            channelName={video.channel_name}
                            publishedAt={video.published_at}
                        />
                    ))}
                </div>
            )}

            {!loading && filteredVideos.length === 0 && (
                <div className="empty-state">
                    <p>No videos found.</p>
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
