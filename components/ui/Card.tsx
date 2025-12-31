import { formatHashtagDisplay, getHashtagCategory } from '@/lib/hashtag-utils';
import Image from 'next/image';
import Link from 'next/link';
import { OpenNewWindow } from 'iconoir-react';

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
        <div className="card" style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <div className="card-image" style={{
                background: imageUrl ? '#f8f9fa' : gradient,
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {imageUrl ? (
                    <div className="card-image-wrapper" style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                    }}>
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="card-thumbnail"
                            style={{
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                            }}
                            unoptimized
                        />
                    </div>
                ) : null}
                {url && (
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255,255,255,0.95)',
                        borderRadius: '8px',
                        padding: '8px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        opacity: 0,
                        transition: 'opacity 0.2s'
                    }}
                    className="card-external-icon"
                    >
                        <OpenNewWindow width={16} height={16} strokeWidth={2} color="#667eea" />
                    </div>
                )}
            </div>
            <div className="card-content" style={{
                padding: '20px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h3 className="card-title" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                }}>{title}</h3>
                <p className="card-description" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '12px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#666',
                    flex: 1
                }}>{description}</p>
                <div className="card-tags" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginTop: 'auto'
                }}>
                    {displayTags.map((tag, index) => (
                        <span
                            key={index}
                            className="tag hashtag"
                            data-category={getHashtagCategory(tag)}
                            data-tag={tag}
                            style={{
                                whiteSpace: 'nowrap',
                                fontSize: '12px',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: 'rgba(102, 126, 234, 0.1)',
                                color: '#667eea',
                                fontWeight: '500'
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
            <>
                <style jsx>{`
                    .card-link:hover .card {
                        transform: translateY(-4px);
                        box-shadow: 0 12px 24px rgba(102, 126, 234, 0.15) !important;
                        border-color: rgba(102, 126, 234, 0.2) !important;
                    }
                    .card-link:hover .card-thumbnail {
                        transform: scale(1.05) !important;
                    }
                    .card-link:hover .card-external-icon {
                        opacity: 1 !important;
                    }
                    .card-link {
                        text-decoration: none;
                        color: inherit;
                        display: block;
                        height: 100%;
                    }
                `}</style>
                <Link href={url} target="_blank" rel="noopener noreferrer" className="card-link">
                    {cardContent}
                </Link>
            </>
        );
    }

    return cardContent;
}
