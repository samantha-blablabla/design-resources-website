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
    // Limit tags to max 2 for cleaner display on small cards
    const displayTags = tags.slice(0, 2);

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
                <p className="card-description" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '1rem'
                }}>{description}</p>
                <div className="card-tags" style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: '0.5rem',
                    overflow: 'hidden'
                }}>
                    {displayTags.map((tag, index) => (
                        <span
                            key={index}
                            className="tag hashtag"
                            data-category={getHashtagCategory(tag)}
                            data-tag={tag}
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
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
