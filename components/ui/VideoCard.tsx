interface VideoCardProps {
    title: string;
    description: string;
    emoji: string;
    gradient: string;
    duration: string;
}

export default function VideoCard({ title, description, emoji, gradient, duration }: VideoCardProps) {
    return (
        <div className="video-card">
            <div className="video-thumbnail" style={{ background: gradient }}>
                <span style={{ position: 'relative', zIndex: 3, fontSize: '4rem' }}>
                    {emoji}
                </span>
                <div className="play-icon">▶</div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="tag">{duration}</span>
                </div>
            </div>
        </div>
    );
}
