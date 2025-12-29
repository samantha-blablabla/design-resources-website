import Link from 'next/link';
import Image from 'next/image';

interface VideoCardProps {
    title: string;
    description: string;
    emoji?: string;
    gradient: string;
    duration?: string;
    url?: string;
    thumbnailUrl?: string;
    channelName?: string;
    publishedAt?: string;
}

// Format date to relative time (e.g., "2 days ago")
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

export default function VideoCard({ title, description, emoji, gradient, duration, url, thumbnailUrl, channelName, publishedAt }: VideoCardProps) {
    // Extract duration from title if not provided separately (e.g., "Video Title (12:34)")
    const displayDuration = duration || (title.match(/\((\d+:\d+)\)$/)?.[1]);
    const cleanTitle = title.replace(/\s*\(\d+:\d+\)$/, ''); // Remove duration from title

    const cardContent = (
        <div className="video-card">
            <div className="video-thumbnail" style={{
                background: thumbnailUrl ? '#000' : gradient,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {thumbnailUrl ? (
                    <Image
                        src={thumbnailUrl}
                        alt={cleanTitle}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                    />
                ) : (
                    <div className="play-icon">▶</div>
                )}
                {displayDuration && (
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        zIndex: 1
                    }}>
                        {displayDuration}
                    </div>
                )}
                {!thumbnailUrl && <div className="play-icon">▶</div>}
            </div>
            <div className="card-content" style={{ padding: '12px' }}>
                <h3 className="card-title" style={{
                    fontWeight: '700',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    marginBottom: '8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {cleanTitle}
                </h3>
                {description && (
                    <p className="card-description" style={{
                        fontSize: '13px',
                        lineHeight: '1.5',
                        color: '#666',
                        marginBottom: '8px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '39px' // 2 lines * line-height
                    }}>
                        {description}
                    </p>
                )}
                {(channelName || publishedAt) && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: '#999',
                        marginTop: '8px'
                    }}>
                        {channelName && (
                            <span style={{ fontWeight: '500' }}>{channelName}</span>
                        )}
                        {channelName && publishedAt && (
                            <span>•</span>
                        )}
                        {publishedAt && (
                            <span>{formatRelativeTime(publishedAt)}</span>
                        )}
                    </div>
                )}
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
