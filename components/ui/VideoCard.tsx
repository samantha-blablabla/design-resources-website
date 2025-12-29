import Link from 'next/link';

interface VideoCardProps {
    title: string;
    description: string;
    emoji?: string;
    gradient: string;
    duration?: string;
    url?: string;
}

export default function VideoCard({ title, description, emoji, gradient, duration, url }: VideoCardProps) {
    // Extract duration from title if not provided separately (e.g., "Video Title (12:34)")
    const displayDuration = duration || (title.match(/\((\d+:\d+)\)$/)?.[1]);

    const cardContent = (
        <div className="video-card">
            <div className="video-thumbnail" style={{ background: gradient }}>
                <div className="play-icon">▶</div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                {displayDuration && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="tag">{displayDuration}</span>
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
