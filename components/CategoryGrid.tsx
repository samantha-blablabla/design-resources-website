'use client';

import {
    Sparks,
    BookStack,
    ColorFilter,
    Cube,
    PenTablet,
    Play,
    Book,
    Accessibility,
    Puzzle,
    MouseButtonLeft,
    ColorWheel,
    Text
} from 'iconoir-react';

// Organized categories - grouped by purpose
const categories = [
    // Design Resources Group
    {
        id: 1,
        title: 'UI Kits',
        icon: PenTablet,
        href: '/resources?category=ui-kits',
    },
    {
        id: 2,
        title: 'Icons',
        icon: Cube,
        href: '/resources?category=icons',
    },
    {
        id: 3,
        title: 'Illustrations',
        icon: PenTablet,
        href: '/resources?category=illustrations',
    },
    {
        id: 4,
        title: 'Stock Photos',
        icon: ColorFilter,
        href: '/resources?category=photos',
    },
    {
        id: 5,
        title: 'Typography',
        icon: Text,
        href: '/resources?category=typography',
    },
    {
        id: 6,
        title: 'Color Palettes',
        icon: ColorWheel,
        href: '/resources?category=colors',
    },

    // Inspiration Group
    {
        id: 7,
        title: 'Inspiration',
        icon: BookStack,
        href: '/inspiration',
    },
    // Learning Group
    {
        id: 9,
        title: 'Videos',
        icon: Play,
        href: '/videos',
    },
    {
        id: 10,
        title: 'Courses',
        icon: Book,
        href: '/resources?category=courses',
    },
    {
        id: 11,
        title: 'Articles',
        icon: BookStack,
        href: '/resources?category=articles',
    },

    // Tools Group
    {
        id: 12,
        title: 'Design Tools',
        icon: Puzzle,
        href: '/resources?category=design-tools',
    },
    {
        id: 13,
        title: 'AI Tools',
        icon: Sparks,
        href: '/resources?category=ai',
    },
    {
        id: 14,
        title: 'Accessibility',
        icon: Accessibility,
        href: '/resources?category=accessibility',
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
