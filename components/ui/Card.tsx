import { formatHashtagDisplay, getHashtagCategory } from '@/lib/hashtag-utils';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    title: string;
    description: string;
    tags: string[];
    emoji?: string;
    gradient: string;
    imageUrl?: string;
    url?: string;
}

export default function Card({ title, description, tags, emoji, gradient, imageUrl, url }: CardProps) {
    const cardContent = (
        <div className="card">
            <div className="card-image" style={{ background: imageUrl ? '#ffffff' : gradient }}>
                {imageUrl ? (
                    <div className="card-image-wrapper">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="card-thumbnail"
                            style={{ objectFit: 'contain', padding: '2rem' }}
                            unoptimized
                        />
                    </div>
                ) : null}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div className="card-tags">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="tag hashtag"
                            data-category={getHashtagCategory(tag)}
                            data-tag={tag}
                        >
                            {formatHashtagDisplay(tag)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    if (url) {
        return (
            <Link href={url} target="_blank" rel="noopener noreferrer" className="card-link">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}
