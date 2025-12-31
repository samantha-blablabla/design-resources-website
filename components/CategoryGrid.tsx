'use client';

import {
    Sparks,
    ColorFilter,
    Cube,
    PenTablet,
    Play,
    Book,
    Palette,
    Frame,
    Text,
    ThreeStars,
    Flash,
    Settings,
    MediaImage,
    ColorWheel,
    Brain
} from 'iconoir-react';

// 16 categories matching Resources page structure + AI Tools
const categories = [
    // AI Tools - FIRST CATEGORY
    {
        id: 0,
        title: 'AI Tools',
        icon: Brain,
        href: '/resources?category=ai-tools',
    },

    // Graphic Design Resources (matching Resources page)
    {
        id: 1,
        title: 'Brushes',
        icon: PenTablet,
        href: '/resources?category=brushes',
    },
    {
        id: 2,
        title: 'Gradients',
        icon: ColorFilter,
        href: '/resources?category=gradients',
    },
    {
        id: 3,
        title: 'Textures',
        icon: Palette,
        href: '/resources?category=textures',
    },
    {
        id: 4,
        title: 'UI Kits',
        icon: Cube,
        href: '/resources?category=ui-kits',
    },
    {
        id: 5,
        title: 'Icons',
        icon: ThreeStars,
        href: '/resources?category=icons',
    },
    {
        id: 6,
        title: 'Fonts',
        icon: Book,
        href: '/resources?category=fonts',
    },
    {
        id: 7,
        title: 'Mockups',
        icon: Frame,
        href: '/resources?category=mockups',
    },
    {
        id: 8,
        title: 'Text Effects',
        icon: Text,
        href: '/resources?category=text-effects',
    },
    {
        id: 9,
        title: 'Illustrations',
        icon: ColorWheel,
        href: '/resources?category=illustrations',
    },
    {
        id: 10,
        title: 'Templates',
        icon: MediaImage,
        href: '/resources?category=templates',
    },
    {
        id: 11,
        title: '3D Assets',
        icon: Cube,
        href: '/resources?category=3d-assets',
    },
    {
        id: 12,
        title: 'Stock Photos',
        icon: MediaImage,
        href: '/resources?category=stock-photos',
    },

    // Other Pages
    {
        id: 13,
        title: 'Inspiration',
        icon: Sparks,
        href: '/inspiration',
    },
    {
        id: 14,
        title: 'Videos',
        icon: Play,
        href: '/videos',
    },
    {
        id: 15,
        title: 'Actions',
        icon: Flash,
        href: '/resources?category=actions',
    },
];

export default function CategoryGrid() {
    return (
        <div className="category-grid">
            {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                    <a key={category.id} href={category.href} className="category-card">
                        <div className="category-icon">
                            <IconComponent width={24} height={24} strokeWidth={1.5} />
                        </div>
                        <span className="category-title">{category.title}</span>
                    </a>
                );
            })}
        </div>
    );
}
