import { Card } from '@/components/ui';
import CategoryGrid from '@/components/CategoryGrid';
import CardSlider from '@/components/CardSlider';
import FeaturedTools from '@/components/FeaturedTools';
import Link from 'next/link';

// Dummy data - Pastel gradients with hashtags
const dummyFeaturedTools = [
    {
        id: 1,
        title: 'Figma Design System',
        description: 'Complete design system with components, tokens, and guidelines for modern interfaces.',
        tags: ['figma', 'ui-kits', 'free', 'design-system', 'ui-design'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    },
    {
        id: 2,
        title: 'Color Palette Generator',
        description: 'AI-powered tool to generate beautiful color palettes for your next design project.',
        tags: ['colors', 'design-tools', 'ai', 'free', 'web'],
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
    {
        id: 3,
        title: 'Icon Library Pro',
        description: 'Over 10,000 customizable icons in multiple styles. Perfect for web and mobile apps.',
        tags: ['icons', 'premium', 'ui-design', 'web', 'mobile'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    },
];

const dummyLatestResources = [
    {
        id: 4,
        title: 'Typography Insights',
        description: 'Learn the fundamentals of typography and how to use fonts effectively in design.',
        tags: ['typography', 'tutorial', 'free', 'beginner'],
        gradient: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
    },
    {
        id: 5,
        title: 'Wireframe Kit',
        description: 'Professional wireframing kit with ready-made components for rapid prototyping.',
        tags: ['prototyping', 'sketch', 'free', 'ui-kits', 'template'],
        gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    },
    {
        id: 6,
        title: 'Animation Toolkit',
        description: 'Create stunning micro-interactions and animations with this comprehensive toolkit.',
        tags: ['animation', 'premium', 'ui-design', 'web'],
        gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    },
    {
        id: 7,
        title: 'Responsive Grid System',
        description: 'Modern CSS grid system for building responsive layouts with ease and flexibility.',
        tags: ['web', 'responsive', 'free', 'tutorial'],
        gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    },
    {
        id: 8,
        title: 'Accessibility Checker',
        description: 'Ensure your designs meet WCAG standards with this comprehensive accessibility tool.',
        tags: ['accessibility', 'design-tools', 'free'],
        gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    },
    {
        id: 9,
        title: 'Design Tokens Kit',
        description: 'Manage and sync design tokens across platforms for consistent design systems.',
        tags: ['design-tools', 'freemium', 'ui-design'],
        gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    },
];

const dummyAITools = [
    {
        id: 10,
        title: 'AI Image Generator',
        description: 'Generate stunning images from text descriptions using advanced AI technology.',
        tags: ['ai', 'freemium', 'design-tools', 'illustration'],
        gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    },
    {
        id: 11,
        title: 'Smart Color Picker',
        description: 'AI-powered color palette suggestions based on your design context and mood.',
        tags: ['ai', 'colors', 'free', 'design-tools'],
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    },
    {
        id: 12,
        title: 'Content Writer AI',
        description: 'Generate engaging copy and content for your designs with AI assistance.',
        tags: ['ai', 'premium', 'design-tools'],
        gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    },
];

export default function Home() {

    return (
        <div className="container">
            {/* Hero Section */}
            <div className="hero">
                <h1>Discover the Best Design Resources & Tools</h1>
                <p>
                    A growing archive of 1,700+ design resources, frequently updated for the community.
                </p>
            </div>

            {/* Category Menu Cards - toools.design style */}
            <CategoryGrid />

            {/* Featured Tools Section */}
            <div className="section-header">
                <h2 className="section-title">Featured Tools</h2>
                <Link href="/resources" className="view-all-link">
                    View All →
                </Link>
            </div>
            <FeaturedTools />

            {/* Latest Resources Section */}
            <div className="section-header">
                <h2 className="section-title">Latest Resources</h2>
                <Link href="/resources?sort=latest" className="view-all-link">
                    View All →
                </Link>
            </div>
            <CardSlider items={dummyLatestResources} />

            {/* Featured AI Tools Section */}
            <div className="section-header">
                <h2 className="section-title">Featured AI Tools</h2>
                <Link href="/resources?category=ai" className="view-all-link">
                    View All →
                </Link>
            </div>
            <CardSlider items={dummyAITools} />
        </div>
    );
}
