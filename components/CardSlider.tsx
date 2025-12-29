'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Card } from '@/components/ui';

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
    onScrollStateChange?: (canScrollLeft: boolean, canScrollRight: boolean) => void;
}

export interface CardSliderRef {
    scrollLeft: () => void;
    scrollRight: () => void;
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

const CardSlider = forwardRef<CardSliderRef, CardSliderProps>(
    ({ items, onScrollStateChange }, ref) => {
        const sliderRef = useRef<HTMLDivElement>(null);

        const updateScrollState = () => {
            if (!sliderRef.current || !onScrollStateChange) return;

            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            const canScrollLeft = scrollLeft > 10;
            const canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;

            onScrollStateChange(canScrollLeft, canScrollRight);
        };

        useEffect(() => {
            updateScrollState();
            window.addEventListener('resize', updateScrollState);

            const timer = setTimeout(updateScrollState, 100);

            return () => {
                window.removeEventListener('resize', updateScrollState);
                clearTimeout(timer);
            };
        }, [items]);

        // Expose scroll methods to parent via ref
        useImperativeHandle(ref, () => ({
            scrollLeft: () => {
                if (!sliderRef.current) return;
                const scrollAmount = 400;
                sliderRef.current.scrollTo({
                    left: sliderRef.current.scrollLeft - scrollAmount,
                    behavior: 'smooth',
                });
            },
            scrollRight: () => {
                if (!sliderRef.current) return;
                const scrollAmount = 400;
                sliderRef.current.scrollTo({
                    left: sliderRef.current.scrollLeft + scrollAmount,
                    behavior: 'smooth',
                });
            },
        }));

        return (
            <div className="slider-wrapper">
                <div
                    ref={sliderRef}
                    className="slider-track"
                    onScroll={updateScrollState}
                >
                    {items.map((item) => (
                        <SliderCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        );
    }
);

CardSlider.displayName = 'CardSlider';

export default CardSlider;
