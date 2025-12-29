'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

interface CardSliderProps {
    items: Array<{
        id: number;
        title: string;
        description: string;
        tags: string[];
        emoji?: string;
        gradient: string;
        image_url?: string;
        thumbnail_url?: string;
    }>;
}

// Card wrapper without animation for horizontal scroll
function SliderCard({ item }: { item: any }) {
    return (
        <div className="slider-item">
            <Card
                title={item.title}
                description={item.description}
                tags={item.tags}
                emoji={item.emoji}
                gradient={item.gradient}
                imageUrl={item.image_url || item.thumbnail_url}
                url={item.url || item.source_url}
            />
        </div>
    );
}

export default function CardSlider({ items }: CardSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const updateArrows = () => {
        if (!sliderRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        // Check arrows on mount and window resize
        updateArrows();
        window.addEventListener('resize', updateArrows);

        // Small delay to ensure DOM is fully rendered
        const timer = setTimeout(updateArrows, 100);

        return () => {
            window.removeEventListener('resize', updateArrows);
            clearTimeout(timer);
        };
    }, [items]);

    const scroll = (direction: 'left' | 'right') => {
        if (!sliderRef.current) return;

        const scrollAmount = 400;
        const newScrollLeft =
            direction === 'left'
                ? sliderRef.current.scrollLeft - scrollAmount
                : sliderRef.current.scrollLeft + scrollAmount;

        sliderRef.current.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        updateArrows();
    };

    return (
        <div className="slider-wrapper">
            {/* Slider Track */}
            <div
                ref={sliderRef}
                className="slider-track"
                onScroll={handleScroll}
            >
                {items.map((item) => (
                    <SliderCard key={item.id} item={item} />
                ))}
            </div>

            {/* Navigation Controls - Bottom Right (Desktop only) */}
            <div className="slider-controls">
                <button
                    className={`slider-arrow ${!showLeftArrow ? 'disabled' : ''}`}
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                    disabled={!showLeftArrow}
                >
                    <NavArrowLeft width={20} height={20} strokeWidth={2} />
                </button>
                <button
                    className={`slider-arrow ${!showRightArrow ? 'disabled' : ''}`}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                    disabled={!showRightArrow}
                >
                    <NavArrowRight width={20} height={20} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}
