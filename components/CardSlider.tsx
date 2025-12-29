'use client';

import { useState, useRef, useEffect } from 'react';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import { Card } from '@/components/ui';

interface CardSliderProps {
    items: Array<{
        id: number;
        title: string;
        description: string;
        tags: string[];
        emoji: string;
        gradient: string;
        image_url?: string;
        thumbnail_url?: string;
    }>;
}

// Animated card wrapper
function AnimatedCard({ item, index }: { item: any; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`slider-item ${isVisible ? 'slide-in-view' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
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
            <div
                ref={sliderRef}
                className="slider-track"
                onScroll={handleScroll}
            >
                {items.map((item, index) => (
                    <AnimatedCard key={item.id} item={item} index={index} />
                ))}
            </div>

            <div className="slider-controls">
                <button
                    className={`slider-arrow slider-arrow-left ${!showLeftArrow ? 'disabled' : ''}`}
                    onClick={() => scroll('left')}
                    disabled={!showLeftArrow}
                    aria-label="Scroll left"
                >
                    <NavArrowLeft width={20} height={20} strokeWidth={2} />
                </button>

                <button
                    className={`slider-arrow slider-arrow-right ${!showRightArrow ? 'disabled' : ''}`}
                    onClick={() => scroll('right')}
                    disabled={!showRightArrow}
                    aria-label="Scroll right"
                >
                    <NavArrowRight width={20} height={20} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}
