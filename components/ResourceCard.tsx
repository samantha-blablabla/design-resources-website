interface ResourceCardProps {
    title: string;
    description: string;
    tags: string[];
    emoji: string;
    gradient: string;
}

export default function ResourceCard({ title, description, tags, emoji, gradient }: ResourceCardProps) {
    return (
        <div className="card">
            <div className="card-image" style={{ background: gradient }}>
                <span style={{ position: 'relative', zIndex: 1 }}>{emoji}</span>
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div className="card-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
