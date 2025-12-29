// Database types for Supabase tables

export interface Resource {
    id: number;
    title: string;
    description: string;
    tags: string[];
    emoji: string;
    gradient: string;
    category?: string;
    url?: string;
    created_at?: string;
}

export interface Inspiration {
    id: number;
    title: string;
    description: string;
    tags: string[];
    emoji: string;
    gradient: string;
    category?: string;
    image_url?: string;
    created_at?: string;
}

export interface Video {
    id: number;
    title: string;
    description: string;
    emoji: string;
    gradient: string;
    duration: string;
    youtube_id?: string;
    category?: string;
    created_at?: string;
}

export interface Database {
    public: {
        Tables: {
            resources: {
                Row: Resource;
                Insert: Omit<Resource, 'id' | 'created_at'>;
                Update: Partial<Omit<Resource, 'id' | 'created_at'>>;
            };
            inspirations: {
                Row: Inspiration;
                Insert: Omit<Inspiration, 'id' | 'created_at'>;
                Update: Partial<Omit<Inspiration, 'id' | 'created_at'>>;
            };
            videos: {
                Row: Video;
                Insert: Omit<Video, 'id' | 'created_at'>;
                Update: Partial<Omit<Video, 'id' | 'created_at'>>;
            };
        };
    };
}
